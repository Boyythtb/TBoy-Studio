export interface FbComment {
  id: string
  user: string
  avatar: string
  time: string
  content: string
  clueId?: string
  clueLabel?: string
}

export interface FbPost {
  id: string
  time: string
  content: string
  likes: number
  img?: string
  clueId?: string
  clueLabel?: string
  comments: FbComment[]
}

export interface FbStory {
  id: string
  authorName: string
  authorAvatar: string
  authorSlug: string
  time: string
  bgGradient: string
  badgeText?: string
  caption: string
  img?: string
  clueId?: string
  clueLabel?: string
  reactionsCount?: number
}

export interface FbProfile {
  id: string
  name: string
  slug: string
  avatar: string
  role: string
  bio: string
  livesIn: string
  relationship?: string
  coverColor?: string
  posts: FbPost[]
}

export interface DeliveryOrder {
  id: string
  driver: string
  driverPhone: string
  time: string
  pickup: string
  drop: string
  fee: string
  status: 'Đã hoàn tất' | 'Đang giao' | 'Đã hủy'
  clueId?: string
  clueLabel?: string
  timeline: { time: string; event: string }[]
  locked?: boolean
  lockPrompt?: string
  lockHint?: string
  lockCodes?: string[]
}

export interface ChoTotListing {
  id: string
  title: string
  price: string
  time: string
  seller: string
  phone: string
  location: string
  category: string
  desc: string
  img?: string
  clueId?: string
  clueLabel?: string
  locked?: boolean
  lockPrompt?: string
  lockHint?: string
  lockCodes?: string[]
}

export interface BankTransaction {
  id: string
  time: string
  type: 'in' | 'out'
  amount: string
  accountName: string
  accountNo: string
  bank: string
  content: string
  balanceAfter: string
  clueId?: string
  clueLabel?: string
  locked?: boolean
  lockPrompt?: string
  lockHint?: string
  lockCodes?: string[]
}

export interface BmsDeviceLog {
  id: string
  time: string
  device: string
  location: string
  status: 'normal' | 'warning' | 'alert'
  event: string
  details?: string
  clueId?: string
  clueLabel?: string
  locked?: boolean
  lockPrompt?: string
  lockHint?: string
  lockCodes?: string[]
}

export interface PharmacyRecord {
  id: string
  time: string
  customer: string
  category: 'prescription' | 'otc' | 'emergency'
  items: string[]
  totalPrice: string
  notes?: string
  clueId?: string
  clueLabel?: string
  locked?: boolean
  lockPrompt?: string
  lockHint?: string
  lockCodes?: string[]
}

export interface TrafficCameraRecord {
  id: string
  camName: string
  camLocation: string
  time: string
  description: string
  objectsObserved: string[]
  clueId?: string
  clueLabel?: string
  img?: string
  locked?: boolean
  lockPrompt?: string
  lockHint?: string
  lockCodes?: string[]
}


/** 24H Stories / Reels Facebúc riêng biệt cho từng vụ án */
export function getCaseStories(caseId: string): FbStory[] {
  // Case 1: Hẻm 42
  if (caseId === 'hem42') {
    return [
      {
        id: 'st-dung-1',
        authorName: 'Dũng Shipper',
        authorAvatar: '🛵',
        authorSlug: 'dung.ship42',
        time: '21:58 · 2 giờ trước',
        bgGradient: 'from-blue-900 via-slate-900 to-black',
        badgeText: 'LÚC 21:58',
        caption: 'Đứng chờ khách trước cửa hàng điện thoại số 88 phố Hàng Chai buốt cóng tay 🥶 Hẹn 21:55 mà giờ chưa thấy đâu. Giao nốt đơn này là về trùm chăn ngủ!',
        img: 'detective/hien-truong-2158.jpg',
        clueId: 'anh-phan-chieu',
        clueLabel: 'Bóng xe xanh trong ảnh kính cửa hàng lúc 21:58',
        reactionsCount: 14,
      },
      {
        id: 'st-vy-1',
        authorName: 'Vy Hàng Xóm',
        authorAvatar: '👧',
        authorSlug: 'vy.socute',
        time: '21:35 · 2 giờ trước',
        bgGradient: 'from-pink-900 via-purple-950 to-slate-900',
        badgeText: 'LÚC 21:35',
        caption: 'Vừa xuống sân vứt rác thì rơi mất chùm chìa khoá phòng trọ 😭 Lúc lom khom tìm ở góc sân, thấy bóng ai đó đang kéo chiếc xe đạp điện xanh mint ra cổng hẻm, cứ tưởng cô Lan nhờ đi sạc điện...',
        clueId: 'vy-chung-kien',
        clueLabel: 'Vy thấy Dũng dắt xe lúc 21:35',
        reactionsCount: 29,
      },
      {
        id: 'st-son-1',
        authorName: 'Sơn Shipper',
        authorAvatar: '🚴',
        authorSlug: 'son.shipper.pro',
        time: '21:44 · 2 giờ trước',
        bgGradient: 'from-amber-900 via-orange-950 to-slate-900',
        badgeText: 'LÚC 21:44',
        caption: 'Bàn giao ly trà sữa nóng cho chị Hoa tại Hẻm 46 lúc 21:44! Khách boa thêm 20k ấm lòng người shipper NowFood trong đêm giá rét 🛵💨',
        reactionsCount: 19,
      },
      {
        id: 'st-lan-1',
        authorName: 'Cô Lan Bán Chè',
        authorAvatar: '👵',
        authorSlug: 'lan.nguyen68',
        time: '21:10 · 2 giờ trước',
        bgGradient: 'from-emerald-900 via-teal-950 to-slate-900',
        badgeText: 'LÚC 21:10',
        caption: 'Dọn xong nồi chè cuối cùng, khoá cổ chiếc xe đạp điện xanh mint con gái tặng để ngay góc sân. Giờ vào nhà uống ngụm nước ấm rồi chợp mắt 🍵',
        reactionsCount: 32,
      },
    ]
  }

  // Case 2: Sân cầu lông
  if (caseId === 'tu-do' || caseId === 'cau-long') {
    return [
      {
        id: 'st-hao-1',
        authorName: 'Hào Smash',
        authorAvatar: '🏸',
        authorSlug: 'hao.smash.power',
        time: '20:30 · 1 giờ trước',
        bgGradient: 'from-blue-900 via-indigo-950 to-slate-900',
        badgeText: 'LÚC 20:30',
        caption: 'Khởi động vào Sân số 2 thi đấu set 1 gặp HLV Tuấn! Đánh mướt mồ hôi liên tục từ 20:30 đến 21:00 không hề rời sân một phút nào 🏸🔥 Quyết tâm giật cúp vô địch!',
        clueId: 'hao-o-san-2',
        clueLabel: 'Hào thi đấu trên sân 2 liên tục từ 20:30 đến 21:00',
        reactionsCount: 42,
      },
      {
        id: 'st-son-2',
        authorName: 'Sơn Nhặt Cầu',
        authorAvatar: '🧥',
        authorSlug: 'son.badminton68',
        time: '20:20 · 2 giờ trước',
        bgGradient: 'from-red-950 via-rose-950 to-slate-900',
        badgeText: 'LÚC 20:20',
        caption: 'Tranh thủ giờ nghỉ lẻn vào phòng thay đồ rửa mặt cho tỉnh táo, mặc áo khoác đỏ chống rét... Nhìn dãy tủ đồ số 04 khoá chốt lỏng lẻo ghê 👀',
        clueId: 'son-ao-do',
        clueLabel: 'Sơn mặc áo khoác đỏ đứng sát tủ đồ lúc 20:20',
        reactionsCount: 8,
      },
      {
        id: 'st-linh-2',
        authorName: 'Linh Quầy Nước',
        authorAvatar: '🥤',
        authorSlug: 'linh.drinks.court',
        time: '20:42 · 1 giờ trước',
        bgGradient: 'from-cyan-900 via-teal-950 to-slate-900',
        badgeText: 'LÚC 20:42',
        caption: 'Pha nước bù điện giải cho các cơ thủ. Anh Sơn vừa qua quầy mượn bấm móng tay rồi đi vội về phía cổng bãi đỗ xe 🥤',
        reactionsCount: 15,
      },
      {
        id: 'st-hanh-2',
        authorName: 'Chị Hạnh Chủ Sân',
        authorAvatar: '🔑',
        authorSlug: 'hanh.badminton.boss',
        time: '20:45 · 1 giờ trước',
        bgGradient: 'from-purple-900 via-violet-950 to-slate-900',
        badgeText: 'LÚC 20:45',
        caption: 'Camera khu quầy lễ tân đang giám sát chặt chẽ. Nhắc nhở anh em tự bảo quản điện thoại ví tiền, không để hớ hênh trong tủ đồ!',
        reactionsCount: 27,
      },
    ]
  }

  // Case 3: Hội chợ Chùa Pháp Hoa
  if (caseId === 'hoi-cho' || caseId === 'chua-phap-hoa') {
    return [
      {
        id: 'st-trang-3',
        authorName: 'Trang Bán Bánh Mì',
        authorAvatar: '🥖',
        authorSlug: 'trang.banhmi.que',
        time: '20:50 · 1 giờ trước',
        bgGradient: 'from-amber-900 via-yellow-950 to-slate-900',
        badgeText: 'LÚC 20:50',
        caption: 'Gian hàng đèn hoa đăng Chùa Pháp Hoa đông nghẹt phật tử! Em đứng bán và phát đèn hoa sen liên tục từ 20:15 đến 21:15 mỏi nhừ tay không kịp uống nước 🪷🙏',
        clueId: 'trang-giay',
        clueLabel: 'Trang phát đèn hoa đăng và cơm chay suốt từ 20:15 đến 21:15',
        reactionsCount: 65,
      },
      {
        id: 'st-tu-3',
        authorName: 'Tú Xăm Trổ',
        authorAvatar: '🕶️',
        authorSlug: 'tu.taichinh.den',
        time: '20:40 · 1 giờ trước',
        bgGradient: 'from-emerald-950 via-slate-900 to-black',
        badgeText: 'LÚC 20:40',
        caption: 'Tranh thủ ra ngoài cổng sau chùa hít thở không khí, tiện ghé cây ATM VietinBank ngã tư nộp tiền mặt vào thẻ... Hôm nay đầu tháng bội thu 💵🏦',
        clueId: 'tu-tien-mat',
        clueLabel: 'Tú ra cổng sau nộp tiền mặt rách góc vào ATM lúc 20:45',
        reactionsCount: 11,
      },
      {
        id: 'st-khoa-3',
        authorName: 'Khoa Tình Nguyện',
        authorAvatar: '🤝',
        authorSlug: 'khoa.volunteer',
        time: '20:30 · 2 giờ trước',
        bgGradient: 'from-blue-900 via-sky-950 to-slate-900',
        badgeText: 'LÚC 20:30',
        caption: 'Cùng ban kiểm ngân niêm phong hòm công đức số 02 trước khi rước lễ chính điện. Mong bà con phật tử hoan hỉ giữ gìn trật tự!',
        reactionsCount: 38,
      },
    ]
  }

  // Case 4: Chung cư SkyView / Công ty X
  if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
    return [
      {
        id: 'st-dat-4',
        authorName: 'Quản Lý Đạt',
        authorAvatar: '👔',
        authorSlug: 'dat.manager.horizon',
        time: '20:50 · 2 giờ trước',
        bgGradient: 'from-indigo-950 via-slate-900 to-black',
        badgeText: 'LÚC 20:50',
        caption: 'Trực ca tối phòng điều khiển trung tâm BMS toà Horizon. Hệ thống ghi nhận mọi ngắt mạch tầng 2 bình thường 🖥️ Cư dân an tâm nghỉ ngơi.',
        clueId: 'mat-dien',
        clueLabel: 'Đạt dùng quyền admin can thiệp tủ điện BMS tầng 2 lúc 20:50',
        reactionsCount: 18,
      },
      {
        id: 'st-khai-4',
        authorName: 'Khải Kỹ Thuật',
        authorAvatar: '🔧',
        authorSlug: 'khai.tech42',
        time: '21:05 · 1 giờ trước',
        bgGradient: 'from-red-950 via-rose-950 to-slate-900',
        badgeText: 'LÚC 21:05',
        caption: 'Đang xử lý van nước vỡ ở tầng hầm B2 thì nghe chuông báo cháy giả tầng 2 rú vang! Chạy lên kiểm tra thì bất ngờ bị tấn công từ phía sau...',
        clueId: 'khai-bi-thuong',
        clueLabel: 'Khải bị trói và thương tích ở phòng kỹ thuật lúc 21:05',
        reactionsCount: 45,
      },
      {
        id: 'st-lan-4',
        authorName: 'Lan Kế Toán',
        authorAvatar: '💼',
        authorSlug: 'lan.accountant.42',
        time: '20:35 · 2 giờ trước',
        bgGradient: 'from-purple-900 via-slate-900 to-black',
        badgeText: 'LÚC 20:35',
        caption: 'Bàn giao chìa khoá dự phòng và mã số két sắt phụ căn 204 cho ban quản lý để phục vụ kiểm toán nội bộ sáng mai 🔑',
        reactionsCount: 22,
      },
      {
        id: 'st-tuyet-4',
        authorName: 'Bà Tuyết Thanh Tra',
        authorAvatar: '👩‍💼',
        authorSlug: 'tuyet.inspector',
        time: '20:15 · 3 giờ trước',
        bgGradient: 'from-amber-950 via-slate-900 to-black',
        badgeText: 'LÚC 20:15',
        caption: 'Hôm nay ban kiểm soát cư dân đã niêm phong sổ sách yêu cầu kiểm toán 200 triệu tiền quỹ bảo trì sáng mai! Đạt quản lý toà nhà trốn tránh không dám đối chất!',
        reactionsCount: 52,
      },
      {
        id: 'st-huy-4',
        authorName: 'Huy Shipper Đêm',
        authorAvatar: '🛵',
        authorSlug: 'huy.shipper.night',
        time: '21:12 · 1 giờ trước',
        bgGradient: 'from-emerald-950 via-teal-950 to-slate-900',
        badgeText: 'LÚC 21:12',
        caption: 'Đang mang đồ ăn lên tầng 3 thì toà nhà phụt tắt điện kẹt thang máy! Lúc cạy cửa thang máy ra cầu thang bộ thấy bóng người lách qua cửa hầm rác!',
        reactionsCount: 23,
      },
    ]
  }

  // Case 5: Biệt thự Hoàng Khang
  if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
    return [
      {
        id: 'st-vu-5',
        authorName: 'Bác Sĩ Vũ Hoàng',
        authorAvatar: '🩺',
        authorSlug: 'dr.vuhoang',
        time: '21:15 · 1 giờ trước',
        bgGradient: 'from-teal-950 via-emerald-950 to-black',
        badgeText: 'LÚC 21:15',
        caption: 'Hãm xong ấm trà Long Tỉnh thượng hạng cho Chủ tịch Khang bằng ấm siêu tốc IOT-505. Trà ấm giúp tinh thần thư thái, giấc ngủ sâu 🫖',
        clueId: 'vu-pha-tra',
        clueLabel: 'Bác sĩ Vũ tự tay hãm trà trong bếp lúc 21:15',
        reactionsCount: 16,
      },
      {
        id: 'st-yen-5',
        authorName: 'Yến Giúp Việc',
        authorAvatar: '🧹',
        authorSlug: 'yen.housemaid42',
        time: '21:25 · 1 giờ trước',
        bgGradient: 'from-stone-900 via-neutral-950 to-black',
        badgeText: 'LÚC 21:25',
        caption: 'Dọn dẹp phòng ngủ lầu 3 cho bà chủ. Cả căn biệt thự im phăng phắc, chỉ nghe tiếng nước sôi réo từ bếp tầng 1 🧺',
        clueId: 'yen-o-lau-3',
        clueLabel: 'Yến dọn phòng trên lầu 3 liên tục từ 21:15 đến 21:40',
        reactionsCount: 31,
      },
      {
        id: 'st-ha-5',
        authorName: 'Bà Hà Em Gái',
        authorAvatar: '💎',
        authorSlug: 'ha.livestream.pro',
        time: '21:00 · 2 giờ trước',
        bgGradient: 'from-pink-900 via-rose-950 to-slate-900',
        badgeText: 'LÚC 21:00',
        caption: 'Họp hội đồng cổ đông tranh cãi gay gắt về bản di chúc chia thừa kế khu đất vàng Ba Đình 📜 Ai nấy đều muốn phần hơn!',
        reactionsCount: 52,
      },
      {
        id: 'st-tram-5',
        authorName: 'Bảo Trâm Người Mẫu',
        authorAvatar: '👠',
        authorSlug: 'tram.model.glamour',
        time: '21:40 · 1 giờ trước',
        bgGradient: 'from-fuchsia-950 via-purple-950 to-black',
        badgeText: 'LÚC 21:40',
        caption: 'Về đến căn hộ Cầu Giấy an toàn sau bữa tối với anh Khang. Hy vọng trà thảo mộc giúp anh ngủ ngon tối nay ❤️',
        reactionsCount: 68,
      },
      {
        id: 'st-tuan-5',
        authorName: 'Tuấn Bảo Vệ',
        authorAvatar: '👮',
        authorSlug: 'tuan.security.gate',
        time: '20:35 · 2 giờ trước',
        bgGradient: 'from-slate-900 via-neutral-900 to-black',
        badgeText: 'LÚC 20:35',
        caption: 'Vừa bị một đám người lạ đến cổng quấy rối đòi nợ tiền bốc họ, chùm chìa khóa cổng phụ treo ở bốt trực tự nhiên không cánh mà bay!',
        reactionsCount: 15,
      },
    ]
  }

  // Case 6: Du thuyền Horizon
  if (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
    return [
      {
        id: 'st-my-6',
        authorName: 'Thảo My',
        authorAvatar: '💃',
        authorSlug: 'thaomy.dongduong',
        time: '21:30 · 1 giờ trước',
        bgGradient: 'from-purple-950 via-indigo-950 to-slate-900',
        badgeText: 'LÚC 21:30',
        caption: 'Gió sông Sài Gòn lạnh se sắt. Nhẫn kim cương 5 carat toả sáng trên boong thượng du thuyền Horizon 💎✨ Sắp được tự do rồi!',
        clueId: 'vong-tay-man-thuyen',
        clueLabel: 'Thảo My tạo dáng trên boong VIP lúc 21:30 thảnh thơi không hề có dấu hiệu giằng co',
        reactionsCount: 88,
      },
      {
        id: 'st-khang-6',
        authorName: 'Minh Khang',
        authorAvatar: '🤵',
        authorSlug: 'khang.invest',
        time: '21:15 · 2 giờ trước',
        bgGradient: 'from-amber-950 via-slate-900 to-black',
        badgeText: 'LÚC 21:15',
        caption: 'Thưởng thức xì gà Cuba và ly rượu vang 1982 với các đối tác thương thuyền. Cuộc đời là những ván cờ sinh tử 🍸',
        clueId: 've-may-bay-bangkok',
        clueLabel: 'Bản kê tài chính: Hợp đồng sự kiện du thuyền đến hạn thanh toán',
        reactionsCount: 39,
      },
      {
        id: 'st-hai-6',
        authorName: 'Thuyền Trưởng Hải',
        authorAvatar: '⚓',
        authorSlug: 'hai.captain.songhong',
        time: '21:45 · 1 giờ trước',
        bgGradient: 'from-cyan-950 via-blue-950 to-black',
        badgeText: 'LÚC 21:45',
        caption: 'Du thuyền Horizon chuẩn bị giảm tốc qua phao hoa tiêu số 04. Mọi thông số thuỷ triều và áp suất chân vịt ổn định ⚓',
        clueId: 'hai-dieu-khien-tau',
        clueLabel: 'Thuyền trưởng Hải trực buồng lái chuẩn bị qua phao số 04 lúc 21:45',
        reactionsCount: 42,
      },
      {
        id: 'st-nam-6',
        authorName: 'Nam Bồi Bàn',
        authorAvatar: '🤵',
        authorSlug: 'nam.student.hust',
        time: '21:20 · 2 giờ trước',
        bgGradient: 'from-emerald-950 via-teal-950 to-black',
        badgeText: 'LÚC 21:20',
        caption: 'Bưng khay cocktail phục vụ bàn VIP của tiểu thư Thảo My và anh Minh Khang. Thấy hai người thì thầm to nhỏ chuyện vé máy bay gì đó 🍷',
        clueId: 'nam-boi-ban-khai',
        clueLabel: 'Lời khai bồi bàn: Cuộc trò chuyện tại mạn thuyền tầng 3 lúc 21:20',
        reactionsCount: 23,
      },
      {
        id: 'st-quochuy-6',
        authorName: 'DJ Quốc Huy',
        authorAvatar: '🎧',
        authorSlug: 'quochuy.dj.beat',
        time: '21:35 · 1 giờ trước',
        bgGradient: 'from-cyan-950 via-indigo-950 to-black',
        badgeText: 'LÚC 21:35',
        caption: 'Đêm tiệc du thuyền Horizon cháy hết mình với set nhạc VIP! Chuẩn bị đến giờ bật bài Happy Birthday và hạ dàn đèn ngoài trời theo yêu cầu của chú rể!',
        reactionsCount: 88,
      },
      {
        id: 'st-mailan-6',
        authorName: 'Mai Lan Quản Lý',
        authorAvatar: '👩‍💼',
        authorSlug: 'mailan.manager.yacht',
        time: '21:25 · 1 giờ trước',
        bgGradient: 'from-blue-950 via-slate-900 to-black',
        badgeText: 'LÚC 21:25',
        caption: 'Kiểm tra an toàn các mạn thuyền và phao số 4 trước khi du thuyền qua khúc cua sông. Tất cả hành khách vui lòng ở trong khoang tiệc.',
        reactionsCount: 34,
      },
    ]
  }

  return []
}

