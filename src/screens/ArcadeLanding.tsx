import { GameLanding } from './GameLanding'

export default function ArcadeLanding() {
  return (
    <GameLanding
      game="party-arcade"
      icon="🕹️"
      name="Party Arcade · 10 Đấu Trường"
      accent="#ec4899"
      tagline="10 Mini-games Đối Kháng · TV Màn Hình Lớn · Điện Thoại Tay Cầm"
      desc="Biến màn hình TV/laptop thành sàn đấu trực tiếp và điện thoại của bạn bè thành tay cầm Gamepad không dây. Tốc độ cao, tranh tài nảy lửa, cười thả ga trong 1–3 phút!"
      players="2–8 người"
      time="1–3 phút / vòng"
      steps={[
        {
          icon: '💣',
          title: 'Chuyền Bom Nổ Chậm (Bomb Tag)',
          text: 'Một người mang quả bom hẹn giờ 20s. Dùng D-pad rượt đuổi và chạm vào người khác để chuyền bom trước khi phát nổ!',
        },
        {
          icon: '🤼',
          title: 'Đấu Đài Sumo (Sumo Knockout)',
          text: 'Võ đài tròn trơn trượt giữa vực thẳm. Lái nhân vật húc nhau và tung cú Dash (Lao tới) để hất văng đối thủ rơi xuống sàn.',
        },
        {
          icon: '🚩',
          title: 'Kéo Co Siêu Tốc (Tug of War)',
          text: 'Chia 2 phe Đỏ vs Xanh. Màn hình điện thoại biến thành nút đập cực lớn, bên nào đập nút nhanh hơn sẽ kéo phăng đội bạn!',
        },
        {
          icon: '⛄',
          title: 'Lăn Cầu Tuyết (Snowball Roll)',
          text: 'Lăn quả cầu tuyết lớn dần theo từng bước chạy, húc bay mọi đối thủ khỏi sàn băng trơn trượt.',
        },
        {
          icon: '⚡',
          title: 'Né Laser Sinh Tồn (Laser Dodge)',
          text: 'Các chùm tia laser chết chóc quét tròn tăng tốc. Di chuyển và bấm nút Nhảy (Jump) để sống sót!',
        },
        {
          icon: '🐟',
          title: 'Cá Lớn Nuốt Cá Bé (Big Fish)',
          text: 'Săn bắt phù du biển sâu để tăng trọng lượng và kích thước, nuốt chửng các loài cá nhỏ hơn.',
        },
        {
          icon: '🐔',
          title: 'Cướp Gà Về Chuồng (Chicken Catch)',
          text: 'Bắt đàn gà con chạy nhốn nháo trên đồng cỏ mang về chuồng và đột kích chuồng hàng xóm.',
        },
        {
          icon: '🎨',
          title: 'Đấu Phác Họa Vẽ Nhanh (Doodle Duel)',
          text: 'Nhận từ khóa bí mật, vẽ ngón tay trực tiếp trên điện thoại để đồng bộ tranh triển lãm lên TV.',
        },
        {
          icon: '📦',
          title: 'Chuyển Nhà Siêu Tốc (Moving Day)',
          text: 'Bưng bê sofa, tivi, piano né các chướng ngại vật để chất đầy vào thùng xe tải chuyển nhà.',
        },
        {
          icon: '🚦',
          title: 'Đèn Xanh Đèn Đỏ (Red Light Green Light)',
          text: 'Đèn xanh giữ nút chạy thục mạng về đích, đèn đỏ thả tay đứng im phăng phắc kẻo bị sét đánh!',
        },
      ]}
      rules={[
        'Mỗi người chơi quét mã QR hoặc nhập mã phòng 4 ký tự trên điện thoại để nhận tay cầm.',
        'Hệ thống tự động phát hiện số lượng người chơi (hỗ trợ thêm Bot máy để tranh tài nếu thiếu người).',
        'Chủ phòng (Host) có thể chọn chơi từng trò riêng lẻ hoặc Đấu giải tự động xoay tua 10 mini-games.',
        'Tất cả game đều có hiệu ứng hạt (particles), rung phản hồi xúc giác trên điện thoại và âm thanh Web Audio.',
        'Người chiến thắng mỗi vòng nhận từ +50 đến +100 điểm trên Bảng xếp hạng trực tiếp.',
      ]}
    />
  )
}
