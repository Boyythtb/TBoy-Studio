import { paths, store } from '../lib/store'
import type { Player } from './types'

export type ArcadeGameType =
  | 'bomb-tag'
  | 'sumo'
  | 'tug-war'
  | 'snowball'
  | 'laser-dodge'
  | 'big-fish'
  | 'chicken-catch'
  | 'doodle-duel'
  | 'moving-day'
  | 'red-light'

export interface ArcadePlayerEntity {
  uid: string
  name: string
  avatar: number
  color: string
  x: number // 5..95
  y: number // 5..95
  vx: number
  vy: number
  alive: boolean
  hasBomb?: boolean
  team?: 'A' | 'B'
  taps: number
  dashCooldown: number
  // Snowball game
  snowSize?: number
  // Laser game
  isJumping?: boolean
  jumpHeight?: number
  jumpTimer?: number
  // Big fish game
  fishWeight?: number
  // Chicken catch
  chickensHeld?: number
  penIndex?: number
  // Moving day
  carryingItem?: string | null
  // Red Light
  distToGoal?: number
  isMoving?: boolean
  penalized?: boolean
}

export interface ArcadeFood {
  id: number
  x: number
  y: number
  size: number
  color: string
}

export interface ArcadeChicken {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  heldBy?: string | null
  penIndex?: number
}

export interface ArcadeLaser {
  angle: number
  speed: number
  length: number
}

export interface ArcadeFurniture {
  id: number
  name: string
  icon: string
  x: number
  y: number
  heldBy?: string | null
  delivered?: boolean
}

export interface ArcadeDoodleStroke {
  color: string
  width: number
  points: { x: number; y: number }[]
}

export interface ArcadeState {
  status: 'lobby' | 'playing' | 'round-over' | 'game-over'
  activeGame: ArcadeGameType
  round: number
  maxRounds: number
  roundEndsAt: number
  timerSeconds: number
  winnerUid: string | null
  winnerTeam: 'A' | 'B' | null
  players: Record<string, ArcadePlayerEntity>
  scores: Record<string, number>
  tugRopePos: number // -100 to 100
  lastEventText?: string
  lastBombPassAt?: number

  // Specialized states
  foods?: ArcadeFood[]
  chickens?: ArcadeChicken[]
  lasers?: ArcadeLaser[]
  furnitures?: ArcadeFurniture[]
  redLightDollState?: 'green' | 'turning' | 'red'
  redLightNextSwitchAt?: number
  doodlePrompt?: string
  doodleDrawings?: Record<string, ArcadeDoodleStroke[]>
}

export interface ArcadeInput {
  dx: number
  dy: number
  dash?: boolean
  jump?: boolean
  tapCount?: number
  isHoldingRun?: boolean
  stroke?: ArcadeDoodleStroke
  clearDoodle?: boolean
  updatedAt: number
}

export const ARCADE_COLORS = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Amber/Yellow
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#f97316', // Orange
]

export const DOODLE_PROMPTS = [
  'Con Chó',
  'Ngôi Nhà',
  'Xe Hơi',
  'Cây Kem',
  'Con Mèo',
  'Mặt Trời',
  'Tàu Thủy',
  'Con Cá',
  'Bánh Pizza',
  'Cái Kính',
  'Trái Tim',
  'Quả Táo',
  'Cây Dù',
  'Tên Lửa',
]

export const ARCADE_GAMES_INFO: Record<
  ArcadeGameType,
  {
    id: ArcadeGameType
    name: string
    icon: string
    tagline: string
    accent: string
    desc: string
    duration: string
    control: string
  }
