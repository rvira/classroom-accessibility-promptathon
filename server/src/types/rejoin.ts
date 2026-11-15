export interface RejoinRequest {
  driftQuery?: string
  lastRecallTimestamp?: string
  courseCode?: string
}

export interface CatchUpCheckpoint {
  stepNumber: number
  title: string
  concept: string
  actionableDirective: string
  completed: boolean
}

export interface RejoinResponse {
  success: boolean
  reassurance: string
  syncedTimestamp: string
  audioTimestamp: string
  detectedContext: string
  checkpoints: CatchUpCheckpoint[]
  immediateActionCue: string
  currentHorizonDirective: string
  penaltyFreeConfirmation: boolean
}

