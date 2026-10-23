import { useMemo } from 'react'

function rand(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

interface ForestProps {
  className?: string
  density?: number
}

export function Forest({ className = '', density = 34 }: ForestProps) {
  const layers = useMemo(() => {
    const build = (seed: number, opacity: number, color: string, scale: number) => {
      const r = rand(seed)
      const trees = Array.from({ length: density }, (_, i) => {
        const step = 100 / density
        const x = i * step + r() * step * 0.6
        const h = (40 + r() * 40) * scale
        const w = (2.6 + r() * 2.2) * scale
        return { x, h, w, lean: (r() - 0.5) * 1.2 }
      })
      return { trees, opacity, color }
    }
    return [
      build(7919, 0.55, '#0b0a18', 1.1),
      build(104729, 0.85, '#070610', 0.88),
      build(1299709, 1, '#04040a', 0.68),
    ]
  }, [density])

  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        {layers.map((layer, li) => (
          <g key={li} opacity={layer.opacity}>
            {layer.trees.map((t, i) => {
              const base = 100
              return (
                <polygon
                  key={i}
                  points={`${t.x},${base} ${t.x + t.lean},${base - t.h} ${t.x + t.w},${base}`}
                  fill={layer.color}
                />
              )
            })}
          </g>
        ))}
      </svg>
    </div>
  )
}
