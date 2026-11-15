import { Router, type Request, type Response } from 'express'
import type { CatchUpCheckpoint, RejoinRequest, RejoinResponse } from '../types/rejoin.js'

export const rejoinRouter = Router()

// Safe multi-course resynchronization algorithm
function computeCatchUpPlan(query?: string, courseCode?: string, _lastRecallTimestamp?: string): {
  detectedContext: string
  checkpoints: CatchUpCheckpoint[]
  immediateActionCue: string
  currentHorizonDirective: string
} {
  const normalized = (query || '').toLowerCase()
  const course = (courseCode || '').toUpperCase()

  // Physics 7C catch-up logic
  if (course.includes('PHYS') || normalized.includes('damping') || normalized.includes('oscillation') || normalized.includes('omega') || normalized.includes('underdamped')) {
    return {
      detectedContext: 'Dr. Vance is deriving the underdamped quasi-frequency ω₁ = √(ω₀² − γ²). Preceding step confirmed γ < ω₀, indicating the system will oscillate while exponentially decaying.',
      checkpoints: [
        {
          stepNumber: 1,
          title: 'Force Balance Established',
          concept: 'ẍ + 2γẋ + ω₀²x = 0 with γ = b/(2m) = 0.2 rad/s',
          actionableDirective: 'Verify linear drag term opposes velocity direction.',
          completed: true,
        },
        {
          stepNumber: 2,
          title: 'Quasi-frequency Calculation',
          concept: 'ω₁ = √(100 − 0.04) ≈ 9.998 rad/s',
          actionableDirective: 'Substitute numerical values into characteristic radical.',
          completed: false,
        },
        {
          stepNumber: 3,
          title: 'Boundary Value Fitting',
          concept: 'Apply x(0)=x₀ and v(0)=0 to find phase angle φ.',
          actionableDirective: 'Express x(t) = A₀·e^(−γt)·cos(ω₁t + φ).',
          completed: false,
        },
      ],
      immediateActionCue: 'Write down ω₁ = √(ω₀² − γ²) on your worksheet; the class is now evaluating the decay envelope.',
      currentHorizonDirective: 'Calculate the damped oscillation frequency ω₁ = √(ω₀² − γ²) and formulate position equation.',
    }
  }

  // ICS 33 Python metaprogramming catch-up logic
  if (course.includes('ICS') || normalized.includes('decorator') || normalized.includes('memoiz') || normalized.includes('closure') || normalized.includes('wraps')) {
    return {
      detectedContext: 'Professor Pattis just demonstrated why @functools.wraps is essential. The class is wrapping the memoization cache lookup inside the inner function.',
      checkpoints: [
        {
          stepNumber: 1,
          title: 'Closure Wrapper Built',
          concept: 'Inner wrapper captures outer cache dictionary.',
          actionableDirective: 'Define def wrapper(*args, **kwargs).',
          completed: true,
        },
        {
          stepNumber: 2,
          title: 'Metadata Preservation',
          concept: 'Apply @wraps(fn) above inner function.',
          actionableDirective: 'Copy original docstring and __name__ attributes.',
          completed: false,
        },
        {
          stepNumber: 3,
          title: 'Cache Lookup & Delegation',
          concept: 'Check if args in cache; if missing, evaluate fn(*args).',
          actionableDirective: 'Return cache[args] with O(1) complexity.',
          completed: false,
        },
      ],
      immediateActionCue: 'Add @wraps(fn) directly above your inner wrapper function to preserve test introspection.',
      currentHorizonDirective: 'Apply @functools.wraps(fn) to decorator wrapper and implement O(1) dictionary key lookup.',
    }
  }

  // Chem 1A Hess's Law catch-up logic
  if (course.includes('CHEM') || normalized.includes('enthalpy') || normalized.includes('hess') || normalized.includes('combustion') || normalized.includes('delta h')) {
    return {
      detectedContext: 'Prof. Arasasingham is reversing reaction (3) for the combustion of methane. Since we reverse the reaction direction, the sign of ΔH flips from −890.3 kJ to +890.3 kJ.',
      checkpoints: [
        {
          stepNumber: 1,
          title: 'Target Equation Mapped',
          concept: 'Target: C(s) + 2 H₂(g) ⟶ CH₄(g)',
          actionableDirective: 'Identify intermediate reactions containing species.',
          completed: true,
        },
        {
          stepNumber: 2,
          title: 'Directional Inversion',
          concept: 'Reverse reaction (3): CO₂ + 2 H₂O ⟶ CH₄ + 2 O₂, ΔH = +890.3 kJ',
          actionableDirective: 'Flip sign of enthalpy value.',
          completed: false,
        },
        {
          stepNumber: 3,
          title: 'Algebraic Summation',
          concept: 'Sum (1) + 2×(2) + reversed (3) to cancel spectator species.',
          actionableDirective: 'Ensure CO₂ and H₂O cancel on opposite sides.',
          completed: false,
        },
      ],
      immediateActionCue: 'Write +890.3 kJ next to the reversed methane combustion reaction on your worksheet.',
      currentHorizonDirective: 'Reverse reaction (3) so CH₄ appears on product side and sum enthalpies.',
    }
  }

  // Math 2B substitution parameter drift
  if (normalized.includes('substitut') || normalized.includes('what is u') || normalized.includes('parameter') || normalized.includes('du') || normalized.includes('dx')) {
    return {
      detectedContext: 'You drifted during the initial substitution selection. Professor Chen established u = 2x + 1 and du = 2 dx.',
      checkpoints: [
        {
          stepNumber: 1,
          title: 'Parameter Identification',
          concept: 'u = 2x + 1; differential dx = (1/2) du',
          actionableDirective: 'Substitute (2x + 1) with u and replace dx with (1/2) du.',
          completed: true,
        },
        {
          stepNumber: 2,
          title: 'Boundary Transformation',
          concept: 'Definite integral requires converting x-bounds [0, 4] to u-bounds [1, 9].',
          actionableDirective: 'Plug x=0 and x=4 into u = 2x + 1.',
          completed: false,
        },
      ],
      immediateActionCue: 'Write u = 2x + 1 at the top of your sheet; the class is now calculating new limits u(0)=1 and u(4)=9.',
      currentHorizonDirective: 'Transform integration limits into u-domain: x = 0 ⟶ u = 1; x = 4 ⟶ u = 9.',
    }
  }

  // Math 2B power rule / anti-derivative drift
  if (normalized.includes('power') || normalized.includes('antideriv') || normalized.includes('evaluat') || normalized.includes('step 3')) {
    return {
      detectedContext: 'You caught the boundary conversion and are looking forward to anti-differentiation.',
      checkpoints: [
        {
          stepNumber: 2,
          title: 'Boundary Limits Set',
          concept: 'Integral transformed into ∫₁⁹ (1/4)(u^(3/2) - u^(1/2)) du',
          actionableDirective: 'Limits are fixed at [1, 9]; do not change back to x.',
          completed: true,
        },
        {
          stepNumber: 3,
          title: 'Direct u-Integration',
          concept: 'Reverse power rule on fractional exponents',
          actionableDirective: 'Integrate u^(3/2) to (2/5)u^(5/2) and u^(1/2) to (2/3)u^(3/2).',
          completed: false,
        },
      ],
      immediateActionCue: 'Follow along with the reverse power rule; keep your bounds [1, 9] in the bracket notation.',
      currentHorizonDirective: 'Integrate polynomial powers of u using reverse power rule: ∫ u^n du = (u^(n+1))/(n+1).',
    }
  }

  // Default Math 2B bounds drift
  return {
    detectedContext: 'Professor Chen just substituted u = 2x + 1. Instead of solving the whole integral and substituting back later, the class is changing the integration limits right now: when x = 0, u = 1; when x = 4, u = 9.',
    checkpoints: [
      {
        stepNumber: 1,
        title: 'Substitution Chosen',
        concept: 'Inner composite expression u = 2x + 1, du = 2 dx',
        actionableDirective: 'Inner radical simplified into √u',
        completed: true,
      },
      {
        stepNumber: 2,
        title: 'Limit Transformation',
        concept: 'Lower bound u(0) = 2(0)+1 = 1; Upper bound u(4) = 2(4)+1 = 9',
        actionableDirective: 'Write down the new limits [1, 9] directly on your integral',
        completed: false,
      },
      {
        stepNumber: 3,
        title: 'Direct Integration Ahead',
        concept: 'Power rule in u-space without back-substitution',
        actionableDirective: 'Prepare to apply bracket evaluation [F(u)]₁⁹',
        completed: false,
      },
    ],
    immediateActionCue: 'Your immediate task: Write down the new limits [1, 9] on your worksheet.',
    currentHorizonDirective: 'Transform integration limits into u-domain: x = 0 ⟶ u = 1; x = 4 ⟶ u = 9.',
  }
}

// POST /api/rejoin
rejoinRouter.post('/', (req: Request, res: Response) => {
  const body = (req.body || {}) as RejoinRequest
  const query = body.driftQuery || ''
  const courseCode = body.courseCode
  const lastRecall = body.lastRecallTimestamp || '00:18:00'

  const plan = computeCatchUpPlan(query, courseCode, lastRecall)

  const response: RejoinResponse = {
    success: true,
    reassurance: "Don't worry: you are completely safe to rejoin. Zero penalties applied.",
    syncedTimestamp: new Date().toISOString(),
    audioTimestamp: '00:32:45',
    detectedContext: plan.detectedContext,
    checkpoints: plan.checkpoints,
    immediateActionCue: plan.immediateActionCue,
    currentHorizonDirective: plan.currentHorizonDirective,
    penaltyFreeConfirmation: true,
  }

  res.status(200).json(response)
})
