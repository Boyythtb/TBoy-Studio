import { motion } from 'framer-motion'
import { Avatar } from '../ui/Avatar'
import { roleDef } from '../game/roles'
import type { Meta, Player, Secret } from '../game/types'

interface Props {
  meta: Meta
  players: Player[]
  secrets: Record<string, Secret>
  onReplay: () => void
  onLeave: () => void
}

export function OverView({ meta, players, secrets, onReplay, onLeave }: Props) {
  const wolvesWin = meta.winner === 'wolf'
  const villageWin = meta.winner === 'village'
  const survivors = players.filter((p) => p.alive).length
  const title =
    meta.winReason === 'jester'
      ? 'Kẻ Chán Đời thắng.'
      : meta.winReason === 'killer'
        ? 'Sát Nhân thắng.'
        : meta.winReason === 'whitewolf'
          ? 'Sói Trắng thắng.'
          : meta.winReason === 'piper'
            ? 'Người Thổi Sáo thắng.'
            : meta.winReason === 'lovers'
              ? 'Đôi tình nhân thắng.'
              : wolvesWin
                ? 'Bầy Sói thắng.'
                : villageWin
                  ? 'Ngôi làng thắng.'
                  : 'Ván đấu khép lại.'
  const desc =
    meta.winReason === 'jester'
      ? 'Cả làng đã treo cổ đúng người — và trao cho hắn thứ hắn hằng mong. Một cái kết không ai ngờ.'
      : meta.winReason === 'killer'
        ? 'Không còn ai thở trong làng. Lưỡi dao ấy chưa từng thuộc về phe nào.'
        : meta.winReason === 'whitewolf'
          ? 'Nó đã phản bội cả bầy, rồi đứng lại một mình giữa những cái xác. Kẻ duy nhất còn sống.'
          : meta.winReason === 'piper'
            ? 'Tiếng sáo vang khắp làng. Không ai còn nhớ mình từng muốn chống lại nó.'
            : meta.winReason === 'lovers'
              ? 'Hai kẻ thù yêu nhau tới cuối cùng. Họ chọn nhau thay vì chọn phe.'
              : wolvesWin
                ? 'Sói đã đông hơn người. Ngôi làng chìm trong im lặng — và tiếng hú vang lên từ những mái nhà.'
                : villageWin
                  ? 'Những kẻ mang nanh đã bị lôi ra ánh sáng. Ngôi làng sống sót — lần này.'
                  : 'Không ai kịp nhìn thấy bình minh. Câu chuyện dừng lại giữa chừng, khi cả làng vẫn còn quá nhiều bí mật.'

  return (
    <div className="mx-auto min-h-dvh max-w-6xl px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <p className="eyebrow mb-4">Ván đấu kết thúc · {meta.round} đêm</p>
        <h1 className="display text-[clamp(2.6rem,7vw,5rem)]">
          <span className={wolvesWin || meta.winReason === 'killer' || meta.winReason === 'whitewolf' ? 'grad-blood' : 'grad-moon'}>{title}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-parchment/55">{desc}</p>

        <div className="mt-6 flex items-center justify-center gap-6 text-[0.7rem] text-mute">
          <span>
            <span className="text-parchment/85">{survivors}</span> người sống sót
          </span>
          <span className="h-3 w-px bg-white/15" />
          <span>
            <span className="text-parchment/85">{players.length}</span> người chơi
          </span>
          <span className="h-3 w-px bg-white/15" />
          <span>
            <span className="text-blood-soft">{players.length - survivors}</span> đã chết
          </span>
        </div>
      </motion.div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {players.map((p, i) => {
          const secret = secrets[p.uid]
          const def = secret ? roleDef(secret.role) : null
          return (
            <motion.div
              key={p.uid}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              className="flex items-center gap-3 rounded-2xl border px-4 py-3"
              style={{
                borderColor: def ? `${def.accent}33` : 'rgba(255,255,255,0.08)',
                background: def ? `${def.accent}0c` : 'rgba(255,255,255,0.025)',
              }}
            >
              <Avatar index={p.avatar} size={44} name={p.name} dead={!p.alive} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-parchment/90">{p.name}</p>
                <p className="text-[0.7rem]" style={{ color: def?.accent }}>
                  {def ? `${def.icon} ${def.name}` : '—'}
                </p>
              </div>
              {!p.alive && <span className="text-[0.62rem] tracking-[0.18em] text-mute uppercase">đã chết</span>}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button className="btn btn-primary btn-lg" onClick={onReplay}>
          Chơi ván mới
        </button>
        <button className="btn btn-ghost btn-lg" onClick={onLeave}>
          Về trang chủ
        </button>
      </div>

      <p className="mt-8 text-center text-[0.68rem] text-mute">
        Giữ nguyên phòng — mọi người vẫn kết nối, chỉ cần bấm chơi lại.
      </p>
    </div>
  )
}
