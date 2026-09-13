// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Paths that exist in `dist/` but are not indexable content pages: the internal styleguide, the
// noindex 404 page, legacy-URL redirect stubs, and the BBox-MaskPose redirect to another site.
const sitemapExcludedPaths = new Set([
  '/styleguide/',
  '/404/',
  '/projects',
  '/projects/',
  '/papers',
  '/papers/',
  '/aboutme',
  '/aboutme/',
  '/teaching',
  '/teaching/',
  '/BBox-MaskPose/',
]);

// https://astro.build/config
export default defineConfig({
  site: 'https://mirapurkrabek.github.io',
  output: 'static',
  build: {
    // /work/index.html -> /work/ keeps existing URLs working
    format: 'directory',
  },
  markdown: {
    // Shiki's default output hard-codes a theme via an inline `style` attribute on `<pre>`,
    // which both violates "no inline styles" and ignores the light/dark toggle. Plain
    // `<pre><code>` lets Prose.astro's own token-based styling take over instead.
    syntaxHighlight: false,
  },
  redirects: {
    '/projects': '/work',
    '/papers': '/publications',
    '/aboutme': '/about',
    '/teaching': '/about#teaching',
  },
  integrations: [
    sitemap({
      filter: (page) => !sitemapExcludedPaths.has(new URL(page).pathname),
      // The CV files are public top-level resources, but not Astro routes, so the sitemap needs
      // them added explicitly.
      customPages: [
        'https://mirapurkrabek.github.io/CV.pdf',
        'https://mirapurkrabek.github.io/CV_twopage.pdf',
      ],
    }),
  ],
});
