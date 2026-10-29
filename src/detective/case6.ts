import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 06',
  title: 'Bí mật sàn đấu giá tranh Triệu Đô',
  place: 'Nhà Đấu Giá Hoàng Gia Grand Palace',
  time: '21:30 · thứ Bảy 14/11',
  brief:
    'Bức tranh vô giá "Ánh Trăng Biển Hồ" trị giá 2.5 triệu USD bị đánh tráo thành tranh giả tinh xảo ngay trong 12 phút cúp điện dự phòng. Giám đốc nghệ thuật bị sốc thuốc ngất trong phòng bảo mật, bảo vệ trưởng ôm va li tranh giả chạy trốn, nhưng chân tướng thực sự lại là một kế hoạch hoán đổi danh tính và âm mưu tẩu tán qua mạng lưới rửa tiền xảo quyệt bậc nhất.',
  culprit: 'phan-an',
  accomplice: 'giang-phuc',
  difficulty: 'Siêu hóc búa',
  question: 'Ai là kẻ chủ mưu đánh tráo bức tranh vô giá, và ai là đồng phạm kỹ thuật hỗ trợ?',
  solution:
    'Phan An (Nhà phục chế tranh nổi tiếng) là kẻ chủ mưu. Phan An ngập trong nợ cá cược và mua bán cổ vật lậu 15 tỷ bị chủ nợ siết ráo riết. Phan An đã liên minh với Giang Phúc (Kỹ sư an ninh hệ thống) để tạo kịch bản hoàn hảo: Giang Phúc can thiệp máy chủ BMS lúc 21:18 giả lập báo cháy tại khu vực B để kích hoạt quy trình chuyển điện dự phòng ngắt camera trong 12 phút. Lúc 21:22, Phan An dùng chìa thẻ từ sao chép và găng tay cao su màu xám tiến vào phòng bảo mật, tiêm thuốc mê Ketamine (mua từ Nhà Thuốc Long Châu) làm ngất Giám đốc Huy, tháo bức tranh thật cuộn vào ống bạt bản vẽ kiến trúc. Để tung hỏa mù, Phúc điều hướng nghi ngờ sang Bảo Vệ Trưởng Hùng (bằng cách nhét khung tranh giả và 500 triệu tiền mặt vào cốp xe Hùng) và Họa Sĩ Triệu Vy (người vừa đăng bán tranh sơn dầu giá sốc trên Chợ Tốt). Phan An dùng lệnh chuyển khoản cọc 800 triệu trên VietinBank cho Phúc lúc 18:45, và đặt đơn GiaoNhanh bọc kín chuyển ống bạt sang kho ngoại quan lúc 21:55 bị camera giao thông và định vị GPS bóc trần.',
}

