import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 03',
  title: 'Chiếc hòm quỹ đêm hội chợ',
  place: 'Hội chợ Trung thu · Sân đình Hẻm 42',
  time: '21:20 · thứ Bảy 26/9',
  brief:
    'Hòm quỹ từ thiện mất đúng 8 triệu đồng tiền mặt trong 15 phút mất điện đột ngột lúc 20:55 - 21:10. Ổ khóa mở từ phía sau bệ đá. Dấu vết bùn đỏ đất sét và biến động dòng tiền ngân hàng là mấu chốt để bóc trần kẻ gian.',
  culprit: 'trang',
  difficulty: 'Khó',
  question: 'Ai đã lấy 8 triệu từ hòm quỹ từ thiện?',
  solution:
    'Trang (thủ quỹ nhận chìa từ Oanh lúc 20:30) đã lợi dụng lúc mất điện 20:55–21:10 lẻn ra sau bệ đá mở hòm lấy trọn 8 triệu đồng tiền mặt rồi chạy tắt qua bãi đất trũng sau đình. Bùn đỏ đất sét ở bãi trũng bám chặt vào viền giày của Trang lúc chạy qua camera cổng lúc 21:02. Ngay sau đó lúc 21:32, Trang đến quầy đại lý di động nộp tiền mặt vào VietinBank để chuyển trả 8 triệu tiền nợ tín dụng. Tú có chứng cứ ngoại phạm khi camera quán trà Phúc chứng minh anh ngồi liên tục từ 20:55 đến 21:25. Khoa bị bỏng nước sôi bàn tay phải băng bó tại Long Châu từ 20:42 không thể thao tác mở hòm.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-quy': {
    id: 'mat-quy',
    tag: 'chat',
    title: 'Mất 8 triệu đồng tiền quỹ từ thiện lúc 21:20',
    detail:
      'Ban tổ chức kiểm đếm lúc 21:20 phát hiện hòm gỗ lim bị mở, thiếu đúng 8.000.000 VNĐ tiền mặt thu được trong ngày.',
  },
  'cat-dien': {
    id: 'cat-dien',
    tag: 'chat',
    title: 'Mất điện toàn sân đình từ 20:55 đến 21:10',
    detail:
      'Aptomat nhánh cung cấp điện cho sân đình bị ngắt trong 15 phút, đèn cao áp và hệ thống camera sảnh chính tắt hoàn toàn.',
  },
  'khoa-gan-hom': {
    id: 'khoa-gan-hom',
    tag: 'photo',
    title: 'Khoa cúi nhặt đồ cạnh bệ hòm lúc 20:48',
    detail:
      'Camera an ninh ghi nhận Khoa cúi xuống cạnh bệ hòm lúc 20:48 để nhặt tấm áp-phích chương trình bị gió quạt thổi bay.',
  },
  'khoa-bi-thuong': {
    id: 'khoa-bi-thuong',
    tag: 'web',
    title: 'Biên lai sơ cứu bỏng tay của Khoa lúc 20:42',
    detail:
      'Hoá đơn LC-301 tại Nhà Thuốc Long Châu: Khoa bị bỏng nước sôi mu bàn tay phải lúc 20:40 và được băng bó cố định đến 21:20, không thể cầm mở khoá sắt.',
  },
  'ket-cay': {
    id: 'ket-cay',
    tag: 'photo',
    title: 'Ổ khoá hòm quỹ mở từ phía sau bệ đá',
    detail:
      'Càng khoá bấm không hề bị cưa cắt mà được tra chìa mở bình thường từ vị trí đứng khuất phía sau bệ đá.',
  },
  'chia-ket': {
    id: 'chia-ket',
    tag: 'chat',
    title: 'Oanh bàn giao chìa khoá cho Trang lúc 20:30',
    detail:
      'Oanh giữ chìa khoá hòm quỹ nhưng lúc 20:30 phải lên sân khấu điều phối chương trình văn nghệ nên đã giao chìa cho Trang quản lý.',
  },
  'trang-giay': {
    id: 'trang-giay',
    tag: 'photo',
    title: 'Vết bùn đỏ trên giày của Trang lúc 21:02',
    detail:
      'Camera cổng Tam Quan ghi nhận Trang di chuyển lúc 21:02 với viền giày dính đầy bùn đỏ đất sét. Đất sét đỏ này chỉ có duy nhất ở khoảnh bãi trũng mới đào sau bệ hòm quỹ.',
  },
  'chuyen-tien-trang': {
    id: 'chuyen-tien-trang',
    tag: 'web',
    title: 'Giao dịch nộp tiền mặt 8 triệu của Trang lúc 21:32',
    detail:
      'Sao kê VietinBank: 21:32:15 Trang nộp 8.000.000 VNĐ tiền mặt tại điểm giao dịch di động và chuyển khoản ngay để thanh toán dứt điểm khoản nợ cá nhân.',
  },
  'tu-tai-chinh': {
    id: 'tu-tai-chinh',
    tag: 'chat',
    title: 'Tú ngồi uống trà đá đối diện sân đình',
    detail:
      'Tú khai ngồi tại quán trà Phúc đối diện cổng đình từ chập tối để theo dõi chương trình và hẹn gặp bạn bè.',
  },
  'tu-camera-alibi': {
    id: 'tu-camera-alibi',
    tag: 'web',
    title: 'Camera quán trà xác nhận Tú ngồi liên tục 20:55–21:25',
    detail:
      'Camera CAM-301 của quán trà Phúc ghi nhận Tú ngồi liên tục tại bàn ngoài hiên từ 20:55 đến 21:25 không hề rời đi.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'trang',
    name: 'Trang Bán Bánh',
    role: 'Thủ quỹ kiêm gian hàng ẩm thực',
    avatar: '🥖',
    note: 'Được giao quản lý chìa khóa hòm quỹ từ 20:30. Khai rằng bận rộn nướng bánh tại quầy suốt thời gian hội chợ.',
  },
  {
    id: 'tu',
    name: 'Tú Tài Chính',
    role: 'Nhân viên giám sát gây quỹ',
    avatar: '💼',
    note: 'Có mặt tại hội chợ để theo dõi hoạt động quyên góp. Khai rằng ngồi uống nước ở quán trà đối diện cổng đình.',
  },
  {
    id: 'khoa',
    name: 'Khoa Tình Nguyện',
    role: 'Tình nguyện viên đoàn thanh niên',
    avatar: '🧤',
    note: 'Hỗ trợ công tác hậu cần và nước nôi. Tay phải bị quấn băng trắng do sơ suất bị bỏng nước sôi.',
  },
  {
    id: 'oanh',
    name: 'Oanh Trưởng Ban',
    role: 'Phó ban tổ chức hội chợ',
    avatar: '🎤',
    note: 'Người giữ chìa khóa hòm ban đầu, giao lại chìa cho Trang lúc 20:30 để lên sân khấu điều phối văn nghệ.',
  },
  {
    id: 'hung',
    name: 'Chú Hùng',
    role: 'Bảo vệ dân phòng tuần tra',
    avatar: '🔦',
    note: 'Phụ trách đèn chiếu sáng và an ninh khu vực sân đình. Là người phát hiện ra sự cố sập cầu dao lúc 20:55.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group_hoicho',
    name: 'Ban Tổ Chức Hội Chợ 42',
    avatar: '🏮',
    isGroup: true,
    sub: '10 thành viên',
    preview: 'Oanh: Mọi người ơi hòm tiền quỹ bị mở toang rồi!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Oanh Trưởng Ban',
        senderAvatar: '🎤',
        time: '21:22',
        text: 'Cả nhà ơi khẩn cấp! Chương trình vừa bế mạc em ra bệ đá mở hòm kiểm đếm thì toàn bộ 8 triệu đồng tiền từ thiện đã biến mất!',
        clue: 'mat-quy',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Chú Hùng (Bảo vệ)',
        senderAvatar: '🔦',
        time: '21:23',
        text: 'Lúc 20h55 bị chập cầu dao ngắt điện mất 15 phút, cả sân đình tối thui. Chắc chắn kẻ gian đã lợi dụng lúc đó để ra tay!',
        clue: 'cat-dien',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Trang Bán Bánh',
        senderAvatar: '🥖',
        time: '21:24',
        text: 'Em trông gian hàng bánh mì khách đông nghẹt, lúc mất điện phải lo giữ đồ cho khách nên không để ý được bệ hòm quỹ phía sau!',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Khoa Tình Nguyện',
        senderAvatar: '🧤',
        time: '21:25',
        text: 'Em vừa ở phòng khám Long Châu về, tay em bị bỏng nước sôi lúc 20h40 phải băng kín mít nãy giờ!',
        clue: 'khoa-bi-thuong',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Oanh Trưởng Ban',
        senderAvatar: '🎤',
        time: '21:26',
        text: 'Ổ khóa không hề bị đập phá gì cả, chỉ có ai cầm chìa mới mở êm ru như thế được thôi!',
        clue: 'ket-cay',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra khu vực',
    preview: 'Xem xét dấu vết địa hình và dòng luân chuyển tài chính.',
    requires: ['mat-quy'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:30',
        text: 'Hòm quỹ được mở bằng chìa cơ học trong khoảng thời gian mất điện 20:55 - 21:10. Hãy xem ai là người giữ chìa khóa trong khoảng thời gian này.',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:35',
        text: 'Bãi đất trũng phía sau bệ hòm vừa mới được xới để trồng cây nên rất nhão bùn đỏ. Bất kỳ ai đi qua đó đều sẽ dính dấu vết bùn đất đặc trưng.',
        requires: ['ket-cay'],
      },
      {
        id: 't3',
        from: 'them',
        time: '21:40',
        text: 'Số tiền 8 triệu đồng tiền mặt bị lấy đi sẽ rất khó giữ trong người lâu. Hãy kiểm tra các giao dịch tài chính hoặc điểm nạp tiền gần nhất.',
        requires: ['chuyen-tien-trang'],
      },
    ],
  },
  {
    id: 'trang',
    name: 'Trang Bán Bánh',
    avatar: '🥖',
    sub: 'Đang online',
    preview: 'Chìa khóa em vẫn cất trong túi tạp dề mà…',
    requires: ['mat-quy'],
    messages: [
      { id: 'tr1', from: 'them', time: '21:35', text: 'Chị Oanh đưa chìa khóa cho em lúc 20h30, em cất kỹ trong túi tạp dề không đưa cho ai cả!' },
      {
        id: 'tr2',
        from: 'me',
        time: '21:36',
        text: 'Camera cổng đình ghi nhận lúc 21h02 viền giày của chị dính đầy bùn đỏ đất sét ở bãi sau bệ hòm quỹ. Chị giải thích sao?',
        requires: ['trang-giay'],
      },
      {
        id: 'tr3',
        from: 'them',
        time: '21:37',
        text: 'À... lúc đó em chạy đi tìm công tắc đèn pin nên vô tình bước nhầm vào bãi đất thôi chứ em không có mở hòm!',
        requires: ['trang-giay'],
      },
      {
        id: 'tr4',
        from: 'me',
        time: '21:38',
        text: 'Lúc 21h32 chị vừa nộp đúng 8 triệu tiền mặt vào ngân hàng để thanh toán khoản nợ tín dụng đến hạn!',
        requires: ['chuyen-tien-trang'],
      },
      {
        id: 'tr5',
        from: 'them',
        time: '21:39',
        text: '...Đó là tiền em dành dụm từ buôn bán... Mọi người không có quyền lục soát tài khoản của em!',
        requires: ['chuyen-tien-trang'],
      },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'LC-301', time: '20:42', pickup: 'Nhà thuốc Long Châu', drop: 'Sơ cứu bỏng mu bàn tay', fee: '85.000đ', status: 'Hoàn tất (Khoa)', clue: 'khoa-bi-thuong' },
  { id: 'TX-99812', time: '21:32', pickup: 'Quầy VietinBank di động', drop: 'Thanh toán nợ tín dụng', fee: '8.000.000đ', status: 'Thành công (Trang)', clue: 'chuyen-tien-trang' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Bệ đá đặt hòm quỹ sau sân đình',
    time: '21:25',
    scene: 'street',
    caption: 'Hiện trường bệ đá và hòm quỹ từ thiện bằng gỗ lim.',
    clue: 'ket-cay',
    hotspots: [
      { x: 45, y: 50, label: 'Ổ khóa hòm', hint: 'Tra chìa phía sau', clue: 'ket-cay', detail: 'Ổ khóa mở nguyên vẹn từ phía sau bệ đá, không có vết cưa cắt cơ học.' },
      { x: 80, y: 70, label: 'Khoảnh đất bùn đỏ', hint: 'Bãi đất trũng sau bệ', clue: 'trang-giay', detail: 'Khoảnh đất bùn đỏ đất sét in hằn dấu giày thể thao hướng ra cổng phụ.' },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 't1',
    name: 'bien_lai_rut_tien_atm.png',
    kind: 'Biên lai ATM',
    preview: 'Biên lai rút 8.000.000đ cây ATM phố Hàng Chai…',
    detail: 'Biên lai rút tiền tại cây ATM VietinBank lúc 20:30 của Vũ Anh Tú (Tú Tài Chính) chứng minh nguồn gốc số tiền mặt trong người Tú.',
    clue: 'tu-camera-alibi',
  },
]
