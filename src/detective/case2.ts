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
    preview: 'Chị Hạnh: Ai vừa đăng bán điện thoại của tôi trên Chợ Tốt?!',
    messages: [
      {
        id: 'cg1',
        from: 'them',
        senderName: 'Chị Hạnh (Chủ sân)',
        senderAvatar: '🔑',
        time: '20:38',
        text: 'CẢ SÂN ƠI! Chiếc iPhone 14 Pro Max màu tím của tôi để trong tủ số 4 lúc 20:25 vừa biến mất! Tủ vẫn khoá chốt nguyên vẹn!',
        clue: 'mat-dt',
      },
      {
        id: 'cg2',
        from: 'them',
        senderName: 'Chị Hạnh (Chủ sân)',
        senderAvatar: '🔑',
        time: '20:46',
        text: 'Trời ơi, có đứa vừa đăng bán vội máy của tôi trên [🛍️ Chợ Tốt](https://chotot.vn) giá bèo 5 triệu! Để nguyên số điện thoại thằng Hào (0982xxx999)! Hào, mày giải thích sao đây?!',
        clue: 'tin-nhan-ban',
      },
      {
        id: 'cg3',
        from: 'them',
        senderName: 'Hào Smash',
        senderAvatar: '🏸',
        time: '20:48',
        text: 'Chị Hạnh đừng vu oan cho em! Tin bán máy đó cố tình để số em để gài bẫy! Lúc 20:28 em thấy Linh Quầy Nước lúi húi cầm chùm chìa khoá đi sau dãy tủ rất mờ ám!',
      },
      {
        id: 'cg4',
        from: 'them',
        senderName: 'Linh Quầy Nước',
        senderAvatar: '🥤',
        time: '20:49',
        text: 'Anh Hào nói điêu! Em giữ chìa quầy nước chứ chìa tủ đồ khách em đụng vào làm gì! Em thấy lúc 20:25 anh Hào đứng sát tủ số 4, trên tay cầm túi vợt to đùng che chắn!',
      },
      {
        id: 'cg5',
        from: 'them',
        senderName: 'Bà Mai',
        senderAvatar: '🧹',
        time: '20:50',
        text: 'Khoan đã hai đứa! Cái tủ số 4 nóc tôn bị mọt đinh tán, hở một khe rộng hơn 3.5cm. Không cần chìa khoá cũng thò tay vào được! Nhưng tay thằng Hào cơ bắp to đùng thò vào sao lọt, chỉ có ai bàn tay nhỏ thon mới luồn qua được thôi!',
        clue: 'lo-hong-tu',
      },
      {
        id: 'cg6',
        from: 'them',
        senderName: 'Sơn Nhặt Cầu',
        senderAvatar: '🧥',
        time: '20:52',
        text: 'Chắc đứa nào bên ngoài lẻn vào thôi, sân đông như kiến ai mà quản nổi. Mọi người đừng cãi nhau làm ầm ĩ lên công an đến phạt sân giờ!',
      },
      {
        id: 'cg7',
        from: 'them',
        senderName: 'Chị Hạnh (Chủ sân)',
        senderAvatar: '🔑',
        time: '20:54',
        text: 'Tôi đã báo công an phường rồi! Ai lấy mau trả lại, trên [🛍️ Chợ Tốt](https://chotot.vn) và [📹 Camera Phường / Sân](https://camera-phuong.gov.vn) còn ghi hình rành rành đấy!',
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
        text: 'Anh xem tin báo rồi. Hiện tại Hào và Linh đang đổ lỗi gay gắt cho nhau: Hào bị để số điện thoại trên [🛍️ Chợ Tốt](https://chotot.vn), còn Linh bị nghi vì giữ chìa khoá.',
      },
      {
        id: 't2',
        from: 'them',
        time: '21:02',
        text: 'Em vào [📹 Camera Phường / Sân](https://camera-phuong.gov.vn) soi kỹ lối đi sau vách tủ lúc 20:25 xem ai đã lén thò tay vào khe hở, và kiểm tra trận đấu của Hào.',
      },
      {
        id: 't3',
        from: 'them',
        time: '21:05',
        text: 'Đồng thời kiểm tra sao kê chuyển khoản của Linh trên [🏦 VietinBank](https://vietinbank.vn) và các bài đăng trên [🌐 Facebúc](https://facebuc.vn) để xác minh ai có động cơ thực sự!',
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
        text: 'Anh chị ơi, em đứng ở dãy tủ lúc 20:28 chỉ để mở tủ số 7 lấy vợt thi đấu! Số điện thoại của em ai ở sân này cũng biết, chắc chắn kẻ trộm ghét em nên cố tình điền vào tin Chợ Tốt!',
        clue: 'hao-gan-tu',
      },
      {
        id: 'ha2',
        from: 'them',
        time: '21:09',
        text: 'Em thi đấu set 3 từ 20:30 đến 21:00 có camera sân số 2 và anh Tuấn trọng tài làm chứng 100%!',
        clue: 'hao-o-san-2',
      },
      { id: 'ha3', from: 'me', time: '21:10', text: 'Được rồi Hào, camera xác nhận bạn ở sân số 2 suốt khung giờ đó.' },
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
      { id: 's1', from: 'them', time: '21:12', text: 'Tôi mặc áo khoác đỏ thật, nhưng tôi chỉ đứng ngắm sân chứ không đụng vào tủ chị Hạnh!' },
      {
        id: 's2',
        from: 'me',
        time: '21:13',
        text: 'Nhưng camera bãi xe (camera-phuong.gov.vn) ghi rõ anh lách người ra sau vách tôn và thò tay vào khe nóc tủ số 4 lúc 20:25!',
        requires: ['son-ao-do'],
      },
      {
        id: 's3',
        from: 'them',
        time: '21:14',
        text: '...Chị Hạnh ép tôi trả nợ 6 triệu tiền sân ráo riết quá, tôi túng quẫn làm liều định bán máy lấy tiền trả nợ thôi mà...',
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
        text: 'Em đứng quầy suốt, lúc 20:30 em nhận trà sữa của [⚡ GiaoNhanh](https://giaonhanh.vn), rồi gọi video với mẹ 15 phút đến 20:45.',
        clue: 'linh-goi-dien',
      },
      {
        id: 'l2',
        from: 'them',
        time: '20:57',
        text: 'Story 20:29 em chụp vô tình bắt được bóng anh Sơn áo đỏ đứng nấp sau vách tủ đồ đấy ạ!',
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
