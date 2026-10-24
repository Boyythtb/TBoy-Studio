import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 03',
  title: 'Chiếc hòm quỹ đêm hội chợ',
  place: 'Hội chợ Trung thu · Hẻm 42',
  time: '21:20 · thứ Bảy 26/9',
  brief:
    'Hòm quỹ từ thiện mất 8 triệu ngay giữa đêm hội chợ. Mất điện mười lăm phút, camera tắt, ổ khoá bị cạy. Ai cũng có lý do để ở đó — và ai cũng có một lời khai đẹp.',
  culprit: 'trang',
  difficulty: 'Khó',
  question: 'Ai đã lấy 8 triệu từ hòm quỹ?',
  solution:
    'Trang — thủ quỹ — đã lấy chìa két từ Oanh lúc 20:30, cạy ổ khoá từ phía trong rồi lợi dụng lúc mất điện để lấy tiền. Giày dính bùn đỏ ở bãi cỏ sau hòm quỹ, tin nhắn “tối nay xong, chuyển 8tr” từ 19:50 và khoản chuyển 8 triệu cho chủ nợ lúc 21:32 tố cáo cô. Khoa chỉ bị bỏng tay khi thay nến, còn chú bảo vệ nhìn nhầm người.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-quy': {
    id: 'mat-quy',
    tag: 'chat',
    title: 'Mất 8 triệu trong hòm quỹ',
    detail: 'Ban tổ chức kiểm quỹ lúc 21:20: thiếu đúng 8.000.000đ. Hòm bị cạy, khoá rơi dưới đất.',
  },
  'cat-dien': {
    id: 'cat-dien',
    tag: 'chat',
    title: 'Mất điện 20:55 – 21:10',
    detail: 'Cả khu hội chợ tối om mười lăm phút. Camera an ninh tắt theo. Sau đó đèn tự sáng lại.',
  },
  'khoa-gan-hom': {
    id: 'khoa-gan-hom',
    tag: 'photo',
    title: 'Khoa cúi sát hòm quỹ lúc 20:48',
    detail: 'Camera ghi lại cảnh Khoa — tình nguyện viên — cúi xuống cạnh hòm quỹ. Nhìn như đang mở hòm.',
  },
  'khoa-bi-thuong': {
    id: 'khoa-bi-thuong',
    tag: 'chat',
    title: 'Khoa bị bỏng tay từ 20:40',
    detail: 'Khoa bị bỏng nến khi thay đèn cho gian hàng. Băng gạc do y tế hội chợ quấn từ 20:40, không thể cầm đồ vật nhỏ.',
  },
  'khoa-tin-nhan': {
    id: 'khoa-tin-nhan',
    tag: 'chat',
    title: 'Khoa nhắn mẹ lúc 20:45',
    detail: '“Con dọn hòm quỹ xong rồi về. Hôm nay quyên được hơn 8 triệu, vui ghê.”',
  },
  'khoa-sao-ke': {
    id: 'khoa-sao-ke',
    tag: 'chat',
    title: 'Ví Khoa chỉ có 50 nghìn',
    detail: 'Khoa mở ví cho ban tổ chức xem: 50.000đ và thẻ sinh viên. Không có khoản chuyển tiền nào trong đêm.',
  },
  'ket-cay': {
    id: 'ket-cay',
    tag: 'photo',
    title: 'Ổ khoá bị cạy từ phía trong',
    detail: 'Lưỡi khoá cong hướng ra ngoài, vết xước nằm ở mặt trong. Kẻ gian mở hòm khi đã ở rất gần, không phải cạy từ ngoài.',
  },
  'chia-ket': {
    id: 'chia-ket',
    tag: 'chat',
    title: 'Chỉ Oanh và Trang giữ chìa',
    detail: 'Oanh — trưởng ban tổ chức — giữ chìa hòm. 20:30 cô đưa chìa cho Trang vì phải lên sân khấu trực loa.',
  },
  'oanh-khai': {
    id: 'oanh-khai',
    tag: 'chat',
    title: 'Oanh xác nhận đưa chìa cho Trang',
    detail: '“Tôi đưa chìa cho Trang lúc 20:30, dặn giữ kỹ. Đến 21:15 tôi mới quay lại.”',
  },
  'trang-khai': {
    id: 'trang-khai',
    tag: 'chat',
    title: 'Trang nói đứng quầy bánh cả buổi',
    detail: 'Trang khai từ 20:50 đến 21:15 đứng bán bánh ở gian hàng, không rời vị trí.',
  },
  'trang-giay': {
    id: 'trang-giay',
    tag: 'photo',
    title: 'Giày Trang dính bùn đỏ lúc 21:05',
    detail: 'Ảnh camera 21:05: đôi giày trắng của Trang dính bùn đỏ. Bùn đỏ chỉ có ở bãi cỏ sau hòm quỹ — khu vực quầy bánh hoàn toàn khô ráo.',
  },
  'chuyen-tien-trng': {
    id: 'chuyen-tien-trng',
    tag: 'web',
    title: '21:32 chuyển đúng 8 triệu',
    detail: 'Sao kê: 21:32, tài khoản Trang chuyển 8.000.000đ cho “Tú – chủ nợ”. Nội dung: “trả đủ”.',
  },
  'tin-nhan-do': {
    id: 'tin-nhan-do',
    tag: 'file',
    title: 'Tin nhắn soạn từ 19:50',
    detail: 'Bản nháp trong thùng rác: “Tối nay xong, chuyển 8tr. Đừng gọi.” Gửi cho Tú lúc 19:52, trước khi hội chợ khai mạc.',
  },
  'bao-ve-khai': {
    id: 'bao-ve-khai',
    tag: 'chat',
    title: 'Bảo vệ nhìn nhầm Khoa',
    detail: 'Chú bảo vệ khai thấy “thằng Khoa” cúi ở hòm quỹ. Nhưng camera 20:48 cho thấy Khoa chỉ nhặt vỏ hộp bánh bị gió thổi.',
  },
  'hop-den': {
    id: 'hop-den',
    tag: 'file',
    title: 'Hộp đèn pin sau bãi cỏ',
    detail: 'Hộp đèn pin nhựa trắng nằm sau bãi cỏ, có dấu tay bùn đỏ và chữ “T” viết bút xoá. Trang dùng hộp này để soi ổ khoá khi mất điện.',
  },
  'tu-xuat-hien': {
    id: 'tu-xuat-hien',
    tag: 'photo',
    title: 'Tú vào hẻm lúc 20:58',
    detail:
      'Camera toà nhà bên cạnh ghi cảnh Tú — chủ nợ của Trang — đi vào hẻm 42 đúng lúc hội chợ mất điện, tay cầm một túi vải.',
  },
  'tu-o-quan-phuc': {
    id: 'tu-o-quan-phuc',
    tag: 'web',
    title: 'Tú ngồi quán Phúc đến 21:25',
    detail:
      'Bill quán Phúc: 20:57 Tú gọi một trà đá, 21:25 mới trả tiền. Phúc xác nhận Tú ngồi bàn ngoài suốt, không vào khu hòm quỹ.',
  },
}