/** Dữ liệu Facebúc Profiles riêng biệt cho từng vụ án */
export function getCaseProfiles(caseId: string): FbProfile[] {
  // Case 1: Hẻm 42 - Mất xe đạp điện
  if (caseId === 'hem42') {
    return [
      {
        id: 'dung',
        name: 'Dũng Shipper',
        slug: 'dung.ship42',
        avatar: '🛵',
        role: 'Tài xế GiaoNhanh · Hẻm 42',
        bio: 'Chạy xe cày cuốc đêm ngày. Ai cần ship hỏa tốc Hàng Chai ới em nhé 📦',
        livesIn: 'Phòng trọ số 3, Hẻm 42 phố Hàng Chai',
        relationship: 'Độc thân',
        coverColor: 'from-blue-600 to-indigo-800',
        posts: [
          {
            id: 'p-dung-1',
            time: '22:10 · Thứ Sáu',
            content: 'Tối nay chạy xong mấy cuốc mệt lả người, về phòng từ 21:15 nằm ngủ li bì tới giờ. Trong hẻm ai mất xe thì tự đi mà tìm nhé, đừng có réo tên tôi vu oan!',
            likes: 4,
            comments: [
              {
                id: 'c-dung-1',
                user: 'Vy Hàng Xóm',
                avatar: '👧',
                time: '22:18',
                content: 'Tối nay ngõ mất điện tối om sợ quá anh Dũng ơi, may mà em vừa về phòng trọ kịp. Lúc 21h35 em thấy có bóng người dắt xe ra cổng hẻm, cứ tưởng người thuê trọ!',
                clueId: 'vy-chung-kien',
                clueLabel: 'Lời khai nhân chứng: Thấy bóng người dắt xe ra cổng hẻm lúc 21:35',
              },
              {
                id: 'c-dung-2',
                user: 'Hàng Xóm Hẻm 42',
                avatar: '🏘️',
                time: '22:25',
                content: 'Tối nay ngõ mất điện hỗn loạn ghê, thấy con bé Vy với thằng Sơn lượn lờ suốt. Dũng chạy cả ngày mệt nghỉ sớm đi em.',
              },
            ],
          },
          {
            id: 'p-dung-2',
            time: '21:58 · Thứ Sáu',
            content: 'Đứng chờ khách lấy đồ trước cửa hàng điện thoại số 88 phố Hàng Chai. Hẹn khách 21:55 mà giờ chưa thấy đâu, lạnh buốt tay 😤',
            likes: 3,
            img: 'detective/hien-truong-2158.jpg',
            clueId: 'anh-phan-chieu',
            clueLabel: 'Hình ảnh Story phố Hàng Chai: Tấm kính cửa hàng 88 phản chiếu bóng xe lúc 21:58',
            comments: [
              {
                id: 'c-dung-3',
                user: 'Tuấn Game Net',
                avatar: '🎮',
                time: '22:01',
                content: 'Phố Hàng Chai đêm nay vắng tanh nhỉ, đứng đấy cẩn thận trộm cắp nhé anh zai!',
              },
            ],
          },
        ],
      },
      {
        id: 'vy',
        name: 'Vy Hàng Xóm',
        slug: 'vy.socute',
        avatar: '👧',
        role: 'Sinh viên năm 2 · Phòng 402',
        bio: 'Học kinh tế, mê trà sữa, đang bị chủ nhà đòi nợ tiền phòng trọ hu hu 😭',
        livesIn: 'Gác lửng nhà số 14, Hẻm 42',
        relationship: 'Độc thân',
        coverColor: 'from-pink-500 to-purple-600',
        posts: [
          {
            id: 'p-vy-1',
            time: '21:38 · Thứ Sáu',
            content: 'Vừa xuống sân vứt rác và tìm chìa khóa rơi, thấy anh Dũng đang dắt xe đạp điện xanh mint ra cổng hẻm. Em tưởng cô Lan nhờ ảnh đi sạc hộ.',
            likes: 8,
            comments: [],
          },
          {
            id: 'p-vy-2',
            time: '18:00 · Thứ Tư (3 ngày trước)',
            content: 'Ai mua xe đạp điện Asama đỏ cũ của em không ạ, em pass 2tr5 đóng tiền phòng trọ gấp 🥺',
            likes: 15,
            img: 'detective/chotot-asama-do.jpg',
            clueId: 'vy-xe-do',
            clueLabel: 'Vy bán xe Asama đỏ cũ của mình từ 3 hôm trước (không phải xe cô Lan)',
            comments: [],
          },
        ],
      },
      {
        id: 'son',
        name: 'Sơn Shipper Đối Thủ',
        slug: 'son.shipper.pro',
        avatar: '🚴',
        role: 'Shipper NowFood · Hẻm 46',
        bio: 'Giao hàng 30 phút có mặt. Không ngại nắng mưa.',
        livesIn: 'Hẻm 46 phố Hàng Chai',
        relationship: 'Độc thân',
        coverColor: 'from-orange-500 to-red-600',
        posts: [
          {
            id: 'p-son-1',
            time: '21:46 · Thứ Sáu',
            content: 'Giao xong đơn trà sữa cho chị Hoa ở Hẻm 46 lúc 21:44! Khách tip thêm 20k mừng rơi nước mắt 🥰',
            likes: 12,
            comments: [
              {
                id: 'c-son-1',
                user: 'Chị Hoa Hẻm 46',
                avatar: '👩',
                time: '21:47',
                content: 'Cảm ơn em shipper nhiệt tình nhé, chụp ảnh giao hàng nhận mặt rất chuyên nghiệp!',
                clueId: 'son-don-hang',
                clueLabel: 'Biên lai giao hàng tại Hẻm 46 mang tên tài xế Sơn lúc 21:44',
              },
            ],
          },
        ],
      },
      {
        id: 'lan',
        name: 'Cô Lan Bán Chè',
        slug: 'lan.nguyen68',
        avatar: '👵',
        role: 'Chủ tiệm Chè Sen Hẻm 42',
        bio: 'Chè sen long nhãn, chè khúc bạch thanh mát truyền thống. Khách quen gọi: 0912xxx888',
        livesIn: 'Số nhà 12, Hẻm 42 phố Hàng Chai',
        relationship: 'Đã kết hôn',
        coverColor: 'from-amber-500 to-rose-600',
        posts: [
          {
            id: 'p-lan-1',
            time: '21:50 · Thứ Sáu',
            content: 'BÀ CON HẺM 42 ƠI CỨU TÔI VỚI! Xe đạp điện Nijia màu xanh mint tôi vừa khóa cổ để trong sân lúc 21:10. Đến 21:40 ra cất giỏ hàng thì cổng mở toang, xe biến mất rồi! Ai nhìn thấy xe tôi ở đâu xin báo gấp với công an phường!',
            likes: 34,
            img: 'detective/facebuc-nijia-xanh.jpg',
            comments: [
              {
                id: 'c-lan-1',
                user: 'Bác Bảy Dân Phòng',
                avatar: '📸',
                time: '21:55',
                content: 'Khổ thân chị Lan, lúc 20:00 tôi lau camera hẻm xong quên cắm lại giắc nguồn điện, thành ra đoạn camera 20h-22h không ghi được gì!',
                clueId: 'camera-hong',
                clueLabel: 'Camera hẻm mất nguồn từ 20:00',
              },
              {
                id: 'c-lan-2',
                user: 'Bác Tổ Trưởng Dân Phố',
                avatar: '👴',
                time: '21:58',
                content: 'Chị Lan yên tâm, camera hẻm hỏng chứ ở cột điện ngã tư đầu phố có trạm [Camera An Ninh Đô Thị](https://camera-phuong.gov.vn) ghi hình 24/7 góc quay cực rộng. Kẻ gian tẩu thoát kiểu gì cũng phải dắt xe qua ngã tư lúc 21h30-22h, bảo công an trích xuất trạm đó là thấy ngay!',
              },
              {
                id: 'c-lan-3',
                user: 'Vy Hàng Xóm',
                avatar: '👧',
                time: '22:02',
                content: 'Huhu cô Lan ơi, lúc 21h35 cháu xuống sân vứt rác thì thấy một bóng người mặc áo khoác gió trùm kín đầu dắt xe ra cổng hẻm! Chiều nay cháu túng tiền nên đăng bán chiếc xe Asama đỏ cũ của cháu trên [Chợ Tốt](https://chotot.vn) mà bị anh Hùng nghi oan là trộm xe cô, oan ức quá!',
                clueId: 'vy-chung-kien',
                clueLabel: 'Lời khai nhân chứng: Thấy bóng người dắt xe ra cổng hẻm lúc 21:35',
              },
              {
                id: 'c-lan-4',
                user: 'Hoàng Game Net',
                avatar: '🎮',
                time: '22:08',
                content: 'Tối nay lúc mất điện tầm 21h40 quán net em mất mạng chập chờn, thấy mấy người chạy ra đầu ngõ gọi điện thoại. Anh Dũng thì bảo về phòng ngủ sớm từ 21h15 rồi mà?',
              },
              {
                id: 'c-lan-5',
                user: 'Dũng Shipper',
                avatar: '🛵',
                time: '22:12',
                content: 'Thằng Hoàng kia mày đừng có vu oan cho tao nhé, tao mệt về phòng trùm chăn ngủ từ 21h15 đến giờ có đi đâu đâu!',
                clueId: 'dung-khai-21h15',
                clueLabel: 'Dũng khai về phòng trọ ngủ từ 21h15',
              },
            ],
          },
        ],
      },
      {
        id: 'hung',
        name: 'Hùng Sửa Xe Motor',
        slug: 'hung.motor42',
        avatar: '🔧',
        role: 'Chủ tiệm sửa xe & Dịch vụ net Hẻm 42',
        bio: 'Sửa chữa xe máy, xe điện, phục hồi bình ắc quy. Mua bán xác xe cũ giá cao.',
        livesIn: 'Số 8 Hẻm 42 phố Hàng Chai',
        relationship: 'Đã kết hôn',
        coverColor: 'from-amber-600 to-slate-800',
        posts: [
          {
            id: 'p-hung-1',
            time: '22:15 · Thứ Sáu',
            content: 'Hẻm 42 dạo này lắm thành phần bất hảo! Chiều nay thấy thằng Sơn shipper NowFood lượn lờ trước cổng nhà cô Lan ngó nghiêng mấy bận. Vừa thấy nó khoe chuyển trả 6 triệu tiền nợ phụ tùng mờ ám lắm! Đề nghị bà con báo công an phường tóm nó điều tra ngay!',
            likes: 19,
            comments: [
              {
                id: 'c-hung-1',
                user: 'Bác Tổ Trưởng Dân Phố',
                avatar: '👴',
                time: '22:18',
                content: 'Đúng đấy chú Hùng! Hôm trước cũng thấy thằng Sơn đứng soi mói giỏ xe người khác!',
              },
              {
                id: 'c-hung-2',
                user: 'Sơn Shipper Đối Thủ',
                avatar: '🚴',
                time: '22:20',
                content: 'Anh Hùng ngậm máu phun người vừa thôi nhé! 6 triệu là tôi vay mượn mẹ tôi gửi lên nộp phạt giao thông có biên lai đàng hoàng! Lúc 21:44 tôi giao trà sữa ở Hẻm 46 có chị Hoa nhận hàng chụp ảnh đối chứng đây!',
              },
            ],
          },
        ],
      },
      {
        id: 'hangxom',
        name: 'Tổ Dân Phố Hẻm 42',
        slug: 'to.danpho42',
        avatar: '📢',
        role: 'Bảng tin cư dân hẻm',
        bio: 'Cập nhật tình hình an ninh trật tự và thông báo khu phố.',
        livesIn: 'Hẻm 42 Hàng Chai',
        relationship: 'Cộng đồng',
        coverColor: 'from-blue-700 to-cyan-800',
        posts: [
          {
            id: 'p-tdp-1',
            time: '22:05 · Thứ Sáu',
            content: 'NGHI VẤN NỘI BỘ: Chiều nay cháu Vy sinh viên phòng 402 nợ tiền trọ 3 tháng vừa lên Chợ Tốt đăng bán vội xe đạp điện giá 2tr5! Không biết có uẩn khúc gì với chiếc xe bị mất của cô Lan không?',
            likes: 14,
            comments: [
              {
                id: 'c-tdp-1',
                user: 'Vy Hàng Xóm',
                avatar: '👧',
                time: '22:08',
                content: 'Bác ơi oan cho cháu quá! Xe cháu bán là chiếc Asama màu ĐỎ nguyên bản của cháu từ năm ngoái, ảnh chụp hoá đơn mua hàng còn nguyên! Xe cô Lan là xe Nijia XANH MINT mà bác!',
              },
            ],
          },
        ],
      },
      {
        id: 'bay',
        name: 'Bác Bảy Dân Phòng',
        slug: 'bay.nguyen.dp',
        avatar: '📸',
        role: 'Tổ phó dân phòng Hẻm 42',
        bio: 'Chăm lo trật tự ngõ xóm. Trực bảo vệ và quản lý camera khu phố.',
        livesIn: 'Đầu Hẻm 42 phố Hàng Chai',
        relationship: 'Đã kết hôn',
        coverColor: 'from-emerald-600 to-teal-800',
        posts: [
          {
            id: 'p-bay-1',
            time: '21:30 · Thứ Sáu',
            content: 'Đang túc trực ở Bệnh viện Đa khoa trông bà nhà bị tụt huyết áp cấp cứu. Bác sĩ bảo nằm theo dõi đến đêm. Chúc cả xóm ngủ ngon!',
            likes: 21,
            comments: [
              {
                id: 'c-bay-1',
                user: 'Thu Ngân Bệnh Viện',
                avatar: '🏥',
                time: '21:32',
                content: 'Bác Bảy ra quầy nhận phiếu thanh toán viện phí lúc 21:20 nhé bác.',
                clueId: 'bill-vien',
                clueLabel: 'Phiếu thu viện phí mang tên Bác Bảy tại bệnh viện lúc 21:20',
              },
            ],
          },
        ],
      },
    ]
  }

  // Case 2: Sân cầu lông - Mất điện thoại trong tủ đồ
  if (caseId === 'tu-do' || caseId === 'cau-long') {
    return [
      {
        id: 'badminton_club',
        name: 'CLB Cầu Lông Hàng Chai',
        slug: 'clb.caulong42',
        avatar: '🏸',
        role: 'Ban Quản Trị Sân Cầu Lông',
        bio: 'Giao lưu thể thao lành mạnh, văn minh, nói không với trộm cắp tư trang!',
        livesIn: 'Sân Cầu Lông Hẻm 42',
        relationship: 'Cộng đồng',
        coverColor: 'from-emerald-600 to-green-800',
        posts: [
          {
            id: 'p-clb-1',
            time: '20:50 · Thứ Sáu',
            content: 'CẢNH BÁO NÓNG TRONG SÂN: Chị Hạnh vừa mất iPhone 14 Pro Max trong tủ số 4 lúc 20:35. Ngay sau đó lúc 20:44, số điện thoại của Hào Smash (0912***888) đăng bán đúng chiếc iPhone 14 Pro Max 5tr5 trên Chợ Tốt! Đề nghị Hào nộp lại máy cho chị Hạnh trước khi công an đến!',
            likes: 45,
            comments: [
              {
                id: 'c-clb-1',
                user: 'Khách Chơi Sân 1',
                avatar: '🏃',
                time: '20:52',
                content: 'Trời ơi hôm qua thấy Hào cá độ thua 10 triệu cay cú lắm, chắc túng quẫn làm liều rồi!',
              },
              {
                id: 'c-clb-2',
                user: 'Hào Smash',
                avatar: '🏸',
                time: '20:55',
                content: 'Mọi người bình tĩnh đừng quy chụp! Em bị ai đó ác ý lấy số điện thoại em đăng tin ảo trên Chợ Tốt! Suốt từ 20:30 đến 21:00 em đang thi đấu set 3 trên sân số 2 có cả chục người xem mà! Em nghi thằng Sơn nhặt cầu nó lén lút sau tủ đồ gài bẫy em!',
              },
              {
                id: 'c-clb-3',
                user: 'Sơn Nhặt Cầu',
                avatar: '🏸',
                time: '20:58',
                content: 'Anh Hào đừng có vu vạ cho nhân viên nhặt cầu nghèo như em! Tủ đồ khóa nguyên vẹn chỉ có người giữ chìa khóa dự phòng như chị Linh quầy nước mới mở được thôi! Sao không ai hỏi chị Linh lúc 20:30 bỏ quầy nước đi đâu 15 phút?!',
              },
              {
                id: 'c-clb-4',
                user: 'Linh Quầy Nước',
                avatar: '🥤',
                time: '21:02',
                content: 'Mày điên à Sơn! Tao ra nhận đơn trà sữa và giúp bà Mai phụ dọn thùng rác đem ra bãi xe! Khám xe rác của bà Mai kìa!',
              },
            ],
          },
        ],
      },

      {
        id: 'son',
        name: 'Sơn Nhặt Cầu',
        slug: 'son.badminton68',
        avatar: '🧥',
        role: 'Khách quen sân cầu · Nợ tiền sân',
        bio: 'Đam mê cầu lông, thích bắt kèo độ. Ai giao lưu sân Ba Đình ới em!',
        livesIn: 'Cầu Giấy, Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-blue-600 to-slate-800',
        posts: [
          {
            id: 'p-son-1',
            time: '20:30 · Thứ Bảy',
            content: 'Tối nay ca nhặt cầu đông khách mệt lử, ngồi uống nước ở ghế đá nghỉ ngơi chờ đóng cửa sân.',
            likes: 3,
            comments: [
              {
                id: 'c-son-1',
                user: 'Anh Tuấn Khách Sân 3',
                avatar: '🏸',
                time: '20:38',
                content: 'Sơn ơi lát dọn sân nhặt hộ anh 2 quả cầu bay lên nóc lưới nhé.',
              },
              {
                id: 'c-son-2',
                user: 'Khách Đánh Cầu',
                avatar: '🏃',
                time: '20:42',
                content: 'Nãy vừa thấy anh Hào nhận tiền cọc bán vợt gì trên mạng kìa, SĐT Hào đăng trên Chợ Tốt rành rành!',
              },
            ],
          },
        ],
      },
      {
        id: 'hao',
        name: 'Hào Smash',
        slug: 'hao.smash.power',
        avatar: '🏸',
        role: 'Vận động viên bán chuyên',
        bio: 'Cầu lông phong trào Ba Đình. Lối đánh tấn công uy lực.',
        livesIn: 'Ba Đình, Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-amber-600 to-stone-900',
        posts: [
          {
            id: 'p-hao-1',
            time: '21:10 · Thứ Bảy',
            content: 'Thắng set 3 kịch tính 21-19! Từ 20:30 tới 21:00 đánh mệt bở hơi tai trên sân số 2 với anh Tuấn HLV.',
            likes: 25,
            clueId: 'hao-o-san-2',
            clueLabel: 'Hào thi đấu trên sân 2 liên tục từ 20:30 đến 21:00',
            comments: [
              {
                id: 'c-hao-1',
                user: 'Tuấn HLV Cầu Lông',
                avatar: '🏸',
                time: '21:15',
                content: 'Công nhận Hào đánh set cuối bền bỉ thật, từ 20:30 không nghỉ phút nào!',
              },
            ],
          },
        ],
      },
      {
        id: 'linh',
        name: 'Linh Quầy Nước',
        slug: 'linh.drinks.court',
        avatar: '🥤',
        role: 'Nhân viên quầy nước giải khát',
        bio: 'Nước khoáng, Revive, trà chanh mát lạnh phục vụ các lông thủ.',
        livesIn: 'Hà Nội',
        relationship: 'Hẹn hò',
        coverColor: 'from-teal-500 to-cyan-700',
        posts: [
          {
            id: 'p-linh-1',
            time: '20:29 · Thứ Bảy',
            content: 'Dãy tủ đồ hôm nay đông khách ghê, chuẩn bị đóng quầy vào kiểm đếm chai lọ.',
            likes: 7,
            clueId: 'anh-story',
            clueLabel: 'Bóng áo khoác đỏ phản chiếu trong story tủ đồ của Linh lúc 20:29',
            comments: [],
          },
        ],
      },
      {
        id: 'hanh',
        name: 'Chị Hạnh Chủ Sân',
        slug: 'hanh.badminton.boss',
        avatar: '🔑',
        role: 'Chủ sân cầu lông Hẻm 42',
        bio: 'Nhận đặt sân, giao lưu câu lạc bộ cầu lông uy tín.',
        livesIn: 'Hà Nội',
        relationship: 'Đã kết hôn',
        coverColor: 'from-purple-600 to-indigo-900',
        posts: [
          {
            id: 'p-hanh-1',
            time: '20:40 · Thứ Bảy',
            content: 'TỦ ĐỒ SỐ 4 BỊ MẤT ĐIỆN THOẠI IPHONE 14 PRO MAX! Tôi vừa cất máy lúc 20:25, đến 20:35 mở tủ thì máy biến mất! Tủ vẫn khóa nguyên vẹn không cạy phá!',
            likes: 31,
            clueId: 'mat-dt',
            clueLabel: 'Mất điện thoại trong tủ đồ số 4 lúc 20:35',
            comments: [
              {
                id: 'c-hanh-1',
                user: 'Tuấn HLV Cầu Lông',
                avatar: '🏸',
                time: '20:44',
                content: 'Chị Hạnh báo ban quản lý kiểm tra [Camera An Ninh Sân Cầu Lông](https://camera-phuong.gov.vn) ngay đi, camera khu vực bãi xe và lối vào quầy nước quay 24/7 rõ lắm!',
              },
              {
                id: 'c-hanh-2',
                user: 'Minh Lông Thủ',
                avatar: '👟',
                time: '20:47',
                content: 'Ủa vừa thấy trên [Chợ Tốt](https://chotot.vn) có tin đăng bán vội iPhone 14 Pro Max tím mã CT-201 để số điện thoại Hào Smash giá rẻ giật mình kìa chị! Nhưng lúc đó Hào đang đánh đôi với anh Tuấn HLV trên sân 2 mà?!',
              },
              {
                id: 'c-hanh-3',
                user: 'Linh Quầy Nước',
                avatar: '🥤',
                time: '20:50',
                content: 'Lúc 20h29 em chụp story quầy nước, gương phản chiếu thấy bóng người mặc áo khoác đỏ lúi húi sau lưng dãy tủ số 4 đấy chị ơi!',
              },
              {
                id: 'c-hanh-4',
                user: 'Khách Đánh Cầu',
                avatar: '🏸',
                time: '20:53',
                content: 'Tầm 20h35 anh thấy Sơn nhặt cầu khoe vừa nhận thông báo ting ting tiền cọc trên [VietinBank](https://vietinbank.vn), nghi lắm!',
              },
            ],
          },
        ],
      },
    ]
  }

  // Case 3: Hội chợ Trung thu - Mất hòm quỹ từ thiện
  if (caseId === 'hoi-cho' || caseId === 'chua-phap-hoa') {
    return [
      {
        id: 'lang_phaphoa',
        name: 'Hội Đồng Hương Làng Pháp Hoa',
        slug: 'lang.phaphoa',
        avatar: '🏮',
        role: 'Bảng tin hội đồng làng',
        bio: 'Chia sẻ Phật pháp, tin tức hội chợ từ thiện và đời sống làng quê.',
        livesIn: 'Đình làng Pháp Hoa',
        relationship: 'Cộng đồng',
        coverColor: 'from-amber-600 to-yellow-800',
        posts: [
          {
            id: 'p-lang-1',
            time: '21:35 · Thứ Bảy',
            content: 'TRUY TÌM KẺ GIAN HỘI CHỢ: Lúc 21:20 mất điện, hòm công đức 8 triệu quyên góp mổ tim cho trẻ em bị cạy phá bê sạch tiền! Chiều nay thấy anh Tú tài chính cãi nhau kịch liệt với ban tổ chức, mắt nhìn hòm tiền chằm chằm! Anh Tú vừa phá sản tiền ảo nợ nần chồng chất, đề nghị bà con giữ anh Tú lại đối chất!',
            likes: 67,
            comments: [
              {
                id: 'c-lang-1',
                user: 'Bà Bán Xôi Cổng Đình',
                avatar: '👵',
                time: '21:38',
                content: 'Đúng rồi, lúc đèn vừa phụt tắt thấy một bóng người mặc áo sơ mi chạy xộc ra!',
              },
              {
                id: 'c-lang-2',
                user: 'Vũ Đình Tú',
                avatar: '👔',
                time: '21:40',
                content: 'Bà con đừng có hồ đồ vu khống! Tôi ngồi uống nước tại quán trà đá anh Phúc đối diện cổng đình suốt từ 20:57 đến 21:25 có anh Phúc và khách uống nước làm chứng đây! Thằng Khoa tay bị bỏng quấn băng trắng là do cạy mép hòm sắt bị cứa chảy máu đấy, lục balo thằng Khoa có kìm cộng lực kìa!',
              },
              {
                id: 'c-lang-3',
                user: 'Khoa Tình Nguyện',
                avatar: '🧢',
                time: '21:44',
                content: 'Anh Tú đừng có gắp lửa bỏ tay người! Tôi bị bỏng nước sôi lúc bưng nồi ngô luộc từ 20:40, có giấy sơ cứu của trạm y tế lưu động! Chiếc kìm trong balo là tôi mang đi căng dây bạt rạp hội chợ!',
              },
            ],
          },
        ],
      },

      {
        id: 'trang',
        name: 'Trang Bán Bánh Mì',
        slug: 'trang.banhmi.que',
        avatar: '🥖',
        role: 'Gian hàng ẩm thực hội chợ · Thủ quỹ',
        bio: 'Bánh mì que Hải Phòng giòn rụm thơm ngon.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-yellow-600 to-amber-800',
        posts: [
          {
            id: 'p-trang-1',
            time: '21:40 · Thứ Bảy',
            content: 'Hội chợ đông vui quá, vừa bán hết veo 200 chiếc bánh mì gây quỹ từ thiện! Cảm ơn bà con phật tử đã ủng hộ gian hàng ẩm thực ❤️',
            likes: 15,
            comments: [
              {
                id: 'c-trang-1',
                user: 'Bác Bảo Vệ Chùa',
                avatar: '👴',
                time: '21:48',
                content: 'Trang ơi, bánh mì hôm nay bán chạy ghê, gom góp được nhiều tiền ủng hộ các cháu mổ tim rồi đấy!',
              },
            ],
          },
        ],
      },
      {
        id: 'tu',
        name: 'Tú Xăm Trổ (Tú Tài Chính)',
        slug: 'tu.taichinh.den',
        avatar: '💸',
        role: 'Hỗ trợ tài chính nhanh 24/7',
        bio: 'Tài chính linh hoạt, giải ngân trong đêm. Uy tín là vàng.',
        livesIn: 'Đống Đa, Hà Nội',
        relationship: 'Phức tạp',
        coverColor: 'from-zinc-700 to-black',
        posts: [
          {
            id: 'p-tu-1',
            time: '21:35 · Thứ Bảy',
            content: 'Ting ting 8 củ khoai trong đêm! Phải sòng phẳng thế có phải êm đẹp cả đôi bên không.',
            likes: 18,
            comments: [
              {
                id: 'c-tu-1',
                user: 'Khách Vay Hàng Chai',
                avatar: '🤝',
                time: '21:36',
                content: 'Đã thanh toán đủ tiền gốc và lãi tháng này cho anh Tú nhé, xóa sổ nợ giúp em!',
              },
            ],
          },
        ],
      },
      {
        id: 'khoa',
        name: 'Khoa Tình Nguyện Viên',
        slug: 'khoa.volunteer',
        avatar: '🧑',
        role: 'Tình nguyện viên hội chợ',
        bio: 'Sinh viên năm 3 tình nguyện. Mê công tác xã hội.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-teal-600 to-emerald-800',
        posts: [
          {
            id: 'p-khoa-1',
            time: '21:25 · Thứ Bảy',
            content: 'Hôm nay phụ khiêng nồi chè nóng bị bỏng tay lúc 20:40, may có hiệu thuốc gần đấy quấn băng gạc to đùng như bàn tay gấu 🐻',
            likes: 22,
            clueId: 'khoa-bi-thuong',
            clueLabel: 'Khoa bị bỏng tay từ 20:40 quấn băng y tế không thể cạy khoá',
            comments: [
              {
                id: 'c-khoa-1',
                user: 'Dược Sĩ Long Châu',
                avatar: '💊',
                time: '21:28',
                content: 'Khoa ơi đơn thuốc và băng gạc bỏng của em lúc 20h42 lưu trên [Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) chi nhánh 42 nhé, nhớ thay băng hàng ngày kẻo nhiễm trùng!',
              },
              {
                id: 'c-khoa-2',
                user: 'Bạn Tình Nguyện',
                avatar: '🏮',
                time: '21:32',
                content: 'Thương Khoa ghê, tay quấn băng trắng toát thế này cạy khóa thế nào được. Mà lúc mất điện 20h55 [Camera An Ninh Phố Chùa](https://camera-phuong.gov.vn) ghi nhận có bóng người giày bata trắng dính bùn chạy vội ra ngõ sau đấy!',
              },
            ],
          },
        ],
      },
    ]
  }

  // Case 4: Cướp két sắt Chung cư 42
  if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
    return [
      {
        id: 'cu_dan_chung_cu',
        name: 'Cộng Đồng Cư Dân Chung Cư 42',
        slug: 'cudan.chungcu42',
        avatar: '🏢',
        role: 'Nhóm cư dân toà nhà',
        bio: 'Nơi phản ánh dịch vụ, trật tự an ninh và đời sống cư dân toà nhà.',
        livesIn: 'Toà nhà Chung Cư 42',
        relationship: 'Cộng đồng',
        coverColor: 'from-blue-700 to-indigo-900',
        posts: [
          {
            id: 'p-cc-1',
            time: '21:45 · Thứ Năm',
            content: 'CẢNH BÁO TỘI PHẠM TRONG TOÀ NHÀ: Lúc 21:10 mất điện hầm, két sắt văn phòng tầng 2 bị mở sạch 200 triệu tiền quỹ bảo trì! Anh Khải kỹ thuật điện bị bắt quả tang nằm cạnh tủ điện hầm B1, trong balo có MÁY BẺ KHÓA KÉT SẮT BruteSafe và găng tay cao su! Khải nợ cá độ bóng đá hơn trăm triệu bị xã hội đen đến sảnh đòi hôm qua! Đề nghị công an tống giam Khải ngay!',
            likes: 82,
            comments: [
              {
                id: 'c-cc-1',
                user: 'Bác Trưởng Tầng 8',
                avatar: '👴',
                time: '21:48',
                content: 'Nuôi ong tay áo! Đề nghị Ban quản lý sa thải và kiện ra toà!',
              },
              {
                id: 'c-cc-2',
                user: 'Khải Kỹ Thuật',
                avatar: '🔧',
                time: '21:52',
                content: 'Tôi bị oan! Lúc 21:05 tôi xuống hầm kiểm tra cầu dao thì bị ai đó đánh lén bằng cờ-lê từ phía sau bất tỉnh! Máy bẻ khóa trong balo là do ai đó cố tình nhét vào, tem niêm phong hãng còn nguyên tôi chưa từng bóc! Chị Lan kế toán mới là người biết mật mã két sắt và chiều nay vừa chuyển 200 triệu ra nước ngoài kìa!',
              },
              {
                id: 'c-cc-3',
                user: 'Lan Kế Toán',
                avatar: '💼',
                time: '21:56',
                content: 'Anh Khải đừng có nói xằng bậy! 200 triệu đó là tôi chuyển học phí cho con gái đi du học Úc từ tài khoản tiết kiệm riêng của tôi, có thư báo nhập học trường Monash đối chiếu đàng hoàng!',
              },
            ],
          },
        ],
      },

      {
        id: 'dat',
        name: 'Quản Lý Đạt',
        slug: 'dat.manager.horizon',
        avatar: '👔',
        role: 'Quản lý vận hành Tòa Nhà Chung Cư 42',
        bio: 'Kỷ luật, an toàn và trách nhiệm.',
        livesIn: 'Hà Nội',
        relationship: 'Đã kết hôn',
        coverColor: 'from-slate-700 to-slate-900',
        posts: [
          {
            id: 'p-dat-1',
            time: '21:35 · Thứ Bảy',
            content: 'Ban quản lý đang phối hợp chặt chẽ với cơ quan công an để làm rõ sự cố mất điện và vụ mất trộm quỹ bảo trì tại văn phòng tầng 2. Cư dân toà nhà yên tâm giữ trật tự an ninh.',
            likes: 14,
            comments: [
              {
                id: 'c-dat-1',
                user: 'Bác Bảy Dân Phòng',
                avatar: '🏢',
                time: '21:55',
                content: 'Mong anh Đạt và BQL toà nhà sớm phối hợp với cơ quan công an làm rõ vụ việc, lấy lại quỹ bảo trì 200 triệu cho bà con cư dân!',
              },
              {
                id: 'c-dat-2',
                user: 'Cư Dân Tầng 14',
                avatar: '🏢',
                time: '21:58',
                content: 'Cả tòa nhà tối nay đang tá hỏa vì cúp điện hầm B2, trên hệ thống [BMS Tòa Nhà](https://bms-building.vn) ghi rõ có người tự ý gạt cầu dao tổng và quẹt thẻ thang máy lúc 21h12 kìa!',
              },
              {
                id: 'c-dat-3',
                user: 'Bảo Vệ Ca Ngày',
                avatar: '👮',
                time: '22:02',
                content: 'Kiểm tra [Camera Bãi Xe Tầng Hầm](https://camera-phuong.gov.vn) xem ai giấu túi đồ đen sau đuôi xe máy!',
              },
            ],
          },
        ],
      },
      {
        id: 'tu',
        name: 'Tư Bảo Vệ',
        slug: 'tu.security.night',
        avatar: '👮',
        role: 'Bảo vệ ca đêm toà nhà',
        bio: 'Trực an ninh toà nhà và trông coi hầm gửi xe.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-stone-700 to-zinc-900',
        posts: [
          {
            id: 'p-tu-1',
            time: '21:20 · Thứ Bảy',
            content: 'Tầng hầm nhảy aptomat tối om, tôi đang đi tuần tra tầng 1 nha bà con.',
            likes: 6,
            comments: [
              {
                id: 'c-tu-1',
                user: 'Camera An Ninh',
                avatar: '📹',
                time: '21:22',
                content: 'Xe máy biển 29-X1 của Tư đỗ chắn trước cửa hầm từ 21:15!',
                clueId: 'camera-tu-canh-gioi',
                clueLabel: 'Xe của Tư đỗ trước cửa hầm lúc 21:15 mâu thuẫn lời khai',
              },
            ],
          },
        ],
      },
      {
        id: 'lan',
        name: 'Lan Kế Toán',
        slug: 'lan.accountant.42',
        avatar: '💼',
        role: 'Kế toán toà nhà chung cư',
        bio: 'Sổ sách, hoá đơn, thu chi toà nhà.',
        livesIn: 'Hà Nội',
        relationship: 'Đã kết hôn',
        coverColor: 'from-cyan-700 to-blue-900',
        posts: [
          {
            id: 'p-lan-1',
            time: '20:15 · Thứ Bảy',
            content: 'Nay sốt xuất huyết mệt quá xin anh Đạt về từ 19:55, vừa về tới nhà nhận đơn cơm nóng.',
            likes: 19,
            comments: [],
          },
        ],
      },
      {
        id: 'tuyet',
        name: 'Bà Tuyết Thanh Tra',
        slug: 'tuyet.inspector',
        avatar: '👩‍💼',
        role: 'Trưởng ban kiểm soát cư dân · Căn 502',
        bio: 'Công khai, minh bạch quỹ bảo trì cư dân. Kiên quyết làm rõ thất thoát.',
        livesIn: 'Toà nhà Horizon 42',
        relationship: 'Đã kết hôn',
        coverColor: 'from-amber-600 to-slate-900',
        posts: [
          {
            id: 'p-tuyet-1',
            time: '20:15 · Thứ Bảy',
            content: 'Hôm nay ban kiểm soát đã niêm phong sổ sách yêu cầu kiểm toán 200 triệu tiền quỹ bảo trì sáng mai! Đạt quản lý toà nhà có dấu hiệu né tránh không dám ký biên bản đối soát!',
            likes: 42,
            comments: [],
          },
        ],
      },
      {
        id: 'huy_ship',
        name: 'Huy Shipper Đêm',
        slug: 'huy.shipper.night',
        avatar: '🛵',
        role: 'Tài xế giao đồ ăn công nghệ',
        bio: 'Ship đêm khu vực Ba Đình - Đống Đa. Bất chấp mưa gió.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-emerald-700 to-slate-900',
        posts: [
          {
            id: 'p-huy-1',
            time: '21:15 · Thứ Bảy',
            content: 'Đang giao đơn phở gà lên tầng 3 thì toà nhà Horizon mất điện cái rụp, kẹt thang máy hơn 15 phút toát mồ hôi hột! Lúc ra thang bộ thấy có bóng người áo đen vội vã lách qua cửa hầm rác!',
            likes: 18,
            comments: [],
          },
        ],
      },
    ]
  }

  // Case 5: Án mạng Biệt Thự Hoàng Khang (Phòng kín)
  if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
    return [
      {
        id: 'biet_thu_tin_tuc',
        name: 'Gia Tộc Họ Hoàng & Bạn Hữu',
        slug: 'giatoc.hoang',
        avatar: '🏛️',
        role: 'Trang thông tin gia đình',
        bio: 'Tưởng nhớ cụ Hoàng Văn Khang. Yêu cầu làm rõ sự thật về cái chết oan khuất.',
        livesIn: 'Biệt Thự Hàng Chai',
        relationship: 'Gia đình',
        coverColor: 'from-slate-700 to-zinc-900',
        posts: [
          {
            id: 'p-bt-1',
            time: '22:40 · Thứ Sáu',
            content: 'ÔNG KHANG BỊ HẠ ĐỘC TRONG PHÒNG TRÀ TẦNG 2! Người đáng ngờ nhất chính là lão Trọng Cổ Vật! Chiều nay lão Trọng đến đập bàn đe dọa đòi cướp bức tượng cổ thời Trần 2 tỷ, hét lớn: "Ông không nhượng lại thì đừng hòng sống qua đêm nay!" Trên xe lão Trọng có một lọ độc thảo mộc, công an bắt lão Trọng đền mạng cho ông tôi ngay!',
            likes: 95,
            comments: [
              {
                id: 'c-bt-1',
                user: 'Yến Giúp Việc',
                avatar: '🧹',
                time: '22:43',
                content: 'Chính mắt tôi thấy lão Trọng hằm hằm đe dọa ông chủ lúc chiều! Lão Trọng ác độc lắm!',
              },
              {
                id: 'c-bt-2',
                user: 'Trọng Cổ Vật',
                avatar: '🏺',
                time: '22:46',
                content: 'Con giúp việc kia mày câm mồm! Lọ hóa chất trên xe tao là dung dịch tẩy men gốm sứ cổ tao vừa mua bên Hàng Bạc có hóa đơn! Suốt từ 21h đến 23h tao ngồi uống rượu với hai đối tác tại The Moon Lounge camera quay nét căng! Tao nghi con Hà em gái ông Khang, chiều nay bị ông Khang gạch tên khỏi di chúc thừa kế căn biệt thự 30 tỷ nên hậm hực ra về!',
              },
              {
                id: 'c-bt-3',
                user: 'Bà Hà Em Gái',
                avatar: '💄',
                time: '22:50',
                content: 'Anh Trọng ăn nói cho cẩn thận! Tôi về nhà livestream bán hàng từ 20h30 đến 22h30 hàng nghìn người theo dõi trực tiếp, tôi cần gì tranh giành tài sản với anh trai tôi?!',
              },
            ],
          },
        ],
      },

      {
        id: 'vu',
        name: 'Bác Sĩ Vũ Hoàng',
        slug: 'dr.vuhoang',
        avatar: '👨‍⚕️',
        role: 'Bác sĩ riêng · Cháu ruột nạn nhân',
        bio: 'Chuyên khoa Độc chất & Tim mạch. Phòng khám tư Hoàng Vũ.',
        livesIn: 'Biệt thự Hoàng Khang',
        relationship: 'Độc thân',
        coverColor: 'from-teal-800 to-slate-900',
        posts: [
          {
            id: 'p-vu-1',
            time: '22:30 · Thứ Sáu',
            content: 'Nhận được tin báo từ người giúp việc lúc 22h, tôi vội vã phóng xe từ phòng khám riêng về biệt thự nhưng tim bác đã ngừng đập... Đau đớn tột cùng trước sự ra đi đột ngột của bác ruột. Xin vĩnh biệt bác kính yêu 🕯️',
            likes: 29,
            comments: [
              {
                id: 'c-vu-1',
                user: 'Kỹ Sư Smart Home',
                avatar: '☕',
                time: '22:35',
                content: 'Chia buồn sâu sắc cùng gia đình bác sĩ Vũ. Hệ thống thiết bị thông minh trong biệt thự tối nay vẫn lưu trữ nhật ký đầy đủ, sẵn sàng bàn giao cho cơ quan điều tra.',
              },
              {
                id: 'c-vu-2',
                user: 'Hàng Xóm Biệt Thự',
                avatar: '🏘️',
                time: '22:38',
                content: 'Bác sĩ Vũ tận tâm chăm sóc sức khỏe cho cụ Khang bao năm nay, ai ngờ đêm nay lại xảy ra đại họa...',
              },
              {
                id: 'c-vu-3',
                user: 'Quản Gia Biệt Thự',
                avatar: '🍵',
                time: '22:42',
                content: 'Khổ thân ông chủ quá, chiều nay ông Trọng buôn đồ cổ đập bàn đe dọa đòi nợ ghê gớm, mong công an điều tra làm rõ lão Trọng!',
              },
            ],
          },
        ],
      },
      {
        id: 'ha',
        name: 'Bà Hà Em Gái Nạn Nhân',
        slug: 'ha.livestream.pro',
        avatar: '📱',
        role: 'Em gái nạn nhân · Bán hàng online',
        bio: 'Livestream bán yến sào, đông trùng hạ thảo.',
        livesIn: 'Hà Nội',
        relationship: 'Đã kết hôn',
        coverColor: 'from-pink-600 to-rose-900',
        posts: [
          {
            id: 'p-ha-1',
            time: '21:45 · Thứ Sáu',
            content: 'Livestream bán hàng liên tục từ 20h00 đến 22h00 có hơn 1200 người xem chứng kiến!',
            likes: 85,
            clueId: 'ha-livestream',
            clueLabel: 'Alibi của bà Hà livestream từ 20h đến 22h',
            comments: [],
          },
        ],
      },
      {
        id: 'trong',
        name: 'Trọng Thương Nhân Cổ Vật',
        slug: 'trong.covat.antique',
        avatar: '🏺',
        role: 'Đối tác buôn bán cổ vật · Cháu họ',
        bio: 'Đam mê đồ gốm sứ thời Lý - Trần.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-yellow-800 to-stone-900',
        posts: [
          {
            id: 'p-trong-1',
            time: '21:30 · Thứ Sáu',
            content: 'Đang họp mặt câu lạc bộ cổ vật tại nhà hàng The Moon Lounge từ 21:00 đến 23:00 cùng 2 đối tác kinh doanh.',
            likes: 27,
            clueId: 'trong-alibi-bar',
            clueLabel: 'Alibi của Trọng tại The Moon Lounge từ 21h đến 23h',
            comments: [],
          },
        ],
      },
      {
        id: 'tram',
        name: 'Bảo Trâm Người Mẫu',
        slug: 'tram.model.glamour',
        avatar: '👠',
        role: 'Người mẫu tự do · Vợ sắp cưới',
        bio: 'Sống vì đam mê và nghệ thuật ✨ Life is short, live it glamorously.',
        livesIn: 'Cầu Giấy, Hà Nội',
        relationship: 'Đang hẹn hò',
        coverColor: 'from-fuchsia-600 to-pink-900',
        posts: [
          {
            id: 'p-tram-1',
            time: '21:40 · Thứ Sáu',
            content: 'Vừa về tới căn hộ riêng sau bữa tối nhẹ nhàng cùng anh Khang. Uống ngụm trà ấm trước khi ngủ, mong anh yêu mau bình phục sức khoẻ ❤️',
            likes: 95,
            comments: [],
          },
        ],
      },
      {
        id: 'tuan_bv',
        name: 'Tuấn Bảo Vệ',
        slug: 'tuan.security.gate',
        avatar: '👮',
        role: 'Bảo vệ ca đêm · Biệt thự Hoàng Khang',
        bio: 'Trực an ninh biệt thự. Ai ra vào đều phải xuất trình giấy tờ.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-slate-700 to-neutral-900',
        posts: [
          {
            id: 'p-tuan-1',
            time: '20:30 · Thứ Sáu',
            content: 'Vừa bị mấy người đến bốt gác quấy rối tiền nong làm phân tâm, chùm chìa khóa cổng phụ treo ở bàn trực biến đâu mất tiêu!',
            likes: 8,
            comments: [],
          },
        ],
      },
    ]
  }


  // Case 6: Du Thuyền Sông Hồng - Bắt Cóc Con Tin
  if (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
    return [
      {
        id: 'hoi_du_thuyen',
        name: 'Hội Du Thuyền Thượng Lưu Sông Hồng',
        slug: 'hoiduthuyen.songhong',
        avatar: '🚢',
        role: 'Cộng đồng khách VIP Horizon',
        bio: 'Sự kiện sinh nhật tiểu thư Thảo My trên du thuyền Horizon 5 sao.',
        livesIn: 'Du thuyền Horizon',
        relationship: 'Cộng đồng',
        coverColor: 'from-sky-700 to-indigo-900',
        posts: [
          {
            id: 'p-dt-1',
            time: '22:20 · Thứ Bảy',
            content: 'KHẨN CẤP: TIỂU THƯ THẢO MY BỊ BẮT CÓC TỐNG TIỀN 3 TỶ TRÊN DU THUYỀN! Trong túi tạp dề của nhân viên bồi bàn Nam vừa phát hiện chiếc điện thoại sim rác gửi tin nhắn tống tiền lúc 22:00! Thằng Nam nợ học phí sắp bị đuổi học nên túng làm liều! Bảo vệ đang bắt giữ nó chờ công an đường thủy tiếp nhận!',
            likes: 120,
            comments: [
              {
                id: 'c-dt-1',
                user: 'Bà Phương Mẹ Kế',
                avatar: '👵',
                time: '22:23',
                content: 'Tôi đã bảo ban tổ chức rồi, tuyển nhân viên thời vụ không rõ lai lịch là rước họa vào thân! Đề nghị tra khảo nó để tìm ra My ngay!',
              },
              {
                id: 'c-dt-2',
                user: 'Nam Bồi Bàn',
                avatar: '🤵',
                time: '22:26',
                content: 'Mọi người ơi em bị oan thật mà! Điện thoại đó là do ai đó lén nhét vào túi tạp dề của em lúc em bưng khay rượu qua chỗ đông người! Sao không ai hỏi thuyền trưởng Hải tại sao lúc 21h45 tự nhiên giảm tốc độ tàu ở phao số 04 để ca-nô tiếp cận? Tài khoản ông Hải chiều nay vừa nhận 300 triệu nặc danh kìa!',
              },
              {
                id: 'c-dt-3',
                user: 'Thuyền Trưởng Hải',
                avatar: '⚓',
                time: '22:30',
                content: 'Mày đừng có vu oan giáng họa thằng nhóc! Tàu giảm tốc là tuân thủ luồng hàng hải của Cảng vụ! Còn 300 triệu là tiền khách đặt cọc mua động cơ ca-nô cũ của tôi, có hợp đồng kinh tế ký tại văn phòng đường thủy!',
              },
            ],
          },
        ],
      },

      {
        id: 'minh-khang',
        name: 'Minh Khang',
        slug: 'khang.invest',
        avatar: '🤵',
        role: 'CEO Khang Holdings · Hôn phu Thảo My',
        bio: 'Đầu tư mạo hiểm, dẫn đầu xu thế tài chính. Đêm sinh nhật tuyệt vời cùng em @thaomy ✨',
        livesIn: 'Hà Nội',
        relationship: 'Đã đính hôn',
        coverColor: 'from-amber-600 to-slate-900',
        posts: [
          {
            id: 'p-mk-1',
            time: '22:15 · Hôm nay',
            content: 'My ơi em đang ở đâu?! Tôi xin treo thưởng 500 triệu đồng tiền túi cho bất kỳ ai cung cấp tung tích của Thảo My! Cầu xin kẻ bắt cóc đừng làm hại cô ấy, bao nhiêu tiền chuộc tôi và gia đình cũng sẽ thu xếp!',
            likes: 184,
            comments: [
              {
                id: 'c-mk-1',
                user: 'Bà Phương',
                avatar: '👠',
                time: '20:45',
                content: 'Hai đứa đẹp đôi quá, chúc các con hạnh phúc.',
              },
              {
                id: 'c-mk-2',
                user: 'Khách Du Lịch Bến Bạch Đằng',
                avatar: '🛳️',
                time: '22:38',
                content: 'Lúc 22h35 có người thấy ca nô cao tốc xé nước chạy ra phao số 4 giữa sông Hồng, [Camera Bến Cảng Sông Hồng](https://camera-phuong.gov.vn) ghi rõ bóng người mặc áo mưa tím!',
              },
              {
                id: 'c-mk-3',
                user: 'Nhân Viên Điều Phối Cảng',
                avatar: '⚓',
                time: '22:42',
                content: 'Có đơn giao hàng hoả tốc bí mật GN-99801 trên [GiaoNhanh Đường Thủy](https://giaonhanh.vn) chuyển 2 vali ra ngoài phao số 4 lúc 22h20!',
              },
              {
                id: 'c-mk-4',
                user: 'Cổ Đông Khang Holdings',
                avatar: '💼',
                time: '22:45',
                content: 'Khang ơi bình tĩnh, anh em đối tác đang sẵn sàng hỗ trợ tài chính để gia đình đáp ứng yêu cầu của kẻ bắt cóc, cứu tiểu thư về an toàn!',
              },
            ],
          },
        ],
      },
      {
        id: 'thao-my',
        name: 'Thảo My',
        slug: 'thaomy.dongduong',
        avatar: '💃',
        role: 'Ái nữ tập đoàn Đông Dương',
        bio: 'Cuộc sống là những chuyến đi và sự tự do. Đừng ai kiểm soát tôi!',
        livesIn: 'Hà Nội',
        coverColor: 'from-purple-600 to-pink-800',
        posts: [
          {
            id: 'p-tm-1',
            time: '19:15 · Hôm nay',
            content: 'Nhiều lúc chỉ muốn biến mất đến một nơi thật xa không ai biết mình là ai...',
            likes: 92,
            comments: [],
          },
        ],
      },
      {
        id: 'nam-boi-ban',
        name: 'Nam Bồi Bàn',
        slug: 'nam.student.hust',
        avatar: '🧑‍🍳',
        role: 'Nhân viên phục vụ part-time du thuyền',
        bio: 'Sinh viên làm thêm kiếm tiền đóng học phí. Cố gắng mỗi ngày!',
        livesIn: 'Hai Bà Trưng, Hà Nội',
        coverColor: 'from-blue-600 to-indigo-800',
        posts: [
          {
            id: 'p-nam-1',
            time: '18:00 · Hôm nay',
            content: 'Vào ca phục vụ tiệc sinh nhật VIP tầng 3 du thuyền đêm nay. Mong một đêm suôn sẻ!',
            likes: 22,
            comments: [],
          },
        ],
      },
      {
        id: 'thuyen-truong-hai',
        name: 'Thuyền Trưởng Hải',
        slug: 'hai.captain.songhong',
        avatar: '⚓',
        role: 'Thuyền trưởng du thuyền Sông Hồng Princess',
        bio: '30 năm gắn bó với luồng lạch sông Hồng. An toàn hành khách là số một.',
        livesIn: 'Hà Nội',
        coverColor: 'from-cyan-700 to-blue-900',
        posts: [
          {
            id: 'p-hai-1',
            time: '18:30 · Hôm nay',
            content: 'Du thuyền nhổ neo lúc 19:00 phục vụ hải trình tiệc sinh nhật theo hợp đồng. Thời tiết mặt sông êm đẹp.',
            likes: 35,
            comments: [],
          },
        ],
      },
      {
        id: 'ba-phuong',
        name: 'Bà Phương',
        slug: 'phuong.le.luxury',
        avatar: '👠',
        role: 'Phu nhân Chủ tịch · Mẹ kế Thảo My',
        bio: 'Cuộc sống thượng lưu, thời trang & trang sức đá quý.',
        livesIn: 'Hà Nội',
        coverColor: 'from-rose-600 to-slate-900',
        posts: [
          {
            id: 'p-bp-1',
            time: '20:00 · Hôm nay',
            content: 'Bữa tiệc ấm cúng trên du thuyền riêng của gia đình. Chúc mừng con gái bước sang tuổi mới.',
            likes: 110,
            comments: [],
          },
        ],
      },
      {
        id: 'quoc_huy',
        name: 'DJ Quốc Huy',
        slug: 'quochuy.dj.beat',
        avatar: '🎧',
        role: 'DJ Producer · Âm thanh sự kiện',
        bio: 'Music is my soul 🎶 Chuyên set nhạc VIP & sự kiện du thuyền hạng sang.',
        livesIn: 'TP. Hồ Chí Minh',
        relationship: 'Độc thân',
        coverColor: 'from-cyan-600 to-indigo-900',
        posts: [
          {
            id: 'p-qh-1',
            time: '21:30 · Hôm nay',
            content: 'Set nhạc sinh nhật tối nay du thuyền Horizon cháy quá! Anh Khang dặn đúng 21h40 tắt đèn ngoài trời chuẩn bị thổi nến tạo bất ngờ cho My!',
            likes: 74,
            comments: [],
          },
        ],
      },
      {
        id: 'mai_lan',
        name: 'Mai Lan Quản Lý',
        slug: 'mailan.manager.yacht',
        avatar: '👩‍💼',
        role: 'Quản lý trưởng du thuyền Horizon',
        bio: 'Vận hành du thuyền 5 sao Horizon River Cruise. An toàn hàng hải là trên hết.',
        livesIn: 'TP. Hồ Chí Minh',
        relationship: 'Đã kết hôn',
        coverColor: 'from-blue-700 to-slate-900',
        posts: [
          {
            id: 'p-ml-1',
            time: '21:15 · Hôm nay',
            content: 'Kiểm tra trang thiết bị phao cứu sinh và ca-nô phụ tại phao số 4 trước khi du thuyền di chuyển qua khu vực luồng hẹp.',
            likes: 38,
            comments: [],
          },
        ],
      },
    ]
  }
  return []
}

