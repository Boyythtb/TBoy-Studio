import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 05',
  title: 'Án mạng phòng trà Hẻm 42',
  place: 'Biệt thự cổ Hoàng Khang · Hẻm 42',
  time: '22:30 · thứ Sáu 25/10',
  brief:
    'Đêm mưa bão, nhà sưu tầm cổ vật Hoàng Khang (62 tuổi) tử vong bí ẩn bên tách trà trong căn phòng làm việc tầng 2 khoá then cài bên trong. Chiếc đồng hồ cổ trên tay vỡ kẹt ở mốc 22:15, ấm trà vẫn bốc hơi nóng. Nhưng sự thật đằng sau cái bẫy thời gian và căn phòng kín đã bị lật tẩy bởi dữ liệu Smart Home IoT và hồ sơ độc chất.',
  culprit: 'vu',
  accomplice: 'yen',
  difficulty: 'Siêu khó',
  question: 'Ai là kẻ chủ mưu đầu độc, và ai là đồng phạm tiếp tay tại hiện trường?',
  solution:
    'Bác sĩ Vũ Hoàng (cháu ruột kiêm bác sĩ riêng) là kẻ chủ mưu. Do bị ông Khang truất quyền thừa kế tài sản vì nợ cá độ bóng đá 3,5 tỷ, Vũ đã lấy cắp độc chất Aconitine từ phòng thí nghiệm bỏ vào tách trà của ông Khang lúc 21:20 khiến nạn nhân ngừng tim tử vong lúc 21:42. Trước khi rời đi lúc 21:43, Vũ cố tình đập vỡ mặt kính đồng hồ nạn nhân ở mốc 22:15 bằng quả cầu chặn giấy để tạo bằng chứng ngoại phạm giả (do từ 21:45 Vũ có camera tại phòng khám riêng). Vũ mua chuộc người giúp việc Yến bằng 200 triệu chuyển khoản lúc 17:30 qua VietinBank. Sau khi Vũ đi, Yến ra ban công sau dùng sợi chỉ cước giật sập chốt then cài cửa sổ từ phía ngoài để tạo hiện trường phòng kín, phi tang lọ độc chất xuống hồ cá non bộ. Đến 22:10, Yến dùng smartphone qua Wi-Fi kích hoạt tính năng đun sôi lại của ấm SmartKettle để tạo hơi nước bốc lên nghi ngút lúc 22:25 đánh lừa mọi người rằng nạn nhân vừa mới qua đời.',
}

