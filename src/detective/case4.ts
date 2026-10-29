import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 04',
  title: 'Đêm mất điện ở chung cư 42',
  place: 'Chung cư cũ Hẻm 42 · tầng hầm',
  time: '21:40 · thứ Bảy 26/9',
  brief:
    'Mất điện toàn toà nhà, két sắt phòng quản lý bị mở sạch 200 triệu bằng mã số bí mật, kỹ thuật viên Khải bất tỉnh ở tầng hầm. Trong balo nạn nhân xuất hiện máy dò mã két sắt khiến ai cũng ngỡ anh là nội gián. Nhưng sự thật lại nằm ở bảng điều khiển BMS toà nhà và hiệu thuốc gần đó.',
  culprit: 'dat',
  accomplice: 'tu',
  difficulty: 'Siêu khó',
  question: 'Ai là kẻ chủ mưu mở két, và ai là đồng phạm tiếp tay tại tầng hầm?',
  solution:
    'Đạt (quản lý) là kẻ chủ mưu vì nợ cờ bạc 250 triệu đến hạn bị Bảy siết nợ. Đạt đổi mã két thành 2147 lúc 17:00, mua thuốc ngủ liều cao tại Nhà thuốc Long Châu (nhathuoc-longchau42.vn), rồi thông đồng với Tư (bảo vệ) tắt camera từ 21:08 và gạt aptomat tủ điện tầng hầm lúc 21:10 (ghi nhận trên hệ thống BMS bms-building.vn). Khải đi kiểm tra phát hiện Đạt nên bị Đạt đánh ngất, rồi Đạt nhét máy dò mã vào balo Khải để vu oan. Đạt mở két lấy 200 triệu chuyển khoản cho Bảy lúc 21:50 trên VietinBank (vietinbank.vn), ném túi rác tang vật 8.2kg xuống họng rác lúc 21:30 bị camera và cảm biến BMS ghi lại.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-ket': {
    id: 'mat-ket',
    tag: 'photo',
    title: 'Két sắt mở toang, mất 200 triệu',
    detail: 'Két phòng quản lý mở toang không có dấu cạy phá, nhập đúng mã 4 số bí mật. Mất 200.000.000đ và cuốn sổ nợ màu nâu.',
  },
  'khai-bat-tinh': {
    id: 'khai-bat-tinh',
    tag: 'chat',
    title: 'Khải bất tỉnh ở tầng hầm',
    detail: 'Anh Khải — kỹ thuật viên — được tìm thấy bất tỉnh lúc 21:40, đầu va đập do bị đẩy ngã từ phía sau, trong balo bị nhét máy dò mã két để vu oan.',
  },
  'mat-dien': {
    id: 'mat-dien',
    tag: 'web',
    title: 'Cầu dao tổng bị ngắt tay lúc 21:10',
    detail: 'Hệ thống BMS toà nhà (bms-building.vn) ghi nhận: Aptomat tổng tầng hầm bị ngắt thủ công bằng tay lúc 21:10, không phải do chập điện tự nhiên!',
  },
  'camera-tat': {
    id: 'camera-tat',
    tag: 'chat',
    title: 'Camera tắt thủ công từ 21:08',
    detail: 'Camera hành lang bị tắt trước khi mất điện 2 phút bằng lệnh "manual off" từ tài khoản quản lý của Đạt.',
  },
  'tu-tat-dien': {
    id: 'tu-tat-dien',
    tag: 'chat',
    title: 'Tư giữ chìa tủ điện & canh cửa hầm',
    detail: 'Bảo vệ Tư cầm chìa tủ điện. Camera ngã tư (camera-phuong.gov.vn) ghi nhận xe máy của Tư đỗ chắn trước dốc hầm cảnh giới lúc 21:15.',
  },
  'tin-nhan-dat': {
    id: 'tin-nhan-dat',
    tag: 'web',
    title: 'Tin nhắn Đạt chỉ đạo Tư ngắt điện',
    detail: 'Khôi phục máy Tư: 19:30 Đạt nhắn "Tối nay cúp điện đúng 21h, camera để anh lo. Xong việc chia như đã bàn". Bằng chứng đồng phạm!',
  },
  'lan-xac-nhan': {
    id: 'lan-xac-nhan',
    tag: 'chat',
    title: 'Đạt đổi mã két thành 2147 chiều nay',
    detail: 'Lan kế toán khai: 17:00 chiều Đạt gọi điện bảo đổi mã két thành "2147" nói dối là ngày sinh con gái. Lan về nhà lúc 19:55 có đơn GiaoNhanh giao cơm lúc 20:10.',
  },
  'chuyen-khoan': {
    id: 'chuyen-khoan',
    tag: 'web',
    title: 'Lệnh chuyển khoản 200 triệu lúc 21:50',
    detail: 'Sao kê VietinBank (vietinbank.vn): 21:50 tài khoản toà nhà chuyển 200.000.000đ cho Nguyễn Văn Bảy để trả nợ cá nhân, người duyệt là Quản lý Đạt!',
  },
  'dat-mua-thuoc-me': {
    id: 'dat-mua-thuoc-me',
    tag: 'web',
    title: 'Đạt mua thuốc ngủ & găng tay đen lúc 17:30',
    detail: 'Biên lai LC-401 tại Nhà Thuốc Long Châu (nhathuoc-longchau42.vn): Đạt mua dung dịch an thần Diazepam liều cao và găng tay cao su đen lúc 17:30.',
  },
  'tui-den': {
    id: 'tui-den',
    tag: 'web',
    title: 'Vứt túi đen 8.2kg xuống họng rác lúc 21:30',
    detail: 'Cảm biến tải trọng BMS toà nhà và camera hẻm sau ghi nhận Đạt ném bọc rác đen 8.2kg chứa găng tay dính máu và sổ nợ bị xé vào họng xả rác lúc 21:30.',
  },
  'khai-ghi-am': {
    id: 'khai-ghi-am',
    tag: 'chat',
    title: 'Ghi âm 21:12 của Khải vạch mặt Đạt',
    detail: 'Điện thoại Khải ghi âm tự động: "Anh Đạt, sao anh ở đây..." rồi tiếng va đập mạnh và tiếng chìa khoá rơi. Khẳng định Đạt đã đánh ngất Khải!',
  },
  'ma-ket': {
    id: 'ma-ket',
    tag: 'chat',
    title: 'Mã số két sắt: 2147',
    detail: 'Mẩu giấy note trong túi rác và ghi chú của Khải: "2147" — mã số mở két sắt KS-42.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'dat',
    name: 'Quản Lý Đạt',
    role: 'Quản lý toà nhà chung cư',
    avatar: '👔',
    note: 'Khai ở nhà cả tối. Nợ Bảy 250 triệu đến hạn. Đổi mã két thành 2147 chiều nay.',
  },
  {
    id: 'tu',
    name: 'Tư Bảo Vệ',
    role: 'Bảo vệ ca đêm toà nhà',
    avatar: '👮',
    note: 'Giữ chìa tủ điện. Bị camera bắt gặp đỗ xe máy cảnh giới cửa hầm lúc 21:15.',
  },
  {
    id: 'khai',
    name: 'Khải Kỹ Thuật',
    role: 'Kỹ thuật viên toà nhà (Nạn nhân)',
    avatar: '🔧',
    note: 'Bất tỉnh ở hầm lúc 21:40. Trong balo bị kẻ gian nhét máy dò mã két để vu oan.',
  },
  {
    id: 'lan',
    name: 'Lan Kế Toán',
    role: 'Kế toán toà nhà',
    avatar: '💼',
    note: 'Nắm mã két gốc. Về nhà từ 19:55 có đơn ship cơm gà chứng minh alibi.',
  },
  {
    id: 'bay',
    name: 'Bảy Chủ Nợ',
    role: 'Chủ nợ của Đạt',
    avatar: '💰',
    note: 'Đến đòi nợ Đạt 250 triệu. Ngồi quán ốc đến 21:40, nhận chuyển khoản 200 triệu lúc 21:50.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group',
    name: 'Cư Dân Chung Cư 42',
    avatar: '🏢',
    isGroup: true,
    sub: '64 thành viên',
    preview: 'BQT: Két phòng quản lý bị mở mất 200 triệu!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Ban Quản Trị',
        senderAvatar: '🏢',
        time: '21:41',
        text: 'CẢ TOÀ NHÀ CHÚ Ý! Két sắt phòng quản lý vừa bị mở mất 200 triệu đồng! Anh Khải kỹ thuật viên bị đánh ngất nằm ở tầng hầm!',
        clue: 'mat-ket',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Tư Bảo Vệ',
        senderAvatar: '👮',
        time: '21:42',
        text: 'Tôi vừa khám balo thằng Khải thấy có máy dò mã số két sắt và vé máy bay! Chắc chắn thằng Khải định trộm két rồi trèo rác trốn, lúc mất điện bị vấp ngã đập đầu!',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Quản Lý Đạt',
        senderAvatar: '👔',
        time: '21:43',
        text: 'Thằng Khải làm ăn bất lương quá! Mọi người kiểm tra [🏢 Hệ Thống BMS](https://bms-building.vn) xem aptomat nhảy lúc nào! Tôi ở nhà suốt từ 20:30 không liên quan!',
        clue: 'mat-dien',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Lan Kế Toán',
        senderAvatar: '💼',
        time: '21:45',
        text: 'Khoan đã anh Đạt! Chiều nay 17:00 chính anh gọi điện bảo em đổi mã két thành 2147 cơ mà! Em về nhà từ 19:55 có đơn [⚡ GiaoNhanh](https://giaonhanh.vn) giao cơm lúc 20:10!',
        clue: 'lan-xac-nhan',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Ban Quản Trị',
        senderAvatar: '🏢',
        time: '21:46',
        text: 'Công an đã đến! Yêu cầu kiểm tra [🏢 BMS Toà Nhà](https://bms-building.vn), [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn), [📹 Camera Phường](https://camera-phuong.gov.vn) và [🏦 VietinBank](https://vietinbank.vn) để bắt kẻ gian!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội trọng án khu vực',
    preview: 'Vụ này hai lượt cáo buộc thôi. Cần chỉ đúng cả kẻ tiếp tay!',
    requires: ['mat-ket'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:50',
        text: 'Vụ này cực kỳ tinh vi! Kẻ chủ mưu đã dàn cảnh ném máy dò mã vào balo Khải để đổ tội cho nạn nhân!',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:52',
        text: 'Em mở [🏢 BMS Toà Nhà](https://bms-building.vn) xem cảm biến họng rác lúc 21:30 và lịch sử ngắt aptomat lúc 21:10.',
      },
      {
        id: 't3',
        from: 'them',
        time: '21:54',
        text: 'Kiểm tra [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) xem ai đã mua găng tay cao su đen và thuốc an thần chiều nay!',
      },
      {
        id: 't4',
        from: 'them',
        time: '21:56',
        text: 'Nghe file ghi âm trong máy Khải, nhập mã số 4 số (giờ hẹn 2147) để mở hồ sơ rồi chỉ đích danh KẺ CHỦ MƯU và KẺ TIẾP TAY!',
        requires: ['khai-ghi-am'],
      },
    ],
  },
  {
    id: 'khai',
    name: 'Khải (Điện thoại phục hồi)',
    avatar: '🔧',
    sub: 'Phục hồi dữ liệu',
    preview: 'Bản ghi âm 21:12 tự động.',
    requires: ['khai-bat-tinh'],
    messages: [
      {
        id: 'k1',
        from: 'them',
        time: '22:14',
        text: 'Phục hồi máy anh Khải: File ghi âm tự động lúc 21:12: "Anh Đạt, sao anh ở đây—" rồi tiếng hung khí đập mạnh, tiếng chìa rơi!',
        clue: 'khai-ghi-am',
      },
      {
        id: 'k2',
        from: 'them',
        time: '22:15',
        text: 'Trong ghi chú công việc: "21:47 — gặp a.Đạt ở hầm kiểm tra tủ điện và két". Mã két Đạt đổi là 2147!',
        clue: 'ma-ket',
      },
    ],
  },
  {
    id: 'dat',
    name: 'Quản Lý Đạt',
    avatar: '👔',
    sub: 'Hoạt động 1 phút trước',
    preview: 'Tôi không liên quan!',
    requires: ['mat-ket'],
    messages: [
      { id: 'd1', from: 'them', time: '21:58', text: 'Tôi ở nhà ngủ cả tối, các người đừng có nghe con Lan nói nhăng nói cuội!' },
      {
        id: 'd2',
        from: 'me',
        time: '21:59',
        text: 'Nhưng trên [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) anh mua thuốc ngủ và găng tay đen lúc 17:30, và lúc 21:50 anh vừa duyệt chuyển 200 triệu cho Bảy trên [🏦 VietinBank](https://vietinbank.vn)!',
        requires: ['chuyen-khoan'],
      },
      { id: 'd3', from: 'them', time: '22:00', text: '...Các người... không có bằng chứng tôi mở két!' },
      {
        id: 'd4',
        from: 'me',
        time: '22:01',
        text: 'Cảm biến họng rác [🏢 BMS](https://bms-building.vn) và [📹 Camera Phường](https://camera-phuong.gov.vn) ghi rõ anh ném bọc tang vật 8.2kg xuống họng rác lúc 21:30!',
        requires: ['tui-den'],
      },
    ],
  },
  {
    id: 'tu',
    name: 'Tư Bảo Vệ',
    avatar: '👮',
    sub: 'Hoạt động vừa xong',
    preview: 'Tôi chỉ làm theo lệnh anh Đạt...',
    requires: ['mat-dien'],
    messages: [
      {
        id: 'tu1',
        from: 'them',
        time: '22:03',
        text: 'Tôi chỉ làm theo chỉ đạo của quản lý Đạt thôi! 19:30 anh Đạt nhắn bảo tôi ngắt aptomat lúc 21:10 và đỗ xe canh cửa hầm, hứa xong việc chia tiền cho tôi!',
        clue: 'tin-nhan-dat',
      },
      { id: 'tu2', from: 'me', time: '22:04', text: 'Hành vi đồng phạm tắt điện và canh cửa hầm của anh đã cấu thành tội phạm.' },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'GD-4011', time: '21:50', pickup: 'Đạt → Bảy (trả nợ)', drop: '200.000.000đ', fee: 'VietinBank', status: 'Thành công', clue: 'chuyen-khoan' },
  { id: 'GN-55109', time: '20:10', pickup: 'Cơm gà → Nhà Lan Kế Toán', drop: 'Đội Cấn', fee: 'GiaoNhanh', status: 'Hoàn tất' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Két sắt phòng quản lý',
    time: '21:40',
    scene: 'street',
    img: 'detective/case4-ket-sat.jpg',
    caption: 'Cửa két mở toang không có vết cạy nạy.',
    clue: 'mat-ket',
  },
  {
    id: 'p2',
    title: 'Camera hẻm sau lúc 21:30',
    time: '21:30',
    scene: 'net',
    img: 'detective/case4-dat-tui-den.jpg',
    caption: 'Đạt vội vã ném túi nilông đen vào họng xả rác.',
    clue: 'tui-den',
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 'tr1',
    name: 'tui-den-tang-vat.jpg',
    kind: 'Vật chứng họng rác',
    preview: 'Túi nilông đen nặng 8.2kg',
    detail: 'Túi đen vớt từ họng rác: chứa đôi găng tay cao su dính bụi hầm, mẩu giấy ghi "2147" và cuốn sổ nợ 250 triệu của Đạt bị xé trang.',
    clue: 'tui-den',
  },
  {
    id: 'tr2',
    name: 'may-do-ma-balo-khai.jpg',
    kind: 'Bằng chứng ngụy tạo',
    preview: 'Máy dò mã két trong balo Khải',
    detail: 'Máy dò mã tần số két sắt do Đạt cố ý nhét vào balo Khải sau khi đánh ngất anh để vu oan.',
    clue: 'khai-bat-tinh',
  },
]
