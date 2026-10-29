import { useState } from 'react'
import { MacSound } from '../MacAudio'
import type { Photo } from '../case1'

export function PhotoInspectModal({
  photo,
  found,
  find,
  onClose,
}: {
  photo: Photo
  found: Set<string>
  find: (id: string) => void
  onClose: () => void
}) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(
    photo.hotspots && photo.hotspots.length > 0 ? 0 : null
  )
  const [lightMode, setLightMode] = useState<'normal' | 'uv'>('normal')

  const hs = activeHotspot !== null && photo.hotspots ? photo.hotspots[activeHotspot] : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-5 backdrop-blur-xs font-['Be_Vietnam_Pro']">
      <div className={`relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border transition-all duration-300 shadow-2xl ${
        lightMode === 'uv' ? 'border-purple-500 bg-[#120b22] shadow-[0_0_40px_rgba(168,85,247,0.35)]' : 'border-slate-200 bg-white'
      }`}>
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#f8f9fa] px-4 py-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border text-sm transition-colors ${
              lightMode === 'uv' ? 'bg-purple-900 text-purple-200 border-purple-500' : 'bg-blue-100 text-blue-700 border-blue-200'
            }`}>
              {lightMode === 'uv' ? '🟣' : '🔬'}
            </span>
            <div className="min-w-0">
              <p className={`truncate text-[13px] font-bold tracking-tight ${lightMode === 'uv' ? 'text-white' : 'text-slate-900'}`}>{photo.title}</p>
              <p className={`text-[11px] font-medium ${lightMode === 'uv' ? 'text-purple-300' : 'text-slate-500'}`}>
                {photo.time} · {lightMode === 'uv' ? 'Chế độ đèn UV cực tím soi huỳnh quang' : 'Giám định dấu vết vật chứng & điểm khả nghi'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-xl bg-slate-200/80 p-0.5">
              <button
                onClick={() => {
                  MacSound.click()
                  setLightMode('normal')
                }}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                  lightMode === 'normal'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-black'
                }`}
              >
                🔦 Thường
              </button>
              <button
                onClick={() => {
                  MacSound.click()
                  setLightMode('uv')
                }}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all flex items-center gap-1 ${
                  lightMode === 'uv'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-purple-700 hover:text-purple-900'
                }`}
              >
                <span>🟣</span> Đèn UV CSI
              </button>
            </div>

            <button
              onClick={() => {
                MacSound.click()
                onClose()
              }}
              className="grid h-7 w-7 place-items-center rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors text-xs font-bold"
              aria-label="Đóng kính lúp"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden bg-black grid place-items-center min-h-[220px] max-h-[46vh]">
          <img
            src={`${import.meta.env.BASE_URL}${photo.img ?? 'detective/bia-vu-an.jpg'}`}
            alt={photo.title}
            style={{
              filter: lightMode === 'uv' ? 'brightness(0.65) contrast(1.9) hue-rotate(240deg) saturate(2.2)' : 'none',
            }}
            className="max-h-[46vh] w-auto max-w-full object-contain select-none transition-all duration-300"
          />

          {photo.hotspots?.map((h, idx) => {
            const isSelected = activeHotspot === idx
            const isFound = h.clue ? found.has(h.clue) : false

            return (
              <button
                key={idx}
                onClick={() => {
                  MacSound.click()
                  setActiveHotspot(idx)
                }}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 focus:outline-none"
                title={h.label}
              >
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                      lightMode === 'uv'
                        ? 'bg-lime-400'
                        : isFound
                        ? 'bg-emerald-400'
                        : isSelected
                        ? 'bg-amber-400'
                        : 'bg-sky-400'
                    }`}
                  />
                  <span
                    className={`relative grid h-6 w-6 place-items-center rounded-full border-2 text-[11px] font-bold shadow-md transition-transform group-hover:scale-125 ${
                      lightMode === 'uv'
                        ? 'border-lime-200 bg-lime-400 text-slate-950 shadow-[0_0_18px_#84cc16]'
                        : isFound
                        ? 'border-emerald-300 bg-emerald-600 text-white'
                        : isSelected
                        ? 'border-amber-300 bg-amber-500 text-slate-950 scale-110 shadow-sm'
                        : 'border-sky-300 bg-sky-600 text-white'
                    }`}
                  >
                    {isFound ? '✓' : idx + 1}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {photo.hotspots && photo.hotspots.length > 1 && (
          <div className="flex gap-1.5 border-t border-slate-200 bg-slate-50 px-3.5 py-2 overflow-x-auto">
            {photo.hotspots.map((h, idx) => (
              <button
                key={idx}
                onClick={() => {
                  MacSound.click()
                  setActiveHotspot(idx)
                }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all shrink-0 ${
                  activeHotspot === idx
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{h.clue && found.has(h.clue) ? '✓' : `Điểm ${idx + 1}`}</span>
                <span>{h.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="border-t border-slate-200 bg-white p-3.5 space-y-2.5">
          {hs ? (
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-bold flex items-center gap-1.5 text-slate-900">
                  <span>🎯</span> {hs.label}
                </span>
                {hs.hint && (
                  <span className="text-[11px] text-slate-500 italic">
                    {hs.hint}
                  </span>
                )}
              </div>

              {lightMode === 'uv' && (
                <div className="mt-1.5 mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-purple-900 bg-purple-50 border border-purple-200 px-2 py-1 rounded-lg">
                  <span>🔬</span>
                  <span>PHÂN TÍCH HUỲNH QUANG UV: Dấu vết phát quang rõ nét dưới tia 365nm!</span>
                </div>
              )}

              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-700 whitespace-pre-line bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                {hs.detail}
              </p>
              {hs.clue && (
                <button
                  onClick={() => {
                    find(hs.clue!)
                    MacSound.pinClue()
                  }}
                  disabled={found.has(hs.clue)}
                  className={`mt-2.5 w-full inline-flex items-center justify-center gap-2 rounded-xl py-2 text-[12px] font-bold transition-all shadow-sm ${
                    found.has(hs.clue)
                      ? 'border border-emerald-300 bg-emerald-50 text-emerald-700 cursor-default'
                      : 'border border-amber-500 bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-2xs'
                  }`}
                >
                  <span>{found.has(hs.clue) ? '✓' : '📌'}</span>
                  {found.has(hs.clue)
                    ? 'Đã ghi nhận manh mối này vào sổ tay'
                    : 'Ghi nhận manh mối mấu chốt vào sổ vụ án'}
                </button>
              )}
            </div>
          ) : (
            <div>
              <p className="text-[12px] text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                {photo.caption}
              </p>
              {photo.clue && (
                <button
                  onClick={() => {
                    find(photo.clue!)
                    MacSound.pinClue()
                  }}
                  disabled={found.has(photo.clue)}
                  className={`mt-2.5 w-full inline-flex items-center justify-center gap-2 rounded-xl py-2 text-[12px] font-bold transition-all shadow-sm ${
                    found.has(photo.clue)
                      ? 'border border-emerald-300 bg-emerald-50 text-emerald-700 cursor-default'
                      : 'border border-amber-500 bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-2xs'
                  }`}
                >
                  <span>{found.has(photo.clue) ? '✓' : '📌'}</span>
                  {found.has(photo.clue)
                    ? 'Đã ghi nhận manh mối này vào sổ tay'
                    : 'Ghi nhận manh mối từ bức ảnh'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- browser */
