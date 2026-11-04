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
      title: 'Mật mã bộ định vị đơn hàng GiaoNhanh',
      icon: '📡',
      brief: 'Dữ liệu máy chủ GiaoNhanh ghi nhận một cuốc xe hoả tốc lúc 21:47 mâu thuẫn với lời khai ngủ từ 21:15 của Dũng.',
      question:
        'Để giải mã số hiệu toạ độ GPS đơn hàng GN-88214: Hãy lấy [Giờ nhận đơn: 21] nhân với [Phút nhận đơn: 47] rồi cộng với [Số phòng trọ của Dũng: 203].\nNhập kết quả phép tính (21 * 47 + 203):',
      hint: '21 * 47 = 987. Sau đó cộng thêm 203...',
      acceptedAnswers: ['1190'],
      clueId: 'don-hang-2147',
      clueTitle: 'Lộ trình GPS đơn hàng GN-88214 lúc 21:47',
      rewardDesc: 'Giải mã thành công lộ trình đơn hàng GiaoNhanh bóc trần alibi ngoại phạm của Dũng!',
    },
    {
      id: 'puz-1-2',
      caseId: 'hem42',
      title: 'Khôi phục hình ảnh phản chiếu trên kính tiệm',
      icon: '🔍',
      brief: 'Bức ảnh chụp trước cửa tiệm điện thoại lúc 21:58 có góc phản chiếu đặc biệt.',
      question:
        'Chiếc xe đạp điện bị mất cắp dựng trước sân nhà cô Lan có màu sắc nguyên bản là màu gì? (Gợi ý: màu xanh kết hợp một loại thảo mộc the mát)',
      hint: 'Màu xanh của lá bạc hà (xanh mint)...',
      acceptedAnswers: ['xanh mint', 'mint', 'xanh bạc hà', 'xanh ngọc', 'xanh'],
      clueId: 'anh-phan-chieu',
      clueTitle: 'Bóng phản chiếu xe xanh trong ảnh 21:58',
      rewardDesc: 'Tìm thấy góc phản chiếu sắc nét chiếc xe xanh mint gắn túi vải hoa văn ở giỏ!',
    },
  ],

  // =========================================================================
  // VỤ 02: CHIẾC ĐIỆN THOẠI TRONG TỦ ĐỒ (SÂN CẦU LÔNG)
  // =========================================================================
  'tu-do': [
    {
      id: 'puz-2-1',
      caseId: 'tu-do',
      title: 'Giải mã mật khẩu Wi-Fi bãi xe sân cầu lông',
      icon: '📶',
      brief: 'Tin rao bán iPhone 14 Pro Max trên Chợ Tốt phát đi từ cổng Wi-Fi miễn phí khu vực bãi xe sân cầu lông lúc 20:44.',
      question:
        'Mật khẩu Wi-Fi của bãi xe được dán ở quầy nước theo câu đố: "Tên môn thể thao dùng vợt đánh quả cầu lông này bằng tiếng Anh (gồm 9 chữ cái, bắt đầu bằng chữ B)" là gì?',
      hint: 'Từ tiếng Anh chỉ môn cầu lông: B - A - D - M - I - N - T - O - N',
      acceptedAnswers: ['badminton', 'Badminton', 'BADMINTON'],
      clueId: 'tin-nhan-ban',
      clueTitle: 'Tin đăng bán iPhone trùng Serial trên Chợ Tốt từ Wi-Fi bãi xe',
      rewardDesc: 'Truy xuất thành công địa chỉ IP đăng tin Chợ Tốt trùng khớp Wi-Fi bãi xe!',
    },
    {
      id: 'puz-2-2',
      caseId: 'tu-do',
      title: 'Dấu vết sinh học trên mép tôn gỉ sét',
      icon: '🩸',
      brief: 'Tấm tôn nóc tủ số 04 bị bật đinh tán tạo khe hở 4.2cm có dính xơ vải và vệt máu khô.',
      question:
        'Ai trong số các đối tượng bị phát hiện quấn khăn vải trắng ở cổ tay phải để che giấu vết xước rách da do kim loại cứa lúc 20:36?',
      hint: 'Nhân viên nhặt cầu mặc áo thun xám...',
      acceptedAnswers: ['Sơn', 'son', 'Trần Sơn', 'tran son', 'sơn nhặt cầu'],
      clueId: 'son-vet-xuoc',
      clueTitle: 'Vết xước kim loại trên cổ tay phải của Sơn',
      rewardDesc: 'Xác minh vết thương trên cổ tay Sơn trùng khớp hoàn toàn với mép tôn nóc tủ số 04!',
    },
  ],

  // =========================================================================
  // VỤ 03: CHIẾC HÒM QUỸ ĐÊM HỘI CHỢ
  // =========================================================================
  'hoi-cho': [
    {
      id: 'puz-3-1',
      caseId: 'hoi-cho',
      title: 'Kiểm toán số tiền mặt trong hòm từ thiện',
      icon: '💰',
      brief: 'Toàn bộ tiền từ thiện trong hòm gỗ bị cuỗm sạch trong 15 phút mất điện đột ngột từ 20:55 đến 21:10.',
      question:
        'Tổng số tiền quyên góp từ thiện trong hòm quỹ bị mất cắp chính xác là bao nhiêu triệu đồng? (Nhập con số nguyên)',
      hint: 'Hòm quỹ chứa đúng 8.000.000 VNĐ...',
      acceptedAnswers: ['8', '8 triệu', '8000000', 'tám', 'tám triệu'],
      clueId: 'chuyen-tien-trang',
      clueTitle: 'Sao kê VietinBank: Lệnh nạp và chuyển 8 triệu trả nợ của Trang lúc 21:32',
      rewardDesc: 'Phát hiện khoản nạp tiền mặt 8 triệu đồng của Trang trùng khớp từng đồng với số tiền trong hòm quỹ!',
    },
    {
      id: 'puz-3-2',
      caseId: 'hoi-cho',
      title: 'Phân tích thổ nhưỡng bãi đất sau đình',
      icon: '🌱',
      brief: 'Khu đất trũng phía sau bệ đặt hòm vừa được xới để trồng hoa thì trời đổ mưa nhẹ.',
      question:
        'Camera an ninh cổng Tam Quan CAM-302 ghi nhận viền đế giày thể thao của Trang dính bùn đất màu gì lúc chạy ra lúc 21:02?',
      hint: 'Màu của đất phù sa / đất sét son: Màu đỏ...',
      acceptedAnswers: ['đỏ', 'bùn đỏ', 'đất đỏ', 'màu đỏ', 'do', 'bun do'],
      clueId: 'trang-giay',
      clueTitle: 'Camera CAM-302: Dấu vết bùn đỏ trên giày của Trang lúc 21:02',
      rewardDesc: 'Đối soát thành công mẫu bùn đỏ trên giày Trang khớp với hiện trường sau bệ hòm!',
    },
  ],

  // =========================================================================
  // VỤ 04: ĐÊM MẤT ĐIỆN Ở CHUNG CƯ 42
  // =========================================================================
  'chung-cu': [
    {
      id: 'puz-4-1',
      caseId: 'chung-cu',
      title: 'Trật tự thời gian dòng sự kiện hệ thống BMS',
      icon: '⏱️',
      brief: 'Hệ thống BMS toà nhà ghi nhận nhiều cảnh báo cảm biến kỹ thuật trong đêm mất điện.',
      question:
        'Hãy sắp xếp 3 sự kiện sau theo thứ tự thời gian xảy ra từ SỚM NHẤT đến MUỘN NHẤT:\n[A]: Cảm biến họng rác rung chấn 12kg (21:18)\n[B]: Aptomat hầm B1 bị ngắt thủ công (21:10)\n[C]: Cuộc gọi nội bộ lừa Khải xuống hầm (21:05)\nNhập chuỗi 3 chữ cái viết liền (Ví dụ: ABC hoặc CBA):',
      hint: '21:05 (C) xảy ra trước, sau đó 21:10 (B), rồi đến 21:18 (A)...',
      acceptedAnswers: ['CBA', 'cba'],
      clueId: 'tin-nhan-dat',
      clueTitle: 'Lịch sử cuộc gọi nội bộ 45 giây giữa Đạt và Tư lúc 21:05',
      rewardDesc: 'Giải mã thành công cuộc gọi chỉ đạo giữa Đạt và Tư ngay trước giờ ngắt điện!',
    },
    {
      id: 'puz-4-2',
      caseId: 'chung-cu',
      title: 'Giải mã công thức mã két sắt Ban Quản Lý',
      icon: '🔐',
      brief: 'Chiều 20/10, Quản lý Đạt ký đổi mã két an ninh mới theo quy tắc ghép định danh văn phòng.',
      question:
        'Theo quy tắc bảo mật của Đạt: Ghép [Số phòng Ban Quản Lý: 204] và [Số tầng toà nhà nơi đặt phòng: 2].\nMật mã an ninh 4 chữ số của két sắt là gì?',
      hint: '204 ghép với 2...',
      acceptedAnswers: ['2042'],
      clueId: 'ma-khoa-ket-2042',
      clueTitle: 'Mật mã an ninh két sắt mới: 2042 (P.204 ghép Tầng 2)',
      rewardDesc: 'Tìm ra mật mã an ninh 2042 giúp mở khóa hồ sơ cáo buộc Quản lý Đạt!',
    },
  ],

  // =========================================================================
  // VỤ 05: ÁN MẠNG PHÒNG TRÀ HẺM 42
  // =========================================================================
  'an-mang': [
    {
      id: 'puz-5-1',
      caseId: 'an-mang',
      title: 'Bẫy thời gian mặt kính đồng hồ rạn vỡ',
      icon: '🕰️',
      brief: 'Đồng hồ cổ trên tay nạn nhân bị đập vỡ vuông góc bằng quả cầu chặn giấy pha lê để tạo alibi ngoại phạm giả.',
      question:
        'Chiếc đồng hồ bị đập vỡ dừng chính xác ở mốc mấy giờ mấy phút? (Nhập định dạng HH:MM, ví dụ: 22:15)',
      hint: 'Kim giờ chỉ số 10, kim phút chỉ số 3 (22 giờ 15 phút)...',
      acceptedAnswers: ['22:15', '22h15', '22:15:00'],
      clueId: 'dong-ho-vo',
      clueTitle: 'Mặt kính đồng hồ bị đập vỡ dừng ở mốc 22:15 là hiện trường giả',
      rewardDesc: 'Vạch trần cú đập tạo hiện trường thời gian chết giả lúc 22:15 của thủ phạm!',
    },
    {
      id: 'puz-5-2',
      caseId: 'an-mang',
      title: 'Mã số hồ sơ độc dược Viện Dược Liệu',
      icon: '🧪',
      brief: 'Hoá chất kịch độc Aconitine chiết xuất từ rễ củ Ô Đầu gây suy tim cấp trong 15 phút được Vũ ký nhận sáng 25/10.',
      question:
        'Mốc thời gian (giờ & phút) mà nạn nhân tự bật ấm trà đun nước lần đầu tiên trên hệ thống Smart Home IoT (cũng là mã giải mã hồ sơ) là mấy giờ mấy phút? (Nhập 4 chữ số liền nhau, ví dụ: 2128)',
      hint: 'Nhật ký ấm SmartKettle ghi đun sôi lần 1 lúc 21:28...',
      acceptedAnswers: ['2128'],
      clueId: 'ma-khoa-am-tra',
      clueTitle: 'Mã số an ninh mở hồ sơ: 2128 (Mốc đun trà lần 1 trên Smart Home)',
      rewardDesc: 'Giải mã thành công mã 2128 mở khoá toàn bộ hồ sơ kiểm soát độc chất của Bác sĩ Vũ!',
    },
  ],

  // =========================================================================
  // VỤ 06: BẮT CÓC CON TIN DU THUYỀN SÔNG HỒNG
  // =========================================================================
  'du-thuyen': [
    {
      id: 'puz-6-1',
      caseId: 'du-thuyen',
      title: 'Toạ độ phao tiêu ca-nô cao tốc đón người',
      icon: '⚓',
      brief: 'Radar hàng hải và camera cảng sông CAM-601 ghi nhận một ca-nô cao tốc nổ máy rời mạn tàu lúc 21:50.',
      question:
        'Ca-nô cao tốc neo đậu đón Thảo My tại phao tiêu hàng hải số mấy trên luồng sông Hồng? (Nhập 2 chữ số, ví dụ: 04)',
      hint: 'Phao số 4 (viết 2 chữ số là 04)...',
      acceptedAnswers: ['04', '4', 'phao 4', 'phao 04', 'phao số 4'],
      clueId: 'camera-ben-thuyen',
      clueTitle: 'Camera CAM-601: Thảo My đi giày thể thao bước xuống ca-nô lúc 21:50',
      rewardDesc: 'Xác định chính xác vị trí phao số 04 nơi Thảo My bước xuống ca-nô tẩu thoát!',
    },
    {
      id: 'puz-6-2',
      caseId: 'du-thuyen',
      title: 'Mã vô tuyến điện đàm hàng hải',
      icon: '📻',
      brief: 'Hộp đen điện đàm vô tuyến của ca-nô cao tốc mã hoá liên lạc vệ tinh bằng quy tắc ghép phao và thời gian rời bến.',
      question:
        'Theo quy tắc cảng vụ: Ghép [Số hiệu phao đón người: 04] và [Số phút ca-nô nổ máy rời bến lúc 21:50: 50].\nMật mã vô tuyến 4 chữ số là gì?',
      hint: 'Ghép 04 với 50...',
      acceptedAnswers: ['0450'],
      clueId: 'ma-phao-hai-dang',
      clueTitle: 'Mã số an ninh hàng hải: 0450 (Phao 04 + Mốc phút 21:50)',
      rewardDesc: 'Giải mã thành công mã vô tuyến 0450 mở khóa toàn bộ hộp đen và vé máy bay Bangkok!',
    },
  ],
}
