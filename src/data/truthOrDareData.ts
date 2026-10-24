export interface CardItem {
  id: string
  type: 'truth' | 'dare'
  text: string
  penalty: number // số ly phạt nếu trốn tránh
  note?: string
}

export const TRUTH_CARDS_18: CardItem[] = [
  {
    id: 't-1',
    type: 'truth',
    text: 'Lần gần nhất bạn "làm chuyện ấy" là khi nào, và bạn có thật sự thoả mãn 100% không?',
    penalty: 2,
    note: 'Nói thật, không được giấu giếm!',
  },
  {
    id: 't-2',
    type: 'truth',
    text: 'Trong số những người đang ngồi trong bàn nhậu này, nếu bắt buộc phải chọn 1 người để "qua đêm", bạn sẽ chọn ai?',
    penalty: 3,
    note: 'Không được chọn bản thân!',
  },
  {
    id: 't-3',
    type: 'truth',
    text: 'Bạn đã từng có tình một đêm (ONS) hoặc quan hệ không ràng buộc (FWB) chưa? Bao nhiêu lần?',
    penalty: 2,
  },
  {
    id: 't-4',
    type: 'truth',
    text: 'Điều táo bạo, hoang dại hoặc kỳ lạ nhất bạn từng thử nghiệm trên giường là gì?',
    penalty: 2,
  },
  {
    id: 't-5',
    type: 'truth',
    text: 'Đã bao giờ bạn giả vờ "lên đỉnh" để đối phương kết thúc cho nhanh chưa? Cảm xúc lúc đó thế nào?',
    penalty: 1,
  },
  {
    id: 't-6',
    type: 'truth',
    text: 'Bạn có sở thích đặc biệt hay "gu thầm kín" (fetish) nào trong chuyện chăn gối mà chưa từng thổ lộ với ai không?',
    penalty: 2,
  },
  {
    id: 't-7',
    type: 'truth',
    text: 'Nơi công cộng, kỳ lạ hoặc liều lĩnh nhất mà bạn từng có hành vi thân mật 18+ là ở đâu?',
    penalty: 2,
  },
  {
    id: 't-8',
    type: 'truth',
    text: 'Bạn đã từng vừa làm chuyện ấy vừa vô tình tưởng tượng đến một người khác chưa? Người đó là ai?',
    penalty: 3,
  },
  {
    id: 't-9',
    type: 'truth',
    text: 'Sự cố "dở khóc dở cười" hoặc quê độ nhất của bạn trong lúc đang ân ái là gì?',
    penalty: 1,
  },
  {
    id: 't-10',
    type: 'truth',
    text: 'Tự chấm điểm kỹ năng phòng the của mình trên thang điểm 10? Bạn tự tin nhất ở kỹ năng nào?',
    penalty: 1,
  },
  {
    id: 't-11',
    type: 'truth',
    text: 'Đã bao giờ bạn bị người khác (bố mẹ, bạn bè, shipper...) bắt quả tang khi đang làm chuyện nhạy cảm chưa?',
    penalty: 2,
  },
  {
    id: 't-12',
    type: 'truth',
    text: 'Tin nhắn khiêu gợi, ảnh nhạy cảm hoặc clip nóng bỏng nhất bạn từng gửi hoặc nhận gần đây là gì?',
    penalty: 2,
  },
  {
    id: 't-13',
    type: 'truth',
    text: 'Tần suất xem phim người lớn của bạn hiện tại là bao nhiêu? Thể loại hoặc kịch bản nào khiến bạn kích thích nhất?',
    penalty: 1,
  },
  {
    id: 't-14',
    type: 'truth',
    text: 'Bạn đã từng dùng đồ chơi người lớn (sex toy) hoặc trang phục cosplay gợi cảm chưa? Cảm giác thế nào?',
    penalty: 2,
  },
  {
    id: 't-15',
    type: 'truth',
    text: 'Ai trong bàn nhậu hôm nay có body hoặc phong thái toát ra năng lượng "quyến rũ phòng the" nhất theo mắt bạn?',
    penalty: 2,
  },
  {
    id: 't-16',
    type: 'truth',
    text: 'Tư thế yêu thích nhất của bạn khi làm chuyện ấy là gì? Vì sao?',
    penalty: 2,
  },
  {
    id: 't-17',
    type: 'truth',
    text: 'Lần "làm chuyện ấy" lâu nhất và ngắn nhất trong đời bạn kéo dài trong bao lâu?',
    penalty: 1,
  },
  {
    id: 't-18',
    type: 'truth',
    text: 'Bạn thích người yêu/bạn tình chủ động vồ vập hay thích bản thân là người kiểm soát hoàn toàn trên giường?',
    penalty: 1,
  },
  {
    id: 't-19',
    type: 'truth',
    text: 'Bạn từng có suy nghĩ đen tối 18+ với một người quen trong nhóm bạn, đồng nghiệp hoặc sếp chưa?',
    penalty: 2,
  },
  {
    id: 't-20',
    type: 'truth',
    text: 'Bộ phận nào trên cơ thể người khác giới khiến bạn dễ bị kích thích và muốn chạm vào nhất?',
    penalty: 1,
  },
  {
    id: 't-21',
    type: 'truth',
    text: 'Bạn đã từng thử "yêu" trong xe ô tô, thang máy, rạp chiếu phim hay bể bơi chưa? Kể chi tiết cảm giác!',
    penalty: 2,
  },
  {
    id: 't-22',
    type: 'truth',
    text: 'Đã bao giờ bạn thử Dirty Talk (nói lời khiêu gợi) khi ân ái chưa? Câu nói bạo nhất bạn từng thốt ra là gì?',
    penalty: 2,
  },
  {
    id: 't-23',
    type: 'truth',
    text: 'Nếu được phép ngủ với người yêu cũ một lần cuối mà không ai hay biết, bạn có đồng ý không?',
    penalty: 3,
  },
  {
    id: 't-24',
    type: 'truth',
    text: 'Bạn đã từng có trải nghiệm tình dục đồng giới hoặc nụ hôn đồng giới nào chưa?',
    penalty: 2,
  },
  {
    id: 't-25',
    type: 'truth',
    text: 'Kỷ niệm lần đầu tiên nếm "trái cấm" của bạn: Năm bao nhiêu tuổi, ở đâu và có trọn vẹn không?',
    penalty: 2,
  },
  {
    id: 't-26',
    type: 'truth',
    text: 'Đã từng có ai làm bạn thất vọng tột cùng về kỹ năng giường chiếu chưa? Lý do là gì?',
    penalty: 1,
  },
  {
    id: 't-27',
    type: 'truth',
    text: 'Bạn thích ánh sáng thế nào khi làm chuyện ấy: Bật đèn sáng trưng, tối om hay ánh nến mờ ảo?',
    penalty: 1,
  },
  {
    id: 't-28',
    type: 'truth',
    text: 'Bạn đã bao giờ tự quay video hoặc chụp ảnh nóng của chính mình chưa? Còn lưu không?',
    penalty: 2,
  },
  {
    id: 't-29',
    type: 'truth',
    text: 'Khi đang say xỉn, ham muốn của bạn tăng lên gấp bội hay bị giảm sút đi?',
    penalty: 1,
  },
  {
    id: 't-30',
    type: 'truth',
    text: 'Nếu đêm nay sau cuộc nhậu có người trong bàn này ngỏ lời rủ bạn về chung phòng, bạn có đi không?',
    penalty: 3,
  },
  {
    id: 't-31',
    type: 'truth',
    text: 'Điều gì ở một người khác giới trên giường khiến bạn lập tức mất hết hứng thú (turn-off)?',
    penalty: 1,
  },
  {
    id: 't-32',
    type: 'truth',
    text: 'Nụ hôn kiểu Pháp nồng cháy nhất bạn từng trải qua kéo dài bao lâu và với ai?',
    penalty: 1,
  },
  {
    id: 't-33',
    type: 'truth',
    text: 'Bạn đã từng quan hệ nhiều hơn 3 lần trong một đêm chưa? Kể lại hoàn cảnh lúc đó!',
    penalty: 2,
  },
  {
    id: 't-34',
    type: 'truth',
    text: 'Bạn có tự tin cởi đồ trước mặt người khác trong bóng tối hay phải che chắn?',
    penalty: 1,
  },
  {
    id: 't-35',
    type: 'truth',
    text: 'Giữa một người có kỹ năng phòng the cực đỉnh nhưng tính cách nhạt nhẽo và một người siêu thú vị nhưng chuyện ấy vụng về, bạn chọn ai?',
    penalty: 2,
  },
]

