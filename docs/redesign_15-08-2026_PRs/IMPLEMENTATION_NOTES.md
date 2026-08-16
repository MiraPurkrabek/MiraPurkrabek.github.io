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

## PR-04 — Homepage part 1: hero, affiliation strip, selected impact

- New `src/components/home/` directory for homepage-only sections (`Hero.astro`,
  `Affiliations.astro`, `Impact.astro`), assembled by `src/pages/index.astro`.
- Single portrait, not the two-cell composition — but **two photos, one per theme**, not one
  image with a CSS trick. Tried `CV_picture_PS_square.jpg`, then a transparent cut-out
  (`SKV_square_centered_transparent.png`) sitting on a `--surface-soft` background so it would
  theme-adapt; the cut-out had visible matting artifacts (edge halo/reflection from the original
  background removal) at the shoulders, so both were dropped. Final: two actual photos from the
  same shoot, each composed for its theme — `SKV_square_centered.png` (black shirt, light
  backdrop) for light mode, `SKV_square_centered_dark.png` (white shirt, dark backdrop) for dark
  mode. Filenames inherited from the SKV shoot they originated from, but neither image carries
  club branding or coaching content — just a headshot. `SKV_circle.png` was never used: PR-04
  explicitly bans a circular crop. Both copied from `public/assets/img/` into `src/assets/img/`
  so `astro:assets` can process them (images in `public/` are served unoptimised, verbatim) — the
  `public/` copies are untouched and unused elsewhere.
  **Swap mechanism:** both `<Picture>`s render into the same absolutely-positioned frame; CSS
  opacity keyed off `:root[data-theme='dark']` shows the matching one, with a `--dur`/`--ease`
  cross-fade on live theme-toggle clicks (verified — no reload). Only a `data-theme` CSS selector
  can react correctly to the manual toggle override (`prefers-color-scheme` media alone can't,
  since the toggle can diverge from OS preference per PR-02's notes), so both images necessarily
  ship in the HTML and both fetch eagerly — no conditional-loading trick was worth the added JS.
  Because `data-theme` is set synchronously pre-paint by `BaseLayout`'s bootstrap script, the
  correct image is already showing at first paint, not just after the swap CSS applies.
  **Size:** `formats={['avif', 'webp']}` plus `fallbackFormat="jpg"` (the source PNGs are fully
  opaque, no alpha, so a jpg fallback is safe and much smaller than the png default) at
  `width={640} height={640}` — collapses ~5.2 MB / 1.5 MB source PNGs to roughly 9 KB avif / 15 KB
  webp / 28 KB jpg each, ~100 KB combined for both themes' full format sets.
- **Affiliation strip data sourcing is a hybrid, not a pure content-collection read.** PR-04's
  table gives exact display strings for org name and role line (e.g. "Czech Technical University
  in Prague" / "PhD Candidate & Researcher · Visual Recognition Group") that don't map 1:1 onto
  the raw `org`/`role` YAML fields from PR-03 (which read "CTU Prague · Visual Recognition Group"
  / "PhD Candidate & Researcher (advisor: prof. Jiří Matas)"). `Affiliations.astro` hardcodes the
  PR-04 org-display/role-line strings per entry (keyed by content-collection `id`), but still
  reads `displayPeriod`, `orgUrl` and `logo` live from the `experience` collection — so a future
  logo drop-in or a period/orgUrl edit in the YAML needs no component change, only the curated
  display text is fixed. Card order is the literal PR-04 table order (Qualcomm, CTU, Tübingen,
  Porsche), which is not a pure "sort by `order` field ascending" (that would put Tübingen before
  CTU) — the table order was taken as authoritative over the field.
  Missing logo files, per the PR: `public/assets/logos/{qualcomm,ctu,tuebingen,porsche}.svg`.
- Selected-impact tile copy is hardcoded directly in `Impact.astro` (not sourced from the
  `projects`/`recognition` collections) — it's a "use verbatim" copy block in the PR doc, same
  treatment as the hero copy, not a dynamic listing.
- `Button`'s `ghost` variant renders accent-coloured text, which would have pushed above-the-fold
  accent usage past the "pill + primary button, at most twice" acceptance criterion — so the CV
  and Email hero buttons use `variant="secondary"`, not `ghost`.
- Verified with a headless-Chromium pass (Python `playwright`) against `astro dev`: home in both
  themes at 320/768/1024/1440px, plus a 1440×900 no-scroll "fold" screenshot confirming the
  Impact section heading is reached after one screen-height scroll. Confirmed via the built HTML:
  a single `<h1>`, hero text markup precedes the portrait markup in DOM order at every width, and
  no "passionate"/coaching/floorball/`text-align: justify` in this PR's own components (the
  Footer's pre-existing "Coaching" nav link is out of this PR's scope, not new).

## PR-06 — Homepage part 3: recognition, selected publications, beyond CV, contact

- **Recognition and Selected publications are data-driven from the collections, not verbatim
  copy** — unlike Beyond/Contact, the PR doc's mock text blocks for these two sections don't map
  1:1 onto any single schema field in a consistent way (checked: the mock's publication
  descriptors sometimes match a title-before-colon, sometimes title-after-colon, sometimes
  neither — no single derivation rule fits all three). Treated the mock as illustrative of the
  visual format, not literal copy, and rendered straight from `recognition`/`publications`
  collection fields instead, matching how Timeline/SelectedWork/Affiliations already work.
- `Recognition.astro` sorts `selected: true` entries by the collection's own `order` field
  (already newest-first, same convention as `Timeline`), not `year desc` — ties within a year
  (2026: S23DR vs. SAM-pose2seg) are only resolved correctly via `order`. Two-column layout is
  CSS `columns: 2` at ≥720px (browser-balanced, not a manual per-row column split). Linked titles
  get **no** external-link icon — the PR explicitly bans icons in this list ("No cards, no
  medals, no icons"), overriding the site-wide external-link-icon convention used everywhere else
  (Footer, ProjectFeature, ghost Buttons) for this one section only.
- `SelectedPublications.astro` heading = the matching `projects` collection entry's short
  `title` (cross-referenced by shared content-collection `id` — all three selected publications
  happen to have a same-id project) em-dash the publication's own `summary` field (the same
  homepage-ready one-liner `ProjectFeature` uses), not the publication's full academic title.
  Sorted by `year desc`; the one same-year tie (BBox-Mask-Pose vs. ProbPose, both 2025) is
  resolved implicitly by `Array.sort`'s stability plus the glob loader's alphabetical file order,
  which happens to put BBox-Mask-Pose (ICCV, Oct) before ProbPose (CVPR, June) — correct today,
  but fragile: `publications` has no `month`/`order` field to sort on explicitly. Link buttons
  render whatever `links.*` exist per entry (none of the three selected publications actually
  have a `paper` link in the data, only `project`/`code`/`demo` — same "show what exists"
  precedent PR-05 set for FACIS).
- **Beyond ships text-only — no floorball or mountain photograph exists anywhere in the repo**
  (checked `src/assets/img`, `public/assets/img`, and the old Jekyll pages). `SKV_circle.png` is
  a circular-cropped headshot portrait, not an action/lifestyle shot — using it here would just
  duplicate the hero photo, and the PR explicitly bans using it as a stand-in plus bans the club
  logo outright. Shipped as a single-column text block (`--width-text` max-width) per the PR's
  own fallback instruction; flagging the missing photo here as directed.
- `Contact.astro`'s lede sentence is assembled around `site.availability.text` (lowercased and
  spliced into a fixed sentence frame) rather than the PR doc's literal paragraph, because the PR
  requires it "comes from `site.availability`... so both places change together" and the current
  `site.ts` string ("Open to applied scientist and research engineer roles") doesn't read as a
  full sentence on its own. Didn't reword `site.ts` itself since PR-04 already confirmed that
  exact pill wording — changing it would also change the hero pill.
