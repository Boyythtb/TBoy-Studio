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
}

/** Dữ liệu Facebúc Profiles cho tất cả 5 vụ án (Hỗ trợ cả ID chính thức và alias) */
export function getCaseProfiles(caseId: string): FbProfile[] {
  // Case 1: Hẻm 42
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
                content: 'Ủa anh Dũng, lúc 21:35 em còn thấy anh dắt chiếc xe đạp điện màu xanh mint từ sân nhà cô Lan ra đầu hẻm mà? Em tưởng cô Lan nhờ anh dắt đi sửa xe chứ?',
                clueId: 'vy-chung-kien',
                clueLabel: 'Vy thấy Dũng dắt xe lúc 21:35',
              },
              {
                id: 'c-dung-2',
                user: 'Hùng Sửa Xe',
                avatar: '🔧',
                time: '22:25',
                content: 'Dũng ơi, hạn chót trả 5 triệu tiền nợ sửa xe là hôm nay đấy. Đừng để anh phải sang tận phòng trọ đòi.',
                clueId: 'hung-cho-vay',
                clueLabel: 'Dũng nợ Hùng 5 triệu tiền sửa xe',
              },
            ],
          },
          {
            id: 'p-dung-2',
            time: '21:58 · Thứ Sáu',
            content: 'Đứng chờ khách lấy đồ trước cửa hàng điện thoại số 88. Hẹn khách 21:55 mà giờ chưa thấy đâu, lạnh cóng tay 😤',
            likes: 3,
            img: 'detective/bia-vu-an.jpg',
            clueId: 'anh-phan-chieu',
            clueLabel: 'Bóng xe xanh trong ảnh kính cửa hàng lúc 21:58',
            comments: [
              {
                id: 'c-dung-3',
                user: 'Tuấn Game Net',
                avatar: '🎮',
                time: '22:01',
                content: 'Tấm kính cửa hàng phản chiếu cái xe xanh mint sau lưng kìa ông anh 😂',
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
                clueLabel: 'Hóa đơn viện phí chứng minh alibi của Bác Bảy lúc 21:20',
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
        role: 'Sinh viên trọ học',
        bio: 'Học kinh tế, mê trà sữa, không thích nhiều chuyện nhưng mắt hay để ý lung tung 😝',
        livesIn: 'Gác lửng nhà số 14, Hẻm 42',
        relationship: 'Độc thân',
        coverColor: 'from-pink-500 to-purple-600',
        posts: [
          {
            id: 'p-vy-1',
            time: '21:38 · Thứ Sáu',
            content: 'Vừa xuống nhà vứt rác thấy ngõ vắng hoe, chỉ có anh Dũng đang dắt chiếc xe màu xanh mint ra phía cổng. Chắc đi cày đêm chăm chỉ ghê.',
            likes: 8,
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
                clueLabel: 'Biên lai giao hàng hẻm 46 chứng minh alibi của Sơn lúc 21:44',
              },
            ],
          },
        ],
      },
    ]
  }

  // Case 2: Chiếc điện thoại trong tủ đồ (id: 'tu-do' hoặc 'cau-long')
  if (caseId === 'tu-do' || caseId === 'cau-long') {
    return [
      {
        id: 'son',
        name: 'Sơn Nhặt Cầu',
        slug: 'son.badminton68',
        avatar: '🏸',
        role: 'Khách quen sân cầu · Nợ tiền sân',
        bio: 'Đam mê cầu lông, thích bắt kèo độ. Ai giao lưu sân Ba Đình ới em!',
        livesIn: 'Cầu Giấy, Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-blue-600 to-slate-800',
        posts: [
          {
            id: 'p-son-1',
            time: '20:30 · Thứ Bảy',
            content: 'Tối nay đánh xong từ 20h ngồi nguyên ở ghế đá ngoài sân uống nước buôn chuyện, không hề bước chân vào khu tủ đồ nhé mọi người!',
            likes: 3,
            comments: [
              {
                id: 'c-son-1',
                user: 'Hạnh Chủ Sân',
                avatar: '👩',
                time: '20:38',
                content: 'Sơn ơi, lúc 20:20 chị thấy em mặc áo khoác đỏ đứng sát vách khu tủ đồ số 4 ngó nghiêng gì đấy?',
                clueId: 'son-ao-do',
                clueLabel: 'Sơn mặc áo khoác đỏ đứng sát tủ đồ lúc 20:20',
              },
              {
                id: 'c-son-2',
                user: 'Linh Quầy Nước',
                avatar: '👧',
                time: '20:42',
                content: 'Anh Sơn ơi, khoản vay nợ tiền sân 6 triệu quá hạn 2 tuần rồi nhé, chị Hạnh giục đòi đấy!',
                clueId: 'son-no-tien',
                clueLabel: 'Sơn nợ tiền sân 6 triệu quá hạn',
              },
            ],
          },
        ],
      },
      {
        id: 'hanh',
        name: 'Chị Hạnh Chủ Sân',
        slug: 'hanh.badminton.owner',
        avatar: '👩',
        role: 'Chủ Sân Cầu Lông Ba Đình',
        bio: 'Sân thảm PVC tiêu chuẩn BWF. Cho thuê sân, căng cước vợt và bán nước giải khát.',
        livesIn: 'Ba Đình, Hà Nội',
        relationship: 'Đã kết hôn',
        coverColor: 'from-emerald-600 to-teal-800',
        posts: [
          {
            id: 'p-hanh-1',
            time: '20:40 · Thứ Bảy',
            content: 'CẢ SÂN CẦU ƠI! Chiếc iPhone 15 Pro Titan của mình để trong tủ đồ số 4 lúc 20:25, chìa khóa mình vẫn cầm trong tay mà đến 20:35 mở tủ đã biến mất! Tủ không hề bị cạy khóa!',
            likes: 28,
            comments: [
              {
                id: 'c-hanh-1',
                user: 'Bà Mai Lao Dọn',
                avatar: '🧹',
                time: '20:45',
                content: 'Chị Hạnh ơi, cái tủ đồ số 4 đó thợ mộc đóng đợt trước bị thiếu nẹp nóc, phần nóc có khe hở rộng 6cm luồn vừa cánh tay vào rút điện thoại!',
                clueId: 'lo-hong-tu',
                clueLabel: 'Khe hở nóc tủ đồ số 4 rộng 6cm luồn vừa tay',
              },
            ],
          },
        ],
      },
      {
        id: 'linh',
        name: 'Linh Quầy Nước',
        slug: 'linh.nuocmia',
        avatar: '👧',
        role: 'Nhân viên quầy nước sân cầu',
        bio: 'Nước mía siêu sạch, chanh muối, revive ướp lạnh phục vụ anh em thể thao.',
        livesIn: 'Cầu Giấy, Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-pink-500 to-rose-600',
        posts: [
          {
            id: 'p-linh-1',
            time: '20:29 · Thứ Bảy',
            content: 'Check-in quầy nước lúc 20:29. Đang đứng gọi điện thoại cho đại lý giao thêm 2 thùng Revive!',
            likes: 15,
            img: 'detective/bia-vu-an.jpg',
            clueId: 'anh-story',
            clueLabel: 'Ảnh story của Linh lúc 20:29 phản chiếu bóng người áo đỏ bên tủ đồ',
            comments: [
              {
                id: 'c-linh-1',
                user: 'Tuấn HLV',
                avatar: '🏸',
                time: '20:32',
                content: 'Sau lưng em Linh trong gương phản chiếu có ông nào mặc áo khoác đỏ đứng thò tay vào nóc tủ đồ kìa!',
              },
            ],
          },
        ],
      },
      {
        id: 'tuan',
        name: 'Tuấn HLV Cầu Lông',
        slug: 'tuan.coach.badminton',
        avatar: '🏃',
        role: 'Huấn luyện viên cầu lông',
        bio: 'Nhận dạy cơ bản đến nâng cao. Nhận căng cước vợt lấy ngay.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-orange-500 to-amber-700',
        posts: [
          {
            id: 'p-tuan-1',
            time: '20:35 · Thứ Bảy',
            content: 'Vừa đánh xong set cầu đôi 21-19 nghẹt thở ở Sân 1 từ 20:10 đến 20:35. Trận này cháy quá anh em!',
            likes: 19,
            comments: [],
          },
        ],
      },
      {
        id: 'ba-mai',
        name: 'Bà Mai Lao Dọn',
        slug: 'mai.laocong',
        avatar: '🧹',
        role: 'Lao dọn vệ sinh sân cầu',
        bio: 'Lau sàn chống trượt, gom rác phòng thay đồ.',
        livesIn: 'Hà Nội',
        relationship: 'Đã kết hôn',
        coverColor: 'from-slate-600 to-slate-800',
        posts: [
          {
            id: 'p-mai-1',
            time: '20:20 · Thứ Bảy',
            content: 'Đang lau dọn khu nhà vệ sinh nữ từ 20h15. Khách chơi chú ý giữ gìn vệ sinh chung.',
            likes: 6,
            comments: [],
          },
        ],
      },
      {
        id: 'hao',
        name: 'Hào Khách Chơi Cầu',
        slug: 'hao.badminton.fan',
        avatar: '👕',
        role: 'Khách chơi cầu lông phong trào',
        bio: 'Trình độ 6.0, thích đánh đôi nam nữ.',
        livesIn: 'Ba Đình, Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-cyan-600 to-blue-800',
        posts: [
          {
            id: 'p-hao-1',
            time: '20:36 · Thứ Bảy',
            content: 'Tôi đánh ở Sân 2 suốt từ 20h đến giờ cùng 3 anh em khác, có camera sân quay rõ.',
            likes: 9,
            comments: [],
          },
        ],
      },
    ]
  }

  // Case 3: Hòm công đức Chùa Pháp Hoa (id: 'hoi-cho' hoặc 'chua-phap-hoa')
  if (caseId === 'hoi-cho' || caseId === 'chua-phap-hoa') {
    return [
      {
        id: 'trang',
        name: 'Trang Bán Bánh',
        slug: 'trang.banhmi',
        avatar: '🥖',
        role: 'Thủ quỹ ban tổ chức hội chợ · Bán bánh mì',
        bio: 'Bánh mì que Hải Phòng nóng giòn thơm ngon.',
        livesIn: 'Ngõ Phổ Giác, Đống Đa',
        relationship: 'Độc thân',
        coverColor: 'from-amber-600 to-yellow-800',
        posts: [
          {
            id: 'p-trang-1',
            time: '21:40 · Thứ Bảy',
            content: 'Tối nay sau khi bán xong lúc 21h em ra bãi rác ngoài đường cái đổ rác rồi về phòng đắp chăn ngủ, trong túi không còn nổi 100k!',
            likes: 5,
            comments: [
              {
                id: 'c-trang-1',
                user: 'Bác Bảo Vệ Chùa',
                avatar: '👴',
                time: '21:48',
                content: 'Trang ơi, cháu bảo đi đổ rác ngoài đường cái mà sao đôi giày bata trắng của cháu dính bùn đỏ dày cộp? Ngoài bãi rác chỉ có sỏi và tro, duy nhất sau bệ hòm công đức của chùa mới có bùn đỏ thôi!',
                clueId: 'trang-giay',
                clueLabel: 'Giày trắng của Trang dính bùn đỏ đặc trưng sau bệ hòm quỹ',
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
            content: 'Ting ting 8 củ khoai trong đêm! Phải sòng phẳng thế có phải êm đẹp cả đôi bên không em gái bánh mì.',
            likes: 18,
            comments: [
              {
                id: 'c-tu-1',
                user: 'Trang Bán Bánh',
                avatar: '🥖',
                time: '21:36',
                content: 'Em đã trả đủ 8 triệu cả gốc lẫn lãi rồi nhé anh Tú, xoá sổ nợ cho em!',
                clueId: 'chuyen-tien-trng',
                clueLabel: 'Lệnh chuyển khoản 8 triệu của Trang lúc 21:32 trả nợ Tú',
              },
            ],
          },
        ],
      },
      {
        id: 'oanh',
        name: 'Oanh Trưởng Ban Tổ Chức',
        slug: 'oanh.toptop',
        avatar: '👩‍💼',
        role: 'Trưởng ban tổ chức hội chợ Chùa',
        bio: 'Chăm lo công việc thiện nguyện và gây quỹ nhà chùa.',
        livesIn: 'Hà Nội',
        relationship: 'Đã kết hôn',
        coverColor: 'from-rose-600 to-pink-800',
        posts: [
          {
            id: 'p-oanh-1',
            time: '21:35 · Thứ Bảy',
            content: 'Hòm công đức hội chợ vừa bị cạy lúc 21:30! Số tiền quyên góp khoảng 8 triệu đồng đã biến mất! Kẻ gian đã lợi dụng lúc mất điện cầu dao!',
            likes: 42,
            comments: [],
          },
        ],
      },
      {
        id: 'khoa',
        name: 'Khoa Tình Nguyện Viên',
        slug: 'khoa.volunteer',
        avatar: '🧑',
        role: 'Tình nguyện viên hội chợ',
        bio: 'Sinh viên năm 3 tình nguyện.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-teal-600 to-emerald-800',
        posts: [
          {
            id: 'p-khoa-1',
            time: '21:25 · Thứ Bảy',
            content: 'Đang khiêng bàn ghế ngoài cổng tam quan phụ giúp các sư thầy.',
            likes: 11,
            comments: [],
          },
        ],
      },
      {
        id: 'hung',
        name: 'Chú Hùng Bảo Vệ Chùa',
        slug: 'hung.baove.chua',
        avatar: '👴',
        role: 'Bảo vệ khuôn viên chùa',
        bio: 'Trực an ninh trật tự hội chợ.',
        livesIn: 'Đống Đa, Hà Nội',
        relationship: 'Đã kết hôn',
        coverColor: 'from-amber-700 to-stone-900',
        posts: [
          {
            id: 'p-hung-1',
            time: '21:15 · Thứ Bảy',
            content: 'Cầu dao khu gian hàng bị nhảy aptomat lúc 21:10, tôi đang đi kiểm tra hộp kỹ thuật điện.',
            likes: 8,
            comments: [],
          },
        ],
      },
      {
        id: 'phuc',
        name: 'Phúc Chủ Quán Nước',
        slug: 'phuc.tra.da',
        avatar: '🍵',
        role: 'Bán trà đá đầu ngõ chùa',
        bio: 'Trà đá, nhân trần, kẹo lạc.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-green-600 to-emerald-900',
        posts: [
          {
            id: 'p-phuc-1',
            time: '21:38 · Thứ Bảy',
            content: 'Anh Tú ngồi uống nước ở quán em suốt từ 20h đến giờ chưa đứng dậy nhé.',
            likes: 14,
            clueId: 'tu-o-quan-phuc',
            clueLabel: 'Alibi của Tú ngồi tại quán nước từ 20h',
            comments: [],
          },
        ],
      },
    ]
  }

  // Case 4: Cướp két sắt Tòa Nhà Horizon (id: 'chung-cu' hoặc 'cong-ty-x')
  if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
    return [
      {
        id: 'dat',
        name: 'Quản Lý Đạt',
        slug: 'dat.manager.horizon',
        avatar: '👔',
        role: 'Quản lý vận hành Tòa Nhà Horizon',
        bio: 'Kỷ luật, an toàn và trách nhiệm.',
        livesIn: 'Hà Nội',
        relationship: 'Đã kết hôn',
        coverColor: 'from-slate-700 to-slate-900',
        posts: [
          {
            id: 'p-dat-1',
            time: '21:35 · Thứ Hai',
            content: 'Vừa xử lý xong sự cố mất điện tầng hầm lúc 21:10. Khổ thân bảo vệ Khải bị ngất, may người không sao. Két sắt phòng kế toán bị cạy mất đồ.',
            likes: 14,
            comments: [
              {
                id: 'c-dat-1',
                user: 'Bảo Vệ Khải',
                avatar: '👮',
                time: '21:40',
                content: 'Anh Đạt ơi, lúc anh xuống tầng hầm tấn công tôi từ sau lưng... máy ghi âm tôi vẫn đang bật đấy anh ạ!',
                clueId: 'khai-ghi-am',
                clueLabel: 'File ghi âm 21:12 của bảo vệ Khải ghi lại giọng Quản lý Đạt',
              },
              {
                id: 'c-dat-2',
                user: 'Lao Công Bác Bảy',
                avatar: '🧹',
                time: '21:42',
                content: 'Lúc 21:30 tôi thấy anh Đạt mặc áo vest vội vã vứt cái túi rác đen nặng trịch xuống họng rác chung cư tầng 1.',
                clueId: 'tui-den',
                clueLabel: 'Túi rác đen chứa găng tay và sổ nợ của Đạt',
              },
            ],
          },
        ],
      },
      {
        id: 'khai',
        name: 'Bảo Vệ Khải',
        slug: 'khai.security.bms',
        avatar: '👮',
        role: 'Kỹ thuật viên & Bảo vệ ca trực',
        bio: 'Trực camera và phòng điều khiển trung tâm BMS.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-blue-700 to-indigo-900',
        posts: [
          {
            id: 'p-khai-1',
            time: '21:45 · Thứ Hai',
            content: 'Đầu còn choáng váng sau cú đánh lén lúc mất điện 21:10 ở tầng hầm B1. May mà thiết bị nghiệp vụ vẫn lưu được âm thanh!',
            likes: 31,
            comments: [],
          },
        ],
      },
      {
        id: 'tu',
        name: 'Tư Bảo Vệ Ca Đêm',
        slug: 'tu.baove.dem',
        avatar: '🔦',
        role: 'Bảo vệ tuần tra ca đêm',
        bio: 'Tuần tra cổng chính và sảnh tòa nhà.',
        livesIn: 'Hà Nội',
        relationship: 'Đã kết hôn',
        coverColor: 'from-stone-600 to-stone-900',
        posts: [
          {
            id: 'p-tu-1',
            time: '21:25 · Thứ Hai',
            content: 'Đang tuần tra khu vực sảnh chính tầng 1, điện sảnh vẫn sáng bình thường, chỉ có tầng hầm B1 bị ngắt cầu dao cục bộ!',
            likes: 12,
            comments: [],
          },
        ],
      },
      {
        id: 'lan',
        name: 'Lan Kế Toán',
        slug: 'lan.ketoan.horizon',
        avatar: '👩‍💼',
        role: 'Kế toán trưởng toà nhà',
        bio: 'Quản lý tài chính và sổ quỹ.',
        livesIn: 'Hà Nội',
        relationship: 'Đã kết hôn',
        coverColor: 'from-purple-700 to-pink-900',
        posts: [
          {
            id: 'p-lan-1',
            time: '21:38 · Thứ Hai',
            content: 'Mã số két sắt mới được đổi chiều nay, chỉ có tôi và anh Đạt quản lý nắm mã số này!',
            likes: 16,
            clueId: 'ma-ket',
            clueLabel: 'Chỉ có Quản lý Đạt và Lan biết mật khẩu két',
            comments: [],
          },
        ],
      },
      {
        id: 'bay',
        name: 'Bảy Chủ Nợ',
        slug: 'bay.cho.vay',
        avatar: '💰',
        role: 'Tài chính cá nhân',
        bio: 'Đến hẹn lại lên.',
        livesIn: 'Hà Nội',
        relationship: 'Phức tạp',
        coverColor: 'from-amber-800 to-zinc-900',
        posts: [
          {
            id: 'p-bay-1',
            time: '21:15 · Thứ Hai',
            content: 'Đang ngồi nhậu ở phố Trần Duy Hưng với anh em từ 19h30, không đi đâu.',
            likes: 22,
            comments: [],
          },
        ],
      },
      {
        id: 'duy',
        name: 'Duy Kỹ Thuật Viên Mới',
        slug: 'duy.tech.new',
        avatar: '🔧',
        role: 'Kỹ thuật viên tập sự · Cháu Đạt',
        bio: 'Học việc bảo trì điện lạnh tòa nhà.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-cyan-700 to-slate-900',
        posts: [
          {
            id: 'p-duy-1',
            time: '21:20 · Thứ Hai',
            content: 'Tối nay em xin nghỉ đi viện chăm mẹ ốm ở Bệnh viện Bạch Mai, có giấy vào viện lúc 20h.',
            likes: 9,
            comments: [],
          },
        ],
      },
    ]
  }

  // Case 5: Án mạng Biệt Thự X (id: 'an-mang' hoặc 'biet-thu-x')
  if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
    return [
      {
        id: 'vu',
        name: 'Bác Sĩ Vũ Hoàng',
        slug: 'dr.vuhoang',
        avatar: '👨‍⚕️',
        role: 'Bác sĩ riêng · Con nuôi nạn nhân',
        bio: 'Chuyên khoa Độc chất & Tim mạch.',
        livesIn: 'Biệt thự Hoa Hồng',
        relationship: 'Độc thân',
        coverColor: 'from-teal-800 to-slate-900',
        posts: [
          {
            id: 'p-vu-1',
            time: '22:30 · Thứ Sáu',
            content: 'Tôi vừa đến biệt thự lúc 22:00 thì cha nuôi đã mất trong phòng kín, đồng hồ vỡ lúc 22:15 chứng minh thời điểm xảy ra vụ việc!',
            likes: 29,
            comments: [
              {
                id: 'c-vu-1',
                user: 'Kỹ Sư Smart Home',
                avatar: '☕',
                time: '22:35',
                content: 'Bác sĩ Vũ ơi, cảm biến nhiệt độ ấm trà thông minh ghi nhận nước sôi 100°C lúc 21:30 và đã nguội ngắt 32°C từ trước 22:00 rồi! Nạn nhân đã uống trà và tử vong trước 21:45, chiếc đồng hồ vỡ 22:15 là do anh dàn cảnh đập vỡ!',
                clueId: 'nhiet-do-am-tra',
                clueLabel: 'Cảm biến ấm trà thông minh vạch trần giờ chết giả 22:15',
              },
              {
                id: 'c-vu-2',
                user: 'Luật Sư Minh',
                avatar: '⚖️',
                time: '22:38',
                content: 'Chiều nay 16h, ông Khang vừa ký bản di chúc mới truất toàn bộ quyền thừa kế 30 tỷ của anh Vũ.',
                clueId: 'di-chuc-truat-quyen',
                clueLabel: 'Di chúc mới truất quyền thừa kế 30 tỷ của Vũ Hoàng',
              },
            ],
          },
        ],
      },
      {
        id: 'yen',
        name: 'Yến Giúp Việc',
        slug: 'yen.giupviec',
        avatar: '👩',
        role: 'Người giúp việc nội trú biệt thự',
        bio: 'Nấu ăn, dọn dẹp và chăm sóc cụ ông.',
        livesIn: 'Tầng 1 Biệt thự Hoa Hồng',
        relationship: 'Độc thân',
        coverColor: 'from-amber-700 to-stone-900',
        posts: [
          {
            id: 'p-yen-1',
            time: '21:50 · Thứ Sáu',
            content: 'Tối nay nhà tự nhiên mất điện cầu dao tầng 2 lúc 21:20 sợ quá, em chỉ ở dưới bếp nấu súp...',
            likes: 4,
            comments: [
              {
                id: 'c-yen-1',
                user: 'VietinBank Notification',
                avatar: '🏦',
                time: '21:52',
                content: 'Giao dịch: Nhận 200.000.000 VND từ tài khoản Vũ Hoàng lúc 17:30 (Nội dung: "Yen giup viec tam ung").',
                clueId: 'chuyen-khoan-yen',
                clueLabel: 'Lệnh chuyển cọc 200 triệu từ Vũ Hoàng cho Yến giúp việc',
              },
            ],
          },
        ],
      },
      {
        id: 'nam',
        name: 'Luật Sư Nam',
        slug: 'nam.lawyer.family',
        avatar: '⚖️',
        role: 'Luật sư riêng của nạn nhân',
        bio: 'Tư vấn pháp lý di chúc và bất động sản.',
        livesIn: 'Hà Nội',
        relationship: 'Đã kết hôn',
        coverColor: 'from-indigo-800 to-slate-900',
        posts: [
          {
            id: 'p-nam-1',
            time: '22:10 · Thứ Sáu',
            content: 'Vừa nhận được tin ông Khang đột ngột qua đời. Chiều nay 16h tôi chính là người lập bản di chúc mới có công chứng.',
            likes: 19,
            clueId: 'di-chuc-truat-quyen',
            clueLabel: 'Luật sư xác nhận bản di chúc mới lập lúc 16h',
            comments: [],
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
            content: 'Livestream bán hàng liên tục từ 20h00 đến 22h00 có hơn 1000 người xem chứng kiến!',
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
        role: 'Đối tác buôn bán cổ vật',
        bio: 'Đam mê đồ gốm sứ thời Lý - Trần.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-yellow-800 to-stone-900',
        posts: [
          {
            id: 'p-trong-1',
            time: '21:30 · Thứ Sáu',
            content: 'Đang họp mặt câu lạc bộ cổ vật tại nhà hàng Sen Tây Hồ từ 19h.',
            likes: 27,
            clueId: 'trong-alibi',
            clueLabel: 'Alibi của Trọng họp CLB cổ vật Tây Hồ',
            comments: [],
          },
        ],
      },
      {
        id: 'phuc',
        name: 'Phúc Thợ Sửa Khóa',
        slug: 'phuc.locksmith.24h',
        avatar: '🔑',
        role: 'Thợ khóa lưu động',
        bio: 'Mở khóa két sắt, cửa vân tay không phá khóa.',
        livesIn: 'Hà Nội',
        relationship: 'Độc thân',
        coverColor: 'from-slate-700 to-zinc-900',
        posts: [
          {
            id: 'p-phuc-1',
            time: '22:05 · Thứ Sáu',
            content: 'Ổ khóa then cài cửa sổ phòng nạn nhân có dấu vết luồn sợi chỉ cước để chốt lại từ bên ngoài!',
            likes: 13,
            clueId: 'then-cai-chi-cuoc',
            clueLabel: 'Thủ đoạn dùng chỉ cước giật then cài phòng kín từ bên ngoài',
            comments: [],
          },
        ],
      },
    ]
  }

  return []
}

/** Danh sách đơn hàng GiaoNhanh (Case 1) */
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
        time: '21:10',
        pickup: 'Trà Sữa Hẻm 46',
        drop: 'Hẻm 46 phố Hàng Chai',
        fee: '25.000đ',
        status: 'Đã hoàn tất',
        timeline: [
          { time: '20:55', event: 'Tiếp nhận đơn' },
          { time: '21:05', event: 'Lấy trà sữa' },
          { time: '21:10', event: 'Giao hoàn tất tại Hẻm 46' },
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
          { time: '21:47', event: 'Định vị GPS: Lấy hàng tại Hẻm 42' },
          { time: '21:52', event: 'Giao xong tại Hẻm 44, xác nhận hoàn tất' },
        ],
      },
      {
        id: 'GN-88216',
        driver: 'Lê Hoàng Long',
        driverPhone: '0904xxx889',
        time: '22:05',
        pickup: 'Phố Cửa Đông',
        drop: 'Phố Lý Nam Đế',
        fee: '35.000đ',
        status: 'Đã hoàn tất',
        timeline: [
          { time: '21:50', event: 'Nhận đơn' },
          { time: '22:05', event: 'Giao thành công' },
        ],
      },
    ]
  }
  return []
}

