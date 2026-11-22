import { useState, useMemo } from 'react'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Flame,
  Printer,
  Search,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react'
import { api } from '../services/api'
import { type Translations } from '../i18n'
import './TeacherDashboard.css'

interface TeacherDashboardProps {
  currentCourse: string
  currentTopic: string
  activeStepNumber: number
  onSwitchToStudent: () => void
  t: Translations
}

export interface StudentProgress {
  id: string
  name: string
  avatar: string
  step1: 'done'
  step2: 'done' | 'active' | 'struggling'
  step3: 'done' | 'active' | 'locked'
  step4: 'done' | 'active' | 'locked'
  currentStep: number
  dwellSeconds: number
  dwellDisplay: string
  hintTier: 0 | 1 | 2 | 3 | 4
  status: 'on_track' | 'needs_attention' | 'advanced'
  catchUpsUsed: number
  notes: string
  scratchpad: string
}

const INITIAL_STUDENTS: StudentProgress[] = [
  {
    id: 'STU-12',
    name: 'Student #12 (Alex K.)',
    avatar: 'AK',
    step1: 'done',
    step2: 'struggling',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 275,
    dwellDisplay: '4m 35s',
    hintTier: 3,
    status: 'needs_attention',
    catchUpsUsed: 2,
    notes: 'Exceeded 4m dwell on limit transformation. Queried Tier 3 procedural hint.',
    scratchpad: 'u = 2x+1\nx = (u-1)/2\ndx = du/2\nWhen x=0, u = 2(0)+1 = 1\nWhen x=4, u = ? (forgot to evaluate u(4))',
  },
  {
    id: 'STU-27',
    name: 'Student #27 (Maya L.)',
    avatar: 'ML',
    step1: 'done',
    step2: 'struggling',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 260,
    dwellDisplay: '4m 20s',
    hintTier: 2,
    status: 'needs_attention',
    catchUpsUsed: 1,
    notes: 'Dwell > 4m. Reviewing why limits change from [0, 4] to [1, 9].',
    scratchpad: 'u = 2x+1\nu(0) = 1\nu(4) = 2(4)+1 = 9\nStuck on numerator substitution: x = ?',
  },
  {
    id: 'STU-39',
    name: 'Student #39 (Liam S.)',
    avatar: 'LS',
    step1: 'done',
    step2: 'struggling',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 245,
    dwellDisplay: '4m 05s',
    hintTier: 3,
    status: 'needs_attention',
    catchUpsUsed: 1,
    notes: 'High cognitive friction. 5s catch-up used at 10:18 AM.',
    scratchpad: 'Integral from 1 to 9 of ((u-1)/2) / sqrt(u) * du/2',
  },
  {
    id: 'STU-04',
    name: 'Student #04 (Jordan R.)',
    avatar: 'JR',
    step1: 'done',
    step2: 'done',
    step3: 'active',
    step4: 'locked',
    currentStep: 3,
    dwellSeconds: 110,
    dwellDisplay: '1m 50s',
    hintTier: 1,
    status: 'advanced',
    catchUpsUsed: 1,
    notes: 'Pacing ahead. Completed Step 2 limits in 1m 50s.',
    scratchpad: 'Limits [1, 9]. Factored out 1/4. Integrating u^(1/2) - u^(-1/2).',
  },
  {
    id: 'STU-08',
    name: 'Student #08 (Priya M.)',
    avatar: 'PM',
    step1: 'done',
    step2: 'done',
    step3: 'done',
    step4: 'active',
    currentStep: 4,
    dwellSeconds: 85,
    dwellDisplay: '1m 25s',
    hintTier: 0,
    status: 'advanced',
    catchUpsUsed: 0,
    notes: 'Self-sufficient flow state. Verifying arithmetic with FTC.',
    scratchpad: '1/4 * [ (2/3)u^(3/2) - 2u^(1/2) ] from 1 to 9 = 16/3.',
  },
  {
    id: 'STU-19',
    name: 'Student #19 (Carlos T.)',
    avatar: 'CT',
    step1: 'done',
    step2: 'done',
    step3: 'active',
    step4: 'locked',
    currentStep: 3,
    dwellSeconds: 130,
    dwellDisplay: '2m 10s',
    hintTier: 1,
    status: 'advanced',
    catchUpsUsed: 0,
    notes: 'Fast progress. Moving through algebraic simplification.',
    scratchpad: '1/4 * integral of (u-1)*u^(-1/2) du',
  },
  {
    id: 'STU-33',
    name: 'Student #33 (Emma W.)',
    avatar: 'EW',
    step1: 'done',
    step2: 'done',
    step3: 'done',
    step4: 'active',
    currentStep: 4,
    dwellSeconds: 95,
    dwellDisplay: '1m 35s',
    hintTier: 0,
    status: 'advanced',
    catchUpsUsed: 0,
    notes: 'Finished calculation. Ready for extension prompt.',
    scratchpad: 'Antiderivative checked against Wolfram/desmos. 16/3 confirmed.',
  },
  {
    id: 'STU-01',
    name: 'Student #01 (David H.)',
    avatar: 'DH',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 185,
    dwellDisplay: '3m 05s',
    hintTier: 1,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Target dwell. Evaluated u(0)=1 and u(4)=9 correctly.',
    scratchpad: 'u(0) = 1, u(4) = 9. Substituting limits now.',
  },
  {
    id: 'STU-02',
    name: 'Student #02 (Sophia C.)',
    avatar: 'SC',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 190,
    dwellDisplay: '3m 10s',
    hintTier: 2,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Target dwell. Consulted Tier 1 orienting hint.',
    scratchpad: 'Remember to adjust dx -> du / 2.',
  },
  {
    id: 'STU-05',
    name: 'Student #05 (Lucas N.)',
    avatar: 'LN',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 175,
    dwellDisplay: '2m 55s',
    hintTier: 1,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'On pace with professor pace line.',
    scratchpad: 'Upper limit: 2(4)+1 = 9. Lower limit: 2(0)+1 = 1.',
  },
  {
    id: 'STU-07',
    name: 'Student #07 (Chloe B.)',
    avatar: 'CB',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 200,
    dwellDisplay: '3m 20s',
    hintTier: 1,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Writing limits directly on worksheet.',
    scratchpad: 'int_1^9 (u-1)/(2*sqrt(u)) * (du/2)',
  },
  {
    id: 'STU-10',
    name: 'Student #10 (Aiden F.)',
    avatar: 'AF',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 180,
    dwellDisplay: '3m 00s',
    hintTier: 0,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Normal progression without hints.',
    scratchpad: 'x = (u-1)/2. New limits: [1, 9].',
  },
  {
    id: 'STU-14',
    name: 'Student #14 (Zoe K.)',
    avatar: 'ZK',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 195,
    dwellDisplay: '3m 15s',
    hintTier: 2,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Normal dwell. Transitioning to Step 3.',
    scratchpad: 'dx = du/2. Ready to combine constants 1/2 * 1/2 = 1/4.',
  },
  {
    id: 'STU-18',
    name: 'Student #18 (Marcus V.)',
    avatar: 'MV',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 210,
    dwellDisplay: '3m 30s',
    hintTier: 1,
    status: 'on_track',
    catchUpsUsed: 1,
    notes: 'Recovered using 5s catch-up in 8s.',
    scratchpad: 'Caught back up. Upper limit is 9.',
  },
  {
    id: 'STU-22',
    name: 'Student #22 (Hannah D.)',
    avatar: 'HD',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 165,
    dwellDisplay: '2m 45s',
    hintTier: 1,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Steady execution on Step 2.',
    scratchpad: 'Limit check: u(0)=1, u(4)=9. OK.',
  },
  {
    id: 'STU-25',
    name: 'Student #25 (Noah P.)',
    avatar: 'NP',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 190,
    dwellDisplay: '3m 10s',
    hintTier: 1,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Working through radical rewrite.',
    scratchpad: 'sqrt(u) in denominator is u^(-1/2).',
  },
  {
    id: 'STU-28',
    name: 'Student #28 (Isabella R.)',
    avatar: 'IR',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 205,
    dwellDisplay: '3m 25s',
    hintTier: 2,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Reviewed Tier 2 conceptual hint on bounds.',
    scratchpad: 'Limits are in u-world now, no need to substitute back at end!',
  },
  {
    id: 'STU-31',
    name: 'Student #31 (Ethan G.)',
    avatar: 'EG',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 170,
    dwellDisplay: '2m 50s',
    hintTier: 0,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Calm flow state. No hints queried.',
    scratchpad: 'u(0)=1, u(4)=9. Clear.',
  },
  {
    id: 'STU-35',
    name: 'Student #35 (Mia T.)',
    avatar: 'MT',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 185,
    dwellDisplay: '3m 05s',
    hintTier: 1,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Completing Step 2.',
    scratchpad: 'Limits ready: [1, 9].',
  },
  {
    id: 'STU-38',
    name: 'Student #38 (Benjamin H.)',
    avatar: 'BH',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 215,
    dwellDisplay: '3m 35s',
    hintTier: 2,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Normal pace, finalizing limit swap.',
    scratchpad: 'Integral 1 to 9.',
  },
  {
    id: 'STU-41',
    name: 'Student #41 (Charlotte B.)',
    avatar: 'CB',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 195,
    dwellDisplay: '3m 15s',
    hintTier: 1,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Good progress.',
    scratchpad: 'u = 2(0)+1 = 1, u = 2(4)+1 = 9.',
  },
  {
    id: 'STU-42',
    name: 'Student #42 (Daniel Y.)',
    avatar: 'DY',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 175,
    dwellDisplay: '2m 55s',
    hintTier: 0,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'No friction reported.',
    scratchpad: 'Moving to Step 3.',
  },
  {
    id: 'STU-43',
    name: 'Student #43 (Grace L.)',
    avatar: 'GL',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 190,
    dwellDisplay: '3m 10s',
    hintTier: 1,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Writing bounds.',
    scratchpad: 'Limits [1, 9].',
  },
  {
    id: 'STU-44',
    name: 'Student #44 (Oliver W.)',
    avatar: 'OW',
    step1: 'done',
    step2: 'active',
    step3: 'locked',
    step4: 'locked',
    currentStep: 2,
    dwellSeconds: 205,
    dwellDisplay: '3m 25s',
    hintTier: 2,
    status: 'on_track',
    catchUpsUsed: 0,
    notes: 'Target pace.',
    scratchpad: 'Checked with neighbor: limits are 1 and 9.',
  },
]

