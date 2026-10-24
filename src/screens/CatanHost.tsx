import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { Qr } from '../ui/Qr'
import { SfxToggle } from '../ui/SfxToggle'
import { CatanBoard } from '../ui/CatanBoard'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import { joinUrl, joinRoom, deleteRoom } from '../lib/room'
import { sfx } from '../lib/sfx'
import {
  catanStart,
  catanTick,
  type CatanState,
} from '../game/catanEngine'

export default function CatanHost() {
  const { code = '' } = useParams()
  const navigate = useNavigate()
  const room = useGameRoom(code)
  const { uid, players, isHost } = room

  const [state, setState] = useState<CatanState | null>(null)
  const [hostName, setHostName] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const busy = useRef(false)

  const url = joinUrl(code)
  const order = useMemo(
    () => Object.keys(players).sort((a, b) => (players[a]?.joinedAt ?? 0) - (players[b]?.joinedAt ?? 0)),
    [players]
  )
  const isHostPlaying = Boolean(uid && players[uid])

  useEffect(() => {
    if (!code) return
    const unsub = store.sub<CatanState>(paths.catan(code), (v) => setState(v))
    return () => unsub()
  }, [code])

  // Tick loop fallback 400ms
  useEffect(() => {
    if (!isHost || !state) return
    const id = setInterval(() => {
      if (busy.current) return
      busy.current = true
      void catanTick(code, state, Date.now()).finally(() => {
        busy.current = false
      })
    }, 400)
    return () => clearInterval(id)
  }, [code, isHost, state])

  const handleHostJoin = async () => {
    const trimmed = hostName.trim() || 'Chủ phòng'
    setIsJoining(true)
    try {
      await joinRoom(code, trimmed, Math.floor(Math.random() * 8))
      setHostName('')
    } finally {
      setIsJoining(false)
    }
  }

  const handleExitRoom = async () => {
    try {
      await deleteRoom(code)
    } catch {}
    navigate('/catan')
  }

  const handleStart = async () => {
    if (order.length < 2 || isStarting) return
    setIsStarting(true)
    try {
      sfx.win()
      await catanStart(code, players)
    } finally {
      setIsStarting(false)
    }
  }

  // Lobby
  if (!state || state.phase === 'lobby') {
    return (
      <Stage>
        <div className="mx-auto flex h-dvh max-w-5xl flex-col justify-between p-4 sm:p-6 overflow-hidden">
          <header className="flex items-center justify-between pb-3 border-b border-emerald-900/60 shrink-0">
            <button
              type="button"
              onClick={handleExitRoom}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              ← Thoát phòng
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌾</span>
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
                PHÒNG CHỜ ĐẢO CATAN MINI
              </span>
            </div>
            <SfxToggle />
          </header>

          <main className="flex-1 flex items-center justify-center my-auto overflow-hidden py-2">
            <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-900/90 p-5 border border-emerald-500/40 shadow-[0_8px_32px_rgba(16,185,129,0.2)] backdrop-blur-md text-center">
                <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
                  MÃ VÀO ĐẢO CATAN
                </p>
                <h1 className="mt-0.5 font-mono text-4xl sm:text-5xl font-black tracking-widest text-white drop-shadow-md">
                  {code}
                </h1>

                <div className="mt-3 flex justify-center">
                  <div className="rounded-2xl bg-white p-2.5 shadow-lg">
                    <Qr value={url} size={130} />
                  </div>
                </div>

                <p className="mt-3 text-[0.7rem] text-slate-300 font-medium leading-relaxed">
                  Quét mã để tham gia khai phá hòn đảo
                </p>
              </div>

              <div className="flex flex-col justify-between rounded-3xl bg-slate-900/80 p-5 border border-slate-800 backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <span className="text-xs font-bold text-slate-200">
                      Nhà thám hiểm ({order.length}/4)
                    </span>
                    <span className="text-[0.68rem] text-emerald-400 font-semibold">
                      Tối thiểu 2 người
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-44 sm:max-h-48 overflow-y-auto pr-1">
                    {order.map((pUid) => {
                      const p = players[pUid]
                      return (
                        <div
                          key={pUid}
                          className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-2.5"
                        >
                          <Avatar index={p?.avatar ?? 0} size={32} name={p?.name} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-bold text-white">{p?.name}</p>
                            <span className="text-[0.6rem] font-extrabold text-emerald-400">
                              Đã sẵn sàng
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {!isHostPlaying && order.length < 4 && (
                    <div className="mt-4 flex gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-2.5">
                      <input
                        type="text"
                        value={hostName}
                        onChange={(e) => setHostName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleHostJoin()}
                        placeholder="Tên của bạn để cùng chơi…"
                        maxLength={14}
                        className="flex-1 rounded-xl border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                      <button
                        onClick={handleHostJoin}
                        disabled={isJoining}
                        className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white transition-colors shrink-0"
                      >
                        {isJoining ? 'Đang vào…' : '+ Chủ phòng chơi'}
                      </button>
                    </div>
                  )}

                  {isHostPlaying && (
                    <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-3 py-1.5 text-xs text-emerald-300">
                      <span>⭐ Bạn đã vào đảo</span>
                      <Link
                        to={`/play/${code}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-emerald-600 px-2 py-0.5 text-[0.68rem] font-bold text-white hover:bg-emerald-500"
                      >
                        Mở kho tài nguyên (Tab mới) ➔
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={handleStart}
                    disabled={order.length < 2 || isStarting}
                    className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-3.5 text-sm font-black text-white shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-40"
                  >
                    {isStarting ? 'Đang mở bản đồ đảo…' : 'BẮT ĐẦU KHAI PHÁ CATAN! 🌾'}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Stage>
    )
  }

  // Active Screen
  const currentTurnUid = state.currentTurn
  const currentTurnPlayer = currentTurnUid ? players[currentTurnUid] : null
  const currentPState = currentTurnUid ? state.players[currentTurnUid] : null

  return (
    <Stage>
      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-4 pb-12 sm:px-6">
        <header className="flex items-center justify-between py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-1.5 border border-slate-800">
              <span className="text-xs">📱</span>
              <span className="font-mono text-xs font-black text-emerald-400">{code}</span>
            </div>
            <span className="rounded-full bg-emerald-950/80 px-2.5 py-0.5 text-[0.65rem] font-black text-emerald-300 border border-emerald-800">
              ĐẢO CATAN MINI
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isHostPlaying && (
              <Link
                to={`/play/${code}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-emerald-600/30 border border-emerald-500/40 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-600/50 transition-all"
              >
                🎮 Mở kho của bạn ➔
              </Link>
            )}
            <SfxToggle />
          </div>
        </header>

        <main className="mt-4 flex flex-1 flex-col lg:flex-row gap-6 items-center justify-center">
          {/* Catan Board */}
          <div className="flex-1 flex justify-center w-full">
            <CatanBoard
              players={state.players}
              currentTurnUid={state.currentTurn}
              dice1={state.dice1}
              dice2={state.dice2}
            />
          </div>

          {/* Right Info: Turn, Scores, Resources */}
          <div className="w-full lg:w-80 flex flex-col gap-4">
            <div className="rounded-3xl bg-slate-900/80 p-5 border border-slate-800 shadow-xl backdrop-blur-md">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                LƯỢT ĐI HIỆN TẠI
              </p>
              <div className="mt-2 flex items-center gap-3">
                <Avatar index={currentTurnPlayer?.avatar ?? 0} size={42} name={currentTurnPlayer?.name} />
                <div>
                  <h3 className="text-lg font-black text-white">{currentTurnPlayer?.name}</h3>
                  <span className="text-xs font-extrabold text-emerald-400">
                    Điểm chiến thắng: {currentPState?.victoryPoints ?? 0}/5 🏆
                  </span>
                </div>
              </div>

              {/* Trạng thái thu hoạch xúc xắc */}
              <div className="mt-4">
                {!state.diceRolled ? (
                  <div className="rounded-2xl bg-slate-950/60 p-3 text-center border border-slate-800 text-xs text-slate-300">
                    ⏳ Đang chờ <span className="text-emerald-400 font-bold">{currentTurnPlayer?.name}</span> gieo xúc xắc thu hoạch mùa màng…
                  </div>
                ) : (
                  <div className="rounded-2xl bg-slate-950/60 p-3 text-center border border-slate-800 text-xs text-amber-300 font-bold">
                    🌾 Xúc xắc ra số [{state.dice1! + state.dice2!}], các ô tương ứng đã phát tài nguyên!
                  </div>
                )}
              </div>
            </div>

            {/* Bảng Xếp Hạng Điểm */}
            <div className="rounded-3xl bg-slate-900/80 p-4 border border-slate-800">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">
                BẢNG ĐIỂM THUỘC ĐỊA
              </p>
              <div className="space-y-2">
                {state.order.map((pUid) => {
                  const p = state.players[pUid]
                  if (!p) return null

                  return (
                    <div
                      key={pUid}
                      className="flex items-center justify-between rounded-xl bg-slate-950/40 p-2.5 border border-slate-800/80"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-xs font-bold text-slate-200">{p.name}</span>
                      </div>
                      <span className="text-xs font-black text-amber-400">
                        {p.victoryPoints}/5 Điểm 🏆
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Live Logs */}
            <div className="rounded-3xl bg-slate-900/80 p-4 border border-slate-800 max-h-52 overflow-y-auto">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">
                NHẬT KÝ THU HOẠCH & XÂY DỰNG
              </p>
              <div className="space-y-1.5 text-[0.7rem] text-slate-300">
                {state.logs.map((log) => (
                  <p key={log.id} className="leading-relaxed">
                    {log.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Winner modal */}
        <AnimatePresence>
          {state.phase === 'over' && state.winner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-md rounded-3xl bg-slate-900 p-6 text-center border-2 border-emerald-500 shadow-2xl"
              >
                <span className="text-5xl block mb-2">👑</span>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  BÁ CHỦ ĐẢO CATAN VÔ ĐỊCH
                </p>
                <h2 className="mt-1 text-3xl font-black text-white">
                  {state.players[state.winner]?.name}
                </h2>
                <p className="mt-2 text-xs text-slate-300">
                  Đã đạt đủ 5 Điểm Chiến Thắng và thống nhất toàn bộ thuộc địa!
                </p>

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={handleStart}
                    className="rounded-2xl bg-emerald-600 px-6 py-2.5 text-xs font-black text-white hover:bg-emerald-500"
                  >
                    Ván Đảo Mới 🔄
                  </button>
                  <Link
                    to="/"
                    className="rounded-2xl bg-slate-800 px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white"
                  >
                    Trang chủ
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stage>
  )
}
