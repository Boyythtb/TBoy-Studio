import {
  CATAN_HEXES,
  RESOURCE_CONFIG,
  type CatanPlayerState,
  type HexTile,
  type ResourceType,
} from '../game/catanEngine'
import { Dice3D } from './Dice3D'

function getHexPolygonPoints(cx: number, cy: number, r: number = 78): string {
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
  rolling?: boolean
  onRollClick?: () => void
}

export function CatanBoard({ players, dice1, dice2, rolling = false, onRollClick }: CatanBoardProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[660px] rounded-3xl bg-slate-950 p-2 sm:p-4 border-2 border-emerald-500/30 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.15)] select-none">
      {/* VÙNG XÚC XẮC 3D TRUNG TÂM ĐẢO CATAN */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-auto">
        <div className="flex items-center gap-2">
          <Dice3D
            value={dice1 ?? null}
            rolling={rolling}
            onClick={onRollClick}
            disabled={!onRollClick || rolling}
            size={52}
          />
          <Dice3D
            value={dice2 ?? null}
            rolling={rolling}
            onClick={onRollClick}
            disabled={!onRollClick || rolling}
            size={52}
          />
        </div>
        {onRollClick && !rolling && (
          <span className="mt-1 text-[0.62rem] font-black text-amber-400 bg-slate-950/90 px-2.5 py-0.5 rounded-full border border-amber-500/40 shadow animate-pulse">
            CHẠM ĐỔ 2 XÚC XẮC
          </span>
        )}
      </div>

      <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-2xl">
        <defs>
          <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0369a1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
          </radialGradient>
        </defs>

        {/* Nền biển đại dương bao quanh đảo */}
        <circle cx="300" cy="300" r="285" fill="url(#oceanGrad)" stroke="#0284c7" strokeWidth="4" strokeDasharray="10 5" opacity="0.8" />

        {/* 7 Ô lục giác đất đai */}
        {CATAN_HEXES.map((hex: HexTile) => {
          const isDesert = hex.type === 'desert'
          const res = !isDesert ? RESOURCE_CONFIG[hex.type as ResourceType] : null
          const fillColor = isDesert ? '#d97706' : res?.color || '#334155'
          const isHotNumber = hex.diceNumber === 6 || hex.diceNumber === 8

          return (
            <g key={hex.id} className="transition-transform duration-300">
              {/* Lục giác đất */}
              <polygon
                points={getHexPolygonPoints(hex.cx, hex.cy, 80)}
                fill={fillColor}
                stroke="#0f172a"
                strokeWidth="5"
                className="drop-shadow-lg opacity-90 hover:opacity-100"
              />

              {/* Họa tiết bóng mờ bên trong */}
              <polygon
                points={getHexPolygonPoints(hex.cx, hex.cy, 68)}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity="0.18"
              />

              {/* Vòng tròn số xúc xắc */}
              <circle
                cx={hex.cx}
                cy={hex.cy}
                r="25"
                fill="#f8fafc"
                stroke={isHotNumber ? '#ef4444' : '#64748b'}
                strokeWidth={isHotNumber ? 3 : 2}
                className="drop-shadow-md"
              />
              <text
                x={hex.cx}
                y={hex.cy + 7}
                fontSize="20"
                fontWeight="900"
                fill={isHotNumber ? '#dc2626' : '#0f172a'}
                textAnchor="middle"
              >
                {hex.diceNumber}
              </text>

              {/* Tên loại tài nguyên & Icon */}
              <g transform={`translate(${hex.cx}, ${hex.cy - 38})`}>
                <text
                  fontSize="22"
                  textAnchor="middle"
                  className="drop-shadow"
                >
                  {isDesert ? '🏜️' : res?.icon}
                </text>
              </g>

              {/* Tên tài nguyên nhỏ */}
              <text
                x={hex.cx}
                y={hex.cy + 48}
                fontSize="11"
                fontWeight="bold"
                fill="#ffffff"
                opacity="0.85"
                textAnchor="middle"
              >
                {isDesert ? 'Sa Mạc' : res?.name}
              </text>
            </g>
          )
        })}

        {/* Hiển thị các Làng & Thành phố của các người chơi */}
        {Object.values(players).map((pState) => {
          return pState.settlements.map((st) => {
            const baseHex = CATAN_HEXES[st.hexIds[0]] || CATAN_HEXES[0]
            const angle = (pState.avatar % 6) * (Math.PI / 3) + 0.3
            const sx = baseHex.cx + 68 * Math.cos(angle)
            const sy = baseHex.cy + 68 * Math.sin(angle)

            return (
              <g key={st.id} className="transition-all duration-300">
                <circle cx={sx} cy={sy} r="18" fill="#0f172a" stroke={pState.color} strokeWidth="3.5" className="drop-shadow-xl" />
                <text x={sx} y={sy + 6} fontSize="16" textAnchor="middle">
                  {st.isCity ? '🏰' : '🏡'}
                </text>
              </g>
            )
          })
        })}

        {/* Cặp xúc xắc ở góc nếu có */}
        {dice1 && dice2 && (
          <g transform="translate(25, 25)">
            <rect width="130" height="52" rx="16" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" opacity="0.95" className="drop-shadow-lg" />
            <text x="65" y="34" fontSize="22" fontWeight="900" fill="#ffffff" textAnchor="middle">
              🎲 {dice1 + dice2} ({dice1}+{dice2})
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}