/** Danh sách đơn hàng GiaoNhanh (CHỈ DÀNH RIÊNG CHO VỤ 1) */
export function getDeliveryOrders(caseId: string): DeliveryOrder[] {
  if (caseId === 'hem42') {
    return [
      {
        id: 'GN-88210',
        driver: 'Nguyễn Văn Nam',
        driverPhone: '0981xxx112',
        time: '20:15',
        pickup: 'Số 10 Hàng Gai',
        drop: 'Số 4 Hàng Trống',
        fee: '22.000đ',
        status: 'Đã hoàn tất',
        timeline: [
          { time: '20:00', event: 'Tiếp nhận đơn hàng' },
          { time: '20:10', event: 'Lấy hàng tại Hàng Gai' },
          { time: '20:15', event: 'Giao thành công tại Hàng Trống' },
        ],
      },
      {
        id: 'GN-88212',
        driver: 'Trần Văn Sơn',
        driverPhone: '0973xxx456',
        time: '21:44',
        pickup: 'Trà Sữa Hẻm 46',
        drop: 'Hẻm 46 phố Hàng Chai (Giao cho chị Hoa)',
        fee: '25.000đ',
        status: 'Đã hoàn tất',
        clueId: 'son-don-hang',
        clueLabel: 'Biên lai giao hàng tại Hẻm 46 mang tên tài xế Sơn lúc 21:44',
        timeline: [
          { time: '21:20', event: 'Tiếp nhận đơn' },
          { time: '21:38', event: 'Định vị GPS: Lái xe qua đầu Hẻm 42 vào Hẻm 46' },
          { time: '21:44', event: 'Chụp ảnh xác nhận giao hàng cho chị Hoa tại Hẻm 46' },
        ],
      },
      {
        id: 'GN-88214',
        driver: 'Dũng (d.ship.42)',
        driverPhone: '0915xxx334',
        time: '21:47',
        pickup: 'Hẻm 42 — Quán net Hùng',
        drop: 'Hẻm 44 phố Hàng Chai',
        fee: '28.000đ',
        status: 'Đã hoàn tất',
        clueId: 'don-hang-2147',
        clueLabel: 'Đơn GiaoNhanh lúc 21:47 tại Hẻm 42 của Dũng',
        timeline: [
          { time: '21:35', event: 'Tài xế Dũng nhận cuốc qua app' },
          { time: '21:47', event: 'Định vị GPS: Có mặt lấy hàng tại Hẻm 42!' },
          { time: '21:52', event: 'Giao xong tại Hẻm 44, xác nhận hoàn tất' },
        ],
      },
    ]
  }

  // Vụ 2: Sân Cầu Lông - Đơn giao trà sữa cho Linh lúc 20:30
  if (caseId === 'tu-do' || caseId === 'cau-long') {
    return [
      {
        id: 'GN-20301',
        driver: 'Phạm Minh Quân',
        driverPhone: '0968xxx119',
        time: '20:30',
        pickup: 'Trà Sữa Gongcha - 12 Hoàng Hoa Thám',
        drop: 'Quầy Nước Sân Cầu Lông Tự Do (Người nhận: Linh Quầy Nước)',
        fee: '32.000đ',
        status: 'Đã hoàn tất',
        clueId: 'linh-don-trasua',
        clueLabel: 'Đơn giao trà sữa cho Linh lúc 20:30 xác nhận Linh ở quầy nước',
        timeline: [
          { time: '20:15', event: 'Tài xế nhận đơn trà sữa' },
          { time: '20:25', event: 'Đến cổng sân cầu lông' },
          { time: '20:30', event: 'Giao tận tay nhân viên Linh tại quầy nước' },
        ],
      },
    ]
  }

  // Vụ 3: Hội Chợ Từ Thiện - Đơn giao bánh bao cho Tú Tài Chính lúc 21:05
  if (caseId === 'hoi-cho' || caseId === 'chua-phap-hoa') {
    return [
      {
        id: 'GN-30115',
        driver: 'Hoàng Văn Bách',
        driverPhone: '0934xxx882',
        time: '21:05',
        pickup: 'Tiệm Bánh Bao Kim Phụng',
        drop: 'Bàn Trà Quán Phúc (Người nhận: Tú Tài Chính)',
        fee: '24.000đ',
        status: 'Đã hoàn tất',
        clueId: 'tu-don-doan',
        clueLabel: 'Đơn GiaoNhanh lúc 21:05 xác nhận Tú đang ngồi ăn tại quán trà Phúc',
        timeline: [
          { time: '20:48', event: 'Tài xế lấy 2 phần bánh bao nóng' },
          { time: '21:05', event: 'Giao tận bàn cho Tú tại Quán Trà Phúc' },
        ],
      },
    ]
  }

  // Vụ 4: Kho Hàng Đêm - Đơn giao cơm hộp cho Lan Kế Toán lúc 20:10
  if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
    return [
      {
        id: 'GN-40228',
        driver: 'Lê Văn Thắng',
        driverPhone: '0909xxx315',
        time: '20:10',
        pickup: 'Cơm Tấm Sài Gòn - 88 Nguyễn Trãi',
        drop: 'Chung cư SkyView Căn 802 (Lan Kế Toán)',
        fee: '28.000đ',
        status: 'Đã hoàn tất',
        clueId: 'lan-don-com',
        clueLabel: 'Đơn giao đồ ăn nhận tại căn hộ riêng lúc 20:10',
        timeline: [
          { time: '19:50', event: 'Tài xế nhận đơn cơm tấm' },
          { time: '20:10', event: 'Giao thành công tại sảnh căn hộ của Lan' },
        ],
      },
    ]
  }

  // Vụ 5: Biệt Thự Hoa Hồng - Đơn giao yến sào áo mưa tím cạnh nhà lúc 22:45
  if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
    return [
      {
        id: 'GN-50341',
        driver: 'Võ Minh Trí (Đồng phục GiaoNhanh + Áo mưa cánh dơi tím)',
        driverPhone: '0977xxx902',
        time: '22:45',
        pickup: 'Yến Sào Cung Đình - 14 Phan Bội Châu',
        drop: 'Số 46 Biệt Thự Liền Kề (Nhà hàng xóm ông Hùng)',
        fee: '35.000đ',
        status: 'Đã hoàn tất',
        clueId: 'shipper-ao-tim',
        clueLabel: 'Đơn vận chuyển hoả tốc kiện hàng yến sào lúc 22:45',
        timeline: [
          { time: '22:30', event: 'Nhận hộp quà yến sào' },
          { time: '22:45', event: 'Giao cho chủ nhà số 46 cạnh biệt thự, quay xe về' },
        ],
      },
    ]
  }


  // Vụ 6: Du Thuyền Sông Hồng - Đơn vận chuyển hành lý ra phao số 4 lúc 21:30
  if (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
    return [
      {
        id: 'GN-99801',
        driver: 'Nguyễn Văn Đạt (GiaoNhanh Đường Thủy)',
        driverPhone: '0912xxx883',
        time: '21:30',
        pickup: 'Cầu tàu số 2 Bến Sông Hồng (Khách hàng Horizon Media)',
        drop: 'Phao neo hàng hải số 4 (Kiện hàng tư trang bọc nylon chuyển lên ca nô)',
        fee: '120.000đ',
        status: 'Đã hoàn tất',
        clueId: 'vali-minh-khang',
        clueLabel: 'Phiếu vận chuyển GN-99801: Giao 2 kiện hành lý ra ca nô tại phao số 4 lúc 21:30',
        timeline: [
          { time: '21:15', event: 'Tiếp nhận đơn vận chuyển đường sông' },
          { time: '21:30', event: 'Bốc 2 vali hành lý tại cầu tàu số 2' },
          { time: '21:42', event: 'Chuyển giao lên ca nô cao tốc neo sẵn tại phao số 4' },
        ],
      },
    ]
  }
  return []
}

