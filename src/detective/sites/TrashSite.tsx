import { useState } from 'react'
import { MacSound } from '../MacAudio'
import type { TrashItem } from '../case1'

interface Props {
  trash: TrashItem[]
  found: Set<string>
  onPin: (clueId?: string, label?: string) => void
}

export function TrashSite({ trash, found, onPin }: Props) {
  const [activeItem, setActiveItem] = useState<string | null>(trash[0]?.id || null)
  const current = trash.find((t) => t.id === activeItem) || trash[0]

  // Trạng thái mở khóa tài liệu / file thùng rác
  const [unlockedFiles, setUnlockedFiles] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('tboy.detective.unlockedFiles')
      return raw ? new Set(JSON.parse(raw)) : new Set<string>()
    } catch {
      return new Set<string>()
    }
  })
  const [inputCodes, setInputCodes] = useState<Record<string, string>>({})
  const [errorMsgs, setErrorMsgs] = useState<Record<string, string>>({})
  const [activeHints, setActiveHints] = useState<Record<string, boolean>>({})

  const handleUnlockFile = (fileId: string, codes?: string[]) => {
    if (!codes || codes.length === 0) return
    const inputVal = (inputCodes[fileId] || '').trim().toLowerCase().replace(/\s+/g, '')

    if (!inputVal) {
      setErrorMsgs((prev) => ({ ...prev, [fileId]: 'Vui lòng nhập giờ cất cánh để giải mã!' }))
      return
    }

    const matched = codes.some((c) => {
      const clean = c.trim().toLowerCase().replace(/\s+/g, '')
      return clean === inputVal || inputVal.includes(clean) || clean.includes(inputVal)
    })

    if (matched) {
      MacSound.confrontSuccess()
      const nextSet = new Set(unlockedFiles)
      nextSet.add(fileId)
      setUnlockedFiles(nextSet)
      try {
        localStorage.setItem('tboy.detective.unlockedFiles', JSON.stringify(Array.from(nextSet)))
      } catch {
        // ignore
      }
      setErrorMsgs((prev) => ({ ...prev, [fileId]: '' }))
    } else {
      MacSound.confrontFail()
      setErrorMsgs((prev) => ({
        ...prev,
        [fileId]: '❌ Giờ khởi hành không đúng! Hãy kiểm tra lời khai và nhật ký điều tra.',
      }))
    }
  }

  const isCurrentLocked = Boolean(current?.locked && !unlockedFiles.has(current.id))

  return (
    <div className="p-5 max-w-4xl mx-auto space-y-4 font-['Be_Vietnam_Pro'] select-none">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
        <h2 className="text-[15px] font-bold text-slate-900">Thùng rác khu vực & Khám nghiệm phế thải</h2>
        <p className="text-[12px] text-slate-500">Khám xét các vật chứng và tệp tài liệu bị hung thủ phi tang hoặc giấu kín.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {/* Item list */}
        <div className="space-y-2">
          {trash.map((t) => {
            const isSelected = current?.id === t.id
            const isFound = t.clue ? found.has(t.clue) : false
            const isLocked = Boolean(t.locked && !unlockedFiles.has(t.id))

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  MacSound.click()
                  setActiveItem(t.id)
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[13px] truncate flex items-center gap-1">
                    {isLocked && <span>🔒</span>}
                    <span>{t.name}</span>
                  </span>
                  {isFound && <span className="text-emerald-600 text-xs shrink-0">📌</span>}
                </div>
              </button>
            )
          })}
        </div>

        {/* Item detail */}
        {current && (
          <div className="sm:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  {current.kind}
                </span>
                {isCurrentLocked && (
                  <span className="rounded-full bg-red-100 text-red-700 font-bold text-[9px] px-2 py-0.2 border border-red-200">
                    TỆP PDF BỊ MÃ HÓA
                  </span>
                )}
              </div>
              <h3 className="text-base font-black text-slate-900 mt-1 flex items-center gap-1.5">
                {isCurrentLocked && <span className="text-red-500">🔒</span>}
                <span>{current.name}</span>
              </h3>

              {isCurrentLocked ? (
                <p className="text-[12px] font-mono text-red-600 italic bg-red-50 p-2.5 rounded-xl border border-red-200 mt-2">
                  🔒 [TỆP TÀI LIỆU BẢO MẬT] Hồ sơ vé máy bay điện tử bị khóa mã PIN an ninh hàng không. Hãy nhập đúng giờ cất cánh chuyến bay sáng mai để giải mã.
                </p>
              ) : (
                <p className="text-[12px] text-slate-700 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed font-sans">
                  {current.detail}
                </p>
              )}
            </div>

            {/* KHUNG GIẢI MÃ VÉ MÁY BAY HÃNG HÀNG KHÔNG CHO VỤ 6 */}
            {isCurrentLocked && (
              <div className="rounded-2xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-sky-50 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✈️</span>
                  <div>
                    <h4 className="text-[12px] font-bold text-indigo-900 uppercase tracking-wide">
                      Hàng Không Việt Nam: Mở khóa vé máy bay điện tử
                    </h4>
                    <p className="text-[10px] text-slate-600">
                      Tệp PDF vé máy bay đi Bangkok bị khóa mật mã. Nhập giờ khởi hành chuyến bay sáng mai để in vé.
                    </p>
                  </div>
                </div>

                <div className="bg-white/90 p-3 rounded-xl border border-indigo-200 text-[11px] text-slate-700 leading-relaxed font-sans">
                  <p className="font-bold text-indigo-800 mb-0.5">Nhiệm vụ điều tra:</p>
                  <p>{current.lockPrompt}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputCodes[current.id] || ''}
                      onChange={(e) => {
                        const val = e.target.value
                        setInputCodes((prev) => ({ ...prev, [current.id]: val }))
                        setErrorMsgs((prev) => ({ ...prev, [current.id]: '' }))
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleUnlockFile(current.id, current.lockCodes)
                      }}
                      placeholder="Nhập giờ cất cánh (VD: 06:00)..."
                      className="flex-1 rounded-xl bg-white border border-indigo-300 px-3.5 py-2 text-[12px] font-mono text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => handleUnlockFile(current.id, current.lockCodes)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-sm active:scale-95 transition-all shrink-0"
                    >
                      Giải mã PDF
                    </button>
                  </div>

                  {errorMsgs[current.id] && (
                    <p className="text-[11px] font-semibold text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                      {errorMsgs[current.id]}
                    </p>
                  )}

                  {current.lockHint && (
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          MacSound.click()
                          setActiveHints((prev) => ({ ...prev, [current.id]: !prev[current.id] }))
                        }}
                        className="text-[10px] text-indigo-700 hover:underline font-semibold flex items-center gap-1"
                      >
                        <span>💡</span>
                        <span>{activeHints[current.id] ? 'Ẩn gợi ý' : 'Gợi ý nơi tìm giờ chuyến bay?'}</span>
                      </button>
                      {activeHints[current.id] && (
                        <p className="mt-1 text-[10px] text-slate-600 bg-white/80 p-2 rounded-lg border border-indigo-200 italic">
                          {current.lockHint}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              {isCurrentLocked ? (
                <button
                  type="button"
                  disabled
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 text-slate-400 font-bold text-[12px] cursor-not-allowed"
                >
                  <span>🔒</span>
                  <span>Cần giải mã tệp tài liệu</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onPin(current.clue, `Vật chứng thùng rác: ${current.name}`)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm transition-colors"
                >
                  <span>📌</span>
                  <span>Lưu ghi chép vật chứng</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
