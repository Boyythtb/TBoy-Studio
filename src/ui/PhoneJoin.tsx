import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stage } from './Stage'
import { Avatar } from './Avatar'
import { AVATARS } from '../lib/avatars'
import { joinRoom, leaveRoom, readPref, NAME_KEY, AVATAR_KEY } from '../lib/room'
import { buzz } from '../lib/buzz'
import type { Player } from '../game/types'

export function PhoneShell({ code, children }: { code: string; children: React.ReactNode }) {
  const navigate = useNavigate()
  const handleExit = async () => {
    try {
      await leaveRoom(code)
    } catch {}
    navigate('/')
  }

  return (
    <Stage>
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pt-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <button
            onClick={handleExit}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Thoát phòng</span>
          </button>
          <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
            {code}
          </span>
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
      <p className="eyebrow mb-3">Phòng {code}</p>
      <h1 className="display text-3xl text-parchment">Bạn tên gì?</h1>
      <p className="mt-2 text-sm text-mute">Tên hiện trên màn hình chung.</p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value.slice(0, 14))}
        placeholder="Tên của bạn"
        maxLength={14}
        className="field mt-6"
        autoFocus
      />

      <p className="mt-5 text-[0.62rem] tracking-[0.2em] text-mute uppercase">Chọn hình</p>
      <div className="mt-2 grid grid-cols-8 gap-1.5">
        {AVATARS.map((a, i) => (
          <button
            type="button"
            key={i}
            onClick={() => {
              setAvatar(i)
              buzz(8)
            }}
            className={`grid aspect-square place-items-center rounded-xl border text-lg transition ${
              avatar === i ? 'border-white/40 bg-white/10' : 'border-white/8 bg-white/[0.03]'
            }`}
            style={avatar === i ? { borderColor: `${accent}99`, background: `${accent}1f` } : undefined}
          >
            {a.emoji}
          </button>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-blood-soft">{error}</p>}
      <button type="submit" className="btn btn-primary btn-lg mt-6 w-full" disabled={busy || !name.trim()}>
        {busy ? 'Đang vào…' : 'Vào phòng'}
      </button>
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
  players: Player[]
  me: Player
  icon: string
  text: string
  accent?: string
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center pb-10 text-center">
      <Avatar index={me.avatar} size={64} name={me.name} />
      <h1 className="display mt-5 text-2xl text-parchment">{me.name}</h1>
      <p className="mt-1 text-[0.72rem] text-mute">đã vào phòng</p>
      <p className="mt-8 max-w-[26ch] text-sm leading-relaxed text-parchment/55">{text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-1.5">
        {players.slice(0, 8).map((p) => (
          <Avatar key={p.uid} index={p.avatar} size={28} name={p.name} />
        ))}
      </div>
      <div className="mt-7 text-4xl" style={{ filter: `drop-shadow(0 0 20px ${accent}55)` }}>
        {icon}
      </div>
      <p className="mt-3 text-[0.6rem] tracking-[0.3em] text-mute uppercase">{code}</p>

      <button
        type="button"
        onClick={async () => {
          try {
            await leaveRoom(code)
          } catch {}
          window.location.href = '/'
        }}
        className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-parchment/80 hover:bg-white/10 hover:text-white transition-colors"
      >
        <span>←</span>
        <span>Rời phòng chờ</span>
      </button>
    </div>
  )
}
