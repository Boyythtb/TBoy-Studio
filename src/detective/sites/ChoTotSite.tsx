import { useState } from 'react'
import { MacSound } from '../MacAudio'
import { getChoTotListings } from '../caseSites'

interface Props {
  caseId: string
  found: Set<string>
  onPin: (clueId?: string, label?: string) => void
}

export function ChoTotSite({ caseId, found, onPin }: Props) {
  const listings = getChoTotListings(caseId)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = listings.filter((item) => {
    const matchSearch =
      !search ||
      `${item.title} ${item.seller} ${item.location} ${item.desc}`.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'all' || item.category.toLowerCase().includes(category.toLowerCase())
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-full bg-[#f4f4f4] text-slate-900 pb-12 font-['Be_Vietnam_Pro'] select-none">
      {/* Header Chợ Tốt */}
      <div className="bg-[#ffba00] px-4 py-3 shadow-sm border-b border-amber-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-[#1d1d1f] bg-white px-2 py-0.5 rounded-lg shadow-2xs">
              chợ TỐT
            </span>
            <span className="text-[11px] font-bold text-amber-950 hidden sm:inline">Rao vặt 24/7 toàn quốc</span>
          </div>

          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm tin rao vặt..."
              className="w-full rounded-full bg-white px-4 py-2 pl-9 text-[12px] text-slate-800 outline-none shadow-inner border border-transparent focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
          </div>

          <button
            type="button"
            onClick={() => MacSound.click()}
            className="rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-[11px] px-3.5 py-1.5 shadow-sm transition-colors whitespace-nowrap"
          >
            + Đăng tin
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Phân loại danh mục */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-[11px] font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`px-3 py-1.5 rounded-full border transition-all ${
              category === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-2xs'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tất cả danh mục
          </button>
          <button
            type="button"
            onClick={() => setCategory('Điện thoại')}
            className={`px-3 py-1.5 rounded-full border transition-all ${
              category === 'Điện thoại'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-2xs'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            📱 Điện thoại & Thiết bị
          </button>
          <button
            type="button"
            onClick={() => setCategory('Xe')}
            className={`px-3 py-1.5 rounded-full border transition-all ${
              category === 'Xe'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-2xs'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            🛵 Xe máy & Xe điện
          </button>
          <button
            type="button"
            onClick={() => setCategory('thao')}
            className={`px-3 py-1.5 rounded-full border transition-all ${
              category === 'thao'
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-2xs'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            🏸 Đồ thể thao
          </button>
        </div>

        {/* Danh sách tin đăng */}
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((item) => {
            const isFound = item.clueId ? found.has(item.clueId) : false

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between hover:border-amber-400 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {item.id} · {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.time}</span>
                  </div>

                  <h3 className="font-bold text-[13px] text-slate-900 mt-2 line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-black text-red-600 text-base mt-1">{item.price}</p>

                  <div className="mt-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed font-sans">
                    {item.desc}
                  </div>

                  <div className="mt-2 text-[11px] text-slate-500 flex flex-wrap gap-x-3 gap-y-1">
                    <span>👤 {item.seller}</span>
                    <span>📍 {item.location}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    {item.clueId ? '🔍 Có thông tin đối soát' : 'Tin rao vặt thông thường'}
                  </span>
                  {item.clueId && (
                    <button
                      type="button"
                      onClick={() => {
                        MacSound.click()
                        onPin(item.clueId, item.clueLabel)
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all shadow-2xs ${
                        isFound
                          ? 'bg-slate-100 text-slate-400 cursor-default'
                          : 'bg-amber-500 hover:bg-amber-600 text-slate-950 cursor-pointer active:scale-95'
                      }`}
                    >
                      {isFound ? '✓ Đã ghim tin' : '📌 Ghim tin này'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
