import {
  Avatar,
  AvatarFallback,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  Container,
  LeadProfile,
  Reveal,
  Section,
} from "@/components"
import { getCurrentMembers, getGraduatedMembers, getLeadProfessor, type Member } from "@/lib/content"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function MemberCard({ member, showCurrentPosition = false }: { member: Member; showCurrentPosition?: boolean }) {
  return (
    <Card className="ice-panel h-full w-full max-w-full overflow-hidden">
      <CardContent className="w-full max-w-full space-y-2 overflow-hidden p-4">
        {/* Image + Name/Period row */}
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="size-10 shrink-0">
            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex min-w-0 items-center gap-2">
              <CardTitle className="min-w-0 flex-1 truncate text-sm">{member.name}</CardTitle>
              <Badge
                variant={member.type === "PostDoc" ? "default" : "secondary"}
                className="shrink-0 text-[0.6rem]"
              >
                {member.type}
              </Badge>
            </div>
            <CardDescription className="truncate text-xs">
              {member.period}
            </CardDescription>
          </div>
        </div>
        {/* Research Topic */}
        {member.research && (
          <p className="line-clamp-2 text-xs text-muted-foreground">{member.research}</p>
        )}
        {/* Funding */}
        {member.funding && (
          <Badge variant="outline" className="text-[0.65rem]">
            {member.funding}
          </Badge>
        )}
        {/* Current Position - as text, not badge */}
        {showCurrentPosition && member.currentPosition && (
          <p className="line-clamp-2 text-[0.7rem] text-muted-foreground">
            <span className="font-semibold">Now:</span> {member.currentPosition}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function MemberSection({
  title,
  members,
  showCurrentPosition = false,
  startDelay = 0,
}: {
  title: string
  members: Member[]
  showCurrentPosition?: boolean
  startDelay?: number
}) {
  return (
    <div className="min-w-0 space-y-4 overflow-hidden">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member, idx) => (
          <Reveal key={member.id} delayMs={startDelay + idx * 40} className="min-w-0">
            <MemberCard member={member} showCurrentPosition={showCurrentPosition} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default function MembersPage() {
  const leadProfessor = getLeadProfessor()
  const currentMembers = getCurrentMembers()
  const graduatedMembers = getGraduatedMembers()

  return (
    <div className="bg-background">
      <Section kicker="People" title="Meet the Team" bg="primary">
        <p className="max-w-2xl text-base">
          The ISE group brings together researchers, engineers, and students working on
          intelligent sensing and environmental applications.
        </p>
      </Section>

      <section className="section-white py-12 md:py-16">
        <Container>
          {/* Lead Profile - Full Width */}
          <Reveal>
            <LeadProfile profile={leadProfessor} />
          </Reveal>

          {/* Current Members */}
          <div className="mt-10">
            <MemberSection
              title="Current Members"
              members={currentMembers}
              startDelay={60}
            />
          </div>

          {/* Graduated Members */}
          <div className="mt-10">
            <MemberSection
              title="Alumni"
              members={graduatedMembers}
              showCurrentPosition
              startDelay={60}
            />
          </div>
        </Container>
      </section>

      {/* Join Section */}
      <Section kicker="Opportunities" title="Join ISE Group" bg="chart-4">
        <p className="mb-6 max-w-2xl text-base">
          We are always looking for talented researchers, PhD students, and collaborators.
          If you are interested in intelligent sensing, machine learning for environmental applications,
          or autonomous systems, we would love to hear from you.
        </p>
        <Reveal>
          <a
            href="mailto:C.Luo@Exeter.ac.uk"
            className="inline-flex items-center font-semibold text-white hover:underline"
          >
            Contact: C.Luo@Exeter.ac.uk &rarr;
          </a>
        </Reveal>
      </Section>
    </div>
  )
}
