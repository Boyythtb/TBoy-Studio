#!/usr/bin/env node
// Nano Banana — tạo ảnh cho game bằng Gemini 2.5 Flash Image.
//
//   npm run art                      -> liệt kê preset
//   npm run art -- hien-truong       -> tạo theo preset
//   npm run art -- --prompt "..." --out public/detective/x.png
//   npm run art -- hien-truong --ref public/detective/base.png   -> sửa ảnh (giữ nhất quán)
//
// Cần GEMINI_API_KEY trong .env.local (lấy tại https://aistudio.google.com/apikey).
// Ảnh tạo ra nằm trong public/detective/ và nên commit vào repo.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import { PRESETS } from './art-prompts.mjs'

const ROOT = resolve(import.meta.dirname, '..')

function loadEnv(file) {
  const path = resolve(ROOT, file)
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (!m) continue
    const value = m[2].replace(/^["']|["']$/g, '')
    if (!process.env[m[1]]) process.env[m[1]] = value
  }
}

loadEnv('.env.local')
loadEnv('.env')

const argv = process.argv.slice(2)
const flags = {}
const rest = []
for (let i = 0; i < argv.length; i++) {
  const arg = argv[i]
  if (!arg.startsWith('--')) {
    rest.push(arg)
    continue
  }
  const key = arg.slice(2)
  const next = argv[i + 1]
  if (next && !next.startsWith('--')) {
    flags[key] = next
    i++
  } else {
    flags[key] = true
  }
}

const presetName = rest[0]
const preset = presetName ? PRESETS[presetName] : undefined

if (!presetName && !flags.prompt) {
  console.log('Preset có sẵn:')
  for (const [name, p] of Object.entries(PRESETS)) console.log(`  ${name.padEnd(14)} -> ${p.out}`)
  console.log('\nVí dụ: npm run art -- hien-truong')
  console.log('Hoặc : npm run art -- --prompt "mo ta" --out public/detective/x.png')
  process.exit(0)
}

const prompt = flags.prompt ?? preset?.prompt
if (!prompt || typeof prompt !== 'string') {
  console.error(`Không tìm thấy preset "${presetName}".`)
  process.exit(1)
}

const outPath = resolve(ROOT, flags.out ?? preset?.out ?? `public/detective/${presetName || 'art'}.png`)
const ratio = flags.ratio ?? preset?.ratio
const refPath = flags.ref ?? preset?.ref

const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY
if (!apiKey) {
  console.error('Thiếu GEMINI_API_KEY.')
  console.error('1. Vào https://aistudio.google.com/apikey tạo key miễn phí')
  console.error('2. Thêm vào .env.local (file này đã được gitignore):')
  console.error('   GEMINI_API_KEY=...')
  console.error('3. Chạy lại: npm run art -- ' + (presetName || 'hien-truong'))
  process.exit(1)
}

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' }
const parts = [{ text: prompt }]

if (refPath) {
  const refFile = resolve(ROOT, refPath)
  if (!existsSync(refFile)) {
    console.error(`Không thấy ảnh tham chiếu: ${refPath}`)
    process.exit(1)
  }
  parts.push({
    inlineData: {
      mimeType: MIME[extname(refFile).toLowerCase()] ?? 'image/png',
      data: readFileSync(refFile).toString('base64'),
    },
  })
}

const models = flags.model ? [flags.model] : ['gemini-2.5-flash-image', 'gemini-2.5-flash-image-preview']

function buildBody(modalities) {
  const generationConfig = { responseModalities: modalities }
  if (ratio) generationConfig.imageConfig = { aspectRatio: ratio }
  return JSON.stringify({ contents: [{ role: 'user', parts }], generationConfig })
}

async function callModel(model) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
  const attempt = async (modalities) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
      body: buildBody(modalities),
    })
    return { res, data: await res.json().catch(() => null) }
  }

  let { res, data } = await attempt(['IMAGE'])
  if (!res.ok && res.status === 400) {
    const retry = await attempt(['TEXT', 'IMAGE'])
    res = retry.res
    data = retry.data
  }
  return { res, data }
}

let lastError = ''
for (const model of models) {
  try {
    const { res, data } = await callModel(model)

    if (!res.ok) {
      const message = data?.error?.message ?? res.statusText
      lastError = `${res.status} ${message}`
      if (res.status === 404 || /not found|not supported/i.test(message)) continue
      if (res.status === 401 || res.status === 403) {
        console.error('Key không hợp lệ hoặc chưa bật Gemini API:', message)
      } else if (res.status === 429) {
        console.error('Hết quota miễn phí hôm nay. Thử lại sau hoặc dùng key khác.')
      } else {
        console.error(`Lỗi ${res.status}: ${message}`)
      }
      process.exit(1)
    }

    const candidate = data?.candidates?.[0]
    const imagePart = candidate?.content?.parts?.find((p) => p.inlineData?.data || p.inline_data?.data)
    const inline = imagePart?.inlineData ?? imagePart?.inline_data

    if (!inline?.data) {
      const reason = candidate?.finishReason ?? 'không rõ'
      const text = candidate?.content?.parts?.map((p) => p.text).filter(Boolean).join(' ')
      console.error(`Model không trả về ảnh (finishReason: ${reason}).`)
      if (text) console.error('Ghi chú từ model:', text)
      console.error('Có thể prompt bị chặn bởi bộ lọc an toàn — thử mô tả khác.')
      process.exit(1)
    }

    const mime = inline.mimeType ?? inline.mime_type ?? 'image/png'
    const ext = mime.includes('jpeg') ? '.jpg' : mime.includes('webp') ? '.webp' : '.png'
    const target = extname(outPath) ? outPath : outPath + ext

    mkdirSync(resolve(target, '..'), { recursive: true })
    writeFileSync(target, Buffer.from(inline.data, 'base64'))

    const kb = Math.round(Buffer.byteLength(inline.data, 'base64') / 1024)
    console.log(`✓ ${model} → ${target.replace(ROOT + '\\', '')} (${kb} kB)`)
    process.exit(0)
  } catch (error) {
    lastError = String(error?.message ?? error)
  }
}

console.error('Không tạo được ảnh:', lastError)
process.exit(1)
