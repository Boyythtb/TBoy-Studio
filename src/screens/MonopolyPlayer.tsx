import { useMemo, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MonopolyBoard } from '../ui/MonopolyBoard'
import { Dice3D } from '../ui/Dice3D'
import { JoinForm, LobbyWait, PhoneShell } from '../ui/PhoneJoin'
import { buzz } from '../lib/buzz'
import { sfx } from '../lib/sfx'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import {
  monopolyBuyProperty,
  monopolyEndTurn,
  monopolyRollDice,
  monopolyUpgradeProperty,
  MONOPOLY_TILES,
  type MonopolyState,
} from '../game/monopolyEngine'

export default function MonopolyPlayer() {
  const { code = '' } = useParams()
  const room = useGameRoom(code)
  const { uid, meta, players, loading } = room

  const [state, setState] = useState<MonopolyState | null>(null)
  const [rolling, setRolling] = useState(false)
  const [activeTab, setActiveTab] = useState<'controller' | 'board'>('controller')

  const me = uid ? players[uid] : null
  const myState = uid && state ? state.players[uid] : null
  const isMyTurn = state?.currentTurn === uid

  const order = useMemo(
    () => Object.keys(players).sort((a, b) => (players[a]?.joinedAt ?? 0) - (players[b]?.joinedAt ?? 0)),
    [players]
  )

  useEffect(() => {
    if (!code) return
    const unsub = store.sub<MonopolyState>(paths.monopoly(code), (v) => setState(v))
    return () => unsub()
  }, [code])

  const myProperties = useMemo(() => {
    if (!state || !uid) return []
    return state.properties.filter((p) => p.ownerUid === uid)
  }, [state, uid])

  const currentPState = state && state.currentTurn ? state.players[state.currentTurn] : null
  const currentTile = currentPState ? MONOPOLY_TILES[currentPState.position] : null
  const currentProp = currentTile?.propertyId !== undefined && state ? state.properties[currentTile.propertyId] : null
  const latestLog = state?.logs[0]

  const handleRollDice = async () => {
    if (!isMyTurn || state?.diceRolled || rolling) return
    buzz(60)
    sfx.vote()
    setRolling(true)
    setTimeout(async () => {
      try {
        await monopolyRollDice(code, state!)
      } finally {
        setRolling(false)
      }
    }, 700)
  }

  const handleBuy = async () => {
    if (!isMyTurn || !state) return
    buzz(30)
    sfx.win()
    await monopolyBuyProperty(code, state)
  }

  const handleUpgrade = async () => {
    if (!isMyTurn || !state) return
    buzz(30)
    sfx.win()
    await monopolyUpgradeProperty(code, state)
  }

  const handleEndTurn = async () => {
    if (!isMyTurn || !state) return
    buzz(20)
    sfx.tap()
    await monopolyEndTurn(code)
  }

  if (loading) {
    return (
      <PhoneShell code={code} accent="#f59e0b">
        <div className="flex flex-1 items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-amber-400" />
        </div>
      </PhoneShell>
    )
  }

  if (!meta) {
    return (
      <PhoneShell code={code} accent="#f59e0b">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="display text-2xl text-parchment/85">Không tìm thấy phòng</p>
          <Link to="/" className="btn btn-primary btn-md mt-6">
            Về trang chủ
          </Link>
        </div>
      </PhoneShell>
    )
  }

  if (!me) {
    return (
      <PhoneShell code={code} accent="#f59e0b">
        <JoinForm code={code} onJoined={() => undefined} accent="#f59e0b" />
      </PhoneShell>
    )
  }

  if (!state || state.phase === 'lobby') {
    return (
      <PhoneShell code={code} accent="#f59e0b">
        <LobbyWait
          code={code}
          players={order.map((id) => players[id])}
          me={me}
          icon="🎩"
          text="Chờ chủ phòng bắt đầu ván Cờ Tỷ Phú Mini!"
          accent="#f59e0b"
        />
      </PhoneShell>
    )
  }

  // Sắp xếp người chơi theo số tiền giảm dần cho mini scoreboard
  const sortedPlayers = [...state.order]
    .map((pUid) => state.players[pUid] ? { ...state.players[pUid]!, playerUid: pUid } : null)
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => (b.money ?? 0) - (a.money ?? 0))

  return (
    <PhoneShell code={code} accent="#f59e0b">
      <div className="flex flex-1 flex-col justify-between h-full max-h-screen overflow-hidden select-none pb-1">
        {/* Floating Notification Toast */}
        <AnimatePresence>
          {latestLog && (
            <motion.div
              key={latestLog.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-12 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] pointer-events-none"
            >
              <div className="rounded-full bg-slate-900/95 border border-amber-500/60 px-3.5 py-1 text-[0.7rem] font-black text-amber-300 shadow-2xl backdrop-blur-md flex items-center gap-1.5 truncate">
                <span>🔔</span>
                <span className="truncate">{latestLog.text}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Header siêu gọn & Tab chuyển đổi chế độ */}
        <div className="shrink-0 pt-1 space-y-1.5">
          {/* Thanh ví tiền, tài sản & mini scoreboard */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 p-2.5 border border-amber-500/30 shadow-md space-y-2">
            {/* Hàng trên: ví tiền & số đất */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">💰</span>
                <div>
                  <span className="text-[0.58rem] font-bold text-slate-400 block uppercase tracking-wider">VÍ TIỀN</span>
                  <span className="text-lg font-black text-amber-400 leading-tight">
                    {myState?.money ?? 0}$
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[0.58rem] font-bold text-slate-400 block uppercase tracking-wider">ĐẤT SỞ HỮU</span>
                <span className="text-xs font-black text-emerald-400">{myProperties.length} khu 🏙️</span>
              </div>
            </div>

            {/* Hàng dưới: Mini scoreboard tất cả người chơi */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {sortedPlayers.map((p, rank) => (
                <div
                  key={p.playerUid}
                  className={`flex-shrink-0 flex items-center gap-1 rounded-lg px-1.5 py-1 border text-[0.6rem] transition-all ${
                    p.playerUid === uid
                      ? 'bg-amber-500/20 border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.25)]'
                      : p.bankrupt
                      ? 'bg-slate-950/50 border-slate-700/50 opacity-50'
                      : 'bg-slate-900/60 border-slate-700/40'
                  }`}
                >
                  <span className="text-[0.55rem] text-slate-400 font-bold">#{rank + 1}</span>
                  <span className="font-bold truncate max-w-[40px]" style={{ color: p.playerUid === uid ? '#fbbf24' : '#94a3b8' }}>
                    {p.name}
                  </span>
                  <span className={`font-black ${p.bankrupt ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {p.bankrupt ? '💀' : `${p.money}$`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-950/80 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('controller')}
              className={`py-1.5 rounded-lg text-xs font-black transition-all ${
                activeTab === 'controller'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🎮 Tay Cầm
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('board')}
              className={`py-1.5 rounded-lg text-xs font-black transition-all ${
                activeTab === 'board'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🗺️ Bản Đồ
            </button>
          </div>
        </div>

        {/* 2. Nội dung chính: Tùy theo Tab được chọn */}
        {activeTab === 'controller' ? (
          <div className="flex-1 flex flex-col justify-between py-1 min-h-0 space-y-1.5">
            {/* THẺ Ô VỊ TRÍ ĐANG ĐỨNG - có màu theo loại ô */}
            <div
              className="rounded-2xl p-2.5 border shadow-md shrink-0 transition-all"
              style={
                currentTile?.type === 'chance'
                  ? { background: 'rgba(139,92,246,0.12)', borderColor: 'rgba(139,92,246,0.35)' }
                  : currentTile?.type === 'tax'
                  ? { background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.30)' }
                  : currentTile?.type === 'jail'
                  ? { background: 'rgba(100,116,139,0.15)', borderColor: 'rgba(100,116,139,0.4)' }
                  : currentTile?.type === 'start'
                  ? { background: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.3)' }
                  : currentProp
                  ? { background: `${currentProp.color}10`, borderColor: `${currentProp.color}40` }
                  : { background: 'rgba(15,23,42,0.9)', borderColor: 'rgba(51,65,85,0.8)' }
              }
            >
              {currentTile ? (
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl shrink-0">{currentTile.icon || '🏙️'}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-sm font-black text-white truncate">{currentTile.name}</h4>
                      <span className="rounded-full bg-black/30 px-1.5 py-0.5 text-[0.58rem] font-black text-amber-400 shrink-0">
                        Ô #{currentTile.id}
                      </span>
                    </div>
                    {currentProp ? (
                      <div className="flex items-center gap-2 mt-0.5">
                        {currentProp.ownerUid && state.players[currentProp.ownerUid] ? (
                          <p className="text-[0.62rem] text-rose-300 font-bold">
                            🚩 Chủ: {state.players[currentProp.ownerUid]!.name} •{' '}
                            Thuê <span className="text-rose-400">{currentProp.baseRent}$</span>
                          </p>
                        ) : (
                          <p className="text-[0.62rem] text-emerald-300 font-bold">
                            💎 Giá: {currentProp.price}$ • Thuê: {currentProp.baseRent}$
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-[0.62rem] text-slate-400 mt-0.5">
                        {currentTile.type === 'start' ? '✅ +200$ khi đi qua'
                          : currentTile.type === 'chance' ? '✨ Rút thẻ cơ hội!'
                          : currentTile.type === 'tax' ? '💸 Nộp thuế đô thị'
                          : currentTile.type === 'jail' ? '🚔 Trại tạm giam'
                          : '🚗 Bãi đỗ xe an toàn'}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-center text-slate-400">Đang khởi tạo…</p>
              )}
            </div>

            {/* Danh sách BĐS đang sở hữu (hiển thị compact nếu có) */}
            {myProperties.length > 0 && (
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-2 shrink-0">
                <p className="text-[0.58rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  🏙️ BĐS của bạn ({myProperties.length})
                </p>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                  {myProperties.map((prop) => (
                    <div
                      key={prop.id}
                      className="flex-shrink-0 rounded-lg px-1.5 py-1 border text-[0.58rem]"
                      style={{ background: `${prop.color}15`, borderColor: `${prop.color}40` }}
                    >
                      <span className="font-black text-white block truncate max-w-[55px]">{prop.name}</span>
                      <span className="font-bold" style={{ color: prop.color }}>
                        {prop.houses > 0 ? `${'⭐'.repeat(Math.min(prop.houses, 4))}` : 'Đất trống'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VÙNG XÚC XẮC 3D TRUNG TÂM */}
            <div className="flex-1 flex flex-col items-center justify-center p-2.5 bg-gradient-to-b from-slate-900/80 to-slate-950/90 rounded-3xl border border-amber-500/20 shadow-inner min-h-0">
              <div className="flex items-center gap-4">
                <Dice3D
                  value={state.dice1}
                  rolling={rolling}
                  onClick={isMyTurn && !state.diceRolled ? handleRollDice : undefined}
                  disabled={!isMyTurn || state.diceRolled}
                  size={66}
                />
                <Dice3D
                  value={state.dice2}
                  rolling={rolling}
                  onClick={isMyTurn && !state.diceRolled ? handleRollDice : undefined}
                  disabled={!isMyTurn || state.diceRolled}
                  size={66}
                />
              </div>

              {state.diceRolled && state.dice1 && state.dice2 && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-2 text-center"
                >
                  <span className="text-xs font-black text-amber-400">
                    🎲 ĐỔ ĐƯỢC {state.dice1 + state.dice2} ĐIỂM! ({state.dice1} + {state.dice2})
                  </span>
                </motion.div>
              )}

              {!isMyTurn && (
                <p className="mt-2 text-[0.68rem] text-slate-400 font-medium animate-pulse text-center">
                  ⏳ Đang chờ <span className="font-bold text-amber-400">{currentPState?.name}</span> thực hiện lượt…
                </p>
              )}
            </div>

            {/* BOTTOM ACTION DOCK */}
            <div className="shrink-0 space-y-1.5">
              {isMyTurn ? (
                !state.diceRolled ? (
                  <motion.button
                    onClick={handleRollDice}
                    disabled={rolling}
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 py-3.5 text-sm font-black text-slate-950 shadow-xl hover:brightness-110 active:scale-95 transition-all animate-pulse"
                  >
                    {rolling ? 'ĐANG ĐỔ 2 XÚC XẮC… 🎲' : '🎲 BẤM LẮC 2 XÚC XẮC NGAY!'}
                  </motion.button>
                ) : (
                  <div className="space-y-1.5">
                    {state.canBuyProperty && currentProp && (
                      <motion.button
                        onClick={handleBuy}
                        whileTap={{ scale: 0.97 }}
                        className="w-full rounded-2xl py-3 text-xs font-black text-white shadow-lg active:scale-95 transition-all"
                        style={{ background: `linear-gradient(135deg, #16a34a, #059669)` }}
                      >
                        🏙️ MUA [{currentProp.name}] — {currentProp.price}$
                      </motion.button>
                    )}

                    {state.canUpgradeProperty && currentProp && (
                      <motion.button
                        onClick={handleUpgrade}
                        whileTap={{ scale: 0.97 }}
                        className="w-full rounded-2xl bg-cyan-600 hover:bg-cyan-500 py-3 text-xs font-black text-white shadow-lg active:scale-95 transition-all"
                      >
                        🏰 NÂNG CẤP ⭐ {currentProp.name} ({currentProp.housePrice}$)
                      </motion.button>
                    )}

                    <motion.button
                      onClick={handleEndTurn}
                      whileTap={{ scale: 0.97 }}
                      className="w-full rounded-2xl bg-slate-800 hover:bg-slate-700 py-3 text-xs font-bold text-slate-200 border border-slate-700 active:scale-95 transition-all"
                    >
                      {state.canBuyProperty ? '⏩ BỎ QUA & KẾT THÚC LƯỢT' : 'KẾT THÚC LƯỢT ĐI ➔'}
                    </motion.button>
                  </div>
                )
              ) : (
                <div className="rounded-2xl bg-slate-900/60 p-2.5 text-center border border-slate-800 text-[0.7rem] text-slate-400">
                  Chưa tới lượt — theo dõi bàn cờ trên màn hình lớn!
                </div>
              )}
            </div>
          </div>
        ) : (
          /* CHẾ ĐỘ XEM BÀN CỜ ĐẦY ĐỦ */
          <div className="flex-1 flex flex-col items-center justify-center my-auto py-1 min-h-0">
            <div className="w-full max-w-[340px] aspect-square flex items-center justify-center">
              <MonopolyBoard
                players={state.players}
                properties={state.properties}
                currentTurnUid={state.currentTurn}
                dice1={state.dice1}
                dice2={state.dice2}
                rolling={rolling}
                lastEvent={state.lastEvent}
                onRollClick={isMyTurn && !state.diceRolled ? handleRollDice : undefined}
              />
            </div>
            <button
              onClick={() => setActiveTab('controller')}
              className="mt-2 text-xs font-bold text-amber-400 underline underline-offset-4"
            >
              ← Quay lại tay cầm
            </button>
          </div>
        )}
      </div>
    </PhoneShell>
  )
}
