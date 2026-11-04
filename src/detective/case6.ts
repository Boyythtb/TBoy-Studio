import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 06',
  title: 'Vụ Bắt Cóc Con Tin Du Thuyền Sông Hồng',
  place: 'Bến Du Thuyền Hạng Sang Sông Hồng · Khoang VIP Tầng 3',
  time: '22:15 · thứ Bảy 14/11',
  brief:
    'Ái nữ duy nhất của tập đoàn tài chính Đông Dương biến mất bí ẩn ngay giữa bữa tiệc sinh nhật trên du thuyền Horizon. Tin nhắn đòi 3 tỷ đồng tiền chuộc trong 60 phút, chiếc vòng kim cương vướng lại ở mạn thuyền. Một kế hoạch tinh vi dần lộ diện qua các dấu vết hàng hải và đơn vận chuyển trước giờ G.',
  culprit: 'minh-khang',
  accomplice: 'thao-my',
  difficulty: 'Siêu hóc búa',
  question: 'Ai là kẻ chủ mưu dàn dựng vụ bắt cóc tống tiền, và ai là đồng phạm phối hợp?',
  solution:
    'Minh Khang (vị hôn phu) là kẻ chủ mưu phối hợp cùng đồng phạm chính là nạn nhân Thảo My. Do Khang vỡ nợ chứng khoán phái sinh 12 tỷ và My bị bố cắt thẻ tín dụng cấm cản kết hôn, cả hai đã tự dàn dựng kịch bản bắt cóc tống tiền 3 tỷ đồng từ ông chủ tịch. Chiều 28/10, My tự mua thuốc nhuộm tóc và thuốc an thần tại Long Châu để ngụy trang. Khang gửi 2 vali cá nhân ra ca-nô tại phao số 4 lúc 21:30 qua GiaoNhanh. Lúc 21:40, My vứt vòng kim cương ở mạn thuyền tạo hiện trường giả bị ngã xuống sông rồi tự nguyện bước xuống ca-nô cao tốc lúc 21:50 (camera bến sông CAM-601 ghi nhận không hề có kháng cự). Khang dùng sim rác gọi tống tiền rồi lén nhét vào túi tạp dề của Nam bồi bàn lúc 22:05 để vu oan, sau đó đứng ra nhận 3 tỷ tiền chuộc vào tài khoản công ty sự kiện của mình lúc 22:45.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-tich-con-tin': {
    id: 'mat-tich-con-tin',
    tag: 'chat',
    title: 'Tiểu thư Thảo My rời khoang VIP lúc 21:40',
    detail:
      'Lúc 21:40, giữa tiệc sinh nhật cao trào, Thảo My rời bàn nói ra mạn thuyền hóng gió rồi không quay trở lại. Cửa khoang VIP mở toang, ly cocktail còn uống dở.',
  },
  'vong-tay-man-thuyen': {
    id: 'vong-tay-man-thuyen',
    tag: 'photo',
    title: 'Vòng tay kim cương vướng ở lan can mạn thuyền',
    detail:
      'Chiếc vòng tay kim cương đắt tiền vướng vào mấu neo mạn thuyền. Sàn boong tàu khô ráo, không có vết cào xước, không có vết trượt ngã hay bất kỳ dấu hiệu giằng co kháng cự nào.',
  },
  'cuoc-goi-tong-tien': {
    id: 'cuoc-goi-tong-tien',
    tag: 'chat',
    title: 'Tin nhắn nặc danh đòi 3 tỷ tiền chuộc lúc 22:00',
    detail:
      'Đúng 22:00, gia đình nhận tin nhắn biến âm yêu cầu chuyển gấp 3 tỷ đồng vào tài khoản chỉ định trước 23:00, đe dọa nếu báo công an con tin sẽ gặp nguy hiểm.',
  },
  'sim-rac-tap-de': {
    id: 'sim-rac-tap-de',
    tag: 'file',
    title: 'Chiếc điện thoại sim rác trong túi tạp dề nhân viên phục vụ',
    detail:
      'Trong túi tạp dề của nhân viên Nam có chiếc điện thoại sim rác vừa phát đi tin nhắn tống tiền lúc 22:00. Nam khẳng định bị ai đó lén nhét vào lúc đi ngang qua quầy bar đông người.',
  },
  'camera-ben-thuyen': {
    id: 'camera-ben-thuyen',
    tag: 'web',
    title: 'Camera bến sông CAM-601: Người bước xuống ca-nô lúc 21:50',
    detail:
      'Camera bến sông CAM-601 ghi hình: Lúc 21:50, một phụ nữ vóc dáng thon gọn mặc áo mưa trùm đầu bước từ bậc thang mạn tàu xuống ca-nô cao tốc hoàn toàn tự nguyện và nhanh nhẹn.',
  },
  'vietinbank-chuyen-tien-chuoc': {
    id: 'vietinbank-chuyen-tien-chuoc',
    tag: 'web',
    title: 'Lệnh chuyển 3 tỷ đồng vào tài khoản của Minh Khang lúc 22:45',
    detail:
      'Sao kê VietinBank: 22:45 tài khoản công ty gia đình chuyển 3.000.000.000 VNĐ tiền giải cứu vào tài khoản trung gian đứng tên công ty sự kiện do Lê Minh Khang làm đại diện pháp luật.',
  },
  'mua-thuoc-nhuom-toc': {
    id: 'mua-thuoc-nhuom-toc',
    tag: 'web',
    title: 'Thảo My mua thuốc nhuộm tóc đen & an thần lúc 17:15',
    detail:
      'Hoá đơn LC-608 tại Nhà Thuốc Long Châu: 17:15 ngày 28/10, Thảo My tự thanh toán Apple Pay mua thuốc nhuộm tóc màu đen tự nhiên và thuốc an thần Rotunda để chuẩn bị thay đổi nhân dạng.',
  },
  'vali-minh-khang': {
    id: 'vali-minh-khang',
    tag: 'web',
    title: 'GiaoNhanh chuyển 2 vali cá nhân ra ca-nô lúc 21:30',
    detail:
      'Máy chủ GiaoNhanh: Đơn hàng hoả tốc GN-99801 chuyển 02 vali du lịch cỡ đại từ khách sạn ra bến ca-nô phao số 4 lúc 21:30 (trước thời điểm nạn nhân "biến mất" 10 phút), người nhận là Minh Khang.',
  },
  'nam-sim-rac-oan': {
    id: 'nam-sim-rac-oan',
    tag: 'web',
    title: 'Xác minh nhân thân bồi bàn Nam trên Chợ Tốt',
    detail:
      'Xác minh tin đăng CT-688: Nam chỉ là sinh viên bồi bàn làm thêm, đang rao bán xe máy cũ đóng học phí, không hề có liên lạc hay mâu thuẫn với gia đình nạn nhân.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'minh-khang',
    name: 'Minh Khang',
    role: 'Vị hôn phu · Trưởng ban tổ chức tiệc',
    avatar: '🤵',
    note: 'Đảm nhận điều phối sự kiện và đón tiếp khách VIP trên du thuyền Horizon. Đứng ra thay mặt gia đình liên lạc đàm phán tiền chuộc.',
  },
  {
    id: 'thao-my',
    name: 'Tiểu thư Thảo My',
    role: 'Nạn nhân bị mất tích',
    avatar: '💃',
    note: 'Nhân vật chính của bữa tiệc sinh nhật. Rời khoang VIP lúc 21h40 ra mạn thuyền ngắm cảnh rồi mất tích bí ẩn.',
  },
  {
    id: 'nam',
    name: 'Nam Bồi Bàn',
    role: 'Nhân viên phục vụ quầy bar',
    avatar: '🍸',
    note: 'Sinh viên làm thêm bán thời gian phụ trách khoang VIP. Bị phát hiện có chiếc điện thoại sim rác trong túi tạp dề lúc 22:05.',
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
    sub: '12 thành viên',
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
        text: 'Lập tức bật đèn pha cứu hộ quét mặt nước xung quanh mạn thuyền! Tất cả nhân viên tập trung kiểm tra các khoang tầng!',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Minh Khang',
        senderAvatar: '🤵',
        time: '22:02',
        text: 'Trời ơi... Bác Chủ tịch vừa nhận được tin nhắn tống tiền từ sim rác đòi 3 tỷ tiền chuộc trong vòng 60 phút!',
        clue: 'cuoc-goi-tong-tien',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Nam Bồi Bàn',
        senderAvatar: '🍸',
        time: '22:08',
        text: 'Oan cho em quá các anh chị ơi! Ai đó vừa lén nhét cái điện thoại cục gạch này vào túi tạp dề của em lúc em bưng khay rượu qua quầy bar!',
        clue: 'sim-rac-tap-de',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra khu vực',
    preview: 'Xem xét động thái của con tin và thời điểm chuẩn bị hậu cần.',
    requires: ['mat-tich-con-tin'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '22:15',
        text: 'Hiện trường lan can có vòng tay rơi nhưng sàn boong không hề có vết trượt chân hay dấu hiệu giằng co vật lộn. Hãy cẩn trọng trước khả năng dàn dựng.',
      },
      {
        id: 't2',
        from: 'them',
        time: '22:20',
        text: 'Kiểm tra camera các mạn tàu và cảng phụ: xem người rời tàu có mang tư thế của một nạn nhân bị khống chế vũ lực hay không.',
        requires: ['vong-tay-man-thuyen'],
      },
      {
        id: 't3',
        from: 'them',
        time: '22:30',
        text: 'Hãy kiểm tra các đơn hàng vận chuyển hành lý cá nhân quanh khu vực bến tàu trước khi sự việc diễn ra.',
        requires: ['camera-ben-thuyen'],
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
      { id: 'mk1', from: 'them', time: '22:25', text: 'Tôi yêu My thật lòng, gia đình bác Chủ tịch đã đồng ý chuyển 3 tỷ để chuộc My an toàn trước đã!' },
      {
        id: 'mk2',
        from: 'me',
        time: '22:26',
        text: 'Đơn hàng GN-99801 chuyển 2 vali cá nhân ra ca-nô phao số 4 lúc 21h30 do chính anh đặt trước khi My mất tích 10 phút!',
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
        text: 'Camera CAM-601 ghi nhận Thảo My tự trùm áo mưa bước xuống ca-nô lúc 21h50, và hoá đơn chiều nay cô ấy đã mua thuốc nhuộm tóc đen ngụy trang!',
        requires: ['mua-thuoc-nhuom-toc'],
      },
      {
        id: 'mk5',
        from: 'them',
        time: '22:29',
        text: '...Các người... làm sao các người biết được?!',
        requires: ['mua-thuoc-nhuom-toc'],
      },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'LC-608', time: '17:15', pickup: 'Nhà thuốc Long Châu Bến Bạc', drop: 'Thuốc nhuộm tóc & an thần', fee: '280.000đ', status: 'Hoàn tất (Thảo My)', clue: 'mua-thuoc-nhuom-toc' },
  { id: 'GN-99801', time: '21:30', pickup: 'KS Sông Hồng View', drop: 'Bến ca-nô phao số 4', fee: '150.000đ', status: 'Hoàn tất (Minh Khang)', clue: 'vali-minh-khang' },
  { id: 'TX-77102', time: '22:45', pickup: 'VietinBank VIP', drop: 'Tài khoản Khang Event', fee: '3.000.000.000đ', status: 'Phong toả khẩn cấp', clue: 'vietinbank-chuyen-tien-chuoc' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Hiện trường mạn du thuyền Horizon',
    time: '22:00',
    scene: 'street',
    caption: 'Mạn tàu khoang VIP nơi phát hiện vòng kim cương vướng vào lan can.',
    clue: 'vong-tay-man-thuyen',
    hotspots: [
      { x: 40, y: 65, label: 'Chiếc vòng tay kim cương', hint: 'Vướng vào mấu neo', clue: 'vong-tay-man-thuyen', detail: 'Chiếc vòng tay kim cương đặt ngay ngắn trên mấu neo mạn thuyền, không có dấu vết giằng co hay va đập mạnh.' },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 't1',
    name: 've_may_bay_bangkok_0110.pdf',
    kind: 'Vé máy bay quốc tế',
    preview: '02 vé máy bay một chiều đi Bangkok lúc 06:00 sáng mai…',
    detail: 'Hồ sơ đặt chỗ chuyến bay VN-611 khởi hành lúc 06:00 sáng mai đi Bangkok cho 02 hành khách: Lê Minh Khang và Nguyễn Thảo My.',
    clue: 'vali-minh-khang',
  },
]
