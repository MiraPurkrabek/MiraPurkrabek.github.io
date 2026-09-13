# Mira Purkrabek — personal website

Source for [mirapurkrabek.github.io](https://mirapurkrabek.github.io), Mira Purkrabek's static
portfolio for computer-vision research, engineering, publications, teaching, and life outside work.

## Guidance files

`AGENTS.md`, `CODEX.md`, and `CLAUDE.md` are deliberately parallel project-guidance files. **The
three files shall stay in sync at all times.** Change all three in the same commit. Keep this README
aligned with them too, so human contributors and coding agents share one current project picture.

## Product intent

This is a personal website—not a LinkedIn profile, an academic-template CV, or a generic corporate
landing page. Keep it professional, neat, personal, story-driven, easy to read, and easy to
navigate. Make current focus, credible research and engineering work, publications and recognition,
experience, the CV, and contact information easy to spot.

The site should help Mira get hired through concrete evidence and honest context while genuinely
describing him as a person. Use factual, warm, specific, scannable writing. Avoid buzzwords,
inflated claims, dense CV tables, visual noise, and a LinkedIn-like presentation.

Use `Mira Purkrabek` as the preferred human-facing name in the site's own headings, navigation,
prose, and social previews. `Miroslav Purkrabek` is the official and academic name: preserve it in
the CV, exact publication author lists, metadata, and machine-readable identity aliases. Connect
the names once in the homepage explanation, but do not repeat the explanation in visible site
copy. Always spell both forms with ASCII characters; do not add diacritics to Mira's name.

Humans and machines are equal readers. Important facts belong in clear visible HTML with meaningful
headings and links; do not hide them only in images, animation, or JavaScript. Keep crawler-facing
metadata (`robots.txt`, sitemap, canonical metadata, identity and publication JSON-LD, and
`public/llms.txt`) current whenever a public fact, route, or contact detail changes.
Machine-readable summaries must match the visible site and never invent facts.

## Branches and release flow

- `redesign` is the active Astro redesign branch. It contains the current implementation and is
  where work is developed and checked without deployment.
- `master` is the production branch. Pushing there runs the GitHub Pages deployment workflow.
- Promote the redesign only through an intentional `redesign` → `master` merge after review; a
  redesign-branch push is not a production release.
- The non-deploy build workflow validates pull requests and both branches with `npm run check` and
  `npm run build`. Browser review writes disposable, ignored output to `.review/`.

The historical Jekyll site belongs to repository history, not to the active redesign. Do not restore
Jekyll templates, stale issue templates, redesign plans, PR-by-PR roadmaps, unfinished task
markers, or review artifacts. `LICENSE` retains the upstream Beautiful Jekyll attribution required
by that history.

## Repository structure

    src/pages/          Astro routes: home, work, publications, about, coaching, news archive,
                        webcam demo, 404, and the internal noindex styleguide
    src/layouts/        shared document and article layouts
    src/components/     reusable UI, SEO/JSON-LD, and homepage sections
    src/content/        source-of-truth project, publication, experience, education, recognition data
    src/data/           typed site-wide data and configuration
    src/assets/         Astro-processed source images
    src/styles/         global styles, tokens, and local fonts
    public/             PDFs, crawler files, media, icons, OG image, and static redirect assets
    scripts/            OG generation, link audit, browser review, and asset helpers
    .github/workflows/  build validation and GitHub Pages deployment

Content collections in [`src/content/`](src/content/) are validated in
[`src/content.config.ts`](src/content.config.ts). Add factual projects, publications, experience,
education, and recognition in their collection entries rather than duplicating facts in components.
`src/data/site.ts` holds site-wide identity, links, CV location, and SEO defaults. Keep
`public/llms.txt` consistent with it and with rendered content.

Indexable routes are `/`, `/work`, `/publications`, `/about`, `/coaching`, `/news`, and
`/webcam_demo/`, plus the downloadable CVs. `/styleguide` and `/404` are `noindex`.
`astro.config.mjs` owns legacy redirects and sitemap exclusions. `Seo.astro` emits per-page
metadata, the home page emits connected WebSite/ProfilePage/Person JSON-LD, the publications page
emits publication JSON-LD, and `robots.txt` advertises the sitemap.

## Implementation

Astro 7 + TypeScript + typed content collections + hand-written token-based CSS. No UI or CSS
framework. The build is static HTML for GitHub Pages. Prefer semantic server-rendered HTML and CSS,
existing components, responsive and keyboard-accessible interactions, and both light/dark themes.

Every indexable page needs an accurate title, description, canonical URL, useful headings, and
links. Update structured data, crawler files, navigation, and redirects alongside public fact or
route changes. Keep redirect-only, 404, styleguide, and other non-content pages out of the sitemap.

## Development

Requires Node `>=22.12.0` (see `.nvmrc`).

    npm install
    npm run dev         # local Astro server
    npm run check       # content-schema and type validation
    npm run build       # static production build in dist/
    npm run preview     # serve dist/ locally
    npm run audit:links # check external links after a build
    npm run og:generate # regenerate public/og/default.png

Before handing off a content or layout change, run at least `npm run check` and `npm run build`.
Keep the repository lean by removing superseded documentation, temporary output, plans, and
unfinished task markers rather than leaving competing instructions or sources of truth.
