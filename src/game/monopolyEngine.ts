import { paths, store } from '../lib/store'
import type { Player } from './types'

export type TileCategory =
  | 'start'
  | 'property'
  | 'chance'
  | 'fortune'
  | 'jail'
  | 'parking'
  | 'tax'
  | 'special_airport'
  | 'utility'
  | 'gift'

export interface Property {
  id: number
  name: string
  city: string
  color: string
  price: number
  baseRent: number
  housePrice: number
  houses: number // 0: Đất trống, 1: Nhà cấp 4, 2: Nhà 2 tầng, 3: Biệt thự, 4: Khách sạn 5 sao
  ownerUid: string | null
  mortgaged?: boolean // Có đang cầm cố sổ đỏ không
  powerCut?: boolean // Đang bị cắt điện/nước (thu 50% tiền thuê)
}

export interface Tile {
  id: number
  type: TileCategory
  name: string
  propertyId?: number
  icon?: string
  sub?: string
  price?: number
}

// 4 Linh vật may mắn phong cách Lên Đời
export interface Mascot {
  id: number
  name: string
  symbol: string
  title: string
  color: string
  bg: string
}

export const MASCOTS: Mascot[] = [
  { id: 0, name: 'Rồng Thần Tài', symbol: '🐲', title: 'Hoàng Kim May Mắn', color: '#f59e0b', bg: 'from-amber-500 to-yellow-600' },
  { id: 1, name: 'Hổ Bá Đạo', symbol: '🐯', title: 'Quyết Đoán Máu Lửa', color: '#ef4444', bg: 'from-red-500 to-rose-600' },
  { id: 2, name: 'Gà Siêu Đẳng', symbol: '🐔', title: 'Chăm Chỉ Tích Sản', color: '#3b82f6', bg: 'from-blue-500 to-indigo-600' },
  { id: 3, name: 'Khỉ Tinh Nghịch', symbol: '🐵', title: 'Nhanh Nhẹn Đổi Vận', color: '#10b981', bg: 'from-emerald-500 to-teal-600' },
]

// 20 Bất Động Sản khắp các tỉnh thành Việt Nam (Chỉ 1 sân bay quốc tế, bổ sung Vũng Tàu, Phú Quốc)
export const MONOPOLY_PROPERTIES: Property[] = [
  // Miền Tây & Đông Nam Bộ
  { id: 0, name: 'An Giang', city: 'Miền Tây', color: '#a27b5c', price: 60, baseRent: 10, housePrice: 50, houses: 0, ownerUid: null },
  { id: 1, name: 'Cà Mau', city: 'Đất Mũi', color: '#a27b5c', price: 80, baseRent: 12, housePrice: 50, houses: 0, ownerUid: null },
  { id: 2, name: 'Vũng Tàu', city: 'Bãi Sau', color: '#0284c7', price: 110, baseRent: 18, housePrice: 60, houses: 0, ownerUid: null },
  { id: 3, name: 'Bến Ninh Kiều', city: 'Cần Thơ', color: '#8b5cf6', price: 120, baseRent: 20, housePrice: 60, houses: 0, ownerUid: null },
  { id: 4, name: 'Buôn Ma Thuột', city: 'Đắk Lắk', color: '#0ea5e9', price: 140, baseRent: 24, housePrice: 80, houses: 0, ownerUid: null },

  // Tây Nguyên & Duyên Hải Nam Trung Bộ
  { id: 5, name: 'Thung Lũng TY', city: 'Đà Lạt', color: '#0ea5e9', price: 150, baseRent: 26, housePrice: 80, houses: 0, ownerUid: null },
  { id: 6, name: 'Langbiang', city: 'Đà Lạt', color: '#0ea5e9', price: 160, baseRent: 28, housePrice: 80, houses: 0, ownerUid: null },
  { id: 7, name: 'Mũi Né', city: 'Phan Thiết', color: '#f97316', price: 180, baseRent: 32, housePrice: 100, houses: 0, ownerUid: null },
  { id: 8, name: 'Nha Trang', city: 'Khánh Hòa', color: '#f97316', price: 200, baseRent: 36, housePrice: 100, houses: 0, ownerUid: null },

  // Miền Trung Di Sản & Đảo Ngọc
  { id: 9, name: 'Cố Đô Huế', city: 'Thừa Thiên Huế', color: '#dc2626', price: 220, baseRent: 40, housePrice: 120, houses: 0, ownerUid: null },
  { id: 10, name: 'Phong Nha', city: 'Quảng Bình', color: '#dc2626', price: 220, baseRent: 40, housePrice: 120, houses: 0, ownerUid: null },
  { id: 11, name: 'Phố Cổ Hội An', city: 'Quảng Nam', color: '#dc2626', price: 240, baseRent: 44, housePrice: 120, houses: 0, ownerUid: null },
  { id: 12, name: 'Phú Quốc', city: 'Kiên Giang', color: '#eab308', price: 250, baseRent: 48, housePrice: 140, houses: 0, ownerUid: null },
  { id: 13, name: 'Cầu Rồng', city: 'Đà Nẵng', color: '#eab308', price: 260, baseRent: 50, housePrice: 140, houses: 0, ownerUid: null },
  { id: 14, name: 'Bán Đảo Sơn Trà', city: 'Đà Nẵng', color: '#eab308', price: 280, baseRent: 55, housePrice: 140, houses: 0, ownerUid: null },

  // Miền Bắc & Thủ Đô Hà Nội
  { id: 15, name: 'Sa Pa', city: 'Lào Cai', color: '#ec4899', price: 300, baseRent: 60, housePrice: 160, houses: 0, ownerUid: null },
  { id: 16, name: 'Vịnh Hạ Long', city: 'Quảng Ninh', color: '#06b6d4', price: 320, baseRent: 65, housePrice: 160, houses: 0, ownerUid: null },
  { id: 17, name: 'Phố Cổ Hà Nội', city: 'Hà Nội', color: '#10b981', price: 350, baseRent: 75, housePrice: 180, houses: 0, ownerUid: null },
  { id: 18, name: 'Hồ Gươm', city: 'Hà Nội', color: '#10b981', price: 360, baseRent: 80, housePrice: 180, houses: 0, ownerUid: null },

  // TP. Hồ Chí Minh
  { id: 19, name: 'Landmark 81', city: 'TP. HCM', color: '#a855f7', price: 450, baseRent: 110, housePrice: 220, houses: 0, ownerUid: null },
]

