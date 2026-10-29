const TAGS: Record<string, string> = { chat: '💬', web: '🌐', photo: '📸', file: '🗂️' }

import { useEffect, useRef, useState } from 'react'
import { MacSound } from '../MacAudio'
import { usePack } from '../pack'

export interface Ctx {
  found: Set<string>
  find: (id: string) => void
  onOpenUrl?: (url: string) => void
}

const SUSPECT_CONTRADICTIONS: Record<
  string,
  {
    culpritClues: string[]
    suspectName: string
    breakdownMsg: string
    breakdownDetail: string
  }
> = {
  dung: {
    culpritClues: ['don-hang-2147', 'anh-phan-chieu'],
    suspectName: 'Dũng Shipper',
    breakdownMsg: '“Ơ... các anh có dữ liệu định vị đơn hàng lúc 21:47 thật sao?! Cả ảnh kính cửa hàng lúc 21:58 nữa... Em... em khai thật, em dắt xe cô Lan đi...”',
    breakdownDetail: 'Bóc trần lời khai nói dối về từ 21:15. Bằng chứng định vị GPS và ảnh phản chiếu đã buộc Dũng phải cúi đầu nhận tội!',
  },
  son: {
    culpritClues: ['son-ao-do', 'son-no-tien', 'lo-hong-tu'],
    suspectName: 'Sơn Nhặt Cầu',
    breakdownMsg: '“Ảnh người áo đỏ đứng sát vách tủ đồ... Ai chụp được vậy?! Thôi được rồi, em nợ chị Hạnh 6 triệu quá hạn nên thò tay qua khe nóc tủ lấy trộm máy!”',
    breakdownDetail: 'Bóc trần thủ đoạn luồn tay qua khe nóc tủ đồ và trang phục áo khoác đỏ lúc 20:20!',
  },
  trang: {
    culpritClues: ['trang-giay', 'chuyen-tien-trng', 'tin-nhan-do'],
    suspectName: 'Trang Bán Bánh',
    breakdownMsg: '“Vết bùn đỏ trên giày trắng... sao anh biết bãi rác không có bùn đỏ?! Lệnh chuyển khoản 8 triệu... Em xin lỗi, em vay nợ nặng lãi của anh Tú nên mới cạy hòm!”',
    breakdownDetail: 'Chứng cứ địa chất bùn đỏ sau bệ hòm quỹ và lệnh chuyển khoản 8 triệu lúc 21:32 đã đập tan mọi lời ngụy biện!',
  },
  dat: {
    culpritClues: ['khai-ghi-am', 'tui-den', 'ma-ket', 'chuyen-khoan'],
    suspectName: 'Quản lý Đạt',
    breakdownMsg: '“Khải... lúc đó cậu ấy vẫn kịp bật ghi âm sao?! Tôi không cố ý hại Khải... Tôi bị chủ nợ Bảy ép đến chân tường rồi nên mới dàn cảnh mất điện!”',
    breakdownDetail: 'File ghi âm 21:12 và túi đen chứa sổ nợ đã vạch mặt kẻ chủ mưu cướp két sắt!',
  },
  vu: {
    culpritClues: ['nhiet-do-am-tra', 'di-chuc-truat-quyen', 'lo-doc-non-bo', 'then-cai-chi-cuoc'],
    suspectName: 'Bác sĩ Vũ Hoàng',
    breakdownMsg: '“Không thể nào... Làm sao các người biết nhiệt độ ấm trà thông minh đun từ 21:30... Và bản di chúc xé vụn... Kế hoạch phòng kín hoàn hảo của tôi...”',
    breakdownDetail: 'Nhiệt động học tách trà vạch trần giờ chết giả 22:15, bản di chúc truất quyền thừa kế 30 tỷ và lọ độc Aconitine chứa vân tay đã kết tội tên sát nhân!',
  },
  yen: {
    culpritClues: ['chuyen-khoan-yen', 'tin-nhan-bi-mat'],
    suspectName: 'Yến Giúp Việc',
    breakdownMsg: '“Em lạy anh công an... Bác sĩ Vũ chuyển cọc 200 triệu bảo em đúng 21:20 ngắt cầu dao tầng 2... Em chỉ đứng canh dưới bếp thôi mà!”',
    breakdownDetail: 'Lệnh chuyển khoản cọc và tin nhắn Zola khôi phục đã lật tẩy vai trò đồng phạm tiếp tay ngắt camera!',
  },
}

