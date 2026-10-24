import { paths, store } from '../lib/store'
import type { Player } from './types'

export type LudoColor = 'red' | 'green' | 'yellow' | 'blue'

export const LUDO_COLORS: LudoColor[] = ['red', 'green', 'yellow', 'blue']

export const COLOR_CONFIG: Record<LudoColor, {
  name: string
  hex: string
  bg: string
  border: string
  text: string
  startTrackIdx: number // Vị trí xuất phát trên ray 52 ô
  gateTrackIdx: number  // Cửa rẽ vào đích
}> = {
  red: {
    name: 'Đỏ',
    hex: '#ef4444',
    bg: 'bg-red-500',
    border: 'border-red-500',
    text: 'text-red-400',
    startTrackIdx: 0,
    gateTrackIdx: 50,
  },
  green: {
    name: 'Xanh Lá',
    hex: '#22c55e',
    bg: 'bg-emerald-500',
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    startTrackIdx: 13,
    gateTrackIdx: 11,
  },
  yellow: {
    name: 'Vàng',
    hex: '#eab308',
    bg: 'bg-amber-400',
    border: 'border-amber-400',
    text: 'text-amber-300',
    startTrackIdx: 26,
    gateTrackIdx: 24,
  },
  blue: {
    name: 'Xanh Dương',
    hex: '#3b82f6',
    bg: 'bg-blue-500',
    border: 'border-blue-500',
    text: 'text-blue-400',
    startTrackIdx: 39,
    gateTrackIdx: 37,
  },
}

export type SkillCardType = 'boost' | 'shield' | 'swap' | 'super_six'

export interface SkillCard {
  id: string
  type: SkillCardType
  name: string
  desc: string
  icon: string
}

export const SKILL_CARDS: Record<SkillCardType, Omit<SkillCard, 'id'>> = {
  boost: {
    type: 'boost',
    name: 'Tăng Tốc +2',
    desc: 'Cộng thêm 2 ô di chuyển cho lượt đi này',
    icon: '🚀',
  },
  shield: {
    type: 'shield',
    name: 'Khiên Hộ Mệnh',
    desc: 'Ngựa của bạn miễn nhiễm bị đá trong 2 vòng',
    icon: '🛡️',
  },
  swap: {
    type: 'swap',
    name: 'Hoán Đổi Vị Trí',
    desc: 'Đổi vị trí 1 ngựa của bạn với 1 ngựa địch trên đường ray',
    icon: '🔄',
  },
  super_six: {
    type: 'super_six',
    name: 'Xúc Xắc Vàng',
    desc: 'Biến lượt đổ này thành 6 điểm ngay lập tức',
    icon: '🎲',
  },
}

export interface LudoToken {
  id: number // 0 hoặc 1
  color: LudoColor
  // pos = -1: Trong chuồng (Base)
  // pos = 0..51: Trên đường ray chung 52 ô
  // pos = 101..106: Trong cột về đích (106 là đã về chuồng đích)
  pos: number
  stepsMoved: number // Đã đi được bao nhiêu bước từ khi xuất chuồng
  hasShield?: boolean // Đang được bảo vệ bởi khiên
}

export interface LudoPlayerState {
  uid: string
  color: LudoColor
  tokens: LudoToken[]
  cards: SkillCard[]
  score: number // Số ngựa đã về đích
}

export interface LudoLogEntry {
  id: string
  text: string
  time: number
  type: 'roll' | 'kick' | 'home' | 'skill' | 'start'
}

export interface LudoState {
  code: string
  phase: 'lobby' | 'playing' | 'over'
  order: string[] // Uid theo thứ tự lượt
  colors: Record<string, LudoColor> // uid -> color
  players: Record<string, LudoPlayerState>
  currentTurn: string | null
  diceValue: number | null
  diceRolled: boolean
  canRollAgain: boolean
  activeSkill: SkillCardType | null
  winner: string | null
  lastKick: { kicker: string; kicked: string; kickedColor: LudoColor } | null
  logs: LudoLogEntry[]
  turnEndsAt: number
  updatedAt: number
}

