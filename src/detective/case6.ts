import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'

export const CASE = {
  no: 'Vụ án 06',
  title: 'Vụ Bắt Cóc Con Tin Du Thuyền Sông Hồng',
  place: 'Bến Du Thuyền Hạng Sang Sông Hồng · Khoang VIP Tầng 3',
  time: '22:15 · thứ Bảy 14/11',
  brief:
    'Ái nữ duy nhất của tập đoàn tài chính Đông Dương biến mất bí ẩn ngay giữa bữa tiệc sinh nhật trên du thuyền sang trọng. Một cuộc gọi tống tiền 10 tỷ đồng đòi tiền chuộc trong 60 phút, chiếc vòng kim cương rơi lại ở mạn thuyền, gã bồi bàn bị bắt quả tang cầm điện thoại nặc danh, nhưng chân tướng thực sự lại là một kế hoạch giả bắt cóc tẩu tán tài sản và thủ đoạn hoán đổi con tin nghẹt thở.',
  culprit: 'minh-khang',
  accomplice: 'thao-my',
  difficulty: 'Siêu hóc búa',
  question: 'Ai là kẻ chủ mưu dàn dựng vụ bắt cóc tống tiền, và ai là đồng phạm phối hợp?',
  solution:
    'Minh Khang (Vị hôn phu lịch lãm) là kẻ chủ mưu. Khang vỡ nợ chứng khoán phái sinh 12 tỷ đến hạn siết nợ, đã dụ dỗ Thảo My (cô con gái cả ương bướng, nghiện mua sắm) giả vờ bị bắt cóc để tống tiền cha ruột 10 tỷ đồng. Lúc 21:40, Thảo My cố tình vứt chiếc vòng kim cương ở mạn thuyền tạo hiện trường giả ngã xuống sông. Khang dùng sim rác gọi tống tiền lúc 22:00, rồi lén nhét chiếc sim nặc danh vào tạp dề của Bồi bàn Nam lúc 22:05 để đổ tội. Thảo My trùm áo mưa trốn xuống ca nô cao tốc chờ sẵn ở phao số 4 do Minh Khang thuê từ trước. Khang nhận lệnh chuyển khoản ứng trước 3 tỷ tiền chuộc từ ông chủ tịch qua VietinBank lúc 22:45, sau đó đặt cuốc cano hoả tốc GiaoNhanh để đón My tẩu thoát thì bị thám tử chặn đứng.',
}

