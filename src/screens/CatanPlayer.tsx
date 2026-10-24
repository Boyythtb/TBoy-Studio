import { useEffect, useMemo, useRef, useState } from 'react'
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
  catanTick,
  RESOURCE_CONFIG,
  type CatanState,
  type ResourceType,
} from '../game/catanEngine'

export default function CatanPlayer() {
  const { code = '' } = useParams()
  const room = useGameRoom(code)
  const { uid, meta, players, loading, isHost } = room

  const [state, setState] = useState<CatanState | null>(null)
  const [rolling, setRolling] = useState(false)
  const busy = useRef(false)

  const isActuallyHost = Boolean(isHost || (uid && meta?.hostUid === uid))

  useEffect(() => {
    if (!code) return
    const unsub = store.sub<CatanState>(paths.catan(code), (v) => setState(v))
    return () => unsub()
  }, [code])

  // Host fallback tick loop
  useEffect(() => {
    if (!isActuallyHost || !state) return
    const id = setInterval(() => {
      if (busy.current) return
      busy.current = true
      void catanTick(code, state, Date.now()).finally(() => {
        busy.current = false
      })
    }, 400)
    return () => clearInterval(id)
  }, [code, isActuallyHost, state])

  const order = useMemo(
    () => Object.keys(players).sort((a, b) => (players[a]?.joinedAt ?? 0) - (players[b]?.joinedAt ?? 0)),
    [players]
  )
  const me = uid ? players[uid] : null
  const myState = uid && state ? state.players[uid] : null
  const isMyTurn = Boolean(uid && state?.currentTurn === uid && state?.phase === 'playing')

  // Có đủ tài nguyên xây làng không?
  const canBuildSettlement = Boolean(
    myState &&
    myState.resources.wood >= 1 &&
    myState.resources.brick >= 1 &&
    myState.resources.sheep >= 1 &&
    myState.resources.wheat >= 1
  )

  // Có đủ tài nguyên nâng cấp thành phố không?
  const canUpgradeCity = Boolean(
    myState &&
    myState.resources.wheat >= 2 &&
    myState.resources.ore >= 3 &&
    myState.settlements.some((s) => !s.isCity)
  )

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
    if (!isMyTurn || !state) return
    buzz(30)
    sfx.win()
    await catanBuildSettlement(code, state)
  }

  const handleUpgrade = async () => {
    if (!isMyTurn || !state) return
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
      <div className="flex flex-1 flex-col justify-between pb-4">
        {/* Header Điểm & Kho Tài Nguyên */}
        <div className="shrink-0 pt-2 space-y-2">
          <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 p-3 border border-slate-800 shadow-md">
            <div>
              <p className="text-[0.62rem] font-bold text-slate-400 uppercase tracking-widest">
                ĐIỂM CHIẾN THẮNG
              </p>
              <h3 className="text-xl font-black text-amber-400">
                {myState?.victoryPoints ?? 0}/5 🏆
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[0.62rem] font-bold text-slate-400 block">Công trình:</span>
              <span className="text-xs font-black text-emerald-400">
                {myState?.settlements.length} Làng/Thành phố
              </span>
            </div>
          </div>

          {/* 5 Loại tài nguyên trong kho */}
          {myState && (
            <div className="grid grid-cols-5 gap-1.5 rounded-2xl bg-slate-950/80 p-2 border border-slate-800/80">
              {(Object.keys(RESOURCE_CONFIG) as ResourceType[]).map((rKey) => {
                const r = RESOURCE_CONFIG[rKey]
                const amount = myState.resources[rKey] || 0
                return (
                  <div key={rKey} className="flex flex-col items-center rounded-xl bg-slate-900/90 p-1.5 border border-slate-800 text-center">
                    <span className="text-base">{r.icon}</span>
                    <span className="text-[0.62rem] font-semibold text-slate-300">{r.name}</span>
                    <span className="text-xs font-black text-amber-400 mt-0.5">{amount}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Bản đồ Catan Board */}
        <div className="my-auto py-2">
          <CatanBoard
            players={state.players}
            currentTurnUid={state.currentTurn}
            dice1={state.dice1}
            dice2={state.dice2}
          />
        </div>

        {/* Khung Hành Động */}
        <div className="shrink-0 space-y-2.5">
          <div className="rounded-2xl bg-slate-900/90 p-3 text-center border border-slate-800">
            {isMyTurn ? (
              !state.diceRolled ? (
                <p className="text-xs font-bold text-emerald-400 animate-pulse">
                  🎲 ĐẾN LƯỢT BẠN! HÃY ĐỔ XÚC XẮC THU HOẠCH MÙA MÀNG!
                </p>
              ) : (
                <p className="text-xs font-bold text-amber-400">
                  🌾 Bạn có thể xây dựng công trình hoặc kết thúc lượt!
                </p>
              )
            ) : (
              <p className="text-xs text-slate-300 font-medium">
                Đang chờ <span className="font-bold text-emerald-400">{state.players[state.currentTurn ?? '']?.name}</span> thu hoạch mùa màng…
              </p>
            )}
          </div>

          {/* Vùng Xúc Xắc 3D Trực Tiếp Trên Máy Người Chơi */}
          {isMyTurn && (
            <div className="flex flex-col items-center justify-center p-3 bg-slate-900/90 rounded-3xl border border-emerald-500/30 shadow-xl">
              <div className="flex items-center gap-3">
                <Dice3D
                  value={state.dice1}
                  rolling={rolling}
                  onClick={!state.diceRolled ? handleRollDice : undefined}
                  disabled={state.diceRolled}
                  size={65}
                />
                <Dice3D
                  value={state.dice2}
                  rolling={rolling}
                  onClick={!state.diceRolled ? handleRollDice : undefined}
                  disabled={state.diceRolled}
                  size={65}
                />
              </div>

              {!state.diceRolled ? (
                <button
                  onClick={handleRollDice}
                  disabled={rolling}
                  className="mt-3.5 w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-3.5 text-sm font-black text-white shadow-xl hover:brightness-110 active:scale-95 transition-all shadow-emerald-950/80"
                >
                  {rolling ? 'ĐANG ĐỔ XÚC XẮC… 🎲' : '🎲 ĐỔ XÚC XẮC THU HOẠCH TÀI NGUYÊN!'}
                </button>
              ) : (
                <div className="mt-2 text-center">
                  <span className="text-xs font-black text-amber-400">
                    🌾 XÚC XẮC RA SỐ [{state.dice1! + state.dice2!}] ({state.dice1} + {state.dice2})!
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Các nút Xây Làng / Thành Phố / Kết Thúc */}
          {isMyTurn && state.diceRolled && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={handleBuild}
                  disabled={!canBuildSettlement}
                  className="flex-1 rounded-2xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 py-2.5 text-xs font-black text-white transition-all shadow-md"
                >
                  🏡 Xây Làng Mới (+1đ)
                </button>
                <button
                  onClick={handleUpgrade}
                  disabled={!canUpgradeCity}
                  className="flex-1 rounded-2xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 py-2.5 text-xs font-black text-white transition-all shadow-md"
                >
                  🏰 Lên Thành Phố (+1đ)
                </button>
              </div>

              <button
                onClick={handleEndTurn}
                className="w-full rounded-2xl bg-slate-800 hover:bg-slate-700 py-3 text-xs font-bold text-slate-200 transition-colors"
              >
                KẾT THÚC LƯỢT ➔
              </button>
            </div>
          )}
        </div>
      </div>
    </PhoneShell>
  )
}
