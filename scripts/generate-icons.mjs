import { mkdir, writeFile } from "node:fs/promises";
import { deflateSync } from "node:zlib";

const outputs = [
  ["public/apple-touch-icon.png", 180],
  ["public/icon-192.png", 192],
  ["public/icon-512.png", 512],
  ["public/favicon-32.png", 32],
];

const clamp = (value, min = 0, max = 255) => Math.max(min, Math.min(max, value));

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function mix(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function makeCanvas(size) {
  return {
    size,
    data: new Uint8Array(size * size * 4),
  };
}

function blend(canvas, x, y, color, alpha = 1) {
  const { size, data } = canvas;
  const px = Math.round(x);
  const py = Math.round(y);
  if (px < 0 || py < 0 || px >= size || py >= size || alpha <= 0) return;

  const index = (py * size + px) * 4;
  const sourceAlpha = clamp(alpha, 0, 1);
  const destAlpha = data[index + 3] / 255;
  const outAlpha = sourceAlpha + destAlpha * (1 - sourceAlpha);

  for (let channel = 0; channel < 3; channel += 1) {
    const source = color[channel];
    const dest = data[index + channel];
    data[index + channel] =
      outAlpha === 0
        ? 0
        : Math.round((source * sourceAlpha + dest * destAlpha * (1 - sourceAlpha)) / outAlpha);
  }
  data[index + 3] = Math.round(outAlpha * 255);
}

function fillBackground(canvas) {
  const { size } = canvas;
  const cornerRadius = size * 0.22;
  const c1 = hexToRgb("#68e1fd");
  const c2 = hexToRgb("#151729");
  const c3 = hexToRgb("#070b18");
  const cx = size * 0.34;
  const cy = size * 0.24;
  const maxDist = size * 0.95;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = Math.max(cornerRadius - x, 0, x - (size - cornerRadius));
      const dy = Math.max(cornerRadius - y, 0, y - (size - cornerRadius));
      if (dx * dx + dy * dy > cornerRadius * cornerRadius) continue;

      const radial = clamp(Math.hypot(x - cx, y - cy) / maxDist, 0, 1);
      const linear = clamp((x + y) / (size * 1.8), 0, 1);
      const base = radial < 0.48 ? mix(c1, c2, radial / 0.48) : mix(c2, c3, (radial - 0.48) / 0.52);
      const rose = hexToRgb("#290f18");
      blend(canvas, x, y, mix(base, rose, linear * 0.38), 1);
    }
  }
}

function fillEllipse(canvas, cx, cy, rx, ry, color, alpha = 1) {
  const minX = Math.floor(cx - rx);
  const maxX = Math.ceil(cx + rx);
  const minY = Math.floor(cy - ry);
  const maxY = Math.ceil(cy + ry);
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const value = ((x - cx) ** 2) / (rx * rx) + ((y - cy) ** 2) / (ry * ry);
      if (value <= 1) {
        blend(canvas, x, y, color, alpha * clamp((1 - value) * 22, 0, 1));
      }
    }
  }
}

function fillRing(canvas, cx, cy, outer, inner, color, alpha = 1) {
  const min = Math.floor(cx - outer);
  const max = Math.ceil(cx + outer);
  for (let y = min; y <= max; y += 1) {
    for (let x = min; x <= max; x += 1) {
      const dist = Math.hypot(x - cx, y - cy);
      if (dist <= outer && dist >= inner) {
        const edge = Math.min(outer - dist, dist - inner);
        blend(canvas, x, y, color, alpha * clamp(edge, 0, 1));
      }
    }
  }
}

function pointInPolygon(x, y, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
    const xi = points[i][0];
    const yi = points[i][1];
    const xj = points[j][0];
    const yj = points[j][1];
    const intersects = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

function fillPolygon(canvas, points, color, alpha = 1) {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const minX = Math.floor(Math.min(...xs));
  const maxX = Math.ceil(Math.max(...xs));
  const minY = Math.floor(Math.min(...ys));
  const maxY = Math.ceil(Math.max(...ys));
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      if (pointInPolygon(x + 0.5, y + 0.5, points)) blend(canvas, x, y, color, alpha);
    }
  }
}