export const CLUES: Record<string, ClueDef> = {
  'mat-tich-con-tin': {
    id: 'mat-tich-con-tin',
    tag: 'chat',
    title: 'Tiểu thư Thảo My biến mất khỏi khoang VIP lúc 21:40',
    detail:
      'Lúc 21:40, tiệc sinh nhật đang cao trào thì Thảo My rời bàn nói ra mạn thuyền ngắm cảnh rồi không quay lại. Cửa khoang VIP mở toang, ly cocktail dở dang trên bàn.',
  },
  'vong-tay-man-thuyen': {
    id: 'vong-tay-man-thuyen',
    tag: 'photo',
    title: 'Chiếc vòng tay kim cương vướng ở lan can mạn thuyền',
    detail:
      'Chiếc vòng tay đắt giá vướng vào dây neo mạn thuyền, thành lan can có vệt cọ xát. Thoạt nhìn như nạn nhân bị giằng co ngã xuống sông, nhưng mặt sàn không hề có vết trượt ngã hay dấu hiệu kháng cự.',
  },
  'cuoc-goi-tong-tien': {
    id: 'cuoc-goi-tong-tien',
    tag: 'chat',
    title: 'Cuộc gọi nặc danh đòi 10 tỷ tiền chuộc lúc 22:00',
    detail:
      'Đúng 22:00, Chủ tịch nhận cuộc gọi giọng biến âm: "Con gái ông đang trong tay chúng tôi, chuẩn bị 10 tỷ tiền mặt hoặc chuyển khoản cọc 3 tỷ trước 23:00, báo công an con gái ông sẽ chìm đáy sông".',
  },
  'sim-rac-tap-de': {
    id: 'sim-rac-tap-de',
    tag: 'file',
    title: 'Chiếc điện thoại cục gạch sim rác trong tạp dề bồi bàn',
    detail:
      'Trong túi tạp dề của Bồi bàn Nam có chiếc Nokia đen lắp sim rác 0912xxx vừa thực hiện cuộc gọi tống tiền 22:00. Nam thề bị ai đó va vào người nhét trộm vào lúc 22:05.',
  },
  'camera-ben-thuyen': {
    id: 'camera-ben-thuyen',
    tag: 'web',
    title: 'Camera Phường CAM-601: Người mặc áo mưa tím bước xuống ca nô lúc 21:50',
    detail:
      'Camera ngã ba sông (camera-phuong.gov.vn) ghi hình: Lúc 21:50, một dáng nữ trùm áo mưa tím cao gầy bước từ bậc thang phụ du thuyền xuống chiếc ca nô cao tốc mang số hiệu CN-082.',
  },
  'vietinbank-chuyen-tien-chuoc': {
    id: 'vietinbank-chuyen-tien-chuoc',
    tag: 'web',
    title: 'VietinBank TX-77102: Lệnh chuyển 3 tỷ tiền cọc chuộc người lúc 22:45',
    detail:
      'Sao kê VietinBank: 22:45 tài khoản công ty chuyển 3.000.000.000đ theo yêu cầu kẻ tống tiền vào tài khoản trung gian của Minh Khang với ghi chú "Giai cuu con gai"!',
  },
  'longchau-thuoc-an-than': {
    id: 'longchau-thuoc-an-than',
    tag: 'web',
    title: 'Long Châu LC-608: Thảo My mua thuốc ngủ & nước mắt nhân tạo lúc 17:15',
    detail:
      'Hoá đơn Nhà thuốc Long Châu chi nhánh Bến Cảng: Thảo My đích thân mua thuốc ngủ dạng viên và thuốc nhuộm tóc màu vàng đồng lúc 17:15 để chuẩn bị cải trang trốn chạy!',
  },
  'chotot-ban-xe': {
    id: 'chotot-ban-xe',
    tag: 'web',
    title: 'Chợ Tốt CT-688: Bồi bàn Nam rao bán xe Wave nợ tiền đóng trọ',
    detail:
      'Tin đăng CT-688 trên Chợ Tốt: Nam rao bán xe máy Wave Alpha cũ giá 6 triệu từ 4 ngày trước để trả nợ học phí, hoàn toàn không dính líu đến đường dây tống tiền bạc tỷ.',
  },
  'giaonhanh-ca-no': {
    id: 'giaonhanh-ca-no',
    tag: 'web',
    title: 'GiaoNhanh GN-99801: Đơn vận chuyển hành lý bí mật ra phao số 4',
    detail:
      'Cổng GiaoNhanh (giaonhanh.vn): Đơn hoả tốc đường sông GN-99801 chở 2 vali hàng hiệu từ bến du thuyền ra phao neo đậu số 4 lúc 21:30 do tài khoản Minh Khang đặt.',
  },
  'tin-nhan-thoa-thuan': {
    id: 'tin-nhan-thoa-thuan',
    tag: 'chat',
    title: 'Tin nhắn thoả thuận ăn chia giữa Khang và Thảo My',
    detail:
      'Nội dung khôi phục máy Thảo My: "Kế hoạch bắt cóc hoàn hảo. Em trốn ra ca nô trước, anh ép ông già chuyển 3 tỷ rồi ra đón em bay qua Bangkok ngay đêm nay".',
  },
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'minh-khang',
    name: 'Minh Khang',
    role: 'Vị hôn phu · Giám đốc công ty đầu tư',
    avatar: '🤵',
    note: 'Người tổ chức tiệc sinh nhật. Vỡ nợ phái sinh 12 tỷ. Đứng ra đàm phán tiền chuộc.',
  },
  {
    id: 'thao-my',
    name: 'Tiểu thư Thảo My',
    role: 'Nạn nhân "bị bắt cóc" · Con gái Chủ tịch',
    avatar: '💃',
    note: 'Bị bố cấm cản kết hôn và cắt thẻ tín dụng. Mua thuốc nhuộm tóc và thuốc ngủ chiều nay.',
  },
  {
    id: 'nam-boi-ban',
    name: 'Nam Bồi Bàn',
    role: 'Phục vụ khoang VIP du thuyền',
    avatar: '🧑‍🍳',
    note: 'Bị phát hiện có chiếc điện thoại sim rác tống tiền trong túi tạp dề lúc 22:05.',
  },
  {
    id: 'thuyen-truong-hai',
    name: 'Thuyền Trưởng Hải',
    role: 'Thuyền trưởng du thuyền Sông Hồng',
    avatar: '⚓',
    note: 'Nắm lịch trình di chuyển và hệ thống camera radar của du thuyền.',
  },
  {
    id: 'ba-phuong',
    name: 'Bà Phương',
    role: 'Mẹ kế của Thảo My',
    avatar: '👠',
    note: 'Tranh chấp tài sản thừa kế với Thảo My. Có mặt tại bữa tiệc lúc xảy ra vụ việc.',
  },
]

