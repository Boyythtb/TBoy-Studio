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

export function MonopolyBoard({
  players,
  properties,
  currentTurnUid,
  dice1,
  dice2,
}: MonopolyBoardProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] rounded-3xl bg-slate-950 p-2 sm:p-3 border-2 border-slate-800 shadow-[0_12px_45px_rgba(0,0,0,0.8)] select-none">
      <div className="grid grid-cols-6 grid-rows-6 h-full w-full gap-1 p-1 bg-slate-900/90 rounded-2xl border border-slate-800">
        {/* Render 20 ô viền */}
        {MONOPOLY_TILES.map((tile, i) => {
          const [col, row] = MONOPOLY_COORDS[i]
          const prop = tile.propertyId !== undefined ? properties[tile.propertyId] : null
          const owner = prop?.ownerUid ? players[prop.ownerUid] : null

          // Người chơi đang đứng tại ô này
          const playersHere = Object.values(players).filter((p) => p.position === i && !p.bankrupt)

          return (
            <div
              key={i}
              style={{
                gridColumnStart: col + 1,
                gridRowStart: row + 1,
              }}
              className="relative flex flex-col justify-between rounded-xl bg-slate-950 p-1 border border-slate-800/80 overflow-hidden shadow-inner"
            >
              {/* Thanh màu nếu là bất động sản */}
              {prop && (
                <div
                  className="h-2 w-full rounded-md mb-0.5"
                  style={{ backgroundColor: prop.color }}
                />
              )}

              {/* Tên ô / Icon */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                {tile.icon && <span className="text-sm">{tile.icon}</span>}
                <p className="text-[0.55rem] sm:text-[0.62rem] font-bold text-slate-200 line-clamp-1 leading-tight">
                  {tile.name}
                </p>
                {prop && (
                  <span className="text-[0.5rem] font-black text-amber-400">
                    {prop.price}$
                  </span>
                )}
              </div>

              {/* Số nhà đã xây / Chủ sở hữu */}
              {prop && (
                <div className="flex items-center justify-between text-[0.5rem] font-bold px-0.5">
                  <span className="truncate text-slate-400">{owner ? owner.name.slice(0, 4) : 'Trống'}</span>
                  {prop.houses > 0 && (
                    <span className="text-amber-300">
                      {prop.houses === 4 ? '🏨' : `⭐${prop.houses}`}
                    </span>
                  )}
                </div>
              )}

              {/* Quân cờ của người chơi trên ô */}
              {playersHere.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center gap-0.5 bg-black/40 rounded-xl backdrop-blur-[1px] p-0.5">
                  {playersHere.map((p) => (
                    <motion.div
                      key={p.uid}
                      layoutId={`player-${p.uid}`}
                      className={`relative rounded-full ring-2 ${
                        p.uid === currentTurnUid ? 'ring-amber-400 animate-pulse' : 'ring-white/40'
                      }`}
                    >
                      <Avatar index={p.avatar} size={22} name={p.name} />
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
          className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 text-center border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-cyan-500/10 blur-3xl" />

          <span className="text-4xl block mb-1">🎩</span>
          <h2 className="text-xl sm:text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 uppercase drop-shadow-md">
            CỜ TỶ PHÚ
          </h2>
          <p className="text-[0.65rem] tracking-wider text-slate-400 uppercase font-bold mt-0.5">
            Đại Gia Đô Thị Mini
          </p>

          {/* Cặp xúc xắc ở trung tâm */}
          {dice1 && dice2 && (
            <div className="mt-4 flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-2xl border border-slate-800 shadow-lg">
              <span className="font-mono text-2xl font-black text-amber-400">{dice1}</span>
              <span className="text-slate-500 font-bold">+</span>
              <span className="font-mono text-2xl font-black text-amber-400">{dice2}</span>
              <span className="text-slate-500 font-bold">=</span>
              <span className="font-mono text-2xl font-black text-white">{dice1 + dice2}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