export function getRandomCard(): SkillCard {
  const types: SkillCardType[] = ['boost', 'shield', 'swap', 'super_six']
  const type = types[Math.floor(Math.random() * types.length)]
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    ...SKILL_CARDS[type],
  }
}

/** Khởi tạo game Cá Ngựa */
export async function ludoStart(code: string, players: Record<string, Player>): Promise<void> {
  const uids = Object.keys(players).sort((a, b) => (players[a]?.joinedAt ?? 0) - (players[b]?.joinedAt ?? 0)).slice(0, 4)
  if (uids.length < 2) return

  const colors: Record<string, LudoColor> = {}
  const playerStates: Record<string, LudoPlayerState> = {}

  uids.forEach((uid, idx) => {
    const color = LUDO_COLORS[idx]
    colors[uid] = color
    playerStates[uid] = {
      uid,
      color,
      tokens: [
        { id: 0, color, pos: -1, stepsMoved: 0 },
        { id: 1, color, pos: -1, stepsMoved: 0 },
      ],
      cards: [getRandomCard()],
      score: 0,
    }
  })

  const firstTurn = uids[0]
  const state: LudoState = {
    code,
    phase: 'playing',
    order: uids,
    colors,
    players: playerStates,
    currentTurn: firstTurn,
    diceValue: null,
    diceRolled: false,
    canRollAgain: false,
    activeSkill: null,
    winner: null,
    lastKick: null,
    logs: [
      {
        id: `start-${Date.now()}`,
        text: 'Trận chiến Cá Ngựa bắt đầu! Chúc các cơ thủ may mắn.',
        time: Date.now(),
        type: 'start',
      },
    ],
    turnEndsAt: Date.now() + 30_000,
    updatedAt: Date.now(),
  }

  await store.set(paths.ludo(code), state)
  await store.update(paths.meta(code), { phase: 'playing' })
}

/** Đổ xúc xắc */
export async function ludoRollDice(code: string, state: LudoState, forcedValue?: number): Promise<void> {
  if (state.phase !== 'playing' || state.diceRolled || !state.currentTurn) return

  let dice = forcedValue ?? (Math.floor(Math.random() * 6) + 1)
  if (state.activeSkill === 'super_six') {
    dice = 6
  }

  const isSix = dice === 6
  const turnUid = state.currentTurn
  const pState = state.players[turnUid]
  if (!pState) return

  const pName = pState.color.toUpperCase()
  const newLogs: LudoLogEntry[] = [
    {
      id: `roll-${Date.now()}`,
      text: `${pName} đổ được ${dice} điểm!`,
      time: Date.now(),
      type: 'roll',
    },
    ...state.logs.slice(0, 30),
  ]

  // Kiểm tra xem người này có nước đi hợp lệ nào không
  const hasValidMoves = pState.tokens.some((token) => canMoveToken(token, dice, pState.color))

  if (!hasValidMoves) {
    // Không có nước đi hợp lệ
    const nextTurnUid = isSix ? turnUid : getNextTurn(state.order, turnUid)
    await store.set(paths.ludo(code), {
      ...state,
      diceValue: dice,
      diceRolled: true,
      canRollAgain: isSix,
      logs: newLogs,
      updatedAt: Date.now(),
    })

    // Nếu không có nước đi, tự động chuyển lượt sau 1.5 giây
    setTimeout(async () => {
      try {
        const cur = await store.get<LudoState>(paths.ludo(code))
        if (cur && cur.diceRolled && cur.currentTurn === turnUid) {
          await store.update(paths.ludo(code), {
            currentTurn: nextTurnUid,
            diceValue: null,
            diceRolled: false,
            canRollAgain: false,
            activeSkill: null,
            turnEndsAt: Date.now() + 30_000,
            updatedAt: Date.now(),
          })
        }
      } catch {
        /* ignore */
      }
    }, 1500)
    return
  }

  await store.set(paths.ludo(code), {
    ...state,
    diceValue: dice,
    diceRolled: true,
    canRollAgain: isSix,
    activeSkill: null,
    logs: newLogs,
    updatedAt: Date.now(),
  })
}

