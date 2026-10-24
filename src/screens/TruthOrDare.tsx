import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { SfxToggle } from '../ui/SfxToggle'
import { useTitle } from '../lib/useTitle'
import { sfx } from '../lib/sfx'
import { TRUTH_CARDS, DARE_CARDS, type CardItem } from '../data/truthOrDareData'

interface Player {
  id: string
  name: string
  drinks: number
}

const DEFAULT_PLAYERS: string[] = ['Tuấn', 'Hùng', 'Lan', 'Hương', 'Nam', 'Thảo']

export default function TruthOrDare() {
  useTitle('Sự Thật hay Thử Thách 18+ · TBoy Studio')

  // Players state
  const [players, setPlayers] = useState<Player[]>(() => {
    try {
      const saved = localStorage.getItem('tboy.tod.players')
      if (saved) return JSON.parse(saved)
    } catch {}
    return DEFAULT_PLAYERS.map((name, i) => ({ id: `p-${i}`, name, drinks: 0 }))
  })

  // Active game state
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [bottleAngle, setBottleAngle] = useState(0)
  const [currentCard, setCurrentCard] = useState<CardItem | null>(null)
  const [cardType, setCardType] = useState<'truth' | 'dare' | null>(null)
  const [customCards, setCustomCards] = useState<CardItem[]>(() => {
    try {
      const saved = localStorage.getItem('tboy.tod.custom')
      if (saved) return JSON.parse(saved)
    } catch {}
    return []
  })

  // Modals
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [customText, setCustomText] = useState('')
  const [customCardType, setCustomCardType] = useState<'truth' | 'dare'>('truth')
  const [customPenalty, setCustomPenalty] = useState(2)

  // Save players to storage
  useEffect(() => {
    try {
      localStorage.setItem('tboy.tod.players', JSON.stringify(players))
    } catch {}
  }, [players])

  // Save custom cards
  useEffect(() => {
    try {
      localStorage.setItem('tboy.tod.custom', JSON.stringify(customCards))
    } catch {}
  }, [customCards])

  // Sound effects helper
  const playSfx = (type: 'tap' | 'spin' | 'reveal' | 'drink' | 'win') => {
    try {
      if (type === 'tap') sfx.tap()
      else if (type === 'spin') sfx.vote()
      else if (type === 'reveal') sfx.reveal()
      else if (type === 'drink') sfx.death()
      else if (type === 'win') sfx.win()
    } catch {}
  }

  // Spin the bottle logic
  const spinBottle = () => {
    if (isSpinning || players.length === 0) return
    setIsSpinning(true)
    setCurrentCard(null)
    setCardType(null)
    playSfx('spin')

    // Generate random rotations (at least 4 full circles + landing slice)
    const extraTurns = Math.floor(Math.random() * 4) + 4
    const targetPlayerIdx = Math.floor(Math.random() * players.length)
    const sliceAngle = 360 / players.length
    // Center of target player's slice
    const targetAngle = targetPlayerIdx * sliceAngle
    const finalAngle = bottleAngle + extraTurns * 360 + (targetAngle - (bottleAngle % 360) + 360) % 360

    setBottleAngle(finalAngle)

    setTimeout(() => {
      setIsSpinning(false)
      setActivePlayerIndex(targetPlayerIdx)
      playSfx('win')
    }, 2800)
  }

  // Pick next player sequentially
  const nextPlayer = () => {
    if (players.length === 0) return
    setCurrentCard(null)
    setCardType(null)
    const nextIdx = (activePlayerIndex + 1) % players.length
    setActivePlayerIndex(nextIdx)
    playSfx('tap')
  }

  // Draw card
  const drawCard = (type: 'truth' | 'dare') => {
    setCardType(type)
    playSfx('reveal')

    const pool = (type === 'truth' ? TRUTH_CARDS : DARE_CARDS).concat(
      customCards.filter((c) => c.type === type),
    )

    if (pool.length === 0) {
      setCurrentCard({
        id: 'empty',
        type,
        text: 'Chưa có câu hỏi nào!',
        penalty: 1,
      })
      return
    }

    const randomCard = pool[Math.floor(Math.random() * pool.length)]
    setCurrentCard(randomCard)
  }

  // Draw random (truth or dare)
  const drawRandom = () => {
    const choice = Math.random() > 0.5 ? 'truth' : 'dare'
    drawCard(choice)
  }

  // Handle drink penalty
  const handleDrink = (penaltyCups: number) => {
    playSfx('drink')
    setPlayers((prev) =>
      prev.map((p, idx) => (idx === activePlayerIndex ? { ...p, drinks: p.drinks + penaltyCups } : p)),
    )
    // Advance to next turn
    setCurrentCard(null)
    setCardType(null)
  }

  // Handle completed dare/truth
  const handleComplete = () => {
    playSfx('tap')
    setCurrentCard(null)
    setCardType(null)
  }

  // Player management
  const addPlayer = () => {
    const trimmed = newPlayerName.trim()
    if (!trimmed) return
    const newP: Player = { id: `p-${Date.now()}`, name: trimmed, drinks: 0 }
    setPlayers((prev) => [...prev, newP])
    setNewPlayerName('')
    playSfx('tap')
  }

  const removePlayer = (id: string) => {
    if (players.length <= 2) {
      alert('Cần ít nhất 2 người để chơi!')
      return
    }
    setPlayers((prev) => prev.filter((p) => p.id !== id))
    setActivePlayerIndex(0)
    playSfx('tap')
  }

  // Add custom card
  const addCustomCard = () => {
    const trimmed = customText.trim()
    if (!trimmed) return
    const newCard: CardItem = {
      id: `custom-${Date.now()}`,
      type: customCardType,
      text: trimmed,
      penalty: customPenalty,
      note: 'Câu hỏi riêng từ người trong bàn!',
    }
    setCustomCards((prev) => [newCard, ...prev])
    setCustomText('')
    setShowCustomModal(false)
    playSfx('tap')
  }

  const currentPlayer = players[activePlayerIndex] || { name: 'Người chơi', drinks: 0 }

  return (
    <Stage mode="blood">
      <div className="mx-auto flex min-h-dvh max-w-4xl flex-col px-4 pb-16 sm:px-6">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-rose-900/60">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-1.5 text-xs font-bold text-slate-300 border border-slate-800 hover:text-white transition-colors"
          >
            ← Về Sảnh
          </Link>

          <div className="flex items-center gap-1.5">
            <span className="text-xl">🌶️</span>
            <span className="text-sm font-black tracking-wider text-rose-400 uppercase drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]">
              TRUTH OR DARE 18+
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLeaderboard(true)}
              className="grid h-8 w-8 place-items-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-sm hover:scale-105 transition-all shadow-sm"
              title="Bảng Bợm Nhậu"
            >
              🍻
            </button>
            <SfxToggle />
          </div>
        </header>

        {/* Warning banner 18+ */}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-rose-950/70 via-red-950/60 to-slate-950/70 px-3 py-2 border border-rose-500/30 text-rose-300 text-[0.72rem] shadow-md">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="rounded bg-rose-600 px-1.5 py-0.5 text-[0.62rem] text-white font-black">18+</span>
            Dành riêng cho bàn nhậu người lớn · Đã uống thì phải chơi tới bến!
          </span>
          <button
            onClick={() => setShowPlayerModal(true)}
            className="rounded-lg bg-rose-900/60 px-2 py-1 text-[0.68rem] font-bold text-rose-200 border border-rose-700/60 hover:bg-rose-800 transition-colors"
          >
            👥 Đổi người ({players.length})
          </button>
        </div>

        {/* Main Game Arena */}
        <main className="mt-4 flex flex-1 flex-col items-center">
          {/* Active Player Card */}
          <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 p-4 border border-rose-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] text-center relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500" />
            <p className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-400">Đang tới lượt</p>
            <h2 className="mt-1 text-2xl font-black text-rose-400 tracking-tight flex items-center justify-center gap-2">
              <span>👑</span>
              <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                {currentPlayer.name}
              </span>
            </h2>
            <div className="mt-1 flex items-center justify-center gap-2 text-[0.72rem] text-amber-400 font-semibold">
              <span>Đã uống phạt:</span>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 border border-amber-500/40 font-bold">
                🍻 {currentPlayer.drinks} ly
              </span>
            </div>
          </div>

          {/* Spin the Bottle / Circle Area */}
          <div className="relative mt-5 flex h-60 w-60 items-center justify-center sm:h-72 sm:w-72">
            {/* Circle of players */}
            {players.map((p, idx) => {
              const count = players.length
              const angle = (idx * 360) / count - 90
              const rad = (angle * Math.PI) / 180
              const radius = 100 // px
              const x = Math.cos(rad) * radius
              const y = Math.sin(rad) * radius
              const isSelected = idx === activePlayerIndex

              return (
                <div
                  key={p.id}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  className="absolute flex flex-col items-center justify-center transition-all duration-300"
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full text-xs font-black shadow-md border transition-all ${
                      isSelected
                        ? 'scale-125 bg-gradient-to-tr from-rose-600 to-amber-500 text-white border-white shadow-[0_0_15px_rgba(244,63,94,0.8)] z-10'
                        : 'bg-slate-900/90 text-slate-300 border-slate-700'
                    }`}
                  >
                    {p.name.slice(0, 1).toUpperCase()}
                  </span>
                  <span
                    className={`mt-1 max-w-[65px] truncate text-[0.62rem] font-bold ${
                      isSelected ? 'text-rose-300 font-black' : 'text-slate-400'
                    }`}
                  >
                    {p.name}
                  </span>
                </div>
              )
            })}

            {/* Beer Bottle in the center */}
            <div className="relative z-0">
              <motion.div
                animate={{ rotate: bottleAngle }}
                transition={{ duration: 2.8, ease: [0.15, 0.9, 0.3, 1] }}
                className="grid h-28 w-28 place-items-center select-none cursor-pointer"
                onClick={spinBottle}
              >
                {/* Custom SVG Beer Bottle */}
                <svg
                  viewBox="0 0 100 100"
                  className="h-28 w-28 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                >
                  {/* Bottle Neck */}
                  <rect x="46" y="8" width="8" height="24" rx="2" fill="#d97706" />
                  <rect x="44" y="6" width="12" height="4" rx="1" fill="#fbbf24" />
                  {/* Bottle Shoulder */}
                  <path d="M46 30 Q40 42 38 48 L62 48 Q60 42 54 30 Z" fill="#b45309" />
                  {/* Bottle Body */}
                  <rect x="38" y="48" width="24" height="42" rx="4" fill="#92400e" />
                  {/* Bottle Label */}
                  <rect x="39" y="56" width="22" height="24" rx="2" fill="#ef4444" />
                  <text x="50" y="72" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">
                    18+
                  </text>
                  {/* Direction pointer arrowhead */}
                  <polygon points="50,0 43,8 57,8" fill="#f43f5e" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Action to spin bottle or skip */}
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={spinBottle}
              disabled={isSpinning}
              className={`flex items-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-black shadow-lg transition-all ${
                isSpinning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-rose-600 to-amber-600 text-white hover:brightness-110 active:scale-95 shadow-rose-900/40'
              }`}
            >
              <span>🍾</span>
              <span>{isSpinning ? 'Đang xoay chai…' : 'Xoay Chai Chọn Người'}</span>
            </button>

            <button
              onClick={nextPlayer}
              disabled={isSpinning}
              className="flex items-center gap-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              title="Chuyền lượt cho người kế tiếp"
            >
              <span>Qua lượt</span>
              <span>➔</span>
            </button>
          </div>

          {/* Choose Truth or Dare Buttons */}
          {!currentCard && (
            <div className="mt-6 w-full max-w-md">
              <p className="text-center text-xs font-bold text-slate-400 mb-3">
                {currentPlayer.name} ơi, chọn số phận của bạn đêm nay:
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  onClick={() => drawCard('truth')}
                  disabled={isSpinning}
                  className="group relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-blue-900/40 to-cyan-950/60 p-4 border border-cyan-500/40 shadow-lg hover:border-cyan-400 hover:shadow-cyan-900/30 active:scale-95 transition-all text-center"
                >
                  <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">🌶️</span>
                  <span className="text-base font-black text-cyan-300">SỰ THẬT</span>
                  <span className="text-[0.62rem] text-slate-400 mt-0.5">Khai thật 100% bí mật</span>
                </button>

                <button
                  onClick={() => drawCard('dare')}
                  disabled={isSpinning}
                  className="group relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-rose-900/40 to-red-950/60 p-4 border border-rose-500/40 shadow-lg hover:border-rose-400 hover:shadow-rose-900/30 active:scale-95 transition-all text-center"
                >
                  <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">🔥</span>
                  <span className="text-base font-black text-rose-300">THỬ THÁCH</span>
                  <span className="text-[0.62rem] text-slate-400 mt-0.5">Làm hành động táo bạo</span>
                </button>
              </div>

              <div className="mt-3 text-center">
                <button
                  onClick={drawRandom}
                  disabled={isSpinning}
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-4 py-1.5 text-[0.72rem] font-bold text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
                >
                  <span>🎲</span>
                  <span>Ngẫu nhiên (Để số phận quyết định)</span>
                </button>
              </div>
            </div>
          )}

          {/* Card Presentation */}
          <AnimatePresence>
            {currentCard && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                className="mt-6 w-full max-w-md"
              >
                <div
                  className={`relative rounded-3xl p-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.8)] border backdrop-blur-xl ${
                    currentCard.type === 'truth'
                      ? 'bg-gradient-to-b from-cyan-950/90 via-slate-950 to-slate-950 border-cyan-500/50 shadow-cyan-950/40'
                      : 'bg-gradient-to-b from-rose-950/90 via-slate-950 to-slate-950 border-rose-500/50 shadow-rose-950/40'
                  }`}
                >
                  {/* Category Pill */}
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[0.68rem] font-bold border border-white/10 uppercase tracking-wider">
                    {currentCard.type === 'truth' ? (
                      <span className="text-cyan-400">🌶️ SỰ THẬT 18+ TÁO BẠO</span>
                    ) : (
                      <span className="text-rose-400">🔥 THỬ THÁCH TƯƠNG TÁC</span>
                    )}
                  </div>

                  {/* Target player callout */}
                  <p className="mt-3 text-xs font-extrabold text-slate-400">
                    Dành cho <span className="text-white underline">{currentPlayer.name}</span>:
                  </p>

                  {/* Card Main Text */}
                  <h3 className="mt-3 text-lg font-black leading-snug text-white sm:text-xl drop-shadow-md min-h-[70px] flex items-center justify-center">
                    "{currentCard.text}"
                  </h3>

                  {currentCard.note && (
                    <p className="mt-2 text-[0.72rem] italic text-rose-300/80">
                      💡 {currentCard.note}
                    </p>
                  )}

                  {/* Penalty indicator */}
                  <div className="mt-4 rounded-xl bg-amber-500/10 p-2.5 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-2">
                    <span>🍺 Nếu trốn tránh / không dám:</span>
                    <span className="rounded bg-amber-500 px-2 py-0.5 text-black font-black">
                      PHẠT {currentCard.penalty} LY BIA
                    </span>
                  </div>

                  {/* Action Decision Buttons */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      onClick={handleComplete}
                      className="flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 px-3 py-3 text-xs font-black text-white shadow-lg shadow-emerald-950/50 hover:bg-emerald-500 active:scale-95 transition-all"
                    >
                      <span>✅</span>
                      <span>Đã làm xong!</span>
                    </button>

                    <button
                      onClick={() => handleDrink(currentCard.penalty)}
                      className="flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-rose-700 to-amber-700 px-3 py-3 text-xs font-black text-white shadow-lg shadow-rose-950/50 hover:brightness-110 active:scale-95 transition-all"
                    >
                      <span>🍻</span>
                      <span>Không dám! Uống phạt</span>
                    </button>
                  </div>

                  {/* Re-roll */}
                  <div className="mt-3 flex justify-center">
                    <button
                      onClick={() => {
                        handleDrink(1)
                        if (cardType) drawCard(cardType)
                      }}
                      className="text-[0.68rem] text-slate-400 hover:text-slate-200 underline font-semibold transition-colors"
                    >
                      Đổi câu khác (Tự nguyện phạt 1 ly) 🔄
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Level Filters & Custom Question Button */}
          <div className="mt-8 w-full max-w-md rounded-2xl bg-slate-900/60 p-4 border border-slate-800/80 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Gài bẫy người khác:</span>
              <button
                onClick={() => setShowCustomModal(true)}
                className="rounded-xl bg-cyan-950/80 border border-cyan-500/50 px-3 py-1.5 text-[0.68rem] font-bold text-cyan-300 hover:bg-cyan-900 transition-colors"
              >
                + Gài thêm câu hỏi mới
              </button>
            </div>
          </div>
        </main>

        {/* Players Management Modal */}
        <AnimatePresence>
          {showPlayerModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 10 }}
                className="w-full max-w-sm rounded-3xl bg-slate-900 p-5 border border-slate-800 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-black text-white">Danh Sách Bàn Nhậu ({players.length})</h3>
                  <button
                    onClick={() => setShowPlayerModal(false)}
                    className="text-slate-400 hover:text-white text-base"
                  >
                    ✕
                  </button>
                </div>

                {/* Add new player */}
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                    placeholder="Tên người chơi mới…"
                    maxLength={12}
                    className="flex-1 rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    onClick={addPlayer}
                    className="rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-rose-500 transition-colors"
                  >
                    + Thêm
                  </button>
                </div>

                {/* Player list */}
                <div className="mt-4 max-h-56 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-800/40">
                  {players.map((p, idx) => (
                    <div key={p.id} className="flex items-center justify-between pt-1.5">
                      <div className="flex items-center gap-2">
                        <span className="grid h-6 w-6 place-items-center rounded-lg bg-slate-800 text-[0.68rem] font-bold text-rose-400">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-white">{p.name}</span>
                        <span className="text-[0.62rem] text-amber-400 font-semibold">
                          ({p.drinks} ly)
                        </span>
                      </div>
                      <button
                        onClick={() => removePlayer(p.id)}
                        className="text-slate-500 hover:text-rose-400 text-xs px-2 py-1"
                      >
                        Xoá
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => setShowPlayerModal(false)}
                    className="w-full rounded-2xl bg-slate-800 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition-colors"
                  >
                    Xong
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drunkard Leaderboard Modal */}
        <AnimatePresence>
          {showLeaderboard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 10 }}
                className="w-full max-w-sm rounded-3xl bg-slate-900 p-5 border border-amber-500/40 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-black text-amber-400 flex items-center gap-1.5">
                    <span>🍻</span>
                    <span>BẢNG VÀNG BỢM NHẬU</span>
                  </h3>
                  <button
                    onClick={() => setShowLeaderboard(false)}
                    className="text-slate-400 hover:text-white text-base"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
                  {[...players]
                    .sort((a, b) => b.drinks - a.drinks)
                    .map((p, idx) => (
                      <div
                        key={p.id}
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
                              {idx === 0 ? 'Vua phá mồi kiêm trùm uống' : 'Anh em bàn nhậu'}
                            </p>
                          </div>
                        </div>

                        <span className="rounded-lg bg-black/40 px-2.5 py-1 text-xs font-black text-amber-400">
                          {p.drinks} ly
                        </span>
                      </div>
                    ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setPlayers((prev) => prev.map((p) => ({ ...p, drinks: 0 })))
                      playSfx('tap')
                    }}
                    className="flex-1 rounded-xl bg-slate-800 py-2 text-[0.72rem] font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    Đặt lại số ly
                  </button>
                  <button
                    onClick={() => setShowLeaderboard(false)}
                    className="flex-1 rounded-xl bg-amber-600 py-2 text-[0.72rem] font-bold text-white hover:bg-amber-500 transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Card Modal */}
        <AnimatePresence>
          {showCustomModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 10 }}
                className="w-full max-w-sm rounded-3xl bg-slate-900 p-5 border border-cyan-500/40 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-black text-cyan-400">Gài Câu Hỏi / Thử Thách Mới</h3>
                  <button
                    onClick={() => setShowCustomModal(false)}
                    className="text-slate-400 hover:text-white text-base"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-[0.68rem] font-bold text-slate-400 mb-1">Loại thẻ:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCustomCardType('truth')}
                        className={`rounded-xl py-2 text-xs font-bold border transition-colors ${
                          customCardType === 'truth'
                            ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        🌶️ Sự thật
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomCardType('dare')}
                        className={`rounded-xl py-2 text-xs font-bold border transition-colors ${
                          customCardType === 'dare'
                            ? 'bg-rose-950 border-rose-500 text-rose-300'
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        🔥 Thử thách
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[0.68rem] font-bold text-slate-400 mb-1">
                      Nội dung câu hỏi / thử thách hiểm:
                    </label>
                    <textarea
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Nhập điều bạn muốn người khác phải khai hoặc làm…"
                      rows={3}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.68rem] font-bold text-slate-400 mb-1">
                      Mức phạt nếu không dám làm:
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setCustomPenalty(num)}
                          className={`flex-1 rounded-xl py-1.5 text-xs font-black border transition-colors ${
                            customPenalty === num
                              ? 'bg-amber-500 border-amber-400 text-black'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {num} Ly Bia 🍻
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={addCustomCard}
                    className="w-full mt-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 py-2.5 text-xs font-black text-white shadow-lg shadow-cyan-950/50 hover:brightness-110 active:scale-95 transition-all"
                  >
                    Lưu Thẻ Vào Bộ Bài
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Stage>
  )
}
