import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { SfxToggle } from '../ui/SfxToggle'
import { JoinForm, LobbyWait, PhoneShell } from '../ui/PhoneJoin'
import { buzz } from '../lib/buzz'
import { sfx } from '../lib/sfx'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import {
  todSelectType,
  todComplete,
  todDrink,
  todSpin,
  type TodState,
  getPlayerOrder,
} from '../game/truthOrDareEngine'
import { useState } from 'react'

export default function TruthOrDarePlayer() {
  const { code = '' } = useParams()
  const room = useGameRoom(code)
  const { uid, meta, players, loading } = room
  const [state, setState] = useState<TodState | null>(null)

  useEffect(() => {
    if (!code) return
    const unsub = store.sub<TodState>(paths.tod(code), (v) => {
      setState(v)
    })
    return () => unsub()
  }, [code])

  const order = useMemo(() => getPlayerOrder(players), [players])
  const me = uid ? players[uid] : null

  // Người có quyền ấn quay chai ở vòng này
  const isMySpinTurn = Boolean(uid && state && state.spinnerUid === uid)
  const spinnerPlayer = state?.spinnerUid ? players[state.spinnerUid] : null

  // Nạn nhân bị mũi chai chỉ vào
  const isVictim = Boolean(uid && state && state.activeUid === uid)
  const victimPlayer = state?.activeUid ? players[state.activeUid] : null

  // Rung máy khi bị mũi chai chỉ trúng
  useEffect(() => {
    if (isVictim && (state?.step === 'picking' || state?.step === 'acting')) {
      buzz(200)
      sfx.death()
    }
  }, [isVictim, state?.step])

  // Rung máy khi đến lượt mình ấn quay chai
  useEffect(() => {
    if (isMySpinTurn && state?.step === 'waiting_spin') {
      buzz(40)
    }
  }, [isMySpinTurn, state?.step])

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
          <p className="display text-2xl text-white font-bold">Phòng đã giải tán hoặc không tồn tại</p>
          <p className="mt-2 text-xs text-slate-400">
            Mã phòng <span className="font-mono text-rose-400 font-bold">{code}</span> đã kết thúc.
          </p>
          <Link to="/" className="btn btn-primary btn-md mt-6">
            Về trang chủ
          </Link>
        </div>
      </PhoneShell>
    )
  }

  // 3. Not joined yet -> Show Join Form
  if (!me) {
    return (
      <PhoneShell code={code}>
        <JoinForm code={code} accent="#f43f5e" onJoined={() => undefined} />
      </PhoneShell>
    )
  }

  // 4. In Lobby
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
  const currentStep = state.step || 'waiting_spin'

  return (
    <Stage mode="blood">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col px-4 pb-8 justify-between">
        {/* Header */}
        <header className="flex items-center justify-between py-3 border-b border-rose-900/60 shrink-0">
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

        {/* Main Content by Step */}
        <main className="my-auto py-4 flex flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            {/* GIAI ĐOẠN 1: CHỜ QUAY CHAI */}
            {currentStep === 'waiting_spin' && (
              <motion.div
                key="waiting_spin"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-center"
              >
                {isMySpinTurn ? (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gradient-to-b from-rose-950/90 to-slate-900/90 p-6 border-2 border-rose-500/60 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                      <span className="text-5xl block mb-2 animate-bounce">🍾</span>
                      <p className="text-[0.7rem] uppercase tracking-widest text-rose-400 font-black">
                        LƯỢT QUAY CỦA BẠN!
                      </p>
                      <h2 className="text-xl font-black text-white mt-1">
                        Hãy quay chai để tìm nạn nhân tiếp theo
                      </h2>
                      <p className="text-xs text-slate-300 mt-2">
                        Bấm nút bên dưới để khởi động vòng xoay chai trên màn hình bàn nhậu!
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        buzz(50)
                        sfx.vote()
                        void todSpin(code, state, players)
                      }}
                      className="w-full rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 py-5 text-base font-black text-white shadow-xl hover:brightness-110 active:scale-95 transition-all shadow-rose-950/80 border border-white/20"
                    >
                      🍾 BẤM QUAY CHAI NGAY! 🚀
                    </button>
                  </div>
                ) : (
                  <div className="rounded-3xl bg-slate-900/80 p-8 border border-slate-800 text-center">
                    <span className="text-5xl block mb-3 animate-spin" style={{ animationDuration: '6s' }}>🍾</span>
                    <h3 className="text-base font-black text-white">
                      Đang đợi <span className="text-rose-400">{spinnerPlayer?.name || 'Chủ xị'}</span> quay chai…
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {spinnerPlayer?.name} vừa xong lượt trước và đang nắm quyền chọn người tiếp theo!
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* GIAI ĐOẠN 2: CHAI ĐANG QUAY */}
            {currentStep === 'spinning' && (
              <motion.div
                key="spinning"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rounded-3xl bg-slate-900/90 p-8 text-center border border-rose-500/40"
              >
                <div className="text-6xl mb-4 animate-spin" style={{ animationDuration: '1s' }}>🍾</div>
                <h3 className="text-lg font-black text-white">Chai đang quay tròn…</h3>
                <p className="mt-2 text-xs text-slate-300">
                  Nín thở chờ xem mũi chai sẽ chỉ vào ai trong bàn nhậu!
                </p>
              </motion.div>
            )}

            {/* GIAI ĐOẠN 3: NẠN NHÂN CHỌN SỰ THẬT HAY THỬ THÁCH */}
            {currentStep === 'picking' && (
              <motion.div
                key="picking"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {isVictim ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 p-3 text-center text-white font-black text-sm shadow-lg shadow-rose-950/60 border border-white/20">
                      🎯 MŨI CHAI ĐÃ CHỈ VÀO BẠN!
                    </div>

                    <p className="text-center text-xs text-slate-300 font-bold">
                      Chọn 1 hình thức để đối mặt với anh em:
                    </p>

                    <button
                      onClick={() => {
                        sfx.reveal()
                        void todSelectType(code, state, 'truth')
                      }}
                      className="group w-full rounded-3xl bg-gradient-to-b from-cyan-900/70 to-slate-950 p-6 border-2 border-cyan-500/60 text-center shadow-xl active:scale-95 transition-all"
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
                        void todSelectType(code, state, 'dare')
                      }}
                      className="group w-full rounded-3xl bg-gradient-to-b from-rose-900/70 to-slate-950 p-6 border-2 border-rose-500/60 text-center shadow-xl active:scale-95 transition-all"
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
                    <div className="text-5xl mb-3">🎯</div>
                    <h3 className="text-base font-black text-white">
                      Mũi chai đã chỉ vào <span className="text-rose-400">{victimPlayer?.name || 'Ai đó'}</span>!
                    </h3>
                    <p className="mt-2 text-xs text-slate-400">
                      Đang đợi {victimPlayer?.name} chọn Sự Thật hay Thử Thách…
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* GIAI ĐOẠN 4: THỰC HIỆN CÂU HỎI HOẶC THỬ THÁCH */}
            {currentStep === 'acting' && state.card && (
              <motion.div
                key="acting"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
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
                  Dành cho: <span className="text-white font-black">{victimPlayer?.name}</span>
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

                {/* Nạn nhân bấm hoàn thành hoặc uống phạt */}
                {isVictim ? (
                  <div className="mt-6 space-y-2.5">
                    <button
                      onClick={() => {
                        sfx.win()
                        buzz(30)
                        void todComplete(code, state)
                      }}
                      className="w-full rounded-2xl bg-emerald-600 py-3.5 text-xs font-black text-white hover:bg-emerald-500 active:scale-95 transition-all shadow-lg shadow-emerald-950/50"
                    >
                      ✅ Tôi Đã Làm Xong! (Tiếp tục quay)
                    </button>

                    <button
                      onClick={() => {
                        sfx.death()
                        buzz(50)
                        void todDrink(code, state, state.card!.penalty)
                      }}
                      className="w-full rounded-2xl bg-gradient-to-r from-rose-700 to-amber-700 py-3.5 text-xs font-black text-white hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-rose-950/50"
                    >
                      🍻 Không Dám Làm - Tôi Chịu Phạt {state.card.penalty} Ly!
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl bg-slate-900/60 p-3 border border-slate-800 text-xs text-slate-400">
                    Chờ <span className="text-white font-bold">{victimPlayer?.name}</span> thực hiện hoặc uống phạt trước mặt cả bàn…
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </Stage>
  )
}
