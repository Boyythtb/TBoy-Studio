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
  monopolyFlyToTile,
  monopolyMortgageProperty,
  calculateNetWorth,
  MONOPOLY_TILES,
  MASCOTS,
  type MonopolyState,
} from '../game/monopolyEngine'

export default function MonopolyPlayer() {
  const { code = '' } = useParams()
  const room = useGameRoom(code)
  const { uid, meta, players, loading } = room

  const [state, setState] = useState<MonopolyState | null>(null)
  const [rolling, setRolling] = useState(false)
  const [activeTab, setActiveTab] = useState<'controller' | 'board' | 'properties'>('controller')
  const [flightDismissed, setFlightDismissed] = useState(false)

  const me = uid ? players[uid] : null
  const myState = uid && state ? state.players[uid] : null
  const isMyTurn = state?.currentTurn === uid
  const flightModalOpen = Boolean(isMyTurn && state?.canFlyAirport && !flightDismissed)

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

  const myNetWorth = useMemo(() => {
    if (!myState || !state) return 0
    return calculateNetWorth(myState, state.properties)
  }, [myState, state])

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

  const handleUpgrade = async (propId?: number) => {
    if (!state) return
    buzz(30)
    sfx.win()
    await monopolyUpgradeProperty(code, state, propId)
  }

  const handleMortgage = async (propId: number) => {
    if (!state) return
    buzz(20)
    sfx.tap()
    await monopolyMortgageProperty(code, state, propId)
  }

  const handleFlightSelect = async (tileId: number) => {
    if (!state || !isMyTurn) return
    buzz(40)
    sfx.win()
    setFlightDismissed(true)
    await monopolyFlyToTile(code, state, tileId)
  }

  const handleEndTurn = async () => {
    if (!isMyTurn || !state) return
    buzz(20)
    sfx.tap()
    await monopolyEndTurn(code)
  }

  if (loading) {
    return (
      <PhoneShell code={code} accent="#f59e0b" wide>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-amber-400" />
        </div>
      </PhoneShell>
    )
  }

  if (!meta) {
    return (
      <PhoneShell code={code} accent="#f59e0b" wide>
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
      <PhoneShell code={code} accent="#f59e0b" wide>
        <JoinForm code={code} onJoined={() => undefined} accent="#f59e0b" />
      </PhoneShell>
    )
  }

  if (!state || state.phase === 'lobby') {
    return (
      <PhoneShell code={code} accent="#f59e0b" wide>
        <LobbyWait
          code={code}
          players={order.map((id) => players[id])}
          me={me}
          icon="🎩"
          text="Chờ chủ phòng bắt đầu trận đấu Cờ Tỷ Phú 32 Ô…"
          accent="#f59e0b"
        />
      </PhoneShell>
    )
  }

  // Sắp xếp người chơi theo Tổng Tài Sản (Net Worth)
  const sortedPlayers = [...state.order]
    .map((pUid) => {
      const p = state.players[pUid]
      if (!p) return null
      return {
        ...p,
        playerUid: pUid,
        netWorth: calculateNetWorth(p, state.properties),
      }
    })
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => b.netWorth - a.netWorth)

  const myMascot = myState ? MASCOTS[myState.mascotIndex % MASCOTS.length] ?? MASCOTS[0] : null

  // Component Thẻ Ô Đang Đứng
  const renderCurrentTileCard = () => (
    <div
      className="rounded-2xl p-2.5 border shadow-md shrink-0 transition-all"
      style={
        currentTile?.type === 'chance' || currentTile?.type === 'fortune'
          ? { background: 'rgba(139,92,246,0.12)', borderColor: 'rgba(139,92,246,0.35)' }
          : currentTile?.type === 'tax'
          ? { background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.30)' }
          : currentTile?.type === 'jail'
          ? { background: 'rgba(100,116,139,0.15)', borderColor: 'rgba(100,116,139,0.4)' }
          : currentTile?.type === 'special_airport'
          ? { background: 'rgba(2,132,199,0.15)', borderColor: 'rgba(2,132,199,0.45)' }
          : currentTile?.type === 'start'
          ? { background: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.3)' }
          : currentProp
          ? { background: `${currentProp.color}15`, borderColor: `${currentProp.color}45` }
          : { background: 'rgba(15,23,42,0.9)', borderColor: 'rgba(51,65,85,0.8)' }
      }
    >
      {currentTile ? (
        <div className="flex items-center gap-2.5">
          <span className="text-2xl shrink-0">{currentTile.icon || '🏙️'}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <h4 className="text-xs sm:text-sm font-black text-white truncate">{currentTile.name}</h4>
              <span className="rounded-full bg-black/40 px-1.5 py-0.5 text-[0.55rem] font-black text-amber-400 shrink-0">
                Ô #{currentTile.id}
              </span>
            </div>
            {currentProp ? (
              <div className="flex items-center gap-2 mt-0.5">
                {currentProp.ownerUid && state.players[currentProp.ownerUid] ? (
                  <p className="text-[0.62rem] text-rose-300 font-bold">
                    🚩 Chủ: {state.players[currentProp.ownerUid]!.name} • Thuê{' '}
                    <span className="text-rose-400 font-black">{currentProp.baseRent}$</span>
                    {currentProp.mortgaged && <span className="ml-1 text-red-300 font-bold">(Đang cầm cố)</span>}
                  </p>
                ) : (
                  <p className="text-[0.62rem] text-emerald-300 font-bold">
                    💎 Mua: {currentProp.price}$ • Thuê: {currentProp.baseRent}$
                  </p>
                )}
              </div>
            ) : (
              <p className="text-[0.62rem] text-slate-400 mt-0.5">
                {currentTile.type === 'start'
                  ? '✅ +200$ khi đi qua điểm khởi hành'
                  : currentTile.type === 'special_airport'
                  ? '🛫 Sân bay quốc tế duy nhất: Chọn bay đến mọi ô!'
                  : currentTile.type === 'chance'
                  ? '✨ Rút thẻ Cơ Hội bất ngờ!'
                  : currentTile.type === 'fortune'
                  ? '📜 Thử thách Khí Vận may rủi!'
                  : currentTile.type === 'tax'
                  ? '💸 Nộp thuế phát triển đô thị -75$'
                  : currentTile.type === 'jail'
                  ? '🏝️ Tạm giam Đảo Hoang (mất 2 lượt)'
                  : currentTile.type === 'parking'
                  ? '🦁 Tham quan Vườn Thú nghỉ dưỡng an toàn'
                  : currentTile.type === 'utility'
                  ? '💡 Tiện ích công cộng'
                  : '🎁 Mở hộp quà bí ẩn'}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-xs text-center text-slate-400">Đang khởi tạo…</p>
      )}
    </div>
  )

  // Component Xúc Xắc 3D & Thông Báo Lượt
  const renderDiceSection = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-2.5 bg-gradient-to-b from-slate-900/80 to-slate-950/90 rounded-2xl border border-amber-500/20 shadow-inner min-h-0">
      <div className="flex items-center gap-3 sm:gap-4">
        <Dice3D
          value={state.dice1}
          rolling={rolling}
          onClick={isMyTurn && !state.diceRolled ? handleRollDice : undefined}
          disabled={!isMyTurn || state.diceRolled}
          size={56}
        />
        <Dice3D
          value={state.dice2}
          rolling={rolling}
          onClick={isMyTurn && !state.diceRolled ? handleRollDice : undefined}
          disabled={!isMyTurn || state.diceRolled}
          size={56}
        />
      </div>

      {state.diceRolled && state.dice1 && state.dice2 && (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-2 text-center">
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
  )

  // Component Nút Hành Động
  const renderActionDock = () => (
    <div className="shrink-0 space-y-1.5">
      {isMyTurn ? (
        !state.diceRolled ? (
          <motion.button
            onClick={handleRollDice}
            disabled={rolling}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 py-3 text-xs sm:text-sm font-black text-slate-950 shadow-xl hover:brightness-110 active:scale-95 transition-all animate-pulse"
          >
            {rolling ? 'ĐANG ĐỔ 2 XÚC XẮC… 🎲' : '🎲 BẤM LẮC 2 XÚC XẮC NGAY!'}
          </motion.button>
        ) : (
          <div className="space-y-1.5">
            {/* Nút Bay Sân Bay */}
            {state.canFlyAirport && (
              <motion.button
                onClick={() => setFlightDismissed(false)}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-2xl bg-sky-600 hover:bg-sky-500 py-2.5 text-xs font-black text-white shadow-lg active:scale-95 transition-all animate-bounce"
              >
                🛫 CHỌN ĐIỂM BAY SÂN BAY QUỐC TẾ!
              </motion.button>
            )}

            {/* Nút Mua Đất */}
            {state.canBuyProperty && currentProp && (
              <motion.button
                onClick={handleBuy}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-2xl py-2.5 text-xs font-black text-white shadow-lg active:scale-95 transition-all bg-emerald-600 hover:bg-emerald-500"
              >
                🏙️ MUA [{currentProp.name}] — {currentProp.price}$
              </motion.button>
            )}

            {/* Nút Nâng Cấp */}
            {state.canUpgradeProperty && currentProp && (
              <motion.button
                onClick={() => handleUpgrade(currentProp.id)}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-2xl bg-cyan-600 hover:bg-cyan-500 py-2.5 text-xs font-black text-white shadow-lg active:scale-95 transition-all"
              >
                🏰 NÂNG CẤP NHÀ ⭐ {currentProp.name} ({currentProp.housePrice}$)
              </motion.button>
            )}

            {/* Nút Kết Thúc Lượt */}
            <motion.button
              onClick={handleEndTurn}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-2xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-bold text-slate-200 border border-slate-700 active:scale-95 transition-all"
            >
              {state.canBuyProperty ? '⏩ BỎ QUA & KẾT THÚC LƯỢT' : 'KẾT THÚC LƯỢT ĐI ➔'}
            </motion.button>
          </div>
        )
      ) : (
        <div className="rounded-2xl bg-slate-900/60 p-2 text-center border border-slate-800 text-[0.68rem] text-slate-400">
          Chưa tới lượt — theo dõi bàn cờ trên màn hình!
        </div>
      )}
    </div>
  )

  // Component Quản Lý Sổ Đỏ / Cầm Cố
  const renderPropertiesTab = () => (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto space-y-2 pr-1">
      <div className="flex items-center justify-between pb-1 border-b border-slate-800">
        <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
          🏙️ DANH MỤC BẤT ĐỘNG SẢN CỦA BẠN ({myProperties.length})
        </h3>
        <span className="text-[0.62rem] text-slate-400">Tổng tài sản: <b className="text-emerald-400">{myNetWorth}$</b></span>
      </div>

      {myProperties.length === 0 ? (
        <div className="p-6 text-center text-xs text-slate-500 bg-slate-950/40 rounded-2xl border border-slate-800/60 my-auto">
          Bạn chưa sở hữu khu đất nào. Hãy gieo xúc xắc và mua đất để thu tiền thuê!
        </div>
      ) : (
        myProperties.map((p) => {
          const rent = Math.round(p.baseRent * (1 + p.houses * 1.5))
          return (
            <div
              key={p.id}
              className={`p-2.5 rounded-xl border transition-all ${
                p.mortgaged
                  ? 'bg-red-950/20 border-red-800/40 opacity-70'
                  : 'bg-slate-900/80 border-slate-700/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-xs font-black text-white">{p.name}</span>
                  <span className="text-[0.55rem] text-slate-400">({p.city})</span>
                </div>
                <span className="text-xs font-black text-emerald-400">
                  {p.houses === 4 ? '🏨 KS' : p.houses > 0 ? `🏡x${p.houses}` : 'Đất'} • Thuê {rent}$
                </span>
              </div>

              <div className="flex items-center justify-between text-[0.62rem] text-slate-300 pt-1 border-t border-white/5">
                <span>Giá trị: <b>{p.price}$</b></span>
                <div className="flex items-center gap-1.5">
                  {/* Cầm cố hoặc Chuộc sổ đỏ */}
                  <button
                    onClick={() => handleMortgage(p.id)}
                    className={`px-2 py-0.5 rounded text-[0.58rem] font-bold ${
                      p.mortgaged
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                        : 'bg-red-900/60 text-red-200 border border-red-700/50 hover:bg-red-800'
                    }`}
                  >
                    {p.mortgaged
                      ? `Chuộc lại (-${Math.round(p.price * 0.55)}$)`
                      : `Cầm cố (+${Math.round(p.price * 0.5)}$)`}
                  </button>

                  {/* Nâng cấp nếu là lượt của mình */}
                  {isMyTurn && !p.mortgaged && p.houses < 4 && (
                    <button
                      onClick={() => handleUpgrade(p.id)}
                      disabled={!myState || myState.money < p.housePrice}
                      className="px-2 py-0.5 rounded text-[0.58rem] font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 disabled:opacity-40"
                    >
                      +Xây ({p.housePrice}$)
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )

  return (
    <PhoneShell code={code} accent="#f59e0b" wide>
      <div className="flex flex-1 flex-col justify-between h-full max-h-[100dvh] overflow-hidden overscroll-none touch-manipulation select-none pb-1">
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

        {/* Thanh ví tiền & Linh vật & Mini Scoreboard chung */}
        <div className="shrink-0 pt-0.5 space-y-1">
          <div className="rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 p-2 border border-amber-500/30 shadow-md space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{myMascot?.symbol || '🐲'}</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[0.55rem] font-black text-amber-400 uppercase tracking-wider">
                      {myMascot?.name || 'LINH VẬT'}
                    </span>
                    <span className="text-[0.5rem] bg-amber-500/20 text-amber-300 px-1 rounded font-bold">
                      {myMascot?.title}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-black text-amber-400 leading-tight">
                      {myState?.money ?? 0}$
                    </span>
                    <span className="text-[0.6rem] text-slate-400">
                      Tổng: <b className="text-emerald-400">{myNetWorth}$</b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[0.55rem] font-bold text-slate-400 block uppercase tracking-wider">SỞ HỮU</span>
                <span className="text-xs font-black text-emerald-400">{myProperties.length} khu 🏙️</span>
              </div>
            </div>

            {/* Mini Scoreboard */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {sortedPlayers.map((p, rank) => {
                const mascot = MASCOTS[p.mascotIndex % MASCOTS.length] ?? MASCOTS[0]
                return (
                  <div
                    key={p.playerUid}
                    className={`flex-shrink-0 flex items-center gap-1 rounded-lg px-1.5 py-0.5 border text-[0.58rem] transition-all ${
                      p.playerUid === uid
                        ? 'bg-amber-500/20 border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.25)]'
                        : p.bankrupt
                        ? 'bg-slate-950/50 border-slate-700/50 opacity-50'
                        : 'bg-slate-900/60 border-slate-700/40'
                    }`}
                  >
                    <span className="text-[0.52rem] text-slate-400 font-bold">#{rank + 1}</span>
                    <span>{mascot.symbol}</span>
                    <span className="font-bold truncate max-w-[45px]" style={{ color: p.playerUid === uid ? '#fbbf24' : '#94a3b8' }}>
                      {p.name}
                    </span>
                    <span className={`font-black ${p.bankrupt ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {p.bankrupt ? '💀' : `${p.money}$`}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            CHẾ ĐỘ MÀN HÌNH DỌC (PORTRAIT): Tab chuyển đổi Tay Cầm / Bản Đồ / Sổ Đỏ
        ------------------------------------------------------------- */}
        <div className="landscape:hidden flex flex-1 flex-col justify-between py-1 min-h-0 space-y-1.5">
          {/* Gợi ý xoay ngang */}
          <div className="flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[0.58rem] font-bold text-amber-300">
            <span>🔄</span>
            <span>Xoay ngang điện thoại để xem cả Bản Đồ 32 Ô & Tay Cầm cùng lúc!</span>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-950/80 p-1 border border-slate-800 shrink-0">
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
              🗺️ Bản Đồ (32 Ô)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('properties')}
              className={`py-1.5 rounded-lg text-xs font-black transition-all ${
                activeTab === 'properties'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🏙️ Sổ Đỏ ({myProperties.length})
            </button>
          </div>

          {activeTab === 'controller' ? (
            <div className="flex-1 flex flex-col justify-between py-0.5 min-h-0 space-y-1.5">
              {renderCurrentTileCard()}
              {renderDiceSection()}
              {renderActionDock()}
            </div>
          ) : activeTab === 'board' ? (
            <div className="flex-1 flex flex-col items-center justify-center my-auto py-1 min-h-0">
              <div className="w-full max-w-[360px] aspect-square flex items-center justify-center">
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
                ← Quay lại tay cầm điều khiển
              </button>
            </div>
          ) : (
            renderPropertiesTab()
          )}
        </div>

        {/* -------------------------------------------------------------
            CHẾ ĐỘ MÀN HÌNH NGANG (LANDSCAPE): BẢN ĐỒ 32 Ô BÊN TRÁI + TAY CẦM & SỔ ĐỎ BÊN PHẢI
        ------------------------------------------------------------- */}
        <div className="hidden landscape:flex flex-1 flex-row gap-3 h-[calc(100vh-80px)] items-stretch overflow-hidden pt-1">
          {/* CỘT TRÁI: BÀN CỜ 32 Ô RÕ NÉT KHÔNG BỊ CO GIÃN */}
          <div className="h-full aspect-square max-h-[calc(100vh-86px)] flex items-center justify-center shrink-0">
            <MonopolyBoard
              players={state.players}
              properties={state.properties}
              currentTurnUid={state.currentTurn}
              dice1={state.dice1}
              dice2={state.dice2}
              rolling={rolling}
              lastEvent={state.lastEvent}
              onRollClick={isMyTurn && !state.diceRolled ? handleRollDice : undefined}
              onTileClick={(idx) => {
                if (state.canFlyAirport && isMyTurn) {
                  void handleFlightSelect(idx)
                }
              }}
              highlightTiles={state.canFlyAirport && isMyTurn ? [0, 8, 12, 16, 20, 24, 30, 31] : []}
            />
          </div>

          {/* CỘT PHẢI: BẢNG ĐIỀU KHIỂN & SỔ ĐỎ */}
          <div className="flex-1 min-w-[280px] max-w-sm flex flex-col justify-between h-full overflow-y-auto space-y-1.5 pr-1">
            {renderCurrentTileCard()}
            {renderDiceSection()}
            {renderActionDock()}

            {/* Quick Property Bar */}
            {myProperties.length > 0 && (
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-[0.62rem] text-slate-300 flex items-center justify-between">
                <span>Đất: <b>{myProperties.length} khu</b></span>
                <button
                  onClick={() => setActiveTab('properties')}
                  className="text-amber-400 font-bold hover:underline"
                >
                  Xem Sổ Đỏ ➔
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MODAL CHỌN ĐIỂM BAY SÂN BAY QUỐC TẾ */}
        <AnimatePresence>
          {flightModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 10 }}
                className="w-full max-w-sm rounded-3xl bg-slate-900 border-2 border-sky-500 p-4 shadow-2xl flex flex-col"
              >
                <div className="text-center mb-3">
                  <span className="text-3xl block mb-1">🛫</span>
                  <h3 className="text-sm font-black text-white">SÂN BAY QUỐC TẾ</h3>
                  <p className="text-[0.65rem] text-sky-300 font-medium">
                    Chọn địa điểm bạn muốn đáp máy bay đến ngay lập tức:
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1.5 max-h-60 overflow-y-auto py-1">
                  {[
                    { id: 0, name: 'Khởi Hành 🏁', desc: 'Nhận +200$' },
                    { id: 12, name: 'Mũi Né 🏖️', desc: '180$' },
                    { id: 16, name: 'Vườn Thú 🦁', desc: 'Nghỉ dưỡng' },
                    { id: 20, name: 'Phú Quốc 🏝️', desc: '250$' },
                    { id: 26, name: 'Hạ Long ⛵', desc: '320$' },
                    { id: 28, name: 'Phố Cổ HN 🏮', desc: '350$' },
                    { id: 30, name: 'Hồ Gươm 🐢', desc: '360$' },
                    { id: 31, name: 'Landmark 81 🏙️', desc: '450$ Siêu VIP' },
                  ].map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => handleFlightSelect(dest.id)}
                      className="p-2 rounded-xl bg-slate-950/80 hover:bg-sky-950/60 border border-slate-700/60 hover:border-sky-400 text-left transition-all"
                    >
                      <p className="text-xs font-black text-white truncate">{dest.name}</p>
                      <p className="text-[0.6rem] text-sky-400 font-medium">{dest.desc}</p>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setFlightDismissed(true)}
                  className="mt-3 w-full py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Đóng lại
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PhoneShell>
  )
}