export const CLUES: Record<string, ClueDef> = {
  'hien-truong': {
    id: 'hien-truong',
    tag: 'photo',
    title: 'Tách trà gốm chứa nồng độ kịch độc chất Aconitine',
    detail:
      'Nạn nhân gục chết trên bàn cờ tướng phòng trà tầng 1. Kết quả giải phẫu tử thi của Viện Pháp y xác nhận nguyên nhân tử vong do ngừng tuần hoàn cấp tính bởi độc tố Aconitine (chiết xuất rễ củ Ô Đầu, tan không màu không mùi trong nước sôi).',
  },
  'dong-ho-vo': {
    id: 'dong-ho-vo',
    tag: 'photo',
    title: 'Mặt kính đồng hồ sapphire rạn nứt dừng ở mốc 22:15',
    detail:
      'Đồng hồ trên cổ tay nạn nhân rạn vỡ, kim dừng ở 22:15. Tuy nhiên vết nứt bị đập vuông góc từ trên xuống bằng quả cầu chặn giấy pha lê trên bàn, không phải do va đập tự nhiên khi ngã. Nạn nhân thuận tay trái nhưng đồng hồ lại đeo ở tay trái!',
  },
  'nhiet-do-am-tra': {
    id: 'nhiet-do-am-tra',
    tag: 'web',
    title: 'Dữ liệu Smart Home: Nước trà đun 21:28 đã nguội ngắt trước 22:00',
    detail:
      'Nhật ký cảm biến nhiệt Smart Home (smarthome.iot): Nước đun sôi 100°C lúc 21:28 và nhiệt độ ấm đã hạ xuống dưới 34°C từ trước 22:00. Báo cáo pháp y thân nhiệt khẳng định nạn nhân đã tử vong từ khoảng 21:40 - 21:45.',
  },
  'smart-kettle-wifi': {
    id: 'smart-kettle-wifi',
    tag: 'web',
    title: 'Nhật ký SmartKettle: Lệnh đun sôi lại lúc 22:10 từ địa chỉ MAC di động',
    detail:
      'Máy chủ smarthome.iot: Lúc 22:10:02, ấm SmartKettle nhận lệnh Re-boil từ xa qua Wi-Fi nội bộ từ thiết bị mang địa chỉ MAC 4A:12:F8:33:B2:91 (Hostname: Galaxy-A52). Đối chiếu bài đăng Facebúc của người giúp việc Yến ngày hôm qua: Yến vừa khoe chiếc điện thoại Samsung Galaxy A52 được tặng!',
  },
  'then-cai-chi-cuoc': {
    id: 'then-cai-chi-cuoc',
    tag: 'photo',
    title: 'Vết ma sát sợi cước ở chốt then cài và cuộn cước trong giỏ kim chỉ',
    detail:
      'Khám nghiệm hiện trường then cài cửa gỗ: Chốt cài bên trong có vết cọ xát trượt của sợi cước nylon 0.2mm. Khám xét phòng ngủ của người giúp việc Yến tại tầng 3, phát hiện cuộn cước câu cá 0.2mm giấu dưới đáy giỏ kim chỉ — công cụ dùng để luồn qua khe dưới cánh cửa giật chốt then cài từ ngoài ban công tạo phòng kín!',
  },
  'camera-ngat': {
    id: 'camera-ngat',
    tag: 'web',
    title: 'Cầu dao camera tầng 2 bị ngắt từ dưới gầm bếp lúc 21:20',
    detail:
      'Nhật ký Smart Home: Cầu dao cấp điện camera hành lang tầng 2 bị ngắt thủ công từ công tắc phụ đặt dưới gầm tủ bếp tầng 1 — khu vực chỉ có người giúp việc tiếp cận trong giờ nấu nướng dọn dẹp.',
  },
  'lo-thuy-tinh-ho-ca': {
    id: 'lo-thuy-tinh-ho-ca',
    tag: 'photo',
    title: 'Lọ thủy tinh chứa độc chất phi tang dưới đáy hồ non bộ ngoài vườn',
    detail:
      'Dưới đáy hồ cá non bộ ngoài vườn tìm thấy 01 lọ thủy tinh nút cao su dung tích 20ml, bên trong còn đọng cặn dung dịch Aconitine khớp 100% với độc chất trong tách trà của nạn nhân.',
  },
  'so-doc-duoc-vu': {
    id: 'so-doc-duoc-vu',
    tag: 'web',
    title: 'Biên bản Viện Dược Liệu: Bàn giao 20ml hóa chất độc bảng A mã hiệu ĐC-098',
    detail:
      'Hồ sơ kiểm soát dược lý Viện Dược Liệu: Mẫu chuẩn độc chất Aconitine 20ml số 0502 xuất kho sáng 25/10 theo đề tài nghiên cứu của Bác sĩ L.Q.V - Khoa Hồi sức Tim mạch. Trong số các nghi phạm, chỉ duy nhất Bác sĩ Vũ có thẻ hành nghề và nghiên cứu chuyên sâu về hoạt chất ức chế cơ tim này.',
  },
  'vu-chuyen-yen-200tr': {
    id: 'vu-chuyen-yen-200tr',
    tag: 'web',
    title: 'Giao dịch VietinBank: Lệnh chuyển 200.000.000đ từ Lê Quốc Vũ cho Nguyễn Thị Yến',
    detail:
      'Sao kê VietinBank TX-88120 lúc 17:30 ngày 25/10: Tài khoản Lê Quốc Vũ chuyển 200.000.000 VNĐ cho Nguyễn Thị Yến với ghi chú "Thanh toan hop dong". Lời khai của Yến rằng "chỉ là tiền ứng lương 5 triệu" bị số liệu sao kê vạch trần mối quan hệ ăn chia tài chính mờ ám.',
  },
  'trong-alibi-bar': {
    id: 'trong-alibi-bar',
    tag: 'web',
    title: 'Camera The Moon Lounge: Alibi của Trọng Cổ Vật từ 21:00 đến 23:15',
    detail:
      'Camera an ninh CAM-502 và hoá đơn quẹt thẻ tại The Moon Lounge: Thương nhân đồ cổ Lê Đức Trọng ngồi liên tục tại quầy bar từ 21:00 đến 23:15 cùng hai đối tác kinh doanh, hoàn toàn không có mặt tại biệt thự lúc án mạng xảy ra.',
  },
  'ma-khoa-am-tra': {
    id: 'ma-khoa-am-tra',
    tag: 'file',
    title: 'Mã số an ninh mở hồ sơ: 2128 (Mốc đun trà lần 1 trên Smart Home)',
    detail:
      'Biên bản đối soát thời gian hệ thống Smart Home IoT: Mốc thời gian 21:28 (21 giờ 28 phút) khi nạn nhân đun ấm trà lần đầu tiên chính là mật mã 4 chữ số giải mã hồ sơ lưu trữ độc dược pháp y.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'vu',
    name: 'Bác sĩ Vũ',
    role: 'Cháu ruột · Bác sĩ gia đình',
    avatar: '👨‍⚕️',
    note: 'Chăm sóc sức khoẻ cho nạn nhân. Khai rằng rời phòng trà lúc 21h15 để về phòng khám riêng trực ca đêm.',
  },
  {
    id: 'yen',
    name: 'Yến Giúp Việc',
    role: 'Người giúp việc 5 năm',
    avatar: '👩‍🍳',
    note: 'Phụ trách cơm nước và dọn dẹp tại biệt thự. Khai rằng dọn phòng lầu 3 lúc xảy ra vụ việc.',
  },
  {
    id: 'trong',
    name: 'Trọng Cổ Vật',
    role: 'Đối tác buôn bán cổ vật',
    avatar: '🏺',
    note: 'Từng có tranh chấp hợp đồng mua bán đồ cổ với nạn nhân, có mặt tại biệt thự vào buổi chiều.',
  },
  {
    id: 'ha',
    name: 'Bà Hà',
    role: 'Em gái ruột của nạn nhân',
    avatar: '💎',
    note: 'Đến thăm anh trai lúc chập tối và rời đi lúc 20:15 để về nhà riêng livestream bán hàng trực tuyến.',
  },
  {
    id: 'tram',
    name: 'Bảo Trâm Người Mẫu',
    role: 'Vợ sắp cưới 26 tuổi của nạn nhân',
    avatar: '👠',
    note: 'Người mẫu tự do, vừa được ông Khang đưa tên vào hợp đồng thụ hưởng bảo hiểm nhân thọ 5 tỷ tuần trước. Có mặt ăn tối tại biệt thự đến 21:00 mới rời đi.',
  },
  {
    id: 'tuan_bv',
    name: 'Tuấn Bảo Vệ',
    role: 'Bảo vệ ca đêm cổng chính',
    avatar: '👮',
    note: 'Trực bốt cổng chính biệt thự. Bị mất thẻ từ mở cổng phụ từ 20:30 và có khoản nợ bị xã hội đen đến đòi lúc 18h.',
  },
  {
    id: 'nam',
    name: 'Luật sư Nam',
    role: 'Luật sư riêng của gia đình',
    avatar: '⚖️',
    note: 'Phụ trách tư vấn di chúc thừa kế của ông Khang, rời khỏi biệt thự lúc 20h30 sau khi hoàn tất hồ sơ.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group_biet_thu',
    name: 'Gia Đình Biệt Thự Hoàng Khang',
    avatar: '🏰',
    isGroup: true,
    sub: '10 thành viên',
    preview: 'Yến: Bác Khang gục bất động trên bàn trà rồi cứu với!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Yến Giúp Việc',
        senderAvatar: '👩‍🍳',
        time: '22:32',
        text: 'Cả nhà ơi cứu bác Khang với! Khoảng 22h25 em lên đưa thuốc gõ cửa mãi không thấy bác trả lời. Đẩy cửa thì then cài bên trong chặt cứng, nhìn qua khe cửa thấy bác gục bất động trên bàn trà rồi!',
        clue: 'hien-truong',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Bác sĩ Vũ',
        senderAvatar: '👨‍⚕️',
        time: '22:34',
        text: 'Chết dở! Mau phá then cửa xông vào cấp cứu tim phổi ngay đi! Chắc chắn là do ông Trọng Cổ Vật! Chiều nay ông Trọng đến đập bàn đe doạ bác Khang vì vụ hợp đồng bình cổ 5 tỷ! Tôi đang ở phòng khám riêng lấy xe phóng về liền đây!',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Yến Giúp Việc',
        senderAvatar: '👩‍🍳',
        time: '22:35',
        text: 'Đúng đấy! Chiều nay ông Trọng còn lảng vảng quanh hồ cá non bộ nhìn ngó vào phòng khách! Lúc em phá cửa vào thấy ấm trà trên [SmartHome IoT](https://smarthome.iot) vẫn bốc hơi, đồng hồ trên tay bác vỡ kẹt ở 22h15!',
        clue: 'dong-ho-vo',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Luật sư Nam',
        senderAvatar: '⚖️',
        time: '22:38',
        text: 'Mọi người bình tĩnh giữ nguyên hiện trường! Chiều nay bác Khang vừa ký văn bản truất quyền thừa kế của anh Vũ do nợ nần cá cược. Kiểm tra sao kê trên [VietinBank](https://vietinbank.vn) xem có giao dịch bất thường nào chiều nay không!',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Bà Hà',
        senderAvatar: '💎',
        time: '22:40',
        text: 'Camera ngã ba đầu ngõ [Camera Phường](https://camera-phuong.gov.vn) CAM-501 ghi hình mọi xe cộ ra vào đêm nay, ông Trọng hay ai ra vào giờ nào là hiện rõ mồn một!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra trọng án',
    preview: 'Hiện trường phòng kín và chiếc đồng hồ vỡ là cái bẫy thời gian.',
    requires: ['hien-truong'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '22:42',
        text: 'Biên bản khám nghiệm ban đầu: Nạn nhân tử vong do ngừng tim cấp tính bởi độc chất Aconitine. Mặt kính đồng hồ sapphire vỡ kẹt ở mốc 22:15, nhưng vết rạn nứt bị đập vuông góc từ trên xuống mang dấu vết tạo hiện trường giả.',
        clue: 'dong-ho-vo',
      },
      {
        id: 't2',
        from: 'them',
        time: '22:46',
        text: 'Thân nhiệt và diễn biến ngộ độc cho thấy nạn nhân có thể đã tử vong sớm hơn rất nhiều. Cần kiểm tra lịch trình các thiết bị nhiệt và cảm biến thông minh trong biệt thự để đối soát.',
        requires: ['nhiet-do-am-tra'],
      },
      {
        id: 't3',
        from: 'them',
        time: '22:52',
        text: 'Aconitine là độc chất nhóm bảng A chiết xuất từ rễ củ Ô Đầu, chỉ được cấp phát cho các đề tài nghiên cứu đặc biệt. Hãy rà soát hồ sơ xuất nhập độc dược y tế để xác định người đã tiếp cận mẫu chất này.',
        requires: ['so-doc-duoc-vu'],
      },
    ],
  },
  {
    id: 'vu',
    name: 'Bác sĩ Vũ Hoàng',
    avatar: '👨‍⚕️',
    sub: 'Đang online',
    preview: 'Tôi rời phòng trà từ 21h15 để về phòng khám mà…',
    requires: ['hien-truong'],
    messages: [
      {
        id: 'v1',
        from: 'them',
        time: '22:45',
        text: 'Tôi là bác sĩ riêng của bác Khang bao năm nay, tối nay tôi qua thăm khám huyết áp rồi về phòng khám riêng trực từ trước 22h, camera phòng khám có thể chứng minh! Ông Trọng cổ vật mới là kẻ có động cơ hại bác!',
      },
      {
        id: 'v2',
        from: 'me',
        time: '22:46',
        text: 'Bác sĩ có thể nói rõ hơn về tình trạng sức khỏe của ông Khang tối nay và các loại trà hay thuốc ông ấy dùng trước khi ngủ không?',
        requires: ['so-doc-duoc-vu'],
      },
      {
        id: 'v3',
        from: 'them',
        time: '22:47',
        text: 'Bác Khang có tiền sử cao huyết áp, tôi chỉ căn dặn uống trà thảo mộc an thần. Chiều nay ông Trọng buôn đồ cổ đến cãi cọ đập bàn đe dọa đòi nợ bác Khang, rồi cô Trâm thì đòi ký hợp đồng bảo hiểm lớn, hai người đó mới là đối tượng các anh cần thẩm vấn!',
        requires: ['so-doc-duoc-vu'],
      },
      {
        id: 'v4',
        from: 'me',
        time: '22:48',
        text: 'Vào khung giờ từ 21h đến 22h tối nay, anh có phát sinh giao dịch đặc biệt hay liên lạc với ai khác trong biệt thự không?',
        requires: ['lo-thuy-tinh-ho-ca'],
      },
      {
        id: 'v5',
        from: 'them',
        time: '22:49',
        text: 'Lúc 22h15 tôi còn gọi video call trao đổi chuyên môn với nhà thuốc đối tác từ phòng khám! Mọi lịch trình của tôi đều có camera và dữ liệu viễn thông làm chứng. Các anh đừng nghe lời đồn đại vô căn cứ mà suy đoán bừa bãi!',
        requires: ['lo-thuy-tinh-ho-ca'],
      },
    ],
  },
  {
    id: 'yen',
    name: 'Yến Giúp Việc',
    avatar: '👩‍🍳',
    sub: 'Đang run sợ',
    preview: 'Em chỉ là người làm công, em không biết gì hết…',
    requires: ['hien-truong'],
    messages: [
      {
        id: 'y1',
        from: 'them',
        time: '22:50',
        text: 'Dạ em chỉ là người làm công quét dọn, tối nay em ở trên phòng lầu 3 phân loại đồ giặt là cho bác Khang. Lúc 22h25 em bưng nước ấm xuống gõ cửa mãi không thấy bác trả lời thì mới phát hiện cửa then cài bên trong... Em sợ quá mới hô hoán!',
      },
      {
        id: 'y2',
        from: 'them',
        time: '22:51',
        text: 'Hồi chiều em thấy ông Trọng cổ vật to tiếng nạt nộ đòi đập vỡ bình gốm của bác, rồi lúc tối cô Trâm cứ hối thúc bác ký giấy tờ gì đó... Em phận làm thuê ở đợ làm sao dám can dự chuyện của các ông bà lớn đâu ạ!',
      },
    ],
  },
  {
    id: 'tram',
    name: 'Bảo Trâm Người Mẫu',
    avatar: '👠',
    sub: 'Đang khóc nức nở',
    preview: 'Em rời biệt thự từ 21h00 có xe đón mà…',
    requires: ['hien-truong'],
    messages: [
      {
        id: 'tr1',
        from: 'them',
        time: '22:45',
        text: 'Anh điều tra viên ơi em yêu anh Khang thật lòng! Hợp đồng bảo hiểm 5 tỷ là do anh Khang tự nguyện mua tặng em kỷ niệm 1 năm quen nhau thôi chứ em không bao giờ làm hại anh ấy!',
      },
      {
        id: 'tr2',
        from: 'them',
        time: '22:46',
        text: 'Lúc 21h00 ăn tối xong em đã gọi xe công nghệ về căn hộ riêng ở Cầu Giấy, tài xế và camera sảnh toà nhà em ghi nhận em về nhà lúc 21h35 suốt đêm không ra ngoài!',
      },
    ],
  },
  {
    id: 'tuan_bv',
    name: 'Tuấn Bảo Vệ',
    avatar: '👮',
    sub: 'Bảo vệ cổng chính',
    preview: 'Chiếc thẻ từ cổng phụ bị mất từ chập tối…',
    requires: ['dong-ho-vo'],
    messages: [
      {
        id: 'tbv1',
        from: 'them',
        time: '22:47',
        text: 'Thưa điều tra viên, lúc 18h chiều nay có mấy người quen đến cổng đòi nợ tiền bốc bát họ của tôi làm tôi phân tâm, đến 20h30 tôi mới phát hiện chùm chìa khóa phụ kèm thẻ từ cổng phụ treo ở bốt gác bị ai đó lấy mất!',
      },
      {
        id: 'tbv2',
        from: 'them',
        time: '22:48',
        text: 'Đến 21h10 thì chiếc xe SH xám phóng thẳng vào lối cổng phụ đó! Người lái đội mũ bảo hiểm trùm kín đầu lách vào lối cửa bếp biệt thự!',
      },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'TX-88120', time: '17:30', pickup: 'VietinBank iPay', drop: 'Chuyển tiền cá nhân cho Yến', fee: '200.000.000đ', status: 'Giao dịch thành công (Vũ -> Yến)', clue: 'vu-chuyen-yen-200tr' },
  { id: 'IOT-503', time: '21:28', pickup: 'SmartKettle Pro Wi-Fi', drop: 'Đun nước sôi 100°C lần 1', fee: 'Tự động ngắt 21:30', status: 'Nhiệt độ hạ 32°C lúc 21:55', clue: 'nhiet-do-am-tra' },
  { id: 'IOT-504', time: '22:10', pickup: 'SmartKettle Pro Wi-Fi', drop: 'Lệnh Re-boil từ xa (MAC Yến)', fee: 'Đun lại bốc hơi nước', status: 'Hiện trường nhiệt giả', clue: 'smart-kettle-wifi' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Hiện trường bàn trà phòng làm việc tầng 2',
    time: '22:35',
    scene: 'street',
    caption: 'Bàn trà gỗ lim nơi nạn nhân gục ngã bên tách trà và chiếc đồng hồ vỡ.',
    clue: 'hien-truong',
    hotspots: [
      {
        x: 30,
        y: 45,
        label: 'Tách trà gốm cổ của nạn nhân',
        hint: 'Đọng cặn độc chất Aconitine',
        clue: 'hien-truong',
        detail: 'Tách trà gốm còn khoảng 15ml nước trà nguội, phân tích hóa học cho thấy nồng độ cực cao độc tố Aconitine từ rễ củ Ô Đầu.',
      },
      {
        x: 70,
        y: 60,
        label: 'Đồng hồ đeo tay rạn vỡ kim kẹt 22:15',
        hint: 'Dấu vết va đập nhân tạo',
        clue: 'dong-ho-vo',
        detail: 'Mặt kính sapphire bị nứt vỡ từ cú đập vuông góc từ trên xuống bằng quả cầu chặn giấy pha lê đặt cạnh đó, chứng tỏ có kẻ đã cố tình tạo hiện trường giả lúc 22:15.',
      },
    ],
  },
  {
    id: 'p2',
    title: 'Cửa sổ phòng trà hướng ra ban công sau',
    time: '22:40',
    scene: 'street',
    caption: 'Cửa sổ gỗ lá sách hướng ra ban công sau của phòng làm việc.',
    clue: 'then-cai-chi-cuoc',
    hotspots: [
      {
        x: 55,
        y: 40,
        label: 'Then cài cửa sổ gỗ',
        hint: 'Vệt ma sát sợi cước nylon 0.2mm',
        clue: 'then-cai-chi-cuoc',
        detail: 'Trên thanh chốt then cài bằng đồng có vệt xước mờ do sợi cước nylon mỏng cọ xát. Thủ phạm đã đứng ở ban công ngoài giật sập chốt then rồi rút cước ra ngoài.',
      },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 't1',
    name: 'don_thuoc_cao_huyet_ap_hoang_khang.pdf',
    kind: 'Bệnh án & Đơn thuốc định kỳ',
    preview: 'Đơn thuốc điều trị tăng huyết áp vô căn ngày 15/10…',
    detail: 'Hồ sơ bệnh án số HA-4491: Nạn nhân Hoàng Khang điều trị cao huyết áp độ 2, được chỉ định dùng Amlodipine 5mg uống sáng hàng ngày. Nạn nhân có thói quen uống trà Long Tỉnh mỗi tối sau bữa ăn.',
  },
  {
    id: 't2',
    name: 'hop_dong_bao_hiem_nhan_tho_5ty_tram.pdf',
    kind: 'Hợp đồng bảo hiểm nhân thọ',
    preview: 'Hợp đồng bảo hiểm số BH-9921 giá trị bồi thường 5 tỷ…',
    detail: 'Hợp đồng bảo hiểm nhân thọ Prudential ký ngày 01/09: Người được bảo hiểm là Hoàng Khang, người thụ hưởng 100% quyền lợi khi xảy ra sự kiện tử vong là Nguyễn Bảo Trâm.',
  },
  {
    id: 't3',
    name: 'chung_thu_giam_dinh_binh_gom_le_trong.pdf',
    kind: 'Chứng thư giám định cổ vật',
    preview: 'Biên bản đối soát bình gốm Chu Đậu thế kỷ XV…',
    detail: 'Chứng thư thẩm định số GĐ-3301 do Chuyên gia cổ vật Lê Đức Trọng ký xác nhận: Chiếc bình gốm cổ thời Lê có trị giá giao dịch ước tính 5,2 tỷ đồng. Ghi chú có tranh chấp tiền đặt cọc 1,5 tỷ chưa thanh lý.',
  },
  {
    id: 't4',
    name: 'nhat_ky_dien_nang_bep_tu_iot.xlsx',
    kind: 'Báo cáo phụ tải năng lượng',
    preview: 'Thông số tiêu thụ điện năng khu vực bếp và phòng ăn…',
    detail: 'Nhật ký phụ tải trạm biến áp gia đình: Bếp từ tầng 1 hoạt động bình thường đến 19:45, sau 20:00 chỉ còn phụ tải duy trì của tủ lạnh và cảm biến an ninh.',
  },
  {
    id: 't5',
    name: 'bien_ban_ban_giao_mau_dc098_vdl.pdf',
    kind: 'Hồ sơ kiểm soát hóa chất đặc biệt',
    preview: 'Biên bản số 0502 bàn giao mẫu hóa chất độc bảng A…',
    detail: 'Biên bản số 0502 tại Viện Dược Liệu: Mẫu Aconitine 20ml tinh chế nhóm ĐC-098 được xuất kho bàn giao theo đề tài nghiên cứu cho Bác sĩ Lê Quốc Vũ sáng 25/10. Chữ ký và dấu vân tay người nhận khớp hoàn toàn với hồ sơ nhân sự của Vũ.',
    clue: 'so-doc-duoc-vu',
  },
  {
    id: 't6',
    name: 'nhat_ky_smart_home_am_tra.pdf',
    kind: 'Trích xuất dữ liệu đám mây IoT',
    preview: 'Nhật ký thiết bị SmartKettle-Pro ngày 25/10…',
    detail: 'Nhật ký thiết bị SmartKettle-Pro ngày 25/10: Nước đun sôi 100°C lần đầu lúc 21:28, nguội dần về nhiệt độ phòng trước 22:00. Lúc 22:10 có lệnh đun sôi lại (Re-boil) từ xa qua địa chỉ MAC thiết bị Galaxy-A52.',
    clue: 'ma-khoa-am-tra',
  },
]
