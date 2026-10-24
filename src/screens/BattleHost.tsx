import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { Qr } from '../ui/Qr'
import { Timer } from '../ui/Timer'
import { BattleGrid } from '../ui/BattleGrid'
import { SfxToggle } from '../ui/SfxToggle'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import { joinUrl } from '../lib/room'
import {
  SB_TURN_SECONDS,
  countHits,
  opponentOf,
  playerOrder,
  sbReset,
  sbStart,
  sbTick,
  validateFleet,
  type Fleet,
  type SbState,
} from '../game/battle'

export default function BattleHost() {
  const { code = '' } = useParams()
  const room = useGameRoom(code)
  const { meta, players, isHost } = room
  const order = useMemo(() => playerOrder(players), [players])
  const [state, setState] = useState<SbState | null>(null)
  const [keys, setKeys] = useState<Record<string, Fleet> | null>(null)
  const [starting, setStarting] = useState(false)
  const busy = useRef(false)

  useEffect(() => {
    if (!code) return
    const unsubs = [
      store.sub<SbState>(paths.sb(code), (v) => setState(v)),
      store.sub<Record<string, Fleet>>(paths.sbKeys(code), (v) => setKeys(v ?? {})),
    ]
    return () => unsubs.forEach((fn) => fn())
  }, [code])

  useEffect(() => {
    if (!isHost || !state) return
    const id = setInterval(() => {
      if (busy.current) return
      busy.current = true
      void sbTick({ code, meta: meta!, players, state, keys, now: Date.now() }).finally(() => {
        busy.current = false
      })
    }, 400)
    return () => clearInterval(id)
  }, [code, isHost, state, keys, players, meta])

  const start = async () => {
    setStarting(true)
    try {
      if (state) await sbReset(code)
      await sbStart(code, players)
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

  const link = joinUrl(code)

  return (
    <Stage>
      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-6 py-6 lg:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[0.68rem] tracking-[0.3em] text-mute uppercase">
            <Link
              to="/sea-battle"
              className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[0.72rem] font-medium tracking-normal text-parchment/80 normal-case transition hover:bg-white/10 hover:text-parchment"
            >
              ← Thoát phòng
            </Link>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7be0c0]" />
            Hải chiến
            <span className="rounded-full border border-white/10 px-2 py-0.5 tracking-normal text-mute normal-case">{code}</span>
          </div>
          <div className="flex items-center gap-3 pr-2">
            {store.mode === 'local' && (
              <span className="rounded-full border border-amber/30 bg-amber/10 px-2 py-0.5 text-[0.62rem] text-amber">offline</span>
            )}
            <SfxToggle />
          </div>
        </div>

        {/* lobby + placement */}
        {(!state || state.phase === 'place') && (
          <div className="mt-6 grid flex-1 gap-6 lg:grid-cols-[320px_1fr]">
            <div className="glass rounded-3xl p-5 text-center">
              <p className="eyebrow mb-3">Quét để vào</p>
              <div className="mx-auto w-fit rounded-3xl bg-parchment/95 p-2.5">
                <Qr value={link} size={220} />
              </div>
              <p className="mt-5 text-[0.65rem] tracking-[0.32em] text-mute uppercase">Mã phòng</p>
              <p className="display mt-1 text-[2.6rem] leading-none tracking-[0.16em] text-glow">{code}</p>
              <p className="mt-4 text-[0.68rem] leading-relaxed text-mute">Trận đấu cần đúng 2 người chơi.</p>
            </div>

            <div className="glass flex flex-col rounded-3xl p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-parchment/90">Người chơi</h2>
                <span className="text-[0.68rem] text-mute">{order.length}/2</span>
              </div>

              {order.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
                  <div className="text-4xl">🚢</div>
                  <p className="text-sm text-parchment/70">Đang chờ hai thuyền trưởng…</p>
                  <p className="text-[0.72rem] text-mute">Mỗi người mở link trên điện thoại của mình.</p>
                </div>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {order.map((id, i) => {
                    const p = players[id]
                    const fleet = keys?.[id]
                    const ready = !validateFleet(fleet ?? null)
                    return (
                      <motion.div
                        key={id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.035] px-3 py-2.5"
                      >
                        <Avatar index={p.avatar} size={38} name={p.name} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[0.8rem] font-medium text-parchment/90">{p.name}</p>
                          <p className="text-[0.6rem] text-mute">
                            Đội {i + 1} · {state ? (ready ? 'đã đặt tàu' : 'đang đặt tàu') : 'đã vào phòng'}
                          </p>
                        </div>
                        {state && <span className="text-lg">{ready ? '✅' : '⏳'}</span>}
                      </motion.div>
                    )
                  })}
                </div>
              )}

              <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                <p className="max-w-sm text-[0.68rem] leading-relaxed text-mute">
                  {state
                    ? 'Hai người đặt 4 tàu trên lưới 8×8. Khi cả hai sẵn sàng, trận đấu bắt đầu.'
                    : 'Mỗi người có 4 tàu: 1×4 ô, 2×3 ô, 1×2 ô. Bắn trúng thì được bắn tiếp.'}
                </p>
                <button
                  className="btn btn-primary btn-lg shrink-0"
                  disabled={order.length !== 2 || starting}
                  onClick={() => void start()}
                >
                  {starting ? 'Đang mở trận…' : state ? 'Bắt đầu lại' : 'Bắt đầu'}
                  <span aria-hidden>⚓</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* battle */}
        {state && state.phase === 'battle' && (
          <div className="mt-6 flex flex-1 flex-col">
            <div className="flex items-center justify-center gap-4">
              {order.map((id) => {
                const p = players[id]
                const active = state.turn === id
                return (
                  <div
                    key={id}
                    className={`flex items-center gap-2.5 rounded-full border px-4 py-1.5 transition ${
                      active ? 'border-[#7be0c0]/45 bg-[#7be0c0]/10' : 'border-white/8 opacity-60'
                    }`}
                  >
                    <Avatar index={p.avatar} size={26} name={p.name} />
                    <span className="text-[0.78rem] text-parchment/85">{p.name}</span>
                    <span className="text-[0.66rem] text-mute">{countHits(state.shots[id])} trúng</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <p className="text-[0.72rem] text-mute">
                Lượt của <span className="text-parchment/85">{players[state.turn ?? '']?.name}</span>
              </p>
              {state.turnEndsAt > 0 && (
                <Timer endsAt={state.turnEndsAt} total={SB_TURN_SECONDS * 1000} size={40} tone="moon" />
              )}
            </div>

            <div className="mt-5 grid flex-1 gap-6 sm:grid-cols-2">
              {order.map((id) => {
                const enemy = opponentOf(order, id)
                return (
                  <div key={id} className="glass rounded-3xl p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar index={players[id].avatar} size={28} name={players[id].name} />
                        <span className="text-[0.78rem] text-parchment/85">{players[id].name}</span>
                      </div>
                      <span className={`text-[0.62rem] ${state.turn === id ? 'text-[#7be0c0]' : 'text-mute'}`}>
                        {state.turn === id ? 'đang bắn' : 'chờ'}
                      </span>
                    </div>
                    <BattleGrid shots={state.shots[id]} accent="#7be0c0" />
                    <p className="mt-2 text-center text-[0.6rem] text-mute">
                      bắn vào vùng biển của {enemy ? players[enemy]?.name : 'đối thủ'}
                    </p>
                  </div>
                )
              })}
            </div>

            {state.last && (
              <p className="mt-4 text-center text-[0.7rem] text-mute">
                {players[state.last.by]?.name} bắn ô {state.last.x + 1}·{state.last.y + 1} —{' '}
                <span className={state.last.hit ? 'text-blood-soft' : 'text-mute'}>
                  {state.last.hit ? 'trúng' : 'trượt'}
                </span>
                {state.last.sunk && <span className="text-amber"> · chìm tàu!</span>}
              </p>
            )}
          </div>
        )}

        {/* over */}
        {state && state.phase === 'over' && (
          <div className="mt-8 flex flex-1 flex-col items-center">
            <p className="eyebrow mb-3">Kết thúc</p>
            <h1 className="display text-center text-[clamp(2rem,5vw,3.4rem)]">
              <span className="grad-moon">{players[state.winner ?? '']?.name ?? 'Ai đó'} thắng.</span>
            </h1>
            <p className="mt-2 text-sm text-mute">Toàn bộ hạm đội đã bị đánh chìm.</p>

            <div className="mt-7 grid w-full gap-5 sm:grid-cols-2">
              {order.map((id) => {
                const enemy = opponentOf(order, id)
                return (
                  <div key={id} className="glass rounded-3xl p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Avatar index={players[id].avatar} size={28} name={players[id].name} />
                      <span className="text-[0.8rem] text-parchment/85">{players[id].name}</span>
                      {state.winner === id && <span>👑</span>}
                    </div>
                    <BattleGrid fleet={keys?.[id] ?? null} shots={state.shots[enemy ?? '']} dimShips />
                  </div>
                )
              })}
            </div>

            <div className="mt-7 flex gap-2">
              <button className="btn btn-primary btn-md" onClick={() => void start()}>
                Ván mới
              </button>
              <Link to="/" className="btn btn-ghost btn-md">
                Trang chủ
              </Link>
            </div>
          </div>
        )}
      </div>
    </Stage>
  )
}