/** Danh sách tin rao vặt Chợ Tốt (CHỈ DÀNH CHO VỤ 1 VÀ VỤ 2) */
export function getChoTotListings(caseId: string): ChoTotListing[] {
  // Vụ 1: Vy bán xe Asama đỏ cũ (Yếu tố gây nhiễu)
  if (caseId === 'hem42') {
    return [
      {
        id: 'CT-101',
        title: 'Cần tiền gấp đóng tiền phòng trọ thanh lý xe đạp điện Asama đỏ cũ pin còn tốt',
        price: '2.500.000 đ',
        time: '18:00 · 3 ngày trước',
        seller: 'Vy Sinh Viên (vy.socute)',
        phone: '0963xxx789',
        location: 'Hẻm 42 phố Hàng Chai, Ba Đình, Hà Nội',
        category: 'Xe đạp, Xe điện',
        desc: 'Xe đạp điện Asama màu đỏ chính chủ em mua từ năm nhất. Do nợ tiền trọ 2 tháng chủ nhà đòi gấp nên em pass lại 2.5tr. Máy móc bình thường, có sạc zin.',
        img: 'detective/chotot-asama-do.jpg',
        clueId: 'vy-xe-do',
        clueLabel: 'Vy bán xe Asama đỏ của mình từ 3 hôm trước (không phải xe xanh của cô Lan)',
      },
      {
        id: 'CT-102',
        title: 'Thanh lý 5 màn hình máy tính Samsung 24 inch quán net',
        price: '1.200.000 đ',
        time: '19:00 · Hôm nay',
        seller: 'Hùng Quán Net (0912xxx345)',
        phone: '0912xxx345',
        location: 'Quán Net Hùng, Hẻm 42 Hàng Chai',
        category: 'Máy tính, Phụ kiện',
        desc: 'Nâng cấp dàn máy cần bán bớt 5 màn hình cong 24 inch hoạt động tốt.',
      },
    ]
  }

  // Vụ 2: Sơn bán iPhone gài số Hào lúc 20:44
  if (caseId === 'tu-do' || caseId === 'cau-long') {
    return [
      {
        id: 'CT-201',
        title: 'Cần tiền trả nợ bán gấp iPhone 14 Pro Max Tím 128GB pin 98% máy trần không phụ kiện',
        price: '5.000.000 đ',
        time: '20:44 · Hôm nay',
        seller: 'Hào Đập Cầu (0982xxx999)',
        phone: '0982xxx999',
        location: 'Sân Cầu Lông Hẻm 42, Ba Đình, Hà Nội',
        category: 'Điện thoại, Thiết bị di động',
        desc: 'Pass nhanh iPhone 14 Pro Max màu tím mộng mơ còn mới 98%. Máy vừa dùng, không mật khẩu icloud. Ai qua sân cầu lông lấy luôn có fix xăng xe.',
        img: 'detective/chotot-iphone14.jpg',
        clueId: 'tin-nhan-ban',
        clueLabel: 'Tin rao bán iPhone trên Chợ Tốt kèm số điện thoại liên lạc lúc 20:44',
      },
      {
        id: 'CT-202',
        title: 'Vợt cầu lông Yonex Astrox 88D Pro 4U chính hãng cước BG65Ti 11kg',
        price: '3.200.000 đ',
        time: '19:30 · Hôm nay',
        seller: 'Hào Smash (0982xxx999)',
        phone: '0982xxx999',
        location: 'Sân Cầu Lông Ba Đình',
        category: 'Dụng cụ thể thao',
        desc: 'Vợt mới đan cước tuần trước, đánh hơi nặng đầu muốn đổi sang 88S Pro.',
        img: 'detective/chotot-yonex.jpg',
      },
    ]
  }

  // Các vụ khác không có rao vặt Chợ Tốt

  // Vụ 6: Nam bồi bàn rao bán xe Wave trả tiền trọ
  if (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
    return [
      {
        id: 'CT-688',
        title: 'Bán xe Wave Alpha đỏ chính chủ sinh viên đi giữ gìn',
        price: '6.000.000 đ',
        seller: 'Nam Bồi Bàn (nam.student)',
        phone: '0978xxx415',
        time: '14:00 · 4 ngày trước',
        location: 'Quận Hai Bà Trưng, Hà Nội',
        category: 'Xe cộ, Xe máy',
        desc: 'Cần tiền đóng học phí kỳ 1 và tiền phòng trọ nên nhượng lại xe Wave Alpha màu đỏ đăng ký 2019 máy móc êm ru, có bớt xăng xe cho bạn nào thiện chí.',
        img: 'detective/chotot-wave-alpha.jpg',
        clueId: 'chotot-ban-xe',
        clueLabel: 'Nam rao bán xe máy cũ từ 4 ngày trước đóng tiền học',
      },
    ]
  }
  return []
}

