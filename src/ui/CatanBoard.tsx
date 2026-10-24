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

function getDiceProbabilityDots(num: number): string {
  switch (num) {
    case 2:
    case 12:
      return '•'
    case 3:
    case 11:
      return '••'
    case 4:
    case 10:
      return '•••'
    case 5:
    case 9:
      return '••••'
    case 6:
    case 8:
      return '•••••'
    default:
      return ''
  }
}

interface CatanBoardProps {
  players: Record<string, CatanPlayerState>
  currentTurnUid?: string | null
  dice1?: number | null
  dice2?: number | null
  rolling?: boolean
  onRollClick?: () => void
}

export function CatanBoard({
  players,
  currentTurnUid,
  dice1,
  dice2,
  rolling = false,
  onRollClick,
}: CatanBoardProps) {
  const diceSum = dice1 && dice2 ? dice1 + dice2 : null

  // Tính tọa độ vị trí công trình (Làng / Thành phố)
  const getSettlementCoords = (hexId: number, settlementId: number) => {
    const hex = CATAN_HEXES[hexId] || CATAN_HEXES[1]
    const midX = (hex.cx + 300) / 2
    const midY = (hex.cy + 300) / 2
    // Độ dời nhẹ nếu có nhiều công trình cùng vùng
    const offsetIndex = settlementId % 3
    const offsetX = (offsetIndex - 1) * 12
    const offsetY = (offsetIndex - 1) * 8
    return { x: midX + offsetX, y: midY + offsetY, hexCx: hex.cx, hexCy: hex.cy }
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[680px] rounded-3xl bg-slate-950 p-2 sm:p-4 border-2 border-emerald-500/40 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.18)] select-none">
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
          <span className="mt-1 text-[0.62rem] font-black text-amber-300 bg-slate-950/90 px-2.5 py-0.5 rounded-full border border-amber-500/50 shadow-lg animate-pulse">
            CHẠM ĐỔ 2 XÚC XẮC 🎲
          </span>
        )}
      </div>

      <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-2xl">
        <defs>
          {/* Nền đại dương */}
          <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#0369a1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#091322" stopOpacity="0.95" />
          </radialGradient>

          {/* Gradients cho từng loại tài nguyên */}
          <linearGradient id="grad-wood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>

          <linearGradient id="grad-brick" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>

          <linearGradient id="grad-sheep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#4d7c0f" />
          </linearGradient>

          <linearGradient id="grad-wheat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="grad-ore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id="grad-desert" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="catan-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Nền biển đại dương bao quanh đảo */}
        <circle
          cx="300"
          cy="300"
          r="288"
          fill="url(#oceanGrad)"
          stroke="#0284c7"
          strokeWidth="3.5"
          strokeDasharray="8 6"
          opacity="0.85"
        />
        <circle cx="300" cy="300" r="275" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.3" />

        {/* 7 Ô lục giác đất đai */}
        {CATAN_HEXES.map((hex: HexTile) => {
          const isDesert = hex.type === 'desert'
          const res = !isDesert ? RESOURCE_CONFIG[hex.type as ResourceType] : null
          const gradId = `url(#grad-${hex.type})`
          const isHotNumber = hex.diceNumber === 6 || hex.diceNumber === 8
          const isHarvested = diceSum !== null && diceSum === hex.diceNumber && !isDesert

          return (
            <g key={hex.id} className="transition-all duration-300">
              {/* Hiệu ứng hào quang khi ô đất này vừa được xúc xắc gọi trúng */}
              {isHarvested && (
                <polygon
                  points={getHexPolygonPoints(hex.cx, hex.cy, 88)}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="6"
                  opacity="0.9"
                  filter="url(#catan-glow)"
                  className="animate-pulse"
                />
              )}

              {/* Lục giác đất */}
              <polygon
                points={getHexPolygonPoints(hex.cx, hex.cy, 80)}
                fill={gradId}
                stroke={isHarvested ? '#fbbf24' : '#0f172a'}
                strokeWidth={isHarvested ? 4.5 : 4}
                className="drop-shadow-lg"
              />

              {/* Họa tiết viền bên trong lục giác */}
              <polygon
                points={getHexPolygonPoints(hex.cx, hex.cy, 70)}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity="0.2"
              />

              {/* Nếu là Sa mạc trung tâm: làm bệ đỡ xúc xắc */}
              {isDesert ? (
                <g>
                  <circle
                    cx={hex.cx}
                    cy={hex.cy}
                    r="45"
                    fill="#1e293b"
                    stroke="#d97706"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    opacity="0.7"
                  />
                  <text
                    x={hex.cx}
                    y={hex.cy + 58}
                    fontSize="11"
                    fontWeight="800"
                    fill="#fed7aa"
                    textAnchor="middle"
                  >
                    🏜️ Khu Trại Sa Mạc
                  </text>
                </g>
              ) : (
                /* Các ô tài nguyên thường */
                <g>
                  {/* Vòng tròn thẻ số xúc xắc */}
                  <circle
                    cx={hex.cx}
                    cy={hex.cy}
                    r="25"
                    fill="#fef08a"
                    stroke={isHotNumber ? '#dc2626' : '#475569'}
                    strokeWidth={isHotNumber ? 3.5 : 2}
                    className="drop-shadow-md"
                  />
                  <text
                    x={hex.cx}
                    y={hex.cy + 5}
                    fontSize="19"
                    fontWeight="900"
                    fill={isHotNumber ? '#b91c1c' : '#0f172a'}
                    textAnchor="middle"
                  >
                    {hex.diceNumber}
                  </text>
                  {/* Chấm xác suất Catan */}
                  <text
                    x={hex.cx}
                    y={hex.cy + 17}
                    fontSize="11"
                    fontWeight="900"
                    fill={isHotNumber ? '#dc2626' : '#475569'}
                    textAnchor="middle"
                    letterSpacing="1.5"
                  >
                    {getDiceProbabilityDots(hex.diceNumber)}
                  </text>

                  {/* Icon loại tài nguyên */}
                  <text
                    x={hex.cx}
                    y={hex.cy - 36}
                    fontSize="22"
                    textAnchor="middle"
                    className="drop-shadow"
                  >
                    {res?.icon}
                  </text>

                  {/* Tên tài nguyên */}
                  <text
                    x={hex.cx}
                    y={hex.cy + 48}
                    fontSize="11"
                    fontWeight="900"
                    fill="#ffffff"
                    textAnchor="middle"
                    className="drop-shadow-md"
                  >
                    {res?.name}
                  </text>

                  {/* Huy hiệu +Thu hoạch nổi khi xúc xắc trúng */}
                  {isHarvested && (
                    <g transform={`translate(${hex.cx}, ${hex.cy - 60})`}>
                      <rect
                        x="-48"
                        y="-12"
                        width="96"
                        height="22"
                        rx="11"
                        fill="#fbbf24"
                        stroke="#78350f"
                        strokeWidth="1.5"
                        className="drop-shadow-lg"
                      />
                      <text
                        x="0"
                        y="3"
                        fontSize="10"
                        fontWeight="900"
                        fill="#78350f"
                        textAnchor="middle"
                      >
                        ✨ THU HOẠCH!
                      </text>
                    </g>
                  )}
                </g>
              )}
            </g>
          )
        })}

        {/* Hiển thị các Làng & Thành phố của các người chơi */}
        {Object.values(players).map((pState) => {
          const isTurn = pState.uid === currentTurnUid

          return pState.settlements.map((st) => {
            const hexTarget = st.hexIds[0] ?? 1
            const { x: sx, y: sy, hexCx, hexCy } = getSettlementCoords(hexTarget, st.id)

            return (
              <g key={st.id} className="transition-all duration-300">
                {/* Đường nối từ công trình đến ô đất thu hoạch */}
                <line
                  x1={sx}
                  y1={sy}
                  x2={hexCx}
                  y2={hexCy}
                  stroke={pState.color}
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  opacity="0.65"
                />

                {/* Vòng nền công trình */}
                <circle
                  cx={sx}
                  cy={sy}
                  r={st.isCity ? 22 : 18}
                  fill="#091322"
                  stroke={pState.color}
                  strokeWidth={isTurn ? 4 : 3}
                  className="drop-shadow-2xl"
                />

                {/* Icon Làng 🏡 hoặc Thành phố 🏰 */}
                <text x={sx} y={sy + (st.isCity ? 7 : 6)} fontSize={st.isCity ? '19' : '16'} textAnchor="middle">
                  {st.isCity ? '🏰' : '🏡'}
                </text>

                {/* Tag tên chủ nhân công trình */}
                <g transform={`translate(${sx}, ${sy + (st.isCity ? 28 : 24)})`}>
                  <rect
                    x="-28"
                    y="-8"
                    width="56"
                    height="16"
                    rx="8"
                    fill="#0f172a"
                    stroke={pState.color}
                    strokeWidth="1.5"
                    className="drop-shadow-md"
                  />
                  <text
                    x="0"
                    y="3"
                    fontSize="8.5"
                    fontWeight="900"
                    fill="#ffffff"
                    textAnchor="middle"
                  >
                    {pState.name.slice(0, 5)} {st.isCity ? '⭐2đ' : '1đ'}
                  </text>
                </g>
              </g>
            )
          })
        })}

        {/* Bảng số xúc xắc góc trên trái */}
        {diceSum && (
          <g transform="translate(20, 20)">
            <rect
              width="132"
              height="48"
              rx="16"
              fill="#091322"
              stroke="#10b981"
              strokeWidth="2.5"
              opacity="0.95"
              className="drop-shadow-xl"
            />
            <text x="66" y="31" fontSize="18" fontWeight="900" fill="#ffffff" textAnchor="middle">
              🎲 {diceSum} ({dice1}+{dice2})
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}
