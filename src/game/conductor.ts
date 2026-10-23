import { store, paths } from '../lib/store'
import {
  buildDeck,
  checkWinner,
  isWolfRole,
  nightSteps,
  shuffle,
  tallyVotes,
  wolfTarget,
  WOLF_ROLES,
} from './engine'
import type {
  GameConfig,
  Meta,
  NightState,
  NightStep,
  Player,
  PlayerAction,
  RoleId,
  Room,
  Secret,
  Team,
  WinReason,
} from './types'

export interface HostInput {
  code: string
  room: Room
  secrets: Record<string, Secret>
  actions: Record<string, PlayerAction>
  night: NightState | null
  now: number
}

const emptyNight = (): NightState => ({ wolfVotes: {}, guard: null, bite: null })

function aliveRolesOf(room: Room, secrets: Record<string, Secret>): RoleId[] {
  return Object.values(room.players)
    .filter((p) => p.alive && secrets[p.uid]?.role)
    .map((p) => secrets[p.uid].role)
}

export async function startGame(code: string, players: Player[], config: GameConfig) {
  const uids = players.map((p) => p.uid)
  const deck = shuffle(buildDeck(config, uids.length))
  const wolfTeam = uids.filter((_, i) => isWolfRole(deck[i]))

  const secrets: Record<string, Secret> = {}
  uids.forEach((uid, i) => {
    const role = deck[i]
    if (isWolfRole(role)) {
      secrets[uid] = { role, mates: wolfTeam.filter((w) => w !== uid) }
    } else if (role === 'elder') {
      secrets[uid] = { role, elderShield: true }
    } else {
      secrets[uid] = { role }
    }
  })

  const now = Date.now()
  await store.set(paths.secrets(code), secrets)
  await store.remove(paths.votes(code))
  await store.remove(paths.actions(code))

  const patch: Record<string, unknown> = {}
  for (const p of players) patch[p.uid] = { ...p, alive: true, ready: false }
  await store.update(paths.players(code), patch)

  await store.update(paths.meta(code), {
    phase: 'reveal',
    round: 0,
    startedAt: now,
    steps: [],
    stepIndex: -1,
    stepStartedAt: now,
    stepEndsAt: 0,
    phaseEndsAt: now + 90_000,
    winner: null,
    winReason: null,
    lovers: null,
    rage: false,
    charmed: [],
    lastDeaths: [],
    lastLynch: null,
    lastLynchRole: null,
    lynchBlocked: false,
    pendingHunter: null,
    hunterShooter: null,
    hunterVictim: null,
    hunterDone: false,
    guardPrev: null,
  } satisfies Partial<Meta>)
}

const ROLE_FOR_STEP: Record<Exclude<NightStep, 'wolves'>, RoleId> = {
  cupid: 'cupid',
  guard: 'guard',
  whitewolf: 'whitewolf',
  wolfwitch: 'wolfwitch',
  seer: 'seer',
  girl: 'girl',
  witch: 'witch',
  piper: 'piper',
  killer: 'killer',
}

export function actorsFor(
  step: NightStep,
  room: Room,
  secrets: Record<string, Secret>,
): string[] {
  const alive = Object.values(room.players).filter((p) => p.alive)
  const withRoles = (roles: RoleId[]) =>
    alive.filter((p) => roles.includes(secrets[p.uid]?.role)).map((p) => p.uid)
  if (step === 'wolves') return withRoles(WOLF_ROLES)
  return withRoles([ROLE_FOR_STEP[step]])
}

function stepComplete(
  step: NightStep,
  room: Room,
  secrets: Record<string, Secret>,
  actions: Record<string, PlayerAction>,
) {
  const actors = actorsFor(step, room, secrets)
  if (!actors.length) return true
  if (step === 'wolves')
    return actors.every(
      (uid) => Boolean(actions[uid]?.wolfVote) && (!room.meta.rage || Boolean(actions[uid]?.wolfVote2)),
    )
  if (step === 'guard') return actors.every((uid) => Boolean(actions[uid]?.guard))
  if (step === 'seer') return actors.every((uid) => Boolean(actions[uid]?.seer))
  if (step === 'cupid') return actors.every((uid) => actions[uid]?.cupidDone === true)
  if (step === 'wolfwitch') return actors.every((uid) => actions[uid]?.wolfDone === true)
  if (step === 'killer') return actors.every((uid) => actions[uid]?.killDone === true)
  if (step === 'girl') return actors.every((uid) => Boolean(actions[uid]?.spy))
  if (step === 'whitewolf') return actors.every((uid) => actions[uid]?.whiteDone === true)
  if (step === 'piper') return actors.every((uid) => actions[uid]?.charmDone === true)
  return actors.every((uid) => actions[uid]?.witchDone === true)
}

