# mirapurkrabek.github.io

Source for [mirapurkrabek.github.io](https://mirapurkrabek.github.io), Mira Purkrábek's personal
site — research, projects and publications in computer vision.

## Stack

[Astro](https://astro.build) + TypeScript, hand-written CSS (design tokens, no CSS framework), no
UI framework. Content lives in typed Astro content collections. See
[`docs/redesign_15-08-2026_TECH_STACK.md`](docs/redesign_15-08-2026_TECH_STACK.md) for the full
rationale.

## Development

Requires Node `>=22.12.0` (see `.nvmrc`).

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the built dist/ locally
npm run check     # astro check — type/content-schema errors
npm run format    # prettier --write .
```

Other scripts: `npm run og:generate` regenerates the default OG image
(`public/og/default.png`); `npm run audit:links` crawls a built `dist/` and reports broken links.

## Content

All factual content — projects, publications, experience, education, recognition — lives as
Markdown/YAML files under [`src/content/`](src/content/), one file per entry, validated against
the schemas in [`src/content.config.ts`](src/content.config.ts).

**To add a project:** add a new `.md` file to `src/content/projects/`, following the frontmatter
shape of an existing entry (e.g. `poseannotator.md`) — title, tagline, links, tags from the
controlled vocabulary in `content.config.ts`, an optional image under `src/assets/img/`. Set
`featured: true` (plus a `featuredOrder`) to surface it on the homepage.

**To add a publication:** add a new `.md` file to `src/content/publications/`, following an
existing entry (e.g. `bbox-mask-pose.md`) — authors, venue, year, links, abstract. Set
`selected: true` to surface it on the homepage.

Pages under `src/pages/` read these collections directly (`getCollection`) — most content changes
don't need a page or component edit at all.

## Deployment

Pushes to `master` build and deploy automatically via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (GitHub Actions → GitHub Pages).
[`.github/workflows/build.yml`](.github/workflows/build.yml) runs the same `check`/`build` steps
as a PR check.

## History

This site was originally built on [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll)
by Dean Attali, and was rewritten from Jekyll to Astro in 2026. `LICENSE` (MIT) is Beautiful
Jekyll's original license, kept for attribution.
