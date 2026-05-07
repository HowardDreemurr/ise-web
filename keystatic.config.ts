import { collection, config, fields, singleton } from "@keystatic/core"

const useGithubStorage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github" || !!process.env.VERCEL

const storage = useGithubStorage
  ? ({
      kind: "github" as const,
      repo: "HowardDreemurr/ise-web" as const,
    })
  : ({ kind: "local" as const })

const memberSchema = {
  name: fields.slug({ name: { label: "Slug / Name", description: "Used as filename and as the display name." } }),
  type: fields.select({
    label: "Type",
    options: [
      { label: "PhD", value: "PhD" },
      { label: "PostDoc", value: "PostDoc" },
      { label: "MPhil", value: "MPhil" },
    ],
    defaultValue: "PhD",
  }),
  research: fields.text({ label: "Research topic", multiline: true }),
  period: fields.text({ label: "Period (e.g. 2024 - present)" }),
  funding: fields.text({ label: "Funding", description: "Optional" }),
  currentPosition: fields.text({ label: "Current position", description: "For alumni only" }),
}

const paperSchema = fields.object({
  id: fields.text({ label: "ID" }),
  title: fields.text({ label: "Title" }),
  authors: fields.text({ label: "Authors" }),
  venue: fields.text({ label: "Venue" }),
  year: fields.integer({ label: "Year" }),
  doi: fields.text({ label: "DOI", description: "Optional" }),
  link: fields.text({ label: "Link", description: "Optional" }),
  description: fields.text({ label: "Description", multiline: true, description: "Optional" }),
})

const sectionSchema = fields.object({
  title: fields.text({ label: "Title" }),
  open: fields.checkbox({ label: "Open by default", defaultValue: false }),
  items: fields.array(fields.text({ label: "Item", multiline: true }), { label: "Items", itemLabel: (props) => props.value.slice(0, 60) }),
})

const metricSchema = fields.object({
  label: fields.text({ label: "Label" }),
  value: fields.text({ label: "Value" }),
  note: fields.text({ label: "Note" }),
})

export default config({
  storage,
  ui: {
    brand: { name: "ISE Group" },
  },
  collections: {
    news: collection({
      label: "News",
      slugField: "title",
      path: "content/news/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date" }),
        subtitle: fields.text({ label: "Subtitle" }),
        tag: fields.text({ label: "Tag" }),
        imageUrl: fields.image({
          label: "Image",
          directory: "public/images/news",
          publicPath: "/images/news/",
        }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "URL" }),
          }),
          { label: "Links", itemLabel: (p) => p.fields.label.value },
        ),
        content: fields.markdoc({ label: "Body" }),
      },
    }),
    currentMembers: collection({
      label: "Members — Current",
      slugField: "name",
      path: "content/members/current/*",
      format: { contentField: "body" },
      schema: {
        ...memberSchema,
        body: fields.markdoc({ label: "Bio" }),
      },
    }),
    alumni: collection({
      label: "Members — Alumni",
      slugField: "name",
      path: "content/members/alumni/*",
      format: { contentField: "body" },
      schema: {
        ...memberSchema,
        body: fields.markdoc({ label: "Bio" }),
      },
    }),
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        summary: fields.text({ label: "Summary", multiline: true }),
        status: fields.text({ label: "Status" }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (p) => p.value }),
      },
    }),
    publications: collection({
      label: "Publications",
      slugField: "title",
      path: "content/publications/*",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        venue: fields.text({ label: "Venue" }),
        year: fields.text({ label: "Year" }),
        authors: fields.text({ label: "Authors" }),
      },
    }),
    researchAreas: collection({
      label: "Research Areas",
      slugField: "title",
      path: "content/research-areas/*",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        subtitle: fields.text({ label: "Subtitle" }),
        description: fields.text({ label: "Description", multiline: true }),
        papers: fields.array(paperSchema, { label: "Papers", itemLabel: (p) => p.fields.title.value }),
      },
    }),
    codeAndData: collection({
      label: "Code & Data",
      slugField: "title",
      path: "content/code-and-data/*",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Code", value: "code" },
            { label: "Dataset", value: "dataset" },
          ],
          defaultValue: "code",
        }),
        link: fields.text({ label: "Link" }),
      },
    }),
    impact: collection({
      label: "Industry Impact",
      slugField: "title",
      path: "content/impact/*",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        partner: fields.text({ label: "Partner" }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (p) => p.value }),
      },
    }),
    awards: collection({
      label: "Awards",
      slugField: "title",
      path: "content/awards/*",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        organization: fields.text({ label: "Organization" }),
        year: fields.text({ label: "Year" }),
        description: fields.text({ label: "Description", multiline: true }),
      },
    }),
  },
  singletons: {
    lead: singleton({
      label: "Lead Professor",
      path: "content/lead",
      format: { contentField: "focus" },
      schema: {
        id: fields.text({ label: "ID" }),
        name: fields.text({ label: "Name" }),
        role: fields.text({ label: "Role" }),
        affiliation: fields.text({ label: "Affiliation" }),
        image: fields.image({
          label: "Photo",
          directory: "public/images/lead",
          publicPath: "/images/lead/",
        }),
        focus: fields.markdoc({ label: "Focus statement" }),
        metrics: fields.array(metricSchema, { label: "Metrics", itemLabel: (p) => p.fields.label.value }),
        roleHighlights: fields.array(fields.text({ label: "Highlight", multiline: true }), {
          label: "Role highlights",
          itemLabel: (p) => p.value.slice(0, 60),
        }),
        sections: fields.array(sectionSchema, {
          label: "Sections",
          itemLabel: (p) => p.fields.title.value,
        }),
      },
    }),
  },
})