export const SUSPECTS: Suspect[] = [
  { id: 'trang', name: 'Trang', role: 'Thủ quỹ ban tổ chức', avatar: '👩‍💼', note: 'Giữ chìa hòm từ 20:30. Nói đứng quầy bánh cả buổi.' },
  { id: 'khoa', name: 'Khoa', role: 'Tình nguyện viên', avatar: '🎒', note: 'Bị camera quay cạnh hòm quỹ lúc 20:48. Tay bị bỏng.' },
  { id: 'oanh', name: 'Oanh', role: 'Trưởng ban tổ chức', avatar: '🎤', note: 'Giữ chìa gốc, đưa cho Trang lúc 20:30.' },
  { id: 'hung', name: 'Chú Hùng', role: 'Bảo vệ hội chợ', avatar: '🛡️', note: 'Đi tuần quanh hòm quỹ. Khai nhìn thấy Khoa.' },
  { id: 'phuc', name: 'Phúc', role: 'Chủ quán nước', avatar: '🍹', note: 'Gian hàng sát hòm quỹ, đóng cửa lúc 20:45.' },
  { id: 'nga', name: 'Nga', role: 'Bán vé số', avatar: '🎟️', note: 'Ngồi đầu hẻm, nói thấy một người áo tối chạy ra.' },
  { id: 'tu', name: 'Tú', role: 'Chủ nợ của Trang', avatar: '💸', note: 'Bị camera thấy vào hẻm lúc 20:58, giữa lúc mất điện.' },
]

