---
title: Human Pose-Constrained UV Map Estimation
authors:
  - Matej Suchánek
  - Miroslav Purkrábek
  - Jiří Matas
venue: CVWW 2025
venueLong: 26th Computer Vision Winter Workshop
year: 2025
type: workshop
role: supervised
awards: []
selected: false
summary: >-
  Constrains UV map estimation with 2D human pose, keeping the map anatomically coherent while
  preserving local precision.
abstract: >-
  UV map estimation is used in computer vision for detailed analysis of human posture or
  activity. Previous methods assign pixels to body model vertices by comparing pixel descriptors
  independently, without enforcing global coherence or plausibility in the UV map. We propose
  Pose-Constrained Continuous Surface Embeddings (PC-CSE), which integrates estimated 2D human
  pose into the pixel-to-vertex assignment process. The pose provides global anatomical
  constraints, ensuring that UV maps remain coherent while preserving local precision. Evaluation
  on DensePose COCO demonstrates consistent improvement, regardless of the chosen 2D human pose
  model. Whole-body poses offer better constraints by incorporating additional details about the
  hands and feet. Conditioning UV maps with human pose reduces invalid mappings and enhances
  anatomical plausibility. In addition, we highlight inconsistencies in the ground-truth
  annotations.
links:
  arxiv: https://arxiv.org/abs/2501.08815
thumbnail:
  src: '../../assets/img/PC-CSE_example.png'
  alt: 'A predicted UV surface map on a human figure, showing coherent body-part boundaries constrained by 2D pose.'
---