// BÀN CỜ 32 Ô CHUẨN VIỆT NAM (LƯỚI 9x9 - DUY NHẤT 1 SÂN BAY Ở Ô 24)
export const MONOPOLY_TILES: Tile[] = [
  // CẠNH DƯỚI (Ô 0 -> Ô 7, góc [8,8] sang trái)
  { id: 0, type: 'start', name: 'Khởi Hành', icon: '🏁', sub: '+200$' },
  { id: 1, type: 'property', name: 'An Giang', propertyId: 0, sub: '60$' },
  { id: 2, type: 'fortune', name: 'Khí Vận', icon: '📜', sub: 'May rủi' },
  { id: 3, type: 'property', name: 'Cà Mau', propertyId: 1, sub: '80$' },
  { id: 4, type: 'tax', name: 'Thuế Phí', icon: '💸', sub: '-75$' },
  { id: 5, type: 'property', name: 'Vũng Tàu', propertyId: 2, sub: '110$' },
  { id: 6, type: 'property', name: 'Ninh Kiều', propertyId: 3, sub: '120$' },
  { id: 7, type: 'property', name: 'Buôn Ma Thuột', propertyId: 4, sub: '140$' },

  // CẠNH TRÁI (Ô 8 -> Ô 15, góc [0,8] lên trên)
  { id: 8, type: 'jail', name: 'Đảo Hoang', icon: '🏝️', sub: 'Tạm giam' },
  { id: 9, type: 'property', name: 'Thung Lũng TY', propertyId: 5, sub: '150$' },
  { id: 10, type: 'utility', name: 'Điện Lực EVN', icon: '💡', sub: 'Tiện ích' },
  { id: 11, type: 'property', name: 'Langbiang', propertyId: 6, sub: '160$' },
  { id: 12, type: 'property', name: 'Mũi Né', propertyId: 7, sub: '180$' },
  { id: 13, type: 'chance', name: 'Cơ Hội', icon: '✨', sub: 'Bất ngờ' },
  { id: 14, type: 'property', name: 'Nha Trang', propertyId: 8, sub: '200$' },
  { id: 15, type: 'property', name: 'Cố Đô Huế', propertyId: 9, sub: '220$' },

  // CẠNH TRÊN (Ô 16 -> Ô 23, góc [0,0] sang phải)
  { id: 16, type: 'parking', name: 'Vườn Thú', icon: '🦁', sub: 'Nghỉ dưỡng' },
  { id: 17, type: 'property', name: 'Phong Nha', propertyId: 10, sub: '220$' },
  { id: 18, type: 'fortune', name: 'Khí Vận', icon: '📜', sub: 'May rủi' },
  { id: 19, type: 'property', name: 'Hội An', propertyId: 11, sub: '240$' },
  { id: 20, type: 'property', name: 'Phú Quốc', propertyId: 12, sub: '250$' },
  { id: 21, type: 'property', name: 'Cầu Rồng', propertyId: 13, sub: '260$' },
  { id: 22, type: 'property', name: 'Sơn Trà', propertyId: 14, sub: '280$' },
  { id: 23, type: 'property', name: 'Sa Pa', propertyId: 15, sub: '300$' },

  // CẠNH PHẢI (Ô 24 -> Ô 31, góc [8,0] xuống dưới)
  { id: 24, type: 'special_airport', name: 'Sân Bay', icon: '🛫', sub: 'Bay toàn cầu' },
  { id: 25, type: 'utility', name: 'Nhà Máy Nước', icon: '💧', sub: 'Tiện ích' },
  { id: 26, type: 'property', name: 'Hạ Long', propertyId: 16, sub: '320$' },
  { id: 27, type: 'chance', name: 'Cơ Hội', icon: '✨', sub: 'Bất ngờ' },
  { id: 28, type: 'property', name: 'Phố Cổ HN', propertyId: 17, sub: '350$' },
  { id: 29, type: 'gift', name: 'Hộp Quà', icon: '🎁', sub: 'Bí ẩn' },
  { id: 30, type: 'property', name: 'Hồ Gươm', propertyId: 18, sub: '360$' },
  { id: 31, type: 'property', name: 'Landmark 81', propertyId: 19, sub: '450$' },
]

