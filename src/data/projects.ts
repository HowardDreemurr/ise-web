export type Project = {
  id: string
  title: string
  summary: string
  status: string
  tags: string[]
}

export const projects: Project[] = [
  {
    id: "proj-atlas",
    title: "CryoSense Atlas",
    summary:
      "Glacier and snowpack monitoring pipeline integrating satellite and in situ sensing.",
    status: "Active",
    tags: ["Remote sensing", "Cryosphere"],
  },
  {
    id: "proj-signal",
    title: "ICE Grid Intelligence",
    summary:
      "Edge AI models for early warning on landslides and flood-prone regions.",
    status: "Active",
    tags: ["Edge AI", "Resilience"],
  },
  {
    id: "proj-clarity",
    title: "EcoTrace Signals",
    summary:
      "Open data and dashboards connecting satellite signals to environmental policy.",
    status: "Open Source",
    tags: ["Open data", "Policy"],
  },
]
