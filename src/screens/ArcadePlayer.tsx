import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { SfxToggle } from '../ui/SfxToggle'
import { paths, store } from '../lib/store'
import { readPref, writePref, NAME_KEY, AVATAR_KEY, joinRoom } from '../lib/room'
import { sfx } from '../lib/sfx'
import {
  arcadeSendInput,
  arcadeTapButton,
  arcadeSendDoodleStroke,
  arcadeClearDoodle,
  ARCADE_GAMES_INFO,
  type ArcadeDoodleStroke,
  type ArcadeState,
} from '../game/arcadeEngine'
import type { Player } from '../game/types'

export default function ArcadePlayer() {
  const { code = '' } = useParams()
  const [uid, setUid] = useState<string | null>(null)
  const [player, setPlayer] = useState<Player | null>(null)
  const [state, setState] = useState<ArcadeState | null>(null)
  const [joined, setJoined] = useState(false)
  const [name, setName] = useState(readPref(NAME_KEY) || '')
  const [avatarIndex, setAvatarIndex] = useState(Number(readPref(AVATAR_KEY)) || 0)
  const [isJoining, setIsJoining] = useState(false)
  const [localTaps, setLocalTaps] = useState(0)
  const [dashCooling, setDashCooling] = useState(false)
  const [jumpCooling, setJumpCooling] = useState(false)
  const [isHoldingRun, setIsHoldingRun] = useState(false)

  // Doodle state
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [brushColor, setBrushColor] = useState('#ffffff')
  const isDrawing = useRef(false)
  const curStroke = useRef<ArcadeDoodleStroke | null>(null)

  // Track active direction for D-pad
  const activeDir = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 })

  useEffect(() => {
    if (!code) return
    let alive = true
    void (async () => {
      const id = await store.ensureAuth()
      if (!alive) return
      setUid(id)

      store.sub<Player>(paths.player(code, id), (p) => {
        if (!alive) return
        setPlayer(p)
        if (p) setJoined(true)
      })

      store.sub<ArcadeState>(paths.arcade(code), (st) => {
        if (!alive) return
        setState(st)
      })
    })()

    return () => {
      alive = false
    }
  }, [code])

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim() || 'Đấu thủ'
    setIsJoining(true)
    try {
      sfx.tap()
      writePref(NAME_KEY, trimmed)
      writePref(AVATAR_KEY, String(avatarIndex))
      await joinRoom(code, trimmed, avatarIndex)
      setJoined(true)
    } finally {
      setIsJoining(false)
    }
  }

  const sendDirection = (dx: number, dy: number) => {
    if (!uid || !code) return
    activeDir.current = { dx, dy }
    void arcadeSendInput(code, uid, { dx, dy })
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(12)
    }
  }

  const handleDash = () => {
    if (!uid || !code || dashCooling) return
    setDashCooling(true)
    sfx.tap()
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 20, 50])
    }
    void arcadeSendInput(code, uid, {
      ...activeDir.current,
      dash: true,
    })
    setTimeout(() => {
      setDashCooling(false)
    }, 1200)
  }

  const handleJump = () => {
    if (!uid || !code || jumpCooling) return
    setJumpCooling(true)
    sfx.jump()
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(35)
    }
    void arcadeSendInput(code, uid, {
      ...activeDir.current,
      jump: true,
    })
    setTimeout(() => {
      setJumpCooling(false)
    }, 900)
  }

  const handleTugTap = () => {
    if (!uid || !code) return
    setLocalTaps((prev) => prev + 1)
    sfx.tap()
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(20)
    }
    void arcadeTapButton(code, uid)
  }

  // Red light run button handlers
  const handleRunStart = () => {
    if (!uid || !code) return
    setIsHoldingRun(true)
    sfx.tap()
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(20)
    }
    void arcadeSendInput(code, uid, { isHoldingRun: true })
  }

  const handleRunEnd = () => {
    if (!uid || !code) return
    setIsHoldingRun(false)
    void arcadeSendInput(code, uid, { isHoldingRun: false })
  }

  // Doodle canvas drawing
  const getCanvasPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    return {
      x: ((clientX - rect.left) / rect.width) * 300,
      y: ((clientY - rect.top) / rect.height) * 300,
    }
  }

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    isDrawing.current = true
    const pos = getCanvasPos(e)
    curStroke.current = {
      color: brushColor,
      width: 4,
      points: [pos],
    }
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.beginPath()
        ctx.strokeStyle = brushColor
        ctx.lineWidth = 4
        ctx.lineCap = 'round'
        ctx.moveTo(pos.x, pos.y)
      }
    }
  }

  const drawMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing.current || !curStroke.current) return
    const pos = getCanvasPos(e)
    curStroke.current.points.push(pos)
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.lineTo(pos.x, pos.y)
        ctx.stroke()
      }
    }
  }

  const endDrawing = () => {
    if (!isDrawing.current || !curStroke.current || !uid || !code) return
    isDrawing.current = false
    void arcadeSendDoodleStroke(code, uid, curStroke.current)
    curStroke.current = null
  }

  const handleClearCanvas = () => {
    if (!uid || !code) return
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    sfx.tap()
    void arcadeClearDoodle(code, uid)
  }

  // Not joined yet: Show Join Form
  if (!joined || !player) {
    return (
      <Stage>
        <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6 py-10">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white">
            ← Về trang chủ
          </Link>
          <div className="midnight-card p-7 sm:p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-[0.66rem] font-bold text-pink-400 uppercase">
              <span className="h-2 w-2 rounded-full bg-pink-400 animate-ping" />
              Party Arcade Gamepad
            </div>
            <h1 className="display text-2xl font-bold text-white mt-3">Nhập Đấu Trường</h1>
            <p className="mt-1 text-xs text-slate-400">Chọn biệt danh và hình đại diện của bạn.</p>

            <form onSubmit={handleJoin} className="mt-6 space-y-5">
              <div>
                <label className="text-xs font-medium text-slate-300">Biệt danh thi đấu</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Cáo Siêu Tốc"
                  maxLength={15}
                  className="field mt-1.5 w-full text-base font-semibold"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Linh vật đại diện</label>
                <div className="grid grid-cols-4 gap-2.5 mt-2">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatarIndex(idx)}
                      className={`grid place-items-center p-2 rounded-2xl border transition-all ${
                        avatarIndex === idx
                          ? 'border-pink-500 bg-pink-500/20 scale-105 shadow-[0_0_12px_rgba(236,72,153,0.3)]'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <Avatar index={idx} size={42} />
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isJoining}
                className="btn btn-primary btn-lg w-full text-sm font-bold bg-pink-600 hover:bg-pink-500 border-none shadow-[0_4px_20px_rgba(236,72,153,0.4)]"
              >
                {isJoining ? 'Đang vào...' : '⚡ Sẵn Sàng Chiến!'}
              </button>
            </form>
          </div>
        </div>
      </Stage>
    )
  }

  const me = uid && state?.players ? state.players[uid] : null
  const hasBomb = Boolean(me?.hasBomb)
  const isEliminated = me && !me.alive
  const gameInfo = state ? ARCADE_GAMES_INFO[state.activeGame] : null

  return (
    <div
      className={`min-h-dvh flex flex-col select-none touch-none transition-colors duration-300 ${
        hasBomb
          ? 'bg-gradient-to-b from-red-950 via-slate-950 to-slate-950'
          : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Avatar index={player.avatar} size={36} ring />
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>{player.name}</span>
              {me?.team && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[0.65rem] font-black ${
                    me.team === 'A' ? 'bg-red-500/30 text-red-300' : 'bg-blue-500/30 text-blue-300'
                  }`}
                >
                  Đội {me.team === 'A' ? 'Đỏ' : 'Xanh'}
                </span>
              )}
            </div>
            <div className="text-[0.68rem] font-semibold text-pink-400">
              Điểm: {state?.scores?.[uid || ''] ?? 0} ⭐
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[0.68rem] font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {code}
          </span>
          <SfxToggle />
        </div>
      </div>

      {/* Main Game Screen Controller */}
      <div className="flex-1 flex flex-col justify-between p-4 max-w-md mx-auto w-full">
        {/* Game Status Banner */}
        <div className="text-center pt-2">
          {state?.status === 'lobby' || !state ? (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-4xl animate-bounce inline-block mb-3">📺</span>
              <h2 className="text-lg font-bold text-white">Đã Kết Nối Tay Cầm!</h2>
              <p className="text-xs text-slate-400 mt-1">
                Hãy nhìn lên màn hình TV/Laptop, Chủ phòng đang chọn mini-game...
              </p>
            </div>
          ) : (
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 shadow">
                <span>{gameInfo?.icon}</span>
                <span>{gameInfo?.name}</span>
                <span className="text-pink-400 font-mono">({state.timerSeconds}s)</span>
              </div>

              {/* Special Warnings */}
              {hasBomb && (
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="mt-3 p-3 rounded-2xl bg-red-600/90 text-white shadow-[0_0_25px_rgba(239,68,68,0.6)] font-black text-sm tracking-wide border-2 border-red-300"
                >
                  💣 BẠN ĐANG CẦM BOM! CHẠY ĐỤNG NGƯỜI KHÁC NGAY!
                </motion.div>
              )}

              {isEliminated && (
                <div className="mt-3 p-3 rounded-2xl bg-slate-900 border border-red-500/40 text-red-400 font-bold text-xs">
                  💀 BẠN ĐÃ BỊ LOẠI! ĐANG THEO DÕI TRẬN ĐẤU...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dynamic Controls based on mini-game */}
        {state?.status === 'playing' && !isEliminated && (
          <div className="py-4 flex-1 flex flex-col justify-center">
            {/* 1. TUG OF WAR: GIANT BUTTON */}
            {state.activeGame === 'tug-war' && (
              <div className="flex flex-col items-center justify-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={handleTugTap}
                  className="w-56 h-56 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 text-white font-black text-2xl shadow-[0_0_40px_rgba(244,63,94,0.6)] border-4 border-white/30 flex flex-col items-center justify-center active:brightness-125"
                >
                  <span className="text-5xl mb-2">⚡</span>
                  <span>ĐẬP NÚT!</span>
                  <span className="text-xs tracking-widest mt-1 opacity-80 uppercase">
                    Càng Nhanh Càng Tốt
                  </span>
                </motion.button>
                <div className="text-xs font-mono font-bold text-pink-300">
                  Bạn đã đập: <span className="text-base text-white">{localTaps}</span> cú
                </div>
              </div>
            )}

            {/* 2. DOODLE DUEL: TOUCH CANVAS */}
            {state.activeGame === 'doodle-duel' && (
              <div className="flex flex-col items-center gap-3">
                <div className="px-3 py-1.5 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold">
                  Từ khóa của bạn: <b className="text-white text-sm">{state.doodlePrompt || 'Tranh vẽ'}</b>
                </div>

                <div className="relative w-[300px] h-[300px] rounded-2xl border-2 border-slate-700 bg-slate-900 overflow-hidden shadow-2xl">
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={300}
                    onTouchStart={startDrawing}
                    onTouchMove={drawMove}
                    onTouchEnd={endDrawing}
                    onMouseDown={startDrawing}
                    onMouseMove={drawMove}
                    onMouseUp={endDrawing}
                    className="w-full h-full block cursor-crosshair touch-none"
                  />
                </div>

                {/* Color Palette & Clear */}
                <div className="flex items-center gap-3 mt-1">
                  {['#ffffff', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'].map((col) => (
                    <button
                      key={col}
                      onClick={() => setBrushColor(col)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        brushColor === col ? 'scale-125 border-white shadow-lg' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                  <button
                    onClick={handleClearCanvas}
                    className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 ml-2"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            )}

            {/* 3. RED LIGHT GREEN LIGHT: HOLD TO RUN BUTTON */}
            {state.activeGame === 'red-light' && (
              <div className="flex flex-col items-center justify-center gap-4">
                <div
                  className={`text-sm font-black px-4 py-2 rounded-2xl border ${
                    state.redLightDollState === 'green'
                      ? 'bg-green-500/20 text-green-300 border-green-500/40'
                      : state.redLightDollState === 'turning'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                        : 'bg-red-500/20 text-red-300 border-red-500/40'
                  }`}
                >
                  {state.redLightDollState === 'green'
                    ? '🟢 ĐÈN XANH: GIỮ NÚT ĐỂ CHẠY!'
                    : state.redLightDollState === 'turning'
                      ? '🟡 CHUẨN BỊ... SẮP ĐÈN ĐỎ!'
                      : '🔴 ĐÈN ĐỎ! THẢ TAY ĐỨNG IM NGAY!'}
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onTouchStart={handleRunStart}
                  onTouchEnd={handleRunEnd}
                  onMouseDown={handleRunStart}
                  onMouseUp={handleRunEnd}
                  className={`w-56 h-56 rounded-full font-black text-xl border-4 shadow-2xl flex flex-col items-center justify-center transition-all ${
                    isHoldingRun
                      ? 'bg-green-600 text-white border-green-300 shadow-[0_0_50px_rgba(34,197,94,0.6)] scale-105'
                      : 'bg-slate-900 text-slate-300 border-slate-700'
                  }`}
                >
                  <span className="text-5xl mb-2">{isHoldingRun ? '🏃' : '🛑'}</span>
                  <span>{isHoldingRun ? 'ĐANG CHẠY!' : 'GIỮ ĐỂ CHẠY'}</span>
                  <span className="text-[0.65rem] tracking-widest mt-1 opacity-70 uppercase">
                    Thả ra để đứng im
                  </span>
                </motion.button>
              </div>
            )}

            {/* 4. D-PAD CONTROLLERS (Bomb Tag, Sumo, Snowball, Laser Dodge, Big Fish, Chicken Catch, Moving Day) */}
            {state.activeGame !== 'tug-war' &&
              state.activeGame !== 'doodle-duel' &&
              state.activeGame !== 'red-light' && (
                <div className="flex flex-col items-center gap-5">
                  {/* D-Pad Controller */}
                  <div className="relative w-56 h-56">
                    {/* Up */}
                    <button
                      onTouchStart={() => sendDirection(0, -1)}
                      onTouchEnd={() => sendDirection(0, 0)}
                      onMouseDown={() => sendDirection(0, -1)}
                      onMouseUp={() => sendDirection(0, 0)}
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-slate-800 active:bg-pink-600 border border-slate-700 active:border-pink-400 shadow-lg text-2xl flex items-center justify-center font-bold text-white active:scale-95 transition-transform"
                    >
                      ▲
                    </button>
                    {/* Left */}
                    <button
                      onTouchStart={() => sendDirection(-1, 0)}
                      onTouchEnd={() => sendDirection(0, 0)}
                      onMouseDown={() => sendDirection(-1, 0)}
                      onMouseUp={() => sendDirection(0, 0)}
                      className="absolute top-1/2 left-0 -translate-y-1/2 w-16 h-16 rounded-2xl bg-slate-800 active:bg-pink-600 border border-slate-700 active:border-pink-400 shadow-lg text-2xl flex items-center justify-center font-bold text-white active:scale-95 transition-transform"
                    >
                      ◀
                    </button>
                    {/* Center Dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-500">
                      🕹️
                    </div>
                    {/* Right */}
                    <button
                      onTouchStart={() => sendDirection(1, 0)}
                      onTouchEnd={() => sendDirection(0, 0)}
                      onMouseDown={() => sendDirection(1, 0)}
                      onMouseUp={() => sendDirection(0, 0)}
                      className="absolute top-1/2 right-0 -translate-y-1/2 w-16 h-16 rounded-2xl bg-slate-800 active:bg-pink-600 border border-slate-700 active:border-pink-400 shadow-lg text-2xl flex items-center justify-center font-bold text-white active:scale-95 transition-transform"
                    >
                      ▶
                    </button>
                    {/* Down */}
                    <button
                      onTouchStart={() => sendDirection(0, 1)}
                      onTouchEnd={() => sendDirection(0, 0)}
                      onMouseDown={() => sendDirection(0, 1)}
                      onMouseUp={() => sendDirection(0, 0)}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-slate-800 active:bg-pink-600 border border-slate-700 active:border-pink-400 shadow-lg text-2xl flex items-center justify-center font-bold text-white active:scale-95 transition-transform"
                    >
                      ▼
                    </button>
                  </div>

                  {/* Special Action Button: DASH for Sumo */}
                  {state.activeGame === 'sumo' && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDash}
                      disabled={dashCooling}
                      className={`w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 border shadow-lg transition-all ${
                        dashCooling
                          ? 'bg-slate-800/80 text-slate-500 border-slate-700'
                          : 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                      }`}
                    >
                      <span>⚡</span>
                      <span>{dashCooling ? 'Đang hồi sức...' : 'HÚC MẠNH (DASH)!'}</span>
                    </motion.button>
                  )}

                  {/* Special Action Button: JUMP for Laser Dodge */}
                  {state.activeGame === 'laser-dodge' && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleJump}
                      disabled={jumpCooling}
                      className={`w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 border shadow-lg transition-all ${
                        jumpCooling
                          ? 'bg-slate-800/80 text-slate-500 border-slate-700'
                          : 'bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                      }`}
                    >
                      <span>🦘</span>
                      <span>{jumpCooling ? 'Chuẩn bị...' : 'NHẢY QUA LASER!'}</span>
                    </motion.button>
                  )}
                </div>
              )}
          </div>
        )}

        {/* Footer info */}
        <div className="text-center text-[0.68rem] text-slate-400 pb-2">
          Đang điều khiển tại phòng <b className="text-white font-mono">{code}</b> · Không cần chạm vào màn hình TV
        </div>
      </div>
    </div>
  )
}