export const DARE_CARDS_INTERACTIVE: CardItem[] = [
  {
    id: 'd-1',
    type: 'dare',
    text: 'Uống bia kiểu "giao bôi" (bắt chéo tay vào nhau) với người khác giới ngồi gần bạn nhất.',
    penalty: 2,
    note: 'Uống cạn 100% ly bia cùng nhau!',
  },
  {
    id: 'd-2',
    type: 'dare',
    text: 'Thì thầm vào tai người ngồi bên phải một câu tán tỉnh khiêu gợi nhất bạn có thể nghĩ ra.',
    penalty: 2,
  },
  {
    id: 'd-3',
    type: 'dare',
    text: 'Hôn nhẹ lên má người mà bạn thấy cuốn hút hoặc dễ thương nhất trong bàn nhậu đêm nay.',
    penalty: 2,
  },
  {
    id: 'd-4',
    type: 'dare',
    text: 'Để người ngồi bên trái chạm hai tay vào eo bạn và giữ nguyên tư thế ôm eo đó trong 20 giây.',
    penalty: 2,
  },
  {
    id: 'd-5',
    type: 'dare',
    text: 'Nhìn đắm đuối vào mắt người đối diện trong 20 giây mà không được cười hay chớp mắt. Ai cười trước uống 1 ly phạt!',
    penalty: 1,
  },
  {
    id: 'd-6',
    type: 'dare',
    text: 'Để người bên phải dùng đũa hoặc thìa bón tận miệng cho bạn 1 miếng đồ ăn trên bàn nhậu.',
    penalty: 1,
  },
  {
    id: 'd-7',
    type: 'dare',
    text: 'Massage vai và gáy cho người ngồi bên trái bạn thật tình cảm trong vòng 30 giây.',
    penalty: 1,
  },
  {
    id: 'd-8',
    type: 'dare',
    text: 'Ôm thật chặt người ngồi đối diện trong 15 giây và nói: "Đêm nay ở cạnh bạn ấm áp thật sự".',
    penalty: 2,
  },
  {
    id: 'd-9',
    type: 'dare',
    text: 'Cho người ngồi bên phải cầm điện thoại của bạn mở thư viện ảnh xem lướt 5 tấm ảnh gần nhất.',
    penalty: 3,
  },
  {
    id: 'd-10',
    type: 'dare',
    text: 'Cầm tay người khác giới gần nhất đặt lên ngực trái của bạn để họ cảm nhận nhịp tim trong 10 giây.',
    penalty: 2,
  },
  {
    id: 'd-11',
    type: 'dare',
    text: 'Chụp chung 1 tấm ảnh selfie cực kỳ tình tứ (kề má hoặc ôm vai) với người ngồi bên cạnh.',
    penalty: 2,
  },
  {
    id: 'd-12',
    type: 'dare',
    text: 'Khen ngợi 3 điểm nóng bỏng hoặc quyến rũ nhất trên cơ thể của một người trong bàn nhậu.',
    penalty: 2,
  },
  {
    id: 'd-13',
    type: 'dare',
    text: 'Uống cạn 1 ly bia bằng tay không thuận, không được để rớt một giọt nào ra bàn!',
    penalty: 1,
  },
  {
    id: 'd-14',
    type: 'dare',
    text: 'Để người bên trái dùng son hoặc bút vẽ một hình trái tim lên cổ hoặc mu bàn tay của bạn.',
    penalty: 2,
  },
  {
    id: 'd-15',
    type: 'dare',
    text: 'Sang ngồi chung 1 chiếc ghế với người ngồi đối diện trong vòng 2 lượt chơi kế tiếp.',
    penalty: 2,
  },
  {
    id: 'd-16',
    type: 'dare',
    text: 'Đổi một món đồ phụ kiện trên người (đồng hồ, nhẫn, áo khoác...) cho người bên phải đeo đến hết bữa nhậu.',
    penalty: 1,
  },
  {
    id: 'd-17',
    type: 'dare',
    text: 'Chỉ định 2 người bất kỳ trong bàn nhậu phải cụng ly và uống cạn 100% cùng bạn ngay lập tức!',
    penalty: 1,
  },
  {
    id: 'd-18',
    type: 'dare',
    text: 'Tạo dáng "người mẫu đồ lót" hoặc biểu cảm quyến rũ trong 5 giây cho cả bàn chụp ảnh lại.',
    penalty: 2,
  },
  {
    id: 'd-19',
    type: 'dare',
    text: 'Nắm chặt tay người ngồi bên trái từ giờ cho đến hết lượt chơi của người tiếp theo.',
    penalty: 1,
  },
  {
    id: 'd-20',
    type: 'dare',
    text: 'Mô phỏng lại một tiếng rên rỉ hoặc tiếng thở dài quyến rũ trong 3 giây cho cả bàn nghe.',
    penalty: 3,
  },
  {
    id: 'd-21',
    type: 'dare',
    text: 'Để người ngồi đối diện kiểm tra múi bụng hoặc bắp tay của bạn bằng tay trần.',
    penalty: 2,
  },
  {
    id: 'd-22',
    type: 'dare',
    text: 'Uống cạn 1 ly bia kiểu "chạy bo" (uống một hơi dứt điểm không nghỉ thở).',
    penalty: 2,
  },
  {
    id: 'd-23',
    type: 'dare',
    text: 'Nhắm mắt lại, để người bên phải đưa 1 vật hoặc đồ ăn chạm vào môi bạn, đoán xem đó là gì!',
    penalty: 2,
  },
  {
    id: 'd-24',
    type: 'dare',
    text: 'Cúi xuống hôn lên mu bàn tay của một người bạn thấy ấn tượng nhất như phong cách quý tộc.',
    penalty: 1,
  },
  {
    id: 'd-25',
    type: 'dare',
    text: 'Tất cả mọi người trong bàn nhậu cùng nâng ly và hô to "UỐNG TỚI BẾN ĐÊM NAY" rồi cạn 50% ly!',
    penalty: 1,
  },
  {
    id: 'd-26',
    type: 'dare',
    text: 'Người ngồi bên phải được toàn quyền ra một hình phạt thể xác hoặc uống bia cho bạn.',
    penalty: 2,
  },
]

export const TRUTH_CARDS = TRUTH_CARDS_18
export const DARE_CARDS = DARE_CARDS_INTERACTIVE
export type Level = 'spicy18' | 'interactive' | 'drinking'
