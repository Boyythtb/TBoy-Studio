import { motion } from 'framer-motion'

interface Dice3DProps {
  value: number | null
  rolling?: boolean
  onClick?: () => void
  disabled?: boolean
  size?: number
}

// Tọa độ các chấm chuẩn cho từng mặt xúc xắc
const DOTS: Record<number, Array<[number, number]>> = {
  1: [[50, 50]],
  2: [
    [28, 28],
    [72, 72],
  ],
  3: [
    [28, 28],
    [50, 50],
    [72, 72],
  ],
  4: [
    [28, 28],
    [72, 28],
    [28, 72],
    [72, 72],
  ],
  5: [
    [28, 28],
    [72, 28],
    [50, 50],
    [28, 72],
    [72, 72],
  ],
  6: [
    [28, 22],
    [72, 22],
    [28, 50],
    [72, 50],
    [28, 78],
    [72, 78],
  ],
}

export function Dice3D({ value, rolling = false, onClick, disabled = false, size = 64 }: Dice3DProps) {
  const currentVal = (value && value >= 1 && value <= 6) ? value : 1
  const dotCoords = DOTS[currentVal] || DOTS[1]
  const isHigh = currentVal >= 5
  const isLow = currentVal <= 2
  const dotColor = currentVal === 1 ? '#ef4444' : '#1e293b'
  const dotRadius = currentVal === 1 ? 13 : currentVal <= 2 ? 10 : 9

  return (
    <motion.button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={!disabled && onClick ? { scale: 1.08, rotateZ: [-2, 2, 0] } : {}}
      whileTap={!disabled && onClick ? { scale: 0.92 } : {}}
      animate={
        rolling
          ? {
              rotateX: [0, 360, 720, 1080],
              rotateY: [0, 180, 540, 720],
              scale: [1, 1.2, 0.85, 1.1, 1],
            }
          : { rotateX: 0, rotateY: 0, scale: 1 }
      }
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: size, height: size, perspective: 600 }}
      className={`relative rounded-[22%] select-none transition-all duration-150 ${
        disabled
          ? 'opacity-55 cursor-not-allowed'
          : onClick
          ? 'cursor-pointer'
          : 'cursor-default'
      }`}
    >
      {/* Nền xúc xắc 3D với hiệu ứng ivory cao cấp */}
      <div
        className="absolute inset-0 rounded-[22%]"
        style={{
          background: rolling
            ? 'linear-gradient(145deg, #ffffff 0%, #f0f0ee 40%, #e8e3d5 100%)'
            : isHigh
            ? 'linear-gradient(145deg, #fffef8 0%, #fafaf2 35%, #f2ede0 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8f7f3 40%, #edeae0 100%)',
          boxShadow: disabled
            ? '0 4px 10px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.12)'
            : onClick
            ? `0 8px 20px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -3px 7px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(255,255,255,0.25)`
            : '0 6px 14px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 3px rgba(255,255,255,0.85), inset 0 -2px 5px rgba(0,0,0,0.15)',
          border: isHigh
            ? '1.5px solid rgba(220, 40, 40, 0.2)'
            : isLow
            ? '1.5px solid rgba(80, 130, 210, 0.2)'
            : '1.5px solid rgba(200, 195, 180, 0.4)',
        }}
      />

      {/* Chấm bóng ánh nhẹ góc trên trái (hiệu ứng cong 3D) */}
      <div
        className="absolute top-[10%] left-[10%] rounded-full pointer-events-none"
        style={{
          width: size * 0.35,
          height: size * 0.2,
          background: 'radial-gradient(circle at 40% 30%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Các chấm xúc xắc */}
      <svg className="absolute inset-0 w-full h-full p-[14%]" viewBox="0 0 100 100">
        {dotCoords.map(([cx, cy], i) => (
          <g key={i}>
            {/* Bóng chấm */}
            <circle
              cx={cx + 1.5}
              cy={cy + 2}
              r={dotRadius}
              fill="rgba(0,0,0,0.15)"
            />
            {/* Chấm chính */}
            <circle
              cx={cx}
              cy={cy}
              r={dotRadius}
              fill={dotColor}
            />
            {/* Điểm sáng chấm */}
            {currentVal !== 1 && (
              <circle
                cx={cx - dotRadius * 0.3}
                cy={cy - dotRadius * 0.3}
                r={dotRadius * 0.28}
                fill="rgba(255,255,255,0.28)"
              />
            )}
          </g>
        ))}

        {/* Chấm đỏ giữa khi là 1 - thêm hiệu ứng glow */}
        {currentVal === 1 && (
          <>
            <circle cx="50" cy="50" r="20" fill="rgba(239,68,68,0.15)" />
            <circle cx="50" cy="50" r="13" fill="#ef4444" />
            <circle cx="44" cy="44" r="4.5" fill="rgba(255,255,255,0.4)" />
          </>
        )}
      </svg>

      {/* Hiệu ứng "nhấn" khi click hover */}
      {onClick && !disabled && (
        <div
          className="absolute inset-0 rounded-[22%] opacity-0 hover:opacity-100 transition-opacity duration-150 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
        />
      )}
    </motion.button>
  )
}
