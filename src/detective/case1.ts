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
  /** ảnh riêng của vụ án */
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
    'Xe đạp điện của cô Lan biến mất khỏi sân lúc 21:40. Cả hẻm đang họp khẩn trên Zola. Còn anh Tùng thì nhắn riêng: sai ba lần là ảnh tự làm.',
  culprit: 'dung',
  difficulty: 'Dễ',
  question: 'Ai đã lấy chiếc xe đạp điện?',
  solution:
    'Dũng nhận đơn giao hàng vào đúng 21:47 ở Hẻm 42, khai gian là về từ 21:15. Bức ảnh 21:58 có bóng chiếc xe xanh mint, còn tin nhắn nháp “mai em trả” nằm trong thùng rác. Anh Tùng đã có đủ để lập biên bản.',
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
      'Ông Bảy quên cắm lại nguồn camera sau khi vệ sinh. Cả đoạn hẻm từ 20:00 đến 22:00 không có hình ảnh.',
  },
  'bill-vien': {
    id: 'bill-vien',
    tag: 'chat',
    title: 'Ông Bảy ở bệnh viện lúc 21:20',
    detail:
      'Hoá đơn Bệnh viện Đa khoa lúc 21:20, tên vợ ông Bảy. Ông Bảy có mặt ở viện đúng lúc xe mất — không thể ở hẻm.',
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
      'Mã đơn GN-88214: nhận hàng tại Hẻm 42 — Quán net Hùng lúc 21:47, giao hẻm 44, hoàn tất 21:52. Tài xế: Dũng. Nếu Dũng về nhà từ 21:15 thì đơn này do ai chạy?',
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
      'Trong thùng rác: “Cô Lan ơi, mai em trả xe, em thề, đừng nói với ai…” — chưa từng được gửi.',
  },
  'vy-chung-kien': {
    id: 'vy-chung-kien',
    tag: 'chat',
    title: 'Vy thấy Dũng dắt xe',
    detail:
      'Vy kể: khoảng 21:35, cô thấy Dũng dắt chiếc xe đạp điện màu xanh từ sân nhà cô Lan ra đầu hẻm. Cô tưởng cô Lan nhờ Dũng sửa xe.',
  },
  'hung-cho-vay': {
    id: 'hung-cho-vay',
    tag: 'chat',
    title: 'Dũng nợ Hùng 5 triệu, hạn hôm nay',
    detail:
      'Hùng nhắn: “Hạn chót hôm nay, 5 triệu, đừng để anh gọi mãi.” Dũng trả lời: “Tối nay em lo.”',
  },
  'dang-bai-an-danh': {
    id: 'dang-bai-an-danh',
    tag: 'web',
    title: 'Bài tố cáo từ tài khoản của Dũng',
    detail:
      '22:10, bài đăng trên diễn đàn hẻm: “Nhà có cam thì đưa, đừng để tôi nói tên.” Tài khoản “d.ship.42” trùng tên đăng nhập GiaoNhanh của Dũng.',
  },
  'son-xuat-hien': {
    id: 'son-xuat-hien',
    tag: 'photo',
    title: 'Sơn dắt xe vào hẻm lúc 21:38',
    detail:
      'Camera nhà đối diện ghi cảnh Sơn — shipper cùng hãng với Dũng — dắt một chiếc xe đạp thường vào hẻm 42 lúc 21:38, mắt nhìn về phía sân cô Lan.',
  },
  'son-don-hang': {
    id: 'son-don-hang',
    tag: 'chat',
    title: 'Sơn đang giao đơn 2152 lúc 21:44',
    detail:
      'Biên lai GiaoNhanh: đơn 2152 giao cho chị Hoa ở hẻm 46 lúc 21:44, có ảnh xác nhận mặt Sơn. Cách hẻm 42 hai con hẻm, không thể có mặt đúng lúc xe biến mất.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'dung',
    name: 'Dũng',
    role: 'Shipper GiaoNhanh',
    avatar: '🛵',
    note: 'Nói về nhà từ 21:15. Hôm nay là hạn trả 5 triệu cho Hùng.',
  },
  {
    id: 'vy',
    name: 'Vy',
    role: 'Sinh viên, phòng 402',
    avatar: '🎧',
    note: 'Nợ tiền trọ hai tháng. Hay mượn xe cô Lan đi chợ.',
  },
  {
    id: 'ong-bay',
    name: 'Ông Bảy',
    role: 'Bảo vệ hẻm',
    avatar: '🧹',
    note: 'Trực ca tối. Camera hẻm hỏng từ 20:00.',
  },
  {
    id: 'hung',
    name: 'Hùng',
    role: 'Chủ quán net',
    avatar: '🖥️',
    note: 'Cho Dũng vay tiền. Tối nay ngồi quán tới 22:30.',
  },
  { id: 'son', name: 'Sơn', role: 'Shipper cùng hãng', avatar: '🛵', note: 'Tranh đơn với Dũng. Camera thấy dắt xe vào hẻm 42 lúc 21:38.' },
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
        text: 'Cả nhà ơi, xe đạp điện của tôi mất rồi! Tôi khoá trong sân, vừa ra đã không thấy.',
        clue: 'mat-xe',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Ông Bảy (Bảo vệ)',
        senderAvatar: '🧹',
        time: '21:42',
        text: 'Tôi vừa đi một vòng hẻm, không thấy. Camera hẻm hỏng từ 8h tối, tôi quên cắm lại nguồn.',
        clue: 'camera-hong',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Ông Bảy (Bảo vệ)',
        senderAvatar: '🧹',
        time: '21:43',
        text: 'Tôi đang ở viện với vợ, 21:20 mới vào. Đây là hoá đơn, mọi người xem.',
        card: { title: 'Hoa-don-benh-vien.pdf', sub: '21:20 · Bệnh viện Đa khoa', icon: '🧾' },
        clue: 'bill-vien',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Cô Lan',
        senderAvatar: '👵',
        time: '21:44',
        text: 'Lúc 9h tôi còn thấy xe trong sân. Xe màu xanh mint, có túi vải treo ở yên.',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Vy (402)',
        senderAvatar: '🎧',
        time: '21:45',
        text: 'Con vừa đi học về, có thấy ai đâu cô ơi.',
      },
      {
        id: 'g6',
        from: 'them',
        senderName: 'Dũng (Shipper)',
        senderAvatar: '🛵',
        time: '21:46',
        text: 'Em đứng đầu hẻm từ 21:20, không thấy ai dắt xe ra. Chắc ai đó đi đường khác.',
        clue: 'dung-khai-21h15',
      },
      {
        id: 'g7',
        from: 'them',
        senderName: 'Cô Lan',
        senderAvatar: '👵',
        time: '21:47',
        text: 'Trong túi treo ở yên có sổ ghi nợ của tôi. Không có sổ thì coi như mất trắng…',
      },
      { id: 'g8', from: 'me', time: '21:48', text: 'Cô bình tĩnh, con xem giúp cô.' },
      {
        id: 'g9',
        from: 'them',
        senderName: 'Cô Lan',
        senderAvatar: '👵',
        time: '21:49',
        text: 'Trông cậy cả vào cháu đấy! Tìm được cô hậu tạ chu đáo.',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Vừa mới truy cập',
    preview: 'Sai ba lần là anh tự làm đấy.',
    requires: ['mat-xe'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:50',
        text: 'Anh nghe rồi. Ba lần thôi nhé: sai ba lần là anh tự làm, và anh sẽ kể chuyện này ở cơ quan đấy 😏',
      },
      { id: 't2', from: 'me', time: '21:51', text: 'Vâng, ba lần.' },
      {
        id: 't3',
        from: 'them',
        time: '21:52',
        text: 'Bắt đầu từ thứ không biết nói dối: đơn hàng, ảnh, thùng rác. Đừng tin lời khai.',
      },
      {
        id: 't4',
        from: 'them',
        time: '21:58',
        text: 'Camera hỏng rồi. Vậy thì đơn giao hàng nói thay camera.',
        requires: ['camera-hong'],
      },
      {
        id: 't5',
        from: 'them',
        time: '22:04',
        text: 'Ai đó đang rất muốn cả hẻm tin rằng xe bị người ngoài lấy. Đọc kỹ bài đăng đi.',
        requires: ['don-hang-2147'],
      },
      {
        id: 't6',
        from: 'them',
        time: '22:12',
        text: 'Có người thấy gì đó nhưng chưa dám nói. Ảnh chụp đôi khi giữ được thứ mắt người ta bỏ qua.',
        requires: ['anh-phan-chieu'],
      },
      {
        id: 't7',
        from: 'me',
        time: '22:13',
        text: 'Em đã thu thập đủ bằng chứng rồi anh Tùng.',
        requires: ['anh-phan-chieu'],
      },
      {
        id: 't8',
        from: 'them',
        time: '22:14',
        text: 'Tốt! Mở sổ vụ án ra chỉ đích danh thủ phạm đi. Đừng đoán mò đấy nhé.',
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
      { id: 'd1', from: 'them', time: '21:52', text: 'Anh/chị đừng nghe nhóm chat. Em về từ 21h15 rồi, có mặt ở nhà.' },
      { id: 'd2', from: 'them', time: '21:53', text: 'Xe cô Lan cũ lắm rồi, ai lấy làm gì.' },
      {
        id: 'd3',
        from: 'them',
        time: '22:01',
        text: 'Đơn 21:47 là đơn khác, em nhận ở đầu hẻm thôi, không vào trong sân.',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd4',
        from: 'them',
        time: '22:03',
        text: 'Mà sao anh/chị biết đơn của em? Nghe ai nói?',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd5',
        from: 'me',
        time: '22:04',
        text: 'Lịch sử giao hàng và camera đều lưu dữ liệu cả đấy.',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd6',
        from: 'them',
        time: '22:05',
        text: '...Thôi em bận giao hàng tiếp rồi, không rảnh đôi co với anh/chị!',
        requires: ['don-hang-2147'],
      },
    ],
  },
  {
    id: 'vy',
    name: 'Vy 402',
    avatar: '🎧',
    sub: 'Hoạt động 2 phút trước',
    preview: 'Em không muốn gây chuyện…',
    requires: ['anh-phan-chieu'],
    messages: [
      { id: 'v1', from: 'them', time: '22:05', text: 'Em không muốn gây chuyện, nhưng em thấy cái này kỳ lắm.' },
      { id: 'v2', from: 'them', time: '22:06', text: 'Khoảng 21:35, em thấy anh Dũng dắt xe xanh từ sân cô Lan ra đầu hẻm.' },
      {
        id: 'v3',
        from: 'them',
        time: '22:06',
        text: 'Em tưởng cô Lan nhờ ảnh sửa xe. Nhưng nếu cô nói xe bị mất thì… em sợ.',
        clue: 'vy-chung-kien',
      },
      { id: 'v4', from: 'me', time: '22:07', text: 'Em đừng lo, cứ kể thật.' },
      { id: 'v5', from: 'them', time: '22:08', text: 'Dạ, em chỉ biết có thế thôi. Có gì anh/chị giữ kín giùm em nha, em sợ bị trả thù lắm...' },
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
      { id: 'h1', from: 'them', time: '22:02', text: 'Nó nợ tôi 5 triệu, hạn chót hôm nay. Tôi nhắn mấy lần rồi.' },
      {
        id: 'h2',
        from: 'them',
        time: '22:02',
        text: '“Hạn chót hôm nay, 5 triệu, đừng để anh gọi mãi.” Nó trả lời: “Tối nay em lo.”',
        clue: 'hung-cho-vay',
      },
      { id: 'h3', from: 'them', time: '22:03', text: 'Tối nay nó nhận đơn quanh hẻm mình, tôi thấy nó chạy qua quán lúc 9h rưỡi.' },
      { id: 'h4', from: 'me', time: '22:04', text: 'Anh nhớ chính xác không?' },
      { id: 'h5', from: 'them', time: '22:05', text: 'Chính xác 100%! Tôi còn ngó ra vẫy tay gọi nó cơ mà, làm sao nhầm được mặt nó.' },
    ],
  },
  {
    id: 'son',
    name: 'Sơn Ship',
    avatar: '🛵',
    sub: 'Hoạt động 4 phút trước',
    preview: 'Tôi vào hẻm trả hàng cho khách.',
    requires: ['mat-xe'],
    messages: [
      { id: 'sn1', from: 'them', time: '22:08', text: 'Tôi có vào hẻm 42 lúc 21:38, nhưng là trả hàng cho nhà số 12. Xe tôi dắt theo vì hết xăng.', clue: 'son-xuat-hien' },
      { id: 'sn2', from: 'them', time: '22:09', text: '21:44 tôi còn giao đơn 2152 ở hẻm 46, có ảnh xác nhận. Cách đó hai con hẻm.', clue: 'son-don-hang' },
      { id: 'sn3', from: 'them', time: '22:10', text: 'Tôi với Dũng tranh đơn thật, nhưng tôi không lấy xe. Anh xem ảnh giao hàng đi.' },
      { id: 'sn4', from: 'me', time: '22:11', text: 'Được rồi, tôi đã đối chiếu đơn 2152 của anh.' },
      { id: 'sn5', from: 'them', time: '22:12', text: 'Cảm ơn anh. Người ngay thẳng sợ gì kiểm tra, mong anh sớm tìm ra kẻ cắp thật sự.' },
    ],
  },
]

