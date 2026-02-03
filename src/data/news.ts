export type NewsItem = {
  id: string
  date: string
  title: string
  subtitle?: string
  tag?: string
  content?: string
  imageUrl?: string
  links?: { label: string; href: string }[]
}

export const newsItems: NewsItem[] = [
  {
    id: "news-2025-01",
    date: "2025-01-10",
    title: "ISE wins best paper award for ice hazard forecasting",
    subtitle: "Recognition at the International Conference on Environmental AI",
    tag: "Award",
    content:
      "Our hybrid sensing model was recognized for its impact on rapid hazard prediction. The paper demonstrates how combining satellite imagery with ground-based IoT sensors can improve early warning systems for glacial lake outburst floods.\n\nThe research team collaborated with partners from three continents to validate the approach across different geographic and climatic conditions.",
    links: [
      { label: "Read the paper", href: "#" },
      { label: "View presentation", href: "#" },
    ],
  },
  {
    id: "news-2024-11",
    date: "2024-11-02",
    title: "New project launched on rapid flood sensing",
    subtitle: "Multi-institution initiative for real-time flood alerts",
    tag: "Project",
    content:
      "We started a multi-institution initiative combining satellite and IoT sensing for flood alerts. This three-year project brings together expertise from remote sensing, machine learning, and hydrology to develop next-generation flood monitoring systems.\n\nThe project is funded by the Environmental Research Council and includes partners from academia and government agencies.",
    links: [{ label: "Project details", href: "#" }],
  },
  {
    id: "news-2024-09",
    date: "2024-09-18",
    title: "Open data toolkit reaches 5k stars",
    subtitle: "Community-driven growth for environmental data tools",
    tag: "Open data",
    content:
      "The ISE data hub now supports new benchmarks and reproducible pipelines. Our open-source toolkit for processing environmental sensor data has reached a milestone of 5,000 GitHub stars, reflecting strong adoption by the research community.\n\nRecent updates include support for new satellite data formats, improved calibration workflows, and integration with popular machine learning frameworks.",
    links: [
      { label: "GitHub repository", href: "#" },
      { label: "Documentation", href: "#" },
    ],
  },
  {
    id: "news-2024-07",
    date: "2024-07-05",
    title: "Invited keynote on resilient sensing systems",
    subtitle: "Annual Systems Forum presentation",
    tag: "Talk",
    content:
      "The group shared new insights on sensing for climate resilience at the annual Systems Forum. The keynote covered advances in adaptive sensing networks that can maintain data quality under challenging field conditions.\n\nKey topics included self-calibrating sensor arrays, fault-tolerant data transmission, and edge computing for real-time environmental monitoring.",
  },
]
