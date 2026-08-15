# PR-13 — Cutover: remove Jekyll, deploy from Actions, merge to master

**Depends on:** [PR-12](PR-12-qa-accessibility-performance.md) (everything else merged into `redesign`)
**Branch:** this PR is `redesign` → `master`
**Size:** S in code, high in consequence · **Ships visually:** the whole redesign goes live

Read [PR-00-OVERVIEW.md](PR-00-OVERVIEW.md) §4 URL map and the
[tech stack](../redesign_15-08-2026_TECH_STACK.md) §"Deployment", §"Migration strategy".

---

## Context

`master` has been serving the old Jekyll site through GitHub Pages' branch-based build for the
whole project. This PR removes Jekyll, switches Pages to a GitHub Actions deployment of the Astro
build, and publishes the redesign.

**This is the one irreversible-feeling step.** It is reversible — see the rollback section — but
do it deliberately and confirm with Miroslav before merging.

## Goal

`https://mirapurkrabek.github.io` serves the new site, every preserved URL works, and the repo no
longer contains the old theme.

## In scope

### 1. Delete the Jekyll site

Remove in a single, clearly-labelled commit:

```text
_config.yml            _layouts/          _includes/        _data/
_posts/                index.html         aboutme.md        papers.md
projects.md            coaching.md        teaching.md       webcam_demo.md
404.html               feed.xml           tags.html         staticman.yml
Gemfile                Appraisals         beautiful-jekyll-theme.gemspec
CHANGELOG.md           screenshot.png     .github/workflows/ci.yml
```

Keep: `LICENSE` (check whether it is the Beautiful Jekyll MIT licence — if so, keep the file and
attribute the theme in `README.md`'s history section, since the repo was derived from it),
`.gitattributes`, `docs/`, `public/`, `src/`, `astro.config.mjs`, `package.json`,
`package-lock.json`, `tsconfig.json`, `.prettierrc`, `.gitignore`.

Verify nothing in `src/` or `public/` references a deleted file before deleting.

### 2. Rewrite `README.md`

Replace the Beautiful Jekyll documentation (19 KB of upstream README) with a short project
README: what the site is, the stack, `npm install / dev / build / preview / check`, where content
lives (`src/content/`), how to add a project or publication, how deployment works, and one line
crediting Beautiful Jekyll as the site's predecessor.

### 3. Deployment workflow

`.github/workflows/deploy.yml`:

- `on: push: branches: [master]` plus `workflow_dispatch`
- permissions: `contents: read`, `pages: write`, `id-token: write`
- concurrency group `pages`, `cancel-in-progress: false`
- build job: checkout → `actions/setup-node@v4` (Node 20, npm cache) → `npm ci` →
  `npm run check` → `npm run build` → `actions/upload-pages-artifact@v3` with `path: dist`
- deploy job: `actions/deploy-pages@v4` on `environment: github-pages`

Keep `.github/workflows/build.yml` (from PR-01) as the PR check, retargeted to `master` and any
branch.

### 4. Repository settings (manual — Miroslav must do this)

Document these steps in the PR description, in order:

1. Merge this PR to `master`.
2. GitHub → repository **Settings → Pages → Build and deployment → Source: GitHub Actions**
   (currently "Deploy from a branch").
3. Watch the `deploy.yml` run finish.
4. Verify the live site (checklist below).

Until step 2 is done, Pages will still try to build the branch with Jekyll and will publish
nothing useful — so steps 1 and 2 should happen within minutes of each other.

### 5. Post-deploy verification (run against the live domain)

| URL | Expected |
|---|---|
| `/` | new homepage |
| `/work`, `/publications`, `/about`, `/coaching` | new pages |
| `/webcam_demo/` | article, unchanged URL |
| `/projects`, `/projects/`, `/papers`, `/papers/`, `/aboutme`, `/teaching` | redirect to the new targets |
| `/CV.pdf`, `/CV_twopage.pdf` | download |
| `/assets/img/McLaughlin.gif` (spot-check a few) | 200 |
| `/BBox-MaskPose/` | redirects to `/BBox-Mask-Pose/` |
| `/BBox-Mask-Pose/`, `/ProbPose/`, `/RePoGen-paper/` | still served by their own repos, unaffected |
| `/sitemap-index.xml`, `/robots.txt`, `/llms.txt` | 200 |
| a nonsense path | new 404 page |

Also check: GA4 registers a pageview in real-time; favicon appears; OG preview renders when the
URL is pasted into LinkedIn/Slack.

### 6. Rollback plan (document it in the PR description)

If something is badly wrong after the switch:

1. Settings → Pages → Source → **Deploy from a branch**, branch `master` — but `master` no longer
   contains Jekyll, so also:
2. `git revert` the merge commit (or reset `master` to the commit before the merge, pushed as a
   revert), which restores the Jekyll tree, then re-enable the branch build.

Keep a tag on the last Jekyll commit before the merge — `git tag jekyll-final <sha> && git push
--tags` — so the old site is always one command away.

## Out of scope

- Any content or design change. If PR-12 deferred something, it stays deferred; this PR only
  moves the site.

## Acceptance criteria

- Every row of the verification table passes on the live domain.
- The repository contains no Jekyll artefacts.
- `deploy.yml` succeeded and future pushes to `master` redeploy automatically.
- `jekyll-final` tag pushed.
- README describes the new project accurately.

## Review checklist

- [ ] Miroslav has explicitly approved the cutover before merge
- [ ] Old site tagged and recoverable
- [ ] `.nojekyll` present in the published artefact
- [ ] No 404 in the verification table
- [ ] Remaining ⚠ fact-check items from [PR-00 §8](PR-00-OVERVIEW.md#8-fact-sheet-single-source-of-truth)
      either resolved or still using conservative wording — list the status in the PR description