export const ORDERS: Order[] = [
  {
    id: 'GN-88214',
    time: '21:47',
    pickup: 'Hẻm 42 — Quán net Hùng',
    drop: 'Hẻm 44',
    fee: '18.000đ',
    status: 'Hoàn tất 21:52',
    clue: 'don-hang-2147',
  },
  {
    id: 'GN-88190',
    time: '20:58',
    pickup: 'Chợ Hàng Chai',
    drop: 'Hẻm 42 — phòng 402',
    fee: '15.000đ',
    status: 'Hoàn tất 21:06',
  },
  {
    id: 'GN-88171',
    time: '20:12',
    pickup: 'Trà sữa Mơ',
    drop: 'Hẻm 42 — phòng 402',
    fee: '12.000đ',
    status: 'Hoàn tất 20:19',
  },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Cửa hàng điện thoại đóng cửa',
    time: '21:58',
    scene: 'street',
    img: 'detective/hien-truong-2158.jpg',
    caption: '“Hết đơn, về thôi.”',
    clue: 'anh-phan-chieu',
    hotspots: [
      {
        x: 65,
        y: 45,
        label: 'Mặt kính phản chiếu',
        hint: 'Soi kỹ hình ảnh phản chiếu trên kính cửa cuốn',
        clue: 'anh-phan-chieu',
        detail: 'Phóng to mặt kính cửa hàng: Thấy rõ bóng phản chiếu của chiếc xe đạp điện màu xanh mint của cô Lan đang được một nam thanh niên mặc áo shipper dắt qua ngõ lúc 21:58!',
      },
    ],
  },
  {
    id: 'p2',
    title: 'Trà sữa Mơ',
    time: '20:12',
    scene: 'tea',
    img: 'detective/tra-sua.jpg',
    caption: '“Khách quen gọi 2 ly.”',
    hotspots: [
      {
        x: 48,
        y: 52,
        label: 'Quầy pha chế',
        hint: 'Hóa đơn và camera quán trà sữa',
        detail: 'Đơn hàng 2 ly trà sữa hoàn tất lúc 20:19. Thời điểm này xe của cô Lan vẫn còn dựng an toàn trong sân.',
      },
    ],
  },
  {
    id: 'p3',
    title: 'Quán net lúc tan ca',
    time: '21:30',
    scene: 'net',
    img: 'detective/quan-net.jpg',
    caption: '“Ông chủ vẫn ngồi đó.”',
    hotspots: [
      {
        x: 55,
        y: 40,
        label: 'Màn hình máy chủ',
        hint: 'Camera quán net hướng ra hẻm',
        detail: 'Quán net mở cửa đến khuya. Camera quán net ghi nhận đoạn hẻm trước lúc mất điện khá vắng vẻ.',
      },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 'tr1',
    name: 'nhap-tin-nhan.txt',
    kind: 'Ghi chú',
    preview: 'Cô Lan ơi, mai em trả xe, em thề…',
    detail:
      '“Cô Lan ơi, mai em trả xe, em thề, đừng nói với ai. Em chỉ mượn một hôm, em đang cần tiền gấp.”\n\nTrạng thái: chưa gửi. Đã xoá lúc 22:07.',
    clue: 'tin-nhan-nhap',
  },
  {
    id: 'tr2',
    name: 'anh-xe-cu.jpg',
    kind: 'Hình ảnh',
    preview: 'Xe đạp điện màu xanh mint, túi vải ở yên',
    detail:
      'Ảnh chụp từ tháng trước: chiếc xe đạp điện màu xanh mint của cô Lan, túi vải treo ở yên. Không có gì mới.',
  },
  {
    id: 'tr3',
    name: 'ghi-chu-hop-to.txt',
    kind: 'Ghi chú',
    preview: '5tr — hạn 12/9 — H.',
    detail: '“5tr — hạn 12/9 — H.”\n\nMột dòng ghi nợ rất ngắn. Chữ “H.” nhiều khả năng là Hùng.',
  },
]
