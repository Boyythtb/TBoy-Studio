import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Stage } from '../ui/Stage'
import { useTitle } from '../lib/useTitle'
import { CASE, CLUES, CONVS, ORDERS, PHOTOS, SUSPECTS, TRASH, type Photo } from '../detective/case1'
import { useCase } from '../detective/useCase'

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
      <div className="flex h-full flex-col">
        <div className="border-b border-white/8 px-4 py-3">
          <p className="text-sm font-semibold text-parchment/90">Zola</p>
          <p className="text-[0.62rem] text-mute">5 cuộc trò chuyện · 23:52</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {convs.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className="flex w-full items-center gap-3 border-b border-white/5 px-3 py-3 text-left transition hover:bg-white/5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/8 text-xl">{c.avatar}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-[0.8rem] font-medium text-parchment/90">{c.name}</span>
                  <span className="shrink-0 text-[0.6rem] text-mute">{c.sub}</span>
                </span>
                <span className="mt-0.5 block truncate text-[0.7rem] text-mute">{c.preview}</span>
              </span>
            </button>
          ))}
          {convs.length < CONVS.length && (
            <p className="px-4 py-4 text-center text-[0.65rem] text-mute/70">
              {CONVS.length - convs.length} cuộc trò chuyện còn khoá — cần thêm manh mối.
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-white/8 px-2 py-2">
        <button onClick={() => setActive(null)} className="grid h-7 w-7 place-items-center rounded-lg text-mute hover:bg-white/8" aria-label="Quay lại">
          ‹
        </button>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-lg">{conv.avatar}</span>
        <div className="min-w-0">
          <p className="truncate text-[0.78rem] font-medium text-parchment/90">{conv.name}</p>
          <p className="text-[0.58rem] text-mute">{conv.sub}</p>
        </div>
      </div>

      <div ref={scroller} className="flex-1 space-y-2.5 overflow-y-auto px-3 py-4">
        {msgs.map((m) => (
          <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[86%] ${m.from === 'me' ? 'items-end' : 'items-start'}`}>
              <div
                className={`rounded-2xl px-3 py-2 text-[0.76rem] leading-relaxed ${
                  m.from === 'me' ? 'bg-[#3a6ff7]/25 text-parchment/90' : 'bg-white/[0.07] text-parchment/85'
                }`}
              >
                {m.text}
              </div>
              {m.card && (
                <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2">
                  <span className="text-lg">{m.card.icon}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-[0.7rem] text-parchment/85">{m.card.title}</span>
                    <span className="block truncate text-[0.6rem] text-mute">{m.card.sub}</span>
                  </span>
                </div>
              )}
              {m.clue && (
                <button
                  onClick={() => find(m.clue!)}
                  disabled={found.has(m.clue)}
                  className={`mt-1.5 rounded-full border px-2.5 py-1 text-[0.6rem] transition ${
                    found.has(m.clue)
                      ? 'border-white/8 text-mute'
                      : 'border-amber/40 bg-amber/10 text-amber hover:bg-amber/20'
                  }`}
                >
                  {found.has(m.clue) ? '✓ đã ghi vào sổ' : '📌 ghi vào sổ vụ án'}
                </button>
              )}
              {m.time && <p className="mt-0.5 text-[0.55rem] text-mute/70">{m.time}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/8 px-3 py-2 text-[0.62rem] text-mute/60">Zola · tin nhắn chỉ đọc</div>
    </div>
  )
}

/* --------------------------------------------------------------- browser */
const NEWS = {
  title: 'Mất xe đạp điện giữa hẻm, camera an ninh lại “ngủ quên”',
  lead: 'Tối qua, chị Ngọc (Hẻm 42, phố Hàng Chai) phát hiện chiếc xe đạp điện dựng trước cửa đã biến mất. Camera của khu trọ ghi hình nhưng ổ cứng đã hỏng từ tuần trước.',
  body: 'Theo người dân, hẻm 42 thường đông xe shipper qua lại vào buổi tối. Một số hộ dân cho rằng chỉ cần vài phút sơ hở là xe có thể bị dắt đi mà không ai để ý.',
}

const SCENES: Record<Photo['scene'], { bg: string; icon: string }> = {
  street: { bg: 'linear-gradient(150deg,#101a2b 0%,#1d2b45 55%,#2a2033 100%)', icon: '🚲' },
  tea: { bg: 'linear-gradient(150deg,#3a2417 0%,#5a3620 60%,#2a1a12 100%)', icon: '🧋' },
  net: { bg: 'linear-gradient(150deg,#0f2430 0%,#163a46 60%,#0c1a22 100%)', icon: '🖥️' },
}

function BrowserApp({ found, find }: Ctx) {
  const [tab, setTab] = useState<'news' | 'orders' | 'photos' | 'trash'>('news')
  const [trash, setTrash] = useState<string | null>(null)
  const active = TRASH.find((t) => t.id === trash) ?? null

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
        <span className="flex gap-1">
          <i className="h-2 w-2 rounded-full bg-[#ff6a5c]/70" />
          <i className="h-2 w-2 rounded-full bg-amber/60" />
          <i className="h-2 w-2 rounded-full bg-[#7be0c0]/60" />
        </span>
        <span className="flex-1 truncate rounded-lg bg-black/30 px-2.5 py-1 text-[0.62rem] text-mute">coccoc://hang-chai/hem-42</span>
      </div>

      <div className="flex gap-1 border-b border-white/8 px-2 py-1.5">
        {(
          [
            ['news', 'Tin tức'],
            ['orders', 'Đơn ship'],
            ['photos', 'Ảnh'],
            ['trash', 'Thùng rác'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => {
              setTab(id)
              setTrash(null)
            }}
            className={`rounded-lg px-2.5 py-1 text-[0.66rem] transition ${
              tab === id ? 'bg-white/10 text-parchment/90' : 'text-mute hover:bg-white/5'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {tab === 'news' && (
          <div className="space-y-3">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
              <p className="text-[0.58rem] tracking-[0.16em] text-mute uppercase">Hàng Chai 24h</p>
              <h3 className="mt-1 text-[0.9rem] font-semibold leading-snug text-parchment/90">{NEWS.title}</h3>
              <p className="mt-2 text-[0.7rem] leading-relaxed text-parchment/65">{NEWS.lead}</p>
              <p className="mt-2 text-[0.7rem] leading-relaxed text-parchment/55">{NEWS.body}</p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
              <p className="text-[0.6rem] tracking-[0.16em] text-mute uppercase">Bình luận</p>
              <div className="mt-2 flex gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/8 text-sm">🛵</span>
                <div className="min-w-0">
                  <p className="text-[0.68rem] text-parchment/80">
                    d.ship.42 <span className="text-mute">· 2 giờ trước</span>
                  </p>
                  <p className="mt-0.5 text-[0.7rem] leading-relaxed text-parchment/65">
                    “Xe đó em thấy dựng cả tối, ai bảo không khoá. Mà thôi, khu này mất xe suốt.”
                  </p>
                  <button
                    onClick={() => find('dang-bai-an-danh')}
                    disabled={found.has('dang-bai-an-danh')}
                    className={`mt-1.5 rounded-full border px-2 py-0.5 text-[0.58rem] ${
                      found.has('dang-bai-an-danh') ? 'border-white/8 text-mute' : 'border-amber/40 bg-amber/10 text-amber'
                    }`}
                  >
                    {found.has('dang-bai-an-danh') ? '✓ đã ghi' : '📌 tài khoản này đáng ngờ'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className="space-y-2">
            <p className="text-[0.62rem] text-mute">Lịch sử đơn · tài xế Dũng · tối 12/9</p>
            {ORDERS.map((o) => (
              <div key={o.id} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[0.68rem] text-parchment/80">{o.id}</span>
                  <span className="text-[0.62rem] text-mute">{o.time}</span>
                </div>
                <p className="mt-1.5 text-[0.7rem] text-parchment/65">
                  {o.pickup} <span className="text-mute">→</span> {o.drop}
                </p>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <span className="text-[0.6rem] text-mute">
                    {o.fee} · {o.status}
                  </span>
                  {o.clue && (
                    <button
                      onClick={() => find(o.clue!)}
                      disabled={found.has(o.clue)}
                      className={`rounded-full border px-2 py-0.5 text-[0.58rem] ${
                        found.has(o.clue) ? 'border-white/8 text-mute' : 'border-amber/40 bg-amber/10 text-amber'
                      }`}
                    >
                      {found.has(o.clue) ? '✓ đã ghi' : '📌 ghi vào sổ'}
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
  const list = Array.from(found)
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
        <p className="text-sm font-semibold text-parchment/90">Sổ vụ án</p>
        <span className="rounded-full bg-white/8 px-2 py-0.5 text-[0.62rem] text-mute">
          {list.length}/{Object.keys(CLUES).length}
        </span>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {list.length === 0 && (
          <p className="px-2 py-8 text-center text-[0.7rem] leading-relaxed text-mute">
            Chưa có manh mối nào. Đọc tin nhắn, lướt web, soi ảnh rồi bấm “ghi vào sổ”.
          </p>
        )}
        {list.map((id) => {
          const c = CLUES[id]
          if (!c) return null
          return (
            <div key={id} className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
              <p className="text-[0.72rem] font-medium text-parchment/85">
                <span className="mr-1.5">{TAGS[c.tag] ?? '📌'}</span>
                {c.title}
              </p>
              <p className="mt-1 text-[0.66rem] leading-relaxed text-mute">{c.detail}</p>
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
  status,
}: {
  found: Set<string>
  accuse: (id: string) => void
  triesLeft: number
  status: string
}) {
  const [pick, setPick] = useState<string | null>(null)
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/8 px-4 py-2.5">
        <p className="text-sm font-semibold text-parchment/90">Hồ sơ vụ án</p>
        <p className="text-[0.6rem] text-mute">Chọn người bạn cho là thủ phạm. Sai 3 lần là hồ sơ đóng.</p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {SUSPECTS.map((s) => {
          const active = pick === s.id
          return (
            <button
              key={s.id}
              onClick={() => setPick(s.id)}
              disabled={status !== 'playing'}
              className={`flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                active ? 'border-blood/50 bg-blood/10' : 'border-white/8 bg-white/[0.03] hover:bg-white/[0.06]'
              }`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/8 text-lg">{s.avatar}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.78rem] font-medium text-parchment/90">{s.name}</span>
                <span className="block text-[0.62rem] text-mute">{s.role}</span>
                <span className="mt-1 block text-[0.65rem] leading-relaxed text-parchment/55">{s.note}</span>
              </span>
              {active && <span className="text-blood-soft">●</span>}
            </button>
          )
        })}
      </div>

      <div className="border-t border-white/8 p-3">
        <div className="mb-2 flex items-center justify-between text-[0.62rem]">
          <span className="text-mute">
            Manh mối: {found.size}/{Object.keys(CLUES).length}
          </span>
          <span className={triesLeft > 0 ? 'text-amber' : 'text-blood-soft'}>còn {triesLeft}/3 lượt</span>
        </div>
        <button
          className="btn btn-primary btn-md w-full"
          disabled={!pick || status !== 'playing' || triesLeft <= 0}
          onClick={() => pick && accuse(pick)}
        >
          Gửi cáo buộc
        </button>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- shell */
export default function Detective() {
  useTitle('Thám Tử Bàn Phím · TBOY Studio')
  const { clues, found, attempts, triesLeft, status, find, accuse, reset } = useCase()
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
  }

  if (!booted) {
    return (
      <Stage>
        <div className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-12">
          <p className="eyebrow mb-4">macQuê · {CASE.no}</p>
          <h1 className="display text-[clamp(2.4rem,7vw,4.2rem)] leading-[0.98] text-glow">
            <span className="grad-moon">Chiếc xe</span> <span className="italic text-parchment">đạp điện</span>
          </h1>
          <p className="mt-4 max-w-lg text-[0.9rem] leading-relaxed text-parchment/60">{CASE.brief}</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.7rem] text-mute">
            <span>📍 {CASE.place}</span>
            <span>🕘 {CASE.time}</span>
            <span>🎯 tìm ra thủ phạm</span>
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
            Đây là máy của anh Tùng — công an khu vực. Anh ấy nhờ bạn xem giúp. Đọc tin nhắn, lướt web, soi ảnh và
            ghi lại manh mối. Khi biết ai lấy xe, gửi tên trong Hồ sơ. Sai ba lần là anh tự làm.
          </p>
        </div>
      </Stage>
    )
  }

  return (
    <Stage>
      <div className="relative min-h-dvh overflow-hidden" style={{ background: 'radial-gradient(120% 110% at 18% 0%, #2b2050 0%, #140f28 52%, #0a0814 100%)' }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{ backgroundImage: 'linear-gradient(#ffffff22 1px, transparent 1px), linear-gradient(90deg,#ffffff22 1px, transparent 1px)', backgroundSize: '38px 38px' }}
        />

        {/* menu bar */}
        <div className="relative z-40 flex h-9 items-center gap-4 border-b border-white/10 bg-black/35 px-3 text-[0.68rem] text-parchment/75 backdrop-blur">
          <span className="font-semibold">🍎 macQuê</span>
          <span className="hidden sm:inline text-mute">Tệp</span>
          <span className="hidden sm:inline text-mute">Sửa</span>
          <span className="hidden sm:inline text-mute">Xem</span>
          <span className="flex-1 truncate text-center text-[0.65rem] text-parchment/55">
            {CASE.title} · Hẻm 42
          </span>
          <span className="text-[0.62rem] text-mute">T6 12 thg 9 · 23:52</span>
        </div>

        {/* desktop hint */}
        <div className="relative z-10 px-5 py-4 lg:px-8">
          <p className="text-[0.6rem] tracking-[0.24em] text-mute uppercase">Vụ án · {CASE.no}</p>
          <h2 className="display mt-1 text-lg text-parchment/80">
            Ai đã lấy chiếc xe đạp điện?
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
              className="absolute z-20 overflow-hidden rounded-xl border border-white/12 bg-[#120f1f]/95 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-md"
              style={{ left: x, top: y, width: w, height: Math.min(app.h, window.innerHeight - y - 90), zIndex: 20 + z[app.id] }}
              onPointerDown={() => raise(app.id)}
            >
              <div
                className="flex h-8 cursor-grab items-center gap-2 border-b border-white/8 bg-white/[0.04] px-2.5 active:cursor-grabbing"
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
                <span className="flex gap-1.5">
                  <button
                    onClick={() => toggle(app.id)}
                    className="h-2.5 w-2.5 rounded-full bg-[#ff6a5c]/80"
                    aria-label="Đóng"
                  />
                  <i className="h-2.5 w-2.5 rounded-full bg-amber/60" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#7be0c0]/50" />
                </span>
                <span className="flex-1 truncate text-center text-[0.6rem] text-mute">
                  {app.icon} {app.label}
                </span>
                <span className="w-8" />
              </div>
              <div className="h-[calc(100%-2rem)]">
                {app.id === 'zola' && <ZolaApp found={found} find={find} />}
                {app.id === 'browser' && <BrowserApp found={found} find={find} />}
                {app.id === 'notes' && <NotesApp found={found} />}
                {app.id === 'file' && <FileApp found={found} accuse={onAccuse} triesLeft={triesLeft} status={status} />}
              </div>
            </div>
          )
        })}

        {/* dock */}
        <div className="fixed bottom-3 left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-end gap-1 rounded-2xl border border-white/12 bg-black/40 px-2 py-1.5 backdrop-blur-lg">
            {APPS.map((a) => (
              <button
                key={a.id}
                onClick={() => toggle(a.id)}
                className="group flex w-14 flex-col items-center gap-0.5 rounded-xl px-1 py-1 transition hover:bg-white/8"
                title={a.label}
              >
                <span className="text-xl leading-none">{a.icon}</span>
                <span className="text-[0.5rem] text-mute group-hover:text-parchment/80">{a.label}</span>
                {open[a.id] && <i className="h-0.5 w-4 rounded-full bg-parchment/60" />}
              </button>
            ))}
            <span className="mx-1 h-8 w-px bg-white/10" />
            <Link to="/" className="flex w-12 flex-col items-center gap-0.5 rounded-xl px-1 py-1 hover:bg-white/8" title="Trang chủ">
              <span className="text-xl leading-none">🏠</span>
              <span className="text-[0.5rem] text-mute">Thoát</span>
            </Link>
          </div>
        </div>

        {/* toast */}
        {toast && (
          <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-white/12 bg-black/70 px-4 py-2 text-[0.7rem] text-parchment/85 backdrop-blur">
            {toast}
          </div>
        )}

        {/* result */}
        {result && (
          <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 px-6 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-white/12 bg-[#141024] p-7 text-center">
              <div className="text-4xl">{result === 'win' ? '🕵️' : '📁'}</div>
              <h2 className="display mt-3 text-3xl">
                {result === 'win' ? <span className="grad-moon">Đúng là Dũng.</span> : <span className="text-blood-soft">Hồ sơ đóng lại.</span>}
              </h2>
              <p className="mt-3 text-[0.78rem] leading-relaxed text-parchment/65">
                {result === 'win'
                  ? 'Dũng nhận đơn giao hàng vào đúng 21:47 ở Hẻm 42, khai gian là về từ 21:15. Bức ảnh 21:58 có bóng chiếc xe xanh mint, còn tin nhắn nháp “mai em trả” nằm trong thùng rác. Anh Tùng đã có đủ để lập biên bản.'
                  : 'Ba lần cáo buộc sai. Anh Tùng tự xử lý, còn bạn thì bị ghi vào “thành tích” của phường. Manh mối vẫn còn đó — thử lại từ đầu?'}
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
