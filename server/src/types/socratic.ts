export type ScaffoldingTier = 1 | 2 | 3 | 4

export type DomainCategory = 'math' | 'physics' | 'code' | 'chemistry' | 'general'

export interface SocraticScaffoldRequest {
  courseCode?: string
  domain?: DomainCategory
  currentProblem: string
  activeStep: string
  studentQuery?: string
  scaffoldingTier?: ScaffoldingTier
}

export interface SocraticScaffoldResponse {
  scaffoldId: string
  tier: ScaffoldingTier
  tierLabel: 'Attentional Orienting' | 'Conceptual Bridging' | 'Procedural Decomposition' | 'Verification & Closure'
  scaffoldPrompt: string
  probingQuestion: string
  nextActionCue: string
  guardrailTriggered: boolean
  guardrailExplanation?: string
  telemetryPayload: {
    domain: DomainCategory
    tier: ScaffoldingTier
    cognitiveLoadScore: number
  }
}

