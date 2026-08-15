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
