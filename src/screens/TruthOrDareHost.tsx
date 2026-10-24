import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { Qr } from '../ui/Qr'
import { SfxToggle } from '../ui/SfxToggle'
import { BottleWheel } from '../ui/BottleWheel'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import { joinUrl, joinRoom, deleteRoom } from '../lib/room'
import { sfx } from '../lib/sfx'
import {
  todStart,
  todSpin,
  todCheckWatchdog,
  todSelectType,
  todComplete,
  todDrink,
  todNextTurn,
  type TodState,
  getPlayerOrder,
} from '../game/truthOrDareEngine'

export default function TruthOrDareHost() {
  const { code = '' } = useParams()
  const navigate = useNavigate()
  const { uid, players } = useGameRoom(code)
  const [state, setState] = useState<TodState | null>(null)
  const [showQr, setShowQr] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [hostName, setHostName] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [startError, setStartError] = useState<string | null>(null)
  const order = useMemo(() => getPlayerOrder(players), [players])
  const url = joinUrl(code)

  const hostMe = uid ? players[uid] : null

  const handleExitRoom = async () => {
    try {
      await deleteRoom(code)
    } catch {}
    navigate('/truth-or-dare')
  }

  const handleHostJoin = async () => {
    const trimmed = hostName.trim() || 'Chủ Xị'
    setIsJoining(true)
    try {
      await joinRoom(code, trimmed, Math.floor(Math.random() * 8))
      setHostName('')
    } finally {
      setIsJoining(false)
    }
  }

  useEffect(() => {
    if (!code) return
    const unsub = store.sub<TodState>(paths.tod(code), (v) => {
      setState(v)
    })
    return () => unsub()
  }, [code])

  // Watchdog: Tự giải phóng trạng thái spinning nếu mạng lag
  useEffect(() => {
    if (!code || !state || state.step !== 'spinning') return
    const id = setInterval(() => {
      void todCheckWatchdog(code, state)
    }, 1000)
    return () => clearInterval(id)
  }, [code, state])

  const handleStart = async () => {
    if (order.length < 2 || isStarting) return
    setIsStarting(true)
    setStartError(null)
    try {
      sfx.win()
      await todStart(code, players, uid || undefined)
    } catch (err) {
      console.error('Failed to start truth or dare:', err)
      setStartError(err instanceof Error ? err.message : 'Không thể bắt đầu, vui lòng thử lại!')
    } finally {
      setIsStarting(false)
    }
  }

  const handleSpin = async () => {
    if (!state || state.step === 'spinning') return
    sfx.vote()
    await todSpin(code, state, players)
  }

  const spinnerPlayer = state?.spinnerUid ? players[state.spinnerUid] : null
  const victimPlayer = state?.activeUid ? players[state.activeUid] : null
  const currentStep = state?.step || 'waiting_spin'

  // Lobby Screen
  if (!state || state.phase === 'lobby') {
    return (
      <Stage mode="blood">
        <div className="mx-auto flex h-dvh max-w-5xl flex-col justify-between p-4 sm:p-6 overflow-hidden">
          <header className="flex items-center justify-between pb-3 border-b border-rose-900/60 shrink-0">
            <button
              type="button"
              onClick={handleExitRoom}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              ← Thoát phòng
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌶️</span>
              <span className="text-xs font-black tracking-widest text-rose-400 uppercase">
                PHÒNG CHỜ BÀN NHẬU 18+
              </span>
            </div>
            <SfxToggle />
          </header>

          <main className="flex-1 flex items-center justify-center my-auto overflow-hidden py-2">
            <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              {/* Left Column: Room Code & QR */}
              <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-900/90 p-5 border border-rose-500/40 shadow-[0_8px_32px_rgba(244,63,94,0.2)] backdrop-blur-md text-center">
                <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
                  MÃ VÀO BÀN NHẬU
                </p>
                <h1 className="mt-0.5 font-mono text-4xl sm:text-5xl font-black tracking-widest text-white drop-shadow-md">
                  {code}
                </h1>

                {/* QR Code */}
                <div className="mt-3 flex justify-center">
                  <div className="rounded-2xl bg-white p-2.5 shadow-lg">
                    <Qr value={url} size={130} />
                  </div>
                </div>

                <p className="mt-3 text-[0.7rem] text-slate-300 font-medium leading-relaxed">
                  Mở camera quét mã hoặc truy cập{' '}
                  <span className="font-bold text-rose-400">tboy-studio.pages.dev/join</span>
                </p>
              </div>

              {/* Right Column: Players List & Actions */}
              <div className="flex flex-col justify-between rounded-3xl bg-slate-900/80 p-5 border border-slate-800 backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <span className="text-xs font-bold text-slate-200">
                      Anh em đã vào bàn ({order.length})
                    </span>
                    <span className="text-[0.68rem] text-rose-400 font-semibold">
                      Tối thiểu 2 người
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-44 sm:max-h-48 overflow-y-auto pr-1">
                    {order.map((uid) => {
                      const p = players[uid]
                      if (!p) return null
                      return (
                        <div
                          key={uid}
                          className="flex items-center gap-2 rounded-xl bg-slate-950/70 p-2 border border-slate-800/80"
                        >
                          <Avatar index={p.avatar} size={28} name={p.name} />
                          <span className="truncate text-xs font-bold text-slate-100">{p.name}</span>
                        </div>
                      )
                    })}
                  </div>

                  {order.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-800 p-6 text-center text-xs text-slate-500">
                      Đang đợi anh em quét mã vào bàn…
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col gap-3">
                  {/* Host quick join */}
                  {!hostMe && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={hostName}
                        onChange={(e) => setHostName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleHostJoin()}
                        placeholder="Tên chủ xị (để cùng chơi)…"
                        maxLength={14}
                        className="flex-1 rounded-xl bg-slate-950 border border-rose-500/40 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                      <button
                        onClick={handleHostJoin}
                        disabled={isJoining}
                        className="rounded-xl bg-rose-700 hover:bg-rose-600 px-3.5 py-2 text-xs font-black text-white transition-colors shrink-0"
                      >
                        {isJoining ? 'Đang vào…' : '+ Chủ Xị Tham Gia'}
                      </button>
                    </div>
                  )}

                  {/* Start Button */}
                  <button
                    onClick={handleStart}
                    disabled={order.length < 2 || isStarting}
                    className={`w-full rounded-2xl py-3 text-xs sm:text-sm font-black shadow-lg transition-all ${
                      order.length >= 2 && !isStarting
                        ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white hover:brightness-110 active:scale-95 shadow-rose-950/60'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isStarting
                      ? 'Đang khởi động bàn nhậu…'
                      : order.length < 2
                      ? `Cần thêm ${2 - order.length} người nữa để bắt đầu`
                      : 'BẮT ĐẦU VÒNG XOAY BÀN NHẬU 🚀'}
                  </button>
                  {startError && (
                    <p className="mt-2 text-center text-xs text-rose-400 font-semibold">{startError}</p>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </Stage>
    )
  }

  // Active Game Screen (Host Central Display)
  return (
    <Stage mode="blood">
      <div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-4 pb-12 sm:px-6">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-rose-900/60">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowQr(true)}
              className="flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-1.5 border border-slate-800 hover:border-rose-500 transition-colors"
            >
              <span className="text-xs">📱</span>
              <span className="font-mono text-xs font-black text-rose-400">{code}</span>
            </button>
            <span className="rounded-full bg-rose-950/80 px-2 py-0.5 text-[0.62rem] font-black text-rose-300 border border-rose-800">
              18+ NHẬU ĐÊM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLeaderboard(true)}
              className="flex items-center gap-1.5 rounded-xl bg-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-300 border border-amber-500/40 hover:scale-105 transition-all shadow-sm"
            >
              <span>🍻</span>
              <span>Bợm Nhậu</span>
            </button>
            <SfxToggle />
          </div>
        </header>

        {/* Main Central Playfield */}
        <main className="mt-4 flex flex-1 flex-col items-center">
          {/* Active Player Notification Banner */}
          <div className="w-full max-w-lg rounded-2xl bg-gradient-to-r from-rose-950/80 via-slate-900/90 to-amber-950/80 p-3 text-center border border-rose-500/30 shadow-lg backdrop-blur-md">
            {currentStep === 'waiting_spin' ? (
              <>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-rose-400">
                  LƯỢT QUAY TÌM NẠN NHÂN TIẾP THEO
                </p>
                <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2 mt-0.5">
                  <span>🍾</span>
                  <span className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
                    {spinnerPlayer?.name || 'Chủ xị'}
                  </span>
                </h2>
                <p className="mt-1 text-xs text-slate-300">
                  Chờ <span className="text-white font-bold">{spinnerPlayer?.name}</span> ấn quay chai trên điện thoại…
                </p>
              </>
            ) : currentStep === 'spinning' ? (
              <>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-amber-400">
                  VÒNG QUAY ĐANG CHẠY
                </p>
                <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2 mt-0.5">
                  <span className="animate-spin">🍾</span>
                  <span className="text-rose-400">Đang tìm nạn nhân…</span>
                </h2>
              </>
            ) : (
              <>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                  NGƯỜI BỊ CHỈ ĐỊNH ĐÊM NAY
                </p>
                <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2 mt-0.5">
                  <span>🎯</span>
                  <span className="text-rose-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]">
                    {victimPlayer?.name || 'Chưa chọn'}
                  </span>
                </h2>
                <div className="mt-1 flex items-center justify-center gap-2 text-xs text-amber-300 font-semibold">
                  <span>Đã uống phạt:</span>
                  <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 border border-amber-500/40 font-black">
                    🍻 {state.drinks?.[state.activeUid || ''] ?? 0} ly
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Circle Ring & Bottle */}
          <div className="mt-4 flex items-center justify-center">
            <BottleWheel
              order={order}
              players={players}
              drinks={state.drinks}
              spinAngle={state.spinAngle}
              spinnerUid={state.spinnerUid}
              activeUid={state.activeUid}
              currentStep={currentStep}
              canSpin={Boolean(uid && state.spinnerUid === uid && currentStep === 'waiting_spin')}
              onSpin={handleSpin}
              compact={false}
            />
          </div>

          {/* Central Controls */}
          <div className="mt-3 flex items-center gap-3">
            {Boolean(uid && state.spinnerUid === uid) ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSpin}
                  disabled={currentStep === 'spinning'}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 px-6 py-2.5 text-sm font-black text-white shadow-xl hover:brightness-110 active:scale-95 transition-all shadow-rose-950/80"
                >
                  <span>🍾</span>
                  <span>{currentStep === 'spinning' ? 'Đang Xoay Chai…' : 'BẤM QUAY CHAI! 🚀'}</span>
                </button>
                <button
                  onClick={() => todNextTurn(code, state, players)}
                  className="rounded-2xl bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  Chuyển lượt ➔
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="rounded-2xl bg-slate-900/90 border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-300">
                  ⏳ Đang đợi <span className="text-amber-400 font-black">{spinnerPlayer?.name}</span> ấn quay trên điện thoại…
                </div>
                <button
                  onClick={() => todNextTurn(code, state, players)}
                  className="rounded-2xl bg-slate-900 border border-slate-800 px-3 py-2 text-[0.72rem] font-bold text-slate-400 hover:text-white transition-colors"
                  title="Nếu người chơi bị mất kết nối, bấm để chuyển lượt"
                >
                  Đổi người quay ➔
                </button>
              </div>
            )}
          </div>

          {/* Reveal Card Section */}
          <div className="mt-5 w-full max-w-lg">
            {currentStep === 'waiting_spin' && (
              <div className="rounded-3xl bg-slate-900/60 p-5 border border-slate-800/80 text-center backdrop-blur-md">
                <span className="text-3xl block mb-2">🍻</span>
                <p className="text-xs font-bold text-slate-300">
                  Lượt của <span className="text-amber-400 font-black">{spinnerPlayer?.name}</span> quay chai!
                </p>
                <p className="mt-1 text-[0.7rem] text-slate-400">
                  {spinnerPlayer?.name} hãy mở điện thoại và bấm nút xoay chai để tìm người tiếp theo.
                </p>
              </div>
            )}

            {currentStep === 'spinning' && (
              <div className="rounded-3xl bg-slate-900/60 p-5 border border-rose-500/40 text-center backdrop-blur-md">
                <p className="text-xs font-bold text-amber-300 animate-pulse">
                  Chai đang quay tròn… Cả bàn cùng chờ xem ai dính chưởng!
                </p>
              </div>
            )}

            {currentStep === 'picking' && (
              <div className="rounded-3xl bg-slate-900/60 p-5 border border-slate-800/80 text-center backdrop-blur-md">
                <p className="text-xs font-bold text-slate-300">
                  🎯 Mũi chai đã chỉ vào <span className="text-rose-400 font-black">{victimPlayer?.name}</span>!
                </p>
                <p className="mt-1 text-[0.7rem] text-slate-400">
                  Đang đợi {victimPlayer?.name} chọn trên điện thoại (hoặc Host chọn hộ):
                </p>
                <div className="mt-3 flex justify-center gap-3">
                  <button
                    onClick={() => todSelectType(code, state, 'truth')}
                    className="rounded-xl bg-cyan-950/80 px-4 py-2 text-xs font-black text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 transition-colors"
                  >
                    🌶️ Chọn Sự Thật
                  </button>
                  <button
                    onClick={() => todSelectType(code, state, 'dare')}
                    className="rounded-xl bg-rose-950/80 px-4 py-2 text-xs font-black text-rose-300 border border-rose-500/40 hover:bg-rose-900 transition-colors"
                  >
                    🔥 Chọn Thử Thách
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'acting' && state.card && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`rounded-3xl p-6 text-center shadow-2xl border backdrop-blur-xl ${
                  state.card.type === 'truth'
                    ? 'bg-gradient-to-b from-cyan-950/90 to-slate-950 border-cyan-500/60 shadow-cyan-950/50'
                    : 'bg-gradient-to-b from-rose-950/90 to-slate-950 border-rose-500/60 shadow-rose-950/50'
                }`}
              >
                <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[0.68rem] font-black border border-white/10 uppercase">
                  {state.card.type === 'truth' ? (
                    <span className="text-cyan-400">🌶️ SỰ THẬT 18+ TÁO BẠO</span>
                  ) : (
                    <span className="text-rose-400">🔥 THỬ THÁCH TƯƠNG TÁC BÀN NHẬU</span>
                  )}
                </div>

                <p className="mt-2 text-xs font-bold text-slate-400">
                  Dành riêng cho <span className="text-white underline font-black">{victimPlayer?.name}</span>:
                </p>

                <h3 className="mt-3 text-lg font-black leading-snug text-white sm:text-xl drop-shadow-md min-h-[60px] flex items-center justify-center">
                  "{state.card.text}"
                </h3>

                {state.card.note && (
                  <p className="mt-2 text-[0.72rem] italic text-rose-300/80">
                    💡 {state.card.note}
                  </p>
                )}

                <div className="mt-4 rounded-xl bg-amber-500/10 p-2.5 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-2">
                  <span>🍺 Nếu trốn tránh / không dám:</span>
                  <span className="rounded bg-amber-500 px-2 py-0.5 text-black font-black">
                    PHẠT {state.card.penalty} LY BIA
                  </span>
                </div>

                {/* Host Control Buttons */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => todComplete(code, state)}
                    className="rounded-2xl bg-emerald-600 py-3 text-xs font-black text-white hover:bg-emerald-500 active:scale-95 transition-all shadow-lg shadow-emerald-950/50"
                  >
                    ✅ Đã Hoàn Thành
                  </button>

                  <button
                    onClick={() => todDrink(code, state, state.card!.penalty)}
                    className="rounded-2xl bg-gradient-to-r from-rose-700 to-amber-700 py-3 text-xs font-black text-white hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-rose-950/50"
                  >
                    🍻 Không Dám! Uống Phạt
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </main>

        {/* QR Popup */}
        <AnimatePresence>
          {showQr && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
              onClick={() => setShowQr(false)}
            >
              <div
                className="w-full max-w-xs rounded-3xl bg-slate-900 p-6 text-center border border-slate-800 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-sm font-black text-white">Quét Vào Bàn Nhậu</h3>
                <p className="mt-1 font-mono text-3xl font-black text-rose-400">{code}</p>
                <div className="mt-4 flex justify-center">
                  <div className="rounded-2xl bg-white p-3 shadow-lg">
                    <Qr value={url} size={160} />
                  </div>
                </div>
                <button
                  onClick={() => setShowQr(false)}
                  className="mt-5 w-full rounded-xl bg-slate-800 py-2 text-xs font-bold text-white hover:bg-slate-700"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Leaderboard Modal */}
        <AnimatePresence>
          {showLeaderboard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            >
              <div className="w-full max-w-sm rounded-3xl bg-slate-900 p-5 border border-amber-500/40 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-black text-amber-400 flex items-center gap-1.5">
                    <span>🍻</span>
                    <span>BẢNG VÀNG BỢM NHẬU</span>
                  </h3>
                  <button onClick={() => setShowLeaderboard(false)} className="text-slate-400 hover:text-white">
                    ✕
                  </button>
                </div>
                <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
                  {[...order]
                    .sort((a, b) => (state.drinks?.[b] ?? 0) - (state.drinks?.[a] ?? 0))
                    .map((uid, idx) => {
                      const p = players[uid]
                      if (!p) return null
                      const drinks = state.drinks?.[uid] ?? 0
                      return (
                        <div
                          key={uid}
                          className={`flex items-center justify-between rounded-xl p-2.5 border ${
                            idx === 0
                              ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base font-black">
                              {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                            </span>
                            <div>
                              <p className="text-xs font-bold text-white">{p.name}</p>
                              <p className="text-[0.62rem] text-slate-400">
                                {idx === 0 ? 'Trùm uống phạt' : 'Anh em bàn nhậu'}
                              </p>
                            </div>
                          </div>
                          <span className="rounded-lg bg-black/40 px-2.5 py-1 text-xs font-black text-amber-400">
                            {drinks} ly 🍻
                          </span>
                        </div>
                      )
                    })}
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setShowLeaderboard(false)}
                    className="w-full rounded-xl bg-amber-600 py-2.5 text-xs font-bold text-white hover:bg-amber-500"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stage>
  )
}
