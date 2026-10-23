import { motion } from 'framer-motion'
import { Avatar } from '../ui/Avatar'
import { Timer } from '../ui/Timer'
import { Forest } from '../ui/Forest'
import { roleDef } from '../game/roles'
import { tallyVotes } from '../game/engine'
import type { Meta, Player, RoleId } from '../game/types'

/* ------------------------------------------------------------------- dawn */

export function DawnView({ meta, players }: { meta: Meta; players: Player[] }) {
  const dead = meta.lastDeaths.map((uid) => players.find((p) => p.uid === uid)).filter(Boolean) as Player[]
  const calm = dead.length === 0

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-8 pb-28">
      <Forest className="h-[24vh] opacity-70" />
      <div className="relative z-10 w-full max-w-3xl text-center">
        <p className="eyebrow mb-5">Bình minh · Đêm thứ {meta.round}</p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="display text-[clamp(2.3rem,5.6vw,4.2rem)]"
        >
          {calm ? (
            <span className="grad-moon">Một đêm yên bình.</span>
          ) : (
            <span className="grad-blood">
              {dead.length === 1 ? 'Một người đã ra đi.' : `${dead.length} người đã ra đi.`}
            </span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-parchment/55"
        >
          {calm
            ? 'Không ai bị cắn đêm qua — hoặc ai đó đã được cứu. Đừng vội thở phào.'
            : 'Cả làng tụ tập quanh những gì còn lại. Vai của họ sẽ được giữ kín.'}
        </motion.p>

        {!calm && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {dead.map((p, i) => (
              <motion.div
                key={p.uid}
                initial={{ opacity: 0, y: 26, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.28, type: 'spring', stiffness: 180, damping: 20 }}
                className="glass flex w-[190px] flex-col items-center rounded-3xl px-5 py-6"
              >
                <Avatar index={p.avatar} size={62} name={p.name} dead />
                <p className="mt-4 text-base font-semibold text-parchment/90">{p.name}</p>
                <p className="mt-1 text-[0.62rem] tracking-[0.22em] text-blood-soft/80 uppercase">
                  không tỉnh dậy
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- discuss */

export function DiscussView({ meta, players }: { meta: Meta; players: Player[] }) {
  const alive = players.filter((p) => p.alive)
  const recentlyLost = meta.lastDeaths
    .map((uid) => players.find((p) => p.uid === uid))
    .filter(Boolean) as Player[]

  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-8 py-10">
      <div className="flex flex-col items-center text-center">
        <p className="eyebrow mb-4">Thảo luận</p>
        <h1 className="display text-[clamp(2.2rem,5vw,3.6rem)] text-parchment">
          Ai đang <span className="grad-blood italic">nói dối</span>?
        </h1>
        <p className="mt-3 text-sm text-parchment/55">
          Nói to lên. Buộc tội. Bảo vệ. Màn hình chỉ kể lại — còn lại là của các bạn.
        </p>
      </div>

      <div className="mt-9 flex justify-center">
        <Timer
          endsAt={meta.phaseEndsAt}
          total={meta.config.discussSeconds * 1000}
          size={140}
          tone="moon"
          label="còn lại"
        />
      </div>

      <div className="mt-9 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {alive.map((p) => (
          <motion.div
            key={p.uid}
            layout
            className="flex flex-col items-center rounded-2xl border border-white/7 bg-white/[0.025] px-2 py-4"
          >
            <Avatar index={p.avatar} size={52} name={p.name} />
            <p className="mt-2.5 max-w-full truncate text-[0.76rem] text-parchment/80">{p.name}</p>
          </motion.div>
        ))}
      </div>

      {recentlyLost.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2 text-[0.68rem] text-mute">
          <span className="tracking-[0.2em] uppercase">Đã mất</span>
          {recentlyLost.map((p) => (
            <span key={p.uid} className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1">
              <Avatar index={p.avatar} size={16} dead />
              {p.name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------- vote */

export function VoteView({
  meta,
  players,
  votes,
}: {
  meta: Meta
  players: Player[]
  votes: Record<string, string>
}) {
  const alive = players.filter((p) => p.alive)
  const tally = tallyVotes(votes, alive.map((p) => p.uid))
  const secret = meta.config.secretVote
  const max = Math.max(1, tally.top)
  const leaderId = tally.leaders.length === 1 ? tally.leaders[0] : null

  const votersOf = (uid: string) =>
    alive.filter((p) => votes[p.uid] === uid)

  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-8 py-10">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow mb-3">Bỏ phiếu · Vòng {meta.round}</p>
          <h1 className="display text-[clamp(2rem,4.4vw,3.2rem)]">Ai sẽ bị treo cổ?</h1>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Timer endsAt={meta.phaseEndsAt} total={meta.config.voteSeconds * 1000} size={84} tone="blood" />
          <span className="text-[0.66rem] text-mute">
            {tally.voted}/{alive.length} đã bỏ phiếu
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {alive.map((p) => {
          const count = secret ? 0 : (tally.counts[p.uid] ?? 0)
          const pct = secret ? 0 : (count / max) * 100
          const isLeader = !secret && p.uid === leaderId && count > 0
          return (
            <motion.div
              key={p.uid}
              layout
              className="relative overflow-hidden rounded-2xl border px-4 py-3.5 transition-colors"
              style={{
                borderColor: isLeader ? 'rgba(224,67,58,0.55)' : 'rgba(255,255,255,0.08)',
                background: isLeader ? 'rgba(224,67,58,0.09)' : 'rgba(255,255,255,0.025)',
              }}
            >
              <div
                className="absolute inset-y-0 left-0 -z-0 transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background: isLeader
                    ? 'linear-gradient(90deg, rgba(224,67,58,0.28), rgba(224,67,58,0.05))'
                    : 'linear-gradient(90deg, rgba(125,109,255,0.22), rgba(125,109,255,0.04))',
                }}
              />
              <div className="relative flex items-center gap-3">
                <Avatar index={p.avatar} size={40} name={p.name} ring={isLeader} />
                <p className="flex-1 truncate text-sm font-medium text-parchment/90">{p.name}</p>
                {!secret && (
                  <>
                    <div className="flex -space-x-1.5">
                      {votersOf(p.uid).slice(0, 4).map((v) => (
                        <Avatar key={v.uid} index={v.avatar} size={18} />
                      ))}
                    </div>
                    <span
                      className="tabular w-7 text-right text-lg font-semibold"
                      style={{ color: count ? '#ff8f83' : 'rgba(141,136,168,0.55)' }}
                    >
                      {count}
                    </span>
                  </>
                )}
                {secret && <span className="text-lg">🗳️</span>}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-between text-[0.72rem] text-mute">
        <span>
          {secret
            ? 'Bỏ phiếu kín — kết quả chỉ hiện khi hết giờ.'
            : 'Cả làng bỏ phiếu trên điện thoại của mình.'}
        </span>
        {!secret && tally.skip > 0 && (
          <span className="rounded-full bg-white/5 px-3 py-1">
            {tally.skip} phiếu bỏ qua
          </span>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- verdict */

export function VerdictView({ meta, players }: { meta: Meta; players: Player[] }) {
  const lynched = meta.lastLynch ? players.find((p) => p.uid === meta.lastLynch) : null
  const hidden = meta.config.hideRoleOnDeath
  const def = !hidden && meta.lastLynchRole ? roleDef(meta.lastLynchRole as RoleId) : null

  if (!lynched) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-8 text-center">
        <p className="eyebrow mb-5">Phán quyết</p>
        <h1 className="display text-[clamp(2.2rem,5vw,3.6rem)] text-parchment/85">Không ai bị treo cổ.</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-parchment/50">
          Lá phiếu chia đều — hoặc cả làng chọn cách im lặng. Đêm nay sẽ dài hơn.
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-8 text-center">
      <p className="eyebrow mb-5">Phán quyết</p>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        className="flex flex-col items-center"
      >
        <Avatar index={lynched.avatar} size={92} name={lynched.name} dead={!meta.lynchBlocked} />
        <h1 className="display mt-6 text-[clamp(2.2rem,5vw,3.6rem)]">
          <span className="text-parchment/90">{lynched.name}</span>
        </h1>
        <p className="mt-1 text-sm text-mute">
          {meta.lynchBlocked ? 'đã bị treo cổ — nhưng vẫn sống sót' : 'đã bị treo cổ'}
        </p>

        {def && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-7 flex items-center gap-3 rounded-full border px-6 py-3"
            style={{
              borderColor: `${def.accent}55`,
              background: `${def.accent}12`,
              boxShadow: `0 16px 50px -24px ${def.glow}`,
            }}
          >
            <span className="text-2xl">{def.icon}</span>
            <span className="text-sm font-semibold" style={{ color: def.accent }}>
              {def.name}
            </span>
            <span className="text-[0.66rem] tracking-[0.2em] text-mute uppercase">
              {def.team === 'wolf' ? 'phe sói' : def.team === 'solo' ? 'phe thứ ba' : 'phe dân'}
            </span>
          </motion.div>
        )}

        {hidden && !meta.lynchBlocked && (
          <p className="mt-6 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2 text-[0.7rem] tracking-[0.16em] text-mute uppercase">
            Vai được giữ kín
          </p>
        )}

        {meta.lynchBlocked && (
          <p className="mt-5 max-w-md text-[0.78rem] leading-relaxed text-amber/90">
            Chàng Ngốc thoát khỏi giá treo lần đầu. Lần sau, cả làng sẽ không tha.
          </p>
        )}

        {meta.winReason === 'jester' && (
          <p className="mt-5 text-sm font-semibold text-amber">Kẻ Chán Đời đã đạt được điều mình muốn — ván đấu kết thúc.</p>
        )}

        {meta.lastDeaths.length > 1 && (
          <p className="mt-5 max-w-md text-[0.78rem] leading-relaxed text-blood-soft/85">
            Chết theo vì đau lòng:{' '}
            {meta.lastDeaths
              .filter((uid) => uid !== meta.lastLynch)
              .map((uid) => players.find((p) => p.uid === uid)?.name)
              .filter(Boolean)
              .join(', ')}
          </p>
        )}
      </motion.div>
    </div>
  )
}

/* ----------------------------------------------------------------- hunter */

export function HunterView({ meta, players }: { meta: Meta; players: Player[] }) {
  const hunter = players.find((p) => p.uid === meta.hunterShooter)
  const victim = meta.hunterVictim ? players.find((p) => p.uid === meta.hunterVictim) : null
  const resolved = Boolean(meta.hunterVictim) || meta.hunterDone

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-8 text-center">
      <p className="eyebrow mb-5">Phát súng cuối</p>
      <h1 className="display max-w-[20ch] text-[clamp(2rem,4.6vw,3.2rem)]">
        <span className="grad-blood">Thợ săn</span> <span className="text-parchment/85">đã ngã xuống.</span>
      </h1>

      {hunter && (
        <div className="mt-6 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5">
          <Avatar index={hunter.avatar} size={30} dead />
          <span className="text-sm text-parchment/75">{hunter.name}</span>
        </div>
      )}

      <div className="mt-8 min-h-[150px]">
        {!resolved ? (
          <motion.p
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ repeat: Infinity, duration: 2.4 }}
            className="text-sm tracking-[0.25em] text-mute uppercase"
          >
            đang giương nỏ…
          </motion.p>
        ) : victim ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 170, damping: 18 }}
            className="flex flex-col items-center"
          >
            <p className="mb-4 text-sm text-parchment/55">…và kịp bắn hạ</p>
            <Avatar index={victim.avatar} size={72} dead />
            <p className="mt-3 text-lg font-semibold text-parchment/90">{victim.name}</p>
          </motion.div>
        ) : (
          <p className="text-sm text-parchment/55">…nhưng cây nỏ đã lệch. Không ai trúng.</p>
        )}
      </div>
    </div>
  )
}
