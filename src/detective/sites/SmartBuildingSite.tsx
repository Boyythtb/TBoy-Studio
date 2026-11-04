import { useState } from 'react'
import { MacSound } from '../MacAudio'
import { getBmsLogs } from '../caseSites'

interface Props {
  caseId: string
  found: Set<string>
  onPin: (clueId?: string, label?: string) => void
}

export function SmartBuildingSite({ caseId, found, onPin }: Props) {
  const logs = getBmsLogs(caseId)
  const isHorizon = caseId === 'cong-ty-x' || caseId === 'chung-cu'

  // Trạng thái mở khóa BMS / IoT Logs
  const [unlockedLogs, setUnlockedLogs] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(`tboy.detective.unlockedLogs.${caseId}`)
      return raw ? new Set(JSON.parse(raw)) : new Set<string>()
    } catch {
      return new Set<string>()
    }
  })
  const [inputCodes, setInputCodes] = useState<Record<string, string>>({})
  const [errorMsgs, setErrorMsgs] = useState<Record<string, string>>({})
  const [activeHints, setActiveHints] = useState<Record<string, boolean>>({})

  const handleUnlockLog = (logId: string, codes?: string[]) => {
    if (!codes || codes.length === 0) return
    const inputVal = (inputCodes[logId] || '').trim().toLowerCase().replace(/\s+/g, '')

    if (!inputVal) {
      setErrorMsgs((prev) => ({ ...prev, [logId]: 'Vui lòng nhập mã an ninh xác thực!' }))
      return
    }

    const matched = codes.some((c) => {
      const clean = c.trim().toLowerCase().replace(/\s+/g, '')
      return clean === inputVal || inputVal.includes(clean) || clean.includes(inputVal)
    })

    if (matched) {
      MacSound.confrontSuccess()
      const nextSet = new Set(unlockedLogs)
      nextSet.add(logId)
      setUnlockedLogs(nextSet)
      try {
        localStorage.setItem(`tboy.detective.unlockedLogs.${caseId}`, JSON.stringify(Array.from(nextSet)))
      } catch {
        // ignore
      }
      setErrorMsgs((prev) => ({ ...prev, [logId]: '' }))
    } else {
      MacSound.confrontFail()
      setErrorMsgs((prev) => ({
        ...prev,
        [logId]: '❌ Mã an ninh không khớp! Hãy kiểm tra lại tài liệu sơ đồ hoặc nhật ký thiết bị.',
      }))
    }
  }

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
              <span>{isHorizon ? 'BMS TOÀ NHÀ CHUNG CƯ 42' : 'TUYA SMART HOME IOT'}</span>
              <span className="rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 border border-emerald-500/30">
                Realtime Sensor Logs
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              {isHorizon
                ? 'Hệ thống Quản lý Tòa nhà & Cảm biến Kỹ thuật BMS'
                : 'Hệ thống Cảm biến Nhiệt & Thiết bị Thông minh Biệt thự'}
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
            const isLocked = Boolean(log.locked && !unlockedLogs.has(log.id))

            return (
              <div
                key={log.id}
                className={`rounded-2xl border p-4.5 shadow-md transition-all flex flex-col gap-3.5 ${
                  isLocked
                    ? 'border-cyan-500/50 bg-cyan-950/20'
                    : isAlert
                    ? 'bg-red-950/30 border-red-500/50 hover:border-red-400'
                    : isWarning
                    ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                    : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="flex flex-col items-center shrink-0">
                      <span className="font-mono text-[12px] font-black text-cyan-300 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700">
                        {log.time}
                      </span>
                      <span className="h-6 w-0.5 bg-slate-700 my-1" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[13px] font-bold text-white flex items-center gap-1">
                          {isLocked && <span className="text-cyan-400">🔒</span>}
                          <span>{log.device}</span>
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">📍 {log.location}</span>
                        {isAlert && (
                          <span className="rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-bold px-2 py-0.2">
                            NGHI VẤN CAO
                          </span>
                        )}
                        {isLocked && (
                          <span className="rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold px-2 py-0.2 font-mono">
                            YÊU CẦU QUYỀN TRUY CẬP
                          </span>
                        )}
                      </div>

                      {isLocked ? (
                        <p className="text-[12px] font-mono text-cyan-300/80 italic bg-slate-950/70 p-2 rounded-xl border border-cyan-800/60">
                          🔒 [DỮ LIỆU CẢM BIẾN BỊ KHÓA] Yêu cầu xác thực quyền quản trị để giải mã thông số kỹ thuật.
                        </p>
                      ) : (
                        <p className="text-[12px] text-slate-300 leading-relaxed font-normal">{log.event}</p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 w-full sm:w-auto flex justify-end">
                    {isLocked ? (
                      <button
                        type="button"
                        disabled
                        className="flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[11px] font-bold border border-slate-700 bg-slate-900 text-slate-500 cursor-not-allowed"
                      >
                        <span>🔒</span>
                        <span>Cần quyền an ninh</span>
                      </button>
                    ) : (
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
                    )}
                  </div>
                </div>

                {/* KHUNG GIẢI MÃ BẢO MẬT BMS / IOT RIÊNG */}
                {isLocked && (
                  <div className="rounded-2xl border-2 border-cyan-500/60 bg-slate-950/90 p-4 space-y-3 shadow-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💻</span>
                      <div>
                        <h4 className="text-[12px] font-bold text-cyan-300 uppercase tracking-wide">
                          {isHorizon
                            ? 'Bảng điều khiển BMS: Khôi phục dữ liệu Aptomat hầm B1'
                            : 'Tuya Cloud Gateway: Đồng bộ cảm biến Smart Kettle'}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {isHorizon
                            ? 'Dữ liệu dập cầu dao bị khóa bởi Ban Quản Lý. Nhập mã an ninh để trích xuất nhật ký.'
                            : 'Đồ thị nhiệt độ bị khóa đồng bộ Cloud. Nhập mốc thời gian ấm đun sôi 100°C để tải về dữ liệu.'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-800/80 text-[11px] text-slate-200 leading-relaxed font-sans">
                      <p className="font-bold text-cyan-300 mb-0.5">Nhiệm vụ giải mã:</p>
                      <p>{log.lockPrompt}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={inputCodes[log.id] || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            setInputCodes((prev) => ({ ...prev, [log.id]: val }))
                            setErrorMsgs((prev) => ({ ...prev, [log.id]: '' }))
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleUnlockLog(log.id, log.lockCodes)
                          }}
                          placeholder={isHorizon ? 'Nhập mã an ninh BQL (4 chữ số)...' : 'Nhập mốc đun sôi (VD: 21:30)...'}
                          className="flex-1 rounded-xl bg-slate-900 border border-cyan-700/80 px-3.5 py-2 text-[12px] font-mono text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner"
                        />
                        <button
                          type="button"
                          onClick={() => handleUnlockLog(log.id, log.lockCodes)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-[11px] shadow-sm active:scale-95 transition-all shrink-0"
                        >
                          Xác thực mã
                        </button>
                      </div>

                      {errorMsgs[log.id] && (
                        <p className="text-[11px] font-semibold text-rose-400 bg-rose-950/40 p-2 rounded-lg border border-rose-800/60">
                          {errorMsgs[log.id]}
                        </p>
                      )}

                      {log.lockHint && (
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              MacSound.click()
                              setActiveHints((prev) => ({ ...prev, [log.id]: !prev[log.id] }))
                            }}
                            className="text-[10px] text-cyan-400 hover:underline font-semibold flex items-center gap-1"
                          >
                            <span>💡</span>
                            <span>{activeHints[log.id] ? 'Ẩn gợi ý' : 'Gợi ý nơi tìm mã xác thực?'}</span>
                          </button>
                          {activeHints[log.id] && (
                            <p className="mt-1 text-[10px] text-slate-300 bg-slate-900/90 p-2 rounded-lg border border-cyan-800/60 italic">
                              {log.lockHint}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