/** Danh sách biến động số dư VietinBank (VỤ 2, 3, 4, 5) */
export function getBankTransactions(caseId: string): BankTransaction[] {
  // Vụ 1: Hẻm 42 - Sao kê VietinBank
  if (caseId === 'hem42') {
    return [
      {
        id: 'TX-1008',
        time: '14:20:15 · Thứ Sáu',
        type: 'in',
        amount: '+5.000.000 VND',
        accountName: 'NGUYEN VAN DUNG',
        accountNo: '10884433xxxx',
        bank: 'VietinBank',
        balanceAfter: '5.240.000 VND',
        content: 'HUNG NET CHO VAY TIEN SUA XE HAN CHOT 12/9',
        clueId: 'hung-cho-vay',
        clueLabel: 'Sao kê VietinBank: Hùng chuyển Dũng vay 5 triệu hạn hôm nay',
      },
      {
        id: 'TX-1009',
        time: '19:40:00 · Thứ Sáu',
        type: 'out',
        amount: '-150.000 VND',
        accountName: 'NGUYEN VAN DUNG',
        accountNo: '10884433xxxx',
        bank: 'VietinBank',
        balanceAfter: '5.090.000 VND',
        content: 'TIEN XANG VA BUA TOI',
      },
      {
        id: 'TX-1010',
        time: '21:50:30 · Thứ Sáu',
        type: 'out',
        amount: '-6.000.000 VND',
        accountName: 'TRAN VAN SON',
        accountNo: '10772211xxxx',
        bank: 'VietinBank iPay',
        balanceAfter: '450.000 VND',
        content: 'SON SHIPPER NOP PHAT VI PHAM GIAO THONG KHO BAC',
      },
      {
        id: 'TX-1011',
        time: '20:30:00 · Thứ Sáu',
        type: 'in',
        amount: '+10.000.000 VND',
        accountName: 'LE MANH HUNG',
        accountNo: '10663399xxxx',
        bank: 'VietinBank',
        balanceAfter: '18.500.000 VND',
        content: 'KHACH DAT COC MUA XAC 2 XE DIEN CU THAO PHU TUNG',
      },
    ]
  }

  // Vụ 2: Sân cầu lông
  if (caseId === 'tu-do' || caseId === 'cau-long') {
    return [
      {
        id: 'TX-2011',
        time: '20:41:20 · Thứ Bảy',
        type: 'out',
        amount: '-2.000.000 VND',
        accountName: 'NGUYEN THI LINH',
        accountNo: '10992211xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'Linh dong hoc phi dai hoc ky 1',
        balanceAfter: '1.240.000 VND',
        clueId: 'chuyen-khoan-linh',
        clueLabel: 'Linh chuyển 2 triệu đóng học phí lúc 20:41 từ tài khoản chính chủ',
      },
      {
        id: 'TX-2012',
        time: '20:32:00 · Thứ Bảy',
        type: 'in',
        amount: '+150.000 VND',
        accountName: 'NGUYEN THI LINH',
        accountNo: '10992211xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'Khach san so 2 thanh toan nuoc uong',
        balanceAfter: '3.240.000 VND',
      },
      {
        id: 'TX-2013',
        time: '21:05:40 · Thứ Bảy',
        type: 'in',
        amount: '+5.500.000 VND',
        accountName: 'LE THANH HAO',
        accountNo: '10558833xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'Chuyen tien tra no keo ca do set 2 hom qua cho Hao',
        balanceAfter: '5.850.000 VND',
      },
      {
        id: 'TX-2014',
        time: '20:55:10 · Thứ Bảy',
        type: 'out',
        amount: '-1.500.000 VND',
        accountName: 'TRAN SON',
        accountNo: '10447722xxxx',
        bank: 'VietinBank',
        content: 'Tra tien thue phong tro thang 9',
        balanceAfter: '220.000 VND',
      },
    ]
  }

  // Vụ 3: Trang chuyển 8 triệu cho Tú lúc 21:32
  if (caseId === 'hoi-cho' || caseId === 'chua-phap-hoa') {
    return [
      {
        id: 'TX-99812',
        time: '21:32:15 · Thứ Bảy',
        type: 'out',
        amount: '-8.000.000 VND',
        accountName: 'NGUYEN THU TRANG',
        accountNo: '10882348xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'Trang banh mi chuyen tra no goc lai thang 9 cho anh Tu',
        balanceAfter: '142.500 VND',
        clueId: 'chuyen-tien-trang',
        clueLabel: 'Lệnh chuyển khoản 8 triệu của Trang lúc 21:32 trả nợ Tú',
      },
      {
        id: 'TX-99820',
        time: '21:34:00 · Thứ Bảy',
        type: 'in',
        amount: '+8.000.000 VND',
        accountName: 'VU DINH TU',
        accountNo: '10776655xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'Nhan 8.000.000 VND tu Nguyen Thu Trang',
        balanceAfter: '12.450.000 VND',
      },
      {
        id: 'TX-99825',
        time: '21:40:15 · Thứ Bảy',
        type: 'out',
        amount: '-15.000.000 VND',
        accountName: 'VU DINH TU',
        accountNo: '10776655xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'TU THANH TOAN NO GOC TIEN SO CRYPTO HAN CHOT',
        balanceAfter: '450.000 VND',
      },
      {
        id: 'TX-99828',
        time: '20:15:00 · Thứ Bảy',
        type: 'out',
        amount: '-5.000.000 VND',
        accountName: 'HOANG VAN KHOA',
        accountNo: '10662288xxxx',
        bank: 'ATM VietinBank Dinh Lang',
        content: 'RUT TIEN MAT TAI CAY ATM SAN DINH',
        balanceAfter: '820.000 VND',
      },
    ]
  }

  // Vụ 4: Đạt duyệt chuyển 200 triệu cho Bảy lúc 21:50
  if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
    return [
      {
        id: 'TX-4011',
        time: '21:50:44 · Thứ Bảy',
        type: 'out',
        amount: '-200.000.000 VND',
        accountName: 'CONG TY QUAN LY TOA NHA 42',
        accountNo: '10118833xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'Thanh toan tien mat so no Nguyen Van Bay (Duyet boi Quan ly Dat)',
        balanceAfter: '15.200.000 VND',
        clueId: 'lenh-chuyen-200tr',
        clueLabel: 'Lệnh chuyển khoản 200 triệu lúc 21:50 do Đạt ký duyệt',
      },
      {
        id: 'TX-4015',
        time: '20:00:10 · Thứ Bảy',
        type: 'in',
        amount: '+150.000.000 VND',
        accountName: 'NGUYEN VAN KHAI',
        accountNo: '10332211xxxx',
        bank: 'VietinBank',
        content: 'VAY TIEN MAT AP LAI THOA THUAN NHA CAI',
        balanceAfter: '150.320.000 VND',
      },
      {
        id: 'TX-4018',
        time: '20:15:30 · Thứ Bảy',
        type: 'out',
        amount: '-200.000.000 VND',
        accountName: 'NGUYEN THI LAN',
        accountNo: '10229988xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'LAN NOP HOC PHI DU HOC UC CON GAI MONASH UNIVERSITY',
        balanceAfter: '42.150.000 VND',
      },
    ]
  }

  // Vụ 5: Vũ chuyển cọc 200 triệu cho Yến giúp việc lúc 17:30
  if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
    return [
      {
        id: 'TX-88120',
        time: '17:30:22 · Thứ Sáu',
        type: 'in',
        amount: '+200.000.000 VND',
        accountName: 'NGUYEN THI YEN',
        accountNo: '10338872xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'Vu Hoang chuyen Yen giup viec tam ung sua nha',
        balanceAfter: '201.450.000 VND',
        clueId: 'vu-chuyen-yen-200tr',
        clueLabel: 'Giao dịch VietinBank: Lệnh uỷ nhiệm chi 200 triệu cho Nguyễn Thị Yến lúc 17:30',
      },
      {
        id: 'TX-88135',
        time: '22:45:00 · Thứ Sáu',
        type: 'out',
        amount: '-3.800.000 VND',
        accountName: 'LE DUC TRONG',
        accountNo: '10554433xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'POS The Moon Lounge Ba Dinh - Thanh toan hoa don ruou vang',
        balanceAfter: '85.200.000 VND',
        clueId: 'trong-alibi-bar',
        clueLabel: 'Hóa đơn thanh toán thẻ ngân hàng tại The Moon Lounge lúc 22:45',
      },
      {
        id: 'TX-88140',
        time: '19:30:15 · Thứ Sáu',
        type: 'in',
        amount: '+500.000.000 VND',
        accountName: 'LE DUC TRONG',
        accountNo: '10554433xxxx',
        bank: 'VietinBank',
        content: 'KHACH SG DAT COC MUA BUC TRANH CO THOI NGUYEN',
        balanceAfter: '585.200.000 VND',
      },
      {
        id: 'TX-88145',
        time: '22:30:00 · Thứ Sáu',
        type: 'in',
        amount: '+50.000.000 VND',
        accountName: 'HOANG THI HA',
        accountNo: '10443388xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'DOANH THU TIKTOK SHOP LIVESTREAM MY PHAM TOI NAY',
        balanceAfter: '112.500.000 VND',
      },
    ]
  }

  // Vụ 6: Lệnh chuyển 3 tỷ tiền chuộc vào tài khoản Cty Horizon lúc 22:45
  if (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
    return [
      {
        id: 'TX-77102',
        time: '22:45:00 · Thứ Bảy',
        type: 'in',
        amount: '+3.000.000.000 VND',
        accountName: 'CTY CP TRUYEN THONG HORIZON',
        accountNo: '10889966xxxx',
        bank: 'VietinBank',
        balanceAfter: '3.045.200.000 VND',
        content: 'QUACH DINH PHU GIAI NGAN HOP DONG DU THUYEN THEO YEU CAU KHAN',
        clueId: 'vietinbank-chuyen-tien-chuoc',
        clueLabel: 'Giao dịch VietinBank: Giải ngân 3 tỷ vào tài khoản Cty Sự Kiện Horizon lúc 22:45',
      },
      {
        id: 'TX-77103',
        time: '21:10:00 · Thứ Bảy',
        type: 'in',
        amount: '+50.000.000 VND',
        accountName: 'NGUYEN HOANG NAM',
        accountNo: '10668822xxxx',
        bank: 'VietinBank iPay',
        content: 'Vay nong lai ngay giai quyet viec gia dinh',
        balanceAfter: '51.200.000 VND',
      },
      {
        id: 'TX-77104',
        time: '21:15:00 · Thứ Bảy',
        type: 'in',
        amount: '+50.000.000 VND',
        accountName: 'DJ QUOC HUY',
        accountNo: '10774411xxxx',
        bank: 'VietinBank iPay',
        content: 'Thanh toan truyen thong va am thanh du thuyen Horizon',
        balanceAfter: '88.500.000 VND',
      },
      {
        id: 'TX-77108',
        time: '17:45:20 · Thứ Bảy',
        type: 'in',
        amount: '+300.000.000 VND',
        accountName: 'TRAN VAN HAI',
        accountNo: '10775533xxxx',
        bank: 'VietinBank',
        content: 'CONG TY SONG HONG DAT COC DONG CO CA NO CU XUONG HAI',
        balanceAfter: '315.800.000 VND',
      },
      {
        id: 'TX-77112',
        time: '19:20:00 · Thứ Bảy',
        type: 'out',
        amount: '-500.000.000 VND',
        accountName: 'LE THI PHUONG',
        accountNo: '10998811xxxx',
        bank: 'VietinBank VIP Priority',
        content: 'DAT COC TRANG SUC KIM CUONG CARTIER DIAMOND LUXURY',
        balanceAfter: '1.240.000.000 VND',
      },
    ]
  }
  return []
}

