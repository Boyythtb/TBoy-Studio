import { useState } from 'react'
import { MacSound } from '../MacAudio'
import { getCaseProfiles, getCaseStories, type FbComment, type FbPost } from '../caseSites'

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
  const stories = getCaseStories(caseId)

  const [fbSearchQuery, setFbSearchQuery] = useState('')
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null)
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({})
  const [postReactions, setPostReactions] = useState<Record<string, string>>({})
  const [showReactionPicker, setShowReactionPicker] = useState<string | null>(null)

  // Interactive Comments state: additional comments per post
  const [extraComments, setExtraComments] = useState<Record<string, FbComment[]>>({})
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [typingAuthors, setTypingAuthors] = useState<Record<string, string | null>>({})

  const urlSlug = currentUrl.includes('facebuc.vn/')
    ? currentUrl.split('facebuc.vn/')[1]?.split('/')[0]?.split('?')[0]
    : ''
  const activeProfile = (urlSlug ? profiles.find((p) => p.slug === urlSlug || p.id === urlSlug) : null) || null

  // Xử lý Rich text: Parse [Label](url), @slug, bare URL thành liên kết tương tác
  const renderRichContent = (text: string) => {
    // Regex nhận diện [Label](url) hoặc @[a-zA-Z0-9._]+ hoặc URL
    const tokenRegex = /(\[[^\]]+\]\([^\)]+\)|@[a-zA-Z0-9._]+|(?:https?:\/\/|coccoc:\/\/)[a-zA-Z0-9./?=#_:-]+)/g
    const parts = text.split(tokenRegex)

    return parts.map((part, idx) => {
      if (!part) return null

      // 1. Markdown link [Label](url)
      const mdMatch = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/)
      if (mdMatch) {
        const [, label, targetUrl] = mdMatch
        return (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              MacSound.click()
              onNavigate(targetUrl)
            }}
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 rounded-md bg-blue-50 text-[#1877F2] font-bold text-[12px] hover:bg-blue-100 hover:underline transition-all cursor-pointer"
            title={`Chuyển tới ${targetUrl}`}
          >
            <span>{label}</span>
            <span className="text-[10px] opacity-70">↗</span>
          </button>
        )
      }

      // 2. Mention @slug
      if (part.startsWith('@')) {
        const slug = part.slice(1)
        const matchProfile = profiles.find((p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id.toLowerCase() === slug.toLowerCase())
        return (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              MacSound.click()
              onNavigate(`https://facebuc.vn/${matchProfile ? matchProfile.slug : slug}`)
            }}
            className="font-bold text-[#1877F2] hover:underline cursor-pointer px-0.5"
            title={matchProfile ? `Xem trang cá nhân của ${matchProfile.name}` : `@${slug}`}
          >
            {part}
          </button>
        )
      }

      // 3. Bare URL
      if (part.startsWith('http://') || part.startsWith('https://') || part.startsWith('coccoc://')) {
        return (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              MacSound.click()
              onNavigate(part)
            }}
            className="font-mono text-blue-600 hover:underline text-[12px] cursor-pointer"
          >
            {part}
          </button>
        )
      }

      return part
    })
  }

  // Toggle Like & Reaction
  const handleToggleLike = (postId: string, reactionEmoji = '👍') => {
    MacSound.click()
    const isCurrentlyLiked = likedPosts[postId]
    if (isCurrentlyLiked && postReactions[postId] === reactionEmoji) {
      setLikedPosts((prev) => ({ ...prev, [postId]: false }))
      setPostReactions((prev) => ({ ...prev, [postId]: '' }))
      setLikeCounts((prev) => ({ ...prev, [postId]: Math.max(0, (prev[postId] || 0) - 1) }))
    } else {
      setLikedPosts((prev) => ({ ...prev, [postId]: true }))
      setPostReactions((prev) => ({ ...prev, [postId]: reactionEmoji }))
      if (!isCurrentlyLiked) {
        setLikeCounts((prev) => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }))
      }
    }
    setShowReactionPicker(null)
  }

  // Gợi ý câu hỏi thẩm vấn nhanh theo từng vụ án
  const getSuggestedQuestions = () => {
    if (caseId === 'hem42') {
      return [
        '❓ Lúc 21:35 bạn đang ở đâu?',
        '🔍 Bóng xe trong kính cửa hàng lúc 21:58 là của ai?',
        '⚠️ Bạn có thấy ai kéo xe xanh mint ra ngõ không?',
      ]
    }
    if (caseId === 'tu-do' || caseId === 'cau-long') {
      return [
        '❓ Tại sao bạn lại đứng gần tủ đồ số 04?',
        '🔍 Chiếc iPhone 14 Pro Max trên Chợ Tốt có phải của bạn?',
        '⚠️ Khoản tiền cọc 5 triệu nhận lúc tối là từ đâu?',
      ]
    }
    if (caseId === 'hoi-cho' || caseId === 'chua-phap-hoa') {
      return [
        '❓ Lúc 20:45 bạn ra cây ATM VietinBank nộp tiền gì?',
        '🔍 Sao số tiền nộp lại trùng khớp 8 triệu thiếu hụt?',
        '⚠️ Bạn có thấy ai bê hòm công đức ra cổng sau không?',
      ]
    }
    if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
      return [
        '❓ Tại sao aptomat tầng 2 lại bị ngắt thủ công từ tủ BMS?',
        '🔍 Ai đã dùng quyền admin đăng nhập hệ thống lúc 20:50?',
        '⚠️ Chìa khoá và mã két sắt phụ căn 204 bàn giao cho ai?',
      ]
    }
    if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
      return [
        '❓ Ai đã bật ấm đun nước IOT-505 pha trà lúc 21:30?',
        '🔍 Độc tố Aconitine trong chén trà từ đâu mà có?',
        '⚠️ Đơn thuốc kịch độc ở Long Châu là ai đứng tên kê?',
      ]
    }
    if (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
      return [
        '❓ Tại sao ca-nô lại nổ máy đón người ở phao số 04 lúc 21:50?',
        '🔍 Hai chiếc vali nặng 45kg gửi trước ra bến có gì bên trong?',
        '⚠️ Vé máy bay Bangkok chuyến 06:00 sáng mai là của ai?',
      ]
    }
    return [
      '❓ Bạn có thể xác nhận lại mốc thời gian lúc xảy ra vụ việc?',
      '🔍 Có ai làm chứng cho bạn vào thời điểm đó không?',
    ]
  }

  // Tự động phản hồi chất vấn của Điều tra viên
  const handleSendComment = (postId: string, authorName: string, authorSlug: string, contentText?: string) => {
    const text = (contentText || commentInputs[postId] || '').trim()
    if (!text) return

    MacSound.click()
    const newCommentId = `det-c-${Date.now()}`
    const detComment: FbComment = {
      id: newCommentId,
      user: 'Điều tra viên',
      avatar: '🕵️',
      time: 'Vừa xong',
      content: text,
    }

    setExtraComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), detComment],
    }))
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }))

    // Hiển thị trạng thái đang soạn tin
    setTypingAuthors((prev) => ({ ...prev, [postId]: authorName }))

    setTimeout(() => {
      MacSound.zolaPing()
      setTypingAuthors((prev) => ({ ...prev, [postId]: null }))

      // Tạo câu trả lời đối chất mang tính phòng thủ / lộ sơ hở
      let replyContent = ''
      const lower = text.toLowerCase()

      if (caseId === 'hem42') {
        if (authorSlug.includes('dung')) {
          if (lower.includes('21:35') || lower.includes('kính') || lower.includes('xe') || lower.includes('bóng')) {
            replyContent = 'Ủa gì? Tôi đã bảo là tôi về phòng trùm chăn ngủ từ 21:15 rồi, cái ảnh trước cửa hàng điện thoại chỉ là chụp bừa thôi! Làm gì có xe xanh nào, điều tra viên đừng có bới lông tìm vết vu khống tôi!'
          } else {
            replyContent = 'Tôi không biết gì đâu nhé! Mất xe thì tự đi mà check camera ngõ, réo tên shipper nghèo như tôi làm gì?!'
          }
        } else if (authorSlug.includes('vy')) {
          replyContent = 'Dạ em sinh viên năm 2 đang lo trả tiền trọ mệt xỉu, em thề xe Asama đỏ em đăng bán từ 3 hôm trước là xe riêng của em, hoá đơn giấy tờ đầy đủ chứ em không bao giờ lấy trộm xe cô Lan đâu ạ!'
        } else {
          replyContent = 'Tôi chỉ biết quanh khung giờ đó ngõ nhộn nhịp lắm, camera ngã tư [Camera Phường](https://camera-phuong.gov.vn) chắc chắn ghi hình hết!'
        }
      } else if (caseId === 'tu-do' || caseId === 'cau-long') {
        if (authorSlug.includes('son')) {
          replyContent = 'Tôi vào phòng thay đồ rửa mặt cho đỡ buồn ngủ rồi ra ghế đá ngay! Vết xước trên tay tôi là do va quẹt cạnh bàn thôi, các người đừng có suy diễn lung tung!'
        } else if (authorSlug.includes('hao')) {
          replyContent = 'Tôi thi đấu liên tục với anh Tuấn HLV trên Sân số 2 suốt từ 20:30 đến 21:00, cả khán đài và trọng tài đều làm chứng cho tôi!'
        } else {
          replyContent = 'Lúc đó quầy đông khách lấy nước, tôi thấy anh Sơn đi lại khu tủ đồ số 04 mấy lượt rất đáng nghi.'
        }
      } else if (caseId === 'hoi-cho' || caseId === 'chua-phap-hoa') {
        if (authorSlug.includes('tu')) {
          replyContent = 'Tiền tôi nộp vào cây ATM VietinBank là tiền tôi gom thu nợ riêng, liên quan gì đến mấy đồng bạc lẻ trong hòm công đức chùa mà các người hỏi cung tôi?!'
        } else if (authorSlug.includes('trang')) {
          replyContent = 'Dạ em phụ trách phát đèn hoa đăng liên tục từ 20:15 đến 21:15, phật tử nhận đèn chụp ảnh chung với em đầy trên Bảng tin kìa ạ!'
        } else {
          replyContent = 'Hòm công đức niêm phong lúc 20:30, đến 21h thì phát hiện khóa bị cạy bung.'
        }
      } else if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
        if (authorSlug.includes('dat')) {
          replyContent = 'Aptomat tầng 2 quá tải thì rơ-le tự nhảy chứ ai mà rảnh đi ngắt điện! Nhật ký hệ thống [BMS](https://bms-building.vn) lưu đầy đủ, tôi làm việc đúng chức trách!'
        } else {
          replyContent = 'Lúc mất điện đèn hành lang tối om, chuông báo cháy giả réo vang khiến mọi người hoảng loạn chạy xuống sảnh.'
        }
      } else if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
        if (authorSlug.includes('vu')) {
          replyContent = 'Tôi là bác sĩ riêng theo dõi sức khoẻ của Chủ tịch Khang 5 năm nay! Ấm trà tôi đun là trà thảo mộc an thần, làm sao có độc tính Aconitine được, các vị đừng có chụp mũ chuyên gia!'
        } else {
          replyContent = 'Khoảng 21h30 căn bếp bốc khói ấm siêu tốc réo to lắm, lúc đó chỉ có bác sĩ Vũ ở tầng trệt.'
        }
      } else if (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
        if (authorSlug.includes('khang') || authorSlug.includes('my')) {
          replyContent = 'Tính mạng con tin ngàn cân treo sợi tóc, gia đình đang gom tiền chuộc! Điều tra viên lo mà truy bắt kẻ bắt cóc đi, đừng có quấy rầy chuyện riêng của chúng tôi!'
        } else {
          replyContent = 'Lúc 21:50 radar phát hiện một chiếc ca-nô cao tốc cập mạn phao số 04 rồi phóng vút về phía cửa biển.'
        }
      } else {
        replyContent = 'Tôi đã cung cấp tất cả những gì tôi biết cho cơ quan chức năng rồi!'
      }

      const suspectReply: FbComment = {
        id: `reply-${Date.now()}`,
        user: authorName,
        avatar: profiles.find((p) => p.name === authorName)?.avatar || '👤',
        time: 'Vừa xong',
        content: replyContent,
      }

      setExtraComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), suspectReply],
      }))

      onToast({
        text: `💬 ${authorName} vừa phản hồi chất vấn của bạn trên Facebúc!`,
        success: true,
      })
    }, 900)
  }

  return (
    <div className="min-h-full bg-[#f0f2f5] text-slate-900 pb-12 font-['Be_Vietnam_Pro'] select-none">
      {/* Facebook Top Navigation Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between h-14 bg-white border-b border-slate-200 px-4 shadow-xs select-none">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('https://facebuc.vn')}
            className="grid h-10 w-10 place-items-center rounded-full bg-[#1877F2] text-white font-black text-2xl shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            title="Trang chủ Bảng tin Facebúc"
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
                placeholder="Tìm kiếm cư dân, bài viết, bằng chứng..."
                className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-500 text-[12px]"
              />
            </div>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">🔍</span>

            {/* Dropdown tìm kiếm nhanh */}
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
                        className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 text-left transition-colors group cursor-pointer"
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

        {/* Middle Navigation Tabs */}
        <div className="hidden md:flex items-center gap-8 text-xl text-slate-500">
          <button
            type="button"
            onClick={() => onNavigate('https://facebuc.vn')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              !urlSlug ? 'border-[#1877F2] text-[#1877F2]' : 'border-transparent hover:bg-slate-100 rounded-lg'
            }`}
            title="Bảng tin chính"
          >
            🏠
          </button>
          <button
            type="button"
            onClick={() => onToast({ text: 'Facebúc Watch · Không có video mới', success: false })}
            className="py-3 px-4 border-b-2 border-transparent hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
            title="Video"
          >
            📺
          </button>
          <button
            type="button"
            onClick={() => onNavigate('https://chotot.vn')}
            className="py-3 px-4 border-b-2 border-transparent hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
            title="Sàn rao vặt Chợ Tốt"
          >
            🏪
          </button>
          <button
            type="button"
            onClick={() => onNavigate('https://facebuc.vn')}
            className="py-3 px-4 border-b-2 border-transparent hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
            title="Hội đồng khu dân cư"
          >
            👥
          </button>
        </div>

        {/* Right Action: Detective Profile */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-slate-700 hidden sm:inline">Điều tra viên</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-blue-700 font-bold text-base shadow-2xs">
            🕵️
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-3 py-4 flex gap-5">
        {/* Left Sidebar Menu */}
        <div className="hidden lg:block w-56 shrink-0 space-y-1 h-fit sticky top-20 select-none">
          <button
            type="button"
            onClick={() => {
              MacSound.click()
              onNavigate('https://facebuc.vn')
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors font-semibold text-[13px] cursor-pointer ${
              !urlSlug ? 'bg-blue-50 text-[#1877F2]' : 'text-slate-700 hover:bg-slate-200/60'
            }`}
          >
            <span className="text-xl">🏠</span>
            <span>Bảng tin chính</span>
          </button>

          <button
            type="button"
            onClick={() => {
              MacSound.click()
              if (stories.length > 0) setActiveStoryIndex(0)
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors font-semibold text-[13px] text-slate-700 hover:bg-slate-200/60 cursor-pointer"
          >
            <span className="text-xl">📸</span>
            <span>Tin 24H nghi can</span>
            {stories.length > 0 && (
              <span className="ml-auto bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {stories.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              MacSound.click()
              onToast({ text: `Đã thu thập ${found.size} manh mối trong Sổ vụ án!`, success: true })
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors font-semibold text-[13px] text-slate-700 hover:bg-slate-200/60 cursor-pointer"
          >
            <span className="text-xl">🔖</span>
            <span>Manh mối đã lưu</span>
            <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {found.size}
            </span>
          </button>

          <div className="pt-4 border-t border-slate-200/80 px-3 text-[11px] text-slate-400 space-y-1">
            <p className="font-bold text-slate-500">Mạng xã hội Facebúc</p>
            <p>Hệ thống giám sát điều tra mạng xã hội</p>
            <p>© 2026 Facebúc Việt Nam</p>
          </div>
        </div>

        {/* Center Feed & Profile Pages */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* ==================== 1. STORIES BAR (TIN 24H CÁC NGHI CAN) ==================== */}
          {!urlSlug && stories.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[12px] font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="text-pink-500">📸</span>
                  <span>Tin 24h & Khoảnh khắc lúc xảy ra vụ việc</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Bấm vào để xem & ghim chứng cứ</span>
              </div>

              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
                {/* Your Detective Story Badge */}
                <div className="w-24 h-36 shrink-0 rounded-2xl bg-gradient-to-b from-blue-50 to-slate-100 border border-slate-200 p-2 flex flex-col justify-between items-center text-center cursor-default shadow-2xs">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 text-white text-xl shadow-xs">
                    🕵️
                  </span>
                  <div>
                    <p className="text-[11px] font-bold text-slate-800">Điều tra viên</p>
                    <p className="text-[9px] text-slate-400 font-medium">Đang trực tuyến</p>
                  </div>
                </div>

                {/* Suspect Stories Cards */}
                {stories.map((st, sIdx) => {
                  const isPinned = st.clueId && found.has(st.clueId)
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        MacSound.click()
                        setActiveStoryIndex(sIdx)
                      }}
                      className={`w-24 h-36 shrink-0 rounded-2xl p-2 flex flex-col justify-between text-left relative overflow-hidden transition-all hover:scale-[1.03] active:scale-95 shadow-sm cursor-pointer group bg-gradient-to-b ${st.bgGradient}`}
                    >
                      {/* Avatar Ring */}
                      <div className="flex items-center justify-between z-10 w-full">
                        <span className={`grid h-8 w-8 place-items-center rounded-full bg-white/20 backdrop-blur-md text-base border-2 ${
                          isPinned ? 'border-emerald-400' : 'border-pink-500'
                        } shadow-xs group-hover:rotate-6 transition-transform`}>
                          {st.authorAvatar}
                        </span>
                        {st.badgeText && (
                          <span className="text-[8px] font-black tracking-wider uppercase bg-pink-500/90 text-white px-1.5 py-0.5 rounded-full shadow-2xs">
                            {st.badgeText}
                          </span>
                        )}
                      </div>

                      {/* Caption & Name Preview */}
                      <div className="z-10 text-white">
                        <p className="text-[11px] font-bold leading-tight drop-shadow-sm truncate">{st.authorName}</p>
                        <p className="text-[9px] text-white/80 line-clamp-2 leading-snug drop-shadow-xs mt-0.5 font-normal">
                          {st.caption}
                        </p>
                      </div>

                      {/* Pin indicator badge */}
                      {isPinned && (
                        <div className="absolute top-2 right-2 text-xs bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
                          📌
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none" />
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ==================== 2. PROFILE VIEW (TRANG CÁ NHÂN NGHI CAN) ==================== */}
          {urlSlug && activeProfile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={() => {
                    MacSound.click()
                    onNavigate('https://facebuc.vn')
                  }}
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1877F2] hover:underline cursor-pointer"
                >
                  <span>‹</span>
                  <span>Quay lại Bảng tin Facebúc</span>
                </button>
              </div>

              {/* Cover & Avatar Header */}
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
                        onClick={() => {
                          MacSound.click()
                          onToast({ text: `Đã kết nối hồ sơ của ${activeProfile.name}`, success: true })
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 text-white font-bold text-[12px] shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>👥</span>
                        <span>Bạn bè</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          MacSound.click()
                          onToast({ text: `Đang thẩm vấn ${activeProfile.name} qua tin nhắn Zola`, success: true })
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>💬</span>
                        <span>Nhắn tin Zola</span>
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
                </div>
              </div>

              {/* Danh sách bài đăng trên trang cá nhân */}
              {activeProfile.posts.map((post) => renderPostCard(post, activeProfile))}
            </div>
          ) : (
            /* ==================== 3. NEWS FEED VIEW (BẢNG TIN CHÍNH) ==================== */
            <div className="space-y-4">
              {/* Box đăng tin của Điều tra viên */}
              <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-blue-700 font-bold text-lg select-none">
                  🕵️
                </span>
                <div className="flex-1 bg-[#f0f2f5] rounded-full px-4 py-2 text-[12px] text-slate-500 cursor-not-allowed select-none">
                  Bạn đang điều tra vụ án gì thế, Điều tra viên?
                </div>
              </div>

              {/* Feed các bài đăng */}
              {profiles
                .flatMap((p) => p.posts.map((post) => ({ ...post, author: p })))
                .map((item) => renderPostCard(item, item.author))}
            </div>
          )}
        </div>
      </div>

      {/* ==================== 4. STORY VIEWER MODAL ==================== */}
      {activeStoryIndex !== null && stories[activeStoryIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 select-none animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/20 bg-slate-900 text-white min-h-[480px] max-h-[90vh]">
            {/* Top Progress Bar */}
            <div className="absolute top-2.5 left-3 right-3 z-30 flex gap-1.5">
              {stories.map((st, idx) => (
                <div
                  key={st.id}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    idx < activeStoryIndex ? 'bg-white' : idx === activeStoryIndex ? 'bg-white animate-pulse' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Story Header */}
            <div className="relative z-30 pt-6 px-4 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-lg border border-white/30">
                  {stories[activeStoryIndex].authorAvatar}
                </span>
                <div>
                  <p className="text-[13px] font-bold text-white flex items-center gap-1">
                    <span>{stories[activeStoryIndex].authorName}</span>
                    <span className="text-[#1877f2] text-xs">✓</span>
                  </p>
                  <p className="text-[10px] text-white/70">{stories[activeStoryIndex].time}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveStoryIndex(null)}
                className="grid h-8 w-8 place-items-center rounded-full bg-black/40 hover:bg-black/60 text-white text-base transition-colors cursor-pointer"
                title="Đóng xem Tin"
              >
                ✕
              </button>
            </div>

            {/* Story Content Area */}
            <div className={`flex-1 relative flex flex-col justify-end p-5 bg-gradient-to-b ${stories[activeStoryIndex].bgGradient} overflow-hidden`}>
              {stories[activeStoryIndex].img && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={`${import.meta.env.BASE_URL}${stories[activeStoryIndex].img}`}
                    alt="Khoảnh khắc"
                    className="w-full h-full object-cover brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />
                </div>
              )}

              <div className="relative z-10 space-y-3">
                {stories[activeStoryIndex].badgeText && (
                  <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-pink-500 text-white px-2 py-0.5 rounded-full shadow-md">
                    {stories[activeStoryIndex].badgeText}
                  </span>
                )}

                <p className="text-[14px] text-white leading-relaxed font-medium drop-shadow-md">
                  {stories[activeStoryIndex].caption}
                </p>

                {/* Pin clue button inside Story */}
                {stories[activeStoryIndex].clueId && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const cur = stories[activeStoryIndex]
                        onPin(cur.clueId, cur.clueLabel)
                      }}
                      className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 font-bold text-[12px] shadow-lg transition-all cursor-pointer ${
                        stories[activeStoryIndex].clueId && found.has(stories[activeStoryIndex].clueId!)
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-white text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <span>{stories[activeStoryIndex].clueId && found.has(stories[activeStoryIndex].clueId!) ? '📌' : '🔖'}</span>
                      <span>
                        {stories[activeStoryIndex].clueId && found.has(stories[activeStoryIndex].clueId!)
                          ? 'Đã ghim chứng cứ vào Sổ vụ án'
                          : 'Ghim chứng cứ từ Tin này'}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Story Navigation Controls */}
            <div className="relative z-30 p-3 bg-black/60 flex items-center justify-between border-t border-white/10 text-xs">
              <button
                type="button"
                disabled={activeStoryIndex === 0}
                onClick={() => {
                  MacSound.click()
                  setActiveStoryIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                ‹ Tin trước
              </button>

              <div className="flex gap-2 text-base">
                {['❤️', '🔥', '😮', '👏'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      MacSound.click()
                      onToast({ text: `Đã gửi biểu cảm ${emoji} đến ${stories[activeStoryIndex].authorName}`, success: true })
                    }}
                    className="hover:scale-125 active:scale-95 transition-transform cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={activeStoryIndex === stories.length - 1}
                onClick={() => {
                  MacSound.click()
                  setActiveStoryIndex((prev) => (prev !== null && prev < stories.length - 1 ? prev + 1 : prev))
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                Tin tiếp ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Hàm render card Bài đăng đầy đủ tính năng Like, Bình luận, Ghim, Đối chất
  function renderPostCard(post: FbPost, author: { id: string; name: string; slug: string; avatar: string }) {
    const isLiked = likedPosts[post.id]
    const effectiveLikes = (post.likes || 0) + (likeCounts[post.id] || 0)
    const reaction = postReactions[post.id] || '👍'
    const allComments = [...post.comments, ...(extraComments[post.id] || [])]
    const isTyping = typingAuthors[post.id]

    return (
      <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        {/* Post Author Info */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate(`https://facebuc.vn/${author.slug}`)}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <span className="text-2xl select-none group-hover:scale-105 transition-transform">{author.avatar}</span>
            <div>
              <p className="text-[13px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {author.name}
              </p>
              <p className="text-[11px] text-slate-400">{post.time} · 🌐</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onPin(post.clueId, post.clueLabel)}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            title="Lưu hoặc tùy chọn bài viết"
          >
            <span className="text-base font-bold leading-none">···</span>
          </button>
        </div>

        {/* Content with Rich Text parsing */}
        <p className="text-[13px] text-slate-800 leading-relaxed whitespace-pre-line font-normal">
          {renderRichContent(post.content)}
        </p>

        {/* Post Image */}
        {post.img && (
          <div className="rounded-xl overflow-hidden border border-slate-200 max-h-60 bg-black">
            <img
              src={`${import.meta.env.BASE_URL}${post.img}`}
              alt="Ảnh đính kèm"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Like & Comments Stats Counter */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 select-none">
          <span className="flex items-center gap-1">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#1877F2] text-white text-[9px]">
              {reaction}
            </span>
            <span>{effectiveLikes} lượt thích</span>
          </span>
          <span>💬 {allComments.length} bình luận & đối chất</span>
        </div>

        {/* Action Buttons Bar */}
        <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-100 text-[12px] font-semibold text-slate-600 select-none relative">
          {/* Like Button */}
          <button
            type="button"
            onClick={() => handleToggleLike(post.id)}
            onContextMenu={(e) => {
              e.preventDefault()
              setShowReactionPicker(showReactionPicker === post.id ? null : post.id)
            }}
            className={`py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              isLiked ? 'text-[#1877F2] font-bold' : ''
            }`}
          >
            <span>{isLiked ? reaction : '👍'}</span>
            <span>{isLiked ? 'Đã thích' : 'Thích'}</span>
          </button>

          {/* Comment Button */}
          <button
            type="button"
            onClick={() => {
              MacSound.click()
              const el = document.getElementById(`input-${post.id}`)
              if (el) el.focus()
            }}
            className="py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>💬</span>
            <span>Bình luận</span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={() => {
              MacSound.click()
              onToast({ text: 'Đã sao chép liên kết bài viết vào bộ nhớ tạm', success: true })
            }}
            className="py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>↗</span>
            <span>Chia sẻ</span>
          </button>

          {/* Pin Clue Button */}
          <button
            type="button"
            onClick={() => onPin(post.clueId, post.clueLabel)}
            className={`py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              post.clueId && found.has(post.clueId) ? 'text-emerald-700 font-bold' : ''
            }`}
            title="Lưu vào Sổ ghi chép điều tra"
          >
            <span>{post.clueId && found.has(post.clueId) ? '📌' : '🔖'}</span>
            <span>{post.clueId && found.has(post.clueId) ? 'Đã ghim' : 'Ghim'}</span>
          </button>
        </div>

        {/* Existing & New Detective Comments */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          {allComments.map((cmt) => {
            const commenterProfile = profiles.find(
              (p) =>
                p.name.toLowerCase().includes(cmt.user.toLowerCase()) ||
                cmt.user.toLowerCase().includes(p.name.toLowerCase())
            )
            const isDetective = cmt.user === 'Điều tra viên'

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
                  <div className={`rounded-2xl px-3.5 py-2 inline-block max-w-[94%] ${
                    isDetective ? 'bg-blue-50 border border-blue-200' : 'bg-[#f0f2f5]'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          if (commenterProfile) {
                            onNavigate(`https://facebuc.vn/${commenterProfile.slug}`)
                          }
                        }}
                        className={`text-[12px] font-bold text-slate-900 text-left ${
                          commenterProfile ? 'hover:underline hover:text-blue-600 cursor-pointer' : ''
                        }`}
                      >
                        {cmt.user}
                      </button>
                      {isDetective && (
                        <span className="text-[9px] bg-blue-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                          ĐIỀU TRA
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-slate-800 leading-snug mt-0.5 font-normal">
                      {renderRichContent(cmt.content)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-slate-400 pl-3 mt-0.5 select-none">
                    <span>{cmt.time}</span>
                    <button
                      type="button"
                      onClick={() => MacSound.click()}
                      className="hover:underline hover:text-slate-600 font-semibold cursor-pointer"
                    >
                      Thích
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(`input-${post.id}`)
                        if (el) el.focus()
                      }}
                      className="hover:underline hover:text-slate-600 font-semibold cursor-pointer"
                    >
                      Phản hồi
                    </button>
                    <button
                      type="button"
                      onClick={() => onPin(cmt.clueId, cmt.clueLabel)}
                      className={`hover:underline font-semibold flex items-center gap-0.5 cursor-pointer ${
                        cmt.clueId && found.has(cmt.clueId) ? 'text-emerald-700 font-bold' : 'hover:text-slate-600'
                      }`}
                      title="Lưu bình luận vào Sổ ghi chép"
                    >
                      <span>{cmt.clueId && found.has(cmt.clueId) ? '📌' : '🔖'}</span>
                      <span>{cmt.clueId && found.has(cmt.clueId) ? 'Đã ghim' : 'Ghim'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Typing Indicator if suspect is writing reply */}
          {isTyping && (
            <div className="flex items-center gap-2 pl-2 text-[11px] text-slate-500 italic animate-pulse">
              <span>✍️</span>
              <span>{isTyping} đang gõ phản hồi...</span>
            </div>
          )}

          {/* Interactive Detective Comment Input & Quick Suggestion Chips */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            {/* Quick Suggestion Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hỏi nhanh:</span>
              {getSuggestedQuestions().map((q, qIdx) => (
                <button
                  key={qIdx}
                  type="button"
                  onClick={() => handleSendComment(post.id, author.name, author.slug, q)}
                  className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/80 px-2 py-0.5 rounded-full transition-colors cursor-pointer text-slate-700 font-medium"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-100 text-blue-700 text-sm shrink-0">
                🕵️
              </span>
              <div className="flex-1 flex items-center bg-[#f0f2f5] rounded-full px-3 py-1.5 border border-transparent focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <input
                  id={`input-${post.id}`}
                  type="text"
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSendComment(post.id, author.name, author.slug)
                    }
                  }}
                  placeholder={`Chất vấn hoặc hỏi ${author.name}...`}
                  className="w-full bg-transparent outline-none text-[12px] text-slate-800 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => handleSendComment(post.id, author.name, author.slug)}
                  className="text-[#1877F2] font-bold text-sm px-1.5 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  title="Gửi câu hỏi chất vấn"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
