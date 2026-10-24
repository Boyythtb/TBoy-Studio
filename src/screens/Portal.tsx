import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Stage } from '../ui/Stage'
import { SfxToggle } from '../ui/SfxToggle'
import { useTitle } from '../lib/useTitle'

const GAMES = [
  {
    to: '/ma-soi',
    icon: '🐺',
    name: 'Ma Sói',
    tag: 'Suy luận · Phe phái',
    players: '4–16 người',
    time: '20–40 phút',
    desc: 'Cả làng ngủ, bầy sói thức. Tìm ra kẻ mang nanh vuốt trước khi ánh bình minh xuất hiện.',
    accent: '#ef4444',
    badgeColor: '#f87171',
    glow: 'rgba(239, 68, 68, 0.25)',
  },
  {
    to: '/secret-code',
    icon: '🔐',
    name: 'Mật Mã',
    tag: 'Trí tuệ · Đối kháng',
    players: '2–8 người',
    time: '10–20 phút',
    desc: 'Mỗi người cất giấu một mật mã 3 số. Lần lượt suy luận và giải mã khóa của đối phương.',
    accent: '#06b6d4',
    badgeColor: '#67e8f9',
    glow: 'rgba(6, 182, 212, 0.25)',
  },
  {
    to: '/sea-battle',
    icon: '🚢',
    name: 'Hải Chiến',
    tag: 'Chiến thuật · Đấu tay đôi',
    players: '2 người',
    time: '10–15 phút',
    desc: 'Bố trí hạm đội trên hải đồ 8×8, tung phát bắn pháo hạm quyết định để đánh chìm tàu địch.',
    accent: '#38bdf8',
    badgeColor: '#7dd3fc',
    glow: 'rgba(56, 189, 248, 0.25)',
  },
  {
    to: '/truth-or-dare',
    icon: '🌶️',
    name: 'Sự Thật & Thử Thách 18+',
    tag: 'Bàn Nhậu · Người lớn 18+',
    players: '2–20 người',
    time: 'Tới bến',
    desc: 'Vòng xoay chai bia, câu hỏi bóc mẽ và thử thách nóng bỏng dành riêng cho các buổi nhậu tuổi 30.',
    accent: '#f43f5e',
    badgeColor: '#fb7185',
    glow: 'rgba(244, 63, 94, 0.35)',
  },
  {
    to: '/ludo',
    icon: '🐴',
    name: 'Cờ Cá Ngựa Chiến Thuật',
    tag: 'Bàn cờ · Đối kháng vui nhộn',
    players: '2–4 người',
    time: '10–15 phút',
    desc: 'Lắc xúc xắc nảy lửa, đá văng ngựa đối thủ về chuồng và kích hoạt thẻ kỹ năng can thiệp kịch tính.',
    accent: '#f59e0b',
    badgeColor: '#fbbf24',
    glow: 'rgba(245, 158, 11, 0.35)',
  },
  {
    to: '/monopoly',
    icon: '🎩',
    name: 'Cờ Tỷ Phú Mini',
    tag: 'Bất động sản · Đại gia',
    players: '2–4 người',
    time: '15–20 phút',
    desc: 'Bàn cờ 20 ô đô thị hiện đại. Mua đất, nâng cấp khách sạn và thu tiền thuê làm đối thủ phá sản.',
    accent: '#eab308',
    badgeColor: '#fde047',
    glow: 'rgba(234, 179, 8, 0.35)',
  },
  {
    to: '/catan',
    icon: '🌾',
    name: 'Khai Phá Đảo Catan',
    tag: 'Tài nguyên · Xây dựng',
    players: '2–4 người',
    time: '15–20 phút',
    desc: 'Bản đồ 7 ô lục giác tài nguyên trù phú. Thu hoạch mùa màng, lập làng, xây thành phố để thống lĩnh hòn đảo.',
    accent: '#10b981',
    badgeColor: '#34d399',
    glow: 'rgba(16, 185, 129, 0.35)',
  },
  {
    to: '/detective',
    icon: '🕵️',
    name: 'Thám Tử Bàn Phím',
    tag: 'Trinh thám · Một người',
    players: '1 người',
    time: '20–40 phút',
    desc: 'Mở máy tính hiện trường của anh Tùng, bóc tách tin nhắn, soi ảnh và tìm ra thủ phạm thực sự.',
    accent: '#f59e0b',
    badgeColor: '#fcd34d',
    glow: 'rgba(245, 158, 11, 0.25)',
  },
]

