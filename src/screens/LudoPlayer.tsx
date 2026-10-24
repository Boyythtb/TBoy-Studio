import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Dice3D } from '../ui/Dice3D'
import { LudoBoard } from '../ui/LudoBoard'
import { JoinForm, LobbyWait, PhoneShell } from '../ui/PhoneJoin'
import { buzz } from '../lib/buzz'
import { sfx } from '../lib/sfx'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import {
  COLOR_CONFIG,
  canMoveToken,
  ludoMoveToken,
  ludoRollDice,
  ludoUseSkill,
  ludoTick,
  type LudoState,
} from '../game/ludoEngine'

export default function LudoPlayer() {
  const { code = '' } = useParams()
  const room = useGameRoom(code)
  const { uid, meta, players, loading, isHost } = room

  const [state, setState] = useState<LudoState | null>(null)
  const [rolling, setRolling] = useState(false)
  const busy = useRef(false)

  const isActuallyHost = Boolean(isHost || (uid && meta?.hostUid === uid))

  useEffect(() => {
    if (!code) return
    const unsub = store.sub<LudoState>(paths.ludo(code), (v) => setState(v))
    return () => unsub()
  }, [code])

  // Host-authoritative loop fallback: đảm bảo game không bị đơ nếu host chơi trên điện thoại
  useEffect(() => {
    if (!isActuallyHost || !state) return
    const id = setInterval(() => {
      if (busy.current) return
      busy.current = true
      void ludoTick(code, state, Date.now()).finally(() => {
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
  const myState = (uid && state?.players?.[uid]) || null
  const isMyTurn = Boolean(uid && state?.currentTurn === uid && state?.phase === 'playing')
  const myCfg = myState ? COLOR_CONFIG[myState.color] : null

  // Tìm các chú ngựa của mình có thể di chuyển với điểm xúc xắc hiện tại
  const selectableTokenIds = useMemo(() => {
    if (!isMyTurn || !myState || !state?.diceRolled || state.diceValue === null) return []
    return myState.tokens
      .filter((token) => canMoveToken(token, state.diceValue!, myState.color))
      .map((t) => t.id)
  }, [isMyTurn, myState, state?.diceRolled, state?.diceValue])

  const handleRollDice = async () => {
    if (!isMyTurn || state?.diceRolled || rolling) return
    buzz(40)
    sfx.vote()
    setRolling(true)
    try {
      await ludoRollDice(code, state!)
    } finally {
      setTimeout(() => setRolling(false), 600)
    }
  }

  const handleMove = async (tokenId: number) => {
    if (!isMyTurn || !state) return
    buzz(30)
    sfx.tap()
    await ludoMoveToken(code, state, tokenId)
  }

  const handleUseSkill = async (cardId: string) => {
    if (!isMyTurn || !state) return
    buzz(50)
    sfx.reveal()
    await ludoUseSkill(code, state, cardId)
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
          icon="🐴"
          text="Chờ chủ phòng bắt đầu trận đấu Cờ Cá Ngựa Chiến Thuật!"
        />
      </PhoneShell>
    )
  }

  // Active Play Screen
  return (
    <PhoneShell code={code}>
      <div className="flex flex-1 flex-col justify-between pb-4">
        {/* Header Thông Tin Phe & Lượt */}
        <div className="shrink-0 pt-2">
          <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 p-3 border border-slate-800 shadow-md">
            <div className="flex items-center gap-2.5">
              <span className={`h-3.5 w-3.5 rounded-full ${myCfg?.bg ?? 'bg-amber-400'} shadow-md`} />
              <div>
                <p className="text-[0.62rem] font-bold text-slate-400 uppercase tracking-widest">
                  Chiến mã của bạn
                </p>
                <h4 className="text-sm font-black text-white">Phe {myCfg?.name ?? 'Bạn'}</h4>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[0.62rem] font-bold text-slate-400 block">Về đích:</span>
              <span className="text-xs font-black text-amber-400">{myState?.score ?? 0}/2 🏆</span>
            </div>
          </div>
        </div>

        {/* Bàn cờ nhỏ trên điện thoại */}
        <div className="my-auto py-2">
          <LudoBoard
            players={state.players}
            currentTurnUid={state.currentTurn}
            myUid={uid}
            diceValue={state.diceValue}
            selectableTokenIds={selectableTokenIds}
            onTokenClick={handleMove}
          />
        </div>

        {/* Khung Hành Động / Lắc Xúc Xắc / Chọn Ngựa */}
        <div className="shrink-0 space-y-3">
          {/* Thông báo trạng thái lượt */}
          <div className="rounded-2xl bg-slate-900/90 p-3 text-center border border-slate-800 shadow-lg">
            {isMyTurn ? (
              !state.diceRolled ? (
                <div>
                  <p className="text-xs font-bold text-amber-400 animate-pulse">
                    ⚡ ĐẾN LƯỢT BẠN! HÃY LẮC XÚC XẮC!
                  </p>
                  <p className="text-[0.65rem] text-slate-400 mt-0.5">
                    Chạm vào xúc xắc bên dưới để gieo điểm
                  </p>
                </div>
              ) : selectableTokenIds.length > 0 ? (
                <div>
                  <p className="text-xs font-bold text-emerald-400 animate-bounce">
                    🐴 Bạn đổ được {state.diceValue} điểm! Chạm vào ngựa để đi!
                  </p>
                  <p className="text-[0.65rem] text-slate-400 mt-0.5">
                    Các chiến mã hợp lệ đang phát sáng trên bàn cờ
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-bold text-rose-400">
                    Bạn đổ được {state.diceValue} điểm nhưng không có ngựa nào đi được!
                  </p>
                  <p className="text-[0.65rem] text-slate-400 mt-0.5">Tự động chuyển lượt…</p>
                </div>
              )
            ) : (
              <p className="text-xs text-slate-300 font-medium">
                Đang đợi <span className="font-bold text-amber-400">{players[state.currentTurn ?? '']?.name}</span> lắc xúc xắc…
              </p>
            )}
          </div>

          {/* Vùng Lắc Xúc Xắc */}
          {isMyTurn && !state.diceRolled && (
            <div className="flex flex-col items-center justify-center p-2">
              <Dice3D
                value={state.diceValue}
                rolling={rolling}
                onClick={handleRollDice}
                size={74}
              />
              <button
                onClick={handleRollDice}
                disabled={rolling}
                className="mt-3 w-full rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 py-3.5 text-sm font-black text-white shadow-xl hover:brightness-110 active:scale-95 transition-all shadow-amber-950/80"
              >
                🎲 BẤM ĐỂ LẮC XÚC XẮC!
              </button>
            </div>
          )}

          {/* Vùng Chọn Ngựa để đi (Nút Bấm To Dành Cho Điện Thoại) */}
          {isMyTurn && state.diceRolled && selectableTokenIds.length > 0 && myState && (
            <div className="space-y-2">
              <p className="text-[0.68rem] font-bold text-center text-slate-300">
                CHỌN CHIẾN MÃ MUỐN ĐI:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {selectableTokenIds.map((tokenId) => {
                  const token = myState.tokens.find((t) => t.id === tokenId)
                  const isBase = token?.pos === -1
                  return (
                    <button
                      key={tokenId}
                      onClick={() => handleMove(tokenId)}
                      className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-3 text-white font-bold shadow-lg active:scale-95 transition-all hover:brightness-110 border border-white/20"
                    >
                      <span className="text-xl">🐴</span>
                      <span className="text-xs font-black mt-1">
                        {isBase ? `Xuất Chuồng Ngựa ${tokenId + 1}` : `Đi Ngựa ${tokenId + 1} (+${state.diceValue} ô)`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Danh sách Thẻ Bài Kỹ Năng */}
          {myState && myState.cards.length > 0 && isMyTurn && !state.diceRolled && (
            <div className="rounded-2xl bg-slate-900/60 p-2.5 border border-amber-500/30">
              <p className="text-[0.65rem] font-bold text-amber-400 uppercase tracking-wider mb-1.5 text-center">
                ✨ THẺ BÀI CHIẾN THUẬT CỦA BẠN
              </p>
              <div className="flex gap-2 justify-center">
                {myState.cards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleUseSkill(card.id)}
                    className="flex-1 rounded-xl bg-amber-500/20 border border-amber-500/40 p-2 text-center hover:bg-amber-500/30 transition-all active:scale-95"
                  >
                    <span className="text-lg block">{card.icon}</span>
                    <span className="text-[0.7rem] font-black text-amber-300 block truncate">
                      {card.name}
                    </span>
                    <span className="text-[0.58rem] text-slate-400 block line-clamp-1">
                      {card.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PhoneShell>
  )
}
