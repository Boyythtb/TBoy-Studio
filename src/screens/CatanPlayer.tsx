import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CatanBoard } from '../ui/CatanBoard'
import { Dice3D } from '../ui/Dice3D'
import { JoinForm, LobbyWait, PhoneShell } from '../ui/PhoneJoin'
import { buzz } from '../lib/buzz'
import { sfx } from '../lib/sfx'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import {
  catanBuildSettlement,
  catanEndTurn,
  catanRollDice,
  catanUpgradeCity,
  catanBankTrade,
  RESOURCE_CONFIG,
  CATAN_HEXES,
  type CatanState,
  type ResourceType,
} from '../game/catanEngine'

export default function CatanPlayer() {
  const { code = '' } = useParams()
  const room = useGameRoom(code)
  const { uid, meta, players, loading } = room

  const [state, setState] = useState<CatanState | null>(null)
  const [rolling, setRolling] = useState(false)
  const [activeTab, setActiveTab] = useState<'controller' | 'board'>('controller')
  const [showTradeModal, setShowTradeModal] = useState(false)
  const [tradeFrom, setTradeFrom] = useState<ResourceType | null>(null)
  const [tradeTo, setTradeTo] = useState<ResourceType | null>(null)

  const me = uid ? players[uid] : null
  const myState = uid && state ? state.players[uid] : null
  const isMyTurn = state?.currentTurn === uid

  const order = useMemo(
    () => Object.keys(players).sort((a, b) => (players[a]?.joinedAt ?? 0) - (players[b]?.joinedAt ?? 0)),
    [players]
  )

  useEffect(() => {
    if (!code) return
    const unsub = store.sub<CatanState>(paths.catan(code), (v) => setState(v))
    return () => unsub()
  }, [code])

  const latestLog = state?.logs[0]

  const canBuildSettlement =
    myState &&
    myState.resources.wood >= 1 &&
    myState.resources.brick >= 1 &&
    myState.resources.sheep >= 1 &&
    myState.resources.wheat >= 1

  const canUpgradeCity =
    myState &&
    myState.resources.wheat >= 2 &&
    myState.resources.ore >= 3 &&
    myState.settlements.some((s) => !s.isCity)

  const hasAnyTradeResource =
    myState && Object.values(myState.resources).some((count) => count >= 4)

  const villagesCount = myState?.settlements.filter((s) => !s.isCity).length || 0
  const citiesCount = myState?.settlements.filter((s) => s.isCity).length || 0

  // Các số xúc xắc mang lại tài nguyên cho người chơi này
  const myLuckyNumbers = useMemo(() => {
    if (!myState) return []
    const hexIds = new Set<number>()
    myState.settlements.forEach((st) => st.hexIds.forEach((id) => hexIds.add(id)))
    const numbers = new Set<number>()
    hexIds.forEach((id) => {
      const hex = CATAN_HEXES[id]
      if (hex && hex.type !== 'desert') numbers.add(hex.diceNumber)
    })
    return Array.from(numbers).sort((a, b) => a - b)
  }, [myState])

  const handleRollDice = async () => {
    if (!isMyTurn || state?.diceRolled || rolling) return
    buzz(60)
    sfx.vote()
    setRolling(true)
    setTimeout(async () => {
      try {
        await catanRollDice(code, state!)
      } finally {
        setRolling(false)
      }
    }, 700)
  }

  const handleBuild = async () => {
    if (!isMyTurn || !state || !canBuildSettlement) return
    buzz(30)
    sfx.win()
    await catanBuildSettlement(code, state)
  }

  const handleUpgrade = async () => {
    if (!isMyTurn || !state || !canUpgradeCity) return
    buzz(30)
    sfx.win()
    await catanUpgradeCity(code, state)
  }

  const handleTrade = async () => {
    if (!isMyTurn || !state || !tradeFrom || !tradeTo || tradeFrom === tradeTo) return
    buzz(25)
    sfx.tap()
    await catanBankTrade(code, state, tradeFrom, tradeTo)
    setShowTradeModal(false)
    setTradeFrom(null)
    setTradeTo(null)
  }

  const handleEndTurn = async () => {
    if (!isMyTurn || !state) return
    buzz(20)
    sfx.tap()
    await catanEndTurn(code)
  }

  if (loading) {
    return (
      <PhoneShell code={code} accent="#10b981">
        <div className="flex flex-1 items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-emerald-400" />
        </div>
      </PhoneShell>
    )
  }

  if (!meta) {
    return (
      <PhoneShell code={code} accent="#10b981">
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
      <PhoneShell code={code} accent="#10b981">
        <JoinForm code={code} onJoined={() => undefined} />
      </PhoneShell>
    )
  }

  if (!state || state.phase === 'lobby') {
    return (
      <PhoneShell code={code} accent="#10b981">
        <LobbyWait
          code={code}
          players={order.map((id) => players[id])}
          me={me}
          icon="🌾"
          text="Chờ chủ phòng bắt đầu khai phá Đảo Catan Mini!"
        />
      </PhoneShell>
    )
  }

  return (
    <PhoneShell code={code} accent="#10b981">
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
              <div className="rounded-full bg-slate-900/95 border border-emerald-500/60 px-3.5 py-1 text-[0.7rem] font-black text-emerald-300 shadow-2xl backdrop-blur-md flex items-center gap-1.5 truncate">
                <span>🌾</span>
                <span className="truncate">{latestLog.text}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Header & Tab Chuyển Đổi Chế Độ */}
        <div className="shrink-0 pt-1 space-y-1.5">
          {/* Thanh Tiến Độ VP & Thông Tin Công Trình */}
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 p-2.5 border border-emerald-500/30 shadow-md">
            <div>
              <span className="text-[0.6rem] font-bold text-slate-400 block uppercase tracking-wider">
                ĐIỂM CHIẾN THẮNG
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-base sm:text-lg font-black text-amber-400 leading-tight">
                  {myState?.victoryPoints ?? 0}/5 VP 🏆
                </span>
                <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
                    style={{ width: `${((myState?.victoryPoints ?? 0) / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-right flex items-center gap-2">
              <div>
                <span className="text-[0.6rem] font-bold text-slate-400 block uppercase tracking-wider">
                  CÔNG TRÌNH
                </span>
                <span className="text-xs font-black text-emerald-400">
                  {villagesCount} Làng • {citiesCount} Thành Phố
                </span>
              </div>

              {isMyTurn && state.diceRolled && hasAnyTradeResource && (
                <button
                  type="button"
                  onClick={() => setShowTradeModal(true)}
                  className="rounded-xl bg-purple-600/40 hover:bg-purple-600/70 border border-purple-500/50 px-2 py-1 text-[0.65rem] font-black text-purple-300 transition-all active:scale-95"
                >
                  🔄 Đổi 4:1
                </button>
              )}
            </div>
          </div>

          {/* Tab Switcher: Tay Cầm Thao Tác (Gọn, không cuộn) vs Xem Bản Đồ */}
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-950/80 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('controller')}
              className={`py-1.5 rounded-lg text-xs font-black transition-all ${
                activeTab === 'controller'
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🎮 Tay Cầm Thao Tác
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('board')}
              className={`py-1.5 rounded-lg text-xs font-black transition-all ${
                activeTab === 'board'
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🏝️ Xem Bản Đồ Đảo
            </button>
          </div>
        </div>

        {/* 2. Nội dung chính: Tùy theo Tab được chọn */}
        {activeTab === 'controller' ? (
          /* CHẾ ĐỘ TAY CẦM: Vừa vặn 100% màn hình điện thoại, KHÔNG CUỘN! */
          <div className="flex-1 flex flex-col justify-between py-1 min-h-0 space-y-1.5">
            {/* KHO TÀI NGUYÊN 5 LOẠI GỌN GÀNG */}
            <div className="rounded-2xl bg-slate-900/90 p-2 border border-slate-800 shadow-md shrink-0">
              <span className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-wider block mb-1 text-center">
                TÚI TÀI NGUYÊN CỦA BẠN
              </span>
              {myState && (
                <div className="grid grid-cols-5 gap-1 text-center">
                  {(Object.keys(RESOURCE_CONFIG) as ResourceType[]).map((rKey) => {
                    const r = RESOURCE_CONFIG[rKey]
                    const count = myState.resources[rKey] || 0
                    const canTrade = count >= 4
                    return (
                      <div
                        key={rKey}
                        className={`flex flex-col items-center rounded-xl p-1 border transition-all ${
                          canTrade
                            ? 'bg-purple-950/50 border-purple-500/60 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                            : count > 0
                            ? 'bg-slate-950 border-emerald-500/40'
                            : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                        }`}
                      >
                        <span className="text-base">{r.icon}</span>
                        <span className="text-[0.58rem] font-bold text-slate-300">{r.name}</span>
                        <span className="text-xs font-black text-amber-400">{count}</span>
                        {canTrade && (
                          <span className="text-[0.5rem] font-extrabold text-purple-300 leading-none mt-0.5">
                            4:1 🔄
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* THẺ SỐ THU HOẠCH MAY MẮN (Đồng bộ với thẻ bất động sản Monopoly) */}
            <div className="rounded-xl bg-slate-950/80 px-2.5 py-1.5 border border-slate-800/80 flex items-center justify-between text-xs shrink-0">
              <span className="text-[0.65rem] font-bold text-slate-400">
                🎯 Số xúc xắc bạn thu hoạch:
              </span>
              <div className="flex gap-1">
                {myLuckyNumbers.length > 0 ? (
                  myLuckyNumbers.map((num) => (
                    <span
                      key={num}
                      className={`px-1.5 py-0.5 rounded-md text-[0.65rem] font-black ${
                        num === 6 || num === 8
                          ? 'bg-rose-950 text-rose-300 border border-rose-500/50'
                          : 'bg-slate-800 text-amber-300 border border-slate-700'
                      }`}
                    >
                      {num}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-[0.65rem]">Chưa có</span>
                )}
              </div>
            </div>

            {/* VÙNG XÚC XẮC 3D TRUNG TÂM TAY CẦM */}
            <div className="flex-1 flex flex-col items-center justify-center p-2.5 bg-gradient-to-b from-slate-900/80 to-slate-950/90 rounded-3xl border border-emerald-500/20 shadow-inner min-h-0">
              <div className="flex items-center gap-3">
                <Dice3D
                  value={state.dice1}
                  rolling={rolling}
                  onClick={isMyTurn && !state.diceRolled ? handleRollDice : undefined}
                  disabled={!isMyTurn || state.diceRolled}
                  size={60}
                />
                <Dice3D
                  value={state.dice2}
                  rolling={rolling}
                  onClick={isMyTurn && !state.diceRolled ? handleRollDice : undefined}
                  disabled={!isMyTurn || state.diceRolled}
                  size={60}
                />
              </div>

              {state.diceRolled && state.dice1 && state.dice2 && (
                <div className="mt-2 text-center">
                  <span className="text-xs font-black text-amber-400">
                    🌾 XÚC XẮC RA SỐ: {state.dice1 + state.dice2}! ({state.dice1} + {state.dice2})
                  </span>
                </div>
              )}

              {!isMyTurn && (
                <p className="mt-1.5 text-[0.68rem] text-slate-400 font-medium animate-pulse text-center">
                  ⏳ Đang chờ <span className="font-bold text-emerald-400">{state.players[state.currentTurn ?? '']?.name}</span> thu hoạch…
                </p>
              )}
            </div>

            {/* BẢNG NÚT BẤM HÀNH ĐỘNG CỐ ĐỊNH Ở ĐÁY (NGAY TẦM NGÓN CÁI) */}
            <div className="shrink-0 space-y-1.5">
              {isMyTurn ? (
                !state.diceRolled ? (
                  <button
                    onClick={handleRollDice}
                    disabled={rolling}
                    className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-3.5 text-sm font-black text-white shadow-xl hover:brightness-110 active:scale-95 transition-all shadow-emerald-950/80 animate-pulse"
                  >
                    {rolling ? 'ĐANG ĐỔ XÚC XẮC… 🎲' : '🎲 ĐỔ XÚC XẮC THU HOẠCH TÀI NGUYÊN!'}
                  </button>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <button
                        onClick={handleBuild}
                        disabled={!canBuildSettlement}
                        className="flex-1 rounded-2xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 py-2.5 text-xs font-black text-white transition-all shadow-md active:scale-95 border border-emerald-500/30"
                      >
                        🏡 Xây Làng (+1 VP)
                        <span className="block text-[0.55rem] font-normal text-emerald-200">
                          (1 Gỗ, 1 Gạch, 1 Cừu, 1 Lúa)
                        </span>
                      </button>
                      <button
                        onClick={handleUpgrade}
                        disabled={!canUpgradeCity}
                        className="flex-1 rounded-2xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 py-2.5 text-xs font-black text-white transition-all shadow-md active:scale-95 border border-amber-400/30"
                      >
                        🏰 Lên Thành Phố (+1 VP)
                        <span className="block text-[0.55rem] font-normal text-amber-200">
                          (2 Lúa, 3 Đá)
                        </span>
                      </button>
                    </div>

                    <div className="flex gap-2">
                      {hasAnyTradeResource && (
                        <button
                          onClick={() => setShowTradeModal(true)}
                          className="flex-1 rounded-2xl bg-purple-700 hover:bg-purple-600 py-2.5 text-xs font-black text-white border border-purple-500/40 active:scale-95 transition-all"
                        >
                          🔄 Đổi 4:1 Ngân Hàng
                        </button>
                      )}

                      <button
                        onClick={handleEndTurn}
                        className={`rounded-2xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-bold text-slate-200 border border-slate-700 active:scale-95 transition-all ${
                          hasAnyTradeResource ? 'flex-1' : 'w-full'
                        }`}
                      >
                        KẾT THÚC LƯỢT ĐI ➔
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="rounded-2xl bg-slate-900/60 p-2.5 text-center border border-slate-800 text-[0.7rem] text-slate-400">
                  Chưa tới lượt của bạn. Hãy theo dõi các vùng đất trên màn hình lớn!
                </div>
              )}
            </div>
          </div>
        ) : (
          /* CHẾ ĐỘ XEM BÀN CỜ ĐẦY ĐỦ */
          <div className="flex-1 flex flex-col items-center justify-center my-auto py-1 min-h-0">
            <div className="w-full max-w-[340px] aspect-square flex items-center justify-center">
              <CatanBoard
                players={state.players}
                currentTurnUid={state.currentTurn}
                dice1={state.dice1}
                dice2={state.dice2}
                rolling={rolling}
                onRollClick={isMyTurn && !state.diceRolled ? handleRollDice : undefined}
              />
            </div>
            <button
              onClick={() => setActiveTab('controller')}
              className="mt-2 text-xs font-bold text-emerald-400 underline underline-offset-4"
            >
              ← Quay lại tay cầm thao tác
            </button>
          </div>
        )}

        {/* Modal Đổi 4:1 Với Ngân Hàng Trên Mobile */}
        <AnimatePresence>
          {showTradeModal && myState && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
              onClick={() => setShowTradeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 10 }}
                className="w-full max-w-sm rounded-3xl bg-slate-900 border border-purple-500/50 p-5 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <span>🔄</span> GIAO THƯƠNG NGÂN HÀNG (4:1)
                  </h3>
                  <button
                    onClick={() => setShowTradeModal(false)}
                    className="h-7 w-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="py-3 space-y-3">
                  <div>
                    <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      1. Chọn 4 tài nguyên muốn đổi:
                    </label>
                    <div className="grid grid-cols-5 gap-1 text-center">
                      {(Object.keys(RESOURCE_CONFIG) as ResourceType[]).map((rKey) => {
                        const count = myState.resources[rKey]
                        const isEligible = count >= 4
                        const isSelected = tradeFrom === rKey

                        return (
                          <button
                            key={rKey}
                            type="button"
                            disabled={!isEligible}
                            onClick={() => setTradeFrom(rKey)}
                            className={`p-2 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-purple-600 border-white ring-2 ring-purple-400 text-white'
                                : isEligible
                                ? 'bg-slate-800 border-purple-400/40 text-slate-200'
                                : 'bg-slate-950/40 border-slate-800 opacity-40 text-slate-500'
                            }`}
                          >
                            <span className="text-base block">{RESOURCE_CONFIG[rKey].icon}</span>
                            <span className="text-[0.6rem] font-black">{count}/4</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      2. Chọn 1 tài nguyên bạn cần:
                    </label>
                    <div className="grid grid-cols-5 gap-1 text-center">
                      {(Object.keys(RESOURCE_CONFIG) as ResourceType[]).map((rKey) => {
                        const isSelected = tradeTo === rKey
                        const isSame = tradeFrom === rKey

                        return (
                          <button
                            key={rKey}
                            type="button"
                            disabled={isSame || !tradeFrom}
                            onClick={() => setTradeTo(rKey)}
                            className={`p-2 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-emerald-600 border-white ring-2 ring-emerald-400 text-white'
                                : isSame
                                ? 'bg-slate-950/40 border-slate-800 opacity-30 text-slate-500'
                                : 'bg-slate-800 border-emerald-400/40 text-slate-200'
                            }`}
                          >
                            <span className="text-base block">{RESOURCE_CONFIG[rKey].icon}</span>
                            <span className="text-[0.6rem] font-black">{RESOURCE_CONFIG[rKey].name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex gap-2">
                  <button
                    onClick={() => setShowTradeModal(false)}
                    className="flex-1 rounded-xl bg-slate-800 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleTrade}
                    disabled={!tradeFrom || !tradeTo || tradeFrom === tradeTo}
                    className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-600 py-2.5 text-xs font-black text-white hover:brightness-110 disabled:opacity-40"
                  >
                    Xác nhận đổi ➔
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PhoneShell>
  )
}
