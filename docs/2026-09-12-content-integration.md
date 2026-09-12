# Content integration — redesign only

Kept the existing layouts, typography, colours, light/dark portraits and navigation.

- About now connects team contribution and leadership to coaching and supervision;
  speciality coffee links to the retired VRG app. Education and core technical skills
  follow the personal story, with six verified external perspectives under Elsewhere.
- Removed the HTML CV and all live links to it; kept both PDF files and the compact CV links.
  Research appointment dates, Ljubljana supervision and annotation coordination remain on
  About. Existing Porsche deployment figures remain on Work. Historical paper uptake and
  the recorded AP comparison are attached to the relevant publications as project notes.
- Publications now includes the previously CV-only talks and ICVSS selection. Recognition
  continues to use the existing content collection.
- Work records the updated Revie usage and SKV download figures, expands the Qualcomm
  description using only the supplied public-level details, and adds VRG coffee ratings
  beside the other applied systems. Both coffee repositories found on GitHub are private,
  so no inaccessible public code link or retired live demo is advertised.
- Updated llms.txt and Person JSON-LD to match the visible content and page structure.
  Completed degrees are represented as credentials; the ongoing PhD is not a completed degree.
- Removed the portrait location caption and personal Facebook footer link.

## Verification

- Local Astro check: zero errors and warnings (existing deprecation/unused-code hints).
- Local static build passed.
- 174 internal link/anchor checks passed; no HTML CV route, CV sitemap entry or stale CV link;
  no duplicate HTML IDs; valid Person JSON-LD.
- Local Chromium download timed out. The existing redesign-only build workflow provides
  desktop/mobile and light/dark browser checks and review screenshots without deployment.

No changes to deployment workflows or the live branch (`master` in this repository).
