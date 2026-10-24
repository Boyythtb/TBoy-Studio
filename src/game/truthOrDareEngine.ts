import { paths, store } from '../lib/store'
import type { Player } from './types'
import { TRUTH_CARDS_18, DARE_CARDS_INTERACTIVE, type CardItem } from '../data/truthOrDareData'

export interface TodState {
  code: string
  phase: 'lobby' | 'playing'
  activeUid: string | null
  spinAngle: number
  card: CardItem | null
  cardType: 'truth' | 'dare' | null
  drinks: Record<string, number>
  order: string[]
  updatedAt: number
}

export function getPlayerOrder(players: Record<string, Player>): string[] {
  return Object.keys(players).sort((a, b) => (players[a]?.joinedAt ?? 0) - (players[b]?.joinedAt ?? 0))
}

export async function todStart(code: string, players: Record<string, Player>): Promise<void> {
  const order = getPlayerOrder(players)
  const initialDrinks: Record<string, number> = {}
  order.forEach((uid) => {
    initialDrinks[uid] = 0
  })

  const state: TodState = {
    code,
    phase: 'playing',
    activeUid: order[0] || null,
    spinAngle: 0,
    card: null,
    cardType: null,
    drinks: initialDrinks,
    order,
    updatedAt: Date.now(),
  }

  await store.set(paths.tod(code), state)
  try {
    await store.update(paths.meta(code), { phase: 'playing' })
  } catch {
    /* ignore */
  }
}

export async function todSpin(code: string, state: TodState, players: Record<string, Player>): Promise<void> {
  const order = getPlayerOrder(players)
  if (order.length === 0) return

  const extraTurns = Math.floor(Math.random() * 4) + 4
  const targetIdx = Math.floor(Math.random() * order.length)
  const sliceAngle = 360 / order.length
  const targetAngle = targetIdx * sliceAngle
  const finalAngle = state.spinAngle + extraTurns * 360 + (targetAngle - (state.spinAngle % 360) + 360) % 360

  const updated: TodState = {
    ...state,
    order,
    spinAngle: finalAngle,
    activeUid: order[targetIdx],
    card: null,
    cardType: null,
    updatedAt: Date.now(),
  }

  await store.set(paths.tod(code), updated)
}

export async function todSelectType(code: string, state: TodState, type: 'truth' | 'dare'): Promise<void> {
  const pool = type === 'truth' ? TRUTH_CARDS_18 : DARE_CARDS_INTERACTIVE
  const randomCard = pool[Math.floor(Math.random() * pool.length)]

  const updated: TodState = {
    ...state,
    cardType: type,
    card: randomCard,
    updatedAt: Date.now(),
  }

  await store.set(paths.tod(code), updated)
}

export async function todComplete(code: string, state: TodState): Promise<void> {
  const updated: TodState = {
    ...state,
    card: null,
    cardType: null,
    updatedAt: Date.now(),
  }

  await store.set(paths.tod(code), updated)
}

export async function todDrink(code: string, state: TodState, penalty: number): Promise<void> {
  const activeUid = state.activeUid
  const currentDrinks = state.drinks || {}
  const nextDrinks = { ...currentDrinks }

  if (activeUid) {
    nextDrinks[activeUid] = (nextDrinks[activeUid] || 0) + penalty
  }

  const updated: TodState = {
    ...state,
    drinks: nextDrinks,
    card: null,
    cardType: null,
    updatedAt: Date.now(),
  }

  await store.set(paths.tod(code), updated)
}

export async function todNextTurn(code: string, state: TodState, players: Record<string, Player>): Promise<void> {
  const order = getPlayerOrder(players)
  if (order.length === 0) return

  const currentIdx = order.indexOf(state.activeUid || '')
  const nextIdx = (currentIdx + 1) % order.length

  const updated: TodState = {
    ...state,
    order,
    activeUid: order[nextIdx],
    card: null,
    cardType: null,
    updatedAt: Date.now(),
  }

  await store.set(paths.tod(code), updated)
}
