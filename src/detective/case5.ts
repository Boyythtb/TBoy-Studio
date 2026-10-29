import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 05',
  title: 'Án mạng phòng trà Hẻm 42',
  place: 'Biệt thự cổ Hoàng Khang · Hẻm 42',
  time: '22:30 · thứ Sáu 17/10',
  brief:
    'Đêm mưa bão, nhà sưu tầm cổ vật Hoàng Khang tử vong bên tách trà kịch độc Aconitine trong phòng kín chốt then cài. Đồng hồ trên tay nạn nhân vỡ kẹt ở 22:15, cạnh bức thư tuyệt mệnh. Một thương nhân bị bắt gặp có bột thảo mộc và máu trong xe, nhưng sự thật đằng sau cái bẫy thời gian lại nằm ở thiết bị IoT và sổ độc dược y tế.',
  culprit: 'vu',
  accomplice: 'yen',
  difficulty: 'Siêu khó',
  question: 'Ai là kẻ chủ mưu đầu độc, và ai là đồng phạm tiếp tay tại hiện trường?',
  solution:
    'Bác sĩ Vũ Hoàng (cháu ruột kiêm bác sĩ riêng) là kẻ chủ mưu. Bị ông Khang truất quyền thừa kế 30 tỷ vì nợ cá độ bóng đá 3,5 tỷ, Vũ đã lấy độc chất Aconitine ký nhận tại Nhà Thuốc Long Châu (nhathuoc-longchau42.vn) bỏ vào chén trà, khiến nạn nhân tử vong lúc 21:30. Vũ cố tình đập vỡ đồng hồ ở mốc 22:15 rồi gọi video call cho tiệm thuốc lúc 22:15 để dựng alibi giả. Cảm biến Smart Home IoT (smarthome.iot) ghi nhận ấm trà đun sôi lúc 21:30 và nước đã nguội ngắt 32°C trước 22:00 vạch trần trò lừa này. Yến giúp việc nhận cọc 200 triệu trên VietinBank (vietinbank.vn) lúc 17:30, gạt cầu dao camera lúc 21:20 và dùng chỉ cước chốt then cửa sổ bên ngoài tạo hiện trường phòng kín.',
}

