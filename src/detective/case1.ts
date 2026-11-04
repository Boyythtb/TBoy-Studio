export type ClueTag = 'chat' | 'web' | 'photo' | 'file'

export interface ClueDef {
  id: string
  tag: ClueTag
  title: string
  detail: string
}

export interface Msg {
  id: string
  from: 'them' | 'me'
  text: string
  time?: string
  requires?: string[]
  clue?: string
  card?: { title: string; sub: string; icon: string }
  senderName?: string
  senderAvatar?: string
}

export interface Conv {
  id: string
  name: string
  avatar: string
  sub: string
  preview: string
  requires?: string[]
  messages: Msg[]
  isGroup?: boolean
}

export interface Hotspot {
  x: number
  y: number
  label: string
  hint?: string
  clue?: string
  detail: string
}

export interface SearchRecord {
  id: string
  category: 'Cảnh sát' | 'Viễn thông' | 'Ngân hàng' | 'Pháp y' | 'Camera'
  title: string
  keywords: string[]
  snippet: string
  content: string
  clue?: string
  clueLabel?: string
  time?: string
}

export interface Photo {
  id: string
  title: string
  time: string
  scene: 'street' | 'tea' | 'net'
  caption: string
  requires?: string[]
  clue?: string
  img?: string
  hotspots?: Hotspot[]
}

export interface Order {
  id: string
  time: string
  pickup: string
  drop: string
  fee: string
  status: string
  clue?: string
}

export interface TrashItem {
  id: string
  name: string
  kind: string
  preview: string
  detail: string
  clue?: string
  locked?: boolean
  lockPrompt?: string
  lockHint?: string
  lockCodes?: string[]
}

export interface Suspect {
  id: string
  name: string
  role: string
  avatar: string
  note: string
}

