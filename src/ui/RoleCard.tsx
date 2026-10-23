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
          className="flip-face absolute inset-0 grid place-items-center overflow-hidden rounded-[28px] border border-white/12 bg-night-900 text-center"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 0%, rgba(125,109,255,0.28) 0%, rgba(10,9,20,0.9) 55%, #07070f 100%)',
            boxShadow: '0 40px 90px -40px rgba(125,109,255,0.6), inset 0 1px 0 rgba(255,255,255,0.12)',
          }}
          aria-label="Mở vai của bạn"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              {[86, 68, 50, 32].map((r) => (
                <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#cac5ff" strokeWidth="0.4" />
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
                    stroke="#cac5ff"
                    strokeWidth="0.3"
                  />
                )
              })}
            </svg>
          </div>
          <div className="relative px-6">
            <div className="mb-4 text-[3.2rem] leading-none opacity-90" style={{ filter: 'drop-shadow(0 0 24px rgba(125,109,255,0.7))' }}>
              🐺
            </div>
            <p className="eyebrow mb-2">Vai của bạn</p>
            <p className="display text-2xl text-parchment/90">Chạm để mở</p>
            <p className="mt-3 text-xs text-mute">Đừng để ai nhìn màn hình</p>
          </div>
        </button>

        {/* front */}
        <div
          className="flip-face flip-back sheen absolute inset-0 overflow-hidden rounded-[28px] border border-white/15 text-center"
          style={{
            background: `radial-gradient(120% 80% at 50% 0%, ${def.glow} 0%, rgba(10,9,20,0.96) 58%, #07070f 100%)`,
            boxShadow: `0 40px 100px -42px ${def.accent}aa, inset 0 1px 0 rgba(255,255,255,0.16)`,
          }}
        >
          <div className="flex h-full flex-col items-center justify-center px-5 py-6">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={flipped ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
              transition={{ delay: 0.35, type: 'spring', stiffness: 180, damping: 16 }}
              className="mb-3 text-[3.4rem] leading-none"
              style={{ filter: `drop-shadow(0 0 26px ${def.glow})` }}
            >
              {def.icon}
            </motion.div>
            <span
              className="mb-2 rounded-full px-2.5 py-1 text-[0.58rem] font-bold tracking-[0.2em] uppercase"
              style={{
                background: isWolf ? 'rgba(224,67,58,0.18)' : 'rgba(125,109,255,0.18)',
                color: isWolf ? '#ff9c92' : '#c9c0ff',
                border: `1px solid ${isWolf ? 'rgba(224,67,58,0.35)' : 'rgba(125,109,255,0.35)'}`,
              }}
            >
              {isWolf ? 'Phe Sói' : 'Phe Dân'}
            </span>
            <h2 className="display text-3xl" style={{ color: def.accent }}>
              {def.name}
            </h2>
            <p className="mt-2 max-w-[24ch] text-[0.78rem] leading-relaxed text-parchment/70">{def.tagline}</p>
            {showDesc && (
              <p className="mt-3 max-w-[30ch] text-[0.68rem] leading-relaxed text-mute">{def.desc}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
