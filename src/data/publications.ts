export type Publication = {
  id: string
  title: string
  venue: string
  year: string
  authors: string
}

export const publications: Publication[] = [
  {
    id: "pub-2025-interactive",
    title: "Ice-Aware Forecasting With Hybrid Remote Sensing Inputs",
    venue: "Remote Sensing of Environment",
    year: "2025",
    authors: "Chen, Rao, ISE Group",
  },
  {
    id: "pub-2024-trust",
    title: "Edge Intelligence for Rapid Hazard Assessment",
    venue: "IEEE TGRS",
    year: "2024",
    authors: "Singh, Kim, Alvarez",
  },
  {
    id: "pub-2024-learning",
    title: "Environmental Signal Fusion for Urban Heat Resilience",
    venue: "Nature Climate",
    year: "2024",
    authors: "Lopez, Patel, ISE Group",
  },
]
