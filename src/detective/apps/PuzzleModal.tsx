import React, { useState } from 'react'
import { MacSound } from '../MacAudio'
import type { CasePuzzle } from '../puzzles'

interface Props {
  puzzle: CasePuzzle
  isSolved: boolean
  onSolve: (puzzle: CasePuzzle) => void
  onClose: () => void
}

export function PuzzleModal({ puzzle, isSolved, onSolve, onClose }: Props) {
  const [inputVal, setInputVal] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [success, setSuccess] = useState(isSolved)

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (success) return

    const normalized = inputVal.trim().toLowerCase()
    if (!normalized) {
      setErrorMsg('Vui lòng nhập câu trả lời trước khi kiểm tra!')
      return
    }

    const matched = puzzle.acceptedAnswers.some(
      (ans) => ans.trim().toLowerCase() === normalized
    )

    if (matched) {
      MacSound.confrontSuccess()
      setSuccess(true)
      setErrorMsg(null)
      onSolve(puzzle)
    } else {
      MacSound.confrontFail()
      setErrorMsg('❌ Đáp án chưa chính xác! Hãy đọc kỹ dữ kiện hoặc bấm "Xem gợi ý".')
    }
  }

  return (
    <div className="fixed inset-0 z-[1050] grid place-items-center bg-black/75 p-4 backdrop-blur-sm font-['Be_Vietnam_Pro'] animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-[#f8f9fa] px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-100 border border-amber-200 text-xl shadow-2xs">
              {puzzle.icon}
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                Thử Thách Giải Mã Manh Mối
              </p>
              <h3 className="text-[14px] font-bold text-slate-900 leading-snug">
                {puzzle.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              MacSound.click()
              onClose()
            }}
            className="grid h-8 w-8 place-items-center rounded-xl bg-slate-200/70 text-slate-600 hover:bg-slate-300 transition-colors text-xs font-bold"
            aria-label="Đóng câu đố"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Brief */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 text-[12px] text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800">Bối cảnh vụ án: </span>
            {puzzle.brief}
          </div>

          {/* Question Box */}
          <div className="rounded-2xl border-2 border-blue-500/30 bg-blue-50/50 p-4">
            <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-1.5">
              <span>🧩</span>
              <span>Câu đố trinh thám</span>
            </div>
            <p className="text-[13px] font-medium text-slate-900 leading-relaxed whitespace-pre-line">
              {puzzle.question}
            </p>
          </div>

          {/* Success state */}
          {success ? (
            <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-400 p-4 text-center animate-in zoom-in-95 duration-200">
              <div className="text-3xl mb-1">🎉</div>
              <h4 className="text-[14px] font-bold text-emerald-800">
                CHÚC MỪNG! BẠN ĐÃ GIẢI MÃ THÀNH CÔNG!
              </h4>
              <p className="text-[12px] text-emerald-700 mt-1 leading-relaxed">
                {puzzle.rewardDesc}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-1.5 text-[12px] font-bold text-white shadow-sm">
                <span>📌 Manh mối đã lưu:</span>
                <span>{puzzle.clueTitle}</span>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nhập câu trả lời của bạn:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value)
                      if (errorMsg) setErrorMsg(null)
                    }}
                    placeholder="Gõ đáp án vào đây..."
                    autoFocus
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-[12px] font-bold text-white shadow-md transition-all active:scale-95 whitespace-nowrap"
                  >
                    Kiểm tra
                  </button>
                </div>
              </div>

              {errorMsg && (
                <p className="text-[12px] font-semibold text-red-600 animate-shake">
                  {errorMsg}
                </p>
              )}
            </form>
          )}

          {/* Hint Accordion */}
          {!success && (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  MacSound.click()
                  setShowHint((h) => !h)
                }}
                className="text-[11px] font-bold text-amber-600 hover:text-amber-700 transition flex items-center gap-1.5"
              >
                <span>💡</span>
                <span>{showHint ? 'Ẩn gợi ý' : 'Bấm vào đây để xem gợi ý'}</span>
              </button>
            </div>
          )}

          {showHint && !success && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-900 leading-relaxed animate-in fade-in duration-150">
              <span className="font-bold">Gợi ý từ điều tra viên: </span>
              {puzzle.hint}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-[#fafafb] px-5 py-3 flex justify-end">
          <button
            onClick={() => {
              MacSound.click()
              onClose()
            }}
            className="rounded-xl px-4 py-1.5 text-[12px] font-bold text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
