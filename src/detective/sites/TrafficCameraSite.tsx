import { useState } from 'react'
import { MacSound } from '../MacAudio'
import { getTrafficCameraRecords, type TrafficCameraRecord } from '../caseSites'

interface Props {
  caseId: string
  found: Set<string>
  onPin: (clueId?: string, label?: string) => void
  onOpenUrl?: (url: string) => void
}

export function TrafficCameraSite({ caseId, found, onPin }: Props) {
  const records: TrafficCameraRecord[] = getTrafficCameraRecords(caseId)
  const [selectedCam, setSelectedCam] = useState<string>('all')
  const [filterQuery, setFilterQuery] = useState('')

  const cams = Array.from(new Set(records.map((r) => r.camLocation)))

  const filtered = records.filter((r) => {
    if (selectedCam !== 'all' && r.camLocation !== selectedCam) return false
    if (!filterQuery) return true
    const q = filterQuery.toLowerCase()
    return (
      r.id.toLowerCase().includes(q) ||
      r.camName.toLowerCase().includes(q) ||
      r.time.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.objectsObserved.some((o) => o.toLowerCase().includes(q))
    )
  })

  return (
    <div className="min-h-full bg-[#0f172a] text-slate-100 pb-12 font-['Be_Vietnam_Pro'] select-none">
      {/* Cổng Camera An Ninh Header Đậm Chất Trinh Thám Hình Sự */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-900/60 px-5 py-4 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600/30 border border-indigo-500/50 text-indigo-400 font-black text-xl shadow-inner">
            📹
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white flex items-center gap-2">
              <span>HỆ THỐNG CAMERA GIÁM SÁT AN NINH KHU VỰC</span>
              <span className="rounded-full bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 border border-red-500/30 flex items-center gap-1 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                CỔNG AN NINH ĐÔ THỊ
              </span>
            </h1>
            <p className="text-[11px] text-indigo-300">
              Trích xuất dữ liệu camera công cộng, nhận diện phương tiện và người qua lại trong đêm vụ án
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-slate-400">Trạng thái máy chủ lưu trữ</p>
          <p className="text-[12px] font-bold text-emerald-400 font-mono">● Đang trích xuất băng ghi hình</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Filter bar theo camera */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Tìm theo giờ (21:35, 20:28), đối tượng (xe điện xanh, áo đỏ, túi đen, SH, Dũng, Sơn)..."
              className="flex-1 rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-[12px] text-white outline-none focus:border-indigo-500 transition-all font-mono placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={() => MacSound.click()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[12px] transition-colors shadow-md"
            >
              Lọc hình ảnh
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setSelectedCam('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedCam === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Tất cả vị trí ({records.length})
            </button>
            {cams.map((cam) => (
              <button
                key={cam}
                type="button"
                onClick={() => setSelectedCam(cam)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedCam === cam
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                📍 {cam}
              </button>
            ))}
          </div>
        </div>

        {/* Danh sách bản ghi camera */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400">
              <span className="text-4xl block mb-2">🎥</span>
              <p className="text-[13px] font-medium">Không tìm thấy đoạn ghi hình nào khớp với tìm kiếm.</p>
            </div>
          ) : (
            filtered.map((item) => {
              const isFound = item.clueId ? found.has(item.clueId) : false

              return (
                <div
                  key={item.id}
                  className={`bg-slate-900/90 rounded-2xl border p-5 shadow-xl transition-all ${
                    isFound
                      ? 'border-emerald-500/80 ring-2 ring-emerald-500/30 bg-emerald-950/20'
                      : 'border-slate-800 hover:border-indigo-500/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-800 text-indigo-400 border border-slate-700 font-mono text-sm">
                        CAM
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[13px] font-bold text-white tracking-wide">{item.camName}</p>
                          <span className="rounded-md bg-indigo-950 text-indigo-300 px-2 py-0.5 text-[10px] font-mono border border-indigo-800/60">
                            {item.id}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">Vị trí: {item.camLocation}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-right">
                      <span className="rounded-md bg-red-950/80 text-red-400 border border-red-800/60 px-2.5 py-1 text-[11px] font-mono font-bold">
                        🕒 {item.time}
                      </span>
                    </div>
                  </div>

                  {/* Chi tiết nội dung trích xuất */}
                  <div className="mt-3.5 space-y-3">
                    <p className="text-[13px] text-slate-200 leading-relaxed bg-slate-950/80 rounded-xl p-3 border border-slate-800 font-sans">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 font-semibold mr-1">Nhận diện đối tượng:</span>
                      {item.objectsObserved.map((obj, idx) => (
                        <span
                          key={idx}
                          className="rounded-lg bg-indigo-950/70 text-indigo-200 px-2.5 py-0.5 text-[11px] border border-indigo-800/50 font-medium"
                        >
                          👁️ {obj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Nút lưu chứng cứ */}
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400">
                      {item.clueId ? '🎯 Bằng chứng hình ảnh có giá trị giám định' : 'ℹ️ Ghi nhận hoạt động bình thường của khu vực'}
                    </span>

                    <button
                      type="button"
                      onClick={() => onPin(item.clueId, item.clueLabel)}
                      className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold transition-all shadow-md flex items-center gap-1.5 ${
                        isFound
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      <span>{isFound ? '✓' : '📌'}</span>
                      <span>{isFound ? 'Đã ghim trong Sổ' : 'Ghim bằng chứng Camera'}</span>
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
