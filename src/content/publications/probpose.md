---
title: 'ProbPose: A Probabilistic Approach to 2D Human Pose Estimation'
authors:
  - Miroslav Purkrabek
  - Jiří Matas
venue: CVPR 2025
venueLong: IEEE/CVF Conference on Computer Vision and Pattern Recognition
year: 2025
type: conference
role: first-author
awards: []
selected: true
summary: >-
  Predicts calibrated keypoint-presence probabilities instead of uncalibrated heatmaps, improving
  pose estimation both in and out of the visible image.
abstract: >-
  Current Human Pose Estimation methods have achieved significant improvements. However,
  state-of-the-art models ignore out-of-image keypoints and use uncalibrated heatmaps as keypoint
  location representation. To address these limitations, we propose ProbPose, which predicts for
  each keypoint: a calibrated probability of keypoint presence at each location in the activation
  window, the probability of being outside of it, and its predicted visibility. To address the
  lack of evaluation protocols for out-of-image keypoints, we introduce the CropCOCO dataset and
  the Extended OKS (Ex-OKS) metric, which extends OKS to out-of-image points. Tested on COCO,
  CropCOCO, and OCHuman, ProbPose shows significant gains in out-of-image keypoint localization
  while also improving in-image localization through data augmentation. Additionally, the model
  improves robustness along the edges of the bounding box and offers better flexibility in
  keypoint evaluation. The code and data for research purposes are available on the project
  website.
notes:
  - 'The two-page CV records 50+ GitHub stars and 350+ downloads of exococotools, the evaluation package implementing Extended OKS. These are historical figures, not live counters.'
links:
  code: https://github.com/MiraPurkrabek/ProbPose_code
  project: https://mirapurkrabek.github.io/ProbPose/
thumbnail:
  src: '../../assets/img/ProbPose_McLaughlin.png'
  alt: 'Pose estimation overlaid on an athlete whose limbs extend outside the cropped image, with keypoints correctly predicted as out-of-frame.'
---