export default function Portal() {
  useTitle('TBOY Studio · Game đêm')
  return (
    <Stage>
      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-5 pb-16 sm:px-8">
        <header className="flex items-center justify-between py-6 border-b border-slate-800/80">
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-800/80 text-xl border border-slate-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-colors group-hover:border-cyan-500/50">
              🎲
            </span>
            <div className="flex flex-col">
              <span className="text-[0.88rem] font-bold tracking-[0.25em] text-slate-100 uppercase">
                TBOY STUDIO
              </span>
              <span className="text-[0.62rem] tracking-wider text-slate-400 uppercase font-medium">Boardgame Đêm Trăng</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/join" className="btn btn-ghost btn-sm text-xs font-semibold">
              Vào phòng
            </Link>
            <SfxToggle />
          </div>
        </header>

        <section className="py-12 sm:py-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[0.68rem] font-bold tracking-wider text-cyan-400 uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Một màn hình trung tâm · Nhiều điện thoại kết nối
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="display max-w-3xl text-[clamp(2.9rem,7.5vw,5rem)] tracking-tight font-serif text-glow"
          >
            <span className="grad-moon">Đêm nay</span> <span className="italic grad-cyan">chơi gì?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-slate-300 font-normal"
          >
            Mở phòng trên TV hoặc Laptop, mọi người quét mã QR bằng điện thoại để bắt đầu ván đấu. 
            Không cần cài đặt, không cần đăng ký.
          </motion.p>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          {GAMES.map((g, i) => (
            <motion.div
              key={g.to}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="midnight-card group flex flex-col p-7 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div 
                  className="grid h-15 w-15 place-items-center rounded-2xl text-3xl shadow-inner border border-slate-700/60 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${g.accent}20, rgba(15, 23, 42, 0.9))`,
                    boxShadow: `0 8px 20px -6px ${g.glow}`,
                  }}
                >
                  {g.icon}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span 
                    className="midnight-tag"
                    style={{ borderColor: `${g.accent}40`, color: g.badgeColor }}
                  >
                    ● {g.players}
                  </span>
                  <span className="text-[0.7rem] font-medium text-slate-400">{g.time}</span>
                </div>
              </div>

              <div className="mt-6 flex-1">
                <h2 className="display text-2xl font-bold tracking-tight text-white transition-colors" style={{ color: g.accent }}>
                  {g.name}
                </h2>
                <p className="mt-1 text-[0.68rem] font-bold tracking-[0.16em] uppercase text-cyan-400/80">{g.tag}</p>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-slate-300 font-normal">{g.desc}</p>
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-slate-800/80 pt-5">
                <span className="text-[0.72rem] text-slate-400 font-medium">Sẵn sàng nhập cuộc</span>
                <Link 
                  to={g.to} 
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[0.82rem] font-bold text-white transition-all shadow-md group-hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${g.accent}, rgba(15, 23, 42, 0.9))`,
                    boxShadow: `0 4px 14px -3px ${g.glow}`,
                  }}
                >
                  Bắt đầu <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </section>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-[0.72rem] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-[0.25em] text-slate-300 uppercase">TBOY STUDIO</span>
            <span className="text-slate-600">•</span>
            <span>Ma Sói & Boardgame tiệc</span>
          </div>
          <span className="text-cyan-400/80">Hoàn toàn miễn phí · Mở web chơi ngay</span>
        </footer>
      </div>
    </Stage>
  )
}
