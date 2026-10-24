import { createContext, useContext } from 'react'
import type { CasePack } from './cases'

export const PackCtx = createContext<CasePack | null>(null)

export function usePack(): CasePack {
  const pack = useContext(PackCtx)
  if (!pack) throw new Error('usePack phải nằm trong PackCtx.Provider')
  return pack
}
