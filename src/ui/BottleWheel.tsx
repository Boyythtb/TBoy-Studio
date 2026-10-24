import { motion } from 'framer-motion'
import { Avatar } from './Avatar'
import type { Player } from '../game/types'
import type { TodStep } from '../game/truthOrDareEngine'

interface BottleWheelProps {
  order: string[]
  players: Record<string, Player>
  drinks?: Record<string, number>
  spinAngle: number
  spinnerUid: string | null
  activeUid: string | null
  currentStep: TodStep
  onSpin?: () => void
  canSpin?: boolean
  compact?: boolean
}

export function BottleWheel({
  order,
  players,
  drinks = {},
  spinAngle,
  spinnerUid,
  activeUid,
  currentStep,
  onSpin,
  canSpin = false,
  compact = false,
}: BottleWheelProps) {
  const radius = compact ? 88 : 115
  const boxSize = compact ? 'h-56 w-56' : 'h-64 w-64 sm:h-80 sm:w-80'
  const avatarSize = compact ? 30 : 38
  const bottleSize = compact ? 'h-24 w-24' : 'h-32 w-32'

  return (
    <div className={`relative flex items-center justify-center select-none ${boxSize}`}>
      {/* Vòng tròn các thành viên trong bàn nhậu */}
      {order.map((uid, idx) => {
        const p = players[uid]
        if (!p) return null
        const count = order.length
        const angle = (idx * 360) / count - 90
        const rad = (angle * Math.PI) / 180
        const x = Math.cos(rad) * radius
        const y = Math.sin(rad) * radius

        const isSpinner = uid === spinnerUid && currentStep === 'waiting_spin'
        const isVictim = uid === activeUid && (currentStep === 'picking' || currentStep === 'acting')
        const isSelected = isSpinner || isVictim

        return (
          <div
            key={uid}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            className="absolute flex flex-col items-center justify-center transition-all duration-300 pointer-events-none"
          >
            <div
              className={`relative rounded-full transition-all ${
                isSelected ? 'scale-125 z-10' : 'opacity-85'
              }`}
            >
              <Avatar index={p.avatar} size={avatarSize} name={p.name} />
              {isSelected && (
                <span
                  className={`absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full text-[0.65rem] text-white font-black shadow-md border border-white ${
                    isSpinner ? 'bg-amber-500 animate-bounce' : 'bg-rose-600'
                  }`}
                >
                  {isSpinner ? '🍾' : '🎯'}
                </span>
              )}
            </div>

            <span
              className={`mt-0.5 max-w-[65px] truncate text-[0.62rem] font-bold ${
                isSpinner
                  ? 'text-amber-300 font-black'
                  : isVictim
                  ? 'text-rose-300 font-black'
                  : 'text-slate-300'
              }`}
            >
              {p.name}
            </span>

            <span className="text-[0.55rem] text-amber-400 font-bold leading-none">
              {drinks[uid] ?? 0} 🍻
            </span>
          </div>
        )
      })}

      {/* Chai bia ở trung tâm */}
      <div className="relative z-0">
        <motion.div
          animate={{ rotate: spinAngle }}
          transition={{ duration: 2.8, ease: [0.15, 0.9, 0.3, 1] }}
          className={`grid place-items-center cursor-pointer ${bottleSize} ${
            canSpin ? 'hover:scale-105 active:scale-95' : ''
          }`}
          onClick={() => {
            if (canSpin && onSpin) onSpin()
          }}
        >
          <svg viewBox="0 0 100 100" className={`${bottleSize} filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]`}>
            <rect x="46" y="8" width="8" height="24" rx="2" fill="#d97706" />
            <rect x="44" y="6" width="12" height="4" rx="1" fill="#fbbf24" />
            <path d="M46 30 Q40 42 38 48 L62 48 Q60 42 54 30 Z" fill="#b45309" />
            <rect x="38" y="48" width="24" height="42" rx="4" fill="#92400e" />
            <rect x="39" y="56" width="22" height="24" rx="2" fill="#ef4444" />
            <text x="50" y="72" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">
              18+
            </text>
            <polygon points="50,0 43,8 57,8" fill="#f43f5e" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
