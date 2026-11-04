import { GameLanding } from './GameLanding'

export default function MonopolyLanding() {
  return (
    <GameLanding
      game="monopoly"
      icon="🎩"
      name="Lên Đời · Cờ Tỷ Phú"
      accent="#f59e0b"
      tagline="32 Đô Thị Việt Nam. 4 Linh Vật May Mắn. 1 Sân Bay Quốc Tế."
      desc="Bản đồ 32 ô phong cách Lên Đời · Đổi Vận, phủ khắp các danh lam thắng cảnh Việt Nam từ An Giang, Phú Quốc, Vũng Tàu tới Sa Pa, Hồ Gươm, Landmark 81. Hỗ trợ xoay ngang điện thoại song song bản đồ và tay cầm điều khiển."
      players="2–4 người"
      time="15–25 phút"
      steps={[
        { icon: '🎲', title: 'Đổ 2 Xúc Xắc 3D', text: 'Di chuyển quanh 32 ô bàn cờ với linh vật may mắn của bạn (Rồng, Hổ, Gà, Khỉ).' },
        { icon: '🏙️', title: 'Đầu Tư Bất Động Sản', text: 'Mua 20 khu đất độc quyền, xây dựng nhà phố và khách sạn 5 sao để x3 tiền thuê.' },
        { icon: '🛫', title: 'Sân Bay Quốc Tế', text: 'Duy nhất 1 sân bay tại góc bàn cờ cho phép bạn bay tự do tới bất kỳ ô nào mong muốn.' },
        { icon: '👑', title: 'Đại Gia Đô Thị', text: 'Cầm cố sổ đỏ khi thiếu vốn, rút 30+ thẻ Cơ Hội & Khí Vận để đổi vận lên đời!' },
      ]}
      rules={[
        'Mỗi người chơi khởi đầu với 1500$ vốn và 1 linh vật may mắn.',
        'Mỗi lần đi qua ô Khởi Hành nhận ngay +200$.',
        'Khi vào đất trống: được quyền mua với giá niêm yết.',
        'Khi vào đất của mình: được nâng cấp tối đa 4 cấp (Khách sạn 5 sao).',
        'Khi vào đất đối thủ: trả tiền thuê tương ứng số sao.',
        'Ghé ô Sân Bay: tự do lựa chọn bay trực tiếp đến bất kỳ danh thắng nào.',
        'Hỗ trợ cầm cố sổ đỏ lấy 50% tiền vốn giải cứu khi cấp bách.',
        'Nếu hết sạch tiền và không còn đất cầm cố: tuyên bố PHÁ SẢN.',
      ]}
    />
  )
}
