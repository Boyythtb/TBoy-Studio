import { paths, store } from '../lib/store'
import type { Player } from './types'

export interface Property {
  id: number
  name: string
  city: string
  color: string
  price: number
  baseRent: number
  housePrice: number
  houses: number // 0: Đất trống, 1..3: Nhà, 4: Khách sạn
  ownerUid: string | null
}

export type TileType = 'start' | 'property' | 'chance' | 'jail' | 'parking' | 'tax'

export interface Tile {
  id: number
  type: TileType
  name: string
  propertyId?: number
  icon?: string
}

export const MONOPOLY_PROPERTIES: Property[] = [
  { id: 0, name: 'Bến Ninh Kiều', city: 'Cần Thơ', color: '#a855f7', price: 100, baseRent: 15, housePrice: 50, houses: 0, ownerUid: null },
  { id: 1, name: 'Chợ Nổi Cái Răng', city: 'Cần Thơ', color: '#a855f7', price: 120, baseRent: 20, housePrice: 50, houses: 0, ownerUid: null },
  { id: 2, name: 'Bãi Sau', city: 'Vũng Tàu', color: '#06b6d4', price: 160, baseRent: 25, housePrice: 80, houses: 0, ownerUid: null },
  { id: 3, name: 'Mũi Nghinh Phong', city: 'Vũng Tàu', color: '#06b6d4', price: 180, baseRent: 30, housePrice: 80, houses: 0, ownerUid: null },
  { id: 4, name: 'Hồ Tuyền Lâm', city: 'Đà Lạt', color: '#10b981', price: 220, baseRent: 40, housePrice: 100, houses: 0, ownerUid: null },
  { id: 5, name: 'Thung Lũng Tình Yêu', city: 'Đà Lạt', color: '#10b981', price: 240, baseRent: 45, housePrice: 100, houses: 0, ownerUid: null },
  { id: 6, name: 'Cầu Rồng', city: 'Đà Nẵng', color: '#f59e0b', price: 280, baseRent: 55, housePrice: 130, houses: 0, ownerUid: null },
  { id: 7, name: 'Bán Đảo Sơn Trà', city: 'Đà Nẵng', color: '#f59e0b', price: 300, baseRent: 60, housePrice: 130, houses: 0, ownerUid: null },
  { id: 8, name: 'Phố Cổ Hội An', city: 'Quảng Nam', color: '#f97316', price: 340, baseRent: 70, housePrice: 150, houses: 0, ownerUid: null },
  { id: 9, name: 'Thánh Địa Mỹ Sơn', city: 'Quảng Nam', color: '#f97316', price: 360, baseRent: 75, housePrice: 150, houses: 0, ownerUid: null },
  { id: 10, name: 'Hồ Gươm', city: 'Hà Nội', color: '#ef4444', price: 400, baseRent: 90, housePrice: 180, houses: 0, ownerUid: null },
  { id: 11, name: 'Phố Cổ Hà Nội', city: 'Hà Nội', color: '#ef4444', price: 420, baseRent: 100, housePrice: 180, houses: 0, ownerUid: null },
  { id: 12, name: 'Phố Đi Bộ Nguyễn Huệ', city: 'Sài Gòn', color: '#ec4899', price: 480, baseRent: 120, housePrice: 200, houses: 0, ownerUid: null },
  { id: 13, name: 'Bến Bạch Đằng', city: 'Sài Gòn', color: '#ec4899', price: 500, baseRent: 140, housePrice: 200, houses: 0, ownerUid: null },
]

