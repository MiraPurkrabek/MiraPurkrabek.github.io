---
title: Improving 2D Human Pose Estimation in Rare Camera Views with Synthetic Data
authors:
  - Miroslav Purkrábek
  - Jiří Matas
venue: FG 2024
venueLong: 18th IEEE International Conference on Automatic Face and Gesture Recognition
year: 2024
type: conference
role: first-author
awards:
  - Best Poster Award
selected: true
summary: >-
  Introduces RePoGen, an SMPL-based synthetic-human generator, to improve pose estimation on rare
  camera viewpoints without hurting common ones.
abstract: >-
  Methods and datasets for human pose estimation focus predominantly on side- and front-view
  scenarios. We overcome the limitation by leveraging synthetic data and introduce RePoGen (RarE
  POses GENerator), an SMPL-based method for generating synthetic humans with comprehensive
  control over pose and view. Experiments on top-view datasets and a new dataset of real images
  with diverse poses show that adding the RePoGen data to the COCO dataset outperforms previous
  approaches to top- and bottom-view pose estimation without harming performance on common views.
  An ablation study shows that anatomical plausibility, a property prior research focused on, is
  not a prerequisite for effective performance. The introduced dataset and the corresponding code
  are available on the project website.
links:
  project: https://mirapurkrabek.github.io/RePoGen-paper/
thumbnail:
  src: '../../assets/img/Duplantis.gif'
  alt: 'Pose estimation on an athlete captured from an unusual top-down camera angle, with keypoints correctly located despite the rare viewpoint.'
---
