/**
 * Bullseye Classroom API Client
 * 
 * Provides unified access to the Bullseye Backend API & Real-Time Sync Service.
 * Implements graceful local mock fallback if the backend server is unreachable,
 * guaranteeing seamless operation in both standalone (demo/offline) and fullstack modes.
 */

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ||
  'http://localhost:4000'

const WS_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_WS_URL) ||
  'ws://localhost:4000/ws/live'

export interface HealthStatus {
  status: string
  uptimeSeconds: number
  version: string
  timestamp: string
  service: string
  standards?: {
    wcag: string
    cognitiveLoadTarget: string
    stigmaFreeDefault: boolean
  }
}

export interface ScheduledClass {
  id: string
  code: string
  title: string
  time: string
  location: string
  topic: string
  isLive: boolean
  canvasSync: string
  roomCode?: string
  instructor?: string
}

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
  activeCheckpoint?: {
    id: string
    stepNumber: number
    title: string
    description: string
    status: 'completed' | 'active' | 'upcoming'
    timeEstimate: string
    audioTimestamp: string
  }
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
  rubric: Array<{
    criterion: string
    points: number
    description: string
    invariant: boolean
  }>
  submissionParams: {
    allowedFormat: string[]
    maxFileSizeMb: number
    exactFractionRequired: boolean
    gracePeriodSeconds: number
    lockAt: string
  }
  canvasUrl?: string
}

export interface EdstemQuestion {
  id: string
  author: string
  timeAgo: string
  question: string
  stepTag: string
  isEndorsed: boolean
  courseCode?: string
  upvotes?: number
  answer?: {
    author: string
    text: string
  }
}

export interface RejoinResponse {
  success: boolean
  reassurance: string
  syncedTimestamp: string
  audioTimestamp: string
  detectedContext: string
  checkpoints: Array<{
    stepNumber: number
    title: string
    concept: string
    actionableDirective: string
    completed: boolean
  }>
  immediateActionCue: string
  currentHorizonDirective: string
  penaltyFreeConfirmation: boolean
}

