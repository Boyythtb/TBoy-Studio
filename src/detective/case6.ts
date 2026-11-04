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
    title: 'Tiểu thư Thảo My rời khoang VIP lúc 21:40 ra mạn thuyền hóng gió',
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
      'Đúng 22:00:15, máy ông Chủ tịch nhận tin nhắn từ sim rác yêu cầu chuyển khẩn cấp 3.000.000.000 VNĐ tiền chuộc vào tài khoản chỉ định trước 23:00, đe dọa con tin sẽ bị nguy hiểm nếu báo công an.',
  },
  'sim-rac-tap-de': {
    id: 'sim-rac-tap-de',
    tag: 'file',
    title: 'Định vị trạm phát sóng: Sim rác phát tin tống tiền từ khoang VIP tầng 3',
    detail:
      'Chiếc điện thoại cục gạch sim rác phát đi tin nhắn tống tiền lúc 22:00 được tìm thấy trong túi tạp dề bồi bàn Nam. Tuy nhiên, nhật ký trạm BTS viễn thông xác nhận mốc 22:00 chiếc điện thoại phát sóng từ khoang VIP tầng 3 (nơi Minh Khang đang đứng). Lúc 22:05 Khang xuống quầy bar tầng 1 chen lấn và cố tình va mạnh vào Nam để lén nhét điện thoại vào túi nhằm vu oan!',
  },
  'camera-ben-thuyen': {
    id: 'camera-ben-thuyen',
    tag: 'web',
    title: 'Hình ảnh Camera CAM-601: Người mặc áo mưa tím bước xuống ca-nô lúc 21:50',
    detail:
      'Camera an ninh hàng hải CAM-601 (camera-phuong.gov.vn): Lúc 21:50, camera ghi nhận một người vóc dáng thon gọn mặc áo mưa trùm kín đầu, chân đi giày thể thao trắng bước từ mạn du thuyền xuống ca-nô cao tốc neo tại phao số 4. Động tác bước xuống hoàn toàn tự nhiên, không hề có sự kháng cự hay khống chế vũ lực.',
  },
  'vietinbank-chuyen-tien-chuoc': {
    id: 'vietinbank-chuyen-tien-chuoc',
    tag: 'web',
    title: 'Giao dịch VietinBank: Lệnh giải ngân 3 tỷ vào tài khoản Cty Horizon',
    detail:
      'Sao kê VietinBank (vietinbank.vn) mã TX-77102 lúc 22:45: Gia đình chuyển khẩn cấp 3.000.000.000 VNĐ vào tài khoản pháp nhân Cty Cổ phần Sự kiện Horizon theo số tài khoản kẻ nặc danh chỉ định. Trích xuất Cổng thông tin đăng ký doanh nghiệp quốc gia xác nhận: Lê Minh Khang là Chủ tịch kiêm đại diện pháp luật sở hữu 100% vốn công ty này!',
  },
  'mua-thuoc-nhuom-toc': {
    id: 'mua-thuoc-nhuom-toc',
    tag: 'web',
    title: 'Hoá đơn Long Châu LC-608: Thẻ VIP Diamond #9988 mua thuốc nhuộm tóc',
    detail:
      'Hoá đơn LC-608 tại Nhà Thuốc Long Châu chi nhánh Bến Bạc (nhathuoc-longchau42.vn) lúc 17:15 ngày 28/10: Khách hàng mua 02 hộp thuốc nhuộm tóc màu đen tự nhiên và kính râm to bản. Thẻ tích điểm sử dụng là thẻ VIP Diamond #9988 mang tên NGUYEN T. M. — trùng khớp hoàn toàn với chiếc thẻ hội viên Thảo My vừa khoe trên Facebúc!',
  },
  'vali-minh-khang': {
    id: 'vali-minh-khang',
    tag: 'web',
    title: 'Vận đơn GiaoNhanh GN-99801: Giao 2 kiện hành lý ra ca-nô tại phao số 4 lúc 21:30',
    detail:
      'Hệ thống GiaoNhanh (giaonhanh.vn) mã GN-99801: Lúc 21:30 (trước khi My rời bàn 10 phút), 02 vali du lịch cỡ đại Rimowa được giao từ khách sạn ra bến ca-nô phao số 4. Người ký nhận ký bằng mật danh "KM-88" kèm số điện thoại 0938.xxx.888 — số hotline in trên danh thiếp của Minh Khang.',
  },
  'nam-sim-rac-oan': {
    id: 'nam-sim-rac-oan',
    tag: 'web',
    title: 'Xác minh bồi bàn Nam: Đang phục vụ tại bếp tầng 1 suốt từ 21:45 đến 22:04',
    detail:
      'Camera bếp tầng 1 và quản lý ca xác nhận Nam liên tục bưng bê đồ ăn tại bếp từ 21:45 đến 22:04 không hề lên khoang VIP. Tin đăng Chợ Tốt mã CT-688 cho thấy Nam chỉ là sinh viên khó khăn đang bán chiếc Wave cũ đóng học phí, hoàn toàn bị gài bẫy.',
  },
  've-may-bay-bangkok': {
    id: 've-may-bay-bangkok',
    tag: 'file',
    title: 'Tệp điện tử PNR-7881: Lịch trình chuyến bay quốc tế TG561 đi Bangkok lúc 05:45',
    detail:
      'Tệp PDF phục hồi từ thùng rác máy tính du thuyền: Xác nhận đặt vé Thai Airways chuyến TG-561 cất cánh 05:45 sáng 29/10 đi Bangkok cho 02 hành khách ẩn danh: "PAX 1: L. M. K. (Khách VIP)" và "PAX 2: N. T. M. (Khách VIP)". Phương thức thanh toán: Thẻ tín dụng Priority Diamond #9988, tài khoản xuất vé thuộc đối tác Horizon Event.',
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
    id: 'quoc_huy',
    name: 'DJ Quốc Huy',
    role: 'DJ âm thanh ánh sáng · Bạn trai cũ',
    avatar: '🎧',
    note: 'Phụ trách bàn mixer và đèn sân khấu khoang VIP. Đang nợ Thảo My 500 triệu và có cuộc cãi vã lớn lúc 20:00.',
  },
  {
    id: 'mai_lan',
    name: 'Mai Lan Quản Lý',
    role: 'Quản lý vận hành du thuyền',
    avatar: '👩‍💼',
    note: 'Phụ trách chìa khóa kho thiết bị cứu hộ và phao ca-nô. Từng bị gia đình Thảo My khiếu nại chất lượng dịch vụ.',
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
      {
        id: 'g6',
        from: 'them',
        senderName: 'DJ Quốc Huy',
        senderAvatar: '🎧',
        time: '22:16',
        text: 'Mọi người khoan đã! Lúc 21h35 em thấy chị Mai Lan quản lý lén lút cầm chùm chìa khoá mở kho phao cứu sinh ở boong phụ tầng 1! Còn anh Khang thì cứ giục em bật nhạc EDM max volume để át tiếng động cơ ca-nô cập mạn!',
      },
      {
        id: 'g7',
        from: 'them',
        senderName: 'Mai Lan Quản Lý',
        senderAvatar: '👩‍💼',
        time: '22:17',
        text: 'Quốc Huy cậu đừng có vu khống! Tôi kiểm tra phao cứu sinh theo lịch! Còn cậu thì sao? Ban nãy lúc 20h cậu bị My mắng té tát đòi nợ 500 triệu, rồi lúc 21h40 ai là người ngắt dàn đèn ngoài trời để khoang VIP tối đen như mực?!',
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
        text: 'Hiện trường mạn thuyền không hề có vết trượt chân hay dấu hiệu giằng co vật lộn. Chiếc vòng kim cương rơi lại ở mấu neo mạn thuyền rất đáng ngờ. Đội trọng án đang thẩm vấn toàn bộ 16 nhân viên và khách mời khoang VIP.',
        clue: 'vong-tay-man-thuyen',
      },
      {
        id: 't2',
        from: 'them',
        time: '22:22',
        text: 'Mọi người đang đổ dồn nghi ngờ vào bồi bàn Nam vì chiếc điện thoại tống tiền trong tạp dề, nhưng cần xác minh xem Nam có thực sự rời vị trí bếp tầng 1 lúc 22h hay không.',
      },
      {
        id: 't3',
        from: 'them',
        time: '22:30',
        text: 'Cơ quan điều tra đã phong tỏa luồng hàng hải hạ lưu sông Sài Gòn. Các trinh sát cần chủ động rà soát hệ thống máy tính điều hành trên tàu, lịch trình giao nhận bến bãi và các dấu vết kỹ thuật số khả nghi.',
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
        text: 'Tôi yêu My thật lòng, gia đình đã đồng ý chi 3 tỷ tiền chuộc rồi, xin các anh đừng manh động làm nguy hiểm đến tính mạng My!',
      },
      {
        id: 'mk2',
        from: 'me',
        time: '22:26',
        text: 'Lúc 21h40 khi Thảo My rời khoang VIP ra mạn thuyền hóng gió, anh đang ở đâu và làm gì?',
      },
      {
        id: 'mk3',
        from: 'them',
        time: '22:27',
        text: 'Tôi đang đứng ở quầy bar tiếp hai đối tác công ty sự kiện, sau đó tôi xuống tầng 1 gọi thêm rượu vang. Ai cũng nhìn thấy tôi cả! Chắc chắn thằng bồi bàn Nam câu kết người ngoài bắt cóc My rồi!',
      },
      {
        id: 'mk4',
        from: 'me',
        time: '22:28',
        text: 'Có thông tin đơn giao vận chuyển 2 kiện hành lý cỡ đại ra bến phao số 4 trước giờ tiệc, anh có nắm được ai ký nhận không?',
      },
      {
        id: 'mk5',
        from: 'them',
        time: '22:29',
        text: 'Đó chỉ là 2 thùng thiết bị âm thanh ánh sáng do đơn vị đối tác chuyển ra thôi! Các anh đừng có bới lông tìm vết người nhà nạn nhân, hãy mau đi lùng chiếc ca-nô đi!',
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
  {
    id: 'quoc_huy',
    name: 'DJ Quốc Huy',
    avatar: '🎧',
    sub: 'Đang online',
    preview: 'Em tắt bớt đèn ngoài trời là theo kịch bản…',
    requires: ['mat-tich-con-tin'],
    messages: [
      {
        id: 'qh1',
        from: 'them',
        time: '22:32',
        text: 'Anh ơi, em chỉ làm theo kịch bản sinh nhật anh Khang đưa thôi! Anh Khang bảo đúng 21h40 thì hạ đèn ngoài trời và tăng âm lượng bài Happy Birthday lên tối đa để chuẩn bị thổi nến bất ngờ cho My!',
      },
      {
        id: 'qh2',
        from: 'them',
        time: '22:33',
        text: 'Chuyện nợ 500 triệu là tiền em vay làm album âm nhạc, My bảo khi nào cưới anh Khang xong thì My cho luôn coi như quà mừng! Em không bao giờ làm hại My!',
      },
    ],
  },
  {
    id: 'mai_lan',
    name: 'Mai Lan Quản Lý',
    avatar: '👩‍💼',
    sub: 'Quản lý du thuyền',
    preview: 'Chìa khoá phao cứu sinh số 4 là do thuyền phó giữ…',
    requires: ['vong-tay-man-thuyen'],
    messages: [
      {
        id: 'ml1',
        from: 'them',
        time: '22:34',
        text: 'Thưa cơ quan điều tra, phao số 4 là vị trí neo đậu an toàn của ca-nô cứu sinh. Chiều nay tôi thấy một chiếc ca-nô cao tốc màu đen biển số tư nhân đã cập sẵn gần phao số 4 từ 18h rồi!',
      },
      {
        id: 'ml2',
        from: 'them',
        time: '22:35',
        text: 'Lúc 21h30, chính mắt tôi thấy nhân viên giao hàng GiaoNhanh chuyển 2 chiếc vali lớn màu bạc ra bến tàu giao tận tay anh Khang! Lúc đó anh Khang nói là phụ kiện trang trí sân khấu sinh nhật!',
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
    name: 'playlist_dj_quochuy_edm_set.mp3',
    kind: 'Tệp âm thanh sân khấu',
    preview: 'Danh sách bài hát tiệc sinh nhật Horizon…',
    detail: 'Ghi chú kỹ thuật âm thanh: Đúng 21h40 bật bài Happy Birthday và hạ dàn đèn ngoài trời theo yêu cầu ban tổ chức.',
  },
  {
    id: 't2',
    name: 'nhat_ky_nhien_lieu_cano_so_4.xlsx',
    kind: 'Bảng kê vận hành cảng vụ',
    preview: 'Nhật ký cấp phát nhiên liệu ca-nô phụ số 4 lúc 18h…',
    detail: 'Ca-nô cao tốc cứu hộ số 4 nạp đủ 40 lít xăng lúc 18:00, chữ ký bàn giao: Mai Lan.',
  },
  {
    id: 't3',
    name: 'hoa_don_ruou_vang_tang_1.pdf',
    kind: 'Hoá đơn quầy bar tầng 1',
    preview: 'Hoá đơn quầy bar lúc 22:05 bàn giao rượu…',
    detail: 'Hoá đơn bàn giao 02 chai vang Pháp lúc 22:05, chữ ký người nhận: Lê Minh Khang.',
  },
  {
    id: 't4',
    name: 'e_ticket_TG561_pnr_7881.pdf',
    kind: 'Tệp vé điện tử hàng không quốc tế',
    preview: 'Electronic Ticket Receipt · Thai Airways TG-561 Bangkok…',
    detail: 'Hồ sơ đặt chỗ điện tử PNR-7881 hãng Thai Airways: Chuyến bay TG-561 đi Bangkok lúc 05:45 sáng 29/10. Danh sách hành khách ẩn danh: "PAX 1: L. M. K." và "PAX 2: N. T. M.". Vé hạng thương gia, thanh toán qua thẻ Priority Diamond #9988, email nhận vé: contact@horizon-event.asia.',
    clue: 've-may-bay-bangkok',
  },
  {
    id: 't5',
    name: 'hai_do_cang_vu_phao_04.pdf',
    kind: 'Nhật ký vô tuyến cảng vụ đường thuỷ',
    preview: 'Hải đồ cảng vụ ghi nhận toạ độ ca-nô rời bến lúc 21:50…',
    detail: 'Hải đồ cảng vụ đường thuỷ: Ca-nô cao tốc cập mạn phao số 04 và nổ máy rời bến lúc 21:50.',
    clue: 'ma-phao-hai-dang',
  },
]
