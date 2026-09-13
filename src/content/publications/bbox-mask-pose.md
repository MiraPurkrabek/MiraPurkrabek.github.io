---
title: 'Detection, Pose Estimation and Segmentation for Multiple Bodies: Closing the Virtuous Circle'
authors:
  - Miroslav Purkrabek
  - Jiří Matas
venue: ICCV 2025
venueLong: IEEE/CVF International Conference on Computer Vision
year: 2025
type: conference
role: first-author
awards: []
selected: true
summary: >-
  Conditions detection, segmentation and pose estimation on each other in a self-improving loop,
  matching state of the art on both crowded and standard scenes.
abstract: >-
  Human pose estimation methods work well on separated people but struggle with multi-body
  scenarios. Recent work has addressed this problem by conditioning pose estimation with
  detected bounding boxes or bottom-up-estimated poses. Unfortunately, all of these approaches
  overlooked segmentation masks and their connection to estimated keypoints. We condition pose
  estimation model by segmentation masks instead of bounding boxes to improve instance
  separation. This improves top-down pose estimation in multi-body scenarios but does not fix
  detection errors. Consequently, we develop BBox-Mask-Pose (BMP), integrating detection,
  segmentation and pose estimation into self-improving feedback loop. We adapt detector and pose
  estimation model for conditioning by instance masks and use Segment Anything as pose-to-mask
  model to close the circle. With only small models, BMP is superior to top-down methods on
  OCHuman dataset and to detector-free methods on COCO dataset, combining the best from both
  approaches and matching state of art performance in both settings. Code and data for research
  purposes are available on the project website.
notes:
  - 'The two-page CV records an AP comparison of 41.3 to 49.2 against human-centric foundation models; see the paper for the evaluation setup.'
  - 'The shared BBoxMaskPose / BMPv2 repository had 200+ GitHub stars in the two-page CV. This is a historical snapshot, not a live counter.'
links:
  project: https://mirapurkrabek.github.io/BBox-Mask-Pose/
  code: https://github.com/mirapurkrabek/BBoxMaskPose
  demo: https://huggingface.co/spaces/purkrmir/BBoxMaskPose-demo
thumbnail:
  src: '../../assets/img/004806_BMP_loop-poster.jpg'
  alt: 'Two overlapping soccer players with the front player pose keypoints estimated and connected by a green skeleton despite occlusion by the other player.'
---