// TỌA ĐỘ 32 Ô TRÊN LƯỚI 9x9 (col, row từ 0 đến 8)
export const MONOPOLY_COORDS_32: Array<[number, number]> = [
  // Cạnh dưới (Từ góc phải [8,8] sang góc trái [0,8])
  [8, 8], // 0: Start
  [7, 8], // 1
  [6, 8], // 2
  [5, 8], // 3
  [4, 8], // 4
  [3, 8], // 5
  [2, 8], // 6
  [1, 8], // 7

  // Cạnh trái (Từ góc dưới [0,8] lên góc trên [0,0])
  [0, 8], // 8: Đảo hoang
  [0, 7], // 9
  [0, 6], // 10
  [0, 5], // 11
  [0, 4], // 12
  [0, 3], // 13
  [0, 2], // 14
  [0, 1], // 15

  // Cạnh trên (Từ góc trái [0,0] sang góc phải [8,0])
  [0, 0], // 16: Vườn thú
  [1, 0], // 17
  [2, 0], // 18
  [3, 0], // 19
  [4, 0], // 20
  [5, 0], // 21
  [6, 0], // 22
  [7, 0], // 23

  // Cạnh phải (Từ góc trên [8,0] xuống góc dưới [8,8])
  [8, 0], // 24: Sân bay quốc tế duy nhất
  [8, 1], // 25
  [8, 2], // 26
  [8, 3], // 27
  [8, 4], // 28
  [8, 5], // 29
  [8, 6], // 30
  [8, 7], // 31
]

export interface MonopolyPlayerState {
  uid: string
  name: string
  avatar: number
  mascotIndex: number // 0: Rồng, 1: Hổ, 2: Gà, 3: Khỉ
  money: number
  position: number // 0..31
  inJail: boolean
  jailTurns: number
  bankrupt: boolean
  powerCutCooldown?: number
  netWorth?: number // Tổng tài sản: Tiền mặt + Giá trị đất + Nhà
}

export interface MonopolyEventCard {
  type: 'chance' | 'fortune' | 'tax' | 'jail' | 'go' | 'rent' | 'parking' | 'airport' | 'gift' | 'utility'
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
  canFlyAirport?: boolean // Quyền chọn ô bay sân bay
  lastEvent: MonopolyEventCard | null
  winner: string | null
  logs: Array<{ id: string; text: string; time: number }>
  turnEndsAt: number
  updatedAt: number
}

