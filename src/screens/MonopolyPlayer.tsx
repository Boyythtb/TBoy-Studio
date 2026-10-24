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
          {/* Thanh ví tiền & tài sản */}
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 p-2.5 border border-amber-500/30 shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-xl">💰</span>
              <div>
                <span className="text-[0.6rem] font-bold text-slate-400 block uppercase tracking-wider">
                  VÍ TIỀN
                </span>
                <span className="text-lg font-black text-amber-400 leading-tight">
                  {myState?.money ?? 0}$
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[0.6rem] font-bold text-slate-400 block uppercase tracking-wider">
                BẤT ĐỘNG SẢN
              </span>
              <span className="text-xs font-black text-emerald-400">
                {myProperties.length} khu đất 🏙️
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
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
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
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🗺️ Xem Toàn Bộ Bàn Cờ
            </button>
          </div>
        </div>

        {/* 2. Nội dung chính: Tùy theo Tab được chọn */}
        {activeTab === 'controller' ? (
          /* CHẾ ĐỘ TAY CẦM: Vừa vặn 100% màn hình điện thoại, KHÔNG CUỘN! */
          <div className="flex-1 flex flex-col justify-between py-1.5 min-h-0 space-y-2">
            {/* THẺ Ô VỊ TRÍ ĐANG ĐỨNG HOẶC SỰ KIỆN */}
            <div className="rounded-2xl bg-slate-900/90 p-3 border border-slate-800 shadow-md shrink-0">
              {currentTile ? (
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1.5">
                    <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">
                      VỊ TRÍ HIỆN TẠI
                    </span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[0.62rem] font-black text-amber-400">
                      Ô #{currentTile.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{currentTile.icon || '🏙️'}</span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-black text-white truncate">
                        {currentTile.name}
                      </h4>
                      {currentProp ? (
                        <p className="text-[0.65rem] text-slate-300">
                          Giá đất: <span className="font-bold text-amber-400">{currentProp.price}$</span> | Thuê:{' '}
                          <span className="font-bold text-emerald-400">{currentProp.baseRent}$</span>
                        </p>
                      ) : (
                        <p className="text-[0.65rem] text-slate-400">
                          {currentTile.type === 'start'
                            ? 'Trạm nhận thưởng +200$'
                            : currentTile.type === 'chance'
                            ? 'Ô thẻ bài vận may bất ngờ'
                            : currentTile.type === 'tax'
                            ? 'Ô nộp thuế đô thị'
                            : currentTile.type === 'jail'
                            ? 'Trại tạm giam'
                            : 'Bãi đỗ xe an toàn'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-center text-slate-400 font-medium">
                  Đang khởi tạo vị trí đô thị…
                </p>
              )}
            </div>

            {/* VÙNG XÚC XẮC 3D TRUNG TÂM TAY CẦM */}
            <div className="flex-1 flex flex-col items-center justify-center p-3 bg-gradient-to-b from-slate-900/80 to-slate-950/90 rounded-3xl border border-amber-500/20 shadow-inner min-h-0">
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
                    🎲 KẾT QUẢ: ĐỔ ĐƯỢC {state.dice1 + state.dice2} ĐIỂM! ({state.dice1} + {state.dice2})
                  </span>
                </div>
              )}

              {!isMyTurn && (
                <p className="mt-2 text-[0.7rem] text-slate-400 font-medium animate-pulse text-center">
                  ⏳ Đang chờ <span className="font-bold text-amber-400">{currentPState?.name}</span> thực hiện lượt…
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
                    className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 py-3.5 text-sm font-black text-slate-950 shadow-xl hover:brightness-110 active:scale-95 transition-all shadow-amber-950/80 animate-pulse"
                  >
                    {rolling ? 'ĐANG ĐỔ 2 XÚC XẮC… 🎲' : '🎲 BẤM LẮC 2 XÚC XẮC NGAY!'}
                  </button>
                ) : (
                  <div className="space-y-1.5">
                    {state.canBuyProperty && currentProp && (
                      <button
                        onClick={handleBuy}
                        className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-500 py-3 text-xs font-black text-white shadow-lg active:scale-95 transition-all"
                      >
                        🏙️ MUA ĐẤT [{currentProp.name}] ({currentProp.price}$)
                      </button>
                    )}

                    {state.canUpgradeProperty && currentProp && (
                      <button
                        onClick={handleUpgrade}
                        className="w-full rounded-2xl bg-cyan-600 hover:bg-cyan-500 py-3 text-xs font-black text-white shadow-lg active:scale-95 transition-all"
                      >
                        🏰 NÂNG CẤP NHÀ ⭐ ({currentProp.housePrice}$)
                      </button>
                    )}

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
                  Chưa tới lượt của bạn. Hãy theo dõi bàn cờ trên màn hình lớn!
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
              ← Quay lại tay cầm thao tác
            </button>
          </div>
        )}
      </div>
    </PhoneShell>
  )
}
