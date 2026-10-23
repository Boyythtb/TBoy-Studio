import { avatarOf } from '../lib/avatars'

interface AvatarProps {
  index: number
  size?: number
  name?: string
  dead?: boolean
  ring?: boolean
  dim?: boolean
  className?: string
  badge?: string
}

export function Avatar({ index, size = 48, name, dead, ring, dim, className = '', badge }: AvatarProps) {
  const a = avatarOf(index)
  return (
    <div
      className={`relative shrink-0 rounded-full ${className}`}
      style={{ width: size, height: size }}
      title={name}
    >
      <div
        className={`flex h-full w-full items-center justify-center rounded-full transition-all duration-500 ${
          dead ? 'grayscale' : ''
        } ${dim ? 'opacity-40' : ''}`}
        style={{
          background: `linear-gradient(150deg, ${a.from} 0%, ${a.to} 100%)`,
          fontSize: size * 0.46,
          boxShadow: dead
            ? 'inset 0 0 0 1px rgba(255,255,255,0.08)'
            : `inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 22px -10px ${a.from}aa`,
          border: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        <span style={{ filter: dead ? 'grayscale(1) brightness(0.7)' : 'none' }}>{a.emoji}</span>
      </div>
      {dead && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/45">
          <span style={{ fontSize: size * 0.36, opacity: 0.85 }}>💀</span>
        </div>
      )}
      {ring && (
        <div
          className="ring-pulse pointer-events-none absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 0 2px ${a.from}` }}
        />
      )}
      {badge && (
        <div className="absolute -right-1 -bottom-1 rounded-full bg-night-900 px-1.5 py-0.5 text-[0.6rem] font-semibold text-parchment/80 hairline">
          {badge}
        </div>
      )}
    </div>
  )
}
