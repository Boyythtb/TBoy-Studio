import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 05',
  title: 'Án mạng phòng trà Hẻm 42',
  place: 'Biệt thự cổ Hoàng Khang · Hẻm 42',
  time: '22:30 · thứ Sáu 17/10',
  brief:
    'Đêm mưa bão, ông Hoàng Khang — trùm sưu tầm cổ vật giàu có — gục chết bên bàn trà. Cửa phòng khoá then cài bên trong, đồng hồ trên tay nạn nhân vỡ kẹt ở 22:15, cạnh bức thư tuyệt mệnh. Nhưng chén trà chứa kịch độc Aconitine, và bản thảo di chúc 30 tỷ vừa ký chiều nay đã biến mất không dấu vết.',
  culprit: 'vu',
  accomplice: 'yen',
  difficulty: 'Siêu khó',
  question: 'Ai là kẻ chủ mưu đầu độc, và ai là đồng phạm tiếp tay tại hiện trường?',
  solution:
    'Bác sĩ Vũ (cháu ruột kiêm bác sĩ riêng) là kẻ chủ mưu. Biết tin ông Khang vừa lập di chúc truất quyền thừa kế của mình vì nợ cá cược 3,5 tỷ, Vũ đã tẩm độc Aconitine (chiết xuất rễ Ô Đầu) vào viên thảo dược an thần của ông Khang, khiến ông tử vong lúc 21:30. Sau đó, Vũ chỉnh lùi đồng hồ nạn nhân và đập vỡ ở mốc 22:15 để tạo chứng cứ ngoại phạm (lúc 22:15 Vũ cố tình gọi video call cho tiệm thuốc). Yến (người giúp việc) là đồng phạm: Yến ngắt cầu dao camera lúc 21:20, hỗ trợ Vũ tạo hiện trường phòng kín bằng sợi chỉ cước luồn qua then cài cửa sổ, sau đó phi tang lọ độc dược xuống bể lọc hòn non bộ và xé hủy bản thảo di chúc để nhận 2 tỷ tiền chia chác.',
}