/** Danh sách nhật ký BMS toà nhà & Smart Home IoT (CHỈ DÀNH CHO VỤ 4 VÀ VỤ 5) */
export function getBmsLogs(caseId: string): BmsDeviceLog[] {
  // Vụ 4: BMS Tòa Nhà Chung Cư 42
  if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
    return [
      {
        id: 'BMS-401',
        time: '21:05',
        device: 'Thang máy P1 Tòa nhà Chung Cư 42',
        location: 'Tầng hầm B2 lên Tầng 3',
        status: 'normal',
        event: 'Quẹt thẻ từ ID: NV-001 (Quản lý Đạt). Thang di chuyển Tầng 3.',
      },
      {
        id: 'BMS-402',
        time: '21:10',
        device: 'Aptomat Tổng Tầng hầm B1',
        location: 'Phòng kỹ thuật điện trung tâm',
        status: 'alert',
        event: 'CẢNH BÁO MẤT ĐIỆN: Cầu dao tổng tầng hầm B1 bị ngắt thủ công bằng tay! Toàn bộ camera an ninh và quầy kỹ thuật Khải mất nguồn!',
        clueId: 'tu-tat-dien',
        clueLabel: 'Cảnh báo BMS: Cầu dao tổng tầng hầm bị ngắt thủ công lúc 21:10',
      },
      {
        id: 'BMS-403',
        time: '21:28',
        device: 'Cửa thoát hiểm sau Tầng 1',
        location: 'Lối ra hẻm gom rác',
        status: 'warning',
        event: 'Cảm biến cửa thoát hiểm mở: Có người di chuyển ra lối họng rác chung cư trong 45 giây.',
      },
      {
        id: 'BMS-404',
        time: '21:30',
        device: 'Cảm biến tải trọng Họng rác Tầng 1',
        location: 'Họng xả rác số 1',
        status: 'warning',
        event: 'Phát hiện thả vật thể nặng 8.2kg xuống họng rác (Túi rác đen chứa găng tay dính máu và sổ nợ).',
        clueId: 'hong-rac-bms',
        clueLabel: 'Nhật ký BMS họng rác lúc 21:30 ghi nhận vật nặng 8.2kg',
      },
    ]
  }

  // Vụ 5: Smart Home IoT Biệt Thự Hoàng Khang (Ấm trà thông minh & Cầu dao)
  if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
    return [
      {
        id: 'IOT-501',
        time: '21:15',
        device: 'Cảm biến nhiệt độ phòng khách',
        location: 'Phòng khách tầng 1',
        status: 'normal',
        event: 'Nhiệt độ phòng ổn định: 24.5°C. Điều hòa hoạt động bình thường.',
      },
      {
        id: 'IOT-502',
        time: '21:20',
        device: 'Aptomat Tầng 2 Biệt Thự',
        location: 'Bảng điện phụ gầm cầu thang bếp',
        status: 'alert',
        event: 'Cầu dao Tầng 2 (Aptomat CB-02) bị ngắt thủ công từ công tắc phụ âm tường gầm cầu thang bếp.',
        clueId: 'camera-ngat',
        clueLabel: 'Nhật ký SmartHome: Cầu dao tầng 2 bị ngắt từ bếp lúc 21:20',
      },
      {
        id: 'IOT-503',
        time: '21:30',
        device: 'Ấm trà thông minh Smart Kettle',
        location: 'Bàn trà phòng đọc sách nạn nhân',
        status: 'warning',
        event: 'Ấm trà đun sôi đạt 100°C hoàn tất. Bắt đầu quá trình nguội tự nhiên.',
      },
      {
        id: 'IOT-504',
        time: '21:40',
        device: 'Ấm trà thông minh Smart Kettle',
        location: 'Bàn trà phòng đọc sách',
        status: 'normal',
        event: 'Cảm biến nhiệt độ nước trà: 71°C.',
      },
      {
        id: 'IOT-505',
        time: '21:55',
        device: 'Ấm trà thông minh Smart Kettle',
        location: 'Bàn trà phòng đọc sách',
        status: 'alert',
        event: 'Cảm biến nhiệt độ tiếp xúc bình Smart Kettle: Nhiệt độ nước đáy bình giảm còn 32.4°C (tương đương nhiệt độ môi trường). Chu kỳ tản nhiệt tự nhiên xác nhận bình nước không được cấp nhiệt bổ sung từ sau mốc 21:30.',
        clueId: 'nhiet-do-am-tra',
        clueLabel: 'Dữ liệu nhiệt độ ấm trà thông minh: 32.4°C ghi nhận lúc 21:55',
      },
    ]
  }


  // Vụ 6: Radar Hàng Hải & Định Vị Du Thuyền Sông Hồng
  if (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
    return [
      {
        id: 'RADAR-601',
        time: '21:50:12',
        device: 'Hệ thống định vị AIS & Radar mạn phải du thuyền',
        location: 'Khu vực phao neo đậu số 4',
        status: 'warning',
        event: 'Phát hiện mục tiêu di động: Ca nô cao tốc CN-082 tách bến hướng về phía hạ lưu với tốc độ 35 hải lý/h.',
        clueId: 'camera-ben-thuyen',
        clueLabel: 'Radar du thuyền: Ca nô CN-082 rời mạn thuyền lúc 21:50',
      },
    ]
  }
  return []
}

