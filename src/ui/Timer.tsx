import { useNow } from '../hooks/useRoom'
import { fmt } from '../game/engine'

interface TimerProps {
  endsAt: number
  total: number
  size?: number
  tone?: 'moon' | 'blood' | 'amber'
  label?: string
  className?: string
}

const TONES = {
  moon: { stroke: '#7d6dff', track: 'rgba(125,109,255,0.16)', text: '#cac5ff' },
  blood: { stroke: '#e0433a', track: 'rgba(224,67,58,0.16)', text: '#ff8f83' },
  amber: { stroke: '#f0b44e', track: 'rgba(240,180,78,0.16)', text: '#ffd18a' },
}

export function Timer({ endsAt, total, size = 72, tone = 'moon', label, className = '' }: TimerProps) {
  const now = useNow(200)
  const remaining = Math.max(0, endsAt - now)
  const ratio = total > 0 ? Math.min(1, remaining / total) : 0
  const r = (size - 8) / 2
  const c = 2 * Math.PI * r
  const t = TONES[tone]
  const urgent = remaining <= 10_000

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={t.track} strokeWidth={4} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={urgent ? '#e0433a' : t.stroke}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - ratio)}
          style={{ transition: 'stroke-dashoffset 0.25s linear, stroke 0.3s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="tabular font-semibold"
          style={{ fontSize: size * 0.3, color: urgent ? '#ff8f83' : t.text, lineHeight: 1 }}
        >
          {fmt(remaining)}
        </span>
        {label && <span className="mt-0.5 text-[0.55em] tracking-widest text-mute uppercase">{label}</span>}
      </div>
    </div>
  )
}
