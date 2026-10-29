import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Stage } from '../ui/Stage'
import { useTitle } from '../lib/useTitle'
import { CASES, type CasePack } from '../detective/cases'
import { PackCtx } from '../detective/pack'
import { saveKey, useCase, clearCaseSave } from '../detective/useCase'
import { MacSound } from '../detective/MacAudio'
import { AppleLogo, ZolaIcon, CoccocIcon, NotesIcon, FileIcon } from '../detective/MacIcons'
import { ZolaApp } from '../detective/apps/ZolaApp'
import { BrowserApp } from '../detective/apps/BrowserApp'
import { NotesApp } from '../detective/apps/NotesApp'
import { FileApp } from '../detective/apps/FileApp'

type AppId = 'zola' | 'browser' | 'notes' | 'file'

const APPS: { id: AppId; label: string; w: number; h: number; x: number; y: number }[] = [
  { id: 'zola', label: 'Zola', w: 540, h: 560, x: 28, y: 52 },
  { id: 'browser', label: 'Cộc Cộc', w: 720, h: 590, x: 420, y: 64 },
  { id: 'notes', label: 'Sổ vụ án', w: 490, h: 540, x: 140, y: 92 },
  { id: 'file', label: 'Hồ sơ', w: 500, h: 520, x: 280, y: 110 },
]