/** Dữ liệu Nhà Thuốc Long Châu (CHỈ DÀNH CHO VỤ 3, VỤ 4, VỤ 5) */
export function getPharmacyRecords(caseId: string): PharmacyRecord[] {
  // Vụ 1: Hẻm 42 - Đơn thuốc cấp cứu hạ huyết áp của Bác Bảy lúc 21:20
  if (caseId === 'hem42') {
    return [
      {
        id: 'LC-102',
        time: '21:20 · Thứ Sáu',
        customer: 'Ông Bảy Dân Phòng (Chi nhánh Hẻm 42)',
        category: 'emergency',
        items: ['Thuốc ngậm hạ áp khẩn cấp Amlodipin 5mg', 'Bông băng gạc tiệt trùng'],
        totalPrice: '145.000 đ',
        notes: 'Mua khẩn cấp cho vợ bị tăng huyết áp đột ngột tại nhà. Bác Bảy có mặt quầy thuốc lúc 21:20, có chữ ký và camera nhà thuốc ghi hình.',
        clueId: 'bill-vien',
        clueLabel: 'Hóa đơn thuốc cấp cứu tại chi nhánh Hẻm 42 lúc 21:20',
      },
    ]
  }

  // Vụ 3: Khoa bị bỏng nước sôi sơ cứu lúc 20:42
  if (caseId === 'hoi-cho' || caseId === 'chua-phap-hoa') {
    return [
      {
        id: 'LC-301',
        time: '20:42 · Thứ Bảy',
        customer: 'Lê Đăng Khoa (Khoa Tình Nguyện)',
        category: 'emergency',
        items: ['Kem trị bỏng nước sôi Biafine', 'Gạc mỡ chống dính y tế Urgo', 'Cuộn băng thun quấn kín bàn tay trái'],
        totalPrice: '210.000 đ',
        notes: 'Bệnh nhân bị bỏng nước sôi cấp độ 2 mu bàn tay trái do khiêng nồi chè hội chợ lúc 20:40. Dược sĩ trực đã rửa vết bỏng và quấn băng gạc to kín toàn bộ bàn tay trái.',
        clueId: 'khoa-bi-thuong',
        clueLabel: 'Biên lai xử lý bỏng nước sôi tại phòng y tế lưu động lúc 20:42',
      },
    ]
  }

  // Vụ 4: Đạt mua thuốc ngủ Diazepam và găng tay đen lúc 17:30
  if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
    return [
      {
        id: 'LC-401',
        time: '17:30 · Thứ Bảy',
        customer: 'Trần Tuấn Đạt (Quản Lý Đạt)',
        category: 'prescription',
        items: ['Dung dịch an thần gây ngủ liều cao Diazepam 10ml', 'Hộp 50 găng tay y tế cao su Nitrile không bột'],
        totalPrice: '480.000 đ',
        notes: 'Kê đơn phòng khám tư nhân. Khách hàng yêu cầu lấy găng tay cao su màu đen chuyên dụng.',
        clueId: 'dat-mua-thuoc-me',
        clueLabel: 'Hóa đơn nhà thuốc: Mua thuốc an thần và găng tay cao su lúc 17:30',
      },
    ]
  }

  // Vụ 5: Vũ nhận 20ml dung dịch Aconitine và gọi video call lúc 22:15
  if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
    return [
      {
        id: 'LC-501',
        time: '14:15 · Thứ Năm (Hôm qua)',
        customer: 'Bác Sĩ Vũ Hoàng (Phòng Khám Hoàng Vũ)',
        category: 'prescription',
        items: ['Chiết xuất độc dược Aconitine 20ml (Dung dịch củ ấu tàu kiểm soát đặc biệt)', 'Ống tiêm thủy tinh định lượng'],
        totalPrice: '1.850.000 đ',
        notes: 'Bản ký nhận hóa chất độc dược thuộc danh mục kiểm soát đặc biệt số hiệu ĐC-098. Dấu vân tay và chữ ký nhận bàn giao: Bác sĩ L.Q. Vũ.',
        clueId: 'lo-thuy-tinh-ho-ca',
        clueLabel: 'Hồ sơ kiểm soát độc chất: Ký nhận bàn giao dung dịch Aconitine',
      },
      {
        id: 'LC-502',
        time: '22:15 · Thứ Sáu (Đêm nay)',
        customer: 'Bác Sĩ Vũ Hoàng (Gọi Video Call)',
        category: 'emergency',
        items: ['Tư vấn thuốc trợ tim Digoxin khẩn cấp'],
        totalPrice: '0 đ',
        notes: 'Lúc 22:15:20, Bác sĩ L.Q. Vũ kết nối cuộc gọi video call thời lượng 06 phút 12 giây với Dược sĩ ca trực Đỗ Thị Mai để hỏi tư vấn thuốc trợ tim khẩn cấp.',
        clueId: 'so-doc-duoc-vu',
        clueLabel: 'Nhật ký viễn thông: Cuộc gọi video call từ phòng khám lúc 22:15',
      },
    ]
  }


  // Vụ 6: Thảo My mua thuốc ngủ và thuốc nhuộm tóc tại Nhà thuốc Long Châu
  if (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
    return [
      {
        id: 'LC-608',
        time: '17:15 · Thứ Bảy (Hôm nay)',
        customer: 'Nguyễn Thảo My (Khách hàng VIP)',
        category: 'prescription',
        items: ['Thuốc an thần gây ngủ liều nhẹ Rotunda', 'Hộp nhuộm tóc màu vàng đồng', 'Nước nhỏ mắt chống khô'],
        totalPrice: '380.000 đ',
        notes: 'Khách hàng thanh toán thẻ Visa. Mua thuốc nhuộm tóc để chuẩn bị cải trang ngoại hình trước khi trốn khỏi du thuyền.',
        clueId: 'mua-thuoc-nhuom-toc',
        clueLabel: 'Hoá đơn Long Châu: Thảo My mua thuốc ngủ và nhuộm tóc lúc 17:15',
      },
    ]
  }
  return []
}