// KHO THẺ CƠ HỘI & KHÍ VẬN ĐẬM CHẤT ĐỜI SỐNG VIỆT NAM (30+ sự kiện)
export const CHANCE_CARDS = [
  { title: 'Trúng Xổ Số Vietlott', desc: 'Tờ vé số mua vỉa hè trúng giải nhì đặc biệt! Lĩnh ngay 250$!', icon: '🎰', amount: 250 },
  { title: 'Cổ Phiếu Tím Trần', desc: 'Thị trường chứng khoán thăng hoa, tài khoản xanh tím chốt lời 200$!', icon: '📈', amount: 200 },
  { title: 'Thưởng Tết Tháng 13', desc: 'Công ty làm ăn phát đạt, sếp thưởng nóng tháng lương 13 trị giá 180$!', icon: '🧧', amount: 180 },
  { title: 'Đất Lên Cơn Sốt Ảo', desc: 'Quy hoạch đường vành đai vừa công bố, khu đất bạn đứng nhận hỗ trợ 150$!', icon: '🏙️', amount: 150 },
  { title: 'Quán Ăn Nhận Sao Michelin', desc: 'Quán phở gia truyền được báo quốc tế khen nức nở, doanh thu bùng nổ +120$!', icon: '⭐', amount: 120 },
  { title: 'Dự Án Khởi Nghiệp Gọi Vốn', desc: 'Bản thuyết trình ấn tượng trước các Shark, nhận giải ngân 160$!', icon: '🚀', amount: 160 },
  { title: 'Kiều Hối Gửi Về', desc: 'Bà con phương xa gửi quà mừng năm mới sum vầy, nhận 100$!', icon: '🎁', amount: 100 },
  { title: 'Thu Tiền Bản Quyền Nhạc', desc: 'Bài hát sáng tác lọt Top 1 Trending TikTok, nhận tiền tác quyền 110$!', icon: '🎵', amount: 110 },
]

export const FORTUNE_CARDS = [
  { title: 'Bị Phạt Nồng Độ Cồn', desc: 'Uống vài lon bia rồi lái xe máy, bị các chú áo vàng thổi kịch khung! Đóng phạt 150$!', icon: '🚦', amount: -150 },
  { title: 'Đi Phong Bì Cưới Bạn Thân', desc: 'Tháng này có 4 cái thiệp cưới dồn dập, ví tiền vơi đi một khoản 120$!', icon: '💌', amount: -120 },
  { title: 'Săn Sale Shopee 11/11', desc: 'Thức khuya áp mã giảm giá mà quên bấm giỏ hàng, vung tay quá trán 90$!', icon: '🛍️', amount: -90 },
  { title: 'Ngập Nước Sau Mưa Rào', desc: 'Đường phố ngập lút bánh xe, phải gọi xe cứu hộ kéo về xưởng tốn 100$!', icon: '🌊', amount: -100 },
  { title: 'Trùng Tu Biệt Thự', desc: 'Cơn bão đi qua làm tốc tôn mái nhà, chi phí gọi thợ sửa chữa mất 80$!', icon: '🔨', amount: -80 },
  { title: 'Quên Tắt Điều Hòa Suốt Tháng', desc: 'Hóa đơn tiền điện mùa nắng nóng tăng vọt ngỡ ngàng, nộp phạt 70$!', icon: '⚡', amount: -70 },
  { title: 'Lái Xe Quá Tốc Độ', desc: 'Vội đến buổi hẹn ký hợp đồng nên đạp nhầm chân ga, camera phạt nguội 110$!', icon: '📸', amount: -110 },
  { title: 'Bị Đòi Nợ Cũ', desc: 'Bạn thân ngày xưa bỗng dưng nhắn tin đòi lại món nợ ăn liên hoan, thanh toán 60$!', icon: '💬', amount: -60 },
]

/** Tính tổng tài sản người chơi (Net Worth) */
export function calculateNetWorth(p: MonopolyPlayerState, properties: Property[]): number {
  if (p.bankrupt) return 0
  let total = p.money
  properties.forEach((prop) => {
    if (prop.ownerUid === p.uid) {
      total += prop.price + prop.houses * prop.housePrice
    }
  })
  return total
}

