import { useMemo, useState } from 'react'
import { MacSound } from '../MacAudio'
import { usePack } from '../pack'
import { CASE_PUZZLES, type CasePuzzle } from '../puzzles'
import { PuzzleModal } from './PuzzleModal'

const TAG_CONFIG: Record<string, { label: string; icon: string; badgeClass: string }> = {
  chat: { label: 'Tin nhắn & Lời khai', icon: '💬', badgeClass: 'bg-blue-50 text-blue-700 border-blue-200' },
  web: { label: 'Dữ liệu web & Mạng', icon: '🌐', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  photo: { label: 'Hình ảnh & Hiện trường', icon: '📸', badgeClass: 'bg-purple-50 text-purple-700 border-purple-200' },
  file: { label: 'Tài liệu hồ sơ', icon: '🗂️', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' },
}

interface Props {
  found: Set<string>
  onFindClue?: (clueId: string) => void
}

export function NotesApp({ found, onFindClue }: Props) {
  const pack = usePack()
  const { clues: CLUES, case: CASE_META } = pack
  const [activeMainTab, setActiveMainTab] = useState<'clues' | 'puzzles'>('clues')
  const [filterTag, setFilterTag] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [starredClues, setStarredClues] = useState<Set<string>>(() => new Set())
  const [personalNote, setPersonalNote] = useState('')
  const [activePuzzle, setActivePuzzle] = useState<CasePuzzle | null>(null)

  const list = Array.from(found).filter((id) => CLUES[id])
  const totalClues = Object.keys(CLUES).length
  const progressPercent = Math.round((list.length / Math.max(1, totalClues)) * 100)

  // Puzzles for this case
  const puzzles = useMemo(() => CASE_PUZZLES[pack.id] || [], [pack.id])
  const solvedPuzzlesCount = puzzles.filter((p) => found.has(p.clueId)).length

  // Filtered clues
  const filteredList = useMemo(() => {
    return list.filter((cid) => {
      const c = CLUES[cid]
      if (!c) return false
      if (filterTag !== 'all' && c.tag !== filterTag) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return c.title.toLowerCase().includes(q) || c.detail.toLowerCase().includes(q)
      }
      return true
    })
  }, [list, CLUES, filterTag, searchQuery])

  const toggleStar = (cid: string) => {
    MacSound.click()
    setStarredClues((prev) => {
      const next = new Set(prev)
      if (next.has(cid)) next.delete(cid)
      else next.add(cid)
      return next
    })
  }

  // Count by tag
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { all: list.length, chat: 0, web: 0, photo: 0, file: 0 }
    list.forEach((cid) => {
      const tag = CLUES[cid]?.tag
      if (tag && counts[tag] !== undefined) counts[tag]++
    })
    return counts
  }, [list, CLUES])

  return (
    <div className="flex h-full flex-col bg-[#fbfbfa] text-[#1d1d1f] font-['Be_Vietnam_Pro'] select-text relative">
      {/* Sổ tay Header */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📓</span>
              <h2 className="text-[14px] font-bold text-slate-900 tracking-tight">Sổ Tay Điều Tra</h2>
              <span className="text-[11px] font-medium text-slate-400">· {CASE_META.no}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate max-w-sm">
              {CASE_META.title}
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 self-start sm:self-auto">
            <div className="w-24 sm:w-28 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap">
              {list.length}/{totalClues} manh mối ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Main View Tabs Switcher (Clues vs Puzzles) */}
        <div className="mt-3 flex items-center gap-2 border-b border-slate-100 pb-2">
          <button
            type="button"
            onClick={() => {
              MacSound.click()
              setActiveMainTab('clues')
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[12px] font-bold transition-all ${
              activeMainTab === 'clues'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>📋</span>
            <span>Bằng chứng đã thu thập ({list.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              MacSound.click()
              setActiveMainTab('puzzles')
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[12px] font-bold transition-all relative ${
              activeMainTab === 'puzzles'
                ? 'bg-amber-500 text-slate-950 shadow-2xs font-extrabold'
                : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200/80'
            }`}
          >
            <span>🧩</span>
            <span>Câu đố trinh thám</span>
            <span className="rounded-full bg-amber-600 px-1.5 py-0.2 text-[10px] font-black text-white">
              {solvedPuzzlesCount}/{puzzles.length}
            </span>
            {solvedPuzzlesCount < puzzles.length && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
            )}
          </button>
        </div>

        {/* Search & Categories Bar (Only in Clues tab) */}
        {activeMainTab === 'clues' && (
          <div className="mt-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm nội dung bằng chứng trong sổ..."
                className="w-full rounded-xl bg-slate-100 border border-transparent px-3 py-1.5 pl-8 text-[12px] text-slate-800 outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/15 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => {
                  MacSound.click()
                  setFilterTag('all')
                }}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all whitespace-nowrap ${
                  filterTag === 'all'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tất cả ({tagCounts.all})
              </button>
              {(['chat', 'web', 'photo', 'file'] as const).map((tagKey) => {
                const cfg = TAG_CONFIG[tagKey]
                const count = tagCounts[tagKey] ?? 0
                return (
                  <button
                    key={tagKey}
                    type="button"
                    onClick={() => {
                      MacSound.click()
                      setFilterTag(tagKey)
                    }}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
                      filterTag === tagKey
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{cfg.icon}</span>
                    <span className="hidden md:inline">{cfg.label}</span>
                    <span>({count})</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sổ tay Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-4 touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
        {activeMainTab === 'puzzles' ? (
          /* ================= PUZZLES VIEW ================= */
          <div className="space-y-3.5">
            <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-3.5 shadow-2xs">
              <h3 className="text-[13px] font-bold text-amber-950 flex items-center gap-2">
                <span>🧩</span>
                <span>Thử thách giải mã trinh thám ({solvedPuzzlesCount}/{puzzles.length} hoàn thành)</span>
              </h3>
              <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                Giải thành công các câu đố logic, mã hoá và trật tự thời gian dưới đây để trực tiếp mở khóa các bằng chứng cốt lõi của vụ án!
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {puzzles.map((puz) => {
                const isSolved = found.has(puz.clueId)
                return (
                  <div
                    key={puz.id}
                    onClick={() => {
                      MacSound.click()
                      setActivePuzzle(puz)
                    }}
                    className={`group cursor-pointer rounded-2xl border p-4 transition-all bg-white shadow-2xs hover:shadow-md hover:-translate-y-0.5 ${
                      isSolved
                        ? 'border-emerald-300 bg-emerald-50/30'
                        : 'border-amber-300/80 hover:border-amber-500 hover:ring-2 hover:ring-amber-400/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-100 border border-amber-200 text-xl shadow-2xs group-hover:scale-105 transition-transform">
                          {puz.icon}
                        </span>
                        <div>
                          <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                            {puz.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">Mã câu đố: #{puz.id}</span>
                        </div>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border shrink-0 ${
                          isSolved
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                        }`}
                      >
                        {isSolved ? '✓ ĐÃ GIẢI' : '🔓 BẤM ĐỂ GIẢI'}
                      </span>
                    </div>

                    <p className="mt-2.5 text-[12px] text-slate-600 line-clamp-2 leading-relaxed">
                      {puz.brief}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium flex items-center gap-1">
                        <span>🎯</span>
                        <span>Phần thưởng:</span>
                      </span>
                      <span className="font-bold text-blue-700 truncate max-w-[60%]">
                        {puz.clueTitle}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          /* ================= CLUES VIEW ================= */
          <>
            {list.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-3xl bg-slate-100 border border-slate-200 text-3xl shadow-2xs mb-3">
                  📝
                </span>
                <h3 className="text-[14px] font-bold text-slate-800">Sổ tay hiện đang trống</h3>
                <p className="mt-1 max-w-sm text-[12px] text-slate-500 leading-relaxed">
                  Hãy mở ứng dụng <strong>Zola</strong> để đọc tin nhắn khai báo, giải các <strong>Câu đố trinh thám</strong> hoặc tra cứu trên <strong>Cộc Cộc</strong> để thu thập chứng cứ đầu tiên.
                </p>
              </div>
            ) : filteredList.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-[12px]">
                Không tìm thấy manh mối nào phù hợp với bộ lọc hiện tại.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredList.map((cid) => {
                  const c = CLUES[cid]
                  if (!c) return null
                  const isStarred = starredClues.has(cid)
                  const cfg = TAG_CONFIG[c.tag] || {
                    label: 'Khác',
                    icon: '📌',
                    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
                  }

                  return (
                    <div
                      key={cid}
                      className={`group relative rounded-2xl border p-3.5 transition-all bg-white shadow-2xs hover:shadow-md ${
                        isStarred ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold border ${cfg.badgeClass}`}>
                            <span>{cfg.icon}</span>
                            <span>{cfg.label}</span>
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleStar(cid)}
                          className={`grid h-7 w-7 place-items-center rounded-lg transition-colors ${
                            isStarred
                              ? 'text-amber-500 hover:text-amber-600'
                              : 'text-slate-300 hover:text-amber-400 hover:bg-slate-100'
                          }`}
                          title={isStarred ? 'Bỏ đánh dấu quan trọng' : 'Đánh dấu bằng chứng quan trọng'}
                        >
                          <span className="text-sm">{isStarred ? '★' : '☆'}</span>
                        </button>
                      </div>

                      {/* Title & Detail */}
                      <h4 className="mt-2 text-[13px] font-bold text-slate-900 tracking-tight leading-snug">
                        {c.title}
                      </h4>
                      <p className="mt-1.5 text-[12px] text-slate-600 leading-relaxed">
                        {c.detail}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Detective Personal Thought Note */}
            {list.length > 0 && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5 space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>✍️</span> Ghi chú nhận định cá nhân của bạn:
                  </p>
                  <span className="text-[10px] text-amber-700/80">Tự do ghi chép suy đoán</span>
                </div>
                <textarea
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  placeholder="Gõ suy luận của bạn tại đây... (VD: Đối chiếu giờ ngắt điện 21:10 với họng rác lúc 21:18...)"
                  rows={2}
                  className="w-full rounded-xl bg-white/90 border border-amber-200/80 p-2.5 text-[12px] text-slate-800 outline-none focus:border-amber-500 focus:bg-white resize-none leading-relaxed placeholder:text-slate-400"
                />
              </div>
            )}

            {/* Footer Warning / Rule */}
            <div className="rounded-xl border border-slate-200/80 bg-slate-100/70 p-3 text-[11px] text-slate-500 leading-relaxed">
              <p className="font-semibold text-slate-700 flex items-center gap-1">
                <span>⚖️</span> Nguyên tắc phá án:
              </p>
              <p className="mt-0.5">
                Hãy tự mình đối chiếu các mâu thuẫn thời gian, lời khai và hiện trường để tìm ra kẻ nói dối. Khi đã chắc chắn 100%, hãy mở ứng dụng <strong>Hồ sơ</strong> để tiến hành cáo buộc hung thủ.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Active Puzzle Modal */}
      {activePuzzle && (
        <PuzzleModal
          puzzle={activePuzzle}
          isSolved={found.has(activePuzzle.clueId)}
          onClose={() => setActivePuzzle(null)}
          onSolve={(p) => {
            onFindClue?.(p.clueId)
          }}
        />
      )}
    </div>
  )
}
