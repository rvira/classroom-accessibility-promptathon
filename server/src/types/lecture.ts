export interface HorizonState {
  course: string
  lectureTitle: string
  roomCode: string
  activeStepNumber: number
  totalSteps: number
  progressPercent: number
  horizon: {
    antecedent: {
      label: string
      statement: string
      technicalDerivation?: {
        label: string
        math: string
        annotation?: string
      }
    }
    directive: {
      label: string
      statement: string
      technicalDerivation?: {
        label: string
        math: string
        annotation?: string
      }
    }
    constraints: {
      label: string
      statement: string
      canvasDeadlineSync?: string
      technicalDerivation?: {
        label: string
        math: string
        annotation?: string
      }
    }
  }
}

export interface LectureCheckpoint {
  id: string
  stepNumber: number
  title: string
  description: string
  status: 'completed' | 'active' | 'upcoming'
  timeEstimate: string
  audioTimestamp: string
}

export interface CheckpointAdvanceRequest {
  stepNumber: number
  reason?: string
}

export interface CheckpointAdvanceResponse {
  success: boolean
  previousStep: number
  currentStep: number
  activeCheckpoint: LectureCheckpoint
  updatedHorizon: HorizonState
  message: string
}

