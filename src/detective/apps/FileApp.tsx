import { useState } from 'react'
import { MacSound } from '../MacAudio'
import { usePack } from '../pack'
import type { Suspect } from '../case1'

// Danh sách bằng chứng then chốt buộc tội của từng vụ án
const KEY_EVIDENCE: Record<string, Record<string, string[]>> = {
  hem42: {
    dung: ['don-hang-2147', 'anh-phan-chieu', 'tin-nhan-nhap'],
  },
  'tu-do': {
    son: ['son-vet-xuoc', 'tin-nhan-ban', 'son-no-tien'],
  },
  'hoi-cho': {
    trang: ['trang-giay', 'chuyen-tien-trang', 'chia-ket'],
  },
  'chung-cu': {
    dat: ['lenh-chuyen-200tr', 'gang-tay-dat', 'tu-tat-dien'],
    tu_bv: ['camera-tu-canh-gioi', 'tu-tat-dien'],
  },
  'an-mang': {
    vu: ['so-doc-duoc-vu', 'nhiet-do-am-tra', 'lo-thuy-tinh-ho-ca'],
    yen: ['vu-chuyen-yen-200tr', 'smart-kettle-wifi', 'then-cai-chi-cuoc'],
  },
  'du-thuyen': {
    'minh-khang': ['ve-may-bay-bangkok', 'vietinbank-chuyen-tien-chuoc', 'vali-minh-khang'],
    'thao-my': ['camera-ben-thuyen', 'mua-thuoc-nhuom-toc', 'vong-tay-man-thuyen'],
  },
}