> = {
  'bomb-tag': {
    id: 'bomb-tag',
    name: 'Chuyền Bom Nổ Chậm',
    icon: '💣',
    tagline: 'Ôm bom tích tắc · Chuyền ngay kẻo nổ!',
    accent: '#ef4444',
    desc: 'Một người ngẫu nhiên mang quả bom hẹn giờ 20s. Hãy chạy rượt đuổi và chạm vào người khác để chuyền bom trước khi phát nổ!',
    duration: '20s / vòng',
    control: 'D-Pad điều hướng chạy',
  },
  'sumo': {
    id: 'sumo',
    name: 'Đấu Đài Sumo',
    icon: '🤼',
    tagline: 'Võ đài dung nham · Húc văng đối thủ!',
    accent: '#f59e0b',
    desc: 'Các đấu thủ trong võ đài tròn trơn trượt. Dùng lực và cú Dash (Lao Tới) húc đối thủ rơi khỏi vòng tròn dung nham để chiến thắng!',
    duration: 'Sinh tồn',
    control: 'D-Pad + Nút Lao Tới (DASH)',
  },
  'tug-war': {
    id: 'tug-war',
    name: 'Kéo Co Đập Phím',
    icon: '🚩',
    tagline: 'Đập nút siêu tốc · Giành giật từng mét dây!',
    accent: '#3b82f6',
    desc: 'Chia 2 phe Đỏ vs Xanh. Màn hình điện thoại hiển thị nút đập khổng lồ, bên nào có tốc độ đập phím nhanh hơn sẽ kéo phăng đối thủ!',
    duration: '25s',
    control: 'Nút đập liên tục (Mash Button)',
  },
  'snowball': {
    id: 'snowball',
    name: 'Lăn Cầu Tuyết',
    icon: '⛄',
    tagline: 'Càng lăn càng to · Húc bay đối thủ rơi vực!',
    accent: '#38bdf8',
    desc: 'Sàn băng trơn trượt. Lăn bóng tuyết lớn dần để tạo sức nặng càn quét, hất văng mọi đối thủ khỏi sàn đấu băng giá.',
    duration: 'Sinh tồn',
    control: 'D-Pad lăn bóng tuyết',
  },
  'laser-dodge': {
    id: 'laser-dodge',
    name: 'Né Tia Laser Sinh Tồn',
    icon: '⚡',
    tagline: 'Laser quét xoay · Nhảy và lách qua tử địa!',
    accent: '#a855f7',
    desc: 'Các chùm tia laser chết chóc quét tròn quanh tâm sàn đấu với tốc độ tăng dần. Di chuyển và bấm Nhảy (Jump) để né qua tia laser!',
    duration: '30s',
    control: 'D-Pad + Nút [NHẢY / JUMP]',
  },
  'big-fish': {
    id: 'big-fish',
    name: 'Cá Lớn Nuốt Cá Bé',
    icon: '🐟',
    tagline: 'Ăn sinh vật biển lớn nhanh · Nuốt trọn cá nhỏ!',
    accent: '#06b6d4',
    desc: 'Bơi lội dưới đáy biển san hô, săn bắt phù du & tôm cá nhỏ để lớn lên thành cá khổng lồ. Hết giờ ai nặng ký nhất sẽ thắng!',
    duration: '35s',
    control: 'D-Pad bơi lội tự do',
  },
  'chicken-catch': {
    id: 'chicken-catch',
    name: 'Cướp Gà Về Chuồng',
    icon: '🐔',
    tagline: 'Lùa gà trên đồng cỏ · Đột kích chuồng đối thủ!',
    accent: '#eab308',
    desc: 'Đàn gà con chạy tán loạn trên bãi cỏ. Hãy đuổi bắt và mang về chuồng của mình, đồng thời có thể chạy sang chuồng đối thủ để trộm gà!',
    duration: '30s',
    control: 'D-Pad bắt & lùa gà',
  },
  'doodle-duel': {
    id: 'doodle-duel',
    name: 'Đấu Phác Họa Vẽ Nhanh',
    icon: '🎨',
    tagline: 'Vẽ trên điện thoại · Tranh giải danh họa trên TV!',
    accent: '#ec4899',
    desc: 'Mỗi người nhận một từ khóa bí mật. Dùng ngón tay vẽ trên điện thoại trong 30s, nét vẽ đồng bộ trực tiếp lên màn hình triển lãm TV!',
    duration: '30s',
    control: 'Bàn vẽ cảm ứng ngón tay',
  },
  'moving-day': {
    id: 'moving-day',
    name: 'Chuyển Nhà Siêu Tốc',
    icon: '📦',
    tagline: 'Khuân sofa & tủ lạnh · Né chướng ngại chất lên xe!',
    accent: '#10b981',
    desc: 'Tranh nhau bê các món đồ nội thất (sofa, tivi, piano) né các bẫy vỏ chuối để chất đầy vào thùng xe tải chuyển nhà!',
    duration: '35s',
    control: 'D-Pad bê & bốc vác đồ',
  },
  'red-light': {
    id: 'red-light',
    name: 'Đèn Xanh Đèn Đỏ',
    icon: '🚦',
    tagline: 'Đèn xanh phi nước đại · Đèn đỏ đứng im phăng phắc!',
    accent: '#f43f5e',
    desc: 'Búp bê khổng lồ canh gác vạch đích. Khi búp bê quay lưng (Đèn xanh): giữ nút để chạy hết tốc lực. Khi búp bê quay lại (Đèn đỏ): thả tay dừng ngay lập tức, nhúc nhích là bị sét đánh!',
    duration: '25s',
    control: 'Nút GIỮ ĐỂ CHẠY (Thả để DỪNG)',
  },
}