export const MONOPOLY_TILES: Tile[] = [
  { id: 0, type: 'start', name: 'Khởi Hành', icon: '🏁' },
  { id: 1, type: 'property', name: 'Bến Ninh Kiều', propertyId: 0 },
  { id: 2, type: 'chance', name: 'Cơ Hội', icon: '❓' },
  { id: 3, type: 'property', name: 'Chợ Nổi Cái Răng', propertyId: 1 },
  { id: 4, type: 'tax', name: 'Thuế Phí', icon: '💸' },
  { id: 5, type: 'jail', name: 'Vào Tù', icon: '⛓️' },
  { id: 6, type: 'property', name: 'Bãi Sau', propertyId: 2 },
  { id: 7, type: 'property', name: 'Mũi Nghinh Phong', propertyId: 3 },
  { id: 8, type: 'chance', name: 'Cơ Hội', icon: '❓' },
  { id: 9, type: 'property', name: 'Hồ Tuyền Lâm', propertyId: 4 },
  { id: 10, type: 'parking', name: 'Bãi Đỗ Xe', icon: '🚗' },
  { id: 11, type: 'property', name: 'Thung Lũng Tình Yêu', propertyId: 5 },
  { id: 12, type: 'property', name: 'Cầu Rồng', propertyId: 6 },
  { id: 13, type: 'property', name: 'Bán Đảo Sơn Trà', propertyId: 7 },
  { id: 14, type: 'chance', name: 'Cơ Hội', icon: '❓' },
  { id: 15, type: 'property', name: 'Phố Cổ Hội An', propertyId: 8 },
  { id: 16, type: 'property', name: 'Hồ Gươm', propertyId: 10 },
  { id: 17, type: 'tax', name: 'Thuế Siêu Giàu', icon: '🏛️' },
  { id: 18, type: 'property', name: 'Phố Đi Bộ Nguyễn Huệ', propertyId: 12 },
  { id: 19, type: 'property', name: 'Bến Bạch Đằng', propertyId: 13 },
]

export interface MonopolyPlayerState {
  uid: string
  name: string
  avatar: number
  money: number
  position: number // 0..19
  inJail: boolean
  jailTurns: number
  bankrupt: boolean
}

export interface MonopolyEventCard {
  type: 'chance' | 'tax' | 'jail' | 'go' | 'rent' | 'parking'
  title: string
  desc: string
  icon: string
  amount?: number
  playerUid: string
}

export interface MonopolyState {
  code: string
  phase: 'lobby' | 'playing' | 'over'
  order: string[]
  players: Record<string, MonopolyPlayerState>
  properties: Property[]
  currentTurn: string | null
  dice1: number | null
  dice2: number | null
  diceRolled: boolean
  canBuyProperty: boolean
  canUpgradeProperty: boolean
  lastEvent: MonopolyEventCard | null
  winner: string | null
  logs: Array<{ id: string; text: string; time: number }>
  turnEndsAt: number
  updatedAt: number
}

export async function monopolyStart(code: string, players: Record<string, Player>): Promise<void> {
  let uids = Object.keys(players).sort((a, b) => (players[a]?.joinedAt ?? 0) - (players[b]?.joinedAt ?? 0)).slice(0, 4)
  if (uids.length < 1) return

  // Nếu chỉ có 1 người chơi, tự động thêm 1 Bot AI
  if (uids.length === 1) {
    const botUid = `bot-monopoly-${Date.now()}`
    await store.set(paths.player(code, botUid), {
      uid: botUid,
      name: 'Bot Tỷ Phú 🎩',
      avatar: 4,
      alive: true,
      ready: true,
      joinedAt: Date.now() + 50,
    })
    uids = [...uids, botUid]
  }

  const pStates: Record<string, MonopolyPlayerState> = {}
  uids.forEach((uid) => {
    const p = players[uid]
    pStates[uid] = {
      uid,
      name: p?.name || (uid.startsWith('bot-') ? 'Bot Tỷ Phú 🎩' : 'Cơ thủ'),
      avatar: p?.avatar ?? 0,
      money: 1500,
      position: 0,
      inJail: false,
      jailTurns: 0,
      bankrupt: false,
    }
  })

  const state: MonopolyState = {
    code,
    phase: 'playing',
    order: uids,
    players: pStates,
    properties: JSON.parse(JSON.stringify(MONOPOLY_PROPERTIES)),
    currentTurn: uids[0],
    dice1: null,
    dice2: null,
    diceRolled: false,
    canBuyProperty: false,
    canUpgradeProperty: false,
    lastEvent: null,
    winner: null,
    logs: [
      { id: `start-${Date.now()}`, text: 'Ván Cờ Tỷ Phú Mini bắt đầu! Mỗi người nhận 1500$ vốn.', time: Date.now() },
    ],
    turnEndsAt: Date.now() + 35_000,
    updatedAt: Date.now(),
  }

  await store.set(paths.monopoly(code), state)
  await store.update(paths.meta(code), { phase: 'playing' })
}

