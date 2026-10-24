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
    <div className="relative mx-auto h-[350px] w-[270px] sm:h-[430px] sm:w-[310px]">
      {picks.map((id, i) => {
        const def = ROLES[id]
        const rot = [-10, 5, 0][i]
        const x = [-32, 28, 0][i]
        const y = [14, -6, 0][i]
        const isWolf = def.team === 'wolf'
        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={{ opacity: 1, y, rotate: rot, x }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 overflow-hidden rounded-[26px] border border-slate-700/60"
            style={{
              zIndex: i + 1,
              background: isWolf
                ? 'radial-gradient(120% 90% at 50% 0%, rgba(239,68,68,0.3) 0%, rgba(15,23,42,0.98) 60%, #060913 100%)'
                : 'radial-gradient(120% 90% at 50% 0%, rgba(56,189,248,0.22) 0%, rgba(15,23,42,0.98) 60%, #060913 100%)',
              boxShadow: isWolf
                ? '0 25px 60px -20px rgba(239,68,68,0.35), inset 0 1px 0 rgba(255,255,255,0.18)'
                : '0 25px 60px -20px rgba(56,189,248,0.3), inset 0 1px 0 rgba(255,255,255,0.18)',
            }}
          >
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div 
                className="mb-4 text-6xl transition-transform duration-300 hover:scale-105" 
                style={{ filter: isWolf ? 'drop-shadow(0 0 24px rgba(239,68,68,0.6))' : 'drop-shadow(0 0 24px rgba(56,189,248,0.5))' }}
              >
                {def.icon}
              </div>
              <p className="eyebrow mb-1.5 font-bold text-[0.66rem] tracking-[0.25em]" style={{ color: isWolf ? '#f87171' : '#38bdf8' }}>
                {isWolf ? 'PHE MA SÓI' : 'PHE DÂN LÀNG'}
              </p>
              <h3 className="display text-3xl font-bold tracking-tight text-white font-serif" style={{ color: isWolf ? '#ef4444' : '#f8fafc' }}>
                {def.name}
              </h3>
              <p className="mt-2.5 text-[0.76rem] leading-relaxed text-slate-300 font-medium">{def.tagline}</p>
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
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <button 
                className="btn btn-blood btn-lg px-8 text-[0.96rem]"
                onClick={create} 
                disabled={creating}
              >
                {creating ? 'Đang mở phòng…' : 'Mở phòng Ma Sói'}
                <span aria-hidden className="text-sm">🐺</span>
              </button>
              <Link to="/join" className="btn btn-ghost btn-lg px-7 text-[0.96rem]">
                Vào phòng
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.74rem] font-medium text-slate-400"
            >
              <span className="flex items-center gap-1.5">
                <i className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" /> 4–16 người
              </span>
              <span className="flex items-center gap-1.5">
                <i className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" /> 20–40 phút
              </span>
              <span className="flex items-center gap-1.5">
                <i className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" /> Miễn phí
              </span>
            </motion.div>

            {error && <p className="mt-4 text-sm text-red-400 font-semibold">{error}</p>}
          </div>

          <div className="hidden lg:block">
            <HeroStack />
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: '📺', title: 'Màn hình trung tâm', text: 'Mở bàn trên TV hoặc Laptop — làm bảng thông báo điều phối câu chuyện của cả làng.' },
            { icon: '📱', title: 'Điện thoại nhận vai', text: 'Quét mã QR hoặc nhập 4 ký tự để kết nối ngay. Điện thoại giữ tuyệt mật vai trò của bạn.' },
            { icon: '🌙', title: 'Đêm tối & Bầu cử', text: 'Sói thức dậy cắn người trong bóng tối. Ban ngày cả làng thảo luận và treo cổ kẻ tình nghi.' },
          ].map((s) => (
            <div 
              key={s.title} 
              className="midnight-card p-6"
            >
              <div className="mb-3 text-2xl">{s.icon}</div>
              <h3 className="text-sm font-bold text-white tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-slate-300 font-normal">{s.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between border-b border-slate-800/80 pb-4">
            <div>
              <span className="eyebrow text-cyan-400 font-bold">Danh sách vai diễn</span>
              <h2 className="display text-2xl font-serif text-white tracking-tight mt-1">{ROLE_ORDER.length} vai trò trong ngôi làng</h2>
            </div>
            <Link to="/guides" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Luật chơi chi tiết →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
            {ROLE_ORDER.map((id) => {
              const def = ROLES[id]
              return (
                <div
                  key={id}
                  className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/80"
                >
                  <div className="text-2xl transition-transform duration-300 group-hover:scale-105">{def.icon}</div>
                  <div className="mt-3 text-[0.84rem] font-bold tracking-tight" style={{ color: def.accent }}>
                    {def.name}
                  </div>
                  <div className="mt-1 text-[0.72rem] leading-snug text-slate-400">{def.tagline}</div>
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