export function initArcadeState(
  players: Record<string, Player>,
  gameType: ArcadeGameType = 'bomb-tag',
  existingScores: Record<string, number> = {},
  round = 1,
): ArcadeState {
  const uids = Object.keys(players)
  const entities: Record<string, ArcadePlayerEntity> = {}
  const scores: Record<string, number> = { ...existingScores }

  uids.forEach((uid, index) => {
    if (scores[uid] == null) scores[uid] = 0
    const color = ARCADE_COLORS[index % ARCADE_COLORS.length]
    const isTeamA = index % 2 === 0

    let x = 20 + Math.random() * 60
    let y = 25 + Math.random() * 50

    if (gameType === 'sumo' || gameType === 'snowball' || gameType === 'laser-dodge') {
      const angle = (index / Math.max(1, uids.length)) * Math.PI * 2
      const radius = 24
      x = 50 + Math.cos(angle) * radius
      y = 50 + Math.sin(angle) * radius
    } else if (gameType === 'tug-war') {
      x = isTeamA ? 20 + (index % 4) * 6 : 80 - (index % 4) * 6
      y = 50
    } else if (gameType === 'chicken-catch') {
      const corners = [
        { x: 15, y: 18 },
        { x: 85, y: 18 },
        { x: 15, y: 82 },
        { x: 85, y: 82 },
      ]
      const pen = corners[index % 4]
      x = pen.x
      y = pen.y
    } else if (gameType === 'red-light') {
      x = 10 + (index / Math.max(1, uids.length - 1)) * 80
      y = 88
    }

    entities[uid] = {
      uid,
      name: players[uid]?.name || `Người chơi ${index + 1}`,
      avatar: players[uid]?.avatar ?? (index % 8),
      color,
      x,
      y,
      vx: 0,
      vy: 0,
      alive: true,
      hasBomb: false,
      team: isTeamA ? 'A' : 'B',
      taps: 0,
      dashCooldown: 0,
      snowSize: 15,
      fishWeight: 10,
      chickensHeld: 0,
      penIndex: index % 4,
      distToGoal: 100,
      isMoving: false,
      isJumping: false,
      jumpHeight: 0,
      jumpTimer: 0,
      carryingItem: null,
      penalized: false,
    }
  })

  // Bomb tag setup
  if (gameType === 'bomb-tag' && uids.length > 0) {
    const bombIndex = Math.floor(Math.random() * uids.length)
    entities[uids[bombIndex]].hasBomb = true
  }

  // Foods for Big Fish
  let foods: ArcadeFood[] = []
  if (gameType === 'big-fish') {
    foods = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 12 + Math.random() * 76,
      size: 4 + Math.random() * 6,
      color: ['#38bdf8', '#34d399', '#f472b6', '#facc15', '#a78bfa'][i % 5],
    }))
  }

  // Chickens for Chicken Catch
  let chickens: ArcadeChicken[] = []
  if (gameType === 'chicken-catch') {
    chickens = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: 35 + Math.random() * 30,
      y: 35 + Math.random() * 30,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.5) * 15,
      heldBy: null,
      penIndex: 0,
    }))
  }

  // Lasers for Laser Dodge
  let lasers: ArcadeLaser[] = []
  if (gameType === 'laser-dodge') {
    lasers = [
      { angle: 0, speed: 0.9, length: 180 },
      { angle: Math.PI, speed: 0.9, length: 180 },
    ]
  }

  // Furnitures for Moving Day
  let furnitures: ArcadeFurniture[] = []
  if (gameType === 'moving-day') {
    const items = [
      { name: 'Sofa Da', icon: '🛋️' },
      { name: 'Tủ Lạnh', icon: '🧊' },
      { name: 'Tivi 4K', icon: '📺' },
      { name: 'Đàn Piano', icon: '🎹' },
      { name: 'Giường Ngủ', icon: '🛏️' },
      { name: 'Cây Kiểng', icon: '🪴' },
      { name: 'Bàn Ăn', icon: '🪑' },
      { name: 'Hộp Sách', icon: '📦' },
    ]
    furnitures = items.map((it, i) => ({
      id: i,
      name: it.name,
      icon: it.icon,
      x: 15 + Math.random() * 70,
      y: 40 + Math.random() * 45,
      heldBy: null,
      delivered: false,
    }))
  }

  // Doodle Prompt
  let doodlePrompt = ''
  if (gameType === 'doodle-duel') {
    doodlePrompt = DOODLE_PROMPTS[Math.floor(Math.random() * DOODLE_PROMPTS.length)]
  }

  const durationSec =
    gameType === 'bomb-tag'
      ? 20
      : gameType === 'tug-war' || gameType === 'red-light'
        ? 25
        : gameType === 'doodle-duel' || gameType === 'chicken-catch' || gameType === 'laser-dodge'
          ? 30
          : 35

  return {
    status: 'playing',
    activeGame: gameType,
    round,
    maxRounds: 5,
    roundEndsAt: Date.now() + durationSec * 1000,
    timerSeconds: durationSec,
    winnerUid: null,
    winnerTeam: null,
    players: entities,
    scores,
    tugRopePos: 0,
    lastEventText: `Bắt đầu ${ARCADE_GAMES_INFO[gameType].name}!`,
    lastBombPassAt: Date.now(),
    foods,
    chickens,
    lasers,
    furnitures,
    redLightDollState: 'green',
    redLightNextSwitchAt: Date.now() + 3500,
    doodlePrompt,
    doodleDrawings: {},
  }
}

