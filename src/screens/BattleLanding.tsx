import { GameLanding } from './GameLanding'

export default function BattleLanding() {
  return (
    <GameLanding
      game="sea-battle"
      icon="🚢"
      name="Hải Chiến"
      accent="#38bdf8"
      tagline="Hai hạm đội. Một vùng biển. Không có chỗ cho may mắn."
      desc="Mỗi người giấu 4 con tàu trên lưới 8×8, rồi lần lượt bắn vào vùng biển của đối phương. Bắn trúng thì được bắn tiếp — bắn trượt thì nhường lượt. Ai đánh chìm cả hạm đội trước sẽ thắng."
      players="đúng 2 người"
      time="5–12 phút"
      steps={[
        { icon: '⚓', title: 'Đặt tàu', text: '4 tàu: 1×4 ô, 2×3 ô, 1×2 ô. Xoay ngang hoặc dọc, không được chồng lên nhau.' },
        { icon: '🎯', title: 'Khai hoả', text: 'Chọn một ô trên lưới địch. Trúng thì bắn tiếp, trượt thì nhường lượt.' },
        { icon: '🏆', title: 'Đánh chìm', text: 'Đánh chìm toàn bộ 4 tàu của đối thủ để giành chiến thắng.' },
      ]}
      rules={[
        'Bàn cờ 8×8, mỗi người có 4 tàu: 1 tàu 4 ô, 2 tàu 3 ô, 1 tàu 2 ô.',
        'Tàu phải nằm thẳng hàng và không được chạm/chồng lên nhau.',
        'Mỗi lượt bắn một ô trong 35 giây. Hết giờ là mất lượt.',
        'Bắn trúng thì giữ lượt và được bắn tiếp.',
        'Đối thủ không thấy tàu của bạn cho tới khi trận đấu kết thúc.',
        'Phòng chỉ chứa đúng 2 người chơi.',
      ]}
    />
  )
}
