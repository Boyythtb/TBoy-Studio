import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 03',
  title: 'Chiếc hòm quỹ đêm hội chợ',
  place: 'Hội chợ Trung thu · Hẻm 42',
  time: '21:20 · thứ Bảy 26/9',
  brief:
    'Hòm quỹ từ thiện mất đúng 8 triệu đồng ngay trong mười lăm phút mất điện cầu dao. Ổ khoá bị cạy từ phía trong. Một gã đòi nợ bị bắt gặp có 8 triệu tiền mặt, một nam sinh bị camera thấy cúi cạnh hòm, nhưng sự thật lại nằm ở dấu bùn đỏ và dòng sao kê điện tử.',
  culprit: 'trang',
  difficulty: 'Khó',
  question: 'Ai đã lấy 8 triệu từ hòm quỹ từ thiện?',
  solution:
    'Trang (thủ quỹ) nhận chìa hòm từ Oanh lúc 20:30, lợi dụng lúc mất điện cầu dao 20:55–21:10 đã dùng hộp đèn pin ra sau bệ hòm quỹ cạy khoá lấy 8 triệu rồi chuyển khoản ngay cho Tú lúc 21:32 trên VietinBank (vietinbank.vn). Tú bị nghi vì có 8 triệu tiền mặt nhưng thực chất là vừa rút ATM sau khi nhận tiền của Trang (camera quán Phúc camera-phuong.gov.vn chứng minh Tú ngồi uống trà đá suốt 20:57–21:25). Khoa có alibi vững chắc khi biên lai Nhà thuốc Long Châu (nhathuoc-longchau42.vn) xác nhận bàn tay bị bỏng nước sôi băng kín từ 20:42 không thể cạy khoá.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-quy': {
    id: 'mat-quy',
    tag: 'chat',
    title: 'Mất 8 triệu trong hòm quỹ',
    detail: 'Ban tổ chức kiểm quỹ lúc 21:20: thiếu đúng 8.000.000đ. Hòm bị cạy, khoá rơi dưới đất sau khi mất điện cầu dao.',
  },
  'cat-dien': {
    id: 'cat-dien',
    tag: 'chat',
    title: 'Mất điện 20:55 – 21:10',
    detail: 'Cả khu hội chợ tối om mười lăm phút do aptomat nhánh bị ngắt. Camera an ninh chính tắt theo.',
  },
  'khoa-gan-hom': {
    id: 'khoa-gan-hom',
    tag: 'photo',
    title: 'Khoa cúi sát bệ hòm lúc 20:48',
    detail: 'Camera ghi lại cảnh Khoa — tình nguyện viên — cúi xuống cạnh hòm quỹ. Thực chất Khoa cúi nhặt vỏ hộp bánh kẹo bị gió thổi bay.',
  },
  'khoa-bi-thuong': {
    id: 'khoa-bi-thuong',
    tag: 'web',
    title: 'Khoa bị bỏng tay quấn băng y tế từ 20:40',
    detail: 'Hoá đơn LC-301 tại Nhà Thuốc Long Châu (nhathuoc-longchau42.vn): Khoa bị bỏng nước sôi mu bàn tay trái lúc 20:40, dược sĩ quấn băng gạc to tướng không thể cầm nắm hay cạy khoá sắt!',
  },
  'ket-cay': {
    id: 'ket-cay',
    tag: 'photo',
    title: 'Ổ khoá bị cạy từ phía trong',
    detail: 'Lưỡi khoá cong hướng ra ngoài, vết xước nằm ở mặt trong. Kẻ gian mở hòm khi đã ở rất gần và dùng chìa hoặc dụng cụ chuyên dụng khi đứng sau hòm.',
  },
  'chia-ket': {
    id: 'chia-ket',
    tag: 'chat',
    title: 'Oanh giao chìa cho Trang lúc 20:30',
    detail: 'Oanh giữ chìa hòm nhưng lúc 20:30 phải lên sân khấu trực loa nên giao lại cho thủ quỹ Trang giữ.',
  },
  'trang-giay': {
    id: 'trang-giay',
    tag: 'photo',
    title: 'Giày trắng của Trang dính bùn đỏ lúc 21:02',
    detail: 'Camera cổng chùa (camera-phuong.gov.vn) ghi nhận Trang đi giày bata trắng dính bùn đỏ lúc 21:02. Bùn đỏ chỉ có duy nhất ở bãi cỏ trũng phía sau bệ hòm quỹ!',
  },
  'chuyen-tien-trng': {
    id: 'chuyen-tien-trng',
    tag: 'web',
    title: 'Lệnh chuyển khoản 8 triệu của Trang lúc 21:32',
    detail: 'Sao kê VietinBank (vietinbank.vn) TX-99812: Đúng 21:32:15, Trang chuyển 8.000.000đ cho Vũ Đình Tú với nội dung "Trang banh mi chuyen tra no goc lai thang 9". Bằng chứng đanh thép!',
  },
  'tu-o-quan-phuc': {
    id: 'tu-o-quan-phuc',
    tag: 'web',
    title: 'Tú ngồi quán Phúc từ 20:57 đến 21:25',
    detail: 'Camera CAM-301 (camera-phuong.gov.vn) và đơn ship GiaoNhanh GN-66401 xác nhận Tú ngồi bàn ngoài quán trà đá anh Phúc suốt từ 20:57 đến 21:25, không hề bước vào khuôn viên hòm quỹ.',
  },
  'hop-den': {
    id: 'hop-den',
    tag: 'file',
    title: 'Hộp đèn pin sau bãi cỏ',
    detail: 'Hộp đèn pin nhựa trắng nằm sau bãi cỏ có dấu bùn đỏ và chữ "T" viết bút xoá của Trang dùng để soi cạy khoá khi mất điện.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'trang',
    name: 'Trang Bán Bánh',
    role: 'Thủ quỹ hội chợ · Quầy bánh mì',
    avatar: '🥖',
    note: 'Giữ chìa hòm từ 20:30. Nợ Tú 8 triệu bị đòi gắt gao. Giày dính bùn đỏ.',
  },
  {
    id: 'tu',
    name: 'Tú Tài Chính',
    role: 'Chủ nợ đòi tiền',
    avatar: '💸',
    note: 'Đến đòi nợ lúc 20:58, trong người có đúng 8 triệu tiền mặt rút từ cây ATM.',
  },
  {
    id: 'khoa',
    name: 'Khoa Tình Nguyện',
    role: 'Sinh viên tình nguyện',
    avatar: '🧑',
    note: 'Bị bảo vệ thấy cúi sát hòm lúc 20:48. Bị bỏng nước sôi ở tay.',
  },
  {
    id: 'oanh',
    name: 'Oanh Trưởng Ban',
    role: 'Trưởng ban tổ chức',
    avatar: '👩‍💼',
    note: 'Giữ chìa gốc, đưa chìa cho Trang lúc 20:30 để lên sân khấu.',
  },
  {
    id: 'hung',
    name: 'Chú Hùng',
    role: 'Bảo vệ khuôn viên chùa',
    avatar: '👴',
    note: 'Người phát hiện sự cố mất điện và thấy bóng người ở bãi cỏ.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group',
    name: 'BĐH Hội Chợ Trung Thu',
    avatar: '🏮',
    isGroup: true,
    sub: '10 thành viên',
    preview: 'Oanh: Mất 8 triệu tiền hòm từ thiện rồi mọi người ơi!',
    messages: [
      {
        id: 'hg1',
        from: 'them',
        senderName: 'Oanh (Trưởng BTC)',
        senderAvatar: '👩‍💼',
        time: '21:20',
        text: 'CẢ NHÀ ƠI! Hòm quỹ từ thiện vừa bị cạy mất 8 triệu đồng! Lúc 21:10 vừa có điện lại tôi kiểm tra thì khoá đã rơi dưới đất!',
        clue: 'mat-quy',
      },
      {
        id: 'hg2',
        from: 'them',
        senderName: 'Chú Hùng Bảo Vệ',
        senderAvatar: '👴',
        time: '21:22',
        text: 'Lúc 20:48 tôi thấy thằng Khoa tình nguyện viên lúi húi cúi sát bệ hòm quỹ rất khả nghi! Chắc chắn nó làm!',
        clue: 'khoa-gan-hom',
      },
      {
        id: 'hg3',
        from: 'them',
        senderName: 'Khoa Tình Nguyện',
        senderAvatar: '🧑',
        time: '21:24',
        text: 'Chú Hùng ơi cháu bị oan! Tay cháu bị bỏng nước sôi từ 20:40 khi khiêng nồi chè, vừa ra [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) băng bó trắng xoá tay trái! Lúc 20:48 cháu cúi nhặt vỏ hộp bánh kẹo thôi!',
        clue: 'khoa-bi-thuong',
      },
      {
        id: 'hg4',
        from: 'them',
        senderName: 'Trang Bán Bánh',
        senderAvatar: '🥖',
        time: '21:26',
        text: 'Em nghe bảo có người thấy gã đòi nợ Tú lảng vảng mang theo túi vải to lắm! Mọi người thử hỏi Tú xem!',
      },
      {
        id: 'hg5',
        from: 'them',
        senderName: 'Tú Tài Chính',
        senderAvatar: '💸',
        time: '21:30',
        text: 'Này con Trang kia, mày định ngậm máu phun người hả? Tao đến tìm mày lấy nợ, tao ngồi uống trà đá ở quán anh Phúc đầu hẻm suốt từ 20:57 đến 21:25 có camera với chủ quán làm chứng! Mày giữ chìa hòm thì tự giải trình đi!',
        clue: 'tu-o-quan-phuc',
      },
      {
        id: 'hg6',
        from: 'them',
        senderName: 'Oanh (Trưởng BTC)',
        senderAvatar: '👩‍💼',
        time: '21:32',
        text: 'Mọi người thôi cãi nhau đi! Hòm quỹ có khoá cẩn thận, lúc 20:30 tôi đưa chìa cho Trang để lên sân khấu. Khoá bị cạy từ mặt trong, phải người đứng rất gần mới mở được!',
        clue: 'chia-ket',
      },
      {
        id: 'hg7',
        from: 'them',
        senderName: 'Chú Hùng Bảo Vệ',
        senderAvatar: '👴',
        time: '21:35',
        text: 'Hiện trường rất lộn xộn. Bãi cỏ sau bệ hòm quỹ có bùn đất đỏ rất trơn. Ai từng ra khu vực đó lúc mất điện phải kiểm tra giày dép ngay!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra khu vực',
    preview: 'Xem kỹ ai chuyển tiền cho ai trên VietinBank!',
    requires: ['mat-quy'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:40',
        text: 'Hiện trường rất rối loạn: Khoa bị thấy lúi húi gần hòm quỹ; gã đòi nợ Tú có mặt đòi tiền; còn thủ quỹ Trang giữ chìa khoá.',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:41',
        text: 'Em cần kiểm tra thương tích của Khoa tại [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn), camera quán nước của Tú tại [📹 Camera Phường](https://camera-phuong.gov.vn), và dòng tiền trên [🏦 VietinBank](https://vietinbank.vn) để tìm ra ai thực sự đã mở khoá hòm quỹ!',
      },
      {
        id: 't3',
        from: 'them',
        time: '21:42',
        text: 'Sau đó mở [🏦 VietinBank](https://vietinbank.vn) kiểm tra lệnh chuyển khoản 8 triệu của Trang lúc 21:32 là rõ mười mươi thủ phạm!',
      },
    ],
  },
  {
    id: 'khoa',
    name: 'Khoa Tình Nguyện',
    avatar: '🧑',
    sub: 'Hoạt động 2 phút trước',
    preview: 'Em có hoá đơn sơ cứu của Long Châu.',
    requires: ['khoa-gan-hom'],
    messages: [
      {
        id: 'k1',
        from: 'them',
        time: '21:44',
        text: 'Anh chị ơi em đau tay muốn khóc, trên [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) có ghi nhận mã LC-301 lúc 20:42 em mua thuốc bôi bỏng và băng thun quấn tay trái ạ!',
        clue: 'khoa-bi-thuong',
      },
      { id: 'k2', from: 'me', time: '21:45', text: 'Anh đã xác minh hoá đơn y tế của em, em hoàn toàn vô tội.' },
    ],
  },
  {
    id: 'tu',
    name: 'Tú Tài Chính',
    avatar: '💸',
    sub: 'Hoạt động 1 phút trước',
    preview: 'Tôi ngồi ở quán Phúc suốt từ 20:57.',
    requires: ['mat-quy'],
    messages: [
      {
        id: 'tu1',
        from: 'them',
        time: '21:46',
        text: 'Tôi ngồi ăn uống ở quán trà Phúc từ 20:57 đến 21:25 có đơn [⚡ GiaoNhanh](https://giaonhanh.vn) giao đồ ăn và [📹 Camera Phường](https://camera-phuong.gov.vn) ghi hình rõ nét! Trang nợ tôi 8 triệu hứa 21h30 chuyển, đúng 21:32 nó chuyển trên [🏦 Sao Kê VietinBank](https://vietinbank.vn) thì tôi ra ATM rút tiền thôi!',
        clue: 'tu-o-quan-phuc',
      },
      { id: 'tu2', from: 'them', time: '21:47', text: 'Con Trang chuyển 8 triệu cho tôi với nội dung "Trang banh mi tra no thang 9", mọi người vào kiểm tra sao kê mà xem!', clue: 'chuyen-tien-trng' },
    ],
  },
  {
    id: 'trang',
    name: 'Trang Bán Bánh',
    avatar: '🥖',
    sub: 'Hoạt động vừa xong',
    preview: 'Em... em chỉ gom tiền trả nợ thôi mà...',
    requires: ['mat-quy'],
    messages: [
      { id: 'tr1', from: 'them', time: '21:48', text: 'Em đứng trông quầy bánh suốt mà... Chú Hùng thấy thằng Khoa lúi húi bên hòm quỹ sao không tra hỏi nó?' },
      {
        id: 'tr2',
        from: 'me',
        time: '21:49',
        text: 'Nhưng camera cổng chùa ghi rõ em đi ra từ bãi cỏ sau hòm quỹ lúc 21:02 với túi xách căng phồng, giày dính bùn đỏ, rồi chuyển 8 triệu cho Tú trên VietinBank lúc 21:32!',
        requires: ['chuyen-tien-trng'],
        clue: 'trang-giay',
      },
      { id: 'tr3', from: 'them', time: '21:50', text: '...Em bị anh Tú doạ siết nợ em sợ quá... Em xin lỗi mọi người, em sẽ đền lại tiền quỹ...', requires: ['chuyen-tien-trng'] },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'GD-2610', time: '21:32', pickup: 'Trang → Tú (chuyển nợ)', drop: '8.000.000đ', fee: 'VietinBank', status: 'Thành công', clue: 'chuyen-tien-trng' },
  { id: 'GN-66401', time: '21:15', pickup: 'Bún chả → Quán Phúc (giao cho Tú)', drop: 'Đồ ăn đêm', fee: 'GiaoNhanh', status: 'Hoàn tất', clue: 'tu-o-quan-phuc' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Camera hội chợ lúc 20:48',
    time: '20:48',
    scene: 'street',
    img: 'detective/case3-khoa-hom.jpg',
    caption: 'Khoa cúi xuống cạnh hòm quỹ nhặt vỏ hộp.',
    clue: 'khoa-gan-hom',
  },
  {
    id: 'p2',
    title: 'Ổ khoá bị cạy từ phía trong',
    time: '21:10',
    scene: 'tea',
    img: 'detective/case3-o-khoa.jpg',
    caption: 'Lưỡi khoá cong hướng ra ngoài, mặt trong có vết xước kim loại.',
    clue: 'ket-cay',
  },
  {
    id: 'p3',
    title: 'Giày trắng của Trang lúc 21:02',
    time: '21:02',
    scene: 'net',
    img: 'detective/case3-giay-trang.jpg',
    caption: 'Đôi giày bata dính bùn đỏ đặc trưng chỉ có ở sau bệ hòm quỹ.',
    clue: 'trang-giay',
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 'tr1',
    name: 'hop-den-pin.jpg',
    kind: 'Vật chứng',
    preview: 'Hộp đèn pin nhựa trắng',
    detail: 'Hộp đèn pin mini có khắc chữ "T", vứt sau bãi cỏ dính bùn đỏ, dùng để soi cạy hòm lúc mất điện.',
    clue: 'hop-den',
  },
  {
    id: 'tr2',
    name: 'giay-vay-no-8tr.txt',
    kind: 'Tài liệu',
    preview: 'Giấy vay nợ 8 triệu của Tú',
    detail: 'Giấy vay nợ 8.000.000đ của Trang, hạn chót ngày 26/9, người cho vay là Vũ Đình Tú.',
    clue: 'chuyen-tien-trng',
  },
]
