export type Paper = {
  id: string
  title: string
  authors: string
  venue: string
  year: number
  doi?: string
  link?: string
  images?: string[]
  description?: string
}

export type ResearchArea = {
  id: string
  title: string
  subtitle: string
  description: string
  papers: Paper[]
}

export const researchAreas: ResearchArea[] = [
  {
    id: "sensing-observations",
    title: "Sensing & Observations",
    subtitle: "Autonomous vehicles, IoT sensors, and networking for environmental monitoring",
    description:
      "Our research in sensing and observations focuses on autonomous vehicles (UAVs, UGVs, USVs), IoT sensor networks, and advanced networking architectures. We develop swarm intelligence algorithms, formation control strategies, and distributed sensing systems for disaster management, environmental monitoring, and real-time data acquisition.",
    papers: [
      {
        id: "paper-1",
        title: "Deep-Reinforcement-Learning-Based Offloading Scheduling for Vehicular Edge Computing",
        authors: "W. Zhan et al.",
        venue: "IEEE Internet of Things Journal",
        year: 2020,
        doi: "10.1109/JIOT.2020.2978830",
      },
      {
        id: "paper-2",
        title: "Distributed UAV Swarm Formation and Collision Avoidance Strategies over Fixed and Switching Topologies",
        authors: "J. Wu, C. Luo, Y. Luo, K. Li",
        venue: "IEEE Transactions on Cybernetics",
        year: 2021,
      },
      {
        id: "paper-3",
        title: "Lightweight 3-D Beamforming Design in 5G UAV Broadcasting Communications",
        authors: "W. Miao, C. Luo, G. Min, Z. Zhao",
        venue: "IEEE Transactions on Broadcasting",
        year: 2020,
      },
      {
        id: "paper-4",
        title: "Ubiquitous and Robust UxV Networks: Overviews, Solutions, Challenges, and Opportunities",
        authors: "Z. Li, G. Min, P. Ren, C. Luo, L. Zhao, C. Luo",
        venue: "IEEE Network",
        year: 2024,
      },
      {
        id: "paper-5",
        title: "Federated Learning for Distributed IIoT Intrusion Detection using Transfer Approaches",
        authors: "J. Zhang, C. Luo, M. Carpenter, G. Min",
        venue: "IEEE Transactions on Industrial Informatics",
        year: 2022,
      },
      {
        id: "paper-6",
        title: "Smart Boulders for Real-time Detection of Hazardous Movement on Landslides",
        authors: "K. Newby, G. Bennett, K. Roskilly, A. Sgarabotto, C. Luo, I. Manzella",
        venue: "EGU General Assembly",
        year: 2024,
      },
    ],
  },
  {
    id: "processing-analysis",
    title: "Processing & Analysis",
    subtitle: "Machine learning models and benchmark datasets for Earth observation",
    description:
      "We develop advanced machine learning models for processing and analyzing remote sensing data. Our work includes deep learning for scene classification, super-resolution techniques, change detection algorithms, and visual anemometry. We also create and maintain benchmark datasets for the research community.",
    papers: [
      {
        id: "paper-7",
        title: "Deep Learning in Remote Sensing Scene Classification: A Data Augmentation Enhanced CNN Framework",
        authors: "X. Yu, X. Wu, C. Luo, P. Ren",
        venue: "GIScience & Remote Sensing",
        year: 2017,
      },
      {
        id: "paper-8",
        title: "See the Wind: Wind Scale Estimation with Optical Flow and VisualWind Dataset",
        authors: "Q. Zhang, J. Xu, M. Crane, C. Luo",
        venue: "Science of The Total Environment",
        year: 2022,
        doi: "10.1016/j.scitotenv.2022.157204",
      },
      {
        id: "paper-9",
        title: "Coastline Detection in Satellite Imagery: A Deep Learning Approach on New Benchmark Data",
        authors: "C. Seale, T. Redfern, P. Chatfield, C. Luo, K. Dempsey",
        venue: "Remote Sensing of Environment",
        year: 2022,
        doi: "10.1016/j.rse.2022.113044",
      },
      {
        id: "paper-10",
        title: "DisasterScope: A Comprehensive Dataset and RTMDet-based Methodology for Object Detection in Disaster-Related Remote Sensing Images",
        authors: "Z. Liu, C. Luo, G. Min, Z. Liu, Z. Li",
        venue: "IGARSS 2024",
        year: 2024,
        doi: "10.1109/IGARSS53475.2024.10641228",
      },
      {
        id: "paper-11",
        title: "A Novel Infrared Video Surveillance System Using Deep Learning Based Techniques",
        authors: "H. Zhang, C. Luo, Q. Wang, M. Kitchin, A. Parmley, J. Monge-Alvarez",
        venue: "Multimedia Tools and Applications",
        year: 2018,
      },
    ],
  },
]

export type CodeDataItem = {
  id: string
  title: string
  description: string
  type: "code" | "dataset"
  link: string
}

export const codeAndData: CodeDataItem[] = [
  {
    id: "code-1",
    title: "SDVN Platform",
    description: "Software defined network (SDN) simulator for vehicular networks",
    type: "code",
    link: "https://github.com/a824899245/SDVN-platform",
  },
  {
    id: "code-2",
    title: "FedTradaBoost",
    description: "Federated learning framework with transfer learning capabilities",
    type: "code",
    link: "https://github.com/LaplaceZhang/FedTradaBoost",
  },
  {
    id: "code-3",
    title: "SentinelClassifier",
    description: "Deep learning based Sentinel-2 landcover classifier",
    type: "code",
    link: "https://github.com/HowardDreemurr/SentinelClassifier",
  },
  {
    id: "code-4",
    title: "Disaster Display",
    description: "Interactive map showing natural disasters globally",
    type: "code",
    link: "https://github.com/lc796/disaster_display_backend",
  },
  {
    id: "data-1",
    title: "SWED Dataset",
    description: "Sentinel-2 Water Edges Dataset for coastline detection",
    type: "dataset",
    link: "https://openmldata.ukho.gov.uk",
  },
  {
    id: "data-2",
    title: "VisualWind Dataset",
    description: "6000 labelled video clips covering eleven wind classes of the Beaufort scale",
    type: "dataset",
    link: "https://sme.uds.exeter.ac.uk/folders/48caf5102d6196b9645fab1f46e494ec",
  },
  {
    id: "data-3",
    title: "DisasterScope Dataset",
    description: "Aerial video dataset of natural disasters for object detection",
    type: "dataset",
    link: "https://2024.ieeeigarss.org/view_paper.php?PaperNum=2265",
  },
]