export function FileApp({
  found,
  accuse,
  triesLeft,
  maxTries,
  status,
  stage,
}: {
  found: Set<string>
  accuse: (id: string) => string | void
  triesLeft: number
  maxTries: number
  status: string
  stage: string
  unlocked?: boolean
  code?: { value: string; hint: string }
  onUnlock?: (val: string) => boolean
}) {
  const pack = usePack()
  const { suspects: SUSPECTS, case: CASE_META, clues: CLUES_META } = pack

  // Modal chọn 2 vật chứng định tội
  const [presentingSuspect, setPresentingSuspect] = useState<Suspect | null>(null)
  const [selectedClues, setSelectedClues] = useState<string[]>([])

  // Modal thông báo kết quả luận tội
  const [confrontModal, setConfrontModal] = useState<{
    type: 'wrong' | 'stage2' | 'insufficient'
    title: string
    desc: string
    triesLeft?: number
  } | null>(null)

  const isPlaying = status === 'playing'

  // Mở modal luận tội kèm vật chứng
  const handleStartAccuse = (s: Suspect) => {
    if (!isPlaying) return
    MacSound.click()

    if (found.size < 2) {
      setConfrontModal({
        type: 'insufficient',
        title: 'Chưa đủ chứng cứ luận tội!',
        desc: `Bạn cần thu thập ít nhất 2 manh mối thực tế trong sổ tay trước khi có thể khởi tố và luận tội ${s.name} trước Viện kiểm sát!`,
      })
      return
    }

    setPresentingSuspect(s)
    setSelectedClues([])
  }

  // Toggle chọn manh mối
  const toggleSelectClue = (cid: string) => {
    MacSound.click()
    setSelectedClues((prev) => {
      if (prev.includes(cid)) {
        return prev.filter((id) => id !== cid)
      }
      if (prev.length >= 2) {
        // Chỉ chọn tối đa 2 bằng chứng
        return [prev[1], cid]
      }
      return [...prev, cid]
    })
  }

  // Thực hiện luận tội chính thức
  const handleConfirmAccuse = () => {
    if (!presentingSuspect || selectedClues.length !== 2) return
    const s = presentingSuspect
    setPresentingSuspect(null)

    const caseKey = pack.id
    const targetKeyClues = KEY_EVIDENCE[caseKey]?.[s.id] || []
    const matchCount = selectedClues.filter((c) => targetKeyClues.includes(c)).length

    // Trường hợp 1: Nhắm đúng đối tượng nhưng chọn sai bằng chứng then chốt (cần ít nhất 2 bằng chứng then chốt)
    const isTargetCulprit =
      (stage === 'main' && s.id === pack.case.culprit) ||
      (stage === 'accomplice' && s.id === pack.accomplice)

    if (isTargetCulprit && matchCount < 2) {
      MacSound.confrontFail()
      // Gọi accuse giả lập để trừ lượt trong hook useCase
      accuse('__insufficient_evidence__')
      setConfrontModal({
        type: 'wrong',
        title: 'Viện Kiểm Sát Bác Đơn Luận Tội!',
        desc: `Bạn đã nhắm đúng đối tượng ${s.name}, tuy nhiên 2 bằng chứng bạn xuất trình chưa đủ cơ sở pháp lý để kết tội hắn trước toà! Đối tượng đã thuê luật sư cãi trắng án. Bạn bị trừ 1 lượt cáo buộc!`,
        triesLeft: Math.max(0, triesLeft - 1),
      })
      return
    }

    // Trường hợp 2 & 3: Thực hiện cáo buộc
    const result = accuse(s.id)

    if (result === 'wrong') {
      MacSound.confrontFail()
      setConfrontModal({
        type: 'wrong',
        title: 'Cáo buộc không chính xác!',
        desc: `Cơ quan điều tra xác minh ${s.name} có chứng cứ ngoại phạm vững chắc hoặc hoàn toàn không liên quan đến vụ án! Bạn đã bị trừ 1 lượt cáo buộc.`,
        triesLeft: Math.max(0, triesLeft - 1),
      })
    } else if (result === 'stage2') {
      MacSound.confrontSuccess()
      setConfrontModal({
        type: 'stage2',
        title: `Đã vạch trần thủ phạm: ${s.name}!`,
        desc: `Tuyệt vời! Bằng chứng thuyết phục của bạn đã khiến kẻ chủ mưu ${s.name} phải cúi đầu nhận tội. Tuy nhiên, hắn còn một ĐỒNG PHẠM tiếp tay đắc lực tại hiện trường. Hãy tiếp tục chỉ điểm kẻ đồng phạm để hoàn tất phá án!`,
      })
    }
  }

  // Danh sách các manh mối người chơi đã tìm thấy
  const foundCluesList = Array.from(found).map((cid) => ({
    id: cid,
    meta: CLUES_META[cid],
  })).filter((item) => Boolean(item.meta))

  return (
    <div className="flex h-full flex-col min-h-0 bg-[#ffffff] text-[#1d1d1f] font-['Be_Vietnam_Pro'] relative overflow-y-auto p-4 space-y-4 touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
      {/* Thông tin vụ án */}
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

      {/* Danh sách nghi phạm */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[12px] font-bold text-slate-800 uppercase tracking-wider">
            {stage === 'accomplice' ? 'CHỈ ĐIỂM KẺ ĐỒNG PHẠM:' : 'DANH SÁCH NGHI PHẠM:'}
          </p>
          {stage === 'accomplice' && (
            <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Giai đoạn 2 · Chỉ điểm đồng phạm
            </span>
          )}
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {SUSPECTS.map((s) => (
            <div key={s.id} className="p-3.5 rounded-xl border border-slate-200 bg-[#f8f9fa] flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-all">
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
                onClick={() => handleStartAccuse(s)}
                className="mt-3 w-full py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-[12px] font-bold transition-all shadow-2xs cursor-pointer active:scale-98 flex items-center justify-center gap-1.5"
              >
                <span>⚖️</span>
                <span>Luận tội đối tượng này</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL TRÌNH DIỆN 2 BẰNG CHỨNG BUỘC TỘI */}
      {presentingSuspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{presentingSuspect.avatar}</span>
                <div>
                  <h4 className="text-[14px] font-bold text-slate-900">
                    Luận tội: {presentingSuspect.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">{presentingSuspect.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPresentingSuspect(null)}
                className="text-slate-400 hover:text-slate-700 text-lg px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="my-3 space-y-1">
              <p className="text-[12px] font-bold text-indigo-950 flex items-center justify-between">
                <span>Chọn đúng 2 bằng chứng then chốt để kết tội:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  selectedClues.length === 2 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  Đã chọn {selectedClues.length}/2
                </span>
              </p>
              <p className="text-[11px] text-slate-500">
                Nếu chọn sai bằng chứng, Viện kiểm sát sẽ bác đơn và bạn sẽ bị trừ 1 lượt cáo buộc!
              </p>
            </div>

            {/* Danh sách các bằng chứng đã thu thập */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 my-2">
              {foundCluesList.length === 0 ? (
                <p className="text-center py-8 text-[12px] text-slate-400">
                  Bạn chưa thu thập manh mối nào trong sổ tay! Hãy đi điều tra thêm.
                </p>
              ) : (
                foundCluesList.map(({ id: cid, meta }) => {
                  const isSelected = selectedClues.includes(cid)
                  const tagIcon = meta.tag === 'chat' ? '💬' : meta.tag === 'photo' ? '📷' : meta.tag === 'web' ? '🌐' : '📄'

                  return (
                    <div
                      key={cid}
                      onClick={() => toggleSelectClue(cid)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-2.5 select-none ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 shadow-xs ring-1 ring-indigo-500'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base shrink-0 mt-0.5">{tagIcon}</span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-[12px] font-bold leading-snug ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                          {meta.title}
                        </p>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {meta.detail}
                        </p>
                      </div>
                      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold border transition-colors ${
                        isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 text-transparent'
                      }`}>
                        ✓
                      </span>
                    </div>
                  )
                })
              )}
            </div>

            {/* Hành động luận tội */}
            <div className="flex gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPresentingSuspect(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-[12px] font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={selectedClues.length !== 2}
                onClick={handleConfirmAccuse}
                className={`flex-1 py-2.5 rounded-xl text-[12px] font-bold transition-all shadow-xs cursor-pointer ${
                  selectedClues.length === 2
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Khởi tố & Luận tội
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PHẢN HỒI KẾT QUẢ CÁO BUỘC */}
      {confrontModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl text-center">
            <div className="text-3xl mb-2">
              {confrontModal.type === 'wrong' || confrontModal.type === 'insufficient' ? '❌' : '🎯'}
            </div>
            <h4 className="text-[15px] font-bold text-slate-900">{confrontModal.title}</h4>
            <p className="mt-2 text-[12px] text-slate-600 leading-relaxed font-sans">{confrontModal.desc}</p>
            {confrontModal.triesLeft !== undefined && (
              <p className="mt-2 text-[11px] font-bold text-red-600">
                Lượt cáo buộc còn lại: {confrontModal.triesLeft}
              </p>
            )}
            <button
              onClick={() => setConfrontModal(null)}
              className="mt-4 w-full rounded-xl bg-slate-900 py-2 text-[12px] font-bold text-white hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
            >
              Tiếp tục điều tra
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
