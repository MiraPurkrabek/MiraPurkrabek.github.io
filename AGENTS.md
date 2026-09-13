# Project guidance

`AGENTS.md`, `CODEX.md`, and `CLAUDE.md` are deliberately parallel project-guidance files. **The
three files shall stay in sync at all times.** Change all three together in the same commit and
keep `README.md` aligned so contributors and coding agents share one current source of guidance.

## Website intent

Keep this personal website professional, neat, personal, story-driven, easy to read, and easy to
navigate. Make current focus, credible research and engineering work, publications and recognition,
experience, the CV, and contact information easy to spot.

The site should help Mira get hired through concrete evidence and honest context while genuinely
describing him as a person. Use factual, warm, specific, readable prose. Never make it look or read
like LinkedIn, a generic corporate landing page, or an academic-template CV. Avoid buzzwords,
inflated claims, dense CV tables, and visual noise; personal material is part of the story, not a
marketing prop.

Use `Mira Purkrabek` as the preferred human-facing name in the site's own headings, navigation,
prose, and social previews. `Miroslav Purkrabek` is the official and academic name: preserve it in
the CV, exact publication author lists, metadata, and machine-readable identity aliases. Connect
the names once in the homepage explanation, but do not repeat the explanation in visible site
copy. Always spell both forms with ASCII characters; do not add diacritics to Mira's name.

Support people, recruiters, HR teams, scrapers, and LLMs at once. Important facts belong in clear
visible HTML with meaningful headings and links, never only in images, animation, or client-side
interactions. Keep metadata, canonical URLs, JSON-LD, sitemap/robots data, and `public/llms.txt`
accurate. Machine-readable content must match visible content and must not invent facts.

## Repository and branches

- `redesign` is the active Astro redesign branch, containing the current implementation. Develop
  and review there without deployment.
- `master` is the production branch; its GitHub Actions deployment workflow publishes GitHub Pages
  on push.
- Promote only through an intentional `redesign` → `master` merge after review. A redesign-branch
  push is not a release.
- The build workflow validates pull requests and both branches with `npm run check` and
  `npm run build`. Browser-review output is disposable and ignored in `.review/`.

The historical Jekyll site is not part of the active redesign. Do not restore Jekyll templates,
stale issue templates, PR plans, unfinished task lists, design roadmaps, or archived review output.
Retain the MIT `LICENSE` for its required upstream Beautiful Jekyll attribution.

## Code and content map

    src/pages/        Astro routes: home, work, publications, about, coaching, news archive,
                      webcam demo, 404, and the internal noindex styleguide
    src/layouts/      shared document and article layouts
    src/components/   reusable interface, SEO/JSON-LD, and homepage sections
    src/content/      source-of-truth typed projects, publications, experience, education, recognition
    src/data/         typed site-wide configuration and small data sets
    src/assets/       Astro-processed source images
    src/styles/       tokens, fonts, and global CSS
    public/           PDFs, crawler files, media, icons, OG image, and redirect assets
    scripts/          image generation, link audit, browser review, and asset helpers

`src/content.config.ts` validates every content collection. Put factual changes in the relevant
`src/content/` entry rather than duplicating them in page components. Use `src/data/site.ts` for
site-wide identity, links, CV, and SEO defaults. Keep `public/llms.txt` consistent with that data
and with the rendered content.

Indexable routes are `/`, `/work`, `/publications`, `/about`, `/coaching`, `/news`, and
`/webcam_demo/`, plus the downloadable CVs. `/styleguide` and `/404` are `noindex`.
`astro.config.mjs` owns redirects and sitemap exclusions. `Seo.astro` emits page metadata, the
home page emits connected WebSite/ProfilePage/Person JSON-LD, the publications page emits
publication JSON-LD, and `robots.txt` points crawlers to the sitemap.

## Working rules

- Use Astro, TypeScript, content collections, semantic HTML, and token-based CSS. Do not add a UI
  or CSS framework or broad client-side JavaScript without a clear need.
- Preserve light/dark themes, responsive layouts, accessible controls, and readable type.
- Give every indexable route an accurate title, description, canonical URL, headings, and links.
  Keep redirect-only and internal pages out of the sitemap.
- Verify public claims; update visible copy and machine-readable summaries together when a public
  fact, route, or contact detail changes.
- Before handoff, run `npm run check` and `npm run build`. Run `npm run audit:links` after builds
  changing external links. Node `>=22.12.0` is required; see `.nvmrc`.
- Keep the repository lean. Remove superseded docs, temporary output, plans, and unfinished task
  markers instead of leaving conflicting implementation instructions behind.
