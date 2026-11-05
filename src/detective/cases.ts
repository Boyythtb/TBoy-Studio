import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem, SearchRecord } from './case1'
import {
  CASE as CASE1,
  CLUES as CLUES1,
  CONVS as CONVS1,
  ORDERS as ORDERS1,
  PHOTOS as PHOTOS1,
  SUSPECTS as SUSPECTS1,
  TRASH as TRASH1,
} from './case1'
import {
  CASE as CASE2,
  CLUES as CLUES2,
  CONVS as CONVS2,
  ORDERS as ORDERS2,
  PHOTOS as PHOTOS2,
  SUSPECTS as SUSPECTS2,
  TRASH as TRASH2,
} from './case2'
import {
  CASE as CASE3,
  CLUES as CLUES3,
  CONVS as CONVS3,
  ORDERS as ORDERS3,
  PHOTOS as PHOTOS3,
  SUSPECTS as SUSPECTS3,
  TRASH as TRASH3,
} from './case3'
import {
  CASE as CASE4,
  CLUES as CLUES4,
  CONVS as CONVS4,
  ORDERS as ORDERS4,
  PHOTOS as PHOTOS4,
  SUSPECTS as SUSPECTS4,
  TRASH as TRASH4,
} from './case4'
import {
  CASE as CASE5,
  CLUES as CLUES5,
  CONVS as CONVS5,
  ORDERS as ORDERS5,
  PHOTOS as PHOTOS5,
  SUSPECTS as SUSPECTS5,
  TRASH as TRASH5,
} from './case5'
import {
  CASE as CASE6,
  CLUES as CLUES6,
  CONVS as CONVS6,
  ORDERS as ORDERS6,
  PHOTOS as PHOTOS6,
  SUSPECTS as SUSPECTS6,
  TRASH as TRASH6,
} from './case6'

export interface CaseMeta {
  no: string
  title: string
  place: string
  time: string
  brief: string
  culprit: string
  difficulty: string
  question: string
  solution: string
}

export interface NewsDef {
  title: string
  lead: string
  body: string
}

export interface CaseComment {
  user: string
  avatar: string
  time: string
  content: string
  clue?: string
  clueLabel?: string
}

export interface CasePack {
  /** dùng cho localStorage: tboy.detective.<id>.v1 */
  id: string
  difficulty: string
  maxTries: number
  /** khoá 4 số cuối, nếu có phải nhập đúng mới được cáo buộc */
  /** id đồng phạm: phải chỉ đúng sau khi xác định thủ phạm */
  accomplice?: string
  news: NewsDef
  comment: CaseComment
  ordersTitle: string
  searchSuggestions: string[]
  searchRecords: SearchRecord[]
  case: CaseMeta
  clues: Record<string, ClueDef>
  convs: Conv[]
  orders: Order[]
  photos: Photo[]
  suspects: Suspect[]
  trash: TrashItem[]
}

