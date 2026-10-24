import { paths, store } from '../lib/store'
import type { Player } from './types'

export type ResourceType = 'wood' | 'brick' | 'sheep' | 'wheat' | 'ore'

export const RESOURCE_CONFIG: Record<ResourceType, { name: string; icon: string; color: string }> = {
  wood: { name: 'Gỗ', icon: '🌲', color: '#15803d' },
  brick: { name: 'Gạch', icon: '🧱', color: '#b91c1c' },
  sheep: { name: 'Cừu', icon: '🐑', color: '#84cc16' },
  wheat: { name: 'Lúa', icon: '🌾', color: '#eab308' },
  ore: { name: 'Đá', icon: '🪨', color: '#64748b' },
}

export interface HexTile {
  id: number
  type: ResourceType | 'desert'
  diceNumber: number
  cx: number
  cy: number
}

// 7 Ô lục giác trên đảo Catan Mini
export const CATAN_HEXES: HexTile[] = [
  { id: 0, type: 'desert', diceNumber: 7, cx: 300, cy: 300 }, // Tâm
  { id: 1, type: 'wood', diceNumber: 6, cx: 300, cy: 160 },   // Trên
  { id: 2, type: 'brick', diceNumber: 8, cx: 420, cy: 230 },  // Phải trên
  { id: 3, type: 'sheep', diceNumber: 5, cx: 420, cy: 370 },  // Phải dưới
  { id: 4, type: 'wheat', diceNumber: 9, cx: 300, cy: 440 },  // Dưới
  { id: 5, type: 'ore', diceNumber: 10, cx: 180, cy: 370 },   // Trái dưới
  { id: 6, type: 'wood', diceNumber: 4, cx: 180, cy: 230 },   // Trái trên
]

export interface Settlement {
  id: number
  ownerUid: string
  isCity: boolean // false: Làng (1đ), true: Thành phố (2đ)
  hexIds: number[] // Nối với các ô nào
}

export interface CatanPlayerState {
  uid: string
  name: string
  avatar: number
  color: string
  resources: Record<ResourceType, number>
  settlements: Settlement[]
  victoryPoints: number
}

export interface CatanState {
  code: string
  phase: 'lobby' | 'playing' | 'over'
  order: string[]
  players: Record<string, CatanPlayerState>
  currentTurn: string | null
  dice1: number | null
  dice2: number | null
  diceRolled: boolean
  winner: string | null
  logs: Array<{ id: string; text: string; time: number }>
  turnEndsAt: number
  updatedAt: number
}

const PLAYER_COLORS = ['#ef4444', '#3b82f6', '#eab308', '#22c55e']

export async function catanStart(code: string, players: Record<string, Player>): Promise<void> {
  const uids = Object.keys(players).sort((a, b) => (players[a]?.joinedAt ?? 0) - (players[b]?.joinedAt ?? 0)).slice(0, 4)
  if (uids.length < 2) return

  const pStates: Record<string, CatanPlayerState> = {}

  // Khởi tạo mỗi người có 1 làng khởi đầu và 1 ít tài nguyên
  uids.forEach((uid, idx) => {
    const p = players[uid]
    const color = PLAYER_COLORS[idx]
    const hexId = (idx * 2 + 1) % 7

    pStates[uid] = {
      uid,
      name: p?.name || 'Cơ thủ',
      avatar: p?.avatar ?? 0,
      color,
      resources: { wood: 1, brick: 1, sheep: 1, wheat: 1, ore: 0 },
      settlements: [
        { id: idx, ownerUid: uid, isCity: false, hexIds: [hexId, 0] },
      ],
      victoryPoints: 1, // 1 làng = 1 điểm
    }
  })

  const state: CatanState = {
    code,
    phase: 'playing',
    order: uids,
    players: pStates,
    currentTurn: uids[0],
    dice1: null,
    dice2: null,
    diceRolled: false,
    winner: null,
    logs: [
      { id: `start-${Date.now()}`, text: 'Khai phá Đảo Catan Mini bắt đầu! Đạt 5 Điểm để chiến thắng.', time: Date.now() },
    ],
    turnEndsAt: Date.now() + 40_000,
    updatedAt: Date.now(),
  }

  await store.set(paths.catan(code), state)
  await store.update(paths.meta(code), { phase: 'playing' })
}

