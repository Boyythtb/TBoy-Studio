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
    title: 'Két sắt văn phòng mở bằng mã số bí mật không dấu vết cạy phá',
    detail:
      'Két sắt phòng ban quản lý tầng 2 mở toang không có bất kỳ vết cạy phá hay khoan cắt cơ học nào. Két được mở đúng mã an ninh chu kỳ mới ngay lần bấm đầu tiên. Toàn bộ 200.000.000 VNĐ tiền quỹ bảo trì biến mất.',
  },
  'khai-bat-tinh': {
    id: 'khai-bat-tinh',
    tag: 'chat',
    title: 'Khải bị đánh lén bất tỉnh tại tủ điện hầm B1',
    detail:
      'Kỹ thuật viên Khải được tìm thấy bất tỉnh lúc 21:38 cạnh tủ điện hầm B1 với vết thương bầm tím do vật tày đánh lén từ phía sau gáy. Trong balo của Khải có một thiết bị bẻ mã két sắt.',
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
    title: 'Aptomat hầm B1 bị ngắt thủ công bằng tay lúc 21:10',
    detail:
      'Nhật ký máy chủ BMS tòa nhà (bms-building.vn): Aptomat tổng chiếu sáng và camera hầm B1 bị kéo ngắt cưỡng bức bằng tay lúc 21:10:05, không hề có hiện tượng quá tải nhiệt hay đoản mạch tự nhiên.',
  },
  'hong-rac-bms': {
    id: 'hong-rac-bms',
    tag: 'web',
    title: 'Cảm biến họng rác thông tầng ghi nhận vật rơi 12kg lúc 21:18',
    detail:
      'Nhật ký cảm biến BMS toà nhà: Lúc 21:18:22, cảm biến trọng lực họng rác thông tầng ghi nhận một vật nặng khoảng 12kg rơi từ cửa nạp rác tầng 2 xuống buồng chứa rác hẻm sau tầng hầm.',
  },
  'lenh-chuyen-200tr': {
    id: 'lenh-chuyen-200tr',
    tag: 'web',
    title: 'Sao kê VietinBank: Đạt chuyển khoản 200 triệu trả nợ lúc 21:50',
    detail:
      'Hệ thống VietinBank (vietinbank.vn) mã giao dịch TX-4011 lúc 21:50:44: Tài khoản Trần Tuấn Đạt (Quản lý) thực hiện chuyển khoản khẩn cấp 200.000.000 VNĐ cho chủ nợ Lê Văn Bảy với nội dung “Dat tra tien no goc theo thoa thuan”.',
  },
  'gang-tay-dat': {
    id: 'gang-tay-dat',
    tag: 'web',
    title: 'Hoá đơn Đạt mua găng tay cao su đen tại Long Châu lúc 17:32',
    detail:
      'Biên lai LC-401 tại Nhà Thuốc Long Châu (nhathuoc-longchau42.vn): Lúc 17:32 ngày 20/10, Quản lý Đạt dùng thẻ quẹt mua 01 hộp găng tay cao su đen y tế không bột và 01 cuộn băng dính xốp cách điện.',
  },
  'tu-tat-dien': {
    id: 'tu-tat-dien',
    tag: 'chat',
    title: 'Chìa khóa tủ điện cơ học do Bảo vệ Tư độc quyền nắm giữ',
    detail:
      'Sổ giao ca an ninh: Ổ khóa tủ điện sắt hầm B1 chỉ có 01 chìa khóa cơ duy nhất số 02, do Bảo vệ trực ca đêm (Nguyễn Văn Tư) đeo ở thắt lưng suốt ca trực từ 18:00 đến 06:00 sáng.',
  },
  'camera-tu-canh-gioi': {
    id: 'camera-tu-canh-gioi',
    tag: 'web',
    title: 'Camera CAM-401: Tư đỗ xe máy cảnh giới cửa dốc hầm lúc 21:15',
    detail:
      'Trích xuất camera an ninh cổng hầm (camera-phuong.gov.vn) CAM-401: Lúc 21:15, Tư điều khiển xe máy số 29-X1 đỗ chắn ngang dốc cửa hầm, liên tục nhìn dáo dác cảnh giới trong lúc bên trong hầm mất điện.',
  },
  'ma-khoa-ket-2042': {
    id: 'ma-khoa-ket-2042',
    tag: 'file',
    title: 'Mật mã an ninh két sắt mới: 2042 (Phòng BQL 204 ghép Tầng 2)',
    detail:
      'Biên bản ghi nhớ bảo mật số 2042/BB: Chiều 20/10 Đạt phê duyệt mã an ninh mới của két sắt quỹ toà nhà theo quy tắc ghép [Số phòng BQL: 204] và [Số tầng đặt két: 2] => Mật mã két là 2042.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'dat',
    name: 'Quản Lý Đạt',
    role: 'Trưởng ban quản lý toà nhà',
    avatar: '👨‍💼',
    note: 'Nắm toàn quyền quản trị hệ thống toà nhà và mật mã két sắt mới đổi. Khai rằng về nhà với gia đình từ 19h tối, nhưng hoá đơn Long Châu và lệnh chuyển tiền 200 triệu lúc 21:50 tố cáo sự thật.',
  },
  {
    id: 'tu',
    name: 'Tư Bảo Vệ',
    role: 'Bảo vệ ca đêm hầm B1',
    avatar: '👮',
    note: 'Trực chốt dốc hầm, là người duy nhất giữ chìa khóa tủ điện cơ học suốt ca trực đêm. Bị camera ghi nhận đỗ xe cảnh giới lúc 21:15.',
  },
  {
    id: 'khai',
    name: 'Khải Kỹ Thuật',
    role: 'Kỹ thuật viên vận hành điện nước',
    avatar: '🔧',
    note: 'Bị phát hiện bất tỉnh cạnh tủ điện hầm B1 do bị đánh lén sau gáy. Trong balo có máy dò mã còn nguyên seal bị ai đó cố tình nhét vào để vu oan.',
  },
  {
    id: 'lan',
    name: 'Lan Kế Toán',
    role: 'Kế toán trưởng toà nhà',
    avatar: '👩‍💻',
    note: 'Người phụ trách sổ sách thu chi. Về nhà lúc 19:55 có đơn hàng giao cơm hộp xác nhận alibi.',
  },
  {
    id: 'bay',
    name: 'Bảy Chủ Nợ',
    role: 'Khách quen quán ốc cạnh toà nhà',
    avatar: '🍢',
    note: 'Ngồi tại quán ốc cạnh toà nhà đến 21:40, nhận được khoản thanh toán nợ gốc 200 triệu từ Đạt qua VietinBank lúc 21:50.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group_bql',
    name: 'BQL & Cư Dân Chung Cư 42',
    avatar: '🏢',
    isGroup: true,
    sub: '15 thành viên',
    preview: 'Tư: Mất điện tầng hầm, anh Khải ngất xỉu rồi!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Tư Bảo Vệ',
        senderAvatar: '👮',
        time: '21:38',
        text: 'Cả nhà ơi có biến lớn rồi! Tầng hầm tự nhiên mất điện tối om, tôi cầm đèn pin xuống kiểm tra thì thấy anh Khải ngất xỉu nằm sõng soài cạnh tủ điện!',
        clue: 'khai-bat-tinh',
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
        text: 'Tôi đang ở nhà nghe tin mà chết đứng! Chiều nay thằng Khải vừa năn nỉ vay tôi 200 triệu bảo mẹ ở quê mổ tim mà tôi từ chối. Có khi nào nó quẫn trí làm liều không? Tư lục soát balo của nó xem có đồ nghề bẻ khoá không!',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Tư Bảo Vệ',
        senderAvatar: '👮',
        time: '21:43',
        text: 'Đúng y như anh Đạt đoán! Trong balo anh Khải có nguyên một chiếc máy bẻ khoá điện tử màu đen đây này bà con ơi!',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Lan Kế Toán',
        senderAvatar: '👩‍💻',
        time: '21:45',
        text: 'Nhưng mà lạ lắm anh Đạt ơi, két sắt này chiều nay lúc 17h chính anh bảo em đổi mã mới mà. Mọi người vào ngân hàng [vietinbank.vn](https://vietinbank.vn) check sao kê quỹ xem có biến động số dư bất thường không!',
      },
      {
        id: 'g6',
        from: 'them',
        senderName: 'Bác Hùng Cư Dân P.402',
        senderAvatar: '👴',
        time: '21:46',
        text: 'Khoan hãy kết tội thằng Khải! Lúc 21h18 tôi đang mang túi rác ra họng rác thông tầng thì nghe tiếng "RẦM" cực mạnh như có bao tải nặng rơi xuống hầm rác hẻm sau. Máy chủ toà nhà [bms-building.vn](https://bms-building.vn) có gắn cảm biến rung chấn từng tầng đấy, vào tra log là rõ ngay!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra hình sự',
    preview: 'Xem xét kỹ chiếc máy bẻ khoá và nhật ký họng rác thông tầng.',
    requires: ['mat-ket'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:48',
        text: 'Két sắt mở không hề có dấu vết cạy phá cơ học, chứng tỏ kẻ mở két biết chính xác mã số mới. Nếu Khải dùng máy bẻ mã thì tại sao két lại không có log thử sai mã nào?',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:52',
        text: 'Hãy kiểm tra chiếc máy bẻ khoá trong balo của Khải xem có điểm bất thường nào không, và đối soát máy chủ quản lý toà nhà [bms-building.vn](https://bms-building.vn) xem Aptomat bị ngắt bằng tay hay do sự cố.',
        requires: ['khai-vo-toi'],
      },
      {
        id: 't3',
        from: 'them',
        time: '21:58',
        text: 'Hồ sơ vụ án đang bị khoá bảo mật. Mã an ninh là quy tắc tạo mật mã két 4 chữ số do Quản lý Đạt đặt: Ghép [Số phòng BQL: 204] và [Số tầng toà nhà: 2] => 2042.',
        requires: ['ma-khoa-ket-2042'],
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
        text: 'Anh điều tra viên ơi cứu em với! Em vừa tỉnh dậy ở trạm y tế, đầu đau như búa bổ. Em thề với lương tâm em không hề mở két trộm tiền!',
      },
      {
        id: 'k2',
        from: 'me',
        time: '21:54',
        text: 'Chiếc máy bẻ khoá trong balo của anh còn nguyên tem niêm phong và chưa hề lắp pin. Ai là người đã bảo anh xuống hầm B1 lúc đó?',
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
        text: 'Ai là người có chìa khóa để mở tủ điện hầm B1 lúc đó?',
      },
      {
        id: 'k5',
        from: 'them',
        time: '21:57',
        text: 'Ổ khóa tủ điện là khóa cơ đặc chủng, chỉ có DUY NHẤT một chìa cơ số 02 do bảo vệ ca đêm (anh Tư) đeo ở thắt lưng suốt ca trực thôi!',
        clue: 'tu-tat-dien',
      },
    ],
  },
  {
    id: 'dat',
    name: 'Quản Lý Đạt',
    avatar: '👨‍💼',
    sub: 'Đang online',
    preview: 'Tôi giao toàn quyền cho bảo vệ và kỹ thuật mà…',
    requires: ['mat-ket'],
    messages: [
      {
        id: 'd1',
        from: 'them',
        time: '21:52',
        text: 'Tôi là trưởng ban quản lý toà nhà nhưng tối nay tôi về nhà sớm với vợ con từ 19h, mọi việc ở chung cư tôi hoàn toàn bất ngờ!',
      },
      {
        id: 'd2',
        from: 'me',
        time: '21:53',
        text: 'Sao kê VietinBank [vietinbank.vn](https://vietinbank.vn) vừa ghi nhận lúc 21h50 anh vừa nộp cây ATM rồi chuyển khoản đúng 200.000.000 VNĐ cho chủ nợ Bảy Ốc!',
        requires: ['lenh-chuyen-200tr'],
      },
      {
        id: 'd3',
        from: 'them',
        time: '21:54',
        text: 'Tiền đó... tiền đó là tiền tôi vừa vay mượn nóng của người thân mang đi trả nợ cá nhân, hoàn toàn không liên quan gì đến quỹ toà nhà!',
        requires: ['lenh-chuyen-200tr'],
      },
      {
        id: 'd4',
        from: 'me',
        time: '21:55',
        text: 'Chiều nay 17h32 tại Nhà thuốc Long Châu [nhathuoc-longchau42.vn](https://nhathuoc-longchau42.vn), anh vừa quẹt thẻ mua 1 hộp găng tay cao su đen y tế và băng dính cách điện để chuẩn bị cho kế hoạch kéo Aptomat không để lại vân tay!',
        requires: ['gang-tay-dat'],
      },
      {
        id: 'd5',
        from: 'them',
        time: '21:56',
        text: '...Anh chị đừng có đổ oan... Tôi... tôi sẽ mời luật sư!',
        requires: ['gang-tay-dat'],
      },
    ],
  },
  {
    id: 'tu',
    name: 'Tư Bảo Vệ',
    avatar: '👮',
    sub: 'Đang trực',
    preview: 'Tôi chỉ đứng gác ở dốc hầm thôi…',
    requires: ['khai-bat-tinh'],
    messages: [
      {
        id: 'u1',
        from: 'them',
        time: '21:58',
        text: 'Tôi chỉ làm bảo vệ trông xe ở dốc hầm, thấy toà nhà mất điện thì cầm đèn pin đi tuần chứ chuyện két sắt trên tầng 2 tôi mù tịt!',
      },
      {
        id: 'u2',
        from: 'me',
        time: '21:59',
        text: 'Chìa khóa tủ điện hầm B1 chỉ có duy nhất anh đeo ở thắt lưng. Camera cổng hầm [camera-phuong.gov.vn](https://camera-phuong.gov.vn) CAM-401 ghi rõ anh đỗ xe máy chắn ngang dốc cửa hầm làm nhiệm vụ cảnh giới lúc 21h15!',
        requires: ['camera-tu-canh-gioi'],
      },
      {
        id: 'u3',
        from: 'them',
        time: '22:00',
        text: 'Trời ơi... Anh Đạt hứa chia cho tôi 30 triệu nếu tôi giúp ngắt điện 10 phút và canh cửa hầm... Tôi chỉ làm theo lời anh Đạt chỉ đạo thôi, anh Đạt mới là người ném bao tiền qua họng rác! Xin các anh chị tha cho tôi!',
        requires: ['camera-tu-canh-gioi'],
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
    name: 'bien_ban_mat_ma_2042.pdf',
    kind: 'Tài liệu mật Ban Quản Lý',
    preview: 'Biên bản số 2042/BB-BQL ngày 20/10…',
    detail: 'Biên bản số 2042 phê duyệt mã an ninh mới của két sắt toà nhà: Ghép [Số phòng BQL: 204] và [Số tầng đặt két: 2] => Mật mã két là 2042 do Quản lý Đạt trực tiếp ký nhận và giữ bảo mật.',
    clue: 'ma-khoa-ket-2042',
  },
  {
    id: 't2',
    name: 'bien_ban_kiem_tra_may_pha_khoa.pdf',
    kind: 'Biên bản giám định kỹ thuật hình sự',
    preview: 'Kết quả kiểm tra thiết bị BruteSafe trong balo Khải…',
    detail: 'Máy bẻ khoá BruteSafe trong balo Khải còn nguyên tem niêm phong chống hàng giả của hãng, khay pin hoàn toàn trống rỗng, không có dấu vân tay của Khải. Đây là vật chứng bị gài bẫy vu oan!',
    clue: 'khai-vo-toi',
  },
]
