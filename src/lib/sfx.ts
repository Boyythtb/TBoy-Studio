let ctx: AudioContext | null = null
let enabled = localStorage.getItem('masoi.sfx') !== 'off'

function getCtx() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

export function sfxEnabled() {
  return enabled
}

export function setSfxEnabled(value: boolean) {
  enabled = value
  localStorage.setItem('masoi.sfx', value ? 'on' : 'off')
}

type ToneOpts = {
  freq: number
  to?: number
  dur?: number
  type?: OscillatorType
  gain?: number
  delay?: number
}

function tone({ freq, to, dur = 0.18, type = 'sine', gain = 0.12, delay = 0 }: ToneOpts) {
  if (!enabled) return
  const ac = getCtx()
  if (!ac) return
  const t0 = ac.currentTime + delay
  const osc = ac.createOscillator()
  const amp = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (to) osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), t0 + dur)
  amp.gain.setValueAtTime(0.0001, t0)
  amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.02)
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(amp).connect(ac.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.02)
}

export const sfx = {
  tap() {
    tone({ freq: 520, to: 420, dur: 0.07, type: 'triangle', gain: 0.06 })
  },
  join() {
    tone({ freq: 440, dur: 0.1, type: 'sine', gain: 0.07 })
    tone({ freq: 660, dur: 0.14, type: 'sine', gain: 0.06, delay: 0.08 })
  },
  reveal() {
    tone({ freq: 220, to: 660, dur: 0.5, type: 'sine', gain: 0.1 })
    tone({ freq: 330, to: 990, dur: 0.6, type: 'sine', gain: 0.05, delay: 0.05 })
  },
  night() {
    tone({ freq: 160, to: 90, dur: 1.4, type: 'sine', gain: 0.09 })
    tone({ freq: 240, to: 120, dur: 1.6, type: 'triangle', gain: 0.04, delay: 0.1 })
  },
  death() {
    tone({ freq: 180, to: 60, dur: 0.9, type: 'sawtooth', gain: 0.07 })
  },
  vote() {
    tone({ freq: 700, to: 900, dur: 0.08, type: 'square', gain: 0.04 })
  },
  win() {
    ;[523, 659, 784, 1046].forEach((f, i) =>
      tone({ freq: f, dur: 0.32, type: 'sine', gain: 0.07, delay: i * 0.11 }),
    )
  },
}
