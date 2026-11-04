import { useState } from 'react'
import { MacSound } from '../MacAudio'
import { usePack } from '../pack'
import type { Suspect } from '../case1'

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
  accuse: (id: string) => string | void
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
  const [confrontModal, setConfrontModal] = useState<{
    type: 'wrong' | 'stage2' | 'locked'
    title: string
    desc: string
    triesLeft?: number
  } | null>(null)

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

  const handleAccuseClick = (s: Suspect) => {
    if (!isPlaying) return

    if (code && !unlocked) {
      MacSound.confrontFail()
      setConfrontModal({
        type: 'locked',
        title: 'Hồ sơ đang bị khoá mã an ninh!',
        desc: code.hint || 'Bạn cần tìm mã an ninh 4 số và nhập vào ô bên trên để mở khóa trước khi tiến hành cáo buộc.',
      })
      return
    }

    MacSound.click()
    const result = accuse(s.id)

    if (result === 'wrong') {
      MacSound.confrontFail()
      setConfrontModal({
        type: 'wrong',
        title: 'Cáo buộc không chính xác!',
        desc: `Cơ quan điều tra xác minh ${s.name} có chứng cứ ngoại phạm hoặc bằng chứng chưa đủ để kết tội! Bạn đã bị trừ 1 lượt cáo buộc.`,
        triesLeft: Math.max(0, triesLeft - 1),
      })
    } else if (result === 'stage2') {
      MacSound.confrontSuccess()
      setConfrontModal({
        type: 'stage2',
        title: `Đã bắt đúng thủ phạm: ${s.name}!`,
        desc: `Tuyệt vời! Bạn đã vạch trần kẻ chủ mưu ${s.name}. Tuy nhiên, hắn còn một ĐỒNG PHẠM tiếp tay tại hiện trường. Hãy chỉ điểm tiếp kẻ đồng phạm để hoàn tất phá án!`,
      })
    } else if (result === 'locked') {
      MacSound.confrontFail()
      setConfrontModal({
        type: 'locked',
        title: 'Hồ sơ đang bị khoá an ninh!',
        desc: code?.hint || 'Vui lòng mở khoá mã 4 số trước khi thực hiện cáo buộc.',
      })
    }
  }

  return (
    <div className="flex h-full flex-col min-h-0 bg-[#ffffff] text-[#1d1d1f] font-['Be_Vietnam_Pro'] relative overflow-y-auto p-4 space-y-4 touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="rounded-2xl border border-slate-200 bg-[#f8f9fa] p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{CASE_META.no}</p>
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
            triesLeft <= 1 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-slate-200 text-slate-700'
          }`}>
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
              className="rounded-xl bg-amber-500 hover:bg-amber-600 px-3.5 py-1.5 text-[12px] font-bold text-slate-950 transition-all shadow-2xs cursor-pointer"
            >
              Mở khoá
            </button>
          </div>
          {codeError && <p className="text-[11px] text-red-600 font-medium">Mã không chính xác. Hãy kiểm tra lại manh mối!</p>}
        </div>
      )}

      {code && unlocked && (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-3 shadow-2xs flex items-center gap-2 text-emerald-800 text-[12px] font-bold">
          <span>🔓</span> Hồ sơ an ninh đã được mở khóa! Bạn đã có thể tiến hành cáo buộc.
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[12px] font-bold text-slate-800 uppercase tracking-wider">
            {stage === 'accomplice' ? 'CHỈ ĐIỂM KẺ ĐỒNG PHẠM:' : 'DANH SÁCH NGHI PHẠM:'}
          </p>
          {stage === 'accomplice' && (
            <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
              Giai đoạn 2
            </span>
          )}
        </div>
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
                disabled={!isPlaying}
                onClick={() => handleAccuseClick(s)}
                className={`mt-3 w-full py-1.5 rounded-xl border text-[12px] font-bold transition-all shadow-2xs cursor-pointer ${
                  code && !unlocked
                    ? 'border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100'
                    : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                }`}
              >
                {code && !unlocked ? '🔒 Cần mở khoá để cáo buộc' : 'Cáo buộc đối tượng này'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL PHẢN HỒI KẾT QUẢ CÁO BUỘC NGAY TRONG FILE APP */}
      {confrontModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl text-center">
            <div className="text-3xl mb-2">
              {confrontModal.type === 'wrong' ? '❌' : confrontModal.type === 'stage2' ? '🎯' : '🔒'}
            </div>
            <h3 className={`text-[15px] font-black ${
              confrontModal.type === 'wrong' ? 'text-red-600' : confrontModal.type === 'stage2' ? 'text-emerald-600' : 'text-amber-700'
            }`}>
              {confrontModal.title}
            </h3>
            <p className="mt-2 text-[12px] text-slate-600 leading-relaxed">
              {confrontModal.desc}
            </p>
            {confrontModal.triesLeft !== undefined && (
              <p className="mt-2 text-[11px] font-bold text-slate-500 bg-slate-100 py-1 px-2 rounded-lg inline-block">
                Số lượt cáo buộc còn lại: <b>{confrontModal.triesLeft} / {maxTries}</b>
              </p>
            )}
            <button
              onClick={() => setConfrontModal(null)}
              className="mt-4 w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-bold transition-all"
            >
              Tiếp tục điều tra
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
