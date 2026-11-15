import { Router, type Request, type Response } from 'express'
import { courseHorizons, seedCheckpoints, seedLectureHorizon } from '../data/seedData.js'
import type { CheckpointAdvanceRequest, CheckpointAdvanceResponse, HorizonState, LectureCheckpoint } from '../types/lecture.js'

export const lectureRouter = Router()

// Mutable in-memory store for all courses
const activeCourseData: Record<string, { horizon: HorizonState; checkpoints: LectureCheckpoint[] }> = JSON.parse(
  JSON.stringify(courseHorizons)
)

let activeCourseKey = 'MATH-2B'

// Reset helper (useful for testing)
export function resetLectureState() {
  activeCourseKey = 'MATH-2B'
  for (const key of Object.keys(courseHorizons)) {
    activeCourseData[key] = JSON.parse(JSON.stringify(courseHorizons[key]))
  }
}

function resolveCourseKey(raw?: unknown): string {
  if (!raw || typeof raw !== 'string') return activeCourseKey
  const normalized = raw.trim().toUpperCase().replace(/\s+/g, '-')
  if (activeCourseData[normalized]) return normalized
  // Try matching substring like 'PHYS', 'MATH', 'CHEM', 'ICS'
  const match = Object.keys(activeCourseData).find((k) => k.includes(normalized) || normalized.includes(k))
  return match || activeCourseKey
}

// GET /api/lecture/courses
lectureRouter.get('/courses', (_req: Request, res: Response) => {
  const courses = Object.keys(activeCourseData).map((key) => ({
    roomCode: key,
    course: activeCourseData[key].horizon.course,
    lectureTitle: activeCourseData[key].horizon.lectureTitle,
    totalSteps: activeCourseData[key].horizon.totalSteps,
    activeStepNumber: activeCourseData[key].horizon.activeStepNumber,
  }))

  res.status(200).json({
    totalCourses: courses.length,
    activeCourseRoomCode: activeCourseKey,
    courses,
  })
})

// GET /api/lecture/current
lectureRouter.get('/current', (req: Request, res: Response) => {
  const targetKey = resolveCourseKey(req.query.course || req.query.roomCode)
  const currentData = activeCourseData[targetKey] || activeCourseData['MATH-2B']

  const activeCheckpoint =
    currentData.checkpoints.find((c) => c.status === 'active') || currentData.checkpoints[0]

  res.status(200).json({
    course: currentData.horizon.course,
    lectureTitle: currentData.horizon.lectureTitle,
    roomCode: currentData.horizon.roomCode,
    activeStepNumber: currentData.horizon.activeStepNumber,
    totalSteps: currentData.horizon.totalSteps,
    progressPercent: currentData.horizon.progressPercent,
    horizon: currentData.horizon.horizon,
    activeCheckpoint,
    checkpointList: currentData.checkpoints,
  })
})

// GET /api/lecture/checkpoints
lectureRouter.get('/checkpoints', (req: Request, res: Response) => {
  const targetKey = resolveCourseKey(req.query.course || req.query.roomCode)
  const currentData = activeCourseData[targetKey] || activeCourseData['MATH-2B']

  res.status(200).json({
    course: currentData.horizon.course,
    roomCode: currentData.horizon.roomCode,
    total: currentData.checkpoints.length,
    activeStep: currentData.horizon.activeStepNumber,
    checkpoints: currentData.checkpoints,
  })
})

