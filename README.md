# TBOY Studio — Game đêm cho mọi người

**Bản chạy thật: https://ma-soi.pages.dev** (Cloudflare Pages; dữ liệu realtime qua Firebase project `ma-soi-2026`, region `asia-southeast1`).

Cổng gồm ba game party (một màn hình chung trên TV/laptop + mỗi người một điện thoại làm tay cầm)
và một game trinh thám chơi một mình. Không cần cài app: quét QR hoặc nhập mã phòng 4 ký tự là vào.

| Game | Đường dẫn | Số người | Thời lượng |
|---|---|---|---|
| 🐺 Ma Sói | `/ma-soi` | 4–16 | 20–40 phút |
| 🔐 Mật mã | `/secret-code` | 2–8 | 10–20 phút |
| 🚢 Hải chiến | `/sea-battle` | 2 | 10–15 phút |
| 🕵️ Thám Tử Bàn Phím | `/detective` | 1 | 20–40 phút |

- **Host** mở `/…/host` trên màn hình chung. Màn hình này chạy toàn bộ engine của ván đấu.
- **Người chơi** mở `/play/MÃPHÒNG` trên điện thoại, nhập tên và chọn avatar.
- Giao tiếp realtime qua **Firebase Realtime Database**; nếu chưa cấu hình Firebase thì game tự chạy ở
  chế độ **local** (nhiều tab cùng một trình duyệt) để test.

## Bốn trò chơi

**🐺 Ma Sói** — suy luận phe phái. 16 vai chia ba phe, đêm xuống, cả làng ngủ, bầy sói thức.

**🔐 Mật mã** — mỗi người giấu một mã 3 số. Đến lượt, chọn một người và đoán mã của họ; máy trả về
số chữ số đúng vị trí (bulls) và đúng số nhưng sai vị trí (cows). Ai phá đủ số mã trước thì thắng,
mã bị phá sẽ được đổi mới.

**🚢 Hải chiến** — mỗi người đặt hạm đội 4 tàu (4/3/3/2 ô) trên lưới 8×8, rồi bắn luân phiên.
Bắn trúng thì được bắn tiếp, bắn trượt thì nhường lượt. Chìm hết hạm đội địch là thắng.

**🕵️ Thám Tử Bàn Phím** — trinh thám một người, không cần phòng. Mở máy tính “macQuê” của anh Tùng,
đọc chat Zola, lướt Cộc Cốc (tin tức, đơn ship, ảnh, thùng rác), ghi manh mối vào Sổ vụ án rồi gửi tên
thủ phạm trong Hồ sơ. Sai ba lần là hồ sơ đóng. Vụ đầu tiên: “Chiếc xe đạp điện” ở Hẻm 42. Tiến trình
lưu bằng localStorage, không dùng Firebase.

## Tính năng

- 4–16 người, **16 vai**: Dân làng, Ma Sói, Sói Con, Sói Phù Thuỷ, Sói Trắng, Tiên Tri, Phù Thuỷ, Bảo Vệ, Thợ Săn, Thần Tình Yêu, Già Làng, Chàng Ngốc, Cô Bé, Kẻ Chán Đời, Người Thổi Sáo, Sát Nhân.
- Cấu hình sói và từng vai đặc biệt ngay trong phòng chờ (chia theo phe làng / phe sói / phe thứ ba), thời gian thảo luận/bước đêm có thể chỉnh.
- **Ba luật tuỳ chọn**: bỏ phiếu kín, ẩn vai khi chết, đêm đầu yên bình.
- Vòng chơi đầy đủ: chia vai → đêm → bình minh → thảo luận → bỏ phiếu → xử án → Thợ Săn bắn → kết thúc.
- Ba phe: làng, sói, và phe thứ ba (Kẻ Chán Đời / Sát Nhân / Người Thổi Sáo / Sói Trắng / cặp tình nhân) với điều kiện thắng riêng.
- Bí mật được tách riêng: mỗi người chỉ đọc được vai của mình, host đọc được tất cả.
- Âm thanh tổng hợp bằng WebAudio (không cần file mp3), có nút tắt.
- Giao diện tiếng Việt, tối ưu điện thoại (safe-area, haptic).

## Chạy thử

```bash
npm install
npm run dev
```

Mở `http://localhost:5173`, bấm **Tạo phòng**. Trên cùng máy có thể mở thêm nhiều tab
`/play/MÃ` để giả làm người chơi — chế độ local dùng `BroadcastChannel` giữa các tab và
lưu danh tính từng tab trong `sessionStorage`, nên mỗi tab là một người chơi riêng.

Dữ liệu phòng thử nằm trong `localStorage['masoi.db.v1']`; muốn xoá sạch thì chạy
`localStorage.clear()` trong DevTools rồi tải lại trang.

Build production:

```bash
npm run build
npm run preview
```

## Cấu hình Firebase (chơi nhiều máy)

