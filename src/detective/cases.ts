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
      avatar: '🏘️',
      time: '1 giờ trước',
      content: '“Hôm qua ngõ tối om, tầm 21h30 nghe tiếng then cổng sắt kêu lách cách rồi có tiếng xe chạy vụt ra hướng ngã tư!”',
      clue: 'dung-khai-21h15',
      clueLabel: 'Ghi nhận mốc thời gian cổng sắt mở lúc 21h30',
    },
    ordersTitle: '📋 Nhật ký máy chủ GiaoNhanh & Camera ngã tư · Đêm xảy ra vụ án',
    searchSuggestions: ['Dũng', 'Vy', 'Sơn', '21:47', 'xe điện', 'Chợ Tốt', 'Camera Phường', 'Long Châu', 'Hùng Net'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Viễn thông',
        title: 'Nhật ký máy chủ GiaoNhanh: Mã đơn GN-88214',
        keywords: ['21:47', 'đơn hàng', 'gn-88214', 'dũng', 'lộ trình', 'định vị', 'gps'],
        snippet: 'Hệ thống viễn thông máy chủ ghi nhận toạ độ và thời gian xử lý đơn hàng GN-88214.',
        content:
          'Trích xuất cơ sở dữ liệu hệ thống GiaoNhanh (giaonhanh.vn):\n- Mã đơn hàng: GN-88214\n- Trạng thái: Hoàn tất\n- Điểm nhận hàng: Đầu hẻm 42 phố Hàng Chai (Quán net Hùng)\n- Thời gian nhận đơn: 21:47 (Toạ độ GPS: 21.0335, 105.8502)\n- Thời gian giao hàng: 21:52 tại Hẻm 44\n- Tài xế tiếp nhận: Nguyễn Văn Dũng (ID: SH-4209).',
        clue: 'don-hang-2147',
        clueLabel: 'Lưu bản ghi GPS đơn hàng GN-88214 lúc 21:47',
      },
      {
        id: 'sr2',
        category: 'Camera',
        title: 'Trích xuất Camera giao thông CAM-102 (Ngã tư Hàng Chai - Cửa Đông)',
        keywords: ['camera', 'an ninh', 'ngã tư', 'xanh mint', '21:49', 'dũng'],
        snippet: 'Ghi nhận phương tiện và người tham gia giao thông qua ngã tư lúc 21:49:15.',
        content:
          'Trích xuất luồng hình ảnh camera an ninh công cộng CAM-102 (camera-phuong.gov.vn):\n- Mốc thời gian: 21:49:15\n- Đối tượng: Một người điều khiển xe máy wave đỏ mang áo khoác gió đồng phục GiaoNhanh, tay trái kéo theo một phương tiện hai bánh phủ bạt màu xanh mint phóng nhanh theo hướng Hẻm 44.\n- Đặc điểm phương tiện: Giỏ trước xe kéo có treo một túi vải hoa văn.',
        clue: 'don-hang-2147',
        clueLabel: 'Lưu hình ảnh camera xe kéo lúc 21:49',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Sàn Chợ Tốt: Lịch sử tin đăng tài khoản vy.socute (Mã CT-101)',
        keywords: ['vy', 'chợ tốt', 'chotot', 'xe đỏ', 'asama', 'tiền trọ'],
        snippet: 'Thông tin kỹ thuật và thời gian đăng bài rao bán phương tiện hai bánh.',
        content:
          'Dữ liệu đối soát tin đăng trên sàn thương mại điện tử Chợ Tốt (chotot.vn):\n- Mã tin đăng: CT-101\n- Người đăng: Nguyễn Thuỵ Trúc Vy (vy.socute, SĐT: 0984***219)\n- Sản phẩm: Xe đạp điện Asama màu ĐỎ nguyên bản (kèm ảnh chụp hoá đơn mua hàng năm 2023)\n- Giá rao: 2.500.000 VNĐ\n- Thời gian khởi tạo tin: 18:02 ngày 09/9 (3 ngày trước khi vụ án xảy ra).',
        clue: 'vy-xe-do',
        clueLabel: 'Lưu xác minh tin đăng xe đỏ của Vy từ 3 ngày trước',
      },
      {
        id: 'sr4',
        category: 'Cảnh sát',
        title: 'Sổ giao dịch công nợ: Tiệm sửa xe & Dịch vụ net Hùng Motor',
        keywords: ['dũng', 'hùng', '5 triệu', 'nợ', 'sửa xe', 'hạn chót'],
        snippet: 'Biên bản ghi nhận khoản nợ phụ tùng và lịch hẹn thanh toán.',
        content:
          'Sổ công nợ viết tay của chủ cơ sở Hùng Motor:\n- Khách nợ: Nguyễn Văn Dũng (phòng 203 Hẻm 42)\n- Khoản nợ: 5.000.000 VNĐ (thay bộ điều tốc và bình ắc quy xe máy)\n- Tình trạng: Quá hạn thanh toán 14 ngày\n- Ghi chú gần nhất: “Con nợ cam kết thanh toán dứt điểm trước 22:00 đêm 12/9, nếu không sẽ giữ phương tiện hành nghề”.',
        clue: 'hung-cho-vay',
        clueLabel: 'Lưu sổ công nợ 5 triệu hạn chót đêm 12/9',
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
      title: 'Mất điện thoại iPhone 14 Pro Max trong ngăn tủ khóa tại sân cầu lông Hẻm 42',
      lead: 'Tối ngày 15/9, chị Hạnh trình báo chiếc iPhone 14 Pro Max cất trong ngăn tủ đồ cá nhân số 04 đã biến mất chỉ sau 15 phút vào sân khởi động. Đáng chú ý, ổ khóa tủ vẫn đóng nguyên vẹn.',
      body: 'Hiện trường dãy tủ cá nhân được làm bằng khung sắt vách tôn đặt tại góc phòng thay đồ. Lực lượng điều tra đang rà soát hệ thống camera kiểm soát bãi đỗ xe và lịch sử các thiết bị phát sóng tại khu vực.',
    },
    comment: {
      user: 'badminton_club',
      avatar: '🏸',
      time: '45 phút trước',
      content: '“Dãy tủ đồ số 01 đến 05 kê sát vách tôn phía sau bị mọt xập xệ từ lâu rồi, người ta để đồ vào đó nhiều khi chẳng để ý!”',
      clue: 'son-vet-xuoc',
      clueLabel: 'Ghi nhận hiện trạng vách tôn dãy tủ đồ bị lỏng lẻo',
    },
    ordersTitle: '🏸 Nhật ký ra vào sân & Giao dịch thiết bị · Tối xảy ra vụ việc',
    searchSuggestions: ['Sơn', 'Hào', 'Linh', 'Chợ Tốt', 'vết xước', 'tủ đồ', '6 triệu', 'iPhone', 'khe hở'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Cảnh sát',
        title: 'Sàn Chợ Tốt: Tin rao bán thiết bị Apple mã tin CT-201',
        keywords: ['chợ tốt', 'chotot', 'iphone', 'rao bán', '5 triệu', 'hào'],
        snippet: 'Thông số kỹ thuật và địa chỉ IP đăng tải tin rao vặt lúc 20:44.',
        content:
          'Dữ liệu từ sàn Chợ Tốt (chotot.vn):\n- Mã tin: CT-201 lúc 20:44:12\n- Tiêu đề: Bán nhanh iPhone 14 Pro Max Deep Purple, pin 91%, không phụ kiện, giá 5.500.000 VNĐ\n- Số điện thoại liên hệ trong bài: 0912***888 (Số của Hào Smash)\n- Địa chỉ IP khởi tạo: 118.70.192.44 (Trùng khớp với cổng Wi-Fi miễn phí khu vực bãi xe sân cầu lông)\n- Số Serial máy tra cứu: F2LZ7***0D8 (Khớp 100% với số máy chị Hạnh bị mất cắp).',
        clue: 'tin-chotot',
        clueLabel: 'Lưu tin đăng bán iPhone trùng Serial trên Chợ Tốt',
      },
      {
        id: 'sr2',
        category: 'Camera',
        title: 'Camera Sân Thi Đấu Số 2: Lịch trình trận đấu giao hữu',
        keywords: ['hào', 'sân 2', 'thi đấu', 'camera', 'alibi', 'set 3'],
        snippet: 'Biên bản ghi nhận sự hiện diện của các vận động viên từ 20:30 đến 21:00.',
        content:
          'Trích xuất camera sân tập số 2 (camera-phuong.gov.vn):\n- 20:30 - 21:00: Vận động viên Lê Thanh Hào (Hào Smash) liên tục thi đấu set 3 trận đôi nam kịch tính dưới sự chứng kiến của 12 khán giả và trọng tài bàn.\n- 20:44 (thời điểm tin Chợ Tốt được đăng): Hào đang thực hiện pha đập cầu ghi điểm, hai tay cầm vợt trên sân.',
        clue: 'hao-alibi',
        clueLabel: 'Lưu camera xác nhận Hào thi đấu trên sân lúc 20:44',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Biên bản kỹ thuật khám nghiệm hiện trường tủ cá nhân số 04',
        keywords: ['khám nghiệm', 'tủ đồ', 'khe hở', 'mọt', 'vách tôn', 'khoá'],
        snippet: 'Kết quả giám định cơ học ổ khoá và kết cấu tủ số 04.',
        content:
          'Biên bản khám nghiệm hiện trường của cơ quan điều tra:\n- Ổ khóa bấm loại 40mm: Ở trạng thái khóa hoàn toàn, không có dấu hiệu cạy phá, không có mạt kim loại.\n- Tấm tôn nóc tủ số 04: Đinh tán phía sau bị rỉ sét bật ra, tạo một khe hở rộng 4.2 cm giữa nóc tủ và thành bên.\n- Dấu vết sinh học: Tại mép tôn gỉ sét nhọn có một vết xơ vải sợi dệt màu xám và vệt màu đỏ nâu nghi là máu khô.',
        clue: 'khe-ho-tu',
        clueLabel: 'Lưu biên bản khe hở nóc tủ và vệt máu khô',
      },
      {
        id: 'sr4',
        category: 'Camera',
        title: 'Trích xuất Camera bãi xe CAM-201: Khu vực lối thoát hiểm sau dãy tủ',
        keywords: ['sơn', 'camera', 'bãi xe', 'áo khoác', '20:25', 'lối sau'],
        snippet: 'Hình ảnh đối tượng di chuyển qua lối hành lang kỹ thuật lúc 20:25:30.',
        content:
          'Trích xuất camera bãi đỗ xe CAM-201:\n- Mốc 20:25:30: Trần Sơn (nhân viên nhặt cầu) mặc áo thun xám lách người qua cửa ngách dẫn ra phía sau vách tôn dãy tủ đồ.\n- Mốc 20:36:10: Sơn quay trở lại khu vực quầy lễ tân, cổ tay phải quấn khăn vải trắng, dáng vẻ bồn chồn.',
        clue: 'son-vet-xuoc',
        clueLabel: 'Lưu hình ảnh Sơn ra lối sau dãy tủ lúc 20:25',
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
      title: 'Hội chợ Trung thu mất 8 triệu đồng tiền từ thiện trong 15 phút mất điện đột ngột',
      lead: 'Đêm hội chợ từ thiện tại sân đình Hẻm 42 xảy ra sự cố chập aptomat tổng lúc 20:55. Khi ánh sáng phục hồi lúc 21:10, chiếc hòm gỗ đựng 8 triệu đồng tiền quyên góp vẫn khóa nhưng ruột đã trống rỗng.',
      body: 'Chiếc hòm quỹ bằng gỗ lim được đặt trên bệ đá trước gian hàng ẩm thực. Ban tổ chức khẳng định chỉ có duy nhất 1 chìa khóa cơ do một người phụ trách giữ tại hiện trường.',
    },
    comment: {
      user: 'dinh_lang_42',
      avatar: '🏮',
      time: '30 phút trước',
      content: '“Khoảng 21h lúc trời tối om, tôi nghe tiếng bước chân chạy vội dẫm bồm bộp trên bãi đất mới xới sau đình!”',
      clue: 'vet-bun-do',
      clueLabel: 'Ghi nhận tiếng bước chân trên bãi cỏ sau đình',
    },
    ordersTitle: '🏮 Nhật ký thu chi hội chợ & Luồng camera sân đình · Đêm 15/8 Âm lịch',
    searchSuggestions: ['Trang', 'Tú', 'Khoa', 'chìa khoá', '8 triệu', 'VietinBank', 'sáp nến', 'bùn đỏ', 'Long Châu'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Ngân hàng',
        title: 'Sao kê giao dịch VietinBank: Tài khoản 1088***992 (Nguyễn Thị Thu Trang)',
        keywords: ['trang', 'chuyển tiền', 'vietinbank', '21:32', '8 triệu', 'nợ'],
        snippet: 'Lịch sử biến động số dư tài khoản cá nhân đêm 15/8.',
        content:
          'Trích lục sao kê hệ thống VietinBank (vietinbank.vn):\n- Mã giao dịch: TX-99812 lúc 21:32:15\n- Tài khoản trích: 1088***992 (Nguyễn Thị Thu Trang)\n- Số tiền nạp tiền mặt tại quầy đại lý di động: +8.000.000 VNĐ\n- Lệnh chuyển khoản ngay sau đó lúc 21:33:00: Chuyển 8.000.000 VNĐ cho tài khoản chủ nợ tín dụng với nội dung “Trang tra xong no goc thang 8”.',
        clue: 'chuyen-khoan-trang',
        clueLabel: 'Lưu lệnh chuyển khoản 8 triệu trả nợ của Trang lúc 21:32',
      },
      {
        id: 'sr2',
        category: 'Camera',
        title: 'Trích xuất Camera CAM-302: Cổng Tam Quan đình làng',
        keywords: ['camera', 'tam quan', 'trang', 'tạp dề', 'bùn đỏ', '21:02'],
        snippet: 'Ghi nhận người di chuyển qua góc bãi cỏ sau sân đình lúc 21:02.',
        content:
          'Trích xuất camera an ninh cổng Tam Quan (camera-phuong.gov.vn):\n- Mốc thời gian: 21:02:40 (trong khoảng thời gian mất điện)\n- Hình ảnh: Trang mặc tạp dề gian hàng bánh mì, di chuyển gấp gáp từ bãi đất xới sau đình về khu vực quầy nướng bánh.\n- Chi tiết đáng chú ý: Gấu tạp dề bên trái và viền đế giày thể thao dính bùn đất màu đỏ tươi.',
        clue: 'vet-bun-do',
        clueLabel: 'Lưu hình ảnh Trang dính bùn đất đỏ lúc 21:02',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Biên lai tiếp nhận cấp cứu ngoại viện: Nhà thuốc & Phòng khám Long Châu',
        keywords: ['khoa', 'long châu', 'bỏng', '20:42', 'sơ cứu', 'nước sôi'],
        snippet: 'Hồ sơ sơ cứu bệnh nhân bỏng nhiệt tại chi nhánh Long Châu Hẻm 42.',
        content:
          'Biên lai mã LC-301 tại Nhà Thuốc Long Châu (nhathuoc-longchau42.vn):\n- Thời gian tiếp nhận: 20:42 ngày 15/8\n- Bệnh nhân: Lê Đăng Khoa (21 tuổi, tình nguyện viên hội chợ)\n- Chẩn đoán: Bỏng nước sôi độ 1 bàn tay phải do vấp đổ bình nước pha trà hậu cần.\n- Thời gian xuất viện sau khi bôi gel làm dịu và băng gạc: 21:20:00.',
        clue: 'khoa-alibi',
        clueLabel: 'Lưu alibi sơ cứu bỏng tay của Khoa đến 21:20',
      },
      {
        id: 'sr4',
        category: 'Camera',
        title: 'Trích xuất Camera CAM-301: Quán Trà Phúc (Đối diện cổng đình)',
        keywords: ['tú', 'quán trà', 'phúc', 'camera', 'alibi', 'tiền mặt'],
        snippet: 'Nhật ký khách ngồi tại bàn ngoài quán trà từ 20:55 đến 21:25.',
        content:
          'Trích xuất camera quán trà Phúc và hoá đơn thanh toán điện tử:\n- Đối tượng: Vũ Anh Tú (Tú Tài Chính)\n- Vị trí: Bàn số 02 ngoài hiên, tầm nhìn hướng thẳng ra cổng đình\n- Khung giờ hiện diện liên tục: Từ 20:55 đến 21:25\n- Hành động: Ngồi uống trà đá, nói chuyện điện thoại công việc, không rời khỏi vị trí trong suốt thời gian mất điện.',
        clue: 'tu-alibi',
        clueLabel: 'Lưu alibi của Tú tại quán trà Phúc suốt thời gian mất điện',
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
      title: 'Chung cư 42: Két sắt văn phòng mở toang, kỹ thuật viên bất tỉnh tại tầng hầm',
      lead: 'Khoảng 21:10 tối 20/10, toàn bộ hệ thống chiếu sáng tầng hầm và thang máy chung cư 42 bị sập nguồn. Khi kỹ thuật viên dự phòng xuống kiểm tra, anh Khải được phát hiện bất tỉnh cạnh tủ điện, đồng thời 200 triệu đồng quỹ toà nhà trong két sắt biến mất.',
      body: 'Dữ liệu sơ bộ cho thấy đây là vụ án có sự phối hợp tinh vi từ bên trong giữa một kẻ nắm quyền quản lý mật mã và một đối tượng tiếp tay vô hiệu hóa hệ thống an ninh.',
    },
    comment: {
      user: 'bql_chungcu',
      avatar: '🏢',
      time: '2 giờ trước',
      content: '“Họng thu rác thông tầng ở góc hẻm sau đêm đó tự nhiên rung lên rất mạnh giữa lúc toà nhà vừa mất điện!”',
      clue: 'hong-rac-bms',
      clueLabel: 'Ghi nhận chấn động họng rác thông tầng lúc 21h18',
    },
    ordersTitle: '🏢 Nhật ký BMS toà nhà & Lịch sử truy cập thẻ từ · Đêm 20/10',
    searchSuggestions: ['Đạt', 'Tư', 'Khải', 'Lan', 'Bảy', 'két sắt', 'Aptomat', 'họng rác', 'VietinBank', '2042'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Viễn thông',
        title: 'Hệ thống Quản lý Toà nhà BMS: Nhật ký cảm biến kỹ thuật',
        keywords: ['bms', 'aptomat', 'họng rác', 'tầng hầm', 'cảm biến', '21:10'],
        snippet: 'Nhật ký tự động cảnh báo sự cố điện và cảm biến chấn động toà nhà.',
        content:
          'Trích xuất máy chủ toà nhà BMS (bms-building.vn):\n- 21:10:05: Aptomat tổng nguồn chiếu sáng và camera hầm B1 bị ngắt cưỡng bức bằng tay (thao tác thủ công cơ học).\n- 21:18:22: Cảm biến trọng lượng họng rác thông tầng B1 ghi nhận vật nặng rơi khoảng 12kg từ tầng 2 xuống thùng rác phía sau hẻm.\n- Cửa thoát hiểm tầng 2 (sát phòng BQL) được mở bằng chìa khoá Master cơ học lúc 21:17:40.',
        clue: 'hong-rac-bms',
        clueLabel: 'Lưu nhật ký BMS ngắt Aptomat thủ công và họng rác lúc 21:18',
      },
      {
        id: 'sr2',
        category: 'Ngân hàng',
        title: 'Hệ thống VietinBank: Lệnh chuyển tiền nhanh TX-4011 lúc 21:50:44',
        keywords: ['vietinbank', '200 triệu', 'chuyển khoản', 'bảy', 'đạt', 'nợ', 'tx-4011'],
        snippet: 'Chi tiết giao dịch chuyển khoản 200.000.000 VNĐ trong đêm 20/10.',
        content:
          'Trích xuất ngân hàng điện tử VietinBank (vietinbank.vn) mã TX-4011:\n- Thời gian: 21:50:44 ngày 20/10\n- Tài khoản người gửi: CÔNG TY CP QUẢN LÝ TOÀ NHÀ HORIZON\n- Tài khoản người nhận: Lê Văn Bảy (Bảy Ốc)\n- Số tiền giao dịch: 200.000.000 VNĐ\n- Chữ ký điện tử phê duyệt: User ADMIN_DAT (Xác thực qua OTP thiết bị di động cá nhân).',
        clue: 'lenh-chuyen-200tr',
        clueLabel: 'Lưu giao dịch TX-4011 chuyển 200 triệu ký bởi User ADMIN_DAT',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Nhà thuốc Long Châu: Hoá đơn LC-401 mua găng tay cao su & dung dịch y tế',
        keywords: ['long châu', 'hoá đơn', 'đạt', 'găng tay', 'an thần'],
        snippet: 'Lịch sử mua hàng trực tiếp tại nhà thuốc lúc 17:30 ngày 20/10.',
        content:
          'Hồ sơ bán lẻ LC-401 tại Nhà Thuốc Long Châu (nhathuoc-longchau42.vn):\n- Khách hàng: Trần Tuấn Đạt\n- Mặt hàng: 01 hộp găng tay cao su đen y tế không bột, 01 chai cồn sát khuẩn 90 độ, 01 cuộn băng dính xốp bản lớn\n- Hình thức thanh toán: Quẹt thẻ visa cá nhân lúc 17:32:10.',
        clue: 'gang-tay-dat',
        clueLabel: 'Lưu hoá đơn Đạt mua găng tay cao su đen lúc chiều',
      },
      {
        id: 'sr4',
        category: 'Cảnh sát',
        title: 'Viện Khoa học Hình sự: Khám nghiệm dấu vết tủ Aptomat hầm B1',
        keywords: ['khám nghiệm', 'tủ điện', 'aptomat', 'chìa khoá', 'dấu vân tay'],
        snippet: 'Kết quả phân tích dấu vết cơ học trên cần gạt cầu dao tổng.',
        content:
          'Biên bản giám định dấu vết hình sự hầm B1:\n- Cần gạt Aptomat: Không có dấu vân tay (đối tượng dùng găng tay len để thao tác).\n- Ổ khoá tủ điện sắt: Mở nguyên vẹn bằng chìa khoá dự phòng số 02.\n- Theo sổ phân công ca trực: Chìa khóa tủ điện số 02 được giao độc quyền cho nhân viên bảo vệ cổng hầm (Nguyễn Văn Tư) đeo ở thắt lưng suốt ca trực đêm.',
        clue: 'tu-tat-dien',
        clueLabel: 'Lưu xác minh chỉ có Tư giữ chìa khoá tủ điện tầng hầm',
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
      title: 'Kỳ án phòng trà Hẻm 42: Nhà sưu tầm cổ vật tử vong trong căn phòng khoá then cài bên trong',
      lead: 'Đêm mưa bão 25/10, ông Hoàng Khang (62 tuổi) được phát hiện gục chết bên bàn trà trong phòng làm việc tầng 2. Cửa ra vào bằng gỗ then cài bên trong, cửa sổ khép hờ, trên bàn có ấm trà còn bốc hơi nóng.',
      body: 'Ban đầu người nhà tưởng nạn nhân đột quỵ lúc 22:15 do ấm trà vẫn còn nóng hổi. Tuy nhiên, kết quả giải phẫu tử thi của cơ quan pháp y đã phát hiện dấu vết độc dược thần kinh cực mạnh.',
    },
    comment: {
      user: 'tra_quan_42',
      avatar: '🍵',
      time: '3 giờ trước',
      content: '“Khoảng 21h30 lúc trời mưa tầm tã, tôi thấy cô giúp việc vội vã chạy ra hồ cá non bộ ngoài vườn ném thứ gì đó rồi mới quay vào nhà!”',
      clue: 'lo-thuy-tinh-ho-ca',
      clueLabel: 'Ghi nhận người giúp việc ném đồ xuống hồ cá lúc 21h30',
    },
    ordersTitle: '🍵 Báo cáo pháp y & Dữ liệu Smart Home IoT · Đêm 25/10',
    searchSuggestions: ['Vũ', 'Yến', 'Trọng', 'Bà Hà', 'Nam', 'Aconitine', 'Smart Home', 'ấm trà', 'VietinBank', '2128'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Pháp y',
        title: 'Báo cáo Giám định Pháp y số 2510/GĐ-KTHS: Phân tích tử thi & nhiệt độ cơ thể',
        keywords: ['pháp y', 'khám nghiệm', 'giờ chết', 'nhiệt độ', 'độc chất', '21:45'],
        snippet: 'Kết quả giải phẫu và xác định thời điểm tử vong thực tế của nạn nhân.',
        content:
          'Báo cáo Viện Khoa học Hình sự (phapy-kths.gov.vn):\n- Nạn nhân: Hoàng Văn Khang (62 tuổi)\n- Nguyên nhân tử vong: Suy tim cấp và ngừng hô hấp do trúng độc Aconitine liều cao.\n- Thời điểm tử vong thực tế: Khoảng 21:40 - 21:50 (xác định qua nồng độ dịch vị và thân nhiệt giảm).\n- Đáng chú ý: Ấm trà bốc khói lúc 22:15 là hiện trường giả nhằm tạo alibi ngoại phạm cho thủ phạm.',
        clue: 'hien-truong',
        clueLabel: 'Lưu báo cáo pháp y xác nhận thời gian tử vong thực tế lúc 21:45',
      },
      {
        id: 'sr2',
        category: 'Viễn thông',
        title: 'Máy chủ Smart Home IoT: Lịch sử điều khiển thiết bị gia đình',
        keywords: ['smart home', 'ấm trà', 'iot', 'hẹn giờ', 'smarthome', '22:10'],
        snippet: 'Nhật ký kích hoạt ấm trà thông minh qua ứng dụng đám mây.',
        content:
          'Trích xuất máy chủ dịch vụ đám mây smarthome.iot:\n- Thiết bị: Ấm đun nước siêu tốc thông minh WiFi (Model: SmartKettle-Pro)\n- 21:28: Hoàn thành đun nước 100°C lần 1. Nhiệt độ ấm nguội xuống dưới 34°C trước 22:00.\n- 22:10:02: Nhận lệnh kích hoạt đun sôi lại (Re-boil) từ xa qua kết nối Wi-Fi nội bộ từ smartphone mang địa chỉ MAC 4A:12:F8:33:B2:91 (Hostname: Galaxy-A52).\n- Đối chiếu Facebúc: Nguyễn Thị Yến vừa đăng bài khoe điện thoại Samsung Galaxy A52!',
        clue: 'smart-kettle-wifi',
        clueLabel: 'Lưu nhật ký điện thoại Galaxy A52 của Yến đun lại ấm trà lúc 22:10',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Sổ kiểm soát độc dược: Viện Nghiên Cứu Dược Liệu Hà Nội (Mã 0502)',
        keywords: ['aconitine', 'độc dược', 'vũ', 'dược liệu', 'sổ ký nhận', '2128'],
        snippet: 'Danh sách cá nhân tiếp cận mẫu độc chất Aconitine tinh chế.',
        content:
          'Hồ sơ lưu trữ lưu mẫu độc chất số 0502 tại Viện Dược Liệu:\n- Hoá chất: Aconitine 20mg dạng dung dịch không màu không mùi (chất gây ngừng tim tìm thấy trong tách trà)\n- Người ký nhận đề tài nghiên cứu: Bác sĩ L.Q.V (Khoa Hồi sức Tim mạch)\n- Ngày bàn giao: Sáng ngày 25/10/2026\n- Trong gia đình nạn nhân, chỉ duy nhất Bác sĩ Lê Quốc Vũ công tác tại khoa tim mạch này.',
        clue: 'so-doc-duoc-vu',
        clueLabel: 'Lưu biên bản mẫu Aconitine 0502 cấp cho Bác sĩ L.Q.V',
      },
      {
        id: 'sr4',
        category: 'Ngân hàng',
        title: 'Hệ thống VietinBank: Sao kê chuyển khoản khẩn cấp lúc 17:30',
        keywords: ['vietinbank', '200 triệu', 'vũ', 'yến', 'cọc', 'chuyển khoản'],
        snippet: 'Giao dịch chuyển tiền giữa Bác sĩ Vũ và người giúp việc Yến.',
        content:
          'Trích xuất ngân hàng VietinBank (vietinbank.vn) mã TX-88120:\n- Thời gian: 17:30:22 ngày 25/10\n- Người gửi: Lê Quốc Vũ\n- Người nhận: Nguyễn Thị Yến (tài khoản cá nhân mở tại VietinBank Đống Đa)\n- Số tiền: 200.000.000 VNĐ\n- Nội dung giao dịch: “Vu gui tien ho tro gia dinh chi Yen”.',
        clue: 'vu-chuyen-yen-200tr',
        clueLabel: 'Lưu sao kê Vũ chuyển 200 triệu cho Yến lúc chiều 25/10',
      },
      {
        id: 'sr5',
        category: 'Cảnh sát',
        title: 'Khám nghiệm hiện trường cửa sổ & chốt then cài phòng trà',
        keywords: ['khám nghiệm', 'then cài', 'cửa sổ', 'dây cước', 'phòng kín'],
        snippet: 'Bản vẽ kỹ thuật cơ chế khoá then cài từ phía bên ngoài.',
        content:
          'Kết quả giám định hiện trường phòng kín của Viện Kỹ thuật Hình sự:\n- Then cài cửa chính: Gài then bằng gỗ chéo từ bên trong.\n- Then cài cửa sổ hướng ra ban công sau: Có một vệt ma sát màu trắng đục của sợi cước nylon loại dùng câu cá chép.\n- Cơ chế phòng kín: Thủ phạm đã luồn sợi cước qua khe cửa sổ, kéo then cài sập chốt từ ngoài ban công rồi rút cước ra ngoài.',
        clue: 'then-cai-chi-cuoc',
        clueLabel: 'Lưu cơ chế dùng sợi cước kéo chốt then cài từ ngoài',
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
  // VỤ ÁN 06: BẮT CÓC CON TIN DU THUYỀN SÔNG HỒNG (CHỦ MƯU + ĐỒNG PHẠM)
  // =========================================================================
  {
    id: 'du-thuyen',
    difficulty: 'Siêu hóc búa',
    maxTries: 3,
    accomplice: 'thao-my',
    news: {
      title: 'Bến du thuyền Sông Hồng chấn động: Ái nữ tập đoàn bất động sản mất tích giữa tiệc sinh nhật',
      lead: 'Đêm 28/10, trong lúc tiệc mừng sinh nhật 22 tuổi đang diễn ra trên du thuyền 5 sao Horizon, tiểu thư Nguyễn Thảo My bất ngờ biến mất khỏi phòng riêng tầng 3. Nửa tiếng sau, gia đình nhận được tin nhắn tống tiền 3 tỷ đồng.',
      body: 'Tại hiện trường, cửa sổ mạn tàu mở toang, một vệt rách áo dạ hội vướng ở lan can. Cảnh sát đường thuỷ và đội trọng án đang phong toả bến bãi, truy tìm tung tích chiếc ca-nô cao tốc khả nghi rời mạn tàu lúc 21:50.',
    },
    comment: {
      user: 'song_hong_sailor',
      avatar: '⚓',
      time: '1 giờ trước',
      content: '“Khoảng gần 22h, ca-nô cao tốc chạy tắt đèn lách qua phao số 4 phóng như bay về phía hạ lưu!”',
      clue: 'ca-no-phao-4',
      clueLabel: 'Ghi nhận ca-nô cao tốc tắt đèn chạy về phía hạ lưu',
    },
    ordersTitle: '🚢 Hải đồ hành trình & Sao kê tài khoản nhận tiền chuộc · Đêm 28/10',
    searchSuggestions: ['Minh Khang', 'Thảo My', 'Nam Bồi Bàn', 'Thuyền Trưởng Hải', 'Bà Phương', '3 tỷ', 'ca nô', 'VietinBank', 'Long Châu'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Camera',
        title: 'Trích xuất Camera bến sông CAM-601: Luồng ca-nô cập mạn tàu lúc 21:50',
        keywords: ['camera', 'bến sông', 'ca nô', 'áo mưa', 'thảo my', '21:50'],
        snippet: 'Hình ảnh nhân dạng đối tượng rời mạn du thuyền lúc 21:50:40.',
        content:
          'Trích xuất camera an ninh cảng sông (camera-phuong.gov.vn) CAM-601:\n- Mốc thời gian: 21:50:40\n- Hình ảnh: Một người mặc áo mưa cánh dơi trùm kín đầu, vóc dáng thon gọn bước từ sàn mạn phải du thuyền xuống ca-nô cao tốc đang nổ máy chờ sẵn.\n- Đáng chú ý: Động tác bước xuống hoàn toàn tự nhiên, không có dấu hiệu bị ép buộc, giằng co hay khống chế vũ lực.',
        clue: 'camera-ben-thuyen',
        clueLabel: 'Lưu hình ảnh đối tượng bước xuống ca-nô tự nguyện lúc 21:50',
      },
      {
        id: 'sr2',
        category: 'Cảnh sát',
        title: 'Nhà thuốc Long Châu: Hoá đơn LC-608 tích điểm thẻ Diamond #9988',
        keywords: ['long châu', 'hoá đơn', 'thảo my', 'thuốc ngủ', 'nhuộm tóc', '17:15', 'lc-608'],
        snippet: 'Lịch sử mua hàng thuốc nhuộm tóc và an thần chiều 28/10.',
        content:
          'Biên lai mã LC-608 tại Nhà Thuốc Long Châu chi nhánh Bến Bạc (nhathuoc-longchau42.vn):\n- Thời gian: 17:15:30 ngày 28/10\n- Thẻ tích điểm khách hàng: VIP Diamond #9988 (NGUYEN T. M.)\n- Mặt hàng: 01 vỉ thuốc an thần hỗ trợ giấc ngủ Rotunda, 02 hộp thuốc nhuộm tóc màu đen tự nhiên, 01 kính râm to bản.\n- Trùng khớp thẻ hội viên Diamond Thảo My đăng trên Facebúc!',
        clue: 'mua-thuoc-nhuom-toc',
        clueLabel: 'Lưu hoá đơn thẻ Diamond #9988 mua thuốc nhuộm tóc',
      },
      {
        id: 'sr3',
        category: 'Ngân hàng',
        title: 'Hệ thống VietinBank: Lệnh phong toả tài khoản thụ hưởng 3.000.000.000 VNĐ',
        keywords: ['vietinbank', '3 tỷ', 'tiền chuộc', 'tài khoản', 'minh khang', '22:45'],
        snippet: 'Chi tiết tài khoản trung gian tiếp nhận khoản tiền chuộc từ gia đình.',
        content:
          'Lệnh phong toả khẩn cấp tài khoản ngân hàng điện tử VietinBank TX-77102:\n- Số tiền giao dịch: 3.000.000.000 VNĐ lúc 22:45:10\n- Tài khoản thụ hưởng: Công ty TNHH Truyền thông & Sự kiện Khang Event\n- Người đại diện pháp luật và nắm quyền chủ tài khoản: LÊ MINH KHANG (bạn trai của nạn nhân).\n- Lệnh rút tiền mặt tại cây ATM ven sông vừa bị chặn lại do nhập sai mã OTP 3 lần.',
        clue: 'vietinbank-chuyen-tien-chuoc',
        clueLabel: 'Lưu lệnh phong toả tài khoản nhận 3 tỷ của Minh Khang',
      },
      {
        id: 'sr4',
        category: 'Viễn thông',
        title: 'Dịch vụ GiaoNhanh: Đơn hàng hoả tốc GN-99801 ra bến phao số 4',
        keywords: ['giaonhanh', 'gn-99801', 'vali', '21:30', 'phao số 4', 'hàng hiệu'],
        snippet: 'Lộ trình vận chuyển hai kiện hành lý cá nhân từ khách sạn ra bến.',
        content:
          'Hệ thống điều phối GiaoNhanh (giaonhanh.vn):\n- Mã vận đơn: GN-99801 lúc 21:30 ngày 28/10\n- Nội dung kiện hàng: 02 vali du lịch cỡ đại Rimowa màu bạc\n- Điểm đón: Khách sạn Sông Hồng View\n- Điểm trả: Cầu tàu phụ bến phao số 4 (nơi ca-nô cao tốc neo đậu)\n- Người nhận hàng: Lê Minh Khang.',
        clue: 'vali-minh-khang',
        clueLabel: 'Lưu đơn chuyển 2 vali cá nhân ra ca-nô trước giờ bắt cóc',
      },
      {
        id: 'sr5',
        category: 'Cảnh sát',
        title: 'Sàn Chợ Tốt: Tin rao vặt CT-688 của nhân viên bồi bàn Nguyễn Văn Nam',
        keywords: ['nam', 'chợ tốt', 'xe wave', 'tiền trọ', 'bồi bàn'],
        snippet: 'Xác minh hoàn cảnh và lịch sử liên lạc của nhân viên phục vụ tiệc.',
        content:
          'Dữ liệu đối soát Chợ Tốt (chotot.vn) mã CT-688:\n- Người đăng: Nguyễn Văn Nam (sinh viên làm thêm bán thời gian)\n- Rao bán: Xe máy Wave Alpha cũ giá 6.000.000 VNĐ để trả nợ học phí\n- Xác minh chiếc sim rác phát hiện trong túi tạp dề của Nam: Là sim rác do ai đó lén nhét vào túi tạp dề treo tại phòng thay đồ nhân viên trong lúc Nam bưng bê trên boong tiệc.',
        clue: 'nam-sim-rac-oan',
        clueLabel: 'Lưu xác minh chiếc sim rác bị gài vào túi tạp dề của Nam',
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
