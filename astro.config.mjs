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
  // redirects and integrations (sitemap, etc.) are added in later PRs
});
