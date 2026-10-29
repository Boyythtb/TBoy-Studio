
import { useEffect, useRef, useState } from 'react'
import { MacSound } from '../MacAudio'
import { usePack } from '../pack'

export interface Ctx {
  found: Set<string>
  find: (id: string) => void
  onOpenUrl?: (url: string) => void
}

export function ZolaApp({ found, find, onOpenUrl }: Ctx) {
  const { convs: CONVS, case: caseMeta } = usePack()
  const [active, setActive] = useState<string | null>(null)
  const [inspectToast, setInspectToast] = useState<{ text: string; success: boolean } | null>(null)

  const convs = CONVS.filter((c) => !c.requires || c.requires.every((r) => found.has(r)))
  const conv = convs.find((c) => c.id === active) ?? null
  const msgs = conv ? conv.messages.filter((m) => !m.requires || m.requires.every((r) => found.has(r))) : []
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [active, msgs.length])

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
                  onClick={() => {
                    if (m.from === 'them') handlePinMsg(m)
                  }}
                  className={`group/msg relative rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-xs transition-all ${
                    m.from === 'me' 
                      ? 'bg-blue-600 text-white rounded-tr-xs' 
                      : isClueFound
                      ? 'bg-emerald-50 text-slate-800 rounded-tl-xs border border-emerald-300 ring-1 ring-emerald-200/50 cursor-pointer'
                      : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/80 hover:border-blue-300 active:bg-slate-50 cursor-pointer'
                  }`}
                  title={m.from === 'them' ? 'Chạm để kiểm tra & ghim lời khai' : undefined}
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
                  <div className={`mt-1 flex items-center gap-1.5 text-[10px] font-medium text-slate-400 ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <span>{m.time}</span>
                    {m.from === 'me' && <span className="text-blue-600 font-bold">✓✓</span>}
                    {isClueFound && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 text-emerald-800 px-1.5 py-0.2 text-[9px] font-semibold border border-emerald-200">
                        <span>📌</span> Đã ghim
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}

      </div>

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
