import { paths, store } from '../lib/store'
import type { Meta, Player } from './types'

export const SC_MIN_PLAYERS = 2
export const SC_MAX_PLAYERS = 8
export const SC_CODE_LEN = 3

export interface ScEntry {
  id: string
  by: string
  target: string
  guess: string
  bulls: number
  cows: number
  cracked: boolean
  at: number
}

export interface ScState {
  phase: 'setup' | 'play' | 'over'
  turn: string | null
  turnEndsAt: number
  scores: Record<string, number>
  log: ScEntry[]
  last: ScEntry | null
  winner: string | null
  targetScore: number
  turnSeconds: number
}

export interface ScKey {
  code: string
  at: number
}

export interface ScGuess {
  target: string
  guess: string
  at: number
}

export const DEFAULT_SC = { targetScore: 3, turnSeconds: 45 }

export function randomCode(len = SC_CODE_LEN): string {
  return String(Math.floor(Math.random() * 10 ** len)).padStart(len, '0')
}

export function compareCodes(secret: string, guess: string) {
  const a = secret.split('')
  const b = guess.split('')
  let bulls = 0
  const left: string[] = []
  const right: string[] = []
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) bulls++
    else {
      left.push(a[i])
      right.push(b[i])
    }
  }
  let cows = 0
  for (const ch of right) {
    const idx = left.indexOf(ch)
    if (idx >= 0) {
      cows++
      left.splice(idx, 1)
    }
  }
  return { bulls, cows }
}

export function playerOrder(players: Record<string, Player>): string[] {
  return Object.values(players)
    .sort((a, b) => a.joinedAt - b.joinedAt)
    .map((p) => p.uid)
}

export function nextTurn(order: string[], current: string | null): string | null {
  if (!order.length) return null
  const i = current ? order.indexOf(current) : -1
  return order[(i + 1) % order.length]
}

export async function scStart(code: string, players: Record<string, Player>, targetScore: number, turnSeconds: number) {
  const order = playerOrder(players)
  const scores: Record<string, number> = {}
  for (const uid of order) scores[uid] = 0
  const state: ScState = {
    phase: 'setup',
    turn: null,
    turnEndsAt: 0,
    scores,
    log: [],
    last: null,
    winner: null,
    targetScore,
    turnSeconds,
  }
  await store.set(paths.sc(code), state)
  await store.update(paths.meta(code), { phase: 'setup', startedAt: Date.now() })
}

export async function scReset(code: string) {
  await store.remove(paths.sc(code))
  await store.remove(paths.scKeys(code))
  await store.remove(paths.scGuesses(code))
  await store.update(paths.meta(code), { phase: 'lobby', startedAt: null })
}

interface TickInput {
  code: string
  meta: Meta
  players: Record<string, Player>
  state: ScState | null
  keys: Record<string, ScKey> | null
  guesses: Record<string, ScGuess> | null
  now: number
}

/** Host-authoritative loop: resolves the current turn's guess, enforces timeouts, detects a winner. */
export async function scTick(input: TickInput): Promise<boolean> {
  const { code, players, state, keys, guesses, now } = input
  if (!state) return false
  const order = playerOrder(players)
  if (order.length < SC_MIN_PLAYERS) return false

  if (state.phase === 'setup') {
    const ready = order.every((uid) => (keys?.[uid]?.code ?? '').length === SC_CODE_LEN)
    if (!ready) return false
    const first = state.turn && order.includes(state.turn) ? state.turn : order[0]
    await store.update(paths.sc(code), {
      phase: 'play',
      turn: first,
      turnEndsAt: now + state.turnSeconds * 1000,
    })
    await store.update(paths.meta(code), { phase: 'play' })
    return true
  }

  if (state.phase !== 'play' || !state.turn) return false

  const turnUid = state.turn
  const guess = guesses?.[turnUid]

  if (guess && guess.target && guess.target !== turnUid) {
    const key = keys?.[guess.target]
    if (!key?.code) return false
    const clean = (guess.guess ?? '').replace(/\D/g, '').slice(0, SC_CODE_LEN)
    if (clean.length !== SC_CODE_LEN) return false

    const { bulls, cows } = compareCodes(key.code, clean)
    const cracked = bulls === SC_CODE_LEN
    const score = (state.scores?.[turnUid] ?? 0) + (cracked ? 1 : 0)
    const entry: ScEntry = {
      id: `${now}-${turnUid}`,
      by: turnUid,
      target: guess.target,
      guess: clean,
      bulls,
      cows,
      cracked,
      at: now,
    }
    const won = cracked && score >= state.targetScore
    const next = nextTurn(order, turnUid)
    await store.update(paths.sc(code), {
      scores: { ...state.scores, [turnUid]: score },
      log: [entry, ...(state.log ?? [])].slice(0, 40),
      last: entry,
      turn: won ? null : next,
      turnEndsAt: won ? 0 : now + state.turnSeconds * 1000,
      winner: won ? turnUid : null,
      phase: won ? 'over' : 'play',
    })
    await store.remove(paths.scGuess(code, turnUid))
    // cracked code is replaced by a fresh one, so the game keeps going
    if (cracked && !won) await store.set(paths.scKey(code, guess.target), { code: randomCode(), at: now })
    if (won) {
      await store.update(paths.meta(code), { phase: 'over' })
      await store.update(paths.player(code, turnUid), { ready: true })
    }
    return true
  }

  if (state.turnEndsAt && now > state.turnEndsAt) {
    await store.update(paths.sc(code), {
      turn: nextTurn(order, turnUid),
      turnEndsAt: now + state.turnSeconds * 1000,
    })
    return true
  }

  return false
}

export function scTitle(state: ScState | null, players: Record<string, Player>) {
  if (!state) return ''
  if (state.phase === 'setup') return 'Mỗi người đặt mật mã'
  if (state.phase === 'over') {
    const p = state.winner ? players[state.winner] : null
    return `${p?.name ?? 'Ai đó'} đã phá được ${state.targetScore} mật mã`
  }
  const p = state.turn ? players[state.turn] : null
  return `Lượt của ${p?.name ?? '…'}`
}