async function applyStep(code: string, input: HostInput, step: NightStep) {
  const { room, secrets, actions } = input
  const metaPath = paths.meta(code)
  const now = input.now

  if (step === 'cupid') {
    const cupidUid = actorsFor('cupid', room, secrets)[0]
    const pick = cupidUid ? actions[cupidUid]?.cupid : undefined
    const pair =
      pick && pick[0] !== pick[1] && room.players[pick[0]]?.alive && room.players[pick[1]]?.alive
        ? ([pick[0], pick[1]] as [string, string])
        : null
    if (pair) {
      await store.update(paths.secret(code, pair[0]), { lover: pair[1] })
      await store.update(paths.secret(code, pair[1]), { lover: pair[0] })
    }
    await store.update(paths.night(code), { lovers: pair })
    await store.update(metaPath, { lovers: pair })
  }

  if (step === 'guard') {
    const guardUid = actorsFor('guard', room, secrets)[0]
    const pick = guardUid ? actions[guardUid]?.guard : undefined
    const target = pick && pick !== 'none' ? pick : null
    await store.update(paths.night(code), { guard: target })
  }

  if (step === 'wolves') {
    const wolves = actorsFor('wolves', room, secrets)
    const votes: Record<string, string> = {}
    const votes2: Record<string, string> = {}
    for (const uid of wolves) {
      const vote = actions[uid]?.wolfVote
      if (vote && vote !== 'none') votes[uid] = vote
      const vote2 = actions[uid]?.wolfVote2
      if (vote2 && vote2 !== 'none') votes2[uid] = vote2
    }
    const bite = wolfTarget(votes)
    const extraBite = room.meta.rage ? wolfTarget(votes2) : null
    const witchUid = actorsFor('witch', room, secrets)[0]
    await store.update(paths.night(code), { wolfVotes: votes, bite, extraBite })
    if (witchUid && bite) {
      await store.update(paths.secret(code, witchUid), { bite })
    }
  }

  if (step === 'whitewolf') {
    const uid = actorsFor('whitewolf', room, secrets)[0]
    const pick = uid ? actions[uid]?.whiteKill : undefined
    const target =
      pick && pick !== 'none' && secrets[pick]?.role !== 'whitewolf' && isWolfRole(secrets[pick]?.role)
        ? pick
        : null
    await store.update(paths.night(code), { whiteKill: target })
    if (uid && target && !secrets[uid]?.whiteUsed) {
      await store.update(paths.secret(code, uid), { whiteUsed: true })
    }
  }

  if (step === 'wolfwitch') {
    const uid = actorsFor('wolfwitch', room, secrets)[0]
    const pick = uid ? actions[uid]?.wolfPoison : undefined
    const target = pick && pick !== 'none' ? pick : null
    await store.update(paths.night(code), { wolfPoison: target })
    if (uid && target && !secrets[uid]?.wolfPoisonUsed) {
      await store.update(paths.secret(code, uid), { wolfPoisonUsed: true })
    }
  }

  if (step === 'seer') {
    const seerUid = actorsFor('seer', room, secrets)[0]
    const pick = seerUid ? actions[seerUid]?.seer : undefined
    if (seerUid && pick && pick !== 'none') {
      const target = room.players[pick]
      await store.update(paths.secret(code, seerUid), {
        seerCheck: {
          target: pick,
          isWolf: isWolfRole(secrets[pick]?.role),
          round: room.meta.round,
        },
      })
      if (target) await store.update(paths.night(code), { seer: pick })
    } else if (seerUid) {
      await store.update(paths.night(code), { seer: null })
    }
  }

  if (step === 'witch') {
    const witchUid = actorsFor('witch', room, secrets)[0]
    const act = witchUid ? actions[witchUid]?.witch : undefined
    await store.update(paths.night(code), {
      witchSave: Boolean(act?.save),
      witchPoison: act?.poison && act.poison !== 'none' ? act.poison : null,
    })
    if (witchUid) {
      const patch: Record<string, unknown> = {}
      if (act?.save && !secrets[witchUid]?.saveUsed) patch.saveUsed = true
      if (act?.poison && act.poison !== 'none' && !secrets[witchUid]?.poisonUsed) patch.poisonUsed = true
      if (Object.keys(patch).length) await store.update(paths.secret(code, witchUid), patch)
    }
  }

  if (step === 'girl') {
    const uid = actorsFor('girl', room, secrets)[0]
    const pick = uid ? actions[uid]?.spy : undefined
    if (uid && pick && pick !== 'none') {
      const awake = room.meta.steps.some(
        (s) => s !== 'girl' && actorsFor(s, room, secrets).includes(pick),
      )
      await store.update(paths.secret(code, uid), {
        spyCheck: { target: pick, awake, round: room.meta.round },
      })
    }
  }

  if (step === 'piper') {
    const uid = actorsFor('piper', room, secrets)[0]
    const pick = uid ? actions[uid]?.charm : undefined
    const pair =
      pick && pick[0] !== pick[1] && room.players[pick[0]]?.alive && room.players[pick[1]]?.alive
        ? ([pick[0], pick[1]] as [string, string])
        : null
    if (pair) {
      const merged = Array.from(new Set([...(room.meta.charmed ?? []), ...pair]))
      await store.update(metaPath, { charmed: merged })
      await store.update(paths.night(code), { charm: pair })
    }
  }

  if (step === 'killer') {
    const uid = actorsFor('killer', room, secrets)[0]
    const pick = uid ? actions[uid]?.kill : undefined
    await store.update(paths.night(code), { kill: pick && pick !== 'none' ? pick : null })
  }

  const next = room.meta.stepIndex + 1
  const finished = next >= room.meta.steps.length
  await store.update(metaPath, {
    stepIndex: next,
    stepStartedAt: now,
    stepEndsAt: finished ? now + 2200 : now + room.meta.config.stepSeconds * 1000,
  })
}