/** Đổ xúc xắc di chuyển */
export async function monopolyRollDice(code: string, state: MonopolyState): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid || state.diceRolled) return
  const p = state.players[turnUid]
  if (!p || p.bankrupt) return

  const d1 = Math.floor(Math.random() * 6) + 1
  const d2 = Math.floor(Math.random() * 6) + 1
  const total = d1 + d2

  const logs = [...state.logs]
  logs.unshift({
    id: `dice-${Date.now()}`,
    text: `🎲 ${p.name} đổ được ${total} điểm (${d1} + ${d2})`,
    time: Date.now(),
  })

  // Nếu đang ở tù
  if (p.inJail) {
    if (d1 === d2) {
      p.inJail = false
      p.jailTurns = 0
      logs.unshift({ id: `jail-out-${Date.now()}`, text: `🎉 ${p.name} đổ được số đôi và được ra tù!`, time: Date.now() })
    } else {
      p.jailTurns += 1
      if (p.jailTurns >= 2) {
        p.inJail = false
        p.money = Math.max(0, p.money - 50)
        logs.unshift({ id: `jail-pay-${Date.now()}`, text: `⛓️ ${p.name} nộp 50$ tiền bảo lãnh để ra tù.`, time: Date.now() })
      } else {
        logs.unshift({ id: `jail-stay-${Date.now()}`, text: `⛓️ ${p.name} chưa đổ được đôi, tiếp tục ở tù lượt này.`, time: Date.now() })
        // Chuyển lượt
        await store.set(paths.monopoly(code), {
          ...state,
          dice1: d1,
          dice2: d2,
          diceRolled: true,
          logs: logs.slice(0, 35),
          updatedAt: Date.now(),
        })
        setTimeout(() => monopolyEndTurn(code), 1500)
        return
      }
    }
  }

  // Di chuyển trên bàn cờ 20 ô
  const oldPos = p.position
  const newPos = (oldPos + total) % 20
  p.position = newPos

  // Nếu đi qua ô Khởi Hành (GO)
  if (newPos < oldPos) {
    p.money += 200
    logs.unshift({ id: `go-${Date.now()}`, text: `🏁 ${p.name} đi qua ô Khởi Hành, nhận thưởng +200$`, time: Date.now() })
  }

  const currentTile = MONOPOLY_TILES[newPos]
  let canBuy = false
  let canUpgrade = false
  let eventCard: MonopolyEventCard | null = null

  // Xử lý sự kiện theo ô đáp xuống
  if (currentTile.type === 'property' && currentTile.propertyId !== undefined) {
    const prop = state.properties[currentTile.propertyId]
    if (!prop.ownerUid) {
      // Đất chưa có chủ: Có thể mua
      if (p.money >= prop.price) canBuy = true
    } else if (prop.ownerUid === turnUid) {
      // Đất của mình: Có thể nâng cấp nếu chưa đạt khách sạn (4)
      if (prop.houses < 4 && p.money >= prop.housePrice) canUpgrade = true
    } else {
      // Đất của đối thủ: Phải trả tiền thuê!
      const owner = state.players[prop.ownerUid]
      if (owner && !owner.bankrupt) {
        const rent = prop.baseRent * (1 + prop.houses * 1.5)
        const payAmount = Math.min(p.money, Math.round(rent))
        p.money -= payAmount
        owner.money += payAmount
        eventCard = {
          type: 'rent',
          title: `Trả Tiền Thuê Đất: ${prop.name}`,
          desc: `${p.name} đáp trúng khu đất của ${owner.name}, bị thu phí thuê ${payAmount}$!`,
          icon: '🏠',
          amount: -payAmount,
          playerUid: turnUid,
        }
        logs.unshift({
          id: `rent-${Date.now()}`,
          text: `🏠 ${p.name} trả ${payAmount}$ tiền thuê đất [${prop.name}] cho ${owner.name}!`,
          time: Date.now(),
        })

        // Kiểm tra phá sản
        if (p.money <= 0) {
          p.bankrupt = true
          logs.unshift({ id: `bankrupt-${Date.now()}`, text: `💀 ${p.name} ĐÃ PHÁ SẢN!`, time: Date.now() })
        }
      }
    }
  } else if (currentTile.type === 'jail') {
    p.inJail = true
    p.jailTurns = 0
    eventCard = {
      type: 'jail',
      title: 'Bị Bắt Vào Tù! 🚔',
      desc: `${p.name} bị cảnh sát tạm giam vì vi phạm quy định đô thị. Bị giữ chân 2 lượt!`,
      icon: '⛓️',
      amount: 0,
      playerUid: turnUid,
    }
    logs.unshift({ id: `to-jail-${Date.now()}`, text: `🚔 ${p.name} đạp trúng ô VÀO TÙ!`, time: Date.now() })
  } else if (currentTile.type === 'tax') {
    const tax = 100
    p.money = Math.max(0, p.money - tax)
    eventCard = {
      type: 'tax',
      title: `Nộp ${currentTile.name}`,
      desc: `${p.name} phải nộp ${tax}$ vào ngân sách kho bạc nhà nước!`,
      icon: '💸',
      amount: -tax,
      playerUid: turnUid,
    }
    logs.unshift({ id: `tax-${Date.now()}`, text: `💸 ${p.name} phải nộp thuế 100$ cho ngân hàng!`, time: Date.now() })
  } else if (currentTile.type === 'parking') {
    eventCard = {
      type: 'parking',
      title: 'Bãi Đỗ Xe Công Viên',
      desc: `${p.name} đỗ xe nghỉ ngơi thư giãn giữa đô thị náo nhiệt, không tốn đồng nào!`,
      icon: '🚗',
      amount: 0,
      playerUid: turnUid,
    }
    logs.unshift({ id: `parking-${Date.now()}`, text: `🚗 ${p.name} nghỉ ngơi tại Bãi Đỗ Xe`, time: Date.now() })
  } else if (currentTile.type === 'start') {
    eventCard = {
      type: 'go',
      title: 'Trạm Khởi Hành',
      desc: `Đáp trúng trạm Khởi Hành! Nhận thưởng khích lệ phát triển đô thị +200$!`,
      icon: '🏁',
      amount: 200,
      playerUid: turnUid,
    }
  } else if (currentTile.type === 'chance') {
    // Vận may ngẫu nhiên phong phú
    const CHANCE_POOL = [
      { title: 'Trúng Thưởng Dự Án', desc: 'Dự án bất động sản được duyệt, nhận thưởng 200$!', icon: '🎁', amount: 200 },
      { title: 'Cổ Phiếu Tăng Kịch Trần', desc: 'Danh mục chứng khoán xanh tím, chốt lãi rủng rỉnh 150$!', icon: '📈', amount: 150 },
      { title: 'Trúng Xổ Số Đặc Biệt', desc: 'Cầm trên tay tờ vé số độc đắc may mắn, lĩnh ngay 250$!', icon: '⭐', amount: 250 },
      { title: 'Sửa Chữa Bất Động Sản', desc: 'Cơn bão đi qua làm tốc mái khu biệt thự, tốn 100$ trùng tu!', icon: '🔨', amount: -100 },
      { title: 'Vi Phạm Giao Thông', desc: 'Phóng siêu xe quá tốc độ trên phố đi bộ, đóng phạt 80$!', icon: '🚦', amount: -80 },
      { title: 'Tiệc Sinh Nhật Đại Gia', desc: 'Các đối thủ gửi phong bì chúc mừng sinh nhật, nhận 120$!', icon: '🎂', amount: 120 },
      { title: 'Nghỉ Dưỡng Resort 5 Sao', desc: 'Tự thưởng chuyến du lịch xả hơi cao cấp, thanh toán 90$!', icon: '🏖️', amount: -90 },
    ]
    const chosen = CHANCE_POOL[Math.floor(Math.random() * CHANCE_POOL.length)]
    p.money = Math.max(0, p.money + chosen.amount)
    eventCard = {
      type: 'chance',
      title: chosen.title,
      desc: chosen.desc,
      icon: chosen.icon,
      amount: chosen.amount,
      playerUid: turnUid,
    }
    logs.unshift({
      id: `chance-${Date.now()}`,
      text: chosen.amount > 0 ? `🎁 Thẻ Cơ Hội [${chosen.title}]: ${p.name} nhận +${chosen.amount}$!` : `⚠️ Thẻ Cơ Hội [${chosen.title}]: ${p.name} mất ${Math.abs(chosen.amount)}$!`,
      time: Date.now(),
    })
  }

  // Kiểm tra thắng cuộc (chỉ còn 1 người không phá sản hoặc ai đạt 4000$)
  const activePlayers = Object.values(state.players).filter((pl) => !pl.bankrupt)
  const isOver = activePlayers.length <= 1 || Object.values(state.players).some((pl) => pl.money >= 4000)
  const winnerUid = isOver ? (activePlayers[0]?.uid || turnUid) : null

  await store.set(paths.monopoly(code), {
    ...state,
    phase: isOver ? 'over' : 'playing',
    winner: winnerUid,
    dice1: d1,
    dice2: d2,
    diceRolled: true,
    canBuyProperty: canBuy,
    canUpgradeProperty: canUpgrade,
    lastEvent: eventCard,
    logs: logs.slice(0, 35),
    updatedAt: Date.now(),
  })

  // Nếu không có hành động mua/nâng cấp, tự động cho phép kết thúc lượt
}

