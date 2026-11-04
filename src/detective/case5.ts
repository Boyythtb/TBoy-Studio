import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 05',
  title: 'Án mạng phòng trà Hẻm 42',
  place: 'Biệt thự cổ Hoàng Khang · Hẻm 42',
  time: '22:30 · thứ Sáu 17/10',
  brief:
    'Đêm mưa bão, nhà sưu tầm cổ vật Hoàng Khang tử vong bên tách trà trong căn phòng kín khoá then cài bên trong. Chiếc đồng hồ đeo tay nạn nhân vỡ kẹt ở mốc 22:15 cạnh bức thư tuyệt mệnh. Nhưng dữ liệu cảm biến Smart Home và hồ sơ độc chất đã lật tẩy cái bẫy thời gian tinh vi.',
  culprit: 'vu',
  accomplice: 'yen',
  difficulty: 'Siêu khó',
  question: 'Ai là kẻ chủ mưu đầu độc, và ai là đồng phạm tiếp tay tại hiện trường?',
  solution:
    'Bác sĩ Vũ Hoàng (cháu ruột kiêm bác sĩ riêng) là kẻ chủ mưu. Do bị ông Khang truất quyền thừa kế tài sản vì nợ cá độ bóng đá 3,5 tỷ, Vũ đã lấy độc chất Aconitine (ký nhận theo hồ sơ số 0502) bỏ vào trà của ông Khang lúc 21:20 khiến nạn nhân ngừng tim tử vong lúc 21:45. Vũ cố tình đập vỡ mặt kính đồng hồ ở mốc 22:15 để dựng bằng chứng ngoại phạm giả. Tuy nhiên, dữ liệu Smart Home IoT ghi nhận ấm trà đun lúc 21:28 đã nguội ngắt 32°C từ trước 22:00 lật tẩy trò lừa. Yến giúp việc nhận 200 triệu chuyển khoản lúc 17:30, tiếp tay ngắt camera tầng 2 và dùng thủ thuật luồn sợi chỉ cước giật sập chốt then cài cửa sổ từ ngoài ban công lúc 21:42 để tạo phòng kín.',
}

