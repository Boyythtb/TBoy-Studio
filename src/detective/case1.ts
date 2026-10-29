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
  /** ảnh/hoá đơn đính kèm, chỉ để hiển thị */
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
  x: number // % from left 0..100
  y: number // % from top 0..100
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
    'Xe đạp điện của cô Lan biến mất khỏi sân lúc 21:40. Cả hẻm đang xôn xao trên Zola, nghi ngờ lẫn nhau. Cần đối soát lời khai với dữ liệu định vị, camera và rao vặt để tìm ra chân tướng.',
  culprit: 'dung',
  difficulty: 'Dễ',
  question: 'Ai đã lấy chiếc xe đạp điện của cô Lan?',
  solution:
    'Dũng khai về phòng trọ ngủ từ 21:15, nhưng định vị GPS trên cổng GiaoNhanh (giaonhanh.vn) cho thấy Dũng nhận cuốc GN-88214 lúc 21:47 ngay tại Hẻm 42. Camera ngã tư (camera-phuong.gov.vn) ghi nhận Dũng phóng xe xanh mint qua phố lúc 21:49, và bức ảnh 21:58 ở tiệm điện thoại còn in bóng xe. Vy bị nghi ngờ vì bán xe trên Chợ Tốt (chotot.vn) nhưng thực chất là bán xe Asama đỏ cũ của mình từ 3 hôm trước.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-xe': {
    id: 'mat-xe',
    tag: 'chat',
    title: 'Xe mất lúc 21:40',
    detail:
      'Cô Lan khoá xe trong sân lúc 21:10. Đến 21:40 ra thì cổng mở, xe đã biến mất. Không có tiếng động lạ, không ai nghe thấy gì.',
  },
  'camera-hong': {
    id: 'camera-hong',
    tag: 'chat',
    title: 'Camera hẻm hỏng từ 20:00',
    detail:
      'Ông Bảy quên cắm lại nguồn camera sau khi vệ sinh. Cả đoạn hẻm từ 20:00 đến 22:00 không có hình ảnh trực tiếp trong ngõ.',
  },
  'bill-vien': {
    id: 'bill-vien',
    tag: 'web',
    title: 'Bác Bảy ở hiệu thuốc/viện lúc 21:20',
    detail:
      'Đơn thuốc cấp cứu tại Nhà Thuốc Long Châu chi nhánh Hẻm 42 lúc 21:20 thanh toán tiền thuốc hạ huyết áp cho vợ. Bác Bảy có alibi hoàn hảo.',
  },
  'dung-khai-21h15': {
    id: 'dung-khai-21h15',
    tag: 'chat',
    title: 'Dũng khai về nhà từ 21:15',
    detail:
      'Dũng nói với cả nhóm và nhắn riêng: “Em về từ 21:15, đứng đầu hẻm từ 21:20, không thấy ai dắt xe ra.”',
  },
  'don-hang-2147': {
    id: 'don-hang-2147',
    tag: 'web',
    title: 'Đơn GiaoNhanh lúc 21:47 tại hẻm 42',
    detail:
      'Mã đơn GN-88214 trên giaonhanh.vn: nhận hàng tại Hẻm 42 — Quán net Hùng lúc 21:47, giao hẻm 44, hoàn tất 21:52. Tài xế: Dũng. Vạch trần lời nói dối về phòng ngủ từ 21:15 của Dũng!',
  },
  'vy-xe-do': {
    id: 'vy-xe-do',
    tag: 'web',
    title: 'Vy bán xe Asama đỏ từ 3 hôm trước',
    detail:
      'Tin đăng CT-101 trên Chợ Tốt (chotot.vn): Vy đăng bán xe đạp điện Asama màu đỏ giá 2.5tr từ 3 ngày trước để đóng tiền trọ, không phải chiếc xe Nijia xanh mint của cô Lan bị mất.',
  },
  'anh-phan-chieu': {
    id: 'anh-phan-chieu',
    tag: 'photo',
    title: 'Bóng xe xanh trong ảnh 21:58',
    detail:
      'Ảnh Dũng đăng lúc 21:58 trước cửa hàng điện thoại đã đóng. Trong tấm kính có bóng một chiếc xe đạp điện màu xanh mint — đúng màu xe cô Lan, và có túi vải treo ở yên.',
  },
  'tin-nhan-nhap': {
    id: 'tin-nhan-nhap',
    tag: 'file',
    title: 'Tin nhắn nháp xin trả xe',
    detail:
      'Trong thùng rác: “Cô Lan ơi, mai em trả xe, em thề, đừng nói với ai…” — tin nhắn nháp soạn từ điện thoại Dũng chưa từng được gửi.',
  },
  'vy-chung-kien': {
    id: 'vy-chung-kien',
    tag: 'chat',
    title: 'Vy thấy Dũng dắt xe lúc 21:35',
    detail:
      'Vy kể: khoảng 21:35, cô xuống sân tìm chìa khóa rơi thì thấy Dũng dắt chiếc xe đạp điện màu xanh từ sân nhà cô Lan ra đầu hẻm. Camera ngã tư (camera-phuong.gov.vn) cũng ghi nhận điều này.',
  },
  'hung-cho-vay': {
    id: 'hung-cho-vay',
    tag: 'chat',
    title: 'Dũng nợ Hùng 5 triệu, hạn hôm nay',
    detail:
      'Hùng nhắn: “Hạn chót hôm nay, 5 triệu, đừng để anh gọi mãi.” Dũng trả lời: “Tối nay em lo.” Dũng đang bị dồn vào bước đường cùng vì nợ.',
  },
  'son-don-hang': {
    id: 'son-don-hang',
    tag: 'web',
    title: 'Sơn đang giao đơn ở hẻm 46 lúc 21:44',
    detail:
      'Biên lai GiaoNhanh GN-88212 và camera ghi nhận Sơn giao trà sữa cho chị Hoa ở hẻm 46 lúc 21:44, cách xa hiện trường và không thể lấy xe.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'dung',
    name: 'Dũng',
    role: 'Shipper GiaoNhanh',
    avatar: '🛵',
    note: 'Khai về ngủ từ 21:15. Bị chủ nợ Hùng đòi 5 triệu tiền sửa xe hạn chót đêm nay.',
  },
  {
    id: 'vy',
    name: 'Vy',
    role: 'Sinh viên, phòng 402',
    avatar: '🎧',
    note: 'Nợ tiền trọ 2 tháng, rao bán xe điện trên Chợ Tốt. Có mặt ở sân lúc 21:35.',
  },
  {
    id: 'son',
    name: 'Sơn',
    role: 'Shipper NowFood đối thủ',
    avatar: '🚴',
    note: 'Tranh địa bàn với Dũng. Từng bị thấy dắt xe vào hẻm lúc 21:38 mang theo kìm trong balo.',
  },
  {
    id: 'ong-bay',
    name: 'Ông Bảy',
    role: 'Bảo vệ dân phòng',
    avatar: '🧹',
    note: 'Quản lý camera ngõ nhưng rút phích cắm điện từ 20:00.',
  },
  {
    id: 'hung',
    name: 'Hùng',
    role: 'Chủ quán net Hẻm 42',
    avatar: '🖥️',
    note: 'Chủ nợ của Dũng. Thấy xe phóng qua ngõ lúc 21h30.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group',
    name: 'Tổ dân phố 42',
    avatar: '🏘️',
    isGroup: true,
    sub: '8 thành viên',
    preview: 'Cô Lan: Cả nhà ơi, xe của tôi mất rồi!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Cô Lan',
        senderAvatar: '👵',
        time: '21:41',
        text: 'Cả nhà ơi, xe đạp điện Nijia xanh mint của tôi mất rồi! Khóa cổ trong sân lúc 21:10, vừa ra đã không thấy đâu! Mọi người vào [🌐 Facebúc Cư Dân](https://facebuc.vn) xem có ai thấy xe tôi ở đâu không!',
        clue: 'mat-xe',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Ông Bảy (Bảo vệ)',
        senderAvatar: '🧹',
        time: '21:42',
        text: 'Khổ thân chị Lan, camera hẻm hỏng nguồn từ 20:00 do tôi quên cắm lại sau khi lau dọn. Mọi người thử check [📹 Camera Phường](https://camera-phuong.gov.vn) ở các ngã tư xem!',
        clue: 'camera-hong',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Ông Bảy (Bảo vệ)',
        senderAvatar: '🧹',
        time: '21:43',
        text: 'Tôi vừa ở [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) mua thuốc hạ huyết áp gấp cho bà xã lúc 21:20 có hóa đơn lưu điện tử đàng hoàng!',
        clue: 'bill-vien',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Vy (402)',
        senderAvatar: '🎧',
        time: '21:44',
        text: 'Ủa cô Lan ơi, trên [🛍️ Chợ Tốt](https://chotot.vn) em thấy có tin rao bán xe đạp điện cũ 2tr5 kìa, không biết có phải kẻ trộm đăng bán tẩu tán không ta?',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Hùng Net',
        senderAvatar: '🖥️',
        time: '21:45',
        text: 'Con bé Vy nói lạ, xe cô Lan vừa mất 5 phút sao đăng bán kịp! Mà chiều nay tao thấy con Vy nợ tiền trọ bị bà chủ dọa đuổi, túi áo nó còn có chùm chìa khoá xe điện kìa!',
      },
      {
        id: 'g6',
        from: 'them',
        senderName: 'Dũng (Shipper)',
        senderAvatar: '🛵',
        time: '21:46',
        text: 'Em chạy xong việc mệt quá về phòng trọ ngủ từ 21:15 đến giờ. Đứng đầu hẻm từ 21:20 chẳng thấy ai dắt xe ra cả. Chắc trộm người ngoài rồi!',
        clue: 'dung-khai-21h15',
      },
      {
        id: 'g7',
        from: 'them',
        senderName: 'Hùng Net',
        senderAvatar: '🖥️',
        time: '21:47',
        text: 'Thằng Dũng mày nói láo! Tao vừa thấy hệ thống [⚡ Cổng GiaoNhanh](https://giaonhanh.vn) nổ đơn GN-88214 tài xế Dũng nhận hàng tại quán net tao lúc 21:47, mày bảo mày ở phòng từ 21:15 là sao hả?',
        clue: 'don-hang-2147',
      },
      {
        id: 'g8',
        from: 'them',
        senderName: 'Cô Lan',
        senderAvatar: '👵',
        time: '21:48',
        text: 'Trong giỏ xe có cuốn sổ nợ buôn bán của tôi nữa! Cả nhà giúp tôi với!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra khu vực',
    preview: 'Sai ba lần là anh tự làm đấy.',
    requires: ['mat-xe'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:50',
        text: 'Anh nghe vụ mất xe rồi. Ba lần cáo buộc thôi nhé: sai ba lần là anh trực tiếp lập biên bản đấy 😏',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:51',
        text: 'Có nhiều nghi phạm đáng ngờ đấy: Con bé Vy nợ tiền trọ lại vừa rao bán xe trên [🛍️ Chợ Tốt](https://chotot.vn); thằng Sơn shipper mang kìm vào ngõ; còn thằng Dũng thì bảo về ngủ từ 21:15.',
      },
      {
        id: 't3',
        from: 'them',
        time: '21:52',
        text: 'Em mở [⚡ GiaoNhanh](https://giaonhanh.vn) và [📹 Camera Phường](https://camera-phuong.gov.vn) để đối soát định vị GPS và hình ảnh ngã tư xem ai mới thực sự đang lái chiếc xe xanh mint!',
        requires: ['camera-hong'],
      },
      {
        id: 't4',
        from: 'them',
        time: '22:04',
        text: 'Em cũng vào [🛍️ Chợ Tốt](https://chotot.vn) đọc kỹ chiếc xe Vy đăng bán là màu gì, kẻo kết tội oan cho người ta.',
        requires: ['don-hang-2147'],
      },
      {
        id: 't5',
        from: 'them',
        time: '22:12',
        text: 'Bức ảnh selfie trước tiệm điện thoại lúc 21:58 có tấm kính phản chiếu. Soi kỹ vật chứng trong đó!',
        requires: ['anh-phan-chieu'],
      },
      {
        id: 't6',
        from: 'me',
        time: '22:13',
        text: 'Em đã đối soát toàn bộ bằng chứng rồi anh Tùng, thủ phạm không thể chối cãi.',
        requires: ['anh-phan-chieu'],
      },
      {
        id: 't7',
        from: 'them',
        time: '22:14',
        text: 'Tốt! Mở sổ vụ án ra chỉ đích danh thủ phạm đi. Đừng để manh mối giả đánh lừa!',
        requires: ['anh-phan-chieu'],
      },
    ],
  },
  {
    id: 'dung',
    name: 'Dũng Ship',
    avatar: '🛵',
    sub: 'Hoạt động 5 phút trước',
    preview: 'Em về từ 21h15 rồi mà.',
    requires: ['mat-xe'],
    messages: [
      { id: 'd1', from: 'them', time: '21:52', text: 'Anh/chị đừng nghe ông Hùng vu oan. Em về ngủ từ 21h15 rồi mà!' },
      { id: 'd2', from: 'them', time: '21:53', text: 'Con bé Vy nó nợ tiền trọ 2 tháng kìa, trên [🛍️ Chợ Tốt](https://chotot.vn) nó rao bán xe điện ầm ầm sao không ai bắt nó?' },
      {
        id: 'd3',
        from: 'them',
        time: '22:01',
        text: 'Đơn GN-88214 lúc 21:47 trên [⚡ GiaoNhanh](https://giaonhanh.vn) là em bấm nhầm nhận cuốc chứ em không có chạy...',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd4',
        from: 'me',
        time: '22:02',
        text: 'Nhưng trên [📹 Camera Phường](https://camera-phuong.gov.vn) ghi rõ xe đạp điện xanh mint chạy qua ngã tư lúc 21:49 do anh cầm lái!',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd5',
        from: 'them',
        time: '22:03',
        text: '...Anh chị đừng ép người quá đáng! Em... em bận đi ship hàng rồi!',
        requires: ['don-hang-2147'],
      },
    ],
  },
  {
    id: 'vy',
    name: 'Vy 402',
    avatar: '🎧',
    sub: 'Hoạt động 2 phút trước',
    preview: 'Em bị oan thật mà anh chị ơi…',
    requires: ['don-hang-2147'],
    messages: [
      { id: 'v1', from: 'them', time: '22:05', text: 'Anh chị ơi em bị oan! Chiếc xe em đăng bán trên [🛍️ Chợ Tốt](https://chotot.vn) là xe Asama đỏ cũ của em đăng từ 3 ngày trước rồi ạ!' },
      { id: 'v2', from: 'them', time: '22:06', text: 'Em có nợ tiền trọ thật, nhưng em không bao giờ trộm đồ của cô Lan!', clue: 'vy-xe-do' },
      {
        id: 'v3',
        from: 'them',
        time: '22:06',
        text: 'Lúc 21:35 em xuống sân vứt rác, chính mắt em thấy anh Dũng dắt xe màu xanh mint của cô Lan ra cổng hẻm! Em tưởng cô Lan nhờ ảnh dắt đi sạc điện!',
        clue: 'vy-chung-kien',
      },
      { id: 'v4', from: 'me', time: '22:07', text: 'Cảm ơn Vy, thông tin của em hoàn toàn khớp với camera đầu ngõ.' },
    ],
  },
  {
    id: 'son',
    name: 'Sơn Ship',
    avatar: '🚴',
    sub: 'Hoạt động 4 phút trước',
    preview: 'Tôi có cuốc giao trà sữa hẻm 46.',
    requires: ['mat-xe'],
    messages: [
      { id: 'sn1', from: 'them', time: '22:08', text: 'Tôi có mang kìm cắt dây xích trong balo vì xe máy tôi bị kẹt phanh. Nhưng lúc 21:44 tôi đang giao đơn GN-88212 cho chị Hoa ở hẻm 46!' },
      { id: 'sn2', from: 'them', time: '22:09', text: 'Anh chị vào [⚡ Cổng GiaoNhanh](https://giaonhanh.vn) và [📹 Camera Phường](https://camera-phuong.gov.vn) kiểm tra là thấy ngay biên lai và ảnh tôi chụp giao hàng lúc 21:44!', clue: 'son-don-hang' },
      { id: 'sn3', from: 'me', time: '22:10', text: 'Đúng rồi, anh đã có chứng cứ ngoại phạm xác thực.' },
    ],
  },
  {
    id: 'hung',
    name: 'Hùng Net',
    avatar: '🖥️',
    sub: 'Hoạt động 8 phút trước',
    preview: 'Nó nợ tôi 5 triệu, hạn hôm nay.',
    requires: ['don-hang-2147'],
    messages: [
      { id: 'h1', from: 'them', time: '22:02', text: 'Thằng Dũng nợ tôi 5 triệu tiền sửa xe hạn chót hôm nay. Trên [🏦 VietinBank](https://vietinbank.vn) nó chuyển khoản bị lỗi vì tài khoản nó hết nhẵn tiền!' },
      {
        id: 'h2',
        from: 'them',
        time: '22:02',
        text: 'Nó nhắn tôi: “Tối nay em lo đủ trả anh”. Hoá ra nó đi trộm xe cô Lan để mang đi bán gán nợ!',
        clue: 'hung-cho-vay',
      },
    ],
  },
]

