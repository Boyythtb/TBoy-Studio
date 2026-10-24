import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CasePack } from './cases'

export type CaseStatus = 'playing' | 'won' | 'lost'
export type Stage = 'main' | 'accomplice'
export type AccuseResult = 'win' | 'wrong' | 'dead' | 'stage2' | 'locked'

interface SaveState {
  clues: string[]
  attempts: number
  status: CaseStatus
  unlocked: boolean
  stage: Stage
}

const EMPTY: SaveState = { clues: [], attempts: 0, status: 'playing', unlocked: false, stage: 'main' }

export function saveKey(caseId: string) {
  return `tboy.detective.${caseId}.v1`
}

function load(key: string): SaveState {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<SaveState>
    return {
      clues: Array.isArray(parsed.clues) ? parsed.clues : [],
      attempts: typeof parsed.attempts === 'number' ? parsed.attempts : 0,
      status: parsed.status === 'won' || parsed.status === 'lost' ? parsed.status : 'playing',
      unlocked: parsed.unlocked === true,
      stage: parsed.stage === 'accomplice' ? 'accomplice' : 'main',
    }
  } catch {
    return EMPTY
  }
}

export function useCase(pack: CasePack) {
  const key = saveKey(pack.id)
  const [save, setSave] = useState<SaveState>(() => load(key))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(save))
    } catch {
      /* ignore quota errors */
    }
  }, [key, save])

  const found = useMemo(() => new Set(save.clues), [save.clues])

  const find = useCallback((id: string) => {
    setSave((s) => (s.clues.includes(id) ? s : { ...s, clues: [...s.clues, id] }))
  }, [])

  const unlock = useCallback(
    (code: string) => {
      const ok = !!pack.code && code.trim() === pack.code.value
      if (ok) setSave((s) => ({ ...s, unlocked: true }))
      return ok
    },
    [pack.code],
  )

  const accuse = useCallback(
    (id: string): AccuseResult => {
      if (save.status !== 'playing') return save.status === 'won' ? 'win' : 'dead'
      if (pack.code && !save.unlocked) return 'locked'

      if (save.stage === 'accomplice') {
        if (id === pack.accomplice) {
          setSave((s) => ({ ...s, status: 'won' }))
          return 'win'
        }
      } else if (id === pack.case.culprit) {
        if (pack.accomplice) {
          setSave((s) => ({ ...s, stage: 'accomplice' }))
          return 'stage2'
        }
        setSave((s) => ({ ...s, status: 'won' }))
        return 'win'
      }

      const attempts = save.attempts + 1
      const dead = attempts >= pack.maxTries
      setSave((s) => ({ ...s, attempts, status: dead ? 'lost' : 'playing' }))
      return dead ? 'dead' : 'wrong'
    },
    [pack, save.attempts, save.status, save.stage, save.unlocked],
  )

  const reset = useCallback(() => setSave(EMPTY), [])

  return {
    clues: save.clues,
    found,
    attempts: save.attempts,
    triesLeft: pack.maxTries - save.attempts,
    status: save.status,
    stage: save.stage,
    unlocked: save.unlocked,
    find,
    unlock,
    accuse,
    reset,
  }
}
