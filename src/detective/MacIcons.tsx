/** Biểu tượng Apple mạ bạc chuẩn macOS */
export function AppleLogo({ className = 'h-4 w-4 fill-current' }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 170" className={className}>
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.98-6.19-9.68-11.05-20.9-14.59-33.66-3.54-12.76-5.31-24.87-5.31-36.33 0-14.44 3.73-26.68 11.19-36.72 7.46-10.04 17.07-15.18 28.84-15.42 4.36 0 9.28 1.14 14.76 3.42 5.48 2.29 9.38 3.48 11.7 3.59 2.12-.11 6.13-1.35 12.03-3.71 5.9-2.36 10.9-3.48 15-3.36 11.29.65 20.66 4.96 28.11 12.92-9.91 6.09-14.75 14.57-14.53 25.43.22 8.7 3.42 16.03 9.61 22 6.18 5.98 13.6 9.36 22.25 10.13-2.07 6.3-4.57 12.63-7.5 19-2.94 6.36-6.04 12.44-9.3 18.23zM119.22 31.86c0-7.07 2.61-13.71 7.82-19.92 5.22-6.21 11.75-10.24 19.6-12.09.22 1.09.33 2.18.33 3.27 0 7.07-2.61 13.92-7.83 20.57-5.22 6.63-11.76 10.45-19.6 11.43-.11-1.09-.32-2.18-.32-3.26z" />
    </svg>
  )
}

/** Icon Zola chuẩn macOS Squircle bóng bẩy */
export function ZolaIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative select-none transition-transform duration-200 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md">
        <defs>
          <linearGradient id="zola-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2589ff" />
            <stop offset="100%" stopColor="#0055d4" />
          </linearGradient>
          <linearGradient id="zola-specular" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="zola-badge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2ecf9" />
          </linearGradient>
        </defs>

        {/* Nền Squircle chuẩn Apple */}
        <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#zola-grad)" />

        {/* Hiệu ứng bóng sáng bề mặt (Specular Light) */}
        <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#zola-specular)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

        {/* Bong bóng chat chính */}
        <path
          d="M26 32 C26 25 32 20 50 20 C68 20 74 25 74 32 C74 48 64 56 50 56 C44 56 39 58 32 63 C33 58 32 55 28 53 C26 50 26 44 26 32 Z"
          fill="url(#zola-badge)"
          className="drop-shadow-sm"
        />

        {/* Chữ Z nổi */}
        <text
          x="50"
          y="44"
          textAnchor="middle"
          fontSize="22"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill="#005ec4"
          letterSpacing="-1"
        >
          Z
        </text>

        {/* Chấm trực tuyến xanh lá */}
        <circle cx="76" cy="74" r="9" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
      </svg>
    </div>
  )
}

/** Icon Cộc Cốc Browser chuẩn macOS */
export function CoccocIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative select-none transition-transform duration-200 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md">
        <defs>
          <linearGradient id="cc-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#15cf89" />
            <stop offset="100%" stopColor="#007e4d" />
          </linearGradient>
          <linearGradient id="cc-specular" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="compass-needle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d4f" />
            <stop offset="100%" stopColor="#b30006" />
          </linearGradient>
        </defs>

        {/* Nền Squircle */}
        <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#cc-grad)" />
        <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#cc-specular)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

        {/* Vòng tròn la bàn */}
        <circle cx="50" cy="50" r="30" fill="rgba(255, 255, 255, 0.15)" stroke="#ffffff" strokeWidth="2" strokeDasharray="2 3" />
        <circle cx="50" cy="50" r="24" fill="#ffffff" />

        {/* Kim la bàn */}
        <polygon points="50,28 55,50 50,46" fill="url(#compass-needle)" />
        <polygon points="50,72 55,50 50,46" fill="#64748b" />
        <polygon points="50,28 45,50 50,46" fill="#ff7875" />
        <polygon points="50,72 45,50 50,46" fill="#94a3b8" />

        {/* Tâm kim */}
        <circle cx="50" cy="50" r="3.5" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

/** Icon Sổ Vụ Án chuẩn Bìa Da & Kẹp Ghim Vàng */
export function NotesIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative select-none transition-transform duration-200 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md">
        <defs>
          <linearGradient id="notes-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a3b32" />
            <stop offset="100%" stopColor="#201815" />
          </linearGradient>
          <linearGradient id="notes-specular" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gold-pin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd666" />
            <stop offset="100%" stopColor="#d48806" />
          </linearGradient>
        </defs>

        {/* Cuốn sổ da */}
        <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#notes-grad)" />
        <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#notes-specular)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

        {/* Gáy sổ viền vàng */}
        <rect x="6" y="6" width="12" height="88" rx="4" fill="#150f0c" stroke="#d48806" strokeWidth="1" />

        {/* Trang giấy bên trong */}
        <rect x="25" y="16" width="60" height="68" rx="6" fill="#fffdfa" />

        {/* Các dòng kẻ ghi chép */}
        <line x1="33" y1="28" x2="77" y2="28" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="40" x2="77" y2="40" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="52" x2="68" y2="52" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="64" x2="73" y2="64" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

        {/* Ghim kim loại màu đỏ/vàng */}
        <circle cx="74" cy="22" r="5" fill="url(#gold-pin)" stroke="#874d00" strokeWidth="1" />
      </svg>
    </div>
  )
}

/** Icon Hồ Sơ Mật Cảnh Sát */
export function FileIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative select-none transition-transform duration-200 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md">
        <defs>
          <linearGradient id="file-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="file-specular" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#file-grad)" />
        <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#file-specular)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

        {/* Thư mục Manilla */}
        <path
          d="M20 30 C20 26 24 22 28 22 L42 22 L50 28 L72 28 C76 28 80 32 80 36 L80 72 C80 76 76 80 72 80 L28 80 C24 80 20 76 20 72 Z"
          fill="#d97706"
        />
        <path
          d="M20 38 L80 38 L76 74 C76 77 73 80 70 80 L30 80 C27 80 24 77 24 74 Z"
          fill="#f59e0b"
        />

        {/* Huy hiệu ngôi sao điều tra */}
        <polygon
          points="50,46 53,53 60,54 55,59 56,66 50,62 44,66 45,59 40,54 47,53"
          fill="#ffffff"
          stroke="#b45309"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  )
}
