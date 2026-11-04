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
      'Nạn nhân gục chết trên bàn trà gỗ lim. Kết quả xét nghiệm pháp y phát hiện nồng độ cực cao độc tố Aconitine (chiết xuất rễ củ Ô Đầu, gây suy tim cấp trong 15-20 phút).',
  },
  'dong-ho-vo': {
    id: 'dong-ho-vo',
    tag: 'photo',
    title: 'Mặt kính đồng hồ bị đập vỡ dừng ở mốc 22:15 là hiện trường giả',
    detail:
      'Đồng hồ trên cổ tay nạn nhân rạn vỡ, kim dừng ở 22:15. Tuy nhiên vết nứt bị đập vuông góc từ trên xuống bằng quả cầu chặn giấy pha lê trên bàn, không phải do rơi đập tự nhiên. Nạn nhân thuận tay trái nhưng đồng hồ lại đeo ở tay trái!',
  },
  'nhiet-do-am-tra': {
    id: 'nhiet-do-am-tra',
    tag: 'web',
    title: 'Dữ liệu Smart Home IoT: Ấm trà đun lúc 21:28 đã nguội ngắt từ 21:55',
    detail:
      'Nhật ký ấm trà thông minh trên smarthome.iot: Nước đun sôi 100°C lúc 21:28 và nhiệt độ đã hạ xuống 32°C từ trước 22:00. Nạn nhân thực tế đã ngừng tim trong khoảng 21:40 - 21:45.',
  },
  'smart-kettle-wifi': {
    id: 'smart-kettle-wifi',
    tag: 'web',
    title: 'Lệnh đun lại ấm trà từ xa lúc 22:10 qua smartphone của Yến',
    detail:
      'Máy chủ đám mây smarthome.iot: Lúc 22:10:02, ấm SmartKettle nhận lệnh Re-boil đun sôi lại từ xa qua kết nối Wi-Fi nội bộ bằng smartphone mang địa chỉ MAC khớp với máy của người giúp việc Nguyễn Thị Yến để tạo hơi nước giả mạo lúc người nhà vào phòng.',
  },
  'then-cai-chi-cuoc': {
    id: 'then-cai-chi-cuoc',
    tag: 'photo',
    title: 'Vết ma sát sợi chỉ cước ở chốt then cài cửa sổ ban công sau',
    detail:
      'Chốt then cài cửa sổ hướng ra ban công sau có vệt ma sát màu trắng đục của sợi cước nylon 0.2mm câu cá. Dấu vết cho thấy thủ phạm đã luồn cước qua khe cửa để giật then cài sập chốt từ ngoài ban công nhằm tạo căn phòng kín.',
  },
  'camera-ngat': {
    id: 'camera-ngat',
    tag: 'web',
    title: 'Cầu dao camera tầng 2 bị ngắt từ dưới bếp lúc 21:20',
    detail:
      'Nhật ký Smart Home: Cầu dao cấp điện camera hành lang tầng 2 bị ngắt thủ công từ công tắc phụ đặt dưới gầm bếp tầng 1 — khu vực chỉ có người giúp việc tiếp cận trong giờ nấu nướng dọn dẹp.',
  },
  'lo-thuy-tinh-ho-ca': {
    id: 'lo-thuy-tinh-ho-ca',
    tag: 'photo',
    title: 'Lọ thủy tinh chứa độc chất phi tang dưới đáy hồ non bộ',
    detail:
      'Dưới đáy hồ cá non bộ ngoài vườn tìm thấy 01 lọ thủy tinh nút cao su dung tích 20ml, bên trong còn đọng cặn dung dịch Aconitine khớp 100% với độc chất trong tách trà của nạn nhân.',
  },
  'so-doc-duoc-vu': {
    id: 'so-doc-duoc-vu',
    tag: 'web',
    title: 'Sổ kiểm soát Viện Dược Liệu: Bác sĩ Vũ ký nhận mẫu Aconitine',
    detail:
      'Hồ sơ lưu trữ lưu mẫu độc chất tại Viện Dược Liệu: Sáng ngày 25/10, Bác sĩ Lê Quốc Vũ đã trực tiếp ký nhận 20ml dung dịch Aconitine tinh chế với lý do nghiên cứu đề tài độc học trên mô tim.',
  },
  'vu-chuyen-yen-200tr': {
    id: 'vu-chuyen-yen-200tr',
    tag: 'web',
    title: 'Sao kê VietinBank: Vũ chuyển 200 triệu cho Yến lúc 17:30',
    detail:
      'Trích xuất ngân hàng VietinBank (vietinbank.vn) mã TX-88120 lúc 17:30:22 ngày 25/10: Lê Quốc Vũ chuyển khoản 200.000.000 VNĐ vào tài khoản VietinBank của người giúp việc Nguyễn Thị Yến với nội dung “Vu gui tien ho tro gia dinh chi Yen”.',
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
        text: 'Kết quả giải phẫu ban đầu: Nạn nhân tử vong do độc chất Aconitine tác động lên cơ tim. Mặt kính đồng hồ vỡ ở mốc 22h15 nhưng góc vỡ bị đập thẳng từ trên xuống bằng quả cầu chặn giấy pha lê, đây rõ ràng là hiện trường giả nhằm tạo alibi ngoại phạm đổ lỗi cho người khác!',
        clue: 'dong-ho-vo',
      },
      {
        id: 't2',
        from: 'them',
        time: '22:46',
        text: 'Hãy kiểm tra dữ liệu máy chủ Smart Home [SmartHome IoT](https://smarthome.iot) IOT-505: nhiệt độ thực tế của ấm trà và thời gian đun lại sẽ lật tẩy thời điểm tử vong thực sự của nạn nhân.',
        requires: ['nhiet-do-am-tra'],
      },
      {
        id: 't3',
        from: 'them',
        time: '22:52',
        text: 'Đối soát sổ đăng ký hoá chất của Viện Dược Liệu và lịch sử phân phối độc dược [Long Châu](https://nhathuoc-longchau42.vn) chi nhánh 42 đơn thuốc LC-501 để tìm nguồn gốc độc tố Aconitine.',
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
        text: 'Tôi là bác sĩ riêng của bác Khang bao năm nay, tối nay tôi qua thăm khám huyết áp rồi về phòng khám riêng trực từ trước 22h, camera phòng khám có thể chứng minh! Ông Trọng cổ vật mới là kẻ có động cơ hại bác!'
      },
      {
        id: 'v2',
        from: 'me',
        time: '22:46',
        text: 'Pháp y xác định nạn nhân ngừng tim vì độc tố Aconitine lúc 21h42, và sổ kiểm soát Viện Dược Liệu ghi rõ sáng nay chính anh đã ký nhận dung dịch Aconitine tinh chế! Anh giải thích sao?',
        requires: ['so-doc-duoc-vu'],
      },
      {
        id: 'v3',
        from: 'them',
        time: '22:47',
        text: 'Mẫu hoá chất đó tôi phục vụ nghiên cứu độc học tại viện, làm sao có chuyện xuất hiện trong tách trà của bác Khang được?! Lúc 22h15 đồng hồ bác mới vỡ mà, lúc đó tôi đang ở phòng khám!',
        requires: ['so-doc-duoc-vu'],
      },
      {
        id: 'v4',
        from: 'me',
        time: '22:48',
        text: 'Dữ liệu [SmartHome IoT](https://smarthome.iot) chứng minh ấm trà được đun sôi lúc 21h28 và đã nguội ngắt từ 21h55! Lệnh đun lại lúc 22h10 là do điện thoại của Yến bấm từ xa, và lọ thủy tinh chứa Aconitine vừa được tìm thấy dưới đáy hồ cá non bộ có dấu vân tay của anh!',
        requires: ['lo-thuy-tinh-ho-ca'],
      },
      {
        id: 'v5',
        from: 'them',
        time: '22:49',
        text: 'Lọ thuỷ tinh dưới đáy hồ cá non bộ thì bất kỳ ai có mặt trong biệt thự cũng có thể nhặt được rồi vứt xuống để vu oan cho tôi! Còn lệnh đun ấm trà thì mạng Wi-Fi gia đình ai chẳng có mật khẩu truy cập! Tôi là bác sĩ uy tín, các anh không thể quy kết tội danh giết người vô căn cứ!',
        requires: ['lo-thuy-tinh-ho-ca'],
      },
    ],
  },
  {
    id: 'yen',
    name: 'Yến Giúp Việc',
    avatar: '👩‍🍳',
    sub: 'Đang run sợ',
    preview: 'Em chỉ làm theo lời dặn của anh Vũ thôi…',
    requires: ['vu-chuyen-yen-200tr'],
    messages: [
      {
        id: 'y1',
        from: 'them',
        time: '22:50',
        text: 'Dạ... lúc chiều anh Vũ có chuyển khoản 200 triệu cho em, nhưng anh ấy bảo đó là tiền thưởng tết và cho em tạm ứng trước để sửa nhà ở quê thôi ạ... Em không biết gì hết...',
        clue: 'smart-kettle-wifi',
      },
      {
        id: 'y2',
        from: 'them',
        time: '22:51',
        text: 'Tối nay em chỉ ở trên phòng lầu 3 dọn dẹp, lúc 22h10 nghe tiếng chuông ấm trà trong bếp reo thì em mới xuống pha trà cho ông chủ... Sợi cước hay chiếc lọ thuỷ tinh dưới hồ cá em thề em không biết gì đâu ạ!',
        clue: 'lo-thuy-tinh-ho-ca',
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
    name: 'nhat_ky_smart_home_am_tra.pdf',
    kind: 'Trích xuất dữ liệu đám mây IoT',
    preview: 'Nhật ký thiết bị SmartKettle-Pro ngày 25/10…',
    detail: 'Hệ thống Smart Home ghi nhận: Nạn nhân bật ấm trà đun lần 1 lúc 21:28 (Mã giải mã hồ sơ là 2128). Sau đó lúc 22:10 có lệnh đun sôi lại bất thường từ điện thoại của người giúp việc Yến.',
    clue: 'ma-khoa-am-tra',
  },
  {
    id: 't2',
    name: 'ho_so_doc_duoc_vien_duoc_lieu.pdf',
    kind: 'Hồ sơ kiểm soát hóa chất đặc biệt',
    preview: 'Biên bản bàn giao mẫu độc tố Aconitine số 0502…',
    detail: 'Biên bản số 0502 tại Viện Dược Liệu chứng minh Bác sĩ Lê Quốc Vũ đã ký nhận 20ml dung dịch Aconitine kịch độc sáng 25/10. Chữ ký của Vũ khớp hoàn toàn với hồ sơ mẫu tại viện.',
    clue: 'so-doc-duoc-vu',
  },
]
