// Keep local copies of the official marks; ordinary builds need no external image requests.
import { access, mkdir, writeFile } from 'node:fs/promises';
const logos = [
  ['https://vrg.fel.cvut.cz/static/logo/apple-touch-icon.png', 'public/assets/logos/vrg.png'],
  ['https://raw.githubusercontent.com/porsche-design-system/porsche-design-system/main/packages/assets/projects/crest/src/porsche-crest%403x.png', 'public/assets/logos/porsche-crest.png'],
];
await mkdir('public/assets/logos', { recursive: true });
for (const [url, path] of logos) {
  try { await access(path); continue; } catch {}
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(url + ': ' + response.status);
  const bytes = new Uint8Array(await response.arrayBuffer());
  const signature = [137, 80, 78, 71, 13, 10, 26, 10];
  if (!signature.every((byte, index) => bytes[index] === byte)) throw new Error('Expected a PNG: ' + url);
  await writeFile(path, bytes);
  console.log('Downloaded official logo:', url, '->', path);
}
