#!/usr/bin/env node
// Generates public/og/default.png — the site's single static Open Graph image (1200x630).
// SVG source rendered to PNG with sharp, so the design stays editable and regenerable rather than
// being a one-off image export.
//
// Run with: node scripts/make-og.mjs

import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const WIDTH = 1200;
const HEIGHT = 630;

// Design tokens copied from src/styles/tokens.css (light mode) — this script runs outside the
// Astro/CSS pipeline, so the values are duplicated by hand rather than imported.
const COLORS = {
  pageBg: '#fbfaf8',
  text: '#1a1a18',
  textMuted: '#5c5f5b',
  textSubtle: '#83867f',
  border: '#e3e0d9',
  accent: '#0e5c68',
};

const NAME = 'Mira Purkrabek';
const ROLE = 'Computer vision researcher and engineer';
const DOMAIN = 'mirapurkrabek.github.io';

const PORTRAIT_SRC = path.join(
  rootDir,
  'src/assets/img/SKV_square_centered.png',
);
const OUTPUT = path.join(rootDir, 'public/og/default.png');

const FONT_FILES = [
  'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  'node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2',
];

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function loadFontFaces() {
  const faces = await Promise.all(
    FONT_FILES.map(async (relativePath) => {
      const data = await readFile(path.join(rootDir, relativePath));
      return `
        @font-face {
          font-family: 'Inter';
          font-weight: 100 900;
          src: url(data:font/woff2;base64,${data.toString('base64')}) format('woff2');
        }`;
    }),
  );
  return faces.join('\n');
}

async function buildPortrait() {
  const size = 360;
  const radius = 20;
  const rounded = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`,
  );

  const png = await sharp(PORTRAIT_SRC)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: rounded, blend: 'dest-in' }])
    .png()
    .toBuffer();

  return { data: png.toString('base64'), size };
}

async function main() {
  const [fontFaces, portrait] = await Promise.all([
    loadFontFaces(),
    buildPortrait(),
  ]);

  const portraitX = WIDTH - 80 - portrait.size;
  const portraitY = (HEIGHT - portrait.size) / 2;
  const textX = 88;

  const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      ${fontFaces}
      text { font-family: 'Inter', sans-serif; }
    </style>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="${COLORS.pageBg}" />

  <text x="${textX}" y="290" font-size="64" font-weight="600" fill="${COLORS.text}" letter-spacing="-1">${escapeXml(NAME)}</text>

  <rect x="${textX}" y="330" width="64" height="4" rx="2" fill="${COLORS.accent}" />

  <text x="${textX}" y="390" font-size="28" font-weight="500" fill="${COLORS.textMuted}">${escapeXml(ROLE)}</text>

  <text x="${textX}" y="${HEIGHT - 64}" font-size="22" font-weight="500" fill="${COLORS.textSubtle}">${escapeXml(DOMAIN)}</text>

  <rect x="${portraitX}" y="${portraitY}" width="${portrait.size}" height="${portrait.size}" rx="20" ry="20" fill="none" stroke="${COLORS.border}" stroke-width="1" />
  <image x="${portraitX}" y="${portraitY}" width="${portrait.size}" height="${portrait.size}" href="data:image/png;base64,${portrait.data}" />
</svg>`;

  await mkdir(path.dirname(OUTPUT), { recursive: true });
  await sharp(Buffer.from(svg))
    .flatten({ background: COLORS.pageBg })
    .png()
    .toFile(OUTPUT);
  console.log(`Wrote ${path.relative(rootDir, OUTPUT)} (${WIDTH}x${HEIGHT})`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
