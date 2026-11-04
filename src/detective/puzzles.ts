export interface CasePuzzle {
  id: string
  caseId: string
  title: string
  icon: string
  brief: string
  question: string
  hint: string
  acceptedAnswers: string[]
  clueId: string
  clueTitle: string
  rewardDesc: string
}

export const CASE_PUZZLES: Record<string, CasePuzzle[]> = {
  // =========================================================================
  // VỤ 01: CHIẾC XE ĐẠP ĐIỆN (HẺM 42)
  // =========================================================================
  hem42: [
    {
      id: 'puz-1-1',
      caseId: 'hem42',
      title: 'Mã định danh tài xế GiaoNhanh',
      icon: '📡',
      brief:
        'Dữ liệu máy chủ GiaoNhanh ghi nhận đơn hoả tốc GN-88214 giao qua ngã tư lúc 21:47 mâu thuẫn hoàn toàn với lời khai ngủ từ 21:15 của Dũng.',
      question:
        'Tra cứu hệ thống máy chủ GiaoNhanh trên trình duyệt Cộc Cộc: Hãy tìm Mã số định danh tài xế (Driver ID - 4 chữ số) phụ trách đơn hàng GN-88214 đêm 15/10?',
      hint: 'Mở Cộc Cộc -> GiaoNhanh -> Xem chi tiết đơn hàng hoả tốc GN-88214 lúc 21:47...',
      acceptedAnswers: ['4209', 'SH-4209', 'sh-4209', 'SH4209', 'sh4209'],
      clueId: 'don-hang-2147',
      clueTitle: 'Đơn hàng GiaoNhanh SH-4209 lúc 21:47 bóc trần ngoại phạm của Dũng',
      rewardDesc: 'Bóc trần alibi ngoại phạm của Dũng khi hệ thống ghi nhận chính anh ta điều khiển xe qua ngã tư!',
    },
    {
      id: 'puz-1-2',
      caseId: 'hem42',
      title: 'Vật chứng nhận diện xe qua ảnh phản chiếu',
      icon: '🔍',
      brief: 'Bức ảnh hiện trường trước tiệm điện thoại lúc 21:58 chụp bóng chiếc xe đạp điện phản chiếu trên cửa kính.',
      question:
        'Tại giỏ trước của chiếc xe đạp điện bị mất cắp trong ảnh phản chiếu lúc 21:58, có treo thêm một vật dụng nhận diện đặc biệt nào?',
      hint: 'Đối chiếu lời khai ban đầu của cô Lan và xem bóng phản chiếu trên kính tiệm điện thoại...',
      acceptedAnswers: ['túi vải hoa', 'tui vai hoa', 'túi hoa', 'tui hoa', 'túi vải', 'tui vai', 'túi vải hoa văn'],
      clueId: 'anh-phan-chieu',
      clueTitle: 'Bóng phản chiếu xe đạp điện có túi vải hoa ở giỏ lúc 21:58',
      rewardDesc: 'Phát hiện chi tiết túi vải hoa văn ở giỏ khẳng định chiếc xe phóng qua ngã tư chính là xe của cô Lan!',
    },
  ],

  // =========================================================================
  // VỤ 02: CHIẾC ĐIỆN THOẠI TRONG TỦ ĐỒ (SÂN CẦU LÔNG)
  // =========================================================================
  'tu-do': [
    {
      id: 'puz-2-1',
      caseId: 'tu-do',
      title: 'Địa chỉ IP phát tán tin bán máy Chợ Tốt',
      icon: '📶',
      brief:
        'Tin đăng bán iPhone 14 Pro Max bị mất cắp xuất hiện trên Chợ Tốt lúc 20:44 từ một địa chỉ mạng trong khu vực bãi xe CLB Cầu Lông.',
      question:
        'Hãy tra cứu bài đăng bán iPhone trên Chợ Tốt ở trình duyệt Cộc Cộc: Địa chỉ IP máy trạm (Client IP) đã kết nối và đăng tải bài viết lúc 20:44 là gì?',
      hint: 'Kiểm tra chi tiết bài đăng bán iPhone trên Chợ Tốt ở Cộc Cộc (địa chỉ mạng dạng 118.70.x.x)...',
      acceptedAnswers: ['118.70.192.44', '118.70.192', '118.70.192.44:80'],
      clueId: 'tin-nhan-ban',
      clueTitle: 'Địa chỉ IP đăng tin Chợ Tốt 118.70.192.44 trùng khớp Wi-Fi bãi xe CLB',
      rewardDesc: 'Truy xuất thành công bài đăng bán máy phát ra trực tiếp từ khuôn viên bãi xe của sân cầu lông!',
    },
    {
      id: 'puz-2-2',
      caseId: 'tu-do',
      title: 'Dấu vết sinh học trên mép tôn nóc tủ đồ',
      icon: '🩸',
      brief: 'Mép tôn nóc tủ số 04 bị cạy hở để lại mẫu vật chứng sinh học do đối tượng bị cứa rách da khi thò tay vào.',
      question:
        'Kỹ thuật hình sự thu thập được loại dấu vết sinh học nào trên cạnh tôn sắc nhọn của nóc tủ số 04?',
      hint: 'Xem báo cáo khám nghiệm hiện trường tủ đồ số 04 trong hồ sơ vụ án...',
      acceptedAnswers: ['máu', 'máu khô', 'mau', 'mau kho', 'vết máu', 'vet mau'],
      clueId: 'son-vet-xuoc',
      clueTitle: 'Mẫu máu khô trên mép tôn tủ đồ số 04 trùng khớp vết xước cổ tay của Sơn',
      rewardDesc: 'Mẫu máu chứng minh vết thương trên cổ tay Sơn do chính cạnh tôn nóc tủ số 04 cứa phải!',
    },
  ],

  // =========================================================================
  // VỤ 03: CHIẾC HÒM QUỸ ĐÊM HỘI CHỢ
  // =========================================================================
  'hoi-cho': [
    {
      id: 'puz-3-1',
      caseId: 'hoi-cho',
      title: 'Mã giao dịch nộp tiền mặt VietinBank',
      icon: '💳',
      brief:
        'Đêm hội chợ mất điện lúc 21:00. Đến 21:32, tài khoản VietinBank của Trang nhận một lệnh nạp tiền mặt bất thường tại cây ATM ngã ba.',
      question:
        'Hãy tra cứu sao kê VietinBank trên Cộc Cộc: Mã giao dịch (Mã GD / Ref No) của lệnh nộp 8.000.000 VNĐ tiền mặt vào tài khoản của Trang lúc 21:32 là gì?',
      hint: 'Mở ngân hàng VietinBank trên trình duyệt Cộc Cộc, kiểm tra chi tiết giao dịch nộp tiền của Trang (dạng TX-xxxxx)...',
      acceptedAnswers: ['TX-99812', '99812', 'tx-99812', 'TX99812'],
      clueId: 'chuyen-tien-trang',
      clueTitle: 'Sao kê VietinBank: Lệnh nạp tiền mặt 8.000.000đ mã TX-99812 của Trang',
      rewardDesc: 'Xác định lệnh nộp tiền mặt 8 triệu đồng của Trang diễn ra ngay sau khi hòm quỹ bị cuỗm sạch!',
    },
    {
      id: 'puz-3-2',
      caseId: 'hoi-cho',
      title: 'Hồ sơ y tế cấp cứu tại Nhà thuốc Long Châu',
      icon: '🌱',
      brief:
        'Bác Bảy ngất xỉu do hạ đường huyết, còn người phụ trách bếp cháo đêm lại có bệnh án khám ngoài da lúc 21:15.',
      question:
        'Theo hồ sơ sổ khám tại Nhà thuốc Long Châu trên Cộc Cộc, vết thương ngoài da của bệnh nhân lúc 21:15 được ghi nhận do nguyên nhân gì gây nên?',
      hint: 'Kiểm tra trang web Nhà Thuốc Long Châu trên Cộc Cộc, tìm biên bản sơ cứu lúc 21:15...',
      acceptedAnswers: ['nước sôi', 'nuoc soi', 'bỏng nước sôi', 'bong nuoc soi', 'bỏng', 'bong'],
      clueId: 'trang-giay',
      clueTitle: 'Sổ khám Long Châu: Bỏng nước sôi xác nhận Trang rời quầy cháo vào giờ mất điện',
      rewardDesc: 'Lật tẩy việc Trang rời quầy cháo trong lúc hội chợ mất điện để ra khu bãi cỏ sau bệ hòm quỹ!',
    },
  ],

  // =========================================================================
  // VỤ 04: ĐÊM MẤT ĐIỆN Ở CHUNG CƯ 42
  // =========================================================================
  'chung-cu': [
    {
      id: 'puz-4-1',
      caseId: 'chung-cu',
      title: 'Nhật ký hệ thống BMS: Mốc ngắt Aptomat tổng',
      icon: '⏱️',
      brief: 'Hệ thống BMS toà nhà ghi nhận sự cố chập điện nhân tạo khiến tầng hầm B1 chìm vào bóng tối.',
      question:
        'Hãy tra cứu hệ thống BMS Toà nhà trên Cộc Cộc: Chính xác vào mấy giờ mấy phút thì Aptomat tổng khu vực B1 bị ngắt thủ công?',
      hint: 'Mở hệ thống Quản lý BMS toà nhà trên Cộc Cộc, xem bảng nhật ký sự cố điện hầm B1...',
      acceptedAnswers: ['21:10', '21h10', '21:10:05', '21:10:00', '2110'],
      clueId: 'tin-nhan-dat',
      clueTitle: 'Nhật ký BMS: Aptomat tổng B1 bị dập cầu dao thủ công lúc 21:10',
      rewardDesc: 'Khẳng định điện tầng hầm bị ngắt do con người can thiệp trực tiếp chứ không phải chập tự nhiên!',
    },
    {
      id: 'puz-4-2',
      caseId: 'chung-cu',
      title: 'Mật mã an ninh két sắt Ban Quản Lý',
      icon: '🔐',
      brief: 'Trong thùng rác văn phòng Ban Quản Lý có mảnh giấy ghi nhớ quy tắc đổi mật khẩu két an ninh của Quản lý Đạt.',
      question:
        'Theo quy tắc bảo mật của Đạt trong biên bản nội bộ: Ghép [Số phòng làm việc của Ban Quản Lý] và [Số tầng toà nhà nơi đặt phòng]. Mật khẩu két an ninh gồm 4 chữ số là gì?',
      hint: 'Tra cứu số phòng Ban Quản Lý và số tầng trong sơ đồ toà nhà hoặc thùng rác văn phòng trên Cộc Cộc...',
      acceptedAnswers: ['2042'],
      clueId: 'ma-khoa-ket-2042',
      clueTitle: 'Mật mã an ninh két sắt 2042 vạch trần hành vi tẩu tán tài liệu của Đạt',
      rewardDesc: 'Mở khoá hồ sơ chứng minh Đạt tự ý mở két tẩu tán tài liệu trước giờ dập điện tầng hầm!',
    },
  ],

  // =========================================================================
  // VỤ 05: ÁN MẠNG PHÒNG TRÀ HẺM 42
  // =========================================================================
  'an-mang': [
    {
      id: 'puz-5-1',
      caseId: 'an-mang',
      title: 'Thời điểm nước trà đạt 100°C trên Smart Home',
      icon: '🕰️',
      brief: 'Hệ thống Smart Home ghi nhận nhật ký của ấm trà thông minh đun nước lần đầu cho nạn nhân.',
      question:
        'Tra cứu hệ thống SmartHome IoT trên Cộc Cộc: Mốc thời gian (giờ & phút) mà ấm trà đun sôi đạt 100°C hoàn tất là mấy giờ mấy phút?',
      hint: 'Vào Cộc Cộc -> SmartHome IoT -> Xem nhật ký thiết bị ấm Smart Kettle...',
      acceptedAnswers: ['21:30', '21h30', '2130', '21:28', '2128'],
      clueId: 'dong-ho-vo',
      clueTitle: 'SmartHome IoT: Ấm trà đun sôi 100°C lúc 21:30 chứng minh đồng hồ 22:15 là hiện trường giả',
      rewardDesc: 'Vạch trần toàn bộ màn kịch tạo hiện trường giả lúc 22:15 của kẻ sát nhân!',
    },
    {
      id: 'puz-5-2',
      caseId: 'an-mang',
      title: 'Nhiệt độ ấm trà tố cáo thời điểm nạn nhân tử vong',
      icon: '🧪',
      brief:
        'Thủ phạm cố ý đập vỡ mặt kính đồng hồ đeo tay của nạn nhân dừng ở 22:15. Tuy nhiên, cảm biến nhiệt của ấm trà lúc 21:55 đã bóc trần điều này.',
      question:
        'Theo nhật ký cảm biến SmartHome IoT trên Cộc Cộc, nhiệt độ nước trà đo được lúc 21:55 đã nguội hẳn xuống còn bao nhiêu độ C?',
      hint: 'Xem dòng nhật ký IOT-505 của ấm trà thông minh trên trang SmartHome IoT...',
      acceptedAnswers: ['32', '32°C', '32 độ', '32C', '32 độ C'],
      clueId: 'ma-khoa-am-tra',
      clueTitle: 'Nhật ký IoT: Nước trà 32°C lúc 21:55 chứng minh nạn nhân đã tử vong từ trước',
      rewardDesc: 'Dữ liệu cảm biến nhiệt vạch trần thủ đoạn cài then cửa sổ phòng kín bằng chỉ cước sau khi nạn nhân tử vong!',
    },
  ],

  // =========================================================================
  // VỤ 06: BẮT CÓC CON TIN DU THUYỀN SÔNG HỒNG
  // =========================================================================
  'du-thuyen': [
    {
      id: 'puz-6-1',
      caseId: 'du-thuyen',
      title: 'Mã vận đơn chuyển phát hành lý đào tẩu',
      icon: '📦',
      brief: 'Hai chiếc vali ký gửi bí mật chứa toàn bộ ngoại tệ và hộ chiếu đã được điều xe chuyển phát hoả tốc ra cảng tàu.',
      question:
        'Tra cứu hệ thống GiaoNhanh trên trình duyệt Cộc Cộc: Mã vận đơn chuyển phát 2 vali hành lý đặc biệt ký gửi ra Cảng Sông Hồng là gì?',
      hint: 'Tìm đơn hàng gửi ra Cảng Sông Hồng trên trang GiaoNhanh (mã dạng GN-xxxxx)...',
      acceptedAnswers: ['GN-99801', '99801', 'gn-99801', 'GN99801'],
      clueId: 'camera-ben-thuyen',
      clueTitle: 'Vận đơn GiaoNhanh GN-99801: Hai vali hành lý được gửi ra Cảng Sông Hồng',
      rewardDesc: 'Lần ra đường dây tẩu tán tài sản và hành lý bí mật trước khi vụ bắt cóc được dựng lên!',
    },
    {
      id: 'puz-6-2',
      caseId: 'du-thuyen',
      title: 'Chuyến bay tẩu thoát xuất cảnh tại Nội Bài',
      icon: '✈️',
      brief: 'Vé máy bay điện tử một chiều đi Bangkok (Thái Lan) đã được thanh toán trực tuyến bằng thẻ tín dụng ảo vào rạng sáng.',
      question:
        'Kiểm tra vé máy bay điện tử trong tệp tài liệu điều tra: Chuyến bay quốc tế đi Bangkok của đối tượng dự kiến cất cánh lúc mấy giờ sáng?',
      hint: 'Xem giờ khởi hành chuyến bay Nội Bài - Bangkok trong tài liệu hồ sơ (định dạng HH:MM)...',
      acceptedAnswers: ['06:00', '6:00', '06h00', '6h', '6h00', '06:00:00'],
      clueId: 'ma-phao-hai-dang',
      clueTitle: 'Vé máy bay VietJet đi Bangkok cất cánh lúc 06:00 sáng ngày 27/10',
      rewardDesc: 'Chặn đứng kịp thời kế hoạch trốn chạy ra nước ngoài của kẻ chủ mưu!',
    },
  ],
}
