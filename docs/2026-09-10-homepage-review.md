# Homepage refinements — 10 September 2026

All changes are on `redesign`. The production branch is `master`; its deployment workflow is unchanged.

- Kept Work for project narratives, contributions and impact; Publications now also collects awards, competition results and reviewing service, using the existing recognition collection.
- Kept the homepage prose and theme-specific portraits. Contact links use the existing SVG icon family, spread across the text column on desktop and stack at narrow widths.
- Added a small keyboard- and touch-accessible “Why Mira?” disclosure beside the name.
- Emphasized the same three highlights in a quiet teal panel.
- Renamed “Along the way” to “Experience”, with aligned logo, readable organisation name, optional department, role and dates. Compact labels live in the typed experience collection.
- Used the VRG mark from its own website and the official Porsche crest with Porsche Engineering's name and link.
- Corrected theme-toggle icon scoping so only the current theme's icon is shown.

## Visual review

`scripts/capture-review.mjs` serves the built site on loopback, checks homepage, Work and Publications at 320, 390, 768, 1024 and 1440 pixels in both themes, and captures actual browser screenshots in `docs/review/`. It checks horizontal overflow, visible images, menu controls, name disclosure and theme persistence. The build-only workflow saves these files on `redesign`; it does not deploy a website. The recorded source SHA in `results.json` identifies the input commit.

Screenshots are generated review material, outside Astro's public directory.
