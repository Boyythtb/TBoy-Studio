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
  code?: { value: string; hint: string }
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
  {
    id: 'hem42',
    difficulty: 'Dễ',
    maxTries: 3,
    news: {
      title: 'Mất xe đạp điện giữa hẻm, camera an ninh lại “ngủ quên”',
      lead: 'Tối qua, chị Ngọc (Hẻm 42, phố Hàng Chai) phát hiện chiếc xe đạp điện dựng trước cửa đã biến mất. Camera của khu trọ ghi hình nhưng ổ cứng đã hỏng từ tuần trước.',
      body: 'Theo người dân, hẻm 42 thường đông xe shipper qua lại vào buổi tối. Một số hộ dân cho rằng chỉ cần vài phút sơ hở là xe có thể bị dắt đi mà không ai để ý.',
    },
    comment: {
      user: 'd.ship.42',
      avatar: '🛵',
      time: '2 giờ trước',
      content: '“Khu này dạo này lắm chuyện thật, tối nào cũng có người mất đồ.”',
      clue: 'dang-bai-an-danh',
      clueLabel: 'Ghi nhận tài khoản đáng ngờ',
    },
    ordersTitle: '📋 Lịch sử đơn hàng Grab & Shipper · Đêm xảy ra vụ án',
    searchSuggestions: ['Dũng', 'Lan', '21:47', '21:58', 'xe điện', 'camera', 'Hùng', 'Vỹ'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Cảnh sát',
        title: 'Hồ sơ tài xế: Nguyễn Văn Dũng (29-E1 881.90)',
        keywords: ['dũng', 'dung', 'shipper', 'tài xế', '29-e1', 'nợ'],
        snippet: 'Đăng ký làm tài xế công nghệ từ tháng 3. Đang trong tình trạng nợ tiền sửa xe và tiền nhà trọ.',
        content:
          'Hồ sơ xác minh tài xế Dũng:\n- Biển số xe: 29-E1 881.90.\n- Tình trạng nợ: Nợ anh Hùng tiệm sửa xe 2,4 triệu đồng quá hạn 2 tuần.\n- Lời khai ban đầu: Dũng khai hoàn thành đơn cuối và về phòng trọ từ 21:15, không quay lại hẻm 42.\n- Mâu thuẫn: Hệ thống định vị app giao hàng ghi nhận Dũng nhận đơn lúc 21:47 tại hẻm 42!',
        clue: 'dung-khai-21h15',
        clueLabel: 'Lưu mâu thuẫn lời khai của Dũng',
      },
      {
        id: 'sr2',
        category: 'Camera',
        title: 'Báo cáo kỹ thuật Camera Hẻm 42',
        keywords: ['camera', 'an ninh', 'hỏng', 'bảy', 'nguồn', 'mất điện'],
        snippet: 'Nguồn điện camera bị rút lúc 20:00 do ông Bảy dọn dẹp vệ sinh quên cắm lại.',
        content:
          'Báo cáo trích xuất camera an ninh ngõ 42:\n- Trạng thái: Mất tín hiệu từ 20:00 đến 22:30.\n- Nguyên nhân: Ổ cắm điện ở cột ngõ bị rút rời. Ông Bảy tổ dân phố thừa nhận lúc 20:00 lau dọn bảng tin đã vô tình rút phích cắm mà không cắm lại.\n- Kết luận: Không có hình ảnh camera trực tiếp trong khoảng thời gian xảy ra mất cắp xe (21:10 - 21:40).',
        clue: 'camera-hong',
        clueLabel: 'Lưu ghi nhận camera hỏng',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Biên bản tiếp nhận tin báo: Xe đạp điện Nijia xanh mint',
        keywords: ['xe điện', 'xe', 'lan', 'cô lan', 'mất xe', 'xanh mint', '21:10', '21:40'],
        snippet: 'Chị Lan khoá xe lúc 21:10 tại sân chung. Đến 21:40 phát hiện cổng mở, xe biến mất.',
        content:
          'Biên bản tiếp nhận tố giác tội phạm:\n- Người báo án: Cô Đặng Thị Lan (nhà 42/3).\n- Tài sản: Xe đạp điện Nijia màu xanh mint, biển số đăng ký tạm thời.\n- Diễn biến: 21:10 khoá cổ xe để ở góc sân chung. Đến 21:40 chuẩn bị đi đón con thì thấy cổng hé mở, xe đã không còn.',
        clue: 'mat-xe',
        clueLabel: 'Lưu mốc thời gian mất xe',
      },
      {
        id: 'sr4',
        category: 'Viễn thông',
        title: 'Định vị GPS đơn hàng GN-88201',
        keywords: ['21:47', 'đơn hàng', 'gn-88201', 'lộ trình', 'định vị', 'gps'],
        snippet: 'Lộ trình đơn hàng GN-88201 chứng minh tài xế có mặt ở Hẻm 42 lúc 21:47.',
        content:
          'Dữ liệu viễn thông máy chủ Giao Hàng Siêu Tốc:\n- Mã đơn: GN-88201\n- Nhận đơn: 21:47 tại đầu hẻm 42 Hàng Chai.\n- Trả hàng: 21:52 tại phòng 301.\n- Dữ liệu GPS này khẳng định 100% Dũng nói dối về việc ở phòng từ 21:15.',
        clue: 'don-hang-2147',
        clueLabel: 'Lưu dữ liệu GPS 21:47',
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
  {
    id: 'tu-do',
    difficulty: 'Trung bình',
    maxTries: 3,
    news: {
      title: 'Mất điện thoại trong tủ khoá ở sân cầu lông',
      lead: 'Chị Hạnh, chủ sân cầu lông Hẻm 42, cho biết điện thoại để trong tủ đồ nhân viên đã biến mất chỉ sau mười phút. Tủ vẫn khoá, không có dấu cạy.',
      body: 'Sân cầu lông đông khách vào tối thứ Bảy. Camera an ninh chỉ quay cửa kho nên không ghi được khu vực tủ đồ. Chị Hạnh đã nhờ công an khu vực hỗ trợ.',
    },
    comment: {
      user: 'cau_long_pro',
      avatar: '🏸',
      time: '1 giờ trước',
      content: '“Tối đó thấy một anh mặc áo khoác đỏ đứng mãi ở vách ngăn dãy tủ đồ không chịu vào sân đánh.”',
      clue: 'son-ao-do',
      clueLabel: 'Ghi nhận người áo đỏ khả nghi',
    },
    ordersTitle: '🏸 Nhật ký ra vào sân & Quầy nước · Tối xảy ra vụ trộm',
    searchSuggestions: ['Sơn', 'Linh', 'áo đỏ', 'tủ đồ', '6 triệu', 'chìa khóa', 'Hạnh', 'chuyển khoản'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Cảnh sát',
        title: 'Hồ sơ nhân viên: Trần Văn Sơn (Nhặt cầu ca tối)',
        keywords: ['sơn', 'son', 'áo đỏ', 'ao do', 'nhặt cầu', '6 triệu', 'nợ'],
        snippet: 'Sơn làm việc bán thời gian tại sân. Đang bị chị Hạnh nhắc nợ 6 triệu quá hạn lần thứ 3.',
        content:
          'Xác minh nhân thân Trần Văn Sơn:\n- Nhiệm vụ: Nhặt cầu và dọn sân ca từ 19:00 - 22:00.\n- Đặc điểm nhận dạng tối 12/9: Mặc áo khoác gió màu đỏ, quần lửng đen.\n- Tài chính: Vay chị Hạnh 6.000.000đ từ tháng trước, hứa trả cuối tháng nhưng trốn tránh. 20:44 phát hiện bản nháp rao bán máy điện thoại 98% giá 5 triệu!',
        clue: 'son-no-tien',
        clueLabel: 'Lưu khoản nợ 6 triệu của Sơn',
      },
      {
        id: 'sr2',
        category: 'Pháp y',
        title: 'Biên bản khám nghiệm tủ đồ số 04',
        keywords: ['tủ đồ', 'tu do', 'chìa khóa', 'khe hở', 'lỗ hổng', 'bản lề', 'đinh tán'],
        snippet: 'Khám nghiệm tủ số 04 nơi để điện thoại: Khe hở nóc tủ bị vênh 3.5cm, chìa khoá phụ không bị sao chép.',
        content:
          'Kết quả khám nghiệm hiện trường tủ cá nhân số 04:\n- Ổ khoá vẫn nguyên vẹn ở trạng thái khoá.\n- Nóc tủ bằng tôn mỏng bị lỏng đinh tán, tạo khe hở rộng 3.5cm - 4cm.\n- Thực nghiệm điều tra: Người có bàn tay thon dài có thể dễ dàng luồn tay qua khe nóc tủ để móc chiếc điện thoại ra ngoài mà hoàn toàn không cần tra chìa khoá!',
        clue: 'lo-hong-tu',
        clueLabel: 'Lưu lỗ hổng nóc tủ đồ',
      },
      {
        id: 'sr3',
        category: 'Ngân hàng',
        title: 'Sao kê tài khoản quầy nước: Linh',
        keywords: ['linh', 'sao kê', 'chuyển khoản', 'ngân hàng', 'quầy nước', 'nước khoáng'],
        snippet: 'Linh nhận tiền nước chuyển khoản từ khách lúc 20:30, gọi điện thoại cho mẹ lúc 20:40.',
        content:
          'Sao kê ngân hàng và lịch sử cước điện thoại của Linh:\n- 20:30: Khách sân số 2 chuyển khoản 150.000đ tiền nước khoáng.\n- 20:40: Cuộc gọi đi đến số mẹ Linh kéo dài 8 phút (khớp với ảnh chụp quầy nước).\n- Alibi của Linh tại quầy nước hoàn toàn rõ ràng và có người chứng minh.',
        clue: 'chuyen-khoan-linh',
        clueLabel: 'Lưu alibi chuyển khoản của Linh',
      },
      {
        id: 'sr4',
        category: 'Cảnh sát',
        title: 'Báo cáo ban đầu: Mất trộm iPhone 14 Pro Max',
        keywords: ['mất dt', 'hạnh', 'điện thoại', 'mất máy', 'iphone'],
        snippet: 'Chị Hạnh cất điện thoại vào tủ lúc 20:15. Đến 20:35 mở tủ thì điện thoại đã biến mất.',
        content:
          'Chi tiết tố giác của chị Hạnh (chủ sân):\n- Thiết bị: iPhone 14 Pro Max màu tím.\n- Vị trí: Để trong túi xách đặt tại ngăn tủ số 04 lúc 20:15 và khoá cẩn thận.\n- Thời gian phát hiện mất: 20:35.',
        clue: 'mat-dt',
        clueLabel: 'Lưu tin báo mất điện thoại',
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
  {
    id: 'hoi-cho',
    difficulty: 'Khó',
    maxTries: 3,
    news: {
      title: 'Hội chợ Trung thu mất 8 triệu tiền quỹ từ thiện',
      lead: 'Ban tổ chức hội chợ Hẻm 42 cho biết hòm quỹ từ thiện bị cạy ngay trong đêm khai mạc, đúng lúc cả khu mất điện. Số tiền thiếu là 8 triệu đồng.',
      body: 'Camera an ninh tắt cùng lúc mất điện nên không ghi được hình ảnh. Ban tổ chức đang rà soát những người giữ chìa hòm và lịch trực trong buổi tối.',
    },
    comment: {
      user: 'dan_cu_hangchai',
      avatar: '🏮',
      time: '30 phút trước',
      content: '“Đang hát thì phụp điện tối om, tôi nghe rõ tiếng cạy sắt cọt kẹt ở góc hòm quỹ từ thiện!”',
      clue: 'ket-cay',
      clueLabel: 'Ghi nhận tiếng cạy hòm lúc mất điện',
    },
    ordersTitle: '🎪 Lịch sử giao dịch & Camera hội chợ Trung thu',
    searchSuggestions: ['Trang', 'Khoa', 'Tú', 'hòm quỹ', '8 triệu', 'giày bùn', 'cắt điện', 'bùn'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Ngân hàng',
        title: 'Giao dịch chuyển tiền khẩn cấp lúc 21:32',
        keywords: ['trang', '8 triệu', 'tú', 'chuyển khoản', '21:32', 'chủ nợ', 'nợ'],
        snippet: 'Tài khoản Trang thực hiện chuyển khoản 8.000.000đ cho Tú (chủ nợ) đúng lúc 21:32.',
        content:
          'Sao kê hệ thống ngân hàng liên kết:\n- Thời gian giao dịch: 21:32:15\n- Người gửi: Nguyễn Thu Trang\n- Người nhận: Vũ Đình Tú\n- Số tiền: 8.000.000 VNĐ\n- Nội dung: "Trang tra no dut diem"\n- Mâu thuẫn: Trang luôn khai báo gia đình khó khăn, không có tiền trả nợ và chưa từng đụng đến hòm quỹ!',
        clue: 'chuyen-tien-trng',
        clueLabel: 'Lưu lệnh chuyển khoản 8 triệu của Trang',
      },
      {
        id: 'sr2',
        category: 'Pháp y',
        title: 'Giám định mẫu bùn đất đỏ trên giày Trang',
        keywords: ['giày bùn', 'giày', 'bùn đỏ', 'đất sét', 'bãi cỏ', 'bùn'],
        snippet: 'Mẫu bùn đỏ bám trên giày Trang có cùng thành phần khoáng vật với bãi cỏ phía sau hòm quỹ.',
        content:
          'Báo cáo giám định địa chất hình sự:\n- Vật mẫu: Bùn bám trên mũi giày thể thao trắng của Nguyễn Thu Trang.\n- Phân tích: Đất sét đỏ pha phù sa và rễ cỏ non mục nát.\n- Đối chiếu: Khu vực hội chợ được đổ bê tông khô ráo. Duy nhất bãi đất cỏ trũng phía sau bệ đặt hòm quỹ từ thiện có loại bùn đỏ ẩm ướt này. Chứng minh Trang đã lén vòng ra sau hòm quỹ!',
        clue: 'trang-giay',
        clueLabel: 'Lưu chứng cứ giày dính bùn đỏ',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Hồ sơ đối tượng đòi nợ: Vũ Đình Tú',
        keywords: ['tú', 'tu', 'chủ nợ', 'đòi nợ', 'quán phúc', 'hoá đơn'],
        snippet: 'Tú vào đòi nợ Trang lúc 20:58, ngồi uống nước ở quán Phúc đến 21:25 trả bill có người làm chứng.',
        content:
          'Xác minh alibi của Tú:\n- Tú đến cổng hội chợ đòi nợ Trang 8 triệu từ chiều.\n- Hoá đơn quán nước anh Phúc: Tú ngồi bàn ngoài từ 20:57 đến 21:25, thanh toán tiền mặt lúc 21:25.\n- Tú không tiếp cận khu vực hòm quỹ, nhận được tiền chuyển khoản lúc 21:32 khi đang ở đầu ngõ.',
        clue: 'tu-o-quan-phuc',
        clueLabel: 'Lưu alibi ở quán Phúc của Tú',
      },
      {
        id: 'sr4',
        category: 'Camera',
        title: 'Camera hội chợ 20:48: Lê Đăng Khoa',
        keywords: ['khoa', 'camera', 'hòm quỹ', 'vỏ hộp', 'bánh'],
        snippet: 'Khoa cúi người gần hòm quỹ lúc 20:48 để nhặt vỏ hộp bánh bị vứt bừa bãi.',
        content:
          'Giải mã camera lúc 20:48:\n- Khoa cúi nhặt vỏ hộp bánh kẹo của khách vứt bừa bãi cạnh bệ hòm quỹ.\n- Tay trái Khoa quấn băng y tế do bị đứt tay lúc khiêng khung rạp lúc 19:30. Khoa không mang theo dụng cụ cạy phá.',
        clue: 'khoa-gan-hom',
        clueLabel: 'Lưu giải trình camera của Khoa',
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
  {
    id: 'chung-cu',
    difficulty: 'Siêu khó',
    maxTries: 2,
    code: { value: '2147', hint: 'Mã 4 số: giờ hẹn trong ghi chú cuối cùng của Khải.' },
    accomplice: 'tu',
    news: {
      title: 'Chung cư 42: két sắt mở toang trong đêm mất điện, kỹ thuật viên bất tỉnh',
      lead: 'Két sắt phòng quản lý chung cư cũ Hẻm 42 bị mở, mất 200 triệu đồng và một cuốn sổ. Cửa két không có dấu cạy. Anh Khải, kỹ thuật viên toà nhà, được tìm thấy bất tỉnh ở tầng hầm.',
      body: 'Toàn block mất điện gần 45 phút, camera hành lang ngừng ghi trước đó hai phút. Công an đang xác minh lịch trực của bảo vệ và những người nắm mã két.',
    },
    comment: {
      user: 'baove_toanha',
      avatar: '🏢',
      time: '45 phút trước',
      content: '“Lúc mất điện có người áo sơ mi xách túi nilông đen vội vàng đi ra lối thoát hiểm hẻm sau.”',
      clue: 'tui-den',
      clueLabel: 'Ghi nhận đối tượng vứt túi đen',
    },
    ordersTitle: '🏢 Nhật ký vận hành hệ thống điện & Báo động két sắt chung cư',
    searchSuggestions: ['Đạt', 'Khải', 'Bảy', '2147', '200 triệu', 'túi đen', 'sổ nợ', 'mất điện'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Cảnh sát',
        title: 'Nhật ký mở két sắt điện tử số hiệu KS-42',
        keywords: ['2147', 'mã két', 'két sắt', 'mật mã', 'nhật ký', 'mở két'],
        snippet: 'Két sắt mở thành công lúc 21:47 đúng 1 lần bằng mã 2147. Cửa không có dấu hiệu cạy phá.',
        content:
          'Trích xuất chip nhớ két sắt thông minh phòng tài vụ:\n- 21:47:02: Nhập đúng mật khẩu "2147", chốt điện tử nhả chốt.\n- Tình trạng vật lý: Không có vết cạy nạy, ổ khoá cơ không bị tác động.\n- Mã số này trùng khớp hoàn toàn với giờ hẹn mà quản lý Đạt hẹn gặp kỹ thuật viên Khải ở tầng hầm!',
        clue: 'ma-ket',
        clueLabel: 'Lưu mã két 2147',
      },
      {
        id: 'sr2',
        category: 'Ngân hàng',
        title: 'Lệnh chuyển khoản 200.000.000đ từ tài khoản công ty',
        keywords: ['đạt', 'bảy', '200 triệu', 'chuyển khoản', '21:50', 'sổ nợ'],
        snippet: 'Lúc 21:50 tài khoản công ty thực hiện lệnh chuyển 200 triệu đồng cho Bảy (nhà 17), duyệt bởi Đạt.',
        content:
          'Lịch sử giao dịch Internet Banking:\n- 21:50:44: Chuyển 200.000.000 VNĐ cho tài khoản mang tên Nguyễn Văn Bảy.\n- Người ký duyệt hạn mức: Quản lý Trần Tuấn Đạt.\n- Động cơ: Cuốn sổ nợ tìm thấy cho thấy Đạt nợ Bảy 250 triệu hạn chót tối nay nếu không sẽ bị xiết nhà!',
        clue: 'chuyen-khoan',
        clueLabel: 'Lưu lệnh chuyển khoản 200 triệu',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Vật chứng túi nilông đen tại thùng rác',
        keywords: ['túi đen', 'tui den', 'găng tay', 'sổ nâu', 'cô nga', 'rác'],
        snippet: 'Cô Nga phát hiện túi nilông đen Đạt vứt: chứa găng tay cao su, trang sổ nợ bị xé và mảnh giấy ghi 2147.',
        content:
          'Biên bản thu giữ đồ vật, tài liệu do nhân chứng giao nộp:\n- Nhân chứng: Cô Nga (nhà đối diện hẻm sau chung cư).\n- Lời khai: 21:30 thấy Đạt mặt biến sắc, ném túi đen vào thùng rác.\n- Tang vật bên trong: Đôi găng tay y tế dính bụi tầng hầm, một cuốn sổ nâu có dấu xé trang nợ, và mẩu giấy note ghi 4 chữ số "2147".',
        clue: 'tui-den',
        clueLabel: 'Lưu vật chứng túi đen',
      },
      {
        id: 'sr4',
        category: 'Viễn thông',
        title: 'Bản ghi âm tự động trong máy kỹ thuật viên Khải',
        keywords: ['khải', 'ghi âm', '21:12', 'tầng hầm', 'đạt', 'bất tỉnh'],
        snippet: 'Máy Khải ghi âm tự động lúc 21:12: “Anh Đạt, sao anh ở đây—” rồi tiếng va đập và bước chân chạy.',
        content:
          'Phục hồi dữ liệu điện thoại của nạn nhân Khải:\n- 21:12: File âm thanh ghi lại câu nói hốt hoảng của Khải khi chạm mặt Đạt tại phòng biến áp tầng hầm.\n- Ngay sau đó là tiếng hung khí đập mạnh và tiếng chìa khoá rơi xuống sàn.\n- Khẳng định Đạt đã tấn công Khải để cướp chìa và ngắt điện toàn toà nhà!',
        clue: 'khai-ghi-am',
        clueLabel: 'Lưu bản ghi âm 21:12 của Khải',
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
  {
    id: 'an-mang',
    difficulty: 'Siêu khó',
    maxTries: 2,
    code: { value: '2130', hint: 'Mã 4 số: Giờ thực tế ấm trà thông minh đun sôi pha tách trà độc (dạng HHMM).' },
    accomplice: 'yen',
    news: {
      title: 'Kỳ án phòng kín Hẻm 42: Nhà sưu tầm cổ vật tử vong bên tách trà độc',
      lead: 'Đêm mưa bão 17/10, ông Hoàng Khang được phát hiện tử vong gục trên bàn trà. Cửa phòng trà khoá then cài bên trong, đồng hồ trên tay nạn nhân vỡ kẹt ở 22:15, nhưng nhiều bằng chứng khoa học cho thấy đây là vụ mưu sát được tính toán tinh vi.',
      body: 'Pháp y phát hiện chất kịch độc Aconitine trong chén trà và sợi chỉ cước vướng ở chốt then cài cửa sổ. Bản thảo di chúc 30 tỷ vừa được soạn thảo chiều cùng ngày đã biến mất bí ẩn.',
    },
    comment: {
      user: 'hangxom_nha42',
      avatar: '🍵',
      time: '15 phút trước',
      content: '“Khoảng hơn 21h mưa to có thấy bóng người mang giày da trèo qua ban công sau phòng trà ông Khang!”',
      clue: 'vet-bun-ban-cong',
      clueLabel: 'Ghi nhận dấu vết ban công',
    },
    ordersTitle: '☕ Log thiết bị thông minh & Lịch sử viễn thông phòng trà',
    searchSuggestions: ['Vũ', 'Aconitine', 'di chúc', '21:30', 'ấm trà', 'chỉ cước', 'Yến', '22:15', 'Long Châu'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Pháp y',
        title: 'Báo cáo độc chất học: Độc tính Aconitine trong chén trà',
        keywords: ['aconitine', 'doc chat', 'độc chất', 'lọ độc', 'bể lọc', 'chén trà', 'củ ấu tàu'],
        snippet: 'Chất kịch độc Aconitine chiết xuất củ ấu tàu. Lọ độc tìm thấy ở bể lọc non bộ mang vân tay Vũ Hoàng.',
        content:
          'Kết luận Viện Pháp Y Quốc gia:\n- Nạn nhân ngộ độc cấp tính chất Aconitine – loại độc dược cực mạnh tác động trực tiếp vào hệ thần kinh và tim mạch khiến nạn nhân ngừng tim trong vòng 10-15 phút.\n- Lọ thủy tinh 10ml vớt từ đáy bể lọc nước non bộ ngoài sân còn đọng dư lượng Aconitine.\n- Giám định vân tay: Dấu vân tay trên cổ lọ thủy tinh trùng khớp 100% với ngón trỏ phải của Bác sĩ Vũ Hoàng!',
        clue: 'lo-doc-non-bo',
        clueLabel: 'Lưu vân tay trên lọ độc Aconitine',
      },
      {
        id: 'sr2',
        category: 'Viễn thông',
        title: 'Nhật ký thiết bị IoT Ấm đun siêu tốc Xiaomi Smart',
        keywords: ['21:30', 'ấm trà', 'am tra', 'nhiệt độ', 'nhat ky', 'iot', 'dong ho', 'đồng hồ'],
        snippet: 'Ấm đun sôi lúc 21:30:04 đạt 100°C. 22:15 nước trong chén trà đã nguội lạnh còn 43°C.',
        content:
          'Trích xuất dữ liệu đám mây ấm trà thông minh kết nối Wifi:\n- 21:30:04: Hoàn thành đun sôi 100°C, chuyển chế độ pha trà Thiết Quan Âm.\n- Đo lường nhiệt động học: Tách trà trên bàn nạn nhân đã pha lúc 21:30 và nhiệt độ giảm liên tục.\n- Vạch trần thủ đoạn: Đồng hồ trên tay nạn nhân vỡ kẹt ở 22:15 là do hung thủ cố tình đập vỡ để tạo mốc thời gian tử vong giả, hòng dựng alibi cuộc gọi video ở tiệm thuốc Long Châu!',
        clue: 'nhiet-do-am-tra',
        clueLabel: 'Lưu giờ đun trà thực tế 21:30',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Phục hồi tài liệu: Bản thảo Di chúc ngày 17/10',
        keywords: ['di chúc', 'di chuc', 'vũ', 'hoàng', '30 tỷ', 'thừa kế', 'truất quyền'],
        snippet: 'Bản di chúc xé nát trong phòng Vũ: Ông Khang truất quyền thừa kế của Vũ vì khoản nợ cờ bạc 3.5 tỷ.',
        content:
          'Kết quả ghép nối tài liệu từ máy hủy giấy:\n- Người lập: Ông Hoàng Khang (72 tuổi).\n- Thời gian lập: 20:30 tối ngày 17/10/2026.\n- Nội dung cốt lõi: "Tôi quyết định truất toàn bộ quyền thừa kế hợp pháp của cháu trai Vũ Hoàng do thói cờ bạc nợ nần không sửa đổi. Toàn bộ khối tài sản trị giá 30 tỷ đồng và cổ vật sẽ được quyên tặng Quỹ bảo trợ trẻ em."\n- Đây chính là động cơ giết người tuyệt vọng của Bác sĩ Vũ Hoàng!',
        clue: 'di-chuc-truat-quyen',
        clueLabel: 'Lưu động cơ từ bản di chúc bị xé',
      },
      {
        id: 'sr4',
        category: 'Ngân hàng',
        title: 'Lệnh chuyển khoản cọc 200.000.000đ cho Yến giúp việc',
        keywords: ['yến', 'yen', 'chuyển khoản', '200 triệu', 'tiền cọc', 'cầu dao', 'đồng phạm'],
        snippet: 'Vũ chuyển 200 triệu cho Yến lúc 18:00 cùng tin nhắn yêu cầu ngắt cầu dao tầng 2 lúc 21:20.',
        content:
          'Lịch sử giao dịch tài khoản cá nhân Vũ Hoàng:\n- 18:00: Chuyển 200.000.000 VNĐ cho Nguyễn Thị Yến (giúp việc nhà nạn nhân).\n- Tin nhắn Zola khôi phục từ máy Yến: "Đúng 21:20 gạt cầu dao tầng 2 ngắt camera cho anh. Canh chừng ngoài bếp, xong việc anh chuyển nốt 2 tỷ như đã hứa".\n- Bằng chứng không thể chối cãi về vai trò đồng phạm trực tiếp của Yến!',
        clue: 'chuyen-khoan-yen',
        clueLabel: 'Lưu lệnh chuyển khoản đồng phạm',
      },
      {
        id: 'sr5',
        category: 'Cảnh sát',
        title: 'Khám nghiệm hiện trường ban công & then cài cửa sổ',
        keywords: ['ban công', 'cửa sổ', 'chỉ cước', 'chi cuoc', 'then cài', 'size 42', 'phòng kín'],
        snippet: 'Sợi chỉ cước câu cá mắc ở then cài trong cửa sổ và vết bùn đế giày da size 42 ở ban công.',
        content:
          'Giải mã mánh khoé tạo hiện trường phòng kín:\n- Chốt then cài gỗ cửa sổ có dấu vết ma sát của sợi chỉ cước câu cá nylon siêu bền.\n- Phương thức gây án: Sau khi hạ độc và dựng hiện trường, hung thủ bước ra ngoài ban công, luồn sợi cước qua khe hở phía trên rồi giật mạnh để then cài bên trong trượt xuống khoá chốt, tạo phòng kín tuyệt đối!\n- Trên thành ban công còn lưu lại vệt bùn đất in rõ hoa văn đế giày da Pierre Cardin size 42 của nam giới.',
        clue: 'then-cai-chi-cuoc',
        clueLabel: 'Lưu mánh khóe chỉ cước khoá then cài',
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
]