export function ZolaApp({ found, find, onOpenUrl }: Ctx) {
  const { convs: CONVS, case: caseMeta, clues: CLUES } = usePack()
  const [active, setActive] = useState<string | null>(null)
  const [inspectToast, setInspectToast] = useState<{ text: string; success: boolean } | null>(null)
  const [confrontOpen, setConfrontOpen] = useState(false)
  const [selectedClueForConfront, setSelectedClueForConfront] = useState<string | null>(null)
  const [confessedSuspects, setConfessedSuspects] = useState<Record<string, boolean>>({})

  const convs = CONVS.filter((c) => !c.requires || c.requires.every((r) => found.has(r)))
  const conv = convs.find((c) => c.id === active) ?? null
  const msgs = conv ? conv.messages.filter((m) => !m.requires || m.requires.every((r) => found.has(r))) : []
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [active, msgs.length, confessedSuspects])

  useEffect(() => {
    if (!inspectToast) return
    const t = setTimeout(() => setInspectToast(null), 2500)
    return () => clearTimeout(t)
  }, [inspectToast])

  const handlePinMsg = (m: (typeof msgs)[0]) => {
    if (m.from === 'me') return
    if (m.clue) {
      if (!found.has(m.clue)) {
        find(m.clue)
        MacSound.pinClue()
        setInspectToast({
          text: '📌 Đã ghim lời khai mấu chốt vào Sổ vụ án!',
          success: true,
        })
      } else {
        setInspectToast({
          text: '📌 Bạn đã ghim lời khai này từ trước.',
          success: true,
        })
      }
    } else {
      MacSound.click()
      setInspectToast({
        text: '🔍 Lời khai này bình thường, không có dấu hiệu mâu thuẫn.',
        success: false,
      })
    }
  }

  const handleConfront = () => {
    if (!conv || !selectedClueForConfront) return
    const contradiction = SUSPECT_CONTRADICTIONS[conv.id]

    if (contradiction && contradiction.culpritClues.includes(selectedClueForConfront)) {
      setConfessedSuspects((prev) => ({ ...prev, [conv.id]: true }))
      setConfrontOpen(false)
      setSelectedClueForConfront(null)
      MacSound.confrontSuccess()
      setInspectToast({
        text: '⚡ ĐỐI CHẤT THÀNH CÔNG! Nghi phạm đã sụp đổ và khai nhận sự thật!',
        success: true,
      })
    } else {
      MacSound.confrontFail()
      setInspectToast({
        text: '❌ Đối tượng phản bác: "Bằng chứng này không chứng minh được tôi liên quan! Đừng vu khống!"',
        success: false,
      })
    }
  }

  if (!conv) {
    return (
      <div className="flex h-full flex-col bg-[#ffffff] text-[#1d1d1f] font-['Be_Vietnam_Pro'] select-none">
        <div className="flex items-center justify-between border-b border-[#00000012] bg-[#f8f9fa] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-sm font-bold text-white shadow-sm">Z</span>
            <div>
              <p className="text-[13px] font-bold text-[#1d1d1f] tracking-tight">Zola Tin nhắn</p>
              <p className="text-[11px] text-emerald-600 font-medium">● Đang trực tuyến · 23:52</p>
            </div>
          </div>
          <span className="rounded-full bg-slate-200/70 px-2.5 py-0.5 text-[11px] text-slate-600 font-semibold border border-slate-300/60">
            {convs.length} hội thoại
          </span>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-[#0000000a]">
          {convs.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                MacSound.click()
                setActive(c.id)
              }}
              className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-100/80"
            >
              <div className="relative">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-100 border border-slate-200 text-2xl shadow-sm transition-transform duration-200 group-hover:scale-105">
                  {c.avatar}
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              </div>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] font-bold text-[#1d1d1f] group-hover:text-blue-600 transition-colors">{c.name}</span>
                  <span className="shrink-0 text-[11px] text-slate-400">{c.sub}</span>
                </span>
                <span className="mt-0.5 block truncate text-[12px] text-slate-500 font-normal">{c.preview}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-[#ffffff] text-[#1d1d1f] font-['Be_Vietnam_Pro'] relative">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b border-[#00000012] bg-[#f8f9fa] px-3.5 py-2.5">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => {
              MacSound.click()
              setActive(null)
            }} 
            className="grid h-7 w-7 place-items-center rounded-lg bg-slate-200/80 text-slate-600 hover:bg-slate-300 hover:text-black transition-colors text-xs font-bold" 
            aria-label="Quay lại"
          >
            ←
          </button>
          <div className="relative">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 border border-slate-200 text-base shadow-sm">
              {conv.avatar}
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-[#1d1d1f] tracking-tight">{conv.name}</p>
            <p className="text-[10px] text-emerald-600 font-medium">{conv.sub} · Trực tuyến</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {SUSPECT_CONTRADICTIONS[conv.id] && (
            <button
              onClick={() => {
                MacSound.click()
                setConfrontOpen(true)
              }}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-[12px] font-bold text-slate-950 shadow-sm hover:brightness-105 transition-all active:scale-95"
              title="Đưa ra chứng cứ để đối chất và bẻ gãy lời khai"
            >
              <span>⚖️</span>
              <span>Đối chất</span>
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div 
        ref={scroller} 
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4 bg-[#f4f5f8]"
      >
        <div className="flex flex-col items-center gap-1 my-1">
          <span className="rounded-full bg-slate-200 px-3 py-0.5 text-[11px] font-medium text-slate-600 shadow-2xs">
            {caseMeta?.time ? `Vụ án · ${caseMeta.time}` : 'Hôm nay'}
          </span>
        </div>

        {msgs.map((m) => {
          const isGroup = !!conv.isGroup || conv.id === 'group'
          const showAvatar = m.from === 'them'
          const senderName = m.senderName || (isGroup ? conv.name : undefined)
          const senderAvatar = m.senderAvatar || conv.avatar
          const isClueFound = m.clue ? found.has(m.clue) : false

          return (
            <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start items-start gap-2.5'}`}>
              {showAvatar && (
                <div className="relative shrink-0 mt-0.5">
                  <span
                    className="grid h-8 w-8 place-items-center rounded-xl bg-white border border-slate-200 text-base shadow-2xs select-none"
                    title={senderName || conv.name}
                  >
                    {senderAvatar}
                  </span>
                </div>
              )}

              <div className={`max-w-[82%] ${m.from === 'me' ? 'items-end' : 'items-start min-w-0'}`}>
                {m.from === 'them' && (isGroup || m.senderName) && (
                  <div className="mb-1 flex items-center gap-1.5 px-0.5">
                    <span className="text-[11px] font-bold text-blue-600 truncate">
                      {senderName}
                    </span>
                  </div>
                )}

                <div
                  className={`group/msg relative rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-xs transition-all ${
                    m.from === 'me' 
                      ? 'bg-blue-600 text-white rounded-tr-xs' 
                      : isClueFound
                      ? 'bg-emerald-50 text-slate-800 rounded-tl-xs border border-emerald-300'
                      : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/80'
                  }`}
                >
                  {m.text.split(/((?:https?:\/\/)?[a-zA-Z0-9-]+\.(?:vn|com)[^\s]*)/g).map((chunk, idx) => {
                    if (chunk.match(/^(?:https?:\/\/)?[a-zA-Z0-9-]+\.(?:vn|com)[^\s]*$/)) {
                      const fullUrl = chunk.startsWith('http') ? chunk : `https://${chunk}`
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (onOpenUrl) onOpenUrl(fullUrl)
                          }}
                          className="font-bold underline underline-offset-2 text-blue-600 hover:text-blue-800 inline-flex items-center gap-0.5 mx-0.5 cursor-pointer"
                          title={`Mở trang ${chunk} trong Cộc Cộc`}
                        >
                          <span>🌐</span>
                          <span>{chunk}</span>
                        </button>
                      )
                    }
                    return chunk
                  })}

                  {/* Nút Ghim Manh Mối Chủ Động khi hover */}
                  {m.from === 'them' && (
                    <button
                      onClick={() => handlePinMsg(m)}
                      className={`ml-2 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition-all ${
                        isClueFound
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'opacity-40 hover:opacity-100 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                      }`}
                      title={isClueFound ? 'Đã ghim trong sổ tay' : 'Ghim lời khai khả nghi vào sổ'}
                    >
                      <span>📌</span>
                      <span>{isClueFound ? 'Đã ghim' : 'Ghim'}</span>
                    </button>
                  )}
                </div>

                {m.card && (
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50/80 p-2.5 shadow-2xs">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-600 text-white text-lg shadow-2xs">
                      {m.card.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[12px] font-bold text-blue-950">{m.card.title}</span>
                      <span className="block truncate text-[11px] text-blue-700">{m.card.sub}</span>
                    </span>
                  </div>
                )}

                {m.time && (
                  <p className={`mt-1 text-[10px] font-medium text-slate-400 ${m.from === 'me' ? 'text-right' : 'text-left'}`}>
                    {m.time} {m.from === 'me' && <span className="text-blue-600">✓✓</span>}
                  </p>
                )}
              </div>
            </div>
          )
        })}

        {/* Confession Card if suspect broken down */}
        {confessedSuspects[conv.id] && SUSPECT_CONTRADICTIONS[conv.id] && (
          <div className="my-3 rounded-2xl border-2 border-amber-500 bg-amber-50 p-4 shadow-md animate-fadeIn">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">⚡</span>
              <span className="text-[12px] font-bold uppercase tracking-wider text-amber-800">
                ĐỐI CHẤT THÀNH CÔNG · NGHI PHẠM ĐÃ THÚ NHẬN!
              </span>
            </div>
            <p className="text-[13px] font-semibold text-slate-900 leading-relaxed italic">
              {SUSPECT_CONTRADICTIONS[conv.id].breakdownMsg}
            </p>
            <p className="mt-2 text-[11px] text-slate-700 border-t border-amber-200 pt-1.5">
              {SUSPECT_CONTRADICTIONS[conv.id].breakdownDetail}
            </p>
          </div>
        )}
      </div>

      {/* Confrontation Drawer Modal */}
      {confrontOpen && (
        <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40 backdrop-blur-2xs animate-fadeIn">
          <div className="max-h-[85%] rounded-t-3xl border-t border-slate-200 bg-white p-4 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-base">⚖️</span>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900">ĐỐI CHẤT: {conv.name}</h4>
                  <p className="text-[11px] text-amber-700">Chọn 1 manh mối trong sổ để vạch trần lời ngụy biện của đối tượng</p>
                </div>
              </div>
              <button
                onClick={() => {
                  MacSound.click()
                  setConfrontOpen(false)
                  setSelectedClueForConfront(null)
                }}
                className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2 max-h-[45vh]">
              {found.size === 0 ? (
                <div className="p-6 text-center text-slate-500 text-[12px]">
                  Sổ tay hiện chưa có manh mối nào. Hãy khám nghiệm hiện trường hoặc đọc tin nhắn trước!
                </div>
              ) : (
                Array.from(found).map((cid) => {
                  const c = CLUES[cid]
                  if (!c) return null
                  const isSelected = selectedClueForConfront === cid
                  return (
                    <button
                      key={cid}
                      onClick={() => {
                        MacSound.click()
                        setSelectedClueForConfront(cid)
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/80 shadow-2xs'
                          : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-base mt-0.5">{TAGS[c.tag] ?? '📌'}</span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-[12px] font-bold ${isSelected ? 'text-amber-900' : 'text-slate-800'}`}>
                          {c.title}
                        </p>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{c.detail}</p>
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            <div className="pt-2.5 border-t border-slate-200">
              <button
                onClick={handleConfront}
                disabled={!selectedClueForConfront}
                className="w-full py-2.5 rounded-xl font-bold text-[13px] bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-105 disabled:opacity-40 transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span>⚡</span>
                <span>Trình bằng chứng này để bẻ gãy lời khai</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating feedback toast */}
      {inspectToast && (
        <div
          className={`absolute bottom-16 left-1/2 -translate-x-1/2 z-30 max-w-[90%] rounded-2xl px-4 py-2 text-[12px] font-bold shadow-2xl backdrop-blur-md border pointer-events-none transition-all ${
            inspectToast.success
              ? 'bg-emerald-900 text-white border-emerald-700'
              : 'bg-slate-900 text-white border-slate-700'
          }`}
        >
          {inspectToast.text}
        </div>
      )}

      <div className="border-t border-[#00000012] bg-[#f8f9fa] p-2.5">
        <div className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-3 py-1.5">
          <span className="text-slate-400 text-sm">💬</span>
          <span className="flex-1 text-[12px] text-slate-400 select-none">
            Chế độ điều tra tin nhắn chứng cứ…
          </span>
          <span className="grid h-6 w-6 place-items-center rounded-lg bg-slate-100 text-slate-400 text-xs">
            ➤
          </span>
        </div>
      </div>
    </div>
  )
}
