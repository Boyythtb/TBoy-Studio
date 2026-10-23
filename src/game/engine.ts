import type { GameConfig, NightStep, RoleId, Team } from './types'

export const MIN_PLAYERS = 4
export const MAX_PLAYERS = 16

export const WOLF_ROLES: RoleId[] = ['wolf', 'cub', 'wolfwitch', 'whitewolf']
export const SOLO_ROLES: RoleId[] = ['jester', 'killer', 'piper']

export const isWolfRole = (role: RoleId | undefined) => Boolean(role && WOLF_ROLES.includes(role))

export function specialCount(c: GameConfig) {
  return (
    (c.seer ? 1 : 0) +
    (c.witch ? 1 : 0) +
    (c.guard ? 1 : 0) +
    (c.hunter ? 1 : 0) +
    (c.cupid ? 1 : 0) +
    (c.elder ? 1 : 0) +
    (c.fool ? 1 : 0) +
    (c.cub ? 1 : 0) +
    (c.wolfwitch ? 1 : 0) +
    (c.jester ? 1 : 0) +
    (c.killer ? 1 : 0) +
    (c.girl ? 1 : 0) +
    (c.whitewolf ? 1 : 0) +
    (c.piper ? 1 : 0)
  )
}

export function suggestConfig(n: number): GameConfig {
  const wolves = n >= 13 ? 3 : n >= 7 ? 2 : 1
  return {
    wolves,
    seer: true,
    witch: n >= 6,
    guard: n >= 8,
    hunter: n >= 10,
    cupid: n >= 8,
    elder: n >= 7,
    fool: n >= 9,
    cub: n >= 10,
    wolfwitch: n >= 13,
    jester: n >= 12,
    killer: n >= 15,
    girl: n >= 6,
    whitewolf: n >= 14,
    piper: n >= 11,
    secretVote: false,
    hideRoleOnDeath: false,
    peacefulFirstNight: false,
    discussSeconds: 120,
    stepSeconds: 35,
    voteSeconds: 45,
  }
}

export function configIssue(c: GameConfig, n: number): string | null {
  if (n < MIN_PLAYERS) return `Cần ít nhất ${MIN_PLAYERS} người chơi.`
  if (c.wolves < 1) return 'Phải có ít nhất 1 Ma Sói.'
  const wolvesTotal = c.wolves + (c.cub ? 1 : 0) + (c.wolfwitch ? 1 : 0) + (c.whitewolf ? 1 : 0)
  const villagers = n - c.wolves - specialCount(c)
  if (villagers < 1) return 'Quá nhiều vai đặc biệt — cần ít nhất 1 Dân làng.'
  if (wolvesTotal >= n - wolvesTotal) return 'Phe Sói không được đông bằng hoặc hơn phe còn lại.'
  return null
}

export function buildDeck(c: GameConfig, n: number): RoleId[] {
  const deck: RoleId[] = []
  for (let i = 0; i < c.wolves; i++) deck.push('wolf')
  if (c.cub) deck.push('cub')
  if (c.wolfwitch) deck.push('wolfwitch')
  if (c.whitewolf) deck.push('whitewolf')
  if (c.seer) deck.push('seer')
  if (c.witch) deck.push('witch')
  if (c.guard) deck.push('guard')
  if (c.hunter) deck.push('hunter')
  if (c.cupid) deck.push('cupid')
  if (c.elder) deck.push('elder')
  if (c.fool) deck.push('fool')
  if (c.girl) deck.push('girl')
  if (c.jester) deck.push('jester')
  if (c.piper) deck.push('piper')
  if (c.killer) deck.push('killer')
  while (deck.length < n) deck.push('villager')
  return deck.slice(0, n)
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function nightSteps(c: GameConfig, aliveRoles: RoleId[], round: number): NightStep[] {
  const has = (r: RoleId) => aliveRoles.includes(r)
  const calm = round === 1 && c.peacefulFirstNight
  const wolfAlive = aliveRoles.filter(isWolfRole).length
  const steps: NightStep[] = []
  if (round === 1 && c.cupid && has('cupid')) steps.push('cupid')
  if (c.guard && has('guard')) steps.push('guard')
  if (!calm && wolfAlive > 0) steps.push('wolves')
  if (!calm && round > 1 && round % 2 === 0 && has('whitewolf') && wolfAlive > 1) steps.push('whitewolf')
  if (!calm && c.wolfwitch && has('wolfwitch')) steps.push('wolfwitch')
  if (c.seer && has('seer')) steps.push('seer')
  if (c.girl && has('girl')) steps.push('girl')
  if (c.witch && has('witch')) steps.push('witch')
  if (has('piper')) steps.push('piper')
  if (!calm && has('killer')) steps.push('killer')
  return steps
}

/** majority of wolf votes; ties mean nobody gets bitten */
export function wolfTarget(votes: Record<string, string>): string | null {
  const counts = new Map<string, number>()
  for (const target of Object.values(votes)) {
    if (!target || target === 'none') continue
    counts.set(target, (counts.get(target) ?? 0) + 1)
  }
  let best: string | null = null
  let bestCount = 0
  let tie = false
  for (const [target, count] of counts) {
    if (count > bestCount) {
      best = target
      bestCount = count
      tie = false
    } else if (count === bestCount) {
      tie = true
    }
  }
  return tie ? null : best
}

export interface Tally {
  counts: Record<string, number>
  skip: number
  top: number
  leaders: string[]
  lynch: string | null
  voted: number
}

export function tallyVotes(votes: Record<string, string>, aliveUids: string[]): Tally {
  const counts: Record<string, number> = {}
  let skip = 0
  let voted = 0
  for (const uid of aliveUids) {
    const target = votes[uid]
    if (!target) continue
    voted++
    if (target === 'skip') {
      skip++
      continue
    }
    counts[target] = (counts[target] ?? 0) + 1
  }
  const entries = Object.entries(counts)
  const top = entries.reduce((m, [, c]) => Math.max(m, c), 0)
  const leaders = entries.filter(([, c]) => c === top && top > 0).map(([uid]) => uid)
  return { counts, skip, top, leaders, lynch: leaders.length === 1 ? leaders[0] : null, voted }
}

export function checkWinner(aliveRoles: RoleId[]): Team | null {
  const total = aliveRoles.length
  const wolves = aliveRoles.filter(isWolfRole).length
  const killers = aliveRoles.filter((r) => r === 'killer').length
  const white = aliveRoles.filter((r) => r === 'whitewolf').length
  const village = total - wolves - killers
  if (total === 1 && white > 0) return 'solo'
  if (killers > 0) {
    if (total === 1 || killers >= wolves + village) return 'solo'
  }
  if (wolves === 0 && killers === 0) return 'village'
  if (wolves > 0 && wolves >= village + killers) {
    // the white wolf must be the last one standing to win — it cannot ride the pack
    if (white > 0 && wolves === 1) return null
    return 'wolf'
  }
  return null
}

export function countAlive(roles: Record<string, RoleId>, alive: Record<string, boolean>) {
  let w = 0
  let v = 0
  for (const [uid, role] of Object.entries(roles)) {
    if (!alive[uid]) continue
    if (role === 'wolf') w++
    else v++
  }
  return { wolves: w, villagers: v }
}

export function fmt(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(total / 60)
  const s = total % 60
  return m > 0 ? `${m}:${String(s).padStart(2, '0')}` : `${s}`
}
