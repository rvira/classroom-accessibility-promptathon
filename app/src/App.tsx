import { useEffect, useRef, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Compass,
  Globe,
  Info,
  LogOut,
  Menu,
  RotateCcw,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import '@fontsource/atkinson-hyperlegible/700.css'
import { InteractiveBackground } from './components/InteractiveBackground'
import { CanvasLogo, EdStemLogo } from './components/BrandLogos'
import { SideNav, type ViewMode } from './components/SideNav'
import {
  translations,
  type SupportedLanguage,
  SUPPORTED_LANGUAGES,
  type Translations,
} from './i18n'
import './App.css'

interface EdstemQuestion {
  id: string
  author: string
  timeAgo: string
  question: string
  stepTag: string
  isEndorsed: boolean
  answer?: {
    author: string
    text: string
  }
}

const initialEdstemQuestions: EdstemQuestion[] = [
  {
    id: '1',
    author: 'Anonymous Student',
    timeAgo: '3 mins ago',
    question: "For Problem 2, why don't we convert back to x at the end like we did on Wednesday?",
    stepTag: 'Step 2: Integration Limits',
    isEndorsed: true,
    answer: {
      author: 'TA Marcus',
      text: 'Because this is a definite integral with limits [0, 4]. Once you convert the limits to u [1, 9], you evaluate the numbers directly in u. Converting back to x is only for indefinite integrals (+ C)!',
    },
  },
  {
    id: '2',
    author: 'Anonymous Student',
    timeAgo: '7 mins ago',
    question: 'Is the assignment submission on Canvas closing exactly at 10:50 AM or is there a grace period?',
    stepTag: 'Submission Constraints',
    isEndorsed: false,
  },
  {
    id: '3',
    author: 'Anonymous Student',
    timeAgo: '14 mins ago',
    question: 'Do limits flip if u(0) turns out greater than u(4)?',
    stepTag: 'Step 2: Bounds',
    isEndorsed: true,
    answer: {
      author: 'Prof. Chen',
      text: 'Yes! If the lower bound maps to a higher value than the upper bound, keep them in their mapped positions, or apply the negative property: integral from a to b = - integral from b to a.',
    },
  },
]

interface ClassOutline {
  unit: string
  summary: string
  keyConcepts: string[]
  reading: string
  assignments: string
  rubricConstraint: string
  officeHours?: string
}

interface ScheduledClass {
  id: string
  code: string
  title: string
  time: string
  location: string
  topic: string
  instructor: string
  isLive: boolean
  canvasSync: string
  outline: ClassOutline
}

const scheduleData: Record<string, ScheduledClass[]> = {
  'Mon Nov 10': [
    {
      id: 'm1',
      code: 'MATH 2B',
      title: 'Calculus II · Lecture 12',
      time: '10:00 AM – 10:50 AM',
      location: 'Rowland Hall 101',
      topic: 'Introduction to Substitution Rule',
      instructor: 'Prof. Chen',
      isLive: false,
      canvasSync: 'Homework 3 Graded',
      outline: {
        unit: 'Unit 2: Techniques of Integration',
        summary: 'Introduction to the differential substitution rule for indefinite integrals, identifying derivative patterns g\'(x)dx, and change of variables.',
        keyConcepts: [
          'Differential substitution theorem: ∫ f(g(x))g\'(x)dx = ∫ f(u)du',
          'Pattern recognition for inner composite functions u = g(x)',
          'Accounting for constant multipliers when solving for dx',
          'Converting expressions back to original variable x (+ C)',
        ],
        reading: 'Stewart Calculus 8th Ed, Section 5.5 (pp. 410–418)',
        assignments: 'Homework 3 (Graded: 20/20) · Worksheet 12 due in discussion',
        rubricConstraint: 'Must always write the arbitrary constant + C for indefinite integrals',
        officeHours: 'Prof. Chen · Mon/Wed 2:00–3:30 PM (Rowland Hall 214)',
      },
    },
    {
      id: 'm2',
      code: 'PHYS 7C',
      title: 'Classical Mechanics · Lecture 7',
      time: '1:00 PM – 2:20 PM',
      location: 'PSLH 120',
      topic: 'Simple Harmonic Motion & Energy',
      instructor: 'Prof. Robertson',
      isLive: false,
      canvasSync: 'Lab 2 Submitted',
      outline: {
        unit: 'Unit 2: Oscillations and Mechanical Waves',
        summary: 'Kinematics of ideal harmonic oscillators, Hooke\'s Law linear restoring forces, phase angles, and conservation of mechanical energy.',
        keyConcepts: [
          'Position trajectory x(t) = A cos(ωt + φ)',
          'Angular frequency ω = √(k/m), Period T = 2π/ω',
          'Total mechanical energy E = 1/2 k A² = constant',
          'Velocity leads displacement by π/2 radians',
        ],
        reading: 'Giancoli Physics for Scientists & Engineers, Chapter 14.1–14.3',
        assignments: 'Lab 2: Air Track Oscillations (Submitted, pending rubric grading)',
        rubricConstraint: 'All state vectors must explicitly include SI units (rad/s, m/s²)',
        officeHours: 'Prof. Robertson · Tue 10:00–11:30 AM (PSLH 142)',
      },
    },
  ],
  'Tue Nov 11': [
    {
      id: 't1',
      code: 'COMPSCI 161',
      title: 'Design and Analysis of Algorithms',
      time: '3:30 PM – 4:50 PM',
      location: 'DBH 1100',
      topic: 'Divide and Conquer: Master Theorem',
      instructor: 'Prof. Shindler',
      isLive: false,
      canvasSync: 'Quiz 3 Completed',
      outline: {
        unit: 'Unit 2: Divide-and-Conquer Recurrences',
        summary: 'Asymptotic analysis of recursive branch algorithms using the Master Method across subproblem division and recombination costs.',
        keyConcepts: [
          'General recurrence T(n) = a T(n/b) + f(n)',
          'Critical exponent comparison log_b(a) vs. polynomial degree of f(n)',
          'Case 1 (leaf heavy), Case 2 (balanced tree), Case 3 (root heavy)',
          'Regularity condition verification a f(n/b) ≤ c f(n)',
        ],
        reading: 'CLRS Algorithms 3rd Ed, Chapter 4.5 (pp. 93–106)',
        assignments: 'Quiz 3: Recurrence Trees (Score: 10/10) · Problem Set 2 assigned',
        rubricConstraint: 'Must explicitly prove the regularity condition holds when applying Case 3',
        officeHours: 'Prof. Shindler · Tue/Thu 1:00–2:30 PM (DBH 4022)',
      },
    },
  ],
  'Wed Nov 12': [
    {
      id: 'w1',
      code: 'MATH 2B',
      title: 'Calculus II · Lecture 13',
      time: '10:00 AM – 10:50 AM',
      location: 'Rowland Hall 101',
      topic: 'Indefinite Integrals with Algebraic Substitution',
      instructor: 'Prof. Chen',
      isLive: false,
      canvasSync: 'Worksheet 13 Submitted',
      outline: {
        unit: 'Unit 2: Advanced Integration Techniques',
        summary: 'Higher-degree substitutions, completing the square in quadratic denominators, and algebraic manipulation prior to variable substitution.',
        keyConcepts: [
          'Completing the square: ax² + bx + c → a(x - h)² + k',
          'Standard forms yielding arcsin(u/a) and (1/a) arctan(u/a)',
          'Rationalizing substitutions for root expressions u = √(g(x))',
        ],
        reading: 'Stewart Calculus 8th Ed, Section 5.5 (pp. 418–425)',
        assignments: 'Worksheet 13 (Submitted) · Canvas Prep for Lecture 14',
        rubricConstraint: 'State the domain constraints when introducing inverse trigonometric transformations',
        officeHours: 'Prof. Chen · Mon/Wed 2:00–3:30 PM (Rowland Hall 214)',
      },
    },
    {
      id: 'w2',
      code: 'PHYS 7C',
      title: 'Classical Mechanics · Lecture 8',
      time: '1:00 PM – 2:20 PM',
      location: 'PSLH 120',
      topic: 'Driven Oscillations & Resonance',
      instructor: 'Prof. Robertson',
      isLive: false,
      canvasSync: 'Homework 4 Due',
      outline: {
        unit: 'Unit 3: Driven Oscillatory Systems',
        summary: 'Harmonically driven damped systems, steady-state vs. transient solutions, phase shifts, and mechanical resonance peaks.',
        keyConcepts: [
          'Driving force F(t) = F₀ cos(ω t)',
          'Steady-state amplitude A(ω) = F₀ / √((k - mω²)² + b²ω²)',
          'Resonance peak condition ω_res = √(ω₀² - 2γ²)',
          'Phase lag δ(ω) between driving force and system velocity',
        ],
        reading: 'Giancoli Physics, Chapter 14.7–14.8',
        assignments: 'Homework 4: Resonance Curves (Due 11:59 PM tonight on Canvas)',
        rubricConstraint: 'Derive the maximum amplitude formula before substituting numerical values',
        officeHours: 'Prof. Robertson · Wed 3:00–4:30 PM (PSLH 142)',
      },
    },
    {
      id: 'w3',
      code: 'COMPSCI 161',
      title: 'Algorithms Discussion',
      time: '5:00 PM – 5:50 PM',
      location: 'ICS 174',
      topic: 'Greedy Algorithms: Interval Scheduling',
      instructor: 'TA Jessica',
      isLive: false,
      canvasSync: 'No submission required',
      outline: {
        unit: 'Unit 3: Greedy Choice Paradigm',
        summary: 'Proving optimality of greedy choices using inductive exchange arguments and earliest-deadline-first ordering.',
        keyConcepts: [
          'Earliest finish time first selection',
          'Greedy-stays-ahead induction proof structure',
          'Interval partitioning and graph coloring lower bounds',
        ],
        reading: 'Kleinberg & Tardos Algorithm Design, Chapter 4.1–4.2',
        assignments: 'Practice Worksheet · Ungraded in-class collaboration',
        rubricConstraint: 'Inductive step must explicitly map the difference between greedy solution G and optimal solution O',
        officeHours: 'TA Jessica · Fri 11:00 AM–1:00 PM (ICS 248)',
      },
    },
  ],
  'Thu Nov 13': [
    {
      id: 'th1',
      code: 'COMPSCI 161',
      title: 'Design and Analysis of Algorithms',
      time: '3:30 PM – 4:50 PM',
      location: 'DBH 1100',
      topic: 'Dynamic Programming: Intro & Memoization',
      instructor: 'Prof. Shindler',
      isLive: false,
      canvasSync: 'Quiz 4 Prep Available',
      outline: {
        unit: 'Unit 4: Dynamic Programming Principles',
        summary: 'Characterizing optimal substructure, overlapping subproblems, top-down memoization arrays, and bottom-up iterative tabulation.',
        keyConcepts: [
          'Bellman principle of optimality',
          'Memoization cache: trade O(n) memory for polynomial time',
          'Weighted Interval Scheduling: OPT(j) = max(v_j + OPT(p(j)), OPT(j-1))',
          'Pre-computing predecessor array p(j) via binary search in O(n log n)',
        ],
        reading: 'Kleinberg & Tardos, Chapter 6.1–6.2 (pp. 251–260)',
        assignments: 'Quiz 4 Prep Module (Available on Canvas)',
        rubricConstraint: 'Always specify the exact base cases and topological evaluation order of the DP table',
        officeHours: 'Prof. Shindler · Tue/Thu 1:00–2:30 PM (DBH 4022)',
      },
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
      instructor: 'Prof. Chen',
      isLive: true,
      canvasSync: 'Lab 14 Worksheet (Due 10:50 AM)',
      outline: {
        unit: 'Unit 2: Definite Integrals & Fundamental Theorem',
        summary: 'Transforming integration bounds when executing change-of-variables: evaluating bounds directly in the u-domain without converting back to original variable x.',
        keyConcepts: [
          'Integration by Substitution Theorem: ∫_a^b f(g(x))g\'(x)dx = ∫_{g(a)}^{g(b)} f(u)du',
          'Direct boundary evaluation: u(0) = 0² = 0, u(1) = 1² = 1',
          'Evaluation on board: [e^u]_0^1 = e¹ - e⁰ = e - 1 exact',
          'Never convert back to x for definite integrals (+ C is not needed)',
        ],
        reading: 'Stewart Calculus 8th Ed, Section 5.5 (pp. 418–422)',
        assignments: 'Lab 14 In-Class Worksheet (Submit to Canvas by 10:50 AM sharp)',
        rubricConstraint: 'Canvas Invariant: Exact fractions and mathematical constants only (write "e - 1", do not evaluate to decimal 1.718)',
        officeHours: 'Prof. Chen · Mon/Wed 2:00–3:30 PM (Rowland Hall 214)',
      },
    },
    {
      id: 'f2',
      code: 'PHYS 7C',
      title: 'Classical Mechanics · Lecture 9',
      time: '1:00 PM – 2:20 PM',
      location: 'PSLH 120',
      topic: 'Damped Harmonic Oscillations',
      instructor: 'Prof. Robertson',
      isLive: false,
      canvasSync: 'Lab 3 Opens at 1:00 PM',
      outline: {
        unit: 'Unit 3: Damped Oscillatory Systems',
        summary: 'Linear drag forces proportional to velocity, characteristic quadratic auxiliary equation, and the three physical damping regimes.',
        keyConcepts: [
          'Differential equation of motion: m d²x/dt² + b dx/dt + k x = 0',
          'Characteristic roots: r = -γ ± √(γ² - ω₀²), where γ = b / 2m',
          'Underdamped (γ < ω₀): oscillatory decay with envelope A e^{-γt}',
          'Critically damped (γ = ω₀): fastest return to equilibrium without oscillation',
          'Overdamped (γ > ω₀): sluggish non-oscillatory return governed by slower exponential',
        ],
        reading: 'Giancoli Physics, Chapter 14.4–14.6 (pp. 385–392)',
        assignments: 'Lab 3: Viscous Damping Sensors (Opens 1:00 PM, due next Monday 11:59 PM, 20 pts)',
        rubricConstraint: 'Canvas Invariant: Clearly distinguish angular frequency ω_d = √(ω₀² - γ²) from undamped natural frequency ω₀',
        officeHours: 'Prof. Robertson · Wed 3:00–4:30 PM (PSLH 142)',
      },
    },
    {
      id: 'f3',
      code: 'COMPSCI 161',
      title: 'Design and Analysis of Algorithms',
      time: '3:30 PM – 4:50 PM',
      location: 'DBH 1100',
      topic: 'Dynamic Programming: Bellman-Ford',
      instructor: 'Prof. Shindler',
      isLive: false,
      canvasSync: 'In-Class Quiz #4',
      outline: {
        unit: 'Unit 4: Dynamic Programming - Shortest Paths',
        summary: 'Single-source shortest paths on directed graphs with arbitrary or negative edge weights, and detecting negative-weight cycles.',
        keyConcepts: [
          'Bellman-Ford recurrence: OPT(i, v) = min(OPT(i-1, v), min_{w ∈ V} (OPT(i-1, w) + c_{wv}))',
          'Shortest simple path has at most |V|-1 edges',
          'Negative cycle detection: if values change on iteration |V|, a negative cycle exists',
          'Space optimization from O(|V|²) down to O(|V|) with standard predecessor pointers',
        ],
        reading: 'Kleinberg & Tardos Algorithm Design, Section 6.8 (pp. 288–299)',
        assignments: 'In-Class Quiz #4 (Completed on Canvas Lockdown Browser, 15 pts)',
        rubricConstraint: 'Canvas Invariant: Must prove absence of negative cycles before reconstructing the shortest path tree',
        officeHours: 'Prof. Shindler · Tue/Thu 1:00–2:30 PM (DBH 4022)',
      },
    },
  ],
}

interface TourStep {
  title: string
  subtitle: string
  description: string
  tip?: string
  icon: typeof Target
}

const tourSteps: TourStep[] = [
  {
    title: 'Welcome to Bullseye',
    subtitle: 'A calmer, clearer classroom interface',
    description:
      'Lectures move fast. Bullseye strips away clutter and visual noise, distilling the room into three stable anchors: where the class is, what to do right now, and what constraints to keep.',
    tip: 'Designed for executive-function, processing, and attention needs.',
    icon: Target,
  },
  {
    title: 'Triadic Working-Memory Horizon',
    subtitle: 'Antecedent state, focal directive, and invariant constraints',
    description:
      'The workspace projects tasks across three spatial depths: Context Anchor maintains situational awareness, Active Directive isolates the immediate execution target, and Invariant Constraints preserves critical rubric and submission boundaries.',
    tip: 'Eliminates cognitive fragmentation without sacrificing academic rigor or grading parameters.',
    icon: Compass,
  },
  {
    title: 'Canvas LMS & EdStem Integration',
    subtitle: 'Assignments & live classroom questions',
    description:
      'Bullseye syncs with your Canvas modules for exact submission deadlines, and surfaces live EdStem discussion threads tagged directly to your current lecture problem.',
    tip: 'One click lets you ask a question auto-tagged with your problem step.',
    icon: Compass,
  },
  {
    title: 'Rejoin Whenever You Drift',
    subtitle: 'No penalties, no lost time',
    description:
      'Lost the thread? Tap "Help me rejoin" at the top. Type what you recall, and Bullseye provides a safe 10-second recap grounded in the current step.',
    tip: 'You can restart this tour anytime from the top bar or side navigation.',
    icon: Sparkles,
  },
]

type BlockKey = 'where' | 'next' | 'keep'

function Integral({ lower, upper, children }: { lower: string; upper: string; children: React.ReactNode }) {
  return (
    <span className="integral">
      <span className="int-glyph" aria-hidden="true">
        ∫
      </span>
      <span className="int-limits" aria-hidden="true">
        <span>{upper}</span>
        <span>{lower}</span>
      </span>
      <span className="int-body">{children}</span>
    </span>
  )
}

function Technical({ block, t }: { block: BlockKey; t: Translations }) {
  if (block === 'where') {
    return (
      <>
        <p className="tech-label">{t.onTheBoard}</p>
        <p className="math-line" aria-hidden="true">
          <Integral lower="0" upper="1">
            2x·e<sup>x²</sup> dx
          </Integral>
        </p>
        <p className="math-line math-soft" aria-hidden="true">
          u = x², &nbsp;du = 2x·dx
        </p>
        <p className="sr-only">
          The board reads: the integral from 0 to 1 of 2x times e to the x squared, dx. Underneath it,
          u equals x squared and du equals 2x dx.
        </p>
      </>
    )
  }

  if (block === 'next') {
    return (
      <>
        <p className="tech-label">{t.onTheBoard}</p>
        <p className="math-line" aria-hidden="true">
          x = 0 → u = 0
          <br />x = 1 → u = 1
        </p>
        <p className="math-line math-soft" aria-hidden="true">
          <Integral lower="0" upper="1">
            e<sup>u</sup> du
          </Integral>
        </p>
        <p className="sr-only">
          The limits change: when x is 0, u is 0; when x is 1, u is 1. The integral becomes the integral
          from 0 to 1 of e to the u, du.
        </p>
      </>
    )
  }

  return (
    <>
      <p className="tech-label">{t.onTheBoard}</p>
      <p className="math-line" aria-hidden="true">
        [e<sup>u</sup>] from 0 to 1 = e¹ − e⁰
      </p>
      <p className="math-line math-soft" aria-hidden="true">
        = e − 1 &nbsp;(exact)
      </p>
      <p className="sr-only">
        The calculation is: e to the u evaluated from 0 to 1, which equals e to the 1 minus e to the 0,
        which equals e minus 1 exact. Do not write a decimal.
      </p>
    </>
  )
}

export default function App() {
  // Requirement 4: On initial load, default to Calendar Schedule & Live Class Selection
  const [activeView, setActiveView] = useState<ViewMode>('calendar')
  const [openTech, setOpenTech] = useState<BlockKey | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [recordingActive, setRecordingActive] = useState(true)

  // Side Navigation Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Language & i18n State
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('bullseye_language') as SupportedLanguage
      if (saved && ['en', 'es', 'zh', 'hi'].includes(saved)) {
        return saved
      }
    } catch {
      // ignore
    }
    return 'en'
  })

  const t = translations[language]

  // Sensory & Accessibility Toolbar State
  const [calmMode, setCalmMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('bullseye_calm_mode') === 'true'
    } catch {
      return false
    }
  })
  const [fontScale, setFontScale] = useState<number>(1.0)

  // Step Progress State
  const [stepCompleted, setStepCompleted] = useState(false)
  const [activeStepNumber, setActiveStepNumber] = useState(2)

  // Calendar Hub State
  const [selectedDate, setSelectedDate] = useState<string>('Fri Nov 14 (Today)')
  const [roomCodeInput, setRoomCodeInput] = useState<string>('MATH-2B')
  const [currentCourse, setCurrentCourse] = useState<string>('MATH 2B')
  const [currentTopic, setCurrentTopic] = useState<string>('Lecture 14: Integrals')
  const [expandedOutlineId, setExpandedOutlineId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Help Me Rejoin State
  const [rejoinInput, setRejoinInput] = useState<string>('I got confused when changing the bounds')
  const [rejoinGenerated, setRejoinGenerated] = useState<boolean>(true)

  // EdStem State
  const [edstemQuestions, setEdstemQuestions] = useState<EdstemQuestion[]>(initialEdstemQuestions)
  const [newQuestionModalOpen, setNewQuestionModalOpen] = useState<boolean>(false)
  const [newQuestionText, setNewQuestionText] = useState<string>('')

  // Welcome Tour State
  const [tourOpen, setTourOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('bullseye_tour_seen') !== 'true'
    } catch {
      return false
    }
  })
  const [tourStep, setTourStep] = useState<number>(0)

  const profileRef = useRef<HTMLDivElement | null>(null)
  const cardsRowRef = useRef<HTMLDivElement | null>(null)
  const arenaRef = useRef<HTMLDivElement | null>(null)

  // Persist calm mode
  useEffect(() => {
    try {
      localStorage.setItem('bullseye_calm_mode', calmMode ? 'true' : 'false')
    } catch {
      // ignore
    }
  }, [calmMode])

  // Persist language
  useEffect(() => {
    try {
      localStorage.setItem('bullseye_language', language)
    } catch {
      // ignore
    }
  }, [language])

  // Apply font scale to document
  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', `${fontScale}rem`)
  }, [fontScale])

  const openTour = () => {
    setTourStep(0)
    setTourOpen(true)
    setProfileOpen(false)
  }

  const closeTour = () => {
    setTourOpen(false)
    try {
      localStorage.setItem('bullseye_tour_seen', 'true')
    } catch {
      // ignore
    }
  }

  // Keyboard navigation & Esc listener
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      // Ignore when typing in an input
      if (['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement)?.tagName)) {
        if (event.key === 'Escape') {
          setNewQuestionModalOpen(false)
        }
        return
      }

      if (event.key === 'Escape') {
        setDrawerOpen(false)
        setNewQuestionModalOpen(false)
        setProfileOpen(false)
        setOpenTech(null)
        if (tourOpen) closeTour()
        return
      }

      if (event.key === 'c' || event.key === 'C') {
        setCalmMode((prev) => !prev)
        return
      }

      if (event.key === ']' || event.key === 'ArrowRight') {
        if (tourOpen) {
          setTourStep((s) => (s < tourSteps.length - 1 ? s + 1 : s))
        }
      }

      if (event.key === '[' || event.key === 'ArrowLeft') {
        if (tourOpen) {
          setTourStep((s) => (s > 0 ? s - 1 : s))
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tourOpen])

  // Close menus on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  // 3D Tilt interaction for Now Focus Arena
  const handleArenaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (calmMode || !arenaRef.current || !cardsRowRef.current) return
    const rect = arenaRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 6
    cardsRowRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleArenaMouseLeave = () => {
    if (cardsRowRef.current) {
      cardsRowRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
    }
  }

  const toggleStepCompletion = () => {
    setStepCompleted((prev) => {
      const next = !prev
      if (next) {
        setActiveStepNumber(3)
      } else {
        setActiveStepNumber(2)
      }
      return next
    })
  }

  const handleJoinClass = (course: string, topic: string) => {
    setCurrentCourse(course)
    setCurrentTopic(topic)
    setActiveView('now')
  }

  const handlePostEdstemQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQuestionText.trim()) return
    const newQ: EdstemQuestion = {
      id: Date.now().toString(),
      author: 'You (Anonymous)',
      timeAgo: 'Just now',
      question: newQuestionText.trim(),
      stepTag: 'Step 2: Integration Limits',
      isEndorsed: false,
    }
    setEdstemQuestions([newQ, ...edstemQuestions])
    setNewQuestionText('')
    setNewQuestionModalOpen(false)
    setActiveView('edstem')
  }

  return (
    <div className={`app ${calmMode ? 'calm-mode' : ''}`}>
      <InteractiveBackground calm={calmMode} />

      {/* ================= SIDE NAVIGATION DRAWER ================= */}
      <SideNav
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeView={activeView}
        onSelectView={(v) => setActiveView(v)}
        onOpenTour={openTour}
        edstemCount={edstemQuestions.length}
        t={t}
      />

      {/* ================= TOP APPLICATION HEADER ================= */}
      <header className="revamped-top-bar" role="banner">
        {/* Left: Sleek Hamburger Drawer Toggle + Brand & Course Crumb */}
        <div className="revamped-brand-row">
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label={t.menu}
            aria-expanded={drawerOpen}
            title={t.navigation}
          >
            <Menu size={20} strokeWidth={2.4} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="revamped-brand-btn"
            onClick={() => setActiveView('calendar')}
            title="Open Class Schedule & Hub"
          >
            <Target size={22} strokeWidth={2.8} className="revamped-brand-icon" aria-hidden="true" />
            <span className="revamped-brand-name">{t.appName}</span>
          </button>

          <span className="revamped-crumb-divider">/</span>

          <div className="revamped-crumb-wrap">
            <button
              type="button"
              className="revamped-course-crumb"
              onClick={() => setActiveView(activeView === 'calendar' ? 'now' : 'calendar')}
              title="Click to view classes or switch course"
            >
              <span>{currentCourse}</span>
              <span className="crumb-arrow">▼</span>
            </button>

            <span className="revamped-crumb-dot">·</span>
            <span className="revamped-topic-crumb">{currentTopic}</span>
            <span className="live-crumb-badge" title="Live lecture in session">
              <span className="live-mic-pulse-beacon" aria-hidden="true" />
              LIVE
            </span>
          </div>
        </div>

        {/* Right: Essential, Focused Action Controls (Strict Single-Home Placement) */}
        <div className="revamped-actions-row">
          {/* Live Audio Telemetry Pill (Single Home for Audio Controls) */}
          <button
            type="button"
            className={`header-live-waveform-pill ${recordingActive ? 'active' : 'paused'}`}
            onClick={() => setRecordingActive((prev) => !prev)}
            title={`Teacher Audio Stream: Prof. Chen · Live Sync (${recordingActive ? 'Click to Pause' : 'Click to Resume'})`}
            aria-label={`Teacher audio stream ${recordingActive ? 'live 48kHz' : 'paused'}`}
          >
            <span className="live-mic-pulse-beacon" aria-hidden="true" />
            <div className="live-audio-waveform-bars" aria-hidden="true">
              <span className="wave-bar bar-1" />
              <span className="wave-bar bar-2" />
              <span className="wave-bar bar-3" />
              <span className="wave-bar bar-4" />
              <span className="wave-bar bar-5" />
            </div>
            <span className="live-waveform-label">
              {recordingActive ? '48kHz LIVE' : 'AUDIO PAUSED'}
            </span>
          </button>

          {/* Sensory Calm Mode Toggle (Single Home for Quick Neurodivergent Freeze) */}
          <button
            type="button"
            className={`toolbar-btn calm-btn ${calmMode ? 'calm-active' : ''}`}
            onClick={() => setCalmMode((prev) => !prev)}
            title={t.calmModeTitle}
            aria-pressed={calmMode}
          >
            <span aria-hidden="true">🕊️</span>
            <span className="calm-btn-label">{calmMode ? t.calmOn : t.calmMode}</span>
          </button>

          {/* Profile & User Settings Menu (Single Home for Secondary Settings) */}
          <div className="profile-container" ref={profileRef}>
            <button
              type="button"
              className="profile-btn"
              aria-expanded={profileOpen}
              aria-haspopup="true"
              aria-label="Account, profile and settings"
              onClick={() => setProfileOpen((prev) => !prev)}
            >
              <span className="profile-btn-avatar">S</span>
            </button>

            {profileOpen && (
              <div className="profile-menu" role="menu" aria-label="User settings and account menu">
                {/* User Identity Header */}
                <div className="profile-menu-header">
                  <div className="profile-user-row">
                    <span className="profile-avatar-circle">S</span>
                    <div className="profile-user-meta">
                      <span className="profile-name">{t.studentAccount}</span>
                      <span className="profile-status">{currentCourse} · {t.activeStatus}</span>
                    </div>
                  </div>
                </div>

                <hr className="profile-divider" />

                {/* Language Settings (Single Home for Language) */}
                <div className="profile-settings-group">
                  <div className="profile-group-label">
                    <div className="profile-group-label-left">
                      <Globe size={13} aria-hidden="true" />
                      <span>{t.language}</span>
                    </div>
                  </div>
                  <div className="profile-lang-grid" role="radiogroup" aria-label={t.language}>
                    {SUPPORTED_LANGUAGES.map((l) => {
                      const isSelected = language === l.code
                      return (
                        <button
                          key={l.code}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          className={`profile-lang-pill ${isSelected ? 'active' : ''}`}
                          onClick={() => setLanguage(l.code)}
                          title={l.nativeName}
                        >
                          <span className="profile-lang-flag">{l.flag}</span>
                          <span className="profile-lang-code">{l.code.toUpperCase()}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <hr className="profile-divider" />

                {/* Font Scaling Accessibility Settings (Single Home for Text Sizing) */}
                <div className="profile-settings-group">
                  <div className="profile-group-label">
                    <span>{t.fontSize}</span>
                    <span className="profile-font-percent">{Math.round(fontScale * 100)}%</span>
                  </div>
                  <div className="profile-font-controls">
                    <button
                      type="button"
                      className="profile-scale-btn"
                      onClick={() => setFontScale((s) => Math.max(0.85, Number((s - 0.08).toFixed(2))))}
                      title={t.decreaseFont}
                      aria-label={t.decreaseFont}
                    >
                      A- Smaller
                    </button>
                    <button
                      type="button"
                      className="profile-scale-btn"
                      onClick={() => setFontScale((s) => Math.min(1.3, Number((s + 0.08).toFixed(2))))}
                      title={t.increaseFont}
                      aria-label={t.increaseFont}
                    >
                      A+ Larger
                    </button>
                  </div>
                </div>

                <hr className="profile-divider" />

                {/* Secondary Actions */}
                <button
                  type="button"
                  role="menuitem"
                  className="profile-menu-item"
                  onClick={openTour}
                >
                  <Compass size={15} aria-hidden="true" />
                  <span>{t.welcomeTour}</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="profile-menu-item profile-logout"
                  onClick={() => setProfileOpen(false)}
                >
                  <LogOut size={15} aria-hidden="true" />
                  <span>{t.signOut}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT VIEWS ================= */}
      <main className="revamped-main-stage">
        {/* VIEW 6: CALENDAR & CLASS JOIN HUB (DEFAULT LANDING VIEW) */}
        {activeView === 'calendar' && (
          <section className="calendar-container" aria-label="Class schedule and join hub">
            <div className="calendar-top-bar">
              <div>
                <h2 className="calendar-title">{t.calendarTitle}</h2>
                <p className="calendar-sub">
                  <span>{t.calendarSubtitle}</span>
                  <span className="calendar-crumb-dot">·</span>
                  <span className="calendar-canvas-status">
                    <CanvasLogo size={13} />
                    <span>Canvas Synced</span>
                  </span>
                </p>
              </div>

              {/* Room Code Quick Join */}
              <div className="quick-code-box">
                <span className="quick-code-label">{t.roomCodeLabel}</span>
                <input
                  type="text"
                  className="quick-code-input"
                  value={roomCodeInput}
                  onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                  placeholder="e.g. MATH-2B"
                  aria-label={t.roomCodeLabel}
                />
                <button
                  type="button"
                  className="quick-code-btn"
                  onClick={() => handleJoinClass(roomCodeInput.trim() || 'MATH 2B', 'Lecture 14: Integrals')}
                >
                  {t.joinLiveBtn}
                </button>
              </div>
            </div>

            {/* Weekly Date Selector Bar */}
            <div className="weekly-date-nav">
              <div className="date-pills-row">
                {Object.keys(scheduleData).map((dateKey) => {
                  const isActive = selectedDate === dateKey
                  const isToday = dateKey.includes('Today')
                  return (
                    <button
                      key={dateKey}
                      type="button"
                      className={`date-pill-btn ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedDate(dateKey)
                        setExpandedOutlineId(null)
                      }}
                    >
                      <span className="pill-day">{dateKey.split(' ')[0]}</span>
                      <span className="pill-date">{dateKey.split(' ')[1]}</span>
                      <span className="pill-status">
                        {isToday ? t.liveClassCount : `${scheduleData[dateKey].length} ${t.classesCount}`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Scheduled Classes for Selected Date */}
            <div className="scheduled-classes-section">
              <div className="scheduled-section-header">
                <h3 className="scheduled-section-title">
                  {t.classesForDate} {selectedDate}
                </h3>
                <span className="scheduled-count-badge">
                  {scheduleData[selectedDate]?.length || 0} enrolled classes
                </span>
              </div>

              <div className="scheduled-cards-stack">
                {scheduleData[selectedDate]?.map((cls) => {
                  const isExpanded = expandedOutlineId === cls.id
                  return (
                    <div
                      key={cls.id}
                      className={`scheduled-class-card ${cls.isLive ? 'class-live' : ''} ${isExpanded ? 'card-expanded' : ''}`}
                    >
                      <div className="class-card-top-row">
                        <div className="class-info">
                          <div className="class-status-line">
                            {cls.isLive ? (
                              <span className="badge-live-now">
                                <span className="live-broadcast-indicator" aria-hidden="true" />
                                {t.liveNowBadge}
                              </span>
                            ) : (
                              <span className="badge-upcoming">{t.upcomingBadge}</span>
                            )}
                            <span className="class-time">{cls.time}</span>
                            <span className="class-loc">· {cls.location}</span>
                            <span className="class-prof">· {cls.instructor}</span>
                          </div>
                          <h4 className="class-name">{cls.title}</h4>
                          <p className="class-topic">
                            <strong>{t.topicLabel}</strong> {cls.topic}
                          </p>
                          <div className="class-canvas-pill">
                            <CanvasLogo size={13} />
                            <span className="class-canvas-sync">{cls.canvasSync}</span>
                          </div>
                        </div>

                        <div className="class-action-wrap">
                          {cls.isLive && (
                            <button
                              type="button"
                              className="btn-enter-live"
                              onClick={() => handleJoinClass(cls.code, cls.topic)}
                            >
                              <span>{t.enterLiveClassCTA}</span>
                              <ArrowRight size={14} aria-hidden="true" />
                            </button>
                          )}
                          <button
                            type="button"
                            className={`btn-preview-class ${isExpanded ? 'active' : ''}`}
                            onClick={() =>
                              setExpandedOutlineId((prev) => (prev === cls.id ? null : cls.id))
                            }
                            aria-expanded={isExpanded}
                            title="Toggle lecture syllabus, formulas, and rubric data"
                          >
                            <span>{isExpanded ? 'Hide Outline ▲' : 'Preview Outline ▼'}</span>
                          </button>
                        </div>
                      </div>

                      {/* INLINE RICH LECTURE DATA (NO MODAL/DIALOG BOX) */}
                      {isExpanded && cls.outline && (
                        <div className="class-outline-drawer" role="region" aria-label="Course outline details">
                          <div className="outline-grid">
                            {/* Unit & Summary Box */}
                            <div className="outline-box">
                              <span className="outline-box-title">Course Unit & Scope</span>
                              <strong className="outline-unit-name">{cls.outline.unit}</strong>
                              <p className="outline-summary-text">{cls.outline.summary}</p>
                            </div>

                            {/* Key Concepts & Mathematical Formulas */}
                            <div className="outline-box">
                              <span className="outline-box-title">Key Core Concepts</span>
                              <ul className="outline-concepts-list">
                                {cls.outline.keyConcepts.map((concept, i) => (
                                  <li key={i}>{concept}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Reading & Preparation */}
                            <div className="outline-box">
                              <span className="outline-box-title">Assigned Reading & Textbook</span>
                              <p className="outline-reading-text">📖 {cls.outline.reading}</p>
                              {cls.outline.officeHours && (
                                <p className="outline-office-hours">🕒 {cls.outline.officeHours}</p>
                              )}
                            </div>

                            {/* Canvas Assignment & Grading Invariant */}
                            <div className="outline-box rubric-box">
                              <span className="outline-box-title">Canvas LMS Rubric Constraint</span>
                              <div className="outline-rubric-note">
                                ⚖️ {cls.outline.rubricConstraint}
                              </div>
                              <p className="outline-assignment-meta">
                                📋 {cls.outline.assignments}
                              </p>
                            </div>
                          </div>

                          <div className="outline-footer-actions">
                            <button
                              type="button"
                              className="btn-launch-course-horizon"
                              onClick={() => handleJoinClass(cls.code, cls.topic)}
                            >
                              <span>Enter {cls.code} Focus Horizon</span>
                              <ArrowRight size={13} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* VIEW 1: NOW FOCUS (3D PERSPECTIVE CARDS) */}
        {activeView === 'now' && (
          <div
            ref={arenaRef}
            className="now-perspective-arena"
            onMouseMove={handleArenaMouseMove}
            onMouseLeave={handleArenaMouseLeave}
          >
            {/* TRIADIC WORKING-MEMORY HORIZON */}
            <div className="horizon-step-flow-bar" role="region" aria-label={t.workingMemoryHorizon}>
              <div className="step-flow-header">
                <div className="step-flow-badge-wrap">
                  <span className="step-flow-badge">
                    <span className="step-flow-beacon" aria-hidden="true" />
                    <span>{t.checkpointLabel} {activeStepNumber} {t.ofLabel} 4</span>
                  </span>
                  <span className="step-flow-desc">
                    {activeStepNumber === 2
                      ? t.step2Title
                      : activeStepNumber === 3
                      ? t.step3Title
                      : 'Activity Progress'}
                  </span>
                </div>
                <div className="step-flow-meta">
                  <span className="step-flow-canvas-tag">
                    <CanvasLogo size={13} />
                    <span>{t.canvasWorksheetSync}</span>
                  </span>
                  <span className="step-flow-pct">
                    {stepCompleted ? `75% ${t.completePct}` : `50% ${t.completePct}`}
                  </span>
                </div>
              </div>

              {/* Animated Flowing Progress Track */}
              <div className="step-flow-track-wrap">
                <div className="step-flow-track">
                  <div
                    className="step-flow-fill"
                    style={{ width: stepCompleted ? '75%' : '50%' }}
                  >
                    <span className="step-flow-shimmer" aria-hidden="true" />
                    <span className="step-flow-head" aria-hidden="true" />
                  </div>
                </div>

                {/* 4 Interactive Step Milestones */}
                <div className="step-milestones-row">
                  <button
                    type="button"
                    className="step-milestone-chip done"
                    onClick={() => setActiveView('overview')}
                    title="View Step 1 (Completed)"
                  >
                    <span className="milestone-num"><Check size={12} strokeWidth={3} /></span>
                    <span className="milestone-text">1. Set u = 2x+1</span>
                  </button>

                  <button
                    type="button"
                    className={`step-milestone-chip ${stepCompleted ? 'done' : 'active'}`}
                    onClick={() => setActiveView('now')}
                    title="Step 2 (Current Focus)"
                  >
                    <span className="milestone-num">{stepCompleted ? <Check size={12} strokeWidth={3} /> : '2'}</span>
                    <span className="milestone-text">2. Change Limits</span>
                  </button>

                  <button
                    type="button"
                    className={`step-milestone-chip ${stepCompleted ? 'active' : 'upcoming'}`}
                    onClick={toggleStepCompletion}
                    title="Step 3 (Click to advance/undo)"
                  >
                    <span className="milestone-num">3</span>
                    <span className="milestone-text">3. Integrate in u</span>
                  </button>

                  <button
                    type="button"
                    className="step-milestone-chip upcoming"
                    onClick={() => setActiveView('overview')}
                    title="View Step 4 (Final Canvas Submit)"
                  >
                    <span className="milestone-num">4</span>
                    <span className="milestone-text">4. Canvas Submit</span>
                  </button>
                </div>
              </div>
            </div>

            <div ref={cardsRowRef} className="now-cards-row">
              {/* LEFT CARD: CONTEXT ANCHOR (ANTECEDENT STATE) */}
              <div className="card-3d card-dimmed">
                <div className="kicker-row">
                  <div className="kicker-title-group">
                    <h2 className="kicker">{t.contextAnchorTitle}</h2>
                    <span className="kicker-sub">{t.contextAnchorSub}</span>
                  </div>
                  <button
                    type="button"
                    className="block-info"
                    aria-expanded={openTech === 'where'}
                    aria-label="Show technical specification of antecedent context"
                    onClick={() => setOpenTech(openTech === 'where' ? null : 'where')}
                  >
                    <Info size={15} aria-hidden="true" />
                  </button>
                </div>
                <p className="context">{t.lectureWhere}</p>
              </div>

              {/* CENTER CARD: ACTIVE DIRECTIVE (FOCAL EXECUTION) */}
              <div className="card-3d card-focus">
                {/* Course Context Header inside Center Card */}
                <p className="card-course-kicker">{t.lectureCourse}</p>

                <div className="kicker-row center-kicker-row">
                  <div className="kicker-title-group">
                    <h2 className="kicker action-kicker">{t.activeDirectiveTitle}</h2>
                    <span className="kicker-sub">{t.activeDirectiveSub}</span>
                  </div>
                  <button
                    type="button"
                    className="block-info"
                    aria-expanded={openTech === 'next'}
                    aria-label="Show technical specification of active directive"
                    onClick={() => setOpenTech(openTech === 'next' ? null : 'next')}
                  >
                    <Info size={15} aria-hidden="true" />
                  </button>
                </div>

                <h1 className="action" aria-live="polite">
                  {stepCompleted ? t.lectureNextCompleted : t.lectureNext}
                </h1>

                {/* Primary Step Completion Button & Stuck Route */}
                <div className="step-action-bar">
                  <button
                    type="button"
                    className={`step-complete-btn ${stepCompleted ? 'completed' : ''}`}
                    onClick={toggleStepCompletion}
                  >
                    {stepCompleted ? (
                      <>
                        <RotateCcw size={15} aria-hidden="true" />
                        <span>{t.undoCheckpoint}</span>
                      </>
                    ) : (
                      <>
                        <Check size={16} aria-hidden="true" />
                        <span>{t.completeCheckpoint}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="step-stuck-btn"
                    onClick={() => setActiveView('rejoin')}
                  >
                    {t.resynchronize}
                  </button>
                </div>
              </div>

              {/* RIGHT CARD: INVARIANT CONSTRAINTS (RUBRIC & DEADLINES) */}
              <div className="card-3d card-dimmed">
                <div className="kicker-row">
                  <div className="kicker-title-group">
                    <h2 className="kicker">{t.invariantConstraintsTitle}</h2>
                    <span className="kicker-sub">{t.invariantConstraintsSub}</span>
                  </div>
                  <button
                    type="button"
                    className="block-info"
                    aria-expanded={openTech === 'keep'}
                    aria-label="Show technical specification of invariant constraints"
                    onClick={() => setOpenTech(openTech === 'keep' ? null : 'keep')}
                  >
                    <Info size={15} aria-hidden="true" />
                  </button>
                </div>
                <p className="constraints">{t.lectureKeep}</p>

                {/* Canvas Verified Deadline */}
                <div className="card-canvas-badge">
                  <CanvasLogo size={16} />
                  <span>{t.canvasDueToday}</span>
                  <span className="canvas-badge-sync-dot" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Surfaced Ambiguity Warning */}
            <div className="ambiguity-callout" role="alert">
              <div className="ambiguity-text">
                <AlertTriangle size={15} className="ambiguity-icon" aria-hidden="true" />
                <span>
                  <strong>{t.ambiguityWarning.split(' ')[0]} {t.ambiguityWarning.split(' ')[1]}</strong>{' '}
                  {t.ambiguityWarning.split(' ').slice(2).join(' ')}
                </span>
              </div>
              <button
                type="button"
                className="ambiguity-btn"
                onClick={() => {
                  navigator.clipboard?.writeText(
                    'Excuse me Professor, where should we submit the in-class assignment today?'
                  )
                  setToastMessage(t.questionCopiedAlert)
                  setTimeout(() => setToastMessage(null), 3000)
                }}
              >
                {t.askInstructor}
              </button>
            </div>

            {/* In-Context EdStem Thread Banner */}
            <div className="edstem-context-banner">
              <div className="edstem-context-info">
                <span className="edstem-icon-badge" aria-hidden="true">
                  <EdStemLogo size={16} />
                </span>
                <span>
                  <strong>{t.threadTitle}</strong> "Do limits flip if u(0) &gt; u(4)?"
                </span>
              </div>
              <button
                type="button"
                className="edstem-view-answer-btn"
                onClick={() => setActiveView('edstem')}
              >
                {t.viewTAAnswer}
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: ALL STEPS OVERVIEW */}
        {activeView === 'overview' && (
          <section className="overview-container" aria-label="Step-by-step activity overview">
            <div className="view-top-back-row">
              <button
                type="button"
                className="view-back-btn"
                onClick={() => setActiveView('now')}
              >
                {t.backToTask}
              </button>
            </div>
            <div className="overview-header">
              <div>
                <h2 className="overview-title">{t.overviewTitle}</h2>
                <div className="overview-sub-row">
                  <CanvasLogo size={14} className="sync-canvas-icon" />
                  <p className="overview-sub">{t.overviewSubtitle}</p>
                </div>
              </div>
              <span className="overview-badge">
                {stepCompleted ? t.overviewProgress : '1 Completed · 1 In Progress'}
              </span>
            </div>

            <div className="overview-progress-bar-wrap">
              <div className="step-flow-track">
                <div
                  className="step-flow-fill"
                  style={{ width: stepCompleted ? '75%' : '50%' }}
                >
                  <span className="step-flow-shimmer" aria-hidden="true" />
                  <span className="step-flow-head" aria-hidden="true" />
                </div>
              </div>
            </div>

            <ol className="overview-step-list">
              {/* Step 1 */}
              <li className="step-item step-completed">
                <div className="step-marker done">✓</div>
                <div className="step-body">
                  <div className="step-meta">
                    <span className="step-num">Step 1 · {t.stepCompletedBadge}</span>
                    <span className="step-time">~5 mins</span>
                  </div>
                  <h3 className="step-heading line-through">{t.step1Title}</h3>
                  <p className="step-desc">{t.step1Desc}</p>
                </div>
              </li>

              {/* Step 2 */}
              <li className={`step-item ${stepCompleted ? 'step-completed' : 'step-active'}`}>
                <div className={`step-marker ${stepCompleted ? 'done' : 'active'}`}>
                  {stepCompleted ? '✓' : '2'}
                </div>
                <div className="step-body">
                  <div className="step-meta">
                    <span className="step-num">
                      Step 2 · {stepCompleted ? t.stepCompletedBadge : t.stepCurrentBadge}
                    </span>
                    <span className="step-badge">{stepCompleted ? 'Done' : 'Active'}</span>
                  </div>
                  <h3 className="step-heading">{t.step2Title}</h3>
                  <p className="step-desc">{t.step2Desc}</p>
                  <div className="step-actions">
                    <button
                      type="button"
                      className="step-jump-btn"
                      onClick={() => setActiveView('now')}
                    >
                      {t.focusOnStep}
                    </button>
                  </div>
                </div>
              </li>

              {/* Step 3 */}
              <li className="step-item step-upcoming">
                <div className="step-marker upcoming">3</div>
                <div className="step-body">
                  <div className="step-meta">
                    <span className="step-num">Step 3 · {t.stepUpcomingBadge}</span>
                    <span className="step-time">~6 mins</span>
                  </div>
                  <h3 className="step-heading">{t.step3Title}</h3>
                  <p className="step-desc">{t.step3Desc}</p>
                </div>
              </li>

              {/* Step 4 */}
              <li className="step-item step-upcoming">
                <div className="step-marker upcoming">4</div>
                <div className="step-body">
                  <div className="step-meta">
                    <span className="step-num">Step 4 · {t.stepFinalBadge}</span>
                    <span className="step-time">~3 mins</span>
                  </div>
                  <h3 className="step-heading">{t.step4Title}</h3>
                  <p className="step-desc">{t.step4Desc}</p>
                </div>
              </li>
            </ol>
          </section>
        )}

        {/* VIEW 3: HELP ME REJOIN (CATCH-UP ASSISTANT) */}
        {activeView === 'rejoin' && (
          <section className="rejoin-container" aria-label="Catch me up safe rejoin flow">
            <div className="view-top-back-row">
              <button
                type="button"
                className="view-back-btn"
                onClick={() => setActiveView('now')}
              >
                {t.backToTask}
              </button>
            </div>
            <div className="rejoin-header">
              <span className="rejoin-icon" aria-hidden="true">🔄</span>
              <div>
                <h2 className="rejoin-title">{t.rejoinTitle}</h2>
                <p className="rejoin-sub">{t.rejoinSubtitle}</p>
              </div>
            </div>

            <div className="rejoin-form-wrap">
              <label htmlFor="rejoinQuery" className="rejoin-label">
                {t.rejoinPrompt}
              </label>
              <div className="rejoin-input-row">
                <input
                  id="rejoinQuery"
                  type="text"
                  className="rejoin-input"
                  value={rejoinInput}
                  onChange={(e) => setRejoinInput(e.target.value)}
                  placeholder={t.rejoinPlaceholder}
                />
                <button
                  type="button"
                  className="rejoin-submit-btn"
                  onClick={() => setRejoinGenerated(true)}
                >
                  {t.catchMeUpBtn}
                </button>
              </div>
            </div>

            {rejoinGenerated && (
              <div className="recap-card" role="region" aria-label="Rejoin summary">
                <div className="recap-head">
                  <span className="recap-tag">{t.recapHeading}</span>
                  <span className="recap-audio-sync">{t.recapAudioSync}</span>
                </div>
                <p className="recap-text">
                  {t.recapText}
                </p>
                <div className="recap-foot">
                  <span className="recap-action-cue">
                    {t.recapActionCue}
                  </span>
                  <button
                    type="button"
                    className="recap-back-btn"
                    onClick={() => setActiveView('now')}
                  >
                    {t.backToTask} →
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* VIEW 4: EDSTEM LIVE Q&A */}
        {activeView === 'edstem' && (
          <section className="edstem-container" aria-label="EdStem discussion thread">
            <div className="view-top-back-row">
              <button
                type="button"
                className="view-back-btn"
                onClick={() => setActiveView('now')}
              >
                {t.backToTask}
              </button>
            </div>
            <div className="edstem-header">
              <div className="edstem-title-wrap">
                <div className="edstem-badge-icon" aria-hidden="true">
                  <EdStemLogo size={24} />
                </div>
                <div>
                  <h2 className="edstem-title">{t.edstemTitle}</h2>
                  <p className="edstem-sub">{t.edstemSubtitle}</p>
                </div>
              </div>

              <button
                type="button"
                className="edstem-ask-btn"
                onClick={() => setNewQuestionModalOpen(true)}
              >
                {t.askEdstemBtn}
              </button>
            </div>

            <div className="edstem-thread-list">
              {edstemQuestions.map((q) => (
                <div key={q.id} className="edstem-post-card">
                  <div className="edstem-post-meta">
                    <div className="edstem-author-row">
                      <span className="edstem-author">{q.author}</span>
                      <span className="edstem-step-tag">{q.stepTag}</span>
                      {q.isEndorsed && (
                        <span className="edstem-endorsed-tag">{t.taEndorsedTag}</span>
                      )}
                    </div>
                    <span className="edstem-time">{q.timeAgo}</span>
                  </div>

                  <p className="edstem-question-body">{q.question}</p>

                  {q.answer && (
                    <div className="edstem-answer-box">
                      <span className="edstem-answerer">{q.answer.author}:</span>
                      <p className="edstem-answer-text">{q.answer.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {newQuestionModalOpen && (
              <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Ask EdStem Question">
                <div className="edstem-modal">
                  <div className="modal-head">
                    <h3 className="modal-title">{t.modalTitle}</h3>
                    <button
                      type="button"
                      className="modal-close"
                      onClick={() => setNewQuestionModalOpen(false)}
                      aria-label="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <form onSubmit={handlePostEdstemQuestion}>
                    <p className="modal-hint">
                      <code>{t.modalTagNotice}</code>
                    </p>
                    <textarea
                      className="edstem-textarea"
                      rows={3}
                      placeholder={t.modalPlaceholder}
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      required
                    />
                    <div className="modal-foot">
                      <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={() => setNewQuestionModalOpen(false)}
                      >
                        {t.cancelBtn}
                      </button>
                      <button type="submit" className="modal-submit-btn">
                        {t.postBtn}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </section>
        )}

        {/* VIEW 5: ORIGINAL SOURCE */}
        {activeView === 'source' && (
          <section className="source-container" aria-label="Original teacher instructions">
            <div className="view-top-back-row">
              <button
                type="button"
                className="view-back-btn"
                onClick={() => setActiveView('now')}
              >
                {t.backToTask}
              </button>
            </div>
            <div className="source-header">
              <div className="source-title-wrap">
                <span className="source-icon" aria-hidden="true">📜</span>
                <div>
                  <h2 className="source-title">Original Instructor Instructions (Verbatim)</h2>
                  <p className="source-sub">Inspect the exact source text from the board and syllabus</p>
                </div>
              </div>
              <span className="source-verified-chip">Teacher Verified</span>
            </div>

            <blockquote className="source-quote font-mono">
              "Class, open to problem 2 on page 142. Evaluate the definite integral from 0 to 4 of (2x+1)^3 dx using u-substitution. Work in pairs if you want, but each student writes their own sheet. <mark className="source-highlight">Crucial: change your limits of integration when substituting u so you don't have to back-substitute at the end.</mark> We have 15 minutes. Upload to Canvas."
            </blockquote>

            <div className="source-breakdown-grid">
              <div className="breakdown-card">
                <strong className="breakdown-title text-plum">Preserved Constraints:</strong>
                <ul className="breakdown-list">
                  <li>Pair work optional; separate submission required for every student</li>
                  <li>Must change limits of integration from x to u</li>
                  <li>15 minute in-class time limit</li>
                  <li>Exact fraction answer required; no rounded decimals</li>
                </ul>
              </div>

              <div className="breakdown-card">
                <strong className="breakdown-title text-amber">Surfaced Ambiguities:</strong>
                <p className="breakdown-desc">
                  "Upload to Canvas" did not specify which Canvas module folder. Checked Canvas API: submission is directed to <strong>"Lecture 14 Worksheet"</strong>.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ================= TECHNICAL MATH DETAILS POPOVER ================= */}
      {openTech !== null && (
        <div className="tech-card" role="dialog" aria-label={t.technicalDetails}>
          <div className="tech-head">
            <span>{t.technicalDetails}</span>
            <button
              type="button"
              className="tech-close"
              onClick={() => setOpenTech(null)}
              aria-label="Close technical version"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
          <Technical block={openTech} t={t} />
        </div>
      )}

      {/* ================= ACCESSIBLE WELCOME TOUR MODAL ================= */}
      {tourOpen && (
        <div className="tour-overlay" role="dialog" aria-modal="true" aria-label={t.welcomeTour}>
          <div className="tour-card">
            <div className="tour-card-header">
              <span className="tour-badge">
                Step {tourStep + 1} of {tourSteps.length}
              </span>
              <button
                type="button"
                className="tour-close-btn"
                onClick={closeTour}
                aria-label="Close tour"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="tour-body">
              <div className="tour-icon-wrap" aria-hidden="true">
                {(() => {
                  const IconComponent = tourSteps[tourStep].icon
                  return <IconComponent size={28} />
                })()}
              </div>
              <h3 className="tour-title">{tourSteps[tourStep].title}</h3>
              <p className="tour-subtitle">{tourSteps[tourStep].subtitle}</p>
              <p className="tour-description">{tourSteps[tourStep].description}</p>
              {tourSteps[tourStep].tip && (
                <div className="tour-tip">
                  <span className="tour-tip-tag">Tip: </span>
                  <span>{tourSteps[tourStep].tip}</span>
                </div>
              )}
            </div>

            <div className="tour-footer">
              <div className="tour-dots" aria-hidden="true">
                {tourSteps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`tour-dot ${i === tourStep ? 'active' : ''}`}
                    onClick={() => setTourStep(i)}
                    aria-label={`Go to tour step ${i + 1}`}
                  />
                ))}
              </div>

              <div className="tour-buttons">
                {tourStep > 0 && (
                  <button
                    type="button"
                    className="tour-btn tour-btn-secondary"
                    onClick={() => setTourStep((s) => s - 1)}
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                    <span>Back</span>
                  </button>
                )}

                {tourStep < tourSteps.length - 1 ? (
                  <button
                    type="button"
                    className="tour-btn tour-btn-primary"
                    onClick={() => setTourStep((s) => s + 1)}
                  >
                    <span>Next</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="tour-btn tour-btn-primary"
                    onClick={closeTour}
                  >
                    <span>Get Started</span>
                    <CheckCircle size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Non-Intrusive Toast Alert */}
      {toastMessage && (
        <div className="app-toast-notification" role="status" aria-live="polite">
          <CheckCircle size={16} className="toast-icon" aria-hidden="true" />
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="revamped-footer" role="contentinfo">
        <div className="footer-left">
          <span>✨ <strong>{t.footerStandard}</strong></span>
          <span className="footer-dot">•</span>
          <span className="footer-brand-pill">
            <CanvasLogo size={13} className="sync-canvas-icon" />
            <span>{t.footerCanvasApi}</span>
          </span>
          <span className="footer-dot">•</span>
          <span className="footer-brand-pill">
            <EdStemLogo size={13} className="header-edstem-icon" />
            <span>{t.footerEdstemSync}</span>
          </span>
          <span className="footer-dot">•</span>
          <span>{t.footerContrast}</span>
        </div>
        <div className="footer-right">
          <span>{t.footerKeys}</span>
          <span className="footer-dot">•</span>
          <span>{t.footerDignity}</span>
        </div>
      </footer>
    </div>
  )
}
