import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { Qr } from '../ui/Qr'
import { SfxToggle } from '../ui/SfxToggle'
import { MonopolyBoard } from '../ui/MonopolyBoard'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import { joinUrl, joinRoom, deleteRoom, addBotPlayer, removeBotPlayer } from '../lib/room'
import { sfx } from '../lib/sfx'
import {
  monopolyStart,
  monopolyRollDice,
  monopolyBuyProperty,
  monopolyUpgradeProperty,
  monopolyEndTurn,
  monopolyTick,
  MONOPOLY_TILES,
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
  const [isRolling, setIsRolling] = useState(false)
  const [showLogsModal, setShowLogsModal] = useState(false)
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

  const handleAddBot = async () => {
    try {
      sfx.tap()
      await addBotPlayer(code)
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Không thể thêm bot')
    }
  }

  const handleRemoveBot = async (botUid: string) => {
    try {
      sfx.tap()
      await removeBotPlayer(code, botUid)
    } catch {}
  }

  const handleExitRoom = async () => {
    try {
      await deleteRoom(code)
    } catch {}
    navigate('/monopoly')
  }

  const handleStart = async () => {
    if (order.length < 1 || isStarting) return
    setIsStarting(true)
    try {
      sfx.win()
      await monopolyStart(code, players)
    } finally {
      setIsStarting(false)
    }
  }

  const handleHostRollDice = async () => {
    if (!state || state.diceRolled || isRolling) return
    sfx.vote()
    setIsRolling(true)
    setTimeout(async () => {
      try {
        await monopolyRollDice(code, state)
      } finally {
        setIsRolling(false)
      }
    }, 700)
  }

  const handleHostBuy = async () => {
    if (!state) return
    sfx.win()
    await monopolyBuyProperty(code, state)
  }

  const handleHostUpgrade = async () => {
    if (!state) return
    sfx.win()
    await monopolyUpgradeProperty(code, state)
  }

  const handleHostEndTurn = async () => {
    sfx.tap()
    await monopolyEndTurn(code)
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
                    {order.length < 4 && (
                      <button
                        type="button"
                        onClick={handleAddBot}
                        className="rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 px-2.5 py-1 text-[0.7rem] font-bold text-purple-300 transition-all active:scale-95"
                      >
                        + Thêm Bot (AI) 🤖
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-44 sm:max-h-48 overflow-y-auto pr-1">
                    {order.map((pUid) => {
                      const p = players[pUid]
                      const isBot = pUid.startsWith('bot-')
                      return (
                        <div
                          key={pUid}
                          className="relative flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-2.5"
                        >
                          <Avatar index={p?.avatar ?? 0} size={32} name={p?.name} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-bold text-white">{p?.name}</p>
                            <span className="text-[0.62rem] text-amber-400 font-extrabold">
                              1500$ vốn
                            </span>
                          </div>
                          {isBot && (
                            <button
                              type="button"
                              onClick={() => handleRemoveBot(pUid)}
                              className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white flex items-center justify-center text-[0.65rem] font-bold transition-colors"
                              title="Xóa Bot"
                            >
                              ✕
                            </button>
                          )}
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
                      <span>⭐ Bạn đã vào bàn (chơi trực tiếp trên máy này)</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={handleStart}
                    disabled={order.length < 1 || isStarting}
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
  const currentTile = currentPState ? MONOPOLY_TILES[currentPState.position] : null
  const currentProp = currentTile?.propertyId !== undefined ? state.properties[currentTile.propertyId] : null

  const isMyTurn = Boolean(
    currentTurnUid &&
    (currentTurnUid === uid || (!uid && !currentTurnUid.startsWith('bot-')) || (isHost && isHostPlaying && currentTurnUid === uid))
  )

  const latestLog = state.logs[0]

  return (
    <Stage>
      <div className="mx-auto flex h-dvh max-h-screen max-w-7xl flex-col px-2 sm:px-6 pb-2 overflow-hidden select-none justify-between">
        {/* Floating Notification Toast (Hiển thị sự kiện tức thì, tự biến mất) */}
        <AnimatePresence>
          {latestLog && (
            <motion.div
              key={latestLog.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-12 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] pointer-events-none"
            >
              <div className="rounded-full bg-slate-900/95 border border-amber-500/60 px-3.5 py-1 text-[0.7rem] sm:text-xs font-black text-amber-300 shadow-2xl backdrop-blur-md flex items-center gap-1.5 truncate">
                <span>🔔</span>
                <span className="truncate">{latestLog.text}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Compact */}
        <header className="flex items-center justify-between py-1.5 sm:py-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExitRoom}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-900 border border-slate-800"
            >
              ← Rời bàn
            </button>
            <div className="flex items-center gap-1.5 rounded-xl bg-slate-900/80 px-2.5 py-1 border border-slate-800">
              <span className="text-xs">📱</span>
              <span className="font-mono text-xs font-black text-amber-400">{code}</span>
            </div>
          </div>

          {/* Huy hiệu lượt & Ví tiền trên mobile header */}
          <div className="flex items-center gap-2">
            {currentTurnPlayer && (
              <div className="flex items-center gap-1.5 rounded-xl bg-slate-900/90 px-2.5 py-1 border border-amber-500/30">
                <Avatar index={currentTurnPlayer.avatar} size={20} name={currentTurnPlayer.name} />
                <span className="text-xs font-black text-white truncate max-w-[80px]">
                  {currentTurnPlayer.name}
                </span>
                <span className="text-xs font-extrabold text-amber-400">
                  {currentPState?.money ?? 0}$
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowLogsModal(true)}
              className="flex items-center gap-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 text-xs font-bold text-slate-300 transition-colors"
              title="Xem lịch sử thị trường"
            >
              📜 <span className="hidden sm:inline">Nhật ký</span>
            </button>

            <SfxToggle />
          </div>
        </header>

        {/* Main Content Area: Desktop 3-Column / Mobile Single Viewport Zero-Scroll */}
        <main className="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-[290px_1fr_290px] gap-2 lg:gap-5 items-center justify-center my-auto overflow-hidden py-1 w-full">
          {/* CỘT TRÁI (CHỈ HIỂN THỊ TRÊN DESKTOP lg:) */}
          <div className="hidden lg:flex flex-col gap-3 h-full max-h-[calc(100vh-80px)] overflow-y-auto pr-1">
            {/* Current Turn Card */}
            <div className="rounded-3xl bg-slate-900/90 p-4 border border-slate-800 shadow-xl backdrop-blur-md shrink-0">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                LƯỢT ĐI HIỆN TẠI
              </p>
              <div className="mt-2 flex items-center gap-3">
                <Avatar index={currentTurnPlayer?.avatar ?? 0} size={42} name={currentTurnPlayer?.name} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-black text-white truncate">{currentTurnPlayer?.name}</h3>
                  <span className="text-xs font-extrabold text-amber-400">
                    Ví tiền: {currentPState?.money ?? 0}$
                  </span>
                </div>
              </div>

              {/* Trạng thái lượt lắc xúc xắc */}
              <div className="mt-3 rounded-2xl bg-slate-950/70 p-3 border border-slate-800 text-center">
                {!state.diceRolled ? (
                  <p className="text-xs text-slate-300 font-medium animate-pulse">
                    {currentTurnUid?.startsWith('bot-') ? '🤖 Bot đang gieo xúc xắc…' : 'Chờ gieo xúc xắc…'}
                  </p>
                ) : (
                  <div className="text-xs text-emerald-400 font-bold">
                    🎯 Đổ được: {state.dice1! + state.dice2!} điểm ({state.dice1} + {state.dice2})
                  </div>
                )}
              </div>
            </div>

            {/* Bảng Xếp Hạng Tài Sản */}
            <div className="rounded-3xl bg-slate-900/80 p-3.5 border border-slate-800 shrink-0">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">
                TÀI SẢN CÁC ĐẠI GIA
              </p>
              <div className="space-y-1.5">
                {state.order.map((pUid) => {
                  const p = state.players[pUid]
                  if (!p) return null

                  return (
                    <div
                      key={pUid}
                      className="flex items-center justify-between rounded-xl bg-slate-950/40 p-2 border border-slate-800/80"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Avatar index={p.avatar} size={24} name={p.name} />
                        <span className={`text-xs font-bold truncate ${p.bankrupt ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {p.name}
                        </span>
                      </div>
                      <span className={`text-xs font-black shrink-0 ${p.bankrupt ? 'text-rose-500' : 'text-emerald-400'}`}>
                        {p.bankrupt ? 'PHÁ SẢN' : `${p.money}$`}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* CỘT GIỮA: BÀN CỜ MONOPOLY TỰ CO GIÃN THEO KHUNG NHÌN */}
          <div className="flex-1 min-h-0 flex items-center justify-center w-full max-h-[min(480px,56vh)] aspect-square my-auto">
            <MonopolyBoard
              players={state.players}
              properties={state.properties}
              currentTurnUid={state.currentTurn}
              dice1={state.dice1}
              dice2={state.dice2}
              rolling={isRolling}
              lastEvent={state.lastEvent}
              onRollClick={isMyTurn && !state.diceRolled ? handleHostRollDice : undefined}
            />
          </div>

          {/* CỘT PHẢI: THỊ TRƯỜNG ĐÔ THỊ (CHỈ HIỂN THỊ TRÊN DESKTOP lg:) */}
          <div className="hidden lg:flex flex-col gap-3 h-full max-h-[calc(100vh-80px)] overflow-hidden">
            <div className="flex-1 flex flex-col rounded-3xl bg-slate-900/80 p-4 border border-slate-800 min-h-0 overflow-hidden shadow-xl">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2 shrink-0">
                THỊ TRƯỜNG ĐÔ THỊ (LOGS)
              </p>
              <div className="flex-1 space-y-1.5 overflow-y-auto pr-1 text-[0.7rem] text-slate-300">
                {state.logs.map((log) => (
                  <p key={log.id} className="leading-relaxed p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/40">
                    {log.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* 3. BOTTOM ACTION DOCK: CỐ ĐỊNH Ở ĐÁY MÀN HÌNH (NGAY TẦM NGÓN TAY CÁI) */}
        <div className="shrink-0 w-full max-w-md mx-auto pt-1 pb-1">
          {isMyTurn ? (
            !state.diceRolled ? (
              <button
                onClick={handleHostRollDice}
                disabled={isRolling}
                className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 py-3 text-xs sm:text-sm font-black text-slate-950 shadow-xl hover:brightness-110 active:scale-95 transition-all shadow-amber-950/80 animate-pulse"
              >
                {isRolling ? 'ĐANG ĐỔ 2 XÚC XẮC… 🎲' : '🎲 BẤM LẮC 2 XÚC XẮC NGAY!'}
              </button>
            ) : (
              <div className="space-y-1.5">
                {state.canBuyProperty && currentProp && (
                  <button
                    onClick={handleHostBuy}
                    className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-black text-white shadow-lg active:scale-95 transition-all"
                  >
                    🏙️ MUA ĐẤT [{currentProp.name}] - Giá {currentProp.price}$
                  </button>
                )}

                {state.canUpgradeProperty && currentProp && (
                  <button
                    onClick={handleHostUpgrade}
                    className="w-full rounded-xl bg-cyan-600 hover:bg-cyan-500 py-2.5 text-xs font-black text-white shadow-lg active:scale-95 transition-all"
                  >
                    🏰 NÂNG CẤP NHÀ ⭐ - Giá {currentProp.housePrice}$
                  </button>
                )}

                <button
                  onClick={handleHostEndTurn}
                  className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-bold text-slate-200 border border-slate-700 active:scale-95 transition-all"
                >
                  {state.canBuyProperty ? '⏩ BỎ QUA & KẾT THÚC LƯỢT' : 'HOÀN THÀNH LƯỢT ĐI ➔'}
                </button>
              </div>
            )
          ) : (
            <div className="rounded-2xl bg-slate-900/70 p-2 text-center border border-slate-800 text-xs text-slate-400">
              ⏳ Đang đợi <span className="text-amber-400 font-bold">{currentTurnPlayer?.name}</span> gieo xúc xắc…
            </div>
          )}
        </div>

        {/* Modal Xem Nhật Ký / Lịch Sử Thị Trường Khi Người Dùng Bấm Nút 📜 */}
        <AnimatePresence>
          {showLogsModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
              onClick={() => setShowLogsModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 10 }}
                className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 p-5 shadow-2xl flex flex-col max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <span>📜</span> NHẬT KÝ THỊ TRƯỜNG ĐÔ THỊ
                  </h3>
                  <button
                    onClick={() => setShowLogsModal(false)}
                    className="h-7 w-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-3 space-y-2 text-xs text-slate-300">
                  {state.logs.map((log) => (
                    <div key={log.id} className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      {log.text}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowLogsModal(false)}
                  className="w-full mt-2 rounded-2xl bg-slate-800 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition-colors"
                >
                  Đóng lại
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                <span className="text-6xl block mb-2">🎩</span>
                <h2 className="text-2xl font-black text-amber-400 uppercase tracking-wider">
                  VUA BẤT ĐỘNG SẢN!
                </h2>
                <div className="mt-4 flex flex-col items-center">
                  <Avatar
                    index={state.players[state.winner]?.avatar ?? 0}
                    size={64}
                    name={state.players[state.winner]?.name}
                  />
                  <h3 className="mt-2 text-xl font-black text-white">
                    {state.players[state.winner]?.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Đã trở thành đại gia giàu có bậc nhất đô thị!
                  </p>
                </div>
                <button
                  onClick={() => {
                    void deleteRoom(code)
                    navigate('/monopoly')
                  }}
                  className="mt-6 w-full rounded-2xl bg-amber-500 py-3 text-xs font-black text-slate-950 hover:bg-amber-400 transition-colors shadow-lg"
                >
                  VỀ PHÒNG CHỜ CHƠI LẠI
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stage>
  )
}
