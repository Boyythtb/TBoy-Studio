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
      title: 'Mất xe đạp điện giữa hẻm 42, camera an ninh ngõ lại mất nguồn',
      lead: 'Tối thứ Sáu, cô Lan phát hiện chiếc xe đạp điện Nijia xanh mint dựng trước sân nhà đã biến mất. Cổng ngõ mở toang, người dân nghi ngờ tài xế giao hàng hoặc người thuê trọ.',
      body: 'Hiện trường cho thấy camera ngõ bị mất điện từ 20:00 do ông Bảy dọn dẹp rút nhầm phích cắm. Tuy nhiên, hệ thống camera giao thông ngã tư phố Hàng Chai và định vị GPS của các app giao hàng vẫn hoạt động bình thường.',
    },
    comment: {
      user: 'd.ship.42',
      avatar: '🛵',
      time: '2 giờ trước',
      content: '“Khu này dạo này lắm chuyện thật, tôi chạy cuốc về mệt ngủ từ 21:15 đừng ai réo tên tôi vu oan!”',
      clue: 'dung-khai-21h15',
      clueLabel: 'Ghi nhận lời khai mâu thuẫn của Dũng',
    },
    ordersTitle: '📋 Lịch sử đơn hàng GiaoNhanh & Camera ngã tư · Đêm xảy ra vụ án',
    searchSuggestions: ['Dũng', 'Vy', 'Sơn', '21:47', 'xe điện', 'Chợ Tốt', 'Camera Phường', 'Long Châu', 'Hùng Net'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Viễn thông',
        title: 'Định vị GPS đơn hàng GN-88214: Tài xế Dũng',
        keywords: ['21:47', 'đơn hàng', 'gn-88214', 'dũng', 'lộ trình', 'định vị', 'gps'],
        snippet: 'Hệ thống GiaoNhanh ghi nhận tài xế Dũng có mặt lấy hàng tại Hẻm 42 lúc 21:47.',
        content:
          'Dữ liệu viễn thông máy chủ GiaoNhanh (giaonhanh.vn):\n- Mã đơn: GN-88214\n- Nhận đơn: 21:47 tại đầu hẻm 42 Hàng Chai (Quán net Hùng).\n- Trả hàng: 21:52 tại hẻm 44.\n- Dữ liệu GPS này khẳng định 100% Dũng nói dối về việc ở phòng ngủ từ 21:15.',
        clue: 'don-hang-2147',
        clueLabel: 'Lưu dữ liệu GPS 21:47 của Dũng',
      },
      {
        id: 'sr2',
        category: 'Camera',
        title: 'Camera An Ninh Ngã Tư Hàng Chai - Phố Cửa Đông',
        keywords: ['camera', 'an ninh', 'ngã tư', 'xanh mint', '21:49', 'dũng'],
        snippet: 'Camera ngã tư ghi nhận xe đạp điện xanh mint chạy qua lúc 21:49 do tài xế GiaoNhanh điều khiển.',
        content:
          'Trích xuất camera giao thông (camera-phuong.gov.vn) CAM-102:\n- Lúc 21:49: Chiếc xe đạp điện màu xanh mint của cô Lan chạy vụt qua ngã tư hướng về hẻm 44.\n- Người điều khiển mặc đồng phục shipper GiaoNhanh có vóc dáng trùng khớp hoàn toàn với Nguyễn Văn Dũng.',
        clue: 'don-hang-2147',
        clueLabel: 'Lưu hình ảnh camera xe xanh chạy qua lúc 21:49',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Xác minh tin đăng rao vặt của Vy trên Chợ Tốt',
        keywords: ['vy', 'chợ tốt', 'chotot', 'xe đỏ', 'asama', 'tiền trọ'],
        snippet: 'Vy đăng bán xe đạp điện Asama màu đỏ cũ của mình từ 3 ngày trước, không phải xe cô Lan.',
        content:
          'Đối soát tin đăng CT-101 trên Chợ Tốt (chotot.vn):\n- Người đăng: Vy (vy.socute).\n- Xe rao bán: Xe đạp điện Asama màu ĐỎ, giá 2.500.000đ.\n- Thời gian đăng: 18:00 cách đây 3 ngày để đóng tiền phòng trọ.\n- Kết luận: Vy bị nghi ngờ oan, chiếc xe của cô Lan bị mất là xe Nijia màu xanh mint!',
        clue: 'vy-xe-do',
        clueLabel: 'Lưu xác minh Vy bán xe đỏ cũ từ 3 hôm trước',
      },
      {
        id: 'sr4',
        category: 'Cảnh sát',
        title: 'Hồ sơ tài xế: Nguyễn Văn Dũng (Nợ 5 triệu)',
        keywords: ['dũng', 'hùng', '5 triệu', 'nợ', 'sửa xe', 'hạn chót'],
        snippet: 'Dũng nợ Hùng chủ quán net 5 triệu tiền sửa xe đến hạn chót phải trả trong đêm.',
        content:
          'Xác minh nợ nần tài xế Dũng:\n- Nợ anh Hùng tiệm sửa xe 5.000.000đ quá hạn 2 tuần.\n- Tin nhắn đòi nợ: "Hạn chót hôm nay, đừng để anh sang phòng trọ".\n- Động cơ: Túng thiếu tài chính thúc đẩy Dũng trộm xe đem bán.',
        clue: 'hung-cho-vay',
        clueLabel: 'Lưu động cơ nợ 5 triệu của Dũng',
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
      title: 'Mất iPhone 14 Pro Max trong tủ khoá ở sân cầu lông Hẻm 42',
      lead: 'Chị Hạnh, chủ sân cầu lông, cho biết chiếc điện thoại để trong tủ cá nhân số 04 đã biến mất chỉ sau mười phút. Tủ vẫn khoá, ổ khoá cơ không hề có vết cạy.',
      body: 'Ngay sau vụ mất trộm, trên mạng xuất hiện tin đăng rao bán chiếc máy đúng đặc điểm với giá bèo 5 triệu. Công an đang rà soát dữ liệu rao vặt và camera bãi xe.',
    },
    comment: {
      user: 'cau_long_pro',
      avatar: '🏸',
      time: '1 giờ trước',
      content: '“Tối đó thấy một anh mặc áo khoác đỏ lén đi ra sau vách tôn dãy tủ đồ ngó nghiêng rất lâu!”',
      clue: 'son-ao-do',
      clueLabel: 'Ghi nhận người áo đỏ khả nghi sau vách tủ',
    },
    ordersTitle: '🏸 Nhật ký ra vào sân & Giao dịch Chợ Tốt · Tối xảy ra vụ trộm',
    searchSuggestions: ['Sơn', 'Hào', 'Linh', 'Chợ Tốt', 'áo đỏ', 'tủ đồ', '6 triệu', 'iPhone', 'khe hở'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Cảnh sát',
        title: 'Giải mã tin đăng bán máy gài bẫy số Hào trên Chợ Tốt',
        keywords: ['chợ tốt', 'chotot', 'hào', 'sơn', '5 triệu', 'iphone', '0982'],
        snippet: 'Tin CT-201 trên Chợ Tốt bán iPhone 14 Pro Max 5 triệu là do kẻ gian dùng máy chị Hạnh gài số của Hào.',
        content:
          'Phân tích tin rao vặt CT-201 trên Chợ Tốt (chotot.vn):\n- Thời gian đăng: 20:44 từ chính chiếc máy bị trộm của chị Hạnh.\n- Người bán ghi: SĐT 0982xxx999 (Số điện thoại của Hào).\n- Mục đích: Kẻ gian muốn vừa tống khứ điện thoại lấy 5 triệu, vừa gài bẫy vu oan giá hoạ cho Hào!\n- Thực tế: Hào có alibi vững chắc khi đang thi đấu trên sân 2.',
        clue: 'tin-nhan-ban',
        clueLabel: 'Lưu chứng cứ gài bẫy số điện thoại trên Chợ Tốt',
      },
      {
        id: 'sr2',
        category: 'Camera',
        title: 'Camera Lối Vào Sân Số 2: Alibi của Hào',
        keywords: ['hào', 'sân 2', 'thi đấu', 'camera', 'alibi', 'set 3'],
        snippet: 'Camera CAM-202 xác nhận Hào thi đấu liên tục trên sân số 2 từ 20:30 đến 21:00.',
        content:
          'Trích xuất camera lối vào sân 2 (camera-phuong.gov.vn):\n- Từ 20:30 đến 21:00: Hào thi đấu set 3 kịch tính với anh Tuấn HLV.\n- Khán giả và trọng tài đều làm chứng Hào không rời sân một phút nào.\n- Bàn tay Hào to thô không thể thò lọt khe nóc tủ 3.5cm.',
        clue: 'hao-o-san-2',
        clueLabel: 'Lưu alibi thi đấu sân 2 của Hào',
      },
      {
        id: 'sr3',
        category: 'Pháp y',
        title: 'Biên bản khám nghiệm tủ đồ số 04',
        keywords: ['tủ đồ', 'tu do', 'khe hở', 'lỗ hổng', 'nóc tủ', 'bản lề', 'đinh tán'],
        snippet: 'Khám nghiệm tủ số 04: Nóc tủ bị lỏng đinh tán tạo khe hở 3.5cm, đủ để bàn tay thon luồn qua.',
        content:
          'Kết quả khám nghiệm hiện trường tủ cá nhân số 04:\n- Ổ khoá vẫn nguyên vẹn ở trạng thái khoá.\n- Nóc tủ bằng tôn mỏng bị lỏng đinh tán, tạo khe hở rộng 3.5cm - 4cm.\n- Thực nghiệm điều tra: Người có bàn tay thon dài (như Sơn nhặt cầu) có thể dễ dàng luồn tay qua khe nóc tủ để móc chiếc điện thoại ra ngoài!',
        clue: 'lo-hong-tu',
        clueLabel: 'Lưu lỗ hổng nóc tủ đồ',
      },
      {
        id: 'sr4',
        category: 'Camera',
        title: 'Camera Bãi Xe: Sơn mặc áo khoác đỏ lúc 20:25',
        keywords: ['sơn', 'áo đỏ', 'ao do', 'bãi xe', '20:25', 'nợ', '6 triệu'],
        snippet: 'Camera bãi xe ghi nhận Sơn mặc áo đỏ lén lút thò tay vào khe nóc tủ lúc 20:25.',
        content:
          'Trích xuất camera CAM-201 (camera-phuong.gov.vn):\n- 20:25: Sơn mặc áo khoác gió màu đỏ lách người vào ngách sau vách tôn tủ đồ.\n- Sơn thò tay vào khe hở nóc tủ số 4 trong 3 phút rồi nhanh chóng rút lui.\n- Động cơ: Sơn nợ chị Hạnh 6 triệu tiền sân quá hạn.',
        clue: 'son-ao-do',
        clueLabel: 'Lưu hình ảnh Sơn thò tay vào khe tủ lúc 20:25',
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
      title: 'Hội chợ Trung thu mất 8 triệu tiền quỹ từ thiện trong 15 phút mất điện',
      lead: 'Ban tổ chức hội chợ Chùa Pháp Hoa cho biết hòm quỹ từ thiện bị cạy khoá ngay trong đêm khai mạc, đúng lúc cả khu mất điện do aptomat nhánh bị ngắt.',
      body: 'Một đối tượng đòi nợ bị công an kiểm tra phát hiện có 8 triệu tiền mặt trong người, trong khi một tình nguyện viên bị nghi ngờ vì lúi húi gần bệ hòm. Cảnh sát đang phân tích mẫu bùn đất và sao kê ngân hàng.',
    },
    comment: {
      user: 'dan_cu_hangchai',
      avatar: '🏮',
      time: '30 phút trước',
      content: '“Đang mất điện tối om, tôi nghe rõ tiếng bước chân chạy vội từ bãi cỏ sau bệ hòm quỹ!”',
      clue: 'trang-giay',
      clueLabel: 'Ghi nhận bước chân sau bãi cỏ bệ hòm',
    },
    ordersTitle: '🎪 Lịch sử giao dịch VietinBank & Camera hội chợ Trung thu',
    searchSuggestions: ['Trang', 'Tú', 'Khoa', 'Long Châu', 'VietinBank', '8 triệu', 'giày bùn', 'bỏng tay'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Ngân hàng',
        title: 'Giao dịch chuyển tiền khẩn cấp lúc 21:32 của Trang',
        keywords: ['trang', '8 triệu', 'tú', 'chuyển khoản', '21:32', 'chủ nợ', 'vietinbank'],
        snippet: 'Tài khoản Trang thực hiện chuyển khoản 8.000.000đ cho Tú (chủ nợ) đúng lúc 21:32.',
        content:
          'Sao kê VietinBank (vietinbank.vn) TX-99812:\n- Thời gian giao dịch: 21:32:15\n- Người gửi: Nguyễn Thu Trang\n- Người nhận: Vũ Đình Tú\n- Số tiền: 8.000.000 VNĐ\n- Nội dung: "Trang banh mi chuyen tra no goc lai thang 9 cho anh Tu"\n- Vạch trần việc Trang vừa trộm 8 triệu từ hòm quỹ lúc mất điện đã chuyển ngay cho chủ nợ!',
        clue: 'chuyen-tien-trng',
        clueLabel: 'Lưu lệnh chuyển khoản 8 triệu của Trang',
      },
      {
        id: 'sr2',
        category: 'Camera',
        title: 'Camera An Ninh Cổng Tam Quan: Trang dính bùn đỏ lúc 21:02',
        keywords: ['trang', 'giày bùn', 'bùn đỏ', '21:02', 'bãi cỏ', 'túi xách'],
        snippet: 'Camera CAM-302 ghi nhận Trang chạy ra từ bãi cỏ sau hòm quỹ lúc 21:02 với túi xách căng phồng.',
        content:
          'Trích xuất camera CAM-302 (camera-phuong.gov.vn):\n- 21:02 (Lúc mất điện): Trang mặc tạp dề bánh mì, đi giày bata trắng chạy vội từ bãi cỏ trũng phía sau bệ hòm quỹ ra ngoài.\n- Đôi giày trắng của Trang dính bùn đỏ bết bát. Bùn đỏ chỉ có duy nhất ở bãi đất trũng sau bệ hòm!',
        clue: 'trang-giay',
        clueLabel: 'Lưu hình ảnh giày Trang dính bùn đỏ lúc 21:02',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Hồ sơ sơ cứu bỏng tay của Khoa tại Long Châu',
        keywords: ['khoa', 'long châu', 'longchau', 'bỏng tay', '20:40', '20:42', 'băng gạc'],
        snippet: 'Khoa bị bỏng nước sôi lúc 20:40, Nhà thuốc Long Châu băng kín tay trái không thể cạy két.',
        content:
          'Biên lai LC-301 tại Nhà Thuốc Long Châu (nhathuoc-longchau42.vn):\n- Thời gian: 20:42: Bệnh nhân Lê Đăng Khoa được sơ cứu bỏng nước sôi cấp độ 2.\n- Toàn bộ mu bàn tay trái được quấn băng thun to tướng.\n- Kết luận: Bàn tay bị bỏng nặng không thể cầm kìm hay cạy khoá sắt lúc 20:55!',
        clue: 'khoa-bi-thuong',
        clueLabel: 'Lưu hồ sơ bỏng tay của Khoa tại Long Châu',
      },
      {
        id: 'sr4',
        category: 'Camera',
        title: 'Camera Quán Trà Phúc: Alibi của Tú Tài Chính',
        keywords: ['tú', 'tu', 'quán phúc', 'trà đá', '20:57', '21:25', '8 triệu tiền mặt'],
        snippet: 'Tú ngồi tại quán trà đá anh Phúc từ 20:57 đến 21:25, tiền mặt 8 triệu là vừa rút ATM sau khi Trang chuyển.',
        content:
          'Xác minh alibi của Tú:\n- Camera CAM-301 và hoá đơn quán Phúc: Tú ngồi bàn ngoài từ 20:57 đến 21:25.\n- 21:32: Nhận 8 triệu chuyển khoản từ Trang.\n- 21:34: Ra cây ATM đầu ngõ rút tiền mặt về.\n- Tú hoàn toàn không tiếp cận hòm quỹ từ thiện.',
        clue: 'tu-o-quan-phuc',
        clueLabel: 'Lưu alibi ở quán Phúc của Tú',
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
    code: { value: '2147', hint: 'Mã 4 số: Giờ hẹn trong ghi chú cuối cùng của Khải và mã két Đạt đổi.' },
    accomplice: 'tu',
    news: {
      title: 'Chung cư 42: két sắt mở toang trong đêm mất điện, kỹ thuật viên bất tỉnh',
      lead: 'Két sắt phòng quản lý chung cư Hẻm 42 bị mở đúng mã, mất 200 triệu đồng và một cuốn sổ. Cửa két không có dấu cạy. Kỹ thuật viên Khải được tìm thấy bất tỉnh ở tầng hầm, trong balo có máy dò mã két.',
      body: 'Toàn block mất điện gần 45 phút do aptomat tổng bị gạt tay. Hệ thống quản trị toà nhà BMS và camera hẻm sau đã lưu lại hành tung mờ ám của những kẻ thủ ác.',
    },
    comment: {
      user: 'baove_toanha',
      avatar: '🏢',
      time: '45 phút trước',
      content: '“Lúc mất điện có người áo sơ mi xách túi nilông đen nặng trịch ném vào họng rác hẻm sau!”',
      clue: 'tui-den',
      clueLabel: 'Ghi nhận đối tượng vứt túi đen 8.2kg',
    },
    ordersTitle: '🏢 Nhật ký BMS toà nhà & Lệnh chuyển khoản VietinBank 200 triệu',
    searchSuggestions: ['Đạt', 'Tư', 'Khải', 'Lan', '2147', 'BMS', 'Long Châu', 'họng rác', '200 triệu'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Camera',
        title: 'BMS Tòa Nhà: Cảm biến họng rác & Aptomat tầng hầm',
        keywords: ['bms', 'họng rác', 'aptomat', '21:10', '21:30', '8.2kg', 'túi đen'],
        snippet: 'Hệ thống BMS ghi nhận aptomat bị gạt tay lúc 21:10 và bọc rác 8.2kg bị thả xuống lúc 21:30.',
        content:
          'Trích xuất nhật ký kỹ thuật BMS (bms-building.vn):\n- 21:10: Cảnh báo Aptomat tổng tầng hầm bị ngắt thủ công bằng tay (do Tư thực hiện).\n- 21:30: Cảm biến tải trọng họng rác tầng 1 ghi nhận vật thể nặng 8.2kg rơi xuống.\n- Vật thể là túi rác đen chứa đôi găng tay cao su dính máu và sổ nợ bị xé của Đạt.',
        clue: 'tui-den',
        clueLabel: 'Lưu nhật ký cảm biến BMS họng rác',
      },
      {
        id: 'sr2',
        category: 'Ngân hàng',
        title: 'Lệnh chuyển khoản 200.000.000đ từ tài khoản toà nhà',
        keywords: ['đạt', 'bảy', '200 triệu', 'chuyển khoản', '21:50', 'vietinbank'],
        snippet: 'Lúc 21:50 tài khoản toà nhà chuyển 200 triệu đồng cho Bảy chủ nợ, ký duyệt bởi Quản lý Đạt.',
        content:
          'Lịch sử giao dịch Internet Banking VietinBank (vietinbank.vn) TX-4011:\n- 21:50:44: Chuyển 200.000.000 VNĐ cho tài khoản Nguyễn Văn Bảy.\n- Người ký duyệt hạn mức: Quản lý Trần Tuấn Đạt.\n- Động cơ: Cuốn sổ nợ cho thấy Đạt nợ Bảy 250 triệu hạn chót tối nay!',
        clue: 'chuyen-khoan',
        clueLabel: 'Lưu lệnh chuyển khoản 200 triệu của Đạt',
      },
      {
        id: 'sr3',
        category: 'Cảnh sát',
        title: 'Đơn mua thuốc an thần & găng tay đen tại Long Châu',
        keywords: ['long châu', 'longchau', 'đạt', 'thuốc ngủ', 'găng tay', '17:30', 'diazepam'],
        snippet: 'Đạt mua dung dịch an thần Diazepam liều cao và găng tay cao su đen lúc 17:30 tại Long Châu.',
        content:
          'Biên lai LC-401 tại Nhà Thuốc Long Châu (nhathuoc-longchau42.vn):\n- Khách hàng: Trần Tuấn Đạt.\n- Sản phẩm: Dung dịch an thần gây ngủ Diazepam 10ml và hộp găng tay y tế cao su Nitrile đen.\n- Thời gian: 17:30 chiều ngày xảy ra vụ án. Chuẩn bị công cụ đánh mê và gây án!',
        clue: 'dat-mua-thuoc-me',
        clueLabel: 'Lưu đơn mua thuốc ngủ của Đạt tại Long Châu',
      },
      {
        id: 'sr4',
        category: 'Viễn thông',
        title: 'Bản ghi âm 21:12 trong máy Khải: Vạch mặt Đạt',
        keywords: ['khải', 'ghi âm', '21:12', 'tầng hầm', 'đạt', 'máy dò mã', 'vu oan'],
        snippet: 'Máy Khải ghi âm tự động lúc 21:12: “Anh Đạt, sao anh ở đây—” rồi tiếng hung khí đập mạnh.',
        content:
          'Phục hồi dữ liệu điện thoại nạn nhân Khải:\n- 21:12: File âm thanh ghi lại lời hốt hoảng của Khải khi bắt gặp Đạt tại phòng biến áp tầng hầm.\n- Tiếng hung khí đập mạnh và chìa rơi.\n- Chiếc máy dò mã két trong balo Khải là do Đạt cố ý nhét vào sau khi đánh ngất Khải để đổ tội!',
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
      lead: 'Đêm mưa bão 17/10, ông Hoàng Khang được phát hiện tử vong gục trên bàn trà. Cửa phòng trà khoá then cài bên trong, đồng hồ trên tay nạn nhân vỡ kẹt ở 22:15, nhưng nhiều bằng chứng công nghệ IoT và độc chất học cho thấy đây là vụ mưu sát được tính toán tinh vi.',
      body: 'Pháp y phát hiện chất kịch độc Aconitine trong chén trà và sợi chỉ cước vướng ở chốt then cài cửa sổ. Bản thảo di chúc 30 tỷ vừa được soạn thảo chiều cùng ngày đã biến mất bí ẩn.',
    },
    comment: {
      user: 'hangxom_nha42',
      avatar: '🍵',
      time: '15 phút trước',
      content: '“Khoảng hơn 21h mưa to có thấy bóng người mang giày da leo qua ban công sau phòng trà ông Khang!”',
      clue: 'then-cai-chi-cuoc',
      clueLabel: 'Ghi nhận dấu vết leo ban công giật chỉ cước',
    },
    ordersTitle: '☕ Log thiết bị Smart Home IoT & Sổ độc chất Nhà thuốc Long Châu',
    searchSuggestions: ['Vũ', 'Yến', 'Trọng', 'Bà Hà', 'Aconitine', 'Smart Home', 'Long Châu', '21:30', '22:15', 'VietinBank'],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Viễn thông',
        title: 'Smart Home IoT: Nhiệt độ ấm trà vạch trần giờ chết giả 22:15',
        keywords: ['21:30', 'ấm trà', 'nhiệt độ', 'smarthome', 'iot', 'đồng hồ', '22:15', 'giờ chết giả'],
        snippet: 'Ấm trà thông minh đun sôi lúc 21:30 và nước đã nguội 32°C trước 22:00. Đồng hồ vỡ 22:15 là hiện trường giả!',
        content:
          'Trích xuất dữ liệu đám mây ấm trà thông minh trên smarthome.iot:\n- 21:30:04: Hoàn thành đun sôi 100°C, chuyển chế độ pha trà.\n- 21:55: Cảm biến nhiệt độ nước trà hạ xuống 32°C (nguội hẳn).\n- Vạch trần thủ đoạn: Nạn nhân đã uống trà và tử vong trước 21:45. Chiếc đồng hồ Rolex vỡ kẹt 22:15 là do hung thủ cố tình đập vỡ để tạo mốc tử vong giả hòng dựng alibi gọi video call!',
        clue: 'nhiet-do-am-tra',
        clueLabel: 'Lưu giờ đun trà thực tế 21:30 trên SmartHome',
      },
      {
        id: 'sr2',
        category: 'Pháp y',
        title: 'Sổ kiểm soát độc chất Aconitine tại Nhà thuốc Long Châu',
        keywords: ['long châu', 'longchau', 'aconitine', 'độc chất', 'vũ hoàng', 'ấu tàu', 'lọ độc'],
        snippet: 'Bác sĩ Vũ Hoàng trực tiếp ký nhận 20ml dung dịch kịch độc Aconitine tại Nhà thuốc Long Châu.',
        content:
          'Hồ sơ kiểm soát độc dược LC-501 tại Nhà Thuốc Long Châu (nhathuoc-longchau42.vn):\n- Sản phẩm: 20ml dung dịch Aconitine (chiết xuất củ ấu tàu kịch độc gây ngừng tim cấp).\n- Người nhận bàn giao: Bác sĩ Vũ Hoàng.\n- Lọ thủy tinh vớt từ đáy bể non bộ còn đọng dư lượng Aconitine và mang vân tay của đồng phạm Yến!',
        clue: 'lo-doc-non-bo',
        clueLabel: 'Lưu hồ sơ xuất độc chất Aconitine cho Vũ',
      },
      {
        id: 'sr3',
        category: 'Ngân hàng',
        title: 'Lệnh chuyển khoản cọc 200.000.000đ cho Yến giúp việc',
        keywords: ['yến', 'vũ', 'chuyển khoản', '200 triệu', 'tiền cọc', 'cầu dao', 'vietinbank'],
        snippet: 'Vũ chuyển 200 triệu cho Yến lúc 17:30 cùng tin nhắn yêu cầu ngắt cầu dao camera lúc 21:20.',
        content:
          'Sao kê VietinBank (vietinbank.vn) TX-88120:\n- 17:30:22: Vũ chuyển 200.000.000 VNĐ cho Nguyễn Thị Yến (giúp việc nội trú).\n- Tin nhắn Zola khôi phục: "Đúng 21:20 gạt cầu dao camera cho anh, mở cửa ban công, xong việc chia 2 tỷ".\n- Bằng chứng không thể chối cãi về vai trò đồng phạm trực tiếp của Yến!',
        clue: 'chuyen-khoan-yen',
        clueLabel: 'Lưu lệnh chuyển khoản đồng phạm cho Yến',
      },
      {
        id: 'sr4',
        category: 'Camera',
        title: 'Camera The Moon Lounge: Alibi của Trọng Cổ Vật',
        keywords: ['trọng', 'the moon', 'lounge', 'bột lạ', 'găng tay máu', 'alibi', 'cổ vật'],
        snippet: 'Trọng ngồi uống rượu ở The Moon Lounge từ 21:00 đến 23:00, bột trong xe chỉ là nấm linh chi.',
        content:
          'Xác minh nghi can Lê Đức Trọng:\n- Camera CAM-502 và hoá đơn quẹt thẻ VietinBank lúc 22:45: Trọng ngồi liên tục tại The Moon Lounge từ 21:00 đến 23:00 cùng 2 đối tác.\n- Gói bột trong xe là nấm linh chi đỏ biếu mẹ, găng tay dính máu do mổ gà cúng chiều nay.\n- Trọng hoàn toàn có chứng cứ ngoại phạm.',
        clue: 'trong-alibi',
        clueLabel: 'Lưu alibi The Moon Lounge của Trọng',
      },
      {
        id: 'sr5',
        category: 'Camera',
        title: 'Khám nghiệm hiện trường ban công & then cài cửa sổ',
        keywords: ['ban công', 'cửa sổ', 'chỉ cước', 'chi cuoc', 'then cài', 'size 42', 'phòng kín'],
        snippet: 'Sợi chỉ cước câu cá mắc ở then cài trong cửa sổ và vết giày da size 42 của Vũ ở ban công.',
        content:
          'Giải mã thủ thuật tạo phòng kín:\n- Chốt then cài gỗ cửa sổ có vệt ma sát của sợi chỉ cước câu cá nylon siêu bền.\n- Phương thức: Sau khi đầu độc, hung thủ bước ra ban công, luồn sợi cước qua khe hở phía trên rồi giật mạnh để then trượt xuống khoá chốt!\n- Trên lan can in vết giày da size 42 của Bác sĩ Vũ.',
        clue: 'then-cai-chi-cuoc',
        clueLabel: 'Lưu mánh khoé chỉ cước tạo phòng kín',
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
  {
    id: 'dau-gia',
    difficulty: 'Siêu hóc búa',
    maxTries: 2,
    code: { value: '2118', hint: 'Mã số 4 chữ số ghi nhận trên cảnh báo báo cháy cưỡng chế BMS (định dạng HHMM)' },
    accomplice: 'giang-phuc',
    news: {
      title: 'Bảo tàng Grand Palace chấn động: Bức tranh triệu đô bị tráo đổi trong 12 phút cúp điện',
      lead: 'Đêm thứ Bảy 14/11, kiệt tác hội họa Ánh Trăng Biển Hồ trị giá 2.5 triệu USD bị tráo thành bản sao giả tinh vi. Giám đốc nghệ thuật bị sốc thuốc ngất xỉu, chuông báo cháy giả kích hoạt ngắt camera toà nhà.',
      body: 'Chuyên gia phục chế, kỹ sư an ninh BMS và bảo vệ trưởng đang đổ vạ kịch liệt cho nhau. Các điều tra viên phải dùng đèn UV soi tranh, truy quét nhật ký BMS, hoá đơn y tế Ketamine và sao kê 800 triệu trên VietinBank để tìm ra sự thật.',
    },
    comment: {
      user: 'le_tan_palace',
      avatar: '🏛️',
      time: '10 phút trước',
      content: '“Lúc 21:35 thấy có người đeo kính xách ống bạt bản vẽ kiến trúc bước vội lên taxi ở cổng phụ!”',
      clue: 'camera-cong-phu',
      clueLabel: 'Ghi nhận kẻ mang ống bạt rời sảnh phụ',
    },
    ordersTitle: '🎨 Lịch sử đơn vận GiaoNhanh & Báo động BMS Grand Palace',
    searchSuggestions: [
      'Phan An',
      'Giang Phúc',
      'Triệu Vy',
      'Bác Hùng',
      '2118',
      'Ketamine',
      'Long Châu',
      'Ánh Trăng',
      'VietinBank',
      'GiaoNhanh',
    ],
    searchRecords: [
      {
        id: 'sr1',
        category: 'Viễn thông',
        title: 'BMS Grand Palace: Lệnh báo cháy cưỡng chế mã 2118 lúc 21:18',
        keywords: ['2118', 'bms', 'báo cháy', 'giang phúc', 'override', 'ngắt điện', 'camera'],
        snippet: 'Admin kỹ thuật Giang Phúc phát lệnh báo cháy giả cưỡng chế [FORCE_ALARM_2118] làm mù camera 12 phút.',
        content:
          'Trích xuất máy chủ BMS toà nhà (bms-building.vn):\n- 21:18:05: Xung lệnh cưỡng chế mã 2118 phát đi từ máy trạm của Giang Phúc làm còi báo cháy reo giả.\n- Hệ thống tự ngắt điện lưới để chuyển nguồn điện dự phòng, vô hiệu hóa camera an ninh phòng tranh đúng 12 phút then chốt.',
        clue: 'bms-bao-chay-gia',
        clueLabel: 'Lưu mã báo cháy cưỡng chế 2118 trên BMS',
      },
      {
        id: 'sr2',
        category: 'Pháp y',
        title: 'Nhà thuốc Long Châu: Phan An ký mua thuốc gây mê Ketamine',
        keywords: ['long châu', 'longchau', 'ketamine', 'thuốc mê', 'phan an', 'phục chế', 'dung môi'],
        snippet: 'Phan An dùng giấy giới thiệu mua ống tiêm Ketamine 10ml và dung môi tại Long Châu lúc 16:30.',
        content:
          'Hồ sơ xuất dược phẩm LC-601 tại Nhà Thuốc Long Châu (nhathuoc-longchau42.vn):\n- Khách hàng: Phan Thế An (Viện phục chế mỹ thuật).\n- Hàng xuất: 01 lọ Ketamine HCL 10ml dạng tiêm nồng độ cao.\n- Giám đốc Huy bị tiêm đúng hoạt chất này vào gáy lúc 21:22!',
        clue: 'longchau-ketamine',
        clueLabel: 'Lưu hồ sơ xuất thuốc Ketamine cho Phan An',
      },
      {
        id: 'sr3',
        category: 'Ngân hàng',
        title: 'VietinBank: Phan An chuyển khoản cọc 800 triệu cho Giang Phúc',
        keywords: ['vietinbank', 'sao kê', '800 triệu', 'phan an', 'giang phúc', 'tiền cọc'],
        snippet: 'Phan An chuyển 800 triệu cho Giang Phúc lúc 18:45 với nội dung hợp đồng bảo trì quý 4.',
        content:
          'Sao kê ngân hàng điện tử VietinBank (vietinbank.vn) TX-60882:\n- Người gửi: Phan Thế An.\n- Người nhận: Giang Hoàng Phúc.\n- Số tiền: 800.000.000 VNĐ lúc 18:45:10.\n- Bằng chứng thông đồng ăn chia để Phúc tạo cúp điện dự phòng!',
        clue: 'vietinbank-chuyen-coc',
        clueLabel: 'Lưu sao kê VietinBank 800 triệu giữa Phan An và Phúc',
      },
      {
        id: 'sr4',
        category: 'Viễn thông',
        title: 'Đơn GiaoNhanh GN-99120: Ống bạt bản vẽ gửi ra cảng Bạch Đằng',
        keywords: ['giaonhanh', 'đơn hàng', 'gn-99120', 'ống bạt', 'bản vẽ', 'bạch đằng', '21:55'],
        snippet: 'Đơn chuyển phát hoả tốc ống bạt bản vẽ từ cổng phụ Grand Palace ra container kho cảng.',
        content:
          'Dữ liệu viễn thông GiaoNhanh (giaonhanh.vn):\n- Mã đơn: GN-99120 tiếp nhận lúc 21:55.\n- Địa chỉ lấy hàng: Cổng phụ Grand Palace từ người đeo kính gọng vàng.\n- Hàng hóa: Ống bạt bản vẽ kiến trúc (chứa bức tranh thật cuộn tròn).\n- Nơi đến: Kho ngoại quan cảng Bạch Đằng.',
        clue: 'giaonhanh-ong-bat',
        clueLabel: 'Lưu vận đơn GiaoNhanh chuyển tranh ra cảng',
      },
      {
        id: 'sr5',
        category: 'Camera',
        title: 'Camera CAM-602: Đối tượng xách ống bạt lên taxi lúc 21:35',
        keywords: ['camera', 'cam-602', 'cửa nam', '21:35', 'taxi', 'măng tô', 'kính vàng'],
        snippet: 'Camera giao thông ngã tư Cửa Nam ghi nhận Phan An xách ống bạt bước vội lên taxi lúc 21:35.',
        content:
          'Trích xuất camera giao thông đô thị (camera-phuong.gov.vn) CAM-602:\n- Lúc 21:35: Nam giới đeo kính gọng vàng, khoác măng-tô đen (nhân dạng Phan An) ôm ống bạt tròn bước lên taxi 29E-441.22 rời khỏi hiện trường vụ án.',
        clue: 'camera-cong-phu',
        clueLabel: 'Lưu hình ảnh camera giao thông lúc 21:35 của Phan An',
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
