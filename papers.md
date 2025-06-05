---
layout: page
title: Papers
subtitle: Papers that I (co-)authored or (co-)supervised
---


### [Detection, Pose Estimation and Segmentation for Multiple Bodies: Closing the Virtuous Circle](https://mirapurkrabek.github.io/BBox-Mask-Pose/)

**Miroslav Purkrabek, Jiri Matas**

![](/assets/img/004806_BMP_loop.gif){: height="180" }


<div style="text-align: justify;">
<strong>Abstract</strong>: Human pose estimation methods work well on separated people but struggle with multi-body scenarios. Recent work has addressed this problem by conditioning pose estimation with detected bounding boxes or bottom-up-estimated poses. Unfortunately, all of these approaches overlooked segmentation masks and their connection to estimated keypoints. We condition pose estimation model by segmentation masks instead of bounding boxes to improve instance separation. This improves top-down pose estimation in multi-body scenarios but does not fix detection errors. Consequently, we develop BBox-Mask-Pose (BMP), integrating detection, segmentation and pose estimation into self-improving feedback loop. We adapt detector and pose estimation model for conditioning by instance masks and use Segment Anything as pose-to-mask model to close the circle. With only small models, BMP is superior to top-down methods on OCHuman dataset and to detector-free methods on COCO dataset, combining the best from both approaches and matching state of art performance in both settings. Code and data for research purposes are available on the <a href="https://mirapurkrabek.github.io/BBox-Mask-Pose/">project website</a>.
</div>


----------
### [ProbPose: A Probabilistic Approach to 2D Human Pose Estimation](https://mirapurkrabek.github.io/ProbPose/)

**Miroslav Purkrabek, Jiri Matas**

The IEEE/CVF Computer Vision and Pattern Recognition Conference (CVPR) 2025

![](/assets/img/ProbPose_McLaughlin.png){: height="180" }


<div style="text-align: justify;">
<strong>Abstract</strong>: Current Human Pose Estimation methods have achieved significant improvements. However, state-of-the-art models ignore out-of-image keypoints and use uncalibrated heatmaps as keypoint location representation. To address these limitations, we propose ProbPose, which predicts for each keypoint: a calibrated probability of keypoint presence at each location in the activation window, the probability of being outside of it, and its predicted visibility. To address the lack of evaluation protocols for out-of-image keypoints, we introduce the CropCOCO dataset and the Extended OKS (Ex-OKS) metric, which extends OKS to out-of-image points. Tested on COCO, CropCOCO, and OCHuman, ProbPose shows significant gains in out-of-image keypoint localization while also improving in-image localization through data augmentation. Additionally, the model improves robustness along the edges of the bounding box and offers better flexibility in keypoint evaluation. The code and data for research purposes are available on the <a href="https://mirapurkrabek.github.io/ProbPose/">project website</a>.
</div>


----------
### BLANKET: Anonymizing Faces in Infant Video Recordings

**Ditmar Hadera, Jan Cech, Miroslav Purkrabek and Matej Hoffmann**

The IEEE International Conference on Development and Learning (ICDL) 2025

![](/assets/img/BLANKET_example.png){: height="180" }


<div style="text-align: justify;">
<strong>Abstract</strong>: Ensuring the ethical use of video data involving human subjects, particularly infants, requires robust anonymization methods. We propose BLANKET (Baby-face Landmark-preserving ANonymization with Keypoint dEtection consisTency), a novel approach designed to anonymize infant faces in video recordings while preserving essential facial attributes.  Our method comprises two stages. First, a new random face, compatible with the original identity, is generated via inpainting using a diffusion model. Second, the new identity is seamlessly incorporated into each video frame through temporally consistent face swapping with authentic expression transfer. The method is evaluated on a dataset of short video recordings of babies and is compared to the popular anonymization method, DeepPrivacy2. Key metrics assessed include the level of de-identification, preservation of facial attributes, impact on human pose estimation (as an example of a downstream task), and presence of artifacts. Both methods alter the identity, and our method outperforms DeepPrivacy2 in all other respects.
</div>


