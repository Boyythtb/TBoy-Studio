import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { Avatar } from '../ui/Avatar'
import { SfxToggle } from '../ui/SfxToggle'
import { BottleWheel } from '../ui/BottleWheel'
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

  const currentStep = state?.step || 'waiting_spin'

  // Rung máy khi bị mũi chai chỉ trúng
  useEffect(() => {
    if (isVictim && (currentStep === 'picking' || currentStep === 'acting')) {
      buzz(200)
      sfx.death()
    }
  }, [isVictim, currentStep])

  // Rung máy khi đến lượt mình quay chai
  useEffect(() => {
    if (isMySpinTurn && currentStep === 'waiting_spin') {
      buzz(40)
    }
  }, [isMySpinTurn, currentStep])

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

  return (
    <Stage mode="blood">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col px-4 pb-6 justify-between">
        {/* Header */}
        <header className="flex items-center justify-between py-2.5 border-b border-rose-900/60 shrink-0">
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

        {/* Turn Status Banner */}
        <div className="mt-2 shrink-0">
          {currentStep === 'waiting_spin' && (
            isMySpinTurn ? (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-amber-500 p-2.5 text-center text-white font-black text-xs shadow-lg border border-amber-300/40"
              >
                🍾 LƯỢT CỦA BẠN: HÃY BẤM QUAY CHAI!
              </motion.div>
            ) : (
              <div className="rounded-2xl bg-slate-900/90 p-2.5 text-center border border-slate-800 text-xs font-bold text-slate-300">
                🍻 Chờ <span className="text-amber-400 font-black">{spinnerPlayer?.name}</span> ấn quay chai…
              </div>
            )
          )}

          {currentStep === 'spinning' && (
            <div className="rounded-2xl bg-slate-900/90 p-2.5 text-center border border-rose-500/40 text-xs font-bold text-rose-300 animate-pulse">
              🍾 Chai đang quay tròn… Nín thở chờ nạn nhân!
            </div>
          )}

          {currentStep === 'picking' && (
            isVictim ? (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 p-2.5 text-center text-white font-black text-xs shadow-lg border border-white/20"
              >
                🎯 MŨI CHAI CHỈ TRÚNG BẠN! HÃY CHỌN SỐ PHẬN:
              </motion.div>
            ) : (
              <div className="rounded-2xl bg-slate-900/90 p-2.5 text-center border border-slate-800 text-xs font-bold text-slate-300">
                🎯 Chỉ trúng <span className="text-rose-400 font-black">{victimPlayer?.name}</span>! Đang đợi chọn…
              </div>
            )
          )}

          {currentStep === 'acting' && (
            <div className="rounded-2xl bg-slate-900/90 p-2.5 text-center border border-slate-800 text-xs font-bold text-slate-300">
              🔥 Thử thách dành cho <span className="text-rose-400 font-black">{victimPlayer?.name}</span>
            </div>
          )}
        </div>

        {/* Central Wheel Display (Always Visible and Synchronized on all phones) */}
        <div className="my-auto flex flex-col items-center justify-center py-1">
          <BottleWheel
            order={order}
            players={players}
            drinks={state.drinks}
            spinAngle={state.spinAngle}
            spinnerUid={state.spinnerUid}
            activeUid={state.activeUid}
            currentStep={currentStep}
            canSpin={isMySpinTurn && currentStep === 'waiting_spin'}
            onSpin={() => {
              buzz(40)
              sfx.vote()
              void todSpin(code, state, players)
            }}
            compact={true}
          />
        </div>

        {/* Action Controls Section */}
        <div className="shrink-0 pt-2">
          <AnimatePresence mode="wait">
            {/* 1. GIAI ĐOẠN CHỜ QUAY */}
            {currentStep === 'waiting_spin' && (
              isMySpinTurn ? (
                <motion.div
                  key="spin-btn"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-2"
                >
                  <button
                    onClick={() => {
                      buzz(50)
                      sfx.vote()
                      void todSpin(code, state, players)
                    }}
                    className="w-full rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 py-3.5 text-sm font-black text-white shadow-xl hover:brightness-110 active:scale-95 transition-all shadow-rose-950/80 border border-white/20"
                  >
                    🍾 BẤM QUAY CHAI TÌM NGƯỜI TIẾP THEO! 🚀
                  </button>
                  <p className="text-center text-[0.68rem] text-slate-400">
                    Chạm vào nút hoặc chạm trực tiếp vào chai bia để quay
                  </p>
                </motion.div>
              ) : (
                <div className="rounded-2xl bg-slate-900/60 p-3 border border-slate-800 text-center">
                  <p className="text-xs text-slate-300 font-medium">
                    Đang đợi <span className="text-amber-400 font-black">{spinnerPlayer?.name}</span> ấn quay chai trên máy của họ…
                  </p>
                </div>
              )
            )}

            {/* 2. GIAI ĐOẠN ĐANG QUAY */}
            {currentStep === 'spinning' && (
              <div className="rounded-2xl bg-slate-900/60 p-3 border border-slate-800 text-center">
                <p className="text-xs text-slate-300 font-medium animate-pulse">
                  Chai đang quay tròn trên màn hình cả bàn…
                </p>
              </div>
            )}

            {/* 3. GIAI ĐOẠN CHỌN THẬT HAY THÁCH */}
            {currentStep === 'picking' && (
              isVictim ? (
                <motion.div
                  key="pick-buttons"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-2 gap-2.5"
                >
                  <button
                    onClick={() => {
                      sfx.reveal()
                      void todSelectType(code, state, 'truth')
                    }}
                    className="rounded-2xl bg-gradient-to-b from-cyan-900/80 to-slate-950 p-3.5 border border-cyan-500/60 text-center shadow-lg active:scale-95 transition-all"
                  >
                    <span className="text-2xl block mb-1">🌶️</span>
                    <span className="text-xs font-black text-cyan-300 block">SỰ THẬT 18+</span>
                    <span className="text-[0.62rem] text-slate-400 mt-0.5 block leading-tight">
                      Khai bí mật
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      sfx.reveal()
                      void todSelectType(code, state, 'dare')
                    }}
                    className="rounded-2xl bg-gradient-to-b from-rose-900/80 to-slate-950 p-3.5 border border-rose-500/60 text-center shadow-lg active:scale-95 transition-all"
                  >
                    <span className="text-2xl block mb-1">🔥</span>
                    <span className="text-xs font-black text-rose-300 block">THỬ THÁCH</span>
                    <span className="text-[0.62rem] text-slate-400 mt-0.5 block leading-tight">
                      Tương tác bàn nhậu
                    </span>
                  </button>
                </motion.div>
              ) : (
                <div className="rounded-2xl bg-slate-900/60 p-3 border border-slate-800 text-center">
                  <p className="text-xs text-slate-300 font-medium">
                    Đang đợi <span className="text-rose-400 font-black">{victimPlayer?.name}</span> chọn Thật hay Thách trên máy của họ…
                  </p>
                </div>
              )
            )}

            {/* 4. GIAI ĐOẠN ĐANG TRẢ LỜI / LÀM THỬ THÁCH */}
            {currentStep === 'acting' && state.card && (
              <motion.div
                key="card-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`rounded-2xl p-4 text-center border shadow-xl ${
                  state.card.type === 'truth'
                    ? 'bg-gradient-to-b from-cyan-950/95 to-slate-950 border-cyan-500/60'
                    : 'bg-gradient-to-b from-rose-950/95 to-slate-950 border-rose-500/60'
                }`}
              >
                <div className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[0.6rem] font-black uppercase text-white/90">
                  {state.card.type === 'truth' ? '🌶️ SỰ THẬT 18+' : '🔥 THỬ THÁCH TƯƠNG TÁC'}
                </div>

                <p className="mt-2 text-xs font-bold leading-relaxed text-white">
                  "{state.card.text}"
                </p>

                {state.card.note && (
                  <p className="mt-1 text-[0.65rem] italic text-rose-300/80">
                    💡 {state.card.note}
                  </p>
                )}

                <div className="mt-2 rounded-lg bg-amber-500/10 p-1.5 border border-amber-500/30 text-amber-300 text-[0.68rem] font-bold flex items-center justify-center gap-1.5">
                  <span>🍺 Né tránh phạt:</span>
                  <span className="rounded bg-amber-500 px-1.5 py-0.2 text-black font-black">
                    {state.card.penalty} LY BIA
                  </span>
                </div>

                {isVictim ? (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        sfx.win()
                        buzz(30)
                        void todComplete(code, state)
                      }}
                      className="rounded-xl bg-emerald-600 py-2.5 text-xs font-black text-white active:scale-95 transition-all shadow-md shadow-emerald-950/50"
                    >
                      ✅ Đã Làm Xong!
                    </button>

                    <button
                      onClick={() => {
                        sfx.death()
                        buzz(50)
                        void todDrink(code, state, state.card!.penalty)
                      }}
                      className="rounded-xl bg-gradient-to-r from-rose-700 to-amber-700 py-2.5 text-xs font-black text-white active:scale-95 transition-all shadow-md shadow-rose-950/50"
                    >
                      🍻 Chịu Phạt {state.card.penalty} Ly!
                    </button>
                  </div>
                ) : (
                  <p className="mt-2 text-[0.68rem] text-slate-400">
                    Chờ <span className="text-white font-bold">{victimPlayer?.name}</span> thực hiện hoặc uống phạt…
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  )
}
