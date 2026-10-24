import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MonopolyBoard } from '../ui/MonopolyBoard'
import { JoinForm, LobbyWait, PhoneShell } from '../ui/PhoneJoin'
import { buzz } from '../lib/buzz'
import { sfx } from '../lib/sfx'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import {
  MONOPOLY_TILES,
  monopolyBuyProperty,
  monopolyEndTurn,
  monopolyRollDice,
  monopolyUpgradeProperty,
  monopolyTick,
  type MonopolyState,
} from '../game/monopolyEngine'

export default function MonopolyPlayer() {
  const { code = '' } = useParams()
  const room = useGameRoom(code)
  const { uid, meta, players, loading, isHost } = room

  const [state, setState] = useState<MonopolyState | null>(null)
  const [rolling, setRolling] = useState(false)
  const busy = useRef(false)

  const isActuallyHost = Boolean(isHost || (uid && meta?.hostUid === uid))

  useEffect(() => {
    if (!code) return
    const unsub = store.sub<MonopolyState>(paths.monopoly(code), (v) => setState(v))
    return () => unsub()
  }, [code])

  // Host fallback tick
  useEffect(() => {
    if (!isActuallyHost || !state) return
    const id = setInterval(() => {
      if (busy.current) return
      busy.current = true
      void monopolyTick(code, state, Date.now()).finally(() => {
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

  // Bất động sản tại ô đang đứng
  const currentTile = myState ? MONOPOLY_TILES[myState.position] : null
  const currentProp = currentTile?.propertyId !== undefined && state ? state.properties[currentTile.propertyId] : null

  // Danh sách tài sản đất của mình
  const myProperties = useMemo(() => {
    if (!uid || !state) return []
    return state.properties.filter((p) => p.ownerUid === uid)
  }, [uid, state])

  const handleRollDice = async () => {
    if (!isMyTurn || state?.diceRolled || rolling) return
    buzz(40)
    sfx.vote()
    setRolling(true)
    try {
      await monopolyRollDice(code, state!)
    } finally {
      setTimeout(() => setRolling(false), 700)
    }
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
      <PhoneShell code={code}>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-amber-400" />
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
          icon="🎩"
          text="Chờ chủ phòng bắt đầu ván Cờ Tỷ Phú Mini!"
        />
      </PhoneShell>
    )
  }

  return (
    <PhoneShell code={code}>
      <div className="flex flex-1 flex-col justify-between pb-4">
        {/* Header Ví Tiền */}
        <div className="shrink-0 pt-2">
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 p-3.5 border border-amber-500/30 shadow-lg">
            <div>
              <p className="text-[0.62rem] font-bold text-slate-400 uppercase tracking-widest">
                VÍ TIỀN ĐẠI GIA
              </p>
              <h3 className="text-xl font-black text-amber-400">
                {myState?.money ?? 0}$
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[0.62rem] font-bold text-slate-400 block">Bất Động Sản:</span>
              <span className="text-xs font-black text-emerald-400">
                {myProperties.length} khu đất 🏙️
              </span>
            </div>
          </div>
        </div>

        {/* Bàn cờ Monopoly Board */}
        <div className="my-auto py-2">
          <MonopolyBoard
            players={state.players}
            properties={state.properties}
            currentTurnUid={state.currentTurn}
            dice1={state.dice1}
            dice2={state.dice2}
          />
        </div>

        {/* Khung Hành Động */}
        <div className="shrink-0 space-y-2.5">
          {/* Thông báo lượt */}
          <div className="rounded-2xl bg-slate-900/90 p-3 text-center border border-slate-800">
            {isMyTurn ? (
              !state.diceRolled ? (
                <p className="text-xs font-bold text-amber-400 animate-pulse">
                  🎲 ĐẾN LƯỢT BẠN! HÃY LẮC 2 XÚC XẮC!
                </p>
              ) : (
                <p className="text-xs font-bold text-emerald-400">
                  🎯 Bạn đã đáp xuống ô [{currentTile?.name}]!
                </p>
              )
            ) : (
              <p className="text-xs text-slate-300 font-medium">
                Đang chờ <span className="font-bold text-amber-400">{state.players[state.currentTurn ?? '']?.name}</span> đổ xúc xắc…
              </p>
            )}
          </div>

          {/* Nút Lắc Xúc Xắc */}
          {isMyTurn && !state.diceRolled && (
            <button
              onClick={handleRollDice}
              disabled={rolling}
              className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 py-3.5 text-sm font-black text-slate-950 shadow-xl hover:brightness-110 active:scale-95 transition-all shadow-amber-950/80"
            >
              🎲 LẮC 2 XÚC XẮC ĐỂ ĐI!
            </button>
          )}

          {/* Các nút Mua Đất / Nâng Cấp / Kết Thúc Lượt */}
          {isMyTurn && state.diceRolled && (
            <div className="space-y-2">
              {state.canBuyProperty && currentProp && (
                <button
                  onClick={handleBuy}
                  className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-500 py-3 text-xs font-black text-white shadow-lg active:scale-95 transition-all"
                >
                  🏙️ MUA ĐẤT [{currentProp.name}] - Giá {currentProp.price}$
                </button>
              )}

              {state.canUpgradeProperty && currentProp && (
                <button
                  onClick={handleUpgrade}
                  className="w-full rounded-2xl bg-cyan-600 hover:bg-cyan-500 py-3 text-xs font-black text-white shadow-lg active:scale-95 transition-all"
                >
                  🏰 NÂNG CẤP NHÀ ⭐ - Giá {currentProp.housePrice}$
                </button>
              )}

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
