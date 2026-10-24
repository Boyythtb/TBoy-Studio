import type { ClueDef, Conv, Order, Photo, Suspect, TrashItem } from './case1'
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
    case: CASE5,
    clues: CLUES5,
    convs: CONVS5,
    orders: ORDERS5,
    photos: PHOTOS5,
    suspects: SUSPECTS5,
    trash: TRASH5,
  },
]
