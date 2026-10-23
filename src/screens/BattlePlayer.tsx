import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Timer } from '../ui/Timer'
import { BattleGrid } from '../ui/BattleGrid'
import { JoinForm, LobbyWait, PhoneShell } from '../ui/PhoneJoin'
import { buzz } from '../lib/buzz'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import {
  BOARD,
  SB_TURN_SECONDS,
  SHIP_SIZES,
  cellKey,
  countHits,
  opponentOf,
  playerOrder,
  type Cell,
  type Fleet,
  type SbState,
} from '../game/battle'

export default function BattlePlayer() {
  const { code = '' } = useParams()
  const room = useGameRoom(code)
  const { uid, meta, players, loading } = room
  const [state, setState] = useState<SbState | null>(null)
  const [myFleet, setMyFleet] = useState<Fleet | null>(null)
  const [placed, setPlaced] = useState<Cell[][]>([])
  const [orientation, setOrientation] = useState<'h' | 'v'>('h')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!code) return
    const unsubs = [store.sub<SbState>(paths.sb(code), (v) => setState(v))]
    if (uid) unsubs.push(store.sub<Fleet>(paths.sbKey(code, uid), (v) => setMyFleet(v ?? null)))
    return () => unsubs.forEach((fn) => fn())
  }, [code, uid])

  const order = useMemo(() => playerOrder(players), [players])
  const me = uid ? players[uid] : null
  const enemy = uid ? opponentOf(order, uid) : null
  const myShots = (uid && state?.shots?.[uid]) || {}
  const incoming = (enemy && state?.shots?.[enemy]) || {}
  const isMyTurn = Boolean(state?.phase === 'battle' && state.turn === uid)
  const myKeySaved = Boolean(myFleet?.ships?.length)

  if (loading) {
    return (
      <PhoneShell code={code}>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-[#7be0c0]" />
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

  if (!me || !uid) {
    return (
      <PhoneShell code={code}>
        <JoinForm code={code} onJoined={() => undefined} />
      </PhoneShell>
    )
  }

  if (!state) {
    return (
      <PhoneShell code={code}>
        <LobbyWait
          code={code}
          players={order.map((id) => players[id])}
          me={me}
          icon="🚢"
          text="Chờ đối thủ vào phòng. Trận hải chiến cần đúng 2 người."
        />
      </PhoneShell>
    )
  }

  /* --------------------------------------------------------------- placement */
  if (state.phase === 'place') {
    const nextSize = SHIP_SIZES[placed.length]
    const donePlacing = placed.length >= SHIP_SIZES.length

    const place = (x: number, y: number) => {
      if (donePlacing) return
      const cells: Cell[] = Array.from({ length: nextSize }, (_, i) =>
        orientation === 'h' ? { x: x + i, y } : { x, y: y + i },
      )
      if (cells.some((c) => c.x >= BOARD || c.y >= BOARD)) {
        setNotice('Tàu vượt ra ngoài bờ biển.')
        return
      }
      const taken = new Set(placed.flat().map(cellKey))
      if (cells.some((c) => taken.has(cellKey(c)))) {
        setNotice('Chỗ này đã có tàu rồi.')
        return
      }
      setNotice('')
      buzz(12)
      setPlaced((prev) => [...prev, cells])
    }

    const save = async () => {
      buzz(24)
      await store.set(paths.sbKey(code, uid), { ships: placed.map((cells) => ({ cells })) })
    }

    if (myKeySaved && state.ready?.[uid] !== false) {
      const savedFleet = myFleet!
      return (
        <PhoneShell code={code}>
          <div className="flex flex-1 flex-col justify-center pb-8">
            <p className="eyebrow mb-3">Sẵn sàng</p>
            <h1 className="display text-3xl text-parchment">Hạm đội đã ra khơi</h1>
            <p className="mt-2 text-sm text-mute">
              {state.ready?.[enemy ?? ''] ? 'Đối thủ cũng đã sẵn sàng. Trận đấu bắt đầu…' : 'Đang chờ đối thủ đặt tàu.'}
            </p>
            <div className="mt-6 rounded-3xl border border-white/8 bg-white/[0.03] p-3">
              <BattleGrid fleet={savedFleet} accent="#7be0c0" />
            </div>
            <button
              className="btn btn-ghost btn-md mt-5 w-full"
              onClick={() => {
                setPlaced([])
                setNotice('')
                void store.remove(paths.sbKey(code, uid))
              }}
            >
              Đặt lại hạm đội
            </button>
          </div>
        </PhoneShell>
      )
    }

    return (
      <PhoneShell code={code}>
        <div className="flex flex-1 flex-col pb-4">
          <div className="pt-3">
            <p className="eyebrow mb-2">Bố trí</p>
            <h1 className="display text-2xl text-parchment">
              {donePlacing ? 'Đặt tàu xong' : `Đặt tàu ${nextSize} ô`}
            </h1>
            <p className="mt-1 text-[0.7rem] text-mute">
              {donePlacing ? 'Kiểm tra lại rồi xác nhận.' : 'Chạm vào ô để đặt. Đổi hướng nếu cần.'}
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-2">
            <BattleGrid
              fleet={{ ships: placed.map((cells) => ({ cells })) }}
              onCell={donePlacing ? undefined : place}
              accent="#7be0c0"
            />
          </div>

          <div className="mt-3 flex gap-2">
            <button
              className="btn btn-ghost btn-sm flex-1"
              disabled={donePlacing}
              onClick={() => setOrientation((o) => (o === 'h' ? 'v' : 'h'))}
            >
              {orientation === 'h' ? '↔ Ngang' : '↕ Dọc'}
            </button>
            <button
              className="btn btn-ghost btn-sm flex-1"
              disabled={!placed.length}
              onClick={() => {
                setPlaced((prev) => prev.slice(0, -1))
                setNotice('')
              }}
            >
              Hoàn tác
            </button>
            <button
              className="btn btn-ghost btn-sm flex-1"
              onClick={() => {
                setPlaced([])
                setNotice('')
              }}
            >
              Xoá hết
            </button>
          </div>

          {notice && <p className="mt-2 text-center text-[0.68rem] text-amber">{notice}</p>}

          <button className="btn btn-primary btn-lg mt-4 w-full" disabled={!donePlacing} onClick={() => void save()}>
            Xác nhận hạm đội
          </button>
          <p className="mt-3 text-center text-[0.62rem] text-mute">
            Đối thủ: {enemy ? players[enemy]?.name : 'đang chờ'} · {countHits(myShots)} trúng
          </p>
        </div>
      </PhoneShell>
    )
  }

  /* ------------------------------------------------------------------ battle */
  if (state.phase === 'battle') {
    const fire = (x: number, y: number) => {
      if (!isMyTurn) return
      const k = cellKey({ x, y })
      if (myShots[k]) return
      if (Object.values(myShots).includes('pending')) return
      buzz(18)
      void store.update(paths.sbShots(code, uid), { [k]: 'pending' })
    }

    return (
      <PhoneShell code={code}>
        <div className="flex flex-1 flex-col pb-5">
          <div className="flex items-start justify-between gap-3 pt-3">
            <div>
              <p className="eyebrow mb-2">{isMyTurn ? 'Lượt của bạn' : 'Chờ đối thủ'}</p>
              <h1 className="display text-2xl" style={{ color: isMyTurn ? '#7be0c0' : '#cbc4e0' }}>
                {isMyTurn ? 'Bắn!' : `${players[state.turn ?? '']?.name ?? 'Đối thủ'} đang bắn`}
              </h1>
            </div>
            {state.turnEndsAt > 0 && (
              <Timer endsAt={state.turnEndsAt} total={SB_TURN_SECONDS * 1000} size={48} tone="moon" />
            )}
          </div>

          <p className="mt-4 text-[0.62rem] tracking-[0.2em] text-mute uppercase">Vùng biển địch</p>
          <div
            className="mt-2 rounded-2xl border p-2"
            style={{ borderColor: isMyTurn ? 'rgba(123,224,192,0.35)' : 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
          >
            <BattleGrid shots={myShots} onCell={isMyTurn ? fire : undefined} accent="#7be0c0" />
          </div>

          <p className="mt-4 text-[0.62rem] tracking-[0.2em] text-mute uppercase">Hạm đội của bạn</p>
          <div className="mt-2 rounded-2xl border border-white/8 bg-white/[0.03] p-2">
            <BattleGrid fleet={myFleet} shots={incoming} dimShips accent="#ffc861" />
          </div>

          {state.last && (
            <p className="mt-4 text-center text-[0.68rem] text-mute">
              {players[state.last.by]?.name} bắn {state.last.x + 1}·{state.last.y + 1} —{' '}
              <span className={state.last.hit ? 'text-blood-soft' : 'text-mute'}>{state.last.hit ? 'trúng' : 'trượt'}</span>
              {state.last.sunk && <span className="text-amber"> · chìm tàu!</span>}
            </p>
          )}
        </div>
      </PhoneShell>
    )
  }

  /* --------------------------------------------------------------------- over */
  const won = state.winner === uid
  return (
    <PhoneShell code={code}>
      <div className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
        <p className="eyebrow mb-3">Kết thúc</p>
        <div className="text-5xl">{won ? '🏆' : '🌊'}</div>
        <h1 className="display mt-4 text-3xl">
          <span className={won ? 'grad-moon' : 'text-parchment/85'}>{won ? 'Bạn thắng!' : 'Bạn thua'}</span>
        </h1>
        <p className="mt-2 text-sm text-mute">
          {won ? 'Hạm đội địch đã chìm toàn bộ.' : `${players[state.winner ?? '']?.name ?? 'Đối thủ'} đã đánh chìm hạm đội của bạn.`}
        </p>

        <div className="mt-7 w-full">
          <p className="mb-2 text-[0.62rem] tracking-[0.2em] text-mute uppercase">Hạm đội của bạn</p>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-2">
            <BattleGrid fleet={myFleet} shots={incoming} dimShips accent="#ffc861" />
          </div>
        </div>

        <p className="mt-6 text-[0.68rem] text-mute">Nhìn lên màn hình chung để xem lại toàn bộ trận đấu.</p>
        <Link to="/" className="btn btn-ghost btn-md mt-5">
          Trang chủ
        </Link>
      </div>
    </PhoneShell>
  )
}