export const CLUES: Record<string, ClueDef> = {
  'tranh-gia-trao': {
    id: 'tranh-gia-trao',
    tag: 'photo',
    title: 'Bức tranh "Ánh Trăng Biển Hồ" bị tráo bằng bản sao giả',
    detail:
      'Chuyên gia giám định dùng đèn UV phát hiện lớp sơn huỳnh quang trên bức tranh hiện tại còn chưa khô hẳn. Chữ ký tác giả bị can thiệp bằng mực acrylic hiện đại — đây là bản sao chép cực kỳ điêu luyện được chuẩn bị từ trước!',
  },
  'huy-ngat-kho': {
    id: 'huy-ngat-kho',
    tag: 'chat',
    title: 'Giám đốc Huy bị sốc thuốc mê trong phòng bảo mật',
    detail:
      'Giám đốc nghệ thuật Huy được tìm thấy nằm gục bên bệ đỡ tranh lúc 21:32, trên cổ có vết kim tiêm liều cao Ketamine y tế, chùm thẻ từ VIP mở cửa kính 3 lớp đã bị sao chép tín hiệu RFID.',
  },
  'bms-bao-chay-gia': {
    id: 'bms-bao-chay-gia',
    tag: 'web',
    title: 'BMS: Tín hiệu báo cháy giả khu B ngắt điện dự phòng lúc 21:18',
    detail:
      'Hệ thống BMS toà nhà ghi nhận: Cảm biến khói khu B bị kích hoạt bởi xung lệnh cưỡng chế (manual override) từ tài khoản Admin kỹ thuật lúc 21:18:05, khiến hệ thống chuyển nguồn và camera phòng tranh bị mù tín hiệu đúng 12 phút.',
  },
  'longchau-ketamine': {
    id: 'longchau-ketamine',
    tag: 'web',
    title: 'Long Châu: Phan An ký mua thuốc mê chuyên dụng & dung môi hữu cơ',
    detail:
      'Hồ sơ y tế LC-601 tại Nhà Thuốc Long Châu chi nhánh Hẻm 42: Phan An dùng danh nghĩa viện phục chế ký nhận ống Ketamine 10ml và dung môi tẩy sơn dầu lúc 16:30 chiều ngày xảy ra vụ án!',
  },
  'ong-bat-kien-truc': {
    id: 'ong-bat-kien-truc',
    tag: 'file',
    title: 'Ống bạt bản vẽ kiến trúc chứa tranh thật cuộn tròn',
    detail:
      'Ống bạt màu xám đen chuyên đựng bản vẽ kiến trúc A0 bị hung thủ mang ra khỏi sảnh lúc 21:35. Bên trong có sợi vải toan lanh của bức tranh thật 2.5 triệu USD.',
  },
  'giaonhanh-ong-bat': {
    id: 'giaonhanh-ong-bat',
    tag: 'web',
    title: 'GiaoNhanh GN-99120: Đơn gửi ống bản vẽ lúc 21:55',
    detail:
      'Cổng GiaoNhanh (giaonhanh.vn): Đơn hoả tốc nhận tại cổng phụ Grand Palace lúc 21:55 giao về kho cảng Bạch Đằng. Người gửi ghi tên giả "KTS Hoàng", nhưng số điện thoại định danh lại trùng với máy phụ của Phan An!',
  },
  'vietinbank-chuyen-coc': {
    id: 'vietinbank-chuyen-coc',
    tag: 'web',
    title: 'VietinBank: Lệnh chuyển khoản 800 triệu cọc chia chác lúc 18:45',
    detail:
      'Sao kê VietinBank TX-60882: Đúng 18:45:10, Phan An chuyển khoản 800.000.000đ sang tài khoản của kỹ sư Giang Phúc với nội dung "Hop dong bao tri he thong quy 4". Bằng chứng thông đồng then chốt!',
  },
  'camera-cong-phu': {
    id: 'camera-cong-phu',
    tag: 'web',
    title: 'Camera Phường CAM-602: Người mang ống bạt rời sảnh lúc 21:35',
    detail:
      'Camera giao thông ngã tư Cửa Nam ghi hình đối tượng đeo kính gọng vàng, khoác măng-tô đen xách ống bạt bước vội lên taxi công nghệ lúc 21:35:12, dáng dấp hoàn toàn khớp với Phan An.',
  },
  'chotot-vy-tranh': {
    id: 'chotot-vy-tranh',
    tag: 'web',
    title: 'Chợ Tốt CT-601: Triệu Vy bán tranh tĩnh vật sơn dầu của học trò',
    detail:
      'Tin đăng CT-601 trên Chợ Tốt: Họa sĩ Triệu Vy đăng thanh lý tranh sơn dầu giá 8 triệu đồng từ 2 ngày trước để dọn xưởng vẽ, không liên quan đến kiệt tác "Ánh Trăng Biển Hồ".',
  },
  'hung-bi-cai-bay': {
    id: 'hung-bi-cai-bay',
    tag: 'chat',
    title: 'Bảo Vệ Trưởng Hùng bị gài bọc tiền 500 triệu vào cốp xe',
    detail:
      'Bác Hùng bị tố ôm tiền bỏ trốn, nhưng thực chất lúc mất điện bác chạy đi dập báo cháy giả. Có kẻ đã lén mở cốp xe máy nhét 500 triệu và mẩu toan rách vào để gài bẫy vu khống.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'phan-an',
    name: 'Phan An',
    role: 'Chuyên gia phục chế tranh',
    avatar: '🎨',
    note: 'Người duy nhất có trình độ thẩm định và sao chép kiệt tác. Đang nợ cá cược 15 tỷ. Mang ống bản vẽ ra ngoài.',
  },
  {
    id: 'giang-phuc',
    name: 'Giang Phúc',
    role: 'Kỹ sư trưởng an ninh BMS',
    avatar: '💻',
    note: 'Nắm toàn quyền điều khiển hệ thống camera và báo cháy toà nhà. Nhận chuyển khoản 800 triệu lúc 18:45.',
  },
  {
    id: 'hung-bv',
    name: 'Bác Hùng Bảo Vệ',
    role: 'Đội trưởng an ninh',
    avatar: '👮',
    note: 'Cầm chìa khoá phòng điều hành. Cốp xe bị phát hiện có 500 triệu tiền mặt và mảnh vải toan.',
  },
  {
    id: 'trieu-vy',
    name: 'Họa sĩ Triệu Vy',
    role: 'Họa sĩ đương đại',
    avatar: '👩‍🎨',
    note: 'Từng có mâu thuẫn lớn với Giám đốc Huy về bản quyền. Rao bán tranh sơn dầu trên Chợ Tốt.',
  },
  {
    id: 'giam-doc-huy',
    name: 'Giám đốc Huy',
    role: 'Giám đốc Nghệ Thuật Grand Palace',
    avatar: '👓',
    note: 'Người trực tiếp giữ thẻ từ VIP phòng bảo mật. Bị phát hiện ngất xỉu do sốc thuốc Ketamine.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group',
    name: 'BĐH Nhà Đấu Giá Grand Palace',
    avatar: '🏛️',
    isGroup: true,
    sub: '16 thành viên',
    preview: 'BÁO ĐỘNG ĐỎ: Kiệt tác Ánh Trăng Biển Hồ đã bị đánh tráo!',
    messages: [
      {
        id: 'bg1',
        from: 'them',
        senderName: 'Lễ Tân Grand Palace',
        senderAvatar: '💁‍♀️',
        time: '21:30',
        text: 'CẢ TOÀ NHÀ BÁO ĐỘNG! Giám đốc Huy bị đánh thuốc mê ngất trong phòng bảo mật tầng 3! Bức tranh 2.5 triệu USD bị tráo thành tranh giả rồi!',
        clue: 'huy-ngat-kho',
      },
      {
        id: 'bg2',
        from: 'them',
        senderName: 'Giang Phúc (An ninh mạng)',
        senderAvatar: '💻',
        time: '21:31',
        text: 'Mọi người bình tĩnh! Lúc 21:18 có chuông báo cháy khu B làm hệ thống tự động ngắt điện dự phòng 12 phút! Tôi vừa khám xe bác Hùng bảo vệ thấy có cọc tiền 500 triệu và khung gỗ kìa!',
      },
      {
        id: 'bg3',
        from: 'them',
        senderName: 'Bác Hùng Bảo Vệ',
        senderAvatar: '👮',
        time: '21:33',
        text: 'Thằng Phúc mày vu oan cho tao! Lúc chuông reo tao chạy đi tìm bình chữa cháy ở khu B thấy làm gì có lửa! Có đứa nào cố tình ném bọc tiền vào cốp xe tao để hãm hại!',
        clue: 'hung-bi-cai-bay',
      },
      {
        id: 'bg4',
        from: 'them',
        senderName: 'Phan An (Phục chế)',
        senderAvatar: '🎨',
        time: '21:34',
        text: 'Tôi nghi ngờ cô Triệu Vy! Chiều nay cô ta cãi nhau kịch liệt đòi trả thù ông Huy, trên [🛍️ Chợ Tốt](https://chotot.vn) cô ta còn đăng bán tranh sơn dầu ầm ĩ kìa!',
      },
      {
        id: 'bg5',
        from: 'them',
        senderName: 'Triệu Vy (Họa sĩ)',
        senderAvatar: '👩‍🎨',
        time: '21:36',
        text: 'Anh Phan An đừng có thừa nước đục thả câu! Tranh tôi bán trên Chợ Tốt là tranh tĩnh vật học trò vẽ từ 2 hôm trước! Lúc cúp điện tôi ngồi phòng trà lướt mạng có lịch sử truy cập rõ ràng!',
      },
      {
        id: 'bg6',
        from: 'them',
        senderName: 'Chuyên Viên Giám Định',
        senderAvatar: '🔬',
        time: '21:38',
        text: 'Tôi vừa soi đèn UV: bức tranh treo trên tường dùng chất liệu sơn chưa khô và mực acrylic hiện đại! Kẻ tráo tranh phải là bậc thầy phục chế mới có kỹ nghệ sao chép tinh vi cỡ này!',
        clue: 'tranh-gia-trao',
      },
      {
        id: 'bg7',
        from: 'them',
        senderName: 'Ban Giám Đốc',
        senderAvatar: '🏛️',
        time: '21:40',
        text: 'Công an kinh tế và hình sự đã vào cuộc! Yêu cầu rà soát ngay [🏢 BMS Toà Nhà](https://bms-building.vn), [📹 Camera Phường](https://camera-phuong.gov.vn), [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) và [🏦 VietinBank](https://vietinbank.vn)!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Cục Cảnh sát Hình sự & Kinh tế',
    preview: 'Đại án triệu đô cực kỳ tinh vi: Hai lượt cáo buộc!',
    requires: ['huy-ngat-kho'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:42',
        text: 'Vụ án triệu đô này được chuẩn bị vô cùng chu đáo: Bác bảo vệ Hùng bị gài bọc tiền 500 triệu; Triệu Vy bị vu khống bán tranh; Giám đốc Huy bị sốc thuốc ngất xỉu. Đây là đòn tung hoả mù kinh điển!',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:44',
        text: 'Em mở [🏢 BMS Toà Nhà](https://bms-building.vn) kiểm tra xem ai đã kích hoạt lệnh báo cháy giả lúc 21:18, và vào [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) truy vết ai đã mua Ketamine gây mê Giám đốc Huy!',
        requires: ['bms-bao-chay-gia'],
      },
      {
        id: 't3',
        from: 'them',
        time: '21:46',
        text: 'Kiểm tra [⚡ GiaoNhanh](https://giaonhanh.vn) và [📹 Camera Phường](https://camera-phuong.gov.vn) để truy lùng chiếc ống bạt bản vẽ kiến trúc cuộn tranh thật chạy trốn!',
        requires: ['ong-bat-kien-truc'],
      },
      {
        id: 't4',
        from: 'them',
        time: '21:48',
        text: 'Sau đó soi dòng tiền trên [🏦 VietinBank](https://vietinbank.vn). Hồ sơ vụ án khoá bằng 4 chữ số bí mật: chính là MÃ SỐ BÁO CHÁY CƯỠNG CHẾ trên hệ thống BMS (định dạng 4 số: 2118)!',
        requires: ['vietinbank-chuyen-coc'],
      },
      {
        id: 't5',
        from: 'me',
        time: '21:50',
        text: 'Em đã xâu chuỗi toàn bộ sự việc: kẻ chủ mưu là chuyên gia phục chế Phan An cùng đồng phạm kỹ thuật Giang Phúc!',
        requires: ['vietinbank-chuyen-coc'],
      },
      {
        id: 't6',
        from: 'them',
        time: '21:51',
        text: 'Xuất sắc! Nhập mã 2118 vào hồ sơ để mở khoá và tiến hành bắt gọn KẺ CHỦ MƯU và KẺ TIẾP TAY ngay trước khi bức tranh bị đưa lên tàu viễn dương!',
        requires: ['vietinbank-chuyen-coc'],
      },
    ],
  },
  {
    id: 'hung-bv',
    name: 'Bác Hùng Bảo Vệ',
    avatar: '👮',
    sub: 'Đang trực tại phòng bảo vệ',
    preview: 'Tôi bị đứa nào nhét tiền vào cốp xe!',
    requires: ['huy-ngat-kho'],
    messages: [
      {
        id: 'hb1',
        from: 'them',
        time: '21:45',
        text: 'Đồng chí công an ơi tôi bị oan thấu trời! Cả đời tôi làm bảo vệ liêm khiết, 500 triệu trong cốp xe là đứa nào nhét vào lúc tôi chạy đi dập chuông báo cháy khu B!',
      },
      {
        id: 'hb2',
        from: 'them',
        time: '21:46',
        text: 'Lúc 21:18 chuông reo inh ỏi, tôi thấy thằng Giang Phúc kỹ sư ngồi một mình trong phòng điều khiển máy chủ bấm lia lịa, nó bảo tôi chạy xuống khu B kiểm tra ngay!',
        clue: 'hung-bi-cai-bay',
      },
    ],
  },
  {
    id: 'trieu-vy',
    name: 'Triệu Vy Họa Sĩ',
    avatar: '👩‍🎨',
    sub: 'Hoạt động 3 phút trước',
    preview: 'Tranh trên Chợ Tốt là tranh cũ của học trò!',
    requires: ['huy-ngat-kho'],
    messages: [
      {
        id: 'tv1',
        from: 'them',
        time: '21:47',
        text: 'Tôi tức ông Huy vì tranh cãi nghệ thuật thật, nhưng tôi là nghệ sĩ chứ không phải quân trộm cắp!',
      },
      {
        id: 'tv2',
        from: 'them',
        time: '21:48',
        text: 'Tin rao bán trên [🛍️ Chợ Tốt](https://chotot.vn) mã CT-601 của tôi là tranh sơn dầu tĩnh vật khổ nhỏ của học viên đăng từ 2 hôm trước giá có vài triệu bạc! Bức "Ánh Trăng Biển Hồ" là tranh lụa kết hợp sơn mài, ai làm nghề cũng biết tôi không hề sao chép được phong cách đó!',
        clue: 'chotot-vy-tranh',
      },
      {
        id: 'tv3',
        from: 'them',
        time: '21:49',
        text: 'Người duy nhất sao chép được nét cọ lụa mài điêu luyện đó ở Hà Nội này chỉ có Phan An — nhà phục chế bậc thầy thôi!',
      },
    ],
  },
  {
    id: 'giang-phuc',
    name: 'Giang Phúc (An Ninh)',
    avatar: '💻',
    sub: 'Hoạt động 1 phút trước',
    preview: 'Tôi chỉ xử lý sự cố báo cháy theo quy trình.',
    requires: ['bms-bao-chay-gia'],
    messages: [
      {
        id: 'gp1',
        from: 'them',
        time: '21:50',
        text: 'Tôi làm đúng quy trình an ninh toà nhà! Cảm biến báo cháy tầng B reo thì hệ thống phải tự ngắt điện phòng tranh để tránh chập nổ nguồn điện cao thế!',
      },
      {
        id: 'gp2',
        from: 'me',
        time: '21:52',
        text: 'Nhưng nhật ký BMS toà nhà ghi nhận chính tài khoản Admin Kỹ Thuật của anh đã gửi lệnh "FORCE_FIRE_ALARM" lúc 21:18, và sao kê VietinBank TX-60882 cho thấy anh nhận 800 triệu từ Phan An lúc 18:45!',
        requires: ['vietinbank-chuyen-coc'],
        clue: 'vietinbank-chuyen-coc',
      },
      {
        id: 'gp3',
        from: 'them',
        time: '21:53',
        text: '...Anh Phan An bảo chỉ mượn tranh thật 2 ngày để chụp ảnh triển lãm quốc tế... Tôi không ngờ anh ấy lừa tôi đánh tráo đem bán...',
        requires: ['vietinbank-chuyen-coc'],
      },
    ],
  },
  {
    id: 'phan-an',
    name: 'Phan An (Phục Chế)',
    avatar: '🎨',
    sub: 'Hoạt động vừa xong',
    preview: 'Tôi chỉ là chuyên gia tư vấn bảo tồn...',
    requires: ['longchau-ketamine'],
    messages: [
      {
        id: 'pa1',
        from: 'them',
        time: '21:54',
        text: 'Tôi kiểm tra sơ bộ thì bức tranh trên tường là bản sao cực kỳ công phu... Tôi đã xách ống bản vẽ về văn phòng nghiên cứu tài liệu từ 21:30 rồi!',
      },
      {
        id: 'pa2',
        from: 'me',
        time: '21:56',
        text: 'Nhưng hồ sơ Nhà thuốc Long Châu ghi rõ anh mua thuốc gây mê Ketamine lúc 16:30, và ống bản vẽ anh vừa xách ra khỏi sảnh đã được gửi qua GiaoNhanh GN-99120 chuyển thẳng ra cảng Bạch Đằng!',
        requires: ['giaonhanh-ong-bat'],
        clue: 'giaonhanh-ong-bat',
      },
      {
        id: 'pa3',
        from: 'them',
        time: '21:57',
        text: '...Các người... làm sao lần ra được lộ trình nhanh đến thế?! Mười lăm tỷ tiền nợ... tôi không còn đường nào khác!',
        requires: ['giaonhanh-ong-bat'],
      },
    ],
  },
]

export const ORDERS: Order[] = [
  {
    id: 'GN-99120',
    time: '21:55',
    pickup: 'Cổng Phụ Grand Palace (Phan An)',
    drop: 'Kho Ngoại Quan Cảng Bạch Đằng (Ống bạt bản vẽ)',
    fee: '85.000đ',
    status: 'Đã hoàn tất',
    clue: 'giaonhanh-ong-bat',
  },
  {
    id: 'TX-60882',
    time: '18:45',
    pickup: 'Phan An → Giang Phúc',
    drop: '800.000.000đ (VietinBank)',
    fee: 'Tiền cọc bảo trì',
    status: 'Thành công',
    clue: 'vietinbank-chuyen-coc',
  },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Bức tranh giả dưới ánh đèn UV',
    time: '21:38',
    scene: 'tea',
    img: 'detective/case6-uv-tranh.jpg',
    caption: 'Đèn UV phát quang lớp sơn acrylic hiện đại chưa khô trên mặt toan.',
    clue: 'tranh-gia-trao',
    hotspots: [
      {
        x: 52,
        y: 48,
        label: 'Vết sơn huỳnh quang',
        hint: 'Soi kỹ vệt sáng xanh dưới ánh đèn UV',
        clue: 'tranh-gia-trao',
        detail:
          'Dưới ánh đèn huỳnh quang cực tím UV, toàn bộ lớp sơn nền phát sáng lốm đốm màu xanh ngọc. Đây là chất dung môi pha màu công nghiệp mới sản xuất năm 2024, chứng minh kiệt tác cổ đã bị thay thế hoàn toàn bằng tranh giả tinh xảo!',
      },
    ],
  },
  {
    id: 'p2',
    title: 'Vết kim tiêm trên cổ Giám đốc Huy',
    time: '21:32',
    scene: 'street',
    img: 'detective/case6-vet-tiem.jpg',
    caption: 'Dấu tiêm thuốc mê Ketamine sau gáy nạn nhân.',
    clue: 'huy-ngat-kho',
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 'tr1',
    name: 'vo-ong-ketamine.jpg',
    kind: 'Vỏ lọ thuốc vứt đáy thùng rác sảnh B',
    preview: 'Lọ thủy tinh 10ml Ketamine HCL',
    detail: 'Lọ thủy tinh Ketamine rỗng mang mã định danh LC-601 của Nhà Thuốc Long Châu, có in dấu vân tay của Phan An.',
    clue: 'longchau-ketamine',
  },
  {
    id: 'tr2',
    name: 'ban-thao-copy-net-ve.txt',
    kind: 'Bản phân tích phục chế',
    preview: 'Bản vẽ phác thảo cấu trúc sợi toan Ánh Trăng Biển Hồ',
    detail: 'Tài liệu mật phân tích từng lớp màu và chữ ký giả mạo tác giả trên giấy can cao cấp của viện phục chế Phan An.',
    clue: 'ong-bat-kien-truc',
  },
]
