import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 02',
  title: 'Chiếc điện thoại trong tủ đồ',
  place: 'Sân cầu lông Hẻm 42',
  time: '20:35 · thứ Bảy 19/9',
  brief:
    'Điện thoại của chị Hạnh biến mất khỏi tủ đồ trong đúng mười phút. Tủ không bị cạy, camera không thấy ai ra vào. Nhưng có một người đã nói dối về chỗ mình đứng.',
  culprit: 'son',
  difficulty: 'Trung bình',
  question: 'Ai đã lấy chiếc điện thoại trong tủ đồ?',
  solution:
    'Sơn — khách quen nợ 6 triệu tiền sân — đã lách tay qua khe hở sau tủ đồ lấy điện thoại, rồi dùng máy của chị Hạnh nhắn bán. Áo khoác đỏ của hắn phản chiếu trong story 20:29 của Linh; sao kê chứng minh Linh đang gọi điện chứ không phải mở tủ. Camera chỉ quay cửa kho nên không thấy khe hở phía sau.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-dt': {
    id: 'mat-dt',
    tag: 'chat',
    title: 'Mất điện thoại lúc 20:35',
    detail:
      'Chị Hạnh để điện thoại trong tủ đồ lúc 20:25, quay lại 20:35 thì tủ vẫn khoá nhưng máy đã biến mất. Không có dấu cạy.',
  },
  'ba-nguoi-giu-chia': {
    id: 'ba-nguoi-giu-chia',
    tag: 'chat',
    title: 'Chỉ ba người giữ chìa tủ',
    detail: 'Chìa tủ đồ do chị Hạnh, Linh (quầy nước) và bà Mai (lau dọn) giữ. Không ai khác mở được.',
  },
  'camera-kho': {
    id: 'camera-kho',
    tag: 'chat',
    title: 'Camera chỉ quay cửa kho',
    detail:
      'Camera duy nhất hướng vào cửa kho, từ 20:30 đến 20:40 không có ai ra vào. Nhưng tủ đồ nằm sát vách, phía sau có một khe hở.',
  },
  'linh-khai-quay': {
    id: 'linh-khai-quay',
    tag: 'chat',
    title: 'Linh khai đứng quầy cả buổi',
    detail: 'Linh nói từ 20:15 đến 20:50 em đứng ở quầy nước, không rời đi đâu.',
  },
  'chuyen-khoan-linh': {
    id: 'chuyen-khoan-linh',
    tag: 'web',
    title: 'Linh chuyển 2 triệu lúc 20:41',
    detail:
      'Sao kê ngân hàng: 20:41, tài khoản của Linh chuyển 2.000.000đ cho “Mây Store”. Cô ấy dùng điện thoại của mình, không phải máy chị Hạnh.',
  },
  'linh-goi-dien': {
    id: 'linh-goi-dien',
    tag: 'photo',
    title: 'Linh đang gọi điện lúc 20:30–20:45',
    detail:
      'Ảnh quầy nước 20:40: Linh áp điện thoại vào tai, màn hình sáng. Sao kê cuộc gọi xác nhận 15 phút với bạn trai — cô ấy không thể vừa mở tủ vừa nghe máy.',
  },
  'tin-nhan-ban': {
    id: 'tin-nhan-ban',
    tag: 'file',
    title: 'Tin nhắn bán điện thoại',
    detail:
      '20:44, từ máy của chị Hạnh: “Máy còn 98%, bán 5 triệu, giao ở hẻm 44.” Người nhận là một số lạ. Tin nhắn bị xoá khỏi máy nhưng còn trong bản nháp.',
  },
  'anh-story': {
    id: 'anh-story',
    tag: 'photo',
    title: 'Bóng áo đỏ trong story 20:29',
    detail:
      'Story 20:29 của Linh chụp tủ đồ. Trong tấm kính tủ có bóng một người mặc áo khoác đỏ đứng sau lưng cô ấy.',
  },
  'son-ao-do': {
    id: 'son-ao-do',
    tag: 'photo',
    title: 'Sơn mặc áo khoác đỏ',
    detail: 'Ảnh sân lúc 20:20: Sơn — khách quen — mặc áo khoác đỏ, đứng gần khu tủ đồ.',
  },
  'son-no-tien': {
    id: 'son-no-tien',
    tag: 'chat',
    title: 'Sơn nợ 6 triệu tiền sân',
    detail: 'Chị Hạnh nhắn riêng: “Sơn còn nợ 6 triệu, hẹn cuối tháng. Hôm nay hắn lại xin khất.”',
  },
  'lo-hong-tu': {
    id: 'lo-hong-tu',
    tag: 'chat',
    title: 'Khe hở sau tủ đồ',
    detail:
      'Bà Mai kể: vách sau tủ đồ bị mọt, hở một khe đủ lách bàn tay. Không cần chìa vẫn lấy được đồ nếu biết chỗ.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'son',
    name: 'Sơn',
    role: 'Khách quen, nợ tiền sân',
    avatar: '🧥',
    note: 'Đến 20:20, mặc áo khoác đỏ. Nợ 6 triệu, hôm nay xin khất.',
  },
  { id: 'linh', name: 'Linh', role: 'Nhân viên quầy nước', avatar: '🥤', note: 'Giữ chìa tủ. Nói đứng quầy cả buổi.' },
  { id: 'ba-mai', name: 'Bà Mai', role: 'Lau dọn', avatar: '🧹', note: 'Giữ chìa tủ. Về trước 20:30.' },
  { id: 'tuan', name: 'Tuấn', role: 'HLV cầu lông', avatar: '🏸', note: 'Đang dạy trên sân 2 từ 20:00 đến 21:00.' },
  { id: 'hanh', name: 'Hạnh', role: 'Chủ sân', avatar: '🔑', note: 'Chủ chiếc điện thoại bị mất.' },
]