/** Danh sách tin rao vặt Chợ Tốt (Case 2: tu-do / cau-long) */
export function getChoTotListings(caseId: string): ChoTotListing[] {
  if (caseId === 'tu-do' || caseId === 'cau-long') {
    return [
      {
        id: 'CT-7741',
        title: 'Cần tiền trả nợ bán gấp iPhone 15 Pro Titan Tự Nhiên 128GB pin 98% máy trần',
        price: '14.500.000 đ',
        time: '20:45 · Hôm nay',
        seller: 'Sơn Nhặt Cầu (0973xxx456)',
        phone: '0973xxx456',
        location: 'Gần Sân Cầu Lông Ba Đình, Cầu Giấy, Hà Nội',
        category: 'Điện thoại, Thiết bị di động',
        desc: 'Cần tiền gấp đóng nợ trong đêm nên pass nhanh iPhone 15 Pro màu Titan. Máy zin đẹp không xước, không hộp không sạc. Ai qua sân cầu lấy luôn có fix nhẹ xăng xe.',
        clueId: 'tin-nhan-ban',
        clueLabel: 'Tin đăng bán vội iPhone 15 Pro của Sơn lúc 20:45 trên Chợ Tốt',
      },
      {
        id: 'CT-7740',
        title: 'Vợt cầu lông Yonex Astrox 88D Pro 4U chính hãng cước BG65Ti 11kg',
        price: '3.200.000 đ',
        time: '19:30 · Hôm nay',
        seller: 'Tuấn Smash (0912xxx789)',
        phone: '0912xxx789',
        location: 'Sân Cầu Lông Ba Đình',
        category: 'Dụng cụ thể thao',
        desc: 'Vợt mới đan cước tuần trước, đánh hơi nặng đầu muốn đổi sang 88S Pro.',
      },
      {
        id: 'CT-7738',
        title: 'Túi đựng vợt Victor 6 ngăn chống nước vải nhiệt',
        price: '450.000 đ',
        time: '18:15 · Hôm nay',
        seller: 'Linh Quầy Nước',
        phone: '0988xxx321',
        location: 'Quầy nước Sân Cầu',
        category: 'Phụ kiện thể thao',
        desc: 'Dư dùng thanh lý cho anh em chơi cầu.',
      },
      {
        id: 'CT-7735',
        title: 'Giày cầu lông Lining size 42 còn mới 95%',
        price: '750.000 đ',
        time: '17:00 · Hôm nay',
        seller: 'Hoàng Minh',
        phone: '0904xxx556',
        location: 'Cầu Giấy, Hà Nội',
        category: 'Giày thể thao',
        desc: 'Được tặng sinh nhật đi chật chân pass lại.',
      },
    ]
  }
  return []
}

