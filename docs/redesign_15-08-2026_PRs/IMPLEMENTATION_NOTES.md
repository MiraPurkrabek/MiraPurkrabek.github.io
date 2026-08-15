# Implementation Notes

Running log of decisions/deviations made while implementing each PR, for the next PR to check
before starting. Keep entries short.

## PR-01 — Astro scaffold

- **Node pinned to `>=22.12.0`, not "Node 20+"** as the docs say. Astro 7.2.2 (latest at
  implementation time) hard-requires Node `>=22.12.0`; Node 20 cannot install/run it.
  `.nvmrc` = `22.12.0`, CI uses `node-version-file: .nvmrc`.
- Astro `^7.2.2`, TypeScript strict (`astro/tsconfigs/strict`).
- `astro check` needs `@astrojs/check` + `typescript` as devDeps (not mentioned in the PR doc).
  Used `typescript@^6.0.3`, not the new `^7.x` — `@astrojs/check@0.9.10`'s peer range is
  `^5.0.0 || ^6.0.0`.
- `package.json` name: `mirapurkrabek.github.io`, `private: true`.
- `public/assets/{img,icons,videos}` kept; `public/assets/{css,js}` deleted (unused Jekyll
  assets, per PR scope).
- Empty skeleton dirs (`src/components`, `layouts`, `styles`, `content`, `data`, `assets`) hold
  only `.gitkeep` — remove the `.gitkeep` in whichever PR first adds a file there.
- `build.yml` triggers on `pull_request`/`push` to `redesign` (not `master`); Jekyll `ci.yml`
  now scoped to `master` only.

## PR-02 — Design system

- **Theme toggle is two-state (light/dark), not the three-state light/dark/system cycle** the
  doc sketches — the PR text explicitly allows this ("if the three-state cycle complicates the
  icon logic... acceptable"). OS preference is still honoured on first visit by the inline
  bootstrap script; the toggle only sets an explicit override after that.
- `ThemeToggle` is rendered twice by `Header` (desktop nav + mobile controls). Its script wires
  up every `.theme-toggle` button by class, not `id` — an `id`-based `getElementById` lookup
  would silently only bind the first instance and leave the second dead.
- Inter Variable is **not** imported via the package's `wght.css`/`index.css` (those bundle
  cyrillic/greek/vietnamese too). `src/styles/fonts.css` hand-picks just the latin and latin-ext
  `@font-face` blocks, with `url()` pointing at
  `../../node_modules/@fontsource-variable/inter/files/*.woff2` — Vite resolves and hashes these
  like any other relative asset. Font-family is `InterVariable` (matching `tokens.css`), not the
  package's own `Inter Variable`.
- Icon set (`github`, `google-scholar`, `linkedin`, `orcid`, `mail`, `download`, `arrow-up-right`,
  `arrow-right`, `sun`, `moon`, `menu`, `close`) is hand-authored inline SVG in `Icon.astro`, not
  an imported icon library — kept to simple primitives (lines/paths/circles) rather than copying
  any third-party icon pack's path data.
- `public/assets/icons/site.webmanifest` had broken icon paths (`/android-chrome-*.png` instead
  of `/assets/icons/android-chrome-*.png`, from the old Jekyll `_config.yml`) and empty
  `name`/`short_name`. Fixed as part of wiring favicons into `BaseLayout`.
- Contrast spot-check (acceptance criteria) on the token values specified in the PR doc:
  `--text-subtle` is **below** 4.5:1 for normal text — light mode ≈3.5:1 on `--page-bg` and
  ≈3.3:1 on `--surface-soft`; dark mode ≈4.3:1 on `--surface-soft`. It clears 3:1 (large text)
  everywhere. Token hex values were used exactly as specified rather than adjusted unilaterally.
  Consequence for later PRs: don't set small/normal-size body or caption text in `--text-subtle`
  where it's the only cue — reserve it for metadata already paired with an icon, a larger size,
  or non-essential decoration. `--text-muted` clears 4.5:1 everywhere and is the safe default for
  secondary body text.
- `<meta name="theme-color">` in `BaseLayout` necessarily hard-codes `#FBFAF8`/`#131417` (matching
  `--page-bg` in each theme) — meta tag content can't reference CSS custom properties. This is the
  one intentional exception to "no hard-coded colour outside tokens.css".
