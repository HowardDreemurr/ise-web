export type LeadMetric = {
  label: string
  value: string
  note?: string
}

export type LeadSection = {
  title: string
  items: string[]
  open?: boolean
}

export type LeadProfessor = {
  id: string
  name: string
  role: string
  affiliation: string
  image?: string
  focus: string
  metrics: LeadMetric[]
  roleHighlights: string[]
  sections: LeadSection[]
}

export const leadProfessor: LeadProfessor = {
  id: "member-luo",
  name: "Chunbo Luo",
  role: "Lead Professor, ISE Group",
  affiliation: "University of Exeter",
  // image: "/images/members/chunbo-luo.jpg", // Add image when available
  focus:
    "Addressing the climate emergency and ecological crisis (University of Exeter Strategy 2030 Priority) increasingly relies on AI-driven environment intelligence built upon trustworthy environmental observations, yet such data are often scarce due to unstable or disrupted environmental conditions. My research thus aims to build intelligent sensing and networking systems for remote sensing with exceptional coverage and resolution, bridging the gap from data scarcity to sufficiency. This vision is rooted on my long-term research centred on autonomous and networked vehicles that has pushed the frontiers of remote sensing subjects.",
  metrics: [
    {
      label: "Citations",
      value: "3562",
      note: "Times cited by patents: 16",
    },
    {
      label: "h-index",
      value: "27",
      note: "i10-index: 53",
    },
    {
      label: "Highly Cited Papers",
      value: "3",
      note: "Highest-cited paper: 340",
    },
  ],
  roleHighlights: [
    "Deputy Director of Research and Impact, Computer Science (2024 - date)",
    "Theme Lead, Centre of Environmental Intelligence (2025 - date)",
    "Theme Lead, Institute of Data Science and Artificial Intelligence (2021 - 2025)",
  ],
  sections: [
    {
      title: "Externally Funded Projects (since 2015)",
      items: [
        "15 PI projects (£2.1M); 10 Co-I projects (£10.661M); in total £12.76M.",
        "PI: NEOM: Vegetation Change Detection Tool, NEOM Community, £39,151.33, 1 Sep 2025 - 28 Feb 2026",
        "PI: Wildfire risk minimization using geospatial foundation models, EPSRC IAA Impact Visionary Award, £29,894, 01/06/2025 - 31/05/2026",
        "PI: INSTANT: Intelligent and Sustainable IoT networks for Accurate and Real-Time Large Scale Landslide Monitoring and Prediction, Horizon Europe, €1,187,370.00, 01/01/2026 - 31/12/2029",
        "PI: Automated AI Generated 3-D Tree-Scapes for Woodland Creation and Agroforestry Project Concept Designs, UKRI Innovate UK with SpaceClipper Ltd., £49,714, 01/10/2024 - 31/03/2025",
        "PI: Machine Learning for Geospatial Intelligence, EPSRC Industrial CASE with Ordnance Survey, Project No. 2866087, £125,115, 09/2023-10/2027",
        "PI: Integrating UAVs and Social Sensing for Timely Flooding Warning in Coastal Areas, Royal Society, £11,440, 02/2023 - 01/2025",
        "PI: Automated insurance rebuilds cost estimate for residential and commercial properties, UKRI KTN, with RCA, £166,793. Ref: 10031767, 05/2023 - 06/2025",
        "PI: Optimising Energy Demand in Rural Communities via Precision Agriculture Technology, Innovate UK with with LENKÉ: Space & Water Solutions Ltd., £44,537.3, 05/2023 - 03/2024",
        "PI: Multi-stage Cyber Attack detection using Machine Learning Approaches, EPSRC Industrial CASE and British Telecommunications, Project No. 19000043, £130,900, 10/2019-09/2024",
        "PI: DeepWater: Remote sensing and DEEP learning for early warning of WATER quality hazards, Plymouth Marine Laboratory and ESA (Dragon 4), £60,869.57, 09/2018-07/2022",
        "PI: Research on Key Communication Technologies for UAVs to Transmit High-Definition Video, Knowledge Transfer, Contract No: H02016050002CG, £54,794, 01/08/2017 - 31/07/2018.",
        "PI: Thales-Challenge Low-pixel Automatic Target Detection and Recognition (ATD/ATR), Scottish Funding Council with CENSIS and Thales, £139K, 2015-2016.",
        "PI: Development of Intelligent Charging Strategies for Electric Vehicles, £40K, Porsche AG, 2016-2019.",
        "PI: Research on Multiple UAV Cooperation for Marine Oil Spill Detection, Royal Society & China NSFC, £20K, 2016",
        "PI: A Pilot Study on a Fully Deployable Cooperative Unmanned Aerial Vehicles System for Flooding Prediction, Monitoring and Response Services, EPSRC Digital Economy: Sustainable Society Network+, £50K, 2015",
        "CoI: REFINE: Real-time Fine-grained Air Quality Monitoring with Intelligent and Robust Multi-UAV Networks, Horizon Europe, €897,000, 12/2024 - 11/2028",
        "CoI: A rapid assessment tool for Woodland Creation investment to the competition Feasibility studies for Artificial Intelligence solutions, UKRI Innovate UK with Spaceclipper Ltd, £45,449, 01/09/2023 - 29/02/2024",
        "CoI: Intelligent Satellite Remote Sensing for Real-Time Accurate Geological Hazard Analysis, Royal Society, £11,990, 02/2023 - 01/2025",
        "CoI: INITIATE: Intelligent and Sustainable Aerial-Terrestrial IoT Networks, EU H2020 RISE, 101008297, €952,200, 01/2022-12/2025",
        "CoI: SENSUM: smart SENSing of landscapes Undergoing hazardous hydrogeologic Movement, NERC, NE/V003402/1, £1.2M, 09/2020-09/2023",
        "CoI: BigFoot: BIG data methods for improving windstorm FOOTprint prediction, NERC, NE/P017436/1, £1,530,230, 04/2017-04/2022.",
        "CoI: High-Performance Distributed Algorithms and Key Technologies for Processing SDN Big Data, Huawei Technologies, Contract No: YBN2016080110, £223,200, 08/2017 - 10/2021.",
        "CoI: Building Digital Identities: A Scoping Study, ESRC IAA Social Policy Network, £3,000, 2017.",
        "CoI: Flood Detection and Monitoring using Hyperspectral Remote Sensing from Unmanned Aerial Vehicles, £19,950, Royal Society of Edinburgh, 02/2016-01/2018.",
        "CoI: SELFNET Framework for Self-organized Network Management in Virtualized and Software Defined Networks, EU HORIZON 2020, €6.8M in total, 01/2015-12/2017.",
      ],
    },
    {
      title: "Proposals under Review",
      items: [
        "Cooperative unmanned surface and aerial vehicles for Safe, rEliable and timEly Carbon surveillance in marine farms (SEECarbon), HORIZON Europe, £164,900.75, PI.",
        "I-THERA: Intelligent Home-Based Therapy Intervention Technology Tool for Treating Young Children with Speech Sound Disorders, HORIZON Europe, £192,384.00, CoI.",
        "Explainable machine learning and big InSAR data for accurate and fine-grained prediction of landslides over large areas, Royal Society, £11,880.00, PI.",
      ],
    },
    {
      title: "Proposals in Preparation",
      items: [
        "Horizon Europe MSCA Doctoral Networks: Multimodal Machine Learning for Detecting and Forecasting Biodiversity-Impacting Marine Disasters. PI, to be submitted in November 2026.",
        "NETC PtF: A Dense Network Approach to Detect, Visualise and Predict Landslides. PI, with a plan to submit in July 2026.",
        "NERC AI for Environmental Sciences, Artificial Intelligence To Understand The Risks And Consequences Of Climate Tipping In Marine Ecosystems. Led by Jozef Skakala, PML, CoI, to be submitted in December 2025.",
        "NERC AI for Environmental Sciences, Fire Intelligence for community REsilience, Socio-environmental Cascades, And Policy Evaluation. Led by Jawad Fayaz, CoI, to be submitted in December 2025.",
      ],
    },
    {
      title: "Publications",
      open: true,
      items: [
        "Citation metrics for peer reviewed articles (updated on 16/11/2025):",
        "Citations: 3562 (Times cited by patents: 16) h-index: 27 i10-index: 53",
        "Highest-cited paper = 340 (Yu et al., 2017); 3 Web of Science Highly Cited Papers.",
      ],
    },
    {
      title: "Chapters in Books",
      items: [
        "Huang H, Miao W, Min G, Luo C, Mobile edge computing for the 5G Internet of Things, 5G-Enabled Internet of Things, Taylor & Francis Group, 2019.",
        "Luo, C., Miao, W., Ullah, H., McClean, S., Parr, G., Min, G. (2019). Unmanned Aerial Vehicles for Disaster Management. In: Durrani, T., Wang, W., Forbes, S. (eds) Geological Disaster Monitoring Based on Sensor Networks. Springer Natural Hazards. Springer, Singapore. (Cited 120 times)",
        "Wang Q, Nightingale J, Alcaraz-Calero J, Luo C (2016), H.265 Video Streaming in Mobile Cloud Networks, Web-Based Services: Concepts, Methodologies, Tools, and Applications. Ed. Information Resources Management Association. Hershey: IGI Global. 906-44.",
        "Abbes A, Ramzan N, Grecos C, Wang Q, Luo C (2015), A Reconfigurable Supporting Connected Health Environment for People with Chronic Diseases. Healthcare Informatics and Analytics: Emerging Issues and Trends. Hershey: IGI Global, 2015. 332-52.",
        "Q Wang, J Nightingale, R Wang, N Ramzan, C Grecos, X Wang, A. Amira, Luo C (2013). Mobile Video Cloud Networks, in J. Rodrigues, K. Lin and J. Lloret (Eds.), Mobile Networks and Cloud Computing Convergence for Progressive Services and Applications (ISBN13: 9781466647817), IGI Global, USA, 2013. DOI: 10.4018/978-1-4666-4781-7.",
      ],
    },
    {
      title: "Journal Papers",
      items: [
        "Li, Z., Luo, C., Parr, G., & Min, G. (2025). Optimization for Control and Data Traffic in Aerial-Terrestrial AxV Networks: A Multi-objective Policy-Based Learning Approach. IEEE Internet of Things Journal, 12(16), 33026-33040. (5-year Impact Factor: 9.6; Q1, 45/947)",
        "Palmer S, Kirkwood C, Luo C, Morlighem M. (2025) A quantile regression forest estimate of Greenland's subglacial topography. Journal of Glaciology. 2025;71:e115, 1-25.",
        "Galloway, E. G., Catto, J. L., Luo, C., & Siegert, S. (2025). Tropical cyclone impact data in the Philippines: implications for disaster risk research. Natural Hazards, 1-22.",
        "Xu, Y., Wang, H., Zhou, F., Luo, C., Sun, X., Rahardja, S., & Ren, P. (2025). MambaHSISR: Mamba hyperspectral image super-resolution. IEEE Transactions on Geoscience and Remote Sensing, 63, 1-16. (Cited 27 times, Web of Science Highly Cited Papers)",
        "Wu, Y., Fang, X., Min, G., Chen, H., & Luo, C. (2025). Intelligent Offloading Balance for Vehicular Edge Computing and Networks. IEEE Transactions on Intelligent Transportation Systems, 5792 - 5803.",
        "Luo, C., Guo, J., Liu, Z., Liu, L., Luo, C., Real-Time Path-Reconfigurable Coverage Planning for Multi-UAV Missions over Disjoint Areas. IEEE Robotics and Automation Letters (RA-L), number 25-2624 (Accepted).",
        "S. Chen, F. Wang, P. Ren, C. Luo and Z. Fu (2025) \"OSDMamba: Enhancing Oil Spill Detection From Remote Sensing Images Using Selective State-Space Model,\" in IEEE Geoscience and Remote Sensing Letters, 22, 1-5.",
        "Zhou, C., Ye, M., Xia, Z., Wang, W., Luo, C., & Muller, J. P. (2025). An interpretable attention-based deep learning method for landslide prediction based on multi-temporal InSAR time series: A case study of Xinpu landslide in the TGRA. Remote Sensing of Environment, 318, 114580. (Cited 23 times, Web of Science Highly Cited Papers)",
        "Zhang, J., Luo, C., Jiang, Y., & Min, G. (2025). Security in 6G-based autonomous vehicular networks: Detecting network anomalies with decentralized federated learning. IEEE Vehicular Technology Magazine. 83 - 93. (Cited 8 times; 5-year Impact Factor: 11.3; Q1, 7/133)",
        "Zhou, Y., Cheng, X., Zhang, Q., Wang, L., Ding, W., Xue, X., Luo, C. and Pu, J. (2024). Algpt: Multi-agent cooperative framework for open-vocabulary multi-modal auto-annotating in autonomous driving. IEEE Transactions on Intelligent Vehicles, 3644 - 3658.",
        "Wu, J., Luo, C., Min, G., & McClean, S. (2024). Formation control algorithms for multi-UAV systems with unstable topologies and hybrid delays. IEEE Transactions on Vehicular Technology, 73(9), 12358-12369. (Cited 23 times; 5-year Impact Factor: 7.4; Q1, 5/157)",
        "Zheng, L., Mueller, M., Luo, C., & Yan, X. (2024). Predicting whole-life carbon emissions for buildings using different machine learning algorithms: A case study on typical residential properties in Cornwall, UK. Applied Energy, 357, 122472. (Cited 35 times; 5-year Impact Factor: 11.2; Q1, 5/406)",
        "Li, Z., Zhao, L., Min, G., Al-Dubai, A. Y., Hawbani, A., Zomaya, A. Y., & Luo, C. (2023). Reliable and scalable routing under hybrid SDVN architecture: A graph learning based method. IEEE Transactions on Intelligent Transportation Systems, 24(12), 14022-14036.",
        "Zheng, L., Mueller, M., Luo, C., Menneer, T., & Yan, X. (2023). Variations in whole-life carbon emissions of similar buildings in proximity: An analysis of 145 residential properties in Cornwall, UK. Energy and Buildings, 296, 113387.",
        "J. Zhang, C. Luo, M. Carpenter and G. Min (2023) \"Federated Learning for Distributed IIoT Intrusion Detection Using Transfer Approaches,\" in IEEE Transactions on Industrial Informatics, vol. 19, no. 7, pp. 8159-8169. (Cited 73 times; 5-year Impact Factor: 10.7; Q1, 16/947)",
        "Wu J, Luo C, Luo Y and Li K. (2022) \"Distributed UAV Swarm Formation and Collision Avoidance Strategies Over Fixed and Switching Topologies,\" in IEEE Transactions on Cybernetics, vol. 52, no. 10, pp. 10969-10979, Oct. 2022. (Cited 124 times; 5-year Impact Factor: 11.6; Q1, 11/947)",
        "Zhang Q, Xu J, Crane M, Luo C. (2022) See the wind: Wind scale estimation with optical flow and VisualWind dataset, Science of The Total Environment, volume 846, DOI:10.1016/j.scitotenv.2022.157204.",
        "Seale C, Redfern T, Chatfield P, Luo C, Dempsey K. (2022) Coastline detection in satellite imagery: A deep learning approach on new benchmark data, Remote Sensing of Environment, volume 278, article no. 113044, DOI:10.1016/j.rse.2022.113044.",
        "Y. Wu, X. Fang, C. Luo and G. Min (2022), \"Intelligent Content Precaching Scheme for Platoon-Based Edge Vehicular Networks,\" in IEEE Internet of Things Journal, vol. 9, no. 20, pp. 20503-20518, 15 Oct.15.",
        "Chen Z, Hu J, Min G, Luo C, El-Ghazawi T. (2022) \"Adaptive and Efficient Resource Allocation in Cloud Datacentres Using Actor-Critic Deep Reinforcement Learning,\" in IEEE Transactions on Parallel and Distributed Systems, vol. 33, no. 8, pp. 1911-1923, 1 Aug. 2022, doi: 10.1109/TPDS.2021.3132422. (Cited 121 times, 5-year Impact Factor: 5.6; Q1, 8/224)",
        "Miao W, Luo C, Min G, Mi Y and Yu Z. (2021) \"Location-Based Robust Beamforming Design for Cellular-Enabled UAV Communications,\" in IEEE Internet of Things Journal, vol. 8, no. 12, pp. 9934-9944, 15 June, 2021, doi: 10.1109/JIOT.2020.3028853. (Cited 34 times, 5-year Impact Factor: 9.6; Q1, 45/947)",
        "Miao W, Luo C, Min G, Mi Y and Wang H. (2021) \"Unlocking the Potential of 5G and Beyond Networks to Support Massive Access of Ground and Air Devices,\" in IEEE Transactions on Network Science and Engineering, vol. 8, no. 4, pp. 2825-2836, 1 Oct.-Dec. 2021, doi: 10.1109/TNSE.2021.3051294. (Cited 16 times, 5-year Impact Factor: 6.9; Q1, 69/947)",
        "Zhan W, Luo C, Min G et al. (2021) Deep Reinforcement Learning-Based Offloading Scheduling for Vehicular Edge Computing, IEEE Internet of Things Journal, 2021, DOI 10.1109/JIOT.2020.2978830 (Cited 340 times, Web of Science Highly Cited Papers, 5-year Impact Factor: 9.6; Q1, 45/947)",
        "Wang, Y., Xie, Y., Gan, J., Chang, L., Luo, C. and Zhou J. (2021) A Weight Importance Analysis Technique for Area- and Power-Efficient Binary Weight Neural Network Processor Design. Cognitive Computing. https://doi.org/10.1007/s12559-020-09794-6",
        "Miao W, Luo C, Min G. (2020) \"Lightweight 3D Beamforming Design in 5G UAV Broadcasting Communications,\" IEEE Transactions on Broadcasting, vol. 66, no. 2, June 2020.",
        "Khan AH, Cao X, Li S, Luo C. (2020) Using Social Behavior of Beetles to Establish a Computational Model for Operational Management, IEEE Transactions on Computational Social Systems, pages 1-11, DOI:10.1109/tcss.2019.2958522.",
        "Zhan W, Luo C, Min G, Wang C, Zhu Q and Duan H. (2020) \"Mobility-Aware Multi-User Offloading Optimization for Mobile Edge Computing,\" in IEEE Transactions on Vehicular Technology, vol. 69, no. 3, pp. 3341-3356, March 2020, doi: 10.1109/TVT.2020.2966500. (Cited 231 times, 5-year Impact Factor:7.4; Q1, 38/507)",
        "Ullah, H., Abu-Tair, M., McClean, S., Nixon, P., Parr, G., & Luo, C. (2020). Connecting disjoint nodes through a UAV-based wireless network for bridging communication using IEEE 802.11 protocols. EURASIP Journal on Wireless Communications and Networking, 2020(1), 142.",
        "Miao W, Min G, Wu Y, Huang H, Zhao Z, Wang H, Luo C. (2019) Stochastic Performance Analysis of Network Function Virtualization in Future Internet, IEEE Journal on Selected Areas in Communications, volume 37, no. 3, pages 613-626, DOI:10.1109/JSAC.2019.2894304. (Cited 92 times, 5-year Impact Factor: 17.4; Q1, 7/970)",
        "Herberth R, Menz L, Korper S, Luo C, Gauterin F, Gerlicher A, Wang Q. (2019) \"Identifying Atypical Travel Patterns for Improved Medium-Term Mobility Prediction,\" IEEE Transactions on Intelligent Transportation Systems, pages 1-12, DOI:10.1109/tits.2019.2947347, 2019.",
        "Yu L, Luo C, Yu X, Jiang X, Yang E, Luo C, Ren P. (2018) \"Deep learning for vision-based micro aerial vehicle autonomous landing,\" International Journal of Micro Air Vehicles, volume 10, no. 2, pages 171-185, DOI:10.1177/1756829318757470.",
        "Zhang H, Luo C, Wang Q, Kitchin M, Parmley A, Monge-Alvarez J, Casaseca-de-la-Higuera P. (2018) A Novel Infrared Video Surveillance System Using Deep Learning Based Techniques, Multimedia Tools and Applications, volume 77, no. 20, 26657-26676.",
        "Yu X, Zhang H, Luo C, Qi H and Ren P. (2018) \"Oil Spill Segmentation via Adversarial f-Divergence Learning,\" IEEE Transactions on Geoscience and Remote Sensing. doi: 10.1109/TGRS.2018.2803038",
        "Luo C, Casaseca-de-la-Higuera P, McClean S, Parr G, Ren P. (2018) Characterization of Received Signal Strength Perturbations Using Allan Variance, IEEE Transactions on Aerospace and Electronic Systems, volume 54, no. 2, pages 873-889, DOI:10.1109/TAES.2017.2768278. (Cited 21 times, 5-year Impact Factor: 5.3; Q1, 126/970)",
        "Ren P, Sun W, Luo C, Hussain A. (2017) Clustering-oriented Multiple Convolutional Neural Networks for Single Image Super-resolution, Cognitive Computation, DOI: https://doi.org/10.1007/s12559-017-9512-2.",
        "Yu X, Wu X, Luo C, Ren P. (2017) Deep learning in remote sensing scene classification: a data augmentation enhanced convolutional neural network framework, GIScience and Remote Sensing, volume 54, no. 5, pages 741-758, DOI:10.1080/15481603.2017.1323377.",
        "Ren P, Di M, Song H, Luo C, Grecos C. (2016) Dual Smoothing for Marine Oil Spill Segmentation, IEEE Geoscience and Remote Sensing Letters, volume 13, no. 1, pages 82-86, DOI:10.1109/LGRS.2015.2497716.",
        "Jiang X, Ren P, Luo C. (2016) A Sensor Self-aware Distributed Consensus Filter for Simultaneous Localization and Tracking, Cognitive Computation, volume 8, no. 5, pages 828-838, DOI:10.1007/s12559-016-9423-7. (2016 Impact Factor: 3.441)",
        "Luo Y, Zhao Z, Luo C (2016) \"MIMO-OTHR waveform optimization based on the mutual information theory\", Progress in Electromagnetics Research, vol. 46, 69-80, Jan. 2016.",
        "Luo C, Parr G, McClean SI, Peoples C, Wang X. (2015) Hybrid Demodulate-Forward Relay Protocol for Two-Way Relay Channels, IEEE Transactions on Wireless Communications, volume 14, no. 8, pages 4328-4341, DOI:10.1109/TWC.2015.2419627. (Cited 8 times, 5-year Impact Factor:11.4; Q1, 7/665)",
        "Jiang X, Lu B, Ren P, Luo C, Wang X. (2015) Augmented Filtering Based on Information Weighted Consensus Fusion for Simultaneous Localization and Tracking via Wireless Sensor Networks, International Journal of Distributed Sensor Networks, volume 11, no. 9, pages 391757-391757, DOI:10.1155/2015/391757.",
        "* C. Luo, S. I. McClean, G. Parr, Q. Wang, X. Wang and C. Grecos, \"A Communication Model to Decouple the Path Planning and Connectivity Optimization and Support Cooperative Sensing,\" in IEEE Transactions on Vehicular Technology, vol. 63, no. 8, pp. 3985-3997, Oct. 2014. (Cited 11 times, 5-year Impact Factor:7.4; Q1, 38/507)",
        "Patterson T, McClean S, Morrow P, Parr G, Luo C. (2014) \"Timely Autonomous Identification of UAV Safe Landing Zones\", Elsevier Robotics and Autonomous Systems, 2014. DOI: 10.1016/j.imavis.2014.06.006.",
        "C. Luo, S. I. McClean, G. Parr, L. Teacy and R. De Nardi, \"UAV Position Estimation and Collision Avoidance Using the Extended Kalman Filter,\" in IEEE Transactions on Vehicular Technology, vol. 62, no. 6, pp. 2749-2762, July 2013. (Cited 232 times, 5-year Impact Factor:7.4; Q1, 38/507)",
        "Luo C, Parr G, McClean S, Ren P, Gong Y. (2013) \"On the Study of Multiple Source Multiple Destination Relay Channels with Network Coding\", IET Communications, December 2013. DOI: 10.1049/iet-com.2012.0828.",
        "Gong Y, Luo C, Chen Z. (2012) \"Two-path Successive Relaying With Hybrid Demodulate-and-Forward\", IEEE Transactions on Vehicular Technologies, vol.61, no.5, 2012. pp 2044-2053.",
        "C. Luo, Y. Gong and F. Zheng, \"Full Interference Cancellation for Two-Path Relay Cooperative Networks,\" in IEEE Transactions on Vehicular Technology, vol. 60, no. 1, pp. 343-347, Jan. 2011 (Best paper award in University of Reading, 2011) (Cited 97 times, 5-year Impact Factor:7.4; Q1, 38/507)",
      ],
    },
    {
      title: "Review Articles in Journals",
      items: [
        "Du, Z., Luo, C., Min, G., Wu, J., Luo, C., Pu, J., & Li, S. (2025). A Survey on Autonomous and Intelligent Swarms of Uncrewed Aerial Vehicles (UAVs). IEEE Transactions on Intelligent Transportation Systems. 14477-14500.",
        "Li, Z., Min, G., Ren, P., Luo, C., Zhao, L., & Luo, C. (2024). Ubiquitous and Robust UxV Networks: Overviews, Solutions, Challenges, and Opportunities. IEEE Network, 38(2), 26-34.",
      ],
    },
    {
      title: "Selected Papers in Conferences",
      items: [
        "Li, Z., Luo, C., Min, G. (2025). Achieving Equilibrium under Utility Heterogeneity: An Agent-Attention Framework for Multi-Agent Multi-Objective Reinforcement Learning, AAAI. (Computer Science Conference Rankings - CORE A*)",
        "Chen, S., Wang, F., Ren, P., Luo, C., & Fu, Z. (2025). OSDMamba: Enhancing Oil Spill Detection from Remote Sensing Images Using Selective State Space Model. BMVC, Shefield. (CORE A; BMVC Flagship conference)",
        "Ramsdale, S., Ascione, I., Luo, C., & Fu, Z. (2025). Using LiDAR Output to Identify Atmospheric Rotors: A Convolutional Neural Network Approach (No. EMS2025-115). Copernicus Meetings.",
        "Li, X., Tao, Y., Zhang, S., Liu, S., Xiong, Z., Luo, C., ... & Huang, T. (2025). REOBench: Benchmarking Robustness of Earth Observation Foundation Models. NurIPS 2025. (CORE A*)",
        "Liu, Z., Luo, C., Min, G., Liu, Z., & Li, Z. (2024, July). DisasterScope: A Comprehensive Dataset and RTMDet-based Methodology for Object Detection in Disaster-Related Remote Sensing Images. In IGARSS 2024-2024 IEEE International Geoscience and Remote Sensing Symposium (pp. 7769-7772). IEEE. (Flagship conference)",
        "Navaneethanathan, A., Cael, B., Luo, C., Challenor, P., Martin, A., & Leonelli, S. (2024, April). Estimating global POC fluxes using ML and data fusion on heterogeneous and sparse in situ observations. In EGU General Assembly Conference Abstracts (p. 19157).",
        "Newby, K., Bennett, G., Roskilly, K., Sgarabotto, A., Luo, C., & Manzella, I. (2024, April). Smart boulders for real-time detection of hazardous movement on landslides. In EGU General Assembly Conference Abstracts (p. 394).",
        "Galloway, E., Catto, J. L., Luo, C., & Siegert, S. (2023, December). The Value of High-Resolution, Human-Centric Disaster Data: a Decade of Tropical Cyclone Impacts in the Philippines. In AGU Fall Meeting Abstracts (Vol. 2023, pp. SY42C-07).",
        "Sgarabotto, A., Manzella, I., Roskilly, K., Clark, M. J., Bennett, G. L., Luo, C., & Franco, A. M. (2023). Evaluating the use of smart sensors in ground-based monitoring of landslide movement with laboratory experiments.",
        "Sgarabotto, A., Manzella, I., Raby, A., Roskilly, K., Egedusevic, M., Panici, D., ... & Luo, C. (2023, May). Smart sensors to detect movements of cobbles and large woody debris dams. Insights from lab experiments. In EGU General Assembly 2023.",
        "Wei, S., Luo, C., & Luo, Y. (2023). Mmanet: Margin-aware distillation and modality-aware regularization for incomplete multimodal learning. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (pp. 20039-20049). (CORE A*; Flagship conference)",
        "Zhang, Q., Xu, J., Crane, M., & Luo, C. (2022, July). Visualwind: a novel video dataset for cameras to sense the wind. In IGARSS 2022-2022 IEEE International Geoscience and Remote Sensing Symposium (pp. 1924-1927). IEEE. (Flagship conference)",
        "Roskilly, K., Bennett, G., Curtis, R., Egedusevic, M., Jones, J., Whitworth, M., Luo, C. & Franco, A. (2022, May). SENSUM project, Smart SENSing of landscapes Undergoing hazardous hydrogeomorphic Movement. In EGU General Assembly Conference Abstracts (pp. EGU22-10289).",
        "Sgarabotto, A., Manzella, I., Roskilly, K., Luo, C., Clark, M., Franco, A., ... & Raby, A. (2022, May). Investigating boulder motions with smart sensors in lab experiments. In EGU General Assembly Conference Abstracts (pp. EGU22-10198).",
        "Alenezi S, Luo C, Min G. (2021) Energy-Efficient D2D Communications Based on Centralised Reinforcement Learning Techniques, 2021 IEEE 24th International Conference on Computational Science and Engineering (CSE), DOI:10.1109/cse53436.2021.00018.",
        "Zhan W, Luo C, Wang J, Min G, Duan H. (2019) Deep reinforcement learning-based computation offloading in vehicular edge computing, 2019 IEEE Global Communications Conference, GLOBECOM 2019 - Proceedings, DOI:10.1109/GLOBECOM38437.2019.9013982. (CORE B; Flagship conference)",
        "Miao W, Luo C, Min G, Wu L, Zhao T, Mi Y. (2019) Position-based Beamforming Design for UAV communications in LTE networks, ICC-2019, Shanghai, China, 20th - 24th May 2019.",
        "Mi Y, Luo C, Min G, Wu L, Zhao T. (2019) Sensor-Assisted Global Motion Estimation for Efficient UAV Video Coding, ICASSP-2019, Brighton, UK, 12th - 17th May 2019. (CORE B; Flagship conference)",
        "Mi Y, Luo C, Min G, Casaseca-de-la-Higuera P, Wang Z. (2019) Towards Optimal Power Splitting in Simultaneous Power and Information Transmission, GLOBECOM-2018, Abu Dhabi, UAE, 9th - 13th Dec 2018, DOI:10.1109/GLOCOM.2018.8647526. (CORE B; Flagship conference)",
        "Yang R, Luo C. (2017) High Speed Wireless USB for Internet of Things, The 14th International Symposium on Pervasive Systems, Algorithms, and Networks, UK, 21st - 23rd Jun 2017.",
        "Zhang H, Luo C, Yu X, Ren P. (2017) MCMC based Generative Adversarial Networks for Handwritten Numeral Augmentation, The 6th International Conference on Communications, Signal Processing, and Systems (CSPS), Harbin, China, 14th - 16th Jul 2017.",
        "Ullah H, Abu-Tair M, McClean S, P N, Parr G, Luo C. (2017) An Unmanned Aerial Vehicle Based Wireless Network for Bridging Communication, The 14th International Symposium on Pervasive Systems, Algorithms, and Networks, Exeter, 21st - 23rd Jun 2017.",
        "Ullah H, McClean S, Nixon P, Parr G, Luo C. (2017) An Optimal UAV Deployment Algorithm for Bridging Communication, 15th International Conference on ITS Telecommunications (ITST), 2017, Warsaw, Poland, 29th May - 31st May 2017, DOI:10.1109/ITST.2017.7972194.",
        "Huaizhong Zhang, Pablo Casaseca-de-la-Higuera, Chunbo Luo, Qi Wang, Mattew Kitchin, Andrew Parmley, Jesus Monge-Alvarez, \"Systematic infrared image quality improvement using deep learning based techniques\", SPIE Security + Defence 2016.",
        "Chunbo Luo, Pablo Casaseca-De-La-Higuera, Xinheng Wang, Keshav Dahal, Cheng Jin and Peng Ren, \"On the Study of Wireless Signal Noise for Designing Network Infrastructure of Knowledge Management Systems\", 9th International Conference on Software, Knowledge, Information Management & Applications, Kathmandu, Nepal, 15th December -17th December 2015.",
        "Chaoyi Cheng, Chuanfang Zhang, Cheng Jin, Chunbo Luo. \"Dual-Band Circularly Polarized Antenna Design for Satellite Navigation System\", IET International Radar Conference, Hangzhou, 14-16 October 2015",
        "Chunbo Luo, Cathryn Peoples, Gerard Parr, Sally McClean, Xinheng Wang, James Nightingale and Qi Wang, \"Relaying for 5G: A Novel Low-Error Relaying Protocol\", The Twentieth IEEE Symposium on Computers and Communications, Larnaca, Cyprus, July 2015.",
        "[Invited paper] Chunbo Luo, James Nightingale, Ekhorutomwen Asemota and Christos Grecos. \"A UAV-Cloud System for Disaster Sensing Applications\", 2015 IEEE 81st Vehicular Technology Conference, Glasgow. (CORE B; Flagship conference)",
        "Mengmeng Di, Huajun Song, Chunbo Luo and Peng Ren \"Elongated Strip Oil Spill Segmentation Based on A Cooperative Model\", IEEE International Conference on Multisensor Fusion and Information Integration, Beijing, September 2014.",
        "Khan K. A., Wang Q., Luo C., Wang X., and Grecos C. \"Impact of different cloud deployments on real-time video applications for mobile cloud users\", Proceedings of IS&T/SPIE Electronic Imaging, San Francisco, February 2015.",
        "Diego Martin-Martinez, Pablo Casaseca-de-la-Higuera, Marcos Martin-Fernandez, Abbes Amira, Chunbo Luo, Christos Grecos and Carlos Alberola-Lopez \"A Stochastic Modelling Framework for the Reconstruction of Cardiovascular Signals\", IEEE EMBC, Chicago, August 2014.",
        "Chunbo Luo, Pablo Casaseca-de-la-Higuera, Sally McClean, Gerard Parr \"Analysis of Coloured Noise in Received Signal Strength Using the Allan Variance\", EUSIPCO, Lisbon, September 2014.",
        "Chunbo Luo, Qi Wang, Xinheng Wang, Christos Grecos, Runfeng Yang, Peng Ren \"Exploiting Selection Diversity and Recovering Spectrum Loss in Wireless Sensor Networks with Directional Antennas\", IEEE Globecom, Atlanta, December 2013. (CORE B; Flagship conference)",
        "[Invited paper] K. Khan, Q. Wang, C. Grecos, Chunbo Luo and X. Wang, \"MeshCloud: Integrated Cloudlet and Wireless Mesh Network for Real-Time Applications\", Proc. 20th IEEE International Conference on Electronics, Circuits, and Systems, Abu Dhabi, UAE, 8th December - 11th December 2013.",
        "Chunbo Luo, Paul Ward, Stephen Cameron, Gerard Parr, Sally McClean, \"Communication Provision for a Team of Remotely Searching UAVs\", Globecom, December 2012. (CORE B; Flagship conference)",
        "Chunbo Luo, Yu Gong and Fuchun Zheng, \"Interference Cancellation of Two-Path Systems Using Network Coding\", The 21st Annual IEEE International Symposium on Personal, Indoor and Mobile Radio Communications (PIMRC 2010), Istanbul, Turkey, 26th-29th September 2010.",
        "Chunbo Luo, Yu Gong and Fuchun Zheng, \"On the Study of Interference Cancellation for the Two-Path Cooperative Model\", SSE 2009, Reading, UK, December 2009.",
        "Khaled F. Abu-Salem, Chunbo Luo, Yu Gong \"A New Strategy for the Blind MMSE Equalization\", 17th European Signal Processing Conference 2009, Glasgow, Scotland, August 2009.",
        "Chunbo Luo, Yu Gong, Fuchun Zheng, \"Full Interference Cancellation for Two-Path Cooperative Communications\", 2009 IEEE Wireless Communications and Networking Conference, Budapest, Hungary, April 2009.",
        "Chunbo Luo, Yuehuan Gong, Yu Gong, Shaoqian Li, \"A New Blind Equalization Algorithm Based on Convex Combination\", 2007 International Conference of Communications, Circuits and Systems (ICCCAS). Kokura, Fukuoka, Japan, July 2007.",
      ],
    },
    {
      title: "Report",
      items: [
        "Beduschi A, Cinnamon J, Langford J, Luo C, Owen D. (2017) Building Digital Identities: The Challenges, Risks and Opportunities of Collecting Behavioural Attributes for new Digital Identity Systems, University of Exeter and Coelition, 40 pages, June 2017. Cited by the International Committee of the Red Cross' Handbook on data protection in humanitarian action (end edition).",
      ],
    },
    {
      title: "Datasets and Codes",
      items: [
        "Granite-geospatial-ocean: The granite-geospatial-ocean model is a transformer-based geospatial foundation model trained on Sentinel-3 Ocean Land Colour Instrument (OLCI) and Sea and Land Surface Temperature Radiometer (SLSTR) images (Downloaded over 11,000 times in October 2025). Access: https://huggingface.co/ibm-granite/granite-geospatial-ocean",
        "DisasterScope: A disaster-specific dataset containing high-resolution disaster-related imagery - a range of images depicting diverse disaster scenarios, enhancing the breadth of training data for improved model performance. Access: Z. Liu, C. Luo, G. Min, Z. Liu and Z. Li, \"DisasterScope: A Comprehensive Dataset and RTMDet-based Methodology for Object Detection in Disaster-Related Remote Sensing Images,\" IGARSS 2024 - 2024 IEEE International Geoscience and Remote Sensing Symposium, Athens, Greece, 2024, pp. 7769-7772. (Flagship conference of the IEEE Geoscience and Remote Sensing Society (GRSS).)",
        "VISUALWIND: A novel video dataset including 6000 labelled video clips, covering eleven wind classes of the Beaufort scale. Access: Qin Zhang, Jialang Xu, Matthew Crane, Chunbo Luo, (2022) See the wind: Wind scale estimation with optical flow and VisualWind dataset, Science of The Total Environment, Volume 846, 2022, 157204.",
        "SWED: Sentinel-2 Water Edges Dataset. SWED is a new image dataset for the development and benchmarking of techniques for the automated extraction of coastline morphology data from Sentinel-2 images. Composed of 16 labelled training Sentinel-2 scenes, and 98 test label-image pairs, SWED is globally distributed and contains examples of many different coastline types and natural and anthropogenic coastline features. Access: Seale C, Redfern T, Chatfield P, Luo C, Dempsey K. (2022) Coastline detection in satellite imagery: A deep learning approach on new benchmark data, Remote Sensing of Environment, volume 278, article no. 113044, DOI:10.1016/j.rse.2022.113044.",
      ],
    },
    {
      title: "Research, Impact and Knowledge Exchange",
      items: [
        "2025 to date: Wildfire Risk Minimisation Using Geospatial Foundation Models, with IBM Research UK, the Met Office and PML. This work aims to enable UK stakeholders to more effectively manage wildfires using geo-foundational approaches. The high-impact work resulted significant visibility on social media, and one EPSRC IAA project to support the integration of the model into the Met Office's digital twin (TWINE). This project is being developed into a REF impact case study. (Relevant UN SDGs: 11, 13, 15)",
        "2025 to date: NEOM: Vegetation Change Detection Tool. The NEOM Community funded this project to develop a data-driven remote sensing-based change detection software tool, which will automatically measure the re-greening areas and show community efforts in Saudi Arabia's NEOM project. The tool will integrate our foundation model to more accurately segment the re-greened area and estimate its carbon storage. (Relevant UN SDGs: 11, 13, 15)",
        "2024: Automated AI Generated 3-D Tree-Scapes for Woodland Creation and Agroforestry Project Concept Designs, funded by UKRI Innovate UK with SpaceClipper Ltd. This project developed a software pipeline to visualize the regions that could be used to create future woodlands and agroforestry. (Relevant UN SDGs: 11, 13, 15)",
        "2023: A rapid assessment tool for Woodland Creation investment to the competition Feasibility studies for Artificial Intelligence solutions, UKRI Innovate UK with Spaceclipper Ltd. This project developed an algorithmic solution to optimize woodland investment. (Relevant UN SDGs: 11, 13, 15)",
        "2023: Machine learning methods for high resolution aerial sensing data processing, EPSRC Industrial CASE with Ordnance Survey. This project funded a joint PhD with Ordnance Survey to compress high-spectral remote sensing images of Ordnance Survey's, which will enable their offering of ML-ready data to partners using lower storage and easy sharing.",
        "2023: Optimising Energy Demand in Rural Communities via Precision Agriculture Technology, Innovate UK with LENKÉ: Space & Water Solutions Ltd. This project codevelop a commercially viable ML product using remote-sensing data to predict irrigation demand in rural Ethiopia. (Relevant UN SDGs: 2, 8, 15)",
        "2023 - 2025: Automated Insurance Rebuilds Cost Estimate, with Rebuild Cost Assessment Ltd. This KTP project developed machine learning algorithms to automate much of the rebuild cost assessment process. This will enable RCA to halve the time it takes for a desktop assessment survey to be completed and meet its ambitious growth targets of 10% per year. The Net Profit Before Tax, over the 5 years after the partnership, as a direct result of this KTP partnership is expected to be £5,381,557. This project is being developed into a REF impact case study. (Relevant UN SDGs: 8)",
        "\"I am pleased to inform you that your Partnership has been graded 'Very Good'. I would like to congratulate all those involved in the Partnership in achieving this outcome and to thank you and your colleagues for your contribution to this success.\" - Innovate UK, part of UK Research and Innovation",
        "2017: Building Digital Identities, with Coelition, ESRC IAA. This project investigated the building of digital identities for the huge number of refugees without identities. The final report was written jointly with Professor Ana Beduschi (International Human Rights Law) and Professor Jonathan Cinnamon (Geology). We presented the report and gave a talk at the United Nations ID2020 Summit. The report was cited in the International Committee of the Red Cross' Handbook on data protection in humanitarian action (end edition), which is a leading resource for humanitarian organisations operating in the humanitarian sector as it sets the good practice and principles concerning data protection in this sector.",
        "2015-2016: Thales-Challenge Low-pixel Automatic Target Detection and Recognition (ATD/ATR), with CENSIS and Thales. This joint project with Thales developed a deep learning based automatic target detection and recognition pipeline. The project received the Scottish Funding Council Knowledge Transfer Medal. The project's outcome was a software product for the Thales's ATD/ATR system. According to the company's estimation, this system achieved an increased market share by 0.5% to Euro 455M.",
      ],
    },
    {
      title: "Postgraduate Research",
      items: [
        "Current lead supervision:",
        "2024 – date: Lulin Zhu, Image Segmentation from Remote Sensing Images (Exeter – CSC Studentship)",
        "2024 – date: Hanyu Ouyang, A Multi-scale Digital Twin of Dangerous Hillsides for Landslides Monitoring and Early Warning (Self-funded)",
        "2024 – date: Nuria Bachiller Jareno, Predicting the impacts of river plumes in coastal waters from satellite imagery using machine learning (EI CDT)",
        "2023 – date: Jiawei Lu, Modelling high-impact environment hazards and predict impacts towards net-zero (Exeter – CSC Studentship)",
        "2023 – date: Zishu Liu, Lightweight multimodality learning (Self-funded)",
        "2023 – date: Luyang Zhang, Efficient Resource Allocation in Mobile Edge Computing for Internet-of-Things (Self-funded)",
        "2023 – date: Joshua Dare-Cullen, Machine Learning for Geospatial Intelligence (EI CDT)",
        "2022 – date: Zhipeng Liu, Smart and Secure Caching Technologies for Multi-access Edge Computing (Exeter – CSC Studentship)",
        "2022 – date: Ashish Sundar, Reinforcement learning for environmental intelligence (EI CDT)",
        "2021 – date: Zhuhui Li, Robust Data-driven Approaches for Future Software-defined Vehicular Network (CSC Studentship)",
        "2019 – date: Marcus Carpenter, Multi-stage malware detection and prediction (EPSRC CASE)",
        "Graduated PhD/MPhil students (Lead supervision):",
        "2021 – 2025: Abhiraami Navaneethanathan, Artificial Intelligence & Data Science for Sustainable Futures (Award)",
        "2021 – 2024: Dr Qinglan Liu, Data-driven circular economy modelling. Now: Postdoc RA, University of Exeter",
        "2019 – 2024: Dr Jiazhen Zhang, Federated learning with transfer learning approaches for cybersecurity. Now: Postdoc RA, University of Exeter",
        "2016 – 2020: Dr Yang Mi, Visual information compression, retrieval, and learning optimization for UAV. Now: Postdoc RA, The Hong Kong Polytechnic University.",
        "2016 – 2019: Dr Leonhard Menz, Intelligent Charging Strategies for Battery Electric Vehicles. Now: Managing Director of Operations at Securitas Aviation Germany.",
        "2017 – 2019: Mr Stephen Goult, Remote sensing and DEEP learning for early warning of WATER quality hazards. Now: Senior Software Engineer, EDF.",
        "Postdoctoral research fellows/associates (Lead supervision):",
        "2025 – date: Dr Trish Nowak, on EPSRC DLTP project",
        "2025 – date: Dr Remy Vandaele, on EPSRC IAA project",
        "2019 – 2021: Dr Qin Zhang, Now: Associate Professor, Qingdao Agricultural University",
        "2017 – 2018: Dr Wang Miao, Now: Lecturer, University of Exeter",
        "2015 – 2017: Dr Huaizhong Zhang, Now: Senior Lecturer, Edge Hill University",
        "2014 – 2015: Dr James Nightingale, Now: Teaching Fellow, University of Strathclyde",
        "Quote from a past PhD student: \"Thank you so much for all your supervision, feedback and support throughout my PhD - I am so grateful!\"",
      ],
    },
    {
      title: "Modules Taught",
      items: [
        "BSc 3rd Year ECM3428 Algorithms that Changed the World (15 credits) | Role: Module Lead | Duration: 2016 - date | Description: This module is designed to highlight the importance of algorithms in Computer Science, providing students with an understanding of what algorithms are, how they can be specified and evaluated, and what they can be used for. | Highlights: Student satisfaction has been consistently high (4/5 evaluations on my teaching, and one formal acknowledgment from the Associate Dean for Education for the outstanding delivery and students' overwhelming positive feedback during the Covid time). Industry leaders from Microsoft and Bosch were invited to share their perspectives. 60% students consistently received 2.1 or above. Students feedback shows that they have applied our module's algorithms in their projects or work and have developed interest to pursue advanced degrees. (Feedback quotes: \"Are there any particularly positive aspects concerning this module which you would like to highlight?\" Answers: \"Chunbo\"; \"A fascinating module with lots of useful practical information on algorithms that are a part of everyday life\".)",
        "BSc 3rd Year ECM3401 Individual Literature Review and Project (45 credits) | Role: Advising and supervising student projects | Duration: 2016 - date | Description: This module includes both initial research into the project area (including production of a literature review) and production of the software system following an appropriate development method. | Highlights: I find that this module provides an excellent opportunity to involve students in cutting-edge research. A particular highlight has been supervising a student (Haoyang Cui), who developed an innovative sensing and data-analysis tool for environmental monitoring called the Exeter Sentinel Classifier. This work was later showcased at the annual ML4EO conference, and subsequently led to a community-funded project (NEOM), which further developed into software capable of detecting regreened areas in Saudi Arabia's NEOM initiative.",
        "MSci 4th Year ECMM428: Individual Research Project (30 credits) | Role: Module lead and project supervisor | Duration: 2021-2022 | Description: The module aims to put into practice the knowledge acquired from the taught elements of the programme and to give students experience of many aspects of research work, including literature review, planning, experimentation and analysis, interpretation of results, and presentation. | Highlights: Student feedback has been positive (4/5 for both years). I found students was inspired to explore literature, having both depth and width, to design projects. A highlight of this module was that a student (Yuchen Zhu) designed an NHS queue tracking app that was further developed into a product by a researcher from the Business School. He received an award for his excellent completion of the project. I was really moved to receive a Christmas card from him mentioning that \"…. how grateful I am to have you as my supervisor …\"",
        "BSc 2nd Year ECM2433: The C Family (15 credits) | Role: Module Convenor | Duration: 2020 | Description: This module aims to develop skills in the C family languages including the syntax of each language and its predominant application area. The module also aims to highlight the similarities and differences between each of the languages, to explain their shared history and to describe the relationship between these languages and modern languages such as Java. | Highlights: Student feedback has been positive (4.56/5 in 2020 review). I shared the delivery of this module with the module lead. Students were happy with the contents and the useful comments to the coursework, leaving quotes such as \"The feedback on coursework was of a really high standard with useful comments for improvement\" and \"this module was well structured and not overloaded with content. I really enjoyed the coursework\".",
        "BSc all years Personal Tutor | Role: Personal tutor to ~10 students across several years | Duration: 2017 - date | Description: Each term, I meet students in small groups (around twice per term) and individually as required, focusing on: (1) academic progress and strategies for improvement; (2) wellbeing support; and (3) discussions about employability and future study or career plans. | Highlights: I value the interactions I have with students through pastoral meetings. These meetings have enabled me to identify early signs of mental-health concerns and to support students with more attentive guidance. I also encourage students to plan ahead for their future, providing recommendations and reference support for their job applications. One of my students (Apurva Kulkarni) sent me this email at graduation day \" … Thank you also for being my personal tutor for the last 3 years and helping me to address any challenges throughout my university experience. You have truly shaped and made my entire experience so memorable...\"",
      ],
    },
    {
      title: "New Programme / Modules Developed",
      items: [
        "2019-2023 MSc Data Science (Degree Apprenticeship) Programme redesigned from Level 7 Data Science Degree Apprenticeship Programme: Coordinated the academic team, IIB, employers and mentor/admin team to ensure high-quality delivery as evidenced in the Ofsted Investigation (Good) in 2022. Redesigned the programme in 2021 to meet the Ofsted standard. The updated programme has been welcomed by all students in the follow-up survey. In our 2022 exit interview, all attendants have gained promotion and moved into a more data science new job (the programme has graduated one cohort only). 22 out of 23 of the first cohort apprentices received Distinction (MSc). Improved retention performance from 85% to 90%, despite the significant increase of cohort. Lead the programme team to pass the Ofsted Investigation (Good) in 2022. Quotes from Ofsted: \"Apprentices develop substantial new skills and knowledge over time. They relate their new learning well to their workplaces and add value to their employers, who appreciate the contribution they make.\"",
        "2017 ECM1416 Computational Mathematics: It is now a core foundational module in the computer science teaching portfolio.",
      ],
    },
    {
      title: "Teaching Innovation and Pedagogy",
      items: [
        "ECM3428 Algorithms that Changed the World: My research-led teaching pedagogy has been embedded in the delivery of this module since I took on the module lead in 2016. I have incorporated relevant research on networking technologies, including network routing algorithms, RSA coding, and Kalman filtering into teaching contents and workshop tasks, which have consistently received positive feedback from students. This innovative approach has had a clear positive impact; students have reported using the algorithms taught on the module, such as PageRank and routing algorithms, in their own research and project work.",
        "ECM3401 Individual Literature Review and Project: I expose students to cutting-edge research by providing real data and tailored research project tasks appropriate to their level, with PhD students actively involved in project supervision. For example, three students were given sensor data from the SENSUM project to develop machine-learning algorithms to predict movement types captured by smart sensors. We introduced visualisation methods to help them understand how different movements can be represented and how these insights inform subsequent predictions. Working with real-world data and state-of-the-art machine-learning models has given them a rare and valuable training opportunity. Their completed work was later presented in a workshop focusing on machine learning methods for environmental applications.",
      ],
    },
    {
      title: "Nomination and Awards",
      items: [
        "2017 Nominations for Best Lecturer",
        "2018 Most Supportive Member of Staff",
        "2022 Students' Guild Teaching Awards",
      ],
    },
    {
      title: "Other Contributions",
      items: [
        "2015 - date Supporting Offer Holder Visit Days, Open Days, one-to-one talks, research inspiration talks",
        "2015 - date Supporting Department/college/faculty activities such as Smallpeice, Hackathon, Project Demos",
        "External examining",
      ],
    },
    {
      title: "Examination of BSc and MSc Programmes",
      items: [
        "2020 - 2024 University of Plymouth, Undergraduate and Postgraduate: B4ELEC and B4MSC",
        "2020 - 2025 University of the West of Scotland, Undergraduate: Computing Subjects",
      ],
    },
    {
      title: "PhD/MPhil Examination",
      items: [
        "2025 University of Southampton, PhD thesis",
        "2024 University of Sheffield, PhD thesis",
        "2023 University of Wollongong, Australia, Master of Philosophy",
        "2023 University of Leicester, PhD thesis",
        "2020 University of Strathclyde, PhD thesis",
        "2020 Edinburgh Napier University, PhD thesis",
        "2015 University of Reading, MPhil dissertation",
        "2014 University of Ulster, PhD thesis",
      ],
    },
    {
      title: "Administrative Responsibilities",
      items: [
        "2024 - date: Deputy Director of Research and Impact, Computer Science. Organised over ten workshops/events for new starters, cross-departmental collaboration, and industry-collaborations, including: New Starter Induction and REF Training Workshop (Nov 2024), New Starter Networking and Introduction Event (Nov 2024), NIA support strategy discussed in Departmental Research Committee (Feb 2025), Joint Computer Vision Workshop with BT at the BCS AI Conference 2024, Industry-Academia Collaboration Symposium: SUMMIT-EI (February 2025), Computer Science Workshop on AI with industry partners (June 2025), Maths & Stats/Computer Science/Business School Workshop (Dec 2024), CREWW and CS Workshops 1 and 2 (Dec 2024 and Jan 2025), CS Workshop on AI Applications - Industrial & Academic Perspectives (June 2025), Collaborative grant workshop between Maths, Engineering, Physics and CS (Oct 2025). The workshops contributed to an increase of applications totalled £24.4M, 78% of the annual target, exceeding the faculty average of 62%, by the end of the first nine months in 2024/25. In the 2024/25 academic year, 12-month rolling application value rose by over 60%. Carry out multiple internal sifts and review major applications. Lead initiatives to start the ECR Network in Computer Science.",
        "2019 - 2023: Programme Lead, MSc Data Science Professional (Level 7 Degree Apprenticeship). Coordinated the academic team, IIB, employers and mentor/admin team to ensure high-quality delivery as evidenced in the Ofsted Investigation (Good) in 2022. Redesigned the programme in 2021 to meet the Ofsted standard. The updated programme has been welcomed by all students in the follow-up surveys. In our 2022 exit interview, all attendants have gained promotion and moved into a more data science new job (the programme has graduated one cohort only at the time of interview).",
        "2016 - 2019: Director of Postgraduate Research, Computer Science. Contributed to the successful Athena Swan application (2019) by writing the PGR related sections. Increased PGR satisfactory (62.5% in 2016 -> 85% in 2019) in the national Postgraduate Research Experience Survey (PRES).",
      ],
    },
    {
      title: "Theme Leads",
      items: [
        "2025 - date: Theme Lead, Centre of Environmental Intelligence",
        "2021 - 2025: Theme Lead, Institute of Data Science and Artificial Intelligence",
      ],
    },
    {
      title: "Initiatives and Activities Contributing to University/Faculty/Discipline",
      items: [
        "2019 - date: Internal grant reviewer and sift for UKRI, ERC, Turing Fellowship etc.",
        "2019 - date: Supporting and mentoring junior staff members for their CPD and HEA applications.",
        "2018 - 2025: Visiting multiple universities to promote our UG/PG and PhD programmes, e.g., in China Petroleum University (2025, 2023), Fuzhou University (2024), Zhejiang University (2019), Fudan University (2018, 2019), and Shanghai Jiaotong University (2018)",
      ],
    },
    {
      title: "Honours and Awards",
      items: [
        "2021 - 2025 University of Exeter \"Above and beyond\" awards (7 times)",
        "2021 Outstanding Leadership Award for Chairing the 20th International Conference on Ubiquitous Computing and Communications",
        "2018 Outstanding Leadership Award received for the contributions to the 4th IEEE International Conference on Data Science and Systems",
        "2018 Knowledge Transfer Award, Scottish Funding Council",
      ],
    },
    {
      title: "Membership and Official Positions",
      items: [
        "2023 - date Senior Member of the IEEE",
        "2015 - date Fellow of the Higher Education Academy",
      ],
    },
    {
      title: "External Activities",
      items: [
        "2016 - date EPSRC Peer Review College member",
        "2019 - date Natural Sciences and Engineering Research Council of Canada",
        "2024 - date Reviewer of the EU Horizon Programme",
        "2021 - date Member of the NEODAAS Steering Committee",
        "2018 - 2022 Affiliated Researcher in BT Ireland Innovation Centre (BTIIC)",
        "2017 - 2018 Exeter-Tsinghua Academic Fellowship (Co-organised the China UK Technology Innovation Workshop that involved 7 UK universities, BT, and 3 Chinese universities)",
      ],
    },
    {
      title: "Invited Keynote Addresses and Talks",
      items: [
        "2023 International Symposium on Advanced Topics in Pervasive Computing and Networking Technologies",
        "2021 UK-China collaborative workshop: AI for Climate, Environment and Sustainability, Exeter",
        "2021 PML-Exeter joint workshop on Change Detection for Very High Resolution (VHR) Remote Sensing",
        "2020 18th IEEE ISPA Machine Learning empowered Future Network Workshop, Keynote Talk: Machine Learning for Communication and Network Data Processing",
        "2019 BT Thought Leadership Talk, Ipswich, UK",
        "2018 The First International Conference on Cyber Security and Digital Forensics, Edinburgh Napier University, UK",
        "2018 International Symposium on Advances in Communications and Computing for Smart City, Exeter, UK",
        "2018 BT Ireland Innovation Centre, University of Ulster, UK",
        "2017 NSFC-Newton Research Link Workshop on Geological Disaster Monitoring Based on Sensor Networks, Harbin, China",
        "2017 UAV Networking: Challenges, Modelling and Applications, University of York, UK",
        "2015 UK-Pakistan International Workshop on 5G Emerging Technologies for Disaster Management, Pakistan",
      ],
    },
    {
      title: "Editorial Boards",
      items: [
        "2025 - date Guest editor for IET Image Processing",
        "2022 - date Editor for Science China (Information Sciences), Springer",
        "2022 - 2023 Guest editor for Frontiers in Marine Science",
        "2022 - 2023 Guest editor for IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing",
        "2021 - 2023 Guest editor for Advanced Control for Applications",
      ],
    },
    {
      title: "Conference Organisation and Chairing Roles",
      items: [
        "Program Chair The 21st IEEE International Conference on Embedded Software and Systems, 2025",
        "General Chair The Machine Learning for Earth Observations, 2023-2025",
        "Workshop Chair The BMVC workshop on Machine Vision for Earth Observation, 2023-2025",
        "Program Chair The 17th IEEE International Conference on Big Data Science and Engineering 2023",
        "Program Chair The 20th International Conference on Computer and Information Technology, 2021",
        "General Chair The 10th IEEE International Conference on Big Data and Cloud Computing, online, 2020",
        "Program Chair The 4th IEEE International Conference on Data Science and Systems, 2018",
        "Workshop Chair International Symposium on Advances in Data Science and Technologies, 2018",
        "Workshop Chair ESRC IAA Workshop on Digital Identity, 2018",
        "Workshop Chair International Symposium on Advanced Topics in Pervasive Computing and Networking Technologies, 2017",
        "Program Chair The 14th International Symposium on Pervasive Systems, Algorithms, and Networks, 2017",
      ],
    },
    {
      title: "Hosted Visitors and Guest Talks (since 2019)",
      items: [
        "2025 Sally McClean, Professor of Mathematics, University of Ulster",
        "2025 Anil Madhavapeddy, University of Cambridge",
        "2025 Anne Jones, Senior Research Scientist, IBM Research Europe",
        "2025 Dr Louisa van Zeeland, The Alan Turing Institute",
        "2025 Jozef Skakala, Senior Scientist in Marine System Modelling at Plymouth Marine Laboratory",
        "2024 Gerard Parr, Chair in Telecommunications Engineering at the University of East Anglia",
        "2024 Jian Pu, Exeter-Fudan Fellow",
        "2024 Yan Zhang, University of Oslo",
        "2023 Chao Zhou, Associate Professor, China University of Geography",
        "2023 Shuai Li, University of Oulu",
        "2021 Peng Ren, Full Professor, China University of Petroleum",
        "2020 Chris Noring, Senior Cloud Advocate Lead, Portfolio Manager, Microsoft",
        "2019 David Grace, Head of Communication Technologies Research Group, University of York",
        "2019 Lake Christopher, Head of UK Solutions & Cross Divisional Business Development, Bosch",
      ],
    },
  ],
}
