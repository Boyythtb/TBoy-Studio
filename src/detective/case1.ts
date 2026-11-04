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
    role: 'Shipper GiaoNhanh · Phòng 203',
    avatar: '🛵',
    note: 'Khai rằng chạy xe cả ngày mệt đứt hơi, về phòng trọ trùm chăn ngủ từ 21h15 không bước chân ra ngoài.',
  },
  {
    id: 'vy',
    name: 'Vy',
    role: 'Sinh viên · Phòng 402',
    avatar: '🎧',
    note: 'Khai rằng chỉ xuống sân vứt rác lúc 21h35 rồi lên phòng học bài. Đang nợ tiền phòng trọ và rao bán xe trên mạng.',
  },
  {
    id: 'son',
    name: 'Sơn',
    role: 'Shipper đối thủ · Hẻm 46',
    avatar: '🚴',
    note: 'Thường xuyên tranh giành địa bàn giao hàng với Dũng. Từng bị thấy dắt xe vào hẻm mang theo balo đồ nghề.',
  },
  {
    id: 'ong-bay',
    name: 'Ông Bảy',
    role: 'Bảo vệ dân phòng hẻm 42',
    avatar: '🧹',
    note: 'Quản lý bốt trực đầu ngõ. Thừa nhận rút nhầm phích cắm camera lúc 20h dọn dẹp rồi quên cắm lại.',
  },
  {
    id: 'hung',
    name: 'Hùng',
    role: 'Chủ tiệm sửa xe & net Hẻm 42',
    avatar: '🖥️',
    note: 'Chủ nợ của Dũng. Khai rằng ngồi trông quán net suốt từ chiều tối đến nửa đêm.',
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
        senderName: 'Cô Lan',
        senderAvatar: '👵',
        time: '21:44',
        text: 'Trời ơi! Xe con gái tích cóp tiền mua tặng, giỏ trước còn có cái túi vải hoa đựng sổ sách nữa! Ai quanh hẻm thấy tung tích gì xin báo giúp tôi với!',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Vy (402)',
        senderAvatar: '🎧',
        time: '21:45',
        text: 'Khoảng 21h35 em xuống sân vứt rác, có thấy bóng một người trùm mũ áo khoác kéo xe màu xanh mint ra cổng. Lúc đó tối om tưởng người nhà dắt xe đi sạc...',
        clue: 'vy-chung-kien',
      },
      {
        id: 'g6',
        from: 'them',
        senderName: 'Hùng Net',
        senderAvatar: '🖥️',
        time: '21:46',
        text: 'Vy mày nói ai thế? Bà chủ nhà trọ vừa bảo mày nợ 2 tháng tiền trọ, tao còn thấy mày đăng bán xe gì trên Chợ Tốt kia kìa!',
      },
      {
        id: 'g7',
        from: 'them',
        senderName: 'Vy (402)',
        senderAvatar: '🎧',
        time: '21:47',
        text: 'Anh Hùng đừng có vu oan! Em bán xe Asama đỏ cũ của em từ 3 hôm trước để đóng tiền trọ, liên quan gì đến xe cô Lan!',
        clue: 'vy-xe-do',
      },
      {
        id: 'g8',
        from: 'them',
        senderName: 'Sơn (Shipper)',
        senderAvatar: '🚴',
        time: '21:48',
        text: 'Trong ngõ ra vào nườm nượp, lúc nãy tôi thấy shipper nào phóng xe máy ra vội vã lắm, kéo theo đồ phía sau...',
      },
      {
        id: 'g9',
        from: 'them',
        senderName: 'Dũng (Shipper)',
        senderAvatar: '🛵',
        time: '21:49',
        text: 'Mọi người đừng có réo tên tôi! Tôi chạy cuốc cả ngày mệt đứt hơi, về phòng trọ trùm chăn ngủ từ 21h15 đến giờ có biết trời đất gì đâu!',
        clue: 'dung-khai-21h15',
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
        text: 'Anh nhận được tin báo mất xe ở Hẻm 42 rồi. Vụ này khá nhiều nghi vấn vì bà con đang nghi kỵ lẫn nhau. Em phụ trách điều tra nhé: chỉ có 3 lượt cáo buộc thôi, cần chứng cứ vững chắc.',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:51',
        text: 'Camera trong ngõ mất điện thì kẻ gian muốn tẩu tán xe bắt buộc phải ra đường lớn. Em thử rà soát camera giao thông các ngã tư xung quanh và dữ liệu hành trình các app giao vận xem có mốc giờ nào trùng khớp.',
        requires: ['camera-hong'],
      },
      {
        id: 't3',
        from: 'them',
        time: '21:52',
        text: 'Đối soát kỹ lời khai của từng người với lịch sử giao dịch và định vị thực tế. Kẻ gian thường đưa ra bằng chứng ngoại phạm bằng lời nói nhưng dữ liệu số sẽ không biết nói dối.',
        requires: ['camera-hong'],
      },
      {
        id: 't4',
        from: 'them',
        time: '22:04',
        text: 'Hãy kiểm tra những bức ảnh hoặc thiết bị xuất hiện quanh khung giờ 21h45 - 22h00 xem có dấu vết nào vô tình lọt vào khung hình hay không.',
        requires: ['don-hang-2147'],
      },
      {
        id: 't5',
        from: 'me',
        time: '22:13',
        text: 'Em đã đối soát chuỗi chứng cứ: định vị đơn hàng viễn thông, hình ảnh camera ngã tư và bóng phản chiếu trên kính cửa hàng.',
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
    sub: 'Hoạt động 5 phút trước',
    preview: 'Em ở trong phòng ngủ từ 21h15 mà anh chị...',
    requires: ['mat-xe'],
    messages: [
      { id: 'd1', from: 'them', time: '21:52', text: 'Anh chị hỏi em làm gì? Em mệt quá về phòng trọ trùm chăn ngủ say từ 21h15 rồi, có biết gì đâu!' },
      { id: 'd2', from: 'them', time: '21:53', text: 'Con bé Vy nó nợ tiền phòng trọ mấy tháng nay kìa, trên mạng nó đang rao bán xe điện ầm ầm sao anh chị không kiểm tra?' },
      {
        id: 'd3',
        from: 'me',
        time: '22:01',
        text: 'Dữ liệu máy chủ GiaoNhanh ghi nhận tài khoản của anh nhận đơn GN-88214 lúc 21h47 ngay đầu hẻm 42. Anh giải thích thế nào?',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd4',
        from: 'them',
        time: '22:02',
        text: 'Ủa... chắc là máy em để trong túi quần bị cấn màn hình tự nhảy nhận đơn ảo chứ em đang nằm ngủ mà!',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd5',
        from: 'me',
        time: '22:03',
        text: 'Camera ngã tư lúc 21h49 ghi rõ người mặc đồng phục GiaoNhanh kéo theo xe xanh mint, và tấm ảnh lúc 21h58 phản chiếu rõ túi hoa của cô Lan!',
        requires: ['anh-phan-chieu'],
      },
      {
        id: 'd6',
        from: 'them',
        time: '22:04',
        text: '...Anh chị đừng có chụp mũ tôi! Có bằng chứng xác thực thì đưa ra đối chất!',
        requires: ['anh-phan-chieu'],
      },
    ],
  },
  {
    id: 'vy',
    name: 'Vy 402',
    avatar: '🎧',
    sub: 'Hoạt động 2 phút trước',
    preview: 'Em đăng bán xe đỏ cũ từ 3 hôm trước mà…',
    requires: ['mat-xe'],
    messages: [
      { id: 'v1', from: 'them', time: '22:05', text: 'Anh chị ơi, chiếc xe em đăng bán trên Chợ Tốt là chiếc Asama màu đỏ của em từ năm nhất, em đăng từ 3 hôm trước rồi!' },
      { id: 'v2', from: 'them', time: '22:06', text: 'Em đúng là đang túng tiền trọ thật, nhưng chiếc xe em bán có giấy tờ hoá đơn đàng hoàng, không phải xe cô Lan đâu ạ!', clue: 'vy-xe-do' },
      {
        id: 'v3',
        from: 'them',
        time: '22:07',
        text: 'Hồi 21h35 em xuống vứt rác, chỉ thấy một người trùm mũ áo khoác kéo chiếc xe màu xanh mint ra cổng, giỏ có treo túi hoa. Do ngõ tối mất điện nên em không dám nhìn lâu.',
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
    requires: ['mat-xe'],
    messages: [
      { id: 'h1', from: 'them', time: '21:55', text: 'Tôi ngồi quán net từ chập tối tới giờ, khách ra vào chơi game liên tục. Ai nợ tiền ai tôi ghi sổ hết.' },
      {
        id: 'h2',
        from: 'them',
        time: '21:56',
        text: 'Thằng Dũng nó nợ tôi 5 triệu tiền thay đồ xe máy hơn hai tuần nay. Nó hẹn tối nay trước 22h phải trả đủ cho tôi đấy.',
        clue: 'hung-cho-vay',
      },
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