function useWidth() {
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 1024 : window.innerWidth))
  useEffect(() => {
    const on = () => setW(window.innerWidth)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return w
}

function CaseGame({ pack, onExit }: { pack: CasePack; onExit: () => void }) {
  const CASE = pack.case
  useTitle(`${CASE.title} · Thám Tử Bàn Phím`)

  const { clues, status, stage, triesLeft, found, find, accuse, unlock, unlocked, reset } = useCase(pack)

  const [open, setOpen] = useState<Record<AppId, boolean>>({
    zola: true,
    browser: true,
    notes: false,
    file: false,
  })
  const [pos, setPos] = useState<Record<AppId, { x: number; y: number }>>(() => {
    const o: Record<AppId, { x: number; y: number }> = {
      zola: { x: 28, y: 56 },
      browser: { x: 440, y: 64 },
      notes: { x: 140, y: 92 },
      file: { x: 280, y: 110 },
    }
    APPS.forEach((a) => {
      o[a.id] = { x: a.x, y: a.y }
    })
    return o
  })
  const [z, setZ] = useState<Record<AppId, number>>({ zola: 1, browser: 2, notes: 3, file: 4 })
  const [focusedApp, setFocusedApp] = useState<AppId>('browser')
  const [booted, setBooted] = useState(false)
  const [maximized, setMaximized] = useState<Record<AppId, boolean>>({
    zola: false,
    browser: false,
    notes: false,
    file: false,
  })
  const [browserTargetUrl, setBrowserTargetUrl] = useState<string>('coccoc://home')

  const handleOpenUrl = (url: string) => {
    setBrowserTargetUrl(url)
    setOpen((o) => ({ ...o, browser: true }))
    raise('browser')
    MacSound.click()
  }
  const [toast, setToast] = useState<string | null>(null)
  const [showExitModal, setShowExitModal] = useState(false)
  const [result, setResult] = useState<string | null>(() =>
    status === 'won' ? 'win' : status === 'lost' ? 'lost' : null,
  )
  const width = useWidth()
  const isMobile = width < 768

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const raise = (id: AppId) => {
    setFocusedApp(id)
    setZ((prev) => {
      const top = Math.max(...Object.values(prev)) + 1
      return { ...prev, [id]: top }
    })
  }

  const toggle = (id: AppId) => {
    MacSound.click()
    setOpen((o) => {
      const next = !o[id]
      if (next) raise(id)
      if (width < 900) {
        const solo: Record<AppId, boolean> = { zola: false, browser: false, notes: false, file: false }
        solo[id] = next
        return solo
      }
      return { ...o, [id]: next }
    })
  }

  const onAccuse = (id: string) => {
    const r = accuse(id)
    if (r === 'win') {
      MacSound.confrontSuccess()
      setResult('win')
    }
    if (r === 'dead') {
      MacSound.confrontFail()
      setResult('lost')
    }
    if (r === 'wrong') setToast('Chưa đúng. Đọc lại sổ vụ án rồi thử lại.')
    if (r === 'stage2') setToast('Đúng là thủ phạm. Còn ai đã giúp?')
    if (r === 'locked') setToast('Hồ sơ đang khoá — nhập mã trước.')
  }

  if (!booted) {
    return (
      <Stage>
        <div className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-12 font-['Be_Vietnam_Pro'] select-none">
          <p className="eyebrow mb-4 text-sky-400 font-bold uppercase tracking-widest text-[12px]"> macQuê · {CASE.no}</p>
          <h1 className="display text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.05] text-glow font-bold">
            <span className="grad-moon">{CASE.title}</span>
          </h1>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-slate-300 font-normal">{CASE.brief}</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-slate-400">
            <span>📍 {CASE.place}</span>
            <span>🕘 {CASE.time}</span>
            <span>🎯 Tìm ra thủ phạm</span>
            <span>🔥 Độ khó: {CASE.difficulty}</span>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                MacSound.click()
                setBooted(true)
              }}
            >
              Mở máy macQuê
              <span aria-hidden>⏻</span>
            </button>
            {clues.length > 0 && (
              <button
                className="btn btn-ghost btn-lg text-red-400 hover:text-red-300"
                onClick={() => {
                  if (window.confirm('Bạn có chắc muốn xoá tiến độ và chơi lại vụ án này từ đầu?')) {
                    reset()
                  }
                }}
              >
                🔄 Chơi lại từ đầu
              </button>
            )}
            <button className="btn btn-ghost btn-lg" onClick={onExit}>
              Đổi vụ án
            </button>
            <Link to="/" className="btn btn-ghost btn-lg">
              Trang chủ
            </Link>
          </div>
        </div>
      </Stage>
    )
  }

  return (
    <Stage className="fixed inset-0 h-[100dvh] w-screen overflow-hidden touch-none overscroll-none select-none">
      {/* Desktop Wallpaper macOS nguyên bản tuyệt đẹp */}
      <div 
        className="fixed inset-0 h-[100dvh] w-screen overflow-hidden font-['Be_Vietnam_Pro'] select-none touch-none overscroll-none"
        style={{
          background: 'radial-gradient(circle at 15% 20%, #1c233d 0%, #0c1020 45%, #05070e 100%)',
          backgroundImage: `
            radial-gradient(circle at 20% 25%, rgba(37, 99, 235, 0.22) 0%, transparent 55%),
            radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 60%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 36px 36px, 36px 36px',
        }}
      >
        {/* macOS Top Menu Bar */}
        <div className="relative z-40 flex h-8 items-center gap-2 sm:gap-3.5 border-b border-white/[0.08] bg-[#161822]/80 px-2.5 sm:px-4 text-[13px] text-slate-300 backdrop-blur-2xl">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <AppleLogo className="h-3.5 w-3.5 fill-white" />
            <span className="font-bold text-white text-[12px] sm:text-[13px]">macQuê</span>
            <span className="hidden sm:inline text-slate-300 hover:text-white transition-colors cursor-default text-[12px]">Tệp</span>
            <span className="hidden sm:inline text-slate-300 hover:text-white transition-colors cursor-default text-[12px]">Sửa</span>
            <span className="hidden sm:inline text-slate-300 hover:text-white transition-colors cursor-default text-[12px]">Xem</span>
            <span className="hidden sm:inline text-slate-300 hover:text-white transition-colors cursor-default text-[12px]">Cửa sổ</span>
          </div>

          <div className="flex-1 min-w-0 truncate text-center px-1">
            <span className="inline-block truncate max-w-full rounded-full bg-white/10 px-2 sm:px-3 py-0.5 text-[10px] sm:text-[11px] text-white font-medium border border-white/10">
              <span className="sm:hidden">{CASE.no}</span>
              <span className="hidden sm:inline">{CASE.no}: {CASE.title}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[12px] text-slate-300 shrink-0">
            <span className="hidden sm:inline">📶</span>
            <span className="hidden sm:inline">🔋 100%</span>
            <span className="hidden md:inline font-medium text-slate-200 text-[11px]">{CASE.time}</span>
            <button
              onClick={() => {
                MacSound.click()
                setShowExitModal(true)
              }}
              className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/15 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-red-300 transition hover:bg-red-500/30 hover:border-red-500/50 hover:text-red-200 whitespace-nowrap"
              title="Thoát vụ án"
            >
              <span>Thoát máy</span>
            </button>
          </div>
        </div>

        {/* Cửa Sổ Trắng Sáng Chuẩn macOS */}
        {APPS.map((app) => {
          if (!open[app.id]) return null
          const isFocused = focusedApp === app.id
          const isMax = Boolean(maximized[app.id]) && !isMobile
          const w = isMobile 
            ? width - 12 
            : isMax 
            ? width - 16 
            : Math.min(app.w, width - 16)
          const h = isMobile
            ? 'calc(100dvh - 38px - 82px - env(safe-area-inset-bottom, 0px))'
            : isMax
            ? window.innerHeight - 38 - 76
            : Math.min(app.h, window.innerHeight - 120)
          const x = isMobile ? 6 : isMax ? 8 : Math.max(8, Math.min(pos[app.id].x, width - w - 8))
          const y = isMobile ? 38 : isMax ? 38 : Math.max(38, Math.min(pos[app.id].y, window.innerHeight - 120))

          return (
            <div
              key={app.id}
              className={`absolute overflow-hidden rounded-[14px] border transition-shadow duration-150 touch-auto overscroll-contain select-text ${
                isFocused
                  ? 'border-[#00000024] bg-white shadow-[0_26px_75px_rgba(0,0,0,0.55)] ring-1 ring-black/5'
                  : 'border-[#00000018] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.35)] opacity-95'
              }`}
              style={{ left: x, top: y, width: w, height: h, zIndex: 20 + z[app.id] }}
              onPointerDown={() => raise(app.id)}
            >
              {/* macOS Titlebar Trắng Sáng */}
              <div
                className={`group flex h-10 items-center gap-3 border-b border-[#00000018] px-3.5 select-none transition-colors ${
                  !isMobile && !isMax ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
                } ${isFocused ? 'bg-[#f4f4f6]' : 'bg-[#fafafb]'}`}
                onDoubleClick={(e) => {
                  if (isMobile) return
                  if ((e.target as HTMLElement).closest('button')) return
                  setMaximized((m) => ({ ...m, [app.id]: !m[app.id] }))
                }}
                onPointerDown={(e) => {
                  if (isMobile || isMax) return
                  if ((e.target as HTMLElement).closest('button')) return

                  const startX = e.clientX
                  const startY = e.clientY
                  const origX = pos[app.id].x
                  const origY = pos[app.id].y

                  const move = (ev: PointerEvent) => {
                    const dx = ev.clientX - startX
                    const dy = ev.clientY - startY
                    setPos((p) => ({
                      ...p,
                      [app.id]: {
                        x: Math.max(8, Math.min(origX + dx, window.innerWidth - 120)),
                        y: Math.max(38, Math.min(origY + dy, window.innerHeight - 80)),
                      },
                    }))
                  }

                  const up = () => {
                    window.removeEventListener('pointermove', move)
                    window.removeEventListener('pointerup', up)
                  }

                  window.addEventListener('pointermove', move)
                  window.addEventListener('pointerup', up)
                }}
              >
                {/* Traffic light buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      MacSound.click()
                      setOpen((o) => ({ ...o, [app.id]: false }))
                    }}
                    className="grid h-3 w-3 place-items-center rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-2xs hover:brightness-105"
                    aria-label="Đóng cửa sổ"
                    title="Đóng cửa sổ"
                  >
                    <span className="text-[9px] font-bold text-red-950 opacity-0 group-hover:opacity-100 transition-opacity">✕</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      MacSound.click()
                      setOpen((o) => ({ ...o, [app.id]: false }))
                    }}
                    className="grid h-3 w-3 place-items-center rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-2xs hover:brightness-105"
                    aria-label="Thu nhỏ xuống Dock"
                    title="Thu nhỏ xuống Dock"
                  >
                    <span className="text-[9px] font-bold text-amber-950 opacity-0 group-hover:opacity-100 transition-opacity">–</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      MacSound.click()
                      setMaximized((m) => ({ ...m, [app.id]: !m[app.id] }))
                    }}
                    className="grid h-3 w-3 place-items-center rounded-full bg-[#27c93f] border border-[#1aab29] shadow-2xs hover:brightness-105"
                    aria-label="Phóng to / Thu lại"
                    title={maximized[app.id] ? 'Thu nhỏ cửa sổ' : 'Phóng to toàn màn hình'}
                  >
                    <span className="text-[9px] font-bold text-emerald-950 opacity-0 group-hover:opacity-100 transition-opacity">
                      {maximized[app.id] ? '▫' : '+'}
                    </span>
                  </button>
                </div>

                {/* App title */}
                <span className={`flex-1 truncate text-center text-[13px] font-semibold tracking-tight ${isFocused ? 'text-[#1d1d1f]' : 'text-slate-400'}`}>
                  {app.label}
                </span>
                <span className="w-10" />
              </div>

              {/* Window Content */}
              <div className="h-[calc(100%-2.5rem)] select-text">
                {app.id === 'zola' && <ZolaApp found={found} find={find} onOpenUrl={handleOpenUrl} />}
                {app.id === 'browser' && <BrowserApp found={found} find={find} externalUrl={browserTargetUrl} />}
                {app.id === 'notes' && <NotesApp found={found} />}
                {app.id === 'file' && (
                  <FileApp
                    found={found}
                    accuse={onAccuse}
                    triesLeft={triesLeft}
                    maxTries={pack.maxTries}
                    status={status}
                    stage={stage}
                    unlocked={unlocked}
                    code={pack.code}
                    onUnlock={unlock}
                  />
                )}
              </div>
            </div>
          )
        })}

        {/* macOS Dock Bar */}
        <div className="fixed bottom-2 sm:bottom-3 left-1/2 z-50 -translate-x-1/2 max-w-[96vw] pb-[env(safe-area-inset-bottom,0px)]">
          <div className="flex items-end gap-1.5 sm:gap-2.5 rounded-[20px] sm:rounded-[24px] border border-white/[0.18] bg-[#1a1d2e]/75 px-2.5 py-1.5 sm:px-4 sm:py-2.5 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
            {APPS.map((a) => {
              const dockIconSize = isMobile ? 38 : 50
              return (
                <button
                  key={a.id}
                  onClick={() => toggle(a.id)}
                  className="group relative flex flex-col items-center transition-all duration-200 active:scale-95 hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 sm:hover:scale-110 focus:outline-none"
                >
                  {/* Tooltip */}
                  <span className="pointer-events-none absolute -top-8 rounded-lg bg-black/85 px-2.5 py-0.5 text-[11px] font-semibold text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:opacity-100 whitespace-nowrap border border-white/10 hidden sm:block">
                    {a.label}
                  </span>

                  {/* Squircle SVG Icon */}
                  {a.id === 'zola' && <ZolaIcon size={dockIconSize} />}
                  {a.id === 'browser' && <CoccocIcon size={dockIconSize} />}
                  {a.id === 'notes' && <NotesIcon size={dockIconSize} />}
                  {a.id === 'file' && <FileIcon size={dockIconSize} />}

                  {/* Open Indicator Dot */}
                  {open[a.id] ? (
                    <i className="mt-1 h-1 w-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                  ) : (
                    <i className="mt-1 h-1 w-1 rounded-full bg-transparent" />
                  )}
                </button>
              )
            })}

            <span className="mx-1 sm:mx-1.5 h-7 sm:h-10 w-px bg-white/15" />

            {/* Exit App Button */}
            <button
              onClick={() => {
                MacSound.click()
                setShowExitModal(true)
              }}
              className="group relative flex flex-col items-center transition-all duration-200 active:scale-95 hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 sm:hover:scale-110 focus:outline-none"
            >
              <span className="pointer-events-none absolute -top-8 rounded-lg bg-black/85 px-2.5 py-0.5 text-[11px] font-semibold text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:opacity-100 whitespace-nowrap border border-white/10 hidden sm:block">
                Thoát máy
              </span>
              <div
                className="grid place-items-center rounded-[12px] sm:rounded-[18px] bg-red-950/40 border border-red-500/40 shadow-md transition-colors group-hover:bg-red-900/60"
                style={{
                  width: isMobile ? 38 : 50,
                  height: isMobile ? 38 : 50,
                  fontSize: isMobile ? 18 : 24,
                }}
              >
                🚪
              </div>
              <i className="mt-1 h-1 w-1 opacity-0" />
            </button>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-slate-200 bg-white/95 px-4 py-2 text-[12px] font-bold text-slate-800 shadow-xl">
            {toast}
          </div>
        )}

        {/* Exit Modal */}
        {showExitModal && (
          <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 px-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-100 border border-red-200 text-2xl">
                  🚪
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Xác nhận thoát vụ án</h3>
                  <p className="text-[12px] text-slate-500">{CASE.title}</p>
                </div>
              </div>

              <p className="mt-4 text-[13px] text-slate-700 leading-relaxed">
                Bạn muốn làm gì với tiến độ vụ án hiện tại?
              </p>

              <div className="mt-4 space-y-2.5">
                <button
                  onClick={() => {
                    reset()
                    setShowExitModal(false)
                    onExit()
                  }}
                  className="w-full flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-3.5 text-left transition hover:bg-red-100 group"
                >
                  <div>
                    <div className="text-[13px] font-bold text-red-700 group-hover:text-red-800 flex items-center gap-1.5">
                      <span>🔄</span> Thoát & Tạo mới lại từ đầu
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Xoá toàn bộ manh mối và lượt đoán đã lưu.
                    </p>
                  </div>
                  <span className="text-red-600 text-base font-bold group-hover:translate-x-1 transition-transform">→</span>
                </button>

                <button
                  onClick={() => {
                    setShowExitModal(false)
                    onExit()
                  }}
                  className="w-full flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 p-3.5 text-left transition hover:bg-blue-100 group"
                >
                  <div>
                    <div className="text-[13px] font-bold text-blue-700 group-hover:text-blue-800 flex items-center gap-1.5">
                      <span>💾</span> Tạm thoát & Lưu tiến độ
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Giữ nguyên {found.size} manh mối đã tìm để quay lại điều tra tiếp.
                    </p>
                  </div>
                  <span className="text-blue-600 text-base font-bold group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="rounded-xl px-3 py-1.5 text-[12px] font-medium text-slate-500 hover:bg-slate-100 transition"
                >
                  ← Tiếp tục điều tra
                </button>
                <Link
                  to="/"
                  onClick={() => reset()}
                  className="text-[12px] text-slate-500 hover:text-red-600 transition underline underline-offset-4"
                >
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Result Modal */}
        {result && (
          <div className="fixed inset-0 z-[70] grid place-items-center bg-black/60 px-6 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-2xl">
              <div className="text-4xl">{result === 'win' ? '🕵️' : '📁'}</div>
              <h2 className="display mt-3 text-3xl font-bold font-serif text-slate-900">
                {result === 'win' ? <span className="text-blue-600">Hồ sơ đã khép lại.</span> : <span className="text-red-600">Hồ sơ đóng lại.</span>}
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-slate-700">
                {result === 'win'
                  ? CASE.solution
                  : `Ba lần cáo buộc sai. Anh Tùng tự xử lý, còn bạn thì bị ghi vào “thành tích” của phường. Manh mối vẫn còn đó — thử lại từ đầu?`}
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  className="btn btn-primary btn-md"
                  onClick={() => {
                    reset()
                    setResult(null)
                    setBooted(false)
                  }}
                >
                  🔄 Điều tra lại (Tạo mới)
                </button>
                <button
                  className="btn btn-ghost btn-md text-slate-700"
                  onClick={() => {
                    if (result === 'lost') reset()
                    onExit()
                  }}
                >
                  📁 Danh sách vụ án
                </button>
                <Link
                  to="/"
                  onClick={() => {
                    if (result === 'lost') reset()
                  }}
                  className="btn btn-ghost btn-md text-slate-700"
                >
                  🏠 Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Stage>
  )
}

/* -------------------------------------------------------------- case list */
function readStatus(id: string): { status: 'new' | 'playing' | 'won' | 'lost'; clueCount: number } {
  try {
    const raw = localStorage.getItem(saveKey(id))
    if (!raw) return { status: 'new', clueCount: 0 }
    const parsed = JSON.parse(raw) as Partial<{ clues: string[]; attempts: number; status: string }>
    const clues = Array.isArray(parsed.clues) ? parsed.clues : []
    const status =
      parsed.status === 'won' || parsed.status === 'lost'
        ? (parsed.status as 'won' | 'lost')
        : clues.length > 0 || (typeof parsed.attempts === 'number' && parsed.attempts > 0)
        ? 'playing'
        : 'new'
    return { status, clueCount: clues.length }
  } catch {
    return { status: 'new', clueCount: 0 }
  }
}

function CasePicker({ onPick }: { onPick: (id: string) => void }) {
  useTitle('Chọn vụ án · Thám Tử Bàn Phím')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleResetCase = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (window.confirm('Bạn có chắc muốn đặt lại vụ án này để chơi mới từ đầu?')) {
      clearCaseSave(id)
      setRefreshKey((k) => k + 1)
    }
  }

  return (
    <Stage>
      <div className="mx-auto min-h-dvh max-w-4xl px-6 py-14 font-['Be_Vietnam_Pro'] select-none">
        <p className="eyebrow text-sky-400 font-bold uppercase tracking-widest text-[12px]">TBOY Studio · macQuê</p>
        <h1 className="display mt-2 text-[clamp(2rem,5vw,3.2rem)] font-bold">
          <span className="grad-moon">Chọn vụ án</span>
        </h1>
        <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-slate-300">
          Năm vụ án trinh thám với độ khó tăng dần. Vụ 05 là kỳ án mạng phòng kín siêu hóc búa: kẻ thủ ác ngụy tạo
          hiện trường tự tử tinh vi cùng kẻ đồng phạm tiếp tay xảo quyệt.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {CASES.map((p) => {
            const st = readStatus(p.id)
            return (
              <div
                key={`${p.id}-${refreshKey}`}
                onClick={() => {
                  MacSound.click()
                  onPick(p.id)
                }}
                className="group relative cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-200 hover:border-amber-400/50 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{p.case.no}</span>
                  <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
                    {p.difficulty}
                  </span>
                </div>
                <h2 className="mt-2 text-[17px] font-bold leading-snug text-white group-hover:text-amber-300 transition-colors">
                  {p.case.title}
                </h2>
                <p className="mt-1 text-[11px] text-slate-400">
                  📍 {p.case.place} · 🕘 {p.case.time}
                </p>
                <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-slate-300">{p.case.brief}</p>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-[12px] font-bold text-amber-400">
                    {st.status === 'won'
                      ? '✅ Đã phá án'
                      : st.status === 'lost'
                      ? '⏳ Hồ sơ đang đóng'
                      : st.status === 'playing'
                      ? `🔍 Đang điều tra (${st.clueCount} manh mối)`
                      : '▶ Vào điều tra'}
                  </span>
                  {st.status !== 'new' && (
                    <button
                      type="button"
                      onClick={(e) => handleResetCase(e, p.id)}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[11px] font-medium text-red-300 hover:bg-red-500/25 hover:text-red-200 transition"
                      title="Đặt lại vụ án này về ban đầu"
                    >
                      🔄 Chơi mới
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <Link to="/" className="btn btn-ghost btn-md mt-8">
          Về trang chủ
        </Link>
      </div>
    </Stage>
  )
}

export default function Detective() {
  const [active, setActive] = useState<string | null>(null)
  const pack = active ? (CASES.find((c) => c.id === active) ?? null) : null
  if (!pack) return <CasePicker onPick={setActive} />
  return (
    <PackCtx.Provider value={pack}>
      <CaseGame key={pack.id} pack={pack} onExit={() => setActive(null)} />
    </PackCtx.Provider>
  )
}
