import { Router, type Request, type Response } from 'express'
import { randomUUID } from 'node:crypto'
import type {
  DomainCategory,
  ScaffoldingTier,
  SocraticScaffoldRequest,
  SocraticScaffoldResponse,
} from '../types/socratic.js'

export const socraticRouter = Router()

// Guardrail regex patterns detecting passive answer-dispensing requests
const ANSWER_EXTRACTION_PATTERNS = [
  /give me the answer/i,
  /what is the answer/i,
  /tell me the answer/i,
  /just do it/i,
  /do the math for me/i,
  /solve it for me/i,
  /write the code/i,
  /give the solution/i,
  /what's the solution/i,
  /show me the code/i,
]

function detectAnswerRequest(query?: string): boolean {
  if (!query) return false
  return ANSWER_EXTRACTION_PATTERNS.some((pattern) => pattern.test(query))
}

function resolveTierLabel(
  tier: ScaffoldingTier
): 'Attentional Orienting' | 'Conceptual Bridging' | 'Procedural Decomposition' | 'Verification & Closure' {
  switch (tier) {
    case 1:
      return 'Attentional Orienting'
    case 2:
      return 'Conceptual Bridging'
    case 3:
      return 'Procedural Decomposition'
    case 4:
      return 'Verification & Closure'
  }
}

// Domain-specific scaffolding trees
function generateScaffold(
  domain: DomainCategory,
  courseCode: string,
  problem: string,
  step: string,
  query: string,
  requestedTier: ScaffoldingTier,
  guardrailHit: boolean
): {
  scaffoldPrompt: string
  probingQuestion: string
  nextActionCue: string
  guardrailExplanation?: string
} {
  const normCourse = courseCode.toUpperCase()
  const normQuery = query.toLowerCase()

  // Physics 7C Scaffolds
  if (normCourse.includes('PHYS') || domain === 'physics' || normQuery.includes('damp')) {
    if (requestedTier === 1) {
      return {
        scaffoldPrompt:
          'In underdamped harmonic motion, observe the characteristic radical: the sign inside determines whether the system oscillates or dies down without bouncing.',
        probingQuestion:
          'Compare the natural frequency term ω₀² with the damping coefficient term γ²: which term is numerically larger here?',
        nextActionCue:
          'Calculate (100 - 0.04) under the radical to confirm the oscillatory condition γ < ω₀.',
        guardrailExplanation: guardrailHit
          ? 'Solution withheld to protect conceptual derivation. Let us verify the condition for oscillation first.'
          : undefined,
      }
    }
    if (requestedTier === 2) {
      return {
        scaffoldPrompt:
          'Recall the quasi-frequency relation: ω₁ = √(ω₀² − γ²). The natural oscillation frequency ω₀ is slowed down slightly by the viscous drag coefficient γ.',
        probingQuestion:
          'Why does increasing the damping drag coefficient b cause the cycle period T = 2π/ω₁ to get longer?',
        nextActionCue:
          'Write down ω₁ = √(ω₀² − γ²) and substitute your values for b, m, and k on your scratchpad.',
        guardrailExplanation: guardrailHit
          ? 'Direct frequency value withheld. Apply the quasi-frequency governing equation.'
          : undefined,
      }
    }
    if (requestedTier === 3) {
      return {
        scaffoldPrompt:
          'Let us break this into two small arithmetic operations: first compute γ = b / (2m), then square both ω₀ and γ.',
        probingQuestion:
          'If b = 0.4 kg/s and m = 1.0 kg, what is the numerical value of γ? What is γ²?',
        nextActionCue:
          'Subtract γ² from 100 and take the square root to obtain the exact angular velocity.',
      }
    }
    return {
      scaffoldPrompt:
        'Verification check: in the limit where damping drops to zero (b → 0), does your quasi-frequency formula cleanly reduce back to the simple harmonic oscillator ω₀ = √(k/m)?',
      probingQuestion:
        'Does the exponential envelope e^(−γt) correctly equal 1 at t = 0?',
      nextActionCue:
        'Differentiate your position equation x(t) once to verify the initial velocity matches v(0) = 0.',
    }
  }

  // ICS 33 / Computer Science Scaffolds
  if (normCourse.includes('ICS') || domain === 'code' || normQuery.includes('wrap') || normQuery.includes('decorator')) {
    if (requestedTier === 1) {
      return {
        scaffoldPrompt:
          'Look closely at how Python functions store their identity: introspecting `fn.__name__` or `help(fn)` reads directly from the callable’s internal metadata dictionary.',
        probingQuestion:
          'When you define `def wrapper(*args, **kwargs)` inside your decorator and return it, what does Python think the function name is if you do not copy metadata?',
        nextActionCue:
          'Check what `wrapper.__name__` returns in your REPL before applying any decorator helper.',
        guardrailExplanation: guardrailHit
          ? 'Full decorator code withheld to preserve debugging mental model. Examine metadata preservation first.'
          : undefined,
      }
    }
    if (requestedTier === 2) {
      return {
        scaffoldPrompt:
          'The `@functools.wraps(fn)` decorator is a meta-decorator: it automatically copies `__name__`, `__doc__`, and `__annotations__` from the decorated function `fn` to the inner `wrapper`.',
        probingQuestion:
          'Where in the execution flow does `@wraps(fn)` need to sit relative to `def wrapper(...)`?',
        nextActionCue:
          'Place `@functools.wraps(fn)` directly on the line immediately preceding `def wrapper(*args, **kwargs):`.',
        guardrailExplanation: guardrailHit
          ? 'Code implementation withheld. Place the wraps directive over your inner function.'
          : undefined,
      }
    }
    if (requestedTier === 3) {
      return {
        scaffoldPrompt:
          'Decompose the memoization lookup into two distinct branches: (1) check if the argument tuple is already a key in your cache dictionary, and (2) compute and store only on cache misses.',
        probingQuestion:
          'What happens if you try to pass an unhashable argument like a mutable `list` into your cache key?',
        nextActionCue:
          'Write: `if args in cache: return cache[args]` as the first statement inside wrapper.',
      }
    }
    return {
      scaffoldPrompt:
        'Verification step: write an assertion checking `assert original_fn.__name__ == decorated_fn.__name__` to ensure docstring and debugging tools can inspect the wrapped callable.',
      probingQuestion:
        'Does your wrapper handle both positional `*args` and keyword `**kwargs` transparently?',
      nextActionCue:
        'Run your unit tests with pytest or the interactive interpreter to verify docstring introspection.',
    }
  }

  // Math 2B / Calculus Scaffolds
  if (normCourse.includes('MATH') || domain === 'math' || normQuery.includes('integral') || normQuery.includes('parts')) {
    if (requestedTier === 1) {
      return {
        scaffoldPrompt:
          'Focus on the structure of the integrand: it consists of an algebraic term multiplied by a transcendental term.',
        probingQuestion:
          'According to the LIATE hierarchy (Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential), which factor should be selected as u to simplify upon differentiation?',
        nextActionCue:
          'Assign the polynomial factor to u and the remaining differential factor to dv.',
        guardrailExplanation: guardrailHit
          ? 'Direct integration result withheld. Let us establish the u and dv assignments first.'
          : undefined,
      }
    }
    if (requestedTier === 2) {
      return {
        scaffoldPrompt:
          'Remember the integration by parts formula derived from the product rule: ∫ u dv = u·v − ∫ v du.',
        probingQuestion:
          'When you differentiate u = x, what is du? When you integrate dv, what is v?',
        nextActionCue:
          'Write the four-part grid: u = ..., du = ..., dv = ..., v = ... in your notebook.',
        guardrailExplanation: guardrailHit
          ? 'Final evaluated integral withheld. Complete the four-part integration grid.'
          : undefined,
      }
    }
    if (requestedTier === 3) {
      return {
        scaffoldPrompt:
          'Break this into two single-step evaluations: First, calculate the boundary evaluation [u·v] from a to b. Second, compute the remaining simple integral ∫ v du.',
        probingQuestion:
          'Is the new integral ∫ v du significantly simpler to integrate than the original problem?',
        nextActionCue:
          'Substitute your du and v into the second integral term and evaluate the boundary constants.',
      }
    }
    return {
      scaffoldPrompt:
        'Self-verification: differentiate your final integrated expression using the product rule to confirm it reproduces the original integrand exactly.',
      probingQuestion:
        'Did you remember to distribute the negative sign to all terms inside the secondary integral?',
      nextActionCue:
        'Check the boundary subtraction: F(b) − F(a), paying special attention to signs at x = 0.',
    }
  }

  // General Domain Adaptive Scaffold
  const tierLabels = [
    'attentional orienting',
    'conceptual bridging',
    'procedural decomposition',
    'verification',
  ]
  return {
    scaffoldPrompt: `Active focus on ${step || problem || 'current concept'}. Let us use ${tierLabels[requestedTier - 1]} to structure the next step.`,
    probingQuestion:
      'What is the primary constraint or definition governing this step of the derivation?',
    nextActionCue:
      'Isolate the single unknown variable or condition before attempting to solve the entire block.',
    guardrailExplanation: guardrailHit
      ? 'Direct solution withheld to support independent problem solving. Take this micro-step first.'
      : undefined,
  }
}