export const CONVS: Conv[] = [
  {
    id: 'group',
    name: 'BĐH Du Thuyền Sông Hồng',
    avatar: '🛳️',
    isGroup: true,
    sub: '24 thành viên',
    preview: 'KHẨN CẤP: Tiểu thư Thảo My mất tích khỏi du thuyền!',
    messages: [
      {
        id: 'g1',
        from: 'them',
        senderName: 'Quản Lý Du Thuyền',
        senderAvatar: '👔',
        time: '21:45',
        text: 'CẢ DU THUYỀN CHÚ Ý! Tiểu thư Thảo My biến mất khỏi khoang VIP tầng 3! Chỉ thấy chiếc vòng kim cương rơi lại ở mạn thuyền!',
        clue: 'mat-tich-con-tin',
      },
      {
        id: 'g2',
        from: 'them',
        senderName: 'Bà Phương (Mẹ kế)',
        senderAvatar: '👠',
        time: '21:48',
        text: 'Trời ơi, chắc nó say rượu trượt chân ngã xuống sông rồi! Thuyền trưởng mau cho dừng tàu rà soát đáy sông đi!',
      },
      {
        id: 'g3',
        from: 'them',
        senderName: 'Minh Khang (Hôn phu)',
        senderAvatar: '🤵',
        time: '21:52',
        text: 'Không phải ngã sông đâu! My bơi rất giỏi! Tôi nghi ngờ nhân viên bồi bàn lẻn vào bắt cóc tống tiền!',
      },
      {
        id: 'g4',
        from: 'them',
        senderName: 'Bảo Vệ Tàu',
        senderAvatar: '🛡️',
        time: '22:06',
        text: 'BẮT ĐƯỢC RỒI! Chúng tôi vừa khám người thằng Nam bồi bàn, trong túi tạp dề nó giấu chiếc Nokia sim rác vừa gọi tống tiền 10 tỷ lúc 22:00 kìa!',
        clue: 'sim-rac-tap-de',
      },
      {
        id: 'g5',
        from: 'them',
        senderName: 'Nam Bồi Bàn',
        senderAvatar: '🧑‍🍳',
        time: '22:08',
        text: 'Các người vu oan cho tôi! Lúc 22:05 có người va sầm vào tôi ở hành lang, chắc chắn đứa nào nhét điện thoại vào túi tạp dề tôi để gài bẫy! Tôi chỉ là sinh viên làm thêm!',
      },
      {
        id: 'g6',
        from: 'them',
        senderName: 'Thuyền Trưởng Hải',
        senderAvatar: '⚓',
        time: '22:12',
        text: 'Công an và thám tử đã lên tàu! Đề nghị mọi người ở nguyên vị trí, trích xuất ngay [📹 Camera Bến Sông](https://camera-phuong.gov.vn), [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) và [🏦 VietinBank](https://vietinbank.vn)!',
      },
    ],
  },
  {
    id: 'tung',
    name: 'Anh Tùng Công an',
    avatar: '👮',
    sub: 'Đội Trọng Án & Bắt Cóc Tống Tiền',
    preview: 'Vụ án con tin du thuyền siêu hóc búa!',
    requires: ['mat-tich-con-tin'],
    messages: [
      {
        id: 't1',
        from: 'them',
        time: '22:15',
        text: 'Vụ án bắt cóc này có nhiều điểm rất đáng ngờ: Nam bồi bàn bị bắt quả tang sim rác; bà mẹ kế đòi tìm xác dưới sông; còn Minh Khang thì thúc giục chủ tịch chuyển 3 tỷ tiền chuộc ngay!',
      },
      {
        id: 't2',
        from: 'me',
        time: '22:16',
        text: 'Em vừa kiểm tra mạn thuyền nơi rơi chiếc vòng kim cương, không hề có vết cào cấu hay trượt ngã, chiếc vòng như được cố tình gài vào dây neo!',
      },
      {
        id: 't3',
        from: 'them',
        time: '22:17',
        text: 'Nhận định rất sắc bén! Em kiểm tra [📹 Camera Bến Sông](https://camera-phuong.gov.vn) xem có phương tiện thủy nào tiếp cận lúc 21:50, và vào [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) kiểm tra lịch sử mua sắm của nạn nhân!',
      },
      {
        id: 't4',
        from: 'me',
        time: '22:46',
        text: 'Anh Tùng ơi! Lệnh chuyển tiền chuộc 3 tỷ trên VietinBank vừa được chuyển vào tài khoản của Minh Khang với danh nghĩa trung gian cứu hộ!',
        requires: ['vietinbank-chuyen-tien-chuoc'],
      },
      {
        id: 't5',
        from: 'them',
        time: '22:47',
        text: 'Rõ như ban ngày! Đây là vụ TỰ DÀN DỰNG BẮT CÓC để tống tiền cha ruột! Hồ sơ vụ án khoá bằng 4 số: chính là GIỜ THẢO MY BƯỚC XUỐNG CA NÔ TẨU THOÁT trên camera bến sông (định dạng HHMM: 2150)!',
        requires: ['vietinbank-chuyen-tien-chuoc'],
      },
      {
        id: 't6',
        from: 'me',
        time: '22:48',
        text: 'Em đã có đủ chứng cứ vạch mặt Minh Khang chủ mưu và Thảo My đồng phạm, nhập mã 2150 mở hồ sơ bắt gọn ngay!',
        requires: ['vietinbank-chuyen-tien-chuoc'],
      },
      {
        id: 't7',
        from: 'them',
        time: '22:49',
        text: 'Phá án ngay đi em! Lực lượng cảnh sát đường thủy đã áp sát ca nô ở phao số 4!',
        requires: ['vietinbank-chuyen-tien-chuoc'],
      },
    ],
  },
  {
    id: 'nam-boi-ban',
    name: 'Nam Bồi Bàn',
    avatar: '🧑‍🍳',
    sub: 'Đang bị giữ tại phòng an ninh',
    preview: 'Tôi bị người ta nhét điện thoại vào túi!',
    requires: ['mat-tich-con-tin'],
    messages: [
      {
        id: 'n1',
        from: 'them',
        time: '22:18',
        text: 'Thưa thám tử, tôi thề có trời đất chứng giám tôi không bắt cóc ai cả! Tôi làm bồi bàn ở đây 2 năm rồi!',
      },
      {
        id: 'n2',
        from: 'me',
        time: '22:19',
        text: 'Vậy chiếc điện thoại sim rác đòi 10 tỷ tiền chuộc tại sao lại nằm trong túi tạp dề của anh?',
      },
      {
        id: 'n3',
        from: 'them',
        time: '22:20',
        text: 'Lúc 22:05 tôi bưng khay rượu qua hành lang tối tầng 3, anh Minh Khang vị hôn phu đi ngược chiều va rất mạnh vào người tôi làm rơi ly rượu! Chắc chắn chính anh ta đã lén nhét chiếc điện thoại đó vào túi tôi!',
      },
      {
        id: 'n4',
        from: 'me',
        time: '22:21',
        text: 'Còn tin rao bán xe máy trên [🛍️ Chợ Tốt](https://chotot.vn) mã CT-688 của anh là sao?',
      },
      {
        id: 'n5',
        from: 'them',
        time: '22:22',
        text: 'Đó là xe Wave cũ tôi đăng bán 6 triệu từ 4 hôm trước để đóng tiền nhà trọ sinh viên thôi! Tôi đâu có cần đến 10 tỷ!',
        clue: 'chotot-ban-xe',
      },
      {
        id: 'n6',
        from: 'me',
        time: '22:23',
        text: 'Được rồi Nam, lời khai của anh về thời gian va chạm với Minh Khang hoàn toàn khớp với diễn biến cuộc gọi tống tiền.',
      },
    ],
  },
  {
    id: 'minh-khang',
    name: 'Minh Khang (Hôn Phu)',
    avatar: '🤵',
    sub: 'Đang túc trực bên Chủ tịch',
    preview: 'Tôi đang nỗ lực cứu vợ sắp cưới của mình!',
    requires: ['mat-tich-con-tin'],
    messages: [
      {
        id: 'mk1',
        from: 'them',
        time: '22:25',
        text: 'Chào thám tử, tôi đang đau đớn đến nghẹt thở đây. Bọn bắt cóc ra hạn chót 23:00 phải chuyển 3 tỷ vào tài khoản trung gian của tôi để tôi chuộc My về!',
      },
      {
        id: 'mk2',
        from: 'me',
        time: '22:26',
        text: 'Lúc 21:40 khi Thảo My ra mạn thuyền, anh ở đâu và làm gì?',
      },
      {
        id: 'mk3',
        from: 'them',
        time: '22:27',
        text: 'Tôi ngồi trong bàn tiệc tiếp rượu các đối tác cổ đông, cả chục người làm chứng cho tôi! Tôi hoàn toàn không rời khỏi phòng tiệc!',
      },
      {
        id: 'mk4',
        from: 'me',
        time: '22:35',
        text: 'Thế nhưng lúc 21:30, ai là người dùng tài khoản của anh đặt cuốc [⚡ GiaoNhanh](https://giaonhanh.vn) GN-99801 chuyển 2 vali hàng hiệu của Thảo My ra phao neo đậu số 4 ngoài sông?',
        requires: ['giaonhanh-ca-no'],
      },
      {
        id: 'mk5',
        from: 'them',
        time: '22:36',
        text: '...Đó... đó là đồ diễn thời trang của My gửi đi giặt hấp... Thám tử đừng hỏi vớ vẩn làm mất thời gian cứu người!',
      },
      {
        id: 'mk6',
        from: 'me',
        time: '22:46',
        text: 'Hơn nữa, trên [🏦 VietinBank](https://vietinbank.vn) TX-77102, 3 tỷ tiền chuộc vừa đổ vào tài khoản anh, anh liền đặt vé máy bay đi Bangkok lúc 01:00 đêm nay! Khang, anh hết đường chối cãi rồi!',
        requires: ['vietinbank-chuyen-tien-chuoc'],
        clue: 'vietinbank-chuyen-tien-chuoc',
      },
      {
        id: 'mk7',
        from: 'them',
        time: '22:47',
        text: '...Khốn kiếp! Làm sao các người tra ra được giao dịch nhanh như vậy?! Là do con My nó đòi tiền bố nó trước chứ không phải một mình tôi!',
        requires: ['vietinbank-chuyen-tien-chuoc'],
      },
    ],
  },
  {
    id: 'thao-my',
    name: 'Thảo My (Sim bí mật)',
    avatar: '💃',
    sub: 'Vừa kết nối mạng trên ca nô',
    preview: 'Ai đấy? Sao lại nhắn vào số bí mật này?!',
    requires: ['camera-ben-thuyen'],
    messages: [
      {
        id: 'tm1',
        from: 'them',
        time: '22:38',
        text: 'Ai đấy?! Sao anh lại biết số máy bí mật này của tôi?! Anh Khang đâu rồi?!',
      },
      {
        id: 'tm2',
        from: 'me',
        time: '22:39',
        text: 'Tôi là thám tử điều tra. Thảo My, trên [📹 Camera Bến Sông](https://camera-phuong.gov.vn) ghi rõ cô trùm áo mưa tím bước xuống ca nô CN-082 lúc 21:50, hoàn toàn không có ai bắt cóc cô cả!',
        clue: 'camera-ben-thuyen',
      },
      {
        id: 'tm3',
        from: 'them',
        time: '22:40',
        text: '...Các người không hiểu được đâu! Bố tôi ép tôi chia tay anh Khang, đóng băng hết thẻ ngân hàng của tôi! Tôi chỉ lấy lại số tiền vốn dĩ thuộc về tôi thôi!',
      },
      {
        id: 'tm4',
        from: 'me',
        time: '22:41',
        text: 'Chiều nay 17:15 cô còn ra [💊 Nhà Thuốc Long Châu](https://nhathuoc-longchau42.vn) mua thuốc ngủ và thuốc nhuộm tóc vàng để cải trang trốn chạy cùng Khang sang Thái Lan!',
        clue: 'longchau-thuoc-an-than',
      },
      {
        id: 'tm5',
        from: 'them',
        time: '22:42',
        text: '...Anh Khang bảo kế hoạch tống tiền này êm xuôi 100%, tiền về là hai đứa bay ngay... Hoá ra anh ta chỉ lợi dụng tôi để lấy 10 tỷ trả nợ cờ bạc...',
        clue: 'tin-nhan-thoa-thuan',
      },
    ],
  },
]