export async function arcadeStartGame(
  code: string,
  gameType: ArcadeGameType,
  players: Record<string, Player>,
  existingScores: Record<string, number> = {},
  round = 1,
) {
  const rawState = initArcadeState(players, gameType, existingScores, round)
  const safeState = JSON.parse(JSON.stringify(rawState))
  await store.set(paths.arcade(code), safeState)
}

export async function arcadeSendInput(
  code: string,
  uid: string,
  input: Partial<ArcadeInput>,
) {
  await store.update(paths.arcadeInput(code, uid), {
    ...input,
    updatedAt: Date.now(),
  })
}

export async function arcadeTapButton(code: string, uid: string) {
  const inputRef = paths.arcadeInput(code, uid)
  const current = (await store.get<ArcadeInput>(inputRef)) || {
    dx: 0,
    dy: 0,
    tapCount: 0,
    updatedAt: 0,
  }
  await store.update(inputRef, {
    tapCount: (current.tapCount || 0) + 1,
    updatedAt: Date.now(),
  })
}

export async function arcadeSendDoodleStroke(
  code: string,
  uid: string,
  stroke: ArcadeDoodleStroke,
) {
  await store.update(paths.arcadeInput(code, uid), {
    stroke,
    updatedAt: Date.now(),
  })
}

export async function arcadeClearDoodle(code: string, uid: string) {
  await store.update(paths.arcadeInput(code, uid), {
    clearDoodle: true,
    updatedAt: Date.now(),
  })
}
