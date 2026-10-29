import { useEffect, useState } from 'react'
import { MacSound } from '../MacAudio'
import { usePack } from '../pack'

const TAGS: Record<string, string> = { chat: '💬', web: '🌐', photo: '📸', file: '🗂️' }

const EVIDENCE_SUSPECT_LINKS: Record<string, { suspectId: string; reason: string }[]> = {
  'don-hang-2147': [{ suspectId: 'dung', reason: 'Định vị GPS chứng minh Dũng nhận đơn tại Hẻm 42 đúng 21:47!' }],
  'anh-phan-chieu': [{ suspectId: 'dung', reason: 'Mặt kính cửa hàng phản chiếu Dũng dắt xe xanh mint lúc 21:58!' }],
  'tin-nhan-nhap': [{ suspectId: 'dung', reason: 'Bản nháp tin nhắn trong máy Dũng: "Cô Lan ơi mai em trả xe"!' }],
  'dung-khai-21h15': [{ suspectId: 'dung', reason: 'Dũng khai về phòng từ 21:15 để ngụy tạo chứng cứ ngoại phạm!' }],
  'hung-cho-vay': [{ suspectId: 'dung', reason: 'Dũng nợ tiền tiệm sửa xe Hùng nên túng quẫn làm liều!' }],

  'son-ao-do': [{ suspectId: 'son', reason: 'Ảnh chụp lúc 20:20: Sơn mặc áo khoác đỏ đứng sát vách tủ đồ!' }],
  'son-no-tien': [{ suspectId: 'son', reason: 'Sơn nợ chị Hạnh 6 triệu quá hạn, nháp rao bán máy 5 triệu!' }],
  'lo-hong-tu': [{ suspectId: 'son', reason: 'Sơn lợi dụng khe hở nóc tủ để thò tay rút điện thoại!' }],

  'trang-giay': [{ suspectId: 'trang', reason: 'Giày vải trắng của Trang dính bùn đỏ chỉ có ở sau bệ hòm quỹ!' }],
  'chuyen-tien-trng': [{ suspectId: 'trang', reason: 'Trang chuyển khoản gấp 8 triệu cho chủ nợ Tú lúc 21:32!' }],
  'tin-nhan-do': [{ suspectId: 'trang', reason: 'Tin nhắn hẹn chủ nợ: "Tối nay xong chuyển 8tr"!' }],
  'hop-den': [{ suspectId: 'trang', reason: 'Hộp đèn pin mang chữ "T" của Trang in dấu tay bùn cạnh hòm quỹ!' }],

  'khai-ghi-am': [{ suspectId: 'dat', reason: 'Bản ghi âm 21:12 ghi lại khoảnh khắc Đạt tấn công Khải ở tầng hầm!' }],
  'tui-den': [{ suspectId: 'dat', reason: 'Đạt ném túi đen chứa găng tay và sổ nợ vào thùng rác lúc 21:30!' }],
  'ma-ket': [{ suspectId: 'dat', reason: 'Đạt đổi mã két thành 2147 và trực tiếp nhập mã mở két!' }],
  'chuyen-khoan': [{ suspectId: 'dat', reason: 'Đạt duyệt chuyển khoản 200 triệu công ty cho chủ nợ Bảy!' }],
  'dat-giay': [{ suspectId: 'dat', reason: 'Camera hẻm sau quay cảnh Đạt xách túi đen rời chung cư!' }],

  'nhiet-do-am-tra': [{ suspectId: 'vu', reason: 'Ấm trà đun lúc 21:30 chứng minh Vũ đập vỡ đồng hồ ngụy tạo alibi 22:15!' }],
  'di-chuc-truat-quyen': [{ suspectId: 'vu', reason: 'Động cơ sát hại: Ông Khang truất quyền thừa kế 30 tỷ của Vũ!' }],
  'lo-doc-non-bo': [{ suspectId: 'vu', reason: 'Dấu vân tay ngón trỏ của Bác sĩ Vũ in trên lọ độc Aconitine!' }],
  'then-cai-chi-cuoc': [{ suspectId: 'vu', reason: 'Vũ dùng chỉ cước câu cá giật then cài cửa sổ tạo hiện trường phòng kín!' }],
  'vet-bun-ban-cong': [{ suspectId: 'vu', reason: 'Vết bùn đế giày da Pierre Cardin size 42 của Vũ trên thành ban công!' }],
  'chuyen-khoan-yen': [
    { suspectId: 'yen', reason: 'Yến nhận cọc 200 triệu từ Vũ để tiếp tay ngắt điện!' },
    { suspectId: 'vu', reason: 'Vũ chuyển cọc 200 triệu mua chuộc người giúp việc!' },
  ],
  'tin-nhan-bi-mat': [
    { suspectId: 'yen', reason: 'Yến nhận lệnh ngắt cầu dao tầng 2 lúc 21:20 và canh cửa!' },
    { suspectId: 'vu', reason: 'Vũ nhắn tin chỉ đạo Yến ngắt cầu dao camera!' },
  ],
}

