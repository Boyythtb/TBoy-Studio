// Web Audio API Synthesizer for macOS Thám Tử Game
let audioCtx: AudioContext | null = null

function getAudioCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    void audioCtx.resume()
  }
  return audioCtx
}

export const MacSound = {
  /** Tiếng click nhẹ chuẩn macOS khi mở app / chọn tab */
  click() {
    const ctx = getAudioCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(600, now)
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.04)

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

    osc.connect(gain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.04)
  },

  /** Tiếng ting ting thông báo tin nhắn Zola / tin mới */
  zolaPing() {
    const ctx = getAudioCtx()
    if (!ctx) return
    const now = ctx.currentTime

    // Tone 1
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(659.25, now) // E5
    gain1.gain.setValueAtTime(0.1, now)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
    osc1.connect(gain1).connect(ctx.destination)
    osc1.start(now)
    osc1.stop(now + 0.18)

    // Tone 2
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(880, now + 0.09) // A5
    gain2.gain.setValueAtTime(0.12, now + 0.09)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
    osc2.connect(gain2).connect(ctx.destination)
    osc2.start(now + 0.09)
    osc2.stop(now + 0.35)
  },

  /** Tiếng ghim manh mối vào sổ vụ án */
  pinClue() {
    const ctx = getAudioCtx()
    if (!ctx) return
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(980, now)
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06)

    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)

    osc.connect(gain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.09)
  },

  /** Tiếng đối chất bẻ gãy alibi thành công (Triumphant chord) */
  confrontSuccess() {
    const ctx = getAudioCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const chord = [523.25, 659.25, 783.99, 1046.5] // C Major arpeggio

    chord.forEach((freq, idx) => {
      const t = now + idx * 0.08
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, t)
      gain.gain.setValueAtTime(0.09, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45)
      osc.connect(gain).connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.45)
    })
  },

  /** Tiếng đối chất thất bại / phản bác */
  confrontFail() {
    const ctx = getAudioCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(160, now)
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.25)
    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
    osc.connect(gain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.25)
  },
}
