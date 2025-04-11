---
layout: page
title: Projects & papers
subtitle: What I did and what I'm working on
---

This section presents a collection of projects and papers, central to my PhD research, unified by the theme of human pose estimation and analysis. The work spans various applications, from forensic tools for image and video processing in criminal investigations to modeling infant sensorimotor development and tracking athletes in sports. These efforts reflect a blend of technical innovation and practical application, emphasizing the importance of accurately analyzing human poses and movements to derive meaningful insights across diverse fields.

If anything catches your eye, feel free to contact me for more information.


# Projects

### Set of Forensic Analytical Tools for Image and Video Processing for Criminal Police Service

The project, a collaborative effort with VUT (Brno University of Technology), involves creating a suite of advanced forensic tools for the Czech Republic Police, funded by the Ministry of Interior. These tools focus on the automatic processing of images and videos, specifically honing in on human figures to enhance the efficiency and accuracy of criminal investigations. For more information about this innovative project, please feel free to reach out through any of the available contact methods.

[Grant description in Czech](https://starfos.tacr.cz/cs/projekty/VJ02010041)

![](/assets/img/PCR.png){: height="180" }

----------
### Modeling infant sensorimotor development

The project led by [Matej Hoffman](https://sites.google.com/site/matejhof), focuses on the behavior of infants to gain a deeper understanding of human development. My contribution to this project involves the precise estimation of 2D poses of babies in videos, a crucial aspect that helps in analyzing and interpreting infant movements and interactions. This work is part of a larger effort to model human behaviors, particularly in the early stages of life, providing valuable insights for various applications.

![](/assets/img/Infants_image.png){: height="180" }

----------
### Advanced Video Analysis for Floorball Player Tracking

This project extends my long-standing interest in sports analysis, a journey that began with my bachelor thesis and evolved through my master's work. As a coach in the highest league of floorball, my focus in this project is on developing sophisticated methods for tracking floorball players in videos. The aim is to harness video analysis to gain insights into player movements and team dynamics, enhancing coaching strategies and game understanding. This work not only aligns with my academic pursuits but also integrates my practical experience and passion for floorball, striving to bring a new level of analytical depth to the sport.

![](/assets/img/master_image.png){: height="180" }


----------
### Detection, Identification and Monitoring of Animals by Advanced Computer Vision Methods
The project led by Lukas Picek from University of West Bohemia focuses on the identification of wild animals (especially lynxes) in camera trap images.
My contribution to this project involves the estimation of 2D poses of animals, which improves identification accuracy as each animal has a different texture on each side.
The project is part of a larger effort to protect the environment using computer vision and AI.

![](/assets/img/eurasian-lynx.jpg){: height="180" }

----------
### PoseAnnotator tool

A lightweight, local alternative to CVAT and LabelStudio. Originally developed to create the [RePoGen dataset](https://mirapurkrabek.github.io/RePoGen-paper/), we have since used it for multiple datasets. This easy-to-use Python tool features a simple GUI for annotating 2D human poses in images. Ideal for researchers and developers, PoseAnnotator simplifies the data labeling process for human pose estimation projects. Feel free to use it for your research and contribute to its development. Your feedback and contributions are welcome!

The tool is available on [GitHub](https://github.com/MiraPurkrabek/PoseAnnotator/)

![](/assets/img/poseAnnotator_screenshot.png){: height="180" }

# Papers

### [Detection, Pose Estimation and Segmentation for Multiple Bodies: Closing the Virtuous Circle](https://mirapurkrabek.github.io/BBox-Mask-Pose/)

**Miroslav Purkrabek, Jiri Matas**

![](/assets/img/004806_BMP_loop.gif){: height="180" }


**Abstract**: Human pose estimation methods work well on separated people but struggle with multi-body scenarios. Recent work has addressed this problem by conditioning pose estimation with detected bounding boxes or bottom-up-estimated poses. Unfortunately, all of these approaches overlooked segmentation masks and their connection to estimated keypoints. We condition pose estimation model by segmentation masks instead of bounding boxes to improve instance separation. This improves top-down pose estimation in multi-body scenarios but does not fix detection errors. Consequently, we develop BBox-Mask-Pose (BMP), integrating detection, segmentation and pose estimation into self-improving feedback loop. We adapt detector and pose estimation model for conditioning by instance masks and use Segment Anything as pose-to-mask model to close the circle. With only small models, BMP is superior to top-down methods on OCHuman dataset and to detector-free methods on COCO dataset, combining the best from both approaches and matching state of art performance in both settings. Code and data for research purposes are available on the [project website](https://mirapurkrabek.github.io/BBox-Mask-Pose/).


----------
### [ProbPose: A Probabilistic Approach to 2D Human Pose Estimation](https://mirapurkrabek.github.io/ProbPose/)

**Miroslav Purkrabek, Jiri Matas**

The IEEE/CVF Computer Vision and Pattern Recognition Conference (CVPR) 2025

![](/assets/img/ProbPose_McLaughlin.png){: height="180" }


**Abstract**: Current Human Pose Estimation methods have achieved significant improvements. However, state-of-the-art models ignore out-of-image keypoints and use uncalibrated heatmaps as keypoint location representation. To address these limitations, we propose ProbPose, which predicts for each keypoint: a calibrated probability of keypoint presence at each location in the activation window, the probability of being outside of it, and its predicted visibility. To address the lack of evaluation protocols for out-of-image keypoints, we introduce the CropCOCO dataset and the Extended OKS (Ex-OKS) metric, which extends OKS to out-of-image points. Tested on COCO, CropCOCO, and OCHuman, ProbPose shows significant gains in out-of-image keypoint localization while also improving in-image localization through data augmentation. Additionally, the model improves robustness along the edges of the bounding box and offers better flexibility in keypoint evaluation. The code and data for research purposes are available on the [project website](https://mirapurkrabek.github.io/ProbPose/).


----------
### [Human Pose-Constrained UV Map Estimation](https://arxiv.org/abs/2501.08815)

**Matej Suchanek, Miroslav Purkrabek, Jiri Matas**

The 26th Computer Vision Winter Workshop (CVWW) 2025

![](/assets/img/PC-CSE_example.png){: height="180" }


**Abstract**: UV map estimation is used in computer vision for detailed analysis of human posture or activity. Previous methods assign pixels to body model vertices by comparing pixel descriptors independently, without enforcing global coherence or plausibility in the UV map. We propose Pose-Constrained Continuous Surface Embeddings (PC-CSE), which integrates estimated 2D human pose into the pixel-to-vertex assignment process. The pose provides global anatomical constraints, ensuring that UV maps remain coherent while preserving local precision. Evaluation on DensePose COCO demonstrates consistent improvement, regardless of the chosen 2D human pose model. Whole-body poses offer better constraints by incorporating additional details about the hands and feet. Conditioning UV maps with human pose reduces invalid mappings and enhances anatomical plausibility. In addition, we highlight inconsistencies in the ground-truth annotations.


----------
### [Improving 2D Human Pose Estimation in Rare Camera Views with Synthetic Data](https://mirapurkrabek.github.io/RePoGen-paper/)

**Miroslav Purkrabek, Jiri Matas**

The 18th IEEE International Conference on Automatic Face and Gesture Recognition\
*Winner of the [Best Poster Award](https://fg2024.ieee-biometrics.org/awards/)*

![](/assets/img/RePoGen_image.png){: height="180" }


**Abstract**: Methods and datasets for human pose estimation focus predominantly on side- and front-view scenarios. We overcome the limitation by leveraging synthetic data and introduce RePoGen (RarE POses GENerator), an SMPL-based method for generating synthetic humans with comprehensive control over pose and view. Experiments on top-view datasets and a new dataset of real images with diverse poses show that adding the RePoGen data to the COCO dataset outperforms previous approaches to top- and bottom-view pose estimation without harming performance on common views. An ablation study shows that anatomical plausibility, a property prior research focused on, is not a prerequisite for effective performance. The introduced dataset and the corresponding code are available on the [project website](https://mirapurkrabek.github.io/RePoGen-paper/).


----------
### [Discovery, tracking and redection of floorball players from multiple cameras](https://dspace.cvut.cz/handle/10467/101411)
**Miroslav Purkrabek**

Master thesis

![](/assets/img/master_image.png){: height="180" }
**Abstract**: This thesis proposes a new system for unsupervised person tracking by detection. The system focuses on tracking players in sports video, specifically floorball, using multiple cameras with different viewing angles. The new hard-negative mining technique leveraging time constraints enables us to train the identification network without labelled data. The proposed method generates tracklets with a low level of ID switches, and it is appropriate for generating labelled data for supervised training. Samples from the newly created dataset, which we used for evaluation, are attached to the thesis along with the code.


----------
### [Floorball Player Tracking from a Top-View Camera](https://dspace.cvut.cz/handle/10467/87891)
**Miroslav Purkrabek**

Bachelor thesis

![](/assets/img/bachelor_image.png){: height="180" }

**Abstract**: In this thesis, we propose a new system for online person tracking by detection. The system focuses on tracking persons in top-view sports videos. A modified YOLO network serves as a person detector from top-view videos. A fine-tuned ResNet network works as a similarity metric allowing person reidentification by visual similarity. The proposed method achieves 94% mAP in the detection and 90% MOTA in the tracking on a new dataset from sports videos. The dataset is attached to the thesis along with a GUI application for data processing.