/** Khởi động ván chơi mới */
export async function monopolyStart(code: string, players: Record<string, Player>): Promise<void> {
  let uids = Object.keys(players).sort((a, b) => (players[a]?.joinedAt ?? 0) - (players[b]?.joinedAt ?? 0)).slice(0, 4)
  if (uids.length < 1) return

  // Nếu chỉ có 1 người, thêm Bot AI để chơi cùng
  if (uids.length === 1) {
    const botUid = `bot-monopoly-${Date.now()}`
    await store.set(paths.player(code, botUid), {
      uid: botUid,
      name: 'Bot Thần Tài 🐲',
      avatar: 1,
      alive: true,
      ready: true,
      joinedAt: Date.now() + 50,
    })
    uids = [...uids, botUid]
  }

  const pStates: Record<string, MonopolyPlayerState> = {}
  uids.forEach((uid, idx) => {
    const p = players[uid]
    pStates[uid] = {
      uid,
      name: p?.name || (uid.startsWith('bot-') ? 'Bot Thần Tài 🐲' : `Cơ thủ ${idx + 1}`),
      avatar: p?.avatar ?? idx,
      mascotIndex: idx % MASCOTS.length,
      money: 1600,
      position: 0,
      inJail: false,
      jailTurns: 0,
      bankrupt: false,
      netWorth: 1600,
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
    canFlyAirport: false,
    lastEvent: null,
    winner: null,
    logs: [
      { id: `start-${Date.now()}`, text: '🎲 Đại tiệc Cờ Tỷ Phú 32 Ô bắt đầu! Mỗi người nhận 1600$ khởi nghiệp.', time: Date.now() },
    ],
    turnEndsAt: Date.now() + 35_000,
    updatedAt: Date.now(),
  }

  await store.set(paths.monopoly(code), state)
  await store.update(paths.meta(code), { phase: 'playing' })
}

/** Đổ xúc xắc di chuyển trên bàn cờ 32 ô */
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

  // Nếu đang ở đảo hoang
  if (p.inJail) {
    if (d1 === d2) {
      p.inJail = false
      p.jailTurns = 0
      logs.unshift({ id: `jail-out-${Date.now()}`, text: `🎉 ${p.name} đổ được số đôi (${d1}=${d2}) và thoát khỏi Đảo Hoang!`, time: Date.now() })
    } else {
      p.jailTurns += 1
      if (p.jailTurns >= 2) {
        p.inJail = false
        p.money = Math.max(0, p.money - 50)
        logs.unshift({ id: `jail-pay-${Date.now()}`, text: `🏝️ ${p.name} chi 50$ thuê tàu rời Đảo Hoang trở lại đất liền!`, time: Date.now() })
      } else {
        logs.unshift({ id: `jail-stay-${Date.now()}`, text: `🏝️ ${p.name} chưa đổ được đôi, tiếp tục nghỉ ngơi tại Đảo Hoang lượt này.`, time: Date.now() })
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

  // Di chuyển trên bàn cờ 32 ô
  const oldPos = p.position
  const newPos = (oldPos + total) % 32
  p.position = newPos

  // Nếu đi qua ô Khởi Hành (GO)
  if (newPos < oldPos) {
    p.money += 200
    logs.unshift({ id: `go-${Date.now()}`, text: `🏁 ${p.name} cán mốc Khởi Hành, nhận thưởng kích cầu +200$`, time: Date.now() })
  }

  const currentTile = MONOPOLY_TILES[newPos]
  let canBuy = false
  let canUpgrade = false
  let canFly = false
  let eventCard: MonopolyEventCard | null = null

  // 1. Ô Bất Động Sản (Địa danh)
  if (currentTile.type === 'property' && currentTile.propertyId !== undefined) {
    const prop = state.properties[currentTile.propertyId]
    if (prop) {
      if (!prop.ownerUid) {
        // Đất chưa có chủ: Có thể mua
        if (p.money >= prop.price) canBuy = true
      } else if (prop.ownerUid === turnUid) {
        // Đất của mình: Có thể nâng cấp nếu chưa đạt khách sạn 5 sao (4)
        if (prop.houses < 4 && p.money >= prop.housePrice) canUpgrade = true
      } else {
        // Đất của đối thủ: Thu tiền thuê
        const owner = state.players[prop.ownerUid]
        if (owner && !owner.bankrupt && !prop.mortgaged) {
          let rent = prop.baseRent * (1 + prop.houses * 1.6)
          if (prop.powerCut) rent = rent * 0.5
          const payAmount = Math.min(p.money, Math.round(rent))
          p.money -= payAmount
          owner.money += payAmount

          eventCard = {
            type: 'rent',
            title: `Thu Thuê Đất: ${prop.name}`,
            desc: `${p.name} bước vào lãnh địa của ${owner.name}! Trả phí thuê ${payAmount}$!`,
            icon: '🏠',
            amount: -payAmount,
            playerUid: turnUid,
          }

          logs.unshift({
            id: `rent-${Date.now()}`,
            text: `🏠 ${p.name} trả ${payAmount}$ tiền thuê đất [${prop.name}] cho ${owner.name}!`,
            time: Date.now(),
          })

          if (p.money <= 0) {
            p.bankrupt = true
            logs.unshift({ id: `bankrupt-${Date.now()}`, text: `💀 ${p.name} KHÔNG ĐỦ TIỀN TRẢ NỢ VÀ ĐÃ PHÁ SẢN!`, time: Date.now() })
          }
        }
      }
    }
  }

  // 2. Ô Đảo Hoang (Tạm giam)
  else if (currentTile.type === 'jail') {
    p.inJail = true
    p.jailTurns = 0
    eventCard = {
      type: 'jail',
      title: 'Dừng Chân Tại Đảo Hoang 🏝️',
      desc: `${p.name} lạc vào Đảo Hoang hoang sơ! Cần đổ xúc xắc ra số đôi hoặc chi 50$ để rời đảo.`,
      icon: '🏝️',
      amount: 0,
      playerUid: turnUid,
    }
    logs.unshift({ id: `to-jail-${Date.now()}`, text: `🏝️ ${p.name} dừng chân tại Đảo Hoang!`, time: Date.now() })
  }

  // 3. Ô Sân Bay Quốc Tế DUY NHẤT (Bay tự do)
  else if (currentTile.type === 'special_airport') {
    canFly = true
    eventCard = {
      type: 'airport',
      title: 'Sân Bay Quốc Tế 🛫',
      desc: `${p.name} đến trạm Sân Bay Quốc Tế! Bạn được quyền bay chuyển chặng đến bất kỳ ô nào trên bàn cờ.`,
      icon: '🛫',
      amount: 0,
      playerUid: turnUid,
    }
    logs.unshift({ id: `airport-${Date.now()}`, text: `🛫 ${p.name} dừng chân tại Sân Bay Quốc Tế, sẵn sàng bay chuyển chặng!`, time: Date.now() })
  }

  // 4. Ô Tiện Ích (Điện Lực / Nhà Máy Nước)
  else if (currentTile.type === 'utility') {
    const fee = 60
    p.money = Math.max(0, p.money - fee)
    eventCard = {
      type: 'utility',
      title: `Thanh Toán Dịch Vụ: ${currentTile.name}`,
      desc: `${p.name} nộp phí bảo trì hệ thống điện nước đô thị 60$.`,
      icon: currentTile.icon || '💡',
      amount: -fee,
      playerUid: turnUid,
    }
    logs.unshift({ id: `utility-${Date.now()}`, text: `💡 ${p.name} nộp 60$ phí tiện ích cho ${currentTile.name}`, time: Date.now() })
  }

  // 5. Ô Thuế Môi Trường
  else if (currentTile.type === 'tax') {
    const tax = 75
    p.money = Math.max(0, p.money - tax)
    eventCard = {
      type: 'tax',
      title: 'Đóng Thuế Đô Thị',
      desc: `${p.name} nộp 75$ vào ngân sách phát triển xanh của thành phố!`,
      icon: '💸',
      amount: -tax,
      playerUid: turnUid,
    }
    logs.unshift({ id: `tax-${Date.now()}`, text: `💸 ${p.name} nộp thuế 75$ cho thành phố!`, time: Date.now() })
  }

  // 6. Ô Vườn Thú Safari (Nghỉ mát / Parking)
  else if (currentTile.type === 'parking') {
    eventCard = {
      type: 'parking',
      title: 'Vườn Thú Safari & Check-in',
      desc: `${p.name} thư giãn ngắm cảnh cùng các chú thú dễ thương, nghỉ ngơi miễn phí không tốn một xu!`,
      icon: '🦁',
      amount: 0,
      playerUid: turnUid,
    }
    logs.unshift({ id: `park-${Date.now()}`, text: `🦁 ${p.name} nghỉ ngơi ngắm cảnh tại Vườn Thú Safari!`, time: Date.now() })
  }

  // 7. Ô Hộp Quà Bí Ẩn (Gift)
  else if (currentTile.type === 'gift') {
    const giftAmount = (Math.floor(Math.random() * 5) + 1) * 40 // 40..200
    p.money += giftAmount
    eventCard = {
      type: 'gift',
      title: 'Mở Hộp Quà Bí Ẩn! 🎁',
      desc: `Chúc mừng ${p.name} mở được hộp quà may mắn, nhận ngay +${giftAmount}$ tiền mặt!`,
      icon: '🎁',
      amount: giftAmount,
      playerUid: turnUid,
    }
    logs.unshift({ id: `gift-${Date.now()}`, text: `🎁 ${p.name} mở Hộp Quà Bí Ẩn nhận thưởng nóng +${giftAmount}$!`, time: Date.now() })
  }

  // 8. Thẻ Cơ Hội (Chance)
  else if (currentTile.type === 'chance') {
    const chosen = CHANCE_CARDS[Math.floor(Math.random() * CHANCE_CARDS.length)]
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
      text: `✨ Thẻ Cơ Hội [${chosen.title}]: ${p.name} nhận +${chosen.amount}$!`,
      time: Date.now(),
    })
  }

  // 9. Thẻ Khí Vận (Fortune)
  else if (currentTile.type === 'fortune') {
    const chosen = FORTUNE_CARDS[Math.floor(Math.random() * FORTUNE_CARDS.length)]
    p.money = Math.max(0, p.money + chosen.amount)
    eventCard = {
      type: 'fortune',
      title: chosen.title,
      desc: chosen.desc,
      icon: chosen.icon,
      amount: chosen.amount,
      playerUid: turnUid,
    }
    logs.unshift({
      id: `fortune-${Date.now()}`,
      text: `📜 Thẻ Khí Vận [${chosen.title}]: ${p.name} mất ${Math.abs(chosen.amount)}$!`,
      time: Date.now(),
    })
  }

  // Cập nhật lại Net Worth
  Object.values(state.players).forEach((pl) => {
    pl.netWorth = calculateNetWorth(pl, state.properties)
  })

  // Kiểm tra thắng cuộc: còn 1 người sống sót hoặc ai đạt 5000$ tổng tài sản
  const activePlayers = Object.values(state.players).filter((pl) => !pl.bankrupt)
  const isOver = activePlayers.length <= 1 || Object.values(state.players).some((pl) => (pl.netWorth || 0) >= 5000)
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
    canFlyAirport: canFly,
    lastEvent: eventCard,
    logs: logs.slice(0, 35),
    updatedAt: Date.now(),
  })
}