function drawLine(canvas, x1, y1, x2, y2, width, color, alpha = 1) {
  const minX = Math.floor(Math.min(x1, x2) - width);
  const maxX = Math.ceil(Math.max(x1, x2) + width);
  const minY = Math.floor(Math.min(y1, y2) - width);
  const maxY = Math.ceil(Math.max(y1, y2) + width);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const t = clamp(((x - x1) * dx + (y - y1) * dy) / lengthSq, 0, 1);
      const px = x1 + t * dx;
      const py = y1 + t * dy;
      const distance = Math.hypot(x - px, y - py);
      if (distance <= width / 2) blend(canvas, x, y, color, alpha * clamp(width / 2 - distance + 1, 0, 1));
    }
  }
}

function drawIcon(size) {
  const canvas = makeCanvas(size);
  const s = size / 1024;
  const p = (value) => value * s;

  fillBackground(canvas);
  fillRing(canvas, p(512), p(512), p(402), p(378), hexToRgb("#f8c75c"), 0.82);
  fillRing(canvas, p(512), p(512), p(340), p(334), hexToRgb("#f7f2e8"), 0.18);

  fillEllipse(canvas, p(512), p(790), p(208), p(62), hexToRgb("#000000"), 0.28);

  fillPolygon(
    canvas,
    [
      [p(368), p(491)],
      [p(128), p(370)],
      [p(333), p(583)],
      [p(165), p(665)],
      [p(436), p(594)],
    ],
    hexToRgb("#fff7e8"),
    0.94,
  );
  fillPolygon(
    canvas,
    [
      [p(656), p(491)],
      [p(896), p(370)],
      [p(691), p(583)],
      [p(859), p(665)],
      [p(588), p(594)],
    ],
    hexToRgb("#d8fbff"),
    0.94,
  );
  drawLine(canvas, p(214), p(424), p(381), p(547), p(14), hexToRgb("#afc1cf"), 0.55);
  drawLine(canvas, p(810), p(424), p(643), p(547), p(14), hexToRgb("#afc1cf"), 0.55);

  fillEllipse(canvas, p(512), p(713), p(154), p(94), hexToRgb("#c93043"), 1);
  fillPolygon(
    canvas,
    [
      [p(376), p(702)],
      [p(512), p(772)],
      [p(648), p(702)],
      [p(648), p(810)],
      [p(376), p(810)],
    ],
    hexToRgb("#8e1628"),
    1,
  );
  fillEllipse(canvas, p(512), p(657), p(139), p(42), hexToRgb("#f7f2e8"), 1);

  fillEllipse(canvas, p(512), p(475), p(154), p(154), hexToRgb("#f2c89e"), 1);
  fillPolygon(
    canvas,
    [
      [p(373), p(459)],
      [p(405), p(338)],
      [p(527), p(301)],
      [p(641), p(366)],
      [p(655), p(477)],
      [p(508), p(399)],
    ],
    hexToRgb("#6a3f22"),
    1,
  );
  fillPolygon(
    canvas,
    [
      [p(371), p(463)],
      [p(430), p(383)],
      [p(521), p(357)],
      [p(489), p(405)],
    ],
    hexToRgb("#7e4a27"),
    1,
  );

  fillPolygon(
    canvas,
    [
      [p(421), p(493)],
      [p(512), p(497)],
      [p(610), p(493)],
      [p(579), p(551)],
      [p(512), p(548)],
      [p(452), p(551)],
    ],
    hexToRgb("#10131b"),
    1,
  );
  fillEllipse(canvas, p(474), p(512), p(18), p(18), hexToRgb("#8ef0b3"), 1);
  fillEllipse(canvas, p(552), p(512), p(18), p(18), hexToRgb("#8ef0b3"), 1);
  drawLine(canvas, p(470), p(604), p(556), p(604), p(14), hexToRgb("#5d351c"), 1);

  fillPolygon(
    canvas,
    [
      [p(340), p(614)],
      [p(236), p(743)],
      [p(373), p(672)],
    ],
    hexToRgb("#f8c75c"),
    1,
  );
  fillPolygon(
    canvas,
    [
      [p(684), p(614)],
      [p(788), p(743)],
      [p(651), p(672)],
    ],
    hexToRgb("#f8c75c"),
    1,
  );
  fillEllipse(canvas, p(512), p(812), p(88), p(54), hexToRgb("#f8c75c"), 1);

  return canvas;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function png(canvas) {
  const { size, data } = canvas;
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y += 1) {
    const rowStart = y * (size * 4 + 1);
    raw[rowStart] = 0;
    Buffer.from(data.buffer, y * size * 4, size * 4).copy(raw, rowStart + 1);
  }

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

await mkdir("public", { recursive: true });

for (const [path, size] of outputs) {
  await writeFile(path, png(drawIcon(size)));
  console.log(`wrote ${path}`);
}
