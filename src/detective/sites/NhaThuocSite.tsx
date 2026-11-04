import { useState } from 'react'
import { MacSound } from '../MacAudio'
import { getPharmacyRecords, type PharmacyRecord } from '../caseSites'

interface Props {
  caseId: string
  found: Set<string>
  onPin: (clueId?: string, label?: string) => void
  onOpenUrl?: (url: string) => void
}

export function NhaThuocSite({ caseId, found, onPin }: Props) {
  const records: PharmacyRecord[] = getPharmacyRecords(caseId)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'prescription' | 'otc' | 'emergency'>('all')

  const filtered = records.filter((r) => {
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      r.id.toLowerCase().includes(q) ||
      r.customer.toLowerCase().includes(q) ||
      r.items.some((it) => it.toLowerCase().includes(q)) ||
      (r.notes && r.notes.toLowerCase().includes(q))
    )
  })

  return (
    <div className="min-h-full bg-[#f4f7f9] text-[#1d1d1f] font-['Be_Vietnam_Pro'] select-none pb-12">
      {/* Header Nhà Thuốc Long Châu */}
      <div className="bg-[#00838f] text-white p-4 sm:px-8 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-[#00838f] text-xl font-bold shadow-xs">
              💊
            </span>
            <div>
              <h1 className="text-base font-black tracking-tight">Hệ Thống Nhà Thuốc Long Châu</h1>
              <p className="text-[11px] text-cyan-100">Cổng tra cứu lịch sử đơn thuốc và hóa đơn bán lẻ trực tuyến</p>
            </div>
          </div>
          <span className="rounded-full bg-cyan-900/60 px-3 py-1 text-[11px] font-mono border border-cyan-400/30">
            Hóa đơn chi nhánh: {records.length} bản ghi
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4">
        {/* Bộ lọc tìm kiếm */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên khách hàng, tên thuốc hoặc mã đơn..."
              className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 pl-10 text-[12px] text-slate-800 outline-none focus:border-[#00838f] focus:bg-white transition-all font-sans"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#00838f] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả hoá đơn
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('emergency')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedCategory === 'emergency'
                  ? 'bg-[#00838f] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Cấp cứu & Sơ cứu
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('prescription')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedCategory === 'prescription'
                  ? 'bg-[#00838f] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Thuốc kê đơn & Dược liệu
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('otc')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedCategory === 'otc'
                  ? 'bg-[#00838f] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Dụng cụ & Bán lẻ
            </button>
          </div>
        </div>

        {/* Danh sách đơn thuốc */}
        <div className="space-y-3.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400">
              <span className="text-4xl block mb-2">🔍</span>
              <p className="text-[13px] font-medium">Không tìm thấy hoá đơn hoặc dữ liệu thuốc phù hợp.</p>
            </div>
          ) : (
            filtered.map((item) => {
              const isFound = item.clueId ? found.has(item.clueId) : false

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border p-5 shadow-2xs transition-all ${
                    isFound
                      ? 'border-emerald-300 ring-2 ring-emerald-100 bg-emerald-50/20'
                      : 'border-slate-200 hover:border-cyan-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-100 text-cyan-800 text-sm font-bold font-mono">
                        {item.category === 'emergency' ? '🚨' : item.category === 'prescription' ? '⚕️' : '📦'}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[13px] font-bold text-slate-900">{item.customer}</p>
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 font-mono">
                            {item.id}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{item.time} · Bán bởi Dược sĩ trực</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[13px] font-bold text-cyan-900 font-mono">{item.totalPrice}</p>
                      <p className="text-[10px] text-emerald-600 font-medium">● Đã thanh toán</p>
                    </div>
                  </div>

                  {/* Danh mục thuốc & chi tiết */}
                  <div className="mt-3 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.items.map((med, idx) => (
                        <span
                          key={idx}
                          className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-800 border border-slate-200"
                        >
                          💊 {med}
                        </span>
                      ))}
                    </div>

                    {item.notes && (
                      <p className="text-[12px] text-slate-700 bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 leading-relaxed font-sans">
                        <span className="font-bold text-slate-900">Ghi chú dược sĩ:</span> {item.notes}
                      </p>
                    )}
                  </div>

                  {/* Nút ghim chứng cứ */}
                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400">
                      {item.clueId ? '🔍 Hồ sơ chứng từ mua thuốc' : 'ℹ️ Thông tin kiểm tra hành chính'}
                    </span>
                    {item.clueId && (
                      <button
                        type="button"
                        onClick={() => {
                          MacSound.click()
                          onPin(item.clueId, item.clueLabel)
                        }}
                        className={`rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all shadow-2xs ${
                          isFound
                            ? 'bg-slate-100 text-slate-400 cursor-default'
                            : 'bg-[#00838f] text-white hover:bg-cyan-800 active:scale-95 cursor-pointer'
                        }`}
                      >
                        {isFound ? '✓ Đã ghim manh mối' : '📌 Ghim hoá đơn này'}
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
