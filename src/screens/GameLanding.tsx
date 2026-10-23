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
        <header className="flex items-center justify-between py-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/8 text-lg hairline">{icon}</span>
            <span className="text-[0.82rem] font-bold tracking-[0.28em] text-parchment/80 uppercase">{name}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn btn-ghost btn-sm hidden sm:inline-flex">
              ← Trang chủ
            </Link>
            <SfxToggle />
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-5">
              {tagline}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="display text-[clamp(2.8rem,8vw,5.2rem)] text-glow"
            >
              <span style={{ color: accent }}>{name}</span>
              <span className="text-parchment">.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-parchment/65"
            >
              {desc}
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
                <i className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} /> {players}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="h-1.5 w-1.5 rounded-full bg-amber" /> {time}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="h-1.5 w-1.5 rounded-full bg-blood" /> Miễn phí
              </span>
            </motion.div>

            {error && <p className="mt-4 text-sm text-blood-soft">{error}</p>}
          </div>

          <div className="glass rounded-3xl p-6">
            <p className="eyebrow mb-4">Luật chơi</p>
            <ul className="space-y-3">
              {rules.map((r) => (
                <li key={r} className="flex gap-2.5 text-[0.82rem] leading-relaxed text-parchment/65">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-4 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="glass rounded-2xl p-5">
              <div className="mb-3 text-2xl">{s.icon}</div>
              <h3 className="text-sm font-semibold text-parchment">{s.title}</h3>
              <p className="mt-1.5 text-[0.78rem] leading-relaxed text-mute">{s.text}</p>
            </div>
          ))}
        </section>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-6 text-[0.7rem] text-mute">
          <span className="tracking-[0.28em] uppercase">TBOY STUDIO</span>
          <span>Không cần cài app · Miễn phí</span>
        </footer>
      </div>
    </Stage>
  )
}
