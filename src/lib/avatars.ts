export const AVATARS = [
  { emoji: '🐺', from: '#7d6dff', to: '#3b2f8f' },
  { emoji: '🦊', from: '#ff9d5c', to: '#a63d1a' },
  { emoji: '🦉', from: '#8eb4ff', to: '#2b4a8f' },
  { emoji: '🐍', from: '#7be0c0', to: '#1f6b58' },
  { emoji: '🦌', from: '#f0b44e', to: '#8a5a12' },
  { emoji: '🐗', from: '#d98a6a', to: '#6b3520' },
  { emoji: '🦇', from: '#a99cff', to: '#3a2b6b' },
  { emoji: '🐈‍⬛', from: '#9aa2c7', to: '#2a2d42' },
  { emoji: '🦅', from: '#ffd479', to: '#8a6414' },
  { emoji: '🐢', from: '#8fd694', to: '#2c6b38' },
  { emoji: '🐙', from: '#ff8fb1', to: '#8a2b4f' },
  { emoji: '🦂', from: '#ff6a5c', to: '#7a1f18' },
  { emoji: '🐸', from: '#a8e06a', to: '#3d6b1a' },
  { emoji: '🦝', from: '#c7c3d9', to: '#4a4560' },
  { emoji: '🕷️', from: '#b9a6ff', to: '#37245f' },
  { emoji: '🐇', from: '#ffc9de', to: '#8a3a5c' },
] as const

export function avatarOf(index: number) {
  const i = Number.isFinite(index) ? Math.trunc(index) : 0
  return AVATARS[((i % AVATARS.length) + AVATARS.length) % AVATARS.length]
}