/** Mua đất */
export async function monopolyBuyProperty(code: string, state: MonopolyState): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid) return
  const p = state.players[turnUid]
  const tile = MONOPOLY_TILES[p.position]
  if (tile.type !== 'property' || tile.propertyId === undefined) return

  const prop = state.properties[tile.propertyId]
  if (prop.ownerUid || p.money < prop.price) return

  p.money -= prop.price
  prop.ownerUid = turnUid

  const logs = [
    {
      id: `buy-${Date.now()}`,
      text: `🏙️ ${p.name} đã mua bất động sản [${prop.name}] với giá ${prop.price}$!`,
      time: Date.now(),
    },
    ...state.logs,
  ]

  await store.set(paths.monopoly(code), {
    ...state,
    canBuyProperty: false,
    logs: logs.slice(0, 35),
    updatedAt: Date.now(),
  })
}

/** Nâng cấp nhà / khách sạn */
export async function monopolyUpgradeProperty(code: string, state: MonopolyState): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid) return
  const p = state.players[turnUid]
  const tile = MONOPOLY_TILES[p.position]
  if (tile.type !== 'property' || tile.propertyId === undefined) return

  const prop = state.properties[tile.propertyId]
  if (prop.ownerUid !== turnUid || prop.houses >= 4 || p.money < prop.housePrice) return

  p.money -= prop.housePrice
  prop.houses += 1

  const logs = [
    {
      id: `upgrade-${Date.now()}`,
      text: `🏰 ${p.name} đã nâng cấp [${prop.name}] lên ${prop.houses === 4 ? 'Khách Sạn' : `${prop.houses} Sao`}!`,
      time: Date.now(),
    },
    ...state.logs,
  ]

  await store.set(paths.monopoly(code), {
    ...state,
    canUpgradeProperty: false,
    logs: logs.slice(0, 35),
    updatedAt: Date.now(),
  })
}

