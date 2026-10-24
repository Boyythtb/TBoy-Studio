import { store, paths, randomRoomCode } from './store'
import { MAX_PLAYERS, MIN_PLAYERS, configIssue, suggestConfig } from '../game/engine'
import { DEFAULT_CONFIG, type GameConfig, type GameId, type Meta, type Player, type Room } from '../game/types'

export const HOST_KEY = 'masoi.host.v1'
export const NAME_KEY = 'masoi.name.v1'
export const AVATAR_KEY = 'masoi.avatar.v1'

/** Local mode: mỗi tab là một người chơi, nên tên/avatar lưu theo tab. */
const pref = () => (store.mode === 'local' ? sessionStorage : localStorage)
export const readPref = (key: string) => pref().getItem(key)
export const writePref = (key: string, value: string) => pref().setItem(key, value)

export const GAME_CAP: Record<GameId, number> = {
  'ma-soi': MAX_PLAYERS,
  'secret-code': 8,
  'sea-battle': 2,
  'truth-or-dare': 20,
  'monopoly': 4,
  'catan': 4,
}

export async function createRoom(game: GameId = 'ma-soi'): Promise<string> {
  void cleanupStaleRooms()
  const uid = await store.ensureAuth()
  for (let attempt = 0; attempt < 10; attempt++) {
    const code = randomRoomCode(4)
    const existing = await store.get<Meta>(paths.meta(code))
    if (existing) continue
    const now = Date.now()
    const meta: Meta = {
      code,
      game,
      hostUid: uid,
      createdAt: now,
      phase: 'lobby',
      round: 0,
      steps: [],
      stepIndex: -1,
      stepStartedAt: 0,
      stepEndsAt: 0,
      phaseEndsAt: 0,
      config: suggestConfig(7),
      winner: null,
      winReason: null,
      lovers: null,
      rage: false,
      charmed: [],
      lastDeaths: [],
      lastLynch: null,
      lastLynchRole: null,
      lynchBlocked: false,
      hunterShooter: null,
      hunterVictim: null,
      pendingHunter: null,
      startedAt: null,
      guardPrev: null,
      hunterDone: false,
    }
    await store.set(paths.meta(code), meta)
    localStorage.setItem(HOST_KEY, code)
    return code
  }
  throw new Error('Không tạo được mã phòng, thử lại giúp mình nhé.')
}

export async function findRoom(code: string): Promise<Room['meta'] | null> {
  return store.get<Meta>(paths.meta(code.trim().toUpperCase()))
}

export async function joinRoom(code: string, name: string, avatar: number): Promise<void> {
  const uid = await store.ensureAuth()
  const c = code.trim().toUpperCase()
  const meta = await store.get<Meta>(paths.meta(c))
  if (!meta) throw new Error('Không tìm thấy phòng này.')
  if (meta.phase !== 'lobby' && meta.game !== 'truth-or-dare') {
    throw new Error('Ván đã bắt đầu, không thể vào nữa.')
  }

  const players = (await store.get<Record<string, Player>>(paths.players(c))) ?? {}
  const existing = players[uid]
  const cap = GAME_CAP[meta.game ?? 'ma-soi'] ?? MAX_PLAYERS
  if (!existing && Object.keys(players).length >= cap) {
    throw new Error(cap === 2 ? 'Phòng này chỉ dành cho 2 người.' : `Phòng đã đủ ${cap} người.`)
  }

  await store.set(paths.player(c, uid), {
    uid,
    name: name.trim().slice(0, 16) || 'Người chơi',
    avatar,
    alive: existing?.alive ?? true,
    ready: existing?.ready ?? false,
    joinedAt: existing?.joinedAt ?? Date.now(),
  })
  writePref(NAME_KEY, name.trim())
  writePref(AVATAR_KEY, String(avatar))
}

