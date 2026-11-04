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
    title: 'Tin đăng bán máy phát từ Wi-Fi sân cầu lông',
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
    title: 'Vết trầy xước kim loại trên cổ tay Sơn',
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
    title: 'Bóng người sau vách tôn trong ảnh story 20:29',
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
    note: 'Thường xuyên ra vào phòng thay đồ dọn dẹp các ngăn tủ và hỗ trợ khách bảo quản tư trang.',
  },
  {
    id: 'hao',
    name: 'Hào Smash',
    role: 'Khách chơi phong trào',
    avatar: '🏸',
    note: 'Sử dụng tủ số 07 ngay cạnh tủ của chị Hạnh để cất túi vợt thi đấu.',
  },
  {
    id: 'linh',
    name: 'Linh Quầy Nước',
    role: 'Nhân viên quầy giải khát',
    avatar: '🥤',
    note: 'Giữ chìa khóa dự phòng dãy tủ đồ và phụ trách quầy nước giải khát.',
  },
  {
    id: 'mai',
    name: 'Bà Mai',
    role: 'Lao công sân tập',
    avatar: '🧹',
    note: 'Phụ trách quét dọn khu vực sân thi đấu và phòng thay đồ cuối ca.',
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
        text: 'Tin đăng trên [Chợ Tốt](https://chotot.vn) CT-201 bán iPhone có mã kiểm tra bảo mật. Hãy đối chiếu số hiệu ngăn tủ đồ bị đột nhập để mở khóa kiểm tra số Serial máy.',
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
      { id: 's1', from: 'them', time: '20:48', text: 'Tôi chỉ làm công việc nhặt cầu thôi, anh Hào mới là người đáng nghi nhất!' },
      {
        id: 's2',
        from: 'me',
        time: '20:49',
        text: 'Vết thương trên cổ tay phải của anh do vật kim loại cứa sâu, mép tôn tủ số 04 cũng có vệt máu khô. Anh giải thích sao?',
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
        text: 'Tin rao bán iPhone 14 Pro Max CT-201 trên [Chợ Tốt](https://chotot.vn) phát từ địa chỉ IP Wi-Fi sân cầu đúng vị trí của anh, và tài khoản [VietinBank](https://vietinbank.vn) của anh vừa nhận cọc 5 triệu lúc 20h44!',
        requires: ['tin-nhan-ban'],
      },
      {
        id: 's5',
        from: 'them',
        time: '20:52',
        text: '...Tôi... tôi cùng đường rồi... Chủ nợ dí dữ quá, thấy khe tôn tủ 04 lỏng lẻo nên tôi mới đánh liều thò tay vào móc chiếc điện thoại... Xin các anh tha cho tôi...',
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
    name: 'bang_dinh_y_te_mau.png',
    kind: 'Mẩu rác bãi xe',
    preview: 'Miếng băng gạc y tế dính máu bị vứt ở góc bãi xe…',
    detail: 'Miếng băng gạc dính vết máu tươi vứt ở góc hành lang bãi xe lúc hơn 20h30.',
    clue: 'son-vet-xuoc',
  },
]
