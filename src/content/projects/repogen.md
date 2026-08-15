---
title: RePoGen
tagline: Synthetic humans for pose estimation in rare camera views
kind: research
years: '2024'
role: First author
org: 'CTU Prague · VRG'
featured: false
order: 4
summary: >-
  An SMPL-based synthetic-human generator that gives full control over pose and viewpoint,
  improving pose estimation on top- and bottom-view cameras.
highlights:
  - 'Adding RePoGen data to COCO improves top- and bottom-view pose estimation without hurting common views'
  - 'Best Poster Award, FG 2024'
  - 'Dataset and code released publicly'
tags:
  - Human Pose Estimation
  - Synthetic Data
  - Robustness
links:
  project: https://mirapurkrabek.github.io/RePoGen-paper/
  paper: https://mirapurkrabek.github.io/RePoGen-paper/
image:
  src: '../../assets/img/Duplantis.gif'
  alt: 'Pose estimation on an athlete captured from an unusual top-down camera angle, with keypoints correctly located despite the rare viewpoint.'
status: completed
---

Human pose estimation methods and datasets focus almost entirely on side- and front-view scenes.
RePoGen (RarE POses GENerator) is an SMPL-based method for generating synthetic humans with
comprehensive control over pose and camera view, built to close that gap. Experiments on top-view
datasets and a new dataset of real images with diverse poses show that adding RePoGen data to
COCO improves top- and bottom-view pose estimation without harming performance on common views.
An ablation shows anatomical plausibility, the property prior work focused on, is not required for
effective performance. The real-image side of the dataset was annotated with PoseAnnotator, a
lightweight tool built for this project and reused since.
