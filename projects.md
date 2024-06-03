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


### Modeling infant sensorimotor development

![](/assets/img/Infants_image.png){: height="180" }


The project led by [Matej Hoffman](https://sites.google.com/site/matejhof), focuses on the behavior of infants to gain a deeper understanding of human development. My contribution to this project involves the precise estimation of 2D poses of babies in videos, a crucial aspect that helps in analyzing and interpreting infant movements and interactions. This work is part of a larger effort to model human behaviors, particularly in the early stages of life, providing valuable insights for various applications.

### Advanced Video Analysis for Floorball Player Tracking

This project extends my long-standing interest in sports analysis, a journey that began with my bachelor thesis and evolved through my master's work. As a coach in the highest league of floorball, my focus in this project is on developing sophisticated methods for tracking floorball players in videos. The aim is to harness video analysis to gain insights into player movements and team dynamics, enhancing coaching strategies and game understanding. This work not only aligns with my academic pursuits but also integrates my practical experience and passion for floorball, striving to bring a new level of analytical depth to the sport.


# Papers

### [Improving 2D Human Pose Estimation in Rare Camera Views with Synthetic Data](https://mirapurkrabek.github.io/RePoGen-paper/)

**Miroslav Purkrabek, Jiri Matas**

The 18th IEEE International Conference on Automatic Face and Gesture Recognition\
*Best Poster Award*

![](/assets/img/RePoGen_image.png){: height="180" }


**Abstract**: Methods and datasets for human pose estimation focus predominantly on side- and front-view scenarios. We overcome the limitation by leveraging synthetic data and introduce RePoGen (RarE POses GENerator), an SMPL-based method for generating synthetic humans with comprehensive control over pose and view. Experiments on top-view datasets and a new dataset of real images with diverse poses show that adding the RePoGen data to the COCO dataset outperforms previous approaches to top- and bottom-view pose estimation without harming performance on common views. An ablation study shows that anatomical plausibility, a property prior research focused on, is not a prerequisite for effective performance. The introduced dataset and the corresponding code are available on the [project website](https://mirapurkrabek.github.io/RePoGen-paper/).


### [Discovery, tracking and redection of floorball players from multiple cameras](https://dspace.cvut.cz/handle/10467/101411)
**Miroslav Purkrabek**

Master thesis

![](/assets/img/master_image.png){: height="180" }


**Abstract**: This thesis proposes a new system for unsupervised person tracking by detection. The system focuses on tracking players in sports video, specifically floorball, using multiple cameras with different viewing angles. The new hard-negative mining technique leveraging time constraints enables us to train the identification network without labelled data. The proposed method generates tracklets with a low level of ID switches, and it is appropriate for generating labelled data for supervised training. Samples from the newly created dataset, which we used for evaluation, are attached to the thesis along with the code.


### [Floorball Player Tracking from a Top-View Camera](https://dspace.cvut.cz/handle/10467/87891)
**Miroslav Purkrabek**

Bachelor thesis

![](/assets/img/bachelor_image.png){: height="180" }

**Abstract**: In this thesis, we propose a new system for online person tracking by detection. The system focuses on tracking persons in top-view sports videos. A modified YOLO network serves as a person detector from top-view videos. A fine-tuned ResNet network works as a similarity metric allowing person reidentification by visual similarity. The proposed method achieves 94% mAP in the detection and 90% MOTA in the tracking on a new dataset from sports videos. The dataset is attached to the thesis along with a GUI application for data processing.
