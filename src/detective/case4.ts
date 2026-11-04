import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 04',
  title: 'Đêm mất điện ở chung cư 42',
  place: 'Chung cư 42 · Tầng hầm & Phòng Quản lý',
  time: '21:40 · thứ Bảy 20/10',
  brief:
    'Sự cố ngắt điện toàn bộ tầng hầm và thang máy lúc 21:10. Két sắt văn phòng ban quản lý bị mở sạch 200 triệu đồng, kỹ thuật viên Khải bất tỉnh cạnh tủ điện. Dữ liệu hệ thống BMS toà nhà và dấu vết họng rác thông tầng là chìa khóa vén màn chân tướng.',
  culprit: 'dat',
  accomplice: 'tu',
  difficulty: 'Siêu khó',
  question: 'Ai là kẻ chủ mưu mở két, và ai là đồng phạm tiếp tay tại tầng hầm?',
  solution:
    'Đạt (Trưởng ban quản lý) là chủ mưu đang bị chủ nợ Bảy đòi 250 triệu đến hạn. Đạt đổi mã két thành 2147 lúc chiều viện cớ bảo mật định kỳ, mua găng tay cao su tại Long Châu, rồi câu kết với Tư (bảo vệ ca đêm). Tư dùng chìa tủ điện độc quyền ngắt Aptomat tổng lúc 21:10 để vô hiệu hoá camera, đồng thời đánh ngất kỹ thuật viên Khải khi Khải xuống kiểm tra rồi nhét máy dò mã vào balo Khải để vu oan. Trong bóng tối, Đạt mở két lấy 200 triệu thả xuống họng rác thông tầng lúc 21:18 (cảm biến BMS ghi nhận vật nặng 12kg rơi), tẩu tán ra hẻm sau rồi chuyển khoản thanh toán nợ cho Bảy lúc 21:50.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-ket': {
    id: 'mat-ket',
    tag: 'photo',
    title: 'Két sắt văn phòng mở bằng mã số bí mật',
    detail:
      'Két sắt phòng ban quản lý mở toang không có vết cạy phá, nhập đúng mã số 4 chữ số bí mật. Toàn bộ 200.000.000 VNĐ tiền quỹ bảo trì biến mất.',
  },
  'khai-bat-tinh': {
    id: 'khai-bat-tinh',
    tag: 'chat',
    title: 'Khải bị đánh bất tỉnh tại tủ điện hầm B1',
    detail:
      'Kỹ thuật viên Khải được tìm thấy bất tỉnh lúc 21:40 cạnh tủ điện hầm B1 do bị đánh lén từ phía sau. Trong balo của Khải bị ai đó nhét máy dò mã két nhằm vu khống.',
  },
  'mat-dien': {
    id: 'mat-dien',
    tag: 'web',
    title: 'Aptomat hầm B1 bị ngắt thủ công lúc 21:10',
    detail:
      'Hệ thống BMS toà nhà ghi nhận: Cầu dao tổng nguồn chiếu sáng và camera hầm B1 bị ngắt thủ công bằng tay lúc 21:10, không phải do chập điện tự nhiên.',
  },
  'camera-tat': {
    id: 'camera-tat',
    tag: 'chat',
    title: 'Tài khoản quản lý thao tác tắt camera lúc 21:08',
    detail:
      'Camera hành lang tầng 2 bị ngắt kết nối trước khi mất điện 2 phút bằng lệnh từ tài khoản quản trị Admin của Đạt.',
  },
  'tu-tat-dien': {
    id: 'tu-tat-dien',
    tag: 'chat',
    title: 'Tư giữ chìa khoá tủ điện tầng hầm',
    detail:
      'Sổ giao ca khẳng định Tư là người duy nhất giữ chìa khóa tủ điện cơ học trong ca trực đêm. Camera ngã tư ghi nhận xe máy của Tư đỗ chặn dốc hầm cảnh giới lúc 21:15.',
  },
  'tin-nhan-dat': {
    id: 'tin-nhan-dat',
    tag: 'web',
    title: 'Lịch sử cuộc gọi ngắn giữa Đạt và Tư lúc 21:05',
    detail:
      'Nhật ký viễn thông ghi nhận cuộc gọi mã hoá kéo dài 45 giây giữa Đạt và Tư lúc 21:05, ngay trước thời điểm xảy ra sự cố cắt điện tầng hầm.',
  },
  'lan-xac-nhan': {
    id: 'lan-xac-nhan',
    tag: 'chat',
    title: 'Đạt yêu cầu đổi mã két thành 2147 chiều 20/10',
    detail:
      'Kế toán Lan khai: Lúc 17:00 chiều Đạt ký biên bản số 2147 yêu cầu đổi mã két sang mã mới viện cớ quy định an toàn định kỳ.',
  },
  'hong-rac-bms': {
    id: 'hong-rac-bms',
    tag: 'web',
    title: 'Cảm biến họng rác thông tầng ghi nhận vật rơi 12kg',
    detail:
      'Nhật ký BMS: Lúc 21:18:22, cảm biến họng rác thông tầng ghi nhận túi đồ nặng khoảng 12kg rơi từ tầng 2 xuống buồng rác hẻm sau.',
  },
  'lenh-chuyen-200tr': {
    id: 'lenh-chuyen-200tr',
    tag: 'web',
    title: 'Lệnh chuyển 200 triệu cho Bảy lúc 21:50',
    detail:
      'Sao kê VietinBank: 21:50:44 Đạt thực hiện chuyển khoản 200.000.000 VNĐ cho Lê Văn Bảy với nội dung thanh toán nợ gốc.',
  },
  'gang-tay-dat': {
    id: 'gang-tay-dat',
    tag: 'web',
    title: 'Hoá đơn Đạt mua găng tay cao su đen tại Long Châu',
    detail:
      'Biên lai LC-401 lúc 17:32: Đạt quẹt thẻ mua 01 hộp găng tay cao su y tế màu đen và băng dính xốp tại Nhà Thuốc Long Châu.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'dat',
    name: 'Quản Lý Đạt',
    role: 'Trưởng ban quản lý toà nhà',
    avatar: '👨‍💼',
    note: 'Nắm toàn bộ mã khóa phòng kỹ thuật và mật mã két sắt. Khai rằng về nhà riêng nghỉ ngơi từ 19h tối.',
  },
  {
    id: 'tu',
    name: 'Tư Bảo Vệ',
    role: 'Bảo vệ ca đêm hầm B1',
    avatar: '👮',
    note: 'Trực chốt dốc hầm để xe, giữ chìa khóa tủ điện cơ học suốt ca trực từ 18h đến 06h sáng hôm sau.',
  },
  {
    id: 'khai',
    name: 'Khải Kỹ Thuật',
    role: 'Kỹ thuật viên vận hành điện nước',
    avatar: '🔧',
    note: 'Bị phát hiện bất tỉnh cạnh tủ điện hầm B1. Trong balo có máy dò mã két bị nhét vào để vu oan.',
  },
  {
    id: 'lan',
    name: 'Lan Kế Toán',
    role: 'Kế toán trưởng toà nhà',
    avatar: '👩‍💻',
    note: 'Người phụ trách sổ sách thu chi. Về nhà lúc 19:55 có đơn hàng giao cơm hộp xác nhận alibi.',
  },
  {
    id: 'bay',
    name: 'Bảy Chủ Nợ',
    role: 'Khách quen khu vực chung cư',
    avatar: '🍢',
    note: 'Ngồi tại quán ốc cạnh toà nhà đến 21:40, nhận được khoản thanh toán nợ 200 triệu lúc 21:50.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group_bql',
    name: 'BQL Chung Cư 42',
    avatar: '🏢',
    isGroup: true,
    sub: '8 thành viên',
    preview: 'Tư: Mất điện tầng hầm, anh Khải ngất xỉu rồi!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Tư Bảo Vệ',
        senderAvatar: '👮',
        time: '21:38',
        text: 'Cả nhà ơi có chuyện lớn rồi! Tầng hầm mất điện tối om, tôi cầm đèn pin xuống kiểm tra thì thấy anh Khải ngất xỉu nằm cạnh tủ điện!',
        clue: 'khai-bat-tinh',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Lan Kế Toán',
        senderAvatar: '👩‍💻',
        time: '21:40',
        text: 'Trời ơi sao lại thế? Em vừa nhận tin báo két sắt phòng kế toán trên tầng 2 bị mở toang, 200 triệu tiền quỹ mất sạch rồi!',
        clue: 'mat-ket',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Quản Lý Đạt',
        senderAvatar: '👨‍💼',
        time: '21:42',
        text: 'Tôi đang ở nhà nghe tin mà giật mình! Có khi nào thằng Khải thông đồng với kẻ ngoài vào phá hoại toà nhà không? Lục soát balo của nó xem!',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Tư Bảo Vệ',
        senderAvatar: '👮',
        time: '21:43',
        text: 'Đúng thật anh Đạt ơi! Trong balo anh Khải có cái máy dò mã két sắt còn nhấp nháy đèn đây này!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra khu vực',
    preview: 'Vụ án có sự cấu kết chặt chẽ từ hai phía: nội bộ và hiện trường.',
    requires: ['mat-ket'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:45',
        text: 'Đây là vụ án có kế hoạch bài bản. Kẻ mở két sắt bắt buộc phải biết mã số mới đổi, còn kẻ ngắt điện tầng hầm phải nắm chìa khóa tủ điện cơ học.',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:50',
        text: 'Hãy kiểm tra nhật ký BMS toà nhà: hệ thống họng rác thông tầng và cảm biến tủ điện sẽ cho biết chính xác phương thức tẩu tán tài sản.',
        requires: ['mat-dien'],
      },
      {
        id: 't3',
        from: 'them',
        time: '22:00',
        text: 'Hồ sơ có mã khoá an ninh 4 số. Hãy tìm mã số 4 chữ số trên biên bản bàn giao phòng BQL chiều 20/10.',
        requires: ['hong-rac-bms'],
      },
    ],
  },
  {
    id: 'dat',
    name: 'Quản Lý Đạt',
    avatar: '👨‍💼',
    sub: 'Đang online',
    preview: 'Tôi giao toàn quyền cho bảo vệ và kỹ thuật mà…',
    requires: ['mat-ket'],
    messages: [
      { id: 'd1', from: 'them', time: '21:52', text: 'Tôi là trưởng ban quản lý nhưng tối nay tôi về nhà sớm với vợ con, sự việc xảy ra ở toà nhà tôi hoàn toàn bất ngờ!' },
      {
        id: 'd2',
        from: 'me',
        time: '21:53',
        text: 'Mã két sắt 2147 do chính anh ký đổi lúc 17h, và lúc 21h50 anh vừa chuyển đúng 200 triệu cho chủ nợ Bảy!',
        requires: ['lenh-chuyen-200tr'],
      },
      {
        id: 'd3',
        from: 'them',
        time: '21:54',
        text: 'Tiền đó... tiền đó là tiền tôi vay mượn người nhà để trả nợ chứ không liên quan gì đến quỹ toà nhà!',
        requires: ['lenh-chuyen-200tr'],
      },
    ],
  },
  {
    id: 'tu',
    name: 'Tư Bảo Vệ',
    avatar: '👮',
    sub: 'Đang trực',
    preview: 'Tôi chỉ đứng gác ở dốc hầm thôi…',
    requires: ['khai-bat-tinh'],
    messages: [
      { id: 'u1', from: 'them', time: '21:55', text: 'Tôi chỉ làm nhiệm vụ trông xe, thấy mất điện thì xuống xem chứ không biết gì về két sắt!' },
      {
        id: 'u2',
        from: 'me',
        time: '21:56',
        text: 'Chìa khóa tủ điện hầm B1 chỉ có duy nhất anh nắm giữ. Cầu dao bị gạt tay lúc 21h10 và xe máy của anh đỗ chắn cửa hầm làm nhiệm vụ cảnh giới!',
        requires: ['tu-tat-dien'],
      },
      {
        id: 'u3',
        from: 'them',
        time: '21:57',
        text: '...Tôi... tôi chỉ làm theo chỉ đạo thôi mà... Xin anh chị cứu tôi!',
        requires: ['tu-tat-dien'],
      },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'LC-401', time: '17:32', pickup: 'Nhà thuốc Long Châu', drop: 'Găng tay cao su y tế', fee: '110.000đ', status: 'Hoàn tất (Đạt)', clue: 'gang-tay-dat' },
  { id: 'TX-4011', time: '21:50', pickup: 'VietinBank Mobile', drop: 'Thanh toán nợ gốc', fee: '200.000.000đ', status: 'Thành công (Đạt -> Bảy)', clue: 'lenh-chuyen-200tr' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Hiện trường tủ điện hầm B1',
    time: '21:45',
    scene: 'street',
    caption: 'Tủ điện điều khiển hệ thống chiếu sáng và camera hầm B1.',
    clue: 'mat-dien',
    hotspots: [
      { x: 35, y: 40, label: 'Cần gạt Aptomat tổng', hint: 'Gạt xuống thủ công', clue: 'mat-dien', detail: 'Cần gạt Aptomat bị kéo xuống nấc OFF bằng tay có đeo găng tay cao su.' },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 't1',
    name: 'bien_ban_ban_giao_2147.pdf',
    kind: 'Tài liệu hành chính',
    preview: 'Biên bản số 2147/BB-BQL ngày 20/10…',
    detail: 'Biên bản số 2147 ngày 20/10 có chữ ký của Quản lý Đạt phê duyệt mã số vận hành an ninh mới của văn phòng ban quản lý.',
    clue: 'lan-xac-nhan',
  },
]