/** Danh sách biến động số dư / Sao kê VietinBank (Case 3 & Case 5) */
export function getBankTransactions(caseId: string): BankTransaction[] {
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
        clueId: 'chuyen-tien-trng',
        clueLabel: 'Lệnh chuyển khoản 8 triệu của Trang lúc 21:32 trả nợ Tú',
      },
      {
        id: 'TX-99805',
        time: '20:00:00 · Thứ Bảy',
        type: 'out',
        amount: '-50.000 VND',
        accountName: 'NGUYEN THU TRANG',
        accountNo: '10882348xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'Nap tien dien thoai Viettel',
        balanceAfter: '8.142.500 VND',
      },
      {
        id: 'TX-99790',
        time: '18:30:10 · Thứ Bảy',
        type: 'in',
        amount: '+350.000 VND',
        accountName: 'NGUYEN THU TRANG',
        accountNo: '10882348xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'Khach an banh mi que chuyen tien',
        balanceAfter: '8.192.500 VND',
      },
      {
        id: 'TX-99750',
        time: '16:45:00 · Thứ Bảy',
        type: 'out',
        amount: '-480.000 VND',
        accountName: 'NGUYEN THU TRANG',
        accountNo: '10882348xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'Thanh toan tien dien sinh hoat EVN thang 9',
        balanceAfter: '7.842.500 VND',
      },
    ]
  }

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
        clueId: 'chuyen-khoan-yen',
        clueLabel: 'Lệnh chuyển cọc 200 triệu từ Vũ Hoàng cho Yến giúp việc lúc 17:30',
      },
      {
        id: 'TX-88110',
        time: '16:15:00 · Thứ Sáu',
        type: 'out',
        amount: '-1.200.000 VND',
        accountName: 'NGUYEN THI YEN',
        accountNo: '10338872xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'Mua thuoc tim mach theo don bac si',
        balanceAfter: '1.450.000 VND',
      },
      {
        id: 'TX-88090',
        time: '12:00:00 · Thứ Sáu',
        type: 'out',
        amount: '-320.000 VND',
        accountName: 'NGUYEN THI YEN',
        accountNo: '10338872xxxx',
        bank: 'VietinBank iPay Mobile',
        content: 'Mua thuc pham sieu thi WinMart',
        balanceAfter: '2.650.000 VND',
      },
    ]
  }

  return []
}

