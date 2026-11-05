import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 03',
  title: 'Chiếc hòm quỹ đêm hội chợ',
  place: 'Hội chợ Trung thu · Sân đình Hẻm 42',
  time: '21:20 · thứ Bảy 26/9',
  brief:
    'Hòm quỹ từ thiện mất đúng 8 triệu đồng tiền mặt trong 15 phút mất điện đột ngột lúc 20:55 - 21:10. Ổ khóa mở từ phía sau bệ đá. Dấu vết bùn đỏ đất sét và biến động dòng tiền ngân hàng là mấu chốt để bóc trần kẻ gian.',
  culprit: 'trang',
  difficulty: 'Khó',
  question: 'Ai đã lấy 8 triệu từ hòm quỹ từ thiện?',
  solution:
    'Trang (thủ quỹ nhận chìa từ Oanh lúc 20:30) đã lợi dụng lúc mất điện 20:55–21:10 lẻn ra sau bệ đá mở hòm lấy trọn 8 triệu đồng tiền mặt rồi chạy tắt qua bãi đất trũng sau đình. Bùn đỏ đất sét ở bãi trũng bám chặt vào viền giày của Trang lúc chạy qua camera cổng lúc 21:02. Ngay sau đó lúc 21:32, Trang đến quầy đại lý di động nộp tiền mặt vào VietinBank để chuyển trả 8 triệu tiền nợ tín dụng. Tú có chứng cứ ngoại phạm khi camera quán trà Phúc chứng minh anh ngồi liên tục từ 20:55 đến 21:25. Khoa bị bỏng nước sôi bàn tay phải băng bó tại Long Châu từ 20:42 không thể thao tác mở hòm.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-quy': {
    id: 'mat-quy',
    tag: 'chat',
    title: 'Mất 8 triệu đồng tiền quỹ từ thiện lúc 21:20',
    detail:
      'Ban tổ chức kiểm đếm lúc 21:20 phát hiện hòm gỗ lim bị mở, thiếu đúng 8.000.000 VNĐ tiền mặt thu được trong ngày.',
  },
  'cat-dien': {
    id: 'cat-dien',
    tag: 'chat',
    title: 'Mất điện toàn sân đình từ 20:55 đến 21:10',
    detail:
      'Aptomat nhánh cung cấp điện cho sân đình bị ngắt trong 15 phút, đèn cao áp và hệ thống camera sảnh chính tắt hoàn toàn.',
  },
  'khoa-gan-hom': {
    id: 'khoa-gan-hom',
    tag: 'photo',
    title: 'Khoa cúi nhặt đồ cạnh bệ hòm lúc 20:48',
    detail:
      'Camera an ninh ghi nhận Khoa cúi xuống cạnh bệ hòm lúc 20:48 để nhặt tấm áp-phích chương trình bị gió quạt thổi bay.',
  },
  'khoa-bi-thuong': {
    id: 'khoa-bi-thuong',
    tag: 'web',
    title: 'Biên lai sơ cứu bỏng tay của Khoa lúc 20:42',
    detail:
      'Hoá đơn LC-301 tại Nhà Thuốc Long Châu: Khoa bị bỏng nước sôi mu bàn tay phải lúc 20:40 và được băng bó cố định đến 21:20, không thể cầm mở khoá sắt.',
  },
  'ket-cay': {
    id: 'ket-cay',
    tag: 'photo',
    title: 'Ổ khoá hòm quỹ mở từ phía sau bệ đá',
    detail:
      'Càng khoá bấm không hề bị cưa cắt mà được tra chìa mở bình thường từ vị trí đứng khuất phía sau bệ đá.',
  },
  'chia-ket': {
    id: 'chia-ket',
    tag: 'chat',
    title: 'Oanh bàn giao chìa khoá cho Trang lúc 20:30',
    detail:
      'Oanh giữ chìa khoá hòm quỹ nhưng lúc 20:30 phải lên sân khấu điều phối chương trình văn nghệ nên đã giao chìa cho Trang quản lý.',
  },
  'trang-giay': {
    id: 'trang-giay',
    tag: 'photo',
    title: 'Hình ảnh Camera Tam Quan: Vết bùn đất đỏ bám trên giày thể thao lúc 21:02',
    detail:
      'Camera cổng Tam Quan ghi nhận Trang di chuyển lúc 21:02 với viền giày dính đầy bùn đỏ đất sét. Đất sét đỏ này chỉ có duy nhất ở khoảnh bãi trũng mới đào sau bệ hòm quỹ.',
  },
  'chuyen-tien-trang': {
    id: 'chuyen-tien-trang',
    tag: 'web',
    title: 'Giao dịch VietinBank: Lệnh nộp 8.000.000đ tiền mặt tại quầy đại lý lúc 21:32',
    detail:
      'Sao kê VietinBank: 21:32:15 Trang nộp 8.000.000 VNĐ tiền mặt tại điểm giao dịch di động và chuyển khoản ngay để thanh toán dứt điểm khoản nợ cá nhân.',
  },
  'tu-tai-chinh': {
    id: 'tu-tai-chinh',
    tag: 'chat',
    title: 'Tú ngồi uống trà đá đối diện sân đình',
    detail:
      'Tú khai ngồi tại quán trà Phúc đối diện cổng đình từ chập tối để theo dõi chương trình và hẹn gặp bạn bè.',
  },
  'tu-camera-alibi': {
    id: 'tu-camera-alibi',
    tag: 'web',
    title: 'Camera quán trà xác nhận Tú ngồi liên tục 20:55–21:25',
    detail:
      'Camera CAM-301 của quán trà Phúc ghi nhận Tú ngồi liên tục tại bàn ngoài hiên từ 20:55 đến 21:25 không hề rời đi.',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'trang',
    name: 'Trang Bán Bánh',
    role: 'Thủ quỹ kiêm gian hàng ẩm thực',
    avatar: '🥖',
    note: 'Có chứng cứ ngoại phạm sắt đá: Là trưởng nhóm thiện nguyện, Trang liên tục đứng phát cơm chay và hoa đăng tại sảnh Tam Quan trước sự chứng kiến của hơn 200 Phật tử từ 20:15 đến 21:15.',
  },
  {
    id: 'tu',
    name: 'Tú Tài Chính',
    role: 'Nhân viên giám sát gây quỹ',
    avatar: '💼',
    note: 'Có mặt tại hội chợ để theo dõi hoạt động quyên góp, từng có tiền án trộm cắp và bị phát hiện nộp tiền mặt rách góc vào ATM lúc 20:45.',
  },
  {
    id: 'khoa',
    name: 'Khoa Tình Nguyện',
    role: 'Tình nguyện viên đoàn thanh niên',
    avatar: '🧤',
    note: 'Cúi nhặt đồ gần bệ hòm lúc 20:48, tay phải quấn băng trắng do bị bỏng nước sôi tại bếp lúc 20:42, bị nghi vờ bỏng để làm hỏng ổ khóa.',
  },
  {
    id: 'oanh',
    name: 'Oanh Trưởng Ban',
    role: 'Phó ban tổ chức hội chợ',
    avatar: '🎤',
    note: 'Người giữ chìa khóa hòm ban đầu, giao lại chìa cho Trang lúc 20:30 để lên sân khấu điều phối văn nghệ.',
  },
  {
    id: 'thanh_at',
    name: 'Thành Kỹ Thuật',
    role: 'Kỹ thuật viên âm thanh & ánh sáng',
    avatar: '🎛️',
    note: 'Phụ trách tủ điện tổng và dàn loa máy sân đình. Từng bị Trang phản ánh chậm bàn giao micro và có khoản nợ tiền thiết bị cần xoay xở gấp.',
  },
  {
    id: 'hung',
    name: 'Chú Hùng',
    role: 'Bảo vệ dân phòng tuần tra',
    avatar: '🔦',
    note: 'Phụ trách đèn chiếu sáng và an ninh khu vực sân đình. Là người phát hiện ra sự cố sập cầu dao lúc 20:55.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group_hoi_cho',
    name: 'Ban Tổ Chức Hội Chợ 42',
    avatar: '🏮',
    isGroup: true,
    sub: '12 thành viên',
    preview: 'Oanh: Mọi người ơi hòm công đức từ thiện bị mất sạch tiền rồi!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Oanh Trưởng Ban',
        senderAvatar: '🎤',
        time: '21:22',
        text: 'Cả nhà ơi khẩn cấp! Hòm công đức từ thiện đặt sau bệ đá chính điện vừa kiểm tra thì thấy 8 triệu đồng tiền mặt bị vét sạch không còn một đồng! Hòm khoá ngoài vẫn nguyên vẹn!',
        clue: 'mat-quy',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Chú Hùng (Bảo vệ)',
        senderAvatar: '🔦',
        time: '21:23',
        text: 'Lúc 20h55 bị chập cầu dao ngắt điện mất 15 phút, cả sân đình tối thui! Chắc chắn kẻ gian đã lợi dụng lúc mất điện để ra tay luồn ra phía sau bệ đá!',
        clue: 'cat-dien',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Oanh Trưởng Ban',
        senderAvatar: '🎤',
        time: '21:24',
        text: 'Hôm nay đông người nên lúc 20h30 chị đã bàn giao tận tay chìa khoá hòm công đức cho Trang cất trong túi tạp dề rồi nhé!',
        clue: 'chia-ket',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Trang Bán Bánh',
        senderAvatar: '🥖',
        time: '21:25',
        text: 'Em biết ngay ai lấy rồi! Anh Tú Tài Chính xăm trổ ngồi ở quán nước chè đối diện rình mò cả tối chứ ai! Dân đòi nợ thuê như ảnh mới biết cách cạy hòm luồn lọt!',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Chú Hùng (Bảo vệ)',
        senderAvatar: '🔦',
        time: '21:26',
        text: 'Tôi cũng thấy thằng Khoa tình nguyện viên rất đáng ngờ! Lúc 20h48 tôi thấy thằng Khoa cúi lom khom cạnh bệ hòm nhặt tấm áp-phích chương trình, lúc đó tay nó vẫn lành lặn cầm nắm bình thường!',
        clue: 'khoa-gan-hom',
      },
      {
        id: 'g6',
        from: 'them',
        senderName: 'Khoa Tình Nguyện',
        senderAvatar: '🧤',
        time: '21:27',
        text: 'Chú Hùng đừng đổ oan cho cháu! Cháu nhặt áp-phích xong thì sang phụ khiêng nồi chè bị trượt chân nước sôi bắn vào tay lúc 20h40, phải chạy ngay ra [Long Châu](https://nhathuoc-longchau42.vn) sơ cứu băng bó tới 21h20 mới về!',
        clue: 'khoa-bi-thuong',
      },
      {
        id: 'g7',
        from: 'them',
        senderName: 'Tú Tài Chính',
        senderAvatar: '💼',
        time: '21:28',
        text: 'Con Trang bán bánh kia mày ăn nói cho cẩn thận! Tao ngồi uống nước chè chén ở quán Phúc đối diện cổng đình suốt từ 20h55 đến 21h25, camera quán chĩa thẳng vào bàn tao ngồi, tao không rời nửa bước!',
        clue: 'tu-tai-chinh',
      },
      {
        id: 'g8',
        from: 'them',
        senderName: 'Oanh Trưởng Ban',
        senderAvatar: '🎤',
        time: '21:29',
        text: 'Ổ khóa không hề bị đập phá gì cả, chỉ có ai cầm chìa hoặc cạy chốt lẫy sau bệ đá mới mở êm ru như thế được thôi!',
        clue: 'ket-cay',
      },
      {
        id: 'g9',
        from: 'them',
        senderName: 'Chú Hùng (Bảo vệ)',
        senderAvatar: '🔦',
        time: '21:30',
        text: 'Camera an ninh cổng Tam Quan [Camera Phường](https://camera-phuong.gov.vn) CAM-302 soi rõ từng người đi qua bãi cỏ sau đình, công an đang trích xuất dữ liệu rồi!',
      },
      {
        id: 'g10',
        from: 'them',
        senderName: 'Thành Kỹ Thuật',
        senderAvatar: '🎛️',
        time: '21:31',
        text: 'Tôi phụ trách bàn âm thanh ở góc sân đình! Lúc 20h55 sập cầu dao tổng tôi chạy ra tủ điện thì thấy bóng người mặc tạp dề hoa chạy thục mạng từ phía hòm quỹ về quầy bánh, tay còn giấu bọc nilon đen!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra khu vực',
    preview: 'Xem xét dấu vết địa hình và dòng luân chuyển tài chính.',
    requires: ['mat-quy'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:30',
        text: 'Mọi người đang đổ dồn nghi ngờ vào Tú và Khoa vì định kiến ngoại hình và hành tung. Nhưng em hãy cẩn trọng: kẻ giữ chìa khóa và kẻ có mặt tại hiện trường mới là manh mối cốt lõi.',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:35',
        text: 'Hòm quỹ được mở trong khoảng thời gian mất điện 20:55 - 21:10. Bãi đất sau bệ vừa mới xới rất nhão bùn đỏ, kẻ tiếp cận chắc chắn để lại dấu vết bùn đất.',
        requires: ['ket-cay'],
      },
      {
        id: 't3',
        from: 'them',
        time: '21:40',
        text: 'Số tiền 8 triệu đồng tiền mặt bị cuỗm đi gồm nhiều tờ mệnh giá nhỏ. Kẻ gian thường có tâm lý nạp ngay vào tài khoản hoặc chuyển khoản thanh toán nợ nần để phi tang tiền mặt.',
        requires: ['trang-giay'],
      },
    ],
  },
  {
    id: 'tu',
    name: 'Tú Tài Chính',
    avatar: '💼',
    sub: 'Hoạt động 2 phút trước',
    preview: 'Tôi ngồi uống nước chè đàng hoàng suốt từ 20h55…',
    requires: ['tu-tai-chinh'],
    messages: [
      { id: 'tu1', from: 'them', time: '21:35', text: 'Này điều tra viên, tôi có tiếng trong giới tài chính nhưng tuyệt đối không bao giờ động vào tiền công đức của chùa! Con Trang nó cố tình vu vạ cho tôi đấy!' },
      { id: 'tu2', from: 'them', time: '21:36', text: 'Camera CAM-301 của quán trà Phúc ghi nhận tôi ngồi liên tục tại bàn ngoài hiên từ 20:55 đến 21:25 không hề rời đi một giây nào! Anh kiểm tra là rõ ngay!', clue: 'tu-camera-alibi' },
    ],
  },
  {
    id: 'trang',
    name: 'Trang Bán Bánh',
    avatar: '🥖',
    sub: 'Đang online',
    preview: 'Em bận nướng bánh ở quầy suốt mà…',
    requires: ['mat-quy'],
    messages: [
      { id: 'tr1', from: 'them', time: '21:35', text: 'Em là trưởng nhóm thiện nguyện, đứng phát cơm chay và hoa đăng ở cổng Tam Quan suốt từ 20h15 đến 21h15 trước hàng trăm Phật tử, camera CAM-302 ghi hình liên tục! Em đi đâu được mà nghi ngờ em? Anh Tú với anh Khoa lảng vảng gần hòm quỹ kìa!' },
      {
        id: 'tr2',
        from: 'me',
        time: '21:36',
        text: 'Khu vực bãi đất trũng sau hòm quỹ có nhiều dấu vết di chuyển lúc mất điện. Chị có đi qua khu vực đó sau 21h không?',
        requires: ['trang-giay'],
      },
      {
        id: 'tr3',
        from: 'them',
        time: '21:37',
        text: 'Dạ... lúc mất điện em phải chạy ra lối phụ mượn cây đèn sạc nên vô tình dẫm phải bồn hoa mới xới thôi mà!',
        clue: 'trang-giay',
      },
      {
        id: 'tr4',
        from: 'me',
        time: '21:38',
        text: 'Chị có phát sinh giao dịch tài chính hoặc nạp nộp tiền mặt nào sau thời điểm xảy ra sự cố mất điện không?',
        requires: ['chuyen-tien-trang'],
      },
      {
        id: 'tr5',
        from: 'them',
        time: '21:39',
        text: 'Khoản 8 triệu đó là tiền doanh thu tích luỹ bán bánh mì cả tuần qua và tiền em vay thêm mẹ em để nộp trả thẻ tín dụng! Em bán hàng vất vả kiếm từng đồng chứ đâu có ăn trộm! Chừng nào có người tận mắt thấy em mở hòm sắt thì hãy đến nói chuyện!',
        requires: ['chuyen-tien-trang'],
      },
    ],
  },
  {
    id: 'khoa',
    name: 'Khoa Tình Nguyện',
    avatar: '🧤',
    sub: 'Hoạt động 5 phút trước',
    preview: 'Em bị bỏng nước sôi phải đi sơ cứu từ 20h42…',
    requires: ['mat-quy'],
    messages: [
      { id: 'k1', from: 'them', time: '21:38', text: 'Chú Hùng nhìn thấy em nhặt áp-phích lúc 20h48 nhưng lúc 20h40 em bị nước sôi bắn vào cổ tay bỏng rát, phải chạy vội ra nhà thuốc [Long Châu](https://nhathuoc-longchau42.vn) ngã ba sơ cứu!' },
      { id: 'k2', from: 'them', time: '21:39', text: 'Bác sĩ ở nhà thuốc băng bó cố định bàn tay cho em từ 20h42 đến tận 21h20 mới xong, đơn thuốc điện tử lưu đầy đủ trên máy chủ phòng khám đấy ạ!', clue: 'khoa-bi-thuong' },
    ],
  },
  {
    id: 'thanh_at',
    name: 'Thành Kỹ Thuật',
    avatar: '🎛️',
    sub: 'Đang online',
    preview: 'Sự cố nhảy Aptomat lúc 20h55 là do quá tải lò nướng…',
    requires: ['mat-quy'],
    messages: [
      {
        id: 'tat1',
        from: 'them',
        time: '21:32',
        text: 'Anh điều tra viên ơi, lúc 20h55 aptomat tổng nhảy là do quầy bánh của chị Trang cắm cùng lúc 3 cái lò nướng công suất lớn gây quá tải đường dây!',
      },
      {
        id: 'tat2',
        from: 'them',
        time: '21:33',
        text: 'Lúc tôi cầm đèn pin chạy ra tủ điện khắc phục thì thấy chị Trang chạy vội từ hướng hậu trường hòm quỹ về quầy bánh, tay còn giấu bọc nilon đen!',
      },
    ],
  },
]

