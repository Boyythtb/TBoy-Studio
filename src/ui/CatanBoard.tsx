import {
  CATAN_HEXES,
  RESOURCE_CONFIG,
  type CatanPlayerState,
  type HexTile,
  type ResourceType,
} from '../game/catanEngine'

function getHexPolygonPoints(cx: number, cy: number, r: number = 72): string {
  const points: string[] = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    points.push(`${x},${y}`)
  }
  return points.join(' ')
}

interface CatanBoardProps {
  players: Record<string, CatanPlayerState>
  currentTurnUid?: string | null
  dice1?: number | null
  dice2?: number | null
}

export function CatanBoard({ players, dice1, dice2 }: CatanBoardProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px] rounded-3xl bg-slate-950 p-2 sm:p-4 border-2 border-slate-800 shadow-[0_12px_45px_rgba(0,0,0,0.8)] select-none">
      <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-md">
        {/* Nền biển đại dương */}
        <circle cx="300" cy="300" r="280" fill="#0f172a" stroke="#0284c7" strokeWidth="4" strokeDasharray="12 6" opacity="0.6" />

        {/* 7 Ô lục giác đất đai */}
        {CATAN_HEXES.map((hex: HexTile) => {
          const isDesert = hex.type === 'desert'
          const res = !isDesert ? RESOURCE_CONFIG[hex.type as ResourceType] : null
          const fillColor = isDesert ? '#d97706' : res?.color || '#334155'

          return (
            <g key={hex.id}>
              {/* Lục giác đất */}
              <polygon
                points={getHexPolygonPoints(hex.cx, hex.cy, 76)}
                fill={fillColor}
                stroke="#0f172a"
                strokeWidth="4"
                className="drop-shadow-lg opacity-85 transition-opacity hover:opacity-100"
              />

              {/* Vòng tròn số xúc xắc */}
              <circle
                cx={hex.cx}
                cy={hex.cy}
                r="24"
                fill="#f8fafc"
                stroke="#334155"
                strokeWidth="2"
                className="drop-shadow-sm"
              />
              <text
                x={hex.cx}
                y={hex.cy + 6}
                fontSize="18"
                fontWeight="900"
                fill={hex.diceNumber === 6 || hex.diceNumber === 8 ? '#dc2626' : '#1e293b'}
                textAnchor="middle"
              >
                {hex.diceNumber}
              </text>

              {/* Tên loại tài nguyên & Icon */}
              <text
                x={hex.cx}
                y={hex.cy - 35}
                fontSize="16"
                textAnchor="middle"
              >
                {isDesert ? '🏜️' : res?.icon}
              </text>
            </g>
          )
        })}

        {/* Hiển thị các Làng & Thành phố của các người chơi */}
        {Object.values(players).map((pState) => {
          return pState.settlements.map((st) => {
            // Tọa độ làng dựa trên hex đầu tiên
            const baseHex = CATAN_HEXES[st.hexIds[0]] || CATAN_HEXES[0]
            const angle = (pState.avatar % 6) * (Math.PI / 3) + 0.3
            const sx = baseHex.cx + 65 * Math.cos(angle)
            const sy = baseHex.cy + 65 * Math.sin(angle)

            return (
              <g key={st.id} className="transition-all duration-300">
                <circle cx={sx} cy={sy} r="16" fill="#0f172a" stroke={pState.color} strokeWidth="3" />
                <text x={sx} y={sy + 5} fontSize="14" textAnchor="middle">
                  {st.isCity ? '🏰' : '🏡'}
                </text>
              </g>
            )
          })
        })}

        {/* Xúc xắc ở góc nếu có */}
        {dice1 && dice2 && (
          <g transform="translate(20, 20)">
            <rect width="110" height="48" rx="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" opacity="0.9" />
            <text x="55" y="32" fontSize="20" fontWeight="900" fill="#ffffff" textAnchor="middle">
              🎲 {dice1 + dice2} ({dice1}+{dice2})
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}
