import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar } from '../ui/Avatar'
import { Timer } from '../ui/Timer'
import { JoinForm, LobbyWait, PhoneShell } from '../ui/PhoneJoin'
import { buzz } from '../lib/buzz'
import { useGameRoom } from '../hooks/useGameRoom'
import { paths, store } from '../lib/store'
import { playerOrder, randomCode, type ScKey, type ScState } from '../game/secret'


export default function SecretCodePlayer() {
  const { code = '' } = useParams()
  const room = useGameRoom(code)
  const { uid, meta, players, loading } = room
  const [state, setState] = useState<ScState | null>(null)
  const [myKey, setMyKey] = useState<ScKey | null>(null)
  const [draft, setDraft] = useState('')
  const [target, setTarget] = useState<string | null>(null)
  const [guess, setGuess] = useState('')
  const [sentTurn, setSentTurn] = useState<string | null>(null)

  useEffect(() => {
    if (!code) return
    const unsubs = [
      store.sub<ScState>(paths.sc(code), (v) => setState(v)),
      store.sub<Record<string, ScKey>>(paths.scKeys(code), (v) => {
        // in local mode we may read all; in cloud only our own node is permitted
        if (v && uid && v[uid]) setMyKey(v[uid])
      }),
    ]
    return () => unsubs.forEach((fn) => fn())
  }, [code, uid])

  const order = useMemo(() => playerOrder(players), [players])
  const me = uid ? players[uid] : null
  const myTurn = Boolean(state && state.turn === uid && state.phase === 'play')
  const scores = state?.scores ?? {}
  const turnKey = state ? `${state.turn ?? ''}-${state.turnEndsAt}` : ''
  const sent = sentTurn !== null && sentTurn === turnKey

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

  if (!me) {
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
          icon="🔐"
          text="Chờ chủ phòng bắt đầu. Mỗi người sẽ giấu một mật mã 3 số."
        />
      </PhoneShell>
    )
  }

  /* ----------------------------------------------------------------- setup */
  if (state.phase === 'setup') {
    const saved = Boolean(myKey?.code)
    const save = async () => {
      const clean = draft.replace(/\D/g, '').slice(0, 3)
      if (clean.length !== 3) return
      buzz(20)
      await store.set(paths.scKey(code, uid!), { code: clean, at: Date.now() })
    }
    return (
      <PhoneShell code={code}>
        <div className="flex flex-1 flex-col justify-center pb-8">
          <p className="eyebrow mb-3">Chuẩn bị</p>
          <h1 className="display text-3xl text-parchment">Mật mã của bạn</h1>
          <p className="mt-2 text-sm leading-relaxed text-mute">
            3 chữ số, giữ kín. Người khác sẽ đoán — bạn cũng sẽ đoán mã của họ.
          </p>

          {saved ? (
            <div className="mt-7 rounded-3xl border border-[#7be0c0]/30 bg-[#7be0c0]/8 p-6 text-center">
              <p className="text-[0.62rem] tracking-[0.22em] text-mute uppercase">Đã đặt</p>
              <p className="mt-3 font-mono text-4xl tracking-[0.35em] text-parchment/90">{myKey?.code}</p>
              <p className="mt-3 text-[0.68rem] text-[#7be0c0]">Sẵn sàng. Chờ những người còn lại.</p>
            </div>
          ) : (
            <>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value.replace(/\D/g, '').slice(0, 3))}
                inputMode="numeric"
                placeholder="000"
                className="field mt-7 text-center font-mono text-3xl tracking-[0.4em]"
                autoFocus
              />
              <div className="mt-3 flex gap-2">
                <button
                  className="btn btn-ghost btn-md flex-1"
                  onClick={() => setDraft(randomCode())}
                >
                  Ngẫu nhiên
                </button>
                <button className="btn btn-primary btn-md flex-[1.3]" disabled={draft.length !== 3} onClick={save}>
                  Xác nhận
                </button>
              </div>
            </>
          )}

          <div className="mt-8 space-y-1.5">
            {order.map((id) => {
              const p = players[id]
              return (
                <div key={id} className="flex items-center gap-2 text-[0.7rem] text-mute">
                  <Avatar index={p.avatar} size={22} name={p.name} />
                  <span>{p.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </PhoneShell>
    )
  }

  /* ------------------------------------------------------------------ play */
  if (state.phase === 'play') {
    if (myTurn && !sent) {
      const targets = order.filter((id) => id !== uid)
      const submit = async () => {
        if (!target || guess.length !== 3) return
        buzz(30)
        setSentTurn(turnKey)
        await store.set(paths.scGuess(code, uid!), { target, guess, at: Date.now() })
      }
      return (
        <PhoneShell code={code}>
          <div className="flex flex-1 flex-col pb-4">
            <div className="flex items-start justify-between gap-3 pt-4">
              <div>
                <p className="eyebrow mb-2">Đến lượt bạn</p>
                <h1 className="display text-3xl text-[#7be0c0]">Đoán mật mã</h1>
              </div>
              <Timer endsAt={state.turnEndsAt} total={state.turnSeconds * 1000} size={54} tone="moon" />
            </div>

            <p className="mt-4 text-[0.62rem] tracking-[0.2em] text-mute uppercase">Chọn người</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {targets.map((id) => {
                const p = players[id]
                const active = target === id
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setTarget(id)
                      buzz(10)
                    }}
                    className={`flex flex-col items-center rounded-2xl border px-1.5 py-3 transition ${
                      active ? 'border-[#7be0c0]/60 bg-[#7be0c0]/12' : 'border-white/8 bg-white/[0.03]'
                    }`}
                  >
                    <Avatar index={p.avatar} size={44} name={p.name} ring={active} />
                    <span className="mt-2 w-full truncate text-[0.68rem] text-parchment/80">{p.name}</span>
                    <span className="text-[0.58rem] text-mute">{scores[id] ?? 0} điểm</span>
                  </button>
                )
              })}
            </div>

            <p className="mt-5 text-[0.62rem] tracking-[0.2em] text-mute uppercase">Mật mã dự đoán</p>
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value.replace(/\D/g, '').slice(0, 3))}
              inputMode="numeric"
              placeholder="000"
              className="field mt-2 text-center font-mono text-3xl tracking-[0.4em]"
            />

            <button className="btn btn-primary btn-lg mt-5 w-full" disabled={!target || guess.length !== 3} onClick={submit}>
              Gửi dự đoán
            </button>
            <p className="mt-3 text-center text-[0.65rem] text-mute">Mẹo: dùng lịch sử trên màn hình chung để loại trừ.</p>
          </div>
        </PhoneShell>
      )
    }

    const last = state.last
    return (
      <PhoneShell code={code}>
        <div className="flex flex-1 flex-col pb-6">
          <div className="pt-4">
            <p className="eyebrow mb-2">{myTurn ? 'Đã gửi' : 'Chờ lượt'}</p>
            <h1 className="display text-3xl text-parchment">
              {myTurn ? 'Chờ kết quả…' : `${players[state.turn ?? '']?.name ?? 'Ai đó'} đang đoán`}
            </h1>
            {!myTurn && state.turnEndsAt > 0 && (
              <div className="mt-5">
                <Timer endsAt={state.turnEndsAt} total={state.turnSeconds * 1000} size={84} tone="moon" label="lượt" />
              </div>
            )}
          </div>

          {last && (
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <p className="text-[0.6rem] tracking-[0.2em] text-mute uppercase">Lượt gần nhất</p>
              <p className="mt-2 text-sm text-parchment/70">
                {players[last.by]?.name} đoán mã của {players[last.target]?.name}
              </p>
              <p className="mt-3 font-mono text-2xl tracking-[0.3em] text-parchment/85">{last.guess}</p>
              <p className="mt-2 text-[0.72rem]">
                <span className="text-[#7be0c0]">{last.bulls} đúng vị trí</span>
                <span className="text-mute"> · </span>
                <span className="text-amber">{last.cows} sai vị trí</span>
              </p>
            </div>
          )}

          <p className="mt-6 text-[0.62rem] tracking-[0.2em] text-mute uppercase">Bảng điểm</p>
          <div className="mt-2 space-y-1.5">
            {order.map((id) => {
              const p = players[id]
              return (
                <div key={id} className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] px-3 py-2">
                  <Avatar index={p.avatar} size={26} name={p.name} />
                  <span className="flex-1 text-[0.76rem] text-parchment/80">
                    {p.name}
                    {id === uid && <span className="text-mute"> (bạn)</span>}
                  </span>
                  <span className="text-[0.72rem] text-mute">{scores[id] ?? 0}</span>
                </div>
              )
            })}
          </div>

          {myKey?.code && (
            <p className="mt-6 text-center text-[0.62rem] text-mute">
              Mã của bạn: <span className="font-mono tracking-[0.3em] text-parchment/70">{myKey.code}</span>
            </p>
          )}
        </div>
      </PhoneShell>
    )
  }

  /* ------------------------------------------------------------------- over */
  const won = state.winner === uid
  return (
    <PhoneShell code={code}>
      <div className="flex flex-1 flex-col items-center justify-center pb-8 text-center">
        <p className="eyebrow mb-3">Kết thúc</p>
        <div className="text-5xl">{won ? '👑' : '🔐'}</div>
        <h1 className="display mt-4 text-3xl">
          <span className={won ? 'grad-moon' : 'text-parchment/85'}>
            {won ? 'Bạn thắng!' : `${players[state.winner ?? '']?.name ?? 'Ai đó'} thắng`}
          </span>
        </h1>
        <p className="mt-2 text-sm text-mute">
          {won ? `Bạn đã phá ${state.targetScore} mật mã.` : 'Nhìn lên màn hình chung để xem bảng điểm.'}
        </p>
        <div className="mt-7 w-full space-y-1.5">
          {order.map((id) => (
            <div key={id} className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] px-3 py-2">
              <Avatar index={players[id].avatar} size={26} name={players[id].name} />
              <span className="flex-1 text-left text-[0.76rem] text-parchment/80">{players[id].name}</span>
              <span className="text-[0.72rem] text-mute">{scores[id] ?? 0}</span>
            </div>
          ))}
        </div>
        <Link to="/" className="btn btn-ghost btn-md mt-7">
          Trang chủ
        </Link>
      </div>
    </PhoneShell>
  )
}
