import { useEffect, useMemo, useState } from 'react'
import { paths, store } from '../lib/store'
import type { Meta, NightState, Player, PlayerAction, Secret } from '../game/types'

export type RoomMode = 'host' | 'player'

export function useRoom(code: string, mode: RoomMode) {
  const [uid, setUid] = useState<string | null>(store.uid())
  const [meta, setMeta] = useState<Meta | null>(null)
  const [playersMap, setPlayersMap] = useState<Record<string, Player> | null>(null)
  const [votes, setVotes] = useState<Record<string, string>>({})
  const [secrets, setSecrets] = useState<Record<string, Secret>>({})
  const [mySecret, setMySecret] = useState<Secret | null>(null)
  const [actions, setActions] = useState<Record<string, PlayerAction>>({})
  const [myAction, setMyAction] = useState<PlayerAction | null>(null)
  const [night, setNight] = useState<NightState | null>(null)
  const [authError, setAuthError] = useState<string | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    let alive = true
    store
      .ensureAuth()
      .then((u) => {
        if (!alive) return
        setUid(u)
        setAuthReady(true)
      })
      .catch((err: Error) => {
        if (alive) setAuthError(err.message)
      })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (!code) return
    const stops: Array<() => void> = []
    stops.push(store.sub<Meta>(paths.meta(code), setMeta))
    stops.push(store.sub<Record<string, Player>>(paths.players(code), setPlayersMap))
    stops.push(store.sub<Record<string, string>>(paths.votes(code), (v) => setVotes(v ?? {})))

    if (mode === 'host') {
      stops.push(store.sub<Record<string, Secret>>(paths.secrets(code), (v) => setSecrets(v ?? {})))
      stops.push(
        store.sub<Record<string, PlayerAction>>(paths.actions(code), (v) => setActions(v ?? {})),
      )
      stops.push(store.sub<NightState>(paths.night(code), setNight))
    } else if (uid) {
      stops.push(store.sub<Secret>(paths.secret(code, uid), setMySecret))
      stops.push(store.sub<PlayerAction>(paths.action(code, uid), setMyAction))
    }

    return () => stops.forEach((stop) => stop())
  }, [code, mode, uid])

  useEffect(() => {
    if (meta) return
    const t = setTimeout(() => setTimedOut(true), 3000)
    return () => clearTimeout(t)
  }, [meta])

  const missing = !meta && timedOut

  const players = useMemo(
    () =>
      Object.values(playersMap ?? {})
        .filter((p) => p && p.uid)
        .sort((a, b) => a.joinedAt - b.joinedAt),
    [playersMap],
  )

  return {
    uid,
    authReady,
    authError,
    loading: !authReady,
    missing,
    meta,
    players,
    votes,
    secrets,
    mySecret,
    actions,
    myAction,
    night,
    isHost: Boolean(uid && meta?.hostUid === uid),
    me: uid ? (playersMap?.[uid] ?? null) : null,
  }
}

export function useNow(interval = 250) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), interval)
    return () => clearInterval(id)
  }, [interval])
  return now
}
