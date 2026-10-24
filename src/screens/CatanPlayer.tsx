import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
  RESOURCE_CONFIG,
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

  const handleEndTurn = async () => {
    if (!isMyTurn || !state) return
    buzz(20)
    sfx.tap()
    await catanEndTurn(code)
  }

  if (loading) {
    return (
      <PhoneShell code={code}>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-emerald-400" />
        </div>
      </PhoneShell>
    )
  }

  if (!meta) {
    return (
      <PhoneShell code={code}>
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
      <PhoneShell code={code}>
        <JoinForm code={code} onJoined={() => undefined} />
      </PhoneShell>
    )
  }

  if (!state || state.phase === 'lobby') {
    return (
      <PhoneShell code={code}>
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
    <PhoneShell code={code}>
      <div className="flex flex-1 flex-col justify-between h-full max-h-screen overflow-hidden select-none pb-1">
        {/* 1. Header siêu gọn & Tab chuyển đổi chế độ */}
        <div className="shrink-0 pt-1 space-y-1.5">
          {/* Thanh điểm VP & Công trình */}
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 p-2.5 border border-emerald-500/30 shadow-md">
            <div>
              <span className="text-[0.6rem] font-bold text-slate-400 block uppercase tracking-wider">
                ĐIỂM CHIẾN THẮNG
              </span>
              <span className="text-lg font-black text-amber-400 leading-tight">
                {myState?.victoryPoints ?? 0}/5 VP 🏆
              </span>
            </div>

            <div className="text-right">
              <span className="text-[0.6rem] font-bold text-slate-400 block uppercase tracking-wider">
                CÔNG TRÌNH
              </span>
              <span className="text-xs font-black text-emerald-400">
                {myState?.settlements.length} Làng / Thành phố
              </span>
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
          <div className="flex-1 flex flex-col justify-between py-1.5 min-h-0 space-y-2">
            {/* KHO TÀI NGUYÊN 5 LOẠI GỌN GÀNG */}
            <div className="rounded-2xl bg-slate-900/90 p-2.5 border border-slate-800 shadow-md shrink-0">
              <span className="text-[0.62rem] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 text-center">
                TÚI TÀI NGUYÊN CỦA BẠN
              </span>
              {myState && (
                <div className="grid grid-cols-5 gap-1 text-center">
                  {(Object.keys(RESOURCE_CONFIG) as ResourceType[]).map((rKey) => {
                    const r = RESOURCE_CONFIG[rKey]
                    const count = myState.resources[rKey] || 0
                    return (
                      <div
                        key={rKey}
                        className={`flex flex-col items-center rounded-xl p-1.5 border transition-all ${
                          count > 0 ? 'bg-slate-950 border-emerald-500/40' : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                        }`}
                      >
                        <span className="text-lg">{r.icon}</span>
                        <span className="text-[0.6rem] font-bold text-slate-300">{r.name}</span>
                        <span className="text-xs font-black text-amber-400 mt-0.5">{count}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* VÙNG XÚC XẮC 3D TRUNG TÂM TAY CẦM */}
            <div className="flex-1 flex flex-col items-center justify-center p-3 bg-gradient-to-b from-slate-900/80 to-slate-950/90 rounded-3xl border border-emerald-500/20 shadow-inner min-h-0">
              <div className="flex items-center gap-3">
                <Dice3D
                  value={state.dice1}
                  rolling={rolling}
                  onClick={isMyTurn && !state.diceRolled ? handleRollDice : undefined}
                  disabled={!isMyTurn || state.diceRolled}
                  size={64}
                />
                <Dice3D
                  value={state.dice2}
                  rolling={rolling}
                  onClick={isMyTurn && !state.diceRolled ? handleRollDice : undefined}
                  disabled={!isMyTurn || state.diceRolled}
                  size={64}
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
                <p className="mt-2 text-[0.7rem] text-slate-400 font-medium animate-pulse text-center">
                  ⏳ Đang chờ <span className="font-bold text-emerald-400">{state.players[state.currentTurn ?? '']?.name}</span> thu hoạch…
                </p>
              )}
            </div>

            {/* BẢNG NÚT BẤM HÀNH ĐỘNG CỐ ĐỊNH Ở ĐÁY (NGAY TẦM NGÓN CÁI) */}
            <div className="shrink-0 space-y-2">
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

                    <button
                      onClick={handleEndTurn}
                      className="w-full rounded-2xl bg-slate-800 hover:bg-slate-700 py-3 text-xs font-bold text-slate-200 border border-slate-700 active:scale-95 transition-all"
                    >
                      KẾT THÚC LƯỢT ĐI ➔
                    </button>
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
      </div>
    </PhoneShell>
  )
}
