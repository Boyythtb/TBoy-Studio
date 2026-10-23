import { BOARD, cellKey, shipAt, type Fleet, type ShotResult } from '../game/battle'

interface Props {
  shots?: Record<string, ShotResult>
  fleet?: Fleet | null
  onCell?: (x: number, y: number) => void
  accent?: string
  dimShips?: boolean
}

export function BattleGrid({ shots, fleet, onCell, accent = '#7be0c0', dimShips = false }: Props) {
  return (
    <div className="grid grid-cols-8 gap-1">
      {Array.from({ length: BOARD }, (_, y) =>
        Array.from({ length: BOARD }, (_, x) => {
          const k = cellKey({ x, y })
          const shot = shots?.[k]
          const onShip = fleet ? shipAt(fleet, x, y) >= 0 : false
          const sunk = onShip && fleet ? fleet.ships[shipAt(fleet, x, y)].cells.every((c) => shots?.[cellKey(c)] === 'hit') : false

          let style: React.CSSProperties | undefined
          let content: React.ReactNode = null
          if (shot === 'hit') {
            style = { background: sunk ? 'rgba(224,67,58,0.55)' : 'rgba(224,67,58,0.32)', borderColor: 'rgba(255,106,92,0.65)' }
            content = <span className="text-[0.55rem] text-blood-soft">✕</span>
          } else if (shot === 'miss') {
            style = { background: 'rgba(255,255,255,0.03)' }
            content = <span className="h-1 w-1 rounded-full bg-white/20" />
          } else if (shot === 'pending') {
            style = { borderColor: `${accent}99`, background: `${accent}18` }
            content = <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: accent }} />
          } else if (onShip) {
            style = {
              background: dimShips ? 'rgba(123,224,192,0.12)' : 'rgba(123,224,192,0.22)',
              borderColor: 'rgba(123,224,192,0.35)',
            }
          }

          const clickable = Boolean(onCell)
          return (
            <button
              key={k}
              type="button"
              onClick={onCell ? () => onCell(x, y) : undefined}
              disabled={!clickable || Boolean(shot)}
              className={`grid aspect-square place-items-center rounded-[5px] border border-white/8 transition ${
                clickable && !shot ? 'hover:border-white/25 hover:bg-white/[0.07]' : ''
              } disabled:cursor-default`}
              style={style}
              aria-label={`ô ${x + 1},${y + 1}`}
            >
              {content}
            </button>
          )
        }),
      )}
    </div>
  )
}
