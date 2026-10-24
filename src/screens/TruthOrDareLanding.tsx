import { GameLanding } from './GameLanding'

export default function TruthOrDareLanding() {
  return (
    <GameLanding
      game="truth-or-dare"
      icon="🌶️"
      name="Sự Thật & Thử Thách 18+"
      accent="#f43f5e"
      tagline="Vòng xoay chai bia · Bàn nhậu 18+ · Đã chơi là phải tới bến"
      desc="Mini-game kết nối và sát phạt đỉnh cao cho bàn nhậu người lớn. Chủ xị tạo phòng, anh em quét mã QR hoặc nhập mã 4 ký tự vào bằng điện thoại riêng. Xoay chai chỉ định người, chọn Sự Thật phòng the táo bạo hoặc Thử Thách hành động tương tác trực tiếp với người ngồi cạnh. Không dám làm? Phạt uống bia ngay tại chỗ!"
      players="2–20 người"
      time="Tới bến"
      steps={[
        {
          icon: '📱',
          title: 'Quét mã vào bàn',
          text: 'Chủ xị đặt điện thoại/máy tính bảng ở giữa bàn. Mọi người quét mã QR để tham gia bằng máy của mình.',
        },
        {
          icon: '🍾',
          title: 'Xoay chai chọn lượt',
          text: 'Chai bia xoay tròn 360° theo quán tính và dừng lại chỉ đích danh người phải chịu trận.',
        },
        {
          icon: '🔞',
          title: 'Sự thật hay Thử thách',
          text: 'Chọn Sự Thật để khai bí mật 18+ hoặc Thử Thách để thực hiện hành động tương tác với người trong bàn.',
        },
        {
          icon: '🍻',
          title: 'Uống phạt & Bảng vàng',
          text: 'Không dám làm thì phạt 1-3 ly bia! Hệ thống tự động ghi nhận ai uống nhiều ly nhất đêm nay.',
        },
      ]}
      rules={[
        'Trò chơi dành cho người trên 18 tuổi trong các buổi liên hoan, tiệc nhậu bạn bè.',
        'Khi chọn Sự Thật: Bắt buộc phải khai thật 100%, không được nói dối hay né tránh.',
        'Khi chọn Thử Thách: Phải thực hiện hành động tương tác thật tâm với người được chỉ định.',
        'Nếu không dám làm hoặc muốn bỏ qua: Bắt buộc phải uống phạt số ly bia ghi trên thẻ bài.',
        'Có thể dùng nút đổi câu khác với mức tự nguyện phạt 1 ly bia.',
        'Tinh thần vui vẻ, gắn kết, tôn trọng ranh giới thoải mái của mọi người trong bàn.',
      ]}
    />
  )
}