----------
### [Human Pose-Constrained UV Map Estimation](https://arxiv.org/abs/2501.08815)

**Matej Suchanek, Miroslav Purkrabek, Jiri Matas**

The 26th Computer Vision Winter Workshop (CVWW) 2025

![](/assets/img/PC-CSE_example.png){: height="180" }


<div style="text-align: justify;">
<strong>Abstract</strong>: UV map estimation is used in computer vision for detailed analysis of human posture or activity. Previous methods assign pixels to body model vertices by comparing pixel descriptors independently, without enforcing global coherence or plausibility in the UV map. We propose Pose-Constrained Continuous Surface Embeddings (PC-CSE), which integrates estimated 2D human pose into the pixel-to-vertex assignment process. The pose provides global anatomical constraints, ensuring that UV maps remain coherent while preserving local precision. Evaluation on DensePose COCO demonstrates consistent improvement, regardless of the chosen 2D human pose model. Whole-body poses offer better constraints by incorporating additional details about the hands and feet. Conditioning UV maps with human pose reduces invalid mappings and enhances anatomical plausibility. In addition, we highlight inconsistencies in the ground-truth annotations.
</div>


----------
### [Improving 2D Human Pose Estimation in Rare Camera Views with Synthetic Data](https://mirapurkrabek.github.io/RePoGen-paper/)

**Miroslav Purkrabek, Jiri Matas**

The 18th IEEE International Conference on Automatic Face and Gesture Recognition\
*Winner of the [Best Poster Award](https://fg2024.ieee-biometrics.org/awards/)*

![](/assets/img/RePoGen_image.png){: height="180" }


<div style="text-align: justify;">
<strong>Abstract</strong>: Methods and datasets for human pose estimation focus predominantly on side- and front-view scenarios. We overcome the limitation by leveraging synthetic data and introduce RePoGen (RarE POses GENerator), an SMPL-based method for generating synthetic humans with comprehensive control over pose and view. Experiments on top-view datasets and a new dataset of real images with diverse poses show that adding the RePoGen data to the COCO dataset outperforms previous approaches to top- and bottom-view pose estimation without harming performance on common views. An ablation study shows that anatomical plausibility, a property prior research focused on, is not a prerequisite for effective performance. The introduced dataset and the corresponding code are available on the <a href="https://mirapurkrabek.github.io/RePoGen-paper/">project website</a>.
</div>


----------
### [Discovery, tracking and redection of floorball players from multiple cameras](https://dspace.cvut.cz/handle/10467/101411)
**Miroslav Purkrabek**

Master thesis

![](/assets/img/master_image.png){: height="180" }

<div style="text-align: justify;">
<strong>Abstract</strong>: This thesis proposes a new system for unsupervised person tracking by detection. The system focuses on tracking players in sports video, specifically floorball, using multiple cameras with different viewing angles. The new hard-negative mining technique leveraging time constraints enables us to train the identification network without labelled data. The proposed method generates tracklets with a low level of ID switches, and it is appropriate for generating labelled data for supervised training. Samples from the newly created dataset, which we used for evaluation, are attached to the thesis along with the code.
</div>


----------
### [Floorball Player Tracking from a Top-View Camera](https://dspace.cvut.cz/handle/10467/87891)
**Miroslav Purkrabek**

Bachelor thesis

![](/assets/img/bachelor_image.png){: height="180" }

<div style="text-align: justify;">
<strong>Abstract</strong>: In this thesis, we propose a new system for online person tracking by detection. The system focuses on tracking persons in top-view sports videos. A modified YOLO network serves as a person detector from top-view videos. A fine-tuned ResNet network works as a similarity metric allowing person reidentification by visual similarity. The proposed method achieves 94% mAP in the detection and 90% MOTA in the tracking on a new dataset from sports videos. The dataset is attached to the thesis along with a GUI application for data processing.
</div>