- `site.ogImage` defaults to `/assets/img/og-default.png`, which doesn't exist yet — `BaseLayout`
  accepts the prop now (so its signature doesn't change again) but doesn't render an `og:image`
  meta tag; PR-11 creates the image and wires it in.
- Dev/build in this environment needed Node ≥22.12.0 explicitly selected (`nvm use 22.22.2`) —
  the shell's default `node` resolved to v12.13.0, which fails `astro check`/`astro build` with
  `ERR_REQUIRE_ESM`. Same constraint PR-01 already documented via `.nvmrc`.
- Verified with a headless-Chromium pass (Python `playwright`, since no `chromium-cli`/npm
  `playwright` was available in this environment): home + `/styleguide` in both themes at
  1440/375/320px, mobile menu open state, keyboard tab order (skip-link → wordmark → nav →
  CV → theme toggle, visible focus ring throughout), and Escape closing the mobile menu and
  returning focus to the toggle button. No console errors.

## PR-03 — Content model and data migration

- `experience`, `recognition`, `education` are one YAML file per entry under
  `src/content/<collection>/*.yaml` (glob loader), not a single TS array — the doc left this
  open for `experience` specifically; applied the same choice to `recognition`/`education` for
  consistency since none of the three need a Markdown body.
- **Deviation from the doc's schema pseudocode:** `image`/`thumbnail` fields use Astro's content
  `image()` helper (`schema: ({ image }) => z.object({ image: z.object({ src: image(), alt:
  z.string() }) ... })`), not a literal `src: string`. This is what the PR's own "Images" section
  asks for ("move into `src/assets/img/` so `astro:assets` can optimise them") — a plain string
  path can't be optimised by `astro:assets`, only a resolved `ImageMetadata` can. Paths in
  frontmatter are relative to the content file, e.g. `../../assets/img/PCR.png`. **Consequence
  for PR-04/05/07/08/09:** `entry.data.image.src` / `entry.data.thumbnail.src` is already an
  `ImageMetadata` object — pass it straight to `<Image>`/`<Picture>` `src`, don't treat it as a
  raw path string.
- `links.*` and similar URL fields use Zod v4's top-level `z.url()`, not the deprecated
  `z.string().url()` chain.
- **Known upstream noise, not a real issue:** `npx astro check` reports 0 errors / 0 warnings but
  ~87 `ts(6385) 'z' is deprecated` *hints* in `content.config.ts`, one per `z.*` call. This is a
  quirk of Astro 7.2.2's `z` re-export from `zod/v4` (the aggregated namespace pulls in some
  unrelated deprecated compat members, and TS flags the whole `z` identifier at every use site).
  It's not fixable without abandoning the documented `import { z } from 'astro:content'` pattern;
  future PRs touching `content.config.ts` will see the same hints and can ignore them.
- All 9 `publications` entries ship with `bibtex` left empty — no officially-verified BibTeX text
  exists anywhere in the current repo (papers.md, index.html) to copy verbatim, and the PR rule is
  "leave it empty rather than inventing keys." PR-08's copy-button disclosure already handles this
  ("if a BibTeX entry is missing, the disclosure is not rendered at all").
- `/styleguide` "Content" section (`#content`) reads all 5 collections via `getCollection` and
  renders a count + compact table per collection; no new component, just tables scoped to the
  page's own `<style>` block, consistent with the rest of `/styleguide`.
- **TODO(verify) flags left in the data** (also listed in the PR description): FACIS project start
  year (only Nov 2025 MoI award date is confirmed), Revie / SKV camera download / PoseAnnotator /
  infant-sensorimotor / camera-trap-ID start years (no date in any source), Porsche Engineering
  work location (country-level only), the Erasmus year in Ljubljana (fact sheet already flags this
  ⚠), ongoing peer-review service year (anchored to the one confirmed year, CVPR 2025), and a
  possible ProbPose GitHub code link (referenced informally elsewhere, no confirmed URL in the
  trusted source set).
- **Dead link found, kept as-is:** `https://www.dny.ai/event-2024/ai-4-sport` (AI4Sports 2024
  recognition entry) returns 404 as of this writing. Copied verbatim from both the live
  `index.html` and the PR-00 fact sheet — not a typo introduced here. Left in place since no
  alternative confirmed URL exists; flagging for Miroslav to update or drop.
- The `s23dr` project has no `image` — none of the 20 moved image files depict it, and PR-00
  gives no other asset to use. PR-05 explicitly allows this ("if none exists, render the card in
  the text-only variant... list the missing figure in the PR description"); flagging it here too.
- The old CV.pdf (`public/CV.pdf`) was **not** used as a migration source — it disagrees with the
  PR-00 fact sheet on several already-corrected facts (Porsche "Macan"/100,000+/1,000+ units
  instead of Taycan/170,000+, and a PhD start of "Feb 2019" instead of Feb 2023), so it's stale
  relative to the confirmed fact sheet. Only `index.html`, `papers.md`, `projects.md`,
  `coaching.md`, `teaching.md` and PR-00 §8 were treated as authoritative.
