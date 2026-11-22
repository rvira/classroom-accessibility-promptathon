import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useNavigate, useLocation, Link, Navigate } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle,
  Compass,
  Globe,
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
import { TeacherDashboard } from './components/TeacherDashboard'
import { Breadcrumbs } from './components/Breadcrumbs'
import { LandingPage } from './components/LandingPage'
import { CalendarPage } from './components/CalendarPage'
import { ClassDetailPage } from './components/ClassDetailPage'
import { ProductTour } from './components/ProductTour'
import type { ScheduledClass } from './types'
import { api } from './services/api'
import {
  translations,
  type SupportedLanguage,
  SUPPORTED_LANGUAGES,
  type Translations,
} from './i18n'
import './App.css'

interface SocraticDemoTier {
  tier: 1 | 2 | 3 | 4
  tabLabel: string
  title: string
  prompt: string
  probing: string
  action: string
}

const socraticDemoTiers: SocraticDemoTier[] = [
  {
    tier: 1,
    tabLabel: '1. Where to Look',
    title: 'Orienting to the Transformation Formula',
    prompt:
      'Focus on your substitution formula: u = 2x + 1. Your original lower limit is x = 0. What does u evaluate to when you plug in x = 0?',
    probing: 'Do you need to integrate yet, or just calculate the transformed starting point in u?',
    action: 'Evaluate u(0) = 2(0) + 1 on your paper before calculating the upper bound.',
  },
  {
    tier: 2,
    tabLabel: '2. Key Concept',
    title: 'Variable-Bound Consistency Principle',
    prompt:
      'Definite integrals evaluate between boundaries of the active variable. When we change the integration variable from x to u, the integral only speaks "u-language". The old x-limits (0 and 4) can never be evaluated with du.',
    probing: 'If x travels from 0 to 4, what is the exact interval that u travels across?',
    action: 'Transform both boundaries: calculate u(0) = 1 and u(4) = 2(4) + 1 = 9.',
  },
  {
    tier: 3,
    tabLabel: '3. Calculation Steps',
    title: 'Step-by-Step Procedural Decomposition',
    prompt:
      'Break the transformation into two explicit evaluations:\n1. Lower bound: x = 0 ⟹ u = 2(0) + 1 = 1\n2. Upper bound: x = 4 ⟹ u = 2(4) + 1 = 9\n3. In Step 1 you found dx = du / 2. Factor out the constant (1/2).',
    probing: 'How does transforming the limits now save you from back-substituting x at the end?',
    action: 'Rewrite the integral as ∫₁⁹ u³ · (1/2) du on your worksheet.',
  },
  {
    tier: 4,
    tabLabel: '4. Worked Setup',
    title: 'Worked Structural Model (No Final Answer Leak)',
    prompt:
      'Here is the complete structural transformation (notice we do not evaluate the final arithmetic for you):\n\n∫₀⁴ (2x + 1)³ dx   ⟹   ∫₁⁹ u³ · (1/2) du   =   (1/2) ∫₁⁹ u³ du\n\nNotice: Because the limits are already in u, you evaluate directly between 1 and 9 without converting back to x!',
    probing: 'What is the antiderivative of u³ with respect to u using the power rule?',
    action: 'Integrate u³ to write (1/2) [ u⁴ / 4 ]₁⁹ and compute the final fraction.',
  },
]

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
  const location = useLocation()
  const navigate = useNavigate()

  // Derive active view from current URL route
  const activeView: ViewMode = (() => {
    const path = location.pathname
    if (path === '/') return 'home'
    if (path.startsWith('/calendar')) return 'calendar'
    if (path === '/focus') return 'now'
    if (path === '/socratic') return 'socratic'
    if (path === '/teacher') return 'teacher'
    if (path === '/overview') return 'overview'
    if (path === '/rejoin') return 'rejoin'
    if (path === '/edstem') return 'edstem'
    if (path === '/source') return 'source'
    return 'home'
  })()

  // Unified view switcher that seamlessly syncs with URL routes
  const setActiveView = (v: ViewMode) => {
    if (v === 'home') navigate('/')
    else if (v === 'calendar') navigate('/calendar/2026-11-21')
    else if (v === 'now') navigate('/focus')
    else if (v === 'socratic') navigate('/socratic')
    else if (v === 'teacher') navigate('/teacher')
    else if (v === 'overview') navigate('/overview')
    else if (v === 'rejoin') navigate('/rejoin')
    else if (v === 'edstem') navigate('/edstem')
    else if (v === 'source') navigate('/source')
  }

  // Synchronize legacy query parameter (?view=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const v = params.get('view')
    if (v === 'teacher') navigate('/teacher')
    else if (v === 'socratic') navigate('/socratic')
    else if (v === 'now') navigate('/focus')
    else if (v === 'calendar') navigate('/calendar/2026-11-21')
    else if (v === 'rejoin') navigate('/rejoin')
    else if (v === 'edstem') navigate('/edstem')
    else if (v === 'overview') navigate('/overview')
  }, [location.search, navigate])

  const handleLaunchClass = (classInfo: ScheduledClass) => {
    setCurrentCourse(classInfo.code)
    setCurrentTopic(classInfo.topic)
    navigate('/focus')
  }
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

  // Course State
  const [currentCourse, setCurrentCourse] = useState<string>('MATH 2B')
  const [currentTopic, setCurrentTopic] = useState<string>('Lecture 14: Integrals')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Help Me Rejoin State
  const [rejoinInput, setRejoinInput] = useState<string>('I got confused when changing the bounds')
  const [rejoinGenerated, setRejoinGenerated] = useState<boolean>(true)

  // EdStem State
  const [edstemQuestions, setEdstemQuestions] = useState<EdstemQuestion[]>(initialEdstemQuestions)
  const [newQuestionModalOpen, setNewQuestionModalOpen] = useState<boolean>(false)
  const [newQuestionText, setNewQuestionText] = useState<string>('')

  // Socratic Scaffolder State
  const [socraticQuery, setSocraticQuery] = useState<string>(
    'Why do we assign u = x instead of u = cos(x)?'
  )
  const [socraticTier, setSocraticTier] = useState<1 | 2 | 3 | 4>(1)
  const [socraticResponse, setSocraticResponse] = useState<any>({
    scaffoldId: 'scaffold-init',
    tier: 1,
    tierLabel: 'Where to Look',
    scaffoldPrompt:
      'Focus on Selecting u and dv via LIATE. In this stage, isolate the known inputs before performing the transformation. Identify which factor is Algebraic (x) and which is Trigonometric (cos(x)).',
    probingQuestion:
      'Which component of the problem or equation differentiates into a simpler term? In LIATE, does Algebraic come before Trigonometric?',
    nextActionCue:
      'Write out your initial step: assign u = x (earlier in LIATE) and dv = cos(x) dx before calculating.',
    guardrailTriggered: false,
  })
  const [socraticLoading, setSocraticLoading] = useState<boolean>(false)

  // ADHD Revamp: Working-Memory Externalization & Catch-up Sheet States
  const [contextExpanded, setContextExpanded] = useState<boolean>(false)
  const [scratchpadOpen, setScratchpadOpen] = useState<boolean>(false)
  const [scratchpadText, setScratchpadText] = useState<string>(() => {
    try {
      return localStorage.getItem('bullseye_scratchpad') || 'u = 2x + 1\ndu = 2 dx\nx=0 ⟶ u=1\nx=4 ⟶ u=9'
    } catch {
      return 'u = 2x + 1\ndu = 2 dx'
    }
  })
  const [socraticInlineOpen, setSocraticInlineOpen] = useState<boolean>(false)
  const [inlineSocraticTier, setInlineSocraticTier] = useState<1 | 2 | 3 | 4>(1)
  const [catchupSheetOpen, setCatchupSheetOpen] = useState<boolean>(false)

  // Persist scratchpad
  useEffect(() => {
    try {
      localStorage.setItem('bullseye_scratchpad', scratchpadText)
    } catch {
      // ignore
    }
  }, [scratchpadText])

  // Global Keyboard Shortcuts for Low-Motor Cognitive Ergonomics
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        if (e.key === 'Escape') target.blur()
        return
      }

      if (e.key === 'c' || e.key === 'C') {
        setCalmMode((prev) => !prev)
        setToastMessage(!calmMode ? 'Calm Mode Active (Zero motion)' : 'Calm Mode Inactive')
        setTimeout(() => setToastMessage(null), 2500)
      } else if (e.key === 'h' || e.key === 'H') {
        setSocraticInlineOpen((prev) => !prev)
      } else if (e.key === 'r' || e.key === 'R') {
        setCatchupSheetOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setCatchupSheetOpen(false)
        setDrawerOpen(false)
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [calmMode])

  const handleExportTelemetry = async () => {
    try {
      const csv = await api.exportTelemetryCSV()
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `bullseye_research_telemetry_${Date.now()}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setToastMessage('Research telemetry dataset exported successfully (CSV)')
      setTimeout(() => setToastMessage(null), 3500)
    } catch (err) {
      console.error(err)
    }
  }

  const handleRequestScaffold = async (tierOverride?: 1 | 2 | 3 | 4) => {
    setSocraticLoading(true)
    const tierToUse = tierOverride ?? socraticTier
    try {
      const resp = await api.requestSocraticScaffold({
        courseCode: currentCourse,
        domain: currentCourse.includes('ICS') ? 'code' : currentCourse.includes('PHYS') ? 'physics' : 'math',
        currentProblem: 'Integration by Parts: int(x * cos(x) dx)',
        activeStep: 'Selecting u and dv via LIATE',
        studentQuery: socraticQuery,
        scaffoldingTier: tierToUse,
      })
      setSocraticResponse(resp)
      setSocraticTier(resp.tier as any)
      api.recordTelemetryEvent({
        courseId: currentCourse,
        moduleContext: 'Integration by Parts: LIATE',
        eventType: 'SCAFFOLD_HINT_REQUESTED',
        metrics: { dwellDurationMs: 25000, cognitiveFrictionScore: resp.guardrailTriggered ? 7.5 : 3.8 },
        metadata: { tier: resp.tier, guardrailHit: resp.guardrailTriggered },
      })
    } catch (err) {
      console.error(err)
    } finally {
      setSocraticLoading(false)
    }
  }

  // Welcome Tour State
  const [tourOpen, setTourOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('bullseye_tour_seen') !== 'true'
    } catch {
      return false
    }
  })

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
        onExportTelemetry={handleExportTelemetry}
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

          <Link
            to="/"
            className="revamped-brand-btn"
            title="Return to Homepage"
          >
            <Target size={22} strokeWidth={2.8} className="revamped-brand-icon" aria-hidden="true" />
            <span className="revamped-brand-name">{t.appName}</span>
          </Link>

          {/* Interactive Breadcrumb Component matching user image media_1795303961514_101ea361.png */}
          <Breadcrumbs variant="header" />
        </div>

        {/* Right: Essential, Focused Action Controls (Strict Single-Home Placement) */}
        <div className="revamped-actions-row">
          {/* Interactive Feature Tour Launcher */}
          <button
            type="button"
            className="header-tour-btn"
            onClick={openTour}
            title="Take Interactive Feature Tour"
            aria-label="Take Interactive Feature Tour"
          >
            <Compass size={15} aria-hidden="true" />
            <span>Take Tour</span>
          </button>

          {/* Quick Teacher / Student View Switcher */}
          <button
            type="button"
            className={`header-role-toggle ${location.pathname === '/teacher' ? 'active' : ''}`}
            onClick={() => navigate(location.pathname === '/teacher' ? '/focus' : '/teacher')}
            title={location.pathname === '/teacher' ? 'Switch to Student View' : 'Open Teacher & Cognitive Analytics Dashboard'}
            aria-label={location.pathname === '/teacher' ? 'Switch to Student View' : 'Open Teacher & Cognitive Analytics Dashboard'}
          >
            <BarChart3 size={15} aria-hidden="true" />
            <span>{location.pathname === '/teacher' ? 'Student View' : 'Teacher View'}</span>
          </button>

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
        <Routes>
          {/* LANDING PAGE (REPLACING IMMEDIATE CALENDAR OPENING VIEW) */}
          <Route path="/" element={<LandingPage onStartTour={openTour} />} />

          {/* DYNAMIC 5-DAY ROLLING CALENDAR SYSTEM */}
          <Route path="/calendar" element={<CalendarPage onLaunchFocusMode={handleLaunchClass} />} />
          <Route path="/calendar/:date" element={<CalendarPage onLaunchFocusMode={handleLaunchClass} />} />
          <Route path="/calendar/:date/compsci" element={<CalendarPage initialSubjectFilter="compsci" onLaunchFocusMode={handleLaunchClass} />} />

          {/* DEEP CLASS PAGES */}
          <Route path="/calendar/:date/compsci/:classId" element={<ClassDetailPage onLaunchFocusMode={handleLaunchClass} />} />

          {/* VIEW 1: NOW FOCUS (ZERO-SCROLL MONOLITHIC FOCUS STREAM) */}
          <Route
            path="/focus"
            element={
              <div
                ref={arenaRef}
                className="now-perspective-arena"
              >
            {/* SLEEK COMPACT PROGRESS BAR (ZERO VERTICAL OVERHEAD) */}
            <div className="compact-step-bar" role="region" aria-label="Step progress">
              <div className="compact-step-left">
                <span className="compact-step-badge">Step {activeStepNumber} of 4</span>
                <span className="compact-step-title">
                  {activeStepNumber === 2 ? t.step2Title : activeStepNumber === 3 ? t.step3Title : 'Active Checkpoint'}
                </span>
              </div>

              <div className="compact-step-pills">
                <button
                  type="button"
                  className="compact-pill done"
                  onClick={() => setActiveView('overview')}
                  title="Step 1: Set u = 2x+1 (Completed)"
                >
                  <Check size={11} strokeWidth={3} />
                  <span>1. Set u</span>
                </button>
                <button
                  type="button"
                  className="compact-pill active"
                  title="Step 2: Change Limits (Active Focus)"
                >
                  <span className="compact-pill-dot" />
                  <span>2. Limits</span>
                </button>
                <button
                  type="button"
                  className="compact-pill upcoming"
                  onClick={toggleStepCompletion}
                  title="Step 3: Integrate in u"
                >
                  <span>3. Integrate</span>
                </button>
                <button
                  type="button"
                  className="compact-pill upcoming"
                  onClick={() => setActiveView('overview')}
                  title="Step 4: Canvas Submit"
                >
                  <span>4. Submit</span>
                </button>
              </div>
            </div>

            {/* MONOLITHIC FOCUS STREAM */}
            <div ref={cardsRowRef} className="monolithic-focus-stream">
              {/* 1. TOP ANCHOR: CONTEXT ACCORDION */}
              <div className="context-anchor-accordion">
                <button
                  type="button"
                  className="context-anchor-toggle"
                  onClick={() => setContextExpanded(!contextExpanded)}
                  aria-expanded={contextExpanded}
                >
                  <span className="context-toggle-icon">{contextExpanded ? '▼' : '▲'}</span>
                  <span className="context-anchor-summary">
                    <strong>Previous Step 1 (Completed):</strong> Defined substitution u = 2x + 1 ⟹ du = 2 dx
                  </span>
                  <span className="context-anchor-badge">Complete</span>
                </button>
                {contextExpanded && (
                  <div className="context-anchor-body">
                    <p className="context-text">{t.lectureWhere}</p>
                    <div className="context-math-box font-mono">
                      u = 2x + 1  ⟹  du = 2 dx  ⟹  dx = du / 2
                    </div>
                  </div>
                )}
              </div>

              {/* 2. HERO ACTIVE DIRECTIVE CARD */}
              <main className="monolithic-hero-card" role="main" aria-label="Active lecture directive">
                <div className="hero-card-header">
                  <span className="hero-step-badge">
                    ACTIVE DIRECTIVE · STEP {activeStepNumber} OF 4
                  </span>
                  <div className="hero-header-tags">
                    <span className="hero-rubric-tag" title="Canvas rubric constraint: exact fractions only">
                      <CanvasLogo size={13} />
                      <span>Rule: Exact Fractions</span>
                    </span>
                    <span className="hero-sync-tag">
                      <span>Canvas Synced</span>
                    </span>
                  </div>
                </div>

                <h1 className="hero-directive-statement" aria-live="polite">
                  {stepCompleted ? t.lectureNextCompleted : t.lectureNext}
                </h1>

                {/* Concrete "What to write on your paper" Callout */}
                <div className="paper-action-callout">
                  <div className="paper-action-label">What to write on your paper:</div>
                  <div className="paper-action-text font-mono">
                    ∫₁⁹ (1/2) u³ du
                  </div>
                </div>

                {/* Working-Memory Scratchpad (Externalizing Intermediate Thoughts) */}
                <div className="scratchpad-inline-wrap">
                  <button
                    type="button"
                    className="scratchpad-toggle-btn"
                    onClick={() => setScratchpadOpen(!scratchpadOpen)}
                    aria-expanded={scratchpadOpen}
                  >
                    <span>📝 Scratchpad / Working Variables</span>
                    <span className="scratchpad-hint-chip">
                      {scratchpadOpen ? 'Collapse' : 'Jot variables (u, du)'}
                    </span>
                  </button>
                  {scratchpadOpen && (
                    <div className="scratchpad-body">
                      <textarea
                        className="scratchpad-textarea font-mono"
                        value={scratchpadText}
                        onChange={(e) => setScratchpadText(e.target.value)}
                        placeholder="Jot temporary math variables here (persists automatically)..."
                        rows={3}
                        aria-label="Working memory scratchpad"
                      />
                    </div>
                  )}
                </div>

                {/* Interactive Socratic Scaffolder Demonstration (No Jargon, Real Demonstration) */}
                <div className="socratic-inline-wrap">
                  <button
                    type="button"
                    className="socratic-inline-toggle"
                    onClick={() => setSocraticInlineOpen(!socraticInlineOpen)}
                    aria-expanded={socraticInlineOpen}
                  >
                    <span className="socratic-toggle-title">💡 Need a Hint? (Socratic Scaffolder)</span>
                    <span className="socratic-toggle-sub">
                      {socraticInlineOpen ? 'Hide Hint' : 'Micro-step guidance (No spoilers)'}
                    </span>
                  </button>

                  {socraticInlineOpen && (
                    <div className="socratic-inline-body">
                      {/* 4 Interactive Clickable Tier Tabs */}
                      <div className="socratic-tier-tabs" role="tablist" aria-label="Hint depth">
                        {socraticDemoTiers.map((item) => (
                          <button
                            key={item.tier}
                            type="button"
                            className={`socratic-tier-tab ${inlineSocraticTier === item.tier ? 'active' : ''}`}
                            onClick={() => setInlineSocraticTier(item.tier)}
                            role="tab"
                            aria-selected={inlineSocraticTier === item.tier}
                          >
                            <span>{item.tabLabel}</span>
                          </button>
                        ))}
                      </div>

                      <div className="socratic-hint-display">
                        <div className="socratic-hint-title-row">
                          <span className="socratic-hint-step-name">{socraticDemoTiers[inlineSocraticTier - 1].title}</span>
                        </div>
                        <p className="socratic-hint-prompt">
                          {socraticDemoTiers[inlineSocraticTier - 1].prompt}
                        </p>
                        <div className="socratic-probing-mini">
                          <strong>Reflection Question:</strong> {socraticDemoTiers[inlineSocraticTier - 1].probing}
                        </div>
                        <div className="socratic-action-mini">
                          ✓ Action: {socraticDemoTiers[inlineSocraticTier - 1].action}
                        </div>

                        {inlineSocraticTier < 4 && (
                          <div className="socratic-advance-row">
                            <button
                              type="button"
                              className="socratic-next-tier-btn"
                              onClick={() => setInlineSocraticTier((inlineSocraticTier + 1) as any)}
                            >
                              <span>Need deeper guidance? Advance to {socraticDemoTiers[inlineSocraticTier].tabLabel} →</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary Step Completion Button */}
                <div className="hero-action-bar">
                  <button
                    type="button"
                    className={`hero-complete-btn ${stepCompleted ? 'completed' : ''}`}
                    onClick={toggleStepCompletion}
                  >
                    {stepCompleted ? (
                      <>
                        <RotateCcw size={16} aria-hidden="true" />
                        <span>{t.undoCheckpoint}</span>
                      </>
                    ) : (
                      <>
                        <Check size={16} strokeWidth={3} aria-hidden="true" />
                        <span>Mark Step {activeStepNumber} Complete</span>
                      </>
                    )}
                  </button>
                </div>
              </main>
            </div>

            {/* STICKY BOTTOM ACTION DOCK (ALWAYS VISIBLE & ANCHORED) */}
            <div className="sticky-bottom-action-dock" role="navigation" aria-label="Quick classroom actions">
              <button
                type="button"
                className="action-dock-btn catchup"
                onClick={() => setCatchupSheetOpen(true)}
              >
                <RotateCcw size={15} aria-hidden="true" />
                <span>Lost? 5s Catch-Up</span>
                <span className="dock-kbd-chip">r</span>
              </button>

              <button
                type="button"
                className="action-dock-btn qa"
                onClick={() => setActiveView('edstem')}
              >
                <span>💬 Step Q&A ({edstemQuestions.length})</span>
              </button>

              <button
                type="button"
                className="action-dock-btn advance"
                onClick={toggleStepCompletion}
              >
                <span>{stepCompleted ? 'Next: Step 3 ➔' : 'Done with Step ➔'}</span>
              </button>
            </div>

            {/* SLIDE-UP 5-SECOND CATCH-UP SHEET (INLINE DRAWER, NO PAGE TRANSITION) */}
            {catchupSheetOpen && (
              <div className="catchup-sheet-overlay" onClick={() => setCatchupSheetOpen(false)}>
                <div className="catchup-sheet-drawer" onClick={(e) => e.stopPropagation()}>
                  <div className="catchup-sheet-header">
                    <div className="catchup-header-title">
                      <span className="catchup-pulse-icon">🔄</span>
                      <h3>5-Second Lecture Catch-Up</h3>
                    </div>
                    <button
                      type="button"
                      className="catchup-close-btn"
                      onClick={() => setCatchupSheetOpen(false)}
                      aria-label="Close catch-up drawer"
                    >
                      <X size={18} aria-hidden="true" />
                    </button>
                  </div>

                  <div className="catchup-sheet-content">
                    <div className="catchup-what-prof-said">
                      <span className="catchup-label">What the Professor Just Said:</span>
                      <p className="catchup-body-text">
                        "Dr. Smith reiterated that forgetting to transform the bounds is the #1 mistake on Exam 2. The class is now evaluating the lower limit u(0) = 1 and upper limit u(4) = 9."
                      </p>
                    </div>

                    <div className="catchup-action-box">
                      <span className="catchup-action-label">Your Immediate Action:</span>
                      <p className="catchup-action-instruction">
                        Put your pencil on line 3 and write the integral from 1 to 9: <code>∫₁⁹ (1/2) u³ du</code>. You are 100% caught up.
                      </p>
                    </div>
                  </div>

                  <div className="catchup-sheet-footer">
                    <button
                      type="button"
                      className="catchup-resume-btn"
                      onClick={() => setCatchupSheetOpen(false)}
                    >
                      Resume Task with Confidence ➔
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* VIEW 2: ALL STEPS OVERVIEW */}
      <Route
        path="/overview"
        element={
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
        }
      />

      {/* VIEW 3: HELP ME REJOIN (CATCH-UP ASSISTANT) */}
      <Route
        path="/rejoin"
        element={
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
        }
      />

      {/* VIEW 4: EDSTEM LIVE Q&A */}
      <Route
        path="/edstem"
        element={
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
        }
      />

      {/* VIEW 5: ORIGINAL SOURCE */}
      <Route
        path="/source"
        element={
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
        }
      />

      {/* VIEW 6: GENERAL-PURPOSE SOCRATIC SCAFFOLDING ASSISTANT */}
      <Route
        path="/socratic"
        element={
          <section className="socratic-container" aria-label="Socratic Scaffolding Assistant">
            <div className="view-top-back-row">
              <button
                type="button"
                className="view-back-btn"
                onClick={() => setActiveView('now')}
              >
                {t.backToTask}
              </button>
            </div>

            <div className="socratic-header">
              <div className="socratic-icon-wrap" aria-hidden="true">
                <Sparkles size={24} strokeWidth={2.4} />
              </div>
              <div>
                <h2 className="socratic-title">Socratic Scaffolding Assistant</h2>
                <p className="socratic-sub">
                  Targeted, micro-step guidance aligned to your Zone of Proximal Development without leaking answers.
                </p>
              </div>
            </div>

            {/* Current Context Card */}
            <div className="socratic-context-card">
              <div className="socratic-context-label">Current Lecture Context · {currentCourse}</div>
              <p className="socratic-context-text">
                {currentTopic}: Problem 2 · Selecting u and dv via LIATE hierarchy
              </p>
            </div>

            {/* 4-Tier Scaffolding Ladder Navigation */}
            <div className="socratic-ladder-nav" role="tablist" aria-label="Scaffolding Tiers">
              {[
                { tier: 1, label: '1. Where to Look' },
                { tier: 2, label: '2. Key Concept' },
                { tier: 3, label: '3. Step-by-Step' },
                { tier: 4, label: '4. Worked Setup' },
              ].map((item) => (
                <button
                  key={item.tier}
                  type="button"
                  className={`socratic-tier-btn ${socraticTier === item.tier ? 'active' : ''}`}
                  onClick={() => {
                    setSocraticTier(item.tier as any)
                    handleRequestScaffold(item.tier as any)
                  }}
                >
                  <Target size={14} aria-hidden="true" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="socratic-form">
              <label htmlFor="socraticQuery" className="rejoin-label">
                Where are you getting stuck? (Ask a question or request a guided hint)
              </label>
              <input
                id="socraticQuery"
                type="text"
                className="socratic-input"
                value={socraticQuery}
                onChange={(e) => setSocraticQuery(e.target.value)}
                placeholder="e.g., Why do we pick u = x instead of u = cos(x)?"
              />
              <div className="socratic-btn-row">
                <button
                  type="button"
                  className="socratic-submit-btn"
                  onClick={() => handleRequestScaffold()}
                  disabled={socraticLoading}
                >
                  {socraticLoading ? 'Analyzing...' : 'Get Socratic Scaffold'}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Response Card */}
            {socraticResponse && (
              <div className="socratic-result-card">
                {socraticResponse.guardrailTriggered && (
                  <div className="guardrail-alert">
                    <AlertTriangle size={18} aria-hidden="true" />
                    <span>{socraticResponse.guardrailExplanation}</span>
                  </div>
                )}

                <div className="recap-head">
                  <span className="recap-tag">Tier {socraticResponse.tier}: {socraticResponse.tierLabel}</span>
                  <span className="recap-audio-sync">Guided Socratic Scaffold</span>
                </div>

                <p className="socratic-prompt-text">
                  {socraticResponse.scaffoldPrompt}
                </p>

                <div className="socratic-probing-box">
                  <div className="socratic-probing-label">Probing Reflection Question</div>
                  <p className="socratic-probing-text">
                    {socraticResponse.probingQuestion}
                  </p>
                </div>

                <div className="socratic-action-cue">
                  <CheckCircle size={16} aria-hidden="true" />
                  <span>{socraticResponse.nextActionCue}</span>
                </div>

                <div className="socratic-card-footer">
                  <span className="text-muted text-xs">Zero-stigma default · Model assists without solving for you</span>
                  {socraticTier < 4 && (
                    <button
                      type="button"
                      className="socratic-advance-btn"
                      onClick={() => handleRequestScaffold(((socraticTier + 1) as any))}
                    >
                      Need deeper scaffold? Try Tier {socraticTier + 1} →
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>
        }
      />

      {/* VIEW 7: TEACHER & COGNITIVE ANALYTICS DASHBOARD */}
      <Route
        path="/teacher"
        element={
          <TeacherDashboard
            currentCourse={currentCourse}
            currentTopic={currentTopic}
            activeStepNumber={activeStepNumber}
            onSwitchToStudent={() => setActiveView('now')}
            t={t}
          />
        }
      />

      {/* FALLBACK REDIRECT TO LANDING PAGE */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
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

      {/* ================= INTERACTIVE SECTION-HIGHLIGHTING PRODUCT TOUR ================= */}
      <ProductTour isOpen={tourOpen} onClose={closeTour} />

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
