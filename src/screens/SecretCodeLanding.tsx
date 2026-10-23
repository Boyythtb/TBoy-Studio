import { GameLanding } from './GameLanding'

export default function SecretCodeLanding() {
  return (
    <GameLanding
      game="secret-code"
      icon="🔐"
      name="Mật Mã"
      accent="#7be0c0"
      tagline="Giấu một con số. Đoán của người khác."
      desc="Mỗi người giữ kín một mật mã 3 chữ số. Đến lượt, bạn chọn một người và đoán mã của họ — máy sẽ nói bạn đúng bao nhiêu vị trí. Ai bẻ được nhiều mã nhất trước thì thắng."
      players="2–8 người"
      time="10–25 phút"
      steps={[
        { icon: '🔒', title: 'Giấu mã', text: 'Mỗi người đặt một mã 3 số riêng, chỉ hiện trên điện thoại của mình.' },
        { icon: '🎯', title: 'Đoán mã', text: 'Chọn một người, nhập 3 số. Bò = đúng số đúng vị trí, bê = đúng số sai vị trí.' },
        { icon: '👑', title: 'Phá mã', text: 'Đoán trúng hoàn toàn được 1 điểm. Ai đạt mốc điểm trước sẽ thắng.' },
      ]}
      rules={[
        'Mật mã gồm đúng 3 chữ số, có thể trùng nhau (ví dụ 112).',
        'Mỗi lượt chỉ được đoán một lần, trong 45 giây.',
        'Đoán đúng cả 3 vị trí (3 bò) thì ghi 1 điểm và người đó đổi mã mới.',
        'Bò (bulls) = đúng số, đúng vị trí. Bê (cows) = đúng số, sai vị trí.',
        'Hết thời gian mà chưa đoán thì mất lượt.',
        'Chủ phòng chọn mốc thắng: 1, 3 hoặc 5 điểm.',
      ]}
    />
  )
}
