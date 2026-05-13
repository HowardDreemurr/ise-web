import { collection, config, fields } from "@keystatic/core"

const useGithubStorage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github" || !!process.env.VERCEL

const storage = useGithubStorage
  ? ({
      kind: "github" as const,
      repo: "HowardDreemurr/ise-web" as const,
    })
  : ({ kind: "local" as const })

/* ---------- shared atoms --------------------------------------------------- */

const linkSchema = fields.object({
  label: fields.text({ label: "Label" }),
  href: fields.text({ label: "URL" }),
})

const externalPersonSchema = fields.object({
  name: fields.text({ label: "Name" }),
  affiliation: fields.text({ label: "Affiliation", description: "Optional" }),
})

const partnerSchema = fields.object({
  name: fields.text({ label: "Organisation" }),
  role: fields.text({ label: "Role", description: "Optional, e.g. Industry Partner" }),
})

/* ---------- collections ---------------------------------------------------- */

export default config({
  storage,
  ui: { brand: { name: "ISE Group" } },
  collections: {
    /* ---------- People (Lead | PostDoc | PhD | MPhil | Affiliated | Alumni) -- */
    people: collection({
      label: "People",
      slugField: "name",
      path: "content/people/*",
      format: { contentField: "bio" },
      schema: {
        name: fields.slug({
          name: { label: "Slug / Name", description: "Filename slug + display name" },
        }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Staff", value: "Staff" },
            { label: "PostDoc", value: "PostDoc" },
            { label: "PhD", value: "PhD" },
            { label: "MPhil", value: "MPhil" },
            { label: "Affiliated", value: "Affiliated" },
            { label: "Alumni", value: "Alumni" },
          ],
          defaultValue: "PhD",
        }),
        role: fields.text({ label: "Role / Title" }),
        affiliation: fields.text({ label: "Affiliation", description: "Optional" }),
        email: fields.text({ label: "Email", description: "Optional" }),
        photo: fields.image({
          label: "Photo",
          directory: "public/images/people",
          publicPath: "/images/people/",
        }),
        period: fields.text({
          label: "Period",
          description: "e.g. 2024 - present (current/alumni)",
        }),
        funding: fields.text({ label: "Funding", description: "Students only" }),
        currentPosition: fields.text({
          label: "Current position",
          description: "Alumni only — where they are now",
        }),
        interests: fields.array(fields.text({ label: "Interest" }), {
          label: "Research interests",
          itemLabel: (p) => p.value,
        }),
        roleHighlights: fields.array(fields.text({ label: "Highlight", multiline: true }), {
          label: "Role highlights",
          itemLabel: (p) => p.value.slice(0, 60),
        }),
        links: fields.object({
          website: fields.text({ label: "Website" }),
          scholar: fields.text({ label: "Google Scholar" }),
          orcid: fields.text({ label: "ORCID" }),
          github: fields.text({ label: "GitHub" }),
          linkedin: fields.text({ label: "LinkedIn" }),
        }),
        metrics: fields.object({
          citations: fields.integer({
            label: "Citations",
            description: "Total citation count (from Google Scholar)",
          }),
          hIndex: fields.integer({
            label: "h-index",
            description: "Google Scholar h-index",
          }),
          i10Index: fields.integer({
            label: "i10-index",
            description: "Google Scholar i10-index",
          }),
        }),
        bio: fields.markdoc({ label: "Bio" }),
      },
    }),

    /* ---------- Research Areas ----------------------------------------------- */
    researchAreas: collection({
      label: "Research Areas",
      slugField: "title",
      path: "content/research-areas/*",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        subtitle: fields.text({ label: "Subtitle" }),
        description: fields.text({ label: "Description", multiline: true }),
        order: fields.integer({ label: "Order", description: "Display order" }),
        icon: fields.text({ label: "Icon name (lucide)", description: "Optional" }),
        image: fields.image({
          label: "Hero image",
          directory: "public/images/areas",
          publicPath: "/images/areas/",
        }),
      },
    }),

    /* ---------- Publications ------------------------------------------------- */
    publications: collection({
      label: "Publications",
      slugField: "title",
      path: "content/publications/*",
      format: { contentField: "abstract" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        year: fields.integer({ label: "Year" }),
        venue: fields.text({ label: "Venue / Journal / Conference" }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Journal", value: "journal" },
            { label: "Conference", value: "conference" },
            { label: "Workshop", value: "workshop" },
            { label: "Preprint", value: "preprint" },
            { label: "Book chapter", value: "book-chapter" },
            { label: "Report", value: "report" },
          ],
          defaultValue: "journal",
        }),
        authors: fields.array(
          fields.conditional(
            fields.select({
              label: "Author type",
              options: [
                { label: "Member", value: "member" },
                { label: "External", value: "external" },
              ],
              defaultValue: "external",
            }),
            {
              member: fields.relationship({
                label: "Member",
                collection: "people",
              }),
              external: fields.text({ label: "Name" }),
            },
          ),
          {
            label: "Authors (ordered)",
            itemLabel: (props) => {
              // Conditional preview shape isn't well-typed by Keystatic — read at runtime.
              const v = props.value as unknown as { discriminant: string; value: unknown }
              return `${v.discriminant}: ${String(v.value ?? "?")}`
            },
          },
        ),
        researchAreas: fields.array(
          fields.relationship({ label: "Area", collection: "researchAreas" }),
          { label: "Research areas", itemLabel: (p) => p.value ?? "—" },
        ),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        doi: fields.text({ label: "DOI", description: "Optional" }),
        link: fields.text({ label: "Link", description: "Optional fallback URL" }),
        pdf: fields.text({ label: "PDF path", description: "Optional local path" }),
        code: fields.relationship({
          label: "Code/data resource",
          collection: "resources",
        }),
        abstract: fields.markdoc({ label: "Abstract" }),
      },
    }),

    /* ---------- Projects ----------------------------------------------------- */
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: { contentField: "summary" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        acronym: fields.text({ label: "Acronym", description: "Optional short label" }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Planned", value: "planned" },
            { label: "Under review", value: "under-review" },
            { label: "Active", value: "active" },
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
          ],
          defaultValue: "active",
        }),
        period: fields.text({
          label: "Period",
          description: "YYYY-MM range, e.g. 2024-09 - 2026-12",
        }),
        funder: fields.text({ label: "Funder" }),
        amount: fields.text({ label: "Amount", description: "Display string with currency" }),
        referenceNumber: fields.text({ label: "Reference / project number" }),
        pi: fields.relationship({ label: "PI", collection: "people" }),
        coi: fields.array(
          fields.relationship({ label: "Co-I", collection: "people" }),
          { label: "Co-Is (internal)", itemLabel: (p) => p.value ?? "—" },
        ),
        externalCoIs: fields.array(externalPersonSchema, {
          label: "External Co-Is",
          itemLabel: (p) => p.fields.name.value,
        }),
        partners: fields.array(partnerSchema, {
          label: "Industry partners",
          itemLabel: (p) => p.fields.name.value,
        }),
        researchAreas: fields.array(
          fields.relationship({ label: "Area", collection: "researchAreas" }),
          { label: "Research areas", itemLabel: (p) => p.value ?? "—" },
        ),
        relatedPubs: fields.array(
          fields.relationship({ label: "Paper", collection: "publications" }),
          { label: "Related publications", itemLabel: (p) => p.value ?? "—" },
        ),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (p) => p.value,
        }),
        summary: fields.markdoc({ label: "Summary" }),
      },
    }),

    /* ---------- Resources (code | dataset | tools) -------------------------- */
    resources: collection({
      label: "Resources",
      slugField: "title",
      path: "content/resources/*",
      format: { contentField: "description" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Code", value: "code" },
            { label: "Dataset", value: "dataset" },
            { label: "Tools", value: "tools" },
          ],
          defaultValue: "code",
        }),
        link: fields.text({ label: "Canonical URL" }),
        license: fields.text({ label: "License" }),
        version: fields.text({ label: "Version" }),
        size: fields.text({ label: "Size" }),
        relatedPubs: fields.array(
          fields.relationship({ label: "Paper", collection: "publications" }),
          { label: "Related publications", itemLabel: (p) => p.value ?? "—" },
        ),
        relatedProjs: fields.array(
          fields.relationship({ label: "Project", collection: "projects" }),
          { label: "Related projects", itemLabel: (p) => p.value ?? "—" },
        ),
        researchAreas: fields.array(
          fields.relationship({ label: "Area", collection: "researchAreas" }),
          { label: "Research areas", itemLabel: (p) => p.value ?? "—" },
        ),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (p) => p.value,
        }),
        thumbnail: fields.image({
          label: "Thumbnail",
          directory: "public/images/resources",
          publicPath: "/images/resources/",
        }),
        description: fields.markdoc({ label: "Description" }),
      },
    }),

    /* ---------- Impact (industry collaborations) ---------------------------- */
    impact: collection({
      label: "Industry Impact",
      slugField: "title",
      path: "content/impact/*",
      format: { contentField: "description" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        partner: fields.text({ label: "Partner (free text)" }),
        period: fields.text({ label: "Period" }),
        amount: fields.text({ label: "Amount", description: "Optional" }),
        people: fields.array(
          fields.relationship({ label: "Person", collection: "people" }),
          { label: "People involved", itemLabel: (p) => p.value ?? "—" },
        ),
        relatedProjs: fields.array(
          fields.relationship({ label: "Project", collection: "projects" }),
          { label: "Related projects", itemLabel: (p) => p.value ?? "—" },
        ),
        relatedPubs: fields.array(
          fields.relationship({ label: "Paper", collection: "publications" }),
          { label: "Related publications", itemLabel: (p) => p.value ?? "—" },
        ),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (p) => p.value,
        }),
        description: fields.markdoc({ label: "Description" }),
      },
    }),

    /* ---------- Awards ------------------------------------------------------- */
    awards: collection({
      label: "Awards",
      slugField: "title",
      path: "content/awards/*",
      format: { contentField: "description" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        organization: fields.text({ label: "Organisation" }),
        year: fields.integer({ label: "Year" }),
        holders: fields.array(
          fields.relationship({ label: "Holder", collection: "people" }),
          { label: "Holders", itemLabel: (p) => p.value ?? "—" },
        ),
        relatedProjs: fields.array(
          fields.relationship({ label: "Project", collection: "projects" }),
          { label: "Related projects", itemLabel: (p) => p.value ?? "—" },
        ),
        relatedPubs: fields.array(
          fields.relationship({ label: "Paper", collection: "publications" }),
          { label: "Related publications", itemLabel: (p) => p.value ?? "—" },
        ),
        description: fields.markdoc({ label: "Description" }),
      },
    }),

    /* ---------- Events (editorial | chair | keynote | workshop | ...) ------ */
    events: collection({
      label: "Events",
      slugField: "title",
      path: "content/events/*",
      format: { contentField: "description" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Keynote", value: "keynote" },
            { label: "Workshop", value: "workshop" },
            { label: "Symposium", value: "symposium" },
            { label: "Speaker series", value: "speaker-series" },
            { label: "Editorial", value: "editorial" },
            { label: "Chair", value: "chair" },
          ],
          defaultValue: "keynote",
        }),
        date: fields.date({ label: "Date" }),
        endDate: fields.date({ label: "End date", description: "Multi-day events" }),
        venue: fields.text({ label: "Venue" }),
        role: fields.text({
          label: "Role",
          description: "e.g. Speaker, Organizer, Chair, Editor",
        }),
        organizers: fields.array(
          fields.relationship({ label: "Organiser", collection: "people" }),
          { label: "Organisers", itemLabel: (p) => p.value ?? "—" },
        ),
        url: fields.text({ label: "External URL" }),
        slides: fields.text({ label: "Slides path" }),
        recurring: fields.checkbox({ label: "Recurring", defaultValue: false }),
        relatedPubs: fields.array(
          fields.relationship({ label: "Paper", collection: "publications" }),
          { label: "Related publications", itemLabel: (p) => p.value ?? "—" },
        ),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (p) => p.value,
        }),
        description: fields.markdoc({ label: "Description" }),
      },
    }),

    /* ---------- Openings (PhD / Postdoc / Industry / General) --------------- */
    openings: collection({
      label: "Openings",
      slugField: "title",
      path: "content/openings/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        type: fields.select({
          label: "Category",
          options: [
            { label: "PhD opportunity", value: "phd" },
            { label: "Postdoc / research staff", value: "postdoc" },
            { label: "Industry collaboration", value: "industry" },
            { label: "General contact", value: "general" },
          ],
          defaultValue: "phd",
        }),
        posted: fields.date({ label: "Date posted" }),
        deadline: fields.date({
          label: "Deadline",
          description: "Optional — leave empty for rolling postings",
        }),
        summary: fields.text({
          label: "Summary",
          description: "1-2 sentences shown on the list",
          multiline: true,
        }),
        link: fields.text({
          label: "External link",
          description: "Optional — typically a university page or job ad",
        }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),

    /* ---------- News --------------------------------------------------------- */
    news: collection({
      label: "News",
      slugField: "title",
      path: "content/news/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date" }),
        subtitle: fields.text({ label: "Subtitle" }),
        tag: fields.select({
          label: "Tag",
          options: [
            { label: "Award", value: "Award" },
            { label: "Paper", value: "Paper" },
            { label: "Project", value: "Project" },
            { label: "Talk", value: "Talk" },
            { label: "Media", value: "Media" },
            { label: "Milestone", value: "Milestone" },
          ],
          defaultValue: "Milestone",
        }),
        imageUrl: fields.image({
          label: "Image",
          directory: "public/images/news",
          publicPath: "/images/news/",
        }),
        icon: fields.select({
          label: "Icon (fallback when no image)",
          options: [
            { label: "— None —", value: "" },
            { label: "Award", value: "award" },
            { label: "Badge / Recognition", value: "badge-check" },
            { label: "Brain (AI/ML)", value: "brain" },
            { label: "Building (Institution)", value: "building" },
            { label: "Coins (Funding)", value: "coins" },
            { label: "CPU/GPU (Hardware)", value: "cpu" },
            { label: "Document (Paper)", value: "file-text" },
            { label: "Flame (Wildfire)", value: "flame" },
            { label: "Globe (International)", value: "globe" },
            { label: "Graduation Cap (Academic)", value: "graduation-cap" },
            { label: "Handshake (Partnership)", value: "handshake" },
            { label: "Network (Connectivity)", value: "network" },
            { label: "Plane (UAV)", value: "plane" },
            { label: "Satellite (Remote Sensing)", value: "satellite" },
            { label: "Sprout (Vegetation)", value: "sprout" },
            { label: "Trophy", value: "trophy" },
          ],
          defaultValue: "",
        }),
        relatedPeople: fields.array(
          fields.relationship({ label: "Person", collection: "people" }),
          { label: "People", itemLabel: (p) => p.value ?? "—" },
        ),
        relatedProjs: fields.array(
          fields.relationship({ label: "Project", collection: "projects" }),
          { label: "Projects", itemLabel: (p) => p.value ?? "—" },
        ),
        relatedPubs: fields.array(
          fields.relationship({ label: "Paper", collection: "publications" }),
          { label: "Publications", itemLabel: (p) => p.value ?? "—" },
        ),
        relatedAwards: fields.array(
          fields.relationship({ label: "Award", collection: "awards" }),
          { label: "Awards", itemLabel: (p) => p.value ?? "—" },
        ),
        relatedEvents: fields.array(
          fields.relationship({ label: "Event", collection: "events" }),
          { label: "Events", itemLabel: (p) => p.value ?? "—" },
        ),
        links: fields.array(linkSchema, {
          label: "External links",
          itemLabel: (p) => p.fields.label.value,
        }),
        content: fields.markdoc({ label: "Body" }),
      },
    }),
  },
})