export async function addBotPlayer(code: string): Promise<string> {
  const c = code.trim().toUpperCase()
  const meta = await store.get<Meta>(paths.meta(c))
  if (!meta) throw new Error('Không tìm thấy phòng.')
  const players = (await store.get<Record<string, Player>>(paths.players(c))) ?? {}
  const count = Object.keys(players).length
  const cap = GAME_CAP[meta.game ?? 'ma-soi'] ?? 4
  if (count >= cap) {
    throw new Error(`Phòng đã đủ ${cap} người chơi.`)
  }

  const botNames = ['Bot Siêu Tốc 🤖', 'Bot Tỷ Phú 🎩', 'Bot Cờ Thủ 🐴', 'Bot Đảo Chủ 🏝️', 'Bot Bá Đạo ⚔️']
  const botUid = `bot-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  const botName = botNames[count % botNames.length]
  const botAvatar = count % 8

  await store.set(paths.player(c, botUid), {
    uid: botUid,
    name: botName,
    avatar: botAvatar,
    alive: true,
    ready: true,
    joinedAt: Date.now(),
  })
  return botUid
}

export async function removeBotPlayer(code: string, botUid: string): Promise<void> {
  const c = code.trim().toUpperCase()
  await store.remove(paths.player(c, botUid))
}

export async function deleteRoom(code: string): Promise<void> {
  const c = code.trim().toUpperCase()
  await store.remove(`rooms/${c}`)
  if (localStorage.getItem(HOST_KEY) === c) {
    localStorage.removeItem(HOST_KEY)
  }
}

export async function leaveRoom(code: string): Promise<void> {
  const uid = await store.ensureAuth()
  const c = code.trim().toUpperCase()
  await store.remove(paths.player(c, uid))

  // Nếu phòng đang ở sảnh chờ và không còn người chơi nào, tự động xóa phòng
  try {
    const meta = await store.get<Meta>(paths.meta(c))
    if (meta && meta.phase === 'lobby') {
      const players = await store.get<Record<string, Player>>(paths.players(c))
      if (!players || Object.keys(players).length === 0) {
        await deleteRoom(c)
      }
    }
  } catch {
    /* ignore */
  }
}

export async function cleanupStaleRooms(): Promise<void> {
  try {
    const all = await store.get<Record<string, { meta?: Meta; players?: Record<string, Player> }>>('rooms')
    if (!all) return
    const now = Date.now()
    const TWO_HOURS = 2 * 60 * 60 * 1000
    for (const [code, data] of Object.entries(all)) {
      if (!data || !data.meta) continue
      const isLobby = data.meta.phase === 'lobby'
      const pCount = data.players ? Object.keys(data.players).length : 0
      const age = now - (data.meta.createdAt || 0)
      if ((isLobby && pCount === 0 && age > 15 * 60 * 1000) || age > TWO_HOURS) {
        await store.remove(`rooms/${code}`)
      }
    }
  } catch {
    /* ignore */
  }
}

export async function updateConfig(code: string, config: GameConfig) {
  await store.update(paths.meta(code), { config })
}

export async function resetToLobby(code: string, players: Player[]) {
  await store.remove(paths.votes(code))
  await store.remove(paths.actions(code))
  await store.remove(paths.secrets(code))
  const patch: Record<string, unknown> = {}
  for (const p of players) patch[p.uid] = { ...p, alive: true, ready: false }
  if (Object.keys(patch).length) await store.update(paths.players(code), patch)
  await store.update(paths.meta(code), {
    phase: 'lobby',
    round: 0,
    steps: [],
    stepIndex: -1,
    stepStartedAt: 0,
    stepEndsAt: 0,
    phaseEndsAt: 0,
    winner: null,
    lastDeaths: [],
    lastLynch: null,
    lastLynchRole: null,
    hunterShooter: null,
    hunterVictim: null,
    pendingHunter: null,
    startedAt: null,
    guardPrev: null,
    hunterDone: false,
  })
}

export function joinUrl(code: string) {
  return `${window.location.origin}/play/${code}`
}

export function totalPlayers(players: Record<string, Player> | Player[]) {
  return Array.isArray(players) ? players.length : Object.keys(players).length
}

export { MIN_PLAYERS, MAX_PLAYERS, configIssue, suggestConfig, DEFAULT_CONFIG }
