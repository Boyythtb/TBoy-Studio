import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 04',
  title: 'Đêm mất điện ở chung cư 42',
  place: 'Chung cư cũ Hẻm 42 · tầng hầm',
  time: '21:40 · thứ Bảy 26/9',
  brief:
    'Mất điện toàn block, két sắt phòng quản lý mở toang, 200 triệu biến mất. Anh Khải nằm bất tỉnh ở tầng hầm. Cửa két không hề bị cạy — ai đó đã biết mã. Và người duy nhất nói mình ở nhà lại không có ai chứng kiến.',
  culprit: 'dat',
  accomplice: 'tu',
  difficulty: 'Siêu khó',
  question: 'Ai mở két, và ai đã giúp?',
  solution:
    'Đạt — quản lý toà nhà — đã đổi mã két thành 2147, hẹn Khải xuống hầm lúc 21:47 để kiểm tra. Tư — bảo vệ — tắt camera từ 21:08 rồi gạt aptomat tủ điện, canh cửa hầm. Khi Khải phát hiện Đạt đang mở két, Đạt đẩy anh ngã, lấy sổ nợ và 200 triệu, chuyển cho chủ nợ lúc 21:50. Sổ nợ 250 triệu và tin nhắn “tối nay cúp điện đúng 21h” là hai mảnh ghép cuối cùng.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-ket': {
    id: 'mat-ket',
    tag: 'photo',
    title: 'Két sắt mở, mất 200 triệu',
    detail: 'Két phòng quản lý mở, không có dấu cạy. Thiếu 200.000.000đ và cuốn sổ nợ màu nâu. Mã két 4 số vẫn hoạt động bình thường.',
  },
  'khai-bat-tinh': {
    id: 'khai-bat-tinh',
    tag: 'chat',
    title: 'Khải bất tỉnh ở tầng hầm',
    detail: 'Anh Khải — kỹ thuật — được tìm thấy lúc 21:40, đầu va đập, có vết trầy ở cổ tay. Bác sĩ nói anh bị đẩy ngã chứ không tự ngã.',
  },
  'mat-dien': {
    id: 'mat-dien',
    tag: 'chat',
    title: 'Mất điện 21:10 – 21:55',
    detail: 'Toàn block mất điện gần bốn mươi lăm phút. Đèn hành lang, thang máy và camera đều tắt. Điện chỉ trở lại khi bảo vệ gạt lại aptomat.',
  },
  'camera-tat': {
    id: 'camera-tat',
    tag: 'chat',
    title: 'Camera tắt trước khi mất điện',
    detail: 'Camera hành lang ngừng ghi từ 21:08, tức là hai phút trước khi mất điện. Không có ai báo hỏng camera trước đó.',
  },
  'nhat-ky-camera': {
    id: 'nhat-ky-camera',
    tag: 'web',
    title: 'Log camera: “manual off”',
    detail: 'Nhật ký hệ thống ghi lúc 21:08: “manual off — tài khoản quản lý”. Không phải lỗi nguồn, mà có người chủ động tắt.',
  },
  'tu-tat-dien': {
    id: 'tu-tat-dien',
    tag: 'chat',
    title: 'Tư giữ chìa tủ điện',
    detail: 'Tủ điện tầng hầm chỉ bảo vệ Tư có chìa. Anh ta khai “aptomat tự nhảy”, nhưng cầu dao bị gạt tay, không có dấu chập.',
  },
  'tu-loi-khai': {
    id: 'tu-loi-khai',
    tag: 'photo',
    title: 'Xe của Tư ở hầm lúc 21:15',
    detail: 'Ảnh camera toà nhà bên cạnh: chiếc xe máy biển 29-X1 của Tư đỗ trước cửa hầm đúng 21:15 — trong khi Tư khai đang tuần tầng 1.',
  },
  'tin-nhan-dat': {
    id: 'tin-nhan-dat',
    tag: 'web',
    title: '19:30: “Tối nay cúp điện đúng 21h”',
    detail: 'Tin nhắn từ số của Đạt gửi Tư: “Tối nay cúp điện đúng 21h, camera để anh lo. Xong việc chia như đã nói.”',
  },
  'mat-khau-ket': {
    id: 'mat-khau-ket',
    tag: 'chat',
    title: 'Chỉ Đạt và Lan biết mã két',
    detail: 'Mã két do quản lý và kế toán nắm. Lan nghỉ ốm từ 20:00, camera tầng 1 xác nhận cô rời toà nhà lúc 19:55.',
  },
  'lan-xac-nhan': {
    id: 'lan-xac-nhan',
    tag: 'chat',
    title: 'Đạt đổi mã két chiều nay',
    detail: 'Lan kể: 17:00 Đạt gọi điện bảo “đổi mã két thành 2147 cho dễ nhớ”, nói là sinh nhật con gái. Lan không hỏi thêm.',
  },
  'chuyen-khoan': {
    id: 'chuyen-khoan',
    tag: 'web',
    title: '21:50 chuyển 200 triệu',
    detail: 'Tài khoản công ty chuyển 200.000.000đ cho “Bảy – nhà 17” lúc 21:50, nội dung “thanh toán”. Người duyệt: Đạt.',
  },
  'so-no': {
    id: 'so-no',
    tag: 'file',
    title: 'Sổ nợ: Đạt vay 250 triệu',
    detail: 'Cuốn sổ nâu ghi: “Đạt — 250tr — hạn 26/9, 21:00. Không trả thì lấy nhà”. Trang cuối bị xé, còn lại vết keo.',
  },
  'tui-den': {
    id: 'tui-den',
    tag: 'chat',
    title: 'Túi đen trong thùng rác',
    detail: 'Cô Nga thấy Đạt vứt túi đen sau chung cư lúc 21:30. Trong túi: găng tay cao su, cuốn sổ nâu bị xé trang và một mẩu giấy ghi “2147”.',
  },
  'dat-giay': {
    id: 'dat-giay',
    tag: 'photo',
    title: 'Đạt xách túi đen lúc 21:22',
    detail: 'Camera toà nhà bên cạnh ghi cảnh Đạt đi ra từ hẻm sau chung cư, tay xách túi đen, áo sơ mi nhàu. Đạt khai đang ở nhà từ 20:30.',
  },
  'dat-khai': {
    id: 'dat-khai',
    tag: 'chat',
    title: 'Đạt khai ở nhà cả tối',
    detail: '“Tôi ở nhà từ 20:30, không ai đến chơi. Mất điện thì tôi ngủ. Két do kế toán giữ mã, tôi không biết.”',
  },
  'hop-dong': {
    id: 'hop-dong',
    tag: 'chat',
    title: 'Hợp đồng bảo hiểm 200 triệu',
    detail: 'Két được bảo hiểm đúng 200 triệu, người thụ hưởng là công ty do Đạt đại diện. Nếu “bị cướp”, công ty vẫn được bồi thường.',
  },
  'khai-ghi-am': {
    id: 'khai-ghi-am',
    tag: 'chat',
    title: 'Ghi âm 21:12 của Khải',
    detail: 'Điện thoại Khải tự ghi âm: “Anh Đạt, sao anh ở đây—” rồi tiếng va đập, tiếng chìa khoá rơi. File dừng ở 21:13.',
  },
  'ma-ket': {
    id: 'ma-ket',
    tag: 'file',
    title: 'Ghi chú của Khải: “21:47”',
    detail: 'Trong ghi chú điện thoại Khải: “21:47 — gặp a.Đ ở hầm, kiểm tra két, mang sổ.” Con số 21:47 cũng là mã két mà Đạt vừa đổi.',
  },
}

