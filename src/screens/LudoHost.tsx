import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { Qr } from '../ui/Qr'
import { SfxToggle } from '../ui/SfxToggle'
import { LudoBoard } from '../ui/LudoBoard'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import { joinUrl, joinRoom, deleteRoom } from '../lib/room'
import { sfx } from '../lib/sfx'
import {
  ludoStart,
  ludoMoveToken,
  ludoTick,
  COLOR_CONFIG,
  type LudoColor,
  type LudoState,
} from '../game/ludoEngine'

export default function LudoHost() {
  const { code = '' } = useParams()
  const navigate = useNavigate()
  const room = useGameRoom(code)
  const { uid, players, isHost } = room

  const [state, setState] = useState<LudoState | null>(null)
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
    const unsub = store.sub<LudoState>(paths.ludo(code), (v) => setState(v))
    return () => unsub()
  }, [code])

  // Conductor tick loop: Chạy mỗi 400ms
  useEffect(() => {
    if (!isHost || !state) return
    const id = setInterval(() => {
      if (busy.current) return
      busy.current = true
      void ludoTick(code, state, Date.now()).finally(() => {
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
    navigate('/ludo')
  }

  const handleStart = async () => {
    if (order.length < 2 || isStarting) return
    setIsStarting(true)
    try {
      sfx.win()
      await ludoStart(code, players)
    } finally {
      setIsStarting(false)
    }
  }

  // Lobby Screen
  if (!state || state.phase === 'lobby') {
    return (
      <Stage>
        <div className="mx-auto flex h-dvh max-w-5xl flex-col justify-between p-4 sm:p-6 overflow-hidden">
          <header className="flex items-center justify-between pb-3 border-b border-amber-900/60 shrink-0">
            <button
              type="button"
              onClick={handleExitRoom}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              ← Thoát phòng
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl">🐴</span>
              <span className="text-xs font-black tracking-widest text-amber-400 uppercase">
                PHÒNG CHỜ CỜ CÁ NGỰA
              </span>
            </div>
            <SfxToggle />
          </header>

          <main className="flex-1 flex items-center justify-center my-auto overflow-hidden py-2">
            <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              {/* Left Column: Room Code & QR */}
              <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-900/90 p-5 border border-amber-500/40 shadow-[0_8px_32px_rgba(245,158,11,0.2)] backdrop-blur-md text-center">
                <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
                  MÃ VÀO PHÒNG
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
                  Quét mã để tham gia bàn đua cá ngựa
                </p>
              </div>

              {/* Right Column: Players List & Start */}
              <div className="flex flex-col justify-between rounded-3xl bg-slate-900/80 p-5 border border-slate-800 backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <span className="text-xs font-bold text-slate-200">
                      Cơ thủ đã vào ({order.length}/4)
                    </span>
                    <span className="text-[0.68rem] text-amber-400 font-semibold">
                      Tối thiểu 2 người
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-44 sm:max-h-48 overflow-y-auto pr-1">
                    {order.map((pUid, idx) => {
                      const p = players[pUid]
                      const color = ['red', 'green', 'yellow', 'blue'][idx] as LudoColor
                      const cfg = COLOR_CONFIG[color]

                      return (
                        <div
                          key={pUid}
                          className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-2.5"
                        >
                          <Avatar index={p?.avatar ?? 0} size={32} name={p?.name} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-bold text-white">{p?.name}</p>
                            <span className={`text-[0.6rem] font-extrabold ${cfg.text}`}>
                              Phe {cfg.name}
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
                      <span>⭐ Bạn đã tham gia vào ván đấu</span>
                      <Link
                        to={`/play/${code}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-emerald-600 px-2 py-0.5 text-[0.68rem] font-bold text-white hover:bg-emerald-500"
                      >
                        Mở tay cầm (Tab mới) ➔
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={handleStart}
                    disabled={order.length < 2 || isStarting}
                    className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 py-3.5 text-sm font-black text-white shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isStarting ? 'Đang chuẩn bị đường đua…' : 'BẮT ĐẦU VÁN ĐUA! 🐴'}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Stage>
    )
  }

  // Active Playfield Screen
  const currentTurnUid = state.currentTurn
  const currentTurnPlayer = currentTurnUid ? players[currentTurnUid] : null
  const currentTurnState = currentTurnUid ? state.players[currentTurnUid] : null
  const currentCfg = currentTurnState ? COLOR_CONFIG[currentTurnState.color] : null

  return (
    <Stage>
      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-4 pb-12 sm:px-6">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-1.5 border border-slate-800">
              <span className="text-xs">📱</span>
              <span className="font-mono text-xs font-black text-amber-400">{code}</span>
            </div>
            <span className="rounded-full bg-amber-950/80 px-2.5 py-0.5 text-[0.65rem] font-black text-amber-300 border border-amber-800">
              CÁ NGỰA CHIẾN THUẬT
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
                🎮 Mở tay cầm của bạn ➔
              </Link>
            )}
            <SfxToggle />
          </div>
        </header>

        {/* Main Play Area: Board & Status Info */}
        <main className="mt-4 flex flex-1 flex-col lg:flex-row gap-6 items-center justify-center">
          {/* Left / Center: Ludo Board */}
          <div className="flex-1 flex justify-center w-full">
            <LudoBoard
              players={state.players}
              currentTurnUid={state.currentTurn}
              myUid={uid}
              diceValue={state.diceValue}
              onTokenClick={(tokenId) => {
                void ludoMoveToken(code, state, tokenId)
              }}
            />
          </div>

          {/* Right: Turn info & Live Event Log */}
          <div className="w-full lg:w-80 flex flex-col gap-4">
            {/* Turn Card */}
            <div className="rounded-3xl bg-slate-900/80 p-5 border border-slate-800 shadow-xl backdrop-blur-md">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                LƯỢT ĐUA HIỆN TẠI
              </p>
              <div className="mt-2 flex items-center gap-3">
                <Avatar index={currentTurnPlayer?.avatar ?? 0} size={42} name={currentTurnPlayer?.name} />
                <div>
                  <h3 className="text-lg font-black text-white">{currentTurnPlayer?.name}</h3>
                  {currentCfg && (
                    <span className={`text-xs font-bold ${currentCfg.text}`}>
                      Chiến mã {currentCfg.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Trạng thái lượt lắc xúc xắc */}
              <div className="mt-4 rounded-2xl bg-slate-950/60 p-3 border border-slate-800 text-center">
                {state.diceRolled ? (
                  <div>
                    <span className="text-[0.68rem] text-slate-400 block font-semibold">KẾT QUẢ ĐỔ XÚC XẮC:</span>
                    <span className="font-mono text-3xl font-black text-amber-400">🎲 {state.diceValue} điểm</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-300 font-medium animate-pulse">
                    📱 Đang chờ <span className="font-bold text-amber-400">{currentTurnPlayer?.name}</span> lắc xúc xắc trên điện thoại…
                  </p>
                )}
              </div>

              {state.canRollAgain && (
                <p className="mt-2 text-center text-xs font-black text-amber-400 animate-pulse">
                  🎉 Đổ được 6! Được đổ thêm 1 lượt nữa!
                </p>
              )}
            </div>

            {/* Bảng Điểm & Ngựa về đích */}
            <div className="rounded-3xl bg-slate-900/80 p-4 border border-slate-800">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">
                BẢNG XẾP HẠNG
              </p>
              <div className="space-y-2">
                {state.order.map((pUid) => {
                  const p = players[pUid]
                  const pSt = state.players[pUid]
                  if (!pSt) return null
                  const cfg = COLOR_CONFIG[pSt.color]

                  return (
                    <div
                      key={pUid}
                      className="flex items-center justify-between rounded-xl bg-slate-950/40 p-2 border border-slate-800/80"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${cfg.bg}`} />
                        <span className="text-xs font-bold text-slate-200">{p?.name}</span>
                      </div>
                      <span className="text-xs font-black text-amber-400">
                        {pSt.score}/2 về đích 🏆
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Live Logs */}
            <div className="rounded-3xl bg-slate-900/80 p-4 border border-slate-800 max-h-52 overflow-y-auto">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">
                DIỄN BIẾN ĐƯỜNG ĐUA
              </p>
              <div className="space-y-1.5 text-[0.7rem]">
                {state.logs.map((log) => (
                  <p
                    key={log.id}
                    className={`leading-relaxed ${
                      log.type === 'kick'
                        ? 'text-rose-400 font-bold'
                        : log.type === 'home'
                        ? 'text-amber-400 font-bold'
                        : 'text-slate-300'
                    }`}
                  >
                    {log.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Modal thông báo chiến thắng */}
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
                  NHÀ VÔ ĐỊCH ĐƯỜNG ĐUA
                </p>
                <h2 className="mt-1 text-3xl font-black text-white">
                  {players[state.winner]?.name}
                </h2>
                <p className="mt-2 text-xs text-slate-300">
                  Đã xuất sắc đưa toàn bộ chiến mã về đích đầu tiên!
                </p>

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={handleStart}
                    className="rounded-2xl bg-amber-500 px-6 py-2.5 text-xs font-black text-slate-950 hover:bg-amber-400"
                  >
                    Ván Đua Mới 🔄
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
