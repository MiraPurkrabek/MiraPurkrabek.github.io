---
layout: page
title: Projects & papers
subtitle: What I did and what I'm working on
---

Here, you will find a short list of research and innovative projects that form the core of my PhD studies. If anything catches your eye, feel free to contact me for more information.

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

### [Improving 2D Human Pose Estimation across Unseen Camera Views with Synthetic Data](https://mirapurkrabek.github.io/RePoGen-paper/)
**Miroslav Purkrabek, Jiri Matas**
(preprint)

![](/assets/img/RePoGen_image.png){: height="180" }


**Abstract**: Human Pose Estimation is a thoroughly researched problem; however, most datasets focus on the side and front-view scenarios. We address the limitation by proposing a novel approach that tackles the challenges posed by extreme viewpoints and poses. We introduce a new method for synthetic data generation – RePoGen, RarE POses GENerator – with comprehensive control over pose and view to augment the COCO dataset. Experiments on a new dataset of real images show that adding RePoGen data to the COCO surpasses previous attempts to top-view pose estimation and significantly improves performance on the bottom-view dataset. Through an extensive ablation study on both the top and bottom view data, we elucidate the contributions of methodological choices and demonstrate improved performance. We will release the code and the datasets with the publication.


### [Discovery, tracking and redection of floorball players from multiple cameras](https://dspace.cvut.cz/handle/10467/101411)
**Miroslav Purkrabek**
(master thesis)

![](/assets/img/master_image.png){: height="180" }


**Abstract**: This thesis proposes a new system for unsupervised person tracking by detection. The system focuses on tracking players in sports video, specifically floorball, using multiple cameras with different viewing angles. The new hard-negative mining technique leveraging time constraints enables us to train the identification network without labelled data. The proposed method generates tracklets with a low level of ID switches, and it is appropriate for generating labelled data for supervised training. Samples from the newly created dataset, which we used for evaluation, are attached to the thesis along with the code.


### [Floorball Player Tracking from a Top-View Camera](https://dspace.cvut.cz/handle/10467/87891)
**Miroslav Purkrabek**
(bachelor thesis)

![](/assets/img/bachelor_image.png){: height="180" }

**Abstract**: In this thesis, we propose a new system for online person tracking by detection. The system focuses on tracking persons in top-view sports videos. A modified YOLO network serves as a person detector from top-view videos. A fine-tuned ResNet network works as a similarity metric allowing person reidentification by visual similarity. The proposed method achieves 94\% mAP in the detection and 90\% MOTA in the tracking on a new dataset from sports videos. The dataset is attached to the thesis along with a GUI application for data processing.