/** Bay đến ô bất kỳ qua Sân Bay */
export async function monopolyFlyToTile(code: string, state: MonopolyState, targetTileIndex: number): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid) return
  const p = state.players[turnUid]
  if (!p || p.bankrupt) return

  const oldPos = p.position
  p.position = targetTileIndex % 32

  const targetTile = MONOPOLY_TILES[p.position]
  const logs = [
    {
      id: `fly-${Date.now()}`,
      text: `🛫 ${p.name} bay thẳng từ ô ${oldPos} sang [${targetTile.name}]!`,
      time: Date.now(),
    },
    ...state.logs,
  ]

  let canBuy = false
  let canUpgrade = false
  if (targetTile.type === 'property' && targetTile.propertyId !== undefined) {
    const prop = state.properties[targetTile.propertyId]
    if (prop) {
      if (!prop.ownerUid && p.money >= prop.price) canBuy = true
      else if (prop.ownerUid === turnUid && prop.houses < 4 && p.money >= prop.housePrice) canUpgrade = true
    }
  }

  await store.set(paths.monopoly(code), {
    ...state,
    canFlyAirport: false,
    canBuyProperty: canBuy,
    canUpgradeProperty: canUpgrade,
    logs: logs.slice(0, 35),
    updatedAt: Date.now(),
  })
}

