import { GameLanding } from './GameLanding'

export default function MonopolyLanding() {
  return (
    <GameLanding
      game="monopoly"
      icon="🎩"
      name="Cờ Tỷ Phú Mini"
      accent="#eab308"
      tagline="Mua đất. Nâng cấp khách sạn. Thu tiền thuê làm đối thủ phá sản."
      desc="Bàn cờ 20 ô đô thị hiện đại chạy đua gom bất động sản tại 7 thành phố lớn Việt Nam (Sài Gòn, Hà Nội, Đà Nẵng, Đà Lạt...). Đổ 2 xúc xắc, rút thẻ Cơ Hội ngẫu nhiên và trở thành trùm bất động sản giàu nhất."
      players="2–4 người"
      time="15–20 phút"
      steps={[
        { icon: '🎲', title: 'Lắc 2 Xúc Xắc', text: 'Di chuyển quanh 20 ô bàn cờ. Đổ đôi được quyền đi thêm lượt nữa.' },
        { icon: '🏙️', title: 'Mua Đất & Nâng Cấp', text: 'Mua các mảnh đất trống, xây thêm nhà và khách sạn để tăng vọt tiền thuê.' },
        { icon: '💸', title: 'Thu Tiền Đối Thủ', text: 'Bắt bất kỳ ai bước chân vào khu đất của bạn phải trả tiền thuê sòng phẳng.' },
        { icon: '👑', title: 'Trùm Bất Động Sản', text: 'Làm toàn bộ đối thủ cạn túi phá sản hoặc đạt mốc tài sản 4000$ để chiến thắng.' },
      ]}
      rules={[
        'Mỗi người chơi khởi đầu với 1500$ tiền vốn.',
        'Mỗi lần đi qua ô Khởi Hành nhận thưởng +200$.',
        'Khi vào đất trống: được quyền mua với giá niêm yết.',
        'Khi vào đất của mình: được nâng cấp tối đa 4 sao (Khách sạn).',
        'Khi vào đất đối thủ: bắt buộc trả tiền thuê tương ứng số sao.',
        'Nếu hết sạch tiền không thể trả nợ: tuyên bố PHÁ SẢN.',
      ]}
    />
  )
}
