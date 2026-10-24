import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { useRoom } from '../hooks/useRoom'
import { actorsFor, currentStep, hostTick, startGame } from '../game/conductor'
import { resetToLobby } from '../lib/room'
import { LobbyView } from '../host/LobbyView'
import { NightView } from '../host/NightView'
import { DawnView, DiscussView, HunterView, VerdictView, VoteView } from '../host/DayView'
import { OverView } from '../host/OverView'
import { phaseLabel, type Room } from '../game/types'
import { sfx, sfxEnabled, setSfxEnabled } from '../lib/sfx'

function Spinner() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-violet" />
        <p className="text-xs tracking-[0.25em] text-mute uppercase">đang kết nối</p>
      </div>
    </div>
  )
}

export default function Host() {
  const { code = '' } = useParams()
  const navigate = useNavigate()
  const room = useRoom(code, 'host')
  const [starting, setStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sound, setSound] = useState(sfxEnabled())
  const busy = useRef(false)
  const latest = useRef(room)
  useEffect(() => {
    latest.current = room
  }, [room])

  const meta = room.meta
  const isHostPlaying = Boolean(room.uid && room.players.some((p) => p.uid === room.uid))

  /* host-authoritative loop */
  useEffect(() => {
    if (!room.isHost) return
    const id = window.setInterval(() => {
      const r = latest.current
      if (!r.meta || busy.current) return
      const alivePlayers = r.players.filter((p) => p.alive)
      if (!alivePlayers.length) return
      const snapshot: Room = {
        meta: r.meta,
        players: Object.fromEntries(r.players.map((p) => [p.uid, p])),
        votes: r.votes,
      }
      busy.current = true
      hostTick({
        code,
        room: snapshot,
        secrets: r.secrets,
        actions: r.actions,
        night: r.night,
        now: Date.now(),
      })
        .catch(() => undefined)
        .finally(() => {
          busy.current = false
        })
    }, 400)
    return () => window.clearInterval(id)
  }, [code, room.isHost])

  /* ambient sound on phase change */
  const prevPhase = useRef<string | null>(null)
  useEffect(() => {
    if (!meta) return
    if (prevPhase.current === meta.phase) return
    const first = prevPhase.current === null
    prevPhase.current = meta.phase
    if (first) return
    if (meta.phase === 'night') sfx.night()
    else if (meta.phase === 'dawn' && meta.lastDeaths.length) sfx.death()
    else if (meta.phase === 'over') sfx.win()
  }, [meta])

  useEffect(() => {
    document.title = meta ? `Ma Sói · ${code} · ${phaseLabel[meta.phase]}` : 'Ma Sói'
  }, [meta, code])

  const start = async () => {
    if (!room.players.length) return
    setStarting(true)
    setError(null)
    try {
      await startGame(code, room.players, meta!.config)
      sfx.reveal()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setStarting(false)
    }
  }

  const replay = async () => {
    await resetToLobby(code, room.players)
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void document.documentElement.requestFullscreen().catch(() => undefined)
  }

  if (room.loading) {
    return (
      <Stage>
        <Spinner />
      </Stage>
    )
  }

  if (room.missing) {
    return (
      <Stage>
        <div className="grid min-h-dvh place-items-center px-6 text-center">
          <div>
            <p className="display text-3xl text-parchment/80">Không tìm thấy phòng</p>
            <p className="mt-3 text-sm text-mute">Mã phòng có thể đã hết hạn hoặc bị xoá.</p>
            <Link to="/" className="btn btn-primary btn-md mt-6">
              Về trang chủ
            </Link>
          </div>
        </div>
      </Stage>
    )
  }

  if (!room.isHost) {
    return (
      <Stage>
        <div className="grid min-h-dvh place-items-center px-6 text-center">
          <div>
            <p className="display text-3xl text-parchment/80">Đây là màn hình chung</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute">
              Chỉ thiết bị đã tạo phòng mới điều khiển được màn hình này. Bạn hãy vào bằng điện thoại.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <Link to={`/play/${code}`} className="btn btn-primary btn-md">
                Vào phòng bằng điện thoại
              </Link>
              <Link to="/" className="btn btn-ghost btn-md">
                Trang chủ
              </Link>
            </div>
          </div>
        </div>
      </Stage>
    )
  }

  if (!meta) {
    return (
      <Stage>
        <Spinner />
      </Stage>
    )
  }

  const step = currentStep(meta)
  let done = 0
  let total = 0
  if (step) {
    const actors = actorsFor(step, { meta, players: Object.fromEntries(room.players.map((p) => [p.uid, p])), votes: room.votes }, room.secrets)
    total = actors.length
    done = actors.filter((uid) => {
      const a = room.actions[uid]
      if (step === 'wolves') return Boolean(a?.wolfVote)
      if (step === 'guard') return Boolean(a?.guard)
      if (step === 'seer') return Boolean(a?.seer)
      return a?.witchDone === true
    }).length
  }

  const stageMode: 'night' | 'day' | 'blood' =
    meta.phase === 'dawn' || meta.phase === 'discuss' || meta.phase === 'vote'
      ? 'day'
      : meta.phase === 'hunter' || (meta.phase === 'over' && meta.winner === 'wolf')
        ? 'blood'
        : 'night'

  return (
    <Stage mode={stageMode}>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between p-4">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/8 bg-night-950/60 px-3 py-1.5 text-[0.62rem] tracking-[0.22em] text-mute backdrop-blur-md uppercase">
          <span className={`h-1.5 w-1.5 rounded-full ${meta.phase === 'lobby' ? 'bg-violet' : 'bg-amber'}`} />
          {code} · {phaseLabel[meta.phase]}
        </div>
        {meta.phase !== 'lobby' && isHostPlaying && (
          <div className="pointer-events-auto">
            <a
              href={`/play/${code}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet to-fuchsia-600 px-3.5 py-1.5 text-[0.72rem] font-bold text-white shadow-lg transition-all hover:brightness-110"
            >
              <span>🎭</span>
              <span>Mở thẻ vai & bảng vote của bạn ➔</span>
            </a>
          </div>
        )}
        <div className="pointer-events-auto flex items-center gap-1.5">
          <button
            onClick={toggleFullscreen}
            className="btn btn-ghost btn-sm"
            title="Toàn màn hình"
          >
            ⛶
          </button>
          <button
            onClick={() => {
              const next = !sound
              setSfxEnabled(next)
              setSound(next)
            }}
            className="btn btn-ghost btn-sm"
            title="Âm thanh"
          >
            {sound ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={meta.phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {meta.phase === 'lobby' && (
            <LobbyView
              code={code}
              meta={meta}
              players={room.players}
              onStart={start}
              starting={starting}
            />
          )}

          {meta.phase === 'reveal' && (
            <div className="flex min-h-dvh flex-col items-center justify-center px-8 text-center">
              <p className="eyebrow mb-5">Chia vai</p>
              <h1 className="display text-[clamp(2.4rem,5.6vw,4rem)] text-glow">
                <span className="grad-moon">Mỗi người nhìn vào</span>
                <br />
                <span className="text-parchment/90">điện thoại của mình.</span>
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment/55">
                Không ai được cho người khác xem vai. Khi tất cả đã đọc xong, đêm đầu tiên sẽ bắt đầu.
              </p>
              <div className="mt-9 flex items-center gap-2">
                {room.players.map((p) => (
                  <motion.div
                    key={p.uid}
                    animate={{ scale: p.ready ? 1 : 0.92, opacity: p.ready ? 1 : 0.45 }}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-xs"
                  >
                    {p.ready ? '✓' : '…'}
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 text-[0.68rem] tracking-[0.2em] text-mute uppercase">
                {room.players.filter((p) => p.ready).length}/{room.players.length} đã xem
              </p>
            </div>
          )}

          {meta.phase === 'night' && (
            <NightView meta={meta} players={room.players} done={done} total={total} />
          )}
          {meta.phase === 'dawn' && <DawnView meta={meta} players={room.players} />}
          {meta.phase === 'discuss' && <DiscussView meta={meta} players={room.players} />}
          {meta.phase === 'vote' && (
            <VoteView meta={meta} players={room.players} votes={room.votes} />
          )}
          {meta.phase === 'verdict' && <VerdictView meta={meta} players={room.players} />}
          {meta.phase === 'hunter' && <HunterView meta={meta} players={room.players} />}
          {meta.phase === 'over' && (
            <OverView
              meta={meta}
              players={room.players}
              secrets={room.secrets}
              onReplay={replay}
              onLeave={() => navigate('/')}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {error && (
        <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full bg-blood/90 px-4 py-2 text-xs text-white">
          {error}
        </div>
      )}
    </Stage>
  )
}
