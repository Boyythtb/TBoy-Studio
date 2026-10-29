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
                content: 'Ủa anh Dũng, lúc 21:35 em còn thấy anh dắt chiếc xe đạp điện màu xanh mint từ sân nhà cô Lan ra đầu hẻm mà? Em tưởng cô Lan nhờ anh dắt đi sạc điện chứ?',
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
                clueLabel: 'Biên lai giao hàng hẻm 46 chứng minh alibi của Sơn lúc 21:44',
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
    ]
  }

  // Case 2: Sân cầu lông - Mất điện thoại trong tủ đồ
  if (caseId === 'tu-do' || caseId === 'cau-long') {
    return [
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
            content: 'Tối nay đánh xong từ 20h ngồi nguyên ở ghế đá ngoài sân uống nước buôn chuyện, không hề bước chân vào khu tủ đồ nhé mọi người!',
            likes: 3,
            comments: [
              {
                id: 'c-son-1',
                user: 'Hạnh Chủ Sân',
                avatar: '🔑',
                time: '20:38',
                content: 'Sơn ơi, lúc 20:20 chị thấy em mặc áo khoác đỏ đứng sát vách khu tủ đồ số 4 ngó nghiêng gì đấy?',
                clueId: 'son-ao-do',
                clueLabel: 'Sơn mặc áo khoác đỏ đứng sát tủ đồ lúc 20:20',
              },
              {
                id: 'c-son-2',
                user: 'Linh Quầy Nước',
                avatar: '🥤',
                time: '20:42',
                content: 'Anh Sơn ơi, khoản vay nợ tiền sân 6 triệu quá hạn 2 tuần rồi nhé, chị Hạnh giục đòi đấy!',
                clueId: 'son-no-tien',
                clueLabel: 'Sơn nợ 6 triệu tiền sân quá hạn',
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
            comments: [],
          },
        ],
      },
    ]
  }

  // Case 3: Hội chợ Trung thu - Mất hòm quỹ từ thiện
  if (caseId === 'hoi-cho' || caseId === 'chua-phap-hoa') {
    return [
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
            content: 'Hội chợ đông vui quá, vừa bán hết veo 200 chiếc bánh mì! Lúc mất điện tối om em chỉ đứng trông quầy bánh thôi nha.',
            likes: 15,
            comments: [
              {
                id: 'c-trang-1',
                user: 'Bác Bảo Vệ Chùa',
                avatar: '👴',
                time: '21:48',
                content: 'Trang ơi, quầy bánh đổ bê tông khô ráo mà sao đôi giày bata trắng của cháu dính bùn đỏ dày cộp? Bùn đỏ chỉ có ở bãi cỏ trũng phía sau bệ hòm công đức thôi!',
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
                content: 'Em đã chuyển khoản trả đủ 8 triệu rồi nhé anh Tú, xoá sổ nợ cho em!',
                clueId: 'chuyen-tien-trng',
                clueLabel: 'Lệnh chuyển khoản 8 triệu của Trang lúc 21:32 trả nợ Tú',
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
            comments: [],
          },
        ],
      },
    ]
  }

  // Case 4: Cướp két sắt Chung cư 42
  if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
    return [
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
            content: 'Vừa xử lý xong sự cố mất điện tầng hầm lúc 21:10. Khổ thân kỹ thuật Khải bị ngã bất tỉnh, may đưa đi viện kịp. Két sắt phòng quản lý bị mở mất 200 triệu!',
            likes: 14,
            comments: [
              {
                id: 'c-dat-1',
                user: 'Bác Bảy Dân Phòng',
                avatar: '🏢',
                time: '21:55',
                content: 'Lúc 21:50 tài khoản anh vừa duyệt chuyển 200 triệu đi đâu thế Đạt?',
                clueId: 'chuyen-khoan',
                clueLabel: 'Lệnh chuyển khoản 200 triệu lúc 21:50 do Đạt ký duyệt',
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
                clueId: 'tu-loi-khai',
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
    ]
  }

  // Case 5: Án mạng Biệt Thự Hoàng Khang (Phòng kín)
  if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
    return [
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
            content: 'Tôi vừa đến biệt thự lúc 22:00 thì bác ruột đã qua đời gục trên bàn trà, chiếc đồng hồ vỡ 22:15 chứng minh thời điểm xảy ra sự việc! Mong công an sớm tìm ra chân tướng!',
            likes: 29,
            comments: [
              {
                id: 'c-vu-1',
                user: 'Kỹ Sư Smart Home',
                avatar: '☕',
                time: '22:35',
                content: 'Bác sĩ Vũ ơi, ấm trà thông minh ghi nhận đun sôi 100°C lúc 21:30 và đã nguội ngắt 32°C từ trước 22:00 rồi! Đồng hồ 22:15 là do anh cố tình đập vỡ!',
                clueId: 'nhiet-do-am-tra',
                clueLabel: 'Cảm biến ấm trà thông minh vạch trần giờ chết giả 22:15',
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
            clueId: 'trong-alibi',
            clueLabel: 'Alibi của Trọng tại The Moon Lounge từ 21h đến 23h',
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
            time: '20:30 · Hôm nay',
            content: 'Chúc mừng sinh nhật tuổi 22 của công chúa Thảo My trên du thuyền Sông Hồng Princess! Trọn đời bên em ❤️',
            likes: 184,
            comments: [
              {
                id: 'c-mk-1',
                user: 'Bà Phương',
                avatar: '👠',
                time: '20:45',
                content: 'Hai đứa đẹp đôi quá, chúc các con hạnh phúc.',
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
        clueLabel: 'Biên lai giao hàng hẻm 46 chứng minh alibi của Sơn lúc 21:44',
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
        clueLabel: 'Đơn giao cơm lúc 20:10 tại nhà riêng chứng minh Lan rời công ty từ sớm',
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
        clueLabel: 'Đơn giao yến sào lúc 22:45 minh oan cho người mặc áo mưa tím',
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
        pickup: 'Bến Du Thuyền Sông Hồng (Minh Khang đặt)',
        drop: 'Phao Neo Đậu Số 4 (2 Vali hàng hiệu của Thảo My)',
        fee: '120.000đ',
        status: 'Đã hoàn tất',
        clueId: 'giaonhanh-ca-no',
        clueLabel: 'Đơn GiaoNhanh GN-99801 chuyển 2 vali ra phao số 4 lúc 21:30',
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
        clueId: 'tin-nhan-ban',
        clueLabel: 'Tin bán máy lúc 20:44 gài bẫy số điện thoại của Hào trên Chợ Tốt',
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
        clueId: 'chotot-ban-xe',
        clueLabel: 'Nam rao bán xe máy cũ từ 4 ngày trước đóng tiền học',
      },
    ]
  }
  return []
}

/** Danh sách biến động số dư VietinBank (VỤ 2, 3, 4, 5) */
export function getBankTransactions(caseId: string): BankTransaction[] {
  // Vụ 1: Hẻm 42 - Sao kê VietinBank khoản nợ 5 triệu của Dũng
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
    ]
  }

  // Vụ 2: Linh chuyển tiền học phí lúc 20:41
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
        clueId: 'chuyen-tien-trng',
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
        clueId: 'chuyen-khoan',
        clueLabel: 'Lệnh chuyển khoản 200 triệu lúc 21:50 do Đạt ký duyệt',
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
        clueId: 'chuyen-khoan-yen',
        clueLabel: 'Lệnh chuyển cọc 200 triệu từ Vũ Hoàng cho Yến giúp việc lúc 17:30',
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
        clueId: 'trong-alibi',
        clueLabel: 'Hoá đơn quẹt thẻ tại The Moon Lounge lúc 22:45 xác nhận alibi của Trọng',
      },
    ]
  }

  // Vụ 6: Lệnh chuyển 3 tỷ tiền chuộc vào tài khoản Minh Khang lúc 22:45
  if (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
    return [
      {
        id: 'TX-77102',
        time: '22:45:00 · Thứ Bảy',
        type: 'in',
        amount: '+3.000.000.000 VND',
        accountName: 'LE MINH KHANG',
        accountNo: '10889966xxxx',
        bank: 'VietinBank',
        balanceAfter: '3.045.200.000 VND',
        content: 'CHUYEN TIEN CHUOC GIAI CUU CON GAI THAO MY THEO YEU CAU',
        clueId: 'vietinbank-chuyen-tien-chuoc',
        clueLabel: 'Sao kê VietinBank: 3 tỷ tiền chuộc đổ vào tài khoản Minh Khang lúc 22:45',
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
        clueId: 'tui-den',
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
        clueLabel: 'Đơn thuốc cấp cứu 21:20 chứng minh Bác Bảy ở nhà thuốc lúc xảy ra vụ án',
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
        clueLabel: 'Biên lai sơ cứu bỏng tay lúc 20:42 chứng minh Khoa không thể cạy két',
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
        clueLabel: 'Đạt mua thuốc ngủ liều cao và găng tay cao su đen lúc 17:30',
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
        notes: 'Bản ký nhận hóa chất độc dược thuộc danh mục kiểm soát đặc biệt số hiệu ĐC-098. Dấu vân tay người nhận bàn giao: Bác sĩ Vũ Hoàng.',
        clueId: 'lo-doc-non-bo',
        clueLabel: 'Hồ sơ kiểm soát độc chất: Vũ nhận bàn giao dung dịch Aconitine',
      },
      {
        id: 'LC-502',
        time: '22:15 · Thứ Sáu (Đêm nay)',
        customer: 'Bác Sĩ Vũ Hoàng (Gọi Video Call)',
        category: 'emergency',
        items: ['Tư vấn thuốc trợ tim Digoxin khẩn cấp'],
        totalPrice: '0 đ',
        notes: 'Lúc 22:15 Bác sĩ Vũ gọi video call kéo dài 6 phút với dược sĩ ca tối hỏi mua gấp thuốc trợ tim cho bác ruột. Cuộc gọi nhằm tạo chứng cứ ngoại phạm theo chiếc đồng hồ 22:15!',
        clueId: 'alibi-gia-vu',
        clueLabel: 'Cuộc gọi video call lúc 22:15 của Vũ tạo chứng cứ ngoại phạm giả',
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
        clueId: 'longchau-thuoc-an-than',
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
        camName: 'Camera Ngã Tư Cổng Hẻm 42',
        camLocation: 'Đầu Hẻm 42 giao Phố Hàng Chai',
        time: '21:35 · Thứ Sáu',
        description: 'Phát hiện một nam thanh niên mặc đồng phục shipper GiaoNhanh dắt bộ một chiếc xe đạp điện màu xanh mint từ trong hẻm 42 ra hướng mặt đường lớn.',
        objectsObserved: ['Dũng Shipper', 'Xe đạp điện xanh mint cô Lan', 'Biển số tạm thời'],
        clueId: 'vy-chung-kien',
        clueLabel: 'Camera đầu ngõ ghi nhận Dũng dắt xe đạp điện xanh mint lúc 21:35',
      },
      {
        id: 'CAM-102',
        camName: 'Camera Giao Lộ Hàng Chai - Cửa Đông',
        camLocation: 'Ngã tư Phố Hàng Chai',
        time: '21:49 · Thứ Sáu',
        description: 'Chiếc xe đạp điện Nijia màu xanh mint phóng qua ngã tư hướng về phía Hẻm 44. Người lái mặc áo khoác shipper GiaoNhanh có vóc dáng trùng khớp tài xế Dũng.',
        objectsObserved: ['Xe đạp điện xanh mint', 'Tài xế mặc áo GiaoNhanh', 'Hướng di chuyển Hẻm 44'],
        clueId: 'don-hang-2147',
        clueLabel: 'Camera giao thông ghi nhận xe xanh mint chạy qua lúc 21:49',
      },
      {
        id: 'CAM-103',
        camName: 'Camera Cổng Hẻm 46',
        camLocation: 'Đầu Hẻm 46 phố Hàng Chai',
        time: '21:42 · Thứ Sáu',
        description: 'Tài xế Sơn (NowFood) điều khiển xe máy số 29-X1 chở thùng trà sữa đi vào Hẻm 46 giao hàng cho chị Hoa. Sơn không hề đi xe đạp điện.',
        objectsObserved: ['Sơn Shipper', 'Xe máy 29-X1', 'Thùng hàng NowFood'],
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
        camName: 'Camera Bãi Đỗ Xe & Vách Sau Sân Cầu Lông',
        camLocation: 'Lối đi nội bộ sau sân cầu lông',
        time: '20:25 · Thứ Bảy',
        description: 'Một nam thanh niên mặc áo khoác gió màu đỏ lén lút đi vào lối hẹp phía sau vách tôn tủ đồ nhân viên. Khe hở nóc tủ số 4 bị người này thò tay vào.',
        objectsObserved: ['Sơn mặc áo khoác đỏ', 'Khe hở nóc tủ đồ số 4', 'Đứng rình rập 4 phút'],
        clueId: 'son-ao-do',
        clueLabel: 'Camera bãi xe ghi nhận Sơn mặc áo đỏ thò tay qua khe tủ lúc 20:25',
      },
      {
        id: 'CAM-202',
        camName: 'Camera Lối Vào Sân Số 2',
        camLocation: 'Sân thi đấu số 2',
        time: '20:29 · Thứ Bảy',
        description: 'Khách chơi Hào cầm 2 cây vợt bước vào sân số 2 khởi động và thi đấu giao hữu liên tục từ 20:30 đến 21:00 trước sự chứng kiến của cả chục khán giả.',
        objectsObserved: ['Hào Smash', 'Sân số 2', 'Trận đấu 20:30 - 21:00'],
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
        camName: 'Camera Ngã Ba Quán Nước Phúc',
        camLocation: 'Cổng chùa đối diện quán trà đá',
        time: '20:57 - 21:25 · Thứ Bảy',
        description: 'Vũ Đình Tú ngồi tại bàn ngoài quán trà đá anh Phúc suốt từ 20:57. Đến 21:20 lúc hội chợ mất điện, Tú vẫn ngồi cãi nhau về cốc trà bị nghiêng đổ, không rời quán.',
        objectsObserved: ['Vũ Đình Tú', 'Chủ quán Phúc', 'Ngồi liên tục tại bàn ngoài'],
        clueId: 'tu-o-quan-phuc',
        clueLabel: 'Camera ghi nhận Tú ngồi tại quán trà đá suốt từ 20:57 đến 21:25',
      },
      {
        id: 'CAM-302',
        camName: 'Camera An Ninh Cổng Tam Quan',
        camLocation: 'Bãi cỏ phía sau bệ đặt hòm công đức',
        time: '21:02 · Thứ Bảy (Lúc mất điện)',
        description: 'Bóng người phụ nữ đeo tạp dề bánh mì, đi giày thể thao trắng chạy vội từ bãi cỏ trũng phía sau bệ hòm quỹ ra ngoài, tay ôm chặt túi xách to phồng.',
        objectsObserved: ['Nguyễn Thu Trang', 'Giày bata trắng dính bùn đỏ', 'Túi xách phồng 8 triệu'],
        clueId: 'trang-giay',
        clueLabel: 'Camera ghi nhận Trang đi ra từ bãi cỏ sau hòm quỹ lúc 21:02',
      },
    ]
  }

  // Vụ 4: Camera cửa hầm và hẻm gom rác chung cư 42
  if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
    return [
      {
        id: 'CAM-401',
        camName: 'Camera Cửa Dốc Tầng Hầm Chung Cư',
        camLocation: 'Dốc hầm xe toà nhà',
        time: '21:15 · Thứ Bảy',
        description: 'Bảo vệ Tư đi xe máy biển 29-X1 dừng đỗ chắn ngang dốc cửa hầm, mắt nhìn quanh cảnh giới trong lúc bên trong hầm mất điện.',
        objectsObserved: ['Tư bảo vệ', 'Xe máy 29-X1', 'Cảnh giới cửa hầm'],
        clueId: 'tu-loi-khai',
        clueLabel: 'Camera cửa hầm ghi nhận Tư đỗ xe canh cửa lúc 21:15',
      },
      {
        id: 'CAM-402',
        camName: 'Camera Hẻm Gom Rác Sau Chung Cư',
        camLocation: 'Khu vực bãi tập kết rác sau toà nhà',
        time: '21:30 · Thứ Bảy',
        description: 'Quản lý Đạt mặc áo sơ mi nhàu, vội vã ném túi nilông đen lớn vào họng xả rác số 1 rồi quay ngoắt bước nhanh ra phố.',
        objectsObserved: ['Trần Tuấn Đạt', 'Túi rác đen 8.2kg', 'Vứt tang vật vào thùng rác'],
        clueId: 'tui-den',
        clueLabel: 'Camera hẻm sau ghi nhận Đạt vứt túi đen vào thùng rác lúc 21:30',
      },
    ]
  }

  // Vụ 5: Camera ngõ biệt thự và quán bar The Moon Lounge
  if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
    return [
      {
        id: 'CAM-501',
        camName: 'Camera Đầu Ngõ Biệt Thự Hoàng Khang',
        camLocation: 'Cổng ngoài ngõ rẽ vào biệt thự',
        time: '21:10 · Thứ Sáu',
        description: 'Chiếc xe SH màu xám do Bác sĩ Vũ Hoàng điều khiển đi vào ngõ biệt thự lúc 21:10 (trực tiếp vạch trần lời khai giả của Vũ rằng 22:00 mới có mặt).',
        objectsObserved: ['Bác Sĩ Vũ Hoàng', 'Xe SH xám 29-B1', 'Đi vào ngõ lúc 21:10'],
        clueId: 'vu-den-luc-21h10',
        clueLabel: 'Camera ngõ ghi nhận Vũ đi vào biệt thự lúc 21:10 mâu thuẫn lời khai',
      },
      {
        id: 'CAM-502',
        camName: 'Camera Quán The Moon Lounge Ba Đình',
        camLocation: 'Sảnh chính Lounge',
        time: '21:00 - 23:00 · Thứ Sáu',
        description: 'Thương nhân cổ vật Lê Đức Trọng ngồi uống rượu và trò chuyện liên tục cùng 2 đối tác kinh doanh cổ vật tại bàn VIP 03, có camera lưu trữ liên tục.',
        objectsObserved: ['Lê Đức Trọng', 'Hai đối tác kinh doanh', 'Bàn VIP 03 từ 21h đến 23h'],
        clueId: 'trong-alibi',
        clueLabel: 'Camera The Moon Lounge xác nhận Trọng có mặt từ 21h đến 23h',
      },
      {
        id: 'CAM-503',
        camName: 'Camera Ban Công Phía Sau Biệt Thự',
        camLocation: 'Tường rào giáp vườn cây',
        time: '21:42 · Thứ Sáu',
        description: 'Bóng người đàn ông đi giày da size 42 leo qua lan can ban công phòng trà tầng 2, tay giật mạnh sợi chỉ cước để kéo chốt then cài bên trong cửa sổ tạo phòng kín.',
        objectsObserved: ['Người mang giày da size 42', 'Sợi chỉ cước câu cá', 'Giật then cài cửa sổ'],
        clueId: 'then-cai-chi-cuoc',
        clueLabel: 'Camera ban công ghi nhận thủ đoạn giật chỉ cước cài then phòng kín',
      },
    ]
  }

  
  // Vụ 6: Camera Bến Thuyền & Ngã Ba Sông Hồng
  if (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
    return [
      {
        id: 'CAM-601',
        camName: 'Camera Giám Sát Cầu Tàu Số 2 Bến Sông Hồng',
        camLocation: 'Lối bậc thang phụ mạn du thuyền',
        time: '21:50 · Thứ Bảy',
        description: 'Phát hiện một phụ nữ dáng người thon cao trùm áo mưa cánh dơi màu tím bước nhanh từ bậc thang mạn thuyền xuống ca nô cao tốc CN-082 đang nổ máy chờ sẵn.',
        objectsObserved: ['Phụ nữ trùm áo mưa tím (Thảo My)', 'Ca nô cao tốc CN-082', 'Phao neo đậu số 4'],
        clueId: 'camera-ben-thuyen',
        clueLabel: 'Camera CAM-601: Thảo My trùm áo mưa tím bước xuống ca nô lúc 21:50',
      },
      {
        id: 'CAM-602',
        camName: 'Camera Quầy Bar Khoang VIP Tầng 3',
        camLocation: 'Lối hành lang phòng vệ sinh tầng 3',
        time: '22:05 · Thứ Bảy',
        description: 'Minh Khang đi vội từ mạn thuyền vào, cố tình va mạnh vào người bồi bàn Nam rồi nhanh tay luồn vật gì đó vào túi tạp dề của Nam.',
        objectsObserved: ['Minh Khang', 'Nam bồi bàn', 'Hành động nhét điện thoại vào tạp dề'],
        clueId: 'sim-rac-tap-de',
        clueLabel: 'Camera hành lang: Minh Khang lén nhét điện thoại vào tạp dề của Nam lúc 22:05',
      },
    ]
  }
  return []
}
