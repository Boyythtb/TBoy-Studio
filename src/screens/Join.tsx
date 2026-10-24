import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Stage } from '../ui/Stage'
import { findRoom } from '../lib/room'
import { sfx } from '../lib/sfx'

export default function Join() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const clean = code.trim().toUpperCase()
    if (clean.length < 4) {
      setError('Mã phòng gồm 4 ký tự.')
      return
    }
    setBusy(true)
    setError(null)
    try {
      const meta = await findRoom(clean)
      if (!meta) {
        setError('Không tìm thấy phòng này. Kiểm tra lại mã nhé.')
        setBusy(false)
        return
      }
      sfx.tap()
      navigate(`/play/${clean}`)
    } catch (e) {
      setError((e as Error).message)
      setBusy(false)
    }
  }

  return (
    <Stage>
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-6 py-10">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors">
          ← Về trang chủ
        </Link>
        <div className="midnight-card p-8 sm:p-9">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[0.66rem] font-bold tracking-wider text-cyan-400 uppercase shadow-[0_0_12px_rgba(6,182,212,0.15)]">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Tham gia ván đấu
          </div>
          <h1 className="display text-3xl font-serif font-bold text-white tracking-tight mt-3">
            Vào phòng chơi
          </h1>
          <p className="mt-2 text-[0.86rem] leading-relaxed text-slate-300 font-normal">
            Nhập 4 ký tự hiển thị trên màn hình TV/laptop hoặc quét trực tiếp mã QR.
          </p>

          <form onSubmit={submit} className="mt-8">
            <div className="relative">
              <input
                autoFocus
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase())}
                placeholder="ABCD"
                inputMode="text"
                autoCapitalize="characters"
                autoComplete="off"
                className="field code-input text-2xl font-serif tracking-[0.45em] border-slate-700 bg-slate-900/80 text-white focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                aria-label="Mã phòng"
              />
            </div>
            {error && (
              <p className="mt-3 text-xs font-semibold text-red-400 flex items-center gap-1.5">
                <span>⚠️</span> {error}
              </p>
            )}
            <button 
              type="submit" 
              className="btn btn-primary btn-lg mt-6 w-full text-[0.95rem]" 
              disabled={busy}
            >
              {busy ? 'Đang kết nối…' : 'Xác nhận vào phòng →'}
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-center">
            <p className="text-[0.74rem] leading-relaxed text-slate-400 font-normal">
              Yêu cầu một màn hình TV/laptop đang mở phòng chờ. Nếu chưa có, vui lòng tạo phòng trước.
            </p>
          </div>
        </div>
      </div>
    </Stage>
  )
}
