---
title: 'SAM-pose2seg: Pose-Guided Human Instance Segmentation in Crowds'
authors:
  - Constantin Kolomiiets
  - Miroslav Purkrábek
  - Jiří Matas
venue: CVWW 2026
venueLong: 29th Computer Vision Winter Workshop
year: 2026
type: workshop
role: supervised
awards:
  - Best Student Paper Award
selected: false
summary: >-
  Adapts Segment Anything for pose-guided human segmentation, staying accurate under occlusion
  from as few as a single visible keypoint.
abstract: >-
  Segment Anything (SAM) provides an unprecedented foundation for human segmentation, but may
  struggle under occlusion, where keypoints may be partially or fully invisible. We adapt SAM 2.1
  for pose-guided segmentation with minimal encoder modifications, retaining its strong
  generalization. Using a fine-tuning strategy called PoseMaskRefine, we incorporate pose
  keypoints with high visibility into the iterative correction process originally employed by
  SAM, yielding improved robustness and accuracy across multiple datasets. During inference, we
  simplify prompting by selecting only the three keypoints with the highest visibility. This
  strategy reduces sensitivity to common errors, such as missing body parts or misclassified
  clothing, and allows accurate mask prediction from as few as a single keypoint. Our results
  demonstrate that pose-guided fine-tuning of SAM enables effective, occlusion-aware human
  segmentation while preserving the generalization capabilities of the original model. The code
  and pretrained models will be available at the project website.
links:
  project: https://mirapurkrabek.github.io/BBox-Mask-Pose/
  arxiv: https://arxiv.org/abs/2601.08982
thumbnail:
  src: '../../assets/img/SAM-pose2seg_comparison.png'
  alt: 'Side-by-side comparison of segmentation masks on occluded people, showing pose-guided segmentation staying accurate where a baseline mask breaks down.'
---
