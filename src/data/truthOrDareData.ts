export type Level = 'spicy18' | 'drinking' | 'savage'

export interface CardItem {
  id: string
  type: 'truth' | 'dare'
  level: Level
  text: string
  penalty: number // số ly phạt nếu bỏ qua
  note?: string
}

export const TRUTH_CARDS: CardItem[] = [
  // --- SPICY 18+ ---
  {
    id: 't-1',
    type: 'truth',
    level: 'spicy18',
    text: 'Lần gần nhất bạn "làm chuyện ấy" là khi nào, và bạn có thật sự thoả mãn không?',
    penalty: 2,
    note: 'Khai thật, không được che giấu!',
  },
  {
    id: 't-2',
    type: 'truth',
    level: 'spicy18',
    text: 'Trong số những người đang ngồi ở bàn nhậu này, nếu buộc phải chọn 1 người để "qua đêm", bạn sẽ chọn ai?',
    penalty: 2,
    note: 'Không được chọn bản thân!',
  },
  {
    id: 't-3',
    type: 'truth',
    level: 'spicy18',
    text: 'Bạn đã từng trải qua tình một đêm (ONS) hoặc mối quan hệ mập mờ (FWB) chưa? Bao nhiêu lần?',
    penalty: 1,
  },
  {
    id: 't-4',
    type: 'truth',
    level: 'spicy18',
    text: 'Điều táo bạo, điên rồ hoặc lạ lùng nhất bạn từng thử nghiệm trên giường là gì?',
    penalty: 2,
  },
  {
    id: 't-5',
    type: 'truth',
    level: 'spicy18',
    text: 'Đã bao giờ bạn giả vờ "lên đỉnh" để đối phương kết thúc cho nhanh chưa? Lý do là gì?',
    penalty: 1,
  },
  {
    id: 't-6',
    type: 'truth',
    level: 'spicy18',
    text: 'Bạn có sở thích đặc biệt hay "gu thầm kín" (fetish) nào trong chuyện chăn gối mà chưa từng nói với ai không?',
    penalty: 2,
  },
  {
    id: 't-7',
    type: 'truth',
    level: 'spicy18',
    text: 'Nơi công cộng, kỳ lạ hoặc nguy hiểm nhất mà bạn từng có hành động thân mật 18+ là ở đâu?',
    penalty: 2,
  },
  {
    id: 't-8',
    type: 'truth',
    level: 'spicy18',
    text: 'Bạn đã bao giờ vừa làm chuyện ấy vừa vô tình nghĩ đến một người khác chưa? Đó là ai?',
    penalty: 3,
  },
  {
    id: 't-9',
    type: 'truth',
    level: 'spicy18',
    text: 'Sự cố "dở khóc dở cười" hoặc quê độ nhất của bạn trong lúc đang ân ái là gì?',
    penalty: 1,
  },
  {
    id: 't-10',
    type: 'truth',
    level: 'spicy18',
    text: 'Bạn đánh giá kỹ năng "chăn gối" của mình được bao nhiêu điểm trên thang điểm 10? Tự tin nhất ở điểm nào?',
    penalty: 1,
  },
  {
    id: 't-11',
    type: 'truth',
    level: 'spicy18',
    text: 'Đã bao giờ bạn bị người thân, bạn bè hoặc người lạ bắt quả tang khi đang làm chuyện nhạy cảm chưa?',
    penalty: 2,
  },
  {
    id: 't-12',
    type: 'truth',
    level: 'spicy18',
    text: 'Tin nhắn gợi cảm, nhạy cảm hoặc "nóng bỏng" nhất bạn từng gửi hoặc nhận gần đây là gì?',
    penalty: 2,
  },
  {
    id: 't-13',
    type: 'truth',
    level: 'spicy18',
    text: 'Bạn có thói quen xem phim người lớn không? Tần suất thế nào và thể loại bạn thích xem nhất là gì?',
    penalty: 1,
  },
  {
    id: 't-14',
    type: 'truth',
    level: 'spicy18',
    text: 'Món đồ chơi người lớn (toy) hoặc trang phục quyến rũ nhất bạn từng sở hữu hoặc từng thử là gì?',
    penalty: 2,
  },
  {
    id: 't-15',
    type: 'truth',
    level: 'spicy18',
    text: 'Bạn từng có ý nghĩ "đen tối" với đồng nghiệp, sếp hoặc bạn thân chưa? Người đó là ai?',
    penalty: 2,
  },

  // --- SAVAGE / BÓC MẼ TUỔI 30 ---
  {
    id: 't-16',
    type: 'truth',
    level: 'savage',
    text: 'Khoản "quỹ đen" hoặc số tiền lớn nhất bạn từng giấu người yêu/vợ/chồng là bao nhiêu và dùng vào việc gì?',
    penalty: 2,
  },
  {
    id: 't-17',
    type: 'truth',
    level: 'savage',
    text: 'Lần say rượu bết bát nhất trong đời, bạn đã làm trò mất mặt nào mà giờ nghĩ lại vẫn rùng mình?',
    penalty: 1,
  },
  {
    id: 't-18',
    type: 'truth',
    level: 'savage',
    text: 'Bạn đã từng say rồi gọi điện hoặc nhắn tin cho người yêu cũ chưa? Khi tỉnh dậy cảm giác thế nào?',
    penalty: 2,
  },
  {
    id: 't-19',
    type: 'truth',
    level: 'savage',
    text: 'Có ai trong bàn nhậu này mà ngày đầu mới quen bạn từng thấy ghét hoặc không ưa không? Tại sao?',
    penalty: 1,
  },
  {
    id: 't-20',
    type: 'truth',
    level: 'savage',
    text: 'Điều dối trá lớn nhất bạn từng nói với đối phương để đi nhậu cùng anh em/bạn bè là gì?',
    penalty: 1,
  },
  {
    id: 't-21',
    type: 'truth',
    level: 'savage',
    text: 'Nếu bây giờ người yêu/bạn đời của bạn đòi xem toàn bộ tin nhắn Zalo/Messenger không báo trước, bạn có dám đưa không?',
    penalty: 2,
  },
  {
    id: 't-22',
    type: 'truth',
    level: 'savage',
    text: 'Nỗi sợ lớn nhất của bạn ở tuổi 30 là gì: Mất tiền, yếu sinh lý, rụng tóc hay hôn nhân đổ vỡ?',
    penalty: 1,
  },
  {
    id: 't-23',
    type: 'truth',
    level: 'savage',
    text: 'Lần gần nhất bạn khóc vì tình cảm là khi nào và vì lý do gì?',
    penalty: 1,
  },
  {
    id: 't-24',
    type: 'truth',
    level: 'savage',
    text: 'Bạn từng có ý định phản bội hoặc "say nắng" người khác khi đang trong mối quan hệ chính thức chưa?',
    penalty: 3,
  },
  {
    id: 't-25',
    type: 'truth',
    level: 'savage',
    text: 'Trong bàn này, ai là người mà bạn nghĩ có đời sống tình cảm phức tạp hoặc lăng nhăng nhất?',
    penalty: 2,
  },

  // --- DRINKING BÀN NHẬU ---
  {
    id: 't-26',
    type: 'truth',
    level: 'drinking',
    text: 'Tửu lượng tối đa của bạn là bao nhiêu chai bia hoặc chén rượu trước khi gục?',
    penalty: 1,
  },
  {
    id: 't-27',
    type: 'truth',
    level: 'drinking',
    text: 'Kể tên 1 tật xấu khó đỡ nhất của bạn khi đã ngà ngà say (nói nhiều, quậy, khóc, ngủ gật hay mượn nợ)?',
    penalty: 1,
  },
  {
    id: 't-28',
    type: 'truth',
    level: 'drinking',
    text: 'Đã bao giờ bạn giả vờ say xỉn để trốn trả tiền hoá đơn hoặc né việc gì đó chưa?',
    penalty: 2,
  },
  {
    id: 't-29',
    type: 'truth',
    level: 'drinking',
    text: 'Trong bàn nhậu hôm nay, bạn thấy ai là người đẹp trai/xinh gái và có sức hút nhất?',
    penalty: 1,
  },
  {
    id: 't-30',
    type: 'truth',
    level: 'drinking',
    text: 'Nếu ngày mai bạn trúng số 10 tỷ, bạn sẽ chia cho ai trong bàn này đầu tiên và bao nhiêu?',
    penalty: 1,
  },
]

