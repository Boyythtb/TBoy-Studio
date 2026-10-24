import { paths, store } from '../lib/store'
import type { Player } from './types'
import { TRUTH_CARDS_18, DARE_CARDS_INTERACTIVE, type CardItem } from '../data/truthOrDareData'

export type TodStep = 'waiting_spin' | 'spinning' | 'picking' | 'acting'

export interface TodState {
  code: string
  phase: 'lobby' | 'playing'
  // Ai là người có quyền ấn quay chai ở vòng này
  spinnerUid: string | null
  // Nạn nhân mà mũi chai chỉ trúng
  activeUid: string | null
  // Trạng thái cụ thể trong ván
  step: TodStep
  spinAngle: number
  spinningSince?: number
  card: CardItem | null
  cardType: 'truth' | 'dare' | null
  drinks: Record<string, number>
  order: string[]
  updatedAt: number
}

export function getPlayerOrder(players: Record<string, Player>): string[] {
  return Object.keys(players).sort((a, b) => (players[a]?.joinedAt ?? 0) - (players[b]?.joinedAt ?? 0))
}

export async function todStart(code: string, players: Record<string, Player>, hostUid?: string): Promise<void> {
  const order = getPlayerOrder(players)
  const initialDrinks: Record<string, number> = {}
  order.forEach((uid) => {
    initialDrinks[uid] = 0
  })

  // Người quay đầu tiên là Chủ phòng (nếu có tham gia), hoặc người đầu tiên trong bàn
  const firstSpinner = (hostUid && order.includes(hostUid)) ? hostUid : (order[0] || null)

  const state: TodState = {
    code,
    phase: 'playing',
    spinnerUid: firstSpinner,
    activeUid: null,
    step: 'waiting_spin',
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

  // Chọn nạn nhân ngẫu nhiên: nếu có từ 2 người trở lên, ưu tiên người khác người đang quay
  let targetIdx = Math.floor(Math.random() * order.length)
  if (order.length >= 2 && state.spinnerUid && order[targetIdx] === state.spinnerUid) {
    // 70% xác suất chuyển sang người khác để tăng tính tương tác
    if (Math.random() < 0.7) {
      targetIdx = (targetIdx + 1 + Math.floor(Math.random() * (order.length - 1))) % order.length
    }
  }

  const extraTurns = Math.floor(Math.random() * 3) + 4 // 4 đến 6 vòng
  const sliceAngle = 360 / order.length
  const targetAngle = targetIdx * sliceAngle
  const finalAngle = state.spinAngle + extraTurns * 360 + ((targetAngle - (state.spinAngle % 360) + 360) % 360)

  const targetUid = order[targetIdx]

  // Bước 1: Bắt đầu xoay chai
  const spinningState: TodState = {
    ...state,
    order,
    spinAngle: finalAngle,
    activeUid: targetUid,
    step: 'spinning',
    spinningSince: Date.now(),
    card: null,
    cardType: null,
    updatedAt: Date.now(),
  }
  await store.set(paths.tod(code), spinningState)

  // Bước 2: Sau khi hiệu ứng xoay chai dừng lại (2.8 giây), chuyển sang trạng thái để nạn nhân chọn Thật/Thách
  setTimeout(async () => {
    try {
      const current = await store.get<TodState>(paths.tod(code))
      if (current && current.step === 'spinning') {
        await store.update(paths.tod(code), {
          step: 'picking',
          updatedAt: Date.now(),
        })
      }
    } catch {
      /* ignore */
    }
  }, 2800)
}

/** Tự động kiểm tra và phục hồi nếu vòng quay bị lag hoặc treo quá 3.2 giây */
export async function todCheckWatchdog(code: string, state: TodState): Promise<void> {
  if (state.step === 'spinning') {
    const elapsed = Date.now() - (state.spinningSince || state.updatedAt || 0)
    if (elapsed > 3200) {
      try {
        await store.update(paths.tod(code), {
          step: 'picking',
          updatedAt: Date.now(),
        })
      } catch {
        /* ignore */
      }
    }
  }
}

export async function todSelectType(code: string, state: TodState, type: 'truth' | 'dare'): Promise<void> {
  const pool = type === 'truth' ? TRUTH_CARDS_18 : DARE_CARDS_INTERACTIVE
  const randomCard = pool[Math.floor(Math.random() * pool.length)]

  const updated: TodState = {
    ...state,
    cardType: type,
    card: randomCard,
    step: 'acting',
    updatedAt: Date.now(),
  }

  await store.set(paths.tod(code), updated)
}

export async function todComplete(code: string, state: TodState): Promise<void> {
  // Hoàn thành: Người vừa thực hiện (state.activeUid) sẽ là người có quyền quay chai tiếp theo!
  const nextSpinner = state.activeUid || state.spinnerUid
  const updated: TodState = {
    ...state,
    spinnerUid: nextSpinner,
    activeUid: null,
    card: null,
    cardType: null,
    step: 'waiting_spin',
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

  // Uống phạt: Người thua (state.activeUid) sẽ là người có quyền quay chai tiếp theo để phục thù!
  const nextSpinner = activeUid || state.spinnerUid
  const updated: TodState = {
    ...state,
    drinks: nextDrinks,
    spinnerUid: nextSpinner,
    activeUid: null,
    card: null,
    cardType: null,
    step: 'waiting_spin',
    updatedAt: Date.now(),
  }

  await store.set(paths.tod(code), updated)
}

export async function todNextTurn(code: string, state: TodState, players: Record<string, Player>): Promise<void> {
  const order = getPlayerOrder(players)
  if (order.length === 0) return

  // Chuyển quyền quay sang người tiếp theo trong danh sách
  const currentSpinnerIdx = order.indexOf(state.spinnerUid || '')
  const nextSpinnerIdx = (currentSpinnerIdx + 1) % order.length

  const updated: TodState = {
    ...state,
    order,
    spinnerUid: order[nextSpinnerIdx],
    activeUid: null,
    card: null,
    cardType: null,
    step: 'waiting_spin',
    updatedAt: Date.now(),
  }

  await store.set(paths.tod(code), updated)
}
