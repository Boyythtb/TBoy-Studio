import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { Qr } from '../ui/Qr'
import { SfxToggle } from '../ui/SfxToggle'
import { CatanBoard } from '../ui/CatanBoard'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import { joinUrl, joinRoom, deleteRoom, addBotPlayer, removeBotPlayer } from '../lib/room'
import { sfx } from '../lib/sfx'
import {
  catanStart,
  catanRollDice,
  catanBuildSettlement,
  catanUpgradeCity,
  catanBankTrade,
  catanEndTurn,
  catanTick,
  RESOURCE_CONFIG,
  CATAN_HEXES,
  type CatanState,
  type ResourceType,
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
  const [isRolling, setIsRolling] = useState(false)
  const [showLogsModal, setShowLogsModal] = useState(false)
  const [showTradeModal, setShowTradeModal] = useState(false)
  const [tradeFrom, setTradeFrom] = useState<ResourceType | null>(null)
  const [tradeTo, setTradeTo] = useState<ResourceType | null>(null)
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
    navigate('/catan')
  }

  const handleStart = async () => {
    if (order.length < 1 || isStarting) return
    setIsStarting(true)
    try {
      sfx.win()
      await catanStart(code, players)
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
        await catanRollDice(code, state)
      } finally {
        setIsRolling(false)
      }
    }, 700)
  }

  const handleHostBuildSettlement = async () => {
    if (!state) return
    sfx.win()
    await catanBuildSettlement(code, state)
  }

  const handleHostUpgrade = async () => {
    if (!state) return
    sfx.win()
    await catanUpgradeCity(code, state)
  }

  const handleHostTrade = async () => {
    if (!state || !tradeFrom || !tradeTo || tradeFrom === tradeTo) return
    sfx.tap()
    await catanBankTrade(code, state, tradeFrom, tradeTo)
    setShowTradeModal(false)
    setTradeFrom(null)
    setTradeTo(null)
  }

  const handleHostEndTurn = async () => {
    sfx.tap()
    await catanEndTurn(code)
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
                PHÒNG CHỜ KHAI PHÁ ĐẢO CATAN
              </span>
            </div>
            <SfxToggle />
          </header>

          <main className="flex-1 flex items-center justify-center my-auto overflow-hidden py-2">
            <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              {/* QR Code */}
              <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-900/90 p-5 border border-emerald-500/40 shadow-[0_8px_32px_rgba(16,185,129,0.2)] backdrop-blur-md text-center">
                <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
                  MÃ VÀO ĐẢO
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
                  Quét mã để cùng bạn bè khám phá và xây dựng hòn đảo Catan
                </p>
              </div>

              {/* Players List & Start */}
              <div className="flex flex-col justify-between rounded-3xl bg-slate-900/80 p-5 border border-slate-800 backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <span className="text-xs font-bold text-slate-200">
                      Đảo chủ đã tham gia ({order.length}/4)
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
                            <span className="text-[0.62rem] text-emerald-400 font-extrabold">
                              1 Làng khởi đầu
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
                        className="rounded-xl bg-emerald-500 hover:bg-emerald-400 px-3 py-1.5 text-xs font-bold text-slate-950 transition-colors shrink-0"
                      >
                        {isJoining ? 'Đang vào…' : '+ Chủ phòng chơi'}
                      </button>
                    </div>
                  )}

                  {isHostPlaying && (
                    <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-3 py-1.5 text-xs text-emerald-300">
                      <span>⭐ Bạn đã vào đảo (chơi trực tiếp trên máy này)</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={handleStart}
                    disabled={order.length < 1 || isStarting}
                    className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 py-3.5 text-sm font-black text-slate-950 shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-40"
                  >
                    {isStarting ? 'Đang kiến thiết đảo…' : 'BẮT ĐẦU VÁN CATAN! 🏝️'}
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

  const isMyTurn = Boolean(
    currentTurnUid &&
    (currentTurnUid === uid || (!uid && !currentTurnUid.startsWith('bot-')) || (isHost && isHostPlaying && currentTurnUid === uid))
  )

  const canBuildSettlement =
    currentPState &&
    currentPState.resources.wood >= 1 &&
    currentPState.resources.brick >= 1 &&
    currentPState.resources.sheep >= 1 &&
    currentPState.resources.wheat >= 1

  const canBuildCity =
    currentPState &&
    currentPState.resources.ore >= 3 &&
    currentPState.resources.wheat >= 2 &&
    currentPState.settlements.some((s) => !s.isCity)

  const hasAnyTradeResource =
    currentPState &&
    Object.values(currentPState.resources).some((count) => count >= 4)

  const latestLog = state.logs[0]

  // Bảng xếp hạng người chơi theo điểm
  const sortedPlayers = [...state.order]
    .map((pUid) => state.players[pUid])
    .filter(Boolean)
    .sort((a, b) => b.victoryPoints - a.victoryPoints)

  return (
    <Stage>
      <div className="mx-auto flex h-dvh max-h-screen max-w-7xl flex-col px-2 sm:px-6 pb-2 overflow-hidden select-none justify-between">
        {/* Floating Notification Toast */}
        <AnimatePresence>
          {latestLog && (
            <motion.div
              key={latestLog.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-12 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] pointer-events-none"
            >
              <div className="rounded-full bg-slate-900/95 border border-emerald-500/60 px-3.5 py-1 text-[0.7rem] sm:text-xs font-black text-emerald-300 shadow-2xl backdrop-blur-md flex items-center gap-1.5 truncate">
                <span>🌾</span>
                <span className="truncate">{latestLog.text}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Compact Đồng Bộ Với Monopoly */}
        <header className="flex items-center justify-between py-1.5 sm:py-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExitRoom}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800"
            >
              ← Rời bàn
            </button>
            <div className="flex items-center gap-1.5 rounded-xl bg-slate-900/80 px-2.5 py-1 border border-slate-800">
              <span className="text-xs">📱</span>
              <span className="font-mono text-xs font-black text-emerald-400">{code}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentTurnPlayer && (
              <div className="flex items-center gap-1.5 rounded-xl bg-slate-900/90 px-2.5 py-1 border border-emerald-500/30">
                <Avatar index={currentTurnPlayer.avatar} size={20} name={currentTurnPlayer.name} />
                <span className="text-xs font-black text-white truncate max-w-[80px]">
                  {currentTurnPlayer.name}
                </span>
                <span className="text-xs font-extrabold text-amber-400">
                  {currentPState?.victoryPoints ?? 0}/5 VP 🏆
                </span>
              </div>
            )}

            {isMyTurn && state.diceRolled && (
              <button
                type="button"
                onClick={() => setShowTradeModal(true)}
                className="flex items-center gap-1 rounded-xl bg-purple-950/60 hover:bg-purple-900/70 border border-purple-500/40 px-2.5 py-1 text-xs font-bold text-purple-300 transition-colors"
                title="Đổi 4:1 với Ngân Hàng"
              >
                🔄 <span className="hidden sm:inline">Đổi 4:1</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowLogsModal(true)}
              className="flex items-center gap-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 text-xs font-bold text-slate-300 transition-colors"
              title="Xem nhật ký khai phá"
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
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs font-extrabold text-amber-400">
                      {currentPState?.victoryPoints ?? 0}/5 VP 🏆
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
                        style={{ width: `${((currentPState?.victoryPoints ?? 0) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trạng thái xúc xắc */}
              <div className="mt-3 rounded-2xl bg-slate-950/70 p-2.5 border border-slate-800 text-center">
                {!state.diceRolled ? (
                  <p className="text-xs text-slate-300 font-medium animate-pulse">
                    {currentTurnUid?.startsWith('bot-') ? '🤖 Bot đang đổ xúc xắc thu hoạch…' : 'Chờ gieo xúc xắc…'}
                  </p>
                ) : (
                  <div className="text-xs text-amber-400 font-bold">
                    🌾 Xúc xắc ra số: {state.dice1! + state.dice2!} ({state.dice1} + {state.dice2})
                  </div>
                )}
              </div>
            </div>

            {/* Túi Tài nguyên của người chơi hiện tại */}
            {currentPState && (
              <div className="rounded-3xl bg-slate-900/80 p-3.5 border border-slate-800 shrink-0">
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  TÀI NGUYÊN CỦA {currentTurnPlayer?.name}
                </p>
                <div className="grid grid-cols-5 gap-1.5 text-center">
                  {(Object.keys(currentPState.resources) as ResourceType[]).map((res) => {
                    const count = currentPState.resources[res]
                    return (
                      <div
                        key={res}
                        className={`rounded-xl p-1.5 border transition-all ${
                          count > 0 ? 'bg-slate-950 border-emerald-500/40' : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                        }`}
                      >
                        <span className="text-base">{RESOURCE_CONFIG[res].icon}</span>
                        <span className="block text-[0.62rem] font-bold text-slate-300">
                          {RESOURCE_CONFIG[res].name}
                        </span>
                        <span className="block text-xs font-black text-amber-400 mt-0.5">
                          {count}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Danh sách Công Trình / Khu Định Cư */}
            {currentPState && (
              <div className="rounded-3xl bg-slate-900/80 p-3.5 border border-slate-800 shrink-0">
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  KHU ĐỊNH CƯ ({currentPState.settlements.length})
                </p>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {currentPState.settlements.map((st, i) => {
                    const hexTarget = CATAN_HEXES[st.hexIds[0]] || CATAN_HEXES[1]
                    const res = hexTarget.type !== 'desert' ? RESOURCE_CONFIG[hexTarget.type as ResourceType] : null

                    return (
                      <div
                        key={st.id}
                        className="flex items-center justify-between rounded-xl bg-slate-950/50 p-2 border border-slate-800 text-[0.7rem]"
                      >
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <span>{st.isCity ? '🏰 Thành phố' : '🏡 Làng'} #{i + 1}</span>
                          <span className="text-[0.6rem] text-amber-400 font-black">
                            ({st.isCity ? '+2 VP' : '+1 VP'})
                          </span>
                        </span>
                        <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                          {res?.icon} Ô số {hexTarget.diceNumber}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CỘT GIỮA: BÀN CỜ CATAN TỰ CO GIÃN VỪA KHÍT KHUNG NHÌN */}
          <div className="flex-1 min-h-0 flex items-center justify-center w-full max-h-[min(500px,58vh)] aspect-square my-auto">
            <CatanBoard
              players={state.players}
              currentTurnUid={state.currentTurn}
              dice1={state.dice1}
              dice2={state.dice2}
              rolling={isRolling}
              onRollClick={isMyTurn && !state.diceRolled ? handleHostRollDice : undefined}
            />
          </div>

          {/* CỘT PHẢI: BẢNG XẾP HẠNG & CÔNG THỨC & DIỄN BIẾN (CHỈ HIỂN THỊ TRÊN DESKTOP lg:) */}
          <div className="hidden lg:flex flex-col gap-3 h-full max-h-[calc(100vh-80px)] overflow-hidden">
            {/* Bảng Xếp Hạng Đảo Chủ (5 VP Để Thắng) */}
            <div className="rounded-3xl bg-slate-900/80 p-3.5 border border-slate-800 shrink-0 shadow-lg">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-2">
                BẢNG ĐIỂM (5 VP ĐỂ THẮNG ĐẢO)
              </p>
              <div className="space-y-1.5">
                {sortedPlayers.map((p, rank) => {
                  const isCurrent = p.uid === currentTurnUid
                  return (
                    <div
                      key={p.uid}
                      className={`flex items-center justify-between rounded-xl p-2 border transition-all ${
                        isCurrent
                          ? 'bg-emerald-950/30 border-emerald-500/50 shadow'
                          : 'bg-slate-950/40 border-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[0.65rem] font-black text-slate-400 w-4">
                          #{rank + 1}
                        </span>
                        <Avatar index={p.avatar} size={24} name={p.name} />
                        <span className="text-xs font-bold text-slate-200 truncate">{p.name}</span>
                      </div>
                      <span className="text-xs font-black text-amber-400 shrink-0">
                        {p.victoryPoints}/5 VP 🏆
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bảng Công Thức Kiến Thiết Rút Gọn */}
            <div className="rounded-3xl bg-slate-900/80 p-3 border border-slate-800 shrink-0 text-[0.68rem] text-slate-300 space-y-1.5">
              <p className="text-[0.62rem] font-bold uppercase tracking-widest text-slate-400">
                CÔNG THỨC KIẾN THIẾT
              </p>
              <div className="flex items-center justify-between bg-slate-950/50 p-1.5 rounded-lg border border-slate-800/80">
                <span className="font-bold text-emerald-400">🏡 Làng (+1 VP)</span>
                <span>1🌲 1🧱 1🐑 1🌾</span>
              </div>
              <div className="flex items-center justify-between bg-slate-950/50 p-1.5 rounded-lg border border-slate-800/80">
                <span className="font-bold text-amber-400">🏰 Thành phố (+1 VP, x2)</span>
                <span>2🌾 3🪨</span>
              </div>
              <div className="flex items-center justify-between bg-slate-950/50 p-1.5 rounded-lg border border-slate-800/80">
                <span className="font-bold text-purple-400">🔄 Đổi Ngân Hàng</span>
                <span>4 cùng loại ➔ 1 bất kỳ</span>
              </div>
            </div>

            {/* Logs khai phá */}
            <div className="flex-1 flex flex-col rounded-3xl bg-slate-900/80 p-3 border border-slate-800 min-h-0 overflow-hidden shadow-xl">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-1.5 shrink-0">
                NHẬT KÝ KHAI PHÁ
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
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 py-3.5 text-xs sm:text-sm font-black text-slate-950 shadow-xl hover:brightness-110 active:scale-95 transition-all shadow-emerald-950/80 animate-pulse"
              >
                {isRolling ? 'ĐANG ĐỔ 2 XÚC XẮC… 🎲' : '🎲 BẤM ĐỔ 2 XÚC XẮC THU HOẠCH!'}
              </button>
            ) : (
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <button
                    onClick={handleHostBuildSettlement}
                    disabled={!canBuildSettlement}
                    className="flex-1 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 py-2.5 text-xs font-black text-white shadow active:scale-95 transition-all"
                  >
                    🏡 Xây Làng (+1 VP)
                  </button>

                  <button
                    onClick={handleHostUpgrade}
                    disabled={!canBuildCity}
                    className="flex-1 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 py-2.5 text-xs font-black text-white shadow active:scale-95 transition-all"
                  >
                    🏰 Lên TP (+1 VP)
                  </button>

                  {hasAnyTradeResource && (
                    <button
                      onClick={() => setShowTradeModal(true)}
                      className="rounded-xl bg-purple-700 hover:bg-purple-600 px-3 py-2.5 text-xs font-black text-white shadow active:scale-95 transition-all"
                      title="Đổi 4:1 Ngân hàng"
                    >
                      🔄 4:1
                    </button>
                  )}
                </div>

                <button
                  onClick={handleHostEndTurn}
                  className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-bold text-slate-200 border border-slate-700 active:scale-95 transition-all"
                >
                  HOÀN THÀNH LƯỢT ĐI ➔
                </button>
              </div>
            )
          ) : (
            <div className="rounded-2xl bg-slate-900/70 p-2 text-center border border-slate-800 text-xs text-slate-400">
              ⏳ Đang đợi <span className="text-emerald-400 font-bold">{currentTurnPlayer?.name}</span> thu hoạch mùa màng…
            </div>
          )}
        </div>

        {/* Modal Đổi 4:1 Với Ngân Hàng */}
        <AnimatePresence>
          {showTradeModal && currentPState && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
              onClick={() => setShowTradeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 10 }}
                className="w-full max-w-sm rounded-3xl bg-slate-900 border border-purple-500/50 p-5 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <span>🔄</span> GIAO THƯƠNG NGÂN HÀNG (4:1)
                  </h3>
                  <button
                    onClick={() => setShowTradeModal(false)}
                    className="h-7 w-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="py-3 space-y-3">
                  <div>
                    <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      1. Chọn 4 tài nguyên muốn bỏ ra:
                    </label>
                    <div className="grid grid-cols-5 gap-1 text-center">
                      {(Object.keys(RESOURCE_CONFIG) as ResourceType[]).map((rKey) => {
                        const count = currentPState.resources[rKey]
                        const isEligible = count >= 4
                        const isSelected = tradeFrom === rKey

                        return (
                          <button
                            key={rKey}
                            type="button"
                            disabled={!isEligible}
                            onClick={() => setTradeFrom(rKey)}
                            className={`p-2 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-purple-600 border-white ring-2 ring-purple-400 text-white'
                                : isEligible
                                ? 'bg-slate-800 border-purple-400/40 text-slate-200'
                                : 'bg-slate-950/40 border-slate-800 opacity-40 text-slate-500'
                            }`}
                          >
                            <span className="text-base block">{RESOURCE_CONFIG[rKey].icon}</span>
                            <span className="text-[0.6rem] font-black">{count}/4</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      2. Chọn 1 tài nguyên bạn muốn nhận:
                    </label>
                    <div className="grid grid-cols-5 gap-1 text-center">
                      {(Object.keys(RESOURCE_CONFIG) as ResourceType[]).map((rKey) => {
                        const isSelected = tradeTo === rKey
                        const isSame = tradeFrom === rKey

                        return (
                          <button
                            key={rKey}
                            type="button"
                            disabled={isSame || !tradeFrom}
                            onClick={() => setTradeTo(rKey)}
                            className={`p-2 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-emerald-600 border-white ring-2 ring-emerald-400 text-white'
                                : isSame
                                ? 'bg-slate-950/40 border-slate-800 opacity-30 text-slate-500'
                                : 'bg-slate-800 border-emerald-400/40 text-slate-200'
                            }`}
                          >
                            <span className="text-base block">{RESOURCE_CONFIG[rKey].icon}</span>
                            <span className="text-[0.6rem] font-black">{RESOURCE_CONFIG[rKey].name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex gap-2">
                  <button
                    onClick={() => setShowTradeModal(false)}
                    className="flex-1 rounded-xl bg-slate-800 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleHostTrade}
                    disabled={!tradeFrom || !tradeTo || tradeFrom === tradeTo}
                    className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-600 py-2.5 text-xs font-black text-white hover:brightness-110 disabled:opacity-40"
                  >
                    Xác nhận đổi ➔
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Xem Nhật Ký / Lịch Sử Khai Phá Khi Người Dùng Bấm Nút 📜 */}
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
                    <span>📜</span> NHẬT KÝ KHAI PHÁ ĐẢO CATAN
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
                className="w-full max-w-md rounded-3xl bg-slate-900 p-6 text-center border-2 border-emerald-500 shadow-2xl"
              >
                <span className="text-6xl block mb-2">👑</span>
                <h2 className="text-2xl font-black text-emerald-400 uppercase tracking-wider">
                  ĐẢO CHỦ HUYỀN THOẠI!
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
                    Đã xuất sắc đạt 5 Điểm Chiến Thắng để thống trị đảo Catan!
                  </p>
                </div>
                <button
                  onClick={() => {
                    void deleteRoom(code)
                    navigate('/catan')
                  }}
                  className="mt-6 w-full rounded-2xl bg-emerald-500 py-3 text-xs font-black text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg"
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
