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
    <div className={`stage relative min-h-dvh w-full overflow-x-hidden isolation-auto ${className}`} data-mode={mode}>
      {/* Khung hiệu ứng nền được cắt gọn gàng (clipping tuyệt đối), không bao giờ tràn chiều dọc gây kéo quá footer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden>
        <div className="stage-stars">
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
        {moon && <div className="stage-moon floaty" />}
        {/* Mystic Midnight Moonlit Fog & Aura */}
        <div
          className="absolute -top-48 -left-48 h-[650px] w-[650px] rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              mode === 'blood'
                ? 'radial-gradient(circle, #ef4444 0%, #b91c1c 40%, transparent 70%)'
                : 'radial-gradient(circle, #38bdf8 0%, #0284c7 45%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-48 -right-48 h-[650px] w-[650px] rounded-full opacity-15 blur-[140px]"
          style={{
            background:
              mode === 'blood'
                ? 'radial-gradient(circle, #991b1b 0%, transparent 70%)'
                : 'radial-gradient(circle, #06b6d4 0%, #0f172a 50%, transparent 70%)',
          }}
        />
        {fog && <div className="stage-fog" />}
        {fog && <div className="stage-fog b" />}
        <div className="grain" />
        <div className="vignette" />
      </div>

      {/* Nội dung trang web - xác định chiều cao cuộn thực tế, dừng đúng chân trang */}
      <div className="stage-content relative z-[2] min-h-dvh w-full">{children}</div>
    </div>
  )
}
