import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 02',
  title: 'Chiếc điện thoại trong tủ đồ',
  place: 'Sân cầu lông Hẻm 42',
  time: '20:35 · thứ Bảy 19/9',
  brief:
    'Chiếc iPhone 14 Pro Max của chị Hạnh để trong tủ đồ số 04 biến mất chỉ sau 15 phút khởi động. Ổ khóa cơ vẫn nguyên vẹn. Một tin đăng bán máy xuất hiện trên Chợ Tốt ghi số điện thoại của khách chơi nhằm đánh lạc hướng.',
  culprit: 'son',
  difficulty: 'Trung bình',
  question: 'Ai đã lấy chiếc điện thoại trong tủ đồ của chị Hạnh?',
  solution:
    'Sơn (nhân viên nhặt cầu đang nợ 6 triệu tiền sân) đã lách bàn tay qua khe hở tôn nóc tủ số 04 bị mọt đinh tán phía sau để rút chiếc iPhone lúc 20:25, khiến mép tôn cứa rách tay chảy máu. Sau đó Sơn đăng tin bán máy lên Chợ Tốt qua Wi-Fi bãi xe và điền số điện thoại của Hào để gài bẫy vu khống. Hào có chứng cứ ngoại phạm vững chắc khi thi đấu set 3 trên sân 2 từ 20:30 đến 21:00 có camera ghi nhận. Vết xước kim loại trên tay Sơn và bóng người cúi sau vách tôn trong ảnh story là bằng chứng then chốt.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-dt': {
    id: 'mat-dt',
    tag: 'chat',
    title: 'Mất điện thoại trong tủ số 04 lúc 20:35',
    detail:
      'Chị Hạnh cất điện thoại trong ngăn tủ số 04 lúc 20:20 rồi ra sân khởi động. Đến 20:35 quay lại mở tủ thì máy biến mất dù ổ khóa vẫn bấm kín.',
  },
  'lo-hong-tu': {
    id: 'lo-hong-tu',
    tag: 'photo',
    title: 'Khe hở tôn nóc tủ số 04',
    detail:
      'Đinh tán phía sau nóc tủ số 04 bị mục gỉ, tạo một khe hở rộng hơn 4cm. Bàn tay thon có thể luồn từ phía sau vách để móc đồ bên trong mà không cần mở ổ khóa.',
  },
  'tin-nhan-ban': {
    id: 'tin-nhan-ban',
    tag: 'web',
    title: 'Tin đăng Chợ Tốt CT-201: Rao bán iPhone 14 Pro Max ghi SĐT của Hào Smash',
    detail:
      'Tin CT-201 trên Chợ Tốt đăng lúc 20:44 bán chiếc iPhone trùng số Serial máy chị Hạnh. Địa chỉ IP đăng tin trùng khớp với Wi-Fi bãi xe sân cầu lông, người đăng cố tình điền số điện thoại của Hào.',
  },
  'hao-gan-tu': {
    id: 'hao-gan-tu',
    tag: 'chat',
    title: 'Hào lấy vợt ở tủ số 07 lúc 20:28',
    detail:
      'Hào đứng trước dãy tủ lúc 20:28 lấy vợt ở ngăn số 07 của mình rồi ra sân ngay. Bàn tay to thô của Hào không thể luồn lọt khe tôn hẹp 4cm.',
  },
  'hao-o-san-2': {
    id: 'hao-o-san-2',
    tag: 'web',
    title: 'Hào thi đấu trên sân 2 từ 20:30 đến 21:00',
    detail:
      'Camera sân số 2 ghi nhận Hào liên tục thi đấu set 3 trận đôi nam từ 20:30 đến 21:00 trước sự chứng kiến của trọng tài bàn và hơn 10 khán giả.',
  },
  'chuyen-khoan-linh': {
    id: 'chuyen-khoan-linh',
    tag: 'web',
    title: 'Linh chuyển khoản tiền đóng học phí lúc 20:41',
    detail:
      'Sao kê tài khoản VietinBank: 20:41 Linh chuyển 2.000.000 VNĐ tiền học phí đại học từ tiền lương tích lũy trong tài khoản cá nhân, không liên quan vụ trộm.',
  },
  'linh-goi-dien': {
    id: 'linh-goi-dien',
    tag: 'photo',
    title: 'Linh nghe điện thoại tại quầy từ 20:30 đến 20:45',
    detail:
      'Camera quầy nước ghi nhận Linh liên tục ngồi tại chỗ nghe điện thoại gia đình từ 20:30 đến 20:45, một tay cầm cốc rót nước, không hề rời khỏi quầy.',
  },
  'son-vet-xuoc': {
    id: 'son-vet-xuoc',
    tag: 'photo',
    title: 'Vết trầy xước kim loại trên cổ tay Sơn & áo khoác đỏ bỏ lại',
    detail:
      'Cổ tay phải của Sơn có một vết cứa sâu rớm máu dán băng dính y tế. Sơn nói dối bị quẹt vào lưới cầu lông, nhưng lưới dù mềm không thể gây vết cắt kim loại sắc nhọn.',
  },
  'son-no-tien': {
    id: 'son-no-tien',
    tag: 'chat',
    title: 'Sơn bị hối thúc khoản nợ 6 triệu',
    detail:
      'Tin nhắn đòi nợ: Sơn nợ tiền thuê sân và tiền vợt 6 triệu đã quá hạn 2 tuần, bị chủ sân cảnh báo sẽ báo công an nếu không thanh toán trong ngày.',
  },
  'anh-story': {
    id: 'anh-story',
    tag: 'photo',
    title: 'Hình ảnh Story quầy nước: Bóng người phía sau vách tôn tủ đồ lúc 20:29',
    detail:
      'Ảnh story của Linh đăng lúc 20:29: Mặt kính phản chiếu phía sau vách tôn dãy tủ có một bóng người đang cúi rạp người thò tay vào ngách.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'son',
    name: 'Sơn Nhặt Cầu',
    role: 'Nhân viên nhặt cầu · Quản lý tủ',
    avatar: '🧥',
    note: 'Có chứng cứ ngoại phạm vững chắc: Camera toàn cảnh sân số 2 ghi nhận một người mặc áo khoác nỉ thể thao màu đỏ số 09 đặc trưng của Sơn ngồi tại khu vực kỹ thuật sân 3 trong suốt hiệp đấu 20:30 - 21:00.',
  },
  {
    id: 'hao',
    name: 'Hào Smash',
    role: 'Khách chơi phong trào',
    avatar: '🏸',
    note: 'Mở tủ đồ số 07 ngay cạnh tủ số 04 lúc 20:28 với thái độ cáu kỉnh sau set 1, số điện thoại của Hào xuất hiện trong tin rao bán iPhone trên Chợ Tốt.',
  },
  {
    id: 'linh',
    name: 'Linh Quầy Nước',
    role: 'Nhân viên quầy giải khát',
    avatar: '🥤',
    note: 'Giữ chìa khóa vạn năng dãy tủ đồ, có biến động chuyển khoản ngân hàng lúc 20:41 và bị tố giác nợ tiền học phí cần đóng gấp.',
  },
  {
    id: 'mai',
    name: 'Bà Mai',
    role: 'Lao công sân tập',
    avatar: '🧹',
    note: 'Phụ trách quét dọn khu vực sân thi đấu và phòng thay đồ cuối ca.',
  },
  {
    id: 'quan_hlv',
    name: 'Quân Huấn Luyện Viên',
    role: 'HLV dạy kèm riêng · Sân 1-2',
    avatar: '💪',
    note: 'Thường xuyên mượn chùm chìa khoá dự phòng tủ đồ để cất bao vợt chuyên nghiệp. Khai rằng đang bấm giờ cho học viên ở sân 1.',
  },
  {
    id: 'hanh',
    name: 'Chị Hạnh',
    role: 'Nạn nhân bị mất tài sản',
    avatar: '👩',
    note: 'Chủ sở hữu chiếc iPhone 14 Pro Max cất trong ngăn tủ đồ số 04 lúc 20:20.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group_san',
    name: 'CLB Cầu Lông Hẻm 42',
    avatar: '🏸',
    isGroup: true,
    sub: '15 thành viên',
    preview: 'Chị Hạnh: Mọi người ơi tủ số 4 bị mất điện thoại rồi!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Chị Hạnh',
        senderAvatar: '👩',
        time: '20:38',
        text: 'Cả nhà ơi có ai cầm nhầm điện thoại của em không? Em cất iPhone 14 Pro Max tím trong tủ số 04 lúc 20h20, khóa cẩn thận mà giờ mở ra không thấy đâu!',
        clue: 'mat-dt',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Sơn Nhặt Cầu',
        senderAvatar: '🧥',
        time: '20:39',
        text: 'Tôi biết ngay ai lấy rồi! Anh Hào Smash chứ ai! Lúc 20h28 tôi thấy anh Hào quanh quẩn ở dãy tủ hồi lâu, vừa mở tủ vừa nhìn ngó khả nghi lắm! Số điện thoại của ảnh còn hiện trên tin [Chợ Tốt](https://chotot.vn) CT-201 bán iPhone kìa!',
        clue: 'hao-gan-tu',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Hào Smash',
        senderAvatar: '🏸',
        time: '20:40',
        text: 'Sơn mày ăn nói xằng bậy ngậm máu phun người! Tao ra mở tủ 07 lấy vợt dự phòng rồi vào sân số 2 đánh set 3 suốt từ 20h30 đến 21h00 cả sân ai cũng thấy! Tao còn đăng bài trên [Facebúc Hào](https://facebuc.vn/hao.smash.power) kìa!',
        clue: 'hao-o-san-2',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Hào Smash',
        senderAvatar: '🏸',
        time: '20:41',
        text: 'Cô Linh quầy nước giữ chìa khoá dự phòng kìa, lúc nãy cô ấy vừa bấm điện thoại thao tác ngân hàng [VietinBank](https://vietinbank.vn) chuyển 2 triệu gì đấy!',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Linh Quầy Nước',
        senderAvatar: '🥤',
        time: '20:42',
        text: 'Anh Hào đừng có vu vạ! Chùm chìa khóa tổng sơ cua vẫn treo nguyên ở quầy nước em trông nãy giờ! Lúc 20h30 đến 20h45 em ngồi nghe điện thoại của mẹ ở quê gọi lên hỏi thăm, camera quầy nước ghi hình rõ ràng!',
        clue: 'linh-goi-dien',
      },
      {
        id: 'g6',
        from: 'them',
        senderName: 'Bà Mai (Lao công)',
        senderAvatar: '🧹',
        time: '20:43',
        text: 'Mọi người lại đây xem này... Tấm tôn nóc tủ số 04 phía sau bị bung đinh gỉ bật hẳn lên một khoảng tướng kìa!',
        clue: 'lo-hong-tu',
      },
      {
        id: 'g7',
        from: 'them',
        senderName: 'Hào Smash',
        senderAvatar: '🏸',
        time: '20:44',
        text: 'Camera bãi xe với sân 2 nối thẳng lên cổng [Camera Phường](https://camera-phuong.gov.vn) CAM-201 với CAM-202 đấy, trích xuất camera là biết tao đánh trên sân hay đi trộm liền!',
      },
      {
        id: 'g8',
        from: 'them',
        senderName: 'Sơn Nhặt Cầu',
        senderAvatar: '🧥',
        time: '20:45',
        text: 'Em nhặt cầu cả tối mệt đứt hơi, tay bị quẹt trầy da chảy máu đây này, chắc do anh Hào đánh cầu bay trúng làm em xước tay!',
        clue: 'son-vet-xuoc',
      },
      {
        id: 'g9',
        from: 'them',
        senderName: 'Chị Hạnh',
        senderAvatar: '👩',
        time: '20:46',
        text: 'Sơn ơi, khoản nợ 6 triệu tiền sân quá hạn 2 tuần nay em chưa trả đấy nhé! Chị nhắc bao nhiêu lần trên [Facebúc Sơn](https://facebuc.vn/son.badminton68) rồi!',
        clue: 'son-no-tien',
      },
      {
        id: 'g10',
        from: 'them',
        senderName: 'Quân Huấn Luyện Viên',
        senderAvatar: '💪',
        time: '20:47',
        text: 'Lúc 20h25 tôi vào phòng thay đồ lấy chai nước khoáng, thấy thằng Sơn cứ thập thò lấm lét sau lưng vách ngăn dãy tủ! Lúc tôi hỏi thì nó giật bắn mình giấu vội hai tay sau lưng!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra khu vực',
    preview: 'Xem xét kỹ cơ chế tiếp cận tài sản và chứng cứ ngoại phạm.',
    requires: ['mat-dt'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '20:45',
        text: 'Tủ cá nhân vẫn còn nguyên ổ khóa đóng chứng tỏ kẻ gian không dùng chìa hay cạy khóa cửa trước. Đừng vội tin lời vu cáo đổ lỗi cho Hào hay Linh. Em hãy tập trung vào kết cấu khe hở phía sau dãy tủ.',
      },
      {
        id: 't2',
        from: 'them',
        time: '20:46',
        text: 'Các kênh rao vặt trực tuyến và diễn đàn mua bán thiết bị quanh khu vực là nơi kẻ gian thường tìm cách tẩu tán tang vật nhanh chóng. Hãy chú ý rà soát các bài đăng mới nhất.',
        requires: ['lo-hong-tu'],
      },
      {
        id: 't3',
        from: 'them',
        time: '20:55',
        text: 'Mép tôn gỉ sét bị bung rất sắc bén. Kẻ luồn tay qua khe hẹp chắc chắn sẽ để lại dấu vết tổn thương trên cơ thể. Hãy đối chiếu vết thương với mẫu máu lưu lại.',
        requires: ['son-vet-xuoc'],
      },
    ],
  },
  {
    id: 'hao',
    name: 'Hào Smash',
    avatar: '🏸',
    sub: 'Đang online',
    preview: 'Em thi đấu trên sân số 2 suốt từ 20h30 đến 21h00…',
    requires: ['hao-gan-tu'],
    messages: [
      { id: 'h1', from: 'them', time: '20:46', text: 'Điều tra viên ơi, thằng Sơn nó gài số điện thoại em vào bài đăng Chợ Tốt để vu oan cho em! Em mở tủ số 07 lúc 20h28 để đổi vợt căng cước rồi bước ngay vào Sân số 2 thi đấu!' },
      { id: 'h2', from: 'them', time: '20:47', text: 'Anh Tuấn HLV và cả chục khán giả ngồi quanh sân đều xem em đánh set 3 suốt từ 20:30 đến 21:00. Camera sân số 2 trên [Camera Phường](https://camera-phuong.gov.vn) CAM-201 ghi rõ từng đường cầu của em!' },
      { id: 'h3', from: 'them', time: '20:48', text: 'Thằng Sơn nhặt cầu nó nợ tiền sân ngập đầu, lúc 20h25 em thấy nó mặc áo khoác đỏ lén lút lách ra sau vách tôn khu tủ đồ đấy!' },
    ],
  },
  {
    id: 'son',
    name: 'Sơn Nhặt Cầu',
    avatar: '🧥',
    sub: 'Hoạt động 3 phút trước',
    preview: 'Tay tôi bị quẹt vào lưới rách da thôi…',
    requires: ['mat-dt'],
    messages: [
      { id: 's1', from: 'them', time: '20:48', text: 'Camera sân số 2 quay rõ mồn một tôi mặc áo khoác đỏ số 09 ngồi ở hàng ghế kỹ thuật sân 3 suốt từ 20:30 đến 21:00 xem thi đấu, cả chục khán giả làm chứng! Sao tôi lấy được? Anh Hào mở tủ số 07 ngay cạnh kìa!' },
      {
        id: 's2',
        from: 'me',
        time: '20:49',
        text: 'Vết thương xước rách trên cổ tay phải của anh xảy ra vào thời điểm nào tối nay?',
        requires: ['son-vet-xuoc'],
      },
      {
        id: 's3',
        from: 'them',
        time: '20:50',
        text: 'Tôi... tôi quẹt trúng cọc sắt căng lưới lúc nhảy lên cứu cầu chứ có động chạm gì vào tủ đồ đâu!',
        requires: ['son-vet-xuoc'],
      },
      {
        id: 's4',
        from: 'me',
        time: '20:51',
        text: 'Có người nhìn thấy anh ở khu vực sau tủ đồ và trên diễn đàn rao bán xuất hiện tin đăng máy. Anh có lời giải thích nào không?',
        requires: ['tin-nhan-ban'],
      },
      {
        id: 's5',
        from: 'them',
        time: '20:52',
        text: 'Tôi nói rồi, tay tôi bị xước là do va quẹt cọc lưới sắt lúc nhảy cứu cầu! Còn số IP Wi-Fi ở sân thì hàng chục người bắt chung, sao lại bảo tôi đăng tin Chợ Tốt?! Các anh không có bằng chứng thì đừng hòng ép cung tôi!',
        requires: ['tin-nhan-ban'],
      },
    ],
  },
  {
    id: 'linh',
    name: 'Linh Quầy Nước',
    avatar: '🥤',
    sub: 'Đang online',
    preview: 'Em ngồi trực quầy nghe điện thoại của mẹ…',
    requires: ['mat-dt'],
    messages: [
      { id: 'l1', from: 'them', time: '20:43', text: 'Em trực quầy nước từ 18h đến giờ, từ 20h30 đến 20h45 em ngồi nghe điện thoại của mẹ ở quê gọi lên, camera quầy nước ghi rõ!' , clue: 'linh-goi-dien'},
      { id: 'l2', from: 'them', time: '20:44', text: 'Lúc 20h41 em có thao tác chuyển khoản 2 triệu trên [VietinBank](https://vietinbank.vn) để đóng học phí đại học, biên lai CK-8812 lưu rõ ràng chứ không liên quan gì đến tiền điện thoại đâu ạ!', clue: 'chuyen-khoan-linh' },
    ],
  },
  {
    id: 'quan_hlv',
    name: 'Quân Huấn Luyện Viên',
    avatar: '💪',
    sub: 'Đang online',
    preview: 'Tôi dạy kèm học viên sân 1 từ 19h30 đến 21h00…',
    requires: ['mat-dt'],
    messages: [
      {
        id: 'q1',
        from: 'them',
        time: '20:47',
        text: 'Em điều tra viên ơi, anh dạy kèm đôi học viên ở sân 1 suốt từ 19h30 đến 21h00, học viên và phụ huynh ngồi ở khán đài xem suốt buổi làm chứng cho anh được!',
      },
      {
        id: 'q2',
        from: 'them',
        time: '20:48',
        text: 'Lúc 20h25 anh xin phép tạm dừng 2 phút vào phòng thay đồ lấy nước thì bắt gặp thằng Sơn đang khom người ghé mắt nhìn qua khe hở nóc tủ đồ, tay nó còn cầm cái móc kim loại!',
      },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'CK-8812', time: '20:41', pickup: 'VietinBank Mobile', drop: 'Học phí ĐHQG', fee: '2.000.000đ', status: 'Hoàn tất (Linh)', clue: 'chuyen-khoan-linh' },
  { id: 'CT-201', time: '20:44', pickup: 'Chợ Tốt App', drop: 'Rao bán iPhone 14 Pro Max', fee: '5.500.000đ', status: 'Đang hiển thị', clue: 'tin-nhan-ban' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Hiện trường khe hở nóc tủ số 04',
    time: '20:45',
    scene: 'street',
    caption: 'Vách tôn phía sau dãy tủ đồ cá nhân bị bong mối nối đinh tán.',
    clue: 'lo-hong-tu',
    hotspots: [
      { x: 50, y: 35, label: 'Khe hở nóc tôn', hint: 'Mối nối bị bung', clue: 'lo-hong-tu', detail: 'Khoảng cách giữa nóc tủ và vách tôn rộng 4.2cm, đủ để thò bàn tay vào bên trong.' },
    ],
  },
  {
    id: 'p2',
    title: 'Story quầy nước của Linh',
    time: '20:29',
    scene: 'tea',
    caption: 'Ảnh chụp cốc nước giải khát đăng trên trang cá nhân lúc 20:29.',
    clue: 'anh-story',
    hotspots: [
      { x: 78, y: 45, label: 'Hình bóng trong gương', hint: 'Góc sau vách tôn', clue: 'anh-story', detail: 'Tấm kính phản chiếu bóng một người đang khom lưng thò tay vào khe sau dãy tủ đồ.' },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 't1',
    name: 'bang_phan_san_thi_dau_ca_toi.xlsx',
    kind: 'Lịch thi đấu sân cầu lông',
    preview: 'Bảng xếp sân từ 19:00 đến 22:00 ngày thứ Bảy…',
    detail: 'Sân 1: HLV Quân dạy kèm học viên từ 19:30 đến 21:00. Sân 2: Hào và nhóm bạn thi đấu giao hữu set 3 từ 20:30 đến 21:00.',
  },
  {
    id: 't2',
    name: 'hoa_don_thay_cuoc_vot_hao.pdf',
    kind: 'Hóa đơn dịch vụ thể thao',
    preview: 'Căng cước vợt Yonex Astrox 88D Pro cước BG65Ti…',
    detail: 'Hóa đơn số 1102: Khách hàng Trần Đức Hào thanh toán phí căng cước vợt 180.000đ chiều nay lúc 17:00.',
  },
  {
    id: 't3',
    name: 'so_theo_doi_ban_nuoc_giai_khat_linh.xlsx',
    kind: 'Nhật ký doanh thu quầy nước',
    preview: 'Báo cáo bán nước giải khát đóng chai và trà chanh…',
    detail: 'Linh trực quầy nước từ 18:00. Doanh thu tiền mặt đến 20:30 đạt 320.000đ. Không có khoản tiền mặt đột biến nào khác.',
  },
  {
    id: 't4',
    name: 'bien_ban_kiem_tra_an_ninh_san_cau.pdf',
    kind: 'Biên bản kiểm tra cơ sở vật chất',
    preview: 'Kiểm tra định kỳ ổ khóa tủ đồ và hệ thống lưới sân…',
    detail: 'Biên bản ghi nhận: Mép tôn sau lưng dãy tủ cá nhân số 04 bị lỏng đinh tán chưa kịp gia cố, tạo khe hở khoảng 4cm ở mặt sau vách ngăn.',
  },
  {
    id: 't5',
    name: 'bang_dinh_y_te_mau.png',
    kind: 'Mẩu rác bãi xe',
    preview: 'Miếng băng gạc y tế dính máu bị vứt ở góc bãi xe…',
    detail: 'Miếng băng gạc dính vết máu tươi vứt ở góc hành lang bãi xe lúc hơn 20h30. Kết quả xét nghiệm sơ bộ cho thấy nhóm máu trùng khớp với người bị cứa rách tay.',
    clue: 'son-vet-xuoc',
  },
]
