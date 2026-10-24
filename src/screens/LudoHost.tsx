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
import { joinUrl, joinRoom, deleteRoom, addBotPlayer, removeBotPlayer } from '../lib/room'
import { sfx } from '../lib/sfx'
import {
  ludoStart,
  ludoRollDice,
  ludoMoveToken,
  ludoTick,
  canMoveToken,
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
  const [isRolling, setIsRolling] = useState(false)
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
    navigate('/ludo')
  }

  const handleStart = async () => {
    if (order.length < 1 || isStarting) return
    setIsStarting(true)
    try {
      sfx.win()
      await ludoStart(code, players)
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
        await ludoRollDice(code, state)
      } finally {
        setIsRolling(false)
      }
    }, 600)
  }

  const handleHostMove = async (tokenId: number) => {
    if (!state || !state.diceRolled) return
    sfx.tap()
    await ludoMoveToken(code, state, tokenId)
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
                    {order.map((pUid, idx) => {
                      const p = players[pUid]
                      const color = ['red', 'green', 'yellow', 'blue'][idx] as LudoColor
                      const cfg = COLOR_CONFIG[color]
                      const isBot = pUid.startsWith('bot-')

                      return (
                        <div
                          key={pUid}
                          className="relative flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-2.5"
                        >
                          <Avatar index={p?.avatar ?? 0} size={32} name={p?.name} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-bold text-white">{p?.name}</p>
                            <span className={`text-[0.6rem] font-extrabold ${cfg.text}`}>
                              Phe {cfg.name}
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
                      <span>⭐ Bạn đã tham gia ván đấu (chơi trên máy tính)</span>
                      <Link
                        to={`/play/${code}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-emerald-600 px-2 py-0.5 text-[0.68rem] font-bold text-white hover:bg-emerald-500"
                      >
                        Mở tay cầm ➔
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={handleStart}
                    disabled={order.length < 1 || isStarting}
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

  // Kiểm tra xem Host có thể điều khiển trực tiếp trên PC không (nếu là lượt của host hoặc host đại diện điều khiển)
  const isMyTurn = Boolean(
    currentTurnUid &&
    (currentTurnUid === uid || (!uid && !currentTurnUid.startsWith('bot-')) || (isHost && isHostPlaying && currentTurnUid === uid))
  )

  const selectableTokenIds =
    isMyTurn && state.diceRolled && state.diceValue !== null && currentTurnState
      ? currentTurnState.tokens
          .filter((t) => canMoveToken(t, state.diceValue!, currentTurnState.color))
          .map((t) => t.id)
      : []

  return (
    <Stage>
      <div className="mx-auto flex h-dvh max-h-screen max-w-7xl flex-col px-3 sm:px-6 pb-2 overflow-hidden">
        {/* Header Compact */}
        <header className="flex items-center justify-between py-2 sm:py-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={handleExitRoom}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-900 border border-slate-800"
            >
              ← Rời bàn
            </button>
            <div className="flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-1 border border-slate-800">
              <span className="text-xs">📱</span>
              <span className="font-mono text-xs font-black text-amber-400">{code}</span>
            </div>
            <span className="hidden sm:inline rounded-full bg-amber-950/80 px-2.5 py-0.5 text-[0.65rem] font-black text-amber-300 border border-amber-800">
              CỜ CÁ NGỰA CHIẾN THUẬT
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isHostPlaying && (
              <Link
                to={`/play/${code}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex rounded-xl bg-emerald-600/30 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-600/50 transition-all"
              >
                🎮 Mở tay cầm ➔
              </Link>
            )}
            <SfxToggle />
          </div>
        </header>

        {/* Main 3-Column Desktop Layout (No scroll on desktop!) */}
        <main className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[290px_1fr_290px] gap-3 sm:gap-5 items-center justify-center my-auto overflow-hidden py-1">
          {/* CỘT TRÁI: Lượt hiện tại & Điều khiển máy tính */}
          <div className="flex flex-col gap-3 h-full max-h-[calc(100vh-80px)] overflow-y-auto pr-1">
            {/* Thẻ lượt đi */}
            <div className="rounded-3xl bg-slate-900/90 p-4 border border-slate-800 shadow-xl backdrop-blur-md shrink-0">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                LƯỢT ĐUA HIỆN TẠI
              </p>
              <div className="mt-2 flex items-center gap-3">
                <Avatar index={currentTurnPlayer?.avatar ?? 0} size={42} name={currentTurnPlayer?.name} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-black text-white truncate">{currentTurnPlayer?.name}</h3>
                  {currentCfg && (
                    <span className={`text-xs font-bold ${currentCfg.text}`}>
                      Phe {currentCfg.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Trạng thái xúc xắc */}
              <div className="mt-3 rounded-2xl bg-slate-950/70 p-3 border border-slate-800 text-center">
                {state.diceRolled ? (
                  <div>
                    <span className="text-[0.65rem] text-slate-400 block font-semibold">KẾT QUẢ ĐỔ XÚC XẮC:</span>
                    <span className="font-mono text-2xl font-black text-amber-400">🎲 {state.diceValue} điểm</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-300 font-medium animate-pulse">
                    {currentTurnUid?.startsWith('bot-') ? '🤖 Bot đang tính nước đi…' : 'Chờ người chơi lắc xúc xắc…'}
                  </p>
                )}
              </div>

              {state.canRollAgain && (
                <p className="mt-2 text-center text-xs font-black text-amber-400 animate-pulse">
                  🎉 Đổ được 6! Được đổ thêm lượt nữa!
                </p>
              )}
            </div>

            {/* BẢNG ĐIỀU KHIỂN CHƠI TRỰC TIẾP TRÊN MÁY TÍNH (NẾU LÀ LƯỢT CỦA BẠN) */}
            {isMyTurn && (
              <div className="rounded-3xl bg-slate-900/90 p-4 border border-amber-500/40 shadow-xl shrink-0">
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-amber-400 mb-2">
                  🎮 ĐIỀU KHIỂN MÁY TÍNH
                </p>

                {!state.diceRolled ? (
                  <button
                    onClick={handleHostRollDice}
                    disabled={isRolling}
                    className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 py-3 text-xs font-black text-white shadow-lg hover:brightness-110 active:scale-95 transition-all"
                  >
                    {isRolling ? 'ĐANG LẮC XÚC XẮC… 🎲' : '🎲 BẤM LẮC XÚC XẮC NGAY!'}
                  </button>
                ) : selectableTokenIds.length > 0 ? (
                  <div className="space-y-1.5">
                    <p className="text-[0.65rem] font-bold text-emerald-400 text-center">
                      CHỌN NGỰA ĐỂ ĐI:
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {selectableTokenIds.map((tId) => {
                        const token = currentTurnState?.tokens.find((t) => t.id === tId)
                        const isBase = token?.pos === -1
                        return (
                          <button
                            key={tId}
                            onClick={() => handleHostMove(tId)}
                            className="rounded-xl bg-emerald-600/90 hover:bg-emerald-500 p-2 text-white font-bold text-center text-xs shadow transition-all active:scale-95 border border-white/20"
                          >
                            <span>🐴</span>
                            <span className="block text-[0.62rem] font-black mt-0.5">
                              {isBase ? `Xuất Chuồng #${tId + 1}` : `Đi Ngựa #${tId + 1}`}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl bg-rose-950/40 p-2 text-center text-[0.68rem] text-rose-300 font-bold border border-rose-800/40">
                    Không có ngựa nào đi được! Tự chuyển lượt…
                  </div>
                )}
              </div>
            )}

            {/* BẢNG XẾP HẠNG */}
            <div className="rounded-3xl bg-slate-900/80 p-3.5 border border-slate-800 shrink-0">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">
                BẢNG XẾP HẠNG
              </p>
              <div className="space-y-1.5">
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
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`h-2.5 w-2.5 rounded-full ${cfg.bg} shrink-0`} />
                        <span className="text-xs font-bold text-slate-200 truncate">{p?.name}</span>
                      </div>
                      <span className="text-xs font-black text-amber-400 shrink-0">
                        {pSt.score}/2 🏆
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* CỘT GIỮA: BÀN CỜ LUDO CO GIÃN THEO MÀN HÌNH + XÚC XẮC Ở GIỮA */}
          <div className="flex items-center justify-center w-full h-full max-h-[calc(100vh-90px)]">
            <LudoBoard
              players={state.players}
              currentTurnUid={state.currentTurn}
              myUid={uid}
              diceValue={state.diceValue}
              rolling={isRolling}
              onRollClick={isMyTurn && !state.diceRolled ? handleHostRollDice : undefined}
              onTokenClick={handleHostMove}
              selectableTokenIds={selectableTokenIds}
            />
          </div>

          {/* CỘT PHẢI: DIỄN BIẾN ĐƯỜNG ĐUA & QUY TẮC NHANH */}
          <div className="flex flex-col gap-3 h-full max-h-[calc(100vh-80px)] overflow-hidden">
            {/* Live Logs */}
            <div className="flex-1 flex flex-col rounded-3xl bg-slate-900/80 p-4 border border-slate-800 min-h-0 overflow-hidden shadow-xl">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2 shrink-0">
                DIỄN BIẾN ĐƯỜNG ĐUA
              </p>
              <div className="flex-1 space-y-2 overflow-y-auto pr-1 text-[0.7rem]">
                {state.logs.map((log) => (
                  <p
                    key={log.id}
                    className={`leading-relaxed p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/50 ${
                      log.type === 'kick'
                        ? 'text-rose-400 font-bold border-rose-900/40'
                        : log.type === 'home'
                        ? 'text-amber-400 font-bold border-amber-900/40'
                        : 'text-slate-300'
                    }`}
                  >
                    {log.text}
                  </p>
                ))}
              </div>
            </div>

            {/* Quy tắc nhanh */}
            <div className="rounded-3xl bg-slate-900/60 p-3 border border-slate-800 text-[0.65rem] text-slate-400 space-y-1 shrink-0">
              <p className="font-bold text-amber-400">💡 Mẹo Chiến Thuật:</p>
              <p>• Đổ 1 hoặc 6 để xuất quân ra đường đua.</p>
              <p>• Đạp trúng ô đối thủ sẽ đá họ về chuồng!</p>
              <p>• Đưa đủ 2 ngựa về đích để giành chiến thắng.</p>
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
                <span className="text-6xl block mb-2">🏆</span>
                <h2 className="text-2xl font-black text-amber-400 uppercase tracking-wider">
                  QUÁN QUÂN ĐƯỜNG ĐUA!
                </h2>
                <div className="mt-4 flex flex-col items-center">
                  <Avatar
                    index={players[state.winner]?.avatar ?? 0}
                    size={64}
                    name={players[state.winner]?.name}
                  />
                  <h3 className="mt-2 text-xl font-black text-white">
                    {players[state.winner]?.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Đã xuất sắc đưa 2 chiến mã cập bến vinh quang đầu tiên!
                  </p>
                </div>
                <button
                  onClick={() => {
                    void deleteRoom(code)
                    navigate('/ludo')
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
