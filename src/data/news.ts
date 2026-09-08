export interface NewsItem {
  date: string;
  label: string;
  html: string;
  shortHtml?: string;
}

export const news: NewsItem[] = [
  {
    date: '2026-06',
    label: 'June 2026',
    html: 'I joined Qualcomm XR Labs in Amsterdam for a six-month research internship, working on 3D scene reconstruction and understanding.',
  },
  {
    date: '2026-05',
    label: 'May 2026',
    html: 'We (together with <a href="https://jskvrna.github.io/">Jan Skvrna</a>) won the <a href="https://huggingface.co/spaces/usm3d/S23DR2026">S23DR challenge</a> (and $5k prize) at CVPR 2026. I cannot attend due to my last minute preparation for the Qualcomm internship, but come see Jan presenting the work on <a href="https://usm3d.github.io">the Urban Scene Modeling Workshop</a>!',
    shortHtml:
      'Jan Skvrna and I won the <a href="/work/#s23dr">S23DR challenge at CVPR</a>. Jan presented our work while I was getting ready for Amsterdam.',
  },
  {
    date: '2026-04',
    label: 'April 2026',
    html: "I'll be moving to Amsterdam for a 6-months internship in Qualcomm.",
    shortHtml: 'Getting ready to move to Amsterdam for six months at Qualcomm.',
  },
  {
    date: '2026-02',
    label: 'February 2026',
    html: '<a href="https://arxiv.org/abs/2601.08982">SAM-pose2seg paper</a> , a paper I co-supervised, was awarded the best paper award at CVWW 2026.',
    shortHtml:
      '<a href="https://arxiv.org/abs/2601.08982">SAM-pose2seg</a>, a paper I co-supervised, received the Best Student Paper Award at CVWW 2026.',
  },
  {
    date: '2026-01',
    label: 'January 2026',
    html: '<a href="https://arxiv.org/abs/2601.08982">SAM-pose2seg paper</a> was accepted to CVWW 2026. It is part of our larger body of work connected to <a href="https://mirapurkrabek.github.io/BBox-Mask-Pose/">BBox-Mask-Pose</a>.',
  },
  {
    date: '2025-12',
    label: 'December 2025',
    html: 'I started my research visit at the <a href="https://uni-tuebingen.de/en/">University of Tübingen</a> in the <a href="https://virtualhumans.mpi-inf.mpg.de/">Real Virtual Humans</a> group led by prof. Gerard Pons-Moll.',
  },
  {
    date: '2025-11',
    label: 'November 2025',
    html: 'Our <a href="https://mirapurkrabek.github.io/projects/">FACIS project</a> was selected as the best by the Ministry of the Interior for its excellent research results.',
  },
  {
    date: '2025-10',
    label: 'October 2025',
    html: "I'll be serving as technical organizer for <a href='https://cmp.felk.cvut.cz/cvww2026/index.html'>CVWW 2026</a>.",
  },
  {
    date: '2025-10',
    label: 'October 2025',
    html: "I presented <a href='https://mirapurkrabek.github.io/BBox-Mask-Pose'>BBox-Mask-Pose</a> at ICCV at Hawaii! Hope that I will return soon, wonderful place.",
  },
  {
    date: '2025-08',
    label: 'August 2025',
    html: "The <a href='https://mirapurkrabek.github.io/BBox-Mask-Pose/'>BBox-Mask-Pose paper</a> has a brand <a href='https://github.com/mirapurkrabek/BBoxMaskPose'>new code</a> and <a href='https://huggingface.co/spaces/purkrmir/BBoxMaskPose-demo'>HuggingFace Image Demo</a>. If you like the project, don't forget to give it a star on GitHub!",
  },
  {
    date: '2025-06',
    label: 'June 2025',
    html: "Our <a href='https://mirapurkrabek.github.io/BBox-Mask-Pose/'>BBox-Mask-Pose</a> got accepted to ICCV 2025. Contact me if you want to meet in Honolulu!",
  },
  {
    date: '2025-06',
    label: 'June 2025',
    html: 'Our paper ( <a href="https://github.com/ctu-vras/blanket-infant-face-anonym">BLANKET</a> ) on infant face anonymization was accepted to <a href="https://ieeexplore.ieee.org/xpl/conhome/1001919/all-proceedings">ICDL 2025</a> . More details soon.',
  },
  {
    date: '2025-05',
    label: 'May 2025',
    html: 'I was recognized as an <a href="https://cvpr.thecvf.com/Conferences/2025/ProgramCommittee#all-outstanding-reviewer">outstanding reviewer</a> (top ~5%) for CVPR 2025.',
  },
  {
    date: '2025-04',
    label: 'April 2025',
    html: 'I was accepted to the <a href="https://icvss.dmi.unict.it/icvss2025/">ICVSS</a> summer school. The admission rate was around 14%.',
  },
  {
    date: '2025-03',
    label: 'March 2025',
    html: 'My team finished the season in top 8 teams in Czech, reaching the best result in club history.',
  },
  {
    date: '2025-02',
    label: 'February 2025',
    html: "Our <a href='https://mirapurkrabek.github.io/ProbPose'>ProbPose paper</a> got accepted to CVPR 2025. Contact me if you want to meet in Nashville!",
  },
  {
    date: '2025-02',
    label: 'February 2025',
    html: 'I passed the state doctoral exam with distinction. Looking forward to the CVPR results next week.',
  },
  {
    date: '2025-01',
    label: 'January 2025',
    html: "I presented <a href='https://mirapurkrabek.github.io/ProbPose'>ProbPose</a> at <a href='https://www.tugraz.at/events/cvww2025/home'>CVWW 2025</a>. Thanks to all the participants and organizers for the opportunity!",
  },
  {
    date: '2025-01',
    label: 'January 2025',
    html: "<a href='https://arxiv.org/abs/2501.08815'>PC-CSE paper</a> was accepted to CVWW 2025.",
  },
  {
    date: '2024-12',
    label: 'December 2024',
    html: "A new paper (PC-CSE) I co-supervised is available. Check it out <a href='https://arxiv.org/abs/2501.08815'>on ArXiv</a>.",
  },
  {
    date: '2024-11',
    label: 'November 2024',
    html: "We release two new papers, <a href='https://mirapurkrabek.github.io/BBox-Mask-Pose/'>BBox-Mask-Pose</a> and <a href='https://mirapurkrabek.github.io/ProbPose'>ProbPose</a>.",
  },
  {
    date: '2024-10',
    label: 'October 2024',
    html: "I co-organized and presented our work at a <a href='https://www.dny.ai/event-2024/ai-4-sport'>AI4Sports</a> conference in Prague. Thanks to all the participants and <a href='https://prg.ai/en/'>prg.ai</a> for a great event! Recording will be available upon request.",
  },
  {
    date: '2024-09',
    label: 'September 2024',
    html: 'I attended ECCV 2024 in Milano.',
  },
  {
    date: '2024-06',
    label: 'June 2024',
    html: "Our RePoGen paper was awarded with a <a href='https://fel.cvut.cz/en/what-s-on/news/35516-miroslav-purkrabek-and-jiri-matas-from-fee-ctu-won-the-award-for-the-best-poster-at-the-conference-in-turkey'>best poster award</a> .",
  },
  {
    date: '2024-05',
    label: 'May 2024',
    html: "I presented our <a href='https://mirapurkrabek.github.io/RePoGen-paper/'>RePoGen paper</a> at Face and Gesture conference in Istanbul.",
  },
  {
    date: '2024-04',
    label: 'April 2024',
    html: "I became a head coach of our floorball team. <a href='https://www.skvflorbal.cz/c/realizacni-tym-pro-sezonu-20242025-povede-miroslav-purkrabek-2378#:~:text=2024-,Realiza%C4%8Dn%C3%AD%20t%C3%BDm%20pro%20sezonu%202024%2F2025%20povede%20Miroslav%20Purkr%C3%A1bek,koordin%C3%A1tora%20a%20poradce%20A%20t%C3%BDmu.'>(short website in Czech)</a>",
  },
  {
    date: '2024-04',
    label: 'April 2024',
    html: "We (SKV) lost in the Round of 16 of Livesport Superleague and are out of the competition for this season. We scored the most points in the regular part in the club's history.",
  },
  {
    date: '2024-03',
    label: 'March 2024',
    html: "Our <a href='https://mirapurkrabek.github.io/RePoGen-paper/'>RePoGen paper</a> was accepted to Face and Gesture 2024. See you in Istanbul!",
  },
  {
    date: '2023-02',
    label: 'February 2023',
    html: "I have started my PhD studies at the <a href='https://vrg.fel.cvut.cz/'>VRG</a> at FEE, Czech Technical University in Prague.",
  },
  {
    date: '2022-06',
    label: 'June 2022',
    html: 'I have successfully defended my Master\'s thesis on <a href="https://dspace.cvut.cz/handle/10467/101411?locale-attribute=en">"Player Identification and Tracking in Sports Videos"</a> .',
  },
];
