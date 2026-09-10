// Capture the built site on loopback only. No website is deployed.
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('dist');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2',
  '.pdf': 'application/pdf', '.mp4': 'video/mp4', '.webm': 'video/webm' };
const server = createServer(async (req, res) => {
  try {
    let file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    res.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream');
    res.end(await readFile(file));
  } catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(4321, '127.0.0.1', r));
await mkdir('docs/review', { recursive: true });
const browser = await chromium.launch();
const results = [];
try {
  for (const width of [320, 390, 768, 1024, 1440]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, colorScheme: theme, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const path of ['/', '/work/', '/publications/']) {
        const response = await page.goto('http://127.0.0.1:4321' + path);
        assert.equal(response.status(), 200);
        await page.evaluate(() => document.fonts.ready);
        await page.locator('img').evaluateAll(imgs => Promise.all(imgs.map(img => {
          img.loading = 'eager';
          return img.decode().catch(() => {});
        })));
        assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), theme);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow: ' + path + ' at ' + width);
        const broken = await page.locator('img:visible').evaluateAll(imgs => imgs.filter(i => !i.naturalWidth).map(i => i.src));
        assert.deepEqual(broken, [], 'Broken images');
        if (width === 1440 || width === 390) {
          const name = path === '/' ? 'home' : path.slice(1, -1);
          await page.screenshot({ path: 'docs/review/' + name + '-' + theme + '-' + width + '.png', fullPage: true });
        }
        if (path === '/') {
          if (await page.locator('.name-note').count()) {
            await page.locator('.name-note summary').click();
            assert.equal(await page.locator('.name-note').getAttribute('open'), '');
            if (width === 1440 && theme === 'light') await page.screenshot({ path: 'docs/review/name-note.png', fullPage: false });
            await page.locator('.name-note summary').click();
          }
          if (width < 900) {
            await page.locator('#nav-toggle').click();
            assert.equal(await page.locator('#nav-toggle').getAttribute('aria-expanded'), 'true');
            await page.keyboard.press('Escape');
            assert.equal(await page.locator('#nav-toggle').getAttribute('aria-expanded'), 'false');
          }
          await page.locator('.theme-toggle:visible').click();
          assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), theme === 'light' ? 'dark' : 'light');
          await page.reload();
          assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), theme === 'light' ? 'dark' : 'light');
          await page.locator('.theme-toggle:visible').click();
        }
        results.push({ path, width, theme, result: 'pass' });
      }
      assert.deepEqual(errors, [], 'Browser errors');
      await context.close();
    }
  }
  await writeFile('docs/review/results.json', JSON.stringify({ source: process.env.GITHUB_SHA, checks: results }, null, 2) + '\n');
  console.log('Passed browser checks:', results.length);
} finally {
  await browser.close();
  server.close();
}
