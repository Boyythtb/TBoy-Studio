import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { Qr } from '../ui/Qr'
import { Timer } from '../ui/Timer'
import { SfxToggle } from '../ui/SfxToggle'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import { joinUrl } from '../lib/room'
import { playerOrder, scReset, scStart, scTick, type ScGuess, type ScKey, type ScState } from '../game/secret'
import type { Player } from '../game/types'

function Scoreboard({ state, players, order }: { state: ScState; players: Record<string, Player>; order: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {order.map((uid) => {
        const p = players[uid]
        if (!p) return null
        const active = state.turn === uid
        return (
          <div
            key={uid}
            className={`flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 ${
              active ? 'border-[#7be0c0]/45 bg-[#7be0c0]/10' : 'border-white/8 bg-white/[0.03]'
            }`}
          >
            <Avatar index={p.avatar} size={34} name={p.name} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.76rem] font-medium text-parchment/90">{p.name}</p>
              <p className="text-[0.6rem] text-mute">{state.scores[uid] ?? 0} điểm</p>
            </div>
            {state.winner === uid && <span className="text-sm">👑</span>}
          </div>
        )
      })}
    </div>
  )
}

export default function SecretCodeHost() {
  const { code = '' } = useParams()
  const room = useGameRoom(code)
  const { meta, players, isHost } = room
  const order = useMemo(() => playerOrder(players), [players])
  const [state, setState] = useState<ScState | null>(null)
  const [keys, setKeys] = useState<Record<string, ScKey> | null>(null)
  const [guesses, setGuesses] = useState<Record<string, ScGuess> | null>(null)
  const [targetScore, setTargetScore] = useState(3)
  const [starting, setStarting] = useState(false)
  const busy = useRef(false)

  useEffect(() => {
    if (!code) return
    const unsubs = [
      store.sub<ScState>(paths.sc(code), (v) => setState(v)),
      store.sub<Record<string, ScKey>>(paths.scKeys(code), (v) => setKeys(v ?? {})),
      store.sub<Record<string, ScGuess>>(paths.scGuesses(code), (v) => setGuesses(v ?? {})),
    ]
    return () => unsubs.forEach((fn) => fn())
  }, [code])

  useEffect(() => {
    if (!isHost || !state) return
    const id = setInterval(() => {
      if (busy.current) return
      busy.current = true
      void scTick({ code, meta: meta!, players, state, keys, guesses, now: Date.now() }).finally(() => {
        busy.current = false
      })
    }, 400)
    return () => clearInterval(id)
  }, [code, isHost, state, keys, guesses, players, meta])

  const start = async () => {
    setStarting(true)
    try {
      await scStart(code, players, targetScore, 45)
    } finally {
      setStarting(false)
    }
  }

  if (room.loading) {
    return (
      <Stage>
        <div className="grid min-h-dvh place-items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-[#7be0c0]" />
        </div>
      </Stage>
    )
  }

  if (!meta) {
    return (
      <Stage>
        <div className="grid min-h-dvh place-items-center px-6 text-center">
          <div>
            <p className="display text-2xl text-parchment/85">Không tìm thấy phòng</p>
            <Link to="/" className="btn btn-ghost btn-md mt-6">
              Về trang chủ
            </Link>
          </div>
        </div>
      </Stage>
    )
  }

  if (!isHost) {
    return (
      <Stage>
        <div className="grid min-h-dvh place-items-center px-6 text-center">
          <div className="max-w-sm">
            <p className="text-3xl">🖥️</p>
            <p className="display mt-4 text-2xl text-parchment/85">Đây là màn hình chung</p>
            <p className="mt-2 text-sm text-mute">Chỉ thiết bị đã tạo phòng mới điều khiển được.</p>
            <Link to={`/play/${code}`} className="btn btn-primary btn-md mt-6">
              Vào bằng tư cách người chơi
            </Link>
          </div>
        </div>
      </Stage>
    )
  }

  /* ------------------------------------------------------------------ lobby */
  if (!state) {
    return (
      <Stage>
        <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-6 py-6 lg:px-10">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[0.68rem] tracking-[0.3em] text-mute uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7be0c0]" />
              Phòng chờ · Mật mã
            </div>
            <span className="pr-24 text-[0.7rem] text-mute">{order.length} người</span>
          </header>

          <div className="mt-6 grid flex-1 gap-6 lg:grid-cols-[300px_1fr_320px]">
            <div className="flex flex-col gap-4">
              <div className="glass rounded-3xl p-5 text-center">
                <p className="eyebrow mb-3">Quét để vào</p>
                <div className="mx-auto w-fit rounded-3xl bg-parchment/95 p-2.5">
                  <Qr value={joinUrl(code)} size={228} />
                </div>
                <p className="mt-5 text-[0.65rem] tracking-[0.32em] text-mute uppercase">Mã phòng</p>
                <p className="display mt-1 text-[3.1rem] leading-none tracking-[0.16em] text-glow">{code}</p>
              </div>
              <p className="px-1 text-center text-[0.68rem] leading-relaxed text-mute">
                Mở liên kết trên điện thoại hoặc quét mã QR.
              </p>
            </div>

            <div className="glass flex flex-col rounded-3xl p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-parchment/90">Người chơi</h2>
                <span className="text-[0.68rem] text-mute">{order.length}/8</span>
              </div>
              {order.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full border border-[#7be0c0]/30 bg-[#7be0c0]/10 text-2xl">
                    🔐
                  </div>
                  <p className="text-sm text-parchment/70">Đang chờ người chơi đầu tiên…</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">
                  {order.map((id, i) => {
                    const p = players[id]
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2.5 rounded-2xl border border-white/8 bg-white/[0.035] px-2.5 py-2"
                      >
                        <Avatar index={p.avatar} size={38} name={p.name} />
                        <div className="min-w-0">
                          <p className="truncate text-[0.8rem] font-medium text-parchment/90">{p.name}</p>
                          <p className="text-[0.6rem] text-mute">#{i + 1}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                <p className="text-[0.68rem] leading-relaxed text-mute">
                  {order.length < 2 ? 'Cần ít nhất 2 người để bắt đầu.' : 'Mỗi người sẽ đặt một mật mã 3 số bí mật.'}
                </p>
                <button className="btn btn-primary btn-lg shrink-0" disabled={order.length < 2 || starting} onClick={start}>
                  {starting ? 'Đang bắt đầu…' : 'Bắt đầu'}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="px-1 text-sm font-semibold text-parchment/90">Luật chơi</p>
              <div className="space-y-2">
                <p className="px-1 text-[0.64rem] tracking-[0.18em] text-mute uppercase">Số mật mã để thắng</p>
                <div className="flex gap-1 rounded-xl border border-white/8 bg-white/[0.03] p-1">
                  {[1, 3, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setTargetScore(n)}
                      className={`flex-1 rounded-lg px-2 py-1.5 text-[0.72rem] font-medium transition ${
                        targetScore === n ? 'bg-[#7be0c0] text-night-950' : 'text-parchment/60 hover:bg-white/6'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="glass mt-2 rounded-2xl p-4 text-[0.75rem] leading-relaxed text-parchment/60">
                <p>
                  <span className="text-[#7be0c0]">●</span> Đúng số & đúng vị trí
                </p>
                <p className="mt-1">
                  <span className="text-amber">○</span> Đúng số nhưng sai vị trí
                </p>
                <p className="mt-3 text-mute">Phá được mã của người khác thì ghi 1 điểm. Ai đạt mốc trước sẽ thắng.</p>
              </div>
            </div>
          </div>
        </div>
      </Stage>
    )
  }

  /* ------------------------------------------------------------------- play */
  const current = state.turn ? players[state.turn] : null
  const last = state.last

  return (
    <Stage>
      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-6 py-6 lg:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[0.68rem] tracking-[0.3em] text-mute uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7be0c0]" />
            Mật mã · phòng {code}
          </div>
          <div className="flex items-center gap-2 pr-24">
            <SfxToggle />
          </div>
        </header>

        {state.phase === 'setup' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-1 flex-col justify-center">
            <div className="text-center">
              <p className="eyebrow mb-4">Chuẩn bị</p>
              <h1 className="display text-[clamp(2.4rem,6vw,4rem)]">
                <span className="grad-moon">Đặt mật mã của bạn</span>
              </h1>
              <p className="mt-4 text-sm text-parchment/55">Trên điện thoại, mỗi người chọn 3 chữ số. Đừng cho ai xem.</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {order.map((id) => {
                const p = players[id]
                const ready = (keys?.[id]?.code ?? '').length === 3
                return (
                  <div
                    key={id}
                    className={`flex items-center gap-3 rounded-2xl border px-3 py-3 ${
                      ready ? 'border-[#7be0c0]/40 bg-[#7be0c0]/10' : 'border-white/8 bg-white/[0.03]'
                    }`}
                  >
                    <Avatar index={p.avatar} size={38} name={p.name} />
                    <div className="min-w-0">
                      <p className="truncate text-[0.78rem] text-parchment/90">{p.name}</p>
                      <p className="text-[0.6rem]" style={{ color: ready ? '#7be0c0' : '#9a94b8' }}>
                        {ready ? 'đã sẵn sàng' : 'đang chọn…'}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {state.phase === 'play' && (
          <>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow mb-2">Lượt của</p>
                <h1 className="display text-4xl text-glow">
                  <span className="grad-moon">{current?.name ?? '…'}</span>
                </h1>
              </div>
              {state.turnEndsAt > 0 && (
                <Timer endsAt={state.turnEndsAt} total={state.turnSeconds * 1000} size={72} tone="moon" label="lượt" />
              )}
            </div>

            <div className="mt-6">
              <Scoreboard state={state} players={players} order={order} />
            </div>

            <div className="mt-6 grid flex-1 gap-5 lg:grid-cols-[1fr_360px]">
              <div className="glass flex flex-col rounded-3xl p-6">
                <p className="eyebrow mb-4">Kết quả gần nhất</p>
                {last ? (
                  <motion.div
                    key={last.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-1 flex-col items-center justify-center text-center"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar index={players[last.by]?.avatar ?? 0} size={56} name={players[last.by]?.name} />
                      <div className="text-left">
                        <p className="text-[0.7rem] text-mute">đoán mã của</p>
                        <p className="text-lg font-semibold text-parchment/90">{players[last.target]?.name}</p>
                      </div>
                    </div>
                    <p className="mt-6 font-mono text-4xl tracking-[0.3em] text-parchment/90">{last.guess}</p>
                    <div className="mt-5 flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-[#7be0c0]">{last.bulls}</p>
                        <p className="text-[0.62rem] tracking-[0.16em] text-mute uppercase">đúng vị trí</p>
                      </div>
                      <div className="h-10 w-px bg-white/10" />
                      <div className="text-center">
                        <p className="text-3xl font-bold text-amber">{last.cows}</p>
                        <p className="text-[0.62rem] tracking-[0.16em] text-mute uppercase">sai vị trí</p>
                      </div>
                    </div>
                    {last.cracked && <p className="mt-5 text-sm font-semibold text-[#7be0c0]">Đã phá được mật mã! +1 điểm</p>}
                  </motion.div>
                ) : (
                  <p className="flex flex-1 items-center justify-center text-sm text-mute">Chưa có lượt đoán nào.</p>
                )}
              </div>

              <div className="glass flex flex-col rounded-3xl p-5">
                <p className="eyebrow mb-3">Lịch sử</p>
                <div className="flex-1 space-y-1.5 overflow-y-auto">
                  {state.log.length === 0 && <p className="py-8 text-center text-xs text-mute">Chưa có dữ liệu.</p>}
                  {state.log.slice(0, 12).map((e) => (
                    <div key={e.id} className="flex items-center justify-between gap-2 rounded-xl bg-white/[0.03] px-2.5 py-2">
                      <span className="min-w-0 truncate text-[0.68rem] text-parchment/70">
                        {players[e.by]?.name} → {players[e.target]?.name}
                      </span>
                      <span className="shrink-0 font-mono text-[0.68rem] text-mute">
                        {e.guess} · <span className="text-[#7be0c0]">{e.bulls}</span>/<span className="text-amber">{e.cows}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {state.phase === 'over' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <p className="eyebrow mb-4">Kết thúc</p>
            <div className="text-6xl">👑</div>
            <h1 className="display mt-5 text-[clamp(2.4rem,6vw,4rem)]">
              <span className="grad-moon">{players[state.winner ?? '']?.name ?? 'Ai đó'} thắng</span>
            </h1>
            <p className="mt-3 text-sm text-parchment/55">Đã phá {state.targetScore} mật mã.</p>
            <div className="mt-8 w-full max-w-2xl">
              <Scoreboard state={state} players={players} order={order} />
            </div>
            <div className="mt-8 flex gap-3">
              <button className="btn btn-primary btn-lg" onClick={() => void scReset(code)}>
                Ván mới
              </button>
              <Link to="/" className="btn btn-ghost btn-lg">
                Trang chủ
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </Stage>
  )
}
