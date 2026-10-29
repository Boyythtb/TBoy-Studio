import { getBmsLogs } from '../caseSites'

interface Props {
  caseId: string
  found: Set<string>
  onPin: (clueId?: string, label?: string) => void
}

export function SmartBuildingSite({ caseId, found, onPin }: Props) {
  const logs = getBmsLogs(caseId)
  const isHorizon = caseId === 'cong-ty-x'

  return (
    <div className="min-h-full bg-[#0f172a] text-slate-100 pb-12 font-['Be_Vietnam_Pro'] select-none">
      {/* Header IoT / BMS Công Nghệ Cao */}
      <div className="bg-[#1e293b] border-b border-slate-700/80 px-5 py-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/20 text-cyan-400 font-black text-xl border border-cyan-500/40 shadow-xs">
            {isHorizon ? '🏢' : '🏡'}
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white flex items-center gap-2">
              <span>{isHorizon ? 'BMS HORIZON TOWER' : 'TUYA SMART HOME IOT'}</span>
              <span className="rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 border border-emerald-500/30">Realtime Sensor Logs</span>
            </h1>
            <p className="text-[11px] text-slate-400">
              {isHorizon ? 'Hệ thống Quản lý Tòa nhà & Cảm biến Điện Lực Horizon' : 'Hệ thống Cảm biến Nhiệt & Thiết bị Thông minh Biệt thự'}
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <p className="text-[11px] text-slate-400">Cảm biến trực tuyến</p>
          <p className="text-[12px] font-bold text-cyan-400">● 100% Online</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        <div className="flex items-center justify-between text-[12px] text-slate-400 px-1 border-b border-slate-800 pb-2">
          <span>Nhật ký cảm biến & thiết bị ghi nhận trong khung giờ vụ án:</span>
          <span className="font-mono text-cyan-400">{logs.length} bản ghi sự kiện</span>
        </div>

        {/* Logs Timeline */}
        <div className="space-y-3.5">
          {logs.map((log) => {
            const isFound = log.clueId ? found.has(log.clueId) : false
            const isAlert = log.status === 'alert'
            const isWarning = log.status === 'warning'

            return (
              <div
                key={log.id}
                className={`rounded-2xl border p-4.5 shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                  isAlert
                    ? 'bg-red-950/30 border-red-500/50 hover:border-red-400'
                    : isWarning
                    ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                    : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="flex flex-col items-center shrink-0">
                    <span className="font-mono text-[12px] font-black text-cyan-300 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700">
                      {log.time}
                    </span>
                    <span className="h-6 w-0.5 bg-slate-700 my-1" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[13px] font-bold text-white">{log.device}</span>
                      <span className="text-[11px] text-slate-400 font-medium">📍 {log.location}</span>
                      {isAlert && (
                        <span className="rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-bold px-2 py-0.2">
                          NGHI VẤN CAO
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-slate-300 leading-relaxed font-normal">{log.event}</p>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto flex justify-end">
                  <button
                    type="button"
                    onClick={() => onPin(log.clueId, log.clueLabel || `Nhật ký cảm biến: ${log.device}`)}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[11px] font-bold border transition-all ${
                      isFound
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500 shadow-sm'
                    }`}
                    title="Trích xuất dữ liệu cảm biến vào Sổ vụ án"
                  >
                    <span>{isFound ? '📌' : '📋'}</span>
                    <span>{isFound ? 'Đã trích xuất' : 'Trích xuất dữ liệu'}</span>
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