/** Kiểm tra xem một chú ngựa có đi được với số xúc xắc này không */
export function canMoveToken(token: LudoToken, dice: number, _color?: LudoColor): boolean {
  // 1. Trong chuồng: Cần đổ 6 (hoặc 1) để ra quân
  if (token.pos === -1) {
    return dice === 6 || dice === 1
  }

  // 2. Đã về đích: không thể đi nữa
  if (token.pos === 106) return false

  // 3. Đang trong cột đích (101..105):
  if (token.pos >= 101 && token.pos <= 105) {
    const currentStep = token.pos - 100
    // Cần đổ đúng số bước để leo lên bậc hoặc tới 6
    return currentStep + dice <= 6
  }

  // 4. Đang trên đường ray chung: Luôn có thể di chuyển
  return true
}

/** Di chuyển ngựa */
export async function ludoMoveToken(code: string, state: LudoState, tokenId: number): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid || !state.diceRolled || state.diceValue === null) return

  const pState = state.players[turnUid]
  if (!pState) return

  const token = pState.tokens.find((t) => t.id === tokenId)
  if (!token) return

  const dice = state.diceValue
  if (!canMoveToken(token, dice, pState.color)) return

  const cfg = COLOR_CONFIG[pState.color]
  let newPos = token.pos
  let newStepsMoved = token.stepsMoved
  let kickedMsg: string | null = null
  let kickedInfo: LudoState['lastKick'] = null

  // A. XUẤT CHUỒNG
  if (token.pos === -1) {
    newPos = cfg.startTrackIdx
    newStepsMoved = 0
  } 
  // B. ĐANG Ở TRONG CỘT ĐÍCH (101..105)
  else if (token.pos >= 101 && token.pos <= 105) {
    const currentStep = token.pos - 100
    const targetStep = currentStep + dice
    if (targetStep <= 6) {
      newPos = 100 + targetStep
      newStepsMoved += dice
    }
  } 
  // C. ĐANG TRÊN ĐƯỜNG RAY CHUNG
  else {
    // Kiểm tra xem có chạm vào cửa rẽ vào đích không
    // Cung đường tối đa trên ray là 51 bước
    if (token.stepsMoved + dice > 51) {
      const remainingToHome = (token.stepsMoved + dice) - 51
      if (remainingToHome <= 6) {
        newPos = 100 + remainingToHome
        newStepsMoved += dice
      } else {
        // Vượt quá bậc 6, không thể đi
        return
      }
    } else {
      newPos = (token.pos + dice) % 52
      newStepsMoved += dice
    }
  }

  // CƠ CHẾ ĐÁ NGỰA ĐỐI THỦ:
  // Nếu newPos nằm trên đường ray chung (0..51), kiểm tra xem có ngựa của đối thủ nào ở ô này không!
  const updatedPlayers = { ...state.players }

  if (newPos >= 0 && newPos <= 51) {
    for (const [otherUid, otherState] of Object.entries(updatedPlayers)) {
      if (otherUid === turnUid) continue
      const hitToken = otherState.tokens.find((t) => t.pos === newPos)
      if (hitToken) {
        if (hitToken.hasShield) {
          // Đối thủ có khiên bảo vệ, không bị đá
          kickedMsg = `🛡️ Ngựa của ${COLOR_CONFIG[otherState.color].name} có khiên hộ mệnh, thoát chết trong gang tấc!`
        } else {
          // BỊ ĐÁ VĂNG VỀ CHUỒNG!
          hitToken.pos = -1
          hitToken.stepsMoved = 0
          kickedMsg = `💥 ${COLOR_CONFIG[pState.color].name} ĐÁ VĂNG ngựa của ${COLOR_CONFIG[otherState.color].name} về chuồng!`
          kickedInfo = {
            kicker: turnUid,
            kicked: otherUid,
            kickedColor: otherState.color,
          }
        }
      }
    }
  }

  // Cập nhật ngựa của mình
  token.pos = newPos
  token.stepsMoved = newStepsMoved
  if (token.hasShield) token.hasShield = false // Mất khiên sau khi đi

  // Cập nhật điểm (số ngựa đã về chuồng đích 106)
  pState.score = pState.tokens.filter((t) => t.pos === 106).length

  // Kiểm tra chiến thắng: Đưa cả 2 ngựa về đích
  const isWinner = pState.score >= 2
  const logs: LudoLogEntry[] = [...state.logs]

  if (kickedMsg) {
    logs.unshift({
      id: `kick-${Date.now()}`,
      text: kickedMsg,
      time: Date.now(),
      type: 'kick',
    })
  }

  if (newPos === 106) {
    logs.unshift({
      id: `home-${Date.now()}`,
      text: `🏆 ${COLOR_CONFIG[pState.color].name} đã đưa 1 chiến mã về chuồng đích thành công!`,
      time: Date.now(),
      type: 'home',
    })
  }

  // Nếu đổ được 6 thì được đổ tiếp 1 lần nữa! Ngược lại thì chuyển lượt
  const canRollAgain = state.canRollAgain && !isWinner
  const nextTurnUid = canRollAgain ? turnUid : getNextTurn(state.order, turnUid)

  const nextState: LudoState = {
    ...state,
    phase: isWinner ? 'over' : 'playing',
    players: updatedPlayers,
    winner: isWinner ? turnUid : null,
    currentTurn: isWinner ? null : nextTurnUid,
    diceValue: null,
    diceRolled: false,
    canRollAgain: false,
    activeSkill: null,
    lastKick: kickedInfo ?? state.lastKick,
    logs: logs.slice(0, 35),
    turnEndsAt: isWinner ? 0 : Date.now() + 30_000,
    updatedAt: Date.now(),
  }

  await store.set(paths.ludo(code), nextState)
  if (isWinner) {
    await store.update(paths.meta(code), { phase: 'over' })
  }
}