export const CASES: CasePack[] = [
  // =========================================================================
  // VỤ ÁN 01: CHIẾC XE ĐẠP ĐIỆN (HẺM 42)
  // =========================================================================
  {
    id: 'hem42',
    difficulty: 'Dễ',
    maxTries: 3,
    news: {
      title: 'Mất xe đạp điện giữa hẻm 42 trong đêm mất điện camera an ninh',
      lead: 'Tối thứ Sáu 12/9, chiếc xe đạp điện Nijia màu xanh mint của cô Lan dựng trước sân nhà đã biến mất trong khoảng từ 21:10 đến 21:40. Cổng ngõ mở toang, người dân trong hẻm nghi ngờ lẫn nhau.',
      body: 'Hiện trường cho thấy camera ngõ bị ngắt điện từ 20:00 do bảo vệ rút nhầm phích cắm khi quét dọn. Cơ quan điều tra đang thu thập dữ liệu định vị viễn thông, camera giao thông khu vực xung quanh và lịch sử giao dịch trực tuyến.',
    },
    comment: {
      user: 'cu_dan_42',
      avatar: '👀',
      time: '1 giờ trước',
      content: '"Hôm qua ngõ tối om, tầm 21h30 nghe tiếng then cổng sắt kêu lách cách rồi có tiếng xe chạy vút ra hướng ngã tư!"',
      clue: 'dung-khai-21h15',
      clueLabel: 'Ghi nhận mốc thời gian cổng sắt mở lúc 21h30',
    },
    ordersTitle: '📱 Nhật ký máy chủ GiaoNhanh & Camera ngã tư – Đêm xảy ra vụ án',
    searchSuggestions: ['Dũng', 'Vy', 'Sơn', 'Camera 102', 'GN-88214', 'Chợ Tốt', 'Hùng Motor', 'Long Châu'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Viễn thông',
        title: 'Biên bản xác minh viễn thông: Thuê bao di động & Wi-Fi phòng trọ 203',
        keywords: ['dũng', 'dung', 'phòng trọ', 'ngoại phạm', 'wifi', 'thuê bao', 'xác minh'],
        snippet: 'Ghi nhận tín hiệu thiết bị cá nhân của Nguyễn Văn Dũng tại phòng trọ 203 trong khung giờ 21:00 - 22:15.',
        content:
          'Trích xuất kỹ thuật nhà mạng & Wi-Fi nội bộ hẻm 42:\n- Thuê bao: Nguyễn Văn Dũng (phòng 203)\n- Trạng thái thiết bị chính: Kết nối ổn định vào trạm phát Wi-Fi nội bộ (AP-Room203) liên tục từ 21:14 đến 22:20.\n- Tin nhắn Zola: Tự động trả lời "Tôi bị sốt đang nghỉ ngơi, vui lòng liên hệ lại sáng mai" gửi đi lúc 21:35.\n- Đánh giá ban đầu: Dũng có chứng cứ ngoại phạm điện tử tại thời điểm vụ trộm diễn ra (21:10 - 21:40).',
        clue: 'dung-khai-21h15',
        clueLabel: 'Lưu xác minh Wi-Fi phòng 203 & tin nhắn tự động của Dũng',
      },
      {
        id: 'sr2',
        category: 'Viễn thông',
        title: 'Đối soát máy chủ GiaoNhanh: Cơ chế Auto-Dispatch đơn hàng GN-88214',
        keywords: ['21:47', 'đơn hàng', 'gn-88214', 'lộ trình', 'định vị', 'gps', 'auto dispatch', 'máy chủ', 'sh-4209'],
        snippet: 'Máy chủ tự động gán đơn hàng cho thiết bị phụ di chuyển ngoài đường lúc 21:47.',
        content:
          'Trích xuất cơ sở dữ liệu hệ thống GiaoNhanh (giaonhanh.vn):\n- Mã đơn hàng: GN-88214\n- Cơ chế gán: Tự động phát cuốc theo định vị GPS (Auto-Dispatch Nearest Driver).\n- Tài xế tiếp nhận: Mã định danh SH-4209 (Nguyễn Văn Dũng)\n- Thiết bị nhận lệnh: Smartphone phụ (Device IMEI: 8642***991, khác với máy chính ở phòng trọ)\n- Vị trí GPS lúc 21:47: Tọa độ 21.0335, 105.8502 (Đầu Hẻm 42 cắt ngã tư Hàng Chai)\n- Lật tẩy thủ thuật Conan: Dũng để máy chính ở phòng phát radio để tạo ngoại phạm giả, nhưng mang máy phụ theo người. Khi dắt xe qua ngã tư, máy phụ tự động nhận cuốc GN-88214 làm lộ vị trí GPS ngoài đường!',
        clue: 'don-hang-2147',
        clueLabel: 'Lưu bản ghi GPS máy phụ đơn GN-88214 lúc 21:47',
      },
      {
        id: 'sr3',
        category: 'Camera',
        title: 'Trích xuất Camera giao thông CAM-102 (Ngã tư Hàng Chai - Cửa Đông)',
        keywords: ['camera', 'an ninh', 'ngã tư', 'xanh mint', '21:49', 'cam-102', 'xe kéo'],
        snippet: 'Ghi nhận phương tiện và người tham gia giao thông qua ngã tư lúc 21:49:15.',
        content:
          'Trích xuất luồng hình ảnh camera an ninh công cộng CAM-102 (camera-phuong.gov.vn):\n- Mốc thời gian: 21:49:15\n- Đối tượng: Một người điều khiển xe máy wave đỏ mang áo khoác gió đồng phục GiaoNhanh, tay trái kéo theo một phương tiện hai bánh phủ bạt màu xanh mint phóng nhanh theo hướng Hẻm 44.\n- Đặc điểm phương tiện: Giỏ trước xe kéo có treo một túi vải hoa văn.',
        clue: 'don-hang-2147',
        clueLabel: 'Lưu hình ảnh camera xe kéo lúc 21:49',
      },
      {
        id: 'sr4',
        category: 'Cảnh sát',
        title: 'Sàn Chợ Tốt: Lịch sử tin đăng tài khoản vy.socute (Mã CT-101)',
        keywords: ['vy', 'chợ tốt', 'chotot', 'xe đỏ', 'asama', 'tiền trọ'],
        snippet: 'Thông tin kỹ thuật và thời gian đăng bài rao bán phương tiện của Vy.',
        content:
          'Dữ liệu đối soát tin đăng trên sàn thương mại điện tử Chợ Tốt (chotot.vn):\n- Mã tin đăng: CT-101\n- Người đăng: Nguyễn Thùy Trúc Vy (vy.socute, SĐT: 0984***219)\n- Sản phẩm: Xe đạp điện Asama màu Đỏ nguyên bản (kèm ảnh chụp hoá đơn mua hàng năm 2023)\n- Giá rao: 2.500.000 VND\n- Thời gian khởi tạo tin: 18:02 ngày 09/9 (3 ngày trước khi vụ án xảy ra).',
        clue: 'vy-xe-do',
        clueLabel: 'Lưu xác minh tin đăng xe đỏ của Vy từ 3 ngày trước',
      },
      {
        id: 'sr5',
        category: 'Cảnh sát',
        title: 'Sổ giao dịch công nợ: Tiệm sửa xe & Dịch vụ net Hùng Motor',
        keywords: ['hùng', '5 triệu', 'nợ', 'sửa xe', 'hạn chót', 'sổ nợ', 'sh-4209'],
        snippet: 'Biên bản ghi nhận khoản nợ phụ tùng và lịch hẹn thanh toán đêm 12/9.',
        content:
          'Sổ công nợ viết tay của chủ cơ sở Hùng Motor đêm 12/9:\n- Khách 1: Vy sinh viên (nợ 150k tiền nước ngọt & photo)\n- Khách 2: Sơn NowFood (nợ 300k tiền vá săm lốp)\n- Khách 3: Mã thẻ shipper #SH-4209 (nợ 5.000.000 VND thay bộ điều tốc & bình ắc quy xe máy, quá hạn 14 ngày, cam kết hạn chót thanh toán dứt điểm trước 22:00 đêm 12/9, nếu quá hạn sẽ bị giữ phương tiện hành nghề).',
        clue: 'hung-cho-vay',
        clueLabel: 'Lưu sổ công nợ mã SH-4209 hạn chót đêm 12/9',
      },
    ],
    case: CASE1,
    clues: CLUES1,
    convs: CONVS1,
    orders: ORDERS1,
    photos: PHOTOS1,
    suspects: SUSPECTS1,
    trash: TRASH1,
  },

  // =========================================================================
  // VỤ ÁN 02: CHIẾC ĐIỆN THOẠI TRONG TỦ ĐỒ (SÂN CẦU LÔNG)
  // =========================================================================
  {
    id: 'tu-do',
    difficulty: 'Trung bình',
    maxTries: 3,
    news: {
      title: 'Mất cắp iPhone 14 Pro Max trong tủ đồ khoá số tại sân cầu lông Hẻm 42',
      lead: 'Tối thứ Bảy 19/9, chị Hạnh trình báo mất chiếc iPhone 14 Pro Max trị giá gần 20 triệu cất trong ngăn tủ cá nhân số 04 có khoá số bảo vệ. Đáng ngờ là ổ khoá vẫn nguyên vẹn.',
      body: 'Ngay sau đó, một tin đăng bán chiếc điện thoại đúng số serial xuất hiện trên Chợ Tốt với số điện thoại liên hệ là của Hào Smash - tay vợt đang thi đấu giao hữu tại sân. Cảnh sát đang phong toả hiện trường để kiểm tra kỹ thuật.',
    },
    comment: {
      user: 'vot_thu_42',
      avatar: '🏸',
      time: '30 phút trước',
      content: '"Lúc 20h28 thấy Hào mở tủ số 07 lấy đồ rồi càu nhàu gì đó, xong chạy ra sân đánh set 3 luôn!"',
      clue: 'hao-gan-tu',
      clueLabel: 'Ghi nhận Hào mở tủ số 07 lúc 20h28',
    },
    ordersTitle: '🏸 Lịch thi đấu & Camera bãi xe – Sân cầu lông Hẻm 42',
    searchSuggestions: ['Sơn', 'Hào', 'Linh', 'Camera Sân 2', 'Tủ đồ 04', 'Chợ Tốt', 'CAM-201', 'Long Châu'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Camera',
        title: 'Báo cáo kỹ thuật giám sát sân: Chứng cứ ngoại phạm của vận động viên Sơn',
        keywords: ['sơn', 'son', 'ngoại phạm', 'áo khoác đỏ', 'giám sát', 'set 2', 'alibi', 'sân 3'],
        snippet: 'Ghi nhận đối tượng mặc áo khoác đỏ số 09 ngồi tại khu vực kỹ thuật sân 3 trong suốt set 2.',
        content:
          'Báo cáo giám sát kỹ thuật CLB Pickleball Hẻm 42:\n- Nhân sự: Trần Hồng Sơn (số áo 09)\n- Chứng cứ ngoại phạm: Toàn bộ camera góc rộng sân số 2 ghi nhận một người mặc áo khoác nỉ thể thao màu đỏ phản quang in số 09 sau lưng ngồi trên băng ghế kỹ thuật theo dõi trận đấu liên tục từ 20:30 đến 21:00.\n- Đánh giá sơ bộ: Sơn không hề rời khỏi khu vực sân thi đấu trong suốt thời điểm tủ đồ số 04 bị cạy phá.',
        clue: 'hao-o-san-2',
        clueLabel: 'Lưu ghi nhận ngoại phạm áo khoác đỏ số 09 của Sơn',
      },
      {
        id: 'sr2',
        category: 'Cảnh sát',
        title: 'Sàn Chợ Tốt: Tin rao bán thiết bị Apple mã tin CT-201',
        keywords: ['chợ tốt', 'chotot', 'iphone', 'rao bán', '5 triệu', 'hào', 'ct-201'],
        snippet: 'Thông số kỹ thuật và địa chỉ IP đăng tải tin rao vặt lúc 20:44.',
        content:
          'Dữ liệu từ sàn Chợ Tốt (chotot.vn):\n- Mã tin: CT-201 lúc 20:44:12\n- Tiêu đề: Bán nhanh iPhone 14 Pro Max Deep Purple, pin 91%, không phụ kiện, giá 5.500.000 VND\n- Số điện thoại liên hệ trong bài: 0912***888 (Số của Hào Smash)\n- Địa chỉ IP khởi tạo: 118.70.192.44 (Wi-Fi miễn phí khu vực bãi xe sân cầu lông)\n- Số Serial máy tra cứu: F2LZ7***0D8 (Khớp 100% với số máy chị Hạnh bị mất cắp).\n- Đáng chú ý: Ảnh chụp trong buồng vệ sinh bãi xe vô tình để lộ một góc thẻ nhân viên nhặt cầu mang số 09!',
        clue: 'tin-nhan-ban',
        clueLabel: 'Lưu tin đăng bán iPhone trên Chợ Tốt',
      },
      {
        id: 'sr3',
        category: 'Camera',
        title: 'Camera Sân Thi Đấu Số 2: Lịch trình trận đấu giao hữu của Hào',
        keywords: ['hào', 'sân 2', 'thi đấu', 'camera', 'set 3', 'ngoại phạm'],
        snippet: 'Ghi nhận Hào thi đấu liên tục trên sân 2 từ 20:30 đến 21:00.',
        content:
          'Camera sân thi đấu số 2:\n- Vận động viên: Hào Smash\n- Lịch thi đấu: Thi đấu set 3 trận đôi nam từ 20:30 đến 21:00 liên tục không rời sân một phút nào trước sự chứng kiến của trọng tài bàn và hơn 10 khán giả.\n- Hào có chứng cứ ngoại phạm chắc chắn, việc số điện thoại xuất hiện trên Chợ Tốt là do kẻ gian cố tình gài bẫy vu khống!',
        clue: 'hao-o-san-2',
        clueLabel: 'Lưu alibi thi đấu trên sân 2 của Hào',
      },
      {
        id: 'sr4',
        category: 'Cảnh sát',
        title: 'Biên bản kỹ thuật khám nghiệm hiện trường tủ cá nhân số 04',
        keywords: ['khám nghiệm', 'tủ đồ', 'khe hở', 'vách tôn', 'khoá', 'móc sắt'],
        snippet: 'Dấu vết cạy phá cơ học tại khe hẹp tôn phía sau nóc tủ số 04.',
        content:
          'Biên bản khám nghiệm hiện trường tủ đồ số 04:\n- Khóa số và then cài mặt trước hoàn toàn nguyên vẹn.\n- Đinh tôn phía sau nóc tủ bị bẩy lỏng, tạo một khe hở hẹp 4cm thông ra lối đi kỹ thuật bãi xe sau vách tôn.\n- Mép tôn bén dính một sợi chỉ vải màu đỏ và vết máu tươi nhỏ.\n- Thủ phạm đã dùng móc sắt luồn từ phía sau để gắp chiếc iPhone!',
        clue: 'lo-hong-tu',
        clueLabel: 'Lưu dấu vết cạy phá khe tôn nóc tủ số 04',
      },
      {
        id: 'sr5',
        category: 'Camera',
        title: 'Trích xuất Camera bãi xe CAM-201: Khe hẹp vách tôn sau dãy tủ lúc 20:45',
        keywords: ['camera', 'bãi xe', 'cam-201', 'lối sau', 'áo ba lỗ', 'vết xước', '20:45'],
        snippet: 'Phát hiện bóng người mặc áo thun ba lỗ đen lẻn qua khe vách tôn lúc 20:45.',
        content:
          'Trích xuất camera an ninh CAM-201 bãi xe sau dãy tủ:\n- Lúc 20:45, một thanh niên mặc áo thun ba lỗ đen (không mặc áo khoác) lách qua khe hẹp vách tôn phía sau tủ số 04 với động tác vội vã, tay trái ôm chặt cổ tay có vết rách chảy máu.\n- Lật tẩy thủ thuật Conan: Sơn đã cởi chiếc áo khoác đỏ số 09 trùm lên chiếc bao cầu lớn ở ghế kỹ thuật để đánh lừa camera từ xa, trong khi lẻn ra sau vách tôn cạy tủ và bị mép tôn cứa rách tay!',
        clue: 'son-vet-xuoc',
        clueLabel: 'Lưu hình ảnh camera lối sau vách tôn lúc 20:45',
      },
    ],
    case: CASE2,
    clues: CLUES2,
    convs: CONVS2,
    orders: ORDERS2,
    photos: PHOTOS2,
    suspects: SUSPECTS2,
    trash: TRASH2,
  },

  // =========================================================================
  // VỤ ÁN 03: CHIẾC HÒM QUỸ ĐÊM HỘI CHỢ
  // =========================================================================
  {
    id: 'hoi-cho',
    difficulty: 'Khó',
    maxTries: 3,
    news: {
      title: 'Hòm quỹ từ thiện Hội chợ Trung thu bị rút ruột 8 triệu đồng trong đêm mất điện',
      lead: 'Tối thứ Bảy 26/9, sự cố nhảy aptomat khiến toàn bộ sân đình Hẻm 42 chìm trong bóng tối 15 phút (20:55 - 21:10). Khi có điện trở lại, hòm quỹ từ thiện bằng gỗ lim bị phát hiện đã mất 8 triệu đồng tiền mặt.',
      body: 'Ổ khoá bấm không hề bị cắt mà được mở bằng chìa khoá từ góc khuất phía sau bệ đá. Dấu vết bùn đỏ đất sét tại bãi trũng mới đào sau đình và biến động giao dịch ngân hàng là manh mối then chốt.',
    },
    comment: {
      user: 'dan_lang_42',
      avatar: '🏮',
      time: '15 phút trước',
      content: '"Lúc 20h48 thấy Khoa lúi húi cúi nhặt gì đó sát bệ đá hòm quỹ rồi đi vội về phía cổng!"',
      clue: 'khoa-gan-hom',
      clueLabel: 'Ghi nhận Khoa cúi cạnh bệ hòm lúc 20h48',
    },
    ordersTitle: '🏮 Bảng kê thu chi & Camera Tam Quan – Hội chợ Trung thu',
    searchSuggestions: ['Trang', 'Tú', 'Khoa', 'Tam Quan', 'VietinBank', 'CAM-302', 'Bùn đỏ', 'Hòm quỹ'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Cảnh sát',
        title: 'Biên bản ban trị sự & Công an phường: Xác minh vị trí tình nguyện viên Trang',
        keywords: ['trang', 'ngoại phạm', 'tam quan', 'phát cơm', 'thiện nguyện', 'hoa đăng', 'alibi'],
        snippet: 'Ghi nhận Trang đứng tại bàn phát cơm chay thiện nguyện sảnh Tam Quan suốt 20:15 - 21:15.',
        content:
          'Biên bản điều tra hiện trường số 1508/BB-CA:\n- Đối tượng xác minh: Nguyễn Thị Huyền Trang (trưởng nhóm thiện nguyện)\n- Chứng cứ ngoại phạm: Hơn 200 Phật tử và Camera Tam Quan CAM-302 ghi nhận hình ảnh cô gái mặc áo lam thiện nguyện, đeo khẩu trang hoa sen đứng múc cơm chay và phát hoa đăng liên tục tại bàn phát lộc suốt từ 20:15 đến 21:15 không hề rời vị trí.\n- Kết luận ban đầu: Trang có chứng cứ ngoại phạm sắt đá, hoàn toàn vô can trước vụ cạy két hòm công đức.',
        clue: 'chia-ket',
        clueLabel: 'Lưu xác minh alibi phát cơm tại Tam Quan của Trang',
      },
      {
        id: 'sr2',
        category: 'Ngân hàng',
        title: 'Sao kê đối soát VietinBank: Lệnh nạp tiền ví điện tử qua mã QR lúc 21:32',
        keywords: ['chuyển tiền', 'vietinbank', '21:32', '8 triệu', 'nợ', 'tx-99812', 'ví điện tử', 'sao kê'],
        snippet: 'Lịch sử biến động số dư tài khoản thanh toán dứt điểm khoản nợ tín dụng.',
        content:
          'Trích lục sao kê hệ thống VietinBank (vietinbank.vn):\n- Mã giao dịch: TX-99812 lúc 21:32:15\n- Tài khoản trích nộp: 1088***992 (Nguyễn Thị Thu Trang)\n- Số tiền: +8.000.000 VND tiền mặt nạp chia nhỏ qua mã QR ví điện tử trên điện thoại di động.\n- Lệnh chuyển khoản ngay sau đó lúc 21:33:00: Chuyển 8.000.000 VND cho tài khoản chủ nợ tín dụng với nội dung "Trang tra xong no goc thang 8".',
        clue: 'chuyen-tien-trang',
        clueLabel: 'Lưu lệnh nạp 8.000.000đ thanh toán nợ lúc 21:32',
      },
      {
        id: 'sr3',
        category: 'Camera',
        title: 'Trích xuất Camera CAM-302: Cổng Tam Quan đình làng lúc 21:02',
        keywords: ['camera', 'tam quan', 'cam-302', 'bùn đỏ', 'giày', 'tạp dề', '21:02'],
        snippet: 'Phân tích dấu vết bùn đất đỏ bám trên giày thể thao của đối tượng lúc 21:02.',
        content:
          'Trích xuất Camera an ninh cổng Tam Quan CAM-302:\n- Mốc thời gian: 21:02:40\n- Hình ảnh: Trang quay lại bàn phát lộc sau 15 phút nhờ tình nguyện viên mới đến đeo khẩu trang hoa sen đứng thay. Đôi giày thể thao trắng của Trang dính vệt bùn đất đỏ đặc thù.\n- Giám định địa chất: Loại bùn đất đỏ này chỉ có duy nhất ở bờ rãnh sau bể quy (lối đi bí mật dẫn thẳng vào cửa sổ phòng lưu trữ hòm quỹ), trong khi toàn bộ sân Tam Quan là nền gạch men sạch bóng!',
        clue: 'trang-giay',
        clueLabel: 'Lưu vết bùn đỏ trên giày tại Tam Quan lúc 21:02',
      },
      {
        id: 'sr4',
        category: 'Cảnh sát',
        title: 'Biên lai tiếp nhận cấp cứu ngoại viện: Nhà thuốc & Phòng khám Long Châu',
        keywords: ['khoa', 'long châu', 'bỏng', '20:42', 'sơ cứu', 'nước sôi'],
        snippet: 'Ghi nhận Khoa bị bỏng nước sôi mu bàn tay phải lúc 20:40.',
        content:
          'Biên bản khám ngoại viện Nhà Thuốc Long Châu chi nhánh Đình Làng:\n- Bệnh nhân: Lê Đăng Khoa\n- Thời điểm: 20:42\n- Chẩn đoán: Bỏng nước sôi cấp độ 2 toàn bộ mu bàn tay phải trong khi bưng ấm nước tại nhà bếp đình. Bàn tay được rửa vết bỏng và quấn băng gạc to cố định ngón tay đến 21:20, hoàn toàn không thể thực hiện thao tác cơ học mở khóa hòm quỹ.',
        clue: 'khoa-bi-thuong',
        clueLabel: 'Lưu biên lai sơ cứu bỏng tay của Khoa lúc 20:42',
      },
      {
        id: 'sr5',
        category: 'Camera',
        title: 'Trích xuất Camera CAM-301: Quán Trà Phúc (Đối diện cổng đình)',
        keywords: ['tú', 'quán trà', 'phúc', 'camera', 'alibi', 'tiền mặt', 'cam-301'],
        snippet: 'Ghi nhận Tú ngồi uống trà liên tục từ 20:55 đến 21:25.',
        content:
          'Camera giám sát CAM-301 của Quán Trà Phúc:\n- Đối tượng: Tú Tài Chính\n- Khung giờ: Ngồi liên tục tại bàn ngoài hiên từ 20:55 đến 21:25 cùng bạn bè uống trà chanh, không hề rời quán trong suốt 15 phút xảy ra sự cố mất điện hòm quỹ.\n- Tú có chứng cứ ngoại phạm vững chắc.',
        clue: 'tu-camera-alibi',
        clueLabel: 'Lưu alibi camera quán trà Phúc của Tú',
      },
    ],
    case: CASE3,
    clues: CLUES3,
    convs: CONVS3,
    orders: ORDERS3,
    photos: PHOTOS3,
    suspects: SUSPECTS3,
    trash: TRASH3,
  },

  // =========================================================================
  // VỤ ÁN 04: ĐÊM MẤT ĐIỆN Ở CHUNG CƯ 42 (CHỦ MƯU + ĐỒNG PHẠM)
  // =========================================================================
  {
    id: 'chung-cu',
    difficulty: 'Siêu khó',
    maxTries: 3,
    accomplice: 'tu',
    news: {
      title: 'Đêm mất điện bí ẩn tại Chung cư 42: Két sắt 200 triệu bị vét sạch',
      lead: 'Khoảng 21:10 tối 20/10, toàn bộ hầm B1 và thang máy chung cư bị cắt điện đột ngột. Tại phòng Ban Quản lý tầng 2, chiếc két sắt chứa 200 triệu tiền quỹ bảo trì đã bị mở toang không một vết cạy phá.',
      body: 'Dưới hầm B1, kỹ thuật viên Khải được tìm thấy bất tỉnh với một thiết bị bẻ khoá còn nguyên tem trong balo. Tuy nhiên, hệ thống quản lý toà nhà BMS ghi nhận hàng loạt bất thường về áp suất và trọng lượng tại họng rác thông tầng.',
    },
    comment: {
      user: 'ban_quan_tri_42',
      avatar: '🏢',
      time: '5 phút trước',
      content: '"Lúc 21h18 nghe tiếng huỳnh rất mạnh dội từ họng rác thông tầng xuống buồng xả B2, ngay sau đó thấy xe máy bảo vệ nổ máy!"',
      clue: 'hong-rac-bms',
      clueLabel: 'Ghi nhận tiếng động họng rác thông tầng lúc 21h18',
    },
    ordersTitle: '🏢 Nhật ký BMS & Cảm biến họng rác – Chung cư 42',
    searchSuggestions: ['Đạt', 'Tú', 'Khải', 'Lan', 'BMS', 'VietinBank', 'TX-4011', 'Họng rác', 'Long Châu'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Viễn thông',
        title: 'Nhật ký vận hành thiết bị BMS-TERM-01: Chứng cứ ngoại phạm của Kỹ sư Đạt',
        keywords: ['đạt', 'dat', 'ngoại phạm', 'bms-term-01', 'bàn điều khiển', 'phòng máy', 'alibi'],
        snippet: 'Ghi nhận tài khoản admin_dat liên tục nhập lệnh tại phòng máy chủ B1 mỗi 180 giây.',
        content:
          'Trích xuất máy chủ toà nhà BMS (bms-building.vn):\n- Nhân sự trực: Kỹ sư Nguyễn Tiến Đạt (tài khoản admin_dat)\n- Chứng cứ ngoại phạm: Toàn bộ nhật ký thiết bị tại bàn điều khiển phòng máy B1 xác nhận các lệnh ping điều áp hệ thống cấp thoát nước và kiểm tra quạt thông gió được gõ liên tục mỗi 180 giây từ 20:30 đến 21:15.\n- Đánh giá ban đầu: Đạt ngồi làm việc liên tục tại phòng máy chủ B1, không hề rời bàn điều khiển trong thời điểm xảy ra sự cố mất điện tầng 2.',
        clue: 'ma-khoa-ket-2042',
        clueLabel: 'Lưu nhật ký BMS-TERM-01 ngoại phạm của Đạt',
      },
      {
        id: 'sr2',
        category: 'Ngân hàng',
        title: 'Hệ thống VietinBank: Lệnh chuyển tiền nhanh TX-4011 lúc 21:50:44',
        keywords: ['vietinbank', '200 triệu', 'chuyển khoản', 'tx-4011', 'cá cược', 'ip nội bộ', 'bảy'],
        snippet: 'Lệnh ủy nhiệm chi 200.000.000đ giải ngân vào tài khoản cá cược trực tuyến.',
        content:
          'Trích xuất VietinBank iPay:\n- Lệnh chuyển tiền: TX-4011 lúc 21:50:44\n- Số tiền: 200.000.000 VNĐ giải ngân vào tài khoản Lê Văn Bảy (Bảy Ốc - chủ nợ cá cược).\n- Địa chỉ IP khởi tạo: 192.168.1.100 (Cổng kết nối nội bộ phòng máy chủ BMS tầng B1).\n- Chữ ký điện tử phê duyệt: Được xác thực trực tiếp qua OTP thiết bị di động của User: ADMIN_DAT, đối lập hoàn toàn với lời khai "đã về nhà ngủ không dùng điện thoại"!',
        clue: 'lenh-chuyen-200tr',
        clueLabel: 'Lưu lệnh chuyển 200 triệu từ IP nội bộ BMS lúc 21:50',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Nhà thuốc Long Châu: Hoá đơn LC-401 mua găng tay cách điện & dung dịch y tế',
        keywords: ['long châu', 'hoá đơn', 'găng tay', 'an thần', 'lc-401', 'muội than', 'họng rác'],
        snippet: 'Hoá đơn mua găng tay cách điện và mẫu vật thu giữ dính muội than tại họng rác.',
        content:
          'Dữ liệu đối soát vật chứng:\n- Hoá đơn LC-401 tại Nhà Thuốc Long Châu lúc 17:32 chiều: Mua găng tay cách điện chuyên dụng màu đen.\n- Vật chứng thu giữ tại cửa xả họng rác B1: Mẫu găng tay cao su đen dính muội than chì của tủ điện tầng 2 và mực dấu đỏ chuyên dụng của Trưởng ban quản lý toà nhà.',
        clue: 'gang-tay-dat',
        clueLabel: 'Lưu hoá đơn găng tay dính muội than tại họng rác',
      },
      {
        id: 'sr4',
        category: 'Viễn thông',
        title: 'Hệ thống Quản lý Toà nhà BMS: Nhật ký cảm biến kỹ thuật & họng rác',
        keywords: ['bms', 'aptomat', 'họng rác', 'tầng hầm', 'cảm biến', '21:10', '21:18'],
        snippet: 'Nhật ký tự động cảnh báo sự cố điện và cảm biến chấn động toà nhà.',
        content:
          'Trích xuất máy chủ toà nhà BMS (bms-building.vn):\n- 21:10:05: Aptomat tổng nguồn chiếu sáng và camera hầm B1 bị ngắt cưỡng bức bằng tay (thao tác thủ công cơ học).\n- 21:18:22: Cảm biến trọng lượng họng rác thông tầng B1 ghi nhận vật nặng rơi khoảng 12.4kg từ tầng 2 xuống thùng rác phía sau hầm.\n- Cửa thoát hiểm tầng 2 được mở bằng chìa khoá Master cơ học lúc 21:17:40.',
        clue: 'hong-rac-bms',
        clueLabel: 'Lưu nhật ký BMS ngắt Aptomat và họng rác lúc 21:18',
      },
      {
        id: 'sr5',
        category: 'Camera',
        title: 'Trích xuất Camera CAM-401: Tú điều khiển xe máy tới họng rác lúc 21:19',
        keywords: ['tú', 'camera', 'cam-401', 'hầm b1', 'xe máy', '21:19', 'cảnh giới'],
        snippet: 'Camera ghi nhận Tú chạy xe lại cửa xả rác nhặt bọc tiền giấu vào cốp xe.',
        content:
          'Trích xuất camera an ninh cổng hầm CAM-401:\n- Mốc thời gian: 21:19 (ngay sau khi họng rác rung chấn 21:18).\n- Diễn biến: Bảo vệ Tư điều khiển xe máy 29-X1 chạy lại cửa xả rác hầm sau, cúi xuống nhặt một bọc hàng dày nhét vào cốp xe rồi nổ máy phóng ra chắn ngang dốc cửa hầm cảnh giới.\n- Gương cầu lồi phản chiếu góc bàn trực cho thấy Tư đã xoay chìa cơ ngắt camera thang hàng lúc 20:48 để che chắn đường đi cho Đạt.',
        clue: 'camera-tu-canh-gioi',
        clueLabel: 'Lưu camera Tư nhặt bọc tiền họng rác lúc 21:19',
      },
    ],
    case: CASE4,
    clues: CLUES4,
    convs: CONVS4,
    orders: ORDERS4,
    photos: PHOTOS4,
    suspects: SUSPECTS4,
    trash: TRASH4,
  },

  // =========================================================================
  // VỤ ÁN 05: ÁN MẠNG PHÒNG TRÀ HẺM 42 (CHỦ MƯU + ĐỒNG PHẠM)
  // =========================================================================
  {
    id: 'an-mang',
    difficulty: 'Siêu khó',
    maxTries: 3,
    accomplice: 'yen',
    news: {
      title: 'Nhà sưu tầm cổ vật Hoàng Khang tử vong bí ẩn trong phòng trà khoá then',
      lead: 'Đêm mưa bão 25/10, ông Hoàng Khang (62 tuổi) gục chết bên bàn cờ tướng tại phòng trà riêng. Chiếc đồng hồ sapphire trên tay vỡ vụn dừng ở 22:15, ấm trà vẫn bốc hơi nóng.',
      body: 'Viện Pháp y xác nhận nguyên nhân tử vong do ngộ độc Aconitine - loại kịch độc bảng A chiết xuất từ rễ củ Ô Đầu. Tuy nhiên, căn phòng được khoá chặt then cài bên trong, tạo thành hiện trường phòng kín hoàn hảo.',
    },
    comment: {
      user: 'hang_xom_biet_thu',
      avatar: '🍵',
      time: '1 giờ trước',
      content: '"Lúc 21h15 thấy Bác sĩ Vũ dắt xe ra về, mà sao đến tận 22h15 mới nghe tiếng cốc vỡ từ phòng trà tầng 2?"',
      clue: 'dong-ho-vo',
      clueLabel: 'Ghi nhận mốc thời gian Bác sĩ Vũ rời nhà lúc 21h15',
    },
    ordersTitle: '🍵 Cảm biến Smart Home IoT & Nhật ký dược liệu – Biệt thự Hoàng Khang',
    searchSuggestions: ['Vũ', 'Yến', 'Trọng', 'Bảo Trâm', 'Pháp y', 'Smart Home', 'Aconitine', 'VietinBank', 'Long Châu'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Pháp y',
        title: 'Hồ sơ giám định pháp y & Viễn thông: Chứng cứ ngoại phạm của Bác sĩ Vũ',
        keywords: ['vũ', 'vu', 'ngoại phạm', 'video call', 'dược sĩ', 'pháp y', 'thảo điền', 'alibi'],
        snippet: 'Bác sĩ Vũ rời biệt thự lúc 21:15, gọi video call tại quầy thuốc cách 8km lúc 21:25 - 21:33.',
        content:
          'Báo cáo giám định viễn thông & Công an phường:\n- Đối tượng: Bác sĩ L.Q. Vũ\n- Chứng cứ ngoại phạm: Vũ rời biệt thự lúc 21:15 (bảo vệ mở cổng xác nhận). Nạn nhân tử vong lúc 21:30 do ngộ độc trà. Vào đúng thời điểm 21:25 - 21:33, nhật ký trạm BTS viễn thông và máy chủ video call ghi nhận Vũ đang ở quầy thuốc cách biệt thự 8km, thực hiện cuộc gọi video kéo dài 8 phút với Dược sĩ Mai.\n- Kết luận ban đầu: Vũ hoàn toàn không thể có mặt tại hiện trường lúc án mạng xảy ra.',
        clue: 'hien-truong',
        clueLabel: 'Lưu xác minh alibi video call cách 8km của Vũ',
      },
      {
        id: 'sr2',
        category: 'Cảnh sát',
        title: 'Sổ kiểm soát độc dược: Viện Nghiên Cứu Dược Liệu Hà Nội (Mã DC-098)',
        keywords: ['aconitine', 'độc dược', 'dược liệu', 'sổ ký nhận', 'dc-098', 'hồ cá', 'vân tay', '2128'],
        snippet: 'Bàn giao 20ml hóa chất độc bảng A và lọ thủy tinh giấu dưới hồ cá.',
        content:
          'Hồ sơ kiểm soát dược lý Viện Dược Liệu:\n- Mẫu chuẩn độc chất Aconitine 20ml số 0502 xuất kho sáng 25/10 theo đề tài nghiên cứu của Bác sĩ L.Q. Vũ - Khoa Hồi sức Tim mạch.\n- Dưới đáy hồ cá non bộ biệt thự tìm thấy lọ thủy tinh nắp cao su dung tích 20ml dính dung dịch Aconitine và dấu vân tay của Bác sĩ Vũ.',
        clue: 'so-doc-duoc-vu',
        clueLabel: 'Lưu sổ độc dược DC-098 và lọ thủy tinh dưới hồ cá',
      },
      {
        id: 'sr3',
        category: 'Viễn thông',
        title: 'Máy chủ Smart Home IoT: Lịch sử điều khiển nhiệt độ ấm trà thông minh',
        keywords: ['smart home', 'ấm trà', 'iot', 'hẹn giờ', 'smarthome', '22:10', 're-boil', 'mac'],
        snippet: 'Lệnh đun sôi lại ấm SmartKettle từ xa qua Wi-Fi lúc 22:10 từ điện thoại của Yến.',
        content:
          'Máy chủ smarthome.iot:\n- Lúc 22:10:02, ấm SmartKettle nhận lệnh Re-boil từ xa qua Wi-Fi nội bộ từ thiết bị mang địa chỉ MAC 4A:12:F8:33:B2:91 (Hostname: Galaxy-A52 của người giúp việc Yến).\n- Lật tẩy thủ thuật Conan: Độc chất Aconitine được Vũ giấu trong viên nang gelatin chịu nhiệt chìm dưới đáy bình trà. Lệnh Re-boil từ điện thoại Yến làm nhiệt độ tăng vọt, hòa tan viên nang giải phóng độc tố và tạo hơi nước nghi ngút đánh lừa giờ chết!',
        clue: 'smart-kettle-wifi',
        clueLabel: 'Lưu lệnh Re-boil ấm SmartKettle từ máy Yến',
      },
      {
        id: 'sr4',
        category: 'Ngân hàng',
        title: 'Hệ thống VietinBank: Sao kê chuyển khoản 200 triệu lúc 17:30',
        keywords: ['vietinbank', '200 triệu', 'yến', 'cọc', 'chuyển khoản', 'hợp đồng', 'tx-88120'],
        snippet: 'Lệnh chuyển 200.000.000đ từ Lê Quốc Vũ cho Nguyễn Thị Yến.',
        content:
          'Sao kê VietinBank TX-88120 lúc 17:30 ngày 25/10: Tài khoản Lê Quốc Vũ chuyển 200.000.000 VND cho Nguyễn Thị Yến với ghi chú "Thanh toan hop dong". Lời khai của Yến rằng "chỉ là tiền ứng lương 5 triệu" bị số liệu sao kê vạch trần mối quan hệ ăn chia tài chính mờ ám.',
        clue: 'vu-chuyen-yen-200tr',
        clueLabel: 'Lưu lệnh chuyển 200 triệu từ Vũ cho Yến lúc 17:30',
      },
      {
        id: 'sr5',
        category: 'Cảnh sát',
        title: 'Khám nghiệm hiện trường cửa sổ & chốt then cài phòng trà',
        keywords: ['khám nghiệm', 'then cài', 'cửa sổ', 'dây cước', 'phòng kín', 'kim chỉ'],
        snippet: 'Dấu vết ma sát sợi cước ở chốt then cài cửa sổ và cuộn cước trong giỏ chỉ của Yến.',
        content:
          'Khám nghiệm hiện trường then cài cửa gỗ:\n- Chốt cài bên trong có vết cọ xát trượt của sợi cước nylon 0.2mm.\n- Khám xét phòng ngủ của người giúp việc Yến tại tầng 3, phát hiện cuộn cước câu cá 0.2mm giấu dưới đáy giỏ kim chỉ - công cụ dùng để luồn qua khe dưới cánh cửa giật chốt then cài từ ngoài ban công tạo phòng kín!',
        clue: 'then-cai-chi-cuoc',
        clueLabel: 'Lưu dấu vết sợi cước giật then cài cửa sổ tạo phòng kín',
      },
    ],
    case: CASE5,
    clues: CLUES5,
    convs: CONVS5,
    orders: ORDERS5,
    photos: PHOTOS5,
    suspects: SUSPECTS5,
    trash: TRASH5,
  },

  // =========================================================================
  // VỤ ÁN 06: BẮT CÓC CON TIN DU THUYỀN SÔNG SÀI GÒN (CHỦ MƯU + ĐỒNG PHẠM)
  // =========================================================================
  {
    id: 'du-thuyen',
    difficulty: 'Siêu hóc búa',
    maxTries: 3,
    accomplice: 'thao-my',
    news: {
      title: 'Tiểu thư tập đoàn Đông Dương mất tích bí ẩn giữa tiệc sinh nhật du thuyền',
      lead: 'Khoảng 21:40 đêm 28/10, tiểu thư Nguyễn Thảo My rời khoang VIP tầng 3 ra mạn thuyền hóng gió rồi biến mất. Chiếc vòng tay ngọc trai được tìm thấy mắc ở lan can mạn phải.',
      body: 'Đến 22:00, gia đình nhận được tin nhắn tống tiền 3 tỷ đồng gửi từ sim rác. Khi cảnh sát khám xét, chiếc điện thoại sim rác lại được phát hiện trong túi tạp dề của nhân viên bồi bàn.',
    },
    comment: {
      user: 'khach_vip_horizon',
      avatar: '🛥️',
      time: '10 phút trước',
      content: '"Lúc 21h30 Thảo My còn tạo dáng chụp ảnh khoe nhẫn kim cương trên boong thuyền, phong thái rất vui vẻ!"',
      clue: 'vong-tay-man-thuyen',
      clueLabel: 'Ghi nhận Thảo My trên boong lúc 21h30 không có dấu hiệu hoảng sợ',
    },
    ordersTitle: '🚢 Hải trình du thuyền Horizon & Camera bến sông Sài Gòn',
    searchSuggestions: ['Khang', 'Thảo My', 'Nam bồi bàn', 'Hải thuyền trưởng', 'VietinBank', 'CAM-601', 'GiaoNhanh', 'Long Châu'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Cảnh sát',
        title: 'Biên bản khám nghiệm hiện trường: Chứng cứ ngoại phạm công khai của Lê Minh Khang',
        keywords: ['khang', 'minh khang', 'ngoại phạm', 'sảnh tiệc', 'tiếp khách', 'nhân chứng', 'alibi'],
        snippet: 'Khang tiếp khách tại sảnh tiệc tầng 2 trước 50 quan khách từ 21:30 đến 22:15.',
        content:
          'Biên bản ghi lời khai hiện trường Cơ quan CSĐT:\n- Đối tượng: Lê Minh Khang (vị hôn phu)\n- Chứng cứ ngoại phạm: Suốt từ 21:30 đến 22:15, Khang liên tục đứng ở sảnh tiệc tầng 2 tiếp đãi các đối tác thương thuyền, nâng ly và chụp ảnh lưu niệm trước sự chứng kiến của hơn 50 quan khách và DJ Quốc Huy.\n- Lúc 22:00 khi tin nhắn tống tiền gửi đến điện thoại bố Thảo My, Khang đang đứng ngay bên cạnh, cùng đọc tin và vô cùng hoảng loạn gọi báo công an.',
        clue: 'mat-tich-con-tin',
        clueLabel: 'Lưu biên bản ngoại phạm tiếp khách sảnh tiệc của Khang',
      },
      {
        id: 'sr2',
        category: 'Ngân hàng',
        title: 'Hệ thống VietinBank: Lệnh phong toả tài khoản thụ hưởng 3.000.000.000 VNĐ',
        keywords: ['vietinbank', '3 tỷ', 'tiền chuộc', 'tài khoản', 'horizon', 'tx-77102', '22:45'],
        snippet: 'Lệnh phong toả khẩn cấp tài khoản Cty Cổ phần Sự kiện Horizon nhận 3 tỷ tiền chuộc.',
        content:
          'Sao kê VietinBank (vietinbank.vn) mã TX-77102 lúc 22:45: Gia đình chuyển khẩn cấp 3.000.000.000 VND vào tài khoản pháp nhân Cty Cổ phần Sự kiện Horizon theo số tài khoản kẻ nặc danh chỉ định. Trích xuất Cổng thông tin đăng ký doanh nghiệp quốc gia xác nhận: Lê Minh Khang là Chủ tịch kiêm đại diện pháp luật sở hữu 100% vốn công ty này!',
        clue: 'vietinbank-chuyen-tien-chuoc',
        clueLabel: 'Lưu lệnh phong toả 3 tỷ vào tài khoản Cty Horizon',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Nhà thuốc Long Châu: Hoá đơn LC-608 tích điểm thẻ Diamond #9988',
        keywords: ['long châu', 'hoá đơn', 'thảo my', 'thuốc ngủ', 'nhuộm tóc', '17:15', 'lc-608', 'diamond'],
        snippet: 'Hoá đơn LC-608 mua thuốc nhuộm tóc và thuốc ngủ cải trang.',
        content:
          'Hoá đơn LC-608 tại Nhà Thuốc Long Châu Bến Bạc lúc 17:15 ngày 28/10: Khách hàng mua 02 hộp thuốc nhuộm tóc màu đen và kính râm to bản. Thẻ tích điểm sử dụng là thẻ VIP Diamond #9988 mang tên NGUYEN T. M. để phục vụ kế hoạch cải trang đào tẩu!',
        clue: 'mua-thuoc-nhuom-toc',
        clueLabel: 'Lưu hoá đơn mua thuốc nhuộm tóc thẻ Diamond #9988',
      },
      {
        id: 'sr4',
        category: 'Viễn thông',
        title: 'Dịch vụ GiaoNhanh: Đơn hàng hoả tốc GN-99801 ra bến phao số 4',
        keywords: ['giaonhanh', 'gn-99801', 'vali', '21:30', 'phao số 4', 'hàng hiệu', 'rimowa'],
        snippet: 'Vận chuyển 2 vali Rimowa cỡ đại ra ca-nô neo tại phao số 4 lúc 21:30.',
        content:
          'Hệ thống GiaoNhanh mã GN-99801: Lúc 21:30 (trước khi My rời bàn 10 phút), 02 vali du lịch cỡ đại Rimowa được giao từ khách sạn ra bến ca-nô phao số 4. Người ký nhận ký bằng mật danh "KM-88" kèm số điện thoại hotline in trên danh thiếp của Minh Khang.',
        clue: 'vali-minh-khang',
        clueLabel: 'Lưu đơn chuyển 2 vali ra phao số 4 lúc 21:30',
      },
      {
        id: 'sr5',
        category: 'Camera',
        title: 'Trích xuất Camera bến sông CAM-601: Luồng ca-nô cập mạn tàu lúc 21:50',
        keywords: ['camera', 'bến sông', 'ca nô', 'áo mưa', 'thảo my', '21:50', 'cam-601'],
        snippet: 'Hình ảnh nhân dạng đối tượng mặc áo mưa tím tự nguyện bước xuống ca-nô.',
        content:
          'Trích xuất camera an ninh cảng sông CAM-601 lúc 21:50:40: Một người mặc áo mưa cánh dơi trùm kín đầu, vóc dáng thon gọn bước từ sàn mạn phải du thuyền xuống ca-nô cao tốc đang nổ máy chờ sẵn. Động tác bước xuống hoàn toàn tự nhiên, không có dấu hiệu bị ép buộc, giằng co hay khống chế vũ lực.',
        clue: 'camera-ben-thuyen',
        clueLabel: 'Lưu hình ảnh Camera CAM-601 Thảo My xuống ca-nô lúc 21:50',
      },
      {
        id: 'sr6',
        category: 'Cảnh sát',
        title: 'Định vị trạm BTS & Tin đăng Chợ Tốt: Giải oan cho bồi bàn Nam',
        keywords: ['nam', 'chợ tốt', 'xe wave', 'sim rác', 'bts', 'khoang vip', 'quầy bar'],
        snippet: 'Nhật ký trạm BTS phát sóng sim rác từ khoang VIP tầng 3, giải oan cho Nam.',
        content:
          'Báo cáo viễn thông & Camera bếp:\n- Camera bếp tầng 1 và quản lý ca xác nhận Nam liên tục bưng bê đồ ăn tại bếp từ 21:45 đến 22:04 không hề lên khoang VIP.\n- Chiếc sim rác phát tin tống tiền lúc 22:00 phát sóng từ khoang VIP tầng 3 (nơi Minh Khang đứng).\n- Lúc 22:05 Khang xuống quầy bar gọi rượu, cố ý chen lấn va mạnh vào Nam để nhét điện thoại vào túi tạp dề nhằm vu oan!',
        clue: 'nam-sim-rac-oan',
        clueLabel: 'Lưu định vị trạm BTS giải oan cho bồi bàn Nam',
      },
    ],
    case: CASE6,
    clues: CLUES6,
    convs: CONVS6,
    orders: ORDERS6,
    photos: PHOTOS6,
    suspects: SUSPECTS6,
    trash: TRASH6,
  },
]