export const DARE_CARDS: CardItem[] = [
  // --- SPICY 18+ ---
  {
    id: 'd-1',
    type: 'dare',
    level: 'spicy18',
    text: 'Uống bia kiểu "giao bôi" (bắt chéo tay) với người khác giới ngồi gần bạn nhất.',
    penalty: 2,
    note: 'Không có người khác giới thì chọn người ngồi bên phải!',
  },
  {
    id: 'd-2',
    type: 'dare',
    level: 'spicy18',
    text: 'Thì thầm vào tai người ngồi đối diện một câu tán tỉnh "bỏng mắt" nhất bạn có thể nghĩ ra.',
    penalty: 2,
  },
  {
    id: 'd-3',
    type: 'dare',
    level: 'spicy18',
    text: 'Hôn nhẹ lên má người mà bạn thấy quyến rũ hoặc dễ thương nhất trong bàn nhậu đêm nay.',
    penalty: 2,
  },
  {
    id: 'd-4',
    type: 'dare',
    level: 'spicy18',
    text: 'Để người ngồi bên phải chạm tay vào eo hoặc vai bạn và giữ nguyên tư thế đó trong 30 giây.',
    penalty: 2,
  },
  {
    id: 'd-5',
    type: 'dare',
    level: 'spicy18',
    text: 'Tạo một dáng chụp ảnh gợi cảm quyến rũ nhất và giữ yên trong 10 giây cho cả bàn chụp ảnh lại.',
    penalty: 2,
  },
  {
    id: 'd-6',
    type: 'dare',
    level: 'spicy18',
    text: 'Mô phỏng lại biểu cảm khuôn mặt lúc bạn "lên đỉnh" trong 5 giây cho cả bàn cùng thẩm định.',
    penalty: 3,
  },
  {
    id: 'd-7',
    type: 'dare',
    level: 'spicy18',
    text: 'Cho người ngồi bên trái mở thư viện ảnh điện thoại và xem lướt 5 tấm ảnh gần nhất trong máy bạn.',
    penalty: 3,
  },
  {
    id: 'd-8',
    type: 'dare',
    level: 'spicy18',
    text: 'Nhìn đắm đuối vào mắt người đối diện trong 20 giây mà không được cười hay chớp mắt. Ai cười trước uống 1 ly!',
    penalty: 1,
  },
  {
    id: 'd-9',
    type: 'dare',
    level: 'spicy18',
    text: 'Ôm một người trong bàn nhậu thật chặt trong 15 giây và nói: "Cảm ơn vì đã xuất hiện trong đời mình".',
    penalty: 1,
  },
  {
    id: 'd-10',
    type: 'dare',
    level: 'spicy18',
    text: 'Khen ngợi 3 điểm nóng bỏng hoặc quyến rũ nhất trên cơ thể của một người trong bàn nhậu.',
    penalty: 2,
  },

  // --- SAVAGE / BÓC MẼ & TROLL ---
  {
    id: 'd-11',
    type: 'dare',
    level: 'savage',
    text: 'Gọi điện cho một người bạn thân (bật loa ngoài) và nói: "Tao lỡ làm chuyện dại dột rồi, có cách nào giải quyết không?" rồi im lặng 5 giây.',
    penalty: 3,
  },
  {
    id: 'd-12',
    type: 'dare',
    level: 'savage',
    text: 'Để người bên phải dùng điện thoại của bạn gửi 1 sticker ngẫu nhiên cho người thứ 2 trong danh sách chat gần nhất.',
    penalty: 3,
  },
  {
    id: 'd-13',
    type: 'dare',
    level: 'savage',
    text: 'Tháo 1 món phụ kiện trên người (đồng hồ, nhẫn, áo khoác...) cho người đối diện giữ đến hết cuộc nhậu.',
    penalty: 1,
  },
  {
    id: 'd-14',
    type: 'dare',
    level: 'savage',
    text: 'Tự thú trước toàn thể bàn nhậu một bí mật bạn từng giấu mà chưa một ai ở đây biết.',
    penalty: 2,
  },
  {
    id: 'd-15',
    type: 'dare',
    level: 'savage',
    text: 'Gọi điện cho người yêu/vợ/chồng (bật loa ngoài) nói ngọt ngào: "Đêm nay anh/em ngoan lắm, yêu anh/em nhiều" rồi cúp máy.',
    penalty: 2,
  },
  {
    id: 'd-16',
    type: 'dare',
    level: 'savage',
    text: 'Diễn lại dáng điệu hoặc giọng nói của một người trong bàn khi người đó say xỉn để cả bàn đoán.',
    penalty: 1,
  },

  // --- DRINKING BÀN NHẬU ---
  {
    id: 'd-17',
    type: 'dare',
    level: 'drinking',
    text: 'Uống cạn 1 ly bia/rượu đầy bằng tay không thuận, không được làm đổ giọt nào!',
    penalty: 1,
  },
  {
    id: 'd-18',
    type: 'dare',
    level: 'drinking',
    text: 'Chỉ định 2 người bất kỳ trong bàn nhậu cụng ly và uống cạn cùng bạn!',
    penalty: 1,
  },
  {
    id: 'd-19',
    type: 'dare',
    level: 'drinking',
    text: 'Để người bên trái dùng thìa/đũa bón cho bạn 1 miếng đồ ăn bất kỳ trên bàn nhậu.',
    penalty: 1,
  },
  {
    id: 'd-20',
    type: 'dare',
    level: 'drinking',
    text: 'Uống cạn 1 ly bia kiểu "chạy bo" (uống một hơi dứt điểm không nghỉ thở).',
    penalty: 2,
  },
  {
    id: 'd-21',
    type: 'dare',
    level: 'drinking',
    text: 'Tất cả mọi người trong bàn nhậu cùng nâng ly và hô to khẩu hiệu của nhóm rồi uống 1 ngụm!',
    penalty: 1,
  },
  {
    id: 'd-22',
    type: 'dare',
    level: 'drinking',
    text: 'Người ngồi đối diện được quyền ra một hình phạt uống bia bất kỳ cho bạn.',
    penalty: 2,
  },
]