// Local mock data fallbacks for full multi-course schedule
export const fallbackSchedule: Record<string, ScheduledClass[]> = {
  'Mon Nov 10': [
    {
      id: 'm1',
      code: 'MATH 2B',
      title: 'Calculus II · Lecture 12',
      time: '10:00 AM – 10:50 AM',
      location: 'Rowland Hall 101',
      topic: 'Introduction to Substitution Rule',
      isLive: false,
      canvasSync: 'Homework 3 Graded',
      roomCode: 'MATH-2B',
      instructor: 'Prof. Chen',
    },
    {
      id: 'm2',
      code: 'CHEM 1A',
      title: 'General Chemistry · Lecture 16',
      time: '11:00 AM – 11:50 AM',
      location: 'Rowland Hall 100',
      topic: "Thermochemistry: Enthalpy & Hess's Law",
      isLive: false,
      canvasSync: 'Pre-Lab 6 Graded',
      roomCode: 'CHEM-1A',
      instructor: 'Prof. Arasasingham',
    },
    {
      id: 'm3',
      code: 'PHYS 7C',
      title: 'Classical Mechanics · Lecture 10',
      time: '1:00 PM – 2:20 PM',
      location: 'PSLH 120',
      topic: 'Simple Harmonic Motion & Energy',
      isLive: false,
      canvasSync: 'Lab 2 Submitted',
      roomCode: 'PHYS-7C',
      instructor: 'Dr. Vance',
    },
    {
      id: 'm4',
      code: 'BIO 93',
      title: 'DNA to Organisms · Lecture 14',
      time: '3:00 PM – 3:50 PM',
      location: 'BS3 1200',
      topic: 'Cellular Respiration: Glycolysis',
      isLive: false,
      canvasSync: 'Reading Quiz 7 Completed',
      roomCode: 'BIO-93',
      instructor: 'Prof. Kadandale',
    },
  ],
  'Tue Nov 11': [
    {
      id: 't1',
      code: 'STATS 67',
      title: 'Intro to Probability & Stats for CS',
      time: '10:00 AM – 11:20 AM',
      location: 'DBH 1200',
      topic: "Bayes' Theorem & Law of Total Probability",
      isLive: false,
      canvasSync: 'Homework 4 Submitted',
      roomCode: 'STATS-67',
      instructor: 'Prof. Armstrong',
    },
    {
      id: 't2',
      code: 'COMPSCI 161',
      title: 'Design and Analysis of Algorithms',
      time: '1:00 PM – 2:20 PM',
      location: 'DBH 1100',
      topic: 'Divide and Conquer: Master Theorem',
      isLive: false,
      canvasSync: 'Assignment 3 Graded',
      roomCode: 'CS-161',
      instructor: 'Prof. Eppstein',
    },
    {
      id: 't3',
      code: 'ICS 33',
      title: 'Intermediate Programming in Python',
      time: '3:30 PM – 4:50 PM',
      location: 'DBH 1100',
      topic: 'Object-Oriented Design & Generators',
      isLive: false,
      canvasSync: 'Quiz 3 Completed',
      roomCode: 'ICS-33',
      instructor: 'Prof. Pattis',
    },
  ],
  'Wed Nov 12': [
    {
      id: 'w1',
      code: 'MATH 2B',
      title: 'Calculus II · Lecture 13',
      time: '10:00 AM – 10:50 AM',
      location: 'Rowland Hall 101',
      topic: 'Indefinite Integrals with Substitution',
      isLive: false,
      canvasSync: 'Worksheet 13 Submitted',
      roomCode: 'MATH-2B',
      instructor: 'Prof. Chen',
    },
    {
      id: 'w2',
      code: 'CHEM 1A',
      title: 'General Chemistry · Lecture 17',
      time: '11:00 AM – 11:50 AM',
      location: 'Rowland Hall 100',
      topic: 'Calorimetry & Specific Heat Capacity',
      isLive: false,
      canvasSync: 'Lab Report 5 Submitted',
      roomCode: 'CHEM-1A',
      instructor: 'Prof. Arasasingham',
    },
    {
      id: 'w3',
      code: 'PHYS 7C',
      title: 'Classical Mechanics · Lecture 11',
      time: '1:00 PM – 2:20 PM',
      location: 'PSLH 120',
      topic: 'Driven Oscillations & Resonance',
      isLive: false,
      canvasSync: 'Homework 4 Due',
      roomCode: 'PHYS-7C',
      instructor: 'Dr. Vance',
    },
    {
      id: 'w4',
      code: 'BIO 93',
      title: 'DNA to Organisms · Lecture 15',
      time: '3:00 PM – 3:50 PM',
      location: 'BS3 1200',
      topic: 'The Citric Acid Cycle & Electron Transport',
      isLive: false,
      canvasSync: 'Discussion Worksheet Submitted',
      roomCode: 'BIO-93',
      instructor: 'Prof. Kadandale',
    },
    {
      id: 'w5',
      code: 'ICS 33',
      title: 'Intermediate Programming Discussion',
      time: '5:00 PM – 5:50 PM',
      location: 'ICS 174',
      topic: 'Recursive Data Structures Practice',
      isLive: false,
      canvasSync: 'No submission required',
      roomCode: 'ICS-33',
      instructor: 'Prof. Pattis',
    },
  ],
  'Thu Nov 13': [
    {
      id: 'th1',
      code: 'STATS 67',
      title: 'Intro to Probability & Stats for CS',
      time: '10:00 AM – 11:20 AM',
      location: 'DBH 1200',
      topic: 'Discrete Random Variables & Poisson Distribution',
      isLive: false,
      canvasSync: 'Lab 3 Graded',
      roomCode: 'STATS-67',
      instructor: 'Prof. Armstrong',
    },
    {
      id: 'th2',
      code: 'COMPSCI 161',
      title: 'Design and Analysis of Algorithms',
      time: '1:00 PM – 2:20 PM',
      location: 'DBH 1100',
      topic: 'Greedy Heuristics & Minimum Spanning Trees',
      isLive: false,
      canvasSync: 'Homework 4 Open',
      roomCode: 'CS-161',
      instructor: 'Prof. Eppstein',
    },
    {
      id: 'th3',
      code: 'ICS 33',
      title: 'Intermediate Programming in Python',
      time: '3:30 PM – 4:50 PM',
      location: 'DBH 1100',
      topic: 'Operator Overloading & Iterators',
      isLive: false,
      canvasSync: 'Quiz 4 Prep Available',
      roomCode: 'ICS-33',
      instructor: 'Prof. Pattis',
    },
  ],
  'Fri Nov 14 (Today)': [
    {
      id: 'f1',
      code: 'MATH 2B',
      title: 'Calculus II · Lecture 14',
      time: '10:00 AM – 10:50 AM',
      location: 'Rowland Hall 101',
      topic: 'Definite Integrals via u-substitution',
      isLive: true,
      canvasSync: 'Lab 14 Worksheet (Due 10:50 AM)',
      roomCode: 'MATH-2B',
      instructor: 'Prof. Chen',
    },
    {
      id: 'f2',
      code: 'CHEM 1A',
      title: 'General Chemistry · Lecture 18',
      time: '11:00 AM – 11:50 AM',
      location: 'Rowland Hall 100',
      topic: 'Standard Enthalpies of Formation & Hess Cycles',
      isLive: false,
      canvasSync: 'Worksheet 6 Due Today 11:50 AM',
      roomCode: 'CHEM-1A',
      instructor: 'Prof. Arasasingham',
    },
    {
      id: 'f3',
      code: 'PHYS 7C',
      title: 'Classical Mechanics · Lecture 12',
      time: '1:00 PM – 2:20 PM',
      location: 'PSLH 120',
      topic: 'Damped Harmonic Oscillations & Phase Space',
      isLive: false,
      canvasSync: 'Lab 3 Opens at 1:00 PM',
      roomCode: 'PHYS-7C',
      instructor: 'Dr. Vance',
    },
    {
      id: 'f4',
      code: 'BIO 93',
      title: 'DNA to Organisms · Lecture 16',
      time: '3:00 PM – 3:50 PM',
      location: 'BS3 1200',
      topic: 'Chemiosmosis & ATP Synthase Mechanism',
      isLive: false,
      canvasSync: 'Chapter 9 Review Quiz',
      roomCode: 'BIO-93',
      instructor: 'Prof. Kadandale',
    },
    {
      id: 'f5',
      code: 'ICS 33',
      title: 'Intermediate Programming in Python',
      time: '3:30 PM – 4:50 PM',
      location: 'DBH 1100',
      topic: 'Metaprogramming & Custom Decorators',
      isLive: false,
      canvasSync: 'In-Class Quiz #4',
      roomCode: 'ICS-33',
      instructor: 'Prof. Pattis',
    },
    {
      id: 'f6',
      code: 'COMPSCI 161',
      title: 'Algorithms Discussion · Session 5',
      time: '5:00 PM – 5:50 PM',
      location: 'ICS 180',
      topic: 'Bellman-Ford & Negative Cycle Detection',
      isLive: false,
      canvasSync: 'Problem Set 5 Posted',
      roomCode: 'CS-161',
      instructor: 'Prof. Eppstein',
    },
  ],
}