/** Sử dụng thẻ bài kỹ năng */
export async function ludoUseSkill(code: string, state: LudoState, cardId: string): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid) return
  const pState = state.players[turnUid]
  if (!pState) return

  const cardIdx = pState.cards.findIndex((c) => c.id === cardId)
  if (cardIdx === -1) return

  const card = pState.cards[cardIdx]
  pState.cards.splice(cardIdx, 1)

  const logs: LudoLogEntry[] = [
    {
      id: `skill-${Date.now()}`,
      text: `✨ ${COLOR_CONFIG[pState.color].name} đã kích hoạt thẻ [${card.name}]!`,
      time: Date.now(),
      type: 'skill',
    },
    ...state.logs,
  ]

  if (card.type === 'shield') {
    // Đeo khiên cho tất cả ngựa của mình đang trên đường đua
    pState.tokens.forEach((t) => {
      if (t.pos >= 0) t.hasShield = true
    })
  }

  await store.set(paths.ludo(code), {
    ...state,
    activeSkill: card.type,
    logs: logs.slice(0, 35),
    updatedAt: Date.now(),
  })
}

/** Chuyển lượt kế tiếp */
export function getNextTurn(order: string[], currentUid: string): string {
  const idx = order.indexOf(currentUid)
  if (idx === -1) return order[0]
  return order[(idx + 1) % order.length]
}

/** Conductor Tick loop: Tự động đổi lượt nếu người chơi hết giờ */
export async function ludoTick(code: string, state: LudoState, now: number): Promise<boolean> {
  if (state.phase !== 'playing' || !state.currentTurn) return false

  if (state.turnEndsAt && now > state.turnEndsAt) {
    const nextTurnUid = getNextTurn(state.order, state.currentTurn)
    await store.update(paths.ludo(code), {
      currentTurn: nextTurnUid,
      diceValue: null,
      diceRolled: false,
      canRollAgain: false,
      activeSkill: null,
      turnEndsAt: now + 30_000,
      updatedAt: now,
    })
    return true
  }

  return false
}
