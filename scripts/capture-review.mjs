// Capture the built site on loopback only. No website is deployed.
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('dist');
const reviewDir = process.env.REVIEW_DIR || '.review';
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
await mkdir(reviewDir, { recursive: true });
const browser = await chromium.launch();
const results = [];
try {
  for (const width of [320, 390, 480, 600, 768, 820, 1024, 1440]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, colorScheme: theme, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const path of ['/', '/work/', '/publications/', '/about/']) {
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
        if (width === 1440 || width === 390 || (width === 768 && path === "/")) {
          const name = path === '/' ? 'home' : path.slice(1, -1);
          await page.screenshot({ path: reviewDir + '/' + name + '-' + theme + '-' + width + '.png', fullPage: true });
        }
        if (path === '/publications/') {
          const media = await page.locator('.pub-item__media').evaluateAll(items => items.map(item => {
            const box = item.getBoundingClientRect();
            const body = item.nextElementSibling.getBoundingClientRect();
            return { width: box.width, height: box.height, bottom: box.bottom, bodyTop: body.top };
          }));
          assert.equal(media.length, 10, 'All publication previews are present');
          assert.ok(media.every(box => box.width > 100 && box.height > 80), 'Visible publication media');
          if (width <= 600) assert.ok(media.every(box => box.bodyTop >= box.bottom), 'Media above text on narrow screens');
          assert.equal(await page.locator('#s23dr a[href="https://arxiv.org/abs/2606.06695"]').count(), 1);
          assert.match(await page.locator('#bmpv2 .pub-item__meta').innerText(), /In review/);
          assert.match(await page.locator('#blanket .pub-item__award').innerText(), /Oral/);
          assert.match(await page.locator('#pc-cse .pub-item__meta').innerText(), /Supervised work/i);
          assert.match(await page.locator('#peer-review-service').innerText(), /AAAI/);
          assert.equal(await page.locator('#service #ai4sports-2024').count(), 1);
        }
        if (path === '/') {
          const centered = await page.locator('.affiliation').evaluateAll(cards => cards.every(card => {
            const logo = card.querySelector('img').getBoundingClientRect();
            const text = card.querySelector('h3').getBoundingClientRect();
            return Math.abs(logo.x + logo.width / 2 - text.x - text.width / 2) < 2;
          }));
          assert.ok(centered, 'Affiliation logos centered over company names');
          if (width >= 768) {
            const rows = await page.locator('.intro__links a').evaluateAll(links => new Set(links.map(link => Math.round(link.getBoundingClientRect().top))).size);
            assert.ok(rows <= 3, 'Contact links share rows on tablets and desktops');
          }
          assert.equal(await page.locator('.theme-toggle:visible svg:visible').count(), 1, 'One theme icon at a time');
          if (width < 900) assert.equal(await page.locator('#nav-toggle svg:visible').count(), 1, 'One menu icon at a time');
          if (await page.locator('.name-note').count()) {
            await page.locator('.name-note summary').click();
            assert.equal(await page.locator('.name-note').getAttribute('open'), '');
            if (width === 1440 && theme === 'light') await page.screenshot({ path: reviewDir + '/name-note.png', fullPage: false });
            await page.locator('.name-note summary').click();
          }
          if (width < 900) {
            await page.locator('#nav-toggle').click();
            assert.equal(await page.locator('#nav-toggle').getAttribute('aria-expanded'), 'true');
            assert.equal(await page.locator('#nav-toggle svg:visible').count(), 1);
            await page.keyboard.press('Escape');
            assert.equal(await page.locator('#nav-toggle').getAttribute('aria-expanded'), 'false');
          }
          await page.locator('.theme-toggle:visible').click();
          assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), theme === 'light' ? 'dark' : 'light');
          assert.equal(await page.locator('.theme-toggle:visible svg:visible').count(), 1);
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
  const animatedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' });
  const animatedPage = await animatedContext.newPage();
  await animatedPage.goto('http://127.0.0.1:4321/publications/');
  await animatedPage.locator('#s23dr').scrollIntoViewIfNeeded();
  await animatedPage.waitForFunction(() => {
    const video = document.querySelector('#s23dr video');
    return video && !video.hidden && video.currentTime > 0.1;
  });
  await animatedPage.emulateMedia({ reducedMotion: 'reduce' });
  await animatedPage.waitForFunction(() => {
    const video = document.querySelector('#s23dr video');
    return video && video.hidden && video.paused;
  });
  await animatedPage.locator('#s23dr').screenshot({ path: reviewDir + '/challenge-mobile.png' });
  await animatedContext.close();
  await writeFile(reviewDir + '/results.json' , JSON.stringify({ source: process.env.GITHUB_SHA, checks: results }, null, 2) + '\n');
  console.log('Passed browser checks:', results.length);
} finally {
  await browser.close();
  server.close();
}
