import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Stage } from '../ui/Stage'
import { useTitle } from '../lib/useTitle'
import type { Photo } from '../detective/case1'
import { CASES, type CasePack } from '../detective/cases'
import { PackCtx, usePack } from '../detective/pack'
import { saveKey, useCase, clearCaseSave } from '../detective/useCase'

type AppId = 'zola' | 'browser' | 'notes' | 'file'

const APPS: { id: AppId; icon: string; label: string; w: number; h: number; x: number; y: number }[] = [
  { id: 'zola', icon: '💬', label: 'Zola', w: 520, h: 460, x: 24, y: 72 },
  { id: 'browser', icon: '🌐', label: 'Cộc Cốc', w: 620, h: 480, x: 600, y: 116 },
  { id: 'notes', icon: '📓', label: 'Sổ vụ án', w: 430, h: 440, x: 120, y: 120 },
  { id: 'file', icon: '🗂️', label: 'Hồ sơ', w: 470, h: 430, x: 250, y: 150 },
]

const TAGS: Record<string, string> = { chat: '💬', web: '🌐', photo: '🖼️', file: '🗂️' }

function useWidth() {
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 1024 : window.innerWidth))
  useEffect(() => {
    const on = () => setW(window.innerWidth)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return w
}

interface Ctx {
  found: Set<string>
  find: (id: string) => void
}

/* ------------------------------------------------------------------ Zola */

const SUSPECT_CONTRADICTIONS: Record<
  string,
  {
    culpritClues: string[]
    suspectName: string
    breakdownMsg: string
    breakdownDetail: string
  }
> = {
  // Case 1
  dung: {
    culpritClues: ['don-hang-2147', 'anh-phan-chieu'],
    suspectName: 'Dũng Shipper',
    breakdownMsg: '“Ơ... các anh có dữ liệu định vị đơn hàng lúc 21:47 thật sao?! Cả ảnh kính cửa hàng lúc 21:58 nữa... Em... em khai thật, em dắt xe cô Lan đi...”',
    breakdownDetail: 'Bóc trần lời khai nói dối về từ 21:15. Bằng chứng định vị GPS và ảnh phản chiếu đã buộc Dũng phải cúi đầu nhận tội!',
  },
  // Case 2
  son: {
    culpritClues: ['son-ao-do', 'son-no-tien', 'lo-hong-tu'],
    suspectName: 'Sơn Nhặt Cầu',
    breakdownMsg: '“Ảnh người áo đỏ đứng sát vách tủ đồ... Ai chụp được vậy?! Thôi được rồi, em nợ chị Hạnh 6 triệu quá hạn nên thò tay qua khe nóc tủ lấy trộm máy!”',
    breakdownDetail: 'Bóc trần thủ đoạn luồn tay qua khe nóc tủ đồ và trang phục áo khoác đỏ lúc 20:20!',
  },
  // Case 3
  trang: {
    culpritClues: ['trang-giay', 'chuyen-tien-trng', 'tin-nhan-do'],
    suspectName: 'Trang Bán Bánh',
    breakdownMsg: '“Vết bùn đỏ trên giày trắng... sao anh biết bãi rác không có bùn đỏ?! Lệnh chuyển khoản 8 triệu... Em xin lỗi, em vay nợ nặng lãi của anh Tú nên mới cạy hòm!”',
    breakdownDetail: 'Chứng cứ địa chất bùn đỏ sau bệ hòm quỹ và lệnh chuyển khoản 8 triệu lúc 21:32 đã đập tan mọi lời ngụy biện!',
  },
  // Case 4
  dat: {
    culpritClues: ['khai-ghi-am', 'tui-den', 'ma-ket', 'chuyen-khoan'],
    suspectName: 'Quản lý Đạt',
    breakdownMsg: '“Khải... lúc đó cậu ấy vẫn kịp bật ghi âm sao?! Tôi không cố ý hại Khải... Tôi bị chủ nợ Bảy ép đến chân tường rồi nên mới dàn cảnh mất điện!”',
    breakdownDetail: 'File ghi âm 21:12 và túi đen chứa sổ nợ đã vạch mặt kẻ chủ mưu cướp két sắt!',
  },
  // Case 5
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

function ZolaApp({ found, find }: Ctx) {
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

  const handleInspectMsg = (m: (typeof msgs)[0]) => {
    if (m.from === 'me') return
    if (m.clue) {
      if (!found.has(m.clue)) {
        find(m.clue)
        setInspectToast({
          text: '💡 Phát hiện mâu thuẫn lời khai! Đã lưu manh mối vào sổ tay.',
          success: true,
        })
      } else {
        setInspectToast({
          text: '📌 Bạn đã bóc tách manh mối này từ trước.',
          success: true,
        })
      }
    } else {
      setInspectToast({
        text: '🔍 Lời khai này bình thường, không phát hiện dấu hiệu mâu thuẫn.',
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
      setInspectToast({
        text: '⚡ ĐỐI CHẤT THÀNH CÔNG! Nghi phạm đã sụp đổ và khai nhận sự thật!',
        success: true,
      })
    } else {
      setInspectToast({
        text: '❌ Đối tượng phản bác: "Bằng chứng này không chứng minh được tôi liên quan! Đừng vu khống!"',
        success: false,
      })
    }
  }

  if (!conv) {
    return (
      <div className="flex h-full flex-col bg-[#0b0f19]">
        <div className="flex items-center justify-between border-b border-slate-800/90 bg-slate-900/90 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">Z</span>
            <div>
              <p className="text-sm font-bold text-white tracking-tight">Zola Tin nhắn</p>
              <p className="text-[0.62rem] text-cyan-400 font-medium">● Đang trực tuyến · 23:52</p>
            </div>
          </div>
          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[0.62rem] text-slate-400 font-semibold border border-slate-700/60">
            {convs.length} hội thoại
          </span>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
          {convs.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className="group flex w-full items-center gap-3 px-3.5 py-3 text-left transition-colors hover:bg-slate-800/50"
            >
              <div className="relative">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-800 border border-slate-700/80 text-2xl shadow-sm transition-transform duration-200 group-hover:scale-105">
                  {c.avatar}
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0b0f19] bg-emerald-500" />
              </div>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-[0.82rem] font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">{c.name}</span>
                  <span className="shrink-0 text-[0.62rem] text-slate-500 font-medium">{c.sub}</span>
                </span>
                <span className="mt-0.5 block truncate text-[0.72rem] text-slate-400">{c.preview}</span>
              </span>
            </button>
          ))}
          {convs.length < CONVS.length && (
            <div className="p-4 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-[0.65rem] font-medium text-slate-400 border border-slate-800">
                <span>🔒</span> {CONVS.length - convs.length} cuộc trò chuyện đang ẩn — thu thập thêm manh mối
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-[#070b14]">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-3 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setActive(null)} 
            className="grid h-8 w-8 place-items-center rounded-xl bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700/60 shadow-sm" 
            aria-label="Quay lại"
          >
            ←
          </button>
          <div className="relative">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-800 border border-slate-700 text-lg shadow-sm">
              {conv.avatar}
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-500" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[0.82rem] font-bold text-white tracking-tight">{conv.name}</p>
            <p className="text-[0.6rem] text-cyan-400/90 font-medium">{conv.sub} · Trực tuyến</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {SUSPECT_CONTRADICTIONS[conv.id] && (
            <button
              onClick={() => setConfrontOpen(true)}
              className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-2.5 py-1 text-[0.62rem] font-bold text-slate-950 shadow-md hover:brightness-110 transition-all active:scale-95"
              title="Đưa ra chứng cứ để đối chất và bẻ gãy lời khai"
            >
              <span>⚖️</span>
              <span>Đối chất</span>
            </button>
          )}
          <button className="grid h-7 w-7 place-items-center rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-slate-400" title="Gọi thoại">
            📞
          </button>
          <button className="grid h-7 w-7 place-items-center rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-slate-400" title="Gọi video">
            📹
          </button>
        </div>
      </div>

      {/* Chat Wallpaper Container */}
      <div 
        ref={scroller} 
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4 relative"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #0d1527 0%, #060913 100%)',
          backgroundImage: `
            radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.05) 0%, transparent 60%),
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 28px 28px, 28px 28px',
        }}
      >
        <div className="flex flex-col items-center gap-1 my-1">
          <span className="rounded-full bg-slate-800/80 px-3 py-0.5 text-[0.58rem] font-medium text-slate-400 border border-slate-700/50">
            {caseMeta?.time ? `Vụ án · ${caseMeta.time}` : 'Hôm nay'}
          </span>
          <span className="rounded-full bg-cyan-950/70 px-3 py-0.5 text-[0.58rem] font-medium text-cyan-300 border border-cyan-500/30">
            💡 Chạm vào lời khai để soi mâu thuẫn · Nhấn “Đối chất” để bẻ gãy alibi
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
                    className="grid h-8 w-8 place-items-center rounded-xl bg-slate-800 border border-slate-700/80 text-base shadow-sm select-none"
                    title={senderName || conv.name}
                  >
                    {senderAvatar}
                  </span>
                </div>
              )}

              <div className={`max-w-[82%] ${m.from === 'me' ? 'items-end' : 'items-start min-w-0'}`}>
                {/* Tên người gửi hiển thị khi là nhóm chat hoặc có senderName */}
                {m.from === 'them' && (isGroup || m.senderName) && (
                  <div className="mb-1 flex items-center gap-1.5 px-0.5">
                    <span className="text-[0.68rem] font-bold text-cyan-400 truncate">
                      {senderName}
                    </span>
                  </div>
                )}

                <div
                  onClick={() => handleInspectMsg(m)}
                  className={`relative rounded-2xl px-3.5 py-2.5 text-[0.78rem] leading-relaxed shadow-md transition-all select-none ${
                    m.from === 'them' ? 'cursor-pointer hover:border-cyan-400/80 active:scale-[0.98]' : ''
                  } ${
                    m.from === 'me' 
                      ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-tr-xs shadow-blue-900/30 font-normal' 
                      : isClueFound
                      ? 'bg-slate-800 text-slate-100 rounded-tl-xs border border-emerald-500/50 shadow-emerald-950/20'
                      : 'bg-slate-800/95 text-slate-100 rounded-tl-xs border border-slate-700/60 shadow-black/40 font-normal'
                  }`}
                >
                  {m.text}
                  {isClueFound && (
                    <span
                      className="absolute -top-1.5 -right-1.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-[0.55rem] text-slate-950 font-bold shadow"
                      title="Đã lưu vào sổ tay"
                    >
                      ✓
                    </span>
                  )}
                </div>

                {m.card && (
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-slate-900/90 p-2.5 shadow-md">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-950 text-xl border border-cyan-500/40">
                      {m.card.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[0.74rem] font-bold text-white">{m.card.title}</span>
                      <span className="block truncate text-[0.62rem] text-slate-400">{m.card.sub}</span>
                    </span>
                  </div>
                )}

                {m.time && (
                  <p className={`mt-1 text-[0.58rem] font-medium text-slate-400 ${m.from === 'me' ? 'text-right' : 'text-left'}`}>
                    {m.time} {m.from === 'me' && <span className="text-cyan-400">✓✓</span>}
                  </p>
                )}
              </div>
            </div>
          )
        })}

        {/* Confession Card if suspect broken down */}
        {confessedSuspects[conv.id] && SUSPECT_CONTRADICTIONS[conv.id] && (
          <div className="my-3 rounded-2xl border-2 border-amber-400/80 bg-gradient-to-b from-amber-950/60 to-slate-950/95 p-3.5 shadow-[0_0_25px_rgba(245,158,11,0.3)] animate-fadeIn">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">⚡</span>
              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-amber-300">
                ĐỐI CHẤT THÀNH CÔNG · NGHI PHẠM ĐÃ THÚ NHẬN!
              </span>
            </div>
            <p className="text-[0.76rem] font-semibold text-white leading-relaxed italic">
              {SUSPECT_CONTRADICTIONS[conv.id].breakdownMsg}
            </p>
            <p className="mt-2 text-[0.64rem] text-slate-300 border-t border-amber-500/30 pt-1.5">
              {SUSPECT_CONTRADICTIONS[conv.id].breakdownDetail}
            </p>
          </div>
        )}
      </div>

      {/* Confrontation Drawer Modal */}
      {confrontOpen && (
        <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="max-h-[85%] rounded-t-3xl border-t border-slate-700 bg-slate-950 p-4 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-base">⚖️</span>
                <div>
                  <h4 className="text-[0.8rem] font-bold text-white">ĐỐI CHẤT: {conv.name}</h4>
                  <p className="text-[0.6rem] text-amber-400">Chọn 1 manh mối để vạch trần lời ngụy biện của đối tượng</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setConfrontOpen(false)
                  setSelectedClueForConfront(null)
                }}
                className="grid h-7 w-7 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            {/* List of clues from found */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2 max-h-[45vh]">
              {found.size === 0 ? (
                <div className="p-6 text-center text-slate-400 text-[0.72rem]">
                  Sổ tay hiện chưa có manh mối nào. Hãy soi hiện trường hoặc nhật ký trước!
                </div>
              ) : (
                Array.from(found).map((cid) => {
                  const c = CLUES[cid]
                  if (!c) return null
                  const isSelected = selectedClueForConfront === cid
                  return (
                    <button
                      key={cid}
                      onClick={() => setSelectedClueForConfront(cid)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                          : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80'
                      }`}
                    >
                      <span className="text-sm mt-0.5">{TAGS[c.tag] ?? '📌'}</span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-[0.74rem] font-bold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                          {c.title}
                        </p>
                        <p className="text-[0.64rem] text-slate-400 line-clamp-2 mt-0.5">{c.detail}</p>
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            <div className="pt-2.5 border-t border-slate-800">
              <button
                onClick={handleConfront}
                disabled={!selectedClueForConfront}
                className="w-full py-2.5 rounded-xl font-bold text-[0.74rem] bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 disabled:opacity-40 transition-all shadow-lg flex items-center justify-center gap-1.5"
              >
                <span>⚡</span>
                <span>Trình bằng chứng này để bẻ gãy lời khai</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating feedback toast in Zola */}
      {inspectToast && (
        <div
          className={`absolute bottom-16 left-1/2 -translate-x-1/2 z-30 max-w-[90%] rounded-2xl px-3.5 py-2 text-[0.68rem] font-bold shadow-2xl backdrop-blur-md border pointer-events-none transition-all ${
            inspectToast.success
              ? 'bg-emerald-950/95 text-emerald-300 border-emerald-500/60 shadow-emerald-900/40'
              : 'bg-slate-900/95 text-slate-300 border-slate-700 shadow-black'
          }`}
        >
          {inspectToast.text}
        </div>
      )}

      {/* Realistic chat input bar */}
      <div className="border-t border-slate-800/80 bg-slate-900/90 p-2.5">
        <div className="flex items-center gap-2 rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-1.5">
          <span className="text-slate-400 text-base cursor-default" title="Sticker">😊</span>
          <span className="text-slate-400 text-base cursor-default" title="Ảnh">🖼️</span>
          <span className="flex-1 text-[0.72rem] text-slate-400 select-none">
            Chế độ xem lại tin nhắn chứng cứ…
          </span>
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-800 text-slate-400 text-xs">
            ➤
          </span>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- photo inspect modal */
function PhotoInspectModal({
  photo,
  found,
  find,
  onClose,
}: {
  photo: Photo
  found: Set<string>
  find: (id: string) => void
  onClose: () => void
}) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(
    photo.hotspots && photo.hotspots.length > 0 ? 0 : null
  )
  const [lightMode, setLightMode] = useState<'normal' | 'uv'>('normal')

  const hs = activeHotspot !== null && photo.hotspots ? photo.hotspots[activeHotspot] : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-5 backdrop-blur-md">
      <div className={`relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border transition-all duration-300 shadow-2xl ${
        lightMode === 'uv' ? 'border-purple-500/80 bg-slate-950 shadow-[0_0_35px_rgba(168,85,247,0.35)]' : 'border-slate-700/80 bg-slate-950'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border text-sm transition-colors ${
              lightMode === 'uv' ? 'bg-purple-950 text-purple-300 border-purple-500/50' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
            }`}>
              {lightMode === 'uv' ? '🟣' : '🔬'}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.82rem] font-bold text-white tracking-tight">{photo.title}</p>
              <p className="text-[0.6rem] text-cyan-400/90 font-medium">
                {photo.time} · {lightMode === 'uv' ? 'Chế độ đèn UV cực tím soi huỳnh quang' : 'Giám định dấu vết vật chứng & điểm khả nghi'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Forensic Light Mode Toggle */}
            <div className="flex items-center gap-1 rounded-xl bg-slate-950/80 border border-slate-800 p-0.5">
              <button
                onClick={() => setLightMode('normal')}
                className={`rounded-lg px-2 py-0.5 text-[0.6rem] font-bold transition-all ${
                  lightMode === 'normal'
                    ? 'bg-slate-700 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🔦 Thường
              </button>
              <button
                onClick={() => setLightMode('uv')}
                className={`rounded-lg px-2 py-0.5 text-[0.6rem] font-bold transition-all flex items-center gap-1 ${
                  lightMode === 'uv'
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.8)]'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                <span>🟣</span> Đèn UV CSI
              </button>
            </div>

            <button
              onClick={onClose}
              className="grid h-7 w-7 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors text-xs"
              aria-label="Đóng kính lúp"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Image Canvas with Interactive Hotspots */}
        <div className={`relative flex-1 overflow-hidden bg-black grid place-items-center min-h-[220px] max-h-[46vh] transition-all duration-300 ${
          lightMode === 'uv' ? 'shadow-[inset_0_0_60px_rgba(147,51,234,0.4)]' : ''
        }`}>
          <img
            src={`${import.meta.env.BASE_URL}${photo.img ?? 'detective/bia-vu-an.jpg'}`}
            alt={photo.title}
            style={{
              filter: lightMode === 'uv' ? 'brightness(0.65) contrast(1.9) hue-rotate(240deg) saturate(2.2)' : 'none',
            }}
            className="max-h-[46vh] w-auto max-w-full object-contain select-none transition-all duration-300"
          />

          {/* Grid inspection overlay */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity ${lightMode === 'uv' ? 'opacity-25' : 'opacity-15'}`}
            style={{
              backgroundImage:
                lightMode === 'uv'
                  ? 'linear-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.5) 1px, transparent 1px)'
                  : 'linear-gradient(rgba(14, 165, 233, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.4) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* UV Mode Tag */}
          {lightMode === 'uv' && (
            <div className="pointer-events-none absolute top-2 left-2 rounded-md bg-purple-950/90 border border-purple-500/50 px-2 py-0.5 text-[0.55rem] font-bold text-purple-200 shadow-md">
              🟣 ĐANG QUÉT HUỲNH QUANG UV (365nm): Phát hiện dấu vết phản quang
            </div>
          )}

          {/* Hotspot Markers */}
          {photo.hotspots?.map((h, idx) => {
            const isSelected = activeHotspot === idx
            const isFound = h.clue ? found.has(h.clue) : false

            return (
              <button
                key={idx}
                onClick={() => setActiveHotspot(idx)}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 focus:outline-none"
                title={h.label}
              >
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                      lightMode === 'uv'
                        ? 'bg-lime-400'
                        : isFound
                        ? 'bg-emerald-400'
                        : isSelected
                        ? 'bg-amber-400'
                        : 'bg-cyan-400'
                    }`}
                  />
                  <span
                    className={`relative grid h-6 w-6 place-items-center rounded-full border-2 text-[0.62rem] font-bold shadow-md transition-transform group-hover:scale-125 ${
                      lightMode === 'uv'
                        ? 'border-lime-200 bg-lime-400 text-slate-950 shadow-[0_0_18px_#84cc16,0_0_30px_#22c55e]'
                        : isFound
                        ? 'border-emerald-300 bg-emerald-600 text-white'
                        : isSelected
                        ? 'border-amber-300 bg-amber-500 text-slate-950 scale-110 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                        : 'border-cyan-300 bg-cyan-600 text-white shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                    }`}
                  >
                    {isFound ? '✓' : idx + 1}
                  </span>
                </span>
                <span className={`absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.58rem] font-bold pointer-events-none opacity-90 group-hover:opacity-100 shadow-md ${
                  lightMode === 'uv'
                    ? 'bg-purple-950/95 text-lime-300 border border-purple-500/80 shadow-[0_0_10px_rgba(132,204,22,0.3)]'
                    : 'bg-slate-900/95 text-slate-200 border border-slate-700/80'
                }`}>
                  {h.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Hotspots selector tabs */}
        {photo.hotspots && photo.hotspots.length > 1 && (
          <div className="flex gap-1.5 border-t border-slate-800 bg-slate-900/90 px-3.5 py-2 overflow-x-auto">
            {photo.hotspots.map((h, idx) => (
              <button
                key={idx}
                onClick={() => setActiveHotspot(idx)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[0.65rem] font-bold transition-all shrink-0 ${
                  activeHotspot === idx
                    ? lightMode === 'uv'
                      ? 'bg-purple-600/30 text-lime-300 border border-lime-400/50'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-400/50'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span>{h.clue && found.has(h.clue) ? '✓' : `Điểm ${idx + 1}`}</span>
                <span>{h.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Forensic Analysis Card */}
        <div className="border-t border-slate-800 bg-slate-900/95 p-3.5 space-y-2.5">
          {hs ? (
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[0.74rem] font-bold flex items-center gap-1.5 ${
                  lightMode === 'uv' ? 'text-lime-300' : 'text-amber-300'
                }`}>
                  <span>{lightMode === 'uv' ? '🟣' : '🎯'}</span> {hs.label}
                </span>
                {hs.hint && (
                  <span className="text-[0.6rem] text-slate-400 italic">
                    {hs.hint}
                  </span>
                )}
              </div>

              {lightMode === 'uv' && (
                <div className="mt-1.5 mb-1.5 flex items-center gap-1.5 text-[0.62rem] font-bold text-lime-300 bg-purple-950/70 border border-purple-500/40 px-2 py-1 rounded-lg">
                  <span>🔬</span>
                  <span>PHÂN TÍCH HUỲNH QUANG UV: Dấu vết hoá chất / sợi cước / vết bùn phát quang rõ nét dưới tia 365nm!</span>
                </div>
              )}

              <p className="mt-1.5 text-[0.74rem] leading-relaxed text-slate-200 whitespace-pre-line bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80">
                {hs.detail}
              </p>
              {hs.clue && (
                <button
                  onClick={() => find(hs.clue!)}
                  disabled={found.has(hs.clue)}
                  className={`mt-2.5 w-full inline-flex items-center justify-center gap-2 rounded-xl py-2 text-[0.7rem] font-bold transition-all shadow-md ${
                    found.has(hs.clue)
                      ? 'border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 cursor-default'
                      : 'border border-amber-400/60 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  }`}
                >
                  <span>{found.has(hs.clue) ? '✓' : '📌'}</span>
                  {found.has(hs.clue)
                    ? 'Đã ghi nhận manh mối này vào sổ tay'
                    : 'Ghi nhận manh mối mấu chốt vào sổ vụ án'}
                </button>
              )}
            </div>
          ) : (
            <div>
              <p className="text-[0.74rem] text-slate-300 leading-relaxed bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
                {photo.caption}
              </p>
              {photo.clue && (
                <button
                  onClick={() => find(photo.clue!)}
                  disabled={found.has(photo.clue)}
                  className={`mt-2.5 w-full inline-flex items-center justify-center gap-2 rounded-xl py-2 text-[0.7rem] font-bold transition-all shadow-md ${
                    found.has(photo.clue)
                      ? 'border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 cursor-default'
                      : 'border border-amber-400/60 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  }`}
                >
                  <span>{found.has(photo.clue) ? '✓' : '📌'}</span>
                  {found.has(photo.clue)
                    ? 'Đã ghi nhận manh mối này vào sổ tay'
                    : 'Ghi nhận manh mối từ bức ảnh'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- browser */

function BrowserApp({ found, find }: Ctx) {
  const pack = usePack()
  const { orders: ORDERS, photos: PHOTOS, trash: TRASH, news: NEWS } = pack
  const [tab, setTab] = useState<'photos' | 'orders' | 'news' | 'trash'>('photos')
  const [trash, setTrash] = useState<string | null>(null)
  const [inspectPhoto, setInspectPhoto] = useState<Photo | null>(null)
  const [browserToast, setBrowserToast] = useState<{ text: string; success: boolean } | null>(null)

  useEffect(() => {
    if (!browserToast) return
    const t = setTimeout(() => setBrowserToast(null), 2500)
    return () => clearTimeout(t)
  }, [browserToast])

  const activeTrash = TRASH.find((t) => t.id === trash) ?? null

  // Address bar URL simulation
  const currentUrl =
    tab === 'photos'
      ? 'coccoc://csdt.congan/kham-nghiem-hien-truong'
      : tab === 'orders'
      ? 'coccoc://he-thong.noi-bo/nhat-ky-thiet-bi'
      : tab === 'news'
      ? 'coccoc://hangchai-24h.vn/tin-nong'
      : 'coccoc://thung-rac.noi-bo/tap-tin-da-xoa'

  const handleInspectOrder = (o: (typeof ORDERS)[0]) => {
    if (o.clue) {
      if (!found.has(o.clue)) {
        find(o.clue)
        setBrowserToast({
          text: '⚠️ Bóc tách dữ liệu: Phát hiện mâu thuẫn lộ trình & mốc giờ! Đã lưu vào sổ.',
          success: true,
        })
      } else {
        setBrowserToast({
          text: '📌 Dữ liệu mốc giờ này đã ghi nhận trong sổ.',
          success: true,
        })
      }
    } else {
      setBrowserToast({
        text: '✓ Bản ghi thiết bị bình thường, khớp với alibi.',
        success: false,
      })
    }
  }

  const handleInspectComment = () => {
    if (!pack.comment?.clue) return
    if (!found.has(pack.comment.clue)) {
      find(pack.comment.clue)
      setBrowserToast({
        text: '💡 Phát hiện manh mối từ nhân chứng! Đã lưu vào sổ.',
        success: true,
      })
    } else {
      setBrowserToast({
        text: '📌 Nhân chứng này đã được ghi nhận trong sổ.',
        success: true,
      })
    }
  }

  const handleInspectTrash = (t: (typeof TRASH)[0]) => {
    if (t.clue) {
      if (!found.has(t.clue)) {
        find(t.clue)
        setBrowserToast({
          text: '🔍 Phục hồi dữ liệu bị xoá thành công! Đã lưu manh mối vào sổ.',
          success: true,
        })
      } else {
        setBrowserToast({
          text: '📌 Dữ liệu tệp này đã được lưu vào sổ.',
          success: true,
        })
      }
    } else {
      setBrowserToast({
        text: '📄 Tệp tin rác không chứa dữ liệu khả nghi.',
        success: false,
      })
    }
  }

  return (
    <div className="flex h-full flex-col bg-[#0b0f19] relative">
      {/* Photo inspection modal */}
      {inspectPhoto && (
        <PhotoInspectModal
          photo={inspectPhoto}
          found={found}
          find={find}
          onClose={() => setInspectPhoto(null)}
        />
      )}

      {/* Floating feedback toast in Browser */}
      {browserToast && (
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-[90%] rounded-2xl px-4 py-2 text-[0.68rem] font-bold shadow-2xl backdrop-blur-md border pointer-events-none transition-all ${
            browserToast.success
              ? 'bg-emerald-950/95 text-emerald-300 border-emerald-500/60 shadow-emerald-900/40'
              : 'bg-slate-900/95 text-slate-300 border-slate-700 shadow-black'
          }`}
        >
          {browserToast.text}
        </div>
      )}

      {/* Browser address bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/90 px-3 py-2">
        <div className="flex items-center gap-1">
          <button className="grid h-6 w-6 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs" title="Quay lại">‹</button>
          <button className="grid h-6 w-6 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs" title="Tiếp theo">›</button>
          <button className="grid h-6 w-6 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs" title="Tải lại">↻</button>
        </div>
        <div className="flex flex-1 items-center gap-1.5 truncate rounded-lg bg-slate-950/80 border border-slate-800 px-2.5 py-1 text-[0.66rem] text-slate-300">
          <span className="text-emerald-400 text-xs">🔒</span>
          <span className="text-slate-400 truncate">{currentUrl}</span>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex gap-1.5 border-b border-slate-800 bg-slate-900/50 px-3 py-2 overflow-x-auto">
        {(
          [
            ['photos', '📸 Hiện trường'],
            ['orders', '📊 Dữ liệu'],
            ['news', '📰 Bảng tin'],
            ['trash', '🗑️ Thùng rác'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => {
              setTab(id)
              setTrash(null)
            }}
            className={`rounded-xl px-3 py-1.5 text-[0.7rem] font-bold transition-all shrink-0 ${
              tab === id 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
        {/* TAB 1: PHOTOS / HIỆN TRƯỜNG & VẬT CHỨNG */}
        {tab === 'photos' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <p className="text-[0.66rem] font-medium text-slate-400">
                📸 Bấm vào từng ảnh để bật kính lúp soi chi tiết vật chứng hiện trường
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {PHOTOS.filter((p) => !p.requires || p.requires.every((r) => found.has(r))).map((p) => {
                const isFound = p.clue ? found.has(p.clue) : false
                const hasHotspots = p.hotspots && p.hotspots.length > 0

                return (
                  <div
                    key={p.id}
                    onClick={() => setInspectPhoto(p)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-black grid place-items-center">
                      <img
                        src={`${import.meta.env.BASE_URL}${p.img ?? 'detective/bia-vu-an.jpg'}`}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute bottom-2 right-2 rounded-lg bg-black/75 px-2 py-0.5 text-[0.58rem] font-semibold text-white/90 backdrop-blur-sm border border-white/10">
                        {p.time}
                      </span>
                      {hasHotspots && (
                        <span className="absolute top-2 left-2 rounded-lg bg-cyan-950/80 px-2 py-0.5 text-[0.58rem] font-bold text-cyan-300 backdrop-blur-sm border border-cyan-500/40">
                          🎯 {p.hotspots!.length} điểm nghi vấn
                        </span>
                      )}
                      <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center">
                        <span className="rounded-full bg-slate-900/90 border border-cyan-400 px-3 py-1 text-[0.66rem] font-bold text-cyan-300 shadow-lg">
                          🔍 Soi kính lúp
                        </span>
                      </div>
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[0.76rem] font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {p.title}
                        </p>
                        <p className="mt-1 text-[0.66rem] leading-relaxed text-slate-300 line-clamp-2">
                          {p.caption}
                        </p>
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setInspectPhoto(p)
                          }}
                          className={`w-full rounded-xl border py-1.5 text-[0.64rem] font-bold transition-all ${
                            isFound
                              ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400'
                              : 'border-amber-400/50 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                          }`}
                        >
                          {isFound ? '✓ Đã giám định kỹ bức ảnh' : '🔍 Bật kính lúp soi chi tiết'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS / DỮ LIỆU ĐIỆN TỬ & NHẬT KÝ */}
        {tab === 'orders' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1 text-[0.64rem] text-slate-400">
              <span className="font-semibold text-slate-300">{pack.ordersTitle}</span>
              <span className="text-cyan-400 font-medium">💡 Chạm vào bản ghi để đối chiếu</span>
            </div>
            {ORDERS.map((o) => {
              const isFound = o.clue ? found.has(o.clue) : false
              return (
                <div
                  key={o.id}
                  onClick={() => handleInspectOrder(o)}
                  className={`cursor-pointer rounded-2xl border p-3.5 shadow-sm transition-all hover:border-cyan-500/60 active:scale-[0.99] select-none ${
                    isFound
                      ? 'border-emerald-500/50 bg-slate-900/90'
                      : 'border-slate-800 bg-slate-900/70 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[0.72rem] font-bold text-cyan-400">{o.id}</span>
                    <span className="text-[0.62rem] text-slate-400">{o.time}</span>
                  </div>
                  <p className="mt-1.5 text-[0.74rem] text-slate-200 font-medium">
                    {o.pickup} <span className="text-cyan-400">→</span> {o.drop}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-800/80 pt-2">
                    <span className="text-[0.64rem] text-slate-400">
                      {o.fee} · <span className="text-emerald-400">{o.status}</span>
                    </span>
                    {isFound ? (
                      <span className="inline-flex items-center gap-1 text-[0.62rem] font-bold text-emerald-400">
                        ✓ Đã ghi vào sổ
                      </span>
                    ) : (
                      <span className="text-[0.62rem] font-medium text-slate-400 hover:text-cyan-300">
                        🔍 Chạm để đối chiếu
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* TAB 3: NEWS / BẢNG TIN KHU VỰC */}
        {tab === 'news' && (
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
              <span className="inline-block rounded-md bg-red-950/60 border border-red-500/30 px-2 py-0.5 text-[0.58rem] font-bold tracking-wider text-red-400 uppercase">
                BẢN TIN KHẨN · HÀNG CHAI 24H
              </span>
              <h3 className="mt-2 text-[0.95rem] font-bold leading-snug text-white tracking-tight">{NEWS.title}</h3>
              <p className="mt-2 text-[0.74rem] leading-relaxed text-slate-300 font-normal">{NEWS.lead}</p>
              <p className="mt-2 text-[0.72rem] leading-relaxed text-slate-400">{NEWS.body}</p>
            </div>

            {/* Case Specific Dynamic Comment */}
            {pack.comment && (
              <div
                onClick={handleInspectComment}
                className={`cursor-pointer rounded-2xl border p-4 shadow-sm transition-all hover:border-cyan-500/60 active:scale-[0.99] select-none ${
                  pack.comment.clue && found.has(pack.comment.clue)
                    ? 'border-emerald-500/50 bg-slate-900/90'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[0.62rem] font-bold tracking-wider text-slate-400 uppercase">BÌNH LUẬN NỔI BẬT KHU VỰC</p>
                  {pack.comment.clue && found.has(pack.comment.clue) && (
                    <span className="text-[0.6rem] font-bold text-emerald-400">✓ Đã lưu nhân chứng</span>
                  )}
                </div>
                <div className="mt-2.5 flex gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-800 border border-slate-700 text-base">
                    {pack.comment.avatar}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.72rem] font-bold text-slate-200">
                      {pack.comment.user} <span className="text-slate-500 font-normal">· {pack.comment.time}</span>
                    </p>
                    <p className="mt-1 text-[0.74rem] leading-relaxed text-slate-300">
                      {pack.comment.content}
                    </p>
                    <p className="mt-1.5 text-[0.6rem] text-cyan-400 font-medium">
                      💡 Chạm vào bình luận để ghi nhận nguồn tin nhân chứng
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: TRASH / THÙNG RÁC */}
        {tab === 'trash' && (
          <div className="space-y-2">
            {!activeTrash ? (
              <>
                <p className="text-[0.62rem] text-slate-400">Thùng rác hệ thống · {TRASH.length} mục đã xóa (Bấm để xem tệp phục hồi)</p>
                {TRASH.map((t) => {
                  const isFound = t.clue ? found.has(t.clue) : false
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTrash(t.id)}
                      className="flex w-full items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 text-left hover:border-slate-700 hover:bg-slate-800/60 transition-colors"
                    >
                      <span className="text-lg">{t.kind === 'file' ? '📄' : '🖼️'}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="block truncate text-[0.72rem] font-bold text-slate-200">{t.name}</span>
                          {isFound && <span className="text-[0.55rem] font-bold text-emerald-400">✓ Đã phục hồi</span>}
                        </span>
                        <span className="block truncate text-[0.6rem] text-slate-400">{t.preview}</span>
                      </span>
                      <span className="text-slate-500">›</span>
                    </button>
                  )
                })}
              </>
            ) : (
              <div>
                <button
                  onClick={() => setTrash(null)}
                  className="inline-flex items-center gap-1 text-[0.64rem] font-medium text-cyan-400 hover:text-cyan-300 mb-2"
                >
                  ‹ Quay lại danh sách tệp
                </button>
                <p className="text-[0.8rem] font-bold text-white">{activeTrash.name}</p>
                <div
                  onClick={() => handleInspectTrash(activeTrash)}
                  className="mt-2 cursor-pointer rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-[0.7rem] leading-relaxed whitespace-pre-line text-slate-200 hover:border-cyan-500/50 transition-colors"
                >
                  {activeTrash.detail}
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleInspectTrash(activeTrash)}
                    className={`w-full rounded-xl border py-2 text-[0.66rem] font-bold transition-all ${
                      activeTrash.clue && found.has(activeTrash.clue)
                        ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400'
                        : 'border-amber-400/50 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                    }`}
                  >
                    {activeTrash.clue && found.has(activeTrash.clue)
                      ? '✓ Đã phục hồi và ghi vào sổ vụ án'
                      : '🔍 Phục hồi và trích xuất manh mối từ tệp này'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- notes */

const EVIDENCE_SUSPECT_LINKS: Record<string, { suspectId: string; reason: string }[]> = {
  // Case 1: Dũng
  'don-hang-2147': [{ suspectId: 'dung', reason: 'Định vị GPS chứng minh Dũng nhận đơn tại Hẻm 42 đúng 21:47!' }],
  'anh-phan-chieu': [{ suspectId: 'dung', reason: 'Mặt kính cửa hàng phản chiếu Dũng dắt xe xanh mint lúc 21:58!' }],
  'tin-nhan-nhap': [{ suspectId: 'dung', reason: 'Bản nháp tin nhắn trong máy Dũng: "Cô Lan ơi mai em trả xe"!' }],
  'dung-khai-21h15': [{ suspectId: 'dung', reason: 'Dũng khai về phòng từ 21:15 để ngụy tạo chứng cứ ngoại phạm!' }],
  'hung-cho-vay': [{ suspectId: 'dung', reason: 'Dũng nợ tiền tiệm sửa xe Hùng nên túng quẫn làm liều!' }],

  // Case 2: Sơn
  'son-ao-do': [{ suspectId: 'son', reason: 'Ảnh chụp lúc 20:20: Sơn mặc áo khoác đỏ đứng sát vách tủ đồ!' }],
  'son-no-tien': [{ suspectId: 'son', reason: 'Sơn nợ chị Hạnh 6 triệu quá hạn, nháp rao bán máy 5 triệu!' }],
  'lo-hong-tu': [{ suspectId: 'son', reason: 'Sơn lợi dụng khe hở nóc tủ để thò tay rút điện thoại!' }],

  // Case 3: Trang
  'trang-giay': [{ suspectId: 'trang', reason: 'Giày vải trắng của Trang dính bùn đỏ chỉ có ở sau bệ hòm quỹ!' }],
  'chuyen-tien-trng': [{ suspectId: 'trang', reason: 'Trang chuyển khoản gấp 8 triệu cho chủ nợ Tú lúc 21:32!' }],
  'tin-nhan-do': [{ suspectId: 'trang', reason: 'Tin nhắn hẹn chủ nợ: "Tối nay xong chuyển 8tr"!' }],
  'hop-den': [{ suspectId: 'trang', reason: 'Hộp đèn pin mang chữ "T" của Trang in dấu tay bùn cạnh hòm quỹ!' }],

  // Case 4: Đạt
  'khai-ghi-am': [{ suspectId: 'dat', reason: 'Bản ghi âm 21:12 ghi lại khoảnh khắc Đạt tấn công Khải ở tầng hầm!' }],
  'tui-den': [{ suspectId: 'dat', reason: 'Đạt ném túi đen chứa găng tay và sổ nợ vào thùng rác lúc 21:30!' }],
  'ma-ket': [{ suspectId: 'dat', reason: 'Đạt đổi mã két thành 2147 và trực tiếp nhập mã mở két!' }],
  'chuyen-khoan': [{ suspectId: 'dat', reason: 'Đạt duyệt chuyển khoản 200 triệu công ty cho chủ nợ Bảy!' }],
  'dat-giay': [{ suspectId: 'dat', reason: 'Camera hẻm sau quay cảnh Đạt xách túi đen rời chung cư!' }],

  // Case 5: Vũ & Yến
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

function NotesApp({ found }: { found: Set<string> }) {
  const { clues: CLUES, suspects: SUSPECTS } = usePack()
  const [tab, setTab] = useState<'list' | 'mindmap'>('mindmap')
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

    // Check if already linked
    if (links.some((l) => l.suspectId === selectedSuspect && l.clueId === selectedClue)) {
      setFeedback({ text: '📌 Liên kết này đã được thiết lập từ trước.', success: true })
      return
    }

    const matches = EVIDENCE_SUSPECT_LINKS[selectedClue]
    const match = matches?.find((m) => m.suspectId === selectedSuspect)

    if (match) {
      setLinks((prev) => [...prev, { suspectId: selectedSuspect, clueId: selectedClue, reason: match.reason }])
      setSelectedClue(null)
      setFeedback({ text: '✨ XÂU CHUỖI THÀNH CÔNG! Đã liên kết chứng cứ buộc tội đanh thép!', success: true })
    } else {
      setFeedback({ text: '❌ Chưa đủ cơ sở trực tiếp để gắn manh mối này với đối tượng đã chọn.', success: false })
    }
  }

  return (
    <div className="flex h-full flex-col bg-[#0b0f19] relative">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-white tracking-tight">Sổ tay điều tra</p>
          <span className="rounded-full bg-cyan-950/60 border border-cyan-500/40 px-2.5 py-0.5 text-[0.6rem] font-bold text-cyan-400">
            {list.length}/{Object.keys(CLUES).length} manh mối
          </span>
        </div>

        {/* Tab Switch */}
        <div className="flex items-center gap-1 bg-slate-950 rounded-xl p-0.5 border border-slate-800">
          <button
            onClick={() => setTab('mindmap')}
            className={`rounded-lg px-2.5 py-1 text-[0.62rem] font-bold transition-all flex items-center gap-1 ${
              tab === 'mindmap' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🕸️</span> Sơ đồ suy luận
          </button>
          <button
            onClick={() => setTab('list')}
            className={`rounded-lg px-2.5 py-1 text-[0.62rem] font-bold transition-all flex items-center gap-1 ${
              tab === 'list' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>📋</span> Danh sách
          </button>
        </div>
      </div>

      {/* Floating Feedback Toast */}
      {feedback && (
        <div
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[90%] rounded-2xl px-4 py-2 text-[0.68rem] font-bold shadow-2xl backdrop-blur-md border pointer-events-none transition-all ${
            feedback.success
              ? 'bg-emerald-950/95 text-emerald-300 border-emerald-500/60 shadow-emerald-900/50'
              : 'bg-slate-900/95 text-slate-300 border-slate-700 shadow-black'
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* TAB 1: SƠ ĐỒ SUY LUẬN (MIND MAP CORKBOARD) */}
      {tab === 'mindmap' && (
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 to-cyan-950/20 p-3 shadow">
            <p className="text-[0.62rem] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>🕸️</span> BẢNG NỐI DÂY CHỨNG CỨ & LẬP LUẬN BUỘC TỘI
            </p>
            <p className="mt-1 text-[0.65rem] text-slate-300">
              Chạm chọn 1 <strong className="text-white">Nghi phạm</strong> + 1 <strong className="text-white">Manh mối</strong> rồi nhấn nút <strong className="text-cyan-400">“Nối dây chứng cứ”</strong> để hoàn thiện chuỗi lập luận kết tội.
            </p>
          </div>

          {/* Suspects Selector Row */}
          <div>
            <p className="text-[0.62rem] font-bold text-slate-400 uppercase tracking-wider mb-2">
              1. Chọn đối tượng tình nghi:
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SUSPECTS.map((s) => {
                const isSelected = selectedSuspect === s.id
                const suspectLinks = links.filter((l) => l.suspectId === s.id)
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSuspect(s.id)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                        : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{s.avatar}</span>
                      <div className="min-w-0 flex-1">
                        <p className={`truncate text-[0.74rem] font-bold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                          {s.name}
                        </p>
                        <p className="truncate text-[0.58rem] text-slate-400">{s.role}</p>
                      </div>
                    </div>
                    {suspectLinks.length > 0 && (
                      <div className="mt-1.5 flex items-center gap-1 text-[0.56rem] font-bold text-emerald-400">
                        <span>🔴 {suspectLinks.length} liên kết</span>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Clues Selector Row */}
          <div>
            <p className="text-[0.62rem] font-bold text-slate-400 uppercase tracking-wider mb-2">
              2. Chọn manh mối đối chiếu:
            </p>
            {list.length === 0 ? (
              <p className="text-[0.65rem] text-slate-500 italic p-3 text-center">
                Chưa có manh mối nào trong sổ tay. Hãy khám nghiệm hiện trường hoặc thẩm vấn Zola trước!
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
                      onClick={() => setSelectedClue(cid)}
                      className={`shrink-0 w-44 p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-1 ring-amber-400'
                          : isLinkedWithCurrent
                          ? 'border-emerald-500/40 bg-emerald-950/20'
                          : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span>{TAGS[c.tag] ?? '📌'}</span>
                        <span className={`truncate text-[0.7rem] font-bold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                          {c.title}
                        </span>
                      </div>
                      <p className="text-[0.6rem] text-slate-400 line-clamp-2 leading-relaxed">{c.detail}</p>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Action Button: Nối dây */}
          <button
            onClick={handleCreateLink}
            disabled={!selectedSuspect || !selectedClue}
            className="w-full py-2.5 rounded-xl font-bold text-[0.74rem] bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:brightness-110 disabled:opacity-40 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>🔗</span>
            <span>Nối dây chứng cứ kết tội</span>
          </button>

          {/* Established Mind Map Connections */}
          <div className="pt-2 border-t border-slate-800">
            <p className="text-[0.62rem] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Chuỗi chứng cứ đã xác lập ({links.length}):</span>
              {links.length >= 3 && (
                <span className="text-emerald-400 font-bold">⚖️ ĐỦ CƠ SỞ CÁO BUỘC THỦ PHẠM!</span>
              )}
            </p>

            {links.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-800 p-6 text-center text-slate-500 text-[0.68rem]">
                Chưa có liên kết suy luận nào. Hãy chọn nghi phạm và manh mối để nối dây!
              </div>
            ) : (
              <div className="space-y-2">
                {links.map((l, idx) => {
                  const s = SUSPECTS.find((sp) => sp.id === l.suspectId)
                  const c = CLUES[l.clueId]
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-red-500/40 bg-gradient-to-r from-red-950/30 via-slate-900 to-slate-900/80 p-3 shadow-md"
                    >
                      <div className="flex items-center gap-2 text-[0.72rem] font-bold text-white mb-1">
                        <span>{s?.avatar} {s?.name}</span>
                        <span className="text-red-400 font-mono">🔴───🔗───🔴</span>
                        <span className="text-cyan-300 truncate">{c?.title}</span>
                      </div>
                      <p className="text-[0.66rem] text-slate-300 leading-relaxed pl-2 border-l-2 border-red-500/50">
                        {l.reason}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DANH SÁCH MANH MỐI */}
      {tab === 'list' && (
        <div className="flex-1 space-y-2.5 overflow-y-auto p-3.5">
          {list.length === 0 && (
            <div className="py-12 px-4 text-center">
              <span className="text-3xl">📓</span>
              <p className="mt-2 text-[0.74rem] font-medium leading-relaxed text-slate-400">
                Sổ tay hiện đang trống. Hãy đọc tin nhắn Zola, lướt web và soi hiện trường để thu thập chứng cứ.
              </p>
            </div>
          )}
          {list.map((id) => {
            const c = CLUES[id]
            if (!c) return null
            return (
              <div key={id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3.5 shadow-sm transition-all hover:border-slate-700">
                <p className="text-[0.78rem] font-bold text-white flex items-center gap-1.5">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-slate-800 border border-slate-700 text-xs">
                    {TAGS[c.tag] ?? '📌'}
                  </span>
                  {c.title}
                </p>
                <p className="mt-2 text-[0.72rem] leading-relaxed text-slate-300 pl-7">{c.detail}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* --------------------------------------------------------------- dossier */
function FileApp({
  found,
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
  stage: 'main' | 'accomplice'
  unlocked: boolean
  code?: { value: string; hint: string }
  onUnlock: (code: string) => boolean
}) {
  const { suspects: SUSPECTS, clues: CLUES } = usePack()
  const [pick, setPick] = useState<string | null>(null)
  const [pin, setPin] = useState('')
  const [err, setErr] = useState(false)
  const locked = !!code && !unlocked
  const target = stage === 'accomplice' ? 'đồng phạm' : 'thủ phạm'
  return (
    <div className="flex h-full flex-col bg-[#0b0f19]">
      <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-3">
        <p className="text-sm font-bold text-white tracking-tight">Hồ sơ thẩm vấn</p>
        <p className="text-[0.62rem] text-slate-400 font-medium">
          Chỉ định người bạn cho là <span className="text-amber-400 font-bold">{target}</span>. Sai {maxTries} lần hồ sơ sẽ đóng vĩnh viễn.
        </p>
      </div>

      {locked && (
        <div className="border-b border-amber-500/30 bg-amber-950/30 p-3">
          <p className="text-[0.68rem] font-bold text-amber-300 flex items-center gap-1.5">
            <span>🔒</span> Hồ sơ bị mã hoá bằng mật khẩu 4 chữ số
          </p>
          <p className="mt-1 text-[0.64rem] leading-relaxed text-slate-300 font-medium">{code?.hint}</p>
          <div className="mt-2.5 flex gap-2">
            <input
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, '').slice(0, 4))
                setErr(false)
              }}
              inputMode="numeric"
              maxLength={4}
              placeholder="••••"
              aria-label="Mã mở hồ sơ"
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950/90 px-3 py-1.5 text-center text-sm font-bold tracking-[0.4em] text-white outline-none focus:border-amber-400 focus:shadow-[0_0_12px_rgba(245,158,11,0.25)]"
            />
            <button 
              className="btn btn-primary btn-sm px-4 font-bold" 
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
              onClick={() => !onUnlock(pin) && setErr(true)}
            >
              Mở khoá
            </button>
          </div>
          {err && <p className="mt-1.5 text-[0.62rem] font-bold text-red-400">⚠️ Mật mã chưa đúng. Hãy đọc lại ghi chú trong sổ.</p>}
        </div>
      )}

      <div className="flex-1 space-y-2.5 overflow-y-auto p-3.5">
        {SUSPECTS.map((s) => {
          const active = pick === s.id
          return (
            <button
              key={s.id}
              onClick={() => setPick(s.id)}
              disabled={status !== 'playing' || locked}
              className={`group flex w-full items-start gap-3.5 rounded-2xl border p-3.5 text-left transition-all ${
                active 
                  ? 'border-red-500/80 bg-red-950/30 shadow-[0_0_20px_rgba(239,68,68,0.25)]' 
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border text-xl shadow-sm transition-transform duration-200 group-hover:scale-105 ${
                active ? 'border-red-500/60 bg-red-950/60' : 'border-slate-700 bg-slate-800'
              }`}>
                {s.avatar}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between">
                  <span className="block text-[0.82rem] font-bold text-white group-hover:text-cyan-400 transition-colors">{s.name}</span>
                  {active && <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />}
                </span>
                <span className="block text-[0.64rem] font-medium text-slate-400">{s.role}</span>
                <span className="mt-1 block text-[0.68rem] leading-relaxed text-slate-300 font-normal">{s.note}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="border-t border-slate-800 bg-slate-900/90 p-3.5">
        <div className="mb-2.5 flex items-center justify-between text-[0.68rem] font-medium">
          <span className="text-slate-400">
            Manh mối thu thập: <span className="text-cyan-400 font-bold">{found.size}/{Object.keys(CLUES).length}</span>
          </span>
          <span className={`font-bold ${triesLeft > 1 ? 'text-emerald-400' : 'text-red-400'}`}>
            Còn {triesLeft}/{maxTries} lần cáo buộc
          </span>
        </div>
        <button
          className="btn btn-blood btn-md w-full shadow-lg"
          disabled={!pick || status !== 'playing' || triesLeft <= 0 || locked}
          onClick={() => {
            if (!pick) return
            accuse(pick)
            setPick(null)
          }}
        >
          {stage === 'accomplice' ? '⚖️ Xác nhận người này là đồng phạm' : '⚖️ Gửi cáo buộc thủ phạm chính'}
        </button>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- shell */
function CaseGame({ pack, onExit }: { pack: CasePack; onExit: () => void }) {
  const CASE = pack.case
  useTitle(`${CASE.title} · Thám Tử Bàn Phím`)
  const { clues, found, attempts, triesLeft, status, stage, unlocked, find, unlock, accuse, reset } = useCase(pack)
  const [booted, setBooted] = useState(() => clues.length > 0 || attempts > 0)
  const [open, setOpen] = useState<Record<AppId, boolean>>(() =>
    typeof window !== 'undefined' && window.innerWidth >= 900
      ? { zola: true, browser: true, notes: false, file: false }
      : { zola: true, browser: false, notes: false, file: false },
  )
  const [z, setZ] = useState<Record<AppId, number>>({ zola: 2, browser: 1, notes: 0, file: 0 })
  const [pos, setPos] = useState(() => Object.fromEntries(APPS.map((a) => [a.id, { x: a.x, y: a.y }])) as Record<AppId, { x: number; y: number }>)
  const [toast, setToast] = useState<string | null>(null)
  const [showExitModal, setShowExitModal] = useState(false)
  const [result, setResult] = useState<string | null>(() =>
    status === 'won' ? 'win' : status === 'lost' ? 'lost' : null,
  )
  const width = useWidth()

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const raise = (id: AppId) => {
    setZ((prev) => {
      const top = Math.max(...Object.values(prev)) + 1
      return { ...prev, [id]: top }
    })
  }

  const toggle = (id: AppId) => {
    setOpen((o) => {
      const next = !o[id]
      if (next) raise(id)
      if (width < 900) {
        const solo: Record<AppId, boolean> = { zola: false, browser: false, notes: false, file: false }
        solo[id] = next
        return solo
      }
      return { ...o, [id]: next }
    })
  }

  const onAccuse = (id: string) => {
    const r = accuse(id)
    if (r === 'win') setResult('win')
    if (r === 'dead') setResult('lost')
    if (r === 'wrong') setToast('Chưa đúng. Đọc lại sổ vụ án rồi thử lại.')
    if (r === 'stage2') setToast('Đúng là thủ phạm. Còn ai đã giúp?')
    if (r === 'locked') setToast('Hồ sơ đang khoá — nhập mã trước.')
  }

  if (!booted) {
    return (
      <Stage>
        <div className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-12">
          <p className="eyebrow mb-4">macQuê · {CASE.no}</p>
          <h1 className="display text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.02] text-glow">
            <span className="grad-moon">{CASE.title}</span>
          </h1>
          <p className="mt-4 max-w-lg text-[0.9rem] leading-relaxed text-parchment/60">{CASE.brief}</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.7rem] text-mute">
            <span>📍 {CASE.place}</span>
            <span>🕘 {CASE.time}</span>
            <span>🎯 tìm ra thủ phạm</span>
            <span>🔥 {CASE.difficulty}</span>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button className="btn btn-primary btn-lg" onClick={() => setBooted(true)}>
              Mở máy
              <span aria-hidden>⏻</span>
            </button>
            {clues.length > 0 && (
              <button
                className="btn btn-ghost btn-lg text-red-400 hover:text-red-300"
                onClick={() => {
                  if (window.confirm('Bạn có chắc muốn xoá tiến độ và chơi lại vụ án này từ đầu?')) {
                    reset()
                  }
                }}
              >
                🔄 Chơi lại từ đầu
              </button>
            )}
            <button className="btn btn-ghost btn-lg" onClick={onExit}>
              Đổi vụ án
            </button>
            <Link to="/" className="btn btn-ghost btn-lg">
              Trang chủ
            </Link>
          </div>
          <p className="mt-8 max-w-md text-[0.66rem] leading-relaxed text-mute/70">
            Đây là máy của anh Tùng — công an khu vực. Đọc tin nhắn, lướt web, soi ảnh và ghi lại manh mối. Khi biết
            ai đứng sau vụ án, gửi tên trong Hồ sơ. Sai {pack.maxTries} lần là hồ sơ đóng.
          </p>
        </div>
      </Stage>
    )
  }

  return (
    <Stage>
      <div className="relative min-h-dvh overflow-hidden" style={{ background: 'radial-gradient(120% 110% at 20% 0%, #0f172a 0%, #0a0f1d 55%, #060913 100%)' }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'linear-gradient(#38bdf844 1px, transparent 1px), linear-gradient(90deg,#38bdf844 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />

        {/* menu bar */}
        <div className="relative z-40 flex h-9 items-center gap-3 border-b border-slate-800 bg-slate-900/70 px-4 text-[0.68rem] text-slate-300 backdrop-blur-md">
          <span className="font-bold text-white">🍎 macQuê</span>
          <span className="hidden sm:inline text-slate-400">Tệp</span>
          <span className="hidden sm:inline text-slate-400">Sửa</span>
          <span className="hidden sm:inline text-slate-400">Xem</span>
          <span className="flex-1 truncate text-center text-[0.68rem] text-slate-300 font-medium">
            {CASE.title}
          </span>
          <span className="text-[0.64rem] text-cyan-400 font-semibold">{CASE.time}</span>
          <button
            onClick={() => setShowExitModal(true)}
            className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/15 px-2.5 py-1 text-[0.65rem] font-medium text-red-300 transition hover:bg-red-500/30 hover:border-red-500/50 hover:text-red-200"
            title="Thoát vụ án"
          >
            <span>🚪</span>
            <span>Thoát</span>
          </button>
        </div>

        {/* desktop hint */}
        <div className="relative z-10 px-5 py-4 lg:px-8">
          <p className="text-[0.62rem] font-bold tracking-[0.24em] text-cyan-400 uppercase">HỒ SƠ VỤ ÁN · {CASE.no}</p>
          <h2 className="display mt-1 text-xl text-white font-bold tracking-tight">
            {CASE.question}
          </h2>
        </div>

        {/* windows */}
        {APPS.map((app) => {
          if (!open[app.id]) return null
          const w = Math.min(app.w, width - 16)
          const x = Math.max(8, Math.min(pos[app.id].x, width - w - 8))
          const y = Math.max(48, Math.min(pos[app.id].y, 140))
          return (
            <div
              key={app.id}
              className="absolute z-20 overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0c1222]/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-shadow"
              style={{ left: x, top: y, width: w, height: Math.min(app.h, window.innerHeight - y - 90), zIndex: 20 + z[app.id] }}
              onPointerDown={() => raise(app.id)}
            >
              <div
                className="flex h-9 cursor-grab items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-3 active:cursor-grabbing"
                onPointerDown={(e) => {
                  const sx = e.clientX - pos[app.id].x
                  const sy = e.clientY - pos[app.id].y
                  const move = (ev: PointerEvent) =>
                    setPos((p) => ({ ...p, [app.id]: { x: Math.max(8, ev.clientX - sx), y: Math.max(48, ev.clientY - sy) } }))
                  const up = () => {
                    window.removeEventListener('pointermove', move)
                    window.removeEventListener('pointerup', up)
                  }
                  window.addEventListener('pointermove', move)
                  window.addEventListener('pointerup', up)
                }}
              >
                <span className="flex items-center gap-2">
                  <button
                    onClick={() => toggle(app.id)}
                    className="group/btn grid h-3 w-3 place-items-center rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm hover:brightness-110"
                    aria-label="Đóng"
                  >
                    <span className="text-[0.45rem] font-bold text-red-950 opacity-0 group-hover/btn:opacity-100">✕</span>
                  </button>
                  <button
                    onClick={() => toggle(app.id)}
                    className="group/btn grid h-3 w-3 place-items-center rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-sm hover:brightness-110"
                    aria-label="Thu nhỏ"
                  >
                    <span className="text-[0.45rem] font-bold text-amber-950 opacity-0 group-hover/btn:opacity-100">–</span>
                  </button>
                  <button
                    className="group/btn grid h-3 w-3 place-items-center rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm hover:brightness-110"
                    aria-label="Mở rộng"
                  >
                    <span className="text-[0.45rem] font-bold text-emerald-950 opacity-0 group-hover/btn:opacity-100">+</span>
                  </button>
                </span>
                <span className="flex-1 truncate text-center text-[0.72rem] font-bold tracking-wide text-slate-200">
                  {app.icon} {app.label}
                </span>
                <span className="w-8" />
              </div>
              <div className="h-[calc(100%-2.25rem)]">
                {app.id === 'zola' && <ZolaApp found={found} find={find} />}
                {app.id === 'browser' && <BrowserApp found={found} find={find} />}
                {app.id === 'notes' && <NotesApp found={found} />}
                {app.id === 'file' && (
                  <FileApp
                    found={found}
                    accuse={onAccuse}
                    triesLeft={triesLeft}
                    maxTries={pack.maxTries}
                    status={status}
                    stage={stage}
                    unlocked={unlocked}
                    code={pack.code}
                    onUnlock={unlock}
                  />
                )}
              </div>
            </div>
          )
        })}

        {/* dock */}
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-end gap-1.5 rounded-2xl border border-slate-700/80 bg-slate-900/90 px-3 py-2 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            {APPS.map((a) => (
              <button
                key={a.id}
                onClick={() => toggle(a.id)}
                className="group flex w-14 flex-col items-center gap-1 rounded-xl px-1 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800/80"
                title={a.label}
              >
                <span className="text-2xl leading-none transition-transform duration-200 group-hover:scale-105">{a.icon}</span>
                <span className="text-[0.55rem] font-medium text-slate-400 group-hover:text-slate-200">{a.label}</span>
                {open[a.id] ? (
                  <i className="h-1 w-3 rounded-full bg-cyan-400 shadow-[0_0_6px_#06b6d4]" />
                ) : (
                  <i className="h-1 w-1 rounded-full bg-transparent" />
                )}
              </button>
            ))}
            <span className="mx-1 h-8 w-px bg-slate-700/60" />
            <button
              onClick={() => setShowExitModal(true)}
              className="group flex w-12 flex-col items-center gap-1 rounded-xl px-1 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500/20"
              title="Thoát vụ án"
            >
              <span className="text-2xl leading-none transition-transform group-hover:scale-110">🚪</span>
              <span className="text-[0.55rem] font-medium text-red-400 group-hover:text-red-300">Thoát</span>
              <i className="h-1 w-1 opacity-0" />
            </button>
          </div>
        </div>

        {/* toast */}
        {toast && (
          <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-[0.7rem] text-slate-200 backdrop-blur shadow-lg">
            {toast}
          </div>
        )}

        {/* exit modal */}
        {showExitModal && (
          <div className="fixed inset-0 z-[80] grid place-items-center bg-black/80 px-4 backdrop-blur-md">
            <div className="w-full max-w-md rounded-3xl border border-slate-700/80 bg-[#0c1222] p-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-500/15 border border-red-500/30 text-2xl">
                  🚪
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Xác nhận thoát vụ án</h3>
                  <p className="text-[0.72rem] text-slate-400">{CASE.title}</p>
                </div>
              </div>

              <p className="mt-4 text-[0.78rem] text-slate-300 leading-relaxed">
                Bạn muốn làm gì với tiến độ vụ án hiện tại?
              </p>

              <div className="mt-4 space-y-2.5">
                <button
                  onClick={() => {
                    reset()
                    setShowExitModal(false)
                    onExit()
                  }}
                  className="w-full flex items-center justify-between rounded-2xl border border-red-500/40 bg-red-500/10 p-3.5 text-left transition hover:bg-red-500/20 hover:border-red-500/60 group"
                >
                  <div>
                    <div className="text-[0.82rem] font-bold text-red-300 group-hover:text-red-200 flex items-center gap-1.5">
                      <span>🔄</span> Thoát & Tạo mới lại từ đầu
                    </div>
                    <p className="mt-0.5 text-[0.68rem] text-slate-400">
                      Xoá toàn bộ manh mối và lượt đoán đã lưu. Lần sau vào lại sẽ là một vụ án mới toanh.
                    </p>
                  </div>
                  <span className="text-red-400 text-base font-bold group-hover:translate-x-1 transition-transform">→</span>
                </button>

                <button
                  onClick={() => {
                    setShowExitModal(false)
                    onExit()
                  }}
                  className="w-full flex items-center justify-between rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-3.5 text-left transition hover:bg-cyan-500/20 hover:border-cyan-500/50 group"
                >
                  <div>
                    <div className="text-[0.82rem] font-bold text-cyan-300 group-hover:text-cyan-200 flex items-center gap-1.5">
                      <span>💾</span> Tạm thoát & Lưu tiến độ
                    </div>
                    <p className="mt-0.5 text-[0.68rem] text-slate-400">
                      Giữ nguyên {found.size} manh mối đã tìm để bạn có thể quay lại điều tra tiếp sau.
                    </p>
                  </div>
                  <span className="text-cyan-400 text-base font-bold group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-800">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="rounded-xl px-3 py-1.5 text-[0.74rem] font-medium text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 transition"
                >
                  ← Tiếp tục điều tra
                </button>
                <Link
                  to="/"
                  onClick={() => reset()}
                  className="text-[0.72rem] text-slate-500 hover:text-red-400 transition underline underline-offset-4"
                >
                  Tạo mới & Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* result */}
        {result && (
          <div className="fixed inset-0 z-[70] grid place-items-center bg-black/75 px-6 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-slate-700/80 bg-[#0c1222] p-7 text-center shadow-2xl">
              <div className="text-4xl">{result === 'win' ? '🕵️' : '📁'}</div>
              <h2 className="display mt-3 text-3xl font-bold font-serif">
                {result === 'win' ? <span className="grad-cyan">Hồ sơ đã khép lại.</span> : <span className="text-red-400">Hồ sơ đóng lại.</span>}
              </h2>
              <p className="mt-3 text-[0.82rem] leading-relaxed text-slate-300">
                {result === 'win'
                  ? CASE.solution
                  : `Ba lần cáo buộc sai. Anh Tùng tự xử lý, còn bạn thì bị ghi vào “thành tích” của phường. Manh mối vẫn còn đó — thử lại từ đầu?`}
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  className="btn btn-primary btn-md"
                  onClick={() => {
                    reset()
                    setResult(null)
                    setBooted(false)
                  }}
                >
                  🔄 Điều tra lại (Tạo mới)
                </button>
                <button
                  className="btn btn-ghost btn-md"
                  onClick={() => {
                    if (result === 'lost') reset()
                    onExit()
                  }}
                >
                  📁 Danh sách vụ án
                </button>
                <Link
                  to="/"
                  onClick={() => {
                    if (result === 'lost') reset()
                  }}
                  className="btn btn-ghost btn-md"
                >
                  🏠 Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Stage>
  )
}

/* -------------------------------------------------------------- case list */
function readStatus(id: string): { status: 'new' | 'playing' | 'won' | 'lost'; clueCount: number } {
  try {
    const raw = localStorage.getItem(saveKey(id))
    if (!raw) return { status: 'new', clueCount: 0 }
    const parsed = JSON.parse(raw) as Partial<{ clues: string[]; attempts: number; status: string }>
    const clues = Array.isArray(parsed.clues) ? parsed.clues : []
    const status =
      parsed.status === 'won' || parsed.status === 'lost'
        ? (parsed.status as 'won' | 'lost')
        : clues.length > 0 || (typeof parsed.attempts === 'number' && parsed.attempts > 0)
        ? 'playing'
        : 'new'
    return { status, clueCount: clues.length }
  } catch {
    return { status: 'new', clueCount: 0 }
  }
}

function CasePicker({ onPick }: { onPick: (id: string) => void }) {
  useTitle('Chọn vụ án · Thám Tử Bàn Phím')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleResetCase = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (window.confirm('Bạn có chắc muốn đặt lại vụ án này để chơi mới từ đầu?')) {
      clearCaseSave(id)
      setRefreshKey((k) => k + 1)
    }
  }

  return (
    <Stage>
      <div className="mx-auto min-h-dvh max-w-4xl px-6 py-14">
        <p className="eyebrow">TBOY Studio · macQuê</p>
        <h1 className="display mt-2 text-[clamp(2rem,5vw,3.2rem)]">
          <span className="grad-moon">Chọn vụ án</span>
        </h1>
        <p className="mt-2 max-w-xl text-[0.82rem] leading-relaxed text-parchment/55">
          Năm vụ án trinh thám với độ khó tăng dần. Màn 05 là kỳ án mạng phòng kín siêu hóc búa: kẻ thủ ác ngụy tạo
          hiện trường tự tử tinh vi cùng kẻ đồng phạm tiếp tay xảo quyệt.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {CASES.map((p) => {
            const st = readStatus(p.id)
            return (
              <div
                key={`${p.id}-${refreshKey}`}
                onClick={() => onPick(p.id)}
                className="group relative cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-amber/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[0.58rem] uppercase tracking-[0.22em] text-mute">{p.case.no}</span>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[0.58rem] text-amber">
                    {p.difficulty}
                  </span>
                </div>
                <h2 className="mt-2 text-[1.05rem] font-semibold leading-snug text-parchment/90 group-hover:text-amber transition-colors">
                  {p.case.title}
                </h2>
                <p className="mt-1 text-[0.64rem] text-mute">
                  📍 {p.case.place} · 🕘 {p.case.time}
                </p>
                <p className="mt-2 line-clamp-2 text-[0.7rem] leading-relaxed text-parchment/55">{p.case.brief}</p>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[0.68rem] font-medium text-amber">
                    {st.status === 'won'
                      ? '✅ Đã phá án'
                      : st.status === 'lost'
                      ? '⏳ Hồ sơ đang đóng'
                      : st.status === 'playing'
                      ? `🔍 Đang điều tra (${st.clueCount} manh mối)`
                      : '▶ Vào điều tra'}
                  </span>
                  {st.status !== 'new' && (
                    <button
                      type="button"
                      onClick={(e) => handleResetCase(e, p.id)}
                      className="rounded-md border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[0.62rem] font-medium text-red-300 hover:bg-red-500/25 hover:text-red-200 transition"
                      title="Đặt lại vụ án này về ban đầu"
                    >
                      🔄 Chơi mới
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <Link to="/" className="btn btn-ghost btn-md mt-8">
          Về trang chủ
        </Link>
      </div>
    </Stage>
  )
}

export default function Detective() {
  const [active, setActive] = useState<string | null>(null)
  const pack = active ? (CASES.find((c) => c.id === active) ?? null) : null
  if (!pack) return <CasePicker onPick={setActive} />
  return (
    <PackCtx.Provider value={pack}>
      <CaseGame key={pack.id} pack={pack} onExit={() => setActive(null)} />
    </PackCtx.Provider>
  )
}