function loversExpanded(
  deaths: string[],
  players: Record<string, Player>,
  secrets: Record<string, Secret>,
) {
  const out = [...deaths]
  for (const uid of [...out]) {
    const lover = secrets[uid]?.lover
    if (lover && players[lover]?.alive && !out.includes(lover)) out.push(lover)
  }
  return out
}

function outcomeOf(
  meta: Meta,
  players: Record<string, Player>,
  secrets: Record<string, Secret>,
  deaths: string[],
): { winner: Team | null; winReason: WinReason | null } {
  const alive = Object.values(players).filter((p) => p.alive && !deaths.includes(p.uid))
  const roles = alive.map((p) => secrets[p.uid]?.role).filter(Boolean) as RoleId[]
  const lv = meta.lovers
  if (alive.length === 2 && lv && alive.every((p) => lv.includes(p.uid))) {
    return { winner: 'solo', winReason: 'lovers' }
  }
  if (
    alive.length >= 2 &&
    roles.includes('piper') &&
    alive.every((p) => meta.charmed?.includes(p.uid))
  ) {
    return { winner: 'solo', winReason: 'piper' }
  }
  const winner = checkWinner(roles)
  const reason: WinReason | null =
    winner === 'solo' ? (roles.includes('whitewolf') ? 'whitewolf' : 'killer') : null
  return { winner, winReason: reason }
}

async function resolveDawn(code: string, input: HostInput) {
  const { room, secrets, night } = input
  const n = night ?? emptyNight()
  const deaths: string[] = []
  const shieldSpent = new Set<string>()
  const push = (uid?: string | null) => {
    if (uid && !deaths.includes(uid)) deaths.push(uid)
  }
  const bite = (uid?: string | null) => {
    if (!uid || uid === n.guard || n.witchSave) return
    const s = secrets[uid]
    if (s?.role === 'elder' && s.elderShield && !shieldSpent.has(uid)) {
      shieldSpent.add(uid)
      return
    }
    push(uid)
  }

  bite(n.bite)
  bite(n.extraBite)
  push(n.witchPoison)
  push(n.wolfPoison)
  push(n.kill)
  push(n.whiteKill)

  for (const uid of shieldSpent) {
    await store.update(paths.secret(code, uid), { elderShield: false })
  }

  const valid = loversExpanded(
    deaths.filter((uid) => room.players[uid]?.alive),
    room.players,
    secrets,
  )

  if (valid.length) {
    const patch: Record<string, unknown> = {}
    for (const uid of valid) patch[uid] = { ...room.players[uid], alive: false }
    await store.update(paths.players(code), patch)
  }

  const { winner, winReason } = outcomeOf(room.meta, room.players, secrets, valid)
  const pendingHunter = valid.find((uid) => secrets[uid]?.role === 'hunter') ?? null
  const rage = valid.some((uid) => secrets[uid]?.role === 'cub')

  await store.update(paths.meta(code), {
    phase: 'dawn',
    lastDeaths: valid,
    winner,
    winReason,
    rage,
    pendingHunter,
    guardPrev: n.guard ?? null,
    phaseEndsAt: input.now + 9000,
  })
}

