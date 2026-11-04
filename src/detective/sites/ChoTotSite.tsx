import { useState } from 'react'
import { MacSound } from '../MacAudio'
import { getChoTotListings } from '../caseSites'

interface Props {
  caseId: string
  found: Set<string>
  onPin: (clueId?: string, label?: string) => void
}

export function ChoTotSite({ caseId, found, onPin }: Props) {
  const listings = getChoTotListings(caseId)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  // Trạng thái đối soát IMEI Chợ Tốt
  const [unlockedListings, setUnlockedListings] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(`tboy.detective.unlockedListings.${caseId}`)
      return raw ? new Set(JSON.parse(raw)) : new Set<string>()
    } catch {
      return new Set<string>()
    }
  })
  const [inputCodes, setInputCodes] = useState<Record<string, string>>({})
  const [errorMsgs, setErrorMsgs] = useState<Record<string, string>>({})
  const [activeHints, setActiveHints] = useState<Record<string, boolean>>({})

  const handleVerifyImei = (listingId: string, codes?: string[]) => {
    if (!codes || codes.length === 0) return
    const inputVal = (inputCodes[listingId] || '').trim().toLowerCase().replace(/\s+/g, '')

    if (!inputVal) {
      setErrorMsgs((prev) => ({ ...prev, [listingId]: 'Vui lòng nhập số ngăn tủ để đối soát!' }))
      return
    }

    const matched = codes.some((c) => {
      const clean = c.trim().toLowerCase().replace(/\s+/g, '')
      return clean === inputVal || inputVal.includes(clean) || clean.includes(inputVal)
    })

    if (matched) {
      MacSound.confrontSuccess()
      const nextSet = new Set(unlockedListings)
      nextSet.add(listingId)
      setUnlockedListings(nextSet)
      try {
        localStorage.setItem(`tboy.detective.unlockedListings.${caseId}`, JSON.stringify(Array.from(nextSet)))
      } catch {
        // ignore
      }
      setErrorMsgs((prev) => ({ ...prev, [listingId]: '' }))
    } else {
      MacSound.confrontFail()
      setErrorMsgs((prev) => ({
        ...prev,
        [listingId]: '❌ Số ngăn tủ không đúng! Hãy xem lại biên bản khám nghiệm hiện trường.',
      }))
    }
  }

  const filtered = listings.filter((item) => {
    const matchSearch =
      !search ||
      `${item.title} ${item.seller} ${item.location} ${item.desc}`.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'all' || item.category.toLowerCase().includes(category.toLowerCase())
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-full bg-[#f4f4f4] text-slate-900 pb-12 font-['Be_Vietnam_Pro'] select-none">
      {/* Header Chợ Tốt Vàng Cam Đặc Trưng */}
      <div className="bg-[#ffba00] px-4 py-3 shadow-sm border-b border-amber-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-[#1d1d1f] bg-white px-2 py-0.5 rounded-lg shadow-2xs">
              chợ TỐT
            </span>
            <span className="text-[11px] font-bold text-amber-950 hidden sm:inline">Rao vặt 24/7 toàn quốc</span>
          </div>

          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm iPhone, vợt cầu lông, đồ cũ..."
              className="w-full rounded-full bg-white px-4 py-2 pl-9 text-[12px] text-slate-800 outline-none shadow-inner border border-transparent focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
          </div>

          <button
            type="button"
            onClick={() => MacSound.click()}
            className="rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-[11px] px-3.5 py-1.5 shadow-sm transition-colors whitespace-nowrap"
          >
            + Đăng tin
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-5 space-y-4">
        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-[12px] font-bold text-slate-700">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`px-3 py-1 rounded-full border transition-all ${
              category === 'all' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border-slate-300 hover:bg-slate-50'
            }`}
          >
            Tất cả danh mục
          </button>
          <button
            type="button"
            onClick={() => setCategory('Điện thoại')}
            className={`px-3 py-1 rounded-full border transition-all ${
              category === 'Điện thoại' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border-slate-300 hover:bg-slate-50'
            }`}
          >
            📱 Điện thoại di động
          </button>
          <button
            type="button"
            onClick={() => setCategory('thể thao')}
            className={`px-3 py-1 rounded-full border transition-all ${
              category === 'thể thao' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border-slate-300 hover:bg-slate-50'
            }`}
          >
            🏸 Đồ thể thao
          </button>
        </div>

        {/* Listings Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[12px] text-slate-500 px-1">
            <span>Hiển thị {filtered.length} tin rao vặt gần khu vực Sân Cầu Lông:</span>
            <span>Mới đăng gần đây</span>
          </div>

          {filtered.map((item) => {
            const isFound = item.clueId ? found.has(item.clueId) : false
            const isLocked = Boolean(item.locked && !unlockedListings.has(item.id))

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col gap-3 ${
                  isLocked ? 'border-amber-400 bg-amber-50/20' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="flex gap-3.5 flex-1 min-w-0">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200 relative shadow-2xs">
                      {item.img ? (
                        <img
                          src={`${import.meta.env.BASE_URL}${item.img}`}
                          alt={item.title}
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-3xl">
                          {item.title.toLowerCase().includes('iphone') ? '📱' : item.title.toLowerCase().includes('xe') ? '🛵' : '🏸'}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="text-[13px] font-bold text-slate-900 leading-snug hover:text-orange-600 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[15px] font-black text-red-600">{item.price}</p>
                      <p className="text-[12px] text-slate-600 line-clamp-2 font-normal">{item.desc}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-400 pt-1">
                        <span>👤 Người bán: {item.seller}</span>
                        <span>📍 {item.location}</span>
                        <span>🕒 {item.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between shrink-0 gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className="text-[10px] font-mono font-semibold text-slate-400">{item.id}</span>
                    {isLocked ? (
                      <button
                        type="button"
                        disabled
                        className="flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[11px] font-bold border border-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed"
                      >
                        <span>🔒</span>
                        <span>Cần đối soát tang vật</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onPin(item.clueId, item.clueLabel || `Tin Chợ Tốt: ${item.title}`)}
                        className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[11px] font-bold border transition-all ${
                          isFound
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400 shadow-2xs'
                        }`}
                        title="Trích xuất tin đăng vào Sổ vụ án"
                      >
                        <span>{isFound ? '📌' : '📋'}</span>
                        <span>{isFound ? 'Đã lưu ghi chép' : 'Trích xuất tin'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* KHUNG ĐỐI SOÁT SERIAL / IMEI CHỐNG TRỘM RIÊNG CỦA CHỢ TỐT */}
                {isLocked ? (
                  <div className="rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-50 to-orange-50 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🛡️</span>
                      <div>
                        <h4 className="text-[12px] font-bold text-amber-950 uppercase tracking-wide">
                          Hệ thống Chợ Tốt: Đối soát tang vật mất cắp
                        </h4>
                        <p className="text-[10px] text-amber-800">
                          Tin rao bán máy giá rẻ đáng ngờ. Cần đối soát số tủ cá nhân bị cạy để xác nhận số Serial chống trộm.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/90 p-3 rounded-xl border border-amber-200 text-[11px] text-slate-700 leading-relaxed font-sans">
                      <p className="font-bold text-amber-800 mb-0.5">Nhiệm vụ điều tra:</p>
                      <p>{item.lockPrompt}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={inputCodes[item.id] || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            setInputCodes((prev) => ({ ...prev, [item.id]: val }))
                            setErrorMsgs((prev) => ({ ...prev, [item.id]: '' }))
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleVerifyImei(item.id, item.lockCodes)
                          }}
                          placeholder="Nhập số ngăn tủ bị cạy (VD: 04)..."
                          className="flex-1 rounded-xl bg-white border border-amber-300 px-3.5 py-2 text-[12px] font-mono text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 shadow-inner"
                        />
                        <button
                          type="button"
                          onClick={() => handleVerifyImei(item.id, item.lockCodes)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] shadow-sm active:scale-95 transition-all shrink-0"
                        >
                          Đối soát Serial
                        </button>
                      </div>

                      {errorMsgs[item.id] && (
                        <p className="text-[11px] font-semibold text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                          {errorMsgs[item.id]}
                        </p>
                      )}

                      {item.lockHint && (
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              MacSound.click()
                              setActiveHints((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                            }}
                            className="text-[10px] text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1"
                          >
                            <span>💡</span>
                            <span>{activeHints[item.id] ? 'Ẩn gợi ý' : 'Gợi ý nơi tìm số ngăn tủ?'}</span>
                          </button>
                          {activeHints[item.id] && (
                            <p className="mt-1 text-[10px] text-slate-600 bg-white/80 p-2 rounded-lg border border-amber-200 italic">
                              {item.lockHint}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  item.locked && (
                    <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl flex items-center gap-2">
                      <span className="text-emerald-600 text-base">✅</span>
                      <p className="text-[11px] text-emerald-800 font-semibold leading-relaxed">
                        ĐỐI SOÁT THÀNH CÔNG: Serial máy trùng khớp 100% với hộp iPhone trong ngăn tủ 04 của Hào! Bài đăng phát tán từ địa chỉ IP Wi-Fi bãi xe CLB (118.70.192.44) lúc 20:44!
                      </p>
                    </div>
                  )
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
