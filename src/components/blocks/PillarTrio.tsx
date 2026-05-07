import { PillarCard, type Pillar } from "./PillarCard"
import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"

type PillarTrioProps = {
  pillars: Pillar[]
}

export function PillarTrio({ pillars }: PillarTrioProps) {
  return (
    <Container>
      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        {pillars.map((pillar, idx) => (
          <Reveal key={pillar.id} delayMs={idx * 60}>
            <PillarCard pillar={pillar} />
          </Reveal>
        ))}
      </div>
    </Container>
  )
}