export function TeacherDashboard({
  currentCourse,
  currentTopic,
  activeStepNumber,
  onSwitchToStudent,
}: TeacherDashboardProps) {
  const [students, setStudents] = useState<StudentProgress[]>(INITIAL_STUDENTS)
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'needs_attention' | 'on_track' | 'advanced'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [broadcastMessage, setBroadcastMessage] = useState<string | null>(null)
  const [alertType, setAlertType] = useState<'success' | 'info' | 'warning'>('success')
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [exportingCSV, setExportingCSV] = useState(false)

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesFilter = filterStatus === 'all' || s.status === filterStatus
      const matchesSearch =
        searchQuery.trim() === '' ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.notes.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [students, filterStatus, searchQuery])

  // Counts for filter pills
  const counts = useMemo(() => {
    return {
      all: students.length,
      needs_attention: students.filter((s) => s.status === 'needs_attention').length,
      on_track: students.filter((s) => s.status === 'on_track').length,
      advanced: students.filter((s) => s.status === 'advanced').length,
    }
  }, [students])

  // Broadcast Actions
  const handleBroadcastPause = () => {
    setAlertType('warning')
    setBroadcastMessage('15-second calm pause broadcasted to all 44 student screens.')
    setTimeout(() => setBroadcastMessage(null), 4500)
  }

  const handlePushHint = () => {
    setAlertType('info')
    setBroadcastMessage('Pushed Step 2 boundary-change micro-hint (u(0)=1, u(4)=9) to active students.')
    setTimeout(() => setBroadcastMessage(null), 4500)
  }

  const handleDeployExtension = () => {
    setAlertType('success')
    setBroadcastMessage('Pushed optional trigonometric extension problem to 4 advanced students.')
    setTimeout(() => setBroadcastMessage(null), 4500)
  }

  const handleSendStudentNudge = (studentId: string) => {
    setAlertType('info')
    setBroadcastMessage(`Discreet guidance cue sent to ${studentId}.`)
    setTimeout(() => setBroadcastMessage(null), 4000)
    if (selectedStudent && selectedStudent.id === studentId) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId
            ? {
                ...s,
                notes: `${s.notes} · Micro-nudge sent at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              }
            : s
        )
      )
    }
  }

  const handleMarkResolved = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, status: 'on_track', notes: 'Flag resolved by instructor.' } : s
      )
    )
    if (selectedStudent && selectedStudent.id === studentId) {
      setSelectedStudent((prev) => (prev ? { ...prev, status: 'on_track', notes: 'Flag resolved by instructor.' } : null))
    }
    setAlertType('success')
    setBroadcastMessage(`Student ${studentId} marked as back on track.`)
    setTimeout(() => setBroadcastMessage(null), 3500)
  }

  // Download Markdown Report
  const handleDownloadMarkdown = () => {
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    const timeStr = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })

    const mdContent = `# Bullseye · Instructional Analytics & Cognitive Health Report
**Course:** ${currentCourse} · Calculus
**Topic:** ${currentTopic} (Step ${activeStepNumber}: Change Limits)
**Date & Time:** ${dateStr} at ${timeStr}
**Instructor:** Prof. Chen | UCI Digital Learning Lab
**Active Cohort:** 44 / 48 Students Live (91.7% active attendance)

---

## 1. Executive Health Scorecard
- **Cohort Concept Flow:** 86% (Strong Rhythm · +12% vs last cohort)
- **Cognitive Friction Index:** 2.4 / 10 (Calibrated Flow State)
- **Socratic Self-Sufficiency Rate:** 82% resolved at Tiers 1–2 (Zero direct answers leaked)
- **Re-Orientation Latency:** 8.4s average rejoin latency after drift
- **Target Dwell Adherence:** 82% within target dwell zone (2–4 minutes)

---

## 2. Pacing & Checkpoint Distribution
- **Step 1 (Identify substitution u = 2x+1, du = 2 dx):** 100% Completed (0 active)
- **Step 2 (Calculate limits u(0)=1, u(4)=9):** 70.5% (31 active students) [Current Lecture Focus]
- **Step 3 (Substitute & integrate 1/4 int (u^(1/2) - u^(-1/2)) du):** 20.5% (9 students)
- **Step 4 (Final arithmetic & FTC verification = 16/3):** 9.0% (4 students)

---

## 3. Socratic Scaffolding & Conceptual Growth Audit
- **Tier 1 (Orienting - "Where to Look"):** 22 requests (46%)
- **Tier 2 (Conceptual - "Why Limits Change"):** 14 requests (29%)
- **Tier 3 (Procedural - "Algebraic Steps"):** 8 requests (17%)
- **Tier 4 (Worked Model - "Limit Derivation Example"):** 4 requests (8%)
- **Guardrail Efficacy:** 100% compliant. Students maintained active cognitive ownership with zero answer leakage.

---

## 4. Actionable Student Roster & Attention Flags
### Students Ready for Check-in (3)
1. **Student #12 (Alex K.):** Dwelling 4m 35s on Step 2. Queried Tier 3 procedural hint. Note: Exceeded dwell on upper limit evaluation u(4).
2. **Student #27 (Maya L.):** Dwelling 4m 20s on Step 2. Queried Tier 2 conceptual hint. Note: Reviewing variable transform for numerator x.
3. **Student #39 (Liam S.):** Dwelling 4m 05s on Step 2. Queried Tier 3 hint. Triggered 5s catch-up tool.

### Advanced Extension Candidates (4)
1. **Student #04 (Jordan R.):** Advanced to Step 3 in 1m 50s.
2. **Student #08 (Priya M.):** Advanced to Step 4 in 1m 25s. Verified solution.
3. **Student #19 (Carlos T.):** Advanced to Step 3 in 2m 10s.
4. **Student #33 (Emma W.):** Advanced to Step 4 in 1m 35s. Ready for extension.

---

## 5. Pedagogical Next Steps for Discussion Section
- **Immediate Review (5 mins):** Spend the first 5 minutes of discussion reviewing upper and lower limit substitutions before introducing trigonometric integrals.
- **Common Hurdle:** Emphasize that evaluating limits in the u-domain eliminates the need to substitute back into x at the end of definite integrals.

*Generated automatically by Bullseye Classroom Accessibility Engine (RFC 4180 / xAPI Compliant)*
`
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bullseye_teacher_report_${currentCourse.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setShowDownloadModal(false)
    setAlertType('success')
    setBroadcastMessage('Instructional Markdown Report downloaded successfully.')
    setTimeout(() => setBroadcastMessage(null), 4000)
  }

  // Print Executive PDF
  const handlePrintReport = () => {
    setShowDownloadModal(false)
    window.print()
  }

  // Export CSV Telemetry
  const handleExportCSV = async () => {
    try {
      setExportingCSV(true)
      const csvData = await api.exportTelemetryCSV()
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `uci_dll_telemetry_${currentCourse.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setShowDownloadModal(false)
      setAlertType('success')
      setBroadcastMessage('Research Telemetry CSV exported successfully (RFC 4180 / xAPI).')
      setTimeout(() => setBroadcastMessage(null), 4000)
    } catch (err) {
      console.error('Export error:', err)
      setAlertType('warning')
      setBroadcastMessage('Export failed. Please check network/server status.')
      setTimeout(() => setBroadcastMessage(null), 4000)
    } finally {
      setExportingCSV(false)
    }
  }

  return (
    <div className="teacher-dashboard-container" role="main" aria-label="Teacher Cognitive Dashboard">
      {/* HEADER SECTION: COURSE BANNER & PRIMARY CONTROLS */}
      <header className="td-header">
        <div className="td-header-left">
          <div className="td-badge-strip">
            <span className="td-badge portal">
              <BarChart3 size={13} aria-hidden="true" />
              <span>Instructor & Researcher Portal</span>
            </span>
            <span className="td-badge live">
              <span className="td-badge live-dot" aria-hidden="true" />
              <span>44 / 48 Students Active</span>
            </span>
          </div>
          <h1 className="td-title">{currentCourse} · {currentTopic}</h1>
          <p className="td-sub">
            <span>Prof. Chen · UCI Digital Learning Lab</span>
            <span className="td-sub-sep">/</span>
            <span>Active Checkpoint: Step {activeStepNumber} (Change Limits)</span>
          </p>
        </div>

        <div className="td-header-right">
          <button
            type="button"
            className="btn-td-secondary"
            onClick={() => setShowDownloadModal(true)}
            aria-label="Download teacher analytics report"
            title="Download printable PDF, Markdown summary, or research CSV"
          >
            <Download size={15} aria-hidden="true" />
            <span>Download Report</span>
          </button>

          <button
            type="button"
            className="btn-td-primary"
            onClick={onSwitchToStudent}
            title="Switch back to student view"
          >
            <span>Student Checkpoint</span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* POSITIVE MOMENTUM RIBBON */}
      <div className="td-momentum-ribbon" role="status">
        <div className="td-momentum-content">
          <Sparkles size={16} aria-hidden="true" />
          <span>Class is in great rhythm today · 82% conceptual independence · 0 direct answer leaks</span>
        </div>
        <div className="td-momentum-badge">
          <span>Target Flow: On Pace</span>
        </div>
      </div>

      {/* BROADCAST ALERT BANNER */}
      {broadcastMessage && (
        <div className={`td-alert-banner ${alertType}`} role="status">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={16} aria-hidden="true" />
            <span>{broadcastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setBroadcastMessage(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex' }}
            aria-label="Dismiss alert"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* ==========================================================================
          ROW 1: PRIMARY COCKPIT GRID (Attention Flow | 86% Concept Dial | Readiness Rings)
          ========================================================================== */}
      <div className="td-primary-cockpit-grid">
        {/* CARD 1 (LEFT): 50-Min Attention & Cognitive Flow Wave + Integrated Dual Metrics */}
        <div className="td-card td-attention-card">
          <div className="td-card-head">
            <div className="td-card-title-group">
              <Zap size={16} style={{ color: 'var(--td-teal)' }} aria-hidden="true" />
              <h2 className="td-card-title">50-Min Attention & Cognitive Flow</h2>
            </div>
            <span className="td-card-badge">Live Lecture</span>
          </div>

          <div className="td-wave-svg-wrap" title="Continuous cognitive attention curve across 50 minutes">
            <div className="td-wave-callout">
              <Sparkles size={11} aria-hidden="true" />
              <span>Peak Flow: 88%</span>
            </div>
            <svg viewBox="0 0 280 110" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
              <defs>
                <linearGradient id="attentionFlowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00a896" stopOpacity="0.32" />
                  <stop offset="70%" stopColor="#10b981" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,80 C 40,30 70,85 110,60 C 140,40 160,20 180,24 C 200,28 220,70 250,55 C 265,48 275,60 280,65 L 280,110 L 0,110 Z"
                fill="url(#attentionFlowGrad)"
              />
              <path
                d="M 0,80 C 40,30 70,85 110,60 C 140,40 160,20 180,24 C 200,28 220,70 250,55 C 265,48 275,60 280,65"
                fill="none"
                stroke="#00a896"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="180" cy="24" r="4.5" fill="#00a896" stroke="#ffffff" strokeWidth="2" />
              <line x1="180" y1="28" x2="180" y2="110" stroke="#00a896" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
            </svg>
          </div>

          <div className="td-dual-kpi-strip">
            <div className="td-kpi-subitem">
              <span className="td-kpi-subitem-label">Active Students</span>
              <span className="td-kpi-subitem-val" style={{ color: 'var(--td-teal-deep)' }}>44</span>
              <div className="td-kpi-subitem-sparkline" title="Attendance stable: 44 live students">
                <svg viewBox="0 0 100 24" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }} aria-hidden="true">
                  <path d="M 0,16 Q 25,12 50,18 T 100,10" fill="none" stroke="#00a896" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="100" cy="10" r="3" fill="#00a896" />
                </svg>
              </div>
            </div>

            <div className="td-kpi-subitem">
              <span className="td-kpi-subitem-label">Rejoin Latency</span>
              <span className="td-kpi-subitem-val" style={{ color: 'var(--td-amber-deep)' }}>8.4s</span>
              <div className="td-kpi-subitem-sparkline" title="Latency dropped from 14s to 8.4s">
                <svg viewBox="0 0 100 24" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }} aria-hidden="true">
                  <path d="M 0,6 Q 25,10 50,14 T 100,20" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="100" cy="20" r="3" fill="#f59e0b" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2 (CENTER HERO): 86% Concept Flow Dial Arc & Milestone Progression */}
        <div className="td-card td-hero-dial-card">
          <div className="td-dial-wrap" title="86% Cohort Concept Flow">
            <svg viewBox="0 0 240 150" style={{ width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
              <defs>
                <linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00a896" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              {/* Dial background track arc (212° open gauge) */}
              <path
                d="M 35.4,142.3 A 88,88 0 1,1 204.6,142.3"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Dial filled progress arc (86% fill) */}
              <path
                d="M 35.4,142.3 A 88,88 0 1,1 204.6,142.3"
                fill="none"
                stroke="url(#dialGrad)"
                strokeWidth="14"
                strokeDasharray="325"
                strokeDashoffset="45"
                strokeLinecap="round"
              />
            </svg>

            <div className="td-dial-center-content">
              <span className="td-dial-percentage">86%</span>
              <span className="td-dial-title">Concept Flow</span>
              <span className="td-dial-subtext">Cohort in Strong Rhythm</span>
            </div>
          </div>

          <button
            type="button"
            className="td-hero-action-btn"
            onClick={handlePushHint}
            title="Push a subtle reminder about u(0)=1 and u(4)=9"
          >
            <Sparkles size={16} aria-hidden="true" />
            <span>Push Step 2 Micro-Hint</span>
          </button>

          <div className="td-timeline-strip">
            <span className="td-timeline-title">Lecture Milestone Progression</span>
            <div className="td-timeline-steps">
              <div className="td-timeline-step-chip done">
                <span>Step 1</span>
                <span>Setup</span>
              </div>
              <span className="td-timeline-arrow">→</span>
              <div className="td-timeline-step-chip active">
                <span>Step 2</span>
                <span>Limits</span>
              </div>
              <span className="td-timeline-arrow">→</span>
              <div className="td-timeline-step-chip">
                <span>Step 3</span>
                <span>Integrate</span>
              </div>
              <span className="td-timeline-arrow">→</span>
              <div className="td-timeline-step-chip">
                <span>Step 4</span>
                <span>Verify</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3 (RIGHT): Cohort Readiness Rings + Integrated Cumulative Pace Curve */}
        <div className="td-card td-readiness-card">
          <div className="td-card-head">
            <div className="td-card-title-group">
              <CheckCircle size={15} style={{ color: 'var(--td-emerald)' }} aria-hidden="true" />
              <h3 className="td-card-title" style={{ fontSize: '0.86rem' }}>Cohort Readiness Rings</h3>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--td-emerald-deep)', fontWeight: 700 }}>High Health</span>
          </div>

          <div className="td-rings-row">
            <div className="td-ring-item">
              <div className="td-ring-svg-wrap" title="92% Attendance (44 of 48 live)">
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} aria-hidden="true">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="3.4"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#00a896"
                    strokeWidth="3.4"
                    strokeDasharray="92, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="td-ring-center-val">92%</div>
              </div>
              <span className="td-ring-label">Attendance</span>
              <span className="td-ring-sub">44 / 48 Active</span>
            </div>

            <div className="td-ring-item">
              <div className="td-ring-svg-wrap" title="82% Socratic Self-Sufficiency without answer leaks">
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} aria-hidden="true">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="3.4"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3.4"
                    strokeDasharray="82, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="td-ring-center-val" style={{ color: 'var(--td-lavender-deep)' }}>82%</div>
              </div>
              <span className="td-ring-label">Self-Sufficiency</span>
              <span className="td-ring-sub">Zero Answer Leaks</span>
            </div>
          </div>

          <div className="td-integrated-pace-block">
            <div className="td-pace-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <TrendingUp size={13} style={{ color: 'var(--td-teal)' }} aria-hidden="true" />
                Cumulative Pace vs Syllabus
              </span>
              <span className="td-card-badge" style={{ color: 'var(--td-emerald-deep)', fontWeight: 800 }}>+6% Ahead</span>
            </div>

            <div className="td-pace-svg-wrap" title="Actual cohort pace tracking slightly ahead of expected syllabus pace">
              <svg viewBox="0 0 240 55" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
                <defs>
                  <linearGradient id="paceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00a896" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00a896" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0,50 Q 120,38 240,20" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />
                <path d="M 0,50 Q 120,30 240,10 L 240,55 L 0,55 Z" fill="url(#paceGrad)" />
                <path d="M 0,50 Q 120,30 240,10" fill="none" stroke="#00a896" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="240" cy="10" r="3.5" fill="#00a896" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================================
          ROW 2: SECONDARY ANALYTICS GRID (Lecture Schedule | Balance Bars | Dwell Histogram)
          ========================================================================== */}
      <div className="td-secondary-cockpit-grid">
        {/* CARD 4: Mini Lecture Schedule */}
        <div className="td-card td-schedule-card">
          <div className="td-card-head">
            <div className="td-card-title-group">
              <Calendar size={15} style={{ color: 'var(--td-teal)' }} aria-hidden="true" />
              <h3 className="td-card-title" style={{ fontSize: '0.86rem' }}>Mini Lecture Schedule</h3>
            </div>
            <span className="td-card-badge">Today</span>
          </div>

          <div className="td-schedule-list">
            <div className="td-schedule-item">
              <span className="td-schedule-time">11:00 AM</span>
              <span className="td-schedule-topic">Substitution Conception</span>
            </div>
            <div className="td-schedule-item" style={{ background: 'var(--td-teal-bg)' }}>
              <span className="td-schedule-time" style={{ color: 'var(--td-teal-deep)' }}>11:18 AM</span>
              <span className="td-schedule-topic" style={{ color: 'var(--td-teal-deep)', fontWeight: 800 }}>Change of Limits Focus</span>
            </div>
            <div className="td-schedule-item">
              <span className="td-schedule-time">11:35 AM</span>
              <span className="td-schedule-topic">Integration & FTC Verify</span>
            </div>
          </div>
        </div>

        {/* CARD 5: Conceptual vs Procedural Balance Bar Chart */}
        <div className="td-card td-balance-card">
          <div className="td-card-head">
            <div className="td-card-title-group">
              <BarChart3 size={15} style={{ color: 'var(--td-text-muted)' }} aria-hidden="true" />
              <h3 className="td-card-title" style={{ fontSize: '0.84rem' }}>Conceptual vs Procedural Balance</h3>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--td-emerald-deep)', fontWeight: 700 }}>Balanced Flow</span>
          </div>

          <div className="td-balance-chart" role="img" aria-label="Conceptual versus procedural balance chart">
            <div className="td-balance-col">
              <div className="td-balance-bar teal" style={{ height: '78%' }} title="Conceptual Understanding: 78%" />
              <span className="td-balance-label">Concept</span>
            </div>
            <div className="td-balance-col">
              <div className="td-balance-bar emerald" style={{ height: '94%' }} title="Limit Logic: 94%" />
              <span className="td-balance-label">Limits</span>
            </div>
            <div className="td-balance-col">
              <div className="td-balance-bar lavender" style={{ height: '68%' }} title="Subst. Rewriting: 68%" />
              <span className="td-balance-label">Rewrite</span>
            </div>
            <div className="td-balance-col">
              <div className="td-balance-bar amber" style={{ height: '84%' }} title="Procedural Algebra: 84%" />
              <span className="td-balance-label">Procedural</span>
            </div>
          </div>
        </div>

        {/* CARD 6: Step 2 Dwell Time Distribution Histogram */}
        <div className="td-card td-dwell-card">
          <div className="td-card-head">
            <div className="td-card-title-group">
              <Clock size={15} style={{ color: 'var(--td-teal)' }} aria-hidden="true" />
              <h3 className="td-card-title" style={{ fontSize: '0.84rem' }}>Step 2 Dwell Time Distribution</h3>
            </div>
            <span className="td-card-badge" style={{ color: 'var(--td-teal-deep)', fontWeight: 700 }}>Target: 2–4m</span>
          </div>

          <div className="td-dwell-histogram-bars" role="img" aria-label="Dwell time distribution histogram">
            <div className="td-hist-col">
              <div className="td-hist-bar normal" style={{ height: '24%' }}>
                <span className="td-hist-count">6</span>
              </div>
              <span className="td-hist-label">&lt;2m</span>
            </div>
            <div className="td-hist-col">
              <div className="td-hist-bar target" style={{ height: '88%' }}>
                <span className="td-hist-count">28</span>
              </div>
              <span className="td-hist-label" style={{ color: 'var(--td-teal-deep)' }}>2–4m</span>
            </div>
            <div className="td-hist-col">
              <div className="td-hist-bar warning" style={{ height: '32%' }}>
                <span className="td-hist-count">8</span>
              </div>
              <span className="td-hist-label">4–6m</span>
            </div>
            <div className="td-hist-col">
              <div className="td-hist-bar critical" style={{ height: '14%' }}>
                <span className="td-hist-count">2</span>
              </div>
              <span className="td-hist-label">&gt;6m</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================================
          BOTTOM SECTION: STUDENT PROGRESS HEATMAP & 1-CLICK ACTION HUB
          ========================================================================== */}
      <div className="td-bottom-section">
        {/* Student Progress Heatmap Table */}
        <section className="td-matrix-section" aria-label="Student Progress and Mastery Matrix">
          <div className="td-matrix-header">
            <div>
              <h2 className="td-card-title" style={{ fontSize: '1.05rem' }}>Student Progress & Mastery Matrix</h2>
              <div style={{ fontSize: '0.74rem', color: 'var(--td-text-muted)', marginTop: '2px' }}>
                Click any student row to inspect scratchpad, review Socratic help trail, or provide supportive guidance
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {/* Filter Pills */}
              <div className="td-matrix-filters" role="group" aria-label="Filter students by status">
                <button
                  type="button"
                  className={`td-filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('all')}
                >
                  All ({counts.all})
                </button>
                <button
                  type="button"
                  className={`td-filter-btn ${filterStatus === 'needs_attention' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('needs_attention')}
                >
                  Ready for Check-in ({counts.needs_attention})
                </button>
                <button
                  type="button"
                  className={`td-filter-btn ${filterStatus === 'on_track' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('on_track')}
                >
                  On Track ({counts.on_track})
                </button>
                <button
                  type="button"
                  className={`td-filter-btn ${filterStatus === 'advanced' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('advanced')}
                >
                  Extension Stars ({counts.advanced})
                </button>
              </div>

              {/* Search Box */}
              <div className="td-search-box">
                <Search size={14} style={{ color: 'var(--td-text-muted)' }} aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search student or note..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search student by name or ID"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--td-text-muted)' }}
                    aria-label="Clear search"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="td-table-wrapper">
            <table className="td-matrix-table" aria-label="Class roster progress matrix">
              <thead>
                <tr>
                  <th scope="col">Student</th>
                  <th scope="col">Step 1 (Setup)</th>
                  <th scope="col">Step 2 (Limits)</th>
                  <th scope="col">Step 3 (Integrate)</th>
                  <th scope="col">Step 4 (Verify)</th>
                  <th scope="col">Dwell Time</th>
                  <th scope="col">Socratic Tier</th>
                  <th scope="col">Support Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr
                    key={s.id}
                    className={`td-matrix-row ${selectedStudent?.id === s.id ? 'highlighted' : ''}`}
                    onClick={() => setSelectedStudent(s)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${s.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelectedStudent(s)
                      }
                    }}
                  >
                    <td>
                      <div className="td-student-id-cell">
                        <span className="td-student-avatar" aria-hidden="true">{s.avatar}</span>
                        <span>{s.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="td-cell-pill done" title="Step 1 completed">
                        <Check size={12} aria-hidden="true" /> Done
                      </span>
                    </td>
                    <td>
                      {s.step2 === 'done' ? (
                        <span className="td-cell-pill done" title="Step 2 completed">
                          <Check size={12} aria-hidden="true" /> Done
                        </span>
                      ) : s.step2 === 'struggling' ? (
                        <span className="td-cell-pill struggling" title="Dwelling on limits">
                          <Clock size={12} aria-hidden="true" /> &gt; 4m
                        </span>
                      ) : (
                        <span className="td-cell-pill active" title="Active on limits">
                          Active
                        </span>
                      )}
                    </td>
                    <td>
                      {s.step3 === 'done' ? (
                        <span className="td-cell-pill done" title="Step 3 completed">
                          <Check size={12} aria-hidden="true" /> Done
                        </span>
                      ) : s.step3 === 'active' ? (
                        <span className="td-cell-pill active" title="Active on integration">
                          Active
                        </span>
                      ) : (
                        <span className="td-cell-pill locked" title="Step 3 upcoming">
                          —
                        </span>
                      )}
                    </td>
                    <td>
                      {s.step4 === 'done' ? (
                        <span className="td-cell-pill done" title="Step 4 completed">
                          <Check size={12} aria-hidden="true" /> Done
                        </span>
                      ) : s.step4 === 'active' ? (
                        <span className="td-cell-pill active" title="Active on verification">
                          Active
                        </span>
                      ) : (
                        <span className="td-cell-pill locked" title="Step 4 upcoming">
                          —
                        </span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: s.dwellSeconds > 240 ? 'var(--td-amber-deep)' : 'inherit' }}>
                        {s.dwellDisplay}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.74rem', color: s.hintTier >= 3 ? 'var(--td-lavender-deep)' : 'var(--td-text-muted)' }}>
                        {s.hintTier === 0 ? 'None' : `Tier ${s.hintTier}`}
                      </span>
                    </td>
                    <td>
                      {s.status === 'needs_attention' && (
                        <span className="td-status-tag needs-support">Ready for Check-in</span>
                      )}
                      {s.status === 'on_track' && (
                        <span className="td-status-tag on-track">On Track</span>
                      )}
                      {s.status === 'advanced' && (
                        <span className="td-status-tag advanced">Extension Star</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 1-Click Classroom Action Hub */}
        <div className="td-action-strip">
          <button
            type="button"
            className="btn-action-card pause"
            onClick={handleBroadcastPause}
            title="Send a 15-second calm pause signal to class"
          >
            <div className="btn-action-icon pause" aria-hidden="true">
              <Flame size={18} />
            </div>
            <div>
              <span className="btn-action-title">Broadcast 15s Pause</span>
              <span className="btn-action-desc">Freezes student screens with a calm breathing cue</span>
            </div>
          </button>

          <button
            type="button"
            className="btn-action-card hint"
            onClick={handlePushHint}
            title="Push a subtle reminder about u(0)=1 and u(4)=9"
          >
            <div className="btn-action-icon hint" aria-hidden="true">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="btn-action-title">Push Step 2 Micro-Hint</span>
              <span className="btn-action-desc">Reminds class: evaluate u(0)=1 and u(4)=9</span>
            </div>
          </button>

          <button
            type="button"
            className="btn-action-card extend"
            onClick={handleDeployExtension}
            title="Push optional extension challenge to advanced students"
          >
            <div className="btn-action-icon extend" aria-hidden="true">
              <Zap size={18} />
            </div>
            <div>
              <span className="btn-action-title">Deploy Extension Challenge</span>
              <span className="btn-action-desc">Pushes trigonometric substitution bonus to 4 early finishers</span>
            </div>
          </button>
        </div>
      </div>

      {/* ==========================================================================
          SLIDE-OVER STUDENT DETAIL DRAWER (Progressive Disclosure)
          ========================================================================== */}
      {selectedStudent && (
        <div
          className="td-drawer-backdrop"
          onClick={() => setSelectedStudent(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Student Profile: ${selectedStudent.name}`}
        >
          <div className="td-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="td-drawer-head">
              <div className="td-drawer-title-group">
                <span className="td-drawer-avatar" aria-hidden="true">{selectedStudent.avatar}</span>
                <div>
                  <h3 className="td-drawer-name">{selectedStudent.name}</h3>
                  <div style={{ fontSize: '0.74rem', color: 'var(--td-text-muted)' }}>
                    ID: {selectedStudent.id} · Active Checkpoint: Step {selectedStudent.currentStep}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="td-drawer-close"
                onClick={() => setSelectedStudent(null)}
                aria-label="Close student drawer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="td-drawer-body">
              {/* Session Diagnostics */}
              <div>
                <div className="td-drawer-section-title">Session Diagnostics</div>
                <div className="td-drawer-metric-grid">
                  <div className="td-drawer-metric-card">
                    <span className="td-drawer-metric-label">Current Step Dwell</span>
                    <div className="td-drawer-metric-val">{selectedStudent.dwellDisplay}</div>
                    <span style={{ fontSize: '0.68rem', color: selectedStudent.dwellSeconds > 240 ? 'var(--td-amber-deep)' : 'var(--td-emerald-deep)', fontWeight: 700 }}>
                      {selectedStudent.dwellSeconds > 240 ? 'Above target dwell (>4m)' : 'Within target range'}
                    </span>
                  </div>

                  <div className="td-drawer-metric-card">
                    <span className="td-drawer-metric-label">Hint Depth (ZPD)</span>
                    <div className="td-drawer-metric-val">
                      {selectedStudent.hintTier === 0 ? 'Tier 0' : `Tier ${selectedStudent.hintTier}`}
                    </div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--td-text-muted)' }}>
                      {selectedStudent.hintTier <= 2 ? 'Orienting / Conceptual' : 'Procedural Guidance'}
                    </span>
                  </div>

                  <div className="td-drawer-metric-card">
                    <span className="td-drawer-metric-label">5s Catch-Ups Used</span>
                    <div className="td-drawer-metric-val">{selectedStudent.catchUpsUsed}</div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--td-text-muted)' }}>
                      {selectedStudent.catchUpsUsed > 0 ? 'Re-synced in < 10s' : 'No drift recorded'}
                    </span>
                  </div>

                  <div className="td-drawer-metric-card">
                    <span className="td-drawer-metric-label">Support Status</span>
                    <div className="td-drawer-metric-val" style={{ textTransform: 'capitalize' }}>
                      {selectedStudent.status === 'needs_attention'
                        ? 'Check-in Ready'
                        : selectedStudent.status.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Observation Notes */}
              <div>
                <div className="td-drawer-section-title">Telemetry Notes</div>
                <div style={{ background: 'var(--td-surface-subtle)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', lineHeight: 1.5, color: 'var(--td-text-secondary)' }}>
                  {selectedStudent.notes}
                </div>
              </div>

              {/* Live Working-Memory Scratchpad Preview */}
              <div>
                <div className="td-drawer-section-title">Student Working Scratchpad</div>
                <div className="td-scratchpad-preview">
                  {selectedStudent.scratchpad}
                </div>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="td-drawer-actions">
              <button
                type="button"
                className="btn-td-primary"
                onClick={() => handleSendStudentNudge(selectedStudent.id)}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Sparkles size={14} aria-hidden="true" />
                <span>Send Discreet Boundary Hint</span>
              </button>

              {selectedStudent.status === 'needs_attention' && (
                <button
                  type="button"
                  className="btn-td-secondary"
                  onClick={() => handleMarkResolved(selectedStudent.id)}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Check size={14} aria-hidden="true" />
                  <span>Mark Flag as Resolved</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          DOWNLOAD REPORT MODAL
          ========================================================================== */}
      {showDownloadModal && (
        <div
          className="td-modal-backdrop"
          onClick={() => setShowDownloadModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Download Teacher Report"
        >
          <div className="td-modal" onClick={(e) => e.stopPropagation()}>
            <div className="td-modal-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={18} style={{ color: 'var(--td-teal-deep)' }} aria-hidden="true" />
                <h3 className="td-modal-title">Download Teacher Analytics Report</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDownloadModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--td-text-muted)' }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="td-modal-body">
              <div className="td-report-preview-box">
                <h4>{currentCourse} · {currentTopic}</h4>
                <div>
                  Includes executive class health scores, Step 1–4 pacing distributions, Socratic hint breakdown, attention flags, and pedagogical recommendations for discussion section.
                </div>
              </div>

              <div className="td-report-options">
                {/* Option 1: Executive PDF / Printable Report */}
                <div
                  className="td-report-option-card"
                  onClick={handlePrintReport}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handlePrintReport()
                  }}
                >
                  <div className="td-report-option-info">
                    <div className="td-option-icon pdf" aria-hidden="true">
                      <Printer size={18} />
                    </div>
                    <div>
                      <span className="btn-action-title">Executive PDF / Printable Brief</span>
                      <span className="btn-action-desc">High-resolution, 1–2 page clean printout for meetings & TAs</span>
                    </div>
                  </div>
                  <ArrowRight size={16} style={{ color: 'var(--td-text-muted)' }} />
                </div>

                {/* Option 2: Markdown Brief for Canvas LMS */}
                <div
                  className="td-report-option-card"
                  onClick={handleDownloadMarkdown}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleDownloadMarkdown()
                  }}
                >
                  <div className="td-report-option-info">
                    <div className="td-option-icon md" aria-hidden="true">
                      <FileText size={18} />
                    </div>
                    <div>
                      <span className="btn-action-title">Instructional Markdown (.md)</span>
                      <span className="btn-action-desc">Ready to paste into Canvas announcements or syllabus log</span>
                    </div>
                  </div>
                  <Download size={16} style={{ color: 'var(--td-text-muted)' }} />
                </div>

                {/* Option 3: Research Telemetry CSV */}
                <div
                  className="td-report-option-card"
                  onClick={handleExportCSV}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleExportCSV()
                  }}
                >
                  <div className="td-report-option-info">
                    <div className="td-option-icon csv" aria-hidden="true">
                      <FileSpreadsheet size={18} />
                    </div>
                    <div>
                      <span className="btn-action-title">
                        {exportingCSV ? 'Generating CSV...' : 'Raw Telemetry Dataset (CSV)'}
                      </span>
                      <span className="btn-action-desc">RFC 4180 / xAPI event log for learning science researchers</span>
                    </div>
                  </div>
                  <Download size={16} style={{ color: 'var(--td-text-muted)' }} />
                </div>
              </div>
            </div>

            <div className="td-modal-footer">
              <button
                type="button"
                className="btn-td-secondary"
                onClick={() => setShowDownloadModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
