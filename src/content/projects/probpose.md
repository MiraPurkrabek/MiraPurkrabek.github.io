---
title: ProbPose
tagline: A probabilistic approach to 2D human pose estimation
kind: research
years: '2025'
role: First author
org: 'CTU Prague · VRG'
featured: true
featuredOrder: 2
featuredMeta: 'CVPR 2025 · First author'
order: 3
summary: >-
  A probabilistic 2D pose estimator that reasons explicitly about keypoints outside the visible
  image, improving both out-of-image and in-image localization.
highlights:
  - 'Introduces calibrated per-keypoint presence probabilities instead of uncalibrated heatmaps'
  - 'Introduces the CropCOCO dataset and the Extended OKS metric for out-of-image keypoints'
  - 'Public code and data'
tags:
  - Human Pose Estimation
  - Probabilistic Modeling
  - Robustness
links:
  code: https://github.com/MiraPurkrabek/ProbPose_code
  project: https://mirapurkrabek.github.io/ProbPose/
  paper: https://mirapurkrabek.github.io/ProbPose/
image:
  src: '../../assets/img/McLaughlin.gif'
  alt: 'Pose estimation overlaid on an athlete whose limbs extend outside the cropped image, with keypoints correctly predicted as out-of-frame.'
status: completed
---

Current human pose estimators ignore out-of-image keypoints and rely on uncalibrated heatmaps.
ProbPose predicts, for each keypoint, a calibrated probability of presence at each location in the
activation window, a probability of being outside it, and a predicted visibility. To evaluate
out-of-image keypoints, the work introduces the CropCOCO dataset and the Extended OKS (Ex-OKS)
metric. On COCO, CropCOCO and OCHuman, ProbPose improves out-of-image keypoint localization while
also improving in-image localization and robustness near the edges of the bounding box.
