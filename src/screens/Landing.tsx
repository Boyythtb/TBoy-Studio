import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { SfxToggle } from '../ui/SfxToggle'
import { createRoom } from '../lib/room'
import { sfx } from '../lib/sfx'
import { useTitle } from '../lib/useTitle'
import { ROLES, ROLE_ORDER } from '../game/roles'

function HeroStack() {
  const picks = ['wolf', 'seer', 'villager'] as const
  return (
    <div className="relative mx-auto h-[340px] w-[260px] sm:h-[420px] sm:w-[300px]">
      {picks.map((id, i) => {
        const def = ROLES[id]
        const rot = [-11, 6, 0][i]
        const x = [-34, 30, 0][i]
        const y = [16, -8, 0][i]
        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={{ opacity: 1, y, rotate: rot, x }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 overflow-hidden rounded-[26px] border border-white/12"
            style={{
              zIndex: i + 1,
              background: `radial-gradient(120% 80% at 50% 0%, ${def.glow} 0%, rgba(10,9,20,0.95) 60%, #07070f 100%)`,
              boxShadow: `0 30px 80px -40px ${def.accent}aa, inset 0 1px 0 rgba(255,255,255,0.14)`,
            }}
          >
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 text-6xl" style={{ filter: `drop-shadow(0 0 24px ${def.glow})` }}>
                {def.icon}
              </div>
              <p className="eyebrow mb-1">{def.team === 'wolf' ? 'Phe Sói' : 'Phe Dân'}</p>
              <h3 className="display text-3xl" style={{ color: def.accent }}>
                {def.name}
              </h3>
              <p className="mt-2 text-[0.72rem] leading-relaxed text-parchment/60">{def.tagline}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Landing() {
  useTitle('Ma Sói · Đêm trong làng')
  const navigate = useNavigate()
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = async () => {
    setCreating(true)
    setError(null)
    try {
      sfx.reveal()
      const code = await createRoom()
      navigate(`/host/${code}`)
    } catch (e) {
      setError((e as Error).message)
      setCreating(false)
    }
  }

  return (
    <Stage>
      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-5 pb-16 sm:px-8">
        <header className="flex items-center justify-between py-5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/8 text-lg hairline">🐺</span>
            <span className="text-[0.82rem] font-bold tracking-[0.28em] text-parchment/80 uppercase">Ma Sói</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/guides" className="btn btn-ghost btn-sm hidden sm:inline-flex">
              Cách chơi
            </Link>
            <SfxToggle />
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow mb-5"
            >
              Trò chơi suy luận cho cả phòng
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="display text-[clamp(2.9rem,8.5vw,5.6rem)] text-glow"
            >
              <span className="grad-moon">Đêm trong</span>
              <br />
              <span className="italic text-parchment">làng</span>
              <span className="text-blood">.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-parchment/65"
            >
              Một màn hình chung đặt giữa bàn, mỗi người một chiếc điện thoại. Sói thức dậy trong bóng tối,
              làng cố tìm ra chúng trước khi quá muộn. Không cần cài app, không cần tài khoản.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button className="btn btn-primary btn-lg" onClick={create} disabled={creating}>
                {creating ? 'Đang mở phòng…' : 'Tạo phòng'}
                <span aria-hidden>→</span>
              </button>
              <Link to="/join" className="btn btn-ghost btn-lg">
                Vào phòng
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.72rem] text-mute"
            >
              <span className="flex items-center gap-1.5">
                <i className="h-1.5 w-1.5 rounded-full bg-violet" /> 4–16 người
              </span>
              <span className="flex items-center gap-1.5">
                <i className="h-1.5 w-1.5 rounded-full bg-amber" /> 20–40 phút
              </span>
              <span className="flex items-center gap-1.5">
                <i className="h-1.5 w-1.5 rounded-full bg-blood" /> Miễn phí
              </span>
            </motion.div>

            {error && <p className="mt-4 text-sm text-blood-soft">{error}</p>}
          </div>

          <div className="hidden lg:block">
            <HeroStack />
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { icon: '📺', title: 'Mở trên TV', text: 'Tạo phòng trên laptop, TV hay tablet — màn hình chung của cả bàn.' },
            { icon: '📱', title: 'Quét mã vào phòng', text: 'Mỗi người quét QR hoặc nhập mã 4 ký tự. Không cài đặt gì cả.' },
            { icon: '🌙', title: 'Chơi và nghi ngờ', text: 'Điện thoại giữ bí mật vai của bạn. Màn hình chung kể lại câu chuyện.' },
          ].map((s) => (
            <div key={s.title} className="glass rounded-2xl p-5">
              <div className="mb-3 text-2xl">{s.icon}</div>
              <h3 className="text-sm font-semibold text-parchment">{s.title}</h3>
              <p className="mt-1.5 text-[0.78rem] leading-relaxed text-mute">{s.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="display text-2xl text-parchment/90">{ROLE_ORDER.length} vai, một ngôi làng</h2>
            <Link to="/guides" className="text-xs text-mute hover:text-parchment">
              Xem luật →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {ROLE_ORDER.map((id) => {
              const def = ROLES[id]
              return (
                <div
                  key={id}
                  className="group rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
                >
                  <div className="text-2xl">{def.icon}</div>
                  <div className="mt-3 text-[0.8rem] font-semibold" style={{ color: def.accent }}>
                    {def.name}
                  </div>
                  <div className="mt-1 text-[0.68rem] leading-snug text-mute">{def.tagline}</div>
                </div>
              )
            })}
          </div>
        </section>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-6 text-[0.7rem] text-mute">
          <span className="tracking-[0.28em] uppercase">TBOY STUDIO</span>
          <span>Ma Sói · 4–16 người</span>
        </footer>
      </div>
    </Stage>
  )
}
