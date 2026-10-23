// Prompt tạo ảnh cho game Thám Tử Bàn Phím.
// Chạy: npm run art -- <tên>   (xem danh sách: npm run art)
// Ảnh lưu vào public/detective/ và được commit vào repo.

const STYLE =
  'realistic photo taken on a phone at night, slightly grainy, warm sodium streetlight, narrow Vietnamese alley, ' +
  'cinematic but candid, no text, no letters, no signage, no watermark'

export const PRESETS = {
  'hien-truong': {
    out: 'public/detective/hien-truong-2158.png',
    ratio: '4:3',
    prompt:
      'A closed phone shop on the edge of a narrow Hanoi alley at night, metal shutter half down, dark glass window. ' +
      'In the glass reflection: a mint-green electric bicycle with a beige canvas tote bag hanging on the saddle, ' +
      'parked on the empty pavement behind the photographer. No people in frame. ' + STYLE,
  },
  'tra-sua': {
    out: 'public/detective/tra-sua.png',
    ratio: '4:3',
    prompt:
      'Two plastic cups of Vietnamese bubble tea with sealed lids on a small metal table outside a tiny tea shop at night, ' +
      'condensation on the cups, a phone lying face down beside them, warm string lights blurred in the background. ' +
      'Casual phone snapshot, close-up, no people. ' + STYLE,
  },
  'quan-net': {
    out: 'public/detective/quan-net.png',
    ratio: '4:3',
    prompt:
      'A small Vietnamese internet cafe at night: rows of glowing monitors, plastic stools, a middle-aged owner sitting ' +
      'behind the counter scrolling his phone, fluorescent light mixed with blue screen glow, worn tile floor. ' +
      'Wide shot from the doorway, no readable text on screens. ' + STYLE,
  },
  bia: {
    out: 'public/detective/bia-vu-an.png',
    ratio: '16:9',
    prompt:
      'Empty patch of pavement in a narrow Hanoi alley at night where a bicycle was just taken, one streetlight, ' +
      'a chalk outline of nothing, wet concrete, tangled wires overhead, shuttered houses, deep shadows. ' +
      'Moody, cinematic, mysterious, no people. ' + STYLE,
  },
}
