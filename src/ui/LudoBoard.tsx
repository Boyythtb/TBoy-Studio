import {
  COLOR_CONFIG,
  type LudoColor,
  type LudoPlayerState,
  type LudoToken,
} from '../game/ludoEngine'

// 52 Tọa độ (x, y) trên lưới 15x15 của đường ray
export const TRACK_COORDS: Array<[number, number]> = [
  // Red side going up
  [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
  [6, 5], [6, 4], [6, 3], [6, 2], [6, 1], [6, 0],
  // Top crossover
  [7, 0], [8, 0],
  // Green side going down
  [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
  [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6],
  // Right crossover
  [14, 7], [14, 8],
  // Yellow side going left
  [13, 8], [12, 8], [11, 8], [10, 8], [9, 8],
  [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14],
  // Bottom crossover
  [7, 14], [6, 14],
  // Blue side going up
  [6, 13], [6, 12], [6, 11], [6, 10], [6, 9],
  [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
  // Left crossover
  [0, 7], [0, 6],
]

// Tọa độ các bậc thang về đích (Home tracks: 1..6)
export const HOME_TRACKS: Record<LudoColor, Array<[number, number]>> = {
  red: [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]],
  green: [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]],
  yellow: [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7]],
  blue: [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8]],
}

// Tọa độ chuồng xuất phát (Base coords)
export const BASE_COORDS: Record<LudoColor, Array<[number, number]>> = {
  red: [[2, 2], [3, 3]],
  green: [[12, 2], [11, 3]],
  yellow: [[12, 12], [11, 11]],
  blue: [[2, 12], [3, 11]],
}

interface LudoBoardProps {
  players: Record<string, LudoPlayerState>
  currentTurnUid: string | null
  myUid?: string | null
  diceValue: number | null
  onTokenClick?: (tokenId: number) => void
  selectableTokenIds?: number[]
}

