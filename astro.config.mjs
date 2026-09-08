// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Paths that exist in `dist/` but aren't real content pages: the internal styleguide, the
// rebuilt 404 (noindex), the legacy-URL redirect stubs (meta-refresh + canonical, not content),
// and the BBox-MaskPose redirect stub (points at a different repo's site). See
// docs/redesign_15-08-2026_PRs/PR-11-seo-metadata-redirects.md §4.
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
      // /CV.pdf is a real top-level page in the site's IA (linked from every page's nav), just
      // not an Astro route — @astrojs/sitemap only walks built HTML pages, so it needs adding
      // by hand. See IMPLEMENTATION_NOTES.md, PR-11.
      customPages: [
        'https://mirapurkrabek.github.io/CV.pdf',
        'https://mirapurkrabek.github.io/CV_twopage.pdf',
      ],
    }),
  ],
});