export const CASE = {
  no: 'Vụ án 01',
  title: 'Chiếc xe đạp điện',
  place: 'Hẻm 42, phố Hàng Chai',
  time: '21:47 · thứ Sáu 12/9',
  brief:
    'Chiếc xe đạp điện Nijia màu xanh mint của cô Lan dựng trong sân biến mất giữa khoảng 21:10 - 21:40 lúc ngõ mất điện. Nhiều đối tượng trong hẻm có động cơ và mâu thuẫn thời gian cần được điều tra đối soát.',
  culprit: 'dung',
  difficulty: 'Dễ',
  question: 'Ai đã lấy chiếc xe đạp điện của cô Lan?',
  solution:
    'Dũng khai về phòng trọ ngủ từ 21:15, nhưng máy chủ GiaoNhanh (giaonhanh.vn) ghi nhận Dũng nhận đơn GN-88214 lúc 21:47 ngay đầu Hẻm 42. Camera giao thông CAM-102 (camera-phuong.gov.vn) ghi nhận lúc 21:49 có người mặc áo shipper kéo theo xe đạp điện trùm bạt xanh mint, và tấm ảnh chụp lúc 21:58 trước cửa hàng điện thoại in bóng chiếc xe kèm túi vải hoa của cô Lan. Bản nháp tin nhắn trong máy Dũng cho thấy áp lực phải trả 5 triệu tiền nợ cho Hùng trước 22:00 đêm nay.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-xe': {
    id: 'mat-xe',
    tag: 'chat',
    title: 'Xe mất trong khoảng 21:10 - 21:40',
    detail:
      'Cô Lan khoá xe trong sân lúc 21:10 rồi vào nhà xem thời sự. Đến 21:40 ra sân thì cổng hé mở, xe biến mất. Trời tối do đèn ngõ mất điện.',
  },
  'camera-hong': {
    id: 'camera-hong',
    tag: 'chat',
    title: 'Camera hẻm mất nguồn từ 20:00',
    detail:
      'Bác Bảy bảo vệ rút phích cắm camera để cắm quạt lúc dọn bốt trực rồi quên cắm lại. Đoạn ngõ từ 20:00 đến 22:00 không có hình ảnh ghi nhận trực tiếp.',
  },
  'bill-vien': {
    id: 'bill-vien',
    tag: 'web',
    title: 'Biên lai mua thuốc của bác Bảy lúc 21:20',
    detail:
      'Hoá đơn tại Nhà Thuốc Long Châu chi nhánh Hẻm 42 ghi nhận bác Bảy thanh toán thuốc hạ huyết áp lúc 21:20. Bác Bảy có bằng chứng ngoại phạm rõ ràng.',
  },
  'dung-khai-21h15': {
    id: 'dung-khai-21h15',
    tag: 'chat',
    title: 'Dũng khai về phòng ngủ từ 21:15',
    detail:
      'Dũng khẳng định trước nhóm cư dân: “Em chạy cuốc cả ngày mệt đứt hơi, về phòng trọ trùm chăn ngủ từ 21h15 đến giờ không bước chân ra ngoài.”',
  },
  'don-hang-2147': {
    id: 'don-hang-2147',
    tag: 'web',
    title: 'Đơn hàng GiaoNhanh lúc 21:47 tại hẻm 42',
    detail:
      'Máy chủ GiaoNhanh ghi nhận tài xế Dũng nhận cuốc GN-88214 lúc 21:47 ngay đầu Hẻm 42 và giao lúc 21:52. Dữ liệu này mâu thuẫn hoàn toàn với lời khai ngủ từ 21:15 của Dũng.',
  },
  'vy-xe-do': {
    id: 'vy-xe-do',
    tag: 'web',
    title: 'Vy rao bán xe Asama đỏ từ 3 hôm trước',
    detail:
      'Tin đăng CT-101 trên Chợ Tốt cho thấy Vy rao bán chiếc xe Asama màu đỏ cũ của mình từ 18:02 ngày 09/9 (3 ngày trước) để đóng tiền trọ, không liên quan xe cô Lan.',
  },
  'anh-phan-chieu': {
    id: 'anh-phan-chieu',
    tag: 'photo',
    title: 'Bóng phản chiếu xe xanh trong ảnh 21:58',
    detail:
      'Bức ảnh chụp trước cửa tiệm điện thoại lúc 21:58: Trên mặt kính phản chiếu rõ bóng một chiếc xe đạp điện màu xanh mint có gắn túi vải hoa văn ở giỏ xe.',
  },
  'tin-nhan-nhap': {
    id: 'tin-nhan-nhap',
    tag: 'file',
    title: 'Bản nháp tin nhắn xoay tiền trước 22h',
    detail:
      'File bản nháp tìm thấy trong máy: “Tối nay em giao xong một đơn đặc biệt là xoay đủ 5 triệu trả anh trước 22h, anh đừng sang phòng làm ầm lên” — soạn gửi cho Hùng Net.',
  },
  'vy-chung-kien': {
    id: 'vy-chung-kien',
    tag: 'chat',
    title: 'Vy thấy bóng người dắt xe xanh lúc 21:35',
    detail:
      'Vy kể: Khoảng 21:35 cô xuống sân vứt rác, thấy một người mặc áo khoác trùm đầu dắt chiếc xe màu xanh mint ra cổng. Do trời tối ngõ mất điện nên không nhìn rõ mặt.',
  },
  'hung-cho-vay': {
    id: 'hung-cho-vay',
    tag: 'chat',
    title: 'Khoản nợ 5 triệu hẹn trả đêm 12/9',
    detail:
      'Sổ nợ và tin nhắn tiệm sửa xe Hùng Motor: Khoản nợ phụ tùng 5 triệu của Dũng đến hạn chót thanh toán trước 22:00 đêm 12/9, nếu không sẽ bị giữ xe máy.',
  },
  'son-don-hang': {
    id: 'son-don-hang',
    tag: 'web',
    title: 'Sơn đang giao hàng ở hẻm 46 lúc 21:44',
    detail:
      'Lịch sử đơn hàng GN-88212 và camera đối soát ghi nhận Sơn đang giao trà sữa tại hẻm 46 lúc 21:44, cách xa hiện trường vụ việc.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'dung',
    name: 'Dũng',
    role: 'Shipper GiaoNhanh · Phòng trọ số 3',
    avatar: '🛵',
    note: 'Khai rằng chạy cuốc cả ngày mệt đứt hơi, về phòng trọ trùm chăn ngủ từ 21h15 không bước chân ra ngoài.',
  },
  {
    id: 'vy',
    name: 'Vy',
    role: 'Sinh viên · Phòng 402',
    avatar: '🎧',
    note: 'Khai rằng chỉ xuống sân vứt rác và tìm chìa khóa rơi lúc 21h35 rồi lên phòng học bài.',
  },
  {
    id: 'son',
    name: 'Sơn',
    role: 'Shipper đối thủ · Hẻm 46',
    avatar: '🚴',
    note: 'Thường xuyên chạy đơn giao hàng và có mặt quanh các con hẻm phố Hàng Chai.',
  },
  {
    id: 'ong-bay',
    name: 'Ông Bảy',
    role: 'Bảo vệ dân phòng hẻm 42',
    avatar: '🧹',
    note: 'Quản lý bốt trực đầu ngõ, phụ trách an ninh và giám sát người ra vào hẻm.',
  },
  {
    id: 'hung',
    name: 'Hùng',
    role: 'Chủ tiệm sửa xe & net Hẻm 42',
    avatar: '🖥️',
    note: 'Chủ tiệm sửa xe kiêm quán net Hẻm 42, ngồi trông quán suốt từ chiều tối đến nửa đêm.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group',
    name: 'Tổ dân phố 42',
    avatar: '🏘️',
    isGroup: true,
    sub: '8 thành viên',
    preview: 'Cô Lan: Cả nhà ơi xe đạp điện của tôi mất rồi!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Cô Lan',
        senderAvatar: '👵',
        time: '21:41',
        text: 'Cả nhà ơi cứu tôi với! Chiếc xe đạp điện Nijia xanh mint của tôi khóa cổ để ở góc sân lúc 21h10, tôi vào nhà uống ngụm nước quay ra 21h40 đã không thấy đâu rồi!',
        clue: 'mat-xe',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Hùng Net',
        senderAvatar: '🖥️',
        time: '21:42',
        text: 'Cổng hẻm có then cài mà cô? Lúc hơn 21h30 em thấy cổng mở toang. Bác Bảy bảo vệ đâu rồi, mở camera hẻm xem ai dắt ra chứ!',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Ông Bảy (Bảo vệ)',
        senderAvatar: '🧹',
        time: '21:43',
        text: 'Chết dở tôi rồi chị Lan ơi... Lúc 20h tôi quét dọn bốt, rút phích cắm camera ra cắm quạt rồi đãng trí quên cắm lại! Camera hẻm bị ngắt điện từ 20h tối đến giờ...',
        clue: 'camera-hong',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Hùng Net',
        senderAvatar: '🖥️',
        time: '21:44',
        text: 'Tôi biết ngay ai lấy rồi! Con Vy phòng 402 chứ ai! Bà chủ trọ vừa sang đòi nợ 2 tháng tiền phòng nó khất lần khất lữa, tôi còn thấy nó vừa đăng bán xe đạp điện trên sàn [Chợ Tốt](https://chotot.vn) kìa!',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Dũng (Shipper)',
        senderAvatar: '🛵',
        time: '21:45',
        text: 'Đúng đấy! Chiều nay con Vy đứng ở cầu thang lấm la lấm lét nhìn xe cô Lan suốt! Hoặc không thì thằng Sơn đối thủ NowFood ở Hẻm 46, nó hay tranh giành khách với tôi, lúc nãy tôi thấy nó lượn lờ ngõ mang ba lô đồ nghề bẻ khoá!',
        clue: 'dung-khai-21h15',
      },
      {
        id: 'g6',
        from: 'them',
        senderName: 'Vy (402)',
        senderAvatar: '🎧',
        time: '21:46',
        text: 'Anh Hùng với anh Dũng đừng có ngậm máu phun người! Em bán chiếc xe Asama màu ĐỎ cũ của em từ 3 hôm trước trên [Facebúc Vy](https://facebuc.vn/vy.socute) để lấy tiền đóng trọ, liên quan gì đến xe xanh mint của cô Lan!',
        clue: 'vy-xe-do',
      },
      {
        id: 'g7',
        from: 'them',
        senderName: 'Vy (402)',
        senderAvatar: '🎧',
        time: '21:47',
        text: 'Lúc 21h35 em xuống sân vứt rác, chính mắt em thấy một người mặc áo khoác shipper GiaoNhanh trùm mũ kín mít đang kéo chiếc xe xanh mint có treo túi hoa ra cổng hẻm! Anh Dũng cũng chạy GiaoNhanh sao không nói đi?!',
        clue: 'vy-chung-kien',
      },
      {
        id: 'g8',
        from: 'them',
        senderName: 'Dũng (Shipper)',
        senderAvatar: '🛵',
        time: '21:48',
        text: 'Mày điên à Vy?! Tao mệt quá về phòng trùm chăn ngủ say từ 21h15 đến giờ có biết trời đất gì đâu! Mọi người qua xem [Facebúc Dũng](https://facebuc.vn/dung.ship42) tao đăng bài ngủ li bì kìa!',
      },
      {
        id: 'g9',
        from: 'them',
        senderName: 'Sơn (Shipper)',
        senderAvatar: '🚴',
        time: '21:49',
        text: 'Anh Dũng đừng có đổ oan cho tôi! Tối nay tôi có đơn giao trà sữa ở Hẻm 46 lúc 21h44 cho chị Hoa, tôi đăng cả bài và ảnh nhận tiền tip trên [Facebúc Sơn](https://facebuc.vn/son.shipper.pro) đây này!',
        clue: 'son-don-hang',
      },
      {
        id: 'g10',
        from: 'them',
        senderName: 'Hùng Net',
        senderAvatar: '🖥️',
        time: '21:50',
        text: 'Dũng ơi mày đừng có giả vờ ngủ! 5 triệu tiền nợ sửa xe hẹn tối nay trước 22h trả đâu rồi? Không trả tao khoá nick game với mang sổ nợ sang phòng trọ đấy!',
        clue: 'hung-cho-vay',
      },
      {
        id: 'g11',
        from: 'them',
        senderName: 'Ông Bảy (Bảo vệ)',
        senderAvatar: '🧹',
        time: '21:51',
        text: 'Camera trong ngõ mất điện nhưng camera ngã tư phố Hàng Chai [Camera Phường](https://camera-phuong.gov.vn) CAM-101 vẫn quay 24/7, xe muốn chở đi đâu cũng phải qua góc ngã tư đó!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra khu vực',
    preview: 'Cần đối soát bằng chứng khách quan, chớ đoán mò!',
    requires: ['mat-xe'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:50',
        text: 'Anh nhận được tin báo mất xe ở Hẻm 42 rồi. Mọi người đang nghi kỵ đổ lỗi loạn xạ cho Vy và Sơn. Em hãy giữ cái đầu lạnh và đối soát dữ liệu khách quan.',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:51',
        text: 'Camera trong ngõ mất điện thì kẻ gian muốn tẩu tán xe bắt buộc phải ra đường lớn. Em thử rà soát camera ngã tư [Camera Phường](https://camera-phuong.gov.vn) và dữ liệu hành trình [GiaoNhanh](https://giaonhanh.vn) xem có mốc giờ nào trùng khớp.',
        requires: ['camera-hong'],
      },
      {
        id: 't3',
        from: 'them',
        time: '21:52',
        text: 'Đối soát kỹ lời khai của từng người với lịch sử định vị thực tế. Kẻ gian thường đưa ra bằng chứng ngoại phạm bằng lời nói nhưng dữ liệu GPS và hình ảnh sẽ không biết nói dối.',
        requires: ['camera-hong'],
      },
      {
        id: 't4',
        from: 'them',
        time: '22:04',
        text: 'Hãy kiểm tra bức ảnh hoặc bài đăng mạng xã hội xuất hiện quanh khung giờ 21h45 - 22h00 xem có dấu vết nào vô tình lọt vào khung hình hay không.',
        requires: ['don-hang-2147'],
      },
      {
        id: 't5',
        from: 'me',
        time: '22:13',
        text: 'Em đã đối soát chuỗi chứng cứ: định vị đơn hàng GPS GiaoNhanh, hình ảnh camera ngã tư và bóng phản chiếu trên kính cửa hàng điện thoại 88.',
        requires: ['anh-phan-chieu'],
      },
      {
        id: 't6',
        from: 'them',
        time: '22:14',
        text: 'Rất sắc bén! Dữ liệu đã đủ để chứng minh ai có mặt tại hiện trường và ai nói dối. Em hãy mở Hồ sơ vụ án để tiến hành cáo buộc.',
        requires: ['anh-phan-chieu'],
      },
    ],
  },
  {
    id: 'dung',
    name: 'Dũng Ship',
    avatar: '🛵',
    sub: 'Hoạt động 2 phút trước',
    preview: 'Em ở trong phòng ngủ từ 21h15 mà anh chị...',
    requires: ['dung-khai-21h15'],
    messages: [
      { id: 'd1', from: 'them', time: '21:52', text: 'Anh chị điều tra viên hỏi em làm gì? Em mệt quá về phòng trọ trùm chăn ngủ say từ 21h15 rồi, con Vy với thằng Sơn nó làm đấy!' },
      { id: 'd2', from: 'them', time: '21:53', text: 'Con bé Vy nó nợ tiền phòng trọ mấy tháng nay kìa, trên mạng nó đang rao bán xe điện trên [Chợ Tốt](https://chotot.vn) ầm ầm sao anh chị không sang kiểm tra nó?' },
      {
        id: 'd3',
        from: 'me',
        time: '22:01',
        text: 'Vy đã chứng minh chiếc xe Asama đỏ là xe cũ của cô ấy đăng từ 3 ngày trước. Còn anh, hệ thống [GiaoNhanh](https://giaonhanh.vn) ghi nhận tài khoản tài xế SH-4209 của anh nhận đơn GN-88214 lúc 21h47 ngay đầu hẻm 42! Anh giải thích thế nào?',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd4',
        from: 'them',
        time: '22:02',
        text: 'Ủa... máy em bị cấn túi quần tự nhận đơn ảo chứ em đang nằm ngủ mà! Thằng Sơn đối thủ NowFood cũng lảng vảng ngõ 46 đấy, sao không hỏi nó?!',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd5',
        from: 'me',
        time: '22:03',
        text: 'Camera ngã tư [Camera Phường](https://camera-phuong.gov.vn) lúc 21h49 ghi rõ người mặc áo khoác GiaoNhanh kéo theo xe xanh mint. Và bức ảnh anh đăng lên [Facebúc Dũng](https://facebuc.vn/dung.ship42) lúc 21h58 ở cửa hàng 88 phản chiếu rõ chiếc xe và chiếc túi hoa của cô Lan!',
        requires: ['anh-phan-chieu'],
      },
      {
        id: 'd6',
        from: 'them',
        time: '22:04',
        text: '...Trời ơi... sao các người lại soi ra được tấm kính phản chiếu... Tôi... tôi túng quẫn vì bị anh Hùng đòi nợ 5 triệu gắt gao quá...',
        requires: ['anh-phan-chieu'],
      },
    ],
  },
  {
    id: 'vy',
    name: 'Vy 402',
    avatar: '🎧',
    sub: 'Hoạt động 1 phút trước',
    preview: 'Em đăng bán xe đỏ cũ từ 3 hôm trước mà…',
    requires: ['vy-xe-do'],
    messages: [
      { id: 'v1', from: 'them', time: '22:05', text: 'Anh chị ơi, mọi người cứ đổ oan cho em! Chiếc xe em đăng bán trên Chợ Tốt là chiếc Asama màu đỏ của em từ năm nhất, em đăng từ 3 hôm trước trên [Facebúc Vy](https://facebuc.vn/vy.socute) rồi!' },
      { id: 'v2', from: 'them', time: '22:06', text: 'Em đúng là đang túng tiền trọ thật, nhưng chiếc xe em bán có giấy tờ hoá đơn đàng hoàng, không phải xe cô Lan đâu ạ!', clue: 'vy-xe-do' },
      {
        id: 'v3',
        from: 'them',
        time: '22:07',
        text: 'Hồi 21h35 em xuống vứt rác, chính mắt em thấy một người trùm mũ áo khoác kéo chiếc xe màu xanh mint ra cổng, giỏ có treo túi hoa. Người đó mặc đồng phục shipper GiaoNhanh! Anh thử kiểm tra máy chủ [GiaoNhanh](https://giaonhanh.vn) xem đêm nay ai nhận đơn quanh ngõ!',
        clue: 'vy-chung-kien',
      },
    ],
  },
  {
    id: 'hung',
    name: 'Hùng Net',
    avatar: '🖥️',
    sub: 'Đang online',
    preview: 'Tối nay tôi ngồi quán trông máy suốt…',
    requires: ['don-hang-2147'],
    messages: [
      { id: 'h1', from: 'them', time: '21:55', text: 'Tôi ngồi quán net từ chập tối tới giờ, khách ra vào chơi game liên tục. Thằng Dũng nó nợ tôi 5 triệu tiền thay đồ xe máy hơn hai tuần nay. Nó hẹn tối nay trước 22h phải trả đủ cho tôi đấy.' },
      { id: 'h2', from: 'them', time: '21:56', text: 'Nó cứ quanh co đổ tội cho con bé Vy với thằng Sơn, anh chị công an kiểm tra kỹ định vị của nó xem!', clue: 'hung-cho-vay' },
    ],
  },
  {
    id: 'son',
    name: 'Sơn Shipper',
    avatar: '🚴',
    sub: 'Hoạt động 5 phút trước',
    preview: 'Em giao đơn trà sữa ở Hẻm 46 lúc 21:44 xong rồi…',
    requires: ['dung-khai-21h15'],
    messages: [
      { id: 's1', from: 'them', time: '21:57', text: 'Anh chị ơi em chạy NowFood, thằng Dũng nó hay thù hằn em nên cứ réo tên em! Tối nay em có đơn giao trà sữa ở Hẻm 46 cho chị Hoa lúc 21:44, em đăng cả bài trên [Facebúc Sơn](https://facebuc.vn/son.shipper.pro) đây nè!' },
      { id: 's2', from: 'them', time: '21:58', text: 'Em chạy xe máy Wave đỏ, còn người dắt xe đạp điện xanh ra ngõ lúc hơn 21h30 mặc đồng phục cam của GiaoNhanh mà!', clue: 'son-don-hang' },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'GN-88210', time: '20:15', pickup: 'Phố Cửa Đông', drop: 'Hẻm 42 Hàng Chai', fee: '28.000đ', status: 'Hoàn tất' },
  { id: 'GN-88212', time: '21:44', pickup: 'Trà sữa Phúc', drop: 'Hẻm 46 Hàng Chai', fee: '22.000đ', status: 'Hoàn tất (Tài xế Sơn)', clue: 'son-don-hang' },
  { id: 'GN-88214', time: '21:47', pickup: 'Hẻm 42 — Net Hùng', drop: 'Hẻm 44 Hàng Chai', fee: '35.000đ', status: 'Hoàn tất (Tài xế Dũng)', clue: 'don-hang-2147' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Hiện trường sân nhà cô Lan sáng hôm sau',
    time: '07:30',
    scene: 'street',
    caption: 'Vị trí chiếc xe đạp điện từng dựng trước thềm nhà cạnh cổng sắt.',
    hotspots: [
      { x: 30, y: 65, label: 'Vết lốp xe', hint: 'Dấu vết trên nền xi măng', detail: 'Vết lốp xe đạp điện hướng thẳng ra phía cổng hẻm.' },
      { x: 75, y: 40, label: 'Phích cắm camera', hint: 'Bốt trực bảo vệ', clue: 'camera-hong', detail: 'Ổ cắm điện camera an ninh bị rút ra, thay bằng phích cắm quạt bàn.' },
    ],
  },
  {
    id: 'p2',
    title: 'Ảnh chụp trước cửa hàng điện thoại',
    time: '21:58',
    scene: 'net',
    caption: 'Ảnh chụp lúc 21:58 trên phố Hàng Chai.',
    clue: 'anh-phan-chieu',
    hotspots: [
      {
        x: 48,
        y: 52,
        label: 'Mặt kính phản chiếu',
        hint: 'Soi kỹ bóng phản chiếu',
        clue: 'anh-phan-chieu',
        detail: 'Tấm kính phản chiếu rõ một người dắt chiếc xe đạp điện màu xanh mint có túi vải hoa ở giỏ.',
      },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 't1',
    name: 'draft_sms_2145.txt',
    kind: 'Bản nháp tin nhắn',
    preview: 'Tối nay em giao xong một đơn đặc biệt là xoay đủ 5 triệu trả anh trước 22h…',
    detail: 'Bản nháp tin nhắn soạn lúc 21:45 gửi tới số của Hùng Net: “Tối nay em giao xong một đơn đặc biệt là xoay đủ 5 triệu trả anh trước 22h, anh đừng sang phòng làm ầm lên”.',
    clue: 'tin-nhan-nhap',
  },
  {
    id: 't2',
    name: 've_gui_xe_hang_chai.png',
    kind: 'Ảnh chụp vé xe',
    preview: 'Vé gửi xe chợ đêm Hàng Chai số 118…',
    detail: 'Vé gửi xe chợ đêm đề ngày 10/9 đã hết hạn sử dụng.',
  },
]