export const SUSPECTS: Suspect[] = [
  { id: 'dat', name: 'Đạt', role: 'Quản lý toà nhà', avatar: '🧑‍💼', note: 'Nắm mã két. Khai ở nhà từ 20:30, không ai chứng kiến.' },
  { id: 'tu', name: 'Tư', role: 'Bảo vệ ca đêm', avatar: '🛡️', note: 'Giữ chìa tủ điện. Khai đi tuần tầng 1 lúc 21:15.' },
  { id: 'khai', name: 'Khải', role: 'Kỹ thuật toà nhà', avatar: '🔧', note: 'Nạn nhân. Bất tỉnh ở tầng hầm, điện thoại còn ghi âm.' },
  { id: 'lan', name: 'Lan', role: 'Kế toán', avatar: '🧾', note: 'Biết mã két. Nghỉ ốm từ 20:00, có camera xác nhận rời đi.' },
  { id: 'huy', name: 'Huy', role: 'Cư dân tầng 5', avatar: '🧑‍⚖️', note: 'Từng kiện toà nhà vì thấm trần. Đêm đó ở nhà, vợ chứng kiến.' },
  { id: 'nga', name: 'Nga', role: 'Tạp hoá tầng 1', avatar: '🏪', note: 'Thấy Đạt vứt túi đen sau chung cư lúc 21:30.' },
]

