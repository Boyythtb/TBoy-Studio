// Tạo ảnh dự phòng bằng Pollinations (không cần API key).
// Dùng khi Gemini/Nano Banana hết quota.
//
//   node scripts/pollinations.mjs --all
//   node scripts/pollinations.mjs hien-truong
//   node scripts/pollinations.mjs hien-truong --width 1024 --height 768 --seed 7
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { PRESETS } from './art-prompts.mjs'

const argv = process.argv.slice(2)
const flag = (name, fallback) => {
  const i = argv.indexOf(name)
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback
}

const ids = argv.includes('--all') ? Object.keys(PRESETS) : argv.filter((a) => PRESETS[a])
if (!ids.length) {
  console.log('Dùng: node scripts/pollinations.mjs --all | <preset>')
  console.log('Preset:', Object.keys(PRESETS).join(', '))
  process.exit(0)
}

const width = Number(flag('--width', 1024))
const height = Number(flag('--height', 768))
const model = flag('--model', 'flux')
const seed = flag('--seed', '42')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

for (const id of ids) {
  const preset = PRESETS[id]
  const [w, h] = preset.ratio === '16:9' ? [1280, 720] : [width, height]
  const url =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(preset.prompt)}` +
    `?width=${w}&height=${h}&model=${model}&nologo=true&seed=${seed}&enhance=false`

  let saved = false
  for (let attempt = 1; attempt <= 3 && !saved; attempt++) {
    try {
      console.log(`… ${id} (${attempt}/3)`)
      const res = await fetch(url, { headers: { accept: 'image/*' } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const type = res.headers.get('content-type') || ''
      if (!type.startsWith('image/')) throw new Error(`content-type: ${type}`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length < 10_000) throw new Error(`ảnh quá nhỏ (${buf.length} bytes)`)
      const ext = type.includes('png') ? '.png' : type.includes('webp') ? '.webp' : '.jpg'
      const out = preset.out.replace(/\.(png|jpe?g|webp)$/i, ext)
      await mkdir(dirname(out), { recursive: true })
      await writeFile(out, buf)
      console.log(`✓ ${out} (${(buf.length / 1024).toFixed(0)} kB, ${type})`)
      saved = true
    } catch (error) {
      console.log(`  lỗi: ${error.message}`)
      if (attempt < 3) await sleep(5000)
    }
  }
  if (!saved) console.log(`✗ ${id}: không tạo được`)
  await sleep(2000)
}
