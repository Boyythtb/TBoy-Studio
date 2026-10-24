import { motion, AnimatePresence } from 'framer-motion'
import {
  MONOPOLY_TILES,
  type MonopolyEventCard,
  type MonopolyPlayerState,
  type Property,
} from '../game/monopolyEngine'
import { Avatar } from './Avatar'
import { Dice3D } from './Dice3D'

export const MONOPOLY_COORDS: Array<[number, number]> = [
  [5, 5], // 0: Start
  [4, 5], // 1
  [3, 5], // 2
  [2, 5], // 3
  [1, 5], // 4
  [0, 5], // 5: Jail
  [0, 4], // 6
  [0, 3], // 7
  [0, 2], // 8
  [0, 1], // 9
  [0, 0], // 10: Parking
  [1, 0], // 11
  [2, 0], // 12
  [3, 0], // 13
  [4, 0], // 14
  [5, 0], // 15
  [5, 1], // 16
  [5, 2], // 17
  [5, 3], // 18
  [5, 4], // 19
]

interface MonopolyBoardProps {
  players: Record<string, MonopolyPlayerState>
  properties: Property[]
  currentTurnUid: string | null
  dice1?: number | null
  dice2?: number | null
  rolling?: boolean
  lastEvent?: MonopolyEventCard | null
  onRollClick?: () => void
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
}: MonopolyBoardProps) {
  const uids = Object.keys(players)

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[700px] rounded-3xl bg-slate-950 p-2 sm:p-4 border-2 border-amber-500/40 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.15)] select-none">
      <div className="grid grid-cols-6 grid-rows-6 h-full w-full gap-1.5 p-1.5 bg-slate-900/95 rounded-2xl border border-slate-800">
        {/* Render 20 ô viền */}
        {MONOPOLY_TILES.map((tile, i) => {
          const [col, row] = MONOPOLY_COORDS[i]
          const prop = tile.propertyId !== undefined ? properties[tile.propertyId] : null
          const owner = prop?.ownerUid ? players[prop.ownerUid] : null
          const ownerIdx = owner ? uids.indexOf(owner.uid) : -1
          const ownerColor = ownerIdx !== -1 ? PLAYER_BADGE_COLORS[ownerIdx % 4] : null

          // Người chơi đang đứng tại ô này
          const playersHere = Object.values(players).filter((p) => p.position === i && !p.bankrupt)

          return (
            <div
              key={i}
              style={{
                gridColumnStart: col + 1,
                gridRowStart: row + 1,
                borderColor: ownerColor ? `${ownerColor}aa` : undefined,
                backgroundColor: ownerColor ? `${ownerColor}12` : undefined,
              }}
              className={`relative flex flex-col justify-between rounded-xl p-1 sm:p-1.5 border overflow-hidden shadow-md transition-all ${
                owner ? 'border-2 shadow-lg' : 'border-slate-800/80 bg-slate-950/90'
              } ${playersHere.length > 0 ? 'ring-1 ring-amber-400/60' : ''}`}
            >
              {/* Header màu sắc / Cờ chủ sở hữu */}
              {prop ? (
                <div
                  className="h-2.5 sm:h-3 w-full rounded-md mb-1 flex items-center justify-between px-1 shadow-sm"
                  style={{ backgroundColor: prop.color }}
                >
                  {owner && (
                    <span className="text-[0.55rem] font-black text-white drop-shadow">
                      🚩 {owner.name.slice(0, 5)}
                    </span>
                  )}
                </div>
              ) : (
                <div className="h-1.5 w-full bg-slate-800/60 rounded-md mb-1" />
              )}

              {/* Tên ô & Giá tiền */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                {tile.icon && <span className="text-base sm:text-lg mb-0.5">{tile.icon}</span>}
                <p className="text-[0.62rem] sm:text-[0.72rem] font-black text-white line-clamp-1 leading-tight">
                  {tile.name}
                </p>
                {prop && (
                  <span className="text-[0.58rem] sm:text-[0.65rem] font-black text-amber-400 mt-0.5">
                    {prop.price}$
                  </span>
                )}
              </div>

              {/* Mô hình Nhà / Khách sạn / Tiền thuê */}
              {prop && (
                <div className="mt-auto pt-0.5 border-t border-white/5 flex items-center justify-between text-[0.52rem] sm:text-[0.6rem] font-bold">
                  {owner ? (
                    <>
                      <span className="text-amber-300 font-black">
                        {prop.houses === 4
                          ? '🏨'
                          : prop.houses === 3
                          ? '🏡🏡🏡'
                          : prop.houses === 2
                          ? '🏡🏡'
                          : prop.houses === 1
                          ? '🏡'
                          : '·'}
                      </span>
                      <span className="text-emerald-400 font-extrabold">
                        {Math.round(prop.baseRent * (1 + prop.houses * 1.5))}$
                      </span>
                    </>
                  ) : (
                    <span className="text-slate-500 w-full text-center">Chưa có chủ</span>
                  )}
                </div>
              )}

              {/* Quân cờ của các người chơi đang đứng trên ô */}
              {playersHere.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/60 rounded-xl backdrop-blur-[2px] p-1 z-10">
                  {playersHere.map((p) => (
                    <motion.div
                      key={p.uid}
                      layoutId={`player-avatar-${p.uid}`}
                      className={`relative rounded-full ring-2 shadow-2xl ${
                        p.uid === currentTurnUid ? 'ring-amber-400 scale-110 animate-pulse' : 'ring-white/60'
                      }`}
                    >
                      <Avatar index={p.avatar} size={28} name={p.name} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {/* KHU VỰC TRUNG TÂM (CENTER PLAZA) */}
        <div
          style={{
            gridColumn: '2 / 6',
            gridRow: '2 / 6',
          }}
          className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-2 sm:p-4 text-center border-2 border-amber-500/30 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-yellow-500/15 blur-3xl pointer-events-none" />

          {/* Nếu có sự kiện vừa xảy ra (Cơ hội, Thuế, Vào tù, Tiền thuê...) */}
          <AnimatePresence mode="wait">
            {lastEvent ? (
              <motion.div
                key={lastEvent.title}
                initial={{ scale: 0.85, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0 }}
                className="w-full max-w-xs rounded-2xl bg-slate-950/95 border-2 border-amber-400 p-3 sm:p-4 shadow-2xl backdrop-blur-md z-20 flex flex-col items-center"
              >
                <span className="text-3xl sm:text-4xl mb-1">{lastEvent.icon}</span>
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[0.62rem] font-black text-amber-300 uppercase tracking-wider mb-1">
                  {lastEvent.type === 'chance'
                    ? '✨ THẺ CƠ HỘI'
                    : lastEvent.type === 'jail'
                    ? '🚔 TẠM GIAM'
                    : lastEvent.type === 'tax'
                    ? '💸 THUẾ PHÍ'
                    : lastEvent.type === 'parking'
                    ? '🚗 BÃI ĐỖ XE'
                    : '🏠 TIỀN THUÊ ĐẤT'}
                </span>
                <h4 className="text-xs sm:text-sm font-black text-white">{lastEvent.title}</h4>
                <p className="mt-1 text-[0.65rem] sm:text-xs text-slate-300 leading-snug">
                  {lastEvent.desc}
                </p>
                {lastEvent.amount !== undefined && lastEvent.amount !== 0 && (
                  <span
                    className={`mt-1.5 text-sm sm:text-base font-black ${
                      lastEvent.amount > 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {lastEvent.amount > 0 ? `+${lastEvent.amount}$` : `${lastEvent.amount}$`}
                  </span>
                )}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center z-10">
                <span className="text-3xl sm:text-4xl block mb-0.5 drop-shadow-lg">🎩</span>
                <h2 className="text-lg sm:text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 uppercase drop-shadow-md">
                  CỜ TỶ PHÚ
                </h2>
                <p className="text-[0.6rem] sm:text-[0.7rem] tracking-wider text-amber-300 uppercase font-bold">
                  Đô Thị Bất Động Sản Việt Nam
                </p>

                {/* Vùng Xúc Xắc 3D Trực Tiếp Ở Giữa Bàn Cờ */}
                <div className="mt-3 flex flex-col items-center">
                  <div className="flex items-center gap-3">
                    <Dice3D
                      value={dice1 ?? null}
                      rolling={rolling}
                      onClick={onRollClick}
                      disabled={!onRollClick || rolling}
                      size={54}
                    />
                    <Dice3D
                      value={dice2 ?? null}
                      rolling={rolling}
                      onClick={onRollClick}
                      disabled={!onRollClick || rolling}
                      size={54}
                    />
                  </div>

                  {onRollClick && !rolling && (
                    <button
                      type="button"
                      onClick={onRollClick}
                      className="mt-2 text-[0.65rem] font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 px-3 py-1 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all animate-bounce"
                    >
                      🎲 CHẠM ĐỂ ĐỔ 2 XÚC XẮC!
                    </button>
                  )}

                  {dice1 && dice2 && !rolling && (
                    <span className="mt-1.5 text-xs font-black text-amber-400">
                      Tổng điểm: {dice1 + dice2} ({dice1} + {dice2})
                    </span>
                  )}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
