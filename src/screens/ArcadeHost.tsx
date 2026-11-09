import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { Qr } from '../ui/Qr'
import { SfxToggle } from '../ui/SfxToggle'
import { Toast } from '../ui/Toast'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import { joinUrl, joinRoom, deleteRoom, addBotPlayer, removeBotPlayer } from '../lib/room'
import { sfx } from '../lib/sfx'
import {
  arcadeStartGame,
  initArcadeState,
  ARCADE_COLORS,
  ARCADE_GAMES_INFO,
  type ArcadeGameType,
  type ArcadeInput,
  type ArcadePlayerEntity,
  type ArcadeState,
} from '../game/arcadeEngine'
import { avatarOf } from '../lib/avatars'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  life: number
  maxLife: number
}

const ALL_GAME_KEYS: ArcadeGameType[] = [
  'bomb-tag',
  'sumo',
  'tug-war',
  'snowball',
  'laser-dodge',
  'big-fish',
  'chicken-catch',
  'doodle-duel',
  'moving-day',
  'red-light',
]

export default function ArcadeHost() {
  const { code = '' } = useParams()
  const navigate = useNavigate()
  const room = useGameRoom(code)
  const { uid, players, isHost } = room

  const [state, setState] = useState<ArcadeState | null>(null)
  const [selectedGame, setSelectedGame] = useState<ArcadeGameType>('bomb-tag')
  const [isStarting, setIsStarting] = useState(false)
  const [tournamentMode, setTournamentMode] = useState(false)
  const [lobbyTab, setLobbyTab] = useState<'players' | 'games'>('players')
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'error' | 'success' } | null>(null)

  // Simulation physics refs for 60fps canvas loop
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const entitiesRef = useRef<Record<string, ArcadePlayerEntity>>({})
  const inputsRef = useRef<Record<string, ArcadeInput>>({})
  const stateRef = useRef<ArcadeState | null>(null)
  const animFrameId = useRef<number | null>(null)
  const lastSyncTime = useRef<number>(0)
  const roundTimerSec = useRef<number>(30)

  // Particle & Shake System
  const particlesRef = useRef<Particle[]>([])
  const screenShakeRef = useRef<number>(0)

  const url = joinUrl(code)
  const order = useMemo(
    () => Object.keys(players).sort((a, b) => (players[a]?.joinedAt ?? 0) - (players[b]?.joinedAt ?? 0)),
    [players]
  )
  const isHostPlaying = Boolean(uid && players[uid])

  const showToast = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
    setToast({ message, type })
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev))
    }, 3000)
  }

  const addParticles = (x: number, y: number, color: string, count = 12, speed = 80) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const spd = (0.3 + Math.random() * 0.7) * speed
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        size: 3 + Math.random() * 4,
        color,
        alpha: 1,
        life: 0,
        maxLife: 0.4 + Math.random() * 0.5,
      })
    }
  }

  const shakeScreen = (amount = 8) => {
    screenShakeRef.current = Math.max(screenShakeRef.current, amount)
  }

  // Sync state from store
  useEffect(() => {
    if (!code) return
    const unsub = store.sub<ArcadeState>(paths.arcade(code), (v) => {
      setState(v)
      stateRef.current = v
      if (v?.players) {
        entitiesRef.current = { ...v.players }
      }
    })
    return () => unsub()
  }, [code])

  // Subscribe to all inputs
  useEffect(() => {
    if (!code) return
    const unsubs: (() => void)[] = []
    order.forEach((pid) => {
      unsubs.push(
        store.sub<ArcadeInput>(paths.arcadeInput(code, pid), (inp) => {
          if (inp) {
            inputsRef.current[pid] = inp
            if (inp.stroke && stateRef.current?.doodleDrawings) {
              const list = stateRef.current.doodleDrawings[pid] || []
              stateRef.current.doodleDrawings[pid] = [...list, inp.stroke]
            }
            if (inp.clearDoodle && stateRef.current?.doodleDrawings) {
              stateRef.current.doodleDrawings[pid] = []
            }
          }
        })
      )
    })
    return () => {
      unsubs.forEach((fn) => fn())
    }
  }, [code, order])

  // Smart Bot AI generator for all 10 games
  useEffect(() => {
    if (!isHost || state?.status !== 'playing') return
    const botInterval = setInterval(() => {
      const curState = stateRef.current
      if (!curState || curState.status !== 'playing') return

      const uids = Object.keys(entitiesRef.current)
      const bots = uids.filter((id) => id.startsWith('bot-'))

      bots.forEach((botId) => {
        const bot = entitiesRef.current[botId]
        if (!bot || !bot.alive) return

        const g = curState.activeGame
        if (g === 'bomb-tag') {
          const bombCarrier = Object.values(entitiesRef.current).find((p) => p.hasBomb && p.alive)
          if (bot.hasBomb) {
            let nearest: ArcadePlayerEntity | null = null
            let minDist = Infinity
            Object.values(entitiesRef.current).forEach((other) => {
              if (other.uid !== botId && other.alive) {
                const dist = Math.hypot(other.x - bot.x, other.y - bot.y)
                if (dist < minDist) {
                  minDist = dist
                  nearest = other
                }
              }
            })
            if (nearest) {
              const dx = (nearest as ArcadePlayerEntity).x > bot.x ? 1 : -1
              const dy = (nearest as ArcadePlayerEntity).y > bot.y ? 1 : -1
              inputsRef.current[botId] = { dx, dy, updatedAt: Date.now() }
            }
          } else if (bombCarrier) {
            const dx = bot.x > bombCarrier.x ? 1 : -1
            const dy = bot.y > bombCarrier.y ? 1 : -1
            inputsRef.current[botId] = { dx, dy, updatedAt: Date.now() }
          }
        } else if (g === 'sumo' || g === 'snowball') {
          const distToCenter = Math.hypot(bot.x - 50, bot.y - 50)
          if (distToCenter > 25) {
            const dx = 50 > bot.x ? 1 : -1
            const dy = 50 > bot.y ? 1 : -1
            inputsRef.current[botId] = { dx, dy, updatedAt: Date.now() }
          } else {
            let nearest: ArcadePlayerEntity | null = null
            let minDist = Infinity
            Object.values(entitiesRef.current).forEach((other) => {
              if (other.uid !== botId && other.alive) {
                const dist = Math.hypot(other.x - bot.x, other.y - bot.y)
                if (dist < minDist) {
                  minDist = dist
                  nearest = other
                }
              }
            })
            if (nearest) {
              const dx = (nearest as ArcadePlayerEntity).x > bot.x ? 1 : -1
              const dy = (nearest as ArcadePlayerEntity).y > bot.y ? 1 : -1
              const shouldDash = minDist < 15 && Math.random() < 0.35
              inputsRef.current[botId] = { dx, dy, dash: shouldDash, updatedAt: Date.now() }
            }
          }
        } else if (g === 'tug-war') {
          const curInp = inputsRef.current[botId] || { dx: 0, dy: 0, tapCount: 0, updatedAt: 0 }
          inputsRef.current[botId] = {
            ...curInp,
            tapCount: (curInp.tapCount || 0) + (Math.random() < 0.75 ? 1 : 0),
            updatedAt: Date.now(),
          }
        } else if (g === 'laser-dodge') {
          const shouldJump = Math.random() < 0.25
          const dx = (Math.random() - 0.5) * 2
          const dy = (Math.random() - 0.5) * 2
          inputsRef.current[botId] = { dx, dy, jump: shouldJump, updatedAt: Date.now() }
        } else if (g === 'big-fish') {
          if (curState.foods && curState.foods.length > 0) {
            const f = curState.foods[Math.floor(Math.random() * curState.foods.length)]
            const dx = f.x > bot.x ? 1 : -1
            const dy = f.y > bot.y ? 1 : -1
            inputsRef.current[botId] = { dx, dy, updatedAt: Date.now() }
          }
        } else if (g === 'chicken-catch') {
          if ((bot.chickensHeld || 0) > 0) {
            const penX = bot.penIndex === 1 || bot.penIndex === 3 ? 85 : 15
            const penY = bot.penIndex === 2 || bot.penIndex === 3 ? 82 : 18
            const dx = penX > bot.x ? 1 : -1
            const dy = penY > bot.y ? 1 : -1
            inputsRef.current[botId] = { dx, dy, updatedAt: Date.now() }
          } else if (curState.chickens) {
            const ch = curState.chickens.find((c) => !c.heldBy)
            if (ch) {
              const dx = ch.x > bot.x ? 1 : -1
              const dy = ch.y > bot.y ? 1 : -1
              inputsRef.current[botId] = { dx, dy, updatedAt: Date.now() }
            }
          }
        } else if (g === 'red-light') {
          if (curState.redLightDollState === 'green') {
            inputsRef.current[botId] = { dx: 0, dy: -1, isHoldingRun: true, updatedAt: Date.now() }
          } else {
            inputsRef.current[botId] = { dx: 0, dy: 0, isHoldingRun: false, updatedAt: Date.now() }
          }
        } else if (g === 'moving-day') {
          if (bot.carryingItem) {
            const dx = 50 > bot.x ? 1 : -1
            const dy = 15 > bot.y ? 1 : -1
            inputsRef.current[botId] = { dx, dy, updatedAt: Date.now() }
          } else if (curState.furnitures) {
            const fn = curState.furnitures.find((f) => !f.heldBy && !f.delivered)
            if (fn) {
              const dx = fn.x > bot.x ? 1 : -1
              const dy = fn.y > bot.y ? 1 : -1
              inputsRef.current[botId] = { dx, dy, updatedAt: Date.now() }
            }
          }
        }
      })
    }, 160)

    return () => clearInterval(botInterval)
  }, [isHost, state?.status])

  // Red light doll state manager
  useEffect(() => {
    if (!isHost || state?.status !== 'playing' || state?.activeGame !== 'red-light') return
    const id = setInterval(() => {
      const curState = stateRef.current
      if (!curState || curState.activeGame !== 'red-light') return

      const now = Date.now()
      if (now >= (curState.redLightNextSwitchAt || 0)) {
        if (curState.redLightDollState === 'green') {
          curState.redLightDollState = 'turning'
          curState.redLightNextSwitchAt = now + 900
          curState.lastEventText = '⚠️ Búp bê sắp quay lại! Chuẩn bị DỪNG!'
          sfx.vote()
        } else if (curState.redLightDollState === 'turning') {
          curState.redLightDollState = 'red'
          curState.redLightNextSwitchAt = now + 2000 + Math.random() * 2000
          curState.lastEventText = '🔴 ĐÈN ĐỎ! ĐỨNG IM PHĂNG PHẮC!'
          sfx.laser()
          shakeScreen(4)
        } else {
          curState.redLightDollState = 'green'
          curState.redLightNextSwitchAt = now + 2500 + Math.random() * 2500
          curState.lastEventText = '🟢 ĐÈN XANH! CHẠY TIẾP ĐI!'
          sfx.join()
        }
      }
    }, 200)

    return () => clearInterval(id)
  }, [isHost, state?.status, state?.activeGame])

  // Main 60FPS Game Loop
  useEffect(() => {
    if (!state || state.status !== 'playing') {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
      return
    }

    let lastTick = performance.now()

    const loop = (now: number) => {
      const dt = Math.min((now - lastTick) / 1000, 0.1)
      lastTick = now

      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          renderAndPhysics(ctx, canvas.width, canvas.height, dt)
        }
      }

      animFrameId.current = requestAnimationFrame(loop)
    }

    animFrameId.current = requestAnimationFrame(loop)

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [state?.status, state?.activeGame])

  // Physics and Canvas Rendering
  const renderAndPhysics = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    dt: number
  ) => {
    const curState = stateRef.current
    if (!curState) return
    const gameType = curState.activeGame
    const entities = entitiesRef.current
    const uids = Object.keys(entities)

    ctx.save()
    if (screenShakeRef.current > 0) {
      const dx = (Math.random() - 0.5) * screenShakeRef.current
      const dy = (Math.random() - 0.5) * screenShakeRef.current
      ctx.translate(dx, dy)
      screenShakeRef.current = Math.max(0, screenShakeRef.current - dt * 25)
    }

    ctx.clearRect(0, 0, width, height)

    // THEMED ARENA DRAWING
    if (gameType === 'sumo') {
      const cx = width / 2
      const cy = height / 2
      const radius = Math.min(width, height) * 0.42

      ctx.fillStyle = '#1c0a0a'
      ctx.fillRect(0, 0, width, height)

      const grad = ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, radius)
      grad.addColorStop(0, '#334155')
      grad.addColorStop(0.85, '#1e293b')
      grad.addColorStop(1, '#ef4444')

      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
      ctx.lineWidth = 8
      ctx.strokeStyle = '#f59e0b'
      ctx.stroke()
    } else if (gameType === 'snowball') {
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      const radius = Math.min(width, height) * 0.42

      const iceGrad = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius)
      iceGrad.addColorStop(0, '#38bdf8')
      iceGrad.addColorStop(0.9, '#0284c7')
      iceGrad.addColorStop(1, '#e0f2fe')

      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = iceGrad
      ctx.fill()
      ctx.lineWidth = 6
      ctx.strokeStyle = '#bae6fd'
      ctx.stroke()
    } else if (gameType === 'laser-dodge') {
      ctx.fillStyle = '#060814'
      ctx.fillRect(0, 0, width, height)

      ctx.strokeStyle = 'rgba(168, 85, 247, 0.12)'
      ctx.lineWidth = 1
      for (let x = 0; x < width; x += 35) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += 35) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      if (curState.lasers) {
        const cx = width / 2
        const cy = height / 2
        curState.lasers.forEach((laser) => {
          laser.angle += laser.speed * dt
          const lx = cx + Math.cos(laser.angle) * laser.length * (width / 400)
          const ly = cy + Math.sin(laser.angle) * laser.length * (height / 300)

          ctx.beginPath()
          ctx.moveTo(cx, cy)
          ctx.lineTo(lx, ly)
          ctx.lineWidth = 8
          ctx.strokeStyle = '#f43f5e'
          ctx.shadowColor = '#f43f5e'
          ctx.shadowBlur = 15
          ctx.stroke()
          ctx.shadowBlur = 0
        })

        ctx.beginPath()
        ctx.arc(cx, cy, 18, 0, Math.PI * 2)
        ctx.fillStyle = '#ec4899'
        ctx.fill()
        ctx.lineWidth = 4
        ctx.strokeStyle = '#fff'
        ctx.stroke()
      }
    } else if (gameType === 'big-fish') {
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, height)
      oceanGrad.addColorStop(0, '#0c4a6e')
      oceanGrad.addColorStop(1, '#082f49')
      ctx.fillStyle = oceanGrad
      ctx.fillRect(0, 0, width, height)

      if (curState.foods) {
        curState.foods.forEach((f) => {
          const fx = (f.x / 100) * width
          const fy = (f.y / 100) * height
          ctx.beginPath()
          ctx.arc(fx, fy, f.size, 0, Math.PI * 2)
          ctx.fillStyle = f.color
          ctx.fill()
        })
      }
    } else if (gameType === 'chicken-catch') {
      ctx.fillStyle = '#14532d'
      ctx.fillRect(0, 0, width, height)

      const pens = [
        { x: 0, y: 0, w: width * 0.25, h: height * 0.25, color: ARCADE_COLORS[0] },
        { x: width * 0.75, y: 0, w: width * 0.25, h: height * 0.25, color: ARCADE_COLORS[1] },
        { x: 0, y: height * 0.75, w: width * 0.25, h: height * 0.25, color: ARCADE_COLORS[2] },
        { x: width * 0.75, y: height * 0.75, w: width * 0.25, h: height * 0.25, color: ARCADE_COLORS[3] },
      ]
      pens.forEach((p, idx) => {
        ctx.fillStyle = `${p.color}33`
        ctx.fillRect(p.x, p.y, p.w, p.h)
        ctx.strokeStyle = p.color
        ctx.lineWidth = 3
        ctx.strokeRect(p.x, p.y, p.w, p.h)

        ctx.font = 'bold 12px sans-serif'
        ctx.fillStyle = '#fff'
        ctx.fillText(`Chuồng #${idx + 1}`, p.x + 10, p.y + 20)
      })

      if (curState.chickens) {
        curState.chickens.forEach((ch) => {
          ch.x += ch.vx * dt
          ch.y += ch.vy * dt
          if (ch.x < 5 || ch.x > 95) ch.vx *= -1
          if (ch.y < 5 || ch.y > 95) ch.vy *= -1

          const cx = (ch.x / 100) * width
          const cy = (ch.y / 100) * height
          ctx.font = '18px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('🐤', cx, cy)
        })
      }
    } else if (gameType === 'doodle-duel') {
      ctx.fillStyle = '#1e1b4b'
      ctx.fillRect(0, 0, width, height)

      ctx.font = 'bold 22px sans-serif'
      ctx.fillStyle = '#f472b6'
      ctx.textAlign = 'center'
      ctx.fillText(`🎨 Triển Lãm Đấu Phác Họa: "${curState.doodlePrompt || 'Tranh vẽ'}"`, width / 2, 35)

      const cols = Math.min(4, Math.max(1, uids.length))
      const boxW = (width - 40) / cols
      const boxH = height * 0.65
      uids.forEach((pid, idx) => {
        const bx = 20 + (idx % cols) * boxW + 8
        const by = 60 + Math.floor(idx / cols) * (boxH + 30)
        const p = entities[pid]

        ctx.fillStyle = '#0f172a'
        ctx.fillRect(bx, by, boxW - 16, boxH)
        ctx.strokeStyle = p.color
        ctx.lineWidth = 3
        ctx.strokeRect(bx, by, boxW - 16, boxH)

        const drawings = curState.doodleDrawings?.[pid] || []
        drawings.forEach((st) => {
          if (!st.points || st.points.length < 2) return
          ctx.beginPath()
          ctx.strokeStyle = st.color
          ctx.lineWidth = st.width
          ctx.lineCap = 'round'
          st.points.forEach((pt, pIdx) => {
            const rx = bx + (pt.x / 300) * (boxW - 16)
            const ry = by + (pt.y / 300) * boxH
            if (pIdx === 0) ctx.moveTo(rx, ry)
            else ctx.lineTo(rx, ry)
          })
          ctx.stroke()
        })

        ctx.font = 'bold 12px sans-serif'
        ctx.fillStyle = '#fff'
        ctx.fillText(p.name, bx + (boxW - 16) / 2, by + boxH + 18)
      })
    } else if (gameType === 'red-light') {
      ctx.fillStyle = '#1e293b'
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = 'rgba(34, 197, 94, 0.25)'
      ctx.fillRect(0, 40, width, 50)
      ctx.strokeStyle = '#22c55e'
      ctx.lineWidth = 4
      ctx.strokeRect(0, 40, width, 50)

      ctx.font = 'bold 16px sans-serif'
      ctx.fillStyle = '#22c55e'
      ctx.textAlign = 'center'
      ctx.fillText('🏁 VẠCH ĐÍCH CHIẾN THẮNG 🏁', width / 2, 70)

      const dollY = 25
      ctx.font = '36px sans-serif'
      ctx.fillText(
        curState.redLightDollState === 'green' ? '👧' : curState.redLightDollState === 'turning' ? '👀' : '🤖',
        width / 2,
        dollY
      )
    } else if (gameType === 'moving-day') {
      ctx.fillStyle = '#1e293b'
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = '#3b82f6'
      ctx.fillRect(width * 0.35, 10, width * 0.3, 60)
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.strokeRect(width * 0.35, 10, width * 0.3, 60)

      ctx.font = 'bold 16px sans-serif'
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.fillText('🚚 XE TẢI CHUYỂN NHÀ', width / 2, 45)

      if (curState.furnitures) {
        curState.furnitures.forEach((fn) => {
          if (fn.delivered) return
          const fx = (fn.x / 100) * width
          const fy = (fn.y / 100) * height
          ctx.font = '24px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(fn.icon, fx, fy)
        })
      }
    } else if (gameType === 'tug-war') {
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, width, height)

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 4
      ctx.setLineDash([8, 8])
      ctx.beginPath()
      ctx.moveTo(width / 2, 40)
      ctx.lineTo(width / 2, height - 40)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.fillStyle = 'rgba(239, 68, 68, 0.1)'
      ctx.fillRect(0, 0, width / 2, height)
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)'
      ctx.fillRect(width / 2, 0, width / 2, height)

      let teamATaps = 0
      let teamBTaps = 0
      uids.forEach((uid) => {
        const inp = inputsRef.current[uid]
        const p = entities[uid]
        if (inp?.tapCount) p.taps = inp.tapCount
        if (p.team === 'A') teamATaps += p.taps
        else teamBTaps += p.taps
      })

      const diff = teamBTaps - teamATaps
      curState.tugRopePos = Math.max(-100, Math.min(100, diff * 3))

      const ropeY = height / 2
      const ropeCenterOffset = (curState.tugRopePos / 100) * (width * 0.35)
      const markerX = width / 2 + ropeCenterOffset

      ctx.beginPath()
      ctx.moveTo(width * 0.1, ropeY)
      ctx.lineTo(width * 0.9, ropeY)
      ctx.lineWidth = 14
      ctx.strokeStyle = '#d97706'
      ctx.lineCap = 'round'
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(markerX, ropeY, 18, 0, Math.PI * 2)
      ctx.fillStyle = '#fbbf24'
      ctx.fill()
      ctx.lineWidth = 4
      ctx.strokeStyle = '#fff'
      ctx.stroke()

      if (isHost && curState.status === 'playing') {
        if (curState.tugRopePos <= -80) {
          endRound('A', null, 'Đội Đỏ chiến thắng kéo co!')
        } else if (curState.tugRopePos >= 80) {
          endRound('B', null, 'Đội Xanh chiến thắng kéo co!')
        }
      }
    } else {
      ctx.fillStyle = '#090d16'
      ctx.fillRect(0, 0, width, height)

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      ctx.strokeStyle = '#ec4899'
      ctx.lineWidth = 6
      ctx.strokeRect(10, 10, width - 20, height - 20)
    }

    // UPDATE PHYSICS
    uids.forEach((uid) => {
      const p = entities[uid]
      if (!p.alive) return

      const inp = inputsRef.current[uid] || { dx: 0, dy: 0, updatedAt: 0 }
      let speed = 32

      if (gameType === 'bomb-tag' && p.hasBomb) speed = 40
      if (gameType === 'snowball') {
        p.snowSize = Math.min(60, (p.snowSize || 15) + (Math.abs(inp.dx) + Math.abs(inp.dy)) * 2 * dt)
        speed = 28 + (p.snowSize || 15) * 0.2
      }

      if (inp.dash && p.dashCooldown <= 0) {
        speed = 95
        p.dashCooldown = 1.2
        shakeScreen(4)
        addParticles((p.x / 100) * width, (p.y / 100) * height, '#f59e0b', 8)
        sfx.tap()
      }
      if (p.dashCooldown > 0) p.dashCooldown -= dt

      if (inp.jump && !p.isJumping) {
        p.isJumping = true
        p.jumpHeight = 35
        p.jumpTimer = 0.65
        sfx.jump()
        addParticles((p.x / 100) * width, (p.y / 100) * height, '#a855f7', 6)
      }
      if (p.isJumping && p.jumpTimer) {
        p.jumpTimer -= dt
        if (p.jumpTimer <= 0) {
          p.isJumping = false
          p.jumpHeight = 0
        }
      }

      if (gameType === 'red-light') {
        const isHolding = Boolean(inp.isHoldingRun)
        if (isHolding) {
          p.y -= 25 * dt
          if (curState.redLightDollState === 'red') {
            p.alive = false
            shakeScreen(10)
            addParticles((p.x / 100) * width, (p.y / 100) * height, '#ef4444', 20)
            sfx.death()
            curState.lastEventText = `⚡ ${p.name} bị sét đánh vì nhúc nhích khi đèn đỏ!`
          }
        }
        if (p.y <= 15 && isHost && curState.status === 'playing') {
          endRound(null, p.uid, `🏆 ${p.name} đã cán đích chiến thắng Đèn Xanh Đèn Đỏ!`)
        }
      } else {
        const targetVx = inp.dx * speed
        const targetVy = inp.dy * speed
        const friction = gameType === 'snowball' ? 4 : 8
        p.vx += (targetVx - p.vx) * friction * dt
        p.vy += (targetVy - p.vy) * friction * dt
        p.x += p.vx * dt
        p.y += p.vy * dt
      }

      if (gameType === 'sumo' || gameType === 'snowball') {
        const distToCenter = Math.hypot(p.x - 50, p.y - 50)
        if (distToCenter > 38) {
          p.alive = false
          shakeScreen(8)
          addParticles((p.x / 100) * width, (p.y / 100) * height, '#ef4444', 16)
          sfx.death()
          const aliveCount = Object.values(entities).filter((e) => e.alive).length
          if (isHost && aliveCount <= 1) {
            const winner = Object.values(entities).find((e) => e.alive)
            endRound(null, winner ? winner.uid : null, `${winner?.name || 'Vô địch'} đã trụ vững trên sàn đấu!`)
          }
        }
      } else {
        p.x = Math.max(5, Math.min(95, p.x))
        p.y = Math.max(8, Math.min(92, p.y))
      }

      if (gameType === 'big-fish' && curState.foods) {
        curState.foods = curState.foods.filter((food) => {
          const dist = Math.hypot(p.x - food.x, p.y - food.y)
          if (dist < 5) {
            p.fishWeight = (p.fishWeight || 10) + 3
            addParticles((p.x / 100) * width, (p.y / 100) * height, food.color, 4)
            sfx.collect()
            return false
          }
          return true
        })
      }

      if (gameType === 'chicken-catch' && curState.chickens) {
        curState.chickens.forEach((ch) => {
          if (!ch.heldBy) {
            const dist = Math.hypot(p.x - ch.x, p.y - ch.y)
            if (dist < 6 && (p.chickensHeld || 0) < 3) {
              ch.heldBy = p.uid
              p.chickensHeld = (p.chickensHeld || 0) + 1
              sfx.collect()
            }
          } else if (ch.heldBy === p.uid) {
            ch.x = p.x
            ch.y = p.y
          }
        })
      }

      if (gameType === 'moving-day' && curState.furnitures) {
        curState.furnitures.forEach((fn) => {
          if (!fn.delivered) {
            if (!fn.heldBy && !p.carryingItem) {
              const dist = Math.hypot(p.x - fn.x, p.y - fn.y)
              if (dist < 6) {
                fn.heldBy = p.uid
                p.carryingItem = fn.name
                sfx.collect()
              }
            } else if (fn.heldBy === p.uid) {
              fn.x = p.x
              fn.y = p.y
              if (p.y <= 18 && p.x >= 35 && p.x <= 65) {
                fn.delivered = true
                fn.heldBy = null
                p.carryingItem = null
                shakeScreen(4)
                addParticles((p.x / 100) * width, (p.y / 100) * height, '#22c55e', 14)
                sfx.win()
                curState.lastEventText = `📦 ${p.name} đã chất thành công ${fn.name} lên xe!`
              }
            }
          }
        })
      }
    })

    // Player vs Player Collisions
    for (let i = 0; i < uids.length; i++) {
      for (let j = i + 1; j < uids.length; j++) {
        const p1 = entities[uids[i]]
        const p2 = entities[uids[j]]
        if (!p1.alive || !p2.alive) continue

        const dx = p2.x - p1.x
        const dy = p2.y - p1.y
        const dist = Math.hypot(dx, dy)
        const minDist = 8

        if (dist < minDist && dist > 0.001) {
          const overlap = (minDist - dist) / 2
          const nx = dx / dist
          const ny = dy / dist
          p1.x -= nx * overlap
          p1.y -= ny * overlap
          p2.x += nx * overlap
          p2.y += ny * overlap

          if (gameType === 'sumo' || gameType === 'snowball') {
            const impulse = gameType === 'snowball' ? (p1.snowSize || 15) * 1.5 : 42
            p1.vx -= nx * impulse
            p1.vy -= ny * impulse
            p2.vx += nx * impulse
            p2.vy += ny * impulse
            shakeScreen(5)
            addParticles((p1.x / 100) * width, (p1.y / 100) * height, '#f59e0b', 8)
            sfx.tap()
          }

          if (gameType === 'bomb-tag') {
            const now = Date.now()
            if (!curState.lastBombPassAt || now - curState.lastBombPassAt > 800) {
              if (p1.hasBomb && !p2.hasBomb) {
                p1.hasBomb = false
                p2.hasBomb = true
                curState.lastBombPassAt = now
                curState.lastEventText = `💣 ${p1.name} đã chuyền bom cho ${p2.name}!`
                shakeScreen(6)
                addParticles((p2.x / 100) * width, (p2.y / 100) * height, '#ef4444', 12)
                sfx.vote()
              } else if (!p1.hasBomb && p2.hasBomb) {
                p2.hasBomb = false
                p1.hasBomb = true
                curState.lastBombPassAt = now
                curState.lastEventText = `💣 ${p2.name} đã chuyền bom cho ${p1.name}!`
                shakeScreen(6)
                addParticles((p1.x / 100) * width, (p1.y / 100) * height, '#ef4444', 12)
                sfx.vote()
              }
            }
          }
        }
      }
    }

    // DRAW PLAYERS ON CANVAS
    uids.forEach((uid) => {
      const p = entities[uid]
      const px = (p.x / 100) * width
      const py = (p.y / 100) * height - (p.jumpHeight || 0)
      let r = Math.min(width, height) * 0.045

      if (gameType === 'snowball' && p.snowSize) {
        r = Math.min(width, height) * (0.035 + (p.snowSize / 100) * 0.035)
      } else if (gameType === 'big-fish' && p.fishWeight) {
        r = Math.min(width, height) * (0.035 + (p.fishWeight / 100) * 0.03)
      }

      if (!p.alive) {
        ctx.font = `${r * 1.5}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('💀', px, py)
        return
      }

      if (p.isJumping) {
        ctx.beginPath()
        ctx.ellipse(px, (p.y / 100) * height, r * 0.8, r * 0.35, 0, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
        ctx.fill()
      }

      if (p.hasBomb) {
        ctx.beginPath()
        ctx.arc(px, py, r * 1.6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.35)'
        ctx.fill()

        ctx.font = `${r * 1.4}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('💣', px, py - r * 1.6)
      }

      ctx.beginPath()
      ctx.arc(px, py, r, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.fill()
      ctx.lineWidth = 4
      ctx.strokeStyle = p.hasBomb ? '#ef4444' : '#ffffff'
      ctx.stroke()

      const av = avatarOf(p.avatar)
      ctx.font = `${r * 1.1}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(av.emoji, px, py + 1)

      ctx.font = 'bold 12px sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = 'rgba(0,0,0,0.8)'
      ctx.shadowBlur = 4
      const badge =
        gameType === 'big-fish'
          ? `${p.fishWeight || 10}kg`
          : gameType === 'chicken-catch'
            ? `🐔${p.chickensHeld || 0}`
            : p.carryingItem
              ? `📦`
              : ''
      ctx.fillText(`${p.name} ${badge}`, px, py + r + 16)
      ctx.shadowBlur = 0
    })

    // UPDATE & DRAW PARTICLES
    particlesRef.current = particlesRef.current.filter((pt) => {
      pt.x += pt.vx * dt
      pt.y += pt.vy * dt
      pt.life += dt
      pt.alpha = Math.max(0, 1 - pt.life / pt.maxLife)

      ctx.beginPath()
      ctx.arc(pt.x, pt.y, pt.size * pt.alpha, 0, Math.PI * 2)
      ctx.fillStyle = pt.color
      ctx.globalAlpha = pt.alpha
      ctx.fill()
      ctx.globalAlpha = 1
      return pt.life < pt.maxLife
    })

    // Host Timer Countdown Check
    if (isHost && curState.status === 'playing') {
      const remaining = Math.max(0, Math.ceil((curState.roundEndsAt - Date.now()) / 1000))
      roundTimerSec.current = remaining

      if (remaining <= 0) {
        if (gameType === 'bomb-tag') {
          const loser = Object.values(entities).find((p) => p.hasBomb)
          shakeScreen(15)
          sfx.boom()
          endRound(null, null, `💥 BÙM! Bom nổ trên tay ${loser?.name || 'người chơi'}!`)
        } else if (gameType === 'big-fish') {
          const sorted = Object.values(entities).sort((a, b) => (b.fishWeight || 0) - (a.fishWeight || 0))
          endRound(null, sorted[0]?.uid || null, `🐟 ${sorted[0]?.name} nặng ký nhất (${sorted[0]?.fishWeight || 0}kg)!`)
        } else if (gameType === 'chicken-catch') {
          const sorted = Object.values(entities).sort((a, b) => (b.chickensHeld || 0) - (a.chickensHeld || 0))
          endRound(null, sorted[0]?.uid || null, `🐔 ${sorted[0]?.name} bắt nhiều gà nhất!`)
        } else {
          endRound(null, null, 'Hết giờ thi đấu!')
        }
      }
    }

    const now = Date.now()
    if (isHost && now - lastSyncTime.current > 800) {
      lastSyncTime.current = now
      void store.update(paths.arcade(code), {
        timerSeconds: roundTimerSec.current,
        lastEventText: curState.lastEventText,
        tugRopePos: curState.tugRopePos,
        redLightDollState: curState.redLightDollState,
      })
    }

    ctx.restore()
  }

  const endRound = (teamWin: 'A' | 'B' | null, userWin: string | null, message: string) => {
    if (!state) return
    const curScores = { ...state.scores }

    if (teamWin) {
      Object.values(entitiesRef.current).forEach((p) => {
        if (p.team === teamWin) curScores[p.uid] = (curScores[p.uid] || 0) + 100
      })
    } else if (userWin) {
      curScores[userWin] = (curScores[userWin] || 0) + 100
    } else if (state.activeGame === 'bomb-tag') {
      Object.values(entitiesRef.current).forEach((p) => {
        if (!p.hasBomb && p.alive) curScores[p.uid] = (curScores[p.uid] || 0) + 50
      })
    }

    sfx.win()
    const nextState: ArcadeState = {
      ...state,
      status: 'round-over',
      scores: curScores,
      winnerUid: userWin,
      winnerTeam: teamWin,
      lastEventText: message,
    }
    setState(nextState)
    stateRef.current = nextState
    void store.set(paths.arcade(code), nextState)
  }

  const handleStartGame = async () => {
    if (order.length < 2) {
      showToast('Cần ít nhất 2 đấu thủ để mở màn đấu trường! Bạn có thể thêm Bot máy để vào trận ngay.', 'error')
      setLobbyTab('players')
      return
    }
    setIsStarting(true)
    sfx.tap()
    try {
      let gameToPlay = selectedGame
      if (tournamentMode) {
        gameToPlay = ALL_GAME_KEYS[Math.floor(Math.random() * ALL_GAME_KEYS.length)]
        setSelectedGame(gameToPlay)
      }
      // 1. Immediately launch locally so canvas starts without waiting for network roundtrip
      const nextState = initArcadeState(players, gameToPlay, state?.scores || {})
      setState(nextState)
      stateRef.current = nextState

      // 2. Sync to Firebase
      await arcadeStartGame(code, gameToPlay, players, state?.scores || {})
    } catch (err) {
      showToast('Lỗi: ' + (err as Error).message, 'error')
    } finally {
      setIsStarting(false)
    }
  }

  const handleAddBot = async () => {
    try {
      sfx.tap()
      await addBotPlayer(code)
      showToast('Đã thêm 1 Bot máy vào phòng!', 'success')
    } catch (e) {
      showToast((e as Error).message, 'error')
    }
  }

  const handleRemoveBot = async (botUid: string) => {
    try {
      sfx.tap()
      await removeBotPlayer(code, botUid)
      showToast('Đã xóa Bot khỏi phòng', 'info')
    } catch (e) {
      showToast((e as Error).message, 'error')
    }
  }

  const handleHostJoin = async () => {
    try {
      sfx.tap()
      await joinRoom(code, 'Chủ phòng', Math.floor(Math.random() * 8))
      showToast('Chủ phòng đã tham gia vào danh sách đấu thủ!', 'success')
    } catch (e) {
      showToast((e as Error).message, 'error')
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(url)
    sfx.tap()
    showToast('Đã sao chép liên kết vào phòng!', 'success')
  }

  const activeGameInfo = ARCADE_GAMES_INFO[selectedGame]

  return (
    <Stage>
      {/* Toast Notification */}
      <Toast message={toast?.message ?? null} type={toast?.type} onClose={() => setToast(null)} />

      <div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-4 py-4 sm:px-6">
        {/* SLEEK CONSOLE HEADER */}
        <header className="pb-4 border-b border-slate-800/80">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/party-arcade"
              className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors group"
            >
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-pink-500/20 border border-pink-500/30 text-xl group-hover:scale-105 transition-transform">
                🕹️
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white tracking-wide">Party Arcade</div>
                <div className="text-[0.65rem] text-pink-400 font-medium">Bloop Đấu Trường</div>
              </div>
            </Link>

            {/* Room Code Pill */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 transition-all shadow-sm"
              title="Sao chép link mời"
            >
              <span className="text-slate-400 text-[0.68rem] tracking-wider uppercase">MÃ:</span>
              <span className="text-pink-400 font-mono text-sm tracking-widest">{code}</span>
              <span className="text-slate-400 text-xs">📋</span>
            </button>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <SfxToggle />
              <button
                onClick={() => {
                  void deleteRoom(code)
                  navigate('/party-arcade')
                }}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-red-950/60 text-slate-400 hover:text-red-300 border border-slate-800 text-xs font-semibold transition-colors"
                title="Đóng phòng"
              >
                ✕ Thoát
              </button>
            </div>
          </div>
        </header>

        {/* LOBBY: CLEAN 2-STAGE INTERFACE */}
        {(!state || state.status === 'lobby') && (
          <div className="flex-1 flex flex-col justify-between py-6 max-w-3xl mx-auto w-full">
            {/* Top Navigation Tabs between Players & Game Selector */}
            <div>
              <div className="flex items-center justify-center gap-3 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-md mx-auto mb-6 shadow-inner">
                <button
                  onClick={() => {
                    sfx.tap()
                    setLobbyTab('players')
                  }}
                  className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    lobbyTab === 'players'
                      ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>👥</span>
                  <span>1. Đấu Thủ ({order.length}/8)</span>
                </button>

                <button
                  onClick={() => {
                    sfx.tap()
                    setLobbyTab('games')
                  }}
                  className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    lobbyTab === 'games'
                      ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>🎮</span>
                  <span>2. Chọn Trò Chơi</span>
                </button>
              </div>

              {/* TAB 1: SẢNH NGƯỜI CHƠI (PLAYERS ONLY) */}
              {lobbyTab === 'players' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* QR & Quick Action Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2 rounded-2xl shadow-xl shrink-0">
                        <Qr value={url} size={90} />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">Quét mã bằng điện thoại</div>
                        <div className="text-[0.72rem] text-slate-400 mt-0.5">
                          Hoặc truy cập: <b className="text-cyan-400 font-mono">/join</b> và nhập{' '}
                          <b className="text-pink-400 font-mono">{code}</b>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      <button
                        onClick={handleAddBot}
                        disabled={order.length >= 8}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-300 text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-40 flex items-center justify-center gap-2"
                      >
                        <span>🤖</span>
                        <span>+ Thêm Bot Máy</span>
                      </button>

                      {!isHostPlaying && (
                        <button
                          onClick={handleHostJoin}
                          className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
                        >
                          <span>🎮</span>
                          <span>Host Chơi Luôn</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 8 SLOTS BLOOP CHARACTER CARDS */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Array.from({ length: 8 }).map((_, idx) => {
                      const pid = order[idx]
                      const p = pid ? players[pid] : null
                      const isBot = pid?.startsWith('bot-')
                      const color = ARCADE_COLORS[idx % ARCADE_COLORS.length]

                      if (p) {
                        return (
                          <div
                            key={pid}
                            className="flex flex-col items-center justify-center p-4 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-lg relative group transition-transform hover:-translate-y-0.5"
                          >
                            <Avatar index={p.avatar} size={48} ring />
                            <div className="mt-2 text-xs font-bold text-white text-center truncate max-w-full flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                              <span className="truncate">{p.name}</span>
                            </div>
                            <span className="text-[0.62rem] text-slate-400 font-medium mt-0.5">
                              {pid === uid ? 'Chủ phòng' : isBot ? 'Bot Máy' : 'Người chơi'}
                            </span>

                            {isBot && (
                              <button
                                onClick={() => handleRemoveBot(pid)}
                                className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs p-1"
                                title="Xóa Bot"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        )
                      }

                      // Empty Slot: Click to add Bot!
                      return (
                        <button
                          key={idx}
                          onClick={handleAddBot}
                          className="flex flex-col items-center justify-center p-4 rounded-3xl border border-dashed border-slate-800/80 hover:border-pink-500/50 bg-slate-950/40 hover:bg-pink-500/10 text-slate-500 hover:text-pink-300 transition-all text-xs font-semibold group h-28"
                        >
                          <span className="text-xl group-hover:scale-110 transition-transform mb-1 opacity-60 group-hover:opacity-100">
                            🤖
                          </span>
                          <span>+ Thêm Bot</span>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* TAB 2: CHỌN TRÒ CHƠI (GAMES ONLY) */}
              {lobbyTab === 'games' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Mode Selector Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-3xl bg-slate-900/60 border border-slate-800">
                    <div className="text-left">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>🏆</span>
                        <span>Đấu Giải Party Tự Động (Tournament)</span>
                      </div>
                      <div className="text-[0.68rem] text-slate-400 mt-0.5">
                        Hệ thống tự động xoay tua ngẫu nhiên qua các mini-game và cộng dồn điểm.
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sfx.tap()
                        setTournamentMode(!tournamentMode)
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        tournamentMode
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {tournamentMode ? 'BẬT' : 'TẮT'}
                    </button>
                  </div>

                  {/* Hero Showcase of the Selected Mini-game */}
                  {!tournamentMode && (
                    <div className="p-5 rounded-3xl bg-gradient-to-br from-pink-950/40 via-slate-900/90 to-slate-900 border border-pink-500/40 shadow-2xl relative overflow-hidden">
                      <div className="flex items-start gap-4">
                        <span className="text-5xl shrink-0 p-3 rounded-2xl bg-pink-500/20 border border-pink-500/40 shadow-lg">
                          {activeGameInfo.icon}
                        </span>
                        <div className="text-left flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base sm:text-lg font-black text-white">
                              {activeGameInfo.name}
                            </h3>
                            <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold">
                              {activeGameInfo.duration}
                            </span>
                          </div>
                          <p className="text-xs text-pink-400 font-semibold mt-1">
                            {activeGameInfo.tagline}
                          </p>
                          <p className="text-xs text-slate-300 mt-2 leading-relaxed font-normal">
                            {activeGameInfo.desc}
                          </p>
                          <div className="mt-3 inline-flex items-center gap-1.5 text-[0.68rem] text-slate-400 px-2.5 py-1 rounded-xl bg-slate-950/60 border border-slate-800">
                            <span>🎮 Điều khiển:</span>
                            <b className="text-slate-200">{activeGameInfo.control}</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 10 Mini-games Compact Grid */}
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 text-left">
                      Danh Sách 10 Mini-Games Bloop
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {ALL_GAME_KEYS.map((key) => {
                        const g = ARCADE_GAMES_INFO[key]
                        const isSel = selectedGame === key && !tournamentMode
                        return (
                          <button
                            key={key}
                            onClick={() => {
                              sfx.tap()
                              setSelectedGame(key)
                              setTournamentMode(false)
                            }}
                            className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                              isSel
                                ? 'border-pink-500 bg-pink-500/25 shadow-[0_0_15px_rgba(236,72,153,0.35)] scale-105 ring-2 ring-pink-400'
                                : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                            }`}
                          >
                            <span className="text-3xl">{g.icon}</span>
                            <span className="text-[0.72rem] font-bold text-white truncate w-full">
                              {g.name}
                            </span>
                            <span className="text-[0.6rem] text-slate-400">{g.duration}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* BOTTOM ACTION BAR (SLEEK & INTUITIVE) */}
            <div className="pt-6">
              {lobbyTab === 'players' ? (
                <button
                  onClick={() => {
                    sfx.tap()
                    if (order.length < 2) {
                      handleAddBot()
                    } else {
                      setLobbyTab('games')
                    }
                  }}
                  className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 text-white shadow-[0_8px_30px_rgba(236,72,153,0.45)] border border-white/20 hover:brightness-110 active:scale-[0.99] transition-all"
                >
                  {order.length < 2 ? (
                    <>
                      <span>🤖</span>
                      <span>Thêm Bot Máy Để Sẵn Sàng (Hiện có {order.length}/2 người)</span>
                    </>
                  ) : (
                    <>
                      <span>👉</span>
                      <span>Tiếp Tục: Chọn Đấu Trường Thi Đấu ({order.length} người) →</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => setLobbyTab('players')}
                    className="w-full sm:w-auto px-5 py-4 rounded-2xl text-xs font-bold text-slate-300 bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors"
                  >
                    ← Đấu Thủ ({order.length})
                  </button>

                  <button
                    onClick={handleStartGame}
                    disabled={isStarting || order.length < 2}
                    className="flex-1 w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 text-white shadow-[0_8px_30px_rgba(236,72,153,0.5)] border border-white/20 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50"
                  >
                    <span>{tournamentMode ? '🏆' : '⚡'}</span>
                    <span>
                      {isStarting
                        ? 'Đang chuẩn bị sàn đấu...'
                        : tournamentMode
                          ? 'BẮT ĐẦU VÒNG ĐẤU GIẢI PARTY NGẪU NHIÊN!'
                          : `KHỞI TRANH: ${activeGameInfo.name.toUpperCase()}!`}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* IN-GAME ARENA VIEW */}
        {state && (state.status === 'playing' || state.status === 'round-over') && (
          <div className="flex-1 flex flex-col items-center py-2">
            {/* Top Game Bar */}
            <div className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 bg-slate-900/90 rounded-2xl border border-slate-800 mb-3 shadow-lg">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{ARCADE_GAMES_INFO[state.activeGame].icon}</span>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-white">
                    {ARCADE_GAMES_INFO[state.activeGame].name}
                  </h2>
                  <p className="text-[0.68rem] text-pink-400 font-medium">
                    {state.lastEventText || ARCADE_GAMES_INFO[state.activeGame].tagline}
                  </p>
                </div>
              </div>

              {/* Middle Timer */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-sm">⏱️</span>
                <span className="text-base font-black font-mono text-pink-400">
                  {state.timerSeconds}s
                </span>
              </div>

              {/* Live Scores */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-none">
                {order.map((pid, idx) => {
                  const p = players[pid]
                  const sc = state.scores?.[pid] ?? 0
                  const color = ARCADE_COLORS[idx % ARCADE_COLORS.length]
                  return (
                    <div
                      key={pid}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-[0.68rem] font-bold text-slate-200">{p?.name.slice(0, 6)}</span>
                      <span className="text-[0.68rem] font-mono font-black text-pink-400">{sc}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Canvas 2D Arena */}
            <div className="relative w-full max-w-4xl aspect-[16/10] rounded-3xl overflow-hidden border-2 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-slate-950">
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="w-full h-full block"
              />

              {/* Round Over Modal Overlay */}
              <AnimatePresence>
                {state.status === 'round-over' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
                  >
                    <span className="text-6xl animate-bounce mb-3">🏆</span>
                    <h3 className="text-2xl font-black text-white">VÒNG ĐẤU KẾT THÚC!</h3>
                    <p className="text-base text-pink-400 font-bold mt-2">
                      {state.lastEventText}
                    </p>

                    <div className="mt-5 w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-4">
                      <div className="text-xs font-bold text-slate-400 uppercase mb-2">Bảng Xếp Hạng Điểm</div>
                      <div className="space-y-2">
                        {order
                          .slice()
                          .sort((a, b) => (state.scores[b] || 0) - (state.scores[a] || 0))
                          .map((pid, rank) => {
                            const p = players[pid]
                            return (
                              <div
                                key={pid}
                                className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-amber-400 w-4">
                                    #{rank + 1}
                                  </span>
                                  <Avatar index={p.avatar} size={26} />
                                  <span className="text-xs font-semibold text-white">{p.name}</span>
                                </div>
                                <span className="text-xs font-bold text-pink-400 font-mono">
                                  {state.scores[pid] || 0} ⭐
                                </span>
                              </div>
                            )
                          })}
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={handleStartGame}
                        className="btn btn-primary btn-md font-bold bg-pink-600 hover:bg-pink-500 border-none shadow-lg"
                      >
                        ⚡ Chơi Lại Vòng Này
                      </button>
                      <button
                        onClick={() => {
                          const nextState = { ...state, status: 'lobby' as const }
                          setState(nextState)
                          void store.set(paths.arcade(code), nextState)
                          setLobbyTab('games')
                        }}
                        className="btn btn-ghost btn-md text-xs font-semibold"
                      >
                        ← Đổi Trò Khác
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </Stage>
  )
}
