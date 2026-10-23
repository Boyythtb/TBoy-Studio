import { AnimatePresence, motion } from 'framer-motion'
import { Forest } from '../ui/Forest'
import { Timer } from '../ui/Timer'
import type { Meta, NightStep, Player } from '../game/types'
import { Avatar } from '../ui/Avatar'

const LINES = [
  'Có tiếng bước chân ngoài rìa làng…',
  'Mây trôi qua che khuất mặt trăng…',
  'Ai đó đang thì thầm sau cánh cửa…',
  'Ngọn đèn cuối cùng vừa tắt.',
  'Bóng tối dày lên trong từng con ngõ.',
]

const STEP_LABEL: Record<NightStep, string> = {
  cupid: 'Thần Tình Yêu se duyên',
  guard: 'Bảo Vệ thức dậy',
  wolves: 'Bầy Sói thức dậy',
  whitewolf: 'Sói Trắng trở mình',
  wolfwitch: 'Sói Phù Thuỷ mở bình độc',
  seer: 'Tiên Tri soi sáng',
  girl: 'Cô Bé nhìn trộm',
  witch: 'Phù Thuỷ chọn thuốc',
  piper: 'Người Thổi Sáo cất tiếng',
  killer: 'Sát Nhân rời khỏi nhà',
}

interface Props {
  meta: Meta
  players: Player[]
  done: number
  total: number
}

export function NightView({ meta, players, done, total }: Props) {
  const intro = meta.stepIndex < 0
  const finishing = meta.stepIndex >= meta.steps.length
  const line = intro
    ? 'Cả làng chìm vào giấc ngủ.'
    : finishing
      ? 'Bầu trời bắt đầu sáng…'
      : LINES[meta.stepIndex % LINES.length]

  const alive = players.filter((p) => p.alive)

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-8 pb-24">
      <Forest className="h-[30vh] opacity-90" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${meta.round}-${meta.stepIndex}`}
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <p className="eyebrow mb-5">Đêm thứ {meta.round}</p>
            {!intro && !finishing && (
              <p className="mb-4 text-[0.7rem] tracking-[0.22em] text-violet-soft/80 uppercase">
                {STEP_LABEL[meta.steps[meta.stepIndex]]}
                {meta.steps[meta.stepIndex] === 'wolves' && meta.rage && (
                  <span className="ml-2 text-blood-soft">· nổi điên: cắn 2 người</span>
                )}
              </p>
            )}
            <h1 className="display max-w-[18ch] text-[clamp(2.6rem,6.4vw,4.6rem)] text-glow">
              <span className="grad-moon">{line}</span>
            </h1>

            {!intro && !finishing && (
              <div className="mt-7 flex items-center gap-2 text-[0.72rem] tracking-[0.18em] text-mute uppercase">
                <span className="h-1 w-1 animate-pulse rounded-full bg-violet" />
                {done}/{total} hành động
              </div>
            )}

            <div className="mt-9 flex items-center gap-2.5">
              {meta.steps.map((s, i) => (
                <span
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === meta.stepIndex
                      ? 'w-8 bg-violet'
                      : i < meta.stepIndex
                        ? 'w-1.5 bg-violet/50'
                        : 'w-1.5 bg-white/15'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10">
          <Timer endsAt={meta.stepEndsAt} total={meta.config.stepSeconds * 1000} size={58} tone="moon" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/6 bg-night-950/50 px-8 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="text-[0.62rem] tracking-[0.28em] text-mute uppercase">Còn sống</span>
          <div className="flex items-center gap-1.5">
            {alive.slice(0, 18).map((p) => (
              <div key={p.uid} className="opacity-70">
                <Avatar index={p.avatar} size={24} name={p.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
