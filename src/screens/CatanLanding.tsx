import { GameLanding } from './GameLanding'

export default function CatanLanding() {
  return (
    <GameLanding
      game="catan"
      icon="🌾"
      name="Khai Phá Đảo Catan Mini"
      accent="#10b981"
      tagline="Thu hoạch 5 loại tài nguyên. Xây làng, lập thành phố. Thâu tóm toàn đảo."
      desc="Bản đồ 7 ô lục giác tài nguyên trù phú (Gỗ, Gạch, Cừu, Lúa, Đá). Đổ xúc xắc thu hoạch mùa màng, thương lượng trao đổi và nâng cấp thành phố để giành 5 Điểm Chiến Thắng."
      players="2–4 người"
      time="15–20 phút"
      steps={[
        { icon: '🎲', title: 'Thu Hoạch Tài Nguyên', text: 'Đổ 2 xúc xắc, những ô đất mang số tương ứng sẽ phát tài nguyên cho các làng liền kề.' },
        { icon: '🏡', title: 'Xây Lập Làng Mới', text: 'Dùng 1 Gỗ + 1 Gạch + 1 Cừu + 1 Lúa để lập thêm làng và mở rộng thuộc địa.' },
        { icon: '🏰', title: 'Nâng Cấp Thành Phố', text: 'Dùng 2 Lúa + 3 Đá để nâng cấp làng lên thành phố, nhân đôi sản lượng thu hoạch.' },
        { icon: '👑', title: 'Bá Chủ Đảo Catan', text: 'Người đầu tiên tích lũy đủ 5 Điểm Chiến Thắng sẽ thống lĩnh toàn bộ hòn đảo.' },
      ]}
      rules={[
        'Mỗi người chơi bắt đầu với 1 Làng và 1 bộ tài nguyên cơ bản.',
        'Mỗi lượt đổ 2 xúc xắc để kích hoạt sản xuất tài nguyên trên toàn đảo.',
        'Mỗi Làng đem lại 1 Điểm Chiến Thắng, Thành Phố đem lại 2 Điểm Chiến Thắng.',
        'Có thể đổi 4 tài nguyên cùng loại lấy 1 tài nguyên bất kỳ từ ngân hàng.',
        'Ai đạt 5 Điểm Chiến Thắng đầu tiên sẽ chiến thắng ván đấu.',
      ]}
    />
  )
}