export const fallbackCourseHorizons: Record<string, HorizonState> = {
  'MATH-2B': {
    course: 'Math 2B · Lecture 14 · Integrals',
    lectureTitle: 'Definite Integrals via Substitution',
    roomCode: 'MATH-2B',
    activeStepNumber: 2,
    totalSteps: 4,
    progressPercent: 50,
    horizon: {
      antecedent: {
        label: 'Context Anchor (Antecedent State)',
        statement: 'Definite integration via substitution. Preceding step established parameter u = 2x + 1.',
      },
      directive: {
        label: 'Active Directive (Focal Target)',
        statement: 'Transform integration limits into u-domain: x = 0 ⟶ u = 1; x = 4 ⟶ u = 9.',
      },
      constraints: {
        label: 'Invariant Constraints (Boundary Integrity)',
        statement: 'Retain transformed limits throughout evaluation; do not back-substitute. Express solution as an exact fraction.',
        canvasDeadlineSync: 'Canvas Due: 10:50 AM today',
      },
    },
    activeCheckpoint: {
      id: 'chk-math-2',
      stepNumber: 2,
      title: 'Transform integration limits into u-domain',
      description: 'Evaluate u at boundaries: lower bound u(0) = 1, upper bound u(4) = 9.',
      status: 'active',
      timeEstimate: '4 mins',
      audioTimestamp: '00:22:15',
    },
  },
  'PHYS-7C': {
    course: 'Physics 7C · Lecture 12 · Classical Mechanics',
    lectureTitle: 'Damped Harmonic Oscillations & Phase Space',
    roomCode: 'PHYS-7C',
    activeStepNumber: 2,
    totalSteps: 4,
    progressPercent: 50,
    horizon: {
      antecedent: {
        label: 'Context Anchor (Antecedent State)',
        statement: 'Unforced mechanical oscillator with mass m = 0.5 kg, spring constant k = 50 N/m, undamped natural frequency ω₀ = 10 rad/s.',
      },
      directive: {
        label: 'Active Directive (Focal Target)',
        statement: 'Calculate the damped oscillation frequency ω₁ = √(ω₀² − γ²) and formulate position equation.',
      },
      constraints: {
        label: 'Invariant Constraints (Boundary Integrity)',
        statement: 'Express damping parameter γ and frequency ω₁ in SI units (rad/s). Verify underdamped regime criterion (γ < ω₀) before graphing.',
        canvasDeadlineSync: 'Canvas Due: 2:20 PM today',
      },
    },
    activeCheckpoint: {
      id: 'chk-phys-2',
      stepNumber: 2,
      title: 'Determine underdamped characteristic frequency ω₁',
      description: 'Compute quasi-frequency ω₁ = √(ω₀² − γ²) and identify amplitude envelope decay rate.',
      status: 'active',
      timeEstimate: '5 mins',
      audioTimestamp: '00:25:30',
    },
  },
  'ICS-33': {
    course: 'ICS 33 · Lecture 15 · Intermediate Python',
    lectureTitle: 'Metaprogramming & Custom Decorators',
    roomCode: 'ICS-33',
    activeStepNumber: 2,
    totalSteps: 4,
    progressPercent: 50,
    horizon: {
      antecedent: {
        label: 'Context Anchor (Antecedent State)',
        statement: 'First-class function closures in Python. Preceding step established inner wrapper accepting arbitrary (*args, **kwargs).',
      },
      directive: {
        label: 'Active Directive (Focal Target)',
        statement: 'Apply @functools.wraps(fn) to decorator wrapper and implement O(1) dictionary key lookup before invocation.',
      },
      constraints: {
        label: 'Invariant Constraints (Boundary Integrity)',
        statement: 'Do not mutate global state. All cached keys must be hashable tuples. Metadata (__doc__) must be strictly preserved.',
        canvasDeadlineSync: 'Canvas Due: 4:50 PM today',
      },
    },
    activeCheckpoint: {
      id: 'chk-ics-2',
      stepNumber: 2,
      title: 'Integrate functools.wraps and memoized cache lookup',
      description: 'Preserve function signature metadata while checking cache before delegating execution.',
      status: 'active',
      timeEstimate: '6 mins',
      audioTimestamp: '00:23:40',
    },
  },
  'CHEM-1A': {
    course: 'Chem 1A · Lecture 18 · General Chemistry',
    lectureTitle: 'Thermochemistry & Hess’s Law Additivity',
    roomCode: 'CHEM-1A',
    activeStepNumber: 2,
    totalSteps: 4,
    progressPercent: 50,
    horizon: {
      antecedent: {
        label: 'Context Anchor (Antecedent State)',
        statement: 'Target reaction: C(graphite) + 2 H₂(g) ⟶ CH₄(g) with unknown standard reaction enthalpy ΔH°_rxn.',
      },
      directive: {
        label: 'Active Directive (Focal Target)',
        statement: 'Reverse reaction (3) so CH₄ appears on product side and multiply reaction (2) by factor of 2.',
      },
      constraints: {
        label: 'Invariant Constraints (Boundary Integrity)',
        statement: 'State symbols (s, l, g) must be preserved in cancelation. Final enthalpy reported to 1 decimal place with proper ± sign.',
        canvasDeadlineSync: 'Canvas Due: 11:50 AM today',
      },
    },
    activeCheckpoint: {
      id: 'chk-chem-2',
      stepNumber: 2,
      title: 'Apply stoichiometric multipliers and directional sign flips',
      description: 'Reverse reaction 3 to position methane on product side and double reaction 2.',
      status: 'active',
      timeEstimate: '6 mins',
      audioTimestamp: '00:21:45',
    },
  },
}