export const CLUES: Record<string, ClueDef> = {
  'hien-truong': {
    id: 'hien-truong',
    tag: 'photo',
    title: 'Tách trà chứa độc Aconitine',
    detail:
      'Nạn nhân tử vong gục đầu trên bàn trà. Pháp y xác định có độc tố Aconitine (chiết xuất rễ Ô Đầu, kịch độc gây ngừng tim cấp). Ấm trà Thiết Quan Âm có 2 tách, tách của ông Khang có độc, tách còn lại nguyên vẹn.',
  },
  'dong-ho-vo': {
    id: 'dong-ho-vo',
    tag: 'photo',
    title: 'Đồng hồ nạn nhân vỡ kẹt lúc 22:15',
    detail:
      'Chiếc đồng hồ Rolex cổ trên cổ tay trái nạn nhân bị rạn vỡ mặt kính, kim đồng hồ dừng chính xác ở 22:15. Thoạt nhìn như nạn nhân ngã đập tay xuống bàn lúc 22:15.',
  },
  'nhiet-do-am-tra': {
    id: 'nhiet-do-am-tra',
    tag: 'web',
    title: 'Log ấm điện: Nước đun lúc 21:30',
    detail:
      'Nhật ký ấm đun siêu tốc thông minh Xiaomi kết nối Wifi: Nước được đun sôi 100°C đúng lúc 21:30 rồi tự ngắt. Đến 22:15 nước trong ấm chỉ còn 43°C — chứng minh tách trà được pha và uống lúc 21:30 chứ không thể là 22:15!',
  },
  'thu-tuyet-menh-gia': {
    id: 'thu-tuyet-menh-gia',
    tag: 'file',
    title: 'Thư tuyệt mệnh giả mạo',
    detail:
      'Tờ giấy trên bàn ghi: "Tôi mệt mỏi vì bệnh tật, xin tha thứ...". Bút máy đặt bên tay phải, nhưng ông Khang thuận tay trái từ nhỏ. Chữ ký run rẩy, mực còn chưa khô hoàn toàn.',
  },
  'then-cai-chi-cuoc': {
    id: 'then-cai-chi-cuoc',
    tag: 'photo',
    title: 'Sợi chỉ cước ở then cài cửa sổ',
    detail:
      'Cửa chính phòng trà khoá then cài bên trong. Tuy nhiên then cài cửa sổ hướng ra ban công có vướng một mẩu chỉ cước câu cá mỏng dính. Đây là thủ thuật luồn chỉ kéo then cài từ bên ngoài ban công!',
  },
  'vet-bun-ban-cong': {
    id: 'vet-bun-ban-cong',
    tag: 'photo',
    title: 'Vết giày da size 42 ở ban công',
    detail:
      'Ban công phòng trà tầng 2 có vết bùn trơn trượt khớp với đế giày da nam cao cấp size 42. Ông Khang chỉ đi dép nhung trong nhà size 40.',
  },
  'camera-ngat': {
    id: 'camera-ngat',
    tag: 'chat',
    title: 'Camera tầng 2 mất điện lúc 21:20',
    detail:
      'Camera an ninh hướng thẳng hành lang tầng 2 mất tín hiệu đột ngột từ 21:20 đến 22:25. Cầu dao riêng của hệ thống camera đặt ở góc bếp tầng 1 — nơi chỉ người trong nhà tiếp cận được.',
  },
  'alibi-gia-vu': {
    id: 'alibi-gia-vu',
    tag: 'web',
    title: 'Vũ gọi video call lúc 22:15',
    detail:
      'Nhật ký mạng: Lúc 22:15, Vũ thực hiện cuộc gọi video call kéo dài 6 phút với dược sĩ nhà thuốc cách biệt thự 5 km hỏi mua thuốc tim mạch. Đây là chứng cứ ngoại phạm có chủ đích nếu tin vào chiếc đồng hồ 22:15!',
  },
  'di-chuc-truat-quyen': {
    id: 'di-chuc-truat-quyen',
    tag: 'file',
    title: 'Bản thảo di chúc: Truất quyền thừa kế của Vũ',
    detail:
      'Luật sư Nam xác nhận: 20:30 tối nay ông Khang đã ký bản thảo di chúc mới, truất toàn bộ quyền thừa kế của Vũ vì phát hiện Vũ ngập trong nợ nần cờ bạc, chuyển toàn bộ 30 tỷ cho viện dưỡng lão.',
  },
  'so-no-bac-si': {
    id: 'so-no-bac-si',
    tag: 'chat',
    title: 'Vũ nợ cá cược 3,5 tỷ hạn chót đêm nay',
    detail:
      'Tin nhắn đòi nợ gắt gao gửi tới Vũ: "Đúng 24:00 hôm nay 17/10 phải trả 3,5 tỷ tiền bóng, trễ 1 phút thì chuẩn bị quan tài". Vũ đang cùng đường vì tiền.',
  },
  'chuyen-khoan-yen': {
    id: 'chuyen-khoan-yen',
    tag: 'web',
    title: 'Vũ chuyển cọc 200 triệu cho Yến lúc 18:00',
    detail:
      'Biến động tài khoản: 18:00 chiều nay, Vũ chuyển 200.000.000đ cho cô giúp việc Yến với nội dung "vay mượn". Nhưng Yến lương tháng chỉ 8 triệu, không có lý do vay số tiền lớn như vậy.',
  },
  'tin-nhan-bi-mat': {
    id: 'tin-nhan-bi-mat',
    tag: 'chat',
    title: 'Tin nhắn: “21:20 ngắt cầu dao, xong việc có 2 tỷ”',
    detail:
      'Đoạn tin nhắn bí mật được phục hồi: Vũ nhắn cho Yến dặn dò ngắt cầu dao lúc 21:20, mở cửa sau và lau dọn ban công, hứa hẹn trích 2 tỷ sau khi nhận tiền thừa kế.',
  },
  'lo-doc-non-bo': {
    id: 'lo-doc-non-bo',
    tag: 'file',
    title: 'Lọ độc Ô Đầu giấu dưới bể non bộ',
    detail:
      'Tìm thấy lọ thủy tinh nhỏ giấu trong khoang lọc nước hòn non bộ sân sau. Kết quả thử nghiệm có nồng độ Aconitine cực cao. Trên miệng lọ có dấu vân tay của Yến và nhãn thuốc chuyên dụng của phòng khám Bác sĩ Vũ!',
  },
  'trong-alibi': {
    id: 'trong-alibi',
    tag: 'web',
    title: 'Trọng ở quán bar The Moon từ 21:00 đến 23:00',
    detail:
      'Camera và hóa đơn quẹt thẻ tại The Moon Lounge: Anh Trọng ngồi uống rượu liên tục từ 21:00 đến 23:00 cùng 2 đối tác. Trọng hoàn toàn có chứng cứ ngoại phạm.',
  },
  'ha-livestream': {
    id: 'ha-livestream',
    tag: 'web',
    title: 'Bà Hà phát livestream liên tục 2 tiếng',
    detail:
      'Kênh bán hàng của bà Hà phát trực tiếp từ 20:30 đến 22:30 không rời ống kính một phút nào. Có hàng trăm khách xem trực tiếp làm chứng.',
  },
  'phuc-chia-khoa': {
    id: 'phuc-chia-khoa',
    tag: 'chat',
    title: 'Thợ khóa Phúc sửa khóa từ sáng',
    detail:
      'Anh Phúc đến tra dầu cửa phòng trà từ 09:00 sáng và về lúc 10:15. Biên lai giao nhận và camera ngõ xác nhận anh không quay lại vào buổi tối.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'vu',
    name: 'Bác sĩ Vũ',
    role: 'Cháu ruột & Bác sĩ riêng',
    avatar: '👨‍⚕️',
    note: 'Chuyên môn y khoa, am hiểu độc dược. Đi giày da size 42. Đang gánh khoản nợ cá độ 3,5 tỷ hạn chót hôm nay.',
  },
  {
    id: 'yen',
    name: 'Yến',
    role: 'Người giúp việc nội trú',
    avatar: '🧹',
    note: 'Có chìa khóa các phòng. Khai ở bếp tầng 1 suốt tối, nhưng vừa nhận 200 triệu chuyển khoản lúc 18:00.',
  },
  {
    id: 'trong',
    name: 'Trọng',
    role: 'Thương nhân cổ vật',
    avatar: '🏺',
    note: 'Chiều nay tranh chấp gay gắt hợp đồng chiếc bình gốm 3 tỷ. Khai ở quán bar The Moon lúc xảy ra vụ việc.',
  },
  {
    id: 'nam',
    name: 'Luật sư Nam',
    role: 'Luật sư gia đình',
    avatar: '💼',
    note: 'Đến lúc 20:30 soạn thảo di chúc mới truất quyền của Vũ. Rời đi lúc 21:15 có camera ngõ ghi nhận.',
  },
  {
    id: 'ha',
    name: 'Bà Hà',
    role: 'Em gái nạn nhân',
    avatar: '👵',
    note: 'Từng nhắn tin gay gắt đòi phân chia đất tổ phụ. Khai bận livestream bán hàng suốt buổi tối.',
  },
  {
    id: 'phuc',
    name: 'Phúc',
    role: 'Thợ sửa khóa',
    avatar: '🔧',
    note: 'Đến tra dầu then cài cửa phòng trà sáng nay. Rời đi từ trưa, có phiếu thanh toán.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group',
    name: 'Biệt Thự 42 · An Ninh',
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
        text: 'Cứu với mọi người ơi! Ông chủ Khang gục trên bàn trà tầng 2 không thở nữa, cửa phòng bị khoá chặt bên trong rồi!',
        clue: 'hien-truong',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Bảo Vệ Ngõ',
        senderAvatar: '🛡️',
        time: '22:33',
        text: 'Chúng tôi vừa phá cửa vào. Ông Khang đã ngừng tim, đồng hồ trên tay bị nứt vỡ kẹt đúng 22:15!',
        clue: 'dong-ho-vo',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Bác Sĩ Vũ',
        senderAvatar: '👨‍⚕️',
        time: '22:35',
        text: 'Trời ơi chú tôi! Có bức thư tuyệt mệnh trên bàn... Chú bị trầm cảm nặng lâu nay rồi, tôi xin mọi người giữ trật tự!',
        clue: 'thu-tuyet-menh-gia',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Tổ Trưởng Dân Phố',
        senderAvatar: '🏘️',
        time: '22:36',
        text: 'Khoan đã! Trên bàn có chén trà mùi hắc lạ lùng, và cửa sổ ban công hé mở vướng sợi chỉ kỳ quặc. Phải phong tỏa ngay lập tức!',
        clue: 'then-cai-chi-cuoc',
      },
      { id: 'g5', from: 'me', time: '22:37', text: 'Cảnh sát hình sự đang có mặt. Không ai được rời khỏi biệt thự!' },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đang trực tuyến',
    preview: 'Vụ án mạng này chỉ có đúng 2 lượt đoán!',
    requires: ['hien-truong'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '22:40',
        text: 'Vụ này cực kỳ nghiêm trọng. Kẻ thủ ác tính toán tỉ mỉ ngụy tạo một án mạng phòng kín và cố ý giả mạo giờ tử vong!',
      },
      {
        id: 't2',
        from: 'them',
        time: '22:41',
        text: 'Chiếc đồng hồ vỡ lúc 22:15 là một cái bẫy thời gian. Em phải tìm chứng cứ khoa học chứng minh giờ chết thực sự!',
        requires: ['dong-ho-vo'],
      },
      {
        id: 't3',
        from: 'them',
        time: '22:42',
        text: 'Kiểm tra log thiết bị điện thông minh trong phòng trà xem nước trà được đun vào thời điểm nào.',
        requires: ['then-cai-chi-cuoc'],
      },
      {
        id: 't4',
        from: 'them',
        time: '22:44',
        text: 'Hung thủ có tay trong tiếp ứng ngắt camera và dọn dẹp hiện trường. Phải tìm ra cả kẻ chủ mưu lẫn tên đồng phạm!',
        requires: ['camera-ngat'],
      },
      {
        id: 't5',
        from: 'them',
        time: '22:45',
        text: 'Hồ sơ kết án bị khoá bằng 4 chữ số. Mã mở chính là GIỜ THỰC TẾ nạn nhân pha và uống tách trà độc (định dạng HHMM)!',
        requires: ['nhiet-do-am-tra'],
      },
      {
        id: 't6',
        from: 'me',
        time: '22:46',
        text: 'Em đã nắm rõ chân tướng. Nạn nhân uống trà lúc 21:30, đồng hồ 22:15 là do hung thủ ngụy tạo để tạo alibi!',
        requires: ['nhiet-do-am-tra'],
      },
      {
        id: 't7',
        from: 'them',
        time: '22:47',
        text: 'Chính xác! Nhập mã 2130 để mở hồ sơ và vạch trần kẻ thủ ác cùng tòng phạm ngay!',
        requires: ['nhiet-do-am-tra'],
      },
    ],
  },
  {
    id: 'vu',
    name: 'Bác sĩ Vũ',
    avatar: '👨‍⚕️',
    sub: 'Hoạt động vừa xong',
    preview: '22:15 tôi đang gọi video cho nhà thuốc!',
    requires: ['hien-truong'],
    messages: [
      {
        id: 'v1',
        from: 'them',
        time: '22:45',
        text: 'Chú Khang tự tử vì trầm cảm và suy tim, tôi là bác sĩ của chú nên tôi biết rõ nhất. Bức thư tuyệt mệnh trên bàn là chữ chú ấy!',
      },
      {
        id: 'v2',
        from: 'me',
        time: '22:46',
        text: 'Bút máy đặt bên phải, trong khi ông Khang thuận tay trái. Anh giải thích sao về vết giày da size 42 ở ban công?',
        requires: ['thu-tuyet-menh-gia'],
      },
      {
        id: 'v3',
        from: 'them',
        time: '22:47',
        text: 'Tôi... tôi không biết! Lúc 22:15 khi chú ấy chết, tôi đang ở tiệm thuốc Long Châu cách đây 5 km gọi video call, có nhật ký cuộc gọi làm chứng đàng hoàng!',
        clue: 'alibi-gia-vu',
      },
      {
        id: 'v4',
        from: 'me',
        time: '22:48',
        text: 'Nạn nhân trúng độc từ 21:30 lúc uống trà, anh đập vỡ đồng hồ lúc 22:15 để chuẩn bị alibi đúng không?',
        requires: ['nhiet-do-am-tra'],
      },
      {
        id: 'v5',
        from: 'them',
        time: '22:49',
        text: 'Các người vu khống! Tôi là người thừa kế duy nhất của chú ấy, cớ sao tôi phải giết chú?',
      },
      {
        id: 'v6',
        from: 'me',
        time: '22:50',
        text: 'Ông Khang vừa ký di chúc truất quyền thừa kế của anh lúc 20:30 tối nay vì khoản nợ cờ bạc 3,5 tỷ của anh!',
        requires: ['so-no-bac-si', 'di-chuc-truat-quyen'],
      },
      {
        id: 'v7',
        from: 'them',
        time: '22:51',
        text: 'Không... sao các người lại tìm ra bản di chúc đó được... Bản thảo đó rõ ràng đã bị xé nát rồi mà?!',
        requires: ['di-chuc-truat-quyen'],
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
      {
        id: 'y1',
        from: 'them',
        time: '22:48',
        text: 'Em thề em không biết gì hết! Lúc 21:20 ngoài trời mưa to sấm sét, cầu dao camera tự nhảy tắt ngúm chứ em đâu có đụng vào!',
      },
      {
        id: 'y2',
        from: 'me',
        time: '22:49',
        text: 'Cầu dao bị kéo gạt xuống bằng tay chứ không có dấu hiệu chập điện. Chiều nay 18:00 anh Vũ chuyển 200 triệu cho em làm gì?',
        requires: ['chuyen-khoan-yen'],
      },
      {
        id: 'y3',
        from: 'them',
        time: '22:50',
        text: 'Tiền đó... tiền đó anh Vũ cho em mượn sửa nhà ở quê thôi ạ...',
      },
      {
        id: 'y4',
        from: 'me',
        time: '22:51',
        text: 'Lọ độc Aconitine giấu dưới đáy bể lọc non bộ có dấu vân tay của em. Tin nhắn "gạt cầu dao, xong việc có 2 tỷ" đã được khôi phục!',
        requires: ['lo-doc-non-bo', 'tin-nhan-bi-mat'],
      },
      {
        id: 'y5',
        from: 'them',
        time: '22:52',
        text: 'Em xin đầu thú! Anh Vũ ép em! Anh ấy đưa độc bảo em pha vào trà, nhưng em sợ quá không dám nên anh ấy tự trèo ban công vào nhỏ độc. Em chỉ ngắt camera và ném lọ thuốc đi thôi! Xin tha cho em!',
        requires: ['lo-doc-non-bo'],
      },
    ],
  },
  {
    id: 'nam',
    name: 'Luật sư Nam',
    avatar: '💼',
    sub: 'Hoạt động 5 phút trước',
    preview: 'Ông Khang vừa gạch tên Vũ khỏi di chúc.',
    requires: ['hien-truong'],
    messages: [
      {
        id: 'nm1',
        from: 'them',
        time: '22:52',
        text: 'Tôi vừa nghe tin dữ! Chiều nay lúc 20:30 tôi trực tiếp đến gặp ông Khang để hoàn tất thủ tục di chúc mới.',
        clue: 'di-chuc-truat-quyen',
      },
      {
        id: 'nm2',
        from: 'them',
        time: '22:53',
        text: 'Ông Khang vô cùng phẫn nộ khi biết Vũ ăn cắp cổ vật đem bán và nợ cá độ xã hội đen 3,5 tỷ. Ông ấy quyết định gạch tên Vũ, chuyển hết 30 tỷ cho từ thiện.',
        clue: 'so-no-bac-si',
      },
      {
        id: 'nm3',
        from: 'them',
        time: '22:54',
        text: 'Tôi rời nhà lúc 21:15, camera ngoài ngõ có ghi hình xe tôi. Lúc tôi về, ông Khang vẫn đang rất khỏe mạnh ngồi đun ấm trà.',
      },
    ],
  },
  {
    id: 'trong',
    name: 'Trọng (Đồ cổ)',
    avatar: '🏺',
    sub: 'Hoạt động 8 phút trước',
    preview: 'Tôi ngồi bar từ 21:00 đến giờ!',
    requires: ['hien-truong'],
    messages: [
      {
        id: 'tr1',
        from: 'them',
        time: '22:55',
        text: 'Chiều nay tôi có to tiếng với ông Khang về hợp đồng bình gốm thật, nhưng chuyện kinh doanh thôi!',
      },
      {
        id: 'tr2',
        from: 'them',
        time: '22:56',
        text: 'Từ 21:00 đến tận 23:00 tôi ngồi uống rượu ở quán bar The Moon với mấy người bạn buôn đá quý, hóa đơn thẻ và camera bar đều có.',
        clue: 'trong-alibi',
      },
    ],
  },
  {
    id: 'ha',
    name: 'Bà Hà (Em gái)',
    avatar: '👵',
    sub: 'Hoạt động 10 phút trước',
    preview: 'Tôi livestream suốt cả buổi tối.',
    requires: ['hien-truong'],
    messages: [
      {
        id: 'h1',
        from: 'them',
        time: '22:57',
        text: 'Anh tôi mất rồi sao?! Tôi có nhắn tin đòi tiền đất thật nhưng đời nào tôi làm hại anh ruột!',
      },
      {
        id: 'h2',
        from: 'them',
        time: '22:58',
        text: 'Tôi livestream bán yến sào từ 20:30 đến 22:30 trên mạng, cả nghìn người xem tương tác trực tiếp, làm sao tôi rời đi được!',
        clue: 'ha-livestream',
      },
    ],
  },
]

