import { motion, AnimatePresence } from 'framer-motion'
import {
  MONOPOLY_TILES,
  MONOPOLY_COORDS_32,
  MASCOTS,
  type MonopolyEventCard,
  type MonopolyPlayerState,
  type Property,
  type Tile,
} from '../game/monopolyEngine'
import { Dice3D } from './Dice3D'

interface MonopolyBoardProps {
  players: Record<string, MonopolyPlayerState>
  properties: Property[]
  currentTurnUid: string | null
  dice1?: number | null
  dice2?: number | null
  rolling?: boolean
  lastEvent?: MonopolyEventCard | null
  onRollClick?: () => void
  onTileClick?: (tileIndex: number) => void
  highlightTiles?: number[]
}

const PLAYER_BADGE_COLORS: string[] = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#eab308', // Yellow
  '#10b981', // Green
]

export function MonopolyBoard({
  players,
  properties,
  currentTurnUid,
  dice1,
  dice2,
  rolling = false,
  lastEvent,
  onRollClick,
  onTileClick,
  highlightTiles = [],
}: MonopolyBoardProps) {
  const uids = Object.keys(players)

  const currentTurnPlayer = currentTurnUid ? players[currentTurnUid] : null
  const currentTurnMascot = currentTurnPlayer
    ? MASCOTS[currentTurnPlayer.mascotIndex % MASCOTS.length] ?? MASCOTS[0]
    : null

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[720px] rounded-2xl sm:rounded-3xl bg-slate-950 p-1 sm:p-2.5 border-2 border-amber-500/40 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.15)] select-none">
      <div className="grid grid-cols-9 grid-rows-9 h-full w-full gap-0.5 sm:gap-1 p-1 bg-slate-900/95 rounded-xl sm:rounded-2xl border border-slate-800">
        {/* Render 32 ô viền lưới 9x9 */}
        {MONOPOLY_TILES.map((tile: Tile, i: number) => {
          const [col, row] = MONOPOLY_COORDS_32[i]
          const prop = tile.propertyId !== undefined ? properties[tile.propertyId] : null
          const owner = prop?.ownerUid ? players[prop.ownerUid] : null
          const ownerIdx = owner ? uids.indexOf(owner.uid) : -1
          const ownerColor = ownerIdx !== -1 ? PLAYER_BADGE_COLORS[ownerIdx % 4] : null

          // Người chơi đang đứng tại ô này
          const playersHere = Object.values(players).filter((p) => p.position === i && !p.bankrupt)
          const isHighlighted = highlightTiles.includes(i)

          const isCorner = i === 0 || i === 8 || i === 16 || i === 24

          // Màu nền riêng cho ô đặc biệt
          let bgClass = 'bg-slate-950/90'
          if (isCorner) {
            if (i === 0) bgClass = 'bg-gradient-to-br from-emerald-950/80 via-slate-950 to-slate-900' // Start
            else if (i === 8) bgClass = 'bg-gradient-to-br from-slate-900 via-zinc-950 to-slate-950' // Jail
            else if (i === 16) bgClass = 'bg-gradient-to-br from-amber-950/70 via-slate-950 to-slate-900' // Zoo
            else if (i === 24) bgClass = 'bg-gradient-to-br from-sky-950/80 via-slate-950 to-cyan-950/70' // Airport
          } else if (tile.type === 'chance' || tile.type === 'fortune') {
            bgClass = 'bg-gradient-to-br from-purple-950/40 via-slate-950 to-slate-950'
          } else if (tile.type === 'utility') {
            bgClass = 'bg-gradient-to-br from-blue-950/40 via-slate-950 to-slate-950'
          } else if (tile.type === 'gift') {
            bgClass = 'bg-gradient-to-br from-pink-950/40 via-slate-950 to-slate-950'
          } else if (tile.type === 'tax') {
            bgClass = 'bg-gradient-to-br from-red-950/40 via-slate-950 to-slate-950'
          }

          return (
            <div
              key={i}
              onClick={() => onTileClick?.(i)}
              style={{
                gridColumnStart: col + 1,
                gridRowStart: row + 1,
                borderColor: ownerColor ? `${ownerColor}cc` : undefined,
                backgroundColor: ownerColor ? `${ownerColor}18` : undefined,
              }}
              className={`relative flex flex-col justify-between rounded-md sm:rounded-xl p-0.5 sm:p-1 border overflow-hidden transition-all ${bgClass} ${
                owner ? 'border-2 shadow-md' : 'border-slate-800/80'
              } ${isHighlighted ? 'ring-2 ring-amber-400 animate-pulse cursor-pointer' : ''} ${
                onTileClick ? 'cursor-pointer hover:brightness-125' : ''
              }`}
            >
              {/* Thanh màu danh mục Bất Động Sản */}
              {prop ? (
                <div
                  className="h-1.5 sm:h-2 w-full rounded-sm mb-0.5 flex items-center justify-between px-0.5 shadow-sm shrink-0"
                  style={{ backgroundColor: prop.color }}
                >
                  {owner && (
                    <span className="text-[0.45rem] sm:text-[0.55rem] font-black text-white drop-shadow truncate">
                      🚩 {owner.name.slice(0, 4)}
                    </span>
                  )}
                  {prop.mortgaged && (
                    <span className="text-[0.45rem] font-bold text-red-200 bg-red-900/80 px-0.5 rounded">
                      🔒
                    </span>
                  )}
                </div>
              ) : isCorner ? (
                <div className="h-1 w-full bg-amber-500/30 rounded-sm mb-0.5 shrink-0" />
              ) : (
                <div className="h-1 w-full bg-slate-800/40 rounded-sm mb-0.5 shrink-0" />
              )}

              {/* Nội dung chính giữa ô */}
              <div className="flex-1 flex flex-col items-center justify-center text-center min-h-0 px-0.5 leading-none">
                {tile.icon && (
                  <span className="text-xs sm:text-base leading-none mb-0.5 drop-shadow-sm">
                    {tile.icon}
                  </span>
                )}
                <p className="text-[0.5rem] sm:text-[0.62rem] font-black text-slate-100 truncate w-full leading-tight">
                  {tile.name}
                </p>
                {prop ? (
                  <span className="text-[0.48rem] sm:text-[0.58rem] font-black text-amber-300 mt-0.5">
                    {prop.price}$
                  </span>
                ) : tile.sub ? (
                  <span className="text-[0.44rem] sm:text-[0.52rem] font-bold text-slate-400 mt-0.5 truncate max-w-full">
                    {tile.sub}
                  </span>
                ) : null}
              </div>

              {/* Đáy ô: Nhà/Khách sạn nếu có */}
              {prop && (
                <div className="mt-auto pt-0.5 border-t border-white/5 flex items-center justify-center text-[0.45rem] sm:text-[0.55rem] font-bold shrink-0">
                  {prop.houses > 0 ? (
                    <span className="text-amber-300 font-black tracking-tighter">
                      {prop.houses === 4 ? '🏨' : '🏡'.repeat(prop.houses)}
                    </span>
                  ) : owner ? (
                    <span className="text-emerald-400 text-[0.45rem] font-extrabold">
                      {prop.baseRent}$
                    </span>
                  ) : (
                    <span className="text-slate-600 text-[0.42rem]">Trống</span>
                  )}
                </div>
              )}

              {/* Quân cờ / Linh vật người chơi đứng tại ô */}
              {playersHere.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center gap-0.5 bg-black/60 rounded-md sm:rounded-xl backdrop-blur-[1px] p-0.5 z-10">
                  {playersHere.map((p) => {
                    const mascot = MASCOTS[p.mascotIndex % MASCOTS.length] ?? MASCOTS[0]
                    const isTurn = p.uid === currentTurnUid
                    return (
                      <motion.div
                        key={p.uid}
                        layoutId={`player-token-${p.uid}`}
                        className={`relative flex items-center justify-center rounded-full text-xs sm:text-sm shadow-xl transition-all ${
                          isTurn
                            ? 'ring-2 ring-amber-400 scale-125 z-20 animate-bounce'
                            : 'ring-1 ring-white/60 opacity-90'
                        }`}
                        title={`${p.name} (${mascot.name})`}
                      >
                        <span className="filter drop-shadow">{mascot.symbol}</span>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* =============================================================
            KHU VỰC TRUNG TÂM (CENTER PLAZA - Chiếm 7x7 từ cột 2..8, hàng 2..8)
           ============================================================= */}
        <div
          style={{
            gridColumn: '2 / 9',
            gridRow: '2 / 9',
          }}
          className="flex flex-col items-center justify-between rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-2 sm:p-4 text-center border-2 border-amber-500/30 shadow-2xl relative overflow-hidden"
        >
          {/* Hào quang nền */}
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-yellow-500/10 blur-3xl pointer-events-none" />

          {/* Header trung tâm */}
          <div className="shrink-0 flex flex-col items-center z-10 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-2xl drop-shadow">🎩</span>
              <h2 className="text-sm sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 uppercase drop-shadow">
                LÊN ĐỜI · CỜ TỶ PHÚ
              </h2>
              <span className="text-base sm:text-2xl drop-shadow">🎲</span>
            </div>
            <p className="text-[0.55rem] sm:text-[0.7rem] tracking-wider text-amber-300/90 uppercase font-bold mt-0.5">
              32 Đô Thị Việt Nam • 1 Sân Bay Quốc Tế
            </p>
          </div>

          {/* Card sự kiện nảy lên ở giữa hoặc Vùng xúc xắc 3D */}
          <div className="flex-1 w-full flex items-center justify-center my-1 z-10 min-h-0">
            <AnimatePresence mode="wait">
              {lastEvent ? (
                <motion.div
                  key={lastEvent.title + (lastEvent.amount ?? 0)}
                  initial={{ scale: 0.85, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  className="w-full max-w-sm rounded-xl sm:rounded-2xl bg-slate-950/95 border-2 border-amber-400 p-2 sm:p-3.5 shadow-2xl backdrop-blur-md flex flex-col items-center"
                >
                  <span className="text-2xl sm:text-4xl mb-0.5">{lastEvent.icon}</span>
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[0.55rem] sm:text-[0.65rem] font-black text-amber-300 uppercase tracking-wider mb-1">
                    {lastEvent.type === 'chance'
                      ? '✨ THẺ CƠ HỘI'
                      : lastEvent.type === 'fortune'
                      ? '📜 KHÍ VẬN ĐỔI CHIỀU'
                      : lastEvent.type === 'jail'
                      ? '🏝️ TẠM GIAM ĐẢO HOANG'
                      : lastEvent.type === 'tax'
                      ? '💸 THUẾ PHÍ ĐÔ THỊ'
                      : lastEvent.type === 'parking'
                      ? '🦁 NGHỈ DƯỠNG VƯỜN THÚ'
                      : lastEvent.type === 'airport'
                      ? '🛫 SÂN BAY QUỐC TẾ'
                      : lastEvent.type === 'gift'
                      ? '🎁 HỘP QUÀ BÍ ẨN'
                      : '🏠 GIAO DỊCH NHÀ ĐẤT'}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                    {lastEvent.title}
                  </h4>
                  <p className="mt-1 text-[0.58rem] sm:text-xs text-slate-300 leading-snug line-clamp-2">
                    {lastEvent.desc}
                  </p>
                  {lastEvent.amount !== undefined && lastEvent.amount !== 0 && (
                    <span
                      className={`mt-1 text-xs sm:text-base font-black ${
                        lastEvent.amount > 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {lastEvent.amount > 0 ? `+${lastEvent.amount}$` : `${lastEvent.amount}$`}
                    </span>
                  )}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  {/* Xúc xắc 3D */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Dice3D
                      value={dice1 ?? null}
                      rolling={rolling}
                      onClick={onRollClick}
                      disabled={!onRollClick || rolling}
                      size={48}
                    />
                    <Dice3D
                      value={dice2 ?? null}
                      rolling={rolling}
                      onClick={onRollClick}
                      disabled={!onRollClick || rolling}
                      size={48}
                    />
                  </div>

                  {onRollClick && !rolling && (
                    <button
                      type="button"
                      onClick={onRollClick}
                      className="mt-2 text-[0.62rem] sm:text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 px-3 py-1 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all animate-bounce"
                    >
                      🎲 CHẠM ĐỂ ĐỔ 2 XÚC XẮC!
                    </button>
                  )}

                  {dice1 && dice2 && !rolling && (
                    <span className="mt-1 text-[0.65rem] sm:text-xs font-black text-amber-400">
                      Tổng: {dice1 + dice2} ({dice1} + {dice2})
                    </span>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Banner người đang đi lượt */}
          {currentTurnPlayer && (
            <div className="shrink-0 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 shadow-md">
              <span className="text-sm sm:text-base">{currentTurnMascot?.symbol}</span>
              <span className="text-[0.6rem] sm:text-xs text-slate-300 font-bold truncate max-w-[120px]">
                Lượt: <span className="text-amber-400 font-black">{currentTurnPlayer.name}</span>
              </span>
              <span className="text-[0.6rem] sm:text-xs font-black text-emerald-400 ml-1">
                {currentTurnPlayer.money}$
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
