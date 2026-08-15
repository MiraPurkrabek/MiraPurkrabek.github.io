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
