import { useEffect, useState } from 'react'
import { paths, store } from '../lib/store'
import type { Meta, Player } from '../game/types'

export function useGameRoom(code?: string) {
  const [uid, setUid] = useState<string | null>(null)
  const [meta, setMeta] = useState<Meta | null>(null)
  const [players, setPlayers] = useState<Record<string, Player>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!code) return
    let alive = true
    const unsubs: (() => void)[] = []
    void (async () => {
      const id = await store.ensureAuth()
      if (!alive) return
      setUid(id)
      unsubs.push(
        store.sub<Meta>(paths.meta(code), (v) => {
          if (!alive) return
          setMeta(v)
          setLoading(false)
        }),
        store.sub<Record<string, Player>>(paths.players(code), (v) => {
          if (alive) setPlayers(v ?? {})
        }),
      )
    })()
    return () => {
      alive = false
      unsubs.forEach((fn) => fn())
    }
  }, [code])

  return {
    uid,
    meta,
    players,
    loading,
    isHost: Boolean(uid && meta?.hostUid === uid),
  }
}
