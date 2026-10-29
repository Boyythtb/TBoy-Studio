import { useState } from 'react'
import { MacSound } from '../MacAudio'
import { usePack } from '../pack'

export function FileApp({
  found: _found,
  accuse,
  triesLeft,
  maxTries,
  status,
  stage,
  unlocked,
  code,
  onUnlock,
}: {
  found: Set<string>
  accuse: (id: string) => void
  triesLeft: number
  maxTries: number
  status: string
  stage: string
  unlocked: boolean
  code?: { value: string; hint: string }
  onUnlock: (val: string) => boolean
}) {
  const { suspects: SUSPECTS, case: CASE_META } = usePack()
  const [codeInput, setCodeInput] = useState('')
  const [codeError, setCodeError] = useState(false)
  const isPlaying = status === 'playing'

  const handleUnlock = () => {
    const ok = onUnlock(codeInput)
    if (!ok) {
      MacSound.confrontFail()
      setCodeError(true)
    } else {
      MacSound.confrontSuccess()
      setCodeError(false)
    }
  }

  return (
    <div className="flex h-full flex-col bg-[#ffffff] text-[#1d1d1f] font-['Be_Vietnam_Pro'] relative overflow-y-auto p-4 space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-[#f8f9fa] p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{CASE_META.no}</p>
          <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] text-slate-700 font-bold">
            Còn {triesLeft}/{maxTries} lượt cáo buộc
          </span>
        </div>
        <h3 className="mt-1.5 text-[16px] font-bold text-slate-900 tracking-tight">{CASE_META.title}</h3>
        <p className="mt-1 text-[12px] text-slate-600 leading-relaxed">{CASE_META.brief}</p>
      </div>

      {code && !unlocked && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 shadow-2xs space-y-2.5">
          <p className="text-[12px] font-bold text-amber-900 flex items-center gap-1.5">
            <span>🔒</span> HỒ SƠ BỊ KHOÁ MÃ AN NINH
          </p>
          <p className="text-[12px] text-slate-700">{code.hint}</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Nhập mã 4 số..."
              maxLength={4}
              className="flex-1 rounded-xl bg-white border border-slate-300 px-3 py-1.5 text-[13px] text-slate-900 font-mono outline-none focus:border-amber-500"
            />
            <button
              onClick={handleUnlock}
              className="rounded-xl bg-amber-500 hover:bg-amber-600 px-3.5 py-1.5 text-[12px] font-bold text-slate-950 transition-all shadow-2xs"
            >
              Mở khoá
            </button>
          </div>
          {codeError && <p className="text-[11px] text-red-600 font-medium">Mã không chính xác. Hãy kiểm tra lại manh mối!</p>}
        </div>
      )}

      <div>
        <p className="text-[12px] font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          {stage === 'accomplice' ? 'CHỈ ĐIỂM KẺ ĐỒNG PHẠM:' : 'DANH SÁCH NGHI PHẠM:'}
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {SUSPECTS.map((s) => (
            <div key={s.id} className="p-3.5 rounded-xl border border-slate-200 bg-[#f8f9fa] flex flex-col justify-between shadow-2xs">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{s.avatar}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-slate-900">{s.name}</p>
                  <p className="text-[11px] text-slate-500">{s.role}</p>
                </div>
              </div>
              <p className="mt-2 text-[12px] text-slate-600 line-clamp-2">{s.note}</p>
              <button
                disabled={!isPlaying || (!!code && !unlocked)}
                onClick={() => {
                  MacSound.click()
                  accuse(s.id)
                }}
                className="mt-3 w-full py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-[12px] font-bold text-slate-800 transition-all disabled:opacity-30 shadow-2xs"
              >
                Cáo buộc đối tượng này
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- main case game */
