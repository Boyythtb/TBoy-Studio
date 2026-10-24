export type RoleId =
  | 'villager'
  | 'wolf'
  | 'seer'
  | 'witch'
  | 'guard'
  | 'hunter'
  | 'cupid'
  | 'elder'
  | 'fool'
  | 'cub'
  | 'wolfwitch'
  | 'jester'
  | 'killer'
  | 'girl'
  | 'whitewolf'
  | 'piper'
export type Team = 'village' | 'wolf' | 'solo'
export type GameId = 'ma-soi' | 'secret-code' | 'sea-battle' | 'truth-or-dare' | 'monopoly' | 'catan'
export type WinReason = 'lovers' | 'jester' | 'killer' | 'whitewolf' | 'piper'
export type Phase =
  | 'lobby'
  | 'setup'
  | 'reveal'
  | 'night'
  | 'play'
  | 'dawn'
  | 'discuss'
  | 'vote'
  | 'verdict'
  | 'hunter'
  | 'over'

export type NightStep =
  | 'cupid'
  | 'guard'
  | 'wolves'
  | 'whitewolf'
  | 'wolfwitch'
  | 'seer'
  | 'girl'
  | 'witch'
  | 'piper'
  | 'killer'

export interface GameConfig {
  wolves: number
  seer: boolean
  witch: boolean
  guard: boolean
  hunter: boolean
  cupid: boolean
  elder: boolean
  fool: boolean
  cub: boolean
  wolfwitch: boolean
  jester: boolean
  killer: boolean
  girl: boolean
  whitewolf: boolean
  piper: boolean
  /** rules */
  secretVote: boolean
  hideRoleOnDeath: boolean
  peacefulFirstNight: boolean
  discussSeconds: number
  stepSeconds: number
  voteSeconds: number
}

export interface Player {
  uid: string
  name: string
  avatar: number
  alive: boolean
  ready: boolean
  joinedAt: number
}

export interface Secret {
  role: RoleId
  /** fellow wolves, for wolf players only */
  mates?: string[]
  /** last seer inspection result (seer only) */
  seerCheck?: { target: string; isWolf: boolean; round: number } | null
  /** who the wolves bit tonight (witch only) */
  bite?: string | null
  /** witch potions already spent */
  saveUsed?: boolean
  poisonUsed?: boolean
  /** soulmate chosen by Cupid */
  lover?: string | null
  /** Elder shrugs off the first wolf bite */
  elderShield?: boolean
  /** Fool survives the first lynching */
  foolUsed?: boolean
  /** Wolf-witch poison already spent */
  wolfPoisonUsed?: boolean
  /** Little girl's peek: whether the target was awake that night */
  spyCheck?: { target: string; awake: boolean; round: number } | null
  /** White wolf's betraying bite already spent */
  whiteUsed?: boolean
}

export interface Meta {
  code: string
  game?: GameId
  hostUid: string
  createdAt: number
  phase: Phase
  round: number
  steps: NightStep[]
  stepIndex: number
  stepStartedAt: number
  stepEndsAt: number
  phaseEndsAt: number
  config: GameConfig
  winner: Team | null
  winReason: WinReason | null
  lovers: [string, string] | null
  /** wolf cub died — the pack bites twice next night */
  rage: boolean
  /** piper's charmed players */
  charmed: string[]
  lastDeaths: string[]
  lastLynch: string | null
  lastLynchRole: RoleId | null
  lynchBlocked: boolean
  hunterShooter: string | null
  hunterVictim: string | null
  pendingHunter: string | null
  startedAt: number | null
  guardPrev: string | null
  hunterDone: boolean
  hunterNext?: 'discuss' | 'night'
}

export interface Room {
  meta: Meta
  players: Record<string, Player>
  votes: Record<string, string>
}

export interface NightState {
  guard?: string | null
  guardPrevious?: string | null
  wolfVotes: Record<string, string>
  bite?: string | null
  extraBite?: string | null
  seer?: string | null
  witchSave?: boolean
  witchPoison?: string | null
  wolfPoison?: string | null
  kill?: string | null
  whiteKill?: string | null
  charm?: [string, string] | null
  lovers?: [string, string] | null
}

export interface PlayerAction {
  guard?: string
  wolfVote?: string
  wolfVote2?: string
  seer?: string
  witch?: { save: boolean; poison: string | null }
  witchDone?: boolean
  hunterShot?: string
  cupid?: [string, string]
  cupidDone?: boolean
  wolfPoison?: string
  wolfDone?: boolean
  kill?: string
  killDone?: boolean
  spy?: string
  whiteKill?: string
  whiteDone?: boolean
  charm?: [string, string]
  charmDone?: boolean
}

export const NONE = 'none'

export const DEFAULT_CONFIG: GameConfig = {
  wolves: 1,
  seer: true,
  witch: false,
  guard: false,
  hunter: false,
  cupid: false,
  elder: false,
  fool: false,
  cub: false,
  wolfwitch: false,
  jester: false,
  killer: false,
  girl: false,
  whitewolf: false,
  piper: false,
  secretVote: false,
  hideRoleOnDeath: false,
  peacefulFirstNight: false,
  discussSeconds: 120,
  stepSeconds: 35,
  voteSeconds: 45,
}

export const phaseLabel: Record<Phase, string> = {
  lobby: 'Phòng chờ',
  setup: 'Chuẩn bị',
  reveal: 'Chia vai',
  night: 'Ban đêm',
  play: 'Đang chơi',
  dawn: 'Bình minh',
  discuss: 'Thảo luận',
  vote: 'Bỏ phiếu',
  verdict: 'Phán quyết',
  hunter: 'Phát súng cuối',
  over: 'Kết thúc',
}