export const fallbackEdstemQuestions: EdstemQuestion[] = [
  {
    id: '1',
    courseCode: 'MATH 2B',
    author: 'Anonymous Student',
    timeAgo: '3 mins ago',
    question: "For Problem 2, why don't we convert back to x at the end like we did on Wednesday?",
    stepTag: 'Step 2: Integration Limits',
    isEndorsed: true,
    upvotes: 14,
    answer: {
      author: 'TA Marcus',
      text: 'Because this is a definite integral with limits [0, 4]. Once you convert the limits to u [1, 9], you evaluate the numbers directly in u. Converting back to x is only for indefinite integrals (+ C)!',
    },
  },
  {
    id: '2',
    courseCode: 'MATH 2B',
    author: 'Anonymous Student',
    timeAgo: '7 mins ago',
    question: 'Is the assignment submission on Canvas closing exactly at 10:50 AM or is there a grace period?',
    stepTag: 'Submission Constraints',
    isEndorsed: false,
    upvotes: 6,
  },
  {
    id: '3',
    courseCode: 'MATH 2B',
    author: 'Anonymous Student',
    timeAgo: '14 mins ago',
    question: 'Do limits flip if u(0) turns out greater than u(4)?',
    stepTag: 'Step 2: Bounds',
    isEndorsed: true,
    upvotes: 21,
    answer: {
      author: 'Prof. Chen',
      text: 'Yes! If the lower bound maps to a higher value than the upper bound, keep them in their mapped positions, or apply the negative property: integral from a to b = - integral from b to a.',
    },
  },
  {
    id: '5',
    courseCode: 'PHYS 7C',
    author: 'Physics Student',
    timeAgo: '10 mins ago',
    question: 'When gamma squared equals omega_0 squared, does the system oscillate at all?',
    stepTag: 'Step 2: Critical Damping',
    isEndorsed: true,
    upvotes: 12,
    answer: {
      author: 'Dr. Vance',
      text: 'No oscillation occurs! That is critical damping (γ = ω₀). The system returns to equilibrium in the minimum possible time without crossing zero.',
    },
  },
  {
    id: '6',
    courseCode: 'CHEM 1A',
    author: 'Chem Major',
    timeAgo: '25 mins ago',
    question: 'Why do pure elements like O2(g) have standard heat of formation equal to zero?',
    stepTag: 'Step 1: Hess Setup',
    isEndorsed: true,
    upvotes: 18,
    answer: {
      author: 'Prof. Arasasingham',
      text: 'By definition! Standard enthalpy of formation ΔH°f is the enthalpy change for forming 1 mole of a substance from its elements in their most stable thermodynamic state.',
    },
  },
]

