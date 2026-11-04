import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 06',
  title: 'Vụ Bắt Cóc Con Tin Du Thuyền Sông Hồng',
  place: 'Bến Du Thuyền Hạng Sang Sông Hồng · Khoang VIP Tầng 3',
  time: '22:15 · thứ Bảy 28/10',
  brief:
    'Ái nữ duy nhất của tập đoàn tài chính Đông Dương biến mất bí ẩn ngay giữa bữa tiệc sinh nhật trên du thuyền Horizon 5 sao. Tin nhắn đòi 3 tỷ đồng tiền chuộc trong 60 phút, chiếc vòng kim cương vướng lại ở mạn thuyền. Một kế hoạch tống tiền đào tẩu xuyên quốc gia dần lộ diện qua các dấu vết hàng hải và đơn vận chuyển trước giờ G.',
  culprit: 'minh-khang',
  accomplice: 'thao-my',
  difficulty: 'Siêu hóc búa',
  question: 'Ai là kẻ chủ mưu dàn dựng vụ bắt cóc tống tiền, và ai là đồng phạm phối hợp?',
  solution:
    'Minh Khang (vị hôn phu) là kẻ chủ mưu phối hợp cùng chính "nạn nhân" Thảo My dàn dựng vụ bắt cóc giả mạo nhằm chiếm đoạt 3 tỷ đồng từ bố của My. Khang bị vỡ nợ chứng khoán phái sinh 12 tỷ, trong khi My bị bố cấm cưới và cắt thẻ tín dụng. Cả hai lên kế hoạch tẩu thoát sang Bangkok trên chuyến bay 06:00 sáng hôm sau (đã đặt vé sẵn). Chiều 28/10, My tự đến Nhà Thuốc Long Châu mua thuốc nhuộm tóc đen và thuốc an thần để thay đổi nhân dạng. Lúc 21:30, Khang đặt đơn GiaoNhanh chuyển 2 vali Rimowa chứa tư trang ra ca-nô cao tốc neo tại phao số 4. Lúc 21:40, My vứt vòng kim cương ở mạn thuyền tạo hiện trường giả bị ngã xuống sông rồi thay giày thể thao trắng, trùm áo mưa tím tự nguyện bước xuống ca-nô cao tốc lúc 21:50 (camera bến sông CAM-601 ghi nhận không hề có sự kháng cự hay khống chế). Khang dùng sim rác phát đi tin nhắn tống tiền 3 tỷ lúc 22:00, sau đó lén nhét điện thoại vào túi tạp dề của nhân viên bồi bàn Nam lúc 22:05 để vu oan, rồi điều phối nhận 3 tỷ tiền chuộc vào tài khoản công ty sự kiện của mình lúc 22:45.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-tich-con-tin': {
    id: 'mat-tich-con-tin',
    tag: 'chat',
    title: 'Tiểu thư Thảo My rời khoang VIP lúc 21:40 ra mạn thuyền',
    detail:
      'Lúc 21:40, giữa lúc tiệc sinh nhật đang sôi nổi, Thảo My rời bàn nói ra mạn thuyền hóng gió rồi không quay trở lại. Cửa khoang VIP mở toang, ly rượu cocktail còn uống dở.',
  },
  'vong-tay-man-thuyen': {
    id: 'vong-tay-man-thuyen',
    tag: 'photo',
    title: 'Vòng tay kim cương vướng vào mấu neo mạn thuyền không vết giằng co',
    detail:
      'Chiếc vòng tay kim cương đắt tiền vướng vào mấu neo mạn thuyền. Sàn boong tàu khô ráo, không có vết cào xước, không có vết trượt ngã hay bất kỳ dấu hiệu giằng co, xô đẩy vũ lực nào.',
  },
  'cuoc-goi-tong-tien': {
    id: 'cuoc-goi-tong-tien',
    tag: 'chat',
    title: 'Tin nhắn nặc danh đòi 3 tỷ tiền chuộc lúc 22:00',
    detail:
      'Đúng 22:00:15, máy ông Chủ tịch nhận tin nhắn từ sim rác yêu cầu chuyển khẩn cấp 3.000.000.000 VNĐ tiền mặt/chuyển khoản vào tài khoản chỉ định trước 23:00, đe dọa con tin sẽ bị nguy hiểm nếu báo công an.',
  },
  'sim-rac-tap-de': {
    id: 'sim-rac-tap-de',
    tag: 'file',
    title: 'Chiếc điện thoại sim rác bị lén nhét vào túi tạp dề bồi bàn Nam',
    detail:
      'Trong túi tạp dề của nhân viên bồi bàn Nam phát hiện chiếc điện thoại cục gạch vừa phát đi tin nhắn tống tiền lúc 22:00. Nam khẳng định bị ai đó cố tình va mạnh vào người rồi lén nhét vào lúc đi qua quầy bar đông người.',
  },
  'camera-ben-thuyen': {
    id: 'camera-ben-thuyen',
    tag: 'web',
    title: 'Camera CAM-601: Thảo My đi giày thể thao bước xuống ca-nô lúc 21:50',
    detail:
      'Camera an ninh hàng hải CAM-601 (camera-phuong.gov.vn): Lúc 21:50, một phụ nữ vóc dáng thon gọn mặc áo mưa trùm kín đầu, chân đi giày thể thao trắng bước từ mạn du thuyền xuống ca-nô cao tốc rất nhanh nhẹn và tự nguyện, hoàn toàn không có dấu vết bị bắt ép khống chế.',
  },
  'vietinbank-chuyen-tien-chuoc': {
    id: 'vietinbank-chuyen-tien-chuoc',
    tag: 'web',
    title: 'Lệnh chuyển 3 tỷ đồng vào tài khoản công ty của Minh Khang lúc 22:45',
    detail:
      'Sao kê VietinBank (vietinbank.vn) mã TX-77102: 22:45 tài khoản gia đình chuyển 3.000.000.000 VNĐ vào tài khoản Công ty Sự kiện Khang Event do Lê Minh Khang làm đại diện pháp luật duy nhất.',
  },
  'mua-thuoc-nhuom-toc': {
    id: 'mua-thuoc-nhuom-toc',
    tag: 'web',
    title: 'Thảo My mua thuốc nhuộm tóc đen & an thần tại Long Châu lúc 17:15',
    detail:
      'Hoá đơn LC-608 tại Nhà Thuốc Long Châu chi nhánh Bến Bạc (nhathuoc-longchau42.vn): Lúc 17:15 ngày 28/10, Thảo My tự thanh toán Apple Pay mua thuốc nhuộm tóc màu đen tự nhiên và thuốc an thần để chuẩn bị thay đổi nhân dạng tẩu thoát.',
  },
  'vali-minh-khang': {
    id: 'vali-minh-khang',
    tag: 'web',
    title: 'GiaoNhanh chuyển 2 vali cá nhân ra ca-nô lúc 21:30',
    detail:
      'Hệ thống GiaoNhanh (giaonhanh.vn) mã GN-99801: Lúc 21:30 (trước khi My mất tích 10 phút), 02 vali du lịch cỡ đại Rimowa được giao từ khách sạn ra bến ca-nô phao số 4, người ký nhận trực tiếp là Lê Minh Khang.',
  },
  'nam-sim-rac-oan': {
    id: 'nam-sim-rac-oan',
    tag: 'web',
    title: 'Xác minh bồi bàn Nam rao bán xe máy cũ trên Chợ Tốt đóng học phí',
    detail:
      'Tin đăng Chợ Tốt (chotot.vn) mã CT-688: Nam chỉ là sinh viên phục vụ bán thời gian, vừa đăng bán chiếc Wave cũ lấy tiền nộp học phí lúc 16h chiều, hoàn toàn không có liên hệ hay động cơ tống tiền.',
  },
  've-may-bay-bangkok': {
    id: 've-may-bay-bangkok',
    tag: 'file',
    title: 'Cặp vé máy bay một chiều đi Bangkok chuyến 06:00 sáng mai',
    detail:
      'Hồ sơ đặt vé điện tử hãng hàng không: Khang đã đặt 02 vé máy bay một chiều đi Bangkok chuyến VN-611 khởi hành lúc 06:00 sáng mai cho Lê Minh Khang và Nguyễn Thảo My.',
  },
  'ma-phao-hai-dang': {
    id: 'ma-phao-hai-dang',
    tag: 'file',
    title: 'Mã số an ninh hàng hải: 0450 (Phao số 04 kết hợp Mốc phút 21:50)',
    detail:
      'Nhật ký điện đàm hàng hải: Mã giải mã hộp đen liên lạc vệ tinh của ca-nô cao tốc = Ghép [Số hiệu phao đón người: 04] và [Phút ca-nô rời bến: 50] => Mật mã là 0450.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'minh-khang',
    name: 'Minh Khang',
    role: 'Vị hôn phu · Trưởng ban tổ chức tiệc',
    avatar: '🤵',
    note: 'Đảm nhận điều phối sự kiện trên du thuyền Horizon. Đang nợ chứng khoán phái sinh 12 tỷ. Là kẻ chủ mưu dàn dựng kịch bản bắt cóc tống tiền 3 tỷ cùng Thảo My.',
  },
  {
    id: 'thao-my',
    name: 'Tiểu thư Thảo My',
    role: 'Con tin tự dàn dựng mất tích',
    avatar: '💃',
    note: 'Ái nữ tập đoàn tài chính. Tự mua thuốc nhuộm tóc đen và đổi giày thể thao để tự nguyện bước xuống ca-nô tẩu thoát cùng người yêu.',
  },
  {
    id: 'nam',
    name: 'Nam Bồi Bàn',
    role: 'Nhân viên phục vụ quầy bar',
    avatar: '🍸',
    note: 'Sinh viên làm thêm bán thời gian. Bị Minh Khang lén nhét chiếc điện thoại sim rác vào túi tạp dề lúc đi ngang qua quầy bar lúc 22:05 để vu oan.',
  },
  {
    id: 'hai',
    name: 'Thuyền Trưởng Hải',
    role: 'Thuyền trưởng du thuyền Horizon',
    avatar: '⚓',
    note: 'Phụ trách hải đồ và điều khiển tàu. Khai rằng hệ thống radar vẫn hoạt động bình thường theo đúng luồng lạch đường thủy.',
  },
  {
    id: 'phuong',
    name: 'Bà Phương',
    role: 'Mẹ kế của Thảo My',
    avatar: '👒',
    note: 'Cùng tham dự bữa tiệc sinh nhật tại khoang khách sạn tầng 2 suốt từ đầu buổi tối.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group_du_thuyen',
    name: 'Ban Điều Hành Du Thuyền Horizon',
    avatar: '🚢',
    isGroup: true,
    sub: '14 thành viên',
    preview: 'Minh Khang: Mọi người ơi Thảo My mất tích rồi!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Minh Khang',
        senderAvatar: '🤵',
        time: '21:55',
        text: 'Cả tàu ơi khẩn cấp! Thảo My ra mạn thuyền hóng gió từ 21h40 đến giờ không thấy quay lại, ngoài boong chỉ còn chiếc vòng tay kim cương vướng ở lan can!',
        clue: 'mat-tich-con-tin',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Thuyền Trưởng Hải',
        senderAvatar: '⚓',
        time: '21:58',
        text: 'Bật đèn pha cứu hộ quét mặt nước ngay! Hệ thống camera bến cảng [camera-phuong.gov.vn](https://camera-phuong.gov.vn) CAM-601 nối thẳng vào radar mạn tàu, kiểm tra xem có phương tiện thủy nào tiếp cận không!',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Minh Khang',
        senderAvatar: '🤵',
        time: '22:02',
        text: 'Trời ơi... Bác Chủ tịch vừa nhận được tin nhắn tống tiền từ sim rác đòi 3 tỷ tiền chuộc trong vòng 60 phút, đe dọa con tin sẽ nguy hiểm nếu báo công an!',
        clue: 'cuoc-goi-tong-tien',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Nam Bồi Bàn',
        senderAvatar: '🍸',
        time: '22:08',
        text: 'Oan cho em quá các anh chị ơi! Ai đó vừa lén nhét cái điện thoại cục gạch này vào túi tạp dề của em lúc em bưng khay rượu qua quầy bar! Em chỉ là sinh viên đi làm thêm, chiều nay em vừa đăng tin bán xe máy cũ trên [chotot.vn](https://chotot.vn) lấy tiền đóng học phí chứ em biết gì đâu!',
        clue: 'sim-rac-tap-de',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Minh Khang',
        senderAvatar: '🤵',
        time: '22:12',
        text: 'Bắt lấy thằng bồi bàn đó giao cho cảnh sát! Gia đình bác Chủ tịch đã đồng ý chuyển 3 tỷ để chuộc My an toàn trước, mọi người kiểm tra VietinBank [vietinbank.vn](https://vietinbank.vn) xem tiền đã đi chưa!',
      },
      {
        id: 'g6',
        from: 'them',
        senderName: 'Lan Bạn Thân Của My',
        senderAvatar: '💄',
        time: '22:15',
        text: 'Kỳ lạ thật đấy... Chiều nay lúc 17h15 tao còn thấy My vào tiệm thuốc [nhathuoc-longchau42.vn](https://nhathuoc-longchau42.vn) chi nhánh Bến Bạc mua đồ mà, sao tối nay lại bảo bị bắt cóc ngã xuống sông?',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội Cảnh sát Hình sự & Đường thuỷ',
    preview: 'Xem xét động thái của con tin và thời điểm chuẩn bị hậu cần.',
    requires: ['mat-tich-con-tin'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '22:18',
        text: 'Chiếc vòng tay kim cương rơi ở mạn thuyền nhưng không hề có vết trượt chân hay dấu hiệu giằng co vật lộn. Hãy cẩn trọng trước khả năng đây là màn kịch tự dàn dựng.',
        clue: 'vong-tay-man-thuyen',
      },
      {
        id: 't2',
        from: 'them',
        time: '22:22',
        text: 'Kiểm tra camera an ninh cảng sông [camera-phuong.gov.vn](https://camera-phuong.gov.vn) CAM-601: Xem người rời tàu có mang tư thế của một nạn nhân bị khống chế vũ lực hay không.',
        requires: ['camera-ben-thuyen'],
      },
      {
        id: 't3',
        from: 'them',
        time: '22:30',
        text: 'Hãy kiểm tra hệ thống điều phối [giaonhanh.vn](https://giaonhanh.vn) quanh khu vực bến tàu trước khi sự việc diễn ra xem có kiện hành lý nào được gửi ra trước.',
        requires: ['vali-minh-khang'],
      },
      {
        id: 't4',
        from: 'them',
        time: '22:36',
        text: 'Hồ sơ có mã khoá an ninh 4 số. Mật mã vô tuyến hàng hải là ghép [Số hiệu phao đón người (04)] và [Số phút ca-nô rời bến lúc 21:50 (50)] => Mã an ninh: 0450.',
        requires: ['ma-phao-hai-dang'],
      },
    ],
  },
  {
    id: 'minh-khang',
    name: 'Minh Khang',
    avatar: '🤵',
    sub: 'Đang online',
    preview: 'Tôi đang lo lắng cho My đến phát điên đây…',
    requires: ['mat-tich-con-tin'],
    messages: [
      {
        id: 'mk1',
        from: 'them',
        time: '22:25',
        text: 'Tôi yêu My thật lòng, gia đình đã đồng ý chuyển 3 tỷ chuộc My an toàn trước đã, xin các anh đừng làm manh động kẻ bắt cóc!',
      },
      {
        id: 'mk2',
        from: 'me',
        time: '22:26',
        text: 'Đơn hàng GiaoNhanh [giaonhanh.vn](https://giaonhanh.vn) mã GN-99801 chuyển 2 vali cá nhân cỡ lớn ra ca-nô phao số 4 lúc 21h30 do chính anh đặt trước khi My "biến mất" 10 phút!',
        requires: ['vali-minh-khang'],
      },
      {
        id: 'mk3',
        from: 'them',
        time: '22:27',
        text: 'Đó... đó là vali trang phục biểu diễn của đoàn ca múa nhạc tiệc sinh nhật thôi mà!',
        requires: ['vali-minh-khang'],
      },
      {
        id: 'mk4',
        from: 'me',
        time: '22:28',
        text: 'Camera CAM-601 ghi nhận Thảo My tự trùm áo mưa, đi giày thể thao trắng bước xuống ca-nô cao tốc rất nhanh nhẹn lúc 21h50, và hoá đơn Long Châu [nhathuoc-longchau42.vn](https://nhathuoc-longchau42.vn) chiều nay cô ấy đã tự mua thuốc nhuộm tóc đen ngụy trang để cùng anh trốn sang Bangkok trên chuyến bay 06h sáng mai!',
        requires: ['mua-thuoc-nhuom-toc'],
      },
      {
        id: 'mk5',
        from: 'them',
        time: '22:29',
        text: '...Làm sao... làm sao các người có thể lật tẩy được toàn bộ kế hoạch của chúng tôi?! Tôi chỉ muốn có tiền cưới My và trả nợ thôi mà...',
        requires: ['mua-thuoc-nhuom-toc'],
      },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'LC-608', time: '17:15', pickup: 'Nhà thuốc Long Châu Bến Bạc', drop: 'Thuốc nhuộm tóc đen & Rotunda', fee: '280.000đ', status: 'Hoàn tất (Nguyễn Thảo My)', clue: 'mua-thuoc-nhuom-toc' },
  { id: 'GN-99801', time: '21:30', pickup: 'Khách sạn Sông Hồng View', drop: 'Bến ca-nô phao số 4', fee: '150.000đ', status: 'Hoàn tất (Lê Minh Khang)', clue: 'vali-minh-khang' },
  { id: 'TX-77102', time: '22:45', pickup: 'VietinBank iPay VIP', drop: 'Tài khoản Khang Event', fee: '3.000.000.000đ', status: 'Lệnh phong toả khẩn cấp', clue: 'vietinbank-chuyen-tien-chuoc' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Hiện trường mạn du thuyền Horizon tầng 3',
    time: '22:00',
    scene: 'street',
    caption: 'Mạn tàu khoang VIP nơi phát hiện vòng kim cương vướng vào lan can.',
    clue: 'vong-tay-man-thuyen',
    hotspots: [
      {
        x: 40,
        y: 65,
        label: 'Chiếc vòng tay kim cương vướng ở lan can',
        hint: 'Không có dấu hiệu giằng co vật lộn',
        clue: 'vong-tay-man-thuyen',
        detail: 'Chiếc vòng tay kim cương đặt ngay ngắn trên mấu neo mạn thuyền, không có dấu vết trầy xước, va chạm hay xô đẩy vũ lực.',
      },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 't1',
    name: 've_may_bay_bangkok_0110.pdf',
    kind: 'Hồ sơ vé máy bay quốc tế',
    preview: '02 vé máy bay một chiều đi Bangkok chuyến VN-611… (Tệp bị khóa mật mã)',
    detail: 'Hồ sơ đặt chỗ điện tử: 02 vé máy bay một chiều đi Bangkok chuyến VN-611 khởi hành lúc 06:00 sáng 29/10 cho hành khách: Lê Minh Khang và Nguyễn Thảo My.',
    clue: 've-may-bay-bangkok',
    locked: true,
    lockPrompt: 'Tệp vé máy bay điện tử đi Bangkok bị mã hóa bảo mật hãng hàng không: Hãy nhập giờ cất cánh chuyến bay sáng mai (định dạng HH:MM) để giải mã hồ sơ hành khách.',
    lockHint: 'Xem tài liệu và lời khai về thời điểm chuyến bay quốc tế khởi hành lúc rạng sáng...',
    lockCodes: ['06:00', '6:00', '06h00', '6h00', '6h', '06:00:00'],
  },
  {
    id: 't2',
    name: 'nhat_ky_dien_dam_phao_04.pdf',
    kind: 'Nhật ký vô tuyến cảng vụ đường thuỷ',
    preview: 'Bản ghi toạ độ và thời gian ca-nô cao tốc cập mạn phao số 4…',
    detail: 'Hải đồ cảng vụ ghi nhận: Ca-nô cao tốc neo đậu đón khách tại phao số 04 và nổ máy rời bến lúc 21:50. Mật mã vô tuyến giải mã hồ sơ an ninh là 0450.',
    clue: 'ma-phao-hai-dang',
  },
]
