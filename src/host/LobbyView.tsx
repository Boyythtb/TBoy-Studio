import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar } from '../ui/Avatar'
import { Qr } from '../ui/Qr'
import { MIN_PLAYERS, configIssue, specialCount, suggestConfig } from '../game/engine'
import { ROLES, ROLE_ORDER } from '../game/roles'
import type { GameConfig, Meta, Player, RoleId } from '../game/types'
import { deleteRoom, updateConfig, joinRoom } from '../lib/room'
import { store } from '../lib/store'
import { sfx } from '../lib/sfx'

interface Props {
  code: string
  meta: Meta
  players: Player[]
  onStart: () => void
  starting: boolean
}

function Stepper({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  label: string
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
      <span className="text-[0.76rem] text-parchment/70">{label}</span>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="grid h-7 w-7 place-items-center rounded-lg bg-white/6 text-sm text-parchment/80 transition hover:bg-white/12 disabled:opacity-30"
          aria-label={`Giảm ${label}`}
        >
          −
        </button>
        <span className="tabular w-6 text-center text-sm font-semibold">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="grid h-7 w-7 place-items-center rounded-lg bg-white/6 text-sm text-parchment/80 transition hover:bg-white/12 disabled:opacity-30"
          aria-label={`Tăng ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

function Segmented<T extends number>({
  value,
  options,
  onChange,
  suffix,
}: {
  value: T
  options: T[]
  onChange: (v: T) => void
  suffix?: string
}) {
  return (
    <div className="flex gap-1 rounded-xl border border-white/8 bg-white/[0.03] p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`flex-1 rounded-lg px-2 py-1.5 text-[0.7rem] font-medium transition ${
            value === o ? 'bg-violet/90 text-night-950' : 'text-parchment/60 hover:bg-white/6'
          }`}
        >
          {o}
          {suffix}
        </button>
      ))}
    </div>
  )
}

export function LobbyView({ code, meta, players, onStart, starting }: Props) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const [showConfig, setShowConfig] = useState(true)
  const [hostName, setHostName] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const config = meta.config
  const issue = configIssue(config, players.length)
  const villagers = Math.max(0, players.length - config.wolves - specialCount(config))
  const link = `${window.location.origin}/play/${code}`

  const isHostPlaying = Boolean(meta.hostUid && players.some((p) => p.uid === meta.hostUid))

  const handleHostJoin = async () => {
    const trimmed = hostName.trim() || 'Chủ làng'
    setIsJoining(true)
    try {
      await joinRoom(code, trimmed, Math.floor(Math.random() * 8))
      setHostName('')
    } finally {
      setIsJoining(false)
    }
  }

  const handleExit = async () => {
    try {
      await deleteRoom(code)
    } catch {}
    navigate('/ma-soi')
  }

  // Khi số người thay đổi mà cấu hình không còn hợp lệ (quá nhiều vai đặc biệt),
  // tự cân lại theo gợi ý — vẫn giữ nguyên thời gian host đã chọn.
  useEffect(() => {
    if (players.length < MIN_PLAYERS) return
    if (!configIssue(meta.config, players.length)) return
    const next: GameConfig = {
      ...suggestConfig(players.length),
      discussSeconds: meta.config.discussSeconds,
      stepSeconds: meta.config.stepSeconds,
      voteSeconds: meta.config.voteSeconds,
    }
    if (JSON.stringify(next) === JSON.stringify(meta.config)) return
    void updateConfig(code, next)
  }, [code, players.length, meta.config])

  const setConfig = (patch: Partial<GameConfig>) => {
    sfx.tap()
    void updateConfig(code, { ...config, ...patch })
  }

  const toggleRole = (role: RoleId) => {
    if (role === 'villager' || role === 'wolf') return
    setConfig({ [role]: !config[role] } as Partial<GameConfig>)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-7xl flex-col px-6 py-6 lg:px-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[0.68rem] tracking-[0.3em] text-mute uppercase">
          <button
            type="button"
            onClick={handleExit}
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[0.72rem] font-medium tracking-normal text-parchment/80 normal-case transition hover:bg-white/10 hover:text-parchment"
            title="Thoát phòng Ma Sói"
          >
            ← Thoát phòng
          </button>
          <Link
            to="/"
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[0.72rem] font-medium tracking-normal text-cyan-400 normal-case transition hover:bg-white/10 hover:text-cyan-300"
            title="Về cổng tất cả game"
          >
            🎲 Tất cả game
          </Link>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet ml-1" />
          Phòng chờ
          {store.mode === 'local' && (
            <span className="rounded-full border border-amber/30 bg-amber/10 px-2 py-0.5 tracking-normal text-amber normal-case">
              offline
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 pr-24 text-[0.7rem] text-mute">
          <span>{players.length} người đã vào</span>
        </div>
      </div>

      <div className="mt-6 grid flex-1 gap-6 lg:grid-cols-[300px_1fr_320px]">
        {/* join panel */}
        <div className="flex flex-col gap-4">
          <div className="glass rounded-3xl p-5 text-center">
            <p className="eyebrow mb-3">Quét để vào</p>
            <div className="mx-auto w-fit rounded-3xl bg-parchment/95 p-2.5">
              <Qr value={link} size={228} />
            </div>
            <p className="mt-5 text-[0.65rem] tracking-[0.32em] text-mute uppercase">Mã phòng</p>
            <p className="display mt-1 text-[3.1rem] leading-none tracking-[0.16em] text-glow">{code}</p>
            <button onClick={copy} className="btn btn-ghost btn-sm mt-4 w-full">
              {copied ? '✓ Đã sao chép' : 'Sao chép liên kết'}
            </button>
          </div>
          <p className="px-1 text-center text-[0.68rem] leading-relaxed text-mute">
            Mở liên kết này trên điện thoại, hoặc quét mã QR bằng camera.
          </p>
        </div>

        {/* players */}
        <div className="glass flex flex-col rounded-3xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-parchment/90">Người chơi</h2>
            <span className="text-[0.68rem] text-mute">{players.length}/16</span>
          </div>

          {players.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-violet/20" />
                <div className="relative grid h-16 w-16 place-items-center rounded-full border border-violet/30 bg-violet/10 text-2xl">
                  📱
                </div>
              </div>
              <div>
                <p className="text-sm text-parchment/70">Đang chờ người chơi đầu tiên…</p>
                <p className="mt-1 text-[0.72rem] text-mute">Đưa điện thoại cho người bên cạnh đi.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence initial={false}>
                {players.map((p, i) => (
                  <motion.div
                    key={p.uid}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    className="flex items-center gap-2.5 rounded-2xl border border-white/8 bg-white/[0.035] px-2.5 py-2"
                  >
                    <Avatar index={p.avatar} size={38} name={p.name} />
                    <div className="min-w-0">
                      <p className="truncate text-[0.8rem] font-medium text-parchment/90">{p.name}</p>
                      <p className="text-[0.6rem] text-mute">#{i + 1}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!isHostPlaying && players.length < 16 && (
            <div className="mt-4 flex gap-2 rounded-2xl border border-violet/30 bg-violet/5 p-3">
              <input
                type="text"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleHostJoin()}
                placeholder="Tên của bạn để cùng chơi…"
                maxLength={14}
                className="flex-1 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={handleHostJoin}
                disabled={isJoining}
                className="rounded-xl bg-violet hover:brightness-110 px-3.5 py-2 text-xs font-bold text-white transition-colors shrink-0"
              >
                {isJoining ? 'Đang vào…' : '+ Chủ phòng tham gia'}
              </button>
            </div>
          )}

          {isHostPlaying && (
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-950/20 px-3.5 py-2 text-xs text-emerald-300">
              <span className="font-semibold">⭐ Bạn đã tham gia vào danh sách người chơi</span>
              <Link
                to={`/play/${code}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1 text-[0.72rem] font-bold text-white transition-colors"
              >
                Mở thẻ vai của bạn (Tab mới) ➔
              </Link>
            </div>
          )}

          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <div className="text-[0.68rem] leading-relaxed text-mute">
              {issue ? (
                <span className="text-amber/90">{issue}</span>
              ) : (
                <>
                  Ván này: <span className="text-blood-soft">{config.wolves} sói</span> ·{' '}
                  <span className="text-violet-soft">{villagers} dân</span> ·{' '}
                  {specialCount(config)} vai đặc biệt
                </>
              )}
            </div>
            <button
              className="btn btn-primary btn-lg shrink-0"
              disabled={Boolean(issue) || starting}
              onClick={onStart}
            >
              {starting ? 'Đang chia vai…' : 'Bắt đầu ván'}
              <span aria-hidden>🌙</span>
            </button>
          </div>
        </div>

        {/* config */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setShowConfig((v) => !v)}
            className="flex items-center justify-between px-1 text-left"
          >
            <span className="text-sm font-semibold text-parchment/90">Tuỳ chỉnh ván</span>
            <span className="text-xs text-mute">{showConfig ? 'Thu gọn' : 'Mở'}</span>
          </button>

          {showConfig && (
            <div className="flex max-h-[calc(100dvh-10rem)] flex-col gap-2 overflow-y-auto pr-1">
              <Stepper
                label="Số Ma Sói"
                value={config.wolves}
                min={1}
                max={Math.max(1, Math.floor(players.length / 3))}
                onChange={(v) => setConfig({ wolves: v })}
              />

              <p className="px-1 pt-1 text-[0.6rem] tracking-[0.18em] text-mute uppercase">Phe làng</p>
              <div className="grid grid-cols-2 gap-2">
                {(['seer', 'witch', 'guard', 'hunter', 'cupid', 'elder', 'fool', 'girl'] as const).map((role) => {
                  const def = ROLES[role]
                  const on = config[role]
                  return (
                    <button
                      key={role}
                      onClick={() => toggleRole(role)}
                      className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition ${
                        on
                          ? 'border-violet/40 bg-violet/12'
                          : 'border-white/8 bg-white/[0.02] opacity-55 hover:opacity-80'
                      }`}
                    >
                      <span className="text-base">{def.icon}</span>
                      <span className="text-[0.72rem] font-medium" style={{ color: on ? def.accent : undefined }}>
                        {def.name}
                      </span>
                    </button>
                  )
                })}
              </div>

              <p className="px-1 pt-1 text-[0.6rem] tracking-[0.18em] text-mute uppercase">Phe sói</p>
              <div className="grid grid-cols-2 gap-2">
                {(['cub', 'wolfwitch', 'whitewolf'] as const).map((role) => {
                  const def = ROLES[role]
                  const on = config[role]
                  return (
                    <button
                      key={role}
                      onClick={() => toggleRole(role)}
                      className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition ${
                        on
                          ? 'border-blood/45 bg-blood/12'
                          : 'border-white/8 bg-white/[0.02] opacity-55 hover:opacity-80'
                      }`}
                    >
                      <span className="text-base">{def.icon}</span>
                      <span className="text-[0.72rem] font-medium" style={{ color: on ? def.accent : undefined }}>
                        {def.name}
                      </span>
                    </button>
                  )
                })}
              </div>

              <p className="px-1 pt-1 text-[0.6rem] tracking-[0.18em] text-mute uppercase">Phe thứ ba</p>
              <div className="grid grid-cols-2 gap-2">
                {(['jester', 'piper', 'killer'] as const).map((role) => {
                  const def = ROLES[role]
                  const on = config[role]
                  return (
                    <button
                      key={role}
                      onClick={() => toggleRole(role)}
                      className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition ${
                        on
                          ? 'border-amber/45 bg-amber/12'
                          : 'border-white/8 bg-white/[0.02] opacity-55 hover:opacity-80'
                      }`}
                    >
                      <span className="text-base">{def.icon}</span>
                      <span className="text-[0.72rem] font-medium" style={{ color: on ? def.accent : undefined }}>
                        {def.name}
                      </span>
                    </button>
                  )
                })}
              </div>

              <p className="px-1 pt-1 text-[0.6rem] tracking-[0.18em] text-mute uppercase">Luật chơi</p>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ['secretVote', 'Bỏ phiếu kín', 'Không hiện phiếu trực tiếp trên màn hình chung'],
                    ['hideRoleOnDeath', 'Ẩn vai khi chết', 'Không công bố vai của người bị treo cổ'],
                    ['peacefulFirstNight', 'Đêm đầu yên bình', 'Đêm 1 không ai bị cắn hay bị giết'],
                  ] as const
                ).map(([key, label, hint]) => {
                  const on = config[key]
                  return (
                    <button
                      key={key}
                      title={hint}
                      onClick={() => setConfig({ [key]: !config[key] } as Partial<GameConfig>)}
                      className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition ${
                        on
                          ? 'border-moon/45 bg-moon/12'
                          : 'border-white/8 bg-white/[0.02] opacity-55 hover:opacity-80'
                      }`}
                    >
                      <span className="text-base">{on ? '🌙' : '○'}</span>
                      <span className="text-[0.72rem] font-medium" style={{ color: on ? '#f4e8c8' : undefined }}>
                        {label}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-1 space-y-2">
                <p className="px-1 text-[0.64rem] tracking-[0.18em] text-mute uppercase">Thảo luận</p>
                <Segmented
                  value={config.discussSeconds}
                  options={[60, 120, 180]}
                  suffix="s"
                  onChange={(v) => setConfig({ discussSeconds: v })}
                />
                <p className="px-1 text-[0.64rem] tracking-[0.18em] text-mute uppercase">Mỗi lượt đêm</p>
                <Segmented
                  value={config.stepSeconds}
                  options={[25, 35, 50]}
                  suffix="s"
                  onChange={(v) => setConfig({ stepSeconds: v })}
                />
                <p className="px-1 text-[0.64rem] tracking-[0.18em] text-mute uppercase">Bỏ phiếu</p>
                <Segmented
                  value={config.voteSeconds}
                  options={[30, 45, 60]}
                  suffix="s"
                  onChange={(v) => setConfig({ voteSeconds: v })}
                />
                <p className="px-2 pt-2 text-[0.8rem] text-mute">
                  {ROLE_ORDER.length} vai · {players.length} người
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
