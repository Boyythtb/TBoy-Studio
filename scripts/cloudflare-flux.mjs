// Tạo ảnh bằng Cloudflare Workers AI (FLUX.1 schnell) — free ~10k neurons/ngày.
// Chạy: npm run art:cf -- --all
//       npm run art:cf -- hien-truong
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { PRESETS } from './art-prompts.mjs'

const ROOT = resolve(import.meta.dirname, '..')
const ENV_FILE = resolve(ROOT, '.env.local')
const MODEL = '@cf/black-forest-labs/flux-1-schnell'

async function readEnv() {
  try {
    const raw = await readFile(ENV_FILE, 'utf8')
    const out = {}
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
    return out
  } catch {
    return {}
  }
}

const env = await readEnv()
const token = process.env.CLOUDFLARE_API_TOKEN || env.CLOUDFLARE_API_TOKEN
const account =
  process.env.CLOUDFLARE_ACCOUNT_ID || env.CLOUDFLARE_ACCOUNT_ID || 'bdb6b3ddf31824b1ab1738d1e533caf1'

const argv = process.argv.slice(2)
const flag = (name, fallback) => {
  const i = argv.indexOf(name)
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback
}
const ids = argv.includes('--all') ? Object.keys(PRESETS) : argv.filter((a) => PRESETS[a])
const steps = Number(flag('--steps', 4))

if (!ids.length) {
  console.log('Dùng: npm run art:cf -- --all | <preset>')
  console.log('Preset:', Object.keys(PRESETS).join(', '))
  process.exit(0)
}

if (!token) {
  console.log('Thiếu CLOUDFLARE_API_TOKEN.')
  console.log('1. https://dash.cloudflare.com/profile/api-tokens → Create Token')
  console.log('2. Quyền: Account → Workers AI → Read')
  console.log('3. Thêm vào .env.local: CLOUDFLARE_API_TOKEN=...')
  process.exit(1)
}

const url = `https://api.cloudflare.com/client/v4/accounts/${account}/ai/run/${MODEL}`

for (const id of ids) {
  const preset = PRESETS[id]
  const [width, height] = preset.ratio === '16:9' ? [1280, 720] : [1024, 768]
  console.log(`… ${id} (${width}×${height}, steps ${steps})`)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: preset.prompt, steps }),
    })

    const type = res.headers.get('content-type') || ''
    if (!res.ok) {
      const detail = type.includes('json') ? JSON.stringify(await res.json()) : await res.text()
      if (res.status === 401 || res.status === 403) {
        console.log('  Token không có quyền Workers AI. Tạo token với quyền Account → Workers AI → Read.')
      } else if (res.status === 429) {
        console.log('  Hết quota miễn phí hôm nay của Workers AI. Thử lại sau.')
      } else {
        console.log(`  HTTP ${res.status}: ${detail.slice(0, 400)}`)
      }
      continue
    }

    let buf
    if (type.includes('application/json')) {
      const json = await res.json()
      if (!json.success) {
        console.log('  API lỗi:', JSON.stringify(json.errors ?? json).slice(0, 400))
        continue
      }
      const b64 = json.result?.image
      if (!b64) {
        console.log('  Không thấy result.image trong phản hồi.')
        continue
      }
      buf = Buffer.from(b64, 'base64')
    } else {
      buf = Buffer.from(await res.arrayBuffer())
    }

    if (buf.length < 10_000) {
      console.log(`  Ảnh quá nhỏ (${buf.length} bytes), bỏ qua.`)
      continue
    }

    const out = preset.out.replace(/\.(png|jpe?g|webp)$/i, '.jpg')
    await mkdir(dirname(resolve(ROOT, out)), { recursive: true })
    await writeFile(resolve(ROOT, out), buf)
    console.log(`✓ ${id} → ${out} (${(buf.length / 1024).toFixed(0)} kB)`)
  } catch (e) {
    console.log(`  Lỗi mạng: ${e.message}`)
  }
}
