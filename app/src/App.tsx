import { useEffect, useRef, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Compass,
  Info,
  LogOut,
  MessageSquare,
  Mic,
  Radio,
  RotateCcw,
  Sparkles,
  Target,
  User,
  X,
} from 'lucide-react'
import '@fontsource/atkinson-hyperlegible/700.css'
import { InteractiveBackground } from './components/InteractiveBackground'
import { CanvasLogo, EdStemLogo } from './components/BrandLogos'
import './App.css'

/* Sample state from one Math 2B (Calculus) lecture on integrals.
   Synthetic, not a transcript, and no model is called. The visible copy is
   focused and accessible; technical derivation details live behind each info trigger. */
const lecture = {
  course: 'Math 2B · Lecture 14 · Integrals',
  where: 'Definite integration via substitution. Preceding step established parameter u = 2x + 1.',
  next: 'Transform integration limits in terms of u.',
  keep: 'Retain transformed limits throughout evaluation; do not back-substitute. Express solution as an exact fraction.',
}

type ViewMode = 'now' | 'overview' | 'rejoin' | 'edstem' | 'source' | 'calendar'

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

interface ScheduledClass {
  id: string
  code: string
  title: string
  time: string
  location: string
  topic: string
  isLive: boolean
  canvasSync: string
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
      isLive: false,
      canvasSync: 'Homework 3 Graded',
    },
    {
      id: 'm2',
      code: 'PHYS 7C',
      title: 'Classical Mechanics',
      time: '1:00 PM – 2:20 PM',
      location: 'PSLH 120',
      topic: 'Simple Harmonic Motion',
      isLive: false,
      canvasSync: 'Lab 2 Submitted',
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
      isLive: false,
      canvasSync: 'Quiz 3 Completed',
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
    },
    {
      id: 'w2',
      code: 'PHYS 7C',
      title: 'Classical Mechanics',
      time: '1:00 PM – 2:20 PM',
      location: 'PSLH 120',
      topic: 'Driven Oscillations & Resonance',
      isLive: false,
      canvasSync: 'Homework 4 Due',
    },
    {
      id: 'w3',
      code: 'COMPSCI 161',
      title: 'Algorithms Discussion',
      time: '5:00 PM – 5:50 PM',
      location: 'ICS 174',
      topic: 'Greedy Algorithms Practice',
      isLive: false,
      canvasSync: 'No submission required',
    },
  ],
  'Thu Nov 13': [
    {
      id: 'th1',
      code: 'COMPSCI 161',
      title: 'Design and Analysis of Algorithms',
      time: '3:30 PM – 4:50 PM',
      location: 'DBH 1100',
      topic: 'Dynamic Programming: Intro',
      isLive: false,
      canvasSync: 'Quiz 4 Prep Available',
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
    },
    {
      id: 'f2',
      code: 'PHYS 7C',
      title: 'Classical Mechanics',
      time: '1:00 PM – 2:20 PM',
      location: 'PSLH 120',
      topic: 'Damped Harmonic Oscillations',
      isLive: false,
      canvasSync: 'Lab 3 Opens at 1:00 PM',
    },
    {
      id: 'f3',
      code: 'COMPSCI 161',
      title: 'Design and Analysis of Algorithms',
      time: '3:30 PM – 4:50 PM',
      location: 'DBH 1100',
      topic: 'Dynamic Programming: Bellman-Ford',
      isLive: false,
      canvasSync: 'In-Class Quiz #4',
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
    icon: MessageSquare,
  },
  {
    title: 'Rejoin Whenever You Drift',
    subtitle: 'No penalties, no lost time',
    description:
      'Lost the thread? Tap "Help me rejoin" at the top. Type what you recall, and Bullseye provides a safe 10-second recap grounded in the current step.',
    tip: 'You can restart this tour anytime from the top bar or profile menu.',
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

function Technical({ block }: { block: BlockKey }) {
  if (block === 'where') {
    return (
      <>
        <p className="tech-label">On the board</p>
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
        <p className="tech-label">On the board</p>
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
      <p className="tech-label">On the board</p>
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
  const [activeView, setActiveView] = useState<ViewMode>('now')
  const [openTech, setOpenTech] = useState<BlockKey | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [liveDetailsOpen, setLiveDetailsOpen] = useState(false)
  const [recordingActive, setRecordingActive] = useState(true)

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
  const liveMenuRef = useRef<HTMLDivElement | null>(null)
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

  // Keyboard navigation
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
        setNewQuestionModalOpen(false)
        setLiveDetailsOpen(false)
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
      if (liveMenuRef.current && !liveMenuRef.current.contains(e.target as Node)) {
        setLiveDetailsOpen(false)
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

      {/* ================= TOP APPLICATION HEADER ================= */}
      <header className="revamped-top-bar" role="banner">
        
        {/* Left: Brand & Classroom Course Switcher */}
        <div className="revamped-brand-row">
          <button
            type="button"
            className="revamped-brand-btn"
            onClick={() => setActiveView('calendar')}
            title="Open Class Schedule & Hub"
          >
            <Target size={22} strokeWidth={2.8} className="revamped-brand-icon" aria-hidden="true" />
            <span className="revamped-brand-name">Bullseye</span>
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

            {/* Real-time Teacher Sync Live Audio Waveform & Mic Pulse */}
            <div
              className={`header-live-waveform-pill ${recordingActive ? 'active' : 'paused'} ${calmMode ? 'calm' : ''}`}
              title={recordingActive ? 'Prof. Chen microphone streaming live (34:12)' : 'Mic paused'}
              aria-label="Real-time teacher audio synchronization"
              onClick={() => setLiveDetailsOpen((prev) => !prev)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setLiveDetailsOpen((prev) => !prev)
                }
              }}
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
                {recordingActive ? 'LIVE SYNC' : 'PAUSED'}
              </span>
            </div>

            <span className="revamped-crumb-dot">·</span>
            <span className="revamped-topic-crumb">{currentTopic}</span>
          </div>
        </div>

        {/* Center: Simplified 2-Mode Segmented Pill */}
        <div className="center-view-selector" role="tablist" aria-label="Core view mode">
          <button
            type="button"
            role="tab"
            aria-selected={activeView === 'now'}
            className={`center-tab-btn ${activeView === 'now' ? 'active' : ''}`}
            onClick={() => setActiveView('now')}
          >
            <span aria-hidden="true">🎯</span>
            <span>Now Focus</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeView === 'overview'}
            className={`center-tab-btn ${activeView === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveView('overview')}
          >
            <span aria-hidden="true">📋</span>
            <span>All Steps (4)</span>
          </button>
        </div>

        {/* Right: Essential Action Controls */}
        <div className="revamped-actions-row">
          {/* EdStem Discussion Pill */}
          <button
            type="button"
            className={`header-edstem-pill ${activeView === 'edstem' ? 'active' : ''}`}
            onClick={() => setActiveView(activeView === 'edstem' ? 'now' : 'edstem')}
            title="EdStem live questions for this lecture"
          >
            <span className="edstem-pulse-dot" />
            <EdStemLogo size={14} className="header-edstem-icon" />
            <span>EdStem ({edstemQuestions.length})</span>
          </button>

          {/* Live Teacher Recorder Pill */}
          <div className="live-recorder-container" ref={liveMenuRef}>
            <button
              type="button"
              className={`live-recorder-btn ${recordingActive ? 'active' : 'paused'}`}
              aria-expanded={liveDetailsOpen}
              aria-haspopup="true"
              aria-label="Teacher live progress and audio recording details"
              onClick={() => setLiveDetailsOpen((prev) => !prev)}
            >
              <span className="live-pulse-dot" aria-hidden="true" />
              <Mic size={14} className="live-mic-icon" aria-hidden="true" />
              <span className="live-label">
                {recordingActive ? 'Prof. Chen' : 'Paused'}
              </span>
              <span className="live-time-chip">34:12</span>
            </button>

            {liveDetailsOpen && (
              <div className="live-details-popover" role="dialog" aria-label="Real-time lecture recording details">
                <div className="live-details-head">
                  <div className="live-details-title-row">
                    <span className="live-badge">Live Extract</span>
                    <span className="live-timer">34:12</span>
                  </div>
                  <h3 className="live-stream-title">Professor Mic Stream</h3>
                  <p className="live-stream-sub">Real-time lecture extraction &amp; progress sync</p>
                </div>
                <div className="live-progress-bar-wrap">
                  <div className="live-progress-labels">
                    <span>Lecture Progress</span>
                    <span>Step {activeStepNumber} of 4</span>
                  </div>
                  <div className="live-progress-track">
                    <div className="live-progress-fill" style={{ width: stepCompleted ? '75%' : '50%' }}>
                      <span className="step-flow-shimmer" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div className="live-details-meta">
                  <div className="live-meta-item">
                    <Activity size={14} aria-hidden="true" />
                    <span>Topic: Rewrite limits in terms of u</span>
                  </div>
                  <div className="live-meta-item">
                    <Radio size={14} aria-hidden="true" />
                    <span>Audio Stream: 48kHz stereo · 42ms sync</span>
                  </div>
                </div>
                <div className="live-details-foot">
                  <button
                    type="button"
                    className="live-toggle-btn"
                    onClick={() => setRecordingActive((prev) => !prev)}
                  >
                    {recordingActive ? 'Pause Stream' : 'Resume Stream'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Calm Mode Toggle */}
          <button
            type="button"
            className={`toolbar-btn calm-btn ${calmMode ? 'calm-active' : ''}`}
            onClick={() => setCalmMode((prev) => !prev)}
            title="Calm Mode (key: c): pauses background motion"
            aria-pressed={calmMode}
          >
            <span aria-hidden="true">🕊️</span>
            <span className="calm-btn-label">{calmMode ? 'Calm: On' : 'Calm'}</span>
          </button>

          <div className="font-scale-group" aria-label="Text size adjusters">
            <button
              type="button"
              className="scale-btn"
              onClick={() => setFontScale((s) => Math.max(0.85, s - 0.08))}
              title="Decrease font size"
              aria-label="Decrease text size"
            >
              A-
            </button>
            <button
              type="button"
              className="scale-btn"
              onClick={() => setFontScale((s) => Math.min(1.3, s + 0.08))}
              title="Increase font size"
              aria-label="Increase text size"
            >
              A+
            </button>
          </div>

          {/* Profile Menu */}
          <div className="profile-container" ref={profileRef}>
            <button
              type="button"
              className="profile-btn"
              aria-expanded={profileOpen}
              aria-haspopup="true"
              aria-label="Account, profile and settings"
              onClick={() => setProfileOpen((prev) => !prev)}
            >
              <User size={18} aria-hidden="true" />
            </button>

            {profileOpen && (
              <div className="profile-menu" role="menu" aria-label="Account menu">
                <div className="profile-menu-header">
                  <span className="profile-name">Student Account</span>
                  <span className="profile-status">Math 2B · Active</span>
                </div>
                <hr className="profile-divider" />
                <button
                  type="button"
                  role="menuitem"
                  className="profile-menu-item"
                  onClick={openTour}
                >
                  <Compass size={15} aria-hidden="true" />
                  <span>Welcome Tour</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="profile-menu-item"
                  onClick={() => {
                    setActiveView('calendar')
                    setProfileOpen(false)
                  }}
                >
                  <Calendar size={15} aria-hidden="true" />
                  <span>Class Schedule &amp; Join Hub</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="profile-menu-item"
                  onClick={() => {
                    setActiveView('source')
                    setProfileOpen(false)
                  }}
                >
                  <BookOpen size={15} aria-hidden="true" />
                  <span>Original Teacher Source</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="profile-menu-item"
                  onClick={() => setCalmMode((prev) => !prev)}
                >
                  <Sparkles size={15} aria-hidden="true" />
                  <span>Calm View: {calmMode ? 'Disable' : 'Enable'}</span>
                </button>
                <hr className="profile-divider" />
                <button
                  type="button"
                  role="menuitem"
                  className="profile-menu-item profile-logout"
                  onClick={() => setProfileOpen(false)}
                >
                  <LogOut size={15} aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT VIEWS ================= */}
      <main className="revamped-main-stage">
        
        {/* VIEW 1: NOW FOCUS (3D PERSPECTIVE CARDS) */}
        {activeView === 'now' && (
          <div
            ref={arenaRef}
            className="now-perspective-arena"
            onMouseMove={handleArenaMouseMove}
            onMouseLeave={handleArenaMouseLeave}
          >
            {/* TRIADIC WORKING-MEMORY HORIZON */}
            <div className="horizon-step-flow-bar" role="region" aria-label="Triadic working-memory progress horizon">
              <div className="step-flow-header">
                <div className="step-flow-badge-wrap">
                  <span className="step-flow-badge">
                    <span className="step-flow-beacon" aria-hidden="true" />
                    <span>Checkpoint {activeStepNumber} of 4</span>
                  </span>
                  <span className="step-flow-desc">
                    {activeStepNumber === 2
                      ? 'Transform integration limits into u-domain'
                      : activeStepNumber === 3
                      ? 'Integrate directly with respect to u'
                      : 'Activity Progress'}
                  </span>
                </div>
                <div className="step-flow-meta">
                  <span className="step-flow-canvas-tag">
                    <CanvasLogo size={13} />
                    <span>Canvas Worksheet Sync</span>
                  </span>
                  <span className="step-flow-pct">
                    {stepCompleted ? '75% Complete' : '50% Complete'}
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
                    title="View Step 1: Identify inner u = g(x) (Completed)"
                  >
                    <span className="milestone-num"><Check size={12} strokeWidth={3} /></span>
                    <span className="milestone-text">1. Set u = 2x+1</span>
                  </button>

                  <button
                    type="button"
                    className={`step-milestone-chip ${stepCompleted ? 'done' : 'active'}`}
                    onClick={() => setActiveView('now')}
                    title="Step 2: Change limits [0,4] to [1,9] (Current Focus)"
                  >
                    <span className="milestone-num">{stepCompleted ? <Check size={12} strokeWidth={3} /> : '2'}</span>
                    <span className="milestone-text">2. Change Limits</span>
                  </button>

                  <button
                    type="button"
                    className={`step-milestone-chip ${stepCompleted ? 'active' : 'upcoming'}`}
                    onClick={toggleStepCompletion}
                    title="Step 3: Integrate with u (Click to advance/undo)"
                  >
                    <span className="milestone-num">3</span>
                    <span className="milestone-text">3. Integrate in u</span>
                  </button>

                  <button
                    type="button"
                    className="step-milestone-chip upcoming"
                    onClick={() => setActiveView('overview')}
                    title="View Step 4: Final exact fraction to Canvas"
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
                  <h2 className="kicker">Context Anchor</h2>
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
                <p className="context">{lecture.where}</p>
              </div>

              {/* CENTER CARD: ACTIVE DIRECTIVE (FOCAL EXECUTION) */}
              <div className="card-3d card-focus">
                {/* Course Context Header inside Center Card */}
                <p className="card-course-kicker">{lecture.course}</p>

                <div className="kicker-row center-kicker-row">
                  <h2 className="kicker action-kicker">Active Directive</h2>
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
                  {stepCompleted ? 'Integrate with respect to u directly.' : lecture.next}
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
                        <span>Undo Checkpoint</span>
                      </>
                    ) : (
                      <>
                        <Check size={16} aria-hidden="true" />
                        <span>Complete Checkpoint 2</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="step-stuck-btn"
                    onClick={() => setActiveView('rejoin')}
                  >
                    Resynchronize / Catch Up
                  </button>
                </div>
              </div>

              {/* RIGHT CARD: INVARIANT CONSTRAINTS (RUBRIC & DEADLINES) */}
              <div className="card-3d card-dimmed">
                <div className="kicker-row">
                  <h2 className="kicker">Invariant Constraints</h2>
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
                <p className="constraints">{lecture.keep}</p>

                {/* Canvas Verified Deadline */}
                <div className="card-canvas-badge">
                  <CanvasLogo size={16} />
                  <span>Canvas Due: 10:50 AM today</span>
                  <span className="canvas-badge-sync-dot" aria-hidden="true" />
                </div>
              </div>

            </div>

            {/* Surfaced Ambiguity Warning */}
            <div className="ambiguity-callout" role="alert">
              <div className="ambiguity-text">
                <AlertTriangle size={15} className="ambiguity-icon" aria-hidden="true" />
                <span>
                  <strong>Upload location</strong> isn't specified in syllabus.
                </span>
              </div>
              <button
                type="button"
                className="ambiguity-btn"
                onClick={() => {
                  navigator.clipboard?.writeText(
                    'Excuse me Professor, where should we submit the in-class assignment today?'
                  )
                  alert('Question copied to clipboard: "Excuse me Professor, where should we submit the in-class assignment today?"')
                }}
              >
                Ask Instructor
              </button>
            </div>

            {/* In-Context EdStem Thread Banner */}
            <div className="edstem-context-banner">
              <div className="edstem-context-info">
                <span className="edstem-icon-badge" aria-hidden="true">
                  <EdStemLogo size={16} />
                </span>
                <span>
                  <strong>EdStem Thread #412:</strong> "Do limits flip if u(0) &gt; u(4)?"
                </span>
              </div>
              <button
                type="button"
                className="edstem-view-answer-btn"
                onClick={() => setActiveView('edstem')}
              >
                View TA Answer (1)
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
                ← Back to Task Focus
              </button>
            </div>
            <div className="overview-header">
              <div>
                <h2 className="overview-title">In-Class Activity: Definite Integral via Substitution</h2>
                <div className="overview-sub-row">
                  <CanvasLogo size={14} className="sync-canvas-icon" />
                  <p className="overview-sub">4 total steps · Synced with Canvas Assignment requirements</p>
                </div>
              </div>
              <span className="overview-badge">
                {stepCompleted ? '2 Completed · 1 In Progress' : '1 Completed · 1 In Progress'}
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
                    <span className="step-num">Step 1 · Completed</span>
                    <span className="step-time">~5 mins</span>
                  </div>
                  <h3 className="step-heading line-through">Identify the inner function and assign u = g(x)</h3>
                  <p className="step-desc">Found u = 2x + 1 and du = 2 dx</p>
                </div>
              </li>

              {/* Step 2 */}
              <li className={`step-item ${stepCompleted ? 'step-completed' : 'step-active'}`}>
                <div className={`step-marker ${stepCompleted ? 'done' : 'active'}`}>
                  {stepCompleted ? '✓' : '2'}
                </div>
                <div className="step-body">
                  <div className="step-meta">
                    <span className="step-num">{stepCompleted ? 'Step 2 · Completed' : 'Step 2 · Current Focus'}</span>
                    <span className="step-badge">{stepCompleted ? 'Done' : 'Active'}</span>
                  </div>
                  <h3 className="step-heading">Change the start and end values (Integration limits)</h3>
                  <p className="step-desc">Convert x-bounds [0, 4] into u-bounds [1, 9]. Do not convert back to x at the end.</p>
                  <div className="step-actions">
                    <button
                      type="button"
                      className="step-jump-btn"
                      onClick={() => setActiveView('now')}
                    >
                      Focus on this step
                    </button>
                  </div>
                </div>
              </li>

              {/* Step 3 */}
              <li className="step-item step-upcoming">
                <div className="step-marker upcoming">3</div>
                <div className="step-body">
                  <div className="step-meta">
                    <span className="step-num">Step 3 · Upcoming</span>
                    <span className="step-time">~6 mins</span>
                  </div>
                  <h3 className="step-heading">Integrate with respect to u directly</h3>
                  <p className="step-desc">Evaluate the simplified integral using standard power rule.</p>
                </div>
              </li>

              {/* Step 4 */}
              <li className="step-item step-upcoming">
                <div className="step-marker upcoming">4</div>
                <div className="step-body">
                  <div className="step-meta">
                    <span className="step-num">Step 4 · Final</span>
                    <span className="step-time">~3 mins</span>
                  </div>
                  <h3 className="step-heading">Subtract upper bound from lower bound</h3>
                  <p className="step-desc">Give the exact fraction answer; do not round to decimals. Submit to Canvas.</p>
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
                ← Back to Task Focus
              </button>
            </div>
            <div className="rejoin-header">
              <span className="rejoin-icon" aria-hidden="true">🔄</span>
              <div>
                <h2 className="rejoin-title">Help Me Rejoin: Safe Catch-Up</h2>
                <p className="rejoin-sub">Zoned out or got stuck? Rejoin the class in 10 seconds without missing a constraint.</p>
              </div>
            </div>

            <div className="rejoin-form-wrap">
              <label htmlFor="rejoinQuery" className="rejoin-label">
                Where did you leave off or what did you miss?
              </label>
              <div className="rejoin-input-row">
                <input
                  id="rejoinQuery"
                  type="text"
                  className="rejoin-input"
                  value={rejoinInput}
                  onChange={(e) => setRejoinInput(e.target.value)}
                  placeholder="e.g., I missed what u was, or where the professor is writing..."
                />
                <button
                  type="button"
                  className="rejoin-submit-btn"
                  onClick={() => setRejoinGenerated(true)}
                >
                  Catch Me Up
                </button>
              </div>
            </div>

            {rejoinGenerated && (
              <div className="recap-card" role="region" aria-label="Rejoin summary">
                <div className="recap-head">
                  <span className="recap-tag">Current Checkpoint Recap</span>
                  <span className="recap-audio-sync">Teacher audio synced (00:32:45)</span>
                </div>
                <p className="recap-text">
                  <strong>Don't worry:</strong> Professor Chen just substituted <code>u = 2x + 1</code>. Instead of solving the whole integral and substituting back later, the class is changing the integration limits right now: when <code>x = 0</code>, <code>u = 1</code>; when <code>x = 4</code>, <code>u = 9</code>.
                </p>
                <div className="recap-foot">
                  <span className="recap-action-cue">
                    Your immediate task: Write down the new limits [1, 9] on your worksheet.
                  </span>
                  <button
                    type="button"
                    className="recap-back-btn"
                    onClick={() => setActiveView('now')}
                  >
                    Back to Task →
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
                ← Back to Task Focus
              </button>
            </div>
            <div className="edstem-header">
              <div className="edstem-title-wrap">
                <div className="edstem-badge-icon" aria-hidden="true">
                  <EdStemLogo size={24} />
                </div>
                <div>
                  <h2 className="edstem-title">EdStem Live Discussion · Math 2B</h2>
                  <p className="edstem-sub">Live questions asked by classmates right now during Lecture 14</p>
                </div>
              </div>

              <button
                type="button"
                className="edstem-ask-btn"
                onClick={() => setNewQuestionModalOpen(true)}
              >
                + Ask Question (Auto-tagged to Step 2)
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
                        <span className="edstem-endorsed-tag">✓ TA Endorsed Answer</span>
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
                    <h3 className="modal-title">Ask Question on EdStem</h3>
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
                      Auto-tagging: <code>[Math 2B · Lecture 14 · Step 2: Substitution Limits]</code>
                    </p>
                    <textarea
                      className="edstem-textarea"
                      rows={3}
                      placeholder="Type your question anonymously here..."
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
                        Cancel
                      </button>
                      <button type="submit" className="modal-submit-btn">
                        Post to EdStem
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
                ← Back to Task Focus
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

        {/* VIEW 6: CALENDAR & CLASS JOIN HUB */}
        {activeView === 'calendar' && (
          <section className="calendar-container" aria-label="Class schedule and join hub">
            <div className="view-top-back-row">
              <button
                type="button"
                className="view-back-btn"
                onClick={() => setActiveView('now')}
              >
                ← Back to Task Focus
              </button>
            </div>
            <div className="calendar-top-bar">
              <div>
                <h2 className="calendar-title">Class Schedule &amp; Join Hub</h2>
                <p className="calendar-sub">Synced with Canvas LMS, Google Calendar &amp; EdStem</p>
              </div>

              {/* Room Code Quick Join */}
              <div className="quick-code-box">
                <span className="quick-code-label">Room Code:</span>
                <input
                  type="text"
                  className="quick-code-input"
                  value={roomCodeInput}
                  onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                  placeholder="e.g. MATH-2B"
                />
                <button
                  type="button"
                  className="quick-code-btn"
                  onClick={() => handleJoinClass('MATH 2B', 'Lecture 14: Integrals')}
                >
                  Join Live
                </button>
              </div>
            </div>

            {/* Weekly Date Selector Bar */}
            <div className="weekly-date-nav">
              <div className="weekly-header">
                <span>WEEK OF NOV 10 – NOV 16, 2026</span>
                <span className="sync-note">
                  <CanvasLogo size={14} className="sync-canvas-icon" />
                  <span>Canvas LMS Connected ✓</span>
                </span>
              </div>

              <div className="date-pills-row">
                {Object.keys(scheduleData).map((dateKey) => {
                  const isActive = selectedDate === dateKey
                  const isToday = dateKey.includes('Today')
                  return (
                    <button
                      key={dateKey}
                      type="button"
                      className={`date-pill-btn ${isActive ? 'active' : ''}`}
                      onClick={() => setSelectedDate(dateKey)}
                    >
                      <span className="pill-day">{dateKey.split(' ')[0]}</span>
                      <span className="pill-date">{dateKey.split(' ')[1]}</span>
                      <span className="pill-status">
                        {isToday ? '● 1 Live' : `${scheduleData[dateKey].length} classes`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Scheduled Classes for Selected Date */}
            <div className="scheduled-classes-section">
              <h3 className="scheduled-section-title">
                Classes Scheduled for {selectedDate}
              </h3>

              <div className="scheduled-cards-stack">
                {scheduleData[selectedDate]?.map((cls) => (
                  <div
                    key={cls.id}
                    className={`scheduled-class-card ${cls.isLive ? 'class-live' : ''}`}
                  >
                    <div className="class-info">
                      <div className="class-status-line">
                        {cls.isLive ? (
                          <span className="badge-live-now">
                            <span className="live-broadcast-indicator" aria-hidden="true" />
                            ● LIVE NOW
                          </span>
                        ) : (
                          <span className="badge-upcoming">UPCOMING</span>
                        )}
                        <span className="class-time">{cls.time}</span>
                        <span className="class-loc">· {cls.location}</span>
                      </div>
                      <h4 className="class-name">{cls.title}</h4>
                      <p className="class-topic">
                        <strong>Topic:</strong> {cls.topic}
                      </p>
                      <div className="class-canvas-pill">
                        <CanvasLogo size={13} />
                        <span className="class-canvas-sync">{cls.canvasSync}</span>
                      </div>
                    </div>

                    <div className="class-action-wrap">
                      {cls.isLive ? (
                        <button
                          type="button"
                          className="btn-enter-live"
                          onClick={() => handleJoinClass(cls.code, cls.topic)}
                        >
                          <span>Enter Live Workspace</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-preview-class"
                          onClick={() => alert(`Preview outline for ${cls.title} opened.`)}
                        >
                          Preview Outline
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* ================= TECHNICAL MATH DETAILS POPOVER ================= */}
      {openTech !== null && (
        <div className="tech-card" role="dialog" aria-label="Technical version">
          <div className="tech-head">
            <span>Technical version</span>
            <button
              type="button"
              className="tech-close"
              onClick={() => setOpenTech(null)}
              aria-label="Close technical version"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
          <Technical block={openTech} />
        </div>
      )}

      {/* ================= ACCESSIBLE WELCOME TOUR MODAL ================= */}
      {tourOpen && (
        <div className="tour-overlay" role="dialog" aria-modal="true" aria-label="Welcome tour">
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

      {/* ================= FOOTER ================= */}
      <footer className="revamped-footer" role="contentinfo">
        <div className="footer-left">
          <span>✨ <strong>Bullseye Accessible Classroom Standard</strong></span>
          <span className="footer-dot">•</span>
          <span className="footer-brand-pill">
            <CanvasLogo size={13} className="sync-canvas-icon" />
            <span>Canvas LMS API Connected</span>
          </span>
          <span className="footer-dot">•</span>
          <span className="footer-brand-pill">
            <EdStemLogo size={13} className="header-edstem-icon" />
            <span>EdStem Q&amp;A Live Sync</span>
          </span>
          <span className="footer-dot">•</span>
          <span>WCAG 2.2 AA Contrast Checked</span>
        </div>
        <div className="footer-right">
          <span>Keyboard: Tab / Esc / [ ] / c</span>
          <span className="footer-dot">•</span>
          <span>Zero clinical tracking · Dignity-first</span>
        </div>
      </footer>
    </div>
  )
}