export const ORDERS: Order[] = [
  { id: 'LC-301', time: '20:42', pickup: 'Nhà thuốc Long Châu', drop: 'Sơ cứu bỏng mu bàn tay', fee: '85.000đ', status: 'Hoàn tất (Khoa)', clue: 'khoa-bi-thuong' },
  { id: 'TX-99812', time: '21:32', pickup: 'Quầy VietinBank di động', drop: 'Thanh toán nợ tín dụng', fee: '8.000.000đ', status: 'Thành công (Trang)', clue: 'chuyen-tien-trang' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Bệ đá đặt hòm quỹ sau sân đình',
    time: '21:25',
    scene: 'street',
    caption: 'Hiện trường bệ đá và hòm quỹ từ thiện bằng gỗ lim.',
    clue: 'ket-cay',
    hotspots: [
      { x: 45, y: 50, label: 'Ổ khóa hòm', hint: 'Tra chìa phía sau', clue: 'ket-cay', detail: 'Ổ khóa mở nguyên vẹn từ phía sau bệ đá, không có vết cưa cắt cơ học.' },
      { x: 80, y: 70, label: 'Khoảnh đất bùn đỏ', hint: 'Bãi đất trũng sau bệ', clue: 'trang-giay', detail: 'Khoảnh đất bùn đỏ đất sét in hằn dấu giày thể thao hướng ra cổng phụ.' },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 't1',
    name: 'so_theo_doi_tien_cong_duc_thang_10.xlsx',
    kind: 'Sổ sách kế toán nhà chùa',
    preview: 'Bảng theo dõi thu chi tiền công đức hội chợ Trung thu…',
    detail: 'Tổng số tiền hòm công đức thu nhận đầu giờ tối: 8.000.000đ tiền mặt, được niêm phong ổ khóa lúc 19:00 có chữ ký chứng kiến của Ban tổ chức.',
  },
  {
    id: 't2',
    name: 'don_thuoc_so_cuu_bong_khoa.pdf',
    kind: 'Bệnh án sơ cứu Long Châu',
    preview: 'Biên bản sơ cứu bỏng nhiệt độ 1 cho bệnh nhân Khoa…',
    detail: 'Đơn thuốc điện tử LC-301: Khoa được xử lý bỏng nước sôi mu bàn tay phải tại nhà thuốc Long Châu lúc 20:42, được cố định gạc tiệt trùng suốt 40 phút.',
  },
  {
    id: 't3',
    name: 'bang_cham_cong_tinh_nguyen_vien.xlsx',
    kind: 'Danh sách nhân sự trực hội chợ',
    preview: 'Phân công vị trí chốt trực thanh niên tình nguyện…',
    detail: 'Bảng điều phối tình nguyện viên: Khoa trực chốt hỗ trợ sân khấu, Thành phụ trách bảng điện trung tâm, Oanh phụ trách hòm quyên góp.',
  },
  {
    id: 't4',
    name: 'hoa_don_thue_gian_hang_hoi_cho.pdf',
    kind: 'Hóa đơn dịch vụ mặt bằng',
    preview: 'Biên lai thu phí vệ sinh và thuê vị trí bán bánh mì…',
    detail: 'Hóa đơn số 8891: Gian hàng bánh mì nướng nóng nộp lệ phí mặt bằng 500.000đ cho ban quản trị sân đình lúc 17:30.',
  },
  {
    id: 't5',
    name: 'bien_lai_rut_tien_atm.png',
    kind: 'Biên lai ATM',
    preview: 'Biên lai rút 8.000.000đ cây ATM phố Hàng Chai…',
    detail: 'Biên lai rút tiền tại cây ATM VietinBank lúc 20:30 của Vũ Anh Tú (Tú Tài Chính) chứng minh nguồn gốc số tiền mặt trong người Tú.',
    clue: 'tu-camera-alibi',
  },
]