export const CONVS: Conv[] = [
  {
    id: 'group',
    name: 'Sân cầu lông 42',
    avatar: '🏸',
    sub: '12 thành viên',
    preview: 'Hạnh: Mất điện thoại rồi, ai thấy không?',
    messages: [
      { id: 'g1', from: 'them', time: '20:36', text: 'Cả nhà ơi, điện thoại của tôi mất rồi. Tôi để trong tủ đồ, quay lại đã không thấy.', clue: 'mat-dt' },
      { id: 'g2', from: 'them', time: '20:37', text: 'Tủ vẫn khoá nguyên, không có dấu cạy. Chìa chỉ có tôi, Linh với bà Mai giữ.', clue: 'ba-nguoi-giu-chia' },
      { id: 'g3', from: 'them', time: '20:39', text: 'Camera chỉ quay cửa kho thôi. Từ 20:30 đến 20:40 không có ai ra vào.', clue: 'camera-kho' },
      { id: 'g4', from: 'them', time: '20:41', text: 'Linh ơi, lúc đó em ở đâu?' },
      { id: 'g5', from: 'them', time: '20:42', text: 'Em đứng quầy từ 20:15 đến 20:50, không đi đâu hết.' , clue: 'linh-khai-quay' },
      { id: 'g6', from: 'me', time: '20:43', text: 'Mọi người giữ nguyên hiện trường, con xem giúp.' },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Vừa mới truy cập',
    preview: 'Ba lần thôi nhé.',
    requires: ['mat-dt'],
    messages: [
      { id: 't1', from: 'them', time: '20:50', text: 'Vụ này nhỏ nhưng có mùi. Ba lần thôi nhé, sai ba lần là anh tự làm.' },
      { id: 't2', from: 'them', time: '20:51', text: 'Đừng tin lời khai. Tìm thứ không biết nói dối: sao kê, ảnh, camera.' },
      { id: 't3', from: 'them', time: '20:58', text: 'Ai nói mình đứng yên một chỗ thì kiểm tra xem chỗ đó có camera không.', requires: ['linh-khai-quay'] },
      { id: 't4', from: 'them', time: '21:05', text: 'Kẻ lấy đồ không nhất thiết phải mở cửa. Nhìn kỹ cái tủ đi.', requires: ['camera-kho'] },
      { id: 't5', from: 'them', time: '21:12', text: 'Có người mặc áo đỏ trong ảnh. Có người mặc áo đỏ ngoài đời. Đừng nhầm.', requires: ['anh-story'] },
    ],
  },
  {
    id: 'linh',
    name: 'Linh Quầy nước',
    avatar: '🥤',
    sub: 'Hoạt động 3 phút trước',
    preview: 'Em không lấy đâu.',
    requires: ['mat-dt'],
    messages: [
      { id: 'l1', from: 'them', time: '20:52', text: 'Em không lấy đâu. Em đứng quầy suốt, chị Hạnh hỏi em cũng nói rồi.' },
      { id: 'l2', from: 'them', time: '20:53', text: 'Mà lúc 20:41 em có chuyển khoản trả tiền hàng, em dùng máy em. Anh/chị xem sao kê đi.', clue: 'chuyen-khoan-linh' },
      { id: 'l3', from: 'them', time: '20:55', text: 'Em còn gọi cho bạn trai từ 20:30 đến 20:45, máy ghi âm cuộc gọi còn đó.', clue: 'linh-goi-dien' },
      { id: 'l4', from: 'me', time: '20:56', text: 'Vậy em có thấy ai lạ không?' },
      { id: 'l5', from: 'them', time: '20:57', text: 'Chỉ có anh Sơn áo đỏ đứng gần tủ lúc em chụp story. Em tưởng ảnh đang chờ bạn.' },
    ],
  },
  {
    id: 'ba-mai',
    name: 'Bà Mai',
    avatar: '🧹',
    sub: 'Hoạt động 10 phút trước',
    preview: 'Cái tủ đó hở phía sau.',
    requires: ['camera-kho'],
    messages: [
      { id: 'b1', from: 'them', time: '20:58', text: 'Tôi về từ 20:25, lúc đó tủ vẫn bình thường.' },
      { id: 'b2', from: 'them', time: '20:59', text: 'Mà cái tủ đó cũ lắm rồi, vách sau bị mọt, hở một khe đủ lách tay. Tôi nói mãi chưa ai sửa.', clue: 'lo-hong-tu' },
      { id: 'b3', from: 'them', time: '21:00', text: 'Người nào biết chỗ đó thì không cần chìa đâu.' },
    ],
  },
  {
    id: 'son',
    name: 'Sơn',
    avatar: '🧥',
    sub: 'Hoạt động 1 phút trước',
    preview: 'Tôi về từ 20:30.',
    requires: ['anh-story'],
    messages: [
      { id: 's1', from: 'them', time: '21:02', text: 'Tôi đến chơi từ 20:20, 20:30 về. Áo đỏ là tôi, nhưng tôi không lại gần tủ.' },
      { id: 's2', from: 'them', time: '21:03', text: 'Mà chị Hạnh cứ giục tiền sân, tôi bảo cuối tháng trả. Có 6 triệu chứ mấy.', clue: 'son-no-tien' },
      { id: 's3', from: 'them', time: '21:04', text: 'Điện thoại 5 triệu thì tôi mua được, việc gì phải lấy.', requires: ['tin-nhan-ban'] },
      { id: 's4', from: 'me', time: '21:05', text: 'Anh biết khe hở sau tủ không?' },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'TK-9021', time: '20:41', pickup: 'Linh → Mây Store', drop: '2.000.000đ', fee: 'Chuyển khoản', status: 'Thành công', clue: 'chuyen-khoan-linh' },
  { id: 'TK-9022', time: '20:44', pickup: 'Số lạ → “bán máy”', drop: '5.000.000đ', fee: 'Tin nhắn', status: 'Không gửi được' },
  { id: 'TK-9023', time: '20:30', pickup: 'Linh → Bạn trai', drop: 'Gọi 15 phút', fee: 'Cuộc gọi', status: 'Kết thúc 20:45' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Tủ đồ lúc 20:29',
    time: '20:29',
    scene: 'tea',
    img: 'detective/case2-tu-do.jpg',
    caption: 'Story của Linh: “Ca tối, khách đông ghê.”',
    clue: 'anh-story',
  },
  {
    id: 'p2',
    title: 'Sân lúc 20:20',
    time: '20:20',
    scene: 'net',
    img: 'detective/case2-san-cau-long.jpg',
    caption: 'Một người áo đỏ đứng gần khu tủ đồ.',
    clue: 'son-ao-do',
  },
  {
    id: 'p3',
    title: 'Quầy nước lúc 20:40',
    time: '20:40',
    scene: 'street',
    img: 'detective/case2-quay-nuoc.jpg',
    caption: 'Linh đang nghe điện thoại, tay kia rót nước.',
    clue: 'linh-goi-dien',
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 'tr1',
    name: 'nhap-ban-may.txt',
    kind: 'Ghi chú',
    preview: 'Máy còn 98%, bán 5 triệu…',
    detail: '“Máy còn 98%, bán 5 triệu, giao ở hẻm 44. Ai lấy thì nhắn số này.”\n\nTrạng thái: nháp, chưa gửi. Tạo lúc 20:44 từ máy chị Hạnh.',
    clue: 'tin-nhan-ban',
  },
  {
    id: 'tr2',
    name: 'anh-ao-do.jpg',
    kind: 'Hình ảnh',
    preview: 'Người mặc áo khoác đỏ, chụp từ sân',
    detail: 'Ảnh chụp lén lúc 20:21: người đàn ông mặc áo khoác đỏ, tay phải giấu trong túi, đứng sát vách tủ đồ.',
    clue: 'son-ao-do',
  },
  {
    id: 'tr3',
    name: 'ghi-no.txt',
    kind: 'Ghi chú',
    preview: 'Sơn — 6tr — cuối tháng',
    detail: '“Sơn — 6tr — cuối tháng. Nhắc lần 3.”\n\nDòng ghi nợ của chị Hạnh. Người duy nhất bị nhắc nợ trong tuần này.',
  },
]
