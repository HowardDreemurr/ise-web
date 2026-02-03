export type MemberType = "PhD" | "PostDoc" | "MPhil"

export type Member = {
  id: string
  name: string
  type: MemberType
  research: string
  period: string
  funding?: string
  currentPosition?: string // Current position for graduated members
}

// Current members (PhD students and PostDocs)
export const currentMembers: Member[] = [
  {
    id: "lulin-zhu",
    name: "Lulin Zhu",
    type: "PhD",
    research: "Image Segmentation from Remote Sensing Images",
    period: "2024 - present",
    funding: "Exeter - CSC Studentship",
  },
  {
    id: "hanyu-ouyang",
    name: "Hanyu Ouyang",
    type: "PhD",
    research: "A Multi-scale Digital Twin of Dangerous Hillsides for Landslides Monitoring and Early Warning",
    period: "2024 - present",
    funding: "Self-funded",
  },
  {
    id: "nuria-bachiller-jareno",
    name: "Nuria Bachiller Jareno",
    type: "PhD",
    research: "Predicting the impacts of river plumes in coastal waters from satellite imagery using machine learning",
    period: "2024 - present",
    funding: "EI CDT",
  },
  {
    id: "jiawei-lu",
    name: "Jiawei Lu",
    type: "PhD",
    research: "Modelling high-impact environment hazards and predict impacts towards net-zero",
    period: "2023 - present",
    funding: "Exeter - CSC Studentship",
  },
  {
    id: "zishu-liu",
    name: "Zishu Liu",
    type: "PhD",
    research: "Lightweight multimodality learning",
    period: "2023 - present",
    funding: "Self-funded",
  },
  {
    id: "luyang-zhang",
    name: "Luyang Zhang",
    type: "PhD",
    research: "Efficient Resource Allocation in Mobile Edge Computing for Internet-of-Things",
    period: "2023 - present",
    funding: "Self-funded",
  },
  {
    id: "joshua-dare-",
    name: "Joshua Dare-",
    type: "PhD",
    research: "Cullen, Machine Learning for Geospatial Intelligence",
    period: "2023 - present",
    funding: "EI CDT",
  },
  {
    id: "zhipeng-liu",
    name: "Zhipeng Liu",
    type: "PhD",
    research: "Smart and Secure Caching Technologies for Multi-access Edge Computing",
    period: "2022 - present",
    funding: "Exeter - CSC Studentship",
  },
  {
    id: "ashish-sundar",
    name: "Ashish Sundar",
    type: "PhD",
    research: "Reinforcement learning for environmental intelligence",
    period: "2022 - present",
    funding: "EI CDT",
  },
  {
    id: "zhuhui-li",
    name: "Zhuhui Li",
    type: "PhD",
    research: "Robust Data-driven Approaches for Future Software-defined Vehicular Network",
    period: "2021 - present",
    funding: "CSC Studentship",
  },
  {
    id: "marcus-carpenter",
    name: "Marcus Carpenter",
    type: "PhD",
    research: "Multi-stage malware detection and prediction",
    period: "2019 - present",
    funding: "EPSRC CASE",
  },
  {
    id: "trish-nowak",
    name: "Dr Trish Nowak",
    type: "PostDoc",
    research: "on EPSRC DLTP project",
    period: "2025 - present",
  },
  {
    id: "remy-vandaele",
    name: "Dr Remy Vandaele",
    type: "PostDoc",
    research: "on EPSRC IAA project",
    period: "2025 - present",
  },
]

// Graduated members (PhD, MPhil, and former PostDocs)
export const graduatedMembers: Member[] = [
  {
    id: "abhiraami-navaneethanathan",
    name: "Abhiraami Navaneethanathan",
    type: "PhD",
    research: "Artificial Intelligence & Data Science for Sustainable Futures",
    period: "2021 - 2025",
    funding: "Award",
  },
  {
    id: "qinglan-liu",
    name: "Dr Qinglan Liu",
    type: "PhD",
    research: "Data-driven circular economy modelling.",
    period: "2021 - 2024",
    currentPosition: "Postdoc RA, University of Exeter",
  },
  {
    id: "jiazhen-zhang",
    name: "Dr Jiazhen Zhang",
    type: "PhD",
    research: "Federated learning with transfer learning approaches for cybersecurity.",
    period: "2019 - 2024",
    currentPosition: "Postdoc RA, University of Exeter",
  },
  {
    id: "yang-mi",
    name: "Dr Yang Mi",
    type: "PhD",
    research: "Visual information compression, retrieval, and learning optimization for UAV.",
    period: "2016 - 2020",
    currentPosition: "Postdoc RA, The Hong Kong Polytechnic University",
  },
  {
    id: "leonhard-menz",
    name: "Dr Leonhard Menz",
    type: "PhD",
    research: "Intelligent Charging Strategies for Battery Electric Vehicles.",
    period: "2016 - 2019",
    currentPosition: "Managing Director of Operations at Securitas Aviation Germany",
  },
  {
    id: "stephen-goult",
    name: "Stephen Goult",
    type: "PhD",
    research: "Remote sensing and DEEP learning for early warning of WATER quality hazards.",
    period: "2017 - 2019",
    currentPosition: "Senior Software Engineer, EDF",
  },
  {
    id: "qin-zhang",
    name: "Dr Qin Zhang",
    type: "PostDoc",
    research: "Now: Associate Professor, Qingdao Agricultural University",
    period: "2019 - 2021",
    currentPosition: "Associate Professor, Qingdao Agricultural University",
  },
  {
    id: "wang-miao",
    name: "Dr Wang Miao",
    type: "PostDoc",
    research: "Now: Lecturer, University of Exeter",
    period: "2017 - 2018",
    currentPosition: "Lecturer, University of Exeter",
  },
  {
    id: "huaizhong-zhang",
    name: "Dr Huaizhong Zhang",
    type: "PostDoc",
    research: "Now: Senior Lecturer, Edge Hill University",
    period: "2015 - 2017",
    currentPosition: "Senior Lecturer, Edge Hill University",
  },
  {
    id: "james-nightingale",
    name: "Dr James Nightingale",
    type: "PostDoc",
    research: "Now: Teaching Fellow, University of Strathclyde",
    period: "2014 - 2015",
    currentPosition: "Teaching Fellow, University of Strathclyde",
  },
]

// For backward compatibility
export const members: Member[] = [...currentMembers, ...graduatedMembers]