1. Tạo project tại [console.firebase.google.com](https://console.firebase.google.com) (gói **Spark** miễn phí là đủ).
2. **Build → Realtime Database → Create Database** (chọn region gần nhất, ví dụ `asia-southeast1`).
3. **Build → Authentication → Sign-in method → Anonymous → Enable**.
4. **Project settings → Your apps → Web** → đăng ký app và copy config.
5. Tạo file `.env` từ mẫu:

```bash
cp .env.example .env
```

Điền:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_DATABASE_URL=https://<project>-default-rtdb.<region>.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

> Chỉ cần `VITE_FIREBASE_API_KEY` và `VITE_FIREBASE_DATABASE_URL` là đủ để bật chế độ cloud,
> nhưng nên điền đủ cả 5 cho đúng chuẩn.

6. Đẩy luật bảo mật lên:

```bash
npm i -g firebase-tools
firebase login
firebase use --add          # chọn project của bạn
firebase deploy --only database
```

Luật trong `database.rules.json` đảm bảo:

| Đường dẫn | Ai đọc | Ai ghi |
| --- | --- | --- |
| `rooms/{code}/meta` | mọi người đã đăng nhập | host (khởi tạo & cập nhật) |
| `rooms/{code}/players` | mọi người | host, hoặc chính người đó |
| `rooms/{code}/votes` | mọi người | host, hoặc chính người đó |
| `rooms/{code}/secrets/{uid}` | host và chính người đó | host và chính người đó |
| `rooms/{code}/actions/{uid}` | host và chính người đó | host và chính người đó |

Người chơi không thể đọc vai của người khác, cũng không thể sửa state của ván.

## Deploy lên Cloudflare Pages

Frontend chạy trên Cloudflare Pages, Firebase **chỉ dùng Realtime Database** (không dùng Hosting).

Cách 1 — tự động khi push Git:

1. Vào Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Chọn repo `Boyythtb/ma-soi`.
3. Build command: `npm run build` · Output directory: `dist`.
4. Save & Deploy. Mỗi lần `git push` Cloudflare sẽ tự build lại.

Cách 2 — deploy tay (đang dùng):

```bash
npm run build
npx wrangler pages deploy dist --project-name=ma-soi --branch=master
```

Cấu hình Firebase đã nằm trong `.env.production` nên build nào cũng tự kết nối đúng project.
File `public/_redirects` lo phần route SPA (`/host/...`, `/play/...` không bị 404).

Sau khi deploy, mở domain Pages trên TV và dùng điện thoại quét QR trong phòng chờ.
Nếu đổi domain, thêm domain đó vào **Firebase Console → Authentication → Settings → Authorized domains**.

## Chơi trong LAN (không cần deploy)

```bash
npm run dev -- --host
```

Vite in ra địa chỉ dạng `http://192.168.x.x:5173`. Mở địa chỉ đó trên TV; điện thoại cùng Wi-Fi
quét QR là vào được. Lưu ý: chế độ local chỉ đồng bộ giữa các tab của **cùng một trình duyệt**,
nên muốn nhiều điện thoại thật thì cần cấu hình Firebase ở trên.

## Cấu trúc

```
src/
  game/        types, roles, engine thuần, conductor (state machine của host)
  detective/   dữ liệu vụ án (case1) + tiến trình lưu localStorage
  lib/         store (local/Firebase), room, avatars, sfx, paths
  hooks/       useRoom, useNow
  ui/          Stage, Avatar, Timer, Qr, RoleCard, Forest, PhoneJoin
  host/        Lobby, Night, Day (dawn/discuss/vote/verdict/hunter), Over
  screens/     Portal, Landing, Join, Guides, Host, Player, PlayGate, GameLanding,
               SecretCode*, Battle*, Detective
```

## Luật chơi tóm tắt

- **Ma Sói** thức dậy cùng nhau mỗi đêm, chọn một người để cắn.
- **Sói Con** là sói; khi chết, đêm sau cả bầy cắn hai người.
- **Sói Phù Thuỷ** là sói; có một bình độc dùng thêm một lần trong đêm.
- **Bảo Vệ** chọn một người được che chắn (không bảo vệ cùng người hai đêm liền).
- **Tiên Tri** soi một người để biết có phải phe Sói không (Sói Con, Sói Phù Thuỷ cũng hiện là Sói).
- **Phù Thuỷ** có một bình cứu và một bình độc, mỗi bình dùng một lần.
- **Thợ Săn** khi chết được bắn chết thêm một người.
- **Thần Tình Yêu** đêm đầu ghép hai người; một người chết thì người kia chết theo.
- **Già Làng** chịu được lần cắn đầu tiên của sói.
- **Chàng Ngốc** không chết trong lần bị treo cổ đầu tiên.
- **Cô Bé** mỗi đêm nhìn trộm một người và biết người đó có thức giấc hành động hay không.
- **Sói Trắng** là sói; mỗi ván một lần, vào đêm chẵn, giết một con sói khác. Chỉ thắng khi là người duy nhất còn sống.
- **Người Thổi Sáo** mỗi đêm mê hoặc hai người; thắng khi mọi người còn sống đều đã bị mê hoặc.
- **Kẻ Chán Đời** thắng ngay nếu bị cả làng treo cổ.
- **Sát Nhân** mỗi đêm giết một người, thắng khi chỉ còn mình sống.

### Luật tuỳ chọn

- **Bỏ phiếu kín** — màn hình chung không hiện phiếu trực tiếp; kết quả chỉ lộ khi hết giờ.
- **Ẩn vai khi chết** — người bị treo cổ không bị công bố vai.
- **Đêm đầu yên bình** — đêm 1 không có Sói, Sói Phù Thuỷ hay Sát Nhân hành động.

> Lưu ý: khi bật Sói Trắng, bầy sói không thể thắng bằng số đông nếu chỉ còn một sói thường — Sói Trắng phải tự tay dọn sạch làng.
- Ngày: cả làng thảo luận rồi bỏ phiếu treo cổ. Hoà phiếu hoặc không ai bỏ phiếu thì không ai chết.
- **Dân làng thắng** khi hết Sói và Sát Nhân. **Sói thắng** khi số Sói ≥ số người còn lại. **Phe thứ ba thắng** theo điều kiện riêng ở trên. Nếu chỉ còn đúng hai người yêu, họ thắng cùng nhau.
