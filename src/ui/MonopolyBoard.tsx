import { motion } from 'framer-motion'
import {
  MONOPOLY_TILES,
  type MonopolyPlayerState,
  type Property,
} from '../game/monopolyEngine'
import { Avatar } from './Avatar'

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
                owner ? 'border-2 shadow-lg' : 'border-slate-800/80 bg-slate-950'
              }`}
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
                          ? '🏨 Khách Sạn'
                          : prop.houses > 0
                          ? `🏡 ${prop.houses} Sao`
                          : 'Đất trống'}
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
          className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 text-center border-2 border-amber-500/30 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-amber-500/15 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-yellow-500/15 blur-3xl" />

          <span className="text-5xl block mb-1 drop-shadow-lg">🎩</span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 uppercase drop-shadow-md">
            CỜ TỶ PHÚ
          </h2>
          <p className="text-[0.7rem] sm:text-[0.75rem] tracking-wider text-amber-300 uppercase font-bold mt-1">
            Đô Thị Bất Động Sản Việt Nam
          </p>

          {/* Cặp xúc xắc ở trung tâm */}
          {dice1 && dice2 ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-5 flex items-center gap-3 bg-slate-950/90 px-5 py-2.5 rounded-2xl border border-amber-500/40 shadow-xl"
            >
              <span className="font-mono text-3xl font-black text-amber-400">{dice1}</span>
              <span className="text-slate-400 text-xl font-bold">+</span>
              <span className="font-mono text-3xl font-black text-amber-400">{dice2}</span>
              <span className="text-slate-400 text-xl font-bold">=</span>
              <span className="font-mono text-3xl font-black text-emerald-400">{dice1 + dice2}</span>
            </motion.div>
          ) : (
            <p className="mt-4 text-xs text-slate-400 font-medium">
              Chờ người có lượt đổ xúc xắc trên điện thoại…
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