export function LudoBoard({
  players,
  currentTurnUid,
  myUid,
  onTokenClick,
  selectableTokenIds = [],
}: LudoBoardProps) {
  // Lấy danh sách tất cả ngựa trên bàn cờ
  const allTokensWithCoords: Array<{
    token: LudoToken
    ownerUid: string
    color: LudoColor
    cx: number
    cy: number
    isSelectable: boolean
  }> = []

  Object.entries(players).forEach(([pUid, pState]) => {
    const isMyTurn = pUid === currentTurnUid
    const isMe = pUid === myUid

    pState.tokens.forEach((token) => {
      let x = 0
      let y = 0

      if (token.pos === -1) {
        // Trong chuồng
        const coords = BASE_COORDS[pState.color][token.id] || [2, 2]
        x = coords[0]
        y = coords[1]
      } else if (token.pos >= 101 && token.pos <= 106) {
        // Trong cột đích
        const step = Math.min(token.pos - 101, 5)
        const coords = HOME_TRACKS[pState.color][step] || [7, 7]
        x = coords[0]
        y = coords[1]
      } else if (token.pos >= 0 && token.pos <= 51) {
        // Trên ray
        const coords = TRACK_COORDS[token.pos] || [0, 0]
        x = coords[0]
        y = coords[1]
      }

      const isSelectable = Boolean(isMe && isMyTurn && selectableTokenIds.includes(token.id))

      allTokensWithCoords.push({
        token,
        ownerUid: pUid,
        color: pState.color,
        cx: x * 40 + 20,
        cy: y * 40 + 20,
        isSelectable,
      })
    })
  })

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] rounded-3xl bg-slate-950 p-2 sm:p-3 border-2 border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(15,23,42,0.9)] select-none">
      <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-md">
        <defs>
          <radialGradient id="redGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
          </radialGradient>
          <radialGradient id="greenGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
          </radialGradient>
          <radialGradient id="yellowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#eab308" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0.05" />
          </radialGradient>
          <radialGradient id="blueGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* 1. NỀN 4 CHUỒNG (BASES) */}
        {/* Red Base (Top-Left) */}
        <rect x="10" y="10" width="220" height="220" rx="28" fill="url(#redGrad)" stroke="#ef4444" strokeWidth="2" />
        <circle cx="120" cy="120" r="70" fill="#0f172a" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 4" />
        <text x="120" y="70" fill="#ef4444" fontSize="16" fontWeight="900" textAnchor="middle" letterSpacing="2">
          CHUỒNG ĐỎ
        </text>

        {/* Green Base (Top-Right) */}
        <rect x="370" y="10" width="220" height="220" rx="28" fill="url(#greenGrad)" stroke="#22c55e" strokeWidth="2" />
        <circle cx="480" cy="120" r="70" fill="#0f172a" stroke="#22c55e" strokeWidth="3" strokeDasharray="4 4" />
        <text x="480" y="70" fill="#22c55e" fontSize="16" fontWeight="900" textAnchor="middle" letterSpacing="2">
          CHUỒNG XANH LÁ
        </text>

        {/* Yellow Base (Bottom-Right) */}
        <rect x="370" y="370" width="220" height="220" rx="28" fill="url(#yellowGrad)" stroke="#eab308" strokeWidth="2" />
        <circle cx="480" cy="480" r="70" fill="#0f172a" stroke="#eab308" strokeWidth="3" strokeDasharray="4 4" />
        <text x="480" y="430" fill="#eab308" fontSize="16" fontWeight="900" textAnchor="middle" letterSpacing="2">
          CHUỒNG VÀNG
        </text>

        {/* Blue Base (Bottom-Left) */}
        <rect x="10" y="370" width="220" height="220" rx="28" fill="url(#blueGrad)" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="120" cy="480" r="70" fill="#0f172a" stroke="#3b82f6" strokeWidth="3" strokeDasharray="4 4" />
        <text x="120" y="430" fill="#3b82f6" fontSize="16" fontWeight="900" textAnchor="middle" letterSpacing="2">
          CHUỒNG XANH DƯƠNG
        </text>

        {/* 2. ĐƯỜNG RAY 52 Ô CHUNG */}
        {TRACK_COORDS.map(([tx, ty], i) => {
          const isRedStart = i === 0
          const isGreenStart = i === 13
          const isYellowStart = i === 26
          const isBlueStart = i === 39

          let fill = '#1e293b'
          let stroke = '#334155'
          if (isRedStart) { fill = '#ef4444'; stroke = '#fca5a5' }
          else if (isGreenStart) { fill = '#22c55e'; stroke = '#86efac' }
          else if (isYellowStart) { fill = '#eab308'; stroke = '#fde047' }
          else if (isBlueStart) { fill = '#3b82f6'; stroke = '#93c5fd' }

          return (
            <g key={i}>
              <rect
                x={tx * 40 + 2}
                y={ty * 40 + 2}
                width="36"
                height="36"
                rx="8"
                fill={fill}
                stroke={stroke}
                strokeWidth="1.5"
                opacity={isRedStart || isGreenStart || isYellowStart || isBlueStart ? 0.9 : 0.6}
              />
              {(isRedStart || isGreenStart || isYellowStart || isBlueStart) && (
                <text
                  x={tx * 40 + 20}
                  y={ty * 40 + 23}
                  fontSize="12"
                  fontWeight="bold"
                  fill="#ffffff"
                  textAnchor="middle"
                >
                  ★
                </text>
              )}
            </g>
          )
        })}

        {/* 3. CỘT ĐÍCH (HOME TRACKS) */}
        {Object.entries(HOME_TRACKS).map(([col, coords]) => {
          const hex = COLOR_CONFIG[col as LudoColor].hex
          return coords.map(([hx, hy], step) => (
            <rect
              key={`${col}-${step}`}
              x={hx * 40 + 2}
              y={hy * 40 + 2}
              width="36"
              height="36"
              rx="8"
              fill={hex}
              opacity={0.35 + step * 0.12}
              stroke={hex}
              strokeWidth="1.5"
            />
          ))
        })}

        {/* 4. TÂM BÀN CỜ (CENTER GOAL) */}
        <polygon points="240,240 300,300 240,360" fill="#ef4444" opacity="0.8" />
        <polygon points="240,240 300,300 360,240" fill="#22c55e" opacity="0.8" />
        <polygon points="360,240 300,300 360,360" fill="#eab308" opacity="0.8" />
        <polygon points="240,360 300,300 360,360" fill="#3b82f6" opacity="0.8" />
        <circle cx="300" cy="300" r="22" fill="#0f172a" stroke="#cbd5e1" strokeWidth="3" />
        <text x="300" y="306" fontSize="16" textAnchor="middle">👑</text>

        {/* 5. CÁC CHIẾN MÃ (TOKENS) */}
        {allTokensWithCoords.map(({ token, color, cx, cy, isSelectable }, idx) => {
          const hex = COLOR_CONFIG[color].hex

          return (
            <g
              key={idx}
              onClick={isSelectable ? () => onTokenClick?.(token.id) : undefined}
              className={`transition-all duration-300 ${isSelectable ? 'cursor-pointer' : ''}`}
            >
              {/* VÙNG CHẠM CẢM ỨNG SIÊU LỚN CHO ĐIỆN THOẠI (R=42) */}
              <circle
                cx={cx}
                cy={cy}
                r="42"
                fill="transparent"
                className={isSelectable ? 'cursor-pointer' : ''}
              />

              {isSelectable && (
                <>
                  <circle
                    cx={cx}
                    cy={cy}
                    r="32"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    strokeDasharray="6 6"
                    className="animate-spin opacity-90"
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r="26"
                    fill="#f59e0b"
                    opacity="0.25"
                    className="animate-pulse"
                  />
                </>
              )}

              {/* Bóng quân cờ 3D */}
              <ellipse cx={cx} cy={cy + 13} rx="18" ry="7" fill="#000000" opacity="0.6" />

              {/* Vòng viền ngoài phát sáng */}
              <circle
                cx={cx}
                cy={cy}
                r="20"
                fill="#0f172a"
                stroke={isSelectable ? '#fbbf24' : hex}
                strokeWidth={isSelectable ? 4 : 2.5}
                className="drop-shadow-xl"
              />

              {/* Thân quân cờ */}
              <circle
                cx={cx}
                cy={cy}
                r="16"
                fill={hex}
              />

              {/* Icon chiến mã */}
              <text x={cx} y={cy + 6} fontSize="17" textAnchor="middle" fill="#ffffff" fontWeight="bold">
                🐴
              </text>

              {/* Số thứ tự ngựa (1 hoặc 2) */}
              <circle cx={cx - 10} cy={cy - 10} r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
              <text x={cx - 10} y={cy - 7} fontSize="8" textAnchor="middle" fill="#ffffff" fontWeight="bold">
                {token.id + 1}
              </text>

              {/* Khiên bảo vệ nếu có */}
              {token.hasShield && (
                <text x={cx + 12} y={cy - 10} fontSize="15" textAnchor="middle">
                  🛡️
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
