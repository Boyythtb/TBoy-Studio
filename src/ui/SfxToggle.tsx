import { useState } from 'react'
import { sfx, sfxEnabled, setSfxEnabled } from '../lib/sfx'

export function SfxToggle() {
  const [on, setOn] = useState(sfxEnabled())
  return (
    <button
      type="button"
      onClick={() => {
        const next = !on
        setSfxEnabled(next)
        setOn(next)
        if (next) sfx.tap()
      }}
      className="btn btn-ghost btn-sm"
      aria-label={on ? 'Tắt âm thanh' : 'Bật âm thanh'}
    >
      {on ? '🔊' : '🔇'}
    </button>
  )
}
