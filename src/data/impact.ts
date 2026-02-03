export type IndustryImpact = {
  id: string
  title: string
  description: string
  partner?: string
  tags: string[]
}

export const industryImpacts: IndustryImpact[] = [
  {
    id: "impact-1",
    title: "AI Generated 3-D Tree-Scapes for Woodland Creation",
    description:
      "Applying generative AI methods to visualise treescapes and forests for forest planning and carbon markets. The project creates immersive 3D visualisations of potential woodland areas to support reforestation decisions.",
    tags: ["Generative AI", "Carbon Markets", "Forest Planning"],
  },
  {
    id: "impact-2",
    title: "Automated Rebuilding Insurance Estimation",
    description:
      "Partnership with RiskStop to use machine learning and remote sensing techniques for automating insurance estimation using satellite imagery. This enables rapid and accurate property assessment at scale.",
    partner: "RiskStop",
    tags: ["Insurance", "Remote Sensing", "Machine Learning"],
  },
  {
    id: "impact-3",
    title: "Woodland Creation Assessment",
    description:
      "Collaboration with Space Clipper to assess suitability of woodland creation using ML and Earth observations. The system evaluates terrain, climate, and ecological factors for optimal tree planting locations.",
    partner: "Space Clipper",
    tags: ["Earth Observation", "ML Assessment", "Forestry"],
  },
  {
    id: "impact-4",
    title: "Low-pixel Automatic Target Detection and Recognition",
    description:
      "Thales Challenge project for ATD/ATR with Scottish Funding Council and CENSIS. Winner of the Scottish Funding Council Knowledge Transfer Medal for advancing detection capabilities in challenging imaging conditions.",
    partner: "Thales & CENSIS",
    tags: ["Defence", "Computer Vision", "Award Winner"],
  },
]

export type Award = {
  id: string
  title: string
  organization: string
  year?: string
  description?: string
}

export const awards: Award[] = [
  {
    id: "award-1",
    title: "Knowledge Transfer Medal",
    organization: "Scottish Funding Council",
    description: "For the Thales Challenge Low-pixel Automatic Target Detection project",
  },
  {
    id: "award-2",
    title: "UN Sustainability Award",
    organization: "United Nations",
    description: "Recognition for research contributions to UN Sustainable Development Goals",
  },
  {
    id: "award-3",
    title: "Highly Cited Researcher",
    organization: "Clarivate / Web of Science",
    description: "Among the world's most influential researchers based on citation impact",
  },
  {
    id: "award-4",
    title: "Top 2% Scientists Worldwide",
    organization: "Stanford University",
    description: "Ranked in the top 2% of scientists globally based on citation metrics",
  },
  {
    id: "award-5",
    title: "Editorial Board Member",
    organization: "Multiple IEEE Journals",
    description: "Serving on editorial boards for leading journals in the field",
  },
  {
    id: "award-6",
    title: "Exeter-Tsinghua Fellowship",
    organization: "University of Exeter & Tsinghua University",
    description: "Joint fellowship for research collaboration",
  },
]