/** Mua đất */
export async function monopolyBuyProperty(code: string, state: MonopolyState): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid) return
  const p = state.players[turnUid]
  const tile = MONOPOLY_TILES[p.position]
  if (tile.type !== 'property' || tile.propertyId === undefined) return

  const prop = state.properties[tile.propertyId]
  if (!prop || prop.ownerUid || p.money < prop.price) return

  p.money -= prop.price
  prop.ownerUid = turnUid
  p.netWorth = calculateNetWorth(p, state.properties)

  const logs = [
    {
      id: `buy-${Date.now()}`,
      text: `🏙️ ${p.name} sở hữu bất động sản [${prop.name}] (${prop.city}) với giá ${prop.price}$!`,
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

/** Nâng cấp nhà / Khách sạn 5 sao */
export async function monopolyUpgradeProperty(code: string, state: MonopolyState, targetPropId?: number): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid) return
  const p = state.players[turnUid]

  let prop: Property | undefined
  if (targetPropId !== undefined) {
    prop = state.properties[targetPropId]
  } else {
    const tile = MONOPOLY_TILES[p.position]
    if (tile.type === 'property' && tile.propertyId !== undefined) {
      prop = state.properties[tile.propertyId]
    }
  }

  if (!prop || prop.ownerUid !== turnUid || prop.houses >= 4 || p.money < prop.housePrice) return

  p.money -= prop.housePrice
  prop.houses += 1
  p.netWorth = calculateNetWorth(p, state.properties)

  const houseNames = ['Đất Trống', 'Nhà Cấp 4 🏡', 'Nhà 2 Tầng 🏢', 'Biệt Thự 🏰', 'Khách Sạn 5 Sao 👑']
  const logs = [
    {
      id: `upgrade-${Date.now()}`,
      text: `🏰 ${p.name} cất nóc nâng cấp [${prop.name}] lên ${houseNames[prop.houses]}!`,
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

/** Cầm cố bất động sản để lấy 50% tiền mặt cứu nguy */
export async function monopolyMortgageProperty(code: string, state: MonopolyState, propId: number): Promise<void> {
  const turnUid = state.currentTurn
  if (!turnUid) return
  const p = state.players[turnUid]
  const prop = state.properties[propId]
  if (!prop || prop.ownerUid !== turnUid || prop.mortgaged) return

  const cash = Math.round(prop.price * 0.5)
  prop.mortgaged = true
  p.money += cash
  p.bankrupt = false
  p.netWorth = calculateNetWorth(p, state.properties)

  const logs = [
    {
      id: `mortgage-${Date.now()}`,
      text: `📜 ${p.name} thế chấp sổ đỏ [${prop.name}] nhận ngay ${cash}$ tiền mặt cứu nguy!`,
      time: Date.now(),
    },
    ...state.logs,
  ]

  await store.set(paths.monopoly(code), {
    ...state,
    logs: logs.slice(0, 35),
    updatedAt: Date.now(),
  })
}

/** Chuyển lượt */
export async function monopolyEndTurn(code: string): Promise<void> {
  const cur = await store.get<MonopolyState>(paths.monopoly(code))
  if (!cur || !cur.currentTurn) return

  const activeOrder = cur.order.filter((uid) => !cur.players[uid]?.bankrupt)
  if (activeOrder.length === 0) return
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
    canFlyAirport: false,
    lastEvent: null,
    turnEndsAt: Date.now() + 35_000,
    updatedAt: Date.now(),
  })
}

/** Conductor Tick loop: Tự động đổi lượt & Bot AI thông minh tự chơi */
export async function monopolyTick(code: string, state: MonopolyState, now: number): Promise<boolean> {
  if (state.phase !== 'playing' || !state.currentTurn) return false

  // 1. Xử lý Bot AI
  if (state.currentTurn.startsWith('bot-')) {
    const botUid = state.currentTurn
    const p = state.players[botUid]
    if (!p) return false

    // Bot chưa đổ xúc xắc -> Đổ xúc xắc
    if (!state.diceRolled) {
      await monopolyRollDice(code, state)
      return true
    }

    // Bot đang ở sân bay -> Bay đến ô Landmark 81 đắt nhất
    if (state.canFlyAirport) {
      await monopolyFlyToTile(code, state, 31)
      return true
    }

    // Bot đã đổ xúc xắc -> Mua đất hoặc nâng cấp nếu đủ tiền
    if (state.diceRolled) {
      if (state.canBuyProperty) {
        await monopolyBuyProperty(code, state)
        return true
      }
      if (state.canUpgradeProperty && p.money >= 300) {
        await monopolyUpgradeProperty(code, state)
        return true
      }
      // Kết thúc lượt của Bot
      await monopolyEndTurn(code)
      return true
    }
  }

  // 2. Hết giờ lượt chơi -> Tự động chuyển lượt
  if (state.turnEndsAt && now > state.turnEndsAt) {
    await monopolyEndTurn(code)
    return true
  }
  return false
}