/** Dữ liệu Camera An Ninh Công Cộng Khu Vực (CHỈ DÀNH CHO TỪNG VỤ TƯƠNG ỨNG) */
export function getTrafficCameraRecords(caseId: string): TrafficCameraRecord[] {
  // Vụ 1: Camera ngã tư Hàng Chai
  if (caseId === 'hem42') {
    return [
      {
        id: 'CAM-101',
        img: 'detective/facebuc-nijia-xanh.jpg',
        camName: 'Camera Ngã Tư Cổng Hẻm 42',
        camLocation: 'Đầu Hẻm 42 giao Phố Hàng Chai',
        time: '21:35 · Thứ Sáu',
        description: 'Một nam thanh niên mặc đồng phục giao hàng màu cam dắt bộ phương tiện hai bánh màu xanh mint từ hẻm 42 ra hướng mặt đường lớn.',
        objectsObserved: ['Người mặc đồng phục cam', 'Phương tiện màu xanh mint', 'Dắt bộ lúc trời mất điện'],
        clueId: 'vy-chung-kien',
        clueLabel: 'Hình ảnh Camera đầu ngõ CAM-101: Người kéo xe đạp điện trùm bạt lúc 21:35',
      },
      {
        id: 'CAM-102',
        img: 'detective/hien-truong-2158.jpg',
        camName: 'Camera Giao Lộ Hàng Chai - Cửa Đông',
        camLocation: 'Ngã tư Phố Hàng Chai',
        time: '21:49 · Thứ Sáu',
        description: 'Phương tiện hai bánh màu xanh mint di chuyển qua ngã tư hướng về phía Hẻm 44. Người điều khiển mặc áo khoác phản quang của đơn vị giao hàng.',
        objectsObserved: ['Phương tiện xanh mint', 'Áo khoác phản quang', 'Lộ trình hướng Hẻm 44'],
        clueId: 'don-hang-2147',
        clueLabel: 'Camera giao thông ghi nhận xe xanh mint chạy qua lúc 21:49',
      },
      {
        id: 'CAM-103',
        img: 'detective/tra-sua.jpg',
        camName: 'Camera Cổng Hẻm 46',
        camLocation: 'Đầu Hẻm 46 phố Hàng Chai',
        time: '21:42 · Thứ Sáu',
        description: 'Tài xế điều khiển xe máy số 29-X1 chở thùng giữ nhiệt màu xanh lá rẽ vào Hẻm 46 lúc 21:42 giao hàng cho cư dân.',
        objectsObserved: ['Xe máy số 29-X1', 'Thùng hàng màu xanh lá', 'Giao đồ ăn Hẻm 46'],
        clueId: 'son-don-hang',
        clueLabel: 'Camera Hẻm 46 ghi nhận Sơn giao hàng trà sữa lúc 21:42',
      },
    ]
  }

  // Vụ 2: Camera bãi xe và lối vào sân 2
  if (caseId === 'tu-do' || caseId === 'cau-long') {
    return [
      {
        id: 'CAM-201',
        img: 'detective/case2-tu-do.jpg',
        camName: 'Camera Bãi Đỗ Xe & Vách Sau Sân Cầu Lông',
        camLocation: 'Lối đi nội bộ sau sân cầu lông',
        time: '20:25 · Thứ Bảy',
        description: 'Một nam thanh niên mặc áo khoác gió màu đỏ di chuyển vào lối kỹ thuật hẹp phía sau vách tôn dãy tủ cá nhân lúc 20:25:30 và rời đi sau khoảng 1 phút.',
        objectsObserved: ['Nam thanh niên áo khoác đỏ', 'Lối kỹ thuật sau vách tôn', 'Rời bãi xe lúc 20:26'],
        clueId: 'son-ao-do',
        clueLabel: 'Hình ảnh camera bãi xe: Người mặc áo khoác đỏ đứng sau dãy tủ lúc 20:25',
      },
      {
        id: 'CAM-202',
        img: 'detective/case2-san-cau-long.jpg',
        camName: 'Camera Lối Vào Sân Số 2',
        camLocation: 'Sân thi đấu số 2',
        time: '20:29 · Thứ Bảy',
        description: 'Vận động viên thi đấu trên sân số 2 liên tục từ 20:30 đến 21:00 dưới sự quan sát của khán giả và trọng tài bàn.',
        objectsObserved: ['Sân số 2', 'Trận đấu đôi nam', 'Khung giờ 20:30 - 21:00'],
        clueId: 'hao-o-san-2',
        clueLabel: 'Camera sân 2 xác nhận Hào thi đấu liên tục từ 20:30 đến 21:00',
      },
    ]
  }

  // Vụ 3: Camera quán Phúc và cổng chùa
  if (caseId === 'hoi-cho' || caseId === 'chua-phap-hoa') {
    return [
      {
        id: 'CAM-301',
        img: 'detective/quan-net.jpg',
        camName: 'Camera Ngã Ba Quán Nước Phúc',
        camLocation: 'Cổng chùa đối diện quán trà đá',
        time: '20:57 - 21:25 · Thứ Bảy',
        description: 'Khách nam ngồi uống nước tại bàn ngoài quán trà đối diện cổng đình từ 20:57. Khi hội chợ mất điện lúc 21:20, đối tượng vẫn có mặt tại bàn nước.',
        objectsObserved: ['Khách nam bàn ngoài', 'Quán trà đối diện cổng đình', 'Thời điểm mất điện 21:20'],
        clueId: 'tu-o-quan-phuc',
        clueLabel: 'Camera ghi nhận Tú ngồi tại quán trà đá suốt từ 20:57 đến 21:25',
      },
      {
        id: 'CAM-302',
        img: 'detective/case3-camera-2048.jpg',
        camName: 'Camera An Ninh Cổng Tam Quan',
        camLocation: 'Bãi cỏ phía sau bệ đặt hòm công đức',
        time: '21:02 · Thứ Bảy (Lúc mất điện)',
        description: 'Một phụ nữ đeo tạp dề vải, đi giày thể thao sáng màu di chuyển nhanh từ khu vực bãi cỏ phía sau bệ hòm quỹ ra lối ngách, tay mang theo túi xách cầm tay.',
        objectsObserved: ['Phụ nữ đeo tạp dề', 'Giày thể thao sáng màu', 'Khu vực bãi cỏ sau bệ quỹ'],
        clueId: 'trang-giay',
        clueLabel: 'Hình ảnh Camera Tam Quan CAM-302: Vết bùn đỏ trên giày thể thao lúc 21:02',
      },
    ]
  }

  // Vụ 4: Camera cửa hầm và hẻm gom rác chung cư 42
  if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
    return [
      {
        id: 'CAM-401',
        img: 'detective/case4-xe-bao-ve.jpg',
        camName: 'Camera Cửa Dốc Tầng Hầm Chung Cư',
        camLocation: 'Dốc hầm xe toà nhà',
        time: '21:15 · Thứ Bảy',
        description: 'Bảo vệ ca trực điều khiển xe máy số 29-X1 dừng đỗ tại vị trí gác dốc cửa hầm B1 trong khoảng thời gian hệ thống điện hầm gặp sự cố.',
        objectsObserved: ['Nhân viên bảo vệ ca trực', 'Xe máy 29-X1', 'Vị trí dốc cửa hầm B1'],
        clueId: 'camera-tu-canh-gioi',
        clueLabel: 'Camera cửa hầm ghi nhận Tư đỗ xe canh cửa lúc 21:15',
      },
      {
        id: 'CAM-402',
        img: 'detective/case4-tui-den.jpg',
        camName: 'Camera Hẻm Gom Rác Sau Chung Cư',
        camLocation: 'Khu vực bãi tập kết rác sau toà nhà',
        time: '21:30 · Thứ Bảy',
        description: 'Nam nhân viên mặc sơ mi công sở di chuyển vội vã qua hành lang kỹ thuật, đưa một bọc nilon màu đen vào cửa họng xả rác số 1 rồi rời khỏi toà nhà.',
        objectsObserved: ['Nam nhân viên sơ mi công sở', 'Bọc nilon màu đen', 'Khu vực họng xả rác số 1'],
        clueId: 'hong-rac-bms',
        clueLabel: 'Hình ảnh Camera hẻm sau CAM-402: Người mang bọc nilon tại cửa xả rác lúc 21:19',
      },
    ]
  }

  // Vụ 5: Camera ngõ biệt thự và quán bar The Moon Lounge
  if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
    return [
      {
        id: 'CAM-501',
        img: 'detective/case5-phong-tra.jpg',
        camName: 'Camera Đầu Ngõ Biệt Thự Hoàng Khang',
        camLocation: 'Cổng ngoài ngõ rẽ vào biệt thự',
        time: '21:10 · Thứ Sáu',
        description: 'Xe máy tay ga SH màu xám đi vào lối cổng phụ biệt thự lúc 21:10 và rời đi theo hướng đường lớn lúc 21:22.',
        objectsObserved: ['Xe máy SH xám', 'Lối cổng phụ biệt thự', 'Mốc thời gian 21:10 - 21:22'],
        clueId: 'so-doc-duoc-vu',
        clueLabel: 'Hình ảnh Camera ngõ CAM-501: Xe máy SH xám đi vào cổng phụ lúc 21:10',
      },
      {
        id: 'CAM-502',
        img: 'detective/case5-hien-truong.jpg',
        camName: 'Camera Quán The Moon Lounge Ba Đình',
        camLocation: 'Sảnh chính Lounge',
        time: '21:00 - 23:00 · Thứ Sáu',
        description: 'Khách hàng ngồi trò chuyện cùng hai người bạn tại bàn VIP 03 khu vực quầy sảnh The Moon Lounge từ 21:00 đến 23:00.',
        objectsObserved: ['Bàn VIP 03', 'Nhóm ba người', 'Khung giờ 21:00 - 23:00'],
        clueId: 'trong-alibi-bar',
        clueLabel: 'Camera sảnh The Moon Lounge: Khách hàng ngồi tại bàn VIP lúc 21:40',
      },
      {
        id: 'CAM-503',
        img: 'detective/case5-ban-cong.jpg',
        camName: 'Camera Ban Công Phía Sau Biệt Thự',
        camLocation: 'Tường rào giáp vườn cây',
        time: '21:42 · Thứ Sáu',
        description: 'Bóng người mặc âu phục sẫm màu tiếp cận lan can ban công phòng trà tầng 2. Cảm biến hồng ngoại ghi nhận vệt phản quang mảnh dạng sợi căng ngang mép cửa sổ lúc 21:18.',
        objectsObserved: ['Bóng người âu phục sẫm màu', 'Lan can ban công tầng 2', 'Vệt cước phản quang mép cửa sổ'],
        clueId: 'then-cai-chi-cuoc',
        clueLabel: 'Camera ban công: Vệt cước phản quang chuyển động gần khe then cửa sổ lúc 21:18',
      },
    ]
  }

  
  // Vụ 6: Camera Bến Thuyền & Ngã Ba Sông Hồng
  if (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
    return [
      {
        id: 'CAM-601',
        img: 'detective/case6-ca-no.jpg',
        camName: 'Camera Giám Sát Cầu Tàu Số 2 Bến Sông Hồng',
        camLocation: 'Lối bậc thang phụ mạn du thuyền',
        time: '21:50 · Thứ Bảy',
        description: 'Một người vóc dáng thon gọn mặc áo mưa trùm kín đầu, chân đi giày thể thao trắng bước từ bậc thang mạn tàu xuống ca-nô cao tốc neo cạnh phao số 04 lúc 21:50.',
        objectsObserved: ['Người mặc áo mưa trùm kín đầu', 'Giày thể thao trắng', 'Ca-nô cao tốc mạn tàu', 'Phao định vị số 04'],
        clueId: 'camera-ben-thuyen',
        clueLabel: 'Hình ảnh Camera CAM-601: Người mặc áo mưa tím bước xuống ca nô lúc 21:50',
      },
      {
        id: 'CAM-602',
        img: 'detective/case6-vong-tay.jpg',
        camName: 'Camera Quầy Bar Khoang VIP Tầng 3',
        camLocation: 'Lối hành lang phòng vệ sinh tầng 3',
        time: '22:05 · Thứ Bảy',
        description: 'Tại lối đi cạnh quầy bar tiệc tầng 3: Người đàn ông mặc vest đen di chuyển vội vã va chạm cơ thể với nhân viên bồi bàn đang bưng khay rượu lúc 22:05.',
        objectsObserved: ['Khách nam mặc vest đen', 'Nhân viên bồi bàn', 'Va chạm lối đi quầy bar', 'Tiếp xúc vùng thắt lưng'],
        clueId: 'sim-rac-tap-de',
        clueLabel: 'Camera hành lang CAM-603: Va chạm giữa hai người gần quầy bar lúc 22:05',
      },
    ]
  }
  return []
}
