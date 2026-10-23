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
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-5 py-10">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-xs text-mute hover:text-parchment">
          ← Về trang chủ
        </Link>
        <h1 className="display text-4xl text-parchment">Vào phòng</h1>
        <p className="mt-3 text-sm leading-relaxed text-parchment/60">
          Nhập mã 4 ký tự hiện trên màn hình chung, hoặc quét mã QR bằng camera điện thoại.
        </p>

        <form onSubmit={submit} className="mt-8">
          <input
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase())}
            placeholder="ABCD"
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            className="field code-input"
            aria-label="Mã phòng"
          />
          {error && <p className="mt-3 text-xs text-blood-soft">{error}</p>}
          <button type="submit" className="btn btn-primary btn-lg mt-4 w-full" disabled={busy}>
            {busy ? 'Đang kiểm tra…' : 'Tiếp tục'}
          </button>
        </form>

        <div className="mt-10 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
          <p className="text-[0.72rem] leading-relaxed text-mute">
            Bạn cần một màn hình chung (TV, laptop) đang mở phòng chờ. Nếu chưa có, hãy nhờ ai đó bấm
            <span className="text-parchment/80"> “Tạo phòng”</span> trên thiết bị đó trước.
          </p>
        </div>
      </div>
    </Stage>
  )
}
