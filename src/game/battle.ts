import { paths, store } from '../lib/store'
import type { Meta, Player } from './types'

export const BOARD = 8
export const SHIP_SIZES = [4, 3, 3, 2]
export const SB_TURN_SECONDS = 35

export interface Cell {
  x: number
  y: number
}

export interface Ship {
  cells: Cell[]
}

export interface Fleet {
  ships: Ship[]
}

export type ShotResult = 'hit' | 'miss' | 'pending'

export interface SbState {
  phase: 'place' | 'battle' | 'over'
  ready: Record<string, boolean>
  turn: string | null
  turnEndsAt: number
  shots: Record<string, Record<string, ShotResult>>
  winner: string | null
  last: { by: string; x: number; y: number; hit: boolean; sunk: boolean } | null
}

export const key = (x: number, y: number) => `${x},${y}`

export function parseKey(k: string): Cell {
  const [x, y] = k.split(',').map(Number)
  return { x, y }
}

export function cellKey(c: Cell) {
  return key(c.x, c.y)
}

export function emptyFleet(): Fleet {
  return { ships: [] }
}

export function shipAt(fleet: Fleet, x: number, y: number): number {
  return fleet.ships.findIndex((s) => s.cells.some((c) => c.x === x && c.y === y))
}

export function validateFleet(fleet: Fleet | null): string | null {
  if (!fleet || !Array.isArray(fleet.ships)) return 'Chưa đặt tàu.'
  if (fleet.ships.length !== SHIP_SIZES.length) return 'Chưa đủ số tàu.'
  const seen = new Set<string>()
  for (let i = 0; i < fleet.ships.length; i++) {
    const cells = fleet.ships[i].cells
    if (cells.length !== SHIP_SIZES[i]) return 'Tàu sai kích thước.'
    const xs = cells.map((c) => c.x)
    const ys = cells.map((c) => c.y)
    const straight = xs.every((x) => x === xs[0]) || ys.every((y) => y === ys[0])
    if (!straight) return 'Tàu phải nằm thẳng hàng.'
    for (const c of cells) {
      if (c.x < 0 || c.y < 0 || c.x >= BOARD || c.y >= BOARD) return 'Tàu nằm ngoài bàn cờ.'
      const k = cellKey(c)
      if (seen.has(k)) return 'Các tàu đang chồng lên nhau.'
      seen.add(k)
    }
  }
  return null
}

export function randomFleet(): Fleet {
  for (let attempt = 0; attempt < 200; attempt++) {
    const taken = new Set<string>()
    const ships: Ship[] = []
    let ok = true
    for (const size of SHIP_SIZES) {
      let placed = false
      for (let tries = 0; tries < 300 && !placed; tries++) {
        const horizontal = Math.random() < 0.5
        const maxX = horizontal ? BOARD - size : BOARD - 1
        const maxY = horizontal ? BOARD - 1 : BOARD - size
        const x = Math.floor(Math.random() * (maxX + 1))
        const y = Math.floor(Math.random() * (maxY + 1))
        const cells: Cell[] = []
        let free = true
        for (let i = 0; i < size; i++) {
          const cx = horizontal ? x + i : x
          const cy = horizontal ? y : y + i
          if (taken.has(key(cx, cy))) {
            free = false
            break
          }
          cells.push({ x: cx, y: cy })
        }
        if (!free) continue
        for (const c of cells) taken.add(cellKey(c))
        ships.push({ cells })
        placed = true
      }
      if (!placed) {
        ok = false
        break
      }
    }
    if (ok) return { ships }
  }
  return { ships: [] }
}

export function playerOrder(players: Record<string, Player>): string[] {
  return Object.values(players)
    .sort((a, b) => a.joinedAt - b.joinedAt)
    .map((p) => p.uid)
}

export function opponentOf(order: string[], uid: string): string | null {
  return order.find((u) => u !== uid) ?? null
}

export interface SbStartConfig {
  turnSeconds?: number
}

export async function sbStart(code: string, players: Record<string, Player>) {
  const order = playerOrder(players)
  const state: SbState = {
    phase: 'place',
    ready: {},
    turn: null,
    turnEndsAt: 0,
    shots: Object.fromEntries(order.map((u) => [u, {}])),
    winner: null,
    last: null,
  }
  await store.set(paths.sb(code), state)
  await store.update(paths.meta(code), { phase: 'setup', startedAt: Date.now() })
}

export async function sbReset(code: string) {
  await store.remove(paths.sb(code))
  await store.remove(paths.sbKeys(code))
  await store.update(paths.meta(code), { phase: 'lobby', startedAt: null })
}

interface TickInput {
  code: string
  meta: Meta
  players: Record<string, Player>
  state: SbState | null
  keys: Record<string, Fleet> | null
  now: number
}

export async function sbTick(input: TickInput): Promise<boolean> {
  const { code, players, state, keys, now } = input
  if (!state) return false
  const order = playerOrder(players)
  if (order.length !== 2) return false

  if (state.phase === 'place') {
    const ready: Record<string, boolean> = {}
    let all = true
    for (const uid of order) {
      const problem = validateFleet(keys?.[uid] ?? null)
      ready[uid] = !problem
      if (problem) all = false
    }
    const changed = order.some((uid) => state.ready?.[uid] !== ready[uid])
    if (changed) await store.update(paths.sb(code), { ready })
    if (!all) return changed
    await store.update(paths.sb(code), {
      phase: 'battle',
      ready,
      turn: order[0],
      turnEndsAt: now + SB_TURN_SECONDS * 1000,
    })
    await store.update(paths.meta(code), { phase: 'play' })
    return true
  }

  if (state.phase !== 'battle' || !state.turn) return false
  const shooter = state.turn
  const enemy = opponentOf(order, shooter)
  if (!enemy) return false
  const enemyFleet = keys?.[enemy]
  if (!enemyFleet) return false

  const myShots = state.shots?.[shooter] ?? {}
  const pendingKey = Object.keys(myShots).find((k) => myShots[k] === 'pending')
  if (pendingKey) {
    const { x, y } = parseKey(pendingKey)
    const enemyCells = new Set(enemyFleet.ships.flatMap((s) => s.cells.map(cellKey)))
    const hit = enemyCells.has(pendingKey)
    const nextShots = { ...myShots, [pendingKey]: hit ? ('hit' as const) : ('miss' as const) }
    const allShots = { ...state.shots, [shooter]: nextShots }

    const sunkShip = hit && enemyFleet.ships.some((s) => s.cells.every((c) => allShots[shooter]?.[cellKey(c)] === 'hit'))
    const allSunk = enemyFleet.ships.every((s) => s.cells.every((c) => allShots[shooter]?.[cellKey(c)] === 'hit'))
    const won = allSunk

    await store.update(paths.sb(code), {
      shots: allShots,
      last: { by: shooter, x, y, hit, sunk: sunkShip },
      winner: won ? shooter : null,
      phase: won ? 'over' : 'battle',
      turn: won ? null : hit ? shooter : enemy,
      turnEndsAt: won ? 0 : now + SB_TURN_SECONDS * 1000,
    })
    if (won) {
      await store.update(paths.meta(code), { phase: 'over' })
      await store.update(paths.player(code, shooter), { ready: true })
    }
    return true
  }

  if (state.turnEndsAt && now > state.turnEndsAt) {
    await store.update(paths.sb(code), { turn: enemy, turnEndsAt: now + SB_TURN_SECONDS * 1000 })
    return true
  }

  return false
}

export function countHits(shots: Record<string, ShotResult> | undefined) {
  if (!shots) return 0
  return Object.values(shots).filter((v) => v === 'hit').length
}
