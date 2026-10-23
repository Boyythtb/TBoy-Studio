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
    tag: 'Suy luận · phe phái',
    players: '4–16 người',
    time: '20–40 phút',
    desc: 'Cả làng ngủ, bầy sói thức. Tìm ra kẻ mang nanh trước khi trời sáng.',
    accent: '#ff6a5c',
  },
  {
    to: '/secret-code',
    icon: '🔐',
    name: 'Mật mã',
    tag: 'Suy luận · đối kháng',
    players: '2–8 người',
    time: '10–20 phút',
    desc: 'Mỗi người giấu một mật mã 3 số. Đến lượt, đoán mã của người khác — đúng vị trí, đúng số?',
    accent: '#7be0c0',
  },
  {
    to: '/sea-battle',
    icon: '🚢',
    name: 'Hải chiến',
    tag: 'Chiến thuật · 1v1',
    players: '2 người',
    time: '10–15 phút',
    desc: 'Đặt hạm đội trên lưới 8×8 rồi bắn từng phát. Bắn trúng thì được bắn tiếp.',
    accent: '#8eb4ff',
  },
  {
    to: '/detective',
    icon: '🕵️',
    name: 'Thám Tử Bàn Phím',
    tag: 'Trinh thám · một người',
    players: '1 người',
    time: '20–40 phút',
    desc: 'Mở máy tính của anh Tùng, đọc tin nhắn, lướt web, soi ảnh và tìm ra ai đã lấy chiếc xe đạp điện.',
    accent: '#ffc861',
  },
]

export default function Portal() {
  useTitle('TBOY Studio · Game đêm')
  return (
    <Stage>
      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-5 pb-16 sm:px-8">
        <header className="flex items-center justify-between py-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/8 text-lg hairline">🎲</span>
            <span className="text-[0.82rem] font-bold tracking-[0.28em] text-parchment/80 uppercase">TBOY Studio</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/join" className="btn btn-ghost btn-sm">
              Vào phòng
            </Link>
            <SfxToggle />
          </div>
        </header>

        <section className="py-10 sm:py-14">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-4">
            Game tiệc · một màn hình, nhiều điện thoại
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="display max-w-3xl text-[clamp(2.7rem,7.5vw,4.8rem)] text-glow"
          >
            <span className="grad-moon">Đêm nay</span> <span className="italic text-parchment">chơi gì?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-parchment/60"
          >
            Chọn một trò, mở phòng trên laptop/TV, cả bàn quét mã QR bằng điện thoại. Không cần cài app,
            không cần tài khoản.
          </motion.p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((g, i) => (
            <motion.div
              key={g.to}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="glass group flex flex-col rounded-3xl p-6 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{g.icon}</span>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[0.6rem] tracking-[0.16em] text-mute uppercase">
                  {g.players}
                </span>
              </div>
              <h2 className="display mt-5 text-2xl" style={{ color: g.accent }}>
                {g.name}
              </h2>
              <p className="mt-1 text-[0.65rem] tracking-[0.18em] text-mute uppercase">{g.tag}</p>
              <p className="mt-3 flex-1 text-[0.82rem] leading-relaxed text-parchment/60">{g.desc}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
                <span className="text-[0.68rem] text-mute">{g.time}</span>
                <Link to={g.to} className="text-[0.78rem] font-medium text-parchment/85 group-hover:text-parchment">
                  Chơi →
                </Link>
              </div>
            </motion.div>
          ))}
        </section>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-6 text-[0.7rem] text-mute">
          <span className="tracking-[0.28em] uppercase">TBOY STUDIO</span>
          <span>Không cần cài app · Miễn phí</span>
        </footer>
      </div>
    </Stage>
  )
}