/** Chuyển lượt */
export async function monopolyEndTurn(code: string): Promise<void> {
  const cur = await store.get<MonopolyState>(paths.monopoly(code))
  if (!cur || !cur.currentTurn) return

  const activeOrder = cur.order.filter((uid) => !cur.players[uid]?.bankrupt)
  const curIdx = activeOrder.indexOf(cur.currentTurn)
  const nextUid = activeOrder[(curIdx + 1) % activeOrder.length]

  await store.set(paths.monopoly(code), {
    ...cur,
    currentTurn: nextUid,
    dice1: null,
    dice2: null,
    diceRolled: false,
    canBuyProperty: false,
    canUpgradeProperty: false,
    lastEvent: null,
    turnEndsAt: Date.now() + 35_000,
    updatedAt: Date.now(),
  })
}

/** Conductor Tick loop: Tự động đổi lượt & Bot AI tự chơi */
export async function monopolyTick(code: string, state: MonopolyState, now: number): Promise<boolean> {
  if (state.phase !== 'playing' || !state.currentTurn) return false

  // 1. Tự động xử lý cho BOT AI
  if (state.currentTurn.startsWith('bot-')) {
    const botUid = state.currentTurn
    const p = state.players[botUid]
    if (!p) return false

    // Bot chưa đổ xúc xắc -> Đổ xúc xắc
    if (!state.diceRolled) {
      await monopolyRollDice(code, state)
      return true
    }

    // Bot đã đổ xúc xắc -> Mua đất hoặc nâng cấp nếu có tiền
    if (state.diceRolled) {
      if (state.canBuyProperty) {
        await monopolyBuyProperty(code, state)
        return true
      }
      if (state.canUpgradeProperty && p.money >= 350) {
        await monopolyUpgradeProperty(code, state)
        return true
      }
      // Kết thúc lượt của Bot
      await monopolyEndTurn(code)
      return true
    }
  }

  // 2. Hết giờ -> Tự động chuyển lượt
  if (state.turnEndsAt && now > state.turnEndsAt) {
    await monopolyEndTurn(code)
    return true
  }
  return false
}
