import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Stage } from '../ui/Stage'
import { useTitle } from '../lib/useTitle'
import type { Photo } from '../detective/case1'
import { CASES, type CasePack } from '../detective/cases'
import { PackCtx, usePack } from '../detective/pack'
import { saveKey, useCase } from '../detective/useCase'

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
function ZolaApp({ found, find }: Ctx) {
  const { convs: CONVS } = usePack()
  const [active, setActive] = useState<string | null>(null)
  const convs = CONVS.filter((c) => !c.requires || c.requires.every((r) => found.has(r)))
  const conv = convs.find((c) => c.id === active) ?? null
  const msgs = conv ? conv.messages.filter((m) => !m.requires || m.requires.every((r) => found.has(r))) : []
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [active, msgs.length])

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

        <div className="flex items-center gap-1 text-slate-400">
          <button className="grid h-7 w-7 place-items-center rounded-lg hover:bg-slate-800 hover:text-white transition-colors" title="Gọi thoại">
            📞
          </button>
          <button className="grid h-7 w-7 place-items-center rounded-lg hover:bg-slate-800 hover:text-white transition-colors" title="Gọi video">
            📹
          </button>
        </div>
      </div>

      {/* Chat Wallpaper Container */}
      <div 
        ref={scroller} 
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
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
        <div className="flex justify-center my-1">
          <span className="rounded-full bg-slate-800/80 px-3 py-0.5 text-[0.58rem] font-medium text-slate-400 border border-slate-700/50">
            Hôm nay, 12 Tháng 9
          </span>
        </div>

        {msgs.map((m) => (
          <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${m.from === 'me' ? 'items-end' : 'items-start'}`}>
              <div
                className={`relative rounded-2xl px-3.5 py-2.5 text-[0.78rem] leading-relaxed shadow-md ${
                  m.from === 'me' 
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-tr-xs shadow-blue-900/30 font-normal' 
                    : 'bg-slate-800/95 text-slate-100 rounded-tl-xs border border-slate-700/60 shadow-black/40 font-normal'
                }`}
              >
                {m.text}
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

              {m.clue && (
                <div className="mt-2">
                  <button
                    onClick={() => find(m.clue!)}
                    disabled={found.has(m.clue)}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[0.66rem] font-bold shadow-sm transition-all duration-200 ${
                      found.has(m.clue)
                        ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-400'
                        : 'border-amber-400/50 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 hover:border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    }`}
                  >
                    <span>{found.has(m.clue) ? '✓' : '📌'}</span>
                    {found.has(m.clue) ? 'Đã lưu vào sổ vụ án' : 'Lưu manh mối quan trọng'}
                  </button>
                </div>
              )}

              {m.time && (
                <p className={`mt-1 text-[0.58rem] font-medium text-slate-400 ${m.from === 'me' ? 'text-right' : 'text-left'}`}>
                  {m.time} {m.from === 'me' && <span className="text-cyan-400">✓✓</span>}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

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

/* --------------------------------------------------------------- browser */

const SCENES: Record<Photo['scene'], { bg: string; icon: string; img: string }> = {
  street: {
    bg: 'linear-gradient(150deg,#101a2b 0%,#1d2b45 55%,#2a2033 100%)',
    icon: '🚲',
    img: 'detective/hien-truong-2158.jpg',
  },
  tea: {
    bg: 'linear-gradient(150deg,#3a2417 0%,#5a3620 60%,#2a1a12 100%)',
    icon: '🧋',
    img: 'detective/tra-sua.jpg',
  },
  net: {
    bg: 'linear-gradient(150deg,#0f2430 0%,#163a46 60%,#0c1a22 100%)',
    icon: '🖥️',
    img: 'detective/quan-net.jpg',
  },
}

function BrowserApp({ found, find }: Ctx) {
  const { orders: ORDERS, photos: PHOTOS, trash: TRASH, news: NEWS } = usePack()
  const [tab, setTab] = useState<'news' | 'orders' | 'photos' | 'trash'>('news')
  const [trash, setTrash] = useState<string | null>(null)
  const active = TRASH.find((t) => t.id === trash) ?? null

  return (
    <div className="flex h-full flex-col bg-[#0b0f19]">
      {/* Browser address bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/90 px-3 py-2">
        <div className="flex items-center gap-1">
          <button className="grid h-6 w-6 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs" title="Quay lại">‹</button>
          <button className="grid h-6 w-6 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs" title="Tiếp theo">›</button>
          <button className="grid h-6 w-6 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs" title="Tải lại">↻</button>
        </div>
        <div className="flex flex-1 items-center gap-1.5 truncate rounded-lg bg-slate-950/80 border border-slate-800 px-2.5 py-1 text-[0.66rem] text-slate-300">
          <span className="text-emerald-400 text-xs">🔒</span>
          <span className="text-slate-400">coccoc://</span>hang-chai/hem-42
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex gap-1.5 border-b border-slate-800 bg-slate-900/50 px-3 py-2">
        {(
          [
            ['news', '📰 Bảng tin'],
            ['orders', '📊 Dữ liệu'],
            ['photos', '📸 Hiện trường'],
            ['trash', '🗑️ Thùng rác'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => {
              setTab(id)
              setTrash(null)
            }}
            className={`rounded-xl px-3 py-1.5 text-[0.7rem] font-bold transition-all ${
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

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
              <p className="text-[0.62rem] font-bold tracking-wider text-slate-400 uppercase">BÌNH LUẬN NỔI BẬT</p>
              <div className="mt-2.5 flex gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-800 border border-slate-700 text-base">🛵</span>
                <div className="min-w-0">
                  <p className="text-[0.72rem] font-bold text-slate-200">
                    d.ship.42 <span className="text-slate-500 font-normal">· 2 giờ trước</span>
                  </p>
                  <p className="mt-1 text-[0.74rem] leading-relaxed text-slate-300">
                    “Khu này dạo này lắm chuyện thật, tối nào cũng có người mất đồ.”
                  </p>
                  <button
                    onClick={() => find('dang-bai-an-danh')}
                    disabled={found.has('dang-bai-an-danh')}
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[0.64rem] font-bold transition-all ${
                      found.has('dang-bai-an-danh') 
                        ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400' 
                        : 'border-amber-400/50 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                    }`}
                  >
                    <span>{found.has('dang-bai-an-danh') ? '✓' : '📌'}</span>
                    {found.has('dang-bai-an-danh') ? 'Đã lưu tài khoản đáng ngờ' : 'Ghi nhận tài khoản đáng ngờ'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className="space-y-2.5">
            <p className="text-[0.66rem] font-medium text-slate-400">📋 Lịch sử đơn hàng · Tài xế Dũng · Đêm xảy ra vụ án</p>
            {ORDERS.map((o) => (
              <div key={o.id} className="rounded-xl border border-slate-800 bg-slate-900/70 p-3.5 shadow-sm">
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
                  {o.clue && (
                    <button
                      onClick={() => find(o.clue!)}
                      disabled={found.has(o.clue)}
                      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[0.62rem] font-bold transition-all ${
                        found.has(o.clue) ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400' : 'border-amber-400/50 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                      }`}
                    >
                      <span>{found.has(o.clue) ? '✓' : '📌'}</span>
                      {found.has(o.clue) ? 'Đã lưu' : 'Lưu lộ trình này'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'photos' && (
          <div className="grid gap-3 sm:grid-cols-2">
            {PHOTOS.filter((p) => !p.requires || p.requires.every((r) => found.has(r))).map((p) => {
              const art = SCENES[p.scene]
              return (
                <div key={p.id} className="overflow-hidden rounded-xl border border-white/8 bg-white/[0.03]">
                  <div className="relative grid h-28 place-items-center" style={{ background: art.bg }}>
                    <span className="text-4xl drop-shadow-lg">{art.icon}</span>
                    <img
                      src={`${import.meta.env.BASE_URL}${p.img ?? art.img}`}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    <span className="absolute bottom-1.5 right-2 rounded bg-black/45 px-1.5 py-0.5 text-[0.55rem] text-white/80">
                      {p.time}
                    </span>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[0.72rem] font-medium text-parchment/85">{p.title}</p>
                    <p className="mt-0.5 text-[0.62rem] leading-relaxed text-mute">{p.caption}</p>
                    {p.clue && (
                      <button
                        onClick={() => find(p.clue!)}
                        disabled={found.has(p.clue)}
                        className={`mt-2 w-full rounded-lg border py-1 text-[0.6rem] ${
                          found.has(p.clue) ? 'border-white/8 text-mute' : 'border-amber/40 bg-amber/10 text-amber'
                        }`}
                      >
                        {found.has(p.clue) ? '✓ đã soi kỹ' : '🔍 soi kỹ bức ảnh'}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tab === 'trash' && (
          <div className="space-y-2">
            {!active ? (
              <>
                <p className="text-[0.62rem] text-mute">Thùng rác · 3 mục</p>
                {TRASH.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTrash(t.id)}
                    className="flex w-full items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-left hover:bg-white/[0.06]"
                  >
                    <span className="text-lg">{t.kind === 'file' ? '📄' : '🖼️'}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.72rem] text-parchment/85">{t.name}</span>
                      <span className="block truncate text-[0.6rem] text-mute">{t.preview}</span>
                    </span>
                    <span className="text-mute">›</span>
                  </button>
                ))}
              </>
            ) : (
              <div>
                <button onClick={() => setTrash(null)} className="text-[0.62rem] text-mute hover:text-parchment">
                  ‹ quay lại thùng rác
                </button>
                <p className="mt-2 text-[0.8rem] font-medium text-parchment/85">{active.name}</p>
                <div className="mt-2 rounded-xl border border-white/8 bg-black/25 p-3 text-[0.7rem] leading-relaxed whitespace-pre-line text-parchment/70">
                  {active.detail}
                </div>
                {active.clue && (
                  <button
                    onClick={() => find(active.clue!)}
                    disabled={found.has(active.clue)}
                    className={`mt-3 w-full rounded-lg border py-1.5 text-[0.64rem] ${
                      found.has(active.clue) ? 'border-white/8 text-mute' : 'border-amber/40 bg-amber/10 text-amber'
                    }`}
                  >
                    {found.has(active.clue) ? '✓ đã ghi vào sổ' : '📌 ghi vào sổ vụ án'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- notes */
function NotesApp({ found }: { found: Set<string> }) {
  const { clues: CLUES } = usePack()
  const list = Array.from(found)
  return (
    <div className="flex h-full flex-col bg-[#0b0f19]">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3">
        <p className="text-sm font-bold text-white tracking-tight">Sổ tay điều tra viên</p>
        <span className="rounded-full bg-cyan-950/60 border border-cyan-500/40 px-2.5 py-0.5 text-[0.64rem] font-bold text-cyan-400">
          {list.length}/{Object.keys(CLUES).length} manh mối
        </span>
      </div>
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
            <Link to="/" className="btn btn-ghost btn-lg">
              Để sau
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
        <div className="relative z-40 flex h-9 items-center gap-4 border-b border-slate-800 bg-slate-900/70 px-4 text-[0.68rem] text-slate-300 backdrop-blur-md">
          <span className="font-bold text-white">🍎 macQuê</span>
          <span className="hidden sm:inline text-slate-400">Tệp</span>
          <span className="hidden sm:inline text-slate-400">Sửa</span>
          <span className="hidden sm:inline text-slate-400">Xem</span>
          <span className="flex-1 truncate text-center text-[0.68rem] text-slate-300 font-medium">
            {CASE.title}
          </span>
          <span className="text-[0.64rem] text-cyan-400 font-semibold">{CASE.time}</span>
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
            <Link to="/" className="flex w-12 flex-col items-center gap-1 rounded-xl px-1 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800/80" title="Trang chủ">
              <span className="text-2xl leading-none">🏠</span>
              <span className="text-[0.55rem] font-medium text-slate-400">Thoát</span>
              <i className="h-1 w-1 opacity-0" />
            </Link>
          </div>
        </div>

        {/* toast */}
        {toast && (
          <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-[0.7rem] text-slate-200 backdrop-blur shadow-lg">
            {toast}
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
                  Điều tra lại
                </button>
                <button className="btn btn-ghost btn-md" onClick={onExit}>
                  Danh sách vụ án
                </button>
                <Link to="/" className="btn btn-ghost btn-md">
                  Về trang chủ
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
function readStatus(id: string): string {
  try {
    const raw = localStorage.getItem(saveKey(id))
    if (!raw) return 'new'
    const status = (JSON.parse(raw) as { status?: string }).status
    return status === 'won' || status === 'lost' ? status : 'playing'
  } catch {
    return 'new'
  }
}

function CasePicker({ onPick }: { onPick: (id: string) => void }) {
  useTitle('Chọn vụ án · Thám Tử Bàn Phím')
  return (
    <Stage>
      <div className="mx-auto min-h-dvh max-w-4xl px-6 py-14">
        <p className="eyebrow">TBOY Studio · macQuê</p>
        <h1 className="display mt-2 text-[clamp(2rem,5vw,3.2rem)]">
          <span className="grad-moon">Chọn vụ án</span>
        </h1>
        <p className="mt-2 max-w-xl text-[0.82rem] leading-relaxed text-parchment/55">
          Bốn vụ án, độ khó tăng dần. Vụ cuối cùng là một mê cung: nhiều manh mối, nhiều alibi giả và một hồ sơ bị
          khoá bằng mã số.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {CASES.map((p) => {
            const st = readStatus(p.id)
            return (
              <button
                key={p.id}
                onClick={() => onPick(p.id)}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-amber/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[0.58rem] uppercase tracking-[0.22em] text-mute">{p.case.no}</span>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[0.58rem] text-amber">
                    {p.difficulty}
                  </span>
                </div>
                <h2 className="mt-2 text-[1.05rem] font-semibold leading-snug text-parchment/90">{p.case.title}</h2>
                <p className="mt-1 text-[0.64rem] text-mute">
                  📍 {p.case.place} · 🕘 {p.case.time}
                </p>
                <p className="mt-2 line-clamp-2 text-[0.7rem] leading-relaxed text-parchment/55">{p.case.brief}</p>
                <p className="mt-3 text-[0.65rem] font-medium text-amber">
                  {st === 'won' ? '✅ Đã phá án' : st === 'lost' ? '⏳ Hồ sơ đang đóng' : '▶ Vào điều tra'}
                </p>
              </button>
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
