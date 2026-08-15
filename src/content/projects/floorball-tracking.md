---
title: Floorball player tracking
tagline: Multi-camera player tracking from BSc and MSc thesis research onward
kind: research
years: '2019–'
role: Lead developer
org: 'CTU Prague'
featured: false
order: 12
summary: >-
  Multi-camera tracking and re-identification of floorball players from video, started as
  bachelor's and master's thesis research and carried on since.
highlights:
  - 'BSc thesis: 94% mAP detection, 90% MOTA tracking on a new top-view sports dataset'
  - 'MSc thesis: unsupervised re-identification via hard-negative mining under time constraints'
tags:
  - Tracking
  - Video Systems
image:
  src: '../../assets/img/master_image.png'
  alt: 'Multiple floorball players tracked simultaneously across overlapping camera views, each with a consistent identity label.'
status: completed
---

Tracking floorball players from multiple cameras, starting with a bachelor's thesis on top-view
person tracking and continuing through a master's thesis on multi-camera identification and
re-identification. The bachelor's thesis system used a modified YOLO detector and a fine-tuned
ResNet similarity metric, reaching 94% mAP detection and 90% MOTA tracking on a new sports-video
dataset. The master's thesis introduced an unsupervised, hard-negative-mining approach to training
an identification network without labelled data, generating low-ID-switch tracklets suitable for
labelling further training data. The applied interest in sports video continues in the Revie
clip-retrieval system.
