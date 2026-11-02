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
    preview: 'Cô Lan: Cả nhà ơi cứu tôi với, xe mất rồi!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Cô Lan',
        senderAvatar: '👵',
        time: '21:41',
        text: 'Cả nhà ơi cứu tôi với!! Xe đạp điện Nijia xanh mint của tôi vừa khóa cổ để ngoài sân lúc 21h10, tôi vào nhà uống chén nước quay ra 21h40 đã mất hút rồi! Ai quanh hẻm thấy xe tôi đâu không?!',
        clue: 'mat-xe',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Hùng Net',
        senderAvatar: '🖥️',
        time: '21:42',
        text: 'Ủa cổng hẻm có khoá then cài mà cô? Tầm hơn 9 rưỡi em thấy mở cổng đón người ra vào. Bác Bảy bảo vệ đâu rồi, mở camera hẻm trích xuất xem đứa nào dắt ra chứ!',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Ông Bảy (Bảo vệ)',
        senderAvatar: '🧹',
        time: '21:43',
        text: 'Chết dở tôi rồi chị Lan ơi... Chiều tối nay tôi quét dọn bốt trực, rút phích cắm camera hẻm ra để cắm quạt rồi lú lẫn quên cắm lại mất! Camera hẻm bị ngắt nguồn từ 20h00 tối đến giờ rồi...',
        clue: 'camera-hong',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Cô Lan',
        senderAvatar: '👵',
        time: '21:44',
        text: 'Ối giời đất ơi là giời! Xe con gái tích cóp tiền lương mua tặng cho tôi đi chợ, trong giỏ còn cuốn sổ ghi nợ bán hàng nữa! Tôi vừa đăng ảnh xe lên [bảng tin Facebúc](https://facebuc.vn) nhờ mọi người chia sẻ giùm, ai thấy nó dắt đi đâu xin chỉ giúp tôi với!',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Vy (402)',
        senderAvatar: '🎧',
        time: '21:45',
        text: 'Khổ thân cô Lan quá... Ban nãy tầm 21h35 em xuống sân vứt rác, hình như thấy có bóng người dắt xe xanh mint ra cổng hẻm nhưng em tưởng cô nhờ ai dắt đi sạc điện... À cẩn thận kẻ gian tẩu tán mang bán tháo qua mạng, mọi người thử lướt [Chợ Tốt](https://chotot.vn) xem có tin mới đăng không!',
      },
      {
        id: 'g6',
        from: 'them',
        senderName: 'Hùng Net',
        senderAvatar: '🖥️',
        time: '21:46',
        text: 'Vy mày nói ai thế? Chiều nay bà chủ nhà trọ vừa sang quán tao kể mày nợ 2 tháng tiền phòng bị dọa đuổi kia kìa. Tao còn thấy mày đăng bán xe gì trên mạng ấy!',
      },
      {
        id: 'g7',
        from: 'them',
        senderName: 'Vy (402)',
        senderAvatar: '🎧',
        time: '21:47',
        text: 'Anh Hùng đừng có nói linh tinh! Em túng tiền nên đăng bán lại chiếc xe Asama đỏ cũ của em từ 3 hôm trước rồi, liên quan gì đến xe cô Lan đâu!',
      },
      {
        id: 'g8',
        from: 'them',
        senderName: 'Sơn (Shipper)',
        senderAvatar: '🚴',
        time: '21:48',
        text: 'Đúng đấy, trong xóm tối nay ra vào nườm nượp, lúc nãy tôi thấy thằng Dũng shipper phóng xe máy vội vã lắm, balo cồng kềnh...',
      },
      {
        id: 'g9',
        from: 'them',
        senderName: 'Dũng (Shipper)',
        senderAvatar: '🛵',
        time: '21:49',
        text: 'Anh Sơn đừng có vu khống nhé! Em chạy cuốc cả ngày mệt đứt hơi, về phòng trọ trùm chăn ngủ từ 21h15 đến giờ có biết trời đất gì đâu! Từ lúc 21h20 em thò đầu ra đầu hẻm ngóng gió có thấy ai dắt xe nào ra đâu.',
        clue: 'dung-khai-21h15',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra khu vực',
    preview: 'Chỉ có 3 lượt cáo buộc thôi, thận trọng!',
    requires: ['mat-xe'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:50',
        text: 'Anh nhận được tin báo mất xe ở Hẻm 42 rồi. Vụ này thoạt nhìn khá rối vì mọi người trong ngõ đang nghi kỵ đổ vạ lẫn nhau. Em phụ trách điều tra nhé: chỉ có 3 lượt cáo buộc thôi, phải có chứng cứ vững chắc.',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:51',
        text: 'Quy luật hiện trường: Hẻm 42 là đường cụt. Nếu camera trong ngõ mất tín hiệu từ 20h, thì lối tẩu thoát duy nhất là ngã tư lớn đầu phố. Em hãy liên hệ trích xuất [camera an ninh phường](https://camera-phuong.gov.vn) quanh các góc phố để xem chiếc xe xanh mint rời khỏi hẻm vào thời điểm nào.',
        requires: ['camera-hong'],
      },
      {
        id: 't3',
        from: 'them',
        time: '21:52',
        text: 'Dũng khẳng định về phòng trọ ngủ từ 21h15. Nhưng nếu xe bị dắt đi lúc 21h35 - 21h40, thì lời khai này có thể là alibi ngụy tạo. Các shipper công nghệ đều được giám sát hành trình GPS theo thời gian thực trên [hệ thống GiaoNhanh](https://giaonhanh.vn). Em tra cứu lịch sử đơn hàng của Dũng xem cậu ta thật sự ở đâu lúc đó.',
        requires: ['camera-hong'],
      },
      {
        id: 't4',
        from: 'them',
        time: '22:04',
        text: 'Hay lắm! Đơn hàng GN-88214 lúc 21h47 tại Hẻm 42 đã bóc trần lời nói dối của Dũng! Nhưng còn đối tượng Vy: cô bé này vừa nợ tiền trọ lại vừa rao bán xe trên mạng. Em hãy kiểm tra kỹ tin đăng trên [Chợ Tốt](https://chotot.vn) để xác minh chiếc xe đó có phải tang vật không.',
        requires: ['don-hang-2147'],
      },
      {
        id: 't5',
        from: 'them',
        time: '22:12',
        text: 'Bức ảnh Dũng đăng lúc 21h58 trước cửa tiệm có chi tiết phản chiếu đắt giá. Hãy mở mục hình ảnh hiện trường, dùng kính lúp và đèn UV để soi kỹ vật chứng ẩn trong tấm kính!',
        requires: ['anh-phan-chieu'],
      },
      {
        id: 't6',
        from: 'me',
        time: '22:13',
        text: 'Em đã đối soát toàn bộ chuỗi chứng cứ rồi anh Tùng: định vị đơn hàng GPS, hình ảnh phản chiếu trên kính và bản nháp trong máy Dũng.',
        requires: ['anh-phan-chieu'],
      },
      {
        id: 't7',
        from: 'them',
        time: '22:14',
        text: 'Xuất sắc! Bằng chứng đanh thép không thể chối cãi. Em mở Hồ sơ vụ án, chỉ đích danh thủ phạm để anh cùng đội hình sự tóm gọn ngay!',
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
      { id: 'd1', from: 'them', time: '21:52', text: 'Anh chị điều tra gì em thế? Em thề với anh chị là em chạy xe mệt quá, về phòng trọ trùm chăn ngủ từ 21h15 rồi mà!' },
      { id: 'd2', from: 'them', time: '21:53', text: 'Trong hẻm thiếu gì người khả nghi! Con bé Vy nó nợ tiền trọ 2 tháng kìa, trên mạng nó đang rao bán xe điện ầm ầm sao anh chị không đi bắt nó?' },
      {
        id: 'd3',
        from: 'them',
        time: '22:01',
        text: 'Cái đơn GN-88214 lúc 21h47 trên app GiaoNhanh... là do em ngủ quên, ngón tay vô tình quẹt trúng nút nhận đơn thôi chứ em không có chạy đâu...',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd4',
        from: 'me',
        time: '22:02',
        text: 'Anh Dũng đừng quanh co nữa. Camera an ninh ngã tư ghi rõ xe đạp điện xanh mint chạy qua phố lúc 21h49, người cầm lái chính là anh!',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd5',
        from: 'them',
        time: '22:03',
        text: '...Các người... các người theo dõi tôi đấy à?! Em... em chỉ mượn tạm xe cô Lan để đi giao cho kịp giờ khách thôi mà...',
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
    requires: ['mat-xe'],
    messages: [
      { id: 'v1', from: 'them', time: '22:05', text: 'Anh chị ơi em bị oan thật sự luôn á! Chiếc xe em đăng bán trên Chợ Tốt là chiếc Asama màu đỏ cũ rích của em từ thời năm nhất, em đăng từ 3 hôm trước rồi ạ!' },
      { id: 'v2', from: 'them', time: '22:06', text: 'Em có túng tiền nợ tiền phòng thật, nhưng bố mẹ em dạy đói cho sạch rách cho thơm, em không đời nào trộm đồ của người trong xóm đâu!', clue: 'vy-xe-do' },
      {
        id: 'v3',
        from: 'them',
        time: '22:06',
        text: 'Hồi 21h35 em xuống vứt rác, em thấy rõ ràng anh Dũng dắt chiếc xe Nijia xanh mint của cô Lan ra cổng hẻm. Lúc đó anh ấy đội mũ bảo hiểm trùm kín đầu, em còn chào mà anh ấy giật mình lảng đi không trả lời!',
        clue: 'vy-chung-kien',
        requires: ['don-hang-2147'],
      },
      { id: 'v4', from: 'me', time: '22:07', text: 'Cảm ơn Vy, thông tin của em rất quý giá và hoàn toàn khớp với dữ liệu camera.', requires: ['don-hang-2147'] },
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
      { id: 'sn1', from: 'them', time: '22:08', text: 'Tôi chạy đơn chân chính, anh em shipper với nhau đừng có gài tội tôi! Balo tôi có kìm sắt là vì cái phanh đĩa xe máy tôi bị kẹt chốt, tôi mang theo để nắn lại.' },
      { id: 'sn2', from: 'them', time: '22:09', text: 'Thời điểm 21h44 tôi đang giao đơn trà sữa cho chị Hoa ở tít hẻm 46! Khách đã ký nhận và tôi có chụp ảnh giao hàng lưu trên [hệ thống GiaoNhanh](https://giaonhanh.vn), các anh cứ kiểm tra thoải mái!', clue: 'son-don-hang' },
      { id: 'sn3', from: 'me', time: '22:10', text: 'Biên lai và định vị giao hàng lúc 21h44 xác nhận anh đang ở hẻm 46. Anh không liên quan tới vụ việc.' },
    ],
  },
  {
    id: 'hung',
    name: 'Hùng Net',
    avatar: '🖥️',
    sub: 'Hoạt động 8 phút trước',
    preview: 'Nó nợ tôi 5 triệu, hạn hôm nay.',
    requires: ['mat-xe'],
    messages: [
      { id: 'h1', from: 'them', time: '21:52', text: 'Em nghi thằng Dũng từ đầu rồi! Chiều nay nó bảo em sửa xe máy hết 5 triệu, hẹn tối nay trả nợ để lấy xe. Em thấy tài khoản nó hết nhẵn tiền.' },
      { id: 'h2', from: 'them', time: '21:53', text: 'Nãy em lên hệ thống kiểm tra, thấy nổ cuốc đơn ở ngay ngõ 42 lúc 21h47 do tài xế Dũng nhận, thế mà nó dám mở mồm bảo ngủ từ 21h15!', clue: 'don-hang-2147' },
      {
        id: 'h3',
        from: 'them',
        time: '21:54',
        text: 'Thằng Dũng nhắn cho em: "Tối nay em lo đủ tiền trả anh". Hoá ra nó túng quẫn làm liều đi dắt trộm xe cô Lan để giao hàng kiếm tiền gán nợ!',
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
