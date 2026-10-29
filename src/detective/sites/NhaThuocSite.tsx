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
      r.items.some((i) => i.toLowerCase().includes(q)) ||
      r.notes?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-full bg-[#f4f7f9] text-slate-900 pb-12 font-['Be_Vietnam_Pro'] select-none">
      {/* Long Châu Header Xanh Ngọc Y Tế Sang Trọng */}
      <div className="bg-gradient-to-r from-[#006064] via-[#00838f] to-[#0097a7] text-white px-5 py-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-[#006064] font-black text-2xl shadow-sm">
            💊
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight flex items-center gap-2">
              <span>HỆ THỐNG NHÀ THUỐC LONG CHÂU</span>
              <span className="rounded-full bg-emerald-400/20 text-emerald-200 text-[10px] px-2 py-0.5 border border-emerald-300/30">
                Chi Nhánh Hẻm 42 Ba Đình
              </span>
            </h1>
            <p className="text-[11px] text-cyan-100">
              Cổng tra cứu toa thuốc điện tử, sổ dược chất & lịch sử mua hàng y tế
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-cyan-200">Dược sĩ phụ trách ca tối</p>
          <p className="text-[12px] font-bold text-white">DS. Đặng Thu Thảo · 0936xxx890</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Banner lưu ý an toàn */}
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/80 p-4 shadow-2xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <div>
              <p className="text-[13px] font-bold text-cyan-950">
                Sổ theo dõi dược phẩm & Hoá đơn mua thuốc trong ngày
              </p>
              <p className="text-[11px] text-cyan-800">
                Hệ thống lưu trữ thời gian thực lịch sử kê đơn, mua băng gạc, độc chất y tế và các cuộc gọi tư vấn
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-cyan-700 text-white text-[11px] font-bold px-3 py-1 shadow-2xs">
            {records.length} bản ghi
          </span>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên khách hàng, tên thuốc (Aconitine, hạ sốt, băng gạc, thuốc an thần)..."
              className="flex-1 rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-[12px] text-slate-800 outline-none focus:border-cyan-600 focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => MacSound.click()}
              className="px-4 py-2 rounded-xl bg-[#00838f] hover:bg-[#006064] text-white font-bold text-[12px] transition-colors shadow-2xs"
            >
              Tra cứu
            </button>
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
              Thuốc kê đơn & Độc chất
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
              Dụng cụ & Bán lẻ thông thường
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
                      <p className="text-[12px] text-slate-700 bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 leading-relaxed">
                        <span className="font-bold text-slate-900">Ghi chú dược sĩ:</span> {item.notes}
                      </p>
                    )}
                  </div>

                  {/* Nút ghim chứng cứ */}
                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400">
                      {item.clueId ? '🔍 Có thể chứa thông tin vụ án' : 'ℹ️ Thông tin kiểm tra hành chính thông thường'}
                    </span>

                    <button
                      type="button"
                      onClick={() => onPin(item.clueId, item.clueLabel)}
                      className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold transition-all shadow-2xs flex items-center gap-1.5 ${
                        isFound
                          ? 'bg-emerald-600 text-white'
                          : 'bg-cyan-700 hover:bg-cyan-800 text-white'
                      }`}
                    >
                      <span>{isFound ? '✓' : '📌'}</span>
                      <span>{isFound ? 'Đã lưu trong Sổ' : 'Ghim vào Sổ vụ án'}</span>
                    </button>
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
