---
title: 'BLANKET: Anonymizing Faces in Infant Video Recordings'
authors:
  - Ditmar Hadera
  - Jan Cech
  - Miroslav Purkrábek
  - Matej Hoffmann
venue: ICDL 2025
venueLong: IEEE International Conference on Development and Learning
year: 2025
type: conference
role: co-author
awards: []
selected: false
summary: >-
  Anonymizes infant faces in video by generating a compatible new identity and face-swapping it in
  with temporally consistent, artifact-free results.
abstract: >-
  Ensuring the ethical use of video data involving human subjects, particularly infants, requires
  robust anonymization methods. We propose BLANKET (Baby-face Landmark-preserving ANonymization
  with Keypoint dEtection consisTency), a novel approach designed to anonymize infant faces in
  video recordings while preserving essential facial attributes. Our method comprises two stages.
  First, a new random face, compatible with the original identity, is generated via inpainting
  using a diffusion model. Second, the new identity is seamlessly incorporated into each video
  frame through temporally consistent face swapping with authentic expression transfer. The
  method is evaluated on a dataset of short video recordings of babies and is compared to the
  popular anonymization method, DeepPrivacy2. Key metrics assessed include the level of
  de-identification, preservation of facial attributes, impact on human pose estimation (as an
  example of a downstream task), and presence of artifacts. Both methods alter the identity, and
  our method outperforms DeepPrivacy2 in all other respects.
links:
  code: https://github.com/ctu-vras/blanket-infant-face-anonym
  arxiv: https://arxiv.org/abs/2512.15542
thumbnail:
  src: '../../assets/img/BLANKET_example.png'
  alt: "An infant's face anonymized with a compatible synthetic replacement, preserving expression and pose while removing the original identity."
---
