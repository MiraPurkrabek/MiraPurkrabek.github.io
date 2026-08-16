#!/usr/bin/env node
// Throwaway-turned-useful external link checker (PR-12 QA pass). Scans the built dist/ output
// for every external href and confirms it resolves with a 2xx/3xx status. No new dependency —
// uses Node's built-in fetch. Run `npm run build` first.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SITE_URL = 'https://mirapurkrabek.github.io';
const CONCURRENCY = 8;
const TIMEOUT_MS = 15000;

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function findHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return findHtmlFiles(full);
      return entry.name.endsWith('.html') ? [full] : [];
    }),
  );
  return files.flat();
}

async function extractLinks() {
  const files = await findHtmlFiles(DIST);
  const links = new Map(); // url -> Set(source pages)
  for (const file of files) {
    const html = await readFile(file, 'utf-8');
    const page = path.relative(DIST, file);
    for (const match of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
      const url = decodeHtmlEntities(match[1]);
      if (url.startsWith(SITE_URL)) continue; // internal, absolute form
      if (!links.has(url)) links.set(url, new Set());
      links.get(url).add(page);
    }
  }
  return links;
}

async function checkUrl(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const headers = { 'User-Agent': 'Mozilla/5.0 (compatible; link-check/1.0)' };
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers,
    });
    if (res.status === 405 || res.status === 403 || res.status >= 500) {
      // Some servers reject HEAD; retry with GET.
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers,
      });
    }
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, status: 'ERROR', error: err.message };
  } finally {
    clearTimeout(timeout);
  }
}

async function runPool(items, worker, concurrency) {
  const results = [];
  let index = 0;
  async function next() {
    while (index < items.length) {
      const i = index++;
      results[i] = await worker(items[i]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, next));
  return results;
}

const links = await extractLinks();
const urls = [...links.keys()];
console.log(`Checking ${urls.length} unique external links...`);

const results = await runPool(
  urls,
  async (url) => ({ url, ...(await checkUrl(url)) }),
  CONCURRENCY,
);

const failures = results.filter((r) => !r.ok);

for (const r of results) {
  const status = r.ok
    ? r.status
    : `FAIL (${r.status}${r.error ? ': ' + r.error : ''})`;
  console.log(`${r.ok ? '✓' : '✗'} ${status}  ${r.url}`);
}

console.log(
  `\n${results.length - failures.length}/${results.length} links OK.`,
);

if (failures.length > 0) {
  console.log('\nFailures:');
  for (const f of failures) {
    const pages = [...links.get(f.url)].join(', ');
    console.log(
      `  ${f.url}\n    status: ${f.status}${f.error ? ' (' + f.error + ')' : ''}\n    found on: ${pages}`,
    );
  }
  process.exitCode = 1;
}