async function startNight(code: string, input: HostInput, round: number) {
  const { room, secrets } = input
  const aliveRoles = aliveRolesOf(room, secrets)
  const whiteUid = Object.keys(secrets).find((u) => secrets[u]?.role === 'whitewolf')
  const whiteReady = Boolean(whiteUid && !secrets[whiteUid].whiteUsed)
  const steps = nightSteps(room.meta.config, aliveRoles, round).filter((s) => s !== 'whitewolf' || whiteReady)
  const now = input.now
  await store.remove(paths.votes(code))
  await store.remove(paths.actions(code))
  await store.remove(paths.night(code))
  const staleBite = Object.entries(secrets).find(([, s]) => s.bite)
  if (staleBite) await store.update(paths.secret(code, staleBite[0]), { bite: null })
  await store.update(paths.meta(code), {
    phase: 'night',
    round,
    steps,
    stepIndex: -1,
    stepStartedAt: now,
    stepEndsAt: now + 4200,
    phaseEndsAt: 0,
    lastDeaths: [],
    lastLynch: null,
    lastLynchRole: null,
    lynchBlocked: false,
    pendingHunter: null,
    hunterShooter: null,
    hunterVictim: null,
    hunterDone: false,
  })
}

async function resolveVote(code: string, input: HostInput) {
  const { room, secrets } = input
  const alive = Object.values(room.players).filter((p) => p.alive)
  const tally = tallyVotes(room.votes ?? {}, alive.map((p) => p.uid))
  const lynch = tally.lynch
  const role = lynch ? secrets[lynch]?.role : undefined
  const blocked = Boolean(lynch && role === 'fool' && !secrets[lynch!]?.foolUsed)

  let deaths: string[] = []
  let pendingHunter: string | null = null
  let winner = room.meta.winner
  let winReason = room.meta.winReason
  let rage = room.meta.rage

  if (lynch && blocked) {
    await store.update(paths.secret(code, lynch), { foolUsed: true })
  } else if (lynch) {
    if (role === 'jester') {
      deaths = [lynch]
      winner = 'solo'
      winReason = 'jester'
    } else {
      deaths = loversExpanded([lynch], room.players, secrets)
      const outcome = outcomeOf(room.meta, room.players, secrets, deaths)
      winner = outcome.winner
      winReason = outcome.winReason
      rage = deaths.some((uid) => secrets[uid]?.role === 'cub')
    }
    pendingHunter = deaths.find((uid) => secrets[uid]?.role === 'hunter') ?? null
  }

  if (deaths.length) {
    const patch: Record<string, unknown> = {}
    for (const uid of deaths) {
      if (room.players[uid]?.alive) patch[uid] = { ...room.players[uid], alive: false }
    }
    if (Object.keys(patch).length) await store.update(paths.players(code), patch)
  }

  await store.update(paths.meta(code), {
    phase: 'verdict',
    lastDeaths: deaths,
    lastLynch: lynch,
    lastLynchRole: role ?? null,
    lynchBlocked: blocked,
    pendingHunter,
    winner,
    winReason,
    rage,
    phaseEndsAt: input.now + 8000,
  })
}

async function afterDawnOrVerdict(code: string, input: HostInput, next: 'discuss' | 'night') {
  const { room } = input
  if (room.meta.pendingHunter) {
    await store.update(paths.meta(code), {
      phase: 'hunter',
      hunterShooter: room.meta.pendingHunter,
      hunterVictim: null,
      hunterDone: false,
      hunterNext: next,
      phaseEndsAt: input.now + 25_000,
    })
    return
  }
  if (room.meta.winner) {
    await store.update(paths.meta(code), { phase: 'over', phaseEndsAt: 0 })
    return
  }
  if (next === 'night') {
    await startNight(code, input, room.meta.round + 1)
    return
  }
  await store.update(paths.meta(code), {
    phase: 'discuss',
    phaseEndsAt: input.now + room.meta.config.discussSeconds * 1000,
  })
}

