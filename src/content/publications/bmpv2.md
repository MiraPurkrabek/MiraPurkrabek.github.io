---
title: 'BBoxMaskPose v2: Expanding Mutual Conditioning to 3D'
authors:
  - Miroslav Purkrábek
  - Constantin Kolomiiets
  - Jiří Matas
venue: arXiv 2026
venueLong: arXiv preprint
year: 2026
type: preprint
role: first-author
awards: []
selected: false
summary: >-
  Extends BBox-Mask-Pose's 2D mutual conditioning into 3D, improving multi-person 3D pose
  estimation in crowded scenes.
abstract: >-
  Most 2D human pose estimation benchmarks are nearly saturated, with the exception of crowded
  scenes. We introduce PMPose, a top-down 2D pose estimator that incorporates the probabilistic
  formulation and the mask-conditioning. PMPose improves crowded pose estimation without
  sacrificing performance on standard scenes. Building on this, we present BBoxMaskPose v2
  (BMPv2) integrating PMPose and an enhanced SAM-based mask refinement module. BMPv2 surpasses
  state-of-the-art by 1.5 average precision (AP) points on COCO and 6 AP points on OCHuman,
  becoming the first method to exceed 50 AP on OCHuman. We demonstrate that BMP's 2D prompting of
  3D model improves 3D pose estimation in crowded scenes and that advances in 2D pose quality
  directly benefit 3D estimation. Results on the new OCHuman-Pose dataset show that multi-person
  performance is more affected by pose prediction accuracy than by detection. The code, models,
  and data are available at the project website.
links:
  project: https://mirapurkrabek.github.io/BBox-Mask-Pose/
  # TODO(verify): no arXiv ID confirmed in the source material used for this migration.
thumbnail:
  src: '../../assets/img/043+076+174-poster.jpg'
  alt: 'Four overlapping people reconstructed as separately coloured 3D body meshes despite standing in a tight cluster.'
---
