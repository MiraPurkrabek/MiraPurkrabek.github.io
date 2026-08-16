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

## PR-10 — Article layout and `/webcam_demo/`

- **`ArticleLayout.astro`** is a Markdown `layout:` frontmatter target, not a component imported
  by a hand-written `.astro` page — `src/pages/webcam_demo.md` is a real Markdown file (no MDX
  integration is installed, and none was needed). Astro's Markdown-layout convention nests the
  documented props under `Astro.props.frontmatter` rather than spreading them, so `Props` is
  `{ frontmatter: {...}, rawContent?: () => string }`, not a flat `title`/`subtitle`/... shape.
  Reading time is computed from `rawContent()` (build-time only, no client JS): strip code
  fences/HTML/markdown syntax, word-count at 200 wpm, `< 1 min read` floor — same source numbers
  `_includes/readtime.html` used, just computed in the layout instead of Liquid.
- **The TL;DR box is a real `Callout`, not embeddable from the Markdown body.** Plain Markdown
  (no MDX) can't invoke an Astro component inline, so `ArticleLayout` accepts an optional
  `tldr` frontmatter string (raw HTML, `set:html` into a `<p>` inside `Callout`) and renders it
  right after the header, before the body — this moves it slightly earlier than its position in
  the original page (which had one intro paragraph above it), a necessary side effect of routing
  it through frontmatter rather than the body flow.
  **Consequence for any future article added the same way:** the same `tldr` mechanism is the
  only path to a Callout from a `.md` page under this layout.
  **Callout reused as-is from PR-09** (`src/components/Callout.astro`), not duplicated.
  **Video**: raw `<figure><video>` HTML embedded directly in the Markdown body passes through
  Astro's Markdown compiler untouched — `controls muted loop playsinline preload="metadata"`,
  **no autoplay**, `poster="/assets/videos/webcam_demo_poster.jpg"` (frame 0 of the existing
  `webcam_demo_muted.mp4`, extracted with `ffmpeg -vf "select=eq(n\,0)"`, per the PR). Kept the
  video inside the normal text column rather than using the new `.wide` breakout class (see
  below) — at 760px it's already a generously sized player and this avoids the breakout's
  viewport-relative CSS on the one page that actually ships it this round.
