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
    id: 'group_hoi_cho',
    name: 'Ban Tổ Chức Hội Chợ 42',
    avatar: '🏮',
    isGroup: true,
    sub: '12 thành viên',
    preview: 'Oanh: Mọi người ơi hòm công đức từ thiện bị mất sạch tiền rồi!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Oanh Trưởng Ban',
        senderAvatar: '🎤',
        time: '21:22',
        text: 'Cả nhà ơi khẩn cấp! Hòm công đức từ thiện đặt sau bệ đá chính điện vừa kiểm tra thì thấy 8 triệu đồng tiền mặt bị vét sạch không còn một đồng! Hòm khoá ngoài vẫn nguyên vẹn!',
        clue: 'mat-quy',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Chú Hùng (Bảo vệ)',
        senderAvatar: '🔦',
        time: '21:23',
        text: 'Lúc 20h55 bị chập cầu dao ngắt điện mất 15 phút, cả sân đình tối thui. Chắc chắn kẻ gian đã lợi dụng lúc mất điện để ra tay luồn ra phía sau bệ đá!',
        clue: 'cat-dien',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Trang Bán Bánh',
        senderAvatar: '🥖',
        time: '21:24',
        text: 'Em trông gian hàng bánh mì và đèn hoa sen khách đông nghẹt, lúc mất điện phải lo giữ đồ cho khách nên không để ý được bệ hòm quỹ phía sau! Mọi người xem trên [Facebúc Trang](https://facebuc.vn/trang.banhmi.que) khách chụp đông lắm!',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Khoa Tình Nguyện',
        senderAvatar: '🧤',
        time: '21:25',
        text: 'Em vừa ở phòng khám [Long Châu](https://nhathuoc-longchau42.vn) về, tay em bị bỏng nước sôi lúc 20h40 phải băng kín mít nãy giờ, có biên lai điện tử lưu rõ ràng!',
        clue: 'khoa-bi-thuong',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Oanh Trưởng Ban',
        senderAvatar: '🎤',
        time: '21:26',
        text: 'Ổ khóa không hề bị đập phá gì cả, chỉ có ai cạy chốt lẫy sau hoặc dùng chìa mới mở êm ru như thế được thôi! Chìa khoá lúc 20h30 em bàn giao cho Trang giữ mà!',
        clue: 'ket-cay',
      },
      {
        id: 'g6',
        from: 'them',
        senderName: 'Tú Xăm Trổ',
        senderAvatar: '🕶️',
        time: '21:27',
        text: 'Mọi người đừng có nhìn tôi với ánh mắt nghi ngờ nhé! Tôi ngồi uống nước chè chén ở quán đối diện cổng đình suốt từ 20h50 đến giờ, bà con quanh quán ai cũng thấy! Xem trên [Facebúc Tú](https://facebuc.vn/tu.taichinh.den) là rõ!',
        clue: 'tu-tai-chinh',
      },
      {
        id: 'g7',
        from: 'them',
        senderName: 'Chú Hùng (Bảo vệ)',
        senderAvatar: '🔦',
        time: '21:28',
        text: 'Camera an ninh cổng Tam Quan [Camera Phường](https://camera-phuong.gov.vn) CAM-302 soi rõ từng người đi qua bãi cỏ sau đình, công an đang trích xuất dữ liệu rồi!',
      },
      {
        id: 'g8',
        from: 'them',
        senderName: 'Oanh Trưởng Ban',
        senderAvatar: '🎤',
        time: '21:29',
        text: 'Em vừa tra soát sao kê tài khoản quỹ trên [VietinBank](https://vietinbank.vn), tiền mặt bị cuỗm đi thế này chỉ có đem ra cây ATM ngã tư nạp tài khoản mới chuyển tẩu tán đi được!',
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
        text: 'Hòm quỹ được mở từ phía sau bệ đá trong khoảng thời gian mất điện 20:55 - 21:10. Bãi đất sau bệ vừa mới xới rất nhão bùn đỏ, kẻ tiếp cận chắc chắn để lại dấu vết bùn đất.',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:35',
        text: 'Số tiền mặt 8 triệu đồng bị cuỗm đi gồm nhiều tờ tiền lẻ và có tờ bị rách góc niêm phong. Hãy kiểm tra máy chủ sao kê ATM [VietinBank](https://vietinbank.vn) giao dịch TX-99812: nhập số tiền thiếu hụt để đối soát.',
        requires: ['ket-cay'],
      },
      {
        id: 't3',
        from: 'them',
        time: '21:40',
        text: 'Hãy đối chiếu giữa alibi của Tú tại quán nước với camera an ninh đường phố CAM-301 và thời điểm thực hiện giao dịch nạp tiền tại cây ATM.',
        requires: ['chuyen-tien-trang'],
      },
    ],
  },
  {
    id: 'tu',
    name: 'Tú Xăm Trổ',
    avatar: '🕶️',
    sub: 'Hoạt động 2 phút trước',
    preview: 'Tôi ngồi uống nước chè đàng hoàng mà các người…',
    requires: ['tu-tai-chinh'],
    messages: [
      { id: 'tu1', from: 'them', time: '21:35', text: 'Này điều tra viên, tôi có tiếng trong khu nhưng không bao giờ thèm động vào tiền công đức của chùa đâu nhé!' },
      {
        id: 'tu2',
        from: 'me',
        time: '21:36',
        text: 'Camera CAM-301 ghi nhận lúc 20h42 anh rời khỏi quán nước chè, đi vòng ra ngõ sau và ghé cây ATM VietinBank ngã tư. Anh giải thích sao về giao dịch nạp 8 triệu tiền mặt?',
        requires: ['chuyen-tien-trang'],
      },
      {
        id: 'tu3',
        from: 'them',
        time: '21:37',
        text: 'Tiền đó là... tiền tôi thu họ của khách nợ trả lúc chiều, tôi nạp vào tài khoản để trả nợ cá nhân thôi!',
        requires: ['chuyen-tien-trang'],
      },
      {
        id: 'tu4',
        from: 'me',
        time: '21:38',
        text: 'Nhưng trong 8 triệu nạp vào ATM có 3 tờ tiền polyme 500k bị rách góc dán băng dính trong suốt, trùng khớp 100% với serial tiền bà con cúng dường được ban kiểm ngân ghi chép lúc chiều!',
        requires: ['chuyen-tien-trang'],
      },
      {
        id: 'tu5',
        from: 'them',
        time: '21:39',
        text: '...Thôi xong rồi... Tôi tưởng trời tối mất điện không ai nhìn thấy... Tôi lỡ dại thò tay cạy lẫy phía sau bệ đá...',
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
        text: 'Camera cổng đình ghi nhận lúc 21h02 viền giày của chị dính chút bùn đỏ. Chị giải thích sao?',
        requires: ['trang-giay'],
      },
      {
        id: 'tr3',
        from: 'them',
        time: '21:37',
        text: 'Dạ lúc mất điện em phải chạy ra lối phụ mượn cây đèn sạc của ban hậu cần nên dẫm phải bồn hoa mới trồng cây! Em đứng bán bánh mì và hoa đăng suốt, không hề động vào hòm tiền đâu ạ!',
        clue: 'trang-giay',
      },
    ],
  },
  {
    id: 'khoa',
    name: 'Khoa Tình Nguyện',
    avatar: '🧤',
    sub: 'Hoạt động 5 phút trước',
    preview: 'Em bị bỏng nước sôi phải đi sơ cứu từ 20h42…',
    requires: ['mat-quy'],
    messages: [
      { id: 'k1', from: 'them', time: '21:38', text: 'Lúc 20h40 em phụ khiêng nồi chè sen thì trượt chân bị nước sôi bắn vào cổ tay bỏng rát, phải chạy vội ra nhà thuốc [Long Châu](https://nhathuoc-longchau42.vn) ngã ba sơ cứu!' },
      { id: 'k2', from: 'them', time: '21:39', text: 'Bác sĩ ở nhà thuốc băng bó và kê đơn thuốc bỏng cho em từ 20h42 đến tận 21h20 mới xong, đơn thuốc điện tử lưu đầy đủ trên máy chủ phòng khám đấy ạ!', clue: 'khoa-bi-thuong' },
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