/** Đổ xúc xắc thu hoạch tài nguyên */
export async function catanRollDice(code: string, state: CatanState): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid || state.diceRolled) return

  const d1 = Math.floor(Math.random() * 6) + 1
  const d2 = Math.floor(Math.random() * 6) + 1
  const sum = d1 + d2

  const logs = [...state.logs]
  logs.unshift({
    id: `dice-${Date.now()}`,
    text: `🎲 Xúc xắc ra số [${sum}] (${d1} + ${d2})`,
    time: Date.now(),
  })

  // Tìm các ô lục giác có số bằng sum
  const hitHexes = CATAN_HEXES.filter((h) => h.diceNumber === sum && h.type !== 'desert')
  const updatedPlayers = { ...state.players }

  if (hitHexes.length > 0) {
    hitHexes.forEach((hex) => {
      const resType = hex.type as ResourceType
      Object.values(updatedPlayers).forEach((pl) => {
        pl.settlements.forEach((st) => {
          if (st.hexIds.includes(hex.id)) {
            const gain = st.isCity ? 2 : 1
            pl.resources[resType] += gain
            logs.unshift({
              id: `harvest-${Date.now()}-${pl.uid}`,
              text: `🌾 ${pl.name} nhận được +${gain} ${RESOURCE_CONFIG[resType].name}!`,
              time: Date.now(),
            })
          }
        })
      })
    })
  } else {
    logs.unshift({
      id: `no-harvest-${Date.now()}`,
      text: `Không có ô đất nào có số ${sum}, không có tài nguyên mới.`,
      time: Date.now(),
    })
  }

  await store.set(paths.catan(code), {
    ...state,
    players: updatedPlayers,
    dice1: d1,
    dice2: d2,
    diceRolled: true,
    logs: logs.slice(0, 35),
    updatedAt: Date.now(),
  })
}

/** Xây dựng Làng mới (Tốn 1 Gỗ + 1 Gạch + 1 Cừu + 1 Lúa) */
export async function catanBuildSettlement(code: string, state: CatanState): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid) return
  const p = state.players[turnUid]
  if (!p) return

  if (p.resources.wood < 1 || p.resources.brick < 1 || p.resources.sheep < 1 || p.resources.wheat < 1) return

  p.resources.wood -= 1
  p.resources.brick -= 1
  p.resources.sheep -= 1
  p.resources.wheat -= 1

  const newId = p.settlements.length + 10
  const hexTarget = (p.settlements.length + 1) % 7
  p.settlements.push({
    id: newId,
    ownerUid: turnUid,
    isCity: false,
    hexIds: [hexTarget, 0],
  })
  p.victoryPoints += 1

  const isWin = p.victoryPoints >= 5
  const logs = [
    {
      id: `build-${Date.now()}`,
      text: `🏡 ${p.name} đã lập thêm 1 Làng mới (+1 Điểm)!`,
      time: Date.now(),
    },
    ...state.logs,
  ]

  await store.set(paths.catan(code), {
    ...state,
    phase: isWin ? 'over' : 'playing',
    winner: isWin ? turnUid : null,
    logs: logs.slice(0, 35),
    updatedAt: Date.now(),
  })
}

/** Nâng cấp Thành phố (Tốn 2 Lúa + 3 Đá) */
export async function catanUpgradeCity(code: string, state: CatanState): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid) return
  const p = state.players[turnUid]
  if (!p) return

  if (p.resources.wheat < 2 || p.resources.ore < 3) return

  const target = p.settlements.find((s) => !s.isCity)
  if (!target) return

  p.resources.wheat -= 2
  p.resources.ore -= 3
  target.isCity = true
  p.victoryPoints += 1

  const isWin = p.victoryPoints >= 5
  const logs = [
    {
      id: `city-${Date.now()}`,
      text: `🏰 ${p.name} đã nâng cấp 1 Làng lên Thành Phố (+1 Điểm, thu hoạch gấp đôi)!`,
      time: Date.now(),
    },
    ...state.logs,
  ]

  await store.set(paths.catan(code), {
    ...state,
    phase: isWin ? 'over' : 'playing',
    winner: isWin ? turnUid : null,
    logs: logs.slice(0, 35),
    updatedAt: Date.now(),
  })
}

/** Đổi 4 tài nguyên bất kỳ lấy 1 tài nguyên mong muốn */
export async function catanBankTrade(
  code: string,
  state: CatanState,
  fromRes: ResourceType,
  toRes: ResourceType
): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid) return
  const p = state.players[turnUid]
  if (!p || p.resources[fromRes] < 4) return

  p.resources[fromRes] -= 4
  p.resources[toRes] += 1

  const logs = [
    {
      id: `trade-${Date.now()}`,
      text: `🔄 ${p.name} đổi 4 ${RESOURCE_CONFIG[fromRes].name} lấy 1 ${RESOURCE_CONFIG[toRes].name}`,
      time: Date.now(),
    },
    ...state.logs,
  ]

  await store.set(paths.catan(code), {
    ...state,
    logs: logs.slice(0, 35),
    updatedAt: Date.now(),
  })
}

/** Chuyển lượt */
export async function catanEndTurn(code: string): Promise<void> {
  const cur = await store.get<CatanState>(paths.catan(code))
  if (!cur || !cur.currentTurn) return

  const curIdx = cur.order.indexOf(cur.currentTurn)
  const nextUid = cur.order[(curIdx + 1) % cur.order.length]

  await store.set(paths.catan(code), {
    ...cur,
    currentTurn: nextUid,
    dice1: null,
    dice2: null,
    diceRolled: false,
    turnEndsAt: Date.now() + 40_000,
    updatedAt: Date.now(),
  })
}

/** Conductor Tick loop */
export async function catanTick(code: string, state: CatanState, now: number): Promise<boolean> {
  if (state.phase !== 'playing' || !state.currentTurn) return false
  if (state.turnEndsAt && now > state.turnEndsAt) {
    await catanEndTurn(code)
    return true
  }
  return false
}