- **Found and fixed a real, pre-existing bug in `Prose.astro`, shared by `/about` and
  `/coaching`:** every one of its descendant selectors (`.prose h2`, `.prose pre`, `.prose a`,
  etc.) was scoped by Astro to require its *own* `data-astro-cid-*` attribute on the child
  element too — but `<Prose>`'s children always arrive via `<slot />` from whichever file wrote
  the markup (the consuming `.astro` page, or in this PR's case Astro's Markdown renderer), and
  slotted elements carry the *consumer's* scope id, never `Prose.astro`'s own. Every rule with an
  unscoped child was silently a no-op: headings fell back to bare browser-default sizing, `.prose
  pre { overflow-x: auto }` never applied, so a long unwrapped terminal line in the webcam-demo
  code block wasn't clipped/scrolled by its own box — it overflowed the box with `overflow:
  visible` and widened `<body>`'s `scrollWidth` past the viewport at 320/375px, i.e. exactly the
  horizontal-scroll bug the acceptance criteria explicitly rules out. Fixed by wrapping every
  descendant selector's child side in `:global()` (`.prose :global(h2) {}`, matching the pattern
  `Callout.astro` already used correctly for `:global(p + p)`), which also retroactively fixes
  `/about` and `/coaching`'s heading sizes/spacing (previously silently defaulting to the
  browser's UA stylesheet, e.g. h2 rendered at browser-default `1.5em`/`0px margin-top` instead
  of the intended `--text-2xl`/`--space-9`) — re-verified both pages after the fix, no visual
  regression, only the intended tokens now actually landing. **Consequence for later PRs:** any
  new `.prose` selector must use `:global()` on the child side or it will silently never match.
- Added a `.wide` utility class to `Prose.astro` per the PR's "full-width media... via a `.wide`
  class" spec (viewport-relative breakout: `width: 100vw; max-width: var(--width-page); margin-
  left: 50%; transform: translateX(-50%)` — escapes any ancestor `max-width` regardless of
  nesting depth). Not applied to the webcam-demo video in this PR (see above); ready for the next
  article that needs it.
- **Disabled Shiki syntax highlighting site-wide** (`markdown.syntaxHighlight: false` in
  `astro.config.mjs`) — Astro's default Shiki output hard-codes a `github-dark` theme via an
  inline `style="background-color:#24292e;..."` attribute on `<pre>`, which both violates "no
  inline `style` attributes" and ignores the light/dark toggle (it's the same two fixed colours
  in either theme). Plain `<pre><code>` lets `Prose.astro`'s own token-based `pre`/`code` styling
  take over instead, correctly theme-aware. No other page currently ships a fenced code block,
  so this has no effect elsewhere yet.
- **No publish date rendered.** No confirmed date exists anywhere in PR-00's fact sheet for when
  this write-up was published (only that it followed the CVPR 2025 poster session, June 2025);
  `ArticleLayout`'s `date` prop is optional and simply omitted here rather than invented — the
  meta line shows only the computed reading time. Flagging per the "do not invent dates" rule.
- `/work` closing block: new `tone="soft"` `Section` titled "Notes & write-ups" with one line
  linking the article, below the existing "Publications with abstracts..." line. No blog index,
  tags, or RSS — out of scope per the PR.
- `webcam_demo_launch.png` (`public/assets/img/`) is unreferenced by the ported article (the
  original page never embedded it either, despite living alongside the other webcam-demo
  assets) — left untouched, not deleted, since asset cleanup is PR-13's job.
- Verified with `astro check` (0 errors/warnings) and a headless-Chromium pass: `/webcam_demo/`
  in both themes at 1440/375/320px, zero console errors; confirmed via computed styles that
  `document.body.scrollWidth` equals the viewport width at 320px (no horizontal overflow) and
  that the code block's own `overflow-x: auto` is active; spot-checked `/about` and `/coaching`
  post-Prose-fix at 1440px, both themes, no regressions.

## PR-11 — Metadata, structured data, redirects, 404, analytics

- **New `src/components/Seo.astro`** (title/description/canonical/OG/Twitter/robots) wired into
  `BaseLayout`'s `<head>`. `BaseLayout`'s own `<title>`/`<meta description>`/robots handling
  (added ahead of time in PR-02) was removed in favour of it; `ogImage`/`ogType` are new
  `BaseLayout` props alongside the existing `title`/`description`/`bodyClass`/`noindex`.
  Canonical and absolute `og:image`/`twitter:image` URLs are built from `Astro.url.pathname` +
  `site.siteUrl`, not hand-written per page.
- **`site.ogImage` changed from its PR-02 placeholder (`/assets/img/og-default.png`, which never
  existed) to `/og/default.png`** — matches where this PR's doc says to commit the generated PNG
  (`public/og/default.png`), not the path PR-02 had guessed.
- **New `src/components/PersonSchema.astro`**, rendered only on `/` via `<Fragment slot="head">`
  (first real use of `BaseLayout`'s `head` slot). `worksFor` (Qualcomm) carries a `TODO(remove)`
  comment in the frontmatter script per the PR's explicit requirement — must be deleted once the
  internship ends, December 2026. Skipped the optional per-publication `ScholarlyArticle`
  JSON-LD (PR marks it nice-to-have, skip if it complicates the build).
- **`/webcam_demo/`'s SEO title needed to diverge from its visible `<h1>`.** PR-11's title table
  gives this page's title with no `— Mira Purkrábek` suffix (unlike every other row) — appending
  the suffix would push it past the 60-char budget (48 + 18 = 66). `ArticleLayout`'s
  `Frontmatter` gained an optional `seoTitle` field (default: `` `${title} — ${site.name}` ``,
  preserving old behaviour for any future article that doesn't set it); `webcam_demo.md` sets it
  explicitly to the table's exact string.
- **OG image generation (`scripts/make-og.mjs`, `npm run og:generate`)** renders an SVG to PNG
  with `sharp` — the Inter Variable woff2 (already vendored via `@fontsource-variable/inter`) is
  inlined into the SVG as a base64 `@font-face` `data:` URI, which `librsvg` 2.52 (this repo's
  `sharp`'s backing SVG renderer) resolves and rasterizes correctly, diacritics included —
  verified visually, no system font install needed. Portrait crop is
  `src/assets/img/SKV_square_centered.png` (the same light-mode hero photo, cropped to a rounded
  square via an SVG `<rect>` composited with `blend: 'dest-in'`), matching the hero's existing
  choice of portrait. **Added `sharp` as an explicit devDependency** (`^0.35.3`, matching the
  version already resolved) — it was previously only present transitively as `astro`'s own
  `optionalDependency` for `astro:assets`; a standalone script shouldn't rely on another
  package's optional transitive dependency actually being hoisted to top-level `node_modules`.
- **`public/llms.txt`** (33 lines) and **`public/robots.txt`** added per the PR's spec —
  `robots.txt` allows all agents (including AI crawlers) and points at `sitemap-index.xml`;
  doesn't touch `/assets`.
- **Sitemap (`@astrojs/sitemap`) needs a `customPages` entry for `/CV.pdf`** to reach the
  acceptance criterion's "seven real pages": the integration only walks Astro-built HTML routes,
  and `/CV.pdf` is a static file, not a route — but PR-00's URL map lists it as one of the site's
  real top-level pages (nav-linked from every page), so it's added by hand. The `filter` option
  excludes `/styleguide/`, `/404/`, the eight legacy-redirect-stub paths, and `/BBox-MaskPose/`
  (a redirect to a different repo's site, not this site's content) — verified the built
  `sitemap-0.xml` lists exactly `/`, `/about/`, `/coaching/`, `/CV.pdf`, `/publications/`,
  `/webcam_demo/`, `/work/`.
- **Redirects are copied verbatim from the PR doc**, including both the `/x` and `/x/` form for
  each legacy path. Astro's `build.format: 'directory'` output means both forms collapse to the
  same `dist/x/index.html`, so at build time only one of each pair actually renders — Astro logs
  a `WARN [router] ... conflicts with higher priority route` for the other and skips it (current
  Astro version: warning only, not a build failure; the warning text says a future version may
  make this a hard error). Functionally harmless today: verified in `dist/` that `/aboutme`,
  `/papers`, `/projects`, `/teaching` each produce one correct stub, and a static host resolves
  both slash forms to the same directory index regardless. If a future Astro upgrade turns this
  into a build error, drop the trailing-slash-variant keys — the non-slash key's directory-format
  output already serves both URL forms.
- **`src/pages/404.astro`** rebuilt from scratch (old `404.html` is Jekyll's, untouched — it's
  deleted in PR-13, not here). Two link groups (Site; Research projects — the same four external
  project microsites the old page linked), no image, `noindex`. Reuses the site's existing
  eyebrow/heading/list visual language rather than introducing new components.
- **New `src/components/Analytics.astro`**, rendered at the end of `<body>` (after `<Footer />`)
  so it can never sit ahead of page content. Loads only when `import.meta.env.PROD` is true *and*
  the current path isn't `/styleguide` — verified both conditions independently (GA absent on
  `astro dev`; GA present on every built page except `/styleguide/`). No cookie-consent gate
  added, matching the PR's explicit scope note (flagging for Miroslav, not implementing, per the
  PR text).
- Verified with `astro check` (0 errors, 0 warnings — added `is:inline` to the three new raw
  `<script>` tags across `Seo`/`Analytics`/`PersonSchema` to silence Astro's processing hints) and
  a headless-Chromium pass over a `astro preview` build of `dist/`: all eight page titles unique
  and matching the PR-11 table verbatim, canonical/OG/Twitter/robots present and correct per
  page, JSON-LD parses and validates as well-formed `schema.org/Person`, `/404/` in both themes
  at 1440/375px with zero console errors and no horizontal overflow, GA script tag presence
  confirmed per-page as above.

## PR-12 — Accessibility, dark-mode, responsive and performance QA pass

- **Tooling (not committed as deps):** `axe-core@4.13.0`, `lighthouse@13.4.1`,
  `playwright@1.62.1` (Chromium), installed with `--no-save` for the audit only. The one tool
  that _is_ kept is `scripts/check-links.mjs` (`npm run audit:links`) — zero-dependency, uses
  Node's built-in `fetch` against the built `dist/`, genuinely useful for future CI per the PR's
  "optional but welcome" note.
- **`--text-subtle` contrast, fixed at the token level.** PR-02 shipped this token already
  knowing it failed 4.5:1 (documented in its own notes as "below 4.5:1... reserve it for
  icon-paired/larger/decorative use"). This pass hit that exact wall: axe flagged 15+ elements
  site-wide using it for real body-size metadata (hero legal-name caption, section eyebrows,
  card/pub-item meta lines, footer headings, figcaptions, 404 headings). Rather than hunt down
  every usage, adjusted the token itself — light `#83867f`→`#6b6d68`, dark `#80868b`→`#868c90` —
  both now clear 4.5:1 against every surface they're used on (light: 4.64:1 worst case on
  `--surface-soft`; dark: 4.63:1 worst case on `--surface-soft`), same hue, just shifted to stay
  visually distinct from `--text-muted`. No component changes needed.
