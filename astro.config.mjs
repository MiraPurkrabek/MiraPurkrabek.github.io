// @ts-check
import { defineConfig } from 'astro/config';

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
  // redirects and integrations (sitemap, etc.) are added in later PRs
});