// POST /api/lecture/checkpoint
lectureRouter.post('/checkpoint', (req: Request, res: Response) => {
  const body = req.body as CheckpointAdvanceRequest & { course?: string }

  if (!body || typeof body.stepNumber !== 'number') {
    return res.status(400).json({
      error: 'Invalid request: stepNumber (number 1..4) is required',
    })
  }

  const targetKey = resolveCourseKey(body.course)
  const currentData = activeCourseData[targetKey]
  const targetStep = body.stepNumber

  if (targetStep < 1 || targetStep > currentData.checkpoints.length) {
    return res.status(400).json({
      error: `Invalid stepNumber ${targetStep}. Must be between 1 and ${currentData.checkpoints.length}`,
    })
  }

  const prevStep = currentData.horizon.activeStepNumber

  // Update checkpoints status
  currentData.checkpoints = currentData.checkpoints.map((chk) => {
    if (chk.stepNumber < targetStep) {
      return { ...chk, status: 'completed' }
    }
    if (chk.stepNumber === targetStep) {
      return { ...chk, status: 'active' }
    }
    return { ...chk, status: 'upcoming' }
  })

  // Update horizon state according to the new step
  currentData.horizon.activeStepNumber = targetStep
  currentData.horizon.progressPercent = Math.round((targetStep / currentData.checkpoints.length) * 100)

  // Math 2B custom progression logic
  if (targetKey === 'MATH-2B') {
    if (targetStep === 1) {
      currentData.horizon.horizon.antecedent = {
        label: 'Context Anchor (Antecedent State)',
        statement: 'Initial problem formulation: Integral of composite function 2x*sqrt(2x+1).',
        technicalDerivation: {
          label: 'Problem Setup',
          math: '∫₀⁴ 2x·√(2x + 1) dx',
          annotation: 'Observe composite radical term (2x + 1).',
        },
      }
      currentData.horizon.horizon.directive = {
        label: 'Active Directive (Focal Target)',
        statement: 'Identify inner function and establish parameter u = 2x + 1; compute du = 2 dx.',
        technicalDerivation: {
          label: 'Differential Derivation',
          math: 'u = 2x + 1 ⟹ du = 2 dx ⟹ dx = du / 2',
          annotation: 'Isolate dx so integrand can be cleanly substituted.',
        },
      }
    } else if (targetStep === 2) {
      currentData.horizon.horizon.antecedent = {
        label: 'Context Anchor (Antecedent State)',
        statement: 'Definite integration via substitution. Preceding step established parameter u = 2x + 1.',
        technicalDerivation: {
          label: 'Board State · Step 1',
          math: '∫₀⁴ 2x·√(2x + 1) dx  ⟶  u = 2x + 1,  du = 2 dx',
          annotation: 'Inner function isolated; dx replaced by (1/2) du.',
        },
      }
      currentData.horizon.horizon.directive = {
        label: 'Active Directive (Focal Target)',
        statement: 'Transform integration limits into u-domain: x = 0 ⟶ u = 1; x = 4 ⟶ u = 9.',
        technicalDerivation: {
          label: 'Board State · Step 2',
          math: 'x = 0  ⟶  u = 2(0) + 1 = 1\nx = 4  ⟶  u = 2(4) + 1 = 9',
          annotation: 'Limits transformed directly. Notice u strictly increases on [0, 4].',
        },
      }
    } else if (targetStep === 3) {
      currentData.horizon.horizon.antecedent = {
        label: 'Context Anchor (Antecedent State)',
        statement: 'Limits transformed to [1, 9] in u-domain. Integral rewritten entirely in terms of u.',
        technicalDerivation: {
          label: 'Rewritten Integrand',
          math: '∫₁⁹ ((u - 1)/2) · √u · (1/2) du = (1/4) ∫₁⁹ (u^(3/2) - u^(1/2)) du',
          annotation: 'Limits are now [1, 9]. Integrand expanded for power rule.',
        },
      }
      currentData.horizon.horizon.directive = {
        label: 'Active Directive (Focal Target)',
        statement: 'Integrate polynomial powers of u using reverse power rule: ∫ u^n du = (u^(n+1))/(n+1).',
        technicalDerivation: {
          label: 'Anti-derivatives',
          math: '(1/4) [ (2/5) u^(5/2) - (2/3) u^(3/2) ]₁⁹',
          annotation: 'Evaluate anti-derivative at brackets before subtracting bounds.',
        },
      }
    } else if (targetStep === 4) {
      currentData.horizon.horizon.antecedent = {
        label: 'Context Anchor (Antecedent State)',
        statement: 'Anti-derivative computed: (1/4) [ (2/5) u^(5/2) - (2/3) u^(3/2) ] evaluated from 1 to 9.',
        technicalDerivation: {
          label: 'Evaluated Anti-derivative',
          math: 'F(9) - F(1)  where F(u) = (1/10) u^(5/2) - (1/6) u^(3/2)',
          annotation: 'Prepare exact fractional arithmetic.',
        },
      }
      currentData.horizon.horizon.directive = {
        label: 'Active Directive (Focal Target)',
        statement: 'Subtract lower bound from upper bound. Format answer as irreducible fraction and submit to Canvas.',
        technicalDerivation: {
          label: 'Final Evaluation',
          math: 'F(9) = 243/10 - 9/2 = 99/5\nF(1) = 1/10 - 1/6 = -1/15\nAnswer = 99/5 - (-1/15) = 298/15',
          annotation: 'Final exact fraction: 298/15. Canvas check passes.',
        },
      }
    }
  }

  const activeCheckpoint =
    currentData.checkpoints.find((c) => c.status === 'active') || currentData.checkpoints[0]

  const response: CheckpointAdvanceResponse = {
    success: true,
    previousStep: prevStep,
    currentStep: targetStep,
    activeCheckpoint,
    updatedHorizon: currentData.horizon,
    message: `Checkpoint successfully advanced to Step ${targetStep}: ${activeCheckpoint.title}`,
  }

  res.status(200).json(response)
})
