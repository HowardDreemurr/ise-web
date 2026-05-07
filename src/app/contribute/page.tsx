import { getCodeAndData, getResearchAreas } from "@/lib/content"
import { ContributeContent } from "./contribute-content"

export default function ContributePage() {
  const researchAreas = getResearchAreas()
  const codeAndData = getCodeAndData()
  return <ContributeContent researchAreas={researchAreas} codeAndData={codeAndData} />
}