/** Nhật ký thiết bị hệ thống BMS & Smart Home IoT (Case 4 & Case 5) */
export function getBmsLogs(caseId: string): BmsDeviceLog[] {
  if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
    return [
      {
        id: 'BMS-401',
        time: '21:05',
        device: 'Thang máy P1 Tòa nhà Horizon',
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
        event: 'CẢNH BÁO MẤT ĐIỆN: Cầu dao tổng tầng hầm B1 bị ngắt thủ công bằng tay! Toàn bộ camera an ninh và quầy bảo vệ Khải mất nguồn!',
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
        clueId: 'tui-den',
        clueLabel: 'Nhật ký BMS họng rác lúc 21:30 ghi nhận vật nặng 8.2kg',
      },
    ]
  }

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
        event: 'Cầu dao Tầng 2 bị ngắt thủ công từ công tắc phụ dưới bếp (Yến giúp việc tiếp tay ngắt camera)',
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
        event: 'Cảm biến nhiệt độ nước trà: 32°C (nguội hẳn). Nạn nhân đã uống trà và tử vong trước 21:50; chiếc đồng hồ vỡ 22:15 là hiện trường giả!',
        clueId: 'nhiet-do-am-tra',
        clueLabel: 'Cảm biến ấm trà thông minh 32°C vạch trần giờ chết giả 22:15',
      },
    ]
  }

  return []
}
