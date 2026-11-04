import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 04',
  title: 'Đêm mất điện ở chung cư 42',
  place: 'Chung cư 42 · Tầng hầm B1 & Phòng Quản lý Tầng 2',
  time: '21:40 · thứ Bảy 20/10',
  brief:
    'Sự cố ngắt điện toàn bộ tầng hầm và thang máy lúc 21:10. Két sắt phòng Ban Quản lý bị mở sạch 200 triệu tiền quỹ toà nhà. Kỹ thuật viên Khải bất tỉnh cạnh tủ điện với chiếc máy bẻ khoá trong balo. Một màn kịch vu oan tinh vi được tính toán từng giây qua hệ thống BMS và họng rác thông tầng.',
  culprit: 'dat',
  accomplice: 'tu',
  difficulty: 'Siêu khó',
  question: 'Ai là kẻ chủ mưu mở két, và ai là đồng phạm tiếp tay tại tầng hầm?',
  solution:
    'Đạt (Trưởng ban quản lý) là chủ mưu đang bị chủ nợ Bảy Ốc xiết nợ 200 triệu đến hạn chót 22:00. Đạt lập mưu đổi mã két sắt thành 2042 chiều 20/10 viện cớ an toàn định kỳ, mua găng tay cao su đen cách điện tại Long Châu, rồi câu kết với Tư (bảo vệ ca đêm). Lúc 21:05, Đạt gọi điện nội bộ lừa Khải xuống hầm B1. Khi Khải vừa tới nơi lúc 21:10, Tư dùng chìa tủ điện độc quyền ngắt Aptomat tổng gây mất điện toàn hầm và camera, đồng thời đánh lén sau gáy Khải khiến Khải ngất xỉu rồi nhét máy bẻ khoá còn nguyên seal vào balo Khải để vu oan. Lợi dụng bóng tối, Đạt dùng mã 2042 mở két lấy 200 triệu, nhét vào bao tải ném xuống họng rác thông tầng lúc 21:18 (cảm biến BMS ghi nhận vật nặng 12kg rơi). Tư ở dưới hầm cửa xả đón lấy bọc tiền, giấu vào cốp xe máy rồi giao cho Đạt mang đi nộp ATM chuyển khoản trả nợ Bảy lúc 21:50.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-ket': {
    id: 'mat-ket',
    tag: 'photo',
    title: 'Két sắt văn phòng mở bằng mã số an ninh, không dấu vết cạy phá',
    detail:
      'Két sắt phòng Ban Quản lý tầng 2 mở toang không có bất kỳ vết cạy phá hay khoan cắt cơ học nào. Két được mở đúng mã an ninh chu kỳ mới ngay lần bấm đầu tiên lúc mất điện. Toàn bộ 200.000.000 VNĐ tiền quỹ bảo trì biến mất.',
  },
  'khai-bat-tinh': {
    id: 'khai-bat-tinh',
    tag: 'chat',
    title: 'Khải bị đánh lén bất tỉnh tại tủ điện hầm B1 lúc 21:05',
    detail:
      'Kỹ thuật viên Khải được tìm thấy bất tỉnh lúc 21:38 cạnh tủ điện hầm B1 với vết thương bầm tím do vật tày đánh lén từ phía sau gáy. Kết quả khám nghiệm y tế xác nhận Khải bị đánh gục từ khoảng 21:05 (trước cả thời điểm toà nhà mất điện 21:10).',
  },
  'khai-vo-toi': {
    id: 'khai-vo-toi',
    tag: 'file',
    title: 'Thiết bị bẻ mã trong balo Khải còn nguyên tem niêm phong',
    detail:
      'Khám nghiệm vật chứng: Chiếc máy bẻ khoá BruteSafe trong balo Khải còn nguyên tem niêm phong nhà sản xuất, khe lắp pin hoàn toàn trống, chưa từng được bật nguồn hay sử dụng. Rõ ràng có kẻ đã cố tình nhét vào balo để dựng hiện trường vu khống!',
  },
  'mat-dien': {
    id: 'mat-dien',
    tag: 'web',
    title: 'Nhật ký BMS: Aptomat chiếu sáng hầm B1 bị ngắt thủ công lúc 21:10',
    detail:
      'Nhật ký máy chủ BMS tòa nhà (bms-building.vn): Aptomat tổng chiếu sáng và camera hầm B1 bị kéo ngắt cưỡng bức bằng tay lúc 21:10:05. Không hề có hiện tượng quá tải nhiệt hay đoản mạch tự nhiên.',
  },
  'hong-rac-bms': {
    id: 'hong-rac-bms',
    tag: 'web',
    title: 'Cảm biến BMS: Họng rác ghi nhận vật nặng 12.4kg rơi lúc 21:18',
    detail:
      'Nhật ký cảm biến BMS toà nhà: Lúc 21:18:22, cảm biến trọng lực họng rác thông tầng ghi nhận một vật nặng khoảng 12.4kg rơi từ cửa nạp rác tầng 2 (sát phòng BQL) xuống buồng xả rác hẻm sau tầng hầm B2.',
  },
  'lenh-chuyen-200tr': {
    id: 'lenh-chuyen-200tr',
    tag: 'web',
    title: 'Sao kê VietinBank: Lệnh TX-4011 chuyển 200 triệu ký bởi User ADMIN_DAT',
    detail:
      'Sao kê VietinBank TX-4011 lúc 21:50:44: Lệnh chuyển 200.000.000 VNĐ từ tài khoản công ty quản lý sang tài khoản Lê Văn Bảy (Bảy Ốc). Chữ ký số uỷ nhiệm chi được xác thực trực tiếp qua mã OTP thiết bị di động của User: ADMIN_DAT, đối lập hoàn toàn với lời khai "đã về nhà ngủ không dùng điện thoại".',
  },
  'gang-tay-dat': {
    id: 'gang-tay-dat',
    tag: 'web',
    title: 'Mẩu găng tay cao su đen dính mực dấu đỏ trong họng rác hầm B2',
    detail:
      'Vật chứng thu giữ tại cửa xả họng rác: Mẩu găng tay cao su y tế màu đen bị rách ở đầu ngón trỏ, trên đầu ngón dính loại mực dấu đỏ chuyên dụng đóng mộc Trưởng ban quản lý toà nhà. Hoá đơn LC-401 tại Long Châu xác nhận số điện thoại của Đạt (0912.xxx.888) đã thanh toán hộp găng tay này lúc 17:32 chiều.',
  },
  'tu-tat-dien': {
    id: 'tu-tat-dien',
    tag: 'chat',
    title: 'Chìa khóa tủ điện cơ học hầm B1 do Bảo vệ Tư độc quyền nắm giữ',
    detail:
      'Sổ giao ca an ninh: Ổ khóa tủ điện sắt hầm B1 chỉ có 01 chìa khóa cơ duy nhất số 02, do Bảo vệ trực ca đêm (Nguyễn Văn Tư) đeo ở thắt lưng suốt ca trực từ 18:00 đến 06:00 sáng. Khải không thể tự mở tủ điện nếu không có sự tiếp tay của Tư.',
  },
  'camera-tu-canh-gioi': {
    id: 'camera-tu-canh-gioi',
    tag: 'web',
    title: 'Camera CAM-401: Tư đón bọc hàng họng rác và cảnh giới dốc hầm lúc 21:19',
    detail:
      'Trích xuất camera an ninh cổng hầm (camera-phuong.gov.vn) CAM-401: Lúc 21:19 (ngay sau khi họng rác rung chấn 21:18), Tư điều khiển xe máy số 29-X1 chạy lại cửa xả rác hẻm sau, cúi xuống nhặt một bọc hàng dày nhét vào cốp xe rồi nổ máy phóng ra chắn ngang dốc cửa hầm cảnh giới.',
  },
  'ma-khoa-ket-2042': {
    id: 'ma-khoa-ket-2042',
    tag: 'file',
    title: 'Mật mã an ninh két sắt mới: 2042 (Phòng BQL 204 ghép Tầng 2)',
    detail:
      'Biên bản ghi nhớ bảo mật số 2042/BB: Chiều 20/10 Đạt viện cớ an toàn định kỳ phê duyệt đổi mã két sắt thành 2042 bằng cách ghép số phòng Ban quản lý với số tầng đặt két, rồi giao nhiệm vụ cho Lan niêm phong.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'dat',
    name: 'Quản Lý Đạt',
    role: 'Trưởng ban quản lý toà nhà',
    avatar: '👨‍💼',
    note: 'Nắm toàn quyền quản trị hệ thống toà nhà BMS và mật mã két sắt văn phòng. Khai rằng về nhà với gia đình từ 19h tối.',
  },
  {
    id: 'tu_bv',
    name: 'Tư Bảo Vệ',
    role: 'Bảo vệ ca đêm hầm B1',
    avatar: '👮',
    note: 'Trực chốt dốc hầm, là người duy nhất giữ chìa khóa tủ điện cơ học suốt ca trực đêm.',
  },
  {
    id: 'khai',
    name: 'Khải Kỹ Thuật',
    role: 'Kỹ thuật viên điện nước',
    avatar: '🔧',
    note: 'Bị phát hiện bất tỉnh cạnh tủ điện hầm B1 do bị đánh lén sau gáy, đang được điều trị tại phòng y tế.',
  },
  {
    id: 'lan',
    name: 'Lan Kế Toán',
    role: 'Kế toán trưởng toà nhà',
    avatar: '👩‍💻',
    note: 'Người phụ trách sổ sách thu chi quỹ bảo trì toà nhà, khai rằng rời văn phòng về nhà từ 19:55.',
  },
  {
    id: 'tuyet',
    name: 'Bà Tuyết Thanh Tra',
    role: 'Trưởng ban kiểm soát cư dân tầng 5',
    avatar: '👵',
    note: 'Đại diện cư dân đòi kiểm toán quỹ bảo trì 200 triệu sáng mai. Có chìa khóa phòng họp kỹ thuật phụ và cãi nhau to với Đạt lúc chiều.',
  },
  {
    id: 'huy_ship',
    name: 'Huy Shipper Đêm',
    role: 'Tài xế giao đồ ăn công nghệ',
    avatar: '🛵',
    note: 'Giao đồ ăn lên tầng 3 lúc 21h10, bị kẹt thang máy do mất điện, khai nhìn thấy bóng người vội vã lách qua cửa thoát hiểm.',
  },
  {
    id: 'bay',
    name: 'Bảy Chủ Nợ',
    role: 'Khách quen quán nước cạnh toà nhà',
    avatar: '🧔',
    note: 'Ngồi tại quán nước cạnh toà nhà đến 21:40, có các mối quan hệ tài chính phức tạp với nhân viên toà nhà.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group_chung_cu',
    name: 'BQL & Cư Dân Chung Cư 42',
    avatar: '🏢',
    isGroup: true,
    sub: '18 thành viên',
    preview: 'Lan Kế Toán: Két sắt quỹ bảo trì 200 triệu mất sạch rồi!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Tư Bảo Vệ',
        senderAvatar: '👮',
        time: '21:38',
        text: 'Báo cáo BQL, lúc 21h10 hệ thống điện tầng 2 bị nhảy Aptomat cục bộ khiến camera hành lang và đèn chiếu sáng căn 204 bị tắt ngúm 15 phút!',
        clue: 'mat-dien',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Lan Kế Toán',
        senderAvatar: '👩‍💻',
        time: '21:40',
        text: 'Trời đất ơi! Em vừa lên phòng kế toán tầng 2 kiểm tra thì thấy két sắt mở toang hoác, cọc 200 triệu tiền quỹ bảo trì vừa thu hôm nay bốc hơi sạch rồi! Két không có vết cạy phá gì cả!',
        clue: 'mat-ket',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Quản Lý Đạt',
        senderAvatar: '👨‍💼',
        time: '21:42',
        text: 'Tôi biết ngay ai làm mà! Thằng Khải Kỹ Thuật chứ ai! Chiều nay nó vừa năn nỉ quỳ lạy vay tôi 200 triệu bảo mẹ ở quê mổ tim gấp mà tôi từ chối! Nó quẫn trí làm liều đấy! Tư lục soát balo của nó ngay!',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Tư Bảo Vệ',
        senderAvatar: '👮',
        time: '21:43',
        text: 'Đúng y như anh Đạt phán đoán! Trong balo anh Khải có nguyên một chiếc máy bẻ khoá điện tử màu đen đây này bà con ơi!',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Lan Kế Toán',
        senderAvatar: '👩‍💻',
        time: '21:45',
        text: 'Nhưng mà lạ lắm anh Đạt ơi, két sắt này chiều nay lúc 17h chính anh bảo em đổi mã mới mà. Mọi người vào ngân hàng [VietinBank](https://vietinbank.vn) check sao kê quỹ xem có biến động số dư bất thường không!',
      },
      {
        id: 'g6',
        from: 'them',
        senderName: 'Bác Hùng Cư Dân P.402',
        senderAvatar: '👴',
        time: '21:46',
        text: 'Khoan hãy kết tội thằng Khải! Lúc 21h18 tôi đang mang túi rác ra họng rác thông tầng thì nghe tiếng "RẦM" cực mạnh như có bao tải nặng rơi xuống hầm rác hẻm sau. Máy chủ toà nhà [BMS](https://bms-building.vn) có gắn cảm biến rung chấn từng tầng đấy, vào tra log là rõ ngay!',
      },
      {
        id: 'g7',
        from: 'them',
        senderName: 'Tư Bảo Vệ',
        senderAvatar: '👮',
        time: '21:48',
        text: 'Camera cổng hầm [Camera Phường](https://camera-phuong.gov.vn) CAM-401 lúc đó ghi hình rõ tôi ngồi trực ở bốt gác, không hề có người lạ nào đột nhập từ bên ngoài vào cả!',
      },
      {
        id: 'g8',
        from: 'them',
        senderName: 'Bà Tuyết Thanh Tra',
        senderAvatar: '👵',
        time: '21:49',
        text: 'Tôi nghi chính anh Đạt và cô Lan thông đồng kịch bản! Sáng mai là lịch ban kiểm soát chúng tôi mở niêm phong kiểm toán quỹ 200 triệu, sao tự dưng tối nay lại báo mất đúng số tiền đó?! Két mở êm ru không một vết xước, ai là người nắm mã số mới?!',
      },
      {
        id: 'g9',
        from: 'them',
        senderName: 'Huy Shipper Đêm',
        senderAvatar: '🛵',
        time: '21:51',
        text: 'Lúc 21h10 em giao đồ ăn lên tầng 3 thì thang máy tối om bị khựng lại, em kẹt gần 10 phút. Lúc cạy cửa thoát hiểm chui ra thấy một bóng người mặc áo sơ mi tối màu ôm bọc nilon đen chạy xộc xuống lối họng rác!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra hình sự',
    preview: 'Xem xét kỹ cơ chế nhảy Aptomat và nhật ký họng rác.',
    requires: ['mat-ket'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:48',
        text: 'Khám nghiệm ban đầu: Ổ khóa điện tử két sắt mở êm, không hề có vết cạy phá hay khoan đục cơ học. Kẻ thực hiện đã nhập chính xác mã số bảo mật ngay lần đầu tiên.',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:52',
        text: 'Toàn bộ dữ liệu điện toán toà nhà được quản lý bởi máy chủ BMS. Hãy rà soát kỹ các sự kiện bất thường ở khu vực công cộng và nhật ký họng rác thông tầng để lần theo hướng tẩu tán vật chứng.',
        requires: ['khai-vo-toi'],
      },
      {
        id: 't3',
        from: 'them',
        time: '21:58',
        text: 'Số tiền 200 triệu biến mất khỏi két là tiền mặt thu quỹ trong ngày. Hãy kiểm tra các kênh giao dịch tài chính hoặc luân chuyển tiền mặt phát sinh xung quanh thời điểm xảy ra sự cố.',
        requires: ['mat-dien'],
      },
    ],
  },
  {
    id: 'khai',
    name: 'Khải Kỹ Thuật (Phòng Cấp Cứu)',
    avatar: '🔧',
    sub: 'Vừa hồi tỉnh',
    preview: 'Em bị đánh lén sau gáy, em thề bị ai đó gài bẫy!',
    requires: ['khai-vo-toi'],
    messages: [
      {
        id: 'k1',
        from: 'them',
        time: '21:53',
        text: 'Anh điều tra viên ơi cứu em với! Anh Đạt đổ tội cho em nhưng em vừa tỉnh dậy ở trạm y tế, đầu đau như búa bổ. Em thề với lương tâm em không hề mở két trộm tiền!',
      },
      {
        id: 'k2',
        from: 'me',
        time: '21:54',
        text: 'Lúc đó có ai liên lạc hoặc yêu cầu anh xuống kiểm tra khu vực tủ điện hầm B1 không?',
      },
      {
        id: 'k3',
        from: 'them',
        time: '21:55',
        text: 'Đúng 21h05, máy bộ đàm nội bộ của em nhận được thông báo từ số máy bàn phòng BQL của anh Đạt, bảo tủ điện hầm B1 bị rò điện bốc mùi khét. Em vừa cầm đèn pin bước xuống cầu thang hầm lúc 21h10 thì bị ai vụt mạnh sau gáy ngất lịm đi!',
        clue: 'khai-bat-tinh',
      },
      {
        id: 'k4',
        from: 'me',
        time: '21:56',
        text: 'Chúng tôi đang trích xuất nhật ký viễn thông và rà soát các vật chứng liên quan để làm rõ sự việc. Anh hãy bình tĩnh tĩnh dưỡng.',
      },
    ],
  },
  {
    id: 'dat',
    name: 'Quản Lý Đạt',
    avatar: '👨‍💼',
    sub: 'Đang online',
    preview: 'Tôi làm việc công tâm, mọi quy trình đều có biên bản…',
    requires: ['mat-ket'],
    messages: [
      {
        id: 'd1',
        from: 'them',
        time: '21:50',
        text: 'Điều tra viên cần hỏi gì tôi? Tôi là quản lý toà nhà, thằng Khải nó cần tiền nên nó làm liều chứ ai vào đây nữa!',
      },
      {
        id: 'd2',
        from: 'me',
        time: '21:51',
        text: 'Anh có thể giải thích về sự cố sập nguồn Aptomat tầng 2 lúc 21h10 trên nhật ký điều khiển toà nhà không?',
        requires: ['mat-dien'],
      },
      {
        id: 'd3',
        from: 'them',
        time: '21:52',
        text: 'Đó là do hệ thống rơ-le tự ngắt khi quá tải điện thôi! Còn việc có tiếng động ở họng rác là do cư dân dọn dẹp vứt đồ cũ xuống chứ liên quan gì đến việc mất két?! Các anh nên tập trung vào thằng Khải!',
        requires: ['mat-dien'],
      },
      {
        id: 'd4',
        from: 'me',
        time: '21:53',
        text: 'Theo quy trình bàn giao, ai là người nắm giữ mã số két sắt và quyền duyệt chi quỹ bảo trì toà nhà sau đợt cập nhật chiều nay?',
        requires: ['lenh-chuyen-200tr'],
      },
      {
        id: 'd5',
        from: 'them',
        time: '21:54',
        text: 'Mã số két sắt là dữ liệu mật quản lý chung, việc thu chi đều có kế toán Lan lập sổ sách. Tôi làm việc đúng nguyên tắc và có biên bản niêm phong đàng hoàng. Các anh muốn làm việc gì cũng phải có chứng cứ pháp lý xác đáng!',
        requires: ['lenh-chuyen-200tr'],
      },
    ],
  },
  {
    id: 'tu_bv',
    name: 'Tư Bảo Vệ',
    avatar: '👮',
    sub: 'Đang trực bốt gác',
    preview: 'Tôi ngồi trông cửa hầm cả tối không rời nửa bước…',
    requires: ['mat-ket'],
    messages: [
      {
        id: 'tb1',
        from: 'them',
        time: '21:49',
        text: 'Tôi chỉ giữ chìa khóa cửa phòng kỹ thuật cơ học thôi, mọi điều khiển điện đều do anh Đạt bấm trên phần mềm BMS hết!',
        clue: 'tu-tat-dien',
      },
      {
        id: 'tb2',
        from: 'them',
        time: '21:50',
        text: 'Lúc 21h15 anh Đạt có dặn tôi ra chốt đầu dốc hầm đứng trông, bảo có đoàn kiểm tra an toàn PCCC sắp tới kiểm tra.',
        clue: 'camera-tu-canh-gioi',
      },
    ],
  },
  {
    id: 'tuyet',
    name: 'Bà Tuyết Thanh Tra',
    avatar: '👵',
    sub: 'Đang online · Cư dân P.502',
    preview: 'Tôi đã nghi ngờ sự thâm hụt của BQL từ tháng trước…',
    requires: ['mat-ket'],
    messages: [
      {
        id: 'ty1',
        from: 'them',
        time: '21:52',
        text: 'Chào điều tra viên! Chiều nay lúc 16h30 tôi đã ký văn bản gửi anh Đạt yêu cầu niêm phong két sắt kế toán để sáng mai kiểm tra đột xuất quỹ tiền mặt 200 triệu!',
      },
      {
        id: 'ty2',
        from: 'them',
        time: '21:53',
        text: 'Lúc tôi đưa văn bản, anh Đạt toát mồ hôi hột và cãi nhau gắt gao với tôi, bảo rằng việc kiểm toán phải báo trước 3 ngày. Sau đó chính anh ấy yêu cầu cô Lan kế toán đổi mã an ninh mới!',
      },
    ],
  },
  {
    id: 'huy_ship',
    name: 'Huy Shipper Đêm',
    avatar: '🛵',
    sub: 'Tài xế giao hàng',
    preview: 'Em nhìn thấy người áo đen ở cầu thang bộ thoát hiểm…',
    requires: ['mat-dien'],
    messages: [
      {
        id: 'hs1',
        from: 'them',
        time: '21:53',
        text: 'Anh điều tra viên ơi, lúc 21h10 em vừa bước vào thang máy toà nhà bấm tầng 3 thì đèn vụt tắt ngúm, thang khựng lại giữa tầng 2 và 3!',
      },
      {
        id: 'hs2',
        from: 'them',
        time: '21:54',
        text: 'Em cạy được hé cửa thang lách ra cầu thang bộ thì nghe tiếng bước chân chạy huỳnh huỵch và thấy một người đàn ông mặc sơ mi sẫm màu vội vã ném một bọc nilon nặng vào họng rác số 1 rồi đi thang bộ xuống hầm!',
      },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'LC-401', time: '17:32', pickup: 'Nhà thuốc Long Châu 42', drop: 'Găng tay cao su đen & băng dính xốp', fee: '110.000đ', status: 'Hoàn tất (Trần Tuấn Đạt)', clue: 'gang-tay-dat' },
  { id: 'TX-4011', time: '21:50', pickup: 'VietinBank iPay', drop: 'Thanh toán nợ gốc cho Bảy Ốc', fee: '200.000.000đ', status: 'Giao dịch thành công', clue: 'lenh-chuyen-200tr' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Hiện trường tủ điện và Aptomat hầm B1',
    time: '21:45',
    scene: 'street',
    caption: 'Tủ điện sắt hầm B1 điều khiển toàn bộ hệ thống chiếu sáng và camera.',
    clue: 'mat-dien',
    hotspots: [
      {
        x: 35,
        y: 40,
        label: 'Cần gạt Aptomat tổng hầm B1',
        hint: 'Bị kéo ngắt cưỡng bức bằng tay',
        clue: 'mat-dien',
        detail: 'Cần gạt Aptomat tổng 3 pha bị kéo gạt xuống nấc OFF thủ công lúc 21:10. Không có dấu vết chập cháy hay phóng điện hồ quang.',
      },
      {
        x: 65,
        y: 75,
        label: 'Ổ khóa tủ điện sắt cơ học',
        hint: 'Mở bằng chìa khóa số 02',
        clue: 'tu-tat-dien',
        detail: 'Ổ khóa tủ điện mở bằng chìa khóa cơ dự phòng số 02 do bảo vệ trực ca đêm (Tư) đeo ở thắt lưng.',
      },
    ],
  },
  {
    id: 'p2',
    title: 'Két sắt văn phòng Ban Quản Lý tầng 2',
    time: '21:48',
    scene: 'street',
    caption: 'Két sắt bảo mật 4 chữ số trong phòng kế toán tầng 2.',
    clue: 'mat-ket',
    hotspots: [
      {
        x: 50,
        y: 50,
        label: 'Bàn phím điện tử két sắt',
        hint: 'Nhập đúng mã số 2042 ngay lần đầu',
        clue: 'mat-ket',
        detail: 'Bàn phím không có vết cào xước hay cạy phá. Nhật ký chip nhớ vi xử lý két: Két được mở đúng mã số chu kỳ mới ngay lần bấm đầu tiên lúc 21:16.',
      },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 't1',
    name: 'bang_cham_cong_bao_ve_thang_10.xlsx',
    kind: 'Bảng phân công ca trực an ninh',
    preview: 'Lịch trực ca đêm cổng chính và hầm B1 tháng 10…',
    detail: 'Bảng chấm công an ninh tòa nhà: Bảo vệ Tư trực ca tối từ 18:00 đến 06:00 sáng, chịu trách nhiệm trông coi dốc hầm và quản lý chìa khóa tủ điện cơ hầm B1.',
  },
  {
    id: 't2',
    name: 'bien_ban_kiem_tra_pccc_dinh_ky.pdf',
    kind: 'Biên bản an toàn phòng cháy chữa cháy',
    preview: 'Kết quả rà soát vòi phun nước và cửa thoát hiểm hầm B1…',
    detail: 'Biên bản kiểm tra kỹ thuật PCCC ngày 18/10: Hệ thống bình bọt và cửa thoát hiểm tầng hầm đạt chuẩn. Ghi nhận cửa thoát hiểm hẻm sau chỉ mở được một chiều từ bên trong.',
  },
  {
    id: 't3',
    name: 'hoa_don_bao_tri_thang_may_thang_10.pdf',
    kind: 'Hóa đơn dịch vụ kỹ thuật',
    preview: 'Hóa đơn thay thế linh kiện thang máy Schindler…',
    detail: 'Chi phí bảo dưỡng định kỳ hệ thống thang máy trục 1 và trục 2: 18.500.000đ. Đã thanh toán chuyển khoản từ tài khoản quỹ vận hành tòa nhà.',
  },
  {
    id: 't4',
    name: 'bien_ban_giam_dinh_thiet_bi_brutesafe.pdf',
    kind: 'Biên bản giám định kỹ thuật hình sự',
    preview: 'Kết quả kiểm tra thiết bị BruteSafe trong balo Khải…',
    detail: 'Máy bẻ khoá BruteSafe trong balo Khải còn nguyên tem niêm phong chống hàng giả của hãng, khay pin hoàn toàn trống rỗng, không có dấu vân tay của Khải. Đây là vật chứng bị gài bẫy vu oan!',
    clue: 'khai-vo-toi',
  },
  {
    id: 't5',
    name: 'bien_ban_mat_ma_2042.pdf',
    kind: 'Tài liệu mật Ban Quản Lý',
    preview: 'Biên bản số 2042/BB-BQL ngày 20/10…',
    detail: 'Biên bản số 2042 phê duyệt quy chuẩn mã an ninh két sắt quỹ toà nhà: Ghép số phòng Ban quản lý (P.204) với số tầng đặt két do Quản lý Đạt trực tiếp quản lý và bảo mật.',
    clue: 'ma-khoa-ket-2042',
  },
]
