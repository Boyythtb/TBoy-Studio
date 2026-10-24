import { lazy, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { store, paths } from '../lib/store'
import type { GameId, Meta } from '../game/types'
import { useTitle } from '../lib/useTitle'

const PlayerScreen = lazy(() => import('./Player'))
const SecretCodePlayer = lazy(() => import('./SecretCodePlayer'))
const BattlePlayer = lazy(() => import('./BattlePlayer'))
const TruthOrDarePlayer = lazy(() => import('./TruthOrDarePlayer'))

export default function PlayGate() {
  const { code = '' } = useParams()
  const [game, setGame] = useState<GameId | null>(null)
  const [missing, setMissing] = useState(false)

  useTitle(
    game === 'truth-or-dare'
      ? 'Sự thật & Thử thách 18+ · TBOY Studio'
      : game === 'secret-code'
        ? 'Mật mã · TBOY Studio'
        : game === 'sea-battle'
          ? 'Hải chiến · TBOY Studio'
          : game === 'ma-soi'
            ? 'Ma Sói · TBOY Studio'
            : 'TBOY Studio',
  )

  useEffect(() => {
    if (!code) return
    let timer: ReturnType<typeof setTimeout> | null = null
    const unsub = store.sub<Meta>(paths.meta(code), (meta) => {
      if (meta) {
        setGame((meta.game as GameId) ?? 'ma-soi')
        setMissing(false)
      } else if (!timer) {
        timer = setTimeout(() => setMissing(true), 5000)
      }
    })
    return () => {
      unsub()
      if (timer) clearTimeout(timer)
    }
  }, [code])

  if (missing) {
    return (
      <div className="stage grid min-h-dvh place-items-center px-6 text-center">
        <div>
          <p className="display text-2xl text-parchment/85">Không tìm thấy phòng</p>
          <p className="mt-2 text-sm text-mute">Mã phòng không tồn tại hoặc đã kết thúc.</p>
          <Link to="/" className="btn btn-primary btn-md mt-6">
            Về trang chủ
          </Link>
        </div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="stage grid min-h-dvh place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-violet" />
      </div>
    )
  }

  if (game === 'truth-or-dare') return <TruthOrDarePlayer />
  if (game === 'secret-code') return <SecretCodePlayer />
  if (game === 'sea-battle') return <BattlePlayer />
  return <PlayerScreen />
}
