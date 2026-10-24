import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Stage } from './Stage'
import { Avatar } from './Avatar'
import { AVATARS } from '../lib/avatars'
import { joinRoom, leaveRoom, readPref, NAME_KEY, AVATAR_KEY } from '../lib/room'
import { buzz } from '../lib/buzz'
import type { Player } from '../game/types'

export function PhoneShell({ code, children, accent }: { code: string; children: React.ReactNode; accent?: string }) {
  const navigate = useNavigate()
  const handleExit = async () => {
    try {
      await leaveRoom(code)
    } catch {}
    navigate('/')
  }

  return (
    <Stage>
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pt-3 pb-safe">
        {/* Header thanh điều hướng phone */}
        <div
          className="flex items-center justify-between pb-2.5 mb-1 border-b"
          style={{ borderColor: accent ? `${accent}25` : 'rgba(255,255,255,0.05)' }}
        >
          <button
            onClick={handleExit}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/20 px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-all active:scale-95"
          >
            <span>←</span>
            <span className="font-semibold">Thoát phòng</span>
          </button>
          <div
            className="flex items-center gap-1.5 rounded-xl px-2.5 py-1 border"
            style={{
              background: accent ? `${accent}12` : 'rgba(255,255,255,0.04)',
              borderColor: accent ? `${accent}35` : 'rgba(255,255,255,0.08)',
            }}
          >
            <span className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-wider">PHÒNG</span>
            <span
              className="font-mono text-sm font-black tracking-widest"
              style={{ color: accent || '#94a3b8' }}
            >
              {code}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </Stage>
  )
}

export function JoinForm({
  code,
  onJoined,
  accent = '#7be0c0',
}: {
  code: string
  onJoined: () => void
  accent?: string
}) {
  const [name, setName] = useState(() => readPref(NAME_KEY) ?? '')
  const [avatar, setAvatar] = useState(() => {
    const saved = Number(readPref(AVATAR_KEY))
    return Number.isFinite(saved) && saved >= 0 ? saved % AVATARS.length : Math.floor(Math.random() * AVATARS.length)
  })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || busy) return
    setBusy(true)
    setError('')
    try {
      await joinRoom(code, name.trim(), avatar)
      buzz(20)
      onJoined()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không vào được phòng.')
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-1 flex-col justify-center pb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider"
          style={{
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
            color: accent,
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: accent }} />
          Phòng {code}
        </div>

        <h1 className="display text-3xl text-parchment">Bạn tên gì?</h1>
        <p className="mt-2 text-sm text-mute">Tên của bạn sẽ hiện trên màn hình chung.</p>

        <div className="relative mt-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 14))}
            placeholder="Tên của bạn…"
            maxLength={14}
            className="field pr-14"
            autoFocus
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.68rem] text-slate-500 font-mono">
            {name.length}/14
          </span>
        </div>

        <p className="mt-5 text-[0.62rem] tracking-[0.2em] text-mute uppercase">Chọn hình đại diện</p>
        <div className="mt-2 grid grid-cols-8 gap-1.5">
          {AVATARS.map((a, i) => (
            <motion.button
              type="button"
              key={i}
              whileTap={{ scale: 0.88 }}
              onClick={() => {
                setAvatar(i)
                buzz(8)
              }}
              className="grid aspect-square place-items-center rounded-xl border text-base transition-all duration-150"
              style={
                avatar === i
                  ? { borderColor: `${accent}90`, background: `${accent}20`, boxShadow: `0 0 10px ${accent}40` }
                  : { borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }
              }
            >
              {a.emoji}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-sm text-blood-soft flex items-center gap-1.5"
            >
              <span>⚠️</span> {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={busy || !name.trim()}
          whileTap={{ scale: 0.97 }}
          className="mt-6 w-full rounded-2xl py-3.5 text-sm font-black tracking-wide transition-all shadow-lg"
          style={{
            background: busy || !name.trim()
              ? 'rgba(255,255,255,0.06)'
              : `linear-gradient(135deg, ${accent} 0%, rgba(15,23,42,0.8) 200%)`,
            color: busy || !name.trim() ? '#64748b' : '#0f172a',
            boxShadow: busy || !name.trim() ? 'none' : `0 6px 20px -4px ${accent}60`,
          }}
        >
          {busy ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Đang vào phòng…
            </span>
          ) : !name.trim() ? (
            'Nhập tên để tiếp tục →'
          ) : (
            'Vào phòng ngay! →'
          )}
        </motion.button>
      </motion.div>
    </form>
  )
}

export function LobbyWait({
  code,
  players,
  me,
  icon,
  text,
  accent = '#7be0c0',
}: {
  code: string
  players: (Player | undefined)[]
  me: Player
  icon: string
  text: string
  accent?: string
}) {
  const validPlayers = players.filter(Boolean) as Player[]

  return (
    <div className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
      {/* Avatar người dùng với vòng glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className="relative"
      >
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-40"
          style={{ background: accent, transform: 'scale(1.6)' }}
        />
        <Avatar index={me.avatar} size={72} name={me.name} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="display mt-4 text-2xl text-parchment"
      >
        {me.name}
      </motion.h1>
      <p className="mt-1 text-[0.72rem] text-mute">đã vào phòng thành công ✓</p>

      {/* Thông báo chờ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 max-w-[28ch] rounded-2xl border px-4 py-3 text-sm leading-relaxed"
        style={{
          background: `${accent}0d`,
          borderColor: `${accent}30`,
          color: '#cbd5e1',
        }}
      >
        <span className="text-2xl block mb-1.5" style={{ filter: `drop-shadow(0 0 12px ${accent}60)` }}>
          {icon}
        </span>
        {text}
      </motion.div>

      {/* Danh sách người chơi đang trong phòng */}
      {validPlayers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 w-full"
        >
          <p className="text-[0.6rem] tracking-[0.25em] text-mute uppercase mb-2">
            {validPlayers.length} người trong phòng
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {validPlayers.slice(0, 10).map((p) => (
              <div key={p.uid} className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/8 px-2 py-1">
                <Avatar index={p.avatar} size={22} name={p.name} />
                <span className="text-[0.7rem] font-semibold text-slate-300 truncate max-w-[80px]">{p.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Mã phòng */}
      <motion.div
        className="mt-5 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div
          className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 border"
          style={{ background: `${accent}10`, borderColor: `${accent}30` }}
        >
          <span className="text-[0.6rem] text-slate-400 uppercase tracking-wider font-bold">PHÒNG</span>
          <span
            className="font-mono font-black tracking-widest text-base"
            style={{ color: accent }}
          >
            {code}
          </span>
        </div>
      </motion.div>

      {/* Spinner chờ */}
      <motion.div
        className="mt-4 flex items-center gap-2 text-[0.72rem] text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Đang chờ chủ phòng bắt đầu…
      </motion.div>

      <button
        type="button"
        onClick={async () => {
          try {
            await leaveRoom(code)
          } catch {}
          window.location.href = '/'
        }}
        className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 hover:border-white/15 px-4 py-2 text-xs font-semibold text-parchment/70 hover:text-parchment transition-all"
      >
        <span>←</span>
        <span>Rời phòng chờ</span>
      </button>
    </div>
  )
}
