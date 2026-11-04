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
    title: 'Camera CAM-601: Người mặc áo mưa trùm đầu bước xuống ca-nô lúc 21:50',
    detail:
      'Camera an ninh hàng hải CAM-601 (camera-phuong.gov.vn): Lúc 21:50, camera ghi nhận một người vóc dáng thon gọn mặc áo mưa trùm kín đầu, chân đi giày thể thao trắng bước từ mạn du thuyền xuống ca-nô cao tốc đang nổ máy chờ sẵn.',
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
      'Hoá đơn LC-608 tại Nhà Thuốc Long Châu chi nhánh Bến Bạc (nhathuoc-longchau42.vn): Lúc 17:15 ngày 28/10, Thảo My tự thanh toán Apple Pay mua thuốc nhuộm tóc màu đen tự nhiên và thuốc an thần lưu trữ trên hệ thống nhà thuốc chi nhánh Bến Bạc.',
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
      'Nhật ký điện đàm hàng hải: Mã giải mã hộp đen liên lạc vệ tinh của ca-nô cao tốc được thiết lập theo quy chuẩn ghép số hiệu phao cứu sinh đón người với thời điểm ca-nô rời bến.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'minh-khang',
    name: 'Minh Khang',
    role: 'Vị hôn phu · Trưởng ban tổ chức',
    avatar: '🤵',
    note: 'Đảm nhận điều phối sự kiện sinh nhật trên du thuyền Horizon. Khai rằng đang tiếp khách ở khoang VIP khi sự việc xảy ra.',
  },
  {
    id: 'thao-my',
    name: 'Tiểu thư Thảo My',
    role: 'Ái nữ tập đoàn Đông Dương',
    avatar: '💃',
    note: 'Chủ nhân bữa tiệc sinh nhật. Rời khoang VIP lúc 21:40 ra mạn thuyền hóng gió rồi biến mất bí ẩn.',
  },
  {
    id: 'nam',
    name: 'Nam Bồi Bàn',
    role: 'Nhân viên phục vụ quầy bar',
    avatar: '🤵',
    note: 'Sinh viên làm thêm bán thời gian trên du thuyền. Bị phát hiện mang một chiếc điện thoại sim rác trong túi tạp dề.',
  },
  {
    id: 'hai',
    name: 'Thuyền Trưởng Hải',
    role: 'Thuyền trưởng du thuyền Horizon',
    avatar: '⚓',
    note: 'Chịu trách nhiệm buồng lái và lộ trình du thuyền trên sông Sài Gòn theo đúng hải trình được cấp phép.',
  },
  {
    id: 'phuong',
    name: 'Bà Phương',
    role: 'Mẹ kế của Thảo My',
    avatar: '👵',
    note: 'Cùng tham dự bữa tiệc sinh nhật tại khoang khách sạn tầng 2, có mâu thuẫn tài chính lâu năm với con riêng của chồng.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group_horizon',
    name: 'Ban Điều Hành Du Thuyền Horizon',
    avatar: '🚢',
    isGroup: true,
    sub: '16 thành viên',
    preview: 'Thuyền Trưởng Hải: Báo động! Tiểu thư Thảo My mất tích trên boong VIP!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Thuyền Trưởng Hải',
        senderAvatar: '⚓',
        time: '22:05',
        text: 'Báo động toàn tàu! Tiểu thư Thảo My vừa rời khoang VIP lúc 21h40 ra mạn thuyền hóng gió thì mất tích bí ẩn! Tại hiện trường chỉ còn lại chiếc vòng tay kim cương vướng vào mấu neo mạn thuyền!',
        clue: 'mat-tich-con-tin',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Minh Khang',
        senderAvatar: '🤵',
        time: '22:08',
        text: 'Trời ơi My ơi em ở đâu?! Vừa có tin nhắn từ số lạ gửi vào máy tôi đòi 3 tỷ tiền chuộc, đe dọa nếu báo công an sẽ ném con tin xuống sông! Chắc chắn là thằng bồi bàn Nam! Ban nãy nó lén lút quanh khoang VIP suốt!',
        clue: 'cuoc-goi-tong-tien',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Bà Phương',
        senderAvatar: '👵',
        time: '22:10',
        text: 'Đúng đấy! Thằng bồi bàn Nam kia nợ học phí sắp bị đuổi học! Tư bảo vệ lục soát người nó ngay, trong túi tạp dề nó đang giấu chiếc điện thoại sim rác tống tiền kìa! Nói chuyện riêng với [Nam Bồi Bàn](zola://chat/nam_boi_ban) xem nó chối cãi thế nào!',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Nam Bồi Bàn',
        senderAvatar: '🤵',
        time: '22:11',
        text: 'Oan cho em quá! Chiếc điện thoại này là do ai đó lén nhét vào túi tạp dề của em lúc em bưng khay rượu! Thuyền trưởng Hải lúc 21h45 tự nhiên giảm tốc độ tàu ở phao số 04 để ca-nô lạ tiếp cận sao không ai hỏi?!',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Thuyền Trưởng Hải',
        senderAvatar: '⚓',
        time: '22:15',
        text: 'Tôi giảm tốc vì luồng hàng hải yêu cầu! Camera cảng sông [Camera Phường](https://camera-phuong.gov.vn) CAM-601 ghi nhận lúc 21h50 có một người vóc dáng giống Thảo My tự bước xuống ca-nô cao tốc cập mạn phao số 04 rồi chạy vút đi!',
        clue: 'camera-ben-thuyen',
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
        text: 'Chiếc vòng tay kim cương rơi ở mạn thuyền nhưng không hề có vết trượt chân hay dấu hiệu giằng co vật lộn. Mọi người đang đổ dồn nghi ngờ vào bồi bàn Nam, nhưng các dấu vết hiện trường cho thấy không hề có xô xát. Đội kỹ thuật hãy kiểm tra ngay dữ liệu máy tính tại [Thùng rác du thuyền](coccoc://trash) để đối soát các hồ sơ hàng hải và vé điện tử.',
        clue: 'vong-tay-man-thuyen',
      },
      {
        id: 't2',
        from: 'them',
        time: '22:22',
        text: 'Kiểm tra camera an ninh cảng sông [Camera Phường](https://camera-phuong.gov.vn) CAM-601: xem người rời tàu bước xuống ca-nô có mang tư thế của một nạn nhân bị khống chế vũ lực hay không.',
        requires: ['camera-ben-thuyen'],
      },
      {
        id: 't3',
        from: 'them',
        time: '22:30',
        text: 'Hãy kiểm tra hệ thống điều phối giao vận [GiaoNhanh](https://giaonhanh.vn) quanh khu vực bến tàu trước khi sự việc diễn ra xem có kiện hành lý nặng nào được gửi ra trước.',
        requires: ['vali-minh-khang'],
      },
      {
        id: 't4',
        from: 'them',
        time: '22:36',
        text: 'Tài liệu vô tuyến hàng hải trong [Thùng rác du thuyền](coccoc://trash) ghi lại toạ độ phao cứu sinh và mốc thời gian ca-nô rời bến. Mã an ninh giải mã chính là ghép số hiệu phao đón người và số phút ca-nô rời bến (0450)!',
        requires: ['vali-minh-khang'],
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
        text: 'Tôi yêu My thật lòng, thằng Nam bồi bàn nó tống tiền gia đình, xin các anh đừng làm manh động kẻ bắt cóc!',
      },
      {
        id: 'mk2',
        from: 'me',
        time: '22:26',
        text: 'Dữ liệu giao vận [GiaoNhanh](https://giaonhanh.vn) lúc 19h30 ghi rõ anh đã gửi 2 chiếc vali cá nhân nặng 45kg ra bến tàu trước khi tàu nhổ neo, và camera CAM-601 ghi rõ Thảo My tự nguyện đi giày thể thao bước xuống ca-nô!',
        requires: ['vali-minh-khang'],
      },
      {
        id: 'mk3',
        from: 'them',
        time: '22:27',
        text: 'Đó... đó là hành lý lưu diễn phục vụ chuyến công tác tuần tới của chúng tôi thôi mà! Các anh đừng có nghi ngờ người nhà nạn nhân!',
        requires: ['vali-minh-khang'],
      },
      {
        id: 'mk4',
        from: 'me',
        time: '22:28',
        text: 'Khoản tiền chuộc 3 tỷ vừa được chuyển thẳng vào tài khoản công ty đầu tư của anh trên [VietinBank](https://vietinbank.vn) lúc 22h45, và trong thùng rác máy tính vừa phục hồi tệp vé máy bay PDF chuyến 06:00 sáng mai đi Bangkok mang tên anh và Thảo My!',
        requires: ['ve-may-bay-bangkok'],
      },
      {
        id: 'mk5',
        from: 'them',
        time: '22:29',
        text: 'Tôi... tôi không biết cái vé máy bay nào hết! Các anh chỉ dựa vào một tệp PDF trôi nổi trong thùng rác máy tính mà đã vội quy chụp tôi à?! Tôi là vị hôn phu của My, tôi muốn tìm cô ấy hơn ai hết!',
        requires: ['ve-may-bay-bangkok'],
      },
    ],
  },
  {
    id: 'nam_boi_ban',
    name: 'Nam Bồi Bàn',
    avatar: '🤵',
    sub: 'Đang run rẩy',
    preview: 'Em bị ai đó lén nhét điện thoại vào túi tạp dề…',
    requires: ['cuoc-goi-tong-tien'],
    messages: [
      {
        id: 'n1',
        from: 'them',
        time: '22:20',
        text: 'Anh điều tra viên ơi họ cứ đổ tội cho em! Em chỉ là sinh viên làm thêm trên tàu kiếm tiền đóng học phí! Chiếc điện thoại sim rác vừa tìm thấy trong túi tạp dề là do ai đó lén nhét vào lúc em bưng bê!',
        clue: 'sim-rac-tap-de',
      },
      {
        id: 'n2',
        from: 'them',
        time: '22:21',
        text: 'Em đang phải đăng bán chiếc xe máy cũ trên [Chợ Tốt](https://chotot.vn) để gom tiền nộp học, em không bao giờ dám làm chuyện bắt cóc tống tiền tày đình như thế đâu ạ!',
        clue: 'nam-sim-rac-oan',
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
