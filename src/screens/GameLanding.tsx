import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
        {/* Header */}
        <header className="flex items-center justify-between py-6 border-b border-slate-800/80">
          <Link to="/" className="group flex items-center gap-3">
            <div
              className="grid h-11 w-11 place-items-center rounded-2xl text-2xl border border-slate-700/60 transition-all group-hover:scale-105"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${accent}20, rgba(15, 23, 42, 0.9))`,
                boxShadow: `0 8px 20px -4px ${accent}30`,
              }}
            >
              {icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[0.88rem] font-bold tracking-[0.25em] text-slate-100 uppercase">{name}</span>
              <span className="text-[0.62rem] tracking-wider text-slate-400 uppercase font-medium">TBOY Studio · Boardgame</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="btn btn-ghost btn-sm text-xs font-semibold hidden sm:inline-flex">
              ← Tất cả game
            </Link>
            <SfxToggle />
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="max-w-2xl">
            {/* Badge tag */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full text-[0.68rem] font-bold tracking-wider"
              style={{
                background: `${accent}15`,
                border: `1px solid ${accent}40`,
                color: accent,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: accent }} />
              {tagline}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="display text-[clamp(2.6rem,7.5vw,4.8rem)] font-serif font-bold tracking-tight"
            >
              <span style={{ color: accent }}>{name}</span>
              <span className="text-slate-600">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-slate-300 font-normal"
            >
              {desc}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-[0.95rem] font-black text-slate-950 shadow-xl transition-all"
                style={{
                  background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
                  boxShadow: `0 8px 24px -6px ${accent}70`,
                }}
                onClick={create}
                disabled={creating}
              >
                {creating ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Đang mở phòng…
                  </>
                ) : (
                  <>
                    {icon} Tạo phòng chơi ngay
                    <span>→</span>
                  </>
                )}
              </motion.button>

              <Link
                to="/join"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-[0.95rem] font-bold text-slate-200 transition-all"
              >
                Vào phòng theo mã
              </Link>
            </motion.div>

            {/* Meta badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center gap-3 text-[0.74rem] font-medium text-slate-400"
            >
              {[
                { color: accent, label: players, glow: accent },
                { color: '#fbbf24', label: time, glow: '#f59e0b' },
                { color: '#34d399', label: 'Miễn phí', glow: '#10b981' },
                { color: '#94a3b8', label: 'Không cài app', glow: '#64748b' },
              ].map((badge) => (
                <span key={badge.label} className="flex items-center gap-1.5">
                  <i
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: badge.color, boxShadow: `0 0 8px ${badge.glow}` }}
                  />
                  {badge.label}
                </span>
              ))}
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-sm text-red-400 font-semibold flex items-center gap-1.5"
                >
                  ⚠️ {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Rules Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl p-6 border"
            style={{
              background: `radial-gradient(ellipse at top left, ${accent}0d 0%, rgba(15,23,42,0.95) 60%)`,
              borderColor: `${accent}30`,
              boxShadow: `0 16px 40px -12px ${accent}20`,
            }}
          >
            <p
              className="text-[0.65rem] font-black uppercase tracking-[0.25em] mb-4 flex items-center gap-2"
              style={{ color: accent }}
            >
              <span>📋</span> QUY TẮC NHANH
            </p>
            <ul className="space-y-3">
              {rules.map((r, i) => (
                <motion.li
                  key={r}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                  className="flex gap-3 text-[0.84rem] leading-relaxed text-slate-300"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
                  />
                  {r}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Steps Section - Cách chơi */}
        <section className="mt-4 mb-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-800/80" />
            <span className="text-[0.68rem] font-bold tracking-[0.2em] text-slate-400 uppercase">Cách chơi</span>
            <div className="h-px flex-1 bg-slate-800/80" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 transition-all hover:border-slate-700 hover:bg-slate-800/60"
              >
                {/* Số thứ tự */}
                <div
                  className="absolute top-4 right-4 text-[0.6rem] font-black rounded-full h-5 w-5 flex items-center justify-center"
                  style={{ background: `${accent}20`, color: accent }}
                >
                  {i + 1}
                </div>
                <div className="mb-3 text-3xl">{s.icon}</div>
                <h3 className="text-sm font-bold text-white tracking-tight mb-2">{s.title}</h3>
                <p className="text-[0.82rem] leading-relaxed text-slate-400">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-[0.72rem] text-slate-400">
          <span className="tracking-[0.25em] font-bold text-slate-300 uppercase">TBOY STUDIO</span>
          <span style={{ color: accent }}>Không cần cài app · Chơi ngay trên mọi thiết bị</span>
        </footer>
      </div>
    </Stage>
  )
}