export const CLUES: Record<string, ClueDef> = {
  'hien-truong': {
    id: 'hien-truong',
    tag: 'photo',
    title: 'Tách trà chứa độc Aconitine',
    detail:
      'Nạn nhân tử vong gục đầu trên bàn trà. Pháp y xác định có độc tố Aconitine (chiết xuất rễ Ô Đầu, kịch độc gây ngừng tim cấp). Ấm trà có 2 tách, tách của ông Khang có độc, tách còn lại nguyên vẹn.',
  },
  'dong-ho-vo': {
    id: 'dong-ho-vo',
    tag: 'photo',
    title: 'Đồng hồ nạn nhân vỡ kẹt lúc 22:15',
    detail:
      'Chiếc đồng hồ Rolex cổ trên cổ tay trái nạn nhân bị rạn vỡ mặt kính, kim đồng hồ dừng chính xác ở 22:15. Thoạt nhìn như nạn nhân ngã đập tay xuống bàn lúc 22:15 nhưng thực chất là hiện trường giả.',
  },
  'nhiet-do-am-tra': {
    id: 'nhiet-do-am-tra',
    tag: 'web',
    title: 'Smart Home IoT: Nước trà đun lúc 21:30 và đã nguội ngắt',
    detail:
      'Nhật ký ấm trà thông minh trên smarthome.iot (IOT-503, IOT-505): Nước đun sôi 100°C lúc 21:30 và nhiệt độ đã hạ xuống 32°C từ trước 22:00. Nạn nhân uống trà và tử vong khoảng 21:35–21:45; đồng hồ vỡ 22:15 hoàn toàn là hiện trường giả!',
  },
  'thu-tuyet-menh-gia': {
    id: 'thu-tuyet-menh-gia',
    tag: 'file',
    title: 'Thư tuyệt mệnh giả mạo',
    detail:
      'Tờ giấy trên bàn ghi: "Tôi mệt mỏi vì bệnh tật, xin tha thứ...". Bút máy đặt bên tay phải, nhưng ông Khang thuận tay trái từ nhỏ. Chữ ký run rẩy mực chưa khô hoàn toàn.',
  },
  'then-cai-chi-cuoc': {
    id: 'then-cai-chi-cuoc',
    tag: 'photo',
    title: 'Sợi chỉ cước ở then cài cửa sổ',
    detail:
      'Then cài cửa sổ hướng ra ban công có vướng một mẩu chỉ cước câu cá mỏng. Camera CAM-503 (camera-phuong.gov.vn) ghi nhận đối tượng mang giày da size 42 trèo ban công giật chỉ cước để chốt then tạo phòng kín lúc 21:42!',
  },
  'camera-ngat': {
    id: 'camera-ngat',
    tag: 'web',
    title: 'Cầu dao camera tầng 2 bị ngắt từ bếp lúc 21:20',
    detail:
      'Nhật ký SmartHome (IOT-502): Cầu dao camera tầng 2 bị ngắt thủ công từ công tắc phụ đặt ở gầm cầu thang bếp tầng 1 — nơi chỉ có Yến giúp việc tiếp cận.',
  },
  'alibi-gia-vu': {
    id: 'alibi-gia-vu',
    tag: 'web',
    title: 'Vũ gọi video call lúc 22:15 tạo alibi giả',
    detail:
      'Nhật ký cuộc gọi Nhà Thuốc Long Châu (nhathuoc-longchau42.vn) LC-502: Lúc 22:15 Vũ gọi video call với dược sĩ hỏi vờ mua thuốc trợ tim để tạo chứng cứ ngoại phạm theo chiếc đồng hồ 22:15 bị đập vỡ!',
  },
  'di-chuc-truat-quyen': {
    id: 'di-chuc-truat-quyen',
    tag: 'file',
    title: 'Di chúc mới: Truất quyền thừa kế 30 tỷ của Vũ',
    detail:
      'Bản thảo di chúc lập lúc 20:30 ngày 17/10: Ông Khang truất quyền thừa kế của Vũ vì phát hiện Vũ ăn cắp cổ vật và ngập trong nợ cá độ bóng đá 3,5 tỷ đồng.',
  },
  'so-no-bac-si': {
    id: 'so-no-bac-si',
    tag: 'chat',
    title: 'Vũ nợ cá cược 3,5 tỷ hạn chót đêm nay',
    detail:
      'Tin nhắn đòi nợ xã hội đen gửi tới Vũ: "Đúng 24:00 hôm nay phải trả đủ 3,5 tỷ tiền bóng, trễ 1 phút thì chuẩn bị quan tài". Vũ đang cùng đường vì tiền.',
  },
  'chuyen-khoan-yen': {
    id: 'chuyen-khoan-yen',
    tag: 'web',
    title: 'Vũ chuyển cọc 200 triệu cho Yến lúc 17:30',
    detail:
      'Sao kê VietinBank (vietinbank.vn) TX-88120: Lúc 17:30:22, Vũ chuyển 200.000.000đ cho Yến giúp việc nội trú với nội dung "tam ung sua nha" — tiền cọc tiếp tay gây án.',
  },
  'tin-nhan-bi-mat': {
    id: 'tin-nhan-bi-mat',
    tag: 'chat',
    title: 'Tin nhắn: “21:20 ngắt cầu dao, xong việc có 2 tỷ”',
    detail:
      'Tin nhắn phục hồi từ điện thoại Yến: Vũ nhắn dặn dò Yến ngắt cầu dao lúc 21:20 và mở cửa ban công, hứa hẹn chia 2 tỷ sau khi chiếm đoạt tài sản.',
  },
  'lo-doc-non-bo': {
    id: 'lo-doc-non-bo',
    tag: 'web',
    title: 'Lọ độc Aconitine xuất từ Nhà thuốc Long Châu',
    detail:
      'Sổ kiểm soát độc chất LC-501 tại Nhà Thuốc Long Châu (nhathuoc-longchau42.vn): Ngày hôm qua Vũ Hoàng trực tiếp ký nhận 20ml dung dịch Aconitine. Lọ độc vớt dưới bể non bộ có dấu vân tay của Yến!',
  },
  'trong-alibi': {
    id: 'trong-alibi',
    tag: 'web',
    title: 'Trọng ở The Moon Lounge từ 21:00 đến 23:00',
    detail:
      'Camera CAM-502 (camera-phuong.gov.vn) và hoá đơn VietinBank (vietinbank.vn) lúc 22:45 xác nhận Trọng ngồi uống rượu liên tục tại The Moon Lounge từ 21:00 đến 23:00. Bột trong xe chỉ là nấm linh chi.',
  },
  'ha-livestream': {
    id: 'ha-livestream',
    tag: 'web',
    title: 'Bà Hà livestream bán hàng liên tục từ 20:00 đến 22:00',
    detail:
      'Trang cá nhân Facebúc (facebuc.vn): Bà Hà livestream bán hàng liên tục từ 20:00 đến 22:00 có hơn 1200 người xem chứng kiến. Người mặc áo mưa tím lúc 21:15 chỉ là shipper GiaoNhanh giao hàng.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'vu',
    name: 'Bác sĩ Vũ',
    role: 'Cháu ruột & Bác sĩ riêng',
    avatar: '👨‍⚕️',
    note: 'Chuyên gia độc chất, đi giày da size 42. Nợ cá cược 3,5 tỷ hạn chót hôm nay. Đã ký nhận độc dược Aconitine.',
  },
  {
    id: 'yen',
    name: 'Yến',
    role: 'Người giúp việc nội trú',
    avatar: '🧹',
    note: 'Nhận cọc 200 triệu từ Vũ lúc 17:30. Tiếp tay ngắt cầu dao tầng 2 và phi tang lọ độc xuống bể non bộ.',
  },
  {
    id: 'trong',
    name: 'Trọng',
    role: 'Thương nhân cổ vật · Cháu họ',
    avatar: '🏺',
    note: 'Cãi nhau đòi 10 tỷ cổ vật chiều nay. Có gói bột thảo mộc trong xe nhưng có alibi tại quán bar The Moon.',
  },
  {
    id: 'ha',
    name: 'Bà Hà',
    role: 'Em gái nạn nhân',
    avatar: '👵',
    note: 'Mua bảo hiểm nhân thọ 10 tỷ cho nạn nhân. Có alibi livestream bán hàng suốt từ 20h đến 22h.',
  },
  {
    id: 'nam',
    name: 'Luật sư Nam',
    role: 'Luật sư gia đình',
    avatar: '💼',
    note: 'Soạn thảo bản di chúc truất quyền thừa kế của Vũ lúc 20:30. Rời đi lúc 21:15 có camera ngõ ghi nhận.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group',
    name: 'Biệt Thự Hoàng Khang · An Ninh',
    avatar: '🏰',
    isGroup: true,
    sub: '18 thành viên',
    preview: 'BÁO ĐỘNG: Ông Hoàng Khang tử vong trong phòng trà!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Yến (Giúp việc)',
        senderAvatar: '🧹',
        time: '22:31',
        text: 'CỨU VỚI MỌI NGƯỜI ƠI! Ông chủ Khang gục chết trên bàn trà tầng 2 rồi, cửa phòng bị khoá chặt then cài bên trong không mở được!',
        clue: 'hien-truong',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Bảo Vệ Ngõ',
        senderAvatar: '🛡️',
        time: '22:33',
        text: 'Chúng tôi vừa phá cửa vào. Ông Khang đã ngừng thở, chiếc đồng hồ Rolex trên tay bị nứt vỡ kẹt cứng đúng 22:15!',
        clue: 'dong-ho-vo',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Bác Sĩ Vũ',
        senderAvatar: '👨‍⚕️',
        time: '22:35',
        text: 'Trời ơi bác tôi! Bác bị suy tim nặng lâu nay rồi... Có bức thư tuyệt mệnh trên bàn... Khoan đã, chiều nay tôi thấy gã lái buôn đồ cổ Trọng đòi nợ bác rất gay gắt và đe doạ bác!',
        clue: 'thu-tuyet-menh-gia',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Yến (Giúp việc)',
        senderAvatar: '🧹',
        time: '22:36',
        text: 'Đúng rồi, lúc 21:10 em thấy ông Trọng lái xe đen lượn qua cổng biệt thự bấm còi inh ỏi! Còn có bà Hà hàng xóm mua bảo hiểm nhân thọ cho ông Khang tuần trước nữa!',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Hàng Xóm Biệt Thự',
        senderAvatar: '🏘️',
        time: '22:37',
        text: 'Khoan đã! Chén trà bốc mùi lạ lùng, và cửa sổ ban công hé mở vướng một mẩu chỉ cước kì lạ! Mau kiểm tra [☕ Smart Home IoT](https://smarthome.iot), [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) và [📹 Camera Phường](https://camera-phuong.gov.vn) ngay!',
        clue: 'then-cai-chi-cuoc',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội trọng án hình sự',
    preview: 'Kỳ án phòng kín siêu khó: Hai lượt đoán!',
    requires: ['hien-truong'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '22:40',
        text: 'Vụ án mạng phòng kín này cực kỳ nguy hiểm và rối ren: Trọng lái buôn đòi nợ có mặt ở ngõ; bà Hà hàng xóm mua bảo hiểm; Yến giúp việc cầm chìa khoá; còn Bác sĩ Vũ là người phát hiện hiện trường.',
      },
      {
        id: 't2',
        from: 'them',
        time: '22:41',
        text: 'Chiếc đồng hồ vỡ lúc 22:15 rất có thể là một chiếc bẫy thời gian ngụy tạo alibi! Em mở [☕ Smart Home IoT](https://smarthome.iot) kiểm tra nhiệt độ nước và giờ đun thực tế của ấm trà!',
        requires: ['dong-ho-vo'],
      },
      {
        id: 't3',
        from: 'them',
        time: '22:42',
        text: 'Mở [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) kiểm tra sổ kiểm soát độc chất Aconitine, và vào [🏦 VietinBank](https://vietinbank.vn) lần theo dòng tiền cọc 200 triệu để tìm ra KẺ CHỦ MƯU và KẺ TIẾP TAY!',
        requires: ['then-cai-chi-cuoc'],
      },
      {
        id: 't4',
        from: 'them',
        time: '22:45',
        text: 'Hồ sơ kết án bị khoá bằng 4 chữ số. Mã mở chính là GIỜ THỰC TẾ đun nước pha tách trà độc trên Smart Home IoT (định dạng 4 số HHMM: 2130)!',
        requires: ['nhiet-do-am-tra'],
      },
      {
        id: 't5',
        from: 'me',
        time: '22:46',
        text: 'Em đã hiểu toàn bộ mánh khoé! Nạn nhân trúng độc từ 21:30, đồng hồ 22:15 là do hung thủ dàn dựng!',
        requires: ['nhiet-do-am-tra'],
      },
      {
        id: 't6',
        from: 'them',
        time: '22:47',
        text: 'Rất tốt! Nhập mã 2130 để mở hồ sơ và vạch trần Bác sĩ Vũ (chủ mưu) cùng Yến giúp việc (đồng phạm)!',
        requires: ['nhiet-do-am-tra'],
      },
    ],
  },
  {
    id: 'vu',
    name: 'Bác sĩ Vũ',
    avatar: '👨‍⚕️',
    sub: 'Hoạt động vừa xong',
    preview: '22:15 tôi đang gọi video cho tiệm thuốc!',
    requires: ['hien-truong'],
    messages: [
      {
        id: 'v1',
        from: 'them',
        time: '22:45',
        text: 'Bác Khang tự tử vì trầm cảm, thư tuyệt mệnh còn mực chưa khô! Lúc 22:15 khi bác mất tôi đang gọi video call cho [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) có ghi nhật ký cuộc gọi đàng hoàng!',
        clue: 'alibi-gia-vu',
      },
      {
        id: 'v2',
        from: 'me',
        time: '22:46',
        text: 'Nhưng trên [☕ Smart Home IoT](https://smarthome.iot) nước trà đun sôi lúc 21:30 và đã nguội ngắt 32°C trước 22:00! Bác Khang đã chết trước 21:45, đồng hồ 22:15 là do anh cố tình đập vỡ!',
        requires: ['nhiet-do-am-tra'],
      },
      {
        id: 'v3',
        from: 'me',
        time: '22:47',
        text: 'Và sổ độc chất LC-501 tại [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) chứng minh hôm qua anh vừa ký nhận 20ml hóa chất kịch độc Aconitine!',
        requires: ['lo-doc-non-bo'],
      },
      {
        id: 'v4',
        from: 'them',
        time: '22:48',
        text: 'Không thể nào... Các người... làm sao các người biết được những chuyện này...',
      },
    ],
  },
  {
    id: 'yen',
    name: 'Yến (Giúp việc)',
    avatar: '🧹',
    sub: 'Đang gõ…',
    preview: 'Em chỉ ở dưới bếp dọn dẹp thôi…',
    requires: ['camera-ngat'],
    messages: [
      { id: 'y1', from: 'them', time: '22:48', text: 'Em thề em ở dưới bếp nấu súp suốt! Mưa to sấm chớp làm cầu dao camera tự nhảy ngắt thôi ạ!' },
      {
        id: 'y2',
        from: 'me',
        time: '22:49',
        text: 'Trên [🏦 VietinBank](https://vietinbank.vn) lúc 17:30 Vũ chuyển cho em 200 triệu, và tin nhắn phục hồi chứng minh anh ta bảo em ngắt cầu dao lúc 21:20 để nhận 2 tỷ!',
        requires: ['chuyen-khoan-yen'],
      },
      {
        id: 'y3',
        from: 'them',
        time: '22:50',
        text: 'Em xin đầu thú! Bác sĩ Vũ đe dọa ép em! Anh ấy đưa tiền bảo em ngắt cầu dao lúc 21:20 và mở then cửa sổ ban công cho anh ấy trèo vào giật chỉ cước... Xin cứu em!',
      },
    ],
  },
  {
    id: 'trong',
    name: 'Trọng (Cổ vật)',
    avatar: '🏺',
    sub: 'Hoạt động 5 phút trước',
    preview: 'Gói bột trong xe tôi chỉ là nấm linh chi!',
    requires: ['hien-truong'],
    messages: [
      {
        id: 'tr1',
        from: 'them',
        time: '22:55',
        text: 'Công an kiểm tra xe tôi thấy bột thảo mộc nâu tưởng là độc, nhưng đó là nấm linh chi đỏ tôi mua biếu mẹ! Găng tay có máu là do chiều nay tôi mổ gà cúng!',
      },
      {
        id: 'tr2',
        from: 'them',
        time: '22:56',
        text: 'Từ 21:00 đến 23:00 tôi ngồi uống rượu ở The Moon Lounge có hoá đơn thẻ trên [🏦 VietinBank](https://vietinbank.vn) và [📹 Camera Phường / Lounge](https://camera-phuong.gov.vn) chứng minh 100%!',
        clue: 'trong-alibi',
      },
    ],
  },
  {
    id: 'ha',
    name: 'Bà Hà (Em gái)',
    avatar: '👵',
    sub: 'Hoạt động 8 phút trước',
    preview: 'Tôi livestream suốt từ 20h đến 22h!',
    requires: ['hien-truong'],
    messages: [
      {
        id: 'h1',
        from: 'them',
        time: '22:57',
        text: 'Ai đồn tôi mặc áo mưa tím vào ngõ lúc 21:15 vậy trời?! Tôi đang livestream bán hàng trên [🌐 Facebúc](https://facebuc.vn) từ 20h đến 22h có hơn nghìn người xem chứng kiến!',
        clue: 'ha-livestream',
      },
      {
        id: 'h2',
        from: 'them',
        time: '22:58',
        text: 'Người mặc áo mưa tím đó là shipper [⚡ GiaoNhanh](https://giaonhanh.vn) giao hộp yến sào cho nhà số 46 bên cạnh đấy!',
      },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'GD-88120', time: '17:30', pickup: 'Vũ Hoàng → Yến giúp việc', drop: '200.000.000đ', fee: 'VietinBank', status: 'Thành công', clue: 'chuyen-khoan-yen' },
  { id: 'GN-44091', time: '21:15', pickup: 'Yến Sào → Nhà số 46 Hẻm 42', drop: 'Áo mưa tím', fee: 'GiaoNhanh', status: 'Hoàn tất' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Hiện trường phòng trà',
    time: '22:30',
    scene: 'street',
    img: 'detective/case5-hien-truong.jpg',
    caption: 'Nạn nhân gục trên bàn trà, đồng hồ vỡ kẹt ở 22:15.',
    clue: 'hien-truong',
  },
  {
    id: 'p2',
    title: 'Sợi chỉ cước ở then cài cửa sổ',
    time: '22:35',
    scene: 'tea',
    img: 'detective/case5-then-cai.jpg',
    caption: 'Sợi chỉ nylon luồn qua khe then cài bên ngoài ban công.',
    clue: 'then-cai-chi-cuoc',
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 'tr1',
    name: 'lo-doc-aconitin.jpg',
    kind: 'Vật chứng giấu kín',
    preview: 'Lọ thủy tinh 10ml dưới bể non bộ',
    detail: 'Lọ thủy tinh chứa dư lượng Aconitine dính vân tay của Yến và nhãn xuất kho Nhà thuốc Long Châu của Bác sĩ Vũ.',
    clue: 'lo-doc-non-bo',
  },
  {
    id: 'tr2',
    name: 'manh-di-chuc-bi-xe.jpg',
    kind: 'Tài liệu phục hồi',
    preview: 'Bản thảo di chúc bị xé nát',
    detail: 'Bản di chúc xé vụn: Ông Khang truất quyền thừa kế 30 tỷ của Vũ vì khoản nợ cờ bạc cá cược 3,5 tỷ.',
    clue: 'di-chuc-truat-quyen',
  },
]
