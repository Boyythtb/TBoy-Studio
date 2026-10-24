import { GameLanding } from './GameLanding'

export default function LudoLanding() {
  return (
    <GameLanding
      game="ludo"
      icon="🐴"
      name="Cờ Cá Ngựa Chiến Thuật"
      accent="#f59e0b"
      tagline="Lắc xúc xắc nảy lửa. Đá văng đối thủ. Cuộc đua chiến mã đỉnh cao."
      desc="Bản đồ 4 màu rực rỡ, mỗi người điều khiển 2 chiến mã đua về chuồng đích. Đổ được 6 để xuất chuồng hoặc được đổ tiếp. Đạp trúng ô đối thủ để đá họ về chuồng! Kèm thẻ bài kỹ năng can thiệp kịch tính."
      players="2–4 người"
      time="10–15 phút"
      steps={[
        { icon: '🎲', title: 'Lắc Xúc Xắc', text: 'Đổ 1 hoặc 6 để xuất chuồng. Đổ 6 được quyền đổ thêm 1 lượt nữa.' },
        { icon: '💥', title: 'Đá Ngựa Đối Thủ', text: 'Tiến vào ô của đối thủ để đá văng ngựa của họ quay trở về chuồng xuất phát.' },
        { icon: '✨', title: 'Thẻ Kỹ Năng', text: 'Kích hoạt Khiên hộ mệnh, Tăng tốc +2, hoặc Xúc xắc vàng để lật ngược tình thế.' },
        { icon: '🏆', title: 'Về Chuồng Đích', text: 'Người đầu tiên đưa cả 2 chiến mã leo lên đỉnh bậc thang về đích sẽ chiến thắng.' },
      ]}
      rules={[
        'Trận đấu hỗ trợ từ 2 đến 4 người chơi (Đỏ, Xanh lá, Vàng, Xanh dương).',
        'Mỗi người chơi có 2 chú ngựa.',
        'Đổ 1 hoặc 6 để xuất chuồng.',
        'Đổ 6 được thưởng thêm 1 lượt đổ tiếp theo.',
        'Nếu ngựa của bạn đáp trúng ô ngựa đối thủ (không có khiên), ngựa đối thủ bị đá về chuồng!',
        'Mỗi người có 1 thẻ bài kỹ năng đặc biệt trong ván.',
      ]}
    />
  )
}