export const ORDERS: Order[] = [
  {
    id: 'TEA-2130',
    time: '21:30',
    pickup: 'Ấm siêu tốc Xiaomi Wifi',
    drop: 'Đun sôi 100°C · Giảm dần nhiệt độ',
    fee: 'Log thiết bị',
    status: 'Hoàn tất',
    clue: 'nhiet-do-am-tra',
  },
  {
    id: 'CAM-2120',
    time: '21:20',
    pickup: 'Cầu dao tầng 1',
    drop: 'Ngắt nguồn thủ công camera tầng 2',
    fee: 'Nhật ký điện',
    status: 'Bị ngắt',
    clue: 'camera-ngat',
  },
  {
    id: 'CALL-2215',
    time: '22:15',
    pickup: 'Bác sĩ Vũ → Nhà thuốc Long Châu',
    drop: 'Video call 6 phút (Tạo alibi giả)',
    fee: 'Viễn thông',
    status: 'Đã kết nối',
    clue: 'alibi-gia-vu',
  },
  {
    id: 'BANK-1800',
    time: '18:00',
    pickup: 'Vũ Hoàng → Nguyễn Thị Yến',
    drop: '200.000.000đ (Tiền cọc đồng phạm)',
    fee: 'Chuyển khoản',
    status: 'Thành công',
    clue: 'chuyen-khoan-yen',
  },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Hiện trường phòng trà — 22:35',
    time: '22:35',
    scene: 'tea',
    caption: 'Tách trà Thiết Quan Âm vơi một nửa, đồng hồ đeo tay bị đập vỡ kẹt tại 22:15 bên cạnh thư tuyệt mệnh.',
    clue: 'hien-truong',
  },
  {
    id: 'p2',
    title: 'Cửa sổ ban công — 22:40',
    time: '22:40',
    scene: 'tea',
    caption: 'Sợi chỉ cước câu cá trong suốt mắc vào then cài cửa sổ, cùng vết bùn đế giày da nam size 42 trên thành ban công.',
    clue: 'then-cai-chi-cuoc',
  },
  {
    id: 'p3',
    title: 'Bể lọc non bộ sân sau — 22:48',
    time: '22:48',
    scene: 'street',
    caption: 'Lọ thủy tinh y tế chứa kịch độc Aconitine được tìm thấy dưới đáy ngăn lọc nước hòn non bộ.',
    clue: 'lo-doc-non-bo',
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 'tr1',
    name: 'nhat-ky-am-tra.txt',
    kind: 'Nhật ký thiết bị',
    preview: '21:30:04 — Đun sôi đạt 100°C…',
    detail:
      'Nhật ký ấm trà thông minh: "21:30:04 — Đun sôi đạt 100°C, chuyển chế độ giữ nhiệt 40 phút. 22:15 nhiệt độ còn 43°C."\\n\\nChứng minh tách trà độc được pha và uống đúng 21:30, vạch trần thủ đoạn lùi giờ đồng hồ 22:15 của hung thủ!',
    clue: 'nhiet-do-am-tra',
  },
  {
    id: 'tr2',
    name: 'manh-giay-di-chuc.jpg',
    kind: 'Mảnh ghép tài liệu',
    preview: '...truất toàn bộ quyền thừa kế của Vũ Hoàng...',
    detail:
      'Mảnh giấy được phục hồi từ máy hủy tài liệu trong phòng Vũ: "...xóa tên Vũ Hoàng khỏi danh sách thừa kế, toàn bộ 30 tỷ chuyển vào quỹ từ thiện...". Động cơ giết người đoạt mạng là đây!',
    clue: 'di-chuc-truat-quyen',
  },
  {
    id: 'tr3',
    name: 'tin-nhan-zola-khoi-phuc.txt',
    kind: 'Dữ liệu khôi phục',
    preview: '21:20 gạt cầu dao, xong việc anh chia 2 tỷ...',
    detail:
      'Dữ liệu tin nhắn đã xoá trong máy Yến: Vũ nhắn: "Đúng 21:20 ngắt cầu dao tầng 2 cho anh. Canh chừng dưới bếp, xong việc anh chuyển đủ 2 tỷ như đã hứa". Bằng chứng đanh thép kết tội đồng phạm!',
    clue: 'tin-nhan-bi-mat',
  },
]
