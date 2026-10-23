import { useCallback, useEffect, useMemo, useState } from 'react'
import { CASE } from './case1'

const KEY = 'tboy.detective.hem42.v1'
export const MAX_TRIES = 3

export type CaseStatus = 'playing' | 'won' | 'lost'

interface SaveState {
  clues: string[]
  attempts: number
  status: CaseStatus
}

const EMPTY: SaveState = { clues: [], attempts: 0, status: 'playing' }

function load(): SaveState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as SaveState
    return {
      clues: Array.isArray(parsed.clues) ? parsed.clues : [],
      attempts: typeof parsed.attempts === 'number' ? parsed.attempts : 0,
      status: parsed.status === 'won' || parsed.status === 'lost' ? parsed.status : 'playing',
    }
  } catch {
    return EMPTY
  }
}

export function useCase() {
  const [save, setSave] = useState<SaveState>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(save))
    } catch {
      /* ignore quota errors */
    }
  }, [save])

  const found = useMemo(() => new Set(save.clues), [save.clues])

  const find = useCallback((id: string) => {
    setSave((s) => (s.clues.includes(id) ? s : { ...s, clues: [...s.clues, id] }))
  }, [])

  const accuse = useCallback((id: string): 'win' | 'wrong' | 'dead' => {
    if (save.status !== 'playing') return save.status === 'won' ? 'win' : 'dead'
    if (id === CASE.culprit) {
      setSave((s) => ({ ...s, status: 'won' }))
      return 'win'
    }
    const attempts = save.attempts + 1
    setSave((s) => ({ ...s, attempts, status: attempts >= MAX_TRIES ? 'lost' : 'playing' }))
    return attempts >= MAX_TRIES ? 'dead' : 'wrong'
  }, [save.attempts, save.status])

  const reset = useCallback(() => setSave(EMPTY), [])

  return {
    clues: save.clues,
    found,
    attempts: save.attempts,
    triesLeft: MAX_TRIES - save.attempts,
    status: save.status,
    find,
    accuse,
    reset,
  }
}
