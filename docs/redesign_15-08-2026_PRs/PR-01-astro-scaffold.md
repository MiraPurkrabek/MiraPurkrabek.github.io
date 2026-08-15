# PR-01 — Astro scaffold, tooling and static asset relocation

**Depends on:** nothing
**Branch:** `redesign/pr-01-astro-scaffold` → target `redesign`
**Size:** M · **Ships visually:** no (placeholder page only)

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md) first, plus
[tech stack](../redesign_15-08-2026_TECH_STACK.md) §"Core stack", §"Deployment".

---

## Context

The repository is a Beautiful Jekyll site (`_config.yml`, `_layouts/`, `_includes/`,
`index.html`, `*.md` at root) served by GitHub Pages at `https://mirapurkrabek.github.io`.
We are replacing it with an Astro static site **in the same repository**, on the `redesign`
branch. `master` keeps serving the old site until [PR-13](PR-13-cutover-and-deploy.md).

This PR builds the empty vessel: project, tooling, CI, and the static files that must keep
their URLs.

## Goal

A working Astro + TypeScript project at the repo root that builds to `dist/`, with all static
assets already at their final public paths, and a CI job that builds every PR into `redesign`.

## In scope

1. **Astro project at the repository root**
   - Minimal template, TypeScript **strict** (`tsconfig.json` extends `astro/tsconfigs/strict`).
   - No UI framework integration (no React/Vue/Svelte). No Tailwind.
   - `package.json` scripts: `dev`, `build`, `preview`, `check` (`astro check`), `format`.
   - Commit `package-lock.json`.
2. **`astro.config.mjs`**
   - `site: 'https://mirapurkrabek.github.io'`
   - no `base` (this is a GitHub *user* site served from the domain root)
   - `build: { format: 'directory' }` so pages emit `/work/index.html` → `/work/` keeps working
   - `output: 'static'`
   - Leave `redirects` and integrations for later PRs (a comment marking the spot is welcome).
3. **Relocate static files with `git mv`** (preserve history, do not copy — duplicates are
   forbidden):
   - `assets/` → `public/assets/` (images, icons, videos, and the old CSS/JS folders come along;
     the obsolete Jekyll CSS/JS under `public/assets/css` and `public/assets/js` is deleted in
     this PR — nothing in the new site uses it. Keep `public/assets/img`, `public/assets/icons`,
     `public/assets/videos`.)
   - `CV.pdf` → `public/CV.pdf`, `CV_twopage.pdf` → `public/CV_twopage.pdf`
   - `BBox-MaskPose/index.html` → `public/BBox-MaskPose/index.html` (the redirect stub to the
     separate `/BBox-Mask-Pose/` repo — content unchanged)
   - Add `public/.nojekyll` (empty file) so GitHub Pages never Jekyll-processes `_astro/`.
   - **Do not delete** any Jekyll source file in this PR (`_config.yml`, `_layouts/`,
     `_includes/`, `_posts/`, `*.md`, root `index.html`, `404.html`, `Gemfile`, `staticman.yml`,
     `feed.xml`, `tags.html`, `Appraisals`, `beautiful-jekyll-theme.gemspec`, `CHANGELOG.md`,
     `screenshot.png`) — [PR-13](PR-13-cutover-and-deploy.md) removes them in one reviewable
     commit.
4. **Placeholder page** `src/pages/index.astro` — plain `<h1>Miroslav Purkrábek</h1>` and a note
   that the redesign is in progress. It is replaced in PR-02/PR-04.
5. **Directory skeleton** (empty dirs with a `.gitkeep` are fine):
   `src/components/`, `src/layouts/`, `src/styles/`, `src/content/`, `src/data/`, `src/assets/`.
   `src/assets/` holds images that go through `astro:assets`; `public/assets/` holds files whose
   URL must not change.
6. **Tooling**
   - Prettier + `prettier-plugin-astro`, config committed (`.prettierrc`), `.prettierignore`
     covering `dist`, `public`, `package-lock.json`, and the still-present Jekyll folders.
   - `.gitignore`: add `node_modules/`, `dist/`, `.astro/`, `.DS_Store` (keep existing entries).
   - `.nvmrc` or `engines` field pinning Node 20+.
7. **CI**
   - New workflow `.github/workflows/build.yml`: on `pull_request` and on `push` to `redesign`
     — checkout, `actions/setup-node@v4` (Node 20, npm cache), `npm ci`, `npm run check`,
     `npm run build`.
   - Edit the existing `.github/workflows/ci.yml` (Jekyll) to run only on `master`
     (`on: push: branches: [master]` + `pull_request: branches: [master]`) so the Jekyll job
     stops failing on redesign branches.
   - No deployment workflow yet — that is PR-13.

## Out of scope

- Any styling, tokens, layout, fonts, components (PR-02).
- Any content or content collections (PR-03).
- Deleting Jekyll sources, deploy workflow, Pages settings (PR-13).
- SEO metadata, sitemap, redirects (PR-11).

## Acceptance criteria

- `npm ci && npm run build` produces `dist/index.html`, `dist/CV.pdf`, `dist/assets/img/...`,
  `dist/BBox-MaskPose/index.html`, `dist/.nojekyll`.
- `npm run check` reports 0 errors, 0 warnings.
- `npm run dev` serves the placeholder page.
- `git status` shows the asset moves as renames, not delete+add.
- CI workflow file is syntactically valid and the Jekyll workflow no longer triggers on
  `redesign`.
- No file under `docs/` is modified other than ticking this PR's status.

## Review checklist

- [ ] `public/assets/img/` contains every image referenced by the old site (compare against
      `git log --name-only` / a directory listing before the move)
- [ ] `public/CV.pdf` downloads correctly from the dev server at `/CV.pdf`
- [ ] `public/.nojekyll` exists and is committed
- [ ] no `node_modules`, `dist`, `.astro` in git
- [ ] Astro version pinned in `package.json` (caret is fine), lockfile committed

## Notes for the implementer

- If `npm create astro` scaffolds example content (`src/pages/about.astro`, sample content
  collections, `src/components/Card.astro`, the default favicon), delete it. The repo should
  contain only what this PR specifies.
- Keep the default Astro image service (sharp). Later PRs rely on `astro:assets`.
- `public/assets/icons/` already holds the favicon set referenced by the old `_config.yml`
  (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`,
  `android-chrome-*.png`, `site.webmanifest`). Keep those paths; PR-02 wires them into the head.
