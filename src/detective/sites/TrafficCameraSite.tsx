import { useState } from 'react'
import { MacSound } from '../MacAudio'
import { getTrafficCameraRecords, type TrafficCameraRecord } from '../caseSites'

interface Props {
  caseId: string
  found: Set<string>
  onPin: (clueId?: string, label?: string) => void
  onOpenUrl?: (url: string) => void
}

type VisionMode = 'normal' | 'night' | 'uv' | 'bw'

export function TrafficCameraSite({ caseId, found, onPin }: Props) {
  const records: TrafficCameraRecord[] = getTrafficCameraRecords(caseId)
  const [selectedCam, setSelectedCam] = useState<string>('all')
  const [filterQuery, setFilterQuery] = useState('')
  const [inspectRecord, setInspectRecord] = useState<TrafficCameraRecord | null>(null)
  const [visionMode, setVisionMode] = useState<VisionMode>('normal')
  const [zoomLevel, setZoomLevel] = useState<number>(1)

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

  const openInspector = (item: TrafficCameraRecord) => {
    MacSound.click()
    setInspectRecord(item)
    setVisionMode('normal')
    setZoomLevel(1)
  }

  const closeInspector = () => {
    MacSound.click()
    setInspectRecord(null)
  }

  const getVisionFilterClass = (mode: VisionMode) => {
    switch (mode) {
      case 'night':
        return 'brightness-125 contrast-125 hue-rotate-90'
      case 'uv':
        return 'contrast-150 hue-rotate-[240deg] saturate-150'
      case 'bw':
        return 'grayscale contrast-150'
      default:
        return ''
    }
  }

  // =========================================================================
  // CHẾ ĐỘ GIÁM ĐỊNH HÌNH ẢNH CAMERA CHI TIẾT (IN-PLACE, KHÔNG BAO GIỜ BỊ TRÀN)
  // =========================================================================
  if (inspectRecord) {
    const isFound = inspectRecord.clueId ? found.has(inspectRecord.clueId) : false
    const imgSrc = inspectRecord.img ? `${import.meta.env.BASE_URL}${inspectRecord.img.replace(/^\/+/, '')}` : null

    return (
      <div
        className="min-h-full bg-[#0a0f1d] text-slate-100 flex flex-col font-['Be_Vietnam_Pro'] pb-12 select-none touch-pan-y"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Sticky Header có nút Quay Lại to rõ ràng */}
        <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-indigo-900/60 px-3 sm:px-5 py-2.5 shadow-xl flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={closeInspector}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 text-[12px] font-bold shadow-md transition-all active:scale-95 shrink-0"
          >
            <span className="text-sm">←</span>
            <span>Quay lại camera</span>
          </button>

          <div className="flex-1 min-w-0 text-center px-2">
            <h2 className="text-[13px] font-bold text-white truncate">{inspectRecord.camName}</h2>
            <p className="text-[10px] text-slate-400 font-mono truncate">
              {inspectRecord.time} · {inspectRecord.camLocation}
            </p>
          </div>

          <button
            type="button"
            onClick={closeInspector}
            className="h-8 w-8 grid place-items-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold shrink-0 text-xs"
            title="Đóng giám định"
          >
            ✕
          </button>
        </div>

        {/* Nội dung giám định chi tiết */}
        <div className="max-w-2xl w-full mx-auto px-3 sm:px-4 py-4 space-y-4">
          {/* Thanh công cụ: Bộ lọc & Thu phóng */}
          <div className="bg-slate-900/95 rounded-2xl border border-slate-800 p-2.5 shadow-lg space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1 text-[11px] font-semibold">
                <span className="text-[10px] text-slate-400 uppercase font-mono mr-1">Bộ lọc:</span>
                <button
                  type="button"
                  onClick={() => {
                    MacSound.click()
                    setVisionMode('normal')
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    visionMode === 'normal' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ⚪ Thường
                </button>
                <button
                  type="button"
                  onClick={() => {
                    MacSound.click()
                    setVisionMode('night')
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    visionMode === 'night' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  🟢 Đêm
                </button>
                <button
                  type="button"
                  onClick={() => {
                    MacSound.click()
                    setVisionMode('uv')
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    visionMode === 'uv' ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  🟣 UV CSI
                </button>
                <button
                  type="button"
                  onClick={() => {
                    MacSound.click()
                    setVisionMode('bw')
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    visionMode === 'bw' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ⬛ B&W
                </button>
              </div>

              <div className="flex items-center gap-1 text-[11px]">
                <span className="text-[10px] text-slate-400 uppercase font-mono mr-1">Phóng to:</span>
                {[1, 1.25, 1.5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      MacSound.click()
                      setZoomLevel(lvl)
                    }}
                    className={`px-2 py-0.5 rounded-lg font-mono text-[11px] font-bold transition-colors ${
                      zoomLevel === lvl ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {lvl}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Màn hình CCTV - Giữ kích thước vừa vặn trong khung hình di động */}
          <div className="relative aspect-video max-h-[38vh] w-full rounded-2xl bg-black overflow-hidden border border-slate-800 grid place-items-center shadow-2xl">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={inspectRecord.camName}
                style={{ transform: `scale(${zoomLevel})` }}
                className={`max-h-full max-w-full object-contain transition-transform duration-200 ${getVisionFilterClass(visionMode)}`}
                loading="eager"
              />
            ) : (
              <div className="text-slate-500 font-mono text-center p-4">
                <span className="text-4xl block mb-2">📹</span>
                TÍN HIỆU ĐANG KẾT NỐI
              </div>
            )}

            {/* Live CCTV HUD Overlay */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-2 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span>REC {inspectRecord.id}</span>
              <span className="hidden sm:inline">· {zoomLevel}x</span>
            </div>
            <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-slate-300">
              🕒 {inspectRecord.time}
            </div>
          </div>

          {/* Bản ghi phân tích nhận diện */}
          <div className="bg-slate-900/95 p-4 rounded-2xl border border-slate-800 space-y-2.5 shadow-xl">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Bản ghi phân tích nhận diện:
              </p>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                {inspectRecord.id}
              </span>
            </div>
            <p className="text-[13px] text-slate-200 leading-relaxed font-sans bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
              {inspectRecord.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {inspectRecord.objectsObserved.map((obj, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-indigo-950/80 text-indigo-300 text-[11px] font-mono border border-indigo-800/60"
                >
                  🎯 {obj}
                </span>
              ))}
            </div>
          </div>

          {/* Khối nút hành động phía dưới */}
          <div className="space-y-2.5 pt-1">
            <button
              type="button"
              onClick={() => {
                onPin(inspectRecord.clueId, inspectRecord.clueLabel)
              }}
              className={`w-full py-3 rounded-2xl text-[13px] font-bold transition-all shadow-xl flex items-center justify-center gap-2 ${
                isFound
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-[0.99]'
              }`}
            >
              <span>{isFound ? '✓' : '📌'}</span>
              <span>{isFound ? 'Đã lưu chứng cứ này vào Sổ vụ án' : 'Ghim chứng cứ này vào Sổ vụ án'}</span>
            </button>

            <button
              type="button"
              onClick={closeInspector}
              className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[12px] font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>←</span>
              <span>Quay lại danh sách camera</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // DANH SÁCH TỔNG QUAN TẤT CẢ CÁC CAMERA
  // =========================================================================
  return (
    <div
      className="min-h-full bg-[#0a0f1d] text-slate-100 pb-16 font-['Be_Vietnam_Pro'] touch-pan-y"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Cổng Camera An Ninh Header Đậm Chất Trinh Thám Hình Sự */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-indigo-900/60 px-4 sm:px-5 py-3.5 shadow-2xl flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30 backdrop-blur-md bg-opacity-95">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600/30 border border-indigo-500/50 text-indigo-400 font-black text-xl shadow-inner shrink-0">
            📹
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-2 flex-wrap">
              <span>HỆ THỐNG CAMERA GIÁM SÁT AN NINH</span>
              <span className="rounded-full bg-red-500/20 text-red-400 text-[9px] px-2 py-0.5 border border-red-500/30 flex items-center gap-1 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                CỔNG AN NINH ĐÔ THỊ
              </span>
            </h1>
            <p className="text-[11px] text-indigo-300 truncate">
              Trích xuất dữ liệu camera công cộng, nhận diện phương tiện và đối tượng nghi vấn
            </p>
          </div>
        </div>

        <div className="text-right flex items-center gap-2 shrink-0">
          <span className="rounded-xl bg-indigo-900/40 border border-indigo-700/50 px-2.5 py-1 text-[11px] font-mono text-indigo-200">
            {filtered.length} Băng ghi hình
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-5 space-y-5">
        {/* Filter bar theo camera & Ô tìm kiếm */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-3 sm:p-4 shadow-xl space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Tìm theo giờ (21:35, 20:28), đối tượng (xe điện, áo đỏ, túi đen, SH, Dũng)..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-9 pr-3.5 py-2 text-[12px] text-white outline-none focus:border-indigo-500 transition-all font-mono placeholder:text-slate-500"
              />
            </div>
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery('')}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono shrink-0"
              >
                Xóa lọc
              </button>
            )}
          </div>

          {/* Location pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-800/80">
            <span className="text-[10px] text-slate-400 font-mono uppercase mr-1">Vị trí:</span>
            <button
              type="button"
              onClick={() => setSelectedCam('all')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-medium transition-colors ${
                selectedCam === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Tất cả ({records.length})
            </button>
            {cams.map((cam) => (
              <button
                key={cam}
                type="button"
                onClick={() => setSelectedCam(cam)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-medium transition-colors ${
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

        {/* Danh sách bản ghi camera - Grid thẻ màn hình CCTV chân thực */}
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center py-12 bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 space-y-2">
              <span className="text-4xl block mb-2">🎥</span>
              <p className="text-[13px] font-semibold text-slate-300">Không tìm thấy đoạn ghi hình nào khớp với tìm kiếm.</p>
              <p className="text-[11px] text-slate-500">Hãy thử xóa bộ lọc hoặc tìm bằng từ khóa đơn giản hơn.</p>
            </div>
          ) : (
            filtered.map((item) => {
              const isFound = item.clueId ? found.has(item.clueId) : false
              const imgSrc = item.img ? `${import.meta.env.BASE_URL}${item.img.replace(/^\/+/, '')}` : null

              return (
                <div
                  key={item.id}
                  className={`bg-slate-900/90 rounded-2xl border overflow-hidden shadow-xl transition-all flex flex-col group ${
                    isFound
                      ? 'border-emerald-500/80 ring-2 ring-emerald-500/30 bg-emerald-950/20'
                      : 'border-slate-800 hover:border-indigo-500/60 hover:shadow-2xl'
                  }`}
                >
                  {/* MÀN HÌNH CCTV GHI HÌNH CHÂN THỰC */}
                  <div
                    onClick={() => openInspector(item)}
                    className="relative aspect-video w-full bg-black cursor-pointer overflow-hidden border-b border-slate-800"
                    title="Bấm để phóng to và giám định hình ảnh"
                  >
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={item.camName}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-slate-600 space-y-1">
                        <span className="text-3xl">📹</span>
                        <span className="text-[11px] font-mono">TÍN HIỆU CAMERA</span>
                      </div>
                    )}

                    {/* Top CCTV Overlay Metadata */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] pointer-events-none">
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10">
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-red-400">REC</span>
                        <span className="text-slate-300">{item.id}</span>
                      </div>
                      <div className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10 text-emerald-400 font-mono">
                        🕒 {item.time}
                      </div>
                    </div>

                    {/* Bottom CCTV Overlay */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <span className="bg-black/75 backdrop-blur-xs text-slate-200 text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/10 truncate max-w-[65%]">
                        📍 {item.camLocation}
                      </span>
                      <span className="bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-md flex items-center gap-1">
                        🔍 Giám định
                      </span>
                    </div>
                  </div>

                  {/* THÔNG TIN BĂNG GHI HÌNH */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-[13px] font-bold text-white tracking-wide">{item.camName}</h3>
                        <span className="rounded-md bg-indigo-950 text-indigo-300 px-2 py-0.5 text-[10px] font-mono border border-indigo-800/60 shrink-0">
                          {item.id}
                        </span>
                      </div>
                      <p className="mt-2 text-[12px] text-slate-300 leading-relaxed bg-slate-950/80 rounded-xl p-2.5 border border-slate-800/80 font-sans">
                        {item.description}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      {/* Thẻ đối tượng nhận diện */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 font-semibold mr-1 uppercase font-mono">Phát hiện:</span>
                        {item.objectsObserved.map((obj, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg bg-indigo-950/70 text-indigo-200 px-2 py-0.5 text-[10px] border border-indigo-800/50 font-medium"
                          >
                            👁️ {obj}
                          </span>
                        ))}
                      </div>

                      {/* Nút hành động */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => openInspector(item)}
                          className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                        >
                          <span>🔍</span> Giám định ảnh
                        </button>

                        <button
                          type="button"
                          onClick={() => onPin(item.clueId, item.clueLabel)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all shadow-md flex items-center gap-1.5 ${
                            isFound
                              ? 'bg-emerald-600 text-white'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95'
                          }`}
                        >
                          <span>{isFound ? '✓' : '📌'}</span>
                          <span>{isFound ? 'Đã ghim' : 'Ghim bằng chứng'}</span>
                        </button>
                      </div>
                    </div>
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