export function NotesApp({ found }: { found: Set<string> }) {
  const { clues: CLUES, suspects: SUSPECTS } = usePack()
  const [tab, setTab] = useState<'mindmap' | 'list'>('mindmap')
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null)
  const [selectedClue, setSelectedClue] = useState<string | null>(null)
  const [links, setLinks] = useState<{ suspectId: string; clueId: string; reason: string }[]>([])
  const [feedback, setFeedback] = useState<{ text: string; success: boolean } | null>(null)

  const list = Array.from(found)

  useEffect(() => {
    if (!feedback) return
    const t = setTimeout(() => setFeedback(null), 2500)
    return () => clearTimeout(t)
  }, [feedback])

  const handleCreateLink = () => {
    if (!selectedSuspect || !selectedClue) return

    if (links.some((l) => l.suspectId === selectedSuspect && l.clueId === selectedClue)) {
      setFeedback({ text: '📌 Liên kết này đã được thiết lập từ trước.', success: true })
      return
    }

    const matches = EVIDENCE_SUSPECT_LINKS[selectedClue]
    const match = matches?.find((m) => m.suspectId === selectedSuspect)

    if (match) {
      MacSound.confrontSuccess()
      setLinks((prev) => [...prev, { suspectId: selectedSuspect, clueId: selectedClue, reason: match.reason }])
      setSelectedClue(null)
      setFeedback({ text: '✨ XÂU CHUỖI THÀNH CÔNG! Đã liên kết chứng cứ buộc tội đanh thép!', success: true })
    } else {
      MacSound.confrontFail()
      setFeedback({ text: '❌ Chưa đủ cơ sở trực tiếp để gắn manh mối này với đối tượng đã chọn.', success: false })
    }
  }

  return (
    <div className="flex h-full flex-col bg-[#ffffff] text-[#1d1d1f] font-['Be_Vietnam_Pro'] relative">
      <div className="flex items-center justify-between border-b border-[#00000012] bg-[#f8f9fa] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-bold text-slate-900 tracking-tight">Sổ tay điều tra</p>
          <span className="rounded-full bg-blue-100 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold text-blue-800">
            {list.length}/{Object.keys(CLUES).length} manh mối
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-200/80 rounded-xl p-0.5">
          <button
            onClick={() => {
              MacSound.click()
              setTab('mindmap')
            }}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all flex items-center gap-1 ${
              tab === 'mindmap' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-black'
            }`}
          >
            <span>🕸️</span> Sơ đồ suy luận
          </button>
          <button
            onClick={() => {
              MacSound.click()
              setTab('list')
            }}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all flex items-center gap-1 ${
              tab === 'list' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-black'
            }`}
          >
            <span>📋</span> Danh sách
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[90%] rounded-2xl px-4 py-2 text-[12px] font-bold shadow-2xl backdrop-blur-md border pointer-events-none transition-all ${
            feedback.success
              ? 'bg-emerald-900 text-white border-emerald-700'
              : 'bg-slate-900 text-white border-slate-700'
          }`}
        >
          {feedback.text}
        </div>
      )}

      {tab === 'mindmap' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa]">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-3 shadow-2xs">
            <p className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>🕸️</span> BẢNG NỐI DÂY CHỨNG CỨ BUỘC TỘI
            </p>
            <p className="mt-1 text-[12px] text-blue-950">
              Chọn 1 <strong className="text-black">Nghi phạm</strong> + 1 <strong className="text-black">Manh mối</strong> rồi nhấn nút <strong className="text-blue-700">“Nối dây chứng cứ”</strong> để tạo lập luận.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              1. Chọn đối tượng tình nghi:
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SUSPECTS.map((s) => {
                const isSelected = selectedSuspect === s.id
                const suspectLinks = links.filter((l) => l.suspectId === s.id)
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      MacSound.click()
                      setSelectedSuspect(s.id)
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-2xs ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{s.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <p className={`truncate text-[12px] font-bold ${isSelected ? 'text-blue-700' : 'text-slate-900'}`}>
                          {s.name}
                        </p>
                        <p className="truncate text-[10px] text-slate-500">{s.role}</p>
                      </div>
                    </div>
                    {suspectLinks.length > 0 && (
                      <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                        <span>🔴 {suspectLinks.length} liên kết</span>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              2. Chọn manh mối đối chiếu:
            </p>
            {list.length === 0 ? (
              <p className="text-[12px] text-slate-400 italic p-3 text-center">
                Chưa có manh mối nào trong sổ tay. Hãy khám nghiệm hiện trường hoặc đọc tin nhắn trước!
              </p>
            ) : (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {list.map((cid) => {
                  const c = CLUES[cid]
                  if (!c) return null
                  const isSelected = selectedClue === cid
                  const isLinkedWithCurrent = selectedSuspect
                    ? links.some((l) => l.suspectId === selectedSuspect && l.clueId === cid)
                    : false

                  return (
                    <button
                      key={cid}
                      onClick={() => {
                        MacSound.click()
                        setSelectedClue(cid)
                      }}
                      className={`min-w-[190px] max-w-[210px] shrink-0 p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 shadow-2xs'
                          : isLinkedWithCurrent
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-slate-200 bg-white hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{TAGS[c.tag] ?? '📌'}</span>
                        {isLinkedWithCurrent && (
                          <span className="text-[10px] font-bold text-emerald-700">✓ Đã nối</span>
                        )}
                      </div>
                      <p className={`mt-1 truncate text-[12px] font-bold ${isSelected ? 'text-amber-900' : 'text-slate-900'}`}>
                        {c.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500 leading-snug">{c.detail}</p>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <button
            onClick={handleCreateLink}
            disabled={!selectedSuspect || !selectedClue}
            className="w-full py-2.5 rounded-xl font-bold text-[13px] bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>🔗</span>
            <span>Nối dây chứng cứ buộc tội</span>
          </button>

          {links.length > 0 && (
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Chuỗi lập luận đã chứng minh ({links.length}):
              </p>
              {links.map((l, idx) => (
                <div key={idx} className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-[12px]">
                  <p className="font-bold text-emerald-900">
                    {SUSPECTS.find((s) => s.id === l.suspectId)?.name} ➔ {CLUES[l.clueId]?.title}
                  </p>
                  <p className="text-slate-700 mt-0.5">{l.reason}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'list' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8f9fa]">
          {list.length === 0 ? (
            <p className="text-[12px] text-slate-400 text-center p-6">Chưa có manh mối nào trong sổ tay.</p>
          ) : (
            list.map((cid) => {
              const c = CLUES[cid]
              if (!c) return null
              return (
                <div key={cid} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{TAGS[c.tag] ?? '📌'}</span>
                    <p className="text-[13px] font-bold text-slate-900">{c.title}</p>
                  </div>
                  <p className="mt-1 text-[12px] text-slate-600 leading-relaxed">{c.detail}</p>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

/* --------------------------------------------------------------- file */