export const ORDERS: Order[] = [
  {
    id: 'GN-88214',
    time: '21:47',
    pickup: 'Hẻm 42 — Quán net Hùng',
    drop: 'Hẻm 44',
    fee: '28.000đ',
    status: 'Hoàn tất 21:52',
    clue: 'don-hang-2147',
  },
  {
    id: 'GN-88212',
    time: '21:44',
    pickup: 'Trà Sữa Hẻm 46',
    drop: 'Hẻm 46 (Giao chị Hoa)',
    fee: '25.000đ',
    status: 'Hoàn tất 21:44',
    clue: 'son-don-hang',
  },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Cửa hàng điện thoại đóng cửa',
    time: '21:58',
    scene: 'street',
    img: 'detective/hien-truong-2158.jpg',
    caption: 'Ảnh Dũng đăng lúc 21:58 trước cửa hàng điện thoại.',
    clue: 'anh-phan-chieu',
    hotspots: [
      {
        x: 68,
        y: 45,
        label: 'Tấm kính cửa hàng',
        hint: 'Quan sát bóng phản chiếu trong tấm kính lớn',
        clue: 'anh-phan-chieu',
        detail:
          'Trong tấm kính phản chiếu rõ chiếc xe đạp điện màu xanh mint có gắn túi vải treo ở yên — chính là chiếc xe của cô Lan!',
      },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 'tr1',
    name: 'tin-nhan-nhap.txt',
    kind: 'Ghi chú nháp',
    preview: 'Cô Lan ơi, mai em trả xe…',
    detail: '“Cô Lan ơi, mai em trả xe, em thề, đừng nói với ai…” — Bản nháp trong điện thoại Dũng chưa kịp gửi.',
    clue: 'tin-nhan-nhap',
  },
  {
    id: 'tr2',
    name: 'bien-lai-sua-xe.jpg',
    kind: 'Ảnh chụp',
    preview: 'Biên lai sửa xe tiệm anh Hùng',
    detail: 'Biên lai ghi nợ 5.000.000đ của tài xế Dũng tại tiệm Hùng Sửa Xe, hạn chót ngày 12/9.',
    clue: 'hung-cho-vay',
  },
]
