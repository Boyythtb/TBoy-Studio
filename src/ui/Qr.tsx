import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

interface QrProps {
  value: string
  size?: number
  className?: string
}

export function Qr({ value, size = 220, className = '' }: QrProps) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    QRCode.toDataURL(value, {
      margin: 1,
      width: size * 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#08080f', light: '#f1edfa' },
    })
      .then((u) => alive && setUrl(u))
      .catch(() => alive && setUrl(null))
    return () => {
      alive = false
    }
  }, [value, size])

  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded-[22px] bg-parchment p-2 ${className}`}
      style={{ width: size, height: size }}
    >
      {url ? (
        <img src={url} alt="Mã QR để vào phòng" width={size - 16} height={size - 16} className="rounded-[14px]" />
      ) : (
        <div className="h-full w-full animate-pulse rounded-[14px] bg-parchment/40" />
      )}
    </div>
  )
}