export const CONVS: Conv[] = [
  {
    id: 'group',
    name: 'Chung cư 42',
    avatar: '🏢',
    sub: '64 thành viên',
    preview: 'BQT: Két bị mở, mất 200 triệu!',
    messages: [
      { id: 'g1', from: 'them', time: '21:41', text: 'Cả nhà bình tĩnh. Két phòng quản lý bị mở, mất 200 triệu và cuốn sổ nợ. Không có dấu cạy.', clue: 'mat-ket' },
      { id: 'g2', from: 'them', time: '21:42', text: 'Anh Khải bất tỉnh ở tầng hầm, đã gọi cấp cứu. Đầu anh ấy va đập, tay trầy.', clue: 'khai-bat-tinh' },
      { id: 'g3', from: 'them', time: '21:43', text: 'Mất điện từ 21:10 đến 21:55. Thang máy kẹt, ai ở trong xin báo.', clue: 'mat-dien' },
      { id: 'g4', from: 'them', time: '21:44', text: 'Camera hành lang tắt từ 21:08, trước cả lúc mất điện. Kỹ thuật nói không phải lỗi nguồn.', clue: 'camera-tat' },
      { id: 'g5', from: 'me', time: '21:45', text: 'Mọi người giữ nguyên hiện trường. Tôi xem giúp.' },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Vừa mới truy cập',
    preview: 'Vụ này hai lần thôi. Hai lần.',
    requires: ['mat-ket'],
    messages: [
      { id: 't1', from: 'them', time: '21:50', text: 'Vụ này hai lần thôi. Hai lần. Sai là hồ sơ đóng, không cứu được.' },
      { id: 't2', from: 'them', time: '21:51', text: 'Két không bị cạy, vậy kẻ gian biết mã. Đừng chỉ nhìn người giữ chìa.', requires: ['mat-ket'] },
      { id: 't3', from: 'them', time: '21:53', text: 'Mất điện là kịch bản, không phải tai nạn. Ai tắt được điện thì biết trước giờ.', requires: ['mat-dien'] },
      { id: 't4', from: 'them', time: '21:55', text: 'Camera tắt trước điện hai phút. Đó là dấu vết của người có quyền.', requires: ['camera-tat'] },
      { id: 't5', from: 'them', time: '21:58', text: 'Muốn mở hồ sơ cáo buộc, nhập mã 4 số. Mã nằm trong thứ Khải để lại.', requires: ['khai-ghi-am'] },
    ],
  },
  {
    id: 'dat',
    name: 'Đạt',
    avatar: '🧑‍💼',
    sub: 'Hoạt động 1 phút trước',
    preview: 'Tôi ở nhà cả tối.',
    requires: ['mat-ket'],
    messages: [
      { id: 'd1', from: 'them', time: '21:56', text: 'Tôi ở nhà từ 20:30, không ai đến chơi. Mất điện thì tôi ngủ. Két do kế toán giữ mã, tôi không biết.', clue: 'dat-khai' },
      { id: 'd2', from: 'them', time: '21:57', text: 'Các anh cứ hỏi Lan. Cô ấy biết mã, tôi chỉ ký giấy tờ.' },
      { id: 'd3', from: 'me', time: '21:58', text: 'Anh có biết cuốn sổ nợ màu nâu không?' },
      { id: 'd4', from: 'them', time: '21:59', text: 'Sổ nợ? Tôi không biết. À… hình như trong két có cuốn sổ của công ty.', requires: ['so-no'] },
      { id: 'd5', from: 'them', time: '22:00', text: 'Két có bảo hiểm 200 triệu. Nếu bị cướp thì công ty được bồi thường, tôi chỉ làm đúng quy trình.', clue: 'hop-dong', requires: ['so-no'] },
    ],
  },
  {
    id: 'tu',
    name: 'Tư',
    avatar: '🛡️',
    sub: 'Hoạt động 6 phút trước',
    preview: 'Aptomat tự nhảy thôi.',
    requires: ['mat-dien'],
    messages: [
      { id: 'tu1', from: 'them', time: '22:02', text: 'Tôi giữ chìa tủ điện, nhưng tối nay aptomat tự nhảy. Tôi chỉ gạt lại lúc 21:55.', clue: 'tu-tat-dien' },
      { id: 'tu2', from: 'them', time: '22:03', text: 'Lúc 21:15 tôi đang tuần tầng 1. Xe tôi để ở hầm, ai đó dắt ra cũng được.', clue: 'tu-loi-khai' },
      { id: 'tu3', from: 'me', time: '22:04', text: 'Camera toà bên thấy xe anh trước cửa hầm đúng 21:15.' },
      { id: 'tu4', from: 'them', time: '22:05', text: '…Tôi xuống lấy đồ. Không liên quan đến két.' },
      { id: 'tu5', from: 'them', time: '22:06', text: 'Anh Đạt chỉ bảo tôi tắt điện cho khỏi chập, không nói gì khác. Tin nhắn anh ấy còn đó.', clue: 'tin-nhan-dat' },
    ],
  },
  {
    id: 'lan',
    name: 'Lan',
    avatar: '🧾',
    sub: 'Hoạt động 12 phút trước',
    preview: 'Chiều nay anh Đạt đổi mã.',
    requires: ['mat-ket'],
    messages: [
      { id: 'l1', from: 'them', time: '22:08', text: 'Tôi nghỉ ốm từ 20:00, camera tầng 1 quay tôi ra khỏi toà nhà lúc 19:55.', clue: 'mat-khau-ket' },
      { id: 'l2', from: 'them', time: '22:09', text: 'Mã két chỉ tôi và anh Đạt biết. Nhưng 17:00 anh ấy gọi bảo đổi thành 2147 cho dễ nhớ.', clue: 'lan-xac-nhan' },
      { id: 'l3', from: 'them', time: '22:10', text: 'Tôi thấy lạ nhưng không hỏi. Anh ấy nói sinh nhật con gái.' },
      { id: 'l4', from: 'them', time: '22:11', text: '21:50 tài khoản công ty chuyển 200 triệu cho “Bảy – nhà 17”. Người duyệt là anh Đạt.', clue: 'chuyen-khoan' },
    ],
  },
  {
    id: 'khai',
    name: 'Khải (điện thoại)',
    avatar: '🔧',
    sub: 'Thiết bị đang sạc',
    preview: 'Có bản ghi âm lúc 21:12.',
    requires: ['khai-bat-tinh'],
    messages: [
      { id: 'k1', from: 'them', time: '22:14', text: 'Máy anh Khải còn pin. Có một file ghi âm tự động lúc 21:12.', clue: 'khai-ghi-am' },
      { id: 'k2', from: 'them', time: '22:15', text: '“Anh Đạt, sao anh ở đây—” rồi tiếng va đập. Sau đó là tiếng chìa khoá rơi và bước chân chạy lên cầu thang.' },
      { id: 'k3', from: 'them', time: '22:16', text: 'Trong ghi chú: “21:47 — gặp a.Đ ở hầm, kiểm tra két, mang sổ.”', clue: 'ma-ket' },
      { id: 'k4', from: 'them', time: '22:17', text: 'Còn một tin nhắn chưa gửi: “Nếu 22h em không lên, gọi công an.”' },
    ],
  },
  {
    id: 'nga',
    name: 'Cô Nga',
    avatar: '🏪',
    sub: 'Hoạt động 3 phút trước',
    preview: 'Tôi thấy anh Đạt vứt túi.',
    requires: ['camera-tat'],
    messages: [
      { id: 'n1', from: 'them', time: '22:18', text: 'Khoảng 21:30 tôi thấy anh Đạt đi ra hẻm sau, tay xách túi đen, mặt tái lắm.', clue: 'dat-giay' },
      { id: 'n2', from: 'them', time: '22:19', text: 'Anh ấy vứt túi vào thùng rác cạnh nhà tôi. Tôi tò mò nhìn: găng tay, cuốn sổ nâu, mẩu giấy.', clue: 'tui-den' },
      { id: 'n3', from: 'them', time: '22:20', text: 'Mẩu giấy ghi “2147”. Tôi chép lại rồi, sợ anh ấy quay lại lấy.' },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'SMS-1930', time: '19:30', pickup: 'Đạt → Tư', drop: '“Tối nay cúp điện đúng 21h, camera để anh lo”', fee: 'Tin nhắn', status: 'Đã gửi', clue: 'tin-nhan-dat' },
  { id: 'CAM-2108', time: '21:08', pickup: 'Camera hành lang', drop: 'manual off — tài khoản quản lý', fee: 'Nhật ký', status: 'Tắt thủ công', clue: 'nhat-ky-camera' },
  { id: 'GD-2150', time: '21:50', pickup: 'Công ty → Bảy (nhà 17)', drop: '200.000.000đ', fee: 'Chuyển khoản', status: 'Thành công', clue: 'chuyen-khoan' },
  { id: 'GD-2147', time: '21:47', pickup: 'Cửa két — nhập mã', drop: 'Mở thành công', fee: 'Nhật ký két', status: '01 lần', clue: 'ma-ket' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Camera toà bên — 21:22',
    time: '21:22',
    scene: 'street',
    img: 'detective/case4-tui-den.jpg',
    caption: 'Người đàn ông áo sơ mi nhàu, tay xách túi đen, bước ra từ hẻm sau chung cư.',
    clue: 'dat-giay',
  },
  {
    id: 'p2',
    title: 'Camera hầm — 21:15',
    time: '21:15',
    scene: 'net',
    img: 'detective/case4-xe-bao-ve.jpg',
    caption: 'Chiếc xe máy biển 29-X1 đỗ trước cửa hầm. Đèn pha còn sáng.',
    clue: 'tu-loi-khai',
  },
  {
    id: 'p3',
    title: 'Hiện trường — 21:45',
    time: '21:45',
    scene: 'tea',
    img: 'detective/case4-ket-sat.jpg',
    caption: 'Két sắt mở hé, bên trong trống. Trên sàn có vết trầy và một mảnh giấy nhỏ.',
    clue: 'mat-ket',
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 'tr1',
    name: 'ghi-chu-khai.txt',
    kind: 'Ghi chú',
    preview: '21:47 — gặp a.Đ ở hầm…',
    detail: '“21:47 — gặp a.Đ ở hầm, kiểm tra két, mang sổ.”\\n\\nGhi chú cuối cùng trong máy Khải. Giờ hẹn trùng với mã két Đạt vừa đổi.',
    clue: 'ma-ket',
  },
  {
    id: 'tr2',
    name: 'so-no.jpg',
    kind: 'Hình ảnh',
    preview: 'Đạt — 250tr — hạn 26/9',
    detail: 'Trang sổ nâu: “Đạt — 250 triệu — hạn 26/9, 21:00. Không trả thì lấy nhà.” Trang cuối bị xé, vết keo còn mới.',
    clue: 'so-no',
  },
  {
    id: 'tr3',
    name: 'tui-den.txt',
    kind: 'Ghi chú',
    preview: 'Găng tay + sổ nâu + giấy “2147”',
    detail: 'Túi đen cô Nga nhặt trong thùng rác: một đôi găng tay cao su, cuốn sổ nâu bị xé một trang, mẩu giấy viết “2147”.',
    clue: 'tui-den',
  },
]