- **`<nav>` overuse fixed as a `landmark-unique` violation.** `ProjectFeature.astro` (home) and
  `SelectedPublications.astro` (home) both feature BBox-Mask-Pose and ProbPose, and each wrapped
  its 1–3-button link cluster in `<nav aria-label="X links">` — two navigation landmarks sharing
  the same accessible name on one page. A handful of inline buttons was never really a navigation
  landmark; changed `ProjectFeature.astro`, `ProjectEntry.astro`, and `SelectedPublications.astro`
  to wrap these in `<div role="group" aria-label="...">` instead. No visual change.
- **`/webcam_demo/` heading levels shifted up one** (`###`→`##`, `####`→`###`) — the body jumped
  straight from the layout's `<h1>` to an `<h3>`, an axe `heading-order` violation.
- **Both `<pre>` blocks (webcam_demo terminal output, `PublicationItem`'s BibTeX box) got
  `tabindex="0"`** — `overflow-x: auto` alone isn't keyboard-reachable (`scrollable-region-focusable`).
  The BibTeX one currently never renders (`bibtex` is empty for all 9 publications per PR-03) but
  would hit the same bug the moment content is added, so fixed both. **Also discovered Prettier
  reformats a single-line `<pre><code>...` onto three lines**, which would inject real whitespace
  into the rendered/copied BibTeX text since `<pre>` preserves it exactly — added a
  `{/* prettier-ignore */}` comment above `PublicationItem.astro`'s block to stop that. Any future
  `<pre>` added to an `.astro` file needs the same guard.
- **WCAG 2.2 `target-size` (24×24px minimum) — enabled in axe (it's disabled by default even
  under the `wcag22aa` tag filter; needs explicit `rules: { 'target-size': { enabled: true } }`).**
  Caught one real hit: `/coaching`'s "← Back to /about" link was a bare inline text link
  (120×19px) sitting 23px below the podcast-card link. Fixed with `padding-block` +
  `display: inline-block` on the link and `margin-top` on its wrapping paragraph.
- **Reviewed but did not "fix" `p-as-heading`** (also disabled by default in axe — deliberately
  experimental/false-positive-prone). It flagged the affiliation-card wordmark fallback,
  impact-tile stat numbers, and the footer signature line as suspected fake headings, purely
  because they're styled large/bold. All three are emphasis/branding text, not document
  sections — turning them into real `<h*>` tags would inject fake nodes into an otherwise correct
  h1→h2→h3 outline. Left as `<p>`.
- **GIF-to-video, the part PR-05 left half-done.** PR-05 converted `004806_BMP_loop.gif`
  (bbox-mask-pose) and `McLaughlin.gif` (probpose) to video **only for the homepage's featured
  cards** (`ProjectFeature.astro`) — `/work`'s `ProjectEntry.astro` still rendered all three
  through plain `astro:assets` `<Image>`, which flattens an animated GIF source to one static
  frame. RePoGen's `Duplantis.gif` (7.7 MB) had no video conversion anywhere, since it isn't a
  "featured" project and only ever appears on `/work`. Fixed by:
  - Generating `repogen.mp4`/`repogen.webm`/`repogen.jpg` from the source GIF via `ffmpeg`
    (`fps=20`, even-dimension scale filter, crf 30/36) — 337 KB / 650 KB / 78 KB.
  - Generating the missing `webm` (VP9) sibling for the two files PR-05 already had as mp4-only —
    smaller in both cases (bbox-mask-pose: 1.25 MB mp4 → 504 KB webm; probpose: 750 KB → 220 KB).
  - Extracting the shared `{ 'bbox-mask-pose': ..., probpose: ..., repogen: ... }` map out of
    `ProjectFeature.astro` into a new `src/data/video-previews.ts` (adds `width`/`height` per
    entry too, previously absent from the `<video>` markup entirely).
  - Wiring the same video-preview branch into `ProjectEntry.astro`, with its own copy of the
    lazy-hydration `<script>` (Astro components don't share client scripts across files without a
    shared script module, and this one's small enough not to bother) — so `/work` now shows real
    video for all three, matching the homepage.
- **Found and fixed a real perf bug: `<video poster>` has no `loading="lazy"` equivalent.** Even
  with `preload="none"` on the `<source>`s, the browser fetches the `poster` image immediately on
  parse, regardless of scroll position — so two ~150–190 KB poster JPEGs were loading eagerly on
  the homepage below the fold, competing with the actually-critical hero/font requests for
  bandwidth. Confirmed via Lighthouse mobile-throttle run: this alone accounted for roughly half
  of a 3.8 s → 1.8 s LCP improvement on `/`. Fixed by switching `poster={...}` to
  `data-poster={...}` and setting the real `.poster` property inside the same
  `IntersectionObserver` callback that already lazy-loads the video sources — poster still sets
  under `prefers-reduced-motion` (it's a static image, cheap either way) but source
  fetch/autoplay is skipped. Added a `<noscript><img></noscript>` fallback per card so the poster
  still shows with JS disabled. **Consequence for any future video-preview card:** don't set
  `poster` directly — use `data-poster` and let the existing hydration script pick it up.
- **Poster JPEGs converted to WebP** (`sharp`, quality 80, already a devDependency): 413 KB → 163
  KB combined across the three posters (~60% smaller), old `.jpg`s deleted since nothing else
  referenced them.
- **Font preload added to `BaseLayout`.** The Inter Variable latin woff2 was only discoverable
  after the browser fetched+parsed `global.css`→`fonts.css`'s `@font-face` rule — a multi-hop
  chain. Added `<link rel="preload" as="font" type="font/woff2" crossorigin>`, importing the same
  file via Vite's `?url` suffix so the preload's hashed href is guaranteed to match the actual
  `@font-face` request (verified in built output — no "unused preload" warning). Latin-ext (Czech
  diacritics) intentionally left un-preloaded — it's real content but a smaller fraction of
  above-the-fold text than the latin subset.
- **`fetchpriority="high"` gaps closed:** the homepage hero's dark-mode `<Picture>` didn't have it
  (only the light one did, but for a dark-mode visitor the dark image *is* the actual LCP
  element); `/about`'s hero portrait — first content element on the page, beside the `<h1>` —
  was defaulting to `astro:assets`' lazy-loading instead of eager.
- **Attempted deferring `gtag.js`'s fetch via `requestIdleCallback`** to reduce its Lighthouse
  Total Blocking Time contribution (confirmed via A/B test — GA execution alone costs the
  Performance score ~10 points under simulated mobile CPU throttle: 98–99 with GA blocked vs.
  85–95 with it present, consistent across repeated runs). **Made it worse, not better** — TBT
  went up, apparently because deferring the fetch just moves GA's long task later without moving
  it past Lighthouse's Time-to-Interactive quiet-window calculation, so it's still counted.
  Reverted to the original plain `async` script tag. **Consequence:** the ~85–95 (vs. required
  ≥95) Performance score on `/work` and `/publications` under Lighthouse's default mobile
  throttle is attributable specifically to GA's own script execution cost, confirmed by direct
  isolation testing, not to anything in the site's own code or assets. GA is a locked-in
  requirement (PR-00 §3, "keep the existing GA4 property... production only") — flagging the
  tension rather than dropping analytics to hit the number.
- **Deferred, not fixed — flagging per the PR's own instruction:** `--border-strong` (used for
  default/non-hover secondary-button borders, some card borders) measures ~1.6:1 against
  `--surface` in both themes, below the 3:1 WCAG 1.4.11 non-text-contrast guideline. Not caught by
  axe (no automated non-text-contrast rule) and not covered by the PR's explicit "text/background
  pair" contrast list. Fixing it means darkening/lightening a token used for card borders and
  dividers site-wide — a visible global tone shift, not a scoped fix like `--text-subtle` was.
- **Two dead external links found** (both on `/coaching`): `dny.ai/event-2024/ai-4-sport` (already
  known — PR-03 documented and kept it) and a newly-found dead `florbal.cz` article
  ("Vinohrady přebírá dosavadní asistent Purkrábek..."). Left both in place rather than silently
  swapping citations — a plausible replacement exists
  (`skvflorbal.cz/c/realizacni-tym-pro-sezonu-20242025-povede-miroslav-purkrabek-2378`), flagging
  for Miroslav to pick.
- **Naming-register slip found and fixed:** `porsche-hpc.md`'s image `alt` text read
  "...Miroslav's team built software for" — alt text is project-copy register per PR-00 §7, so
  should read "Mira's", not "Miroslav's". Grepped the built `dist/` for every remaining
  "Miroslav" occurrence after the fix — all land in the three sanctioned spots (hero caption,
  footer copyright, citation/author-list content) plus JSON-LD.
- **Diacritics fixed:** "Matej Suchanek" → "Matej Suchánek" (`pc-cse.md` author list, matches the
  PR's own explicit checklist) and "Jan Cech" → "Jan Čech" (`blanket.md` author list — verified
  against CTU FEE's own faculty page, since arXiv/IEEE's author metadata strips diacritics and
  isn't authoritative for spelling).
- **Date-range dash inconsistency fixed:** `education/phd.yaml` and `experience/ctu-vrg.yaml` both
  used an em dash ("2023 — present") where every other date range on the site uses an en dash
  ("2020–2022", "Jun – Dec 2026"); normalized to "2023 – present".
- Spelling: ran `aspell` across all visible page text extracted via Playwright; the five specific
  historical typos named in the PR are already clean (no regression); no new typos found.
- Verified with `astro check` (0 errors/warnings, same ~101 pre-existing `z` deprecation hints as
  every prior PR) and repeated Playwright/axe passes: all 7 pages × both themes × 8 widths
  (320/360/414/768/1024/1280/1440/1920) — 0 serious/critical axe violations (ran with `wcag2a`,
  `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` tags plus `target-size` and
  `label-content-name-mismatch` explicitly enabled), 0 horizontal overflow, 0 console errors.
  `prefers-reduced-motion` verified by direct DOM inspection (Playwright `reducedMotion: 'reduce'`
  context) — video previews never fetch sources or autoplay, on both `/` and `/work`. 200% zoom
  verified via the reflow-equivalent width (a CSS-`zoom`-property proxy gave a false positive —
  traced to a `documentElement` self-measurement artifact, no actual element overflowed).
  Lighthouse (mobile, default simulated throttle): Accessibility 100, Best Practices 100, SEO 100
  on `/`, `/work`, `/publications` — consistent across every run. Performance: 85–95 depending on
  run (see GA note above); CLS a perfect 0 on every run/page; LCP consistently ~1.7–2.0 s post-fix
  (from a 3.8 s pre-fix baseline on `/`).