// Scaffold endpoint
socraticRouter.post('/scaffold', (req: Request, res: Response) => {
  const body: SocraticScaffoldRequest = req.body || {}

  const courseCode = body.courseCode || 'MATH-2B'
  const domain: DomainCategory = body.domain || 'math'
  const currentProblem = body.currentProblem || 'Active problem'
  const activeStep = body.activeStep || 'Current step'
  const studentQuery = body.studentQuery || ''
  const requestedTier: ScaffoldingTier = body.scaffoldingTier || 1

  const guardrailHit = detectAnswerRequest(studentQuery)

  const scaffold = generateScaffold(
    domain,
    courseCode,
    currentProblem,
    activeStep,
    studentQuery,
    requestedTier,
    guardrailHit
  )

  const response: SocraticScaffoldResponse = {
    scaffoldId: randomUUID(),
    tier: requestedTier,
    tierLabel: resolveTierLabel(requestedTier),
    scaffoldPrompt: scaffold.scaffoldPrompt,
    probingQuestion: scaffold.probingQuestion,
    nextActionCue: scaffold.nextActionCue,
    guardrailTriggered: guardrailHit,
    guardrailExplanation: scaffold.guardrailExplanation,
    telemetryPayload: {
      domain,
      tier: requestedTier,
      cognitiveLoadScore: guardrailHit ? 7.8 : 3.5 + requestedTier * 0.8,
    },
  }

  res.status(200).json(response)
})