export const CLUES: Record<string, ClueDef> = {
  'hien-truong': {
    id: 'hien-truong',
    tag: 'photo',
    title: 'Tách trà chứa độc chất Aconitine',
    detail:
      'Nạn nhân gục chết trên bàn trà gỗ lim. Kết quả xét nghiệm pháp y phát hiện nồng độ cực cao độc tố Aconitine (chiết xuất rễ củ Ô Đầu, gây suy tim cấp).',
  },
  'dong-ho-vo': {
    id: 'dong-ho-vo',
    tag: 'photo',
    title: 'Mặt kính đồng hồ rạn vỡ dừng ở mốc 22:15',
    detail:
      'Đồng hồ cổ trên cổ tay trái nạn nhân bị rạn vỡ, kim dừng ở 22:15. Thoạt nhìn như tai nạn va đập lúc gục ngã nhưng thực chất là hiện trường giả được tạo dựng có chủ đích.',
  },
  'nhiet-do-am-tra': {
    id: 'nhiet-do-am-tra',
    tag: 'web',
    title: 'Dữ liệu Smart Home IoT: Ấm trà đun lúc 21:28 đã nguội ngắt',
    detail:
      'Nhật ký ấm trà thông minh trên smarthome.iot: Nước đun sôi 100°C lúc 21:28 và nhiệt độ đã hạ xuống 32°C từ trước 22:00. Nạn nhân tử vong thực tế trong khoảng 21:35 - 21:45.',
  },
  'thu-tuyet-menh-gia': {
    id: 'thu-tuyet-menh-gia',
    tag: 'file',
    title: 'Bức thư tuyệt mệnh giả mạo trên bàn trà',
    detail:
      'Tờ giấy viết tay để trên bàn trà ghi lời từ biệt. Bút máy đặt bên tay phải, nhưng ông Khang từ nhỏ thuận tay trái. Chữ ký nét gượng gạo, mực chưa khô hoàn toàn.',
  },
  'then-cai-chi-cuoc': {
    id: 'then-cai-chi-cuoc',
    tag: 'photo',
    title: 'Vết ma sát sợi chỉ cước ở chốt then cài cửa sổ',
    detail:
      'Chốt then cài cửa sổ hướng ra ban công sau có vệt ma sát của sợi cước nylon mỏng dùng câu cá. Dấu vết cho thấy thủ phạm đã luồn cước qua khe cửa để giật then cài sập chốt từ ngoài ban công.',
  },
  'camera-ngat': {
    id: 'camera-ngat',
    tag: 'web',
    title: 'Cầu dao camera tầng 2 bị ngắt từ dưới bếp lúc 21:20',
    detail:
      'Nhật ký Smart Home: Cầu dao cấp điện camera tầng 2 bị ngắt thủ công từ công tắc phụ đặt dưới gầm bếp tầng 1 — khu vực chỉ có người giúp việc tiếp cận.',
  },
  'lo-thuy-tinh-ho-ca': {
    id: 'lo-thuy-tinh-ho-ca',
    tag: 'photo',
    title: 'Lọ thủy tinh phi tang dưới đáy hồ non bộ',
    detail:
      'Dưới đáy hồ cá non bộ ngoài vườn tìm thấy 01 lọ thủy tinh nút cao su dung tích 20ml, bên trong còn đọng cặn dung dịch Aconitine.',
  },
  'so-doc-duoc-vu': {
    id: 'so-doc-duoc-vu',
    tag: 'web',
    title: 'Hồ sơ ký nhận Aconitine mã 0502 sáng 25/10',
    detail:
      'Hồ sơ lưu trữ số 0502 tại Viện Dược Liệu: Bác sĩ Lê Quốc Vũ đã ký nhận 20ml dung dịch Aconitine tinh chế với lý do phục vụ đề tài nghiên cứu độc học.',
  },
  'vu-chuyen-yen-200tr': {
    id: 'vu-chuyen-yen-200tr',
    tag: 'web',
    title: 'Lệnh chuyển khoản 200 triệu cho Yến lúc 17:30',
    detail:
      'Sao kê VietinBank: 17:30:22 ngày 25/10, Vũ thực hiện chuyển khoản 200.000.000 VNĐ vào tài khoản cá nhân của người giúp việc Nguyễn Thị Yến.',
  },
  'trong-alibi-bar': {
    id: 'trong-alibi-bar',
    tag: 'web',
    title: 'Camera The Moon Lounge: Alibi của Trọng Cổ Vật',
    detail:
      'Camera CAM-502 và hoá đơn quẹt thẻ tại quán bar The Moon: Trọng ngồi liên tục tại quầy bar từ 21:00 đến 23:15, có nhân viên pha chế làm chứng.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'vu',
    name: 'Bác sĩ Vũ',
    role: 'Cháu ruột · Bác sĩ gia đình',
    avatar: '👨‍⚕️',
    note: 'Chăm sóc sức khoẻ định kỳ cho nạn nhân. Khai rằng rời phòng trà lúc 21h15 để về phòng khám riêng trực ca đêm.',
  },
  {
    id: 'yen',
    name: 'Yến Giúp Việc',
    role: 'Người giúp việc gắn bó 5 năm',
    avatar: '👩‍🍳',
    note: 'Khai rằng sau khi đun nước mang lên phòng trà lúc 21h20 thì xuống bếp dọn dẹp rồi về phòng ngủ dưới tầng 1.',
  },
  {
    id: 'trong',
    name: 'Trọng Cổ Vật',
    role: 'Đối tác buôn bán đồ cổ',
    avatar: '🏺',
    note: 'Có mặt tại biệt thự lúc chiều bàn chuyện mua bán đồ cổ. Có chứng cứ ngoại phạm tại quán bar The Moon suốt buổi tối.',
  },
  {
    id: 'ha',
    name: 'Bà Hà',
    role: 'Em gái ruột của nạn nhân',
    avatar: '💎',
    note: 'Đến thăm anh trai lúc chập tối. Khai rằng bận livestream bán hàng trang sức từ 20h đến 22h30 trên mạng xã hội.',
  },
  {
    id: 'nam',
    name: 'Luật sư Nam',
    role: 'Luật sư riêng của gia đình',
    avatar: '⚖️',
    note: 'Phụ trách tư vấn di chúc và pháp lý thừa kế. Rời khỏi biệt thự lúc 20h30 sau khi trao đổi hồ sơ.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group_bietthu',
    name: 'Gia Đình Biệt Thự Hoàng Khang',
    avatar: '🏡',
    isGroup: true,
    sub: '7 thành viên',
    preview: 'Yến: Bác Khang gục ngã trên bàn trà rồi cứu với!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Yến Giúp Việc',
        senderAvatar: '👩‍🍳',
        time: '22:32',
        text: 'Cả nhà ơi cứu bác Khang với! Khoảng 22h25 em gõ cửa phòng trà đưa thuốc không thấy bác trả lời, đẩy cửa thì thấy chốt trong, nhìn qua khe cửa thấy bác gục trên bàn trà rồi!',
        clue: 'hien-truong',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Bác sĩ Vũ',
        senderAvatar: '👨‍⚕️',
        time: '22:34',
        text: 'Chết dở! Mau phá then cửa xông vào cấp cứu hô hấp nhân tạo ngay đi! Tôi đang ở phòng khám trực đêm, tôi phóng xe về liền đây!',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Bà Hà',
        senderAvatar: '💎',
        time: '22:36',
        text: 'Sao lại đột quỵ bất ngờ thế được! Chiều nay anh Khang còn khoẻ mạnh nói chuyện rôm rả cơ mà!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra khu vực',
    preview: 'Hiện trường phòng kín và chiếc đồng hồ vỡ là cái bẫy thời gian.',
    requires: ['hien-truong'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '22:40',
        text: 'Tử thi có dấu hiệu ngộ độc chất Aconitine. Chiếc đồng hồ vỡ lúc 22h15 có thể chỉ là động tác giả để đánh lạc hướng thời điểm tử vong thực tế.',
      },
      {
        id: 't2',
        from: 'them',
        time: '22:45',
        text: 'Hãy kiểm tra dữ liệu Smart Home IoT: nhiệt độ ấm đun nước và thời gian cấp điện camera sẽ hé lộ sự thật.',
        requires: ['dong-ho-vo'],
      },
      {
        id: 't3',
        from: 'them',
        time: '22:50',
        text: 'Hồ sơ có mã khoá an ninh 4 số. Hãy tìm mã hồ sơ 4 chữ số tại Viện Dược Liệu nơi lưu trữ độc chất Aconitine.',
        requires: ['so-doc-duoc-vu'],
      },
    ],
  },
  {
    id: 'vu',
    name: 'Bác sĩ Vũ',
    avatar: '👨‍⚕️',
    sub: 'Đang online',
    preview: 'Tôi rời phòng trà từ 21h15 mà…',
    requires: ['hien-truong'],
    messages: [
      { id: 'v1', from: 'them', time: '22:45', text: 'Bác Khang có tiền sử bệnh tim, tôi đã dặn bác không nên thức khuya uống trà đậm đặc!' },
      {
        id: 'v2',
        from: 'me',
        time: '22:46',
        text: 'Pháp y xác định nạn nhân tử vong vì độc tố Aconitine, và chính anh là người ký nhận mẫu 20ml dung dịch Aconitine số 0502 sáng nay!',
        requires: ['so-doc-duoc-vu'],
      },
      {
        id: 'v3',
        from: 'them',
        time: '22:47',
        text: 'Mẫu hoá chất đó tôi để ở phòng thí nghiệm viện nghiên cứu, làm sao xuất hiện ở phòng trà được!',
        requires: ['so-doc-duoc-vu'],
      },
      {
        id: 'v4',
        from: 'me',
        time: '22:48',
        text: 'Lúc 17h30 chiều anh chuyển 200 triệu cho người giúp việc Yến, và chiếc lọ thủy tinh rỗng độc chất vừa được tìm thấy dưới đáy hồ non bộ!',
        requires: ['vu-chuyen-yen-200tr'],
      },
      {
        id: 'v5',
        from: 'them',
        time: '22:49',
        text: '...Anh chị đừng có thêu dệt chuyện hoang đường!',
        requires: ['vu-chuyen-yen-200tr'],
      },
    ],
  },
  {
    id: 'yen',
    name: 'Yến Giúp Việc',
    avatar: '👩‍🍳',
    sub: 'Hoạt động 5 phút trước',
    preview: 'Em chỉ làm theo lời dặn thôi…',
    requires: ['hien-truong'],
    messages: [
      { id: 'y1', from: 'them', time: '22:50', text: 'Em làm giúp việc cho bác Khang bao năm nay, em coi bác như người thân trong nhà!' },
      {
        id: 'y2',
        from: 'me',
        time: '22:51',
        text: 'Cầu dao camera tầng 2 bị ngắt từ bếp dưới lúc 21h20, và anh Vũ vừa chuyển 200 triệu vào tài khoản của chị lúc chiều!',
        requires: ['camera-ngat'],
      },
      {
        id: 'y3',
        from: 'them',
        time: '22:52',
        text: '...Em... em chỉ nhận tiền hỗ trợ gia đình thôi... Xin đừng bắt em!',
        requires: ['camera-ngat'],
      },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'TX-88120', time: '17:30', pickup: 'VietinBank Mobile', drop: 'Chuyển tiền cá nhân', fee: '200.000.000đ', status: 'Thành công (Vũ -> Yến)', clue: 'vu-chuyen-yen-200tr' },
  { id: 'IOT-503', time: '21:28', pickup: 'SmartKettle WiFi', drop: 'Đun sôi nước 100°C', fee: 'Hoàn tất', status: 'Tự động ngắt', clue: 'nhiet-do-am-tra' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Hiện trường bàn trà phòng làm việc',
    time: '22:35',
    scene: 'street',
    caption: 'Bàn trà gỗ lim nơi nạn nhân gục ngã.',
    clue: 'hien-truong',
    hotspots: [
      { x: 30, y: 45, label: 'Tách trà gốm cổ', hint: 'Dấu vết độc chất', clue: 'hien-truong', detail: 'Tách trà còn đọng nước trà đậm đặc chứa nồng độ Aconitine kịch độc.' },
      { x: 70, y: 60, label: 'Đồng hồ đeo tay', hint: 'Kim dừng ở 22:15', clue: 'dong-ho-vo', detail: 'Mặt kính rạn vỡ, kim dừng chính xác ở 22:15 do ngoại lực cố ý tác động.' },
    ],
  },
  {
    id: 'p2',
    title: 'Then cài cửa sổ phía ban công sau',
    time: '22:40',
    scene: 'street',
    caption: 'Cửa sổ hướng ra ban công sau phòng trà.',
    clue: 'then-cai-chi-cuoc',
    hotspots: [
      { x: 55, y: 50, label: 'Mẩu chỉ cước nylon', hint: 'Kẹt ở chốt then', clue: 'then-cai-chi-cuoc', detail: 'Sợi cước nylon mỏng dùng để luồn qua khe giật sập chốt then từ ngoài ban công.' },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 't1',
    name: 'ho_so_duoc_lieu_0502.pdf',
    kind: 'Tài liệu độc chất',
    preview: 'Hồ sơ lưu trữ độc dược số 0502/KHTH…',
    detail: 'Hồ sơ lưu trữ độc dược số 0502 của Viện Dược Liệu ghi nhận bàn giao 20ml dung dịch Aconitine cho Bác sĩ Lê Quốc Vũ sáng 25/10.',
    clue: 'so-doc-duoc-vu',
  },
]
