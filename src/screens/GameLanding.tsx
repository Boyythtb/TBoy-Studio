import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { SfxToggle } from '../ui/SfxToggle'
import { createRoom } from '../lib/room'
import type { GameId } from '../game/types'
import { useTitle } from '../lib/useTitle'

export interface GameLandingProps {
  game: GameId
  icon: string
  name: string
  accent: string
  tagline: string
  desc: string
  players: string
  time: string
  steps: { icon: string; title: string; text: string }[]
  rules: string[]
}

export function GameLanding({ game, icon, name, accent, tagline, desc, players, time, steps, rules }: GameLandingProps) {
  useTitle(`${name} · TBOY Studio`)
  const navigate = useNavigate()
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  const create = async () => {
    setCreating(true)
    setError('')
    try {
      const code = await createRoom(game)
      navigate(`/${game}/host/${code}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không mở được phòng.')
      setCreating(false)
    }
  }

  return (
    <Stage>
      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-5 pb-16 sm:px-8">
        <header className="flex items-center justify-between py-6 border-b border-slate-800/80">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-800/80 text-xl border border-slate-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
              {icon}
            </span>
            <div className="flex flex-col">
              <span className="text-[0.88rem] font-bold tracking-[0.25em] text-slate-100 uppercase">{name}</span>
              <span className="text-[0.62rem] tracking-wider text-slate-400 uppercase font-medium">TBOY Studio</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="btn btn-ghost btn-sm text-xs font-semibold">
              ← Trang chủ
            </Link>
            <SfxToggle />
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-4 font-bold" style={{ color: accent }}>
              {tagline}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="display text-[clamp(2.9rem,8vw,5.2rem)] font-serif font-bold tracking-tight text-white"
            >
              <span style={{ color: accent }}>{name}</span>
              <span className="text-slate-500">.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-slate-300 font-normal"
            >
              {desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <button 
                className="btn btn-primary btn-lg px-8 text-[0.95rem] font-bold shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${accent}, #0284c7)`,
                  boxShadow: `0 8px 24px -6px ${accent}66`,
                }}
                onClick={create} 
                disabled={creating}
              >
                {creating ? 'Đang mở phòng…' : `Tạo phòng ${name}`}
                <span aria-hidden className="text-sm">→</span>
              </button>
              <Link to="/join" className="btn btn-ghost btn-lg px-7 text-[0.95rem]">
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
                <i className="h-2 w-2 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} /> {players}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" /> {time}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" /> Miễn phí
              </span>
            </motion.div>

            {error && <p className="mt-4 text-sm text-red-400 font-semibold">{error}</p>}
          </div>

          <div className="midnight-card p-7">
            <p className="eyebrow mb-4 font-bold" style={{ color: accent }}>Quy tắc trò chơi</p>
            <ul className="space-y-3.5">
              {rules.map((r) => (
                <li key={r} className="flex gap-3 text-[0.84rem] leading-relaxed text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="midnight-card p-6">
              <div className="mb-3 text-3xl">{s.icon}</div>
              <h3 className="text-sm font-bold text-white tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-slate-300 font-normal">{s.text}</p>
            </div>
          ))}
        </section>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-[0.72rem] text-slate-400">
          <span className="tracking-[0.25em] font-bold text-slate-300 uppercase">TBOY STUDIO</span>
          <span>Không cần cài app · Chơi trên mọi thiết bị</span>
        </footer>
      </div>
    </Stage>
  )
}
