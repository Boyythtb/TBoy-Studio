import { Link } from 'react-router-dom'
import { Stage } from '../ui/Stage'
import { ROLES, ROLE_ORDER } from '../game/roles'

const STEPS = [
  {
    n: '01',
    title: 'Chia vai',
    text: 'Mỗi người nhận một vai riêng trên điện thoại. Sói biết đồng bọn, dân làng chỉ biết mình là dân.',
  },
  {
    n: '02',
    title: 'Ban đêm',
    text: 'Cả làng nhắm mắt. Bảo vệ che chở, Sói chọn nạn nhân, Tiên tri soi một người, Phù thuỷ quyết định cứu hay đầu độc. Càng nhiều vai, đêm càng dày đặc bí mật.',
  },
  {
    n: '03',
    title: 'Ban ngày',
    text: 'Màn hình chung công bố ai đã chết. Cả làng thảo luận, buộc tội và bỏ phiếu treo cổ một người.',
  },
  {
    n: '04',
    title: 'Kết thúc',
    text: 'Dân thắng khi hết Sói và hết Sát Nhân. Sói thắng khi đông hơn dân. Các phe thứ ba — Kẻ Chán Đời, Sát Nhân, Sói Trắng, Người Thổi Sáo — có cách thắng riêng.',
  },
]

export default function Guides() {
  return (
    <Stage>
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        <Link to="/" className="text-xs text-mute hover:text-parchment">
          ← Về trang chủ
        </Link>

        <header className="mt-8">
          <p className="eyebrow mb-4">Luật chơi</p>
          <h1 className="display text-[clamp(2.4rem,6vw,4rem)]">
            <span className="grad-moon">Ma Sói</span>
            <span className="text-parchment/85">, trong 5 phút.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-parchment/60">
            Một ngôi làng nhỏ. Một vài con sói đội lốt người. Ban ngày chúng tranh luận như bao người khác —
            ban đêm chúng đi săn. Nhiệm vụ của bạn là tìm ra chúng trước khi quá muộn.
          </p>
        </header>

        <section className="mt-12 grid gap-3 sm:grid-cols-2">
          {STEPS.map((s) => (
            <div key={s.n} className="glass rounded-2xl p-5">
              <span className="text-[0.62rem] tracking-[0.3em] text-violet-soft/70">{s.n}</span>
              <h2 className="mt-2 text-base font-semibold text-parchment">{s.title}</h2>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-mute">{s.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <h2 className="display text-2xl text-parchment/90">Các vai</h2>
          <div className="mt-5 space-y-2.5">
            {ROLE_ORDER.map((id) => {
              const def = ROLES[id]
              return (
                <div
                  key={id}
                  className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.025] p-4"
                  style={{ borderLeft: `3px solid ${def.accent}` }}
                >
                  <div className="text-2xl">{def.icon}</div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold" style={{ color: def.accent }}>
                        {def.name}
                      </h3>
                      <span className="rounded-full bg-white/6 px-2 py-0.5 text-[0.55rem] tracking-[0.16em] text-mute uppercase">
                        {def.team === 'wolf' ? 'phe sói' : def.team === 'solo' ? 'phe thứ ba' : 'phe dân'}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.78rem] leading-relaxed text-parchment/60">{def.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="display text-2xl text-parchment/90">Luật tuỳ chọn</h2>
          <p className="mt-2 max-w-xl text-[0.8rem] leading-relaxed text-mute">
            Chủ phòng có thể bật tắt trong màn hình chờ. Mỗi luật đổi hẳn cách cả làng phải suy nghĩ.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: '🗳️',
                title: 'Bỏ phiếu kín',
                text: 'Màn hình chung không hiện ai đang bị bao nhiêu phiếu. Chỉ đến phút cuối cả làng mới biết kết quả.',
              },
              {
                icon: '🎭',
                title: 'Ẩn vai khi chết',
                text: 'Người bị treo cổ không bị lộ vai. Sói có thể giả làm dân, dân có thể chết trong im lặng.',
              },
              {
                icon: '🌙',
                title: 'Đêm đầu yên bình',
                text: 'Đêm đầu tiên không ai bị cắn hay bị giết. Cả làng có thêm một ngày để quan sát trước khi máu đổ.',
              },
            ].map((r) => (
              <div key={r.title} className="glass rounded-2xl p-5">
                <div className="text-xl">{r.icon}</div>
                <h3 className="mt-2 text-sm font-semibold text-parchment/90">{r.title}</h3>
                <p className="mt-1.5 text-[0.76rem] leading-relaxed text-mute">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="display text-2xl text-parchment/90">Vài mẹo sống sót</h2>
          <ul className="mt-5 space-y-3 text-[0.82rem] leading-relaxed text-parchment/60">
            <li className="flex gap-3">
              <span className="text-violet-soft">◆</span>
              Đừng chỉ nói “tôi là dân”. Hãy kể một câu chuyện cụ thể — sói thường lúng túng khi bị hỏi chi tiết.
            </li>
            <li className="flex gap-3">
              <span className="text-violet-soft">◆</span>
              Tiên tri nên tiết lộ thông tin từ từ. Nói hết ngay ngày đầu là tự ký giấy báo tử.
            </li>
            <li className="flex gap-3">
              <span className="text-violet-soft">◆</span>
              Sói hãy “bắt lỗi” đồng bọn một cách nhẹ nhàng. Không ai nghi ngờ người đầu tiên lên tiếng.
            </li>
            <li className="flex gap-3">
              <span className="text-violet-soft">◆</span>
              Phiếu chia đều nghĩa là không ai chết. Đôi khi bỏ qua còn tốt hơn treo cổ nhầm.
            </li>
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary btn-md">
            Tạo phòng
          </Link>
          <Link to="/join" className="btn btn-ghost btn-md">
            Vào phòng
          </Link>
        </div>
      </div>
    </Stage>
  )
}
