export interface RubricConstraint {
  criterion: string
  points: number
  description: string
  invariant: boolean
}

export interface SubmissionParameters {
  allowedFormat: string[]
  maxFileSizeMb: number
  exactFractionRequired: boolean
  gracePeriodSeconds: number
  lockAt: string
}

export interface CanvasAssignment {
  id: string
  courseId: string
  courseCode: string
  title: string
  description: string
  dueAt: string
  lockAt: string
  pointsPossible: number
  status: 'upcoming' | 'open' | 'submitted' | 'graded'
  rubric: RubricConstraint[]
  submissionParams: SubmissionParameters
  canvasUrl?: string
}

