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
  'case2-tu-do': {
    out: 'public/detective/case2-tu-do.png',
    ratio: '4:3',
    prompt:
      'A row of old metal lockers in a small Vietnamese badminton hall at night, one locker door open, ' +
      'a phone-sized empty space inside, sports bags on a bench, a wooden wall panel behind the lockers with ' +
      'a narrow gap, fluorescent light, candid phone snapshot, no people. ' + STYLE,
  },
  'case2-san-cau-long': {
    out: 'public/detective/case2-san-cau-long.png',
    ratio: '4:3',
    prompt:
      'A small neighborhood badminton court at night in Vietnam, green floor, net, bright ceiling lights, ' +
      'a man in a red jacket standing near the locker area with his hands in his pockets, ' +
      'plastic chairs and water bottles at the sideline, wide candid shot. ' + STYLE,
  },
  'case2-quay-nuoc': {
    out: 'public/detective/case2-quay-nuoc.png',
    ratio: '4:3',
    prompt:
      'A young Vietnamese woman working at a small drink counter at night, holding a phone to her ear with one hand ' +
      'while pouring tea with the other, cups and a kettle on the counter, warm light, candid snapshot. ' + STYLE,
  },
  'case3-camera-2048': {
    out: 'public/detective/case3-camera-2048.png',
    ratio: '4:3',
    prompt:
      'Security camera still of a Vietnamese night fair: a young volunteer in a green vest crouching beside a wooden ' +
      'donation box, one hand bandaged, cardboard food boxes on the ground, string lights and red lanterns blurred ' +
      'in the background, slightly grainy CCTV look, no readable text. ' + STYLE,
  },
  'case3-giay-bun': {
    out: 'public/detective/case3-giay-bun.png',
    ratio: '4:3',
    prompt:
      'Close-up of white sneakers covered in red mud walking on dry pavement at a night fair in Vietnam, ' +
      'fallen paper lanterns and grass in the background, low camera angle, flash photo, slightly grainy. ' + STYLE,
  },
  'case3-hom-quy': {
    out: 'public/detective/case3-hom-quy.png',
    ratio: '4:3',
    prompt:
      'A wooden charity donation box with a broken padlock hanging loose, lid slightly open, empty inside, ' +
      'sitting on a plastic table at a Vietnamese night fair, red lanterns and string lights bokeh behind, ' +
      'evidence photo style, no people, no readable text. ' + STYLE,
  },
  'case4-tui-den': {
    out: 'public/detective/case4-tui-den.png',
    ratio: '4:3',
    prompt:
      'A man in a wrinkled white shirt walking away down a narrow alley behind an old Vietnamese apartment block ' +
      'at night, carrying a black plastic bag, face turned away from the camera, one dim streetlight, ' +
      'security-camera angle, grainy. ' + STYLE,
  },
  'case4-xe-bao-ve': {
    out: 'public/detective/case4-xe-bao-ve.png',
    ratio: '4:3',
    prompt:
      'A motorbike parked in front of the entrance of an old concrete apartment basement at night in Vietnam, ' +
      'headlight still on, helmet hanging on the mirror, damp concrete floor, pipes on the ceiling, ' +
      'harsh fluorescent light, no people, CCTV angle. ' + STYLE,
  },
  'case4-ket-sat': {
    out: 'public/detective/case4-ket-sat.png',
    ratio: '4:3',
    prompt:
      'A close-up photograph of a heavy old grey steel safe, its thick door swung wide open, the inside completely empty and dark, ' +
      'the safe standing on a tiled floor in a small dim office at night, scratch marks on the floor in front of it, ' +
      'a few papers scattered nearby, a desk lamp glowing behind, no wardrobe, no shelves, no cabinet, no people, no text. ' + STYLE,
  },
}