// Generic fetch wrapper with timeout and fallback
async function fetchWithFallback<T>(url: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 3500)

  try {
    const res = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}: ${res.statusText}`)
    }
    return (await res.json()) as T
  } catch (err) {
    clearTimeout(timeoutId)
    if (fallbackData !== undefined) {
      console.warn(`[Bullseye API] Failed to reach ${url}, using local offline fallback:`, (err as Error).message)
      return fallbackData
    }
    throw err
  }
}

export const api = {
  // GET /api/health
  async getHealth(): Promise<HealthStatus> {
    return fetchWithFallback<HealthStatus>(`${API_BASE_URL}/api/health`, undefined, {
      status: 'offline-mock',
      uptimeSeconds: 0,
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      service: 'bullseye-classroom-fallback',
      standards: {
        wcag: 'WCAG 2.2 AA Verified',
        cognitiveLoadTarget: '< 2.5 / 10',
        stigmaFreeDefault: true,
      },
    })
  },

  // GET /api/schedule
  async getSchedule(): Promise<{ schedule: Record<string, ScheduledClass[]>; activeLiveClass: any; courses: string[] }> {
    return fetchWithFallback(
      `${API_BASE_URL}/api/schedule`,
      undefined,
      {
        schedule: fallbackSchedule,
        activeLiveClass: fallbackSchedule['Fri Nov 14 (Today)'][0],
        courses: ['MATH 2B', 'CHEM 1A', 'PHYS 7C', 'BIO 93', 'STATS 67', 'COMPSCI 161', 'ICS 33'],
      }
    )
  },

  // POST /api/schedule/join or /api/classrooms/join
  async joinRoom(roomCode: string): Promise<any> {
    const normalized = roomCode.trim().toUpperCase().replace(/\s+/g, '-')
    const defaultHorizon = fallbackCourseHorizons[normalized] || fallbackCourseHorizons['MATH-2B']

    return fetchWithFallback(
      `${API_BASE_URL}/api/schedule/join`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode }),
      },
      {
        success: true,
        roomCode: normalized,
        courseTitle: defaultHorizon.lectureTitle,
        horizon: defaultHorizon,
      }
    )
  },

  // GET /api/lecture/current (supports courseCode / roomCode)
  async getCurrentLecture(courseCode?: string): Promise<HorizonState> {
    const query = courseCode ? `?course=${encodeURIComponent(courseCode)}` : ''
    const normalized = courseCode ? courseCode.trim().toUpperCase().replace(/\s+/g, '-') : 'MATH-2B'
    const fallback = fallbackCourseHorizons[normalized] || fallbackCourseHorizons['MATH-2B']

    return fetchWithFallback<HorizonState>(
      `${API_BASE_URL}/api/lecture/current${query}`,
      undefined,
      fallback
    )
  },

  // POST /api/lecture/checkpoint
  async advanceCheckpoint(stepNumber: number, courseCode?: string): Promise<{ success: boolean; currentStep: number; message: string }> {
    return fetchWithFallback(
      `${API_BASE_URL}/api/lecture/checkpoint`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepNumber, course: courseCode }),
      },
      {
        success: true,
        currentStep: stepNumber,
        message: `Local checkpoint advanced to step ${stepNumber}`,
      }
    )
  },

  // GET /api/canvas/assignments
  async getCanvasAssignments(courseCode?: string): Promise<{ connected: boolean; assignments: CanvasAssignment[] }> {
    const query = courseCode ? `?courseCode=${encodeURIComponent(courseCode)}` : ''
    return fetchWithFallback(
      `${API_BASE_URL}/api/canvas/assignments${query}`,
      undefined,
      {
        connected: true,
        assignments: [
          {
            id: 'canvas-math2b-lab14',
            courseId: 'uci-math2b-f26',
            courseCode: 'MATH 2B',
            title: 'Lab 14 Worksheet: Definite Integration by Substitution',
            description: 'In-class worksheet accompanying Lecture 14.',
            dueAt: '2026-11-14T10:50:00-08:00',
            lockAt: '2026-11-14T10:52:00-08:00',
            pointsPossible: 10,
            status: 'open',
            rubric: [
              { criterion: 'Substitution limit transformation', points: 4, description: 'Bounds 0..4 transformed to 1..9', invariant: true },
              { criterion: 'Direct u-evaluation', points: 3, description: 'No back-substitution', invariant: true },
              { criterion: 'Exact fractional arithmetic', points: 3, description: 'Irreducible fraction required', invariant: true },
            ],
            submissionParams: {
              allowedFormat: ['pdf', 'text_entry'],
              maxFileSizeMb: 15,
              exactFractionRequired: true,
              gracePeriodSeconds: 120,
              lockAt: '2026-11-14T10:52:00-08:00',
            },
          },
        ],
      }
    )
  },

  // GET /api/edstem/threads
  async getEdstemThreads(courseCode?: string, stepTag?: string): Promise<{ connected: boolean; threads: EdstemQuestion[] }> {
    const params = new URLSearchParams()
    if (courseCode) params.set('courseCode', courseCode)
    if (stepTag) params.set('stepTag', stepTag)
    const qs = params.toString() ? `?${params.toString()}` : ''

    return fetchWithFallback(
      `${API_BASE_URL}/api/edstem/threads${qs}`,
      undefined,
      {
        connected: true,
        threads: fallbackEdstemQuestions,
      }
    )
  },

  // POST /api/edstem/threads
  async createEdstemThread(question: string, stepTag = 'Step 2: Integration Limits', author = 'Anonymous Student', courseCode = 'MATH 2B'): Promise<EdstemQuestion> {
    const newThreadFallback: EdstemQuestion = {
      id: `local-${Date.now()}`,
      author,
      question,
      stepTag,
      courseCode,
      timeAgo: 'Just now',
      isEndorsed: false,
      upvotes: 1,
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/edstem/threads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, stepTag, author, courseCode }),
      })
      if (res.ok) {
        const json = await res.json()
        return json.thread
      }
    } catch {
      // ignore
    }

    return newThreadFallback
  },

  // POST /api/rejoin
  async requestRejoin(driftQuery?: string, courseCode?: string, lastRecallTimestamp?: string): Promise<RejoinResponse> {
    return fetchWithFallback<RejoinResponse>(
      `${API_BASE_URL}/api/rejoin`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driftQuery, courseCode, lastRecallTimestamp }),
      },
      {
        success: true,
        reassurance: "Don't worry: you are completely safe to rejoin. Zero penalties applied.",
        syncedTimestamp: new Date().toISOString(),
        audioTimestamp: '00:32:45',
        detectedContext: 'Professor Chen just substituted u = 2x + 1. The class is changing the integration limits right now: when x = 0, u = 1; when x = 4, u = 9.',
        checkpoints: [
          { stepNumber: 1, title: 'Substitution Chosen', concept: 'u = 2x + 1', actionableDirective: 'Inner radical simplified', completed: true },
          { stepNumber: 2, title: 'Limit Transformation', concept: 'u(0)=1, u(4)=9', actionableDirective: 'Write limits [1, 9]', completed: false },
          { stepNumber: 3, title: 'Direct Integration Ahead', concept: 'Reverse power rule', actionableDirective: 'Prepare bracket evaluation', completed: false },
        ],
        immediateActionCue: 'Your immediate task: Write down the new limits [1, 9] on your worksheet.',
        currentHorizonDirective: 'Transform integration limits into u-domain: x = 0 ⟶ u = 1; x = 4 ⟶ u = 9.',
        penaltyFreeConfirmation: true,
      }
    )
  },

  // WebSocket Live Stream Connection Helper
  subscribeLiveWebSocket(
    onMessage: (data: any) => void,
    onError?: (err: any) => void
  ): () => void {
    let ws: WebSocket | null = null
    let closed = false

    try {
      ws = new WebSocket(WS_BASE_URL)

      ws.onopen = () => {
        console.log('[Bullseye WebSocket] Connected to real-time live lecture stream')
      }

      ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data)
          onMessage(parsed)
        } catch {
          // ignore
        }
      }

      ws.onerror = (err) => {
        if (onError) onError(err)
      }

      ws.onclose = () => {
        if (!closed) {
          console.log('[Bullseye WebSocket] Connection closed')
        }
      }
    } catch (err) {
      if (onError) onError(err)
    }

    return () => {
      closed = true
      if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
        ws.close()
      }
    }
  },

  // Research Telemetry & Analytics
  async recordTelemetryEvent(event: {
    sessionId?: string
    courseId?: string
    moduleContext?: string
    eventType: string
    metrics?: {
      dwellDurationMs?: number
      rejoinLatencyMs?: number
      cognitiveFrictionScore?: number
    }
    metadata?: Record<string, unknown>
  }): Promise<{ success: boolean; eventId?: string }> {
    return fetchWithFallback(
      `${API_BASE_URL}/api/telemetry/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      },
      { success: true, eventId: 'local-evt-' + Date.now() }
    )
  },

  async fetchTelemetryStats(): Promise<any> {
    return fetchWithFallback(
      `${API_BASE_URL}/api/telemetry/stats`,
      {},
      {
        status: 'ok',
        stats: {
          totalEvents: 14,
          activeSessions: 3,
          averageRejoinLatencyMs: 7850,
          sensoryCalmEngagementRate: 18.2,
          averageCognitiveFriction: 3.4,
          eventBreakdown: {
            DRIFT_RECOVERY_INITIATED: 4,
            CHECKPOINT_COMPLETED: 5,
            SENSORY_CALM_TOGGLED: 2,
            SCAFFOLD_HINT_REQUESTED: 3,
          },
        },
      }
    )
  },

  async exportTelemetryCSV(): Promise<string> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/telemetry/export?format=csv`)
      if (res.ok) {
        return await res.text()
      }
    } catch {
      // Fallback to local generated CSV
    }

    const headers = [
      'eventId',
      'sessionId',
      'timestamp',
      'courseId',
      'moduleContext',
      'eventType',
      'dwellDurationMs',
      'rejoinLatencyMs',
      'cognitiveFrictionScore',
      'metadata',
    ]

    const fallbackRows = [
      headers.join(','),
      `"evt-local-01","sess-client","${new Date(Date.now() - 600000).toISOString()}","MATH-2B","Integration by Parts","DRIFT_RECOVERY_INITIATED",42000,8200,4.8,"{""recoverySuccess"":true}"`,
      `"evt-local-02","sess-client","${new Date(Date.now() - 480000).toISOString()}","MATH-2B","Integration by Parts","CHECKPOINT_COMPLETED",65000,,2.1,"{""step"":2}"`,
      `"evt-local-03","sess-client","${new Date(Date.now() - 300000).toISOString()}","PHYS-7C","Underdamped Oscillation","SENSORY_CALM_TOGGLED",85000,,6.2,"{""hotkey"":""c""}"`,
      `"evt-local-04","sess-client","${new Date().toISOString()}","PHYS-7C","Quasi-frequency","SCAFFOLD_HINT_REQUESTED",38000,9100,5.4,"{""tier"":1}"`,
    ]

    return fallbackRows.join('\n')
  },

  // Socratic Scaffolding Assistant
  async requestSocraticScaffold(req: {
    courseCode?: string
    domain?: 'math' | 'physics' | 'code' | 'chemistry' | 'general'
    currentProblem: string
    activeStep: string
    studentQuery?: string
    scaffoldingTier?: 1 | 2 | 3 | 4
  }): Promise<{
    scaffoldId: string
    tier: number
    tierLabel: string
    scaffoldPrompt: string
    probingQuestion: string
    nextActionCue: string
    guardrailTriggered: boolean
    guardrailExplanation?: string
  }> {
    const isAnswerRequest = /give me the answer|what is the answer|tell me the answer|just do it|write the code/i.test(
      req.studentQuery || ''
    )

    const tier = req.scaffoldingTier || 1
    const tierLabels = [
      'Attentional Orienting',
      'Conceptual Bridging',
      'Procedural Decomposition',
      'Verification & Closure',
    ]

    const fallbackResponse = {
      scaffoldId: 'scaffold-' + Date.now(),
      tier,
      tierLabel: tierLabels[tier - 1] || 'Attentional Orienting',
      scaffoldPrompt: isAnswerRequest
        ? 'Direct solution withheld to support independent problem solving. Observe the governing constraints first.'
        : `Focus on ${req.activeStep}. In this stage, isolate the known inputs before performing the transformation.`,
      probingQuestion:
        'Which component of the problem or equation differentiates into a simpler term?',
      nextActionCue:
        'Write out your initial step or variable assignment in your notes before calculating.',
      guardrailTriggered: isAnswerRequest,
      guardrailExplanation: isAnswerRequest
        ? 'Full answer withheld to prevent cognitive offloading. Let us solve the next micro-step together.'
        : undefined,
    }

    return fetchWithFallback(
      `${API_BASE_URL}/api/socratic/scaffold`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      },
      fallbackResponse
    )
  },
}
