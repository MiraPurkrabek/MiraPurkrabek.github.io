---
title: 'S23DR 2026 Winning Solution'
authors:
  - Jan Škvrna
  - Miroslav Purkrábek
  - Lukáš Neumann
venue: 'CVPR 2026 · Urban Scene Modeling Workshop'
venueLong: Urban Scene Modeling Workshop at CVPR 2026
year: 2026
type: challenge
role: co-author
awards:
  - '1st place · $5,000 prize'
selected: false
summary: >-
  Winning solution to the Structured 3D Reconstruction challenge: recovering building
  wireframes from sparse 3D observations, with a coarse prediction followed by refinement.
abstract: >-
  The method reconstructs structured 3D wireframes from sparse structure-from-motion
  points, fitted depth and semantic segmentations. A flow-matching diffusion transformer
  first predicts the coarse structure, then refines it in a cropped second pass.
  Combining multiple samples improves consistency. The system ranked first on the
  private leaderboard; Jan presented the work at the Urban Scene Modeling Workshop
  at CVPR 2026.
thumbnail:
  src: ../../assets/img/s23dr-poster.jpg
  alt: Building wireframe reconstruction from a 3D point cloud, showing the coarse diffusion and refinement stages.
links:
  arxiv: https://arxiv.org/abs/2606.06695
  project: https://usm3d.github.io
  demo: https://huggingface.co/spaces/usm3d/S23DR2026
---
