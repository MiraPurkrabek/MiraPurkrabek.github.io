---
title: BBox-Mask-Pose
tagline: Detection, segmentation and pose estimation improving each other in a loop
kind: research
years: '2025–2026'
role: First author
org: 'CTU Prague · VRG'
featured: true
featuredOrder: 1
featuredMeta: 'ICCV 2025 · First author'
order: 2
summary: >-
  Detection, segmentation and pose estimation conditioned on each other in a self-improving
  feedback loop, state of the art on crowded scenes.
highlights:
  - 'First method to exceed 50 AP on OCHuman (BMPv2)'
  - 'Matches or beats state of the art on both COCO and OCHuman with small models'
  - 'Public code, pretrained models and a live demo'
tags:
  - Human Pose Estimation
  - Segmentation
  - Detection
links:
  project: https://mirapurkrabek.github.io/BBox-Mask-Pose/
  paper: https://mirapurkrabek.github.io/BBox-Mask-Pose/
  code: https://github.com/mirapurkrabek/BBoxMaskPose
  demo: https://huggingface.co/spaces/purkrmir/BBoxMaskPose-demo
image:
  src: '../../assets/img/004806_BMP_loop.gif'
  alt: 'Looping animation of detection, segmentation and pose estimation refining each other across iterations on a crowded scene with overlapping people.'
status: active
---

A line of research on multi-person human understanding in crowded scenes. BBox-Mask-Pose
conditions pose estimation on segmentation masks instead of bounding boxes, then closes the loop
by using the estimated pose to refine the mask with Segment Anything — detection, segmentation
and pose estimation each improving the others. The ICCV 2025 paper (first author) established the
approach; BBoxMaskPose v2 (arXiv 2026, with Constantin Kolomiiets) extends the mutual conditioning
into 3D. SAM-pose2seg, a related pose-guided segmentation model supervised as part of this line of
work, won the Best Student Paper Award at CVWW 2026.