- No new client-side JavaScript in any of the four components (Recognition, SelectedPublications,
  Beyond, Contact) — homepage JS budget is unchanged from PR-05.
- Verified with a headless-Chromium pass (Python `playwright`): all four new sections in both
  themes at 1440/375/320px, zero console errors, every external link carries
  `target="_blank" rel="noopener"`, exactly one literal occurrence of the word "coach" and one of
  "consulting" across the built page, heading outline is `h1` → `h2` per section with `h3`s only
  nested inside (no skipped levels), and the page reads correctly with JavaScript disabled.
  Homepage weight (HTML + linked CSS + eager hero images) is ~92 KB raw, far under the 600 KB
  budget; no new JS keeps it under the 6 KB gzipped JS budget too.

## PR-09 — /about and /coaching

- **`Callout.astro`** built as specified (shared with PR-10, not duplicated) — `--surface-soft`
  background, `--accent` left border, `--text-sm`. No `tone`/variant prop; PR-10 can add one if
  it turns out to need a second visual style.
- `/about` word count: **749 words** of narrative prose (everything between the hero and the
  reused Contact section, i.e. excluding Contact's own copy) — within the 700–1000 budget.
  Reusing `Contact.astro` as-is per the PR meant not counting its copy as new "About" prose.
- **Portrait**: `CV_picture_PS_square.jpg` (unused elsewhere in the repo) for the top-of-page
  headshot. **Supporting visual**: `ProbPose_McLaughlin.png` (already used as the ProbPose
  publication thumbnail) illustrating "the last 10%" in the How I Work section — reused rather
  than sourcing anything new. **Away from work** ships text-only: `path.jpg` is generic stock
  photography (not Mira's own), and `eurasian-lynx.jpg` belongs to the camera-trap research
  project, not his personal life — neither "genuinely fits" per the PR's own bar, and PR-06
  already established text-only as the fallback for this exact gap.
- Both `/about` and `/coaching` render their hero block (h1 + lead/meta) and the rest of the
  page's content inside **one** `Section`, not two. Two adjacent `Section`s each carry
  `padding-block: var(--section-gap)`, which stacks to a visually dead ~190px gap when both are
  default-tone (no background change to break it up, unlike the homepage's alternating
  tone="soft" sections). Fixed with a single `Section` per page and a `margin-bottom` on the hero
  block instead.
- `/coaching`'s intro paragraph is a light tense fix, not new substance: the old Jekyll page said
  "currently leading the men's team" directly above the stepping-down callout that says he
  stepped down — self-contradictory now that both are visible on the same page. Rewrote to past
  tense ("I coached... from 2017 through 2025") so the callout doesn't immediately contradict the
  sentence above it. All facts and every external link are unchanged.
- Kept the `dny.ai` AI4Sports link in "More than Coaching" even though the PR's parenthetical
  only names florbal.cz/skvflorbal.cz/iDnes explicitly — that section is one of the ones the PR
  says to keep in full, the link is part of its substance, and PR-03 already decided to keep this
  same (known-404) URL elsewhere rather than drop it silently.
- Coaching's period lines (`2022–2025` etc.) reuse the Timeline's mono/subtle/tracked-wide style
  as a page-scoped `.coaching-meta` class — not a shared component, since `Timeline.astro`'s
  version is `home/`-scoped and coupled to its own markup.
- Podcast card: real `<a>` with `target="_blank" rel="noopener"`, thumbnail `alt=""` (decorative
  — the adjacent visible text already carries the same information), Czech title/description
  wrapped in `lang="cs"`, "(in Czech)" appended outside that span in English. Verified
  keyboard-focusable with a visible focus ring via a Playwright Tab-order pass.
- Added the one fact PR-09 flagged as possibly missing: "best regular-season points total in the
  club's history" for 2023/24, folded into the existing "Leading the Men's Team" paragraph
  (the other two — 2024 head-coach appointment, 2024/25 top-8 finish — were already in the old
  copy).
- Verified with `astro check` (0 errors/warnings) and a headless-Chromium pass: both pages, both
  themes, 1440/375px, zero console errors.
