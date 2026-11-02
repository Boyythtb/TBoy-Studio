import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 02',
  title: 'Chiếc điện thoại trong tủ đồ',
  place: 'Sân cầu lông Hẻm 42',
  time: '20:35 · thứ Bảy 19/9',
  brief:
    'Điện thoại iPhone 14 Pro Max của chị Hạnh biến mất khỏi tủ đồ số 4 chỉ trong mười phút. Ổ khoá vẫn nguyên vẹn. Ngay sau đó, một tin đăng bán máy xuất hiện trên Chợ Tốt gài số điện thoại của khách chơi nhằm đổ tội, khiến hiện trường rơi vào ma trận nghi vấn.',
  culprit: 'son',
  difficulty: 'Trung bình',
  question: 'Ai đã lấy chiếc điện thoại trong tủ đồ của chị Hạnh?',
  solution:
    'Sơn (khách nợ 6 triệu tiền sân) đã lách bàn tay qua khe hở nóc tủ mọt phía sau để móc chiếc điện thoại lúc 20:25, rồi dùng máy đăng tin bán 5 triệu trên Chợ Tốt (chotot.vn) cố ý ghi số của Hào nhằm vu khống. Hào có alibi hoàn hảo khi camera sân 2 (camera-phuong.gov.vn) ghi nhận anh thi đấu liên tục từ 20:30 đến 21:00. Linh chỉ chuyển 2 triệu đóng học phí trên VietinBank (vietinbank.vn) và gọi điện thoại cho mẹ. Bóng áo khoác đỏ của Sơn trong story 20:29 của Linh và camera bãi xe là vật chứng đanh thép.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-dt': {
    id: 'mat-dt',
    tag: 'chat',
    title: 'Mất điện thoại lúc 20:35',
    detail:
      'Chị Hạnh để điện thoại iPhone 14 Pro Max trong tủ số 4 lúc 20:25, quay lại 20:35 thì tủ vẫn khoá nguyên vẹn nhưng máy đã biến mất.',
  },
  'lo-hong-tu': {
    id: 'lo-hong-tu',
    tag: 'photo',
    title: 'Khe hở nóc tủ đồ số 4',
    detail:
      'Nóc tủ tôn số 4 bị lỏng đinh tán, tạo khe hở rộng 3.5cm - 4cm. Bàn tay thon có thể luồn qua móc điện thoại ra mà hoàn toàn không cần chìa khoá hay phá ổ!',
  },
  'tin-nhan-ban': {
    id: 'tin-nhan-ban',
    tag: 'web',
    title: 'Tin đăng bán máy gài số của Hào trên Chợ Tốt',
    detail:
      'Tin CT-201 trên Chợ Tốt (chotot.vn) đăng lúc 20:44: Bán gấp iPhone 14 Pro Max 98% giá 5 triệu, người đăng cố tình điền số điện thoại của Hào để gài bẫy vu oan!',
  },
  'hao-gan-tu': {
    id: 'hao-gan-tu',
    tag: 'chat',
    title: 'Hào đứng tủ số 7 lúc 20:28',
    detail:
      'Hào đứng trước dãy tủ lúc 20:28 để lấy vợt ở tủ số 7 của mình, bàn tay to thô của dân cơ bắp không thể lọt qua khe hẹp 3.5cm của tủ số 4.',
  },
  'hao-o-san-2': {
    id: 'hao-o-san-2',
    tag: 'web',
    title: 'Hào thi đấu trên sân 2 từ 20:30 đến 21:00',
    detail:
      'Camera lối vào sân 2 (camera-phuong.gov.vn) ghi rõ Hào thi đấu set 3 kịch tính liên tục từ 20:30 đến 21:00 có đối thủ và trọng tài làm chứng. Alibi hoàn hảo!',
  },
  'chuyen-khoan-linh': {
    id: 'chuyen-khoan-linh',
    tag: 'web',
    title: 'Linh chuyển 2 triệu đóng học phí lúc 20:41',
    detail:
      'Sao kê VietinBank (vietinbank.vn): 20:41 Linh chuyển 2.000.000đ đóng học phí đại học từ tiền lương tích góp, không liên quan tới vụ trộm.',
  },
  'linh-goi-dien': {
    id: 'linh-goi-dien',
    tag: 'photo',
    title: 'Linh gọi điện thoại từ 20:30 đến 20:45',
    detail:
      'Lịch sử cước gọi và ảnh chụp quầy nước lúc 20:40: Linh áp máy nghe cuộc gọi 15 phút từ gia đình, tay kia rót nước, không hề rời quầy.',
  },
  'son-ao-do': {
    id: 'son-ao-do',
    tag: 'photo',
    title: 'Sơn mặc áo khoác đỏ đứng vách tủ lúc 20:25',
    detail:
      'Camera bãi xe (camera-phuong.gov.vn) ghi nhận Sơn mặc áo khoác đỏ lén đi vào ngách sau vách tôn tủ đồ lúc 20:25, thò tay vào khe nóc tủ số 4!',
  },
  'son-no-tien': {
    id: 'son-no-tien',
    tag: 'chat',
    title: 'Sơn nợ 6 triệu tiền sân quá hạn',
    detail:
      'Chị Hạnh giục đòi 6 triệu tiền nợ sân quá hạn 2 tuần. Sơn hứa hẹn nhưng không có tiền trả, tạo động cơ trộm cắp tài sản.',
  },
  'anh-story': {
    id: 'anh-story',
    tag: 'photo',
    title: 'Bóng áo khoác đỏ trong story 20:29',
    detail:
      'Story đăng lúc 20:29 của Linh: Tấm gương tủ phản chiếu một bóng người mặc áo khoác đỏ đứng nấp ngay sau lưng!',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'son',
    name: 'Sơn Nhặt Cầu',
    role: 'Khách quen · Nợ tiền sân',
    avatar: '🧥',
    note: 'Mặc áo khoác đỏ, nợ 6 triệu quá hạn. Bị camera thấy lén lút sau vách tủ.',
  },
  {
    id: 'hao',
    name: 'Hào Smash',
    role: 'Vận động viên phong trào',
    avatar: '🏸',
    note: 'Bị phát hiện đứng ở tủ lúc 20:28. Số điện thoại bị gài vào tin bán máy trên Chợ Tốt.',
  },
  {
    id: 'linh',
    name: 'Linh Quầy Nước',
    role: 'Nhân viên quầy nước',
    avatar: '🥤',
    note: 'Giữ chìa khoá tủ. Vừa thực hiện chuyển khoản 2 triệu lúc 20:41.',
  },
  {
    id: 'ba-mai',
    name: 'Bà Mai',
    role: 'Lau dọn sân cầu',
    avatar: '🧹',
    note: 'Nắm chìa khoá phụ. Người đầu tiên phát hiện nóc tủ bị mọt vênh.',
  },
  {
    id: 'hanh',
    name: 'Chị Hạnh',
    role: 'Chủ sân cầu lông',
    avatar: '🔑',
    note: 'Chủ sở hữu chiếc iPhone 14 Pro Max bị mất cắp.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group',
    name: 'CLB Cầu Lông Ba Đình',
    avatar: '🏸',
    isGroup: true,
    sub: '12 thành viên',
    preview: 'Chị Hạnh: Ai vừa lấy điện thoại trong tủ đồ của tôi?!',
    messages: [
      {
        id: 'cg1',
        from: 'them',
        senderName: 'Chị Hạnh (Chủ sân)',
        senderAvatar: '🔑',
        time: '20:38',
        text: 'CẢ SÂN ƠI! Chiếc iPhone 14 Pro Max màu tím của tôi để trong tủ số 4 lúc 20h25 vừa biến mất! Tủ vẫn khoá chốt nguyên vẹn, ai mở tủ của tôi ra thế này?!',
        clue: 'mat-dt',
      },
      {
        id: 'cg2',
        from: 'them',
        senderName: 'Chị Hạnh (Chủ sân)',
        senderAvatar: '🔑',
        time: '20:46',
        text: 'Trời đất ơi, có kẻ vừa đăng bán vội máy của tôi trên [Chợ Tốt](https://chotot.vn) giá bèo 5 triệu! Lại còn ngang nhiên để số điện thoại thằng Hào (0982xxx999)! Hào, em giải thích chuyện này sao đây?!',
        clue: 'tin-nhan-ban',
      },
      {
        id: 'cg3',
        from: 'them',
        senderName: 'Hào Smash',
        senderAvatar: '🏸',
        time: '20:48',
        text: 'Chị Hạnh đừng có vu oan cho em! Số máy của em ai ở cái sân này chẳng biết, chắc chắn đứa nào ghét em nên cố tình điền vào để gài bẫy! Ban nãy 20h28 em thấy Linh Quầy Nước cầm chùm chìa khoá lúi húi sau dãy tủ rất mờ ám!',
      },
      {
        id: 'cg4',
        from: 'them',
        senderName: 'Linh Quầy Nước',
        senderAvatar: '🥤',
        time: '20:49',
        text: 'Anh Hào nói điêu! Em giữ chìa quầy nước chứ chìa tủ đồ khách em đụng vào làm gì! Em thấy lúc 20h25 chính anh đứng sát tủ số 4, trên tay cầm túi vợt to đùng che chắn!',
      },
      {
        id: 'cg5',
        from: 'them',
        senderName: 'Bà Mai',
        senderAvatar: '🧹',
        time: '20:50',
        text: 'Khoan đã hai đứa đừng cãi nhau nữa! Cái tủ số 4 nóc tôn bị mọt đinh tán, hở một khe rộng hơn 3.5cm. Không cần chìa khoá cũng thò tay vào được! Nhưng tay thằng Hào đập cầu cơ bắp to đùng sao mà thò lọt, chỉ có ai tay thon nhỏ mới luồn qua khe được thôi!',
        clue: 'lo-hong-tu',
      },
      {
        id: 'cg6',
        from: 'them',
        senderName: 'Sơn Nhặt Cầu',
        senderAvatar: '🧥',
        time: '20:52',
        text: 'Chắc đứa nào bên ngoài lẻn vào trộm thôi, giờ cao điểm sân đông như kiến ai mà quản nổi. Mọi người đừng làm ầm ĩ lên công an đến đình chỉ sân bây giờ...',
      },
      {
        id: 'cg7',
        from: 'them',
        senderName: 'Chị Hạnh (Chủ sân)',
        senderAvatar: '🔑',
        time: '20:54',
        text: 'Tôi đã nhờ đồng chí công an phụ trách khu vực vào cuộc rồi! Ai lấy mau tự giác trả lại, hệ thống camera sân và tin đăng mạng còn lưu rành rành đấy!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội điều tra khu vực',
    preview: 'Cẩn thận với cái bẫy số điện thoại trên Chợ Tốt!',
    requires: ['mat-dt'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '21:00',
        text: 'Anh nhận được tin báo rồi. Vụ này có điểm rất kỳ lạ: Tủ đồ vẫn khóa chốt nguyên vẹn mà điện thoại bên trong lại biến mất. Kẻ trộm phải có thủ đoạn đặc biệt để lấy đồ mà không cần chìa khóa.',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:02',
        text: 'Chi tiết khe hở nóc tủ của bà Mai rất quan trọng. Đồng thời, tin đăng bán máy để số điện thoại của Hào có thể là đòn "ném đá giấu tay". Em lướt mạng xã hội xem các thành viên CLB cầu lông bàn tán thế nào và kiểm tra alibi thi đấu của Hào.',
      },
      {
        id: 't3',
        from: 'them',
        time: '21:05',
        text: 'Với những người có mặt quanh khu quầy nước và dãy tủ, em đối soát kỹ thời gian và hình ảnh story xem ai có alibi thực sự. Chú ý những góc gương phản chiếu hoặc bóng người lén lút quanh vách tôn!',
      },
    ],
  },
  {
    id: 'hao',
    name: 'Hào Smash',
    avatar: '🏸',
    sub: 'Hoạt động 1 phút trước',
    preview: 'Em bị kẻ gian chơi khăm rồi anh chị ơi!',
    requires: ['mat-dt'],
    messages: [
      {
        id: 'ha1',
        from: 'them',
        time: '21:08',
        text: 'Anh chị điều tra minh oan cho em với! Em đứng ở dãy tủ lúc 20h28 chỉ để mở tủ số 7 lấy vợt thi đấu thôi! Số điện thoại của em in to tướng trên túi vợt, chắc chắn kẻ trộm thấy nên cố tình điền vào tin đăng để đổ tội!',
        clue: 'hao-gan-tu',
      },
      {
        id: 'ha2',
        from: 'them',
        time: '21:09',
        text: 'Từ 20h30 đến 21h00 em thi đấu set 3 kịch tính trên sân số 2, có cả camera giám sát và anh Tuấn trọng tài đứng nhìn suốt trận!',
        clue: 'hao-o-san-2',
      },
      { id: 'ha3', from: 'me', time: '21:10', text: 'Được rồi Hào, camera sân số 2 xác nhận em thi đấu liên tục trong khung giờ đó. Em vô can.' },
    ],
  },
  {
    id: 'son',
    name: 'Sơn Nhặt Cầu',
    avatar: '🧥',
    sub: 'Hoạt động 3 phút trước',
    preview: 'Tôi không biết gì hết!',
    requires: ['anh-story'],
    messages: [
      { id: 's1', from: 'them', time: '21:12', text: 'Tôi mặc áo khoác đỏ thật, nhưng tôi chỉ đứng ngắm người ta thi đấu chứ tôi không có đụng vào tủ chị Hạnh!' },
      {
        id: 's2',
        from: 'me',
        time: '21:13',
        text: 'Nhưng camera bãi xe ghi rõ: lúc 20h25 anh lách người ra sau vách tôn và thò bàn tay vào khe nóc tủ số 4!',
        requires: ['son-ao-do'],
      },
      {
        id: 's3',
        from: 'them',
        time: '21:14',
        text: '...Chị Hạnh ép tôi trả nợ 6 triệu tiền thuê sân gắt quá, tôi túng quẫn làm liều định bán máy lấy tiền gán nợ... Xin anh chị tha cho tôi...',
        clue: 'son-no-tien',
      },
    ],
  },
  {
    id: 'linh',
    name: 'Linh Quầy Nước',
    avatar: '🥤',
    sub: 'Hoạt động 5 phút trước',
    preview: 'Em gọi điện thoại cho mẹ từ 20:30 đến 20:45.',
    requires: ['mat-dt'],
    messages: [
      {
        id: 'l1',
        from: 'them',
        time: '20:56',
        text: 'Em đứng ở quầy nước phục vụ khách suốt ca! Lúc 20h30 em nhận đơn trà sữa từ [GiaoNhanh](https://giaonhanh.vn), rồi vừa rót nước vừa gọi video với mẹ 15 phút đến tận 20h45 không rời quầy nửa bước.',
        clue: 'linh-goi-dien',
      },
      {
        id: 'l2',
        from: 'them',
        time: '20:57',
        text: 'À lúc 20h29 em có chụp tấm ảnh story đăng Facebúc, nhìn kỹ tấm gương phản chiếu thấy bóng anh Sơn áo đỏ đứng lén lút sau vách tủ đồ đấy ạ!',
        clue: 'anh-story',
      },
    ],
  },
]
export const ORDERS: Order[] = [
  { id: 'TK-9021', time: '20:41', pickup: 'Linh → VietinBank Học Phí', drop: '2.000.000đ', fee: 'Chuyển khoản', status: 'Thành công', clue: 'chuyen-khoan-linh' },
  { id: 'GN-77301', time: '20:30', pickup: 'TocoToco → Quầy Nước Linh', drop: 'GiaoNhanh 24H', fee: '24.000đ', status: 'Hoàn tất' },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Tủ đồ lúc 20:29',
    time: '20:29',
    scene: 'tea',
    img: 'detective/case2-tu-do.jpg',
    caption: 'Story của Linh: “Ca tối, khách đông ghê.”',
    clue: 'anh-story',
    hotspots: [
      {
        x: 52,
        y: 35,
        label: 'Khe hở nóc tủ đồ',
        hint: 'Soi kỹ phần tiếp giáp trên nóc tủ số 04',
        clue: 'lo-hong-tu',
        detail: 'Nóc tủ tôn số 04 bị lỏng chốt đinh tán, tạo khe hở rộng 3.5cm. Bàn tay thon có thể dễ dàng luồn qua khe để rút điện thoại ra mà không cần mở khoá!',
      },
    ],
  },
  {
    id: 'p2',
    title: 'Sân lúc 20:20',
    time: '20:20',
    scene: 'net',
    img: 'detective/case2-san-cau-long.jpg',
    caption: 'Một người áo đỏ đứng gần khu tủ đồ.',
    clue: 'son-ao-do',
    hotspots: [
      {
        x: 62,
        y: 48,
        label: 'Người mặc áo khoác đỏ',
        hint: 'Quan sát nhân vật đứng nấp cạnh vách ngăn',
        clue: 'son-ao-do',
        detail: 'Đối tượng mặc áo khoác đỏ đứng quan sát vách tủ đồ lúc 20:20!',
      },
    ],
  },
  {
    id: 'p3',
    title: 'Quầy nước lúc 20:40',
    time: '20:40',
    scene: 'street',
    img: 'detective/case2-quay-nuoc.jpg',
    caption: 'Linh đang nghe điện thoại, tay kia rót nước.',
    clue: 'linh-goi-dien',
    hotspots: [
      {
        x: 45,
        y: 42,
        label: 'Linh tại quầy nước',
        hint: 'Thời gian gọi điện thoại của nhân viên quầy',
        clue: 'linh-goi-dien',
        detail: 'Linh đang dùng điện thoại nghe cuộc gọi kéo dài từ mẹ lúc 20:40. Alibi tại quầy nước vững chắc.',
      },
    ],
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 'tr1',
    name: 'nhap-ban-may.txt',
    kind: 'Ghi chú nháp',
    preview: 'Pass iPhone 14 Pro Max 5 triệu…',
    detail: '“Pass nhanh iPhone 14 Pro Max tím 98% giá 5 triệu, liên hệ 0982xxx999 (SĐT Hào)”. Soạn từ máy chị Hạnh lúc 20:44 gài bẫy vu oan.',
    clue: 'tin-nhan-ban',
  },
  {
    id: 'tr2',
    name: 'giay-bao-no.jpg',
    kind: 'Ảnh chụp',
    preview: 'Giấy báo nợ tiền sân 6 triệu',
    detail: 'Giấy báo nhắc nợ 6.000.000đ của Sơn tại sân cầu lông, hạn thanh toán ngày 19/9.',
    clue: 'son-no-tien',
  },
]