export const CONVS: Conv[] = [
  {
    id: 'group',
    name: 'Hội chợ Hẻm 42',
    avatar: '🏮',
    sub: '28 thành viên',
    preview: 'Oanh: Mất tiền quỹ rồi cả nhà ơi!',
    messages: [
      { id: 'g1', from: 'them', time: '21:21', text: 'Cả nhà ơi, hòm quỹ thiếu 8 triệu. Khoá bị cạy, tiền mất sạch.', clue: 'mat-quy' },
      { id: 'g2', from: 'them', time: '21:22', text: 'Lúc 20:55 mất điện cả khu, đến 21:10 mới có lại. Camera cũng tắt theo.', clue: 'cat-dien' },
      { id: 'g3', from: 'them', time: '21:24', text: 'Ai ở gần hòm quỹ lúc đó thì nhắn riêng cho tôi.' },
      { id: 'g4', from: 'them', time: '21:25', text: 'Chú Hùng nói thấy Khoa cúi ở hòm quỹ lúc 20:48. Khoa đâu rồi?', clue: 'khoa-gan-hom' },
      { id: 'g5', from: 'me', time: '21:26', text: 'Mọi người giữ nguyên hiện trường. Tôi xem giúp.' },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Vừa mới truy cập',
    preview: 'Vụ này khó hơn vụ xe đạp đấy.',
    requires: ['mat-quy'],
    messages: [
      { id: 't1', from: 'them', time: '21:30', text: 'Vụ này khó hơn vụ xe đạp đấy. Ba lần thôi, sai là anh đóng hồ sơ.' },
      { id: 't2', from: 'them', time: '21:31', text: 'Đừng thấy camera quay ai là kết tội người đó. Xem người ta có làm được việc đó không.', requires: ['khoa-gan-hom'] },
      { id: 't3', from: 'them', time: '21:34', text: 'Kẻ gian cạy khoá từ phía trong. Nghĩa là hắn ở rất gần hòm trước khi cạy.', requires: ['ket-cay'] },
      { id: 't4', from: 'them', time: '21:40', text: 'Mất điện là cơ hội. Ai biết chính xác lúc nào điện tắt?', requires: ['cat-dien'] },
      { id: 't5', from: 'them', time: '21:45', text: 'Tiền mặt 8 triệu không tự nhiên bốc hơi. Kiểm tra tài khoản những người có chìa.', requires: ['chia-ket'] },
    ],
  },
  {
    id: 'khoa',
    name: 'Khoa',
    avatar: '🎒',
    sub: 'Hoạt động 5 phút trước',
    preview: 'Em chỉ nhặt vỏ hộp thôi.',
    requires: ['khoa-gan-hom'],
    messages: [
      { id: 'k1', from: 'them', time: '21:27', text: 'Em không lấy tiền! Lúc 20:48 em cúi nhặt vỏ hộp bánh bị gió thổi, không phải mở hòm.' },
      { id: 'k2', from: 'them', time: '21:28', text: 'Tay em bỏng từ 20:40, y tế quấn băng rồi. Em còn không cầm được đũa.', clue: 'khoa-bi-thuong' },
      { id: 'k3', from: 'them', time: '21:29', text: 'Em nhắn mẹ lúc 20:45 là dọn hòm xong rồi về. Mẹ em trả lời 20:46.', clue: 'khoa-tin-nhan' },
      { id: 'k4', from: 'them', time: '21:31', text: 'Ví em còn đúng 50 nghìn, ban tổ chức xem rồi. Em thề.', clue: 'khoa-sao-ke' },
    ],
  },
  {
    id: 'oanh',
    name: 'Oanh',
    avatar: '🎤',
    sub: 'Hoạt động 2 phút trước',
    preview: 'Tôi đưa chìa cho Trang.',
    requires: ['mat-quy'],
    messages: [
      { id: 'o1', from: 'them', time: '21:32', text: 'Tôi giữ chìa hòm. Nhưng 20:30 tôi phải lên sân khấu trực loa, nên đưa chìa cho Trang.' , clue: 'chia-ket' },
      { id: 'o2', from: 'them', time: '21:33', text: 'Tôi dặn Trang giữ kỹ. Đến 21:15 tôi quay lại thì hòm vẫn khoá, nhưng khoá đã bị cạy.', clue: 'oanh-khai' },
      { id: 'o3', from: 'them', time: '21:34', text: 'Trang là thủ quỹ ba năm nay, tôi tin cô ấy. Nhưng… dạo này cô ấy hay nghe điện thoại ngoài.' },
    ],
  },
  {
    id: 'baove',
    name: 'Chú Hùng',
    avatar: '🛡️',
    sub: 'Hoạt động 8 phút trước',
    preview: 'Tôi thấy thằng Khoa.',
    requires: ['khoa-gan-hom'],
    messages: [
      { id: 'b1', from: 'them', time: '21:36', text: 'Tôi đi tuần, đèn pin yếu. Lúc 20:48 thấy thằng Khoa cúi ở hòm quỹ, tưởng nó mở hòm.' },
      { id: 'b2', from: 'them', time: '21:37', text: 'Nhưng giờ xem lại ảnh thì nó chỉ nhặt cái vỏ hộp. Tôi già rồi, mắt kém.', clue: 'bao-ve-khai' },
      { id: 'b3', from: 'them', time: '21:38', text: 'Lúc mất điện tôi đứng ở cổng chính. Không ai ra vào. Chỉ có Trang đi về phía bãi cỏ.' },
    ],
  },
  {
    id: 'trang',
    name: 'Trang',
    avatar: '👩‍💼',
    sub: 'Hoạt động 1 phút trước',
    preview: 'Em đứng quầy cả buổi.',
    requires: ['chia-ket'],
    messages: [
      { id: 'tr1', from: 'them', time: '21:42', text: 'Em đứng quầy bánh từ 20:50 đến 21:15, không đi đâu. Chị Oanh đưa chìa thì em cất trong túi.' , clue: 'trang-khai' },
      { id: 'tr2', from: 'them', time: '21:43', text: 'Giày em dính bùn hả? Chắc lúc đi đổ rác. Bãi rác cũng có bùn mà.', clue: 'trang-giay' },
      { id: 'tr3', from: 'me', time: '21:44', text: 'Bãi rác khô ráo. Chỉ bãi cỏ sau hòm quỹ có bùn đỏ.' },
      { id: 'tr4', from: 'them', time: '21:45', text: 'Thôi được. Em có vay anh Tú 8 triệu. Nhưng em chưa trả, em thề.' },
    ],
  },
  {
    id: 'tu',
    name: 'Tú',
    avatar: '💸',
    sub: 'Hoạt động 7 phút trước',
    preview: 'Tôi đến đòi nợ, không lấy tiền.',
    requires: ['cat-dien'],
    messages: [
      { id: 'tu1', from: 'them', time: '21:48', text: 'Tôi vào hẻm lúc 20:58 đòi tiền. Trang bảo 21:30 sẽ chuyển, tôi ra quán Phúc ngồi.', clue: 'tu-xuat-hien' },
      { id: 'tu2', from: 'them', time: '21:49', text: 'Phúc giữ bill của tôi: 20:57 gọi trà đá, 21:25 trả tiền. Tôi ngồi bàn ngoài, không lại gần hòm quỹ.', clue: 'tu-o-quan-phuc' },
      { id: 'tu3', from: 'them', time: '21:50', text: '21:32 cô ấy chuyển đủ 8 triệu. Nếu tôi lấy tiền hòm thì cô ấy lấy đâu ra mà trả?' },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'GD-2609', time: '19:52', pickup: 'Trang → Tú (chủ nợ)', drop: '“Tối nay xong, chuyển 8tr”', fee: 'Tin nhắn', status: 'Đã gửi', clue: 'tin-nhan-do' },
  { id: 'GD-2610', time: '21:32', pickup: 'Trang → Tú (chủ nợ)', drop: '8.000.000đ', fee: 'Chuyển khoản', status: 'Thành công', clue: 'chuyen-tien-trng' },
  { id: 'GD-2611', time: '20:48', pickup: 'Camera hội chợ', drop: 'Khoa cúi cạnh hòm quỹ', fee: 'Bản ghi', status: '00:12', clue: 'khoa-gan-hom' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Camera 20:48 — Khoa cạnh hòm quỹ',
    time: '20:48',
    scene: 'net',
    img: 'detective/case3-camera-2048.jpg',
    caption: 'Khoa cúi người, tay trái giấu trong túi áo. Trên mặt đất có vỏ hộp bánh.',
    clue: 'khoa-gan-hom',
  },
  {
    id: 'p2',
    title: 'Camera 21:05 — đôi giày dính bùn',
    time: '21:05',
    scene: 'street',
    img: 'detective/case3-giay-bun.jpg',
    caption: 'Đôi giày trắng dính bùn đỏ, bước ra từ hướng bãi cỏ sau hòm quỹ.',
    clue: 'trang-giay',
  },
  {
    id: 'p3',
    title: 'Hiện trường 21:25 — ổ khoá bị cạy',
    time: '21:25',
    scene: 'tea',
    img: 'detective/case3-hom-quy.jpg',
    caption: 'Lưỡi khoá cong ra ngoài, vết xước ở mặt trong. Hòm quỹ bằng gỗ, nắp hé mở.',
    clue: 'ket-cay',
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 'tr1',
    name: 'nhap-tin-nhan.txt',
    kind: 'Ghi chú',
    preview: 'Tối nay xong, chuyển 8tr…',
    detail: '“Tối nay xong, chuyển 8tr. Đừng gọi.”\\n\\nNgười nhận: Tú – chủ nợ. Tạo lúc 19:50, gửi 19:52, trước giờ khai mạc hội chợ.',
    clue: 'tin-nhan-do',
  },
  {
    id: 'tr2',
    name: 'hop-den.jpg',
    kind: 'Hình ảnh',
    preview: 'Hộp đèn pin trắng, dấu tay bùn',
    detail: 'Hộp nhựa trắng, có chữ “T” viết bút xoá. Dấu tay bùn đỏ còn in trên nắp. Được tìm thấy sau bãi cỏ, cách hòm quỹ ba bước chân.',
    clue: 'hop-den',
  },
  {
    id: 'tr3',
    name: 'ghi-chu-quy.txt',
    kind: 'Ghi chú',
    preview: 'Quỹ: 8.000.000đ — Trang giữ',
    detail: '“Quỹ Trung thu: 8.000.000đ. Trang giữ hòm, Oanh giữ chìa dự phòng. Kiểm lại sau hội chợ.”\\n\\nKhông có dòng nào ghi khoản chi.',
  },
]
