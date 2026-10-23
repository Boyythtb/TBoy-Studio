import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { RoleCard } from '../ui/RoleCard'
import { Timer } from '../ui/Timer'
import { useRoom, useNow } from '../hooks/useRoom'
import { paths, store } from '../lib/store'
import { AVATARS } from '../lib/avatars'
import { joinRoom, readPref, NAME_KEY, AVATAR_KEY, MAX_PLAYERS } from '../lib/room'
import { roleDef } from '../game/roles'
import { currentStep } from '../game/conductor'
import { WOLF_ROLES } from '../game/engine'
import type { Meta, Player, PlayerAction, RoleId, Secret } from '../game/types'
import { NONE } from '../game/types'
import { sfx } from '../lib/sfx'

const buzz = (ms = 18) => {
  try {
    navigator.vibrate?.(ms)
  } catch {
    /* ignore */
  }
}

function Shell({ children, code }: { children: React.ReactNode; code: string }) {
  return (
    <Stage>
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pt-3">
        <div className="flex flex-1 flex-col">{children}</div>
        <div className="pt-2 pb-1 text-center text-[0.55rem] tracking-[0.3em] text-mute/60 uppercase">
          phòng {code}
        </div>
      </div>
    </Stage>
  )
}

/* ------------------------------------------------------------------- join */

function JoinForm({ code, onJoined }: { code: string; onJoined: () => void }) {
  const savedName = readPref(NAME_KEY) ?? ''
  const savedAvatar = readPref(AVATAR_KEY)
  const [name, setName] = useState(savedName)
  const [avatar, setAvatar] = useState(() => {
    const n = Number(savedAvatar)
    return savedAvatar !== null && Number.isInteger(n)
      ? ((n % AVATARS.length) + AVATARS.length) % AVATARS.length
      : Math.floor(Math.random() * AVATARS.length)
  })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Nhập tên của bạn đã.')
      return
    }
    setBusy(true)
    setError(null)
    try {
      await joinRoom(code, name, avatar)
      sfx.join()
      buzz(30)
      onJoined()
    } catch (err) {
      setError((err as Error).message)
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-1 flex-col">
      <div className="pt-6 text-center">
        <p className="eyebrow mb-3">Phòng {code}</p>
        <h1 className="display text-4xl text-parchment">Bạn là ai?</h1>
        <p className="mt-2 text-sm text-mute">Chọn một cái tên và một linh vật.</p>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="grid grid-cols-4 gap-2.5">
          {AVATARS.map((a, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setAvatar(i)
                sfx.tap()
                buzz(10)
              }}
              aria-label={`Linh vật ${i + 1}`}
              className={`grid h-16 w-16 place-items-center rounded-2xl border text-2xl transition-all ${
                avatar === i
                  ? 'scale-105 border-violet/70 bg-violet/15 shadow-[0_10px_30px_-12px_rgba(125,109,255,0.9)]'
                  : 'border-white/8 bg-white/[0.03] opacity-70'
              }`}
            >
              {a.emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <label htmlFor="name" className="mb-2 block px-1 text-[0.65rem] tracking-[0.2em] text-mute uppercase">
          Tên hiển thị
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 16))}
          placeholder="Ví dụ: Minh"
          className="field text-center text-lg"
          autoComplete="nickname"
          autoFocus
        />
      </div>

      {error && <p className="mt-3 text-center text-xs text-blood-soft">{error}</p>}

      <button type="submit" className="btn btn-primary btn-lg mt-6 w-full" disabled={busy}>
        {busy ? 'Đang vào…' : 'Vào phòng'}
      </button>

      <p className="mt-4 text-center text-[0.68rem] leading-relaxed text-mute">
        Tên chỉ hiện với những người trong phòng.
      </p>
    </form>
  )
}

/* ------------------------------------------------------------------ lobby */

