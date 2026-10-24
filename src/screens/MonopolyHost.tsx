import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { Qr } from '../ui/Qr'
import { SfxToggle } from '../ui/SfxToggle'
import { MonopolyBoard } from '../ui/MonopolyBoard'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import { joinUrl, joinRoom, deleteRoom } from '../lib/room'
import { sfx } from '../lib/sfx'
import {
  monopolyStart,
  monopolyTick,
  type MonopolyState,
} from '../game/monopolyEngine'

export default function MonopolyHost() {
  const { code = '' } = useParams()
  const navigate = useNavigate()
  const room = useGameRoom(code)
  const { uid, players, isHost } = room

  const [state, setState] = useState<MonopolyState | null>(null)
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
    const unsub = store.sub<MonopolyState>(paths.monopoly(code), (v) => setState(v))
    return () => unsub()
  }, [code])

  // Conductor tick loop: 400ms
  useEffect(() => {
    if (!isHost || !state) return
    const id = setInterval(() => {
      if (busy.current) return
      busy.current = true
      void monopolyTick(code, state, Date.now()).finally(() => {
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
    navigate('/monopoly')
  }

  const handleStart = async () => {
    if (order.length < 2 || isStarting) return
    setIsStarting(true)
    try {
      sfx.win()
      await monopolyStart(code, players)
    } finally {
      setIsStarting(false)
    }
  }

  // Lobby Screen
  if (!state || state.phase === 'lobby') {
    return (
      <Stage>
        <div className="mx-auto flex h-dvh max-w-5xl flex-col justify-between p-4 sm:p-6 overflow-hidden">
          <header className="flex items-center justify-between pb-3 border-b border-yellow-900/60 shrink-0">
            <button
              type="button"
              onClick={handleExitRoom}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              ← Thoát phòng
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎩</span>
              <span className="text-xs font-black tracking-widest text-amber-400 uppercase">
                PHÒNG CHỜ CỜ TỶ PHÚ MINI
              </span>
            </div>
            <SfxToggle />
          </header>

          <main className="flex-1 flex items-center justify-center my-auto overflow-hidden py-2">
            <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              {/* QR Code */}
              <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-900/90 p-5 border border-amber-500/40 shadow-[0_8px_32px_rgba(234,179,8,0.2)] backdrop-blur-md text-center">
                <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
                  MÃ VÀO BÀN TỶ PHÚ
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
                  Quét mã để tham gia ván đấu bất động sản
                </p>
              </div>

              {/* Players List & Start */}
              <div className="flex flex-col justify-between rounded-3xl bg-slate-900/80 p-5 border border-slate-800 backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <span className="text-xs font-bold text-slate-200">
                      Đại gia đã tham gia ({order.length}/4)
                    </span>
                    <span className="text-[0.68rem] text-amber-400 font-semibold">
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
                            <span className="text-[0.6rem] font-extrabold text-amber-400">
                              Vốn 1500$
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {!isHostPlaying && order.length < 4 && (
                    <div className="mt-4 flex gap-2 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-2.5">
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
                        className="rounded-xl bg-amber-500 hover:bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-950 transition-colors shrink-0"
                      >
                        {isJoining ? 'Đang vào…' : '+ Chủ phòng chơi'}
                      </button>
                    </div>
                  )}

                  {isHostPlaying && (
                    <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-3 py-1.5 text-xs text-emerald-300">
                      <span>⭐ Bạn đã vào bàn cờ</span>
                      <Link
                        to={`/play/${code}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-emerald-600 px-2 py-0.5 text-[0.68rem] font-bold text-white hover:bg-emerald-500"
                      >
                        Mở ví tiền (Tab mới) ➔
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={handleStart}
                    disabled={order.length < 2 || isStarting}
                    className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-600 py-3.5 text-sm font-black text-slate-950 shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-40"
                  >
                    {isStarting ? 'Đang chuẩn bị thành phố…' : 'BẮT ĐẦU VÁN CỜ TỶ PHÚ! 🎩'}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Stage>
    )
  }

  // Active Game Screen
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
              <span className="font-mono text-xs font-black text-amber-400">{code}</span>
            </div>
            <span className="rounded-full bg-amber-950/80 px-2.5 py-0.5 text-[0.65rem] font-black text-amber-300 border border-amber-800">
              CỜ TỶ PHÚ MINI
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
                🎮 Mở ví tiền của bạn ➔
              </Link>
            )}
            <SfxToggle />
          </div>
        </header>

        <main className="mt-4 flex flex-1 flex-col lg:flex-row gap-6 items-center justify-center">
          {/* Monopoly Board */}
          <div className="flex-1 flex justify-center w-full">
            <MonopolyBoard
              players={state.players}
              properties={state.properties}
              currentTurnUid={state.currentTurn}
              dice1={state.dice1}
              dice2={state.dice2}
            />
          </div>

          {/* Right Info: Balances & Actions */}
          <div className="w-full lg:w-80 flex flex-col gap-4">
            {/* Current Turn Card */}
            <div className="rounded-3xl bg-slate-900/80 p-5 border border-slate-800 shadow-xl backdrop-blur-md">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                LƯỢT ĐI HIỆN TẠI
              </p>
              <div className="mt-2 flex items-center gap-3">
                <Avatar index={currentTurnPlayer?.avatar ?? 0} size={42} name={currentTurnPlayer?.name} />
                <div>
                  <h3 className="text-lg font-black text-white">{currentTurnPlayer?.name}</h3>
                  <span className="text-xs font-extrabold text-amber-400">
                    Ví tiền: {currentPState?.money ?? 0}$
                  </span>
                </div>
              </div>

              {/* Trạng thái lượt lắc xúc xắc */}
              <div className="mt-4">
                {!state.diceRolled ? (
                  <div className="rounded-2xl bg-slate-950/60 p-3 text-center border border-slate-800 text-xs text-slate-300">
                    ⏳ Đang chờ <span className="text-amber-400 font-bold">{currentTurnPlayer?.name}</span> lắc 2 xúc xắc trên điện thoại…
                  </div>
                ) : (
                  <div className="rounded-2xl bg-slate-950/60 p-3 text-center border border-slate-800 text-xs text-emerald-400 font-bold">
                    🎯 {currentTurnPlayer?.name} đã đổ ra {state.dice1! + state.dice2!} điểm ({state.dice1} + {state.dice2})
                  </div>
                )}
              </div>
            </div>

            {/* Bảng Xếp Hạng Tài Sản */}
            <div className="rounded-3xl bg-slate-900/80 p-4 border border-slate-800">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">
                TÀI SẢN CÁC ĐẠI GIA
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
                        <Avatar index={p.avatar} size={26} name={p.name} />
                        <span className={`text-xs font-bold ${p.bankrupt ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {p.name}
                        </span>
                      </div>
                      <span className={`text-xs font-black ${p.bankrupt ? 'text-rose-500' : 'text-emerald-400'}`}>
                        {p.bankrupt ? 'PHÁ SẢN' : `${p.money}$`}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Live Logs */}
            <div className="rounded-3xl bg-slate-900/80 p-4 border border-slate-800 max-h-52 overflow-y-auto">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">
                THỊ TRƯỜNG ĐÔ THỊ
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
                className="w-full max-w-md rounded-3xl bg-slate-900 p-6 text-center border-2 border-amber-500 shadow-2xl"
              >
                <span className="text-5xl block mb-2">👑</span>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  TRÙM BẤT ĐỘNG SẢN VÔ ĐỊCH
                </p>
                <h2 className="mt-1 text-3xl font-black text-white">
                  {state.players[state.winner]?.name}
                </h2>
                <p className="mt-2 text-xs text-slate-300">
                  Đã thâu tóm toàn bộ đô thị và chiến thắng vẻ vang!
                </p>

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={handleStart}
                    className="rounded-2xl bg-amber-500 px-6 py-2.5 text-xs font-black text-slate-950 hover:bg-amber-400"
                  >
                    Ván Mới 🔄
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
