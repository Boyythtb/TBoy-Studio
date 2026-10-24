import { motion } from 'framer-motion'

interface Dice3DProps {
  value: number | null
  rolling?: boolean
  onClick?: () => void
  disabled?: boolean
  size?: number
}

const DOTS: Record<number, Array<[number, number]>> = {
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[25, 25], [75, 25], [25, 75], [75, 75]],
  5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
  6: [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
}

export function Dice3D({ value, rolling = false, onClick, disabled = false, size = 64 }: Dice3DProps) {
  const currentVal = value || 1
  const dotCoords = DOTS[currentVal] || DOTS[1]

  return (
    <motion.button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      animate={
        rolling
          ? {
              rotateX: [0, 360, 720, 1080],
              rotateY: [0, 180, 540, 720],
              scale: [1, 1.15, 0.9, 1],
            }
          : { rotateX: 0, rotateY: 0, scale: 1 }
      }
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        width: size,
        height: size,
      }}
      className={`relative rounded-2xl bg-gradient-to-br from-slate-100 via-white to-slate-200 shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-3px_6px_rgba(0,0,0,0.2)] border border-slate-300 transition-all select-none ${
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-cyan-500/30'
      }`}
    >
      <svg className="w-full h-full p-2" viewBox="0 0 100 100">
        {dotCoords.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={currentVal === 1 ? 14 : 9}
            fill={currentVal === 1 ? '#ef4444' : '#1e293b'}
            className="drop-shadow-sm"
          />
        ))}
      </svg>
    </motion.button>
  )
}
