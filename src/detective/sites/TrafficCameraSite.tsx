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
  // CHẾ ĐỘ GIÁM ĐỊNH HÌNH ẢNH CAMERA CHI TIẾT (IN-PLACE, VỪA KHÍT 100% MOBILE)
  // =========================================================================
  if (inspectRecord) {
    const isFound = inspectRecord.clueId ? found.has(inspectRecord.clueId) : false
    const imgSrc = inspectRecord.img ? `${import.meta.env.BASE_URL}${inspectRecord.img.replace(/^\/+/, '')}` : null

    return (
      <div
        className="min-h-full w-full max-w-full overflow-x-hidden bg-[#0a0f1d] text-slate-100 flex flex-col font-['Be_Vietnam_Pro'] pb-12 select-none touch-pan-y"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Sticky Header có nút Quay Lại to rõ ràng */}
        <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-indigo-900/60 px-2.5 sm:px-4 py-2 shadow-xl flex items-center justify-between gap-2 w-full max-w-full overflow-hidden">
          <button
            type="button"
            onClick={closeInspector}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 text-[11px] font-bold shadow-md transition-all active:scale-95 shrink-0"
          >
            <span className="text-sm">←</span>
            <span>Quay lại camera</span>
          </button>

          <div className="flex-1 min-w-0 text-center px-1">
            <h2 className="text-[12px] font-bold text-white truncate">{inspectRecord.camName}</h2>
            <p className="text-[9px] text-slate-400 font-mono truncate">
              {inspectRecord.time} · {inspectRecord.camLocation}
            </p>
          </div>

          <button
            type="button"
            onClick={closeInspector}
            className="h-7 w-7 grid place-items-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold shrink-0 text-xs"
            title="Đóng giám định"
          >
            ✕
          </button>
        </div>

        {/* Nội dung giám định chi tiết */}
        <div className="max-w-2xl w-full mx-auto px-2.5 sm:px-4 py-3 space-y-3 overflow-hidden">
          {/* Thanh công cụ: Bộ lọc & Thu phóng */}
          <div className="bg-slate-900/95 rounded-2xl border border-slate-800 p-2 shadow-lg space-y-1.5 w-full overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex flex-wrap items-center gap-1 text-[10px] font-semibold">
                <span className="text-[9px] text-slate-400 uppercase font-mono mr-0.5">Bộ lọc:</span>
                <button
                  type="button"
                  onClick={() => {
                    MacSound.click()
                    setVisionMode('normal')
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
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
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
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
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                    visionMode === 'uv' ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  🟣 UV
                </button>
                <button
                  type="button"
                  onClick={() => {
                    MacSound.click()
                    setVisionMode('bw')
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                    visionMode === 'bw' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ⬛ B&W
                </button>
              </div>

              <div className="flex items-center gap-1 text-[10px]">
                <span className="text-[9px] text-slate-400 uppercase font-mono mr-0.5">Phóng to:</span>
                {[1, 1.25, 1.5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      MacSound.click()
                      setZoomLevel(lvl)
                    }}
                    className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold transition-colors ${
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
          <div className="relative aspect-video max-h-[35vh] w-full max-w-full rounded-2xl bg-black overflow-hidden border border-slate-800 grid place-items-center shadow-xl">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={inspectRecord.camName}
                style={{ transform: `scale(${zoomLevel})` }}
                className={`max-h-full max-w-full object-contain transition-transform duration-200 ${getVisionFilterClass(visionMode)}`}
                loading="eager"
              />
            ) : (
              <div className="text-slate-500 font-mono text-center p-3">
                <span className="text-3xl block mb-1">📹</span>
                TÍN HIỆU ĐANG KẾT NỐI
              </div>
            )}

            {/* Live CCTV HUD Overlay */}
            <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10 text-[9px] font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>REC {inspectRecord.id}</span>
            </div>
            <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10 text-[9px] font-mono text-slate-300">
              🕒 {inspectRecord.time}
            </div>
          </div>

          {/* Bản ghi phân tích nhận diện */}
          <div className="bg-slate-900/95 p-3 rounded-2xl border border-slate-800 space-y-2 w-full max-w-full overflow-hidden shadow-xl">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Bản ghi phân tích nhận diện:
              </p>
              <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950 px-1.5 py-0.2 rounded border border-indigo-800 shrink-0">
                {inspectRecord.id}
              </span>
            </div>
            <p className="text-[12px] text-slate-200 leading-relaxed font-sans bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 break-words">
              {inspectRecord.description}
            </p>
            <div className="flex flex-wrap gap-1 pt-0.5 max-w-full overflow-hidden">
              {inspectRecord.objectsObserved.map((obj, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-lg bg-indigo-950/80 text-indigo-300 text-[10px] font-mono border border-indigo-800/60"
                >
                  🎯 {obj}
                </span>
              ))}
            </div>
          </div>

          {/* Khối nút hành động phía dưới */}
          <div className="space-y-2 pt-0.5 w-full max-w-full overflow-hidden">
            <button
              type="button"
              onClick={() => {
                onPin(inspectRecord.clueId, inspectRecord.clueLabel)
              }}
              className={`w-full py-2.5 rounded-2xl text-[12px] font-bold transition-all shadow-xl flex items-center justify-center gap-2 ${
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
              className="w-full py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
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
      className="min-h-full w-full max-w-full overflow-x-hidden bg-[#0a0f1d] text-slate-100 pb-16 font-['Be_Vietnam_Pro'] touch-pan-y"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Cổng Camera An Ninh Header Đậm Chất Trinh Thám Hình Sự - Hoàn toàn không bao giờ tràn chiều ngang */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-indigo-900/60 px-3 py-2.5 shadow-xl flex items-center justify-between gap-2 sticky top-0 z-30 backdrop-blur-md bg-opacity-95 w-full max-w-full overflow-hidden">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-600/30 border border-indigo-500/50 text-indigo-400 font-black text-base shadow-inner shrink-0">
            📹
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <h1 className="text-[12px] sm:text-sm font-black tracking-tight text-white truncate uppercase">
                CAMERA AN NINH KHU VỰC
              </h1>
              <span className="rounded-full bg-red-500/20 text-red-400 text-[8px] px-1.5 py-0.2 border border-red-500/30 font-mono flex items-center gap-1 shrink-0">
                <span className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
                CỔNG ĐÔ THỊ
              </span>
            </div>
            <p className="text-[10px] text-indigo-300 truncate">
              Trích xuất dữ liệu camera công cộng theo mốc thời gian
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="rounded-lg bg-indigo-900/40 border border-indigo-700/50 px-2 py-0.5 text-[10px] font-mono text-indigo-200">
            {filtered.length} Băng ghi
          </span>
        </div>
      </div>

      <div className="max-w-5xl w-full mx-auto px-2.5 sm:px-4 py-3.5 space-y-3.5 overflow-hidden">
        {/* Filter bar theo camera & Ô tìm kiếm */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-2.5 sm:p-3 shadow-xl space-y-2.5 w-full max-w-full overflow-hidden">
          <div className="flex gap-1.5 w-full">
            <div className="relative flex-1 min-w-0">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Tìm theo giờ (21:35), đối tượng (Dũng, xe điện)..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-8 pr-3 py-1.5 text-[11px] text-white outline-none focus:border-indigo-500 transition-all font-mono placeholder:text-slate-500"
              />
            </div>
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery('')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono shrink-0"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Location pills */}
          <div className="flex flex-wrap items-center gap-1 pt-1 border-t border-slate-800/80 max-w-full overflow-hidden">
            <span className="text-[9px] text-slate-400 font-mono uppercase mr-0.5 shrink-0">Vị trí:</span>
            <button
              type="button"
              onClick={() => setSelectedCam('all')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium transition-colors ${
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
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium transition-colors ${
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
        <div className="grid gap-3.5 sm:grid-cols-2 w-full max-w-full overflow-hidden">
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center py-10 bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 space-y-1.5">
              <span className="text-3xl block mb-1">🎥</span>
              <p className="text-[12px] font-semibold text-slate-300">Không tìm thấy đoạn ghi hình nào khớp với tìm kiếm.</p>
              <p className="text-[10px] text-slate-500">Hãy thử xóa bộ lọc hoặc tìm bằng từ khóa đơn giản hơn.</p>
            </div>
          ) : (
            filtered.map((item) => {
              const isFound = item.clueId ? found.has(item.clueId) : false
              const imgSrc = item.img ? `${import.meta.env.BASE_URL}${item.img.replace(/^\/+/, '')}` : null

              return (
                <div
                  key={item.id}
                  className={`bg-slate-900/90 rounded-2xl border overflow-hidden shadow-xl transition-all flex flex-col w-full max-w-full group ${
                    isFound
                      ? 'border-emerald-500/80 ring-2 ring-emerald-500/30 bg-emerald-950/20'
                      : 'border-slate-800 hover:border-indigo-500/60 hover:shadow-2xl'
                  }`}
                >
                  {/* MÀN HÌNH CCTV GHI HÌNH CHÂN THỰC */}
                  <div
                    onClick={() => openInspector(item)}
                    className="relative aspect-video w-full max-w-full bg-black cursor-pointer overflow-hidden border-b border-slate-800"
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
                        <span className="text-[10px] font-mono">TÍN HIỆU CAMERA</span>
                      </div>
                    )}

                    {/* Top CCTV Overlay Metadata */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] pointer-events-none">
                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded border border-white/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-red-400">REC</span>
                        <span className="text-slate-300">{item.id}</span>
                      </div>
                      <div className="bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded border border-white/10 text-emerald-400 font-mono">
                        🕒 {item.time}
                      </div>
                    </div>

                    {/* Bottom CCTV Overlay */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none gap-2">
                      <span className="bg-black/75 backdrop-blur-xs text-slate-200 text-[9px] font-mono px-1.5 py-0.5 rounded border border-white/10 truncate max-w-[60%]">
                        📍 {item.camLocation}
                      </span>
                      <span className="bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1 shrink-0">
                        🔍 Giám định
                      </span>
                    </div>
                  </div>

                  {/* THÔNG TIN BĂNG GHI HÌNH */}
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2.5 w-full max-w-full overflow-hidden">
                    <div className="w-full max-w-full overflow-hidden">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-[12px] font-bold text-white tracking-wide truncate">{item.camName}</h3>
                        <span className="rounded bg-indigo-950 text-indigo-300 px-1.5 py-0.2 text-[9px] font-mono border border-indigo-800/60 shrink-0">
                          {item.id}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[11px] text-slate-300 leading-relaxed bg-slate-950/80 rounded-xl p-2.5 border border-slate-800/80 font-sans break-words">
                        {item.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 w-full max-w-full overflow-hidden">
                      {/* Thẻ đối tượng nhận diện */}
                      <div className="flex flex-wrap items-center gap-1 max-w-full overflow-hidden">
                        <span className="text-[9px] text-slate-400 font-semibold mr-0.5 uppercase font-mono shrink-0">Phát hiện:</span>
                        {item.objectsObserved.map((obj, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg bg-indigo-950/70 text-indigo-200 px-2 py-0.5 text-[9px] border border-indigo-800/50 font-medium"
                          >
                            👁️ {obj}
                          </span>
                        ))}
                      </div>

                      {/* Nút hành động */}
                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-800 w-full max-w-full">
                        <button
                          type="button"
                          onClick={() => openInspector(item)}
                          className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 shrink-0"
                        >
                          <span>🔍</span> Giám định ảnh
                        </button>

                        <button
                          type="button"
                          onClick={() => onPin(item.clueId, item.clueLabel)}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all shadow-md flex items-center gap-1 shrink-0 ${
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
