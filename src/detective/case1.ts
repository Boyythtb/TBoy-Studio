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
    'Dũng tạo chứng cứ ngoại phạm giả kiểu Conan bằng cách để điện thoại chính ở phòng 203 kết nối Wi-Fi, bật tin nhắn trả lời tự động và phát radio lặp lại để chứng minh mình ở phòng từ 21:15. Tuy nhiên, khi lẻn ra dắt trộm xe cô Lan lúc ngõ mất điện, chiếc điện thoại phụ trong túi Dũng đã vô tình kích hoạt cơ chế Auto-Dispatch nhận cuốc GN-88214 lúc 21:47 ngay đầu Hẻm 42 với tọa độ GPS thực tế ngoài đường. Camera CAM-102 lúc 21:49 và ảnh phản chiếu tấm kính 88 phố Hàng Chai lúc 21:58 đã chụp trọn bóng xe và máy phụ trên tay lái. Bản nháp tin nhắn trong thùng rác xác nhận áp lực phải trả 5 triệu tiền nợ phụ tùng cho Hùng trước 22:00.',
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
    title: 'Chứng cứ ngoại phạm của Dũng: Wi-Fi phòng 203 & tin nhắn tự động',
    detail:
      'Dũng khẳng định trước nhóm cư dân: “Em chạy cuốc cả ngày mệt đứt hơi, về phòng trọ trùm chăn ngủ từ 21h15 đến giờ không bước chân ra ngoài.”',
  },
  'don-hang-2147': {
    id: 'don-hang-2147',
    tag: 'web',
    title: 'Cơ chế Auto-Dispatch GiaoNhanh: GPS máy phụ lúc 21:47 tại ngã tư',
    detail:
      'Máy chủ GiaoNhanh bóc trần thủ thuật Conan: Dũng để máy chính ở phòng tạo ngoại phạm giả, nhưng mang smartphone phụ bên người. Khi dắt xe qua ngã tư lúc 21:47, máy phụ tự động nhận cuốc GN-88214 ghi lại tọa độ GPS ngoài đường!',
  },
  'vy-xe-do': {
    id: 'vy-xe-do',
    tag: 'web',
    title: 'Tin đăng Chợ Tốt CT-101: Vy rao bán xe đạp điện Asama đỏ cũ giá 2.500.000đ',
    detail:
      'Tin đăng CT-101 trên Chợ Tốt cho thấy Vy rao bán chiếc xe Asama màu đỏ cũ của mình từ 18:02 ngày 09/9 (3 ngày trước) để đóng tiền trọ, không liên quan xe cô Lan.',
  },
  'anh-phan-chieu': {
    id: 'anh-phan-chieu',
    tag: 'photo',
    title: 'Hình ảnh Story phố Hàng Chai: Tấm kính cửa hàng 88 phản chiếu bóng xe lúc 21:58',
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
      'Sổ nợ tiệm Hùng Motor: Mã tài xế #SH-4209 nợ 5.000.000đ thay phụ tùng xe máy, cam kết hạn chót thanh toán trước 22:00 đêm 12/9 nếu không sẽ bị siết xe. Mã #SH-4209 khớp với mã shipper của Dũng!',
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
    note: 'Có chứng cứ ngoại phạm vững chắc: Điện thoại chính kết nối Wi-Fi phòng 203 liên tục từ 21:14 đến 22:20, tin nhắn Zola phản hồi tự động "Tôi sốt đang ngủ sớm" và radio trong phòng phát đều đặn.',
  },
  {
    id: 'vy',
    name: 'Vy',
    role: 'Sinh viên · Phòng 402',
    avatar: '🎧',
    note: 'Nợ tiền phòng trọ 2 tháng, bị hàng xóm nhìn thấy lén lút dắt xe ra cổng lúc 21:35 trong lúc ngõ mất điện, lại đang rao bán xe điện trên Chợ Tốt.',
  },
  {
    id: 'son',
    name: 'Sơn',
    role: 'Shipper đối thủ · Hẻm 46',
    avatar: '🚴',
    note: 'Shipper NowFood đối thủ ở hẻm 46, từng xô xát tranh địa bàn với shipper hẻm 42, camera ngõ 46 ghi nhận lảng vảng quanh khu vực lúc mất điện.',
  },
  {
    id: 'ong-bay',
    name: 'Ông Bảy',
    role: 'Bảo vệ dân phòng hẻm 42',
    avatar: '🧹',
    note: 'Quản lý bốt trực đầu ngõ, phụ trách an ninh và giám sát người ra vào hẻm.',
  },
  {
    id: 'hoang',
    name: 'Bác Hoàng Tổ Trưởng',
    role: 'Trưởng ban Dân phố · Nhà số 12',
    avatar: '👴',
    note: 'Thường xuyên đi tuần nhắc nhở trật tự hẻm. Từng cãi nhau gay gắt với cô Lan về việc để xe bừa bãi chắn lối đi chung sân.',
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
      {
        id: 'g12',
        from: 'them',
        senderName: 'Bác Hoàng Tổ Trưởng',
        senderAvatar: '👴',
        time: '21:54',
        text: 'Tôi đã nhắc cô Lan bao nhiêu lần rồi! Xe để chình ình giữa sân chung chắn hết lối đi! Tối nay lúc 21h25 tôi đi kiểm tra ngõ còn thấy thằng Dũng đứng thập thò nghe điện thoại ở góc bốt điện, mặt mũi hốt hoảng!',
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
        text: 'Em đang tổng hợp lại các mốc thời gian và hình ảnh camera thu thập được từ ngã tư.',
        requires: ['anh-phan-chieu'],
      },
      {
        id: 't6',
        from: 'them',
        time: '22:14',
        text: 'Tốt lắm, khi đã có đủ căn cứ về thời gian và vật chứng, em hãy mở Hồ sơ vụ án để tiến hành lập biên bản kết luận.',
        requires: ['anh-phan-chieu'],
      },
    ],
  },
  {
    id: 'dung',
    name: 'Dũng Ship',
    avatar: '🛵',
    sub: 'Hoạt động 2 phút trước',
    preview: 'Em có Wi-Fi và tin nhắn tự động ở phòng từ 21h15 mà...',
    requires: ['dung-khai-21h15'],
    messages: [
      { id: 'd1', from: 'them', time: '21:52', text: 'Anh chị kiểm tra Wi-Fi phòng 203 với tin nhắn tự động của em là rõ! Em sốt nằm trùm chăn bật radio từ 21h15 đến giờ, có cả tin nhắn trả lời lúc 21h35 làm chứng. Nghi ngờ gì em? Con Vy với thằng Sơn kìa!' },
      { id: 'd2', from: 'them', time: '21:53', text: 'Con bé Vy nó nợ tiền phòng trọ mấy tháng nay kìa, trên mạng nó đang rao bán xe điện trên [Chợ Tốt](https://chotot.vn) ầm ầm sao anh chị không sang kiểm tra nó?' },
      {
        id: 'd3',
        from: 'me',
        time: '22:01',
        text: 'Theo nhật ký vận hành ứng dụng GiaoNhanh, tài khoản của anh có nhận đơn hàng lúc 21h47 tại khu vực hẻm 42. Anh có thể nói rõ hơn về việc này không?',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd4',
        from: 'them',
        time: '22:02',
        text: 'Ủa... máy phụ em để trong túi quần vô tình bật định vị tự nhận đơn... ơ... em tưởng chỉ cần để máy chính ở phòng là không ai biết... Sao anh chị lại tìm ra được?!',
        requires: ['don-hang-2147'],
      },
      {
        id: 'd5',
        from: 'me',
        time: '22:03',
        text: 'Cửa hàng điện thoại 88 trên phố Hàng Chai có hệ thống camera và cửa kính lớn. Anh có ghé qua đó trong khoảng từ 21h50 đến 22h00 không?',
        requires: ['anh-phan-chieu'],
      },
      {
        id: 'd6',
        from: 'them',
        time: '22:04',
        text: 'Tối nay em chỉ tạt qua mua thẻ cào điện thoại rồi đi bộ về phòng trọ! Ai qua phố đấy chả lọt vào gương kính! Các anh không có bằng chứng thì đừng có chụp mũ vu khống người lao động khi chưa có kết luận của cơ quan công an!',
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
  {
    id: 'hoang',
    name: 'Bác Hoàng Tổ Trưởng',
    avatar: '👴',
    sub: 'Tổ trưởng dân phố',
    preview: 'Tôi đi tuần từ 21h15 đến 21h30…',
    requires: ['mat-xe'],
    messages: [
      {
        id: 'bg1',
        from: 'them',
        time: '22:12',
        text: 'Này cháu điều tra viên, tôi là cán bộ hưu trí gương mẫu! Việc tôi nhắc nhở cô Lan là vì trật tự chung chứ tôi thèm gì cái xe đạp cỏ ấy! Nhà tôi đi xe SH xịn đỗ trong gara!',
      },
      {
        id: 'bg2',
        from: 'them',
        time: '22:13',
        text: 'Lúc 21h25 tôi qua đầu ngõ thấy thằng Dũng đứng nghe điện thoại rất gay gắt, nó bảo người bên kia "đợi tí em kiếm đủ 5 triệu trả ngay trong đêm nay" rồi chạy vụt về phòng trọ!',
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
    name: 'hoa_don_sua_xe_asama_vy.pdf',
    kind: 'Hóa đơn sửa xe điện',
    preview: 'Thay bình ắc quy và săm lốp xe điện Asama đỏ…',
    detail: 'Hóa đơn dịch vụ ngày 09/9: Khách hàng Vy (Phòng 402) thanh toán phí thay bình xe điện Asama màu đỏ 650.000đ.',
  },
  {
    id: 't2',
    name: 'lich_trinh_giao_hang_nowfood_son.xlsx',
    kind: 'Báo cáo chuyến xe tài xế',
    preview: 'Lịch sử nhận đơn NowFood tối ngày 12/9…',
    detail: 'Nhật ký ca chạy của shipper Sơn: Nhận đơn giao trà sữa lúc 20:30 tại Hàng Chai, hoàn thành đơn lúc 21:05. Sau đó tắt app về ngõ 46.',
  },
  {
    id: 't3',
    name: 've_gui_xe_hang_chai.png',
    kind: 'Ảnh chụp vé xe',
    preview: 'Vé gửi xe chợ đêm Hàng Chai số 118…',
    detail: 'Vé gửi xe chợ đêm đề ngày 10/9 đã hết hạn sử dụng.',
  },
  {
    id: 't4',
    name: 'bang_ke_tien_phong_tro_thang_9.xlsx',
    kind: 'Sổ thu chi nhà trọ',
    preview: 'Bảng theo dõi đóng tiền phòng trọ Hẻm 42…',
    detail: 'Sổ thu tiền trọ: Phòng 401 (Dũng) còn nợ 1 tháng tiền phòng 1.800.000đ. Phòng 402 (Vy) đã thanh toán đủ.',
  },
  {
    id: 't5',
    name: 'draft_sms_2145.txt',
    kind: 'Bản nháp tin nhắn',
    preview: 'Tối nay em giao xong một đơn đặc biệt là xoay đủ 5 triệu trả anh trước 22h…',
    detail: 'Bản nháp tin nhắn soạn lúc 21:45 gửi tới số của Hùng Net: “Tối nay em giao xong một đơn đặc biệt là xoay đủ 5 triệu trả anh trước 22h, anh đừng sang phòng làm ầm lên”.',
    clue: 'tin-nhan-nhap',
  },
]
