---
title: PoseAnnotator
tagline: A lightweight, local alternative to CVAT and LabelStudio
kind: tool
# TODO(verify): built for the RePoGen dataset (FG 2024); exact start year not stated explicitly
# in the source material, approximated from the RePoGen project timeline.
years: '2023–'
role: Lead developer
featured: false
order: 8
summary: >-
  A local, lightweight tool for annotating 2D human pose in images, built for the RePoGen dataset
  and reused across several other datasets since.
highlights:
  - 'Originally built to create the RePoGen dataset, reused for multiple datasets since'
  - 'Open source on GitHub'
tags:
  - Human Pose Estimation
  - Tooling
links:
  code: https://github.com/MiraPurkrabek/PoseAnnotator/
image:
  src: '../../assets/img/poseAnnotator_screenshot.png'
  alt: 'Screenshot of the PoseAnnotator interface showing a person image with human pose keypoints placed and editable by hand.'
status: active
---

A simple GUI tool for annotating 2D human pose in images — a lightweight, local alternative to
CVAT and LabelStudio. Originally built to create the RePoGen dataset, it has since been reused for
several other datasets. Open source, with contributions and feedback welcome.

Our group also uses PoseAnnotator for other structured keypoints, including facial landmarks, and for datasets published at CVPR and ICCV. It is available as an open-source Python package.
