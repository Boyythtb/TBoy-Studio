import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { SfxToggle } from '../ui/SfxToggle'
import { PhoneShell, JoinForm, LobbyWait } from '../ui/PhoneJoin'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import { buzz } from '../lib/buzz'
import { sfx } from '../lib/sfx'
import {
  todSelectType,
  todComplete,
  todDrink,
  getPlayerOrder,
  type TodState,
} from '../game/truthOrDareEngine'

export default function TruthOrDarePlayer() {
  const { code = '' } = useParams()
  const { uid, meta, players, loading } = useGameRoom(code)
  const [state, setState] = useState<TodState | null>(null)
  const order = useMemo(() => getPlayerOrder(players), [players])
  const me = uid ? players[uid] : null

  useEffect(() => {
    if (!code) return
    const unsub = store.sub<TodState>(paths.tod(code), (v) => {
      setState(v)
    })
    return () => unsub()
  }, [code])

  const isMyTurn = Boolean(uid && state?.activeUid === uid)
  const activePlayer = state?.activeUid ? players[state.activeUid] : null

  useEffect(() => {
    if (isMyTurn) {
      buzz(200)
      sfx.win()
    }
  }, [isMyTurn])

  // 1. Loading
  if (loading) {
    return (
      <PhoneShell code={code}>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-rose-500" />
        </div>
      </PhoneShell>
    )
  }

  // 2. Room not found
  if (!meta) {
    return (
      <PhoneShell code={code}>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="display text-2xl text-white font-bold">Không tìm thấy phòng</p>
          <p className="mt-2 text-xs text-slate-400">
            Mã phòng <span className="font-mono text-rose-400 font-bold">{code}</span> không tồn tại hoặc đã kết thúc.
          </p>
          <Link to="/" className="btn btn-primary btn-md mt-6">
            Về trang chủ
          </Link>
        </div>
      </PhoneShell>
    )
  }

  // 3. Not joined yet -> Show Join Form (Enter Name & Pick Avatar!)
  if (!me) {
    return (
      <PhoneShell code={code}>
        <JoinForm code={code} accent="#f43f5e" onJoined={() => undefined} />
      </PhoneShell>
    )
  }

  // 4. In Lobby (Waiting for Host to start)
  if (!state || state.phase === 'lobby') {
    return (
      <PhoneShell code={code}>
        <LobbyWait
          code={code}
          players={order.map((id) => players[id])}
          me={me}
          icon="🌶️"
          accent="#f43f5e"
          text="Bạn đã vào bàn nhậu! Nâng ly bia sẵn sàng chờ chủ xị bấm bắt đầu vòng xoay…"
        />
      </PhoneShell>
    )
  }

  // 5. Active Game Interface
  return (
    <Stage mode="blood">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col px-4 pb-8">
        {/* Header */}
        <header className="flex items-center justify-between py-3 border-b border-rose-900/60">
          <div className="flex items-center gap-2">
            <Avatar index={me.avatar} size={28} name={me.name} />
            <span className="text-xs font-bold text-white truncate max-w-[120px]">
              {me.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[0.68rem] font-black text-amber-400 border border-amber-500/40">
              🍻 {uid ? state.drinks?.[uid] ?? 0 : 0} ly
            </span>
            <SfxToggle />
          </div>
        </header>

        {/* Turn Status Notification */}
        <div className="mt-3">
          {isMyTurn ? (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 p-3 text-center text-white font-black text-sm shadow-lg shadow-rose-950/60 border border-white/20"
            >
              🔥 ĐẾN LƯỢT BẠN RỒI! HÃY CHỌN SỐ PHẬN:
            </motion.div>
          ) : (
            <div className="rounded-2xl bg-slate-900/90 p-3 text-center border border-slate-800 text-xs font-bold text-slate-300">
              🎯 Đang tới lượt:{' '}
              <span className="text-rose-400 font-black">
                {activePlayer?.name || 'Ai đó'}
              </span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <main className="mt-4 flex flex-1 flex-col justify-center">
          {/* Phase 1: Card is not picked yet */}
          {!state.card ? (
            <div>
              {isMyTurn ? (
                <div className="space-y-4">
                  <p className="text-center text-xs text-slate-300 font-bold">
                    Chọn một hình thức để đối mặt với anh em:
                  </p>

                  <button
                    onClick={() => {
                      sfx.reveal()
                      todSelectType(code, state, 'truth')
                    }}
                    className="group w-full rounded-3xl bg-gradient-to-b from-cyan-900/60 to-slate-950 p-6 border-2 border-cyan-500/60 text-center shadow-xl active:scale-95 transition-all"
                  >
                    <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">🌶️</span>
                    <span className="text-xl font-black text-cyan-300 block">SỰ THẬT 18+</span>
                    <span className="text-xs text-slate-400 mt-1 block">
                      Khai sạch bí mật phòng the & chuyện nhạy cảm
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      sfx.reveal()
                      todSelectType(code, state, 'dare')
                    }}
                    className="group w-full rounded-3xl bg-gradient-to-b from-rose-900/60 to-slate-950 p-6 border-2 border-rose-500/60 text-center shadow-xl active:scale-95 transition-all"
                  >
                    <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">🔥</span>
                    <span className="text-xl font-black text-rose-300 block">THỬ THÁCH TƯƠNG TÁC</span>
                    <span className="text-xs text-slate-400 mt-1 block">
                      Hành động táo bạo với người trong bàn nhậu
                    </span>
                  </button>
                </div>
              ) : (
                <div className="rounded-3xl bg-slate-900/80 p-8 text-center border border-slate-800">
                  <div className="text-4xl mb-3 animate-bounce">🍾</div>
                  <h3 className="text-base font-black text-white">
                    {activePlayer?.name} đang chuẩn bị chọn…
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Hãy nâng ly bia trên tay sẵn sàng để cổ vũ hoặc phạt uống!
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Phase 2: Card is Revealed */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-3xl p-6 text-center shadow-2xl border backdrop-blur-xl ${
                state.card.type === 'truth'
                  ? 'bg-gradient-to-b from-cyan-950/95 to-slate-950 border-cyan-500/60 shadow-cyan-950/50'
                  : 'bg-gradient-to-b from-rose-950/95 to-slate-950 border-rose-500/60 shadow-rose-950/50'
              }`}
            >
              <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[0.68rem] font-black border border-white/10 uppercase">
                {state.card.type === 'truth' ? (
                  <span className="text-cyan-400">🌶️ SỰ THẬT 18+ TÁO BẠO</span>
                ) : (
                  <span className="text-rose-400">🔥 THỬ THÁCH TƯƠNG TÁC</span>
                )}
              </div>

              <p className="mt-3 text-xs font-bold text-slate-400">
                Thử thách cho <span className="text-white font-black">{activePlayer?.name}</span>:
              </p>

              <h3 className="mt-3 text-lg font-black leading-snug text-white drop-shadow-md min-h-[70px] flex items-center justify-center">
                "{state.card.text}"
              </h3>

              {state.card.note && (
                <p className="mt-2 text-[0.72rem] italic text-rose-300/80">
                  💡 {state.card.note}
                </p>
              )}

              <div className="mt-4 rounded-xl bg-amber-500/10 p-2.5 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-2">
                <span>🍺 Nếu né tránh:</span>
                <span className="rounded bg-amber-500 px-2 py-0.5 text-black font-black">
                  PHẠT {state.card.penalty} LY BIA
                </span>
              </div>

              {/* Action Buttons */}
              {isMyTurn ? (
                <div className="mt-6 space-y-2.5">
                  <button
                    onClick={() => {
                      sfx.win()
                      todComplete(code, state)
                    }}
                    className="w-full rounded-2xl bg-emerald-600 py-3.5 text-xs font-black text-white hover:bg-emerald-500 active:scale-95 transition-all shadow-lg shadow-emerald-950/50"
                  >
                    ✅ Tôi Đã Làm Xong! (Qua lượt)
                  </button>

                  <button
                    onClick={() => {
                      sfx.death()
                      todDrink(code, state, state.card!.penalty)
                    }}
                    className="w-full rounded-2xl bg-gradient-to-r from-rose-700 to-amber-700 py-3.5 text-xs font-black text-white hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-rose-950/50"
                  >
                    🍻 Tôi Không Dám! Tự Uống Phạt {state.card.penalty} Ly
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-2">
                  <p className="text-xs text-slate-400 italic">
                    Đang quan sát <span className="text-white font-bold">{activePlayer?.name}</span> thực hiện…
                  </p>
                  <button
                    onClick={() => {
                      sfx.death()
                      todDrink(code, state, state.card!.penalty)
                    }}
                    className="w-full rounded-2xl bg-rose-950/80 border border-rose-600/60 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-900 transition-colors"
                  >
                    🍻 Bắt Uống Phạt (Nếu né tránh)
                  </button>
                  <button
                    onClick={() => {
                      sfx.tap()
                      todComplete(code, state)
                    }}
                    className="w-full rounded-2xl bg-slate-900 border border-slate-800 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    👏 Xác nhận đã làm xong
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </Stage>
  )
}
