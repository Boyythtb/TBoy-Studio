import { motion } from 'framer-motion'
import { roleDef } from '../game/roles'
import type { RoleId } from '../game/types'

interface RoleCardProps {
  role: RoleId
  flipped: boolean
  onFlip?: () => void
  className?: string
  showDesc?: boolean
}

export function RoleCard({ role, flipped, onFlip, className = '', showDesc = true }: RoleCardProps) {
  const def = roleDef(role)
  const isWolf = def.team === 'wolf'

  return (
    <div className={`flip-scene ${className}`}>
      <div className={`flip-inner relative h-full w-full ${flipped ? 'flipped' : ''}`}>
        {/* back */}
        <button
          type="button"
          onClick={onFlip}
          className="flip-face absolute inset-0 grid place-items-center overflow-hidden rounded-[26px] border border-cyan-500/30 bg-[#0a0f1d] text-center transition-all duration-300 hover:border-cyan-400/60"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 0%, rgba(56,189,248,0.2) 0%, rgba(15,23,42,0.98) 55%, #060913 100%)',
            boxShadow: '0 25px 60px -20px rgba(0,0,0,0.9), 0 0 25px -5px rgba(56,189,248,0.2), inset 0 1px 0 rgba(255,255,255,0.18)',
          }}
          aria-label="Mở vai của bạn"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              {[86, 68, 50, 32].map((r) => (
                <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#38bdf8" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 24 }).map((_, i) => {
                const a = (i / 24) * Math.PI * 2
                return (
                  <line
                    key={i}
                    x1={100 + Math.cos(a) * 50}
                    y1={100 + Math.sin(a) * 50}
                    x2={100 + Math.cos(a) * 86}
                    y2={100 + Math.sin(a) * 86}
                    stroke="#38bdf8"
                    strokeWidth="0.4"
                  />
                )
              })}
            </svg>
          </div>
          <div className="relative px-6">
            <div className="mb-4 text-[3.6rem] leading-none" style={{ filter: 'drop-shadow(0 0 24px rgba(56,189,248,0.5))' }}>
              🐺
            </div>
            <p className="eyebrow mb-2 font-bold text-[0.66rem] tracking-[0.25em] text-cyan-400">DANH TÍNH BÍ MẬT</p>
            <p className="display text-2xl font-serif text-white font-bold">Chạm để lật bài</p>
            <p className="mt-3 text-xs text-slate-400 font-medium">🛡️ Giữ kín trước mắt người khác</p>
          </div>
        </button>

        {/* front */}
        <div
          className="flip-face flip-back sheen absolute inset-0 overflow-hidden rounded-[26px] border text-center transition-all"
          style={{
            borderColor: isWolf ? 'rgba(239,68,68,0.5)' : 'rgba(56,189,248,0.4)',
            background: isWolf
              ? 'radial-gradient(120% 90% at 50% 0%, rgba(239,68,68,0.25) 0%, rgba(15,23,42,0.98) 60%, #060913 100%)'
              : 'radial-gradient(120% 90% at 50% 0%, rgba(56,189,248,0.2) 0%, rgba(15,23,42,0.98) 60%, #060913 100%)',
            boxShadow: isWolf
              ? '0 30px 70px -25px rgba(239,68,68,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
              : '0 30px 70px -25px rgba(56,189,248,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          <div className="flex h-full flex-col items-center justify-center px-6 py-7">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={flipped ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 18 }}
              className="mb-4 text-[3.8rem] leading-none"
              style={{ filter: isWolf ? 'drop-shadow(0 0 24px rgba(239,68,68,0.6))' : 'drop-shadow(0 0 24px rgba(56,189,248,0.6))' }}
            >
              {def.icon}
            </motion.div>
            <span
              className="mb-2.5 rounded-full px-3 py-1 text-[0.62rem] font-bold tracking-[0.2em] uppercase border"
              style={{
                background: isWolf ? 'rgba(239,68,68,0.18)' : 'rgba(56,189,248,0.15)',
                color: isWolf ? '#f87171' : '#7dd3fc',
                borderColor: isWolf ? 'rgba(239,68,68,0.4)' : 'rgba(56,189,248,0.35)',
              }}
            >
              {isWolf ? 'PHE MA SÓI' : 'PHE DÂN LÀNG'}
            </span>
            <h2 className="display text-3xl font-serif text-white font-bold" style={{ color: def.accent }}>
              {def.name}
            </h2>
            <p className="mt-2.5 max-w-[24ch] text-[0.84rem] font-semibold leading-relaxed text-slate-200">{def.tagline}</p>
            {showDesc && (
              <p className="mt-3.5 max-w-[30ch] text-[0.72rem] leading-relaxed text-slate-400 font-normal">{def.desc}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