async function resolveHunter(code: string, input: HostInput) {
  const { room, secrets } = input
  const shooter = room.meta.hunterShooter
  if (!shooter) {
    await store.update(paths.meta(code), { phase: 'discuss' })
    return
  }
  const act = input.actions[shooter]?.hunterShot
  const shot = act && act !== 'none' ? act : null

  let winner = room.meta.winner
  let winReason = room.meta.winReason
  let rage = room.meta.rage
  let deaths: string[] = []
  if (shot && room.players[shot]?.alive) {
    deaths = loversExpanded([shot], room.players, secrets)
    const outcome = outcomeOf(room.meta, room.players, secrets, deaths)
    winner = outcome.winner
    winReason = outcome.winReason
    rage = deaths.some((uid) => secrets[uid]?.role === 'cub')
    const patch: Record<string, unknown> = {}
    for (const uid of deaths) patch[uid] = { ...room.players[uid], alive: false }
    await store.update(paths.players(code), patch)
  }

  await store.update(paths.meta(code), {
    hunterVictim: shot,
    hunterDone: true,
    winner,
    winReason,
    rage,
    phaseEndsAt: input.now + 7000,
  })
}

/**
 * Host-authoritative state machine. Called on an interval by the host screen.
 * Returns true when it wrote something (so callers can slow down if needed).
 */
export async function hostTick(input: HostInput): Promise<boolean> {
  const { code, room, secrets, actions, now } = input
  const m = room.meta

  if (m.phase === 'reveal') {
    const players = Object.values(room.players)
    const allReady = players.length > 0 && players.every((p) => p.ready)
    if (allReady || now > m.phaseEndsAt) {
      await startNight(code, input, 1)
      return true
    }
    return false
  }

  if (m.phase === 'night') {
    if (m.stepIndex === -1) {
      if (now < m.stepEndsAt) return false
      await store.update(paths.meta(code), {
        stepIndex: 0,
        stepStartedAt: now,
        stepEndsAt: now + m.config.stepSeconds * 1000,
      })
      return true
    }
    if (m.stepIndex >= m.steps.length) {
      if (now < m.stepEndsAt) return false
      await resolveDawn(code, input)
      return true
    }
    const step = m.steps[m.stepIndex]
    const done = stepComplete(step, room, secrets, actions)
    const settled = done && now - m.stepStartedAt >= 2500
    if (!settled && now < m.stepEndsAt) return false
    await applyStep(code, input, step)
    return true
  }

  if (m.phase === 'dawn') {
    if (now < m.phaseEndsAt) return false
    await afterDawnOrVerdict(code, input, 'discuss')
    return true
  }

  if (m.phase === 'discuss') {
    if (now < m.phaseEndsAt) return false
    await store.remove(paths.votes(code))
    await store.update(paths.meta(code), {
      phase: 'vote',
      phaseEndsAt: now + m.config.voteSeconds * 1000,
    })
    return true
  }

  if (m.phase === 'vote') {
    const alive = Object.values(room.players).filter((p) => p.alive)
    const allVoted = alive.length > 0 && alive.every((p) => Boolean(room.votes?.[p.uid]))
    if (allVoted || now >= m.phaseEndsAt) {
      await resolveVote(code, input)
      return true
    }
    return false
  }

  if (m.phase === 'verdict') {
    if (now < m.phaseEndsAt) return false
    await afterDawnOrVerdict(code, input, 'night')
    return true
  }

  if (m.phase === 'hunter') {
    if (m.hunterDone) {
      if (now < m.phaseEndsAt) return false
      if (m.winner) {
        await store.update(paths.meta(code), { phase: 'over', phaseEndsAt: 0 })
      } else if (m.hunterNext === 'night') {
        await startNight(code, input, m.round + 1)
      } else {
        await store.update(paths.meta(code), {
          phase: 'discuss',
          phaseEndsAt: now + m.config.discussSeconds * 1000,
        })
      }
      return true
    }
    const done = Boolean(m.hunterShooter && input.actions[m.hunterShooter]?.hunterShot)
    if (done || now >= m.phaseEndsAt) {
      await resolveHunter(code, input)
      return true
    }
    return false
  }

  return false
}

/* ------------------------------------------------------------- night helpers */

export function currentStep(meta: Meta): NightStep | null {
  if (meta.phase !== 'night') return null
  if (meta.stepIndex < 0 || meta.stepIndex >= meta.steps.length) return null
  return meta.steps[meta.stepIndex]
}
