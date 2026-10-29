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
      {/* Header Chợ Tốt Vàng Cam Đặc Trưng */}
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
              placeholder="Tìm iPhone, vợt cầu lông, đồ cũ..."
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-5 space-y-4">
        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-[12px] font-bold text-slate-700">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`px-3 py-1 rounded-full border transition-all ${
              category === 'all' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border-slate-300 hover:bg-slate-50'
            }`}
          >
            Tất cả danh mục
          </button>
          <button
            type="button"
            onClick={() => setCategory('Điện thoại')}
            className={`px-3 py-1 rounded-full border transition-all ${
              category === 'Điện thoại' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border-slate-300 hover:bg-slate-50'
            }`}
          >
            📱 Điện thoại di động
          </button>
          <button
            type="button"
            onClick={() => setCategory('thể thao')}
            className={`px-3 py-1 rounded-full border transition-all ${
              category === 'thể thao' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border-slate-300 hover:bg-slate-50'
            }`}
          >
            🏸 Đồ thể thao
          </button>
        </div>

        {/* Listings Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[12px] text-slate-500 px-1">
            <span>Hiển thị {filtered.length} tin rao vặt gần khu vực Sân Cầu Lông:</span>
            <span>Mới đăng gần đây</span>
          </div>

          {filtered.map((item) => {
            const isFound = item.clueId ? found.has(item.clueId) : false

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col sm:flex-row gap-4 justify-between"
              >
                <div className="flex gap-3.5 flex-1 min-w-0">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-slate-100 border border-slate-200 text-2xl">
                    {item.title.toLowerCase().includes('iphone') ? '📱' : '🏸'}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-[13px] font-bold text-slate-900 leading-snug hover:text-orange-600 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[15px] font-black text-red-600">{item.price}</p>
                    <p className="text-[12px] text-slate-600 line-clamp-2 font-normal">{item.desc}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-400 pt-1">
                      <span>👤 Người bán: {item.seller}</span>
                      <span>📍 {item.location}</span>
                      <span>🕒 {item.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between shrink-0 gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="text-[10px] font-mono font-semibold text-slate-400">{item.id}</span>
                  <button
                    type="button"
                    onClick={() => onPin(item.clueId, item.clueLabel || `Tin Chợ Tốt: ${item.title}`)}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[11px] font-bold border transition-all ${
                      isFound
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400 shadow-2xs'
                    }`}
                    title="Trích xuất tin đăng vào Sổ vụ án"
                  >
                    <span>{isFound ? '📌' : '📋'}</span>
                    <span>{isFound ? 'Đã lưu ghi chép' : 'Trích xuất tin'}</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
