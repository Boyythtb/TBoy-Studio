import { useState } from 'react'
import { MacSound } from '../MacAudio'
import { getCaseProfiles } from '../caseSites'

interface Props {
  caseId: string
  currentUrl: string
  found: Set<string>
  onNavigate: (url: string) => void
  onPin: (clueId?: string, label?: string) => void
  onToast: (toast: { text: string; success: boolean }) => void
}

export function FacebucSite({ caseId, currentUrl, found, onNavigate, onPin, onToast }: Props) {
  const profiles = getCaseProfiles(caseId)
  const [fbSearchQuery, setFbSearchQuery] = useState('')

  const urlSlug = currentUrl.includes('facebuc.vn/')
    ? currentUrl.split('facebuc.vn/')[1]?.split('/')[0]?.split('?')[0]
    : ''
  const activeProfile = (urlSlug ? profiles.find((p) => p.slug === urlSlug || p.id === urlSlug) : null) || profiles[0]

  return (
    <div className="min-h-full bg-[#f0f2f5] text-slate-900 pb-10 font-['Be_Vietnam_Pro'] select-none">
      {/* Facebook Top Navigation Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between h-14 bg-white border-b border-slate-200 px-4 shadow-xs select-none">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('https://facebuc.vn')}
            className="grid h-10 w-10 place-items-center rounded-full bg-[#1877F2] text-white font-black text-2xl shadow-sm hover:brightness-105 active:scale-95 transition-all"
            title="Trang chủ Facebúc"
          >
            f
          </button>
          <div className="relative">
            <div className="flex items-center rounded-full bg-[#f0f2f5] px-3.5 py-2 pl-9 text-[12px] border border-transparent focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition-all w-52 sm:w-72">
              <input
                type="text"
                value={fbSearchQuery}
                onChange={(e) => setFbSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const q = fbSearchQuery.trim().toLowerCase()
                    const m = profiles.find((p) => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q))
                    if (m) {
                      setFbSearchQuery('')
                      onNavigate(`https://facebuc.vn/${m.slug}`)
                    }
                  }
                }}
                placeholder="Tìm kiếm bạn bè, nhóm, bài viết..."
                className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-500 text-[12px]"
              />
            </div>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">🔍</span>

            {/* Search Results Dropdown */}
            {fbSearchQuery.trim().length > 0 && (
              <div className="absolute left-0 top-full mt-1.5 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Gợi ý tìm kiếm:</p>
                {profiles.filter(
                  (p) =>
                    p.name.toLowerCase().includes(fbSearchQuery.toLowerCase()) ||
                    p.slug.toLowerCase().includes(fbSearchQuery.toLowerCase()) ||
                    p.bio.toLowerCase().includes(fbSearchQuery.toLowerCase())
                ).length > 0 ? (
                  profiles
                    .filter(
                      (p) =>
                        p.name.toLowerCase().includes(fbSearchQuery.toLowerCase()) ||
                        p.slug.toLowerCase().includes(fbSearchQuery.toLowerCase()) ||
                        p.bio.toLowerCase().includes(fbSearchQuery.toLowerCase())
                    )
                    .map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setFbSearchQuery('')
                          onNavigate(`https://facebuc.vn/${p.slug}`)
                        }}
                        className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 text-left transition-colors group"
                      >
                        <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{p.avatar}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] font-bold text-slate-900 group-hover:text-blue-600 truncate">{p.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">
                            @{p.slug} · {p.role}
                          </p>
                        </div>
                      </button>
                    ))
                ) : (
                  <p className="text-[12px] text-slate-400 p-3 text-center">Không tìm thấy tài khoản phù hợp</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Middle Tab Icons */}
        <div className="hidden md:flex items-center gap-8 text-xl text-slate-500">
          <button
            type="button"
            onClick={() => onNavigate('https://facebuc.vn')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              !currentUrl.includes('facebuc.vn/') || currentUrl === 'https://facebuc.vn'
                ? 'border-[#1877F2] text-[#1877F2]'
                : 'border-transparent hover:bg-slate-100 rounded-lg'
            }`}
            title="Bảng tin"
          >
            🏠
          </button>
          <button
            type="button"
            onClick={() => onToast({ text: 'Mục Video Facebúc Watch', success: false })}
            className="py-3 px-4 border-b-2 border-transparent hover:bg-slate-100 rounded-lg text-slate-500"
            title="Video"
          >
            📺
          </button>
          <button
            type="button"
            onClick={() => onToast({ text: 'Cửa hàng Marketplace', success: false })}
            className="py-3 px-4 border-b-2 border-transparent hover:bg-slate-100 rounded-lg text-slate-500"
            title="Marketplace"
          >
            🏪
          </button>
          <button
            type="button"
            onClick={() => onNavigate('https://facebuc.vn')}
            className="py-3 px-4 border-b-2 border-transparent hover:bg-slate-100 rounded-lg text-slate-500"
            title="Nhóm cộng đồng"
          >
            👥
          </button>
        </div>

        {/* Right Profile & Actions */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-slate-700 hidden sm:inline">Điều tra viên</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-200 text-base shadow-2xs">🕵️</span>
        </div>
      </div>

      {/* Facebook Main Content Layout */}
      <div className="max-w-4xl mx-auto px-3 py-4 flex gap-5">
        {/* Left Sidebar: Chuẩn Menu Facebook */}
        <div className="hidden lg:block w-56 shrink-0 space-y-1 h-fit sticky top-20 select-none">
          <button
            type="button"
            onClick={() => {
              MacSound.click()
              onNavigate('https://facebuc.vn')
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors font-semibold text-[13px] ${
              !currentUrl.includes('facebuc.vn/') || currentUrl === 'https://facebuc.vn'
                ? 'bg-blue-50 text-[#1877F2]'
                : 'text-slate-700 hover:bg-slate-200/60'
            }`}
          >
            <span className="text-xl">🏠</span>
            <span>Bảng tin chính</span>
          </button>

          <button
            type="button"
            onClick={() => {
              MacSound.click()
              onNavigate('https://facebuc.vn')
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors font-semibold text-[13px] text-slate-700 hover:bg-slate-200/60"
          >
            <span className="text-xl">🏛️</span>
            <span>Nhóm khu dân cư</span>
          </button>

          <button
            type="button"
            onClick={() => {
              MacSound.click()
              onToast({ text: 'Danh sách bạn bè & liên hệ', success: false })
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors font-semibold text-[13px] text-slate-700 hover:bg-slate-200/60"
          >
            <span className="text-xl">👥</span>
            <span>Bạn bè</span>
          </button>

          <button
            type="button"
            onClick={() => {
              MacSound.click()
              onToast({ text: 'Kỷ niệm Facebúc hôm nay', success: false })
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors font-semibold text-[13px] text-slate-700 hover:bg-slate-200/60"
          >
            <span className="text-xl">🕒</span>
            <span>Kỷ niệm</span>
          </button>

          <button
            type="button"
            onClick={() => {
              MacSound.click()
              onToast({ text: `Đã lưu ${found.size} manh mối trong Sổ vụ án`, success: true })
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors font-semibold text-[13px] text-slate-700 hover:bg-slate-200/60"
          >
            <span className="text-xl">🔖</span>
            <span>Mục đã lưu</span>
          </button>

          <div className="pt-4 border-t border-slate-200/80 px-3 text-[11px] text-slate-400 space-y-1">
            <p>© 2026 Facebúc Việt Nam</p>
            <p>Quyền riêng tư · Điều khoản · Trợ giúp</p>
          </div>
        </div>

        {/* Center Feed & Profile Pages */}
        <div className="flex-1 min-w-0 space-y-4">
          {urlSlug && activeProfile ? (
            /* TRƯỜNG HỢP 1: TRANG CÁ NHÂN */
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={() => {
                    MacSound.click()
                    onNavigate('https://facebuc.vn')
                  }}
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1877F2] hover:underline"
                >
                  <span>‹</span>
                  <span>Quay lại Bảng tin Facebúc</span>
                </button>
              </div>

              {/* Cover & Avatar Header chuẩn Facebook (Fix lỗi che khuất text) */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div
                  className={`h-40 sm:h-44 bg-gradient-to-r ${
                    activeProfile.coverColor || 'from-blue-600 via-indigo-600 to-slate-900'
                  } relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-2.5 right-3 flex items-center gap-1 rounded-lg bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm select-none">
                    <span>📷</span>
                    <span>Ảnh bìa</span>
                  </div>
                </div>

                <div className="px-6 pb-4 relative z-10">
                  <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-14 gap-3">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                      <div className="relative shrink-0">
                        <span className="grid h-28 w-28 place-items-center rounded-full bg-white border-4 border-white text-5xl shadow-md ring-1 ring-black/5 select-none">
                          {activeProfile.avatar}
                        </span>
                        <span
                          className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-500 shadow-xs"
                          title="Đang trực tuyến"
                        />
                      </div>
                      <div className="mb-2">
                        <h1 className="text-xl font-black text-slate-900 flex items-center gap-1.5 justify-center sm:justify-start">
                          <span>{activeProfile.name}</span>
                          <span className="text-[#1877F2] text-sm" title="Tài khoản đã xác minh">
                            ✓
                          </span>
                        </h1>
                        <p className="text-[12px] text-slate-500 font-medium">
                          @{activeProfile.slug} · {activeProfile.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => MacSound.click()}
                        className="px-3.5 py-1.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 text-white font-bold text-[12px] shadow-2xs flex items-center gap-1.5 transition-colors"
                      >
                        <span>👥</span>
                        <span>Bạn bè</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => MacSound.click()}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[12px] flex items-center gap-1.5 transition-colors"
                      >
                        <span>💬</span>
                        <span>Nhắn tin</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
                    <p className="text-[13px] text-slate-800 leading-relaxed font-normal">{activeProfile.bio}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-slate-500 pt-1">
                      <span>📍 {activeProfile.livesIn}</span>
                      {activeProfile.relationship && <span>❤️ {activeProfile.relationship}</span>}
                    </div>
                  </div>

                  <div className="flex gap-1 mt-4 pt-2 border-t border-slate-100 text-[13px] font-bold text-slate-600 select-none">
                    <button type="button" className="px-3 py-1.5 text-blue-600 border-b-2 border-blue-600">
                      Bài viết
                    </button>
                    <button type="button" onClick={() => MacSound.click()} className="px-3 py-1.5 hover:bg-slate-100 rounded-lg">
                      Giới thiệu
                    </button>
                    <button type="button" onClick={() => MacSound.click()} className="px-3 py-1.5 hover:bg-slate-100 rounded-lg">
                      Bạn bè
                    </button>
                    <button type="button" onClick={() => MacSound.click()} className="px-3 py-1.5 hover:bg-slate-100 rounded-lg">
                      Ảnh
                    </button>
                  </div>
                </div>
              </div>

              {/* Danh sách bài đăng cá nhân */}
              {activeProfile.posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl select-none">{activeProfile.avatar}</span>
                      <div>
                        <p className="text-[13px] font-bold text-slate-900">{activeProfile.name}</p>
                        <p className="text-[11px] text-slate-400">{post.time} · 🌐</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onPin(post.clueId, post.clueLabel)}
                      className="grid h-8 w-8 place-items-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                      title="Tùy chọn bài viết"
                    >
                      <span className="text-base font-bold leading-none">···</span>
                    </button>
                  </div>

                  <p className="text-[13px] text-slate-800 leading-relaxed whitespace-pre-line font-normal">
                    {post.content}
                  </p>

                  {post.img && (
                    <div className="rounded-xl overflow-hidden border border-slate-200 max-h-56 bg-black">
                      <img
                        src={`${import.meta.env.BASE_URL}${post.img}`}
                        alt="Ảnh đính kèm"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 select-none">
                    <span>👍 {post.likes} lượt thích</span>
                    <span>💬 {post.comments.length} bình luận</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-100 text-[12px] font-semibold text-slate-600 select-none">
                    <button
                      type="button"
                      onClick={() => MacSound.click()}
                      className="py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>👍</span>
                      <span>Thích</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => MacSound.click()}
                      className="py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>💬</span>
                      <span>Bình luận</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => MacSound.click()}
                      className="py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>↗</span>
                      <span>Chia sẻ</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onPin(post.clueId, post.clueLabel)}
                      className={`py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors ${
                        post.clueId && found.has(post.clueId) ? 'text-emerald-700 font-bold' : ''
                      }`}
                      title="Lưu vào Sổ ghi chép điều tra"
                    >
                      <span>{post.clueId && found.has(post.clueId) ? '📌' : '🔖'}</span>
                      <span>{post.clueId && found.has(post.clueId) ? 'Đã lưu' : 'Lưu'}</span>
                    </button>
                  </div>

                  {post.comments.length > 0 && (
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      {post.comments.map((cmt) => {
                        const commenterProfile = profiles.find(
                          (p) =>
                            p.name.toLowerCase().includes(cmt.user.toLowerCase()) ||
                            cmt.user.toLowerCase().includes(p.name.toLowerCase())
                        )

                        return (
                          <div key={cmt.id} className="flex gap-2 items-start group/cmt">
                            <button
                              type="button"
                              onClick={() => {
                                if (commenterProfile) {
                                  onNavigate(`https://facebuc.vn/${commenterProfile.slug}`)
                                }
                              }}
                              className={`text-lg mt-0.5 select-none ${commenterProfile ? 'hover:scale-110 cursor-pointer' : ''}`}
                              title={commenterProfile ? `Xem trang cá nhân của ${cmt.user}` : cmt.user}
                            >
                              {cmt.avatar}
                            </button>

                            <div className="flex-1 min-w-0">
                              <div className="bg-[#f0f2f5] rounded-2xl px-3.5 py-2 inline-block max-w-[92%]">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (commenterProfile) {
                                      onNavigate(`https://facebuc.vn/${commenterProfile.slug}`)
                                    }
                                  }}
                                  className={`text-[12px] font-bold text-slate-900 text-left ${
                                    commenterProfile ? 'hover:underline hover:text-blue-600' : ''
                                  }`}
                                >
                                  {cmt.user}
                                </button>
                                <p className="text-[12px] text-slate-800 leading-snug mt-0.5 font-normal">{cmt.content}</p>
                              </div>

                              <div className="flex items-center gap-3 text-[10px] text-slate-400 pl-3 mt-0.5 select-none">
                                <span>{cmt.time}</span>
                                <button
                                  type="button"
                                  onClick={() => MacSound.click()}
                                  className="hover:underline hover:text-slate-600 font-semibold"
                                >
                                  Thích
                                </button>
                                <button
                                  type="button"
                                  onClick={() => MacSound.click()}
                                  className="hover:underline hover:text-slate-600 font-semibold"
                                >
                                  Phản hồi
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onPin(cmt.clueId, cmt.clueLabel)}
                                  className={`hover:underline font-semibold flex items-center gap-0.5 ${
                                    cmt.clueId && found.has(cmt.clueId) ? 'text-emerald-700 font-bold' : 'hover:text-slate-600'
                                  }`}
                                  title="Lưu bình luận vào Sổ ghi chép"
                                >
                                  <span>{cmt.clueId && found.has(cmt.clueId) ? '📌' : '🔖'}</span>
                                  <span>{cmt.clueId && found.has(cmt.clueId) ? 'Đã lưu' : 'Lưu'}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* TRƯỜNG HỢP 2: BẢNG TIN CHÍNH (NEWS FEED) */
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-200 text-lg select-none">🕵️</span>
                <div className="flex-1 bg-[#f0f2f5] rounded-full px-4 py-2 text-[12px] text-slate-500 cursor-not-allowed select-none">
                  Bạn đang nghĩ gì thế, Điều tra viên?
                </div>
              </div>

              {profiles
                .flatMap((p) => p.posts.map((post) => ({ ...post, author: p })))
                .map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onNavigate(`https://facebuc.vn/${item.author.slug}`)}
                        className="flex items-center gap-2.5 text-left group"
                      >
                        <span className="text-2xl select-none group-hover:scale-105 transition-transform">{item.author.avatar}</span>
                        <div>
                          <p className="text-[13px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {item.author.name}
                          </p>
                          <p className="text-[11px] text-slate-400">{item.time} · 🌐</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => onPin(item.clueId, item.clueLabel)}
                        className="grid h-8 w-8 place-items-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                        title="Tùy chọn bài viết"
                      >
                        <span className="text-base font-bold leading-none">···</span>
                      </button>
                    </div>

                    <p className="text-[13px] text-slate-800 leading-relaxed whitespace-pre-line font-normal">{item.content}</p>

                    {item.img && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 max-h-56 bg-black">
                        <img
                          src={`${import.meta.env.BASE_URL}${item.img}`}
                          alt="Ảnh đính kèm"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 select-none">
                      <span>👍 {item.likes} lượt thích</span>
                      <span>💬 {item.comments.length} bình luận</span>
                    </div>

                    <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-100 text-[12px] font-semibold text-slate-600 select-none">
                      <button
                        type="button"
                        onClick={() => MacSound.click()}
                        className="py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>👍</span>
                        <span>Thích</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => MacSound.click()}
                        className="py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>💬</span>
                        <span>Bình luận</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => MacSound.click()}
                        className="py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>↗</span>
                        <span>Chia sẻ</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onPin(item.clueId, item.clueLabel)}
                        className={`py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors ${
                          item.clueId && found.has(item.clueId) ? 'text-emerald-700 font-bold' : ''
                        }`}
                        title="Lưu vào Sổ ghi chép điều tra"
                      >
                        <span>{item.clueId && found.has(item.clueId) ? '📌' : '🔖'}</span>
                        <span>{item.clueId && found.has(item.clueId) ? 'Đã lưu' : 'Lưu'}</span>
                      </button>
                    </div>

                    {item.comments.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        {item.comments.slice(0, 2).map((cmt) => {
                          const commenterProfile = profiles.find(
                            (p) =>
                              p.name.toLowerCase().includes(cmt.user.toLowerCase()) ||
                              cmt.user.toLowerCase().includes(p.name.toLowerCase())
                          )

                          return (
                            <div key={cmt.id} className="flex gap-2 items-start">
                              <button
                                type="button"
                                onClick={() => {
                                  if (commenterProfile) {
                                    onNavigate(`https://facebuc.vn/${commenterProfile.slug}`)
                                  }
                                }}
                                className="text-base mt-0.5"
                                title={cmt.user}
                              >
                                {cmt.avatar}
                              </button>
                              <div className="flex-1 min-w-0">
                                <div className="bg-[#f0f2f5] rounded-xl px-3 py-1.5 inline-block max-w-[92%]">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (commenterProfile) {
                                        onNavigate(`https://facebuc.vn/${commenterProfile.slug}`)
                                      }
                                    }}
                                    className={`text-[11px] font-bold text-slate-900 text-left ${
                                      commenterProfile ? 'hover:underline hover:text-blue-600' : ''
                                    }`}
                                  >
                                    {cmt.user}
                                  </button>
                                  <p className="text-[11px] text-slate-800 font-normal">{cmt.content}</p>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] text-slate-400 pl-2 mt-0.5">
                                  <span>{cmt.time}</span>
                                  <button
                                    type="button"
                                    onClick={() => onPin(cmt.clueId, cmt.clueLabel)}
                                    className={`hover:underline font-semibold flex items-center gap-0.5 ${
                                      cmt.clueId && found.has(cmt.clueId) ? 'text-emerald-700 font-bold' : 'hover:text-slate-600'
                                    }`}
                                  >
                                    <span>{cmt.clueId && found.has(cmt.clueId) ? '📌 Đã lưu' : '🔖 Lưu'}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