export const ORDERS: Order[] = [
  {
    id: 'GN-99801',
    time: '21:30',
    pickup: 'Bến Du Thuyền Sông Hồng (Minh Khang)',
    drop: 'Phao Neo Đậu Số 4 (2 Vali hàng hiệu Thảo My)',
    fee: '120.000đ',
    status: 'Đã hoàn tất',
    clue: 'giaonhanh-ca-no',
  },
  {
    id: 'TX-77102',
    time: '22:45',
    pickup: 'Chủ Tịch Tập Đoàn → Minh Khang',
    drop: '3.000.000.000đ (VietinBank)',
    fee: 'Tiền chuộc con gái',
    status: 'Thành công',
    clue: 'vietinbank-chuyen-tien-chuoc',
  },
]

export const PHOTOS: Photo[] = [
  {
    id: 'p1',
    title: 'Chiếc vòng kim cương ở lan can mạn thuyền',
    time: '21:42',
    scene: 'street',
    img: 'detective/case6-vong-tay.jpg',
    caption: 'Chiếc vòng vướng khéo léo vào sợi dây neo không có vết trượt ngã.',
    clue: 'vong-tay-man-thuyen',
    hotspots: [
      {
        x: 48,
        y: 52,
        label: 'Khóa móc vòng tay',
        hint: 'Quan sát kỹ khóa móc vòng tay và mặt sàn lan can',
        clue: 'vong-tay-man-thuyen',
        detail:
          'Chiếc vòng tay kim cương đắt đỏ được gài cẩn thận vào chốt dây neo mạn thuyền, không hề có dấu vết đứt gãy do giằng co hay vết trượt chân ngã sông. Đây là hiện trường giả mạo 100%!',
      },
    ],
  },
  {
    id: 'p2',
    title: 'Vết áo mưa tím trên bậc thang ca nô',
    time: '21:55',
    scene: 'tea',
    img: 'detective/case6-ca-no.jpg',
    caption: 'Dấu vết bước chân giày cao gót hướng xuống ca nô lúc 21:50.',
    clue: 'camera-ben-thuyen',
  },
]

export const TRASH: TrashItem[] = [
  {
    id: 'tr1',
    name: 'hop-thuoc-nhuom-toc.jpg',
    kind: 'Vỏ hộp mỹ phẩm vứt ở phòng thay đồ',
    preview: 'Hộp thuốc nhuộm tóc màu vàng đồng L’Oreal',
    detail: 'Hộp thuốc nhuộm tóc Thảo My mua tại Long Châu lúc 17:15 dùng để đổi màu tóc trước khi trốn xuống ca nô.',
    clue: 'longchau-thuoc-an-than',
  },
  {
    id: 'tr2',
    name: 've-may-bay-bangkok.txt',
    kind: 'Xác nhận đặt vé trực tuyến',
    preview: 'Chuyến bay VN-611 Hà Nội - Bangkok lúc 01:20 đêm nay',
    detail: 'Đặt vé máy bay khẩn cấp cho 2 hành khách: Lê Minh Khang và Nguyễn Thảo My đặt lúc 19:30 trước giờ tiệc sinh nhật.',
    clue: 'tin-nhan-thoa-thuan',
  },
]