function LobbyWait({ meta, players, me }: { meta: Meta; players: Player[]; me: Player }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-violet/25 blur-2xl" />
        <Avatar index={me.avatar} size={92} name={me.name} />
      </motion.div>
      <h1 className="display mt-6 text-3xl text-parchment">{me.name}</h1>
      <p className="mt-2 text-sm text-parchment/55">Bạn đã vào phòng {meta.code}.</p>

      <div className="mt-8 w-full rounded-2xl border border-white/8 bg-white/[0.025] p-4">
        <p className="text-[0.65rem] tracking-[0.22em] text-mute uppercase">Đang chờ chủ phòng</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {players.map((p) => (
            <div key={p.uid} className="flex items-center gap-1.5 rounded-full bg-white/5 py-1 pr-2.5 pl-1">
              <Avatar index={p.avatar} size={22} />
              <span className="text-[0.7rem] text-parchment/75">{p.name}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[0.62rem] text-mute">
          {players.length}/{MAX_PLAYERS} người · nhìn lên màn hình chung nhé
        </p>
      </div>

      <div className="mt-6 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.25 }}
            className="h-1 w-6 rounded-full bg-violet"
          />
        ))}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- reveal */

function Reveal({ role, onReady, ready }: { role: RoleId; onReady: () => void; ready: boolean }) {
  const [flipped, setFlipped] = useState(false)
  const def = roleDef(role)

  return (
    <div className="flex flex-1 flex-col">
      <div className="pt-5 text-center">
        <p className="eyebrow mb-2">Vai của bạn</p>
        <p className="text-xs text-mute">Chỉ mình bạn được xem.</p>
      </div>

      <div className="mt-5 h-[340px]">
        <RoleCard
          role={role}
          flipped={flipped}
          onFlip={() => {
            if (flipped) return
            setFlipped(true)
            sfx.reveal()
            buzz(40)
          }}
          className="h-full"
        />
      </div>

      <div className="mt-6">
        {flipped ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-3 text-center text-[0.7rem] leading-relaxed text-mute">
              Phe của bạn:{' '}
              <span style={{ color: def.accent }}>
                {def.team === 'wolf' ? 'Sói' : def.team === 'solo' ? 'Phe thứ ba' : 'Dân làng'}
              </span>
            </p>
            <button
              className="btn btn-primary btn-lg w-full"
              onClick={() => {
                onReady()
                buzz(25)
              }}
              disabled={ready}
            >
              {ready ? '✓ Đã sẵn sàng' : 'Tôi đã hiểu'}
            </button>
          </motion.div>
        ) : (
          <p className="text-center text-[0.7rem] text-mute">Chạm vào lá bài để mở.</p>
        )}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- night UI */

interface ActionProps {
  code: string
  uid: string
  meta: Meta
  players: Player[]
  me: Player
  action: PlayerAction | null
  secret: Secret | null
}

function TargetGrid({
  players,
  selected,
  onSelect,
  accent = '#7d6dff',
}: {
  players: Player[]
  selected: string | null
  onSelect: (uid: string) => void
  accent?: string
}) {
  if (!players.length) {
    return <p className="py-8 text-center text-xs text-mute">Không có ai để chọn.</p>
  }
  return (
    <div className="grid grid-cols-3 gap-2">
      {players.map((p) => {
        const active = selected === p.uid
        return (
          <button
            key={p.uid}
            onClick={() => {
              onSelect(p.uid)
              sfx.tap()
              buzz(12)
            }}
            className={`flex flex-col items-center rounded-2xl border px-1.5 py-3 transition-all ${
              active ? 'scale-[1.03]' : 'border-white/8 bg-white/[0.03]'
            }`}
            style={
              active
                ? { borderColor: `${accent}aa`, background: `${accent}1f`, boxShadow: `0 12px 30px -16px ${accent}` }
                : undefined
            }
          >
            <Avatar index={p.avatar} size={46} name={p.name} ring={active} />
            <span className="mt-2 w-full truncate text-[0.68rem] text-parchment/80">{p.name}</span>
          </button>
        )
      })}
    </div>
  )
}

function ActionShell({
  title,
  subtitle,
  icon,
  accent,
  children,
  endsAt,
  total,
}: {
  title: string
  subtitle: string
  icon: string
  accent: string
  children: React.ReactNode
  endsAt: number
  total: number
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <p className="eyebrow mb-2">Lượt của bạn</p>
          <h1 className="display text-3xl" style={{ color: accent }}>
            {icon} {title}
          </h1>
          <p className="mt-1.5 max-w-[22ch] text-[0.75rem] leading-relaxed text-parchment/55">{subtitle}</p>
        </div>
        <Timer endsAt={endsAt} total={total} size={54} tone="moon" />
      </div>
      <div className="mt-5 flex-1">{children}</div>
    </div>
  )
}

function WolfAction({ code, uid, meta, players, action, secret }: ActionProps) {
  const [sel, setSel] = useState<string | null>(null)
  const mates = (secret?.mates ?? []).map((id) => players.find((p) => p.uid === id)).filter(Boolean) as Player[]
  const targets = players.filter((p) => p.alive && !secret?.mates?.includes(p.uid) && p.uid !== uid)
  const sent = action?.wolfVote
  const sent2 = action?.wolfVote2

  if (sent && meta.rage && !sent2) {
    const chosen = players.find((p) => p.uid === sent)
    const extras = targets.filter((p) => p.uid !== sent)
    return (
      <ActionShell
        title="Bầy sói nổi điên"
        subtitle="Sói Con đã chết. Đêm nay bầy cắn hai người thay vì một."
        icon="🐺"
        accent="#ff6a5c"
        endsAt={meta.stepEndsAt}
        total={meta.config.stepSeconds * 1000}
      >
        <div className="flex items-center justify-center gap-4 rounded-3xl border border-blood/30 bg-blood/8 py-5">
          <div className="text-center">
            <Avatar index={chosen?.avatar ?? 0} size={54} name={chosen?.name} />
            <p className="mt-2 text-[0.7rem] text-parchment/85">{chosen?.name}</p>
          </div>
          <span className="text-2xl text-blood-soft">+</span>
          <div className="grid h-[54px] w-[54px] place-items-center rounded-full border border-dashed border-blood/40 text-lg text-blood-soft">
            ?
          </div>
        </div>
        <p className="mt-4 text-center text-[0.7rem] text-mute">Chọn nạn nhân thứ hai</p>
        <TargetGrid players={extras} selected={sel} onSelect={setSel} accent="#e0433a" />
        <div className="mt-5 flex gap-2">
          <button
            className="btn btn-ghost btn-md flex-1"
            onClick={() => void store.update(paths.action(code, uid), { wolfVote2: NONE })}
          >
            Chỉ một người
          </button>
          <button
            className="btn btn-blood btn-md flex-[1.3]"
            disabled={!sel}
            onClick={() => sel && void store.update(paths.action(code, uid), { wolfVote2: sel })}
          >
            Cắn thêm
          </button>
        </div>
      </ActionShell>
    )
  }

  if (sent) {
    const chosen = players.find((p) => p.uid === sent)
    const second = sent2 && sent2 !== NONE ? players.find((p) => p.uid === sent2) : null
    return (
      <ActionShell
        title="Đã chọn"
        subtitle="Cả bầy sẽ cùng chọn. Nếu không thống nhất, đêm nay sẽ không ai bị cắn."
        icon="🐺"
        accent="#ff6a5c"
        endsAt={meta.stepEndsAt}
        total={meta.config.stepSeconds * 1000}
      >
        <div className="mt-4 flex flex-col items-center rounded-3xl border border-blood/30 bg-blood/8 py-8">
          <div className="flex items-center gap-5">
            <Avatar index={chosen?.avatar ?? 0} size={72} name={chosen?.name} />
            {second && <Avatar index={second.avatar} size={72} name={second.name} />}
          </div>
          <p className="mt-4 text-lg font-semibold text-parchment/90">
            {chosen?.name ?? 'Không ai'}
            {second ? ` & ${second.name}` : ''}
          </p>
          <p className="mt-1 text-[0.68rem] text-blood-soft/80">mục tiêu đêm nay</p>
        </div>
        <p className="mt-4 text-center text-[0.68rem] text-mute">Bầy của bạn: {mates.map((m) => m.name).join(', ')}</p>
      </ActionShell>
    )
  }

  return (
    <ActionShell
      title="Chọn nạn nhân"
      subtitle={
        meta.rage
          ? 'Sói Con đã chết — đêm nay bầy cắn hai người. Chọn nạn nhân đầu tiên.'
          : `Bầy của bạn: ${mates.map((m) => m.name).join(', ') || 'một mình bạn'}`
      }
      icon="🐺"
      accent="#ff6a5c"
      endsAt={meta.stepEndsAt}
      total={meta.config.stepSeconds * 1000}
    >
      <TargetGrid players={targets} selected={sel} onSelect={setSel} accent="#e0433a" />
      <div className="mt-5">
        <button
          className="btn btn-blood btn-lg w-full"
          disabled={!sel}
          onClick={async () => {
            if (!sel) return
            buzz(30)
            await store.update(paths.action(code, uid), { wolfVote: sel })
          }}
        >
          Cắn người này
        </button>
      </div>
    </ActionShell>
  )
}

function SeerAction({ code, uid, meta, players, action, secret }: ActionProps) {
  const [sel, setSel] = useState<string | null>(null)
  const targets = players.filter((p) => p.alive && p.uid !== uid)
  const last = secret?.seerCheck
  const sent = action?.seer

  return (
    <ActionShell
      title="Soi một người"
      subtitle="Bạn sẽ biết chắc họ có phải Ma Sói hay không."
      icon="🔮"
      accent="#a99cff"
      endsAt={meta.stepEndsAt}
      total={meta.config.stepSeconds * 1000}
    >
      {sent ? (
        <div className="flex flex-col items-center pt-2">
          <div className="text-5xl">🔮</div>
          {last ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-5 w-full rounded-3xl border p-5 text-center"
              style={{
                borderColor: last.isWolf ? 'rgba(224,67,58,0.45)' : 'rgba(123,224,192,0.4)',
                background: last.isWolf ? 'rgba(224,67,58,0.1)' : 'rgba(123,224,192,0.08)',
              }}
            >
              <p className="text-[0.62rem] tracking-[0.22em] text-mute uppercase">Kết quả soi</p>
              <p className="mt-2 text-lg font-semibold text-parchment/90">
                {players.find((p) => p.uid === last.target)?.name}
              </p>
              <p className="mt-1 text-xl font-bold" style={{ color: last.isWolf ? '#ff8f83' : '#7be0c0' }}>
                {last.isWolf ? 'LÀ MA SÓI' : 'KHÔNG PHẢI SÓI'}
              </p>
            </motion.div>
          ) : (
            <p className="mt-6 text-sm text-mute">Đang soi…</p>
          )}
          <p className="mt-5 text-center text-[0.66rem] leading-relaxed text-mute">
            Giữ kết quả này cho riêng mình. Ngày mai, hãy dùng nó thật khéo.
          </p>
        </div>
      ) : (
        <>
          <TargetGrid players={targets} selected={sel} onSelect={setSel} accent="#a99cff" />
          <div className="mt-5">
            <button
              className="btn btn-primary btn-lg w-full"
              disabled={!sel}
              onClick={async () => {
                if (!sel) return
                buzz(30)
                await store.update(paths.action(code, uid), { seer: sel })
              }}
            >
              Soi người này
            </button>
          </div>
          {last && (
            <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-center text-[0.66rem] text-mute">
              Lần trước: {players.find((p) => p.uid === last.target)?.name} —{' '}
              <span style={{ color: last.isWolf ? '#ff8f83' : '#7be0c0' }}>
                {last.isWolf ? 'Sói' : 'Không phải sói'}
              </span>
            </div>
          )}
        </>
      )}
    </ActionShell>
  )
}

function WitchAction({ code, uid, meta, players, action, secret }: ActionProps) {
  const [mode, setMode] = useState<'home' | 'poison'>('home')
  const [sel, setSel] = useState<string | null>(null)
  const bite = secret?.bite ?? null
  const victim = players.find((p) => p.uid === bite)
  const saveUsed = Boolean(secret?.saveUsed)
  const poisonUsed = Boolean(secret?.poisonUsed)
  const sent = action?.witchDone
  const targets = players.filter((p) => p.alive && p.uid !== uid)

  const submit = async (payload: { save: boolean; poison: string | null }) => {
    buzz(30)
    await store.update(paths.action(code, uid), { witch: payload, witchDone: true })
  }

  if (sent) {
    return (
      <ActionShell
        title="Đã quyết"
        subtitle="Bạn có thể đổi ý cho tới khi lượt này kết thúc."
        icon="🧪"
        accent="#7be0c0"
        endsAt={meta.stepEndsAt}
        total={meta.config.stepSeconds * 1000}
      >
        <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <p className="text-3xl">🧪</p>
          <p className="mt-3 text-sm text-parchment/70">
            {action?.witch?.save
              ? `Đã cứu ${victim?.name ?? 'người bị cắn'}`
              : action?.witch?.poison
                ? `Đã đầu độc ${players.find((p) => p.uid === action?.witch?.poison)?.name}`
                : 'Đêm nay bạn không làm gì.'}
          </p>
        </div>
      </ActionShell>
    )
  }

  if (mode === 'poison') {
    return (
      <ActionShell
        title="Đầu độc ai?"
        subtitle="Bình độc chỉ dùng được một lần trong cả ván."
        icon="☠️"
        accent="#ff8f83"
        endsAt={meta.stepEndsAt}
        total={meta.config.stepSeconds * 1000}
      >
        <TargetGrid players={targets} selected={sel} onSelect={setSel} accent="#e0433a" />
        <div className="mt-5 flex gap-2">
          <button className="btn btn-ghost btn-md flex-1" onClick={() => setMode('home')}>
            Quay lại
          </button>
          <button
            className="btn btn-blood btn-md flex-[1.4]"
            disabled={!sel}
            onClick={() => void submit({ save: false, poison: sel })}
          >
            Đầu độc
          </button>
        </div>
      </ActionShell>
    )
  }

  return (
    <ActionShell
      title="Đêm nay sói đã cắn"
      subtitle="Bạn là người duy nhất biết điều này."
      icon="🧪"
      accent="#7be0c0"
      endsAt={meta.stepEndsAt}
      total={meta.config.stepSeconds * 1000}
    >
      {victim ? (
        <div className="flex flex-col items-center rounded-3xl border border-blood/25 bg-blood/8 py-5">
          <Avatar index={victim.avatar} size={56} name={victim.name} />
          <p className="mt-3 text-base font-semibold text-parchment/90">{victim.name}</p>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/8 bg-white/[0.03] py-6 text-center text-sm text-mute">
          Đêm nay không ai bị cắn.
        </div>
      )}

      <div className="mt-4 space-y-2">
        <button
          className="btn btn-primary btn-md w-full"
          disabled={!victim || saveUsed}
          onClick={() => void submit({ save: true, poison: null })}
        >
          {saveUsed ? 'Bình cứu đã dùng' : `Cứu ${victim?.name ?? ''}`}
        </button>
        <button
          className="btn btn-ghost btn-md w-full"
          disabled={poisonUsed}
          onClick={() => setMode('poison')}
        >
          {poisonUsed ? 'Bình độc đã dùng' : 'Đầu độc một người'}
        </button>
        <button className="btn btn-ghost btn-md w-full" onClick={() => void submit({ save: false, poison: null })}>
          Không làm gì
        </button>
      </div>
    </ActionShell>
  )
}

function GuardAction({ code, uid, meta, players, action }: ActionProps) {
  const [sel, setSel] = useState<string | null>(null)
  const targets = players.filter((p) => p.alive && p.uid !== meta.guardPrev)
  const sent = action?.guard

  if (sent) {
    const chosen = sent === NONE ? null : players.find((p) => p.uid === sent)
    return (
      <ActionShell
        title="Đã chọn"
        subtitle="Người này sẽ không chết vì nanh sói đêm nay."
        icon="🛡️"
        accent="#ffc861"
        endsAt={meta.stepEndsAt}
        total={meta.config.stepSeconds * 1000}
      >
        <div className="mt-4 flex flex-col items-center rounded-3xl border border-amber/25 bg-amber/8 py-8">
          {chosen ? <Avatar index={chosen.avatar} size={72} name={chosen.name} /> : <span className="text-4xl">🌙</span>}
          <p className="mt-4 text-lg font-semibold text-parchment/90">{chosen?.name ?? 'Không bảo vệ ai'}</p>
        </div>
      </ActionShell>
    )
  }

  return (
    <ActionShell
      title="Che chở một người"
      subtitle="Không thể bảo vệ cùng một người hai đêm liên tiếp."
      icon="🛡️"
      accent="#ffc861"
      endsAt={meta.stepEndsAt}
      total={meta.config.stepSeconds * 1000}
    >
      <TargetGrid players={targets} selected={sel} onSelect={setSel} accent="#ffc861" />
      <div className="mt-5 flex gap-2">
        <button
          className="btn btn-ghost btn-md flex-1"
          onClick={() => void store.update(paths.action(code, uid), { guard: NONE })}
        >
          Không bảo vệ ai
        </button>
        <button
          className="btn btn-primary btn-md flex-[1.3]"
          disabled={!sel}
          onClick={() => sel && void store.update(paths.action(code, uid), { guard: sel })}
        >
          Bảo vệ
        </button>
      </div>
    </ActionShell>
  )
}

function CupidAction({ code, uid, meta, players, action }: ActionProps) {
  const [pair, setPair] = useState<string[]>([])
  const sent = action?.cupidDone
  const targets = players.filter((p) => p.alive)
  const pickable = pair.length < 2 || pair.includes('')

  const toggle = (id: string) => {
    sfx.tap()
    buzz(12)
    setPair((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : prev.length >= 2 ? prev : [...prev, id]))
  }

  if (sent) {
    const chosen = (action?.cupid ?? []).map((id) => players.find((p) => p.uid === id)).filter(Boolean) as Player[]
    return (
      <ActionShell
        title="Đã se duyên"
        subtitle="Hai người này sẽ chết cùng nhau. Nếu họ là hai người cuối cùng, họ cùng thắng."
        icon="💘"
        accent="#ff9ecb"
        endsAt={meta.stepEndsAt}
        total={meta.config.stepSeconds * 1000}
      >
        <div className="mt-4 flex flex-col items-center rounded-3xl border border-[#ff9ecb]/30 bg-[#ff9ecb]/8 py-8">
          {chosen.length ? (
            <div className="flex items-center gap-5">
              {chosen.map((p) => (
                <div key={p.uid} className="text-center">
                  <Avatar index={p.avatar} size={68} name={p.name} />
                  <p className="mt-2 text-[0.72rem] text-parchment/85">{p.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-4xl">💔</span>
          )}
          <p className="mt-4 text-[0.7rem] text-parchment/60">{chosen.length ? 'Một mối tình đã bắt đầu.' : 'Bạn không ghép ai đêm nay.'}</p>
        </div>
      </ActionShell>
    )
  }

  return (
    <ActionShell
      title="Ghép đôi hai người"
      subtitle="Chỉ làm được một lần, trong đêm đầu tiên. Chọn hai người — có thể là chính bạn."
      icon="💘"
      accent="#ff9ecb"
      endsAt={meta.stepEndsAt}
      total={meta.config.stepSeconds * 1000}
    >
      <div className="grid grid-cols-3 gap-2">
        {targets.map((p) => {
          const active = pair.includes(p.uid)
          return (
            <button
              key={p.uid}
              onClick={() => toggle(p.uid)}
              className={`flex flex-col items-center rounded-2xl border px-1.5 py-3 transition-all ${
                active ? 'scale-[1.03] border-[#ff9ecb]/70 bg-[#ff9ecb]/15' : 'border-white/8 bg-white/[0.03]'
              }`}
            >
              <Avatar index={p.avatar} size={46} name={p.name} ring={active} />
              <span className="mt-2 w-full truncate text-[0.68rem] text-parchment/80">{p.name}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-5 space-y-2">
        <button
          className="btn btn-primary btn-lg w-full"
          disabled={pair.length !== 2}
          onClick={() => {
            buzz(30)
            void store.update(paths.action(code, uid), { cupid: [pair[0], pair[1]], cupidDone: true })
          }}
        >
          {pair.length === 2 ? `Ghép ${players.find((p) => p.uid === pair[0])?.name} & ${players.find((p) => p.uid === pair[1])?.name}` : `Chọn thêm ${2 - pair.length} người`}
        </button>
        <button
          className="btn btn-ghost btn-sm w-full"
          disabled={pickable && pair.length === 0}
          onClick={() => void store.update(paths.action(code, uid), { cupidDone: true })}
        >
          Không ghép ai
        </button>
      </div>
    </ActionShell>
  )
}

function WolfWitchAction({ code, uid, meta, players, action, secret }: ActionProps) {
  const [sel, setSel] = useState<string | null>(null)
  const used = Boolean(action?.wolfDone)
  const targets = players.filter((p) => p.alive && !secret?.mates?.includes(p.uid) && p.uid !== uid)

  if (used) {
    const victim = action?.wolfPoison && action.wolfPoison !== NONE ? players.find((p) => p.uid === action.wolfPoison) : null
    return (
      <ActionShell
        title="Đã chọn"
        subtitle="Bình độc của bạn chỉ dùng được một lần trong cả ván."
        icon="🧙"
        accent="#c77dff"
        endsAt={meta.stepEndsAt}
        total={meta.config.stepSeconds * 1000}
      >
        <div className="mt-4 flex flex-col items-center rounded-3xl border border-[#c77dff]/30 bg-[#c77dff]/8 py-8">
          {victim ? <Avatar index={victim.avatar} size={68} name={victim.name} /> : <span className="text-4xl">🌙</span>}
          <p className="mt-4 text-lg font-semibold text-parchment/90">{victim?.name ?? 'Không đầu độc ai'}</p>
        </div>
      </ActionShell>
    )
  }

  return (
    <ActionShell
      title="Bình độc của sói"
      subtitle="Chọn một người để giết thêm đêm nay. Bảo Vệ không chặn được thuốc độc."
      icon="🧙"
      accent="#c77dff"
      endsAt={meta.stepEndsAt}
      total={meta.config.stepSeconds * 1000}
    >
      <TargetGrid players={targets} selected={sel} onSelect={setSel} accent="#c77dff" />
      <div className="mt-5 flex gap-2">
        <button
          className="btn btn-ghost btn-md flex-1"
          onClick={() => void store.update(paths.action(code, uid), { wolfPoison: NONE, wolfDone: true })}
        >
          Giữ lại
        </button>
        <button
          className="btn btn-blood btn-md flex-[1.3]"
          disabled={!sel}
          onClick={() => {
            buzz(30)
            if (sel) void store.update(paths.action(code, uid), { wolfPoison: sel, wolfDone: true })
          }}
        >
          Đầu độc
        </button>
      </div>
    </ActionShell>
  )
}

function KillerAction({ code, uid, meta, players, action }: ActionProps) {
  const [sel, setSel] = useState<string | null>(null)
  const sent = action?.killDone
  const targets = players.filter((p) => p.alive && p.uid !== uid)

  if (sent) {
    const victim = action?.kill && action.kill !== NONE ? players.find((p) => p.uid === action.kill) : null
    return (
      <ActionShell
        title="Đã chọn"
        subtitle="Không ai có thể chặn lưỡi dao của bạn."
        icon="🔪"
        accent="#ff4d6d"
        endsAt={meta.stepEndsAt}
        total={meta.config.stepSeconds * 1000}
      >
        <div className="mt-4 flex flex-col items-center rounded-3xl border border-[#ff4d6d]/30 bg-[#ff4d6d]/8 py-8">
          {victim ? <Avatar index={victim.avatar} size={68} name={victim.name} /> : <span className="text-4xl">🌙</span>}
          <p className="mt-4 text-lg font-semibold text-parchment/90">{victim?.name ?? 'Đêm nay bạn nghỉ tay'}</p>
        </div>
      </ActionShell>
    )
  }

  return (
    <ActionShell
      title="Chọn con mồi"
      subtitle="Bạn thắng khi là người duy nhất còn sống. Đừng để ai biết bạn là ai."
      icon="🔪"
      accent="#ff4d6d"
      endsAt={meta.stepEndsAt}
      total={meta.config.stepSeconds * 1000}
    >
      <TargetGrid players={targets} selected={sel} onSelect={setSel} accent="#ff4d6d" />
      <div className="mt-5 flex gap-2">
        <button
          className="btn btn-ghost btn-md flex-1"
          onClick={() => void store.update(paths.action(code, uid), { kill: NONE, killDone: true })}
        >
          Không giết ai
        </button>
        <button
          className="btn btn-blood btn-md flex-[1.3]"
          disabled={!sel}
          onClick={() => {
            buzz(30)
            if (sel) void store.update(paths.action(code, uid), { kill: sel, killDone: true })
          }}
        >
          Ra tay
        </button>
      </div>
    </ActionShell>
  )
}

function GirlAction({ code, uid, meta, players, action, secret }: ActionProps) {
  const [sel, setSel] = useState<string | null>(null)
  const sent = action?.spy
  const check = secret?.spyCheck
  const targets = players.filter((p) => p.alive && p.uid !== uid)

  if (sent) {
    const target = check ? players.find((p) => p.uid === check.target) : null
    return (
      <ActionShell
        title="Bạn đã nhìn thấy"
        subtitle="Chỉ biết người đó có thức giấc đêm nay hay không — không biết họ là ai."
        icon="👧"
        accent="#8ee6ff"
        endsAt={meta.stepEndsAt}
        total={meta.config.stepSeconds * 1000}
      >
        <div className="mt-4 flex flex-col items-center rounded-3xl border border-[#8ee6ff]/30 bg-[#8ee6ff]/8 py-8">
          <Avatar index={target?.avatar ?? 0} size={68} name={target?.name} />
          <p className="mt-4 text-lg font-semibold text-parchment/90">{target?.name ?? 'Không rõ'}</p>
          <p className="mt-2 text-2xl font-bold" style={{ color: check?.awake ? '#ffc861' : '#7be0c0' }}>
            {check ? (check.awake ? 'ĐÃ THỨC GIẤC' : 'NGỦ SAY') : 'Đang nhìn…'}
          </p>
        </div>
        <p className="mt-5 text-center text-[0.66rem] leading-relaxed text-mute">
          Người thức giấc có thể là vai đặc biệt — hoặc là sói. Đừng nói ra quá sớm.
        </p>
      </ActionShell>
    )
  }

  return (
    <ActionShell
      title="Nhìn trộm một người"
      subtitle="Bạn sẽ biết đêm nay người đó có hành động gì không."
      icon="👧"
      accent="#8ee6ff"
      endsAt={meta.stepEndsAt}
      total={meta.config.stepSeconds * 1000}
    >
      <TargetGrid players={targets} selected={sel} onSelect={setSel} accent="#8ee6ff" />
      <div className="mt-5">
        <button
          className="btn btn-primary btn-lg w-full"
          disabled={!sel}
          onClick={() => {
            if (!sel) return
            buzz(30)
            void store.update(paths.action(code, uid), { spy: sel })
          }}
        >
          Nhìn trộm
        </button>
      </div>
    </ActionShell>
  )
}

function WhiteWolfAction({ code, uid, meta, players, action, secret }: ActionProps) {
  const [sel, setSel] = useState<string | null>(null)
  const sent = action?.whiteDone
  const used = Boolean(secret?.whiteUsed)
  const targets = (secret?.mates ?? [])
    .map((id) => players.find((p) => p.uid === id))
    .filter((p): p is Player => Boolean(p && p.alive))

  if (sent || used) {
    const victim = action?.whiteKill && action.whiteKill !== NONE ? players.find((p) => p.uid === action.whiteKill) : null
    return (
      <ActionShell
        title={victim ? 'Đã ra tay' : 'Đêm nay bạn im lặng'}
        subtitle="Sói Trắng chỉ thắng khi là kẻ duy nhất còn sống."
        icon="🤍"
        accent="#e8eefc"
        endsAt={meta.stepEndsAt}
        total={meta.config.stepSeconds * 1000}
      >
        <div className="mt-4 flex flex-col items-center rounded-3xl border border-white/15 bg-white/[0.05] py-8">
          {victim ? <Avatar index={victim.avatar} size={68} name={victim.name} /> : <span className="text-4xl">🌙</span>}
          <p className="mt-4 text-lg font-semibold text-parchment/90">{victim?.name ?? 'Không giết ai'}</p>
        </div>
      </ActionShell>
    )
  }

  return (
    <ActionShell
      title="Phản bội bầy"
      subtitle="Mỗi ván một lần, vào đêm chẵn: giết một con sói khác. Bạn sẽ chỉ còn một mình."
      icon="🤍"
      accent="#e8eefc"
      endsAt={meta.stepEndsAt}
      total={meta.config.stepSeconds * 1000}
    >
      {targets.length ? (
        <TargetGrid players={targets} selected={sel} onSelect={setSel} accent="#e8eefc" />
      ) : (
        <p className="py-8 text-center text-xs text-mute">Không còn đồng bọn nào để giết.</p>
      )}
      <div className="mt-5 flex gap-2">
        <button
          className="btn btn-ghost btn-md flex-1"
          onClick={() => void store.update(paths.action(code, uid), { whiteKill: NONE, whiteDone: true })}
        >
          Giữ bí mật
        </button>
        <button
          className="btn btn-blood btn-md flex-[1.3]"
          disabled={!sel}
          onClick={() => {
            if (!sel) return
            buzz(30)
            void store.update(paths.action(code, uid), { whiteKill: sel, whiteDone: true })
          }}
        >
          Giết sói
        </button>
      </div>
    </ActionShell>
  )
}

function PiperAction({ code, uid, meta, players, action }: ActionProps) {
  const [pair, setPair] = useState<string[]>([])
  const sent = action?.charmDone
  const targets = players.filter((p) => p.alive)
  const charmed = meta.charmed ?? []

  const toggle = (id: string) => {
    sfx.tap()
    buzz(12)
    setPair((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : prev.length >= 2 ? prev : [...prev, id]))
  }

  if (sent) {
    const picked = (action?.charm ?? []).map((id) => players.find((p) => p.uid === id)).filter(Boolean) as Player[]
    return (
      <ActionShell
        title="Giai điệu đã cất lên"
        subtitle="Bạn thắng khi mọi người còn sống đều đã nghe tiếng sáo."
        icon="🎵"
        accent="#9dffb0"
        endsAt={meta.stepEndsAt}
        total={meta.config.stepSeconds * 1000}
      >
        <div className="mt-4 flex flex-col items-center rounded-3xl border border-[#9dffb0]/30 bg-[#9dffb0]/8 py-8">
          <div className="flex items-center gap-5">
            {picked.map((p) => (
              <div key={p.uid} className="text-center">
                <Avatar index={p.avatar} size={62} name={p.name} />
                <p className="mt-2 text-[0.72rem] text-parchment/85">{p.name}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[0.72rem] text-parchment/60">Đã mê hoặc {charmed.length} người.</p>
        </div>
      </ActionShell>
    )
  }

  return (
    <ActionShell
      title="Thổi sáo mê hoặc"
      subtitle="Mỗi đêm chọn hai người. Khi tất cả người sống đều bị mê hoặc, bạn thắng một mình."
      icon="🎵"
      accent="#9dffb0"
      endsAt={meta.stepEndsAt}
      total={meta.config.stepSeconds * 1000}
    >
      <div className="mb-3 flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-[0.68rem] text-mute">
        <span>Đã mê hoặc</span>
        <span className="text-[#9dffb0]">
          {charmed.length}/{players.filter((p) => p.alive).length} người sống
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {targets.map((p) => {
          const active = pair.includes(p.uid)
          return (
            <button
              key={p.uid}
              onClick={() => toggle(p.uid)}
              className={`flex flex-col items-center rounded-2xl border px-1.5 py-3 transition-all ${
                active ? 'scale-[1.03] border-[#9dffb0]/70 bg-[#9dffb0]/15' : 'border-white/8 bg-white/[0.03]'
              }`}
            >
              <Avatar index={p.avatar} size={46} name={p.name} ring={active} />
              <span className="mt-2 w-full truncate text-[0.68rem] text-parchment/80">{p.name}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-5">
        <button
          className="btn btn-primary btn-lg w-full"
          disabled={pair.length !== 2}
          onClick={() => {
            buzz(30)
            void store.update(paths.action(code, uid), { charm: [pair[0], pair[1]], charmDone: true })
          }}
        >
          {pair.length === 2 ? 'Thổi sáo' : `Chọn thêm ${2 - pair.length} người`}
        </button>
      </div>
    </ActionShell>
  )
}

function SleepAction({ meta }: { meta: Meta }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="text-6xl"
        style={{ filter: 'drop-shadow(0 0 30px rgba(125,109,255,0.5))' }}
      >
        🌙
      </motion.div>
      <h1 className="display mt-6 text-3xl text-parchment/90">Hãy nhắm mắt.</h1>
      <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-mute">
        Đêm nay bạn không có việc gì. Nhưng ai đó đang thức.
      </p>
      <div className="mt-8">
        <Timer endsAt={meta.stepEndsAt} total={meta.config.stepSeconds * 1000} size={64} tone="moon" />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- vote */

function VoteScreen({
  code,
  uid,
  meta,
  players,
  votes,
}: {
  code: string
  uid: string
  meta: Meta
  players: Player[]
  votes: Record<string, string>
}) {
  const [pick, setPick] = useState<string | null>(null)
  const alive = players.filter((p) => p.alive && p.uid !== uid)
  const myVote = votes[uid]
  const sel = myVote && myVote !== 'skip' ? myVote : pick

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-start justify-between pt-4">
        <div>
          <p className="eyebrow mb-2">Bỏ phiếu</p>
          <h1 className="display text-3xl text-parchment">Ai đáng ngờ?</h1>
          <p className="mt-1.5 text-[0.75rem] text-parchment/55">Chọn người bạn muốn treo cổ.</p>
        </div>
        <Timer endsAt={meta.phaseEndsAt} total={meta.config.voteSeconds * 1000} size={54} tone="blood" />
      </div>

      <div className="mt-5 flex-1">
        <TargetGrid players={alive} selected={sel} onSelect={setPick} accent="#e0433a" />
      </div>

      <div className="sticky bottom-0 mt-4 space-y-2 bg-gradient-to-t from-night-950 via-night-950/90 to-transparent pt-3">
        <button
          className="btn btn-blood btn-lg w-full"
          disabled={!sel || sel === myVote}
          onClick={() => {
            if (!sel) return
            buzz(25)
            sfx.vote()
            void store.set(paths.vote(code, uid), sel)
          }}
        >
          {myVote ? 'Đổi phiếu' : 'Treo cổ người này'}
        </button>
        <button
          className={`btn btn-sm w-full ${myVote === 'skip' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => void store.set(paths.vote(code, uid), 'skip')}
        >
          {myVote === 'skip' ? '✓ Đang bỏ qua' : 'Bỏ qua lượt này'}
        </button>
        {myVote && myVote !== sel && (
          <p className="text-center text-[0.62rem] text-mute">Phiếu hiện tại đã được ghi nhận.</p>
        )}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- spectator */

function DeadBanner() {
  return (
    <div className="rounded-2xl border border-blood/25 bg-blood/8 px-4 py-3 text-center">
      <p className="text-[0.62rem] tracking-[0.25em] text-blood-soft/80 uppercase">bạn đã chết</p>
      <p className="mt-1 text-[0.72rem] text-parchment/60">Hãy quan sát — đừng tiết lộ gì cả.</p>
    </div>
  )
}

function SpectatorNight({ meta, players }: { meta: Meta; players: Player[] }) {
  const now = useNow(500)
  const alive = players.filter((p) => p.alive)
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <DeadBanner />
      <div className="mt-8 text-5xl opacity-70">👻</div>
      <p className="mt-4 text-sm text-parchment/60">Đêm thứ {meta.round}</p>
      <p className="mt-1 text-[0.7rem] text-mute">
        {Math.max(0, Math.ceil((meta.stepEndsAt - now) / 1000))}s
      </p>
      <div className="mt-8 grid w-full grid-cols-4 gap-2">
        {alive.map((p) => (
          <div key={p.uid} className="flex flex-col items-center gap-1.5">
            <Avatar index={p.avatar} size={40} name={p.name} />
            <span className="w-full truncate text-center text-[0.6rem] text-mute">{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- over */

function OverScreen({ meta, me, role }: { meta: Meta; me: Player; role: RoleId | null }) {
  const def = role ? roleDef(role) : null
  const win = !def
    ? false
    : meta.winReason === 'jester'
      ? def.id === 'jester'
      : meta.winReason === 'killer'
        ? def.id === 'killer'
        : meta.winReason === 'whitewolf'
          ? def.id === 'whitewolf'
          : meta.winReason === 'piper'
            ? def.id === 'piper'
            : meta.winReason === 'lovers'
              ? Boolean(meta.lovers?.includes(me.uid))
              : def.team === meta.winner
  const title =
    meta.winReason === 'jester'
      ? 'Kẻ Chán Đời thắng'
      : meta.winReason === 'killer'
        ? 'Sát Nhân thắng'
        : meta.winReason === 'whitewolf'
          ? 'Sói Trắng thắng'
          : meta.winReason === 'piper'
            ? 'Người Thổi Sáo thắng'
            : meta.winReason === 'lovers'
              ? 'Đôi tình nhân thắng'
              : meta.winner === 'wolf'
                ? 'Sói thắng'
                : meta.winner === 'village'
                  ? 'Làng thắng'
                  : 'Ván đấu khép lại'
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <p className="eyebrow mb-3">Kết thúc</p>
      <h1 className="display text-4xl">
        <span className={meta.winReason === 'killer' || meta.winReason === 'whitewolf' ? 'grad-blood' : 'grad-moon'}>{title}</span>
      </h1>
      <p className="mt-2 text-sm" style={{ color: meta.winner ? (win ? '#7be0c0' : '#ff8f83') : '#9a94b8' }}>
        {meta.winner ? (win ? 'Phe của bạn đã thắng 🎉' : 'Phe của bạn đã thua.') : 'Ván đấu đã khép lại.'}
      </p>

      {def && (
        <div className="mt-7 w-full rounded-3xl border p-5" style={{ borderColor: `${def.accent}44`, background: `${def.accent}0d` }}>
          <p className="text-[0.6rem] tracking-[0.25em] text-mute uppercase">Vai của bạn</p>
          <p className="mt-2 text-2xl">{def.icon}</p>
          <p className="mt-1 text-lg font-semibold" style={{ color: def.accent }}>
            {def.name}
          </p>
          <p className="mt-1 text-[0.7rem] text-mute">
            {me.alive ? 'Bạn sống sót.' : 'Bạn đã chết trong ván này.'}
          </p>
        </div>
      )}

      <p className="mt-6 text-[0.68rem] leading-relaxed text-mute">
        Nhìn lên màn hình chung để xem toàn bộ vai. Chủ phòng có thể bắt đầu ván mới.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------- main */

export default function PlayerScreen() {
  const { code = '' } = useParams()
  const room = useRoom(code, 'player')
  const [justJoined, setJustJoined] = useState(false)
  const [showRole, setShowRole] = useState(false)

  const meta = room.meta
  const me = room.me
  const uid = room.uid

  useEffect(() => {
    if (meta) document.title = `Ma Sói · ${meta.code}`
  }, [meta])

  const step = meta ? currentStep(meta) : null
  const myRole: RoleId | null = room.mySecret?.role ?? null

  const nightOwns = useMemo(() => {
    if (!step || !myRole) return false
    if (step === 'wolves') return WOLF_ROLES.includes(myRole)
    if (step === 'whitewolf') return myRole === 'whitewolf'
    if (step === 'cupid') return myRole === 'cupid'
    if (step === 'guard') return myRole === 'guard'
    if (step === 'seer') return myRole === 'seer'
    if (step === 'girl') return myRole === 'girl'
    if (step === 'wolfwitch') return myRole === 'wolfwitch'
    if (step === 'piper') return myRole === 'piper'
    if (step === 'killer') return myRole === 'killer'
    return myRole === 'witch'
  }, [step, myRole])

  if (room.loading) {
    return (
      <Shell code={code}>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-violet" />
        </div>
      </Shell>
    )
  }

  if (room.missing) {
    return (
      <Shell code={code}>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="display text-2xl text-parchment/85">Không tìm thấy phòng</p>
          <p className="mt-2 text-sm text-mute">Mã phòng này không tồn tại hoặc đã kết thúc.</p>
          <Link to="/" className="btn btn-primary btn-md mt-6">
            Về trang chủ
          </Link>
        </div>
      </Shell>
    )
  }

  if (!meta) {
    return (
      <Shell code={code}>
        <div className="flex flex-1 items-center justify-center text-sm text-mute">Đang tải…</div>
      </Shell>
    )
  }

  if (!me || !uid) {
    return (
      <Shell code={code}>
        <JoinForm code={code} onJoined={() => setJustJoined(true)} />
      </Shell>
    )
  }

  if (meta.phase === 'lobby' && !justJoined) {
    return (
      <Shell code={code}>
        <LobbyWait meta={meta} players={room.players} me={me} />
      </Shell>
    )
  }

  return (
    <Shell code={code}>
      {meta.phase !== 'over' && (
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <Avatar index={me.avatar} size={30} name={me.name} dead={!me.alive} />
            <div>
              <p className="text-[0.72rem] font-medium text-parchment/85">{me.name}</p>
              <p className="text-[0.58rem] text-mute">{me.alive ? 'còn sống' : 'đã chết'}</p>
            </div>
          </div>
          {myRole && (
            <button
              onClick={() => {
                setShowRole(true)
              }}
              className="btn btn-ghost btn-sm"
            >
              Xem vai
            </button>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${meta.phase}-${meta.stepIndex}-${meta.round}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="flex flex-1 flex-col"
        >
          {meta.phase === 'lobby' && <LobbyWait meta={meta} players={room.players} me={me} />}

          {meta.phase === 'reveal' &&
            (myRole ? (
              <Reveal
                role={myRole}
                ready={Boolean(me.ready)}
                onReady={() => void store.update(paths.player(code, uid!), { ready: true })}
              />
            ) : (
              <div className="flex flex-1 items-center justify-center text-sm text-mute">Đang chia vai…</div>
            ))}

          {meta.phase === 'night' &&
            (!me.alive ? (
              <SpectatorNight meta={meta} players={room.players} />
            ) : nightOwns && myRole ? (
              <>
                {WOLF_ROLES.includes(myRole) && (
                  <WolfAction
                    code={code}
                    uid={uid}
                    meta={meta}
                    players={room.players}
                    me={me}
                    action={room.myAction}
                    secret={room.mySecret}
                  />
                )}
                {myRole === 'cupid' && (
                  <CupidAction
                    code={code}
                    uid={uid}
                    meta={meta}
                    players={room.players}
                    me={me}
                    action={room.myAction}
                    secret={room.mySecret}
                  />
                )}
                {myRole === 'wolfwitch' && (
                  <WolfWitchAction
                    code={code}
                    uid={uid}
                    meta={meta}
                    players={room.players}
                    me={me}
                    action={room.myAction}
                    secret={room.mySecret}
                  />
                )}
                {myRole === 'girl' && (
                  <GirlAction
                    code={code}
                    uid={uid}
                    meta={meta}
                    players={room.players}
                    me={me}
                    action={room.myAction}
                    secret={room.mySecret}
                  />
                )}
                {myRole === 'whitewolf' && (
                  <WhiteWolfAction
                    code={code}
                    uid={uid}
                    meta={meta}
                    players={room.players}
                    me={me}
                    action={room.myAction}
                    secret={room.mySecret}
                  />
                )}
                {myRole === 'piper' && (
                  <PiperAction
                    code={code}
                    uid={uid}
                    meta={meta}
                    players={room.players}
                    me={me}
                    action={room.myAction}
                    secret={room.mySecret}
                  />
                )}
                {myRole === 'killer' && (
                  <KillerAction
                    code={code}
                    uid={uid}
                    meta={meta}
                    players={room.players}
                    me={me}
                    action={room.myAction}
                    secret={room.mySecret}
                  />
                )}
                {myRole === 'seer' && (
                  <SeerAction
                    code={code}
                    uid={uid}
                    meta={meta}
                    players={room.players}
                    me={me}
                    action={room.myAction}
                    secret={room.mySecret}
                  />
                )}
                {myRole === 'witch' && (
                  <WitchAction
                    code={code}
                    uid={uid}
                    meta={meta}
                    players={room.players}
                    me={me}
                    action={room.myAction}
                    secret={room.mySecret}
                  />
                )}
                {myRole === 'guard' && (
                  <GuardAction
                    code={code}
                    uid={uid}
                    meta={meta}
                    players={room.players}
                    me={me}
                    action={room.myAction}
                    secret={room.mySecret}
                  />
                )}
              </>
            ) : (
              <SleepAction meta={meta} />
            ))}

          {meta.phase === 'dawn' && (
            <div className="flex flex-1 flex-col justify-center">
              {!me.alive ? <DeadBanner /> : null}
              <h1 className="display mt-4 text-3xl text-parchment/90">
                {meta.lastDeaths.length ? 'Bình minh không ai mong đợi.' : 'Một đêm yên bình.'}
              </h1>
              <p className="mt-2 text-sm text-parchment/55">
                {meta.lastDeaths.length ? 'Nhìn lên màn hình chung.' : 'Không ai chết đêm qua.'}
              </p>
              <p className="mt-8 text-[0.68rem] text-mute">Bạn {me.alive ? 'vẫn còn sống.' : 'đã chết.'}</p>
            </div>
          )}

          {meta.phase === 'discuss' && (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              {!me.alive && <DeadBanner />}
              <div className="mt-6">
                <Timer
                  endsAt={meta.phaseEndsAt}
                  total={meta.config.discussSeconds * 1000}
                  size={140}
                  tone="moon"
                  label="thảo luận"
                />
              </div>
              <p className="mt-6 max-w-[26ch] text-sm leading-relaxed text-parchment/60">
                Nói ra suy nghĩ của bạn. Nhưng nhớ: ai đó đang diễn rất giỏi.
              </p>
            </div>
          )}

          {meta.phase === 'vote' &&
            (me.alive ? (
              <VoteScreen
                code={code}
                uid={uid}
                meta={meta}
                players={room.players}
                votes={room.votes}
              />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center">
                <DeadBanner />
                <Timer endsAt={meta.phaseEndsAt} total={meta.config.voteSeconds * 1000} size={90} tone="blood" />
                <p className="mt-4 text-[0.7rem] text-mute">Cả làng đang bỏ phiếu.</p>
              </div>
            ))}

          {meta.phase === 'verdict' && (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <p className="eyebrow mb-3">Phán quyết</p>
              {meta.lastLynch ? (
                <>
                  <Avatar
                    index={room.players.find((p) => p.uid === meta.lastLynch)?.avatar ?? 0}
                    size={72}
                    dead
                  />
                  <p className="display mt-4 text-2xl text-parchment/90">
                    {room.players.find((p) => p.uid === meta.lastLynch)?.name}
                  </p>
                  <p className="mt-1 text-sm text-mute">đã bị treo cổ</p>
                </>
              ) : (
                <p className="display text-2xl text-parchment/80">Không ai bị treo cổ.</p>
              )}
            </div>
          )}

          {meta.phase === 'hunter' &&
            (meta.hunterShooter === uid ? (
              <HunterAction code={code} uid={uid} meta={meta} players={room.players} />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <p className="eyebrow mb-3">Phát súng cuối</p>
                <p className="text-5xl">🏹</p>
                <p className="mt-4 text-sm text-parchment/60">
                  {meta.hunterVictim
                    ? `Thợ săn đã bắn hạ ${room.players.find((p) => p.uid === meta.hunterVictim)?.name}`
                    : 'Thợ săn đang giương nỏ…'}
                </p>
              </div>
            ))}

          {meta.phase === 'over' && <OverScreen meta={meta} me={me} role={myRole} />}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showRole && myRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6 backdrop-blur-md"
            onClick={() => setShowRole(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="h-[420px] w-full max-w-[280px]"
              onClick={(e) => e.stopPropagation()}
            >
              <RoleCard role={myRole} flipped className="h-full" />
            </motion.div>
            <button
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-mute"
              onClick={() => setShowRole(false)}
            >
              Chạm ra ngoài để đóng
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  )
}

function HunterAction({
  code,
  uid,
  meta,
  players,
}: {
  code: string
  uid: string
  meta: Meta
  players: Player[]
}) {
  const [sel, setSel] = useState<string | null>(null)
  const targets = players.filter((p) => p.alive && p.uid !== uid)
  const done = Boolean(meta.hunterVictim) || meta.hunterDone

  return (
    <div className="flex flex-1 flex-col">
      <div className="pt-4">
        <p className="eyebrow mb-2">Bạn đã ngã xuống</p>
        <h1 className="display text-3xl text-parchment">Phát súng cuối</h1>
        <p className="mt-2 text-[0.78rem] leading-relaxed text-parchment/55">
          Chọn một người để bắn hạ trước khi rời đi. Chỉ một thôi.
        </p>
      </div>
      <div className="mt-5 flex-1">
        <TargetGrid players={targets} selected={sel} onSelect={setSel} accent="#f0b44e" />
      </div>
      <button
        className="btn btn-blood btn-lg mt-4 w-full"
        disabled={!sel || done}
        onClick={async () => {
          if (!sel) return
          buzz(40)
          await store.update(paths.action(code, uid), { hunterShot: sel })
        }}
      >
        {done ? 'Đã bắn' : 'Khai hoả'}
      </button>
    </div>
  )
}
