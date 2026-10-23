import { useMemo, type ReactNode } from 'react'

interface StageProps {
  mode?: 'night' | 'day' | 'blood'
  children: ReactNode
  className?: string
  moon?: boolean
  fog?: boolean
}

export function Stage({ mode = 'night', children, className = '', moon = true, fog = true }: StageProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: 78 }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280
        const r1 = seed / 233280
        const r2 = ((i * 4177 + 12345) % 233280) / 233280
        const r3 = ((i * 6553 + 7) % 233280) / 233280
        return {
          left: `${(r1 * 100).toFixed(2)}%`,
          top: `${(r2 * 78).toFixed(2)}%`,
          size: 0.8 + r3 * 2.2,
          delay: `${(r3 * 5).toFixed(2)}s`,
          opacity: 0.25 + r1 * 0.65,
        }
      }),
    [],
  )

  return (
    <div className={`stage ${className}`} data-mode={mode}>
      <div className="stage-stars" aria-hidden>
        {stars.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>
      {moon && <div className="stage-moon floaty" aria-hidden />}
      {fog && <div className="stage-fog" aria-hidden />}
      {fog && <div className="stage-fog b" aria-hidden />}
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
      <div className="stage-content">{children}</div>
    </div>
  )
}
