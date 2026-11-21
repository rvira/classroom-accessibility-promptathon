import { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle,
  Download,
  Flame,
  Radio,
  RotateCcw,
  Sparkles,
  Users,
} from 'lucide-react'
import { api } from '../services/api'
import { type Translations } from '../i18n'

interface TeacherDashboardProps {
  currentCourse: string
  currentTopic: string
  activeStepNumber: number
  onSwitchToStudent: () => void
  t: Translations
}

export function TeacherDashboard({
  currentCourse,
  currentTopic,
  activeStepNumber,
  onSwitchToStudent,
}: TeacherDashboardProps) {
  const [broadcastMessage, setBroadcastMessage] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)
  const [exportNotice, setExportNotice] = useState<string | null>(null)

  const handleBroadcastPause = () => {
    setBroadcastMessage('15-second class pause signal broadcasted to all student screens.')
    setTimeout(() => setBroadcastMessage(null), 4000)
  }

  const handlePushHint = () => {
    setBroadcastMessage('Pushed Step 2 boundary-change micro-hint to active students.')
    setTimeout(() => setBroadcastMessage(null), 4000)
  }

  const handleExportCSV = async () => {
    try {
      setExporting(true)
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
      setExportNotice('Telemetry exported successfully (RFC 4180 CSV).')
      setTimeout(() => setExportNotice(null), 4000)
    } catch (err) {
      console.error('Export error:', err)
      setExportNotice('Export failed. Please check network/server status.')
      setTimeout(() => setExportNotice(null), 4000)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="teacher-dashboard-container" role="main" aria-label="Teacher Cognitive Dashboard">
      {/* Top Controls & Course Banner */}
      <div className="teacher-dash-header">
        <div className="teacher-header-left">
          <div className="teacher-badge-row">
            <span className="teacher-role-badge">
              <BarChart3 size={14} aria-hidden="true" />
              <span>Instructor & Researcher Portal</span>
            </span>
            <span className="teacher-live-indicator">
              <Radio size={13} className="pulse-icon" aria-hidden="true" />
              <span>Telemetry Engine Live</span>
            </span>
          </div>
          <h1 className="teacher-dash-title">
            Class Cognitive Attention & Scaffolding Analytics
          </h1>
          <p className="teacher-dash-sub">
            Monitoring {currentCourse} · {currentTopic} (Step {activeStepNumber}: Change Limits)
          </p>
        </div>

        <div className="teacher-header-right">
          <button
            type="button"
            className="btn-switch-student-view"
            onClick={onSwitchToStudent}
            title="Switch back to student view"
          >
            <span>Switch to Student Checkpoint</span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      {broadcastMessage && (
        <div className="teacher-broadcast-alert" role="status">
          <CheckCircle size={16} aria-hidden="true" />
          <span>{broadcastMessage}</span>
        </div>
      )}

      {exportNotice && (
        <div className="teacher-export-alert" role="status">
          <CheckCircle size={16} aria-hidden="true" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Grid: 3 Main Telemetry Panels */}
      <div className="teacher-dash-grid">
        {/* PANEL 1: CLASSROOM ATTENTION & PACING PULSE */}
        <section className="teacher-card" aria-label="Class Attention & Pacing Pulse">
          <div className="teacher-card-head">
            <div className="card-head-title">
              <Users size={18} className="head-icon text-indigo" aria-hidden="true" />
              <h2>Class Attention & Pacing Pulse</h2>
            </div>
            <span className="card-head-stat">44 / 48 Students Live</span>
          </div>

          <div className="step-distribution-section">
            <div className="dist-label-row">
              <span className="dist-label">Student Distribution Across Steps</span>
              <span className="dist-active-focus">Active Step 2 (71%)</span>
            </div>
            <div className="dist-multi-bar" role="meter" aria-label="Step distribution">
              <div className="bar-slice step-1" style={{ width: '0%' }} title="Step 1: 0%" />
              <div className="bar-slice step-2" style={{ width: '70.5%' }} title="Step 2: 70.5% (31 students)" />
              <div className="bar-slice step-3" style={{ width: '20.5%' }} title="Step 3: 20.5% (9 students)" />
              <div className="bar-slice step-4" style={{ width: '9%' }} title="Step 4: 9% (4 students)" />
            </div>
            <div className="dist-legend">
              <span className="legend-item"><span className="legend-dot step-1" /> Step 1: Complete (0%)</span>
              <span className="legend-item"><span className="legend-dot step-2" /> Step 2: In Progress (71%)</span>
              <span className="legend-item"><span className="legend-dot step-3" /> Step 3: Advanced (21%)</span>
              <span className="legend-item"><span className="legend-dot step-4" /> Step 4: Submitted (8%)</span>
            </div>
          </div>

          <div className="teacher-metric-tiles">
            <div className="metric-tile">
              <span className="metric-tile-label">Avg Dwell on Step 2</span>
              <span className="metric-tile-val">3m 12s</span>
              <span className="metric-tile-sub text-success">Target: ~3m (Normal Class Pace)</span>
            </div>
            <div className="metric-tile">
              <span className="metric-tile-label">Cognitive Friction Index</span>
              <span className="metric-tile-val text-accent">2.4 / 10</span>
              <span className="metric-tile-sub text-success">Low Friction · Flow State</span>
            </div>
          </div>

          <div className="teacher-alert-box warning">
            <AlertTriangle size={16} aria-hidden="true" />
            <div className="alert-box-text">
              <strong>Attention Anomaly:</strong> 2 students have dwelled &gt; 4m on limit transformation. TA intervention recommended.
            </div>
          </div>
        </section>

        {/* PANEL 2: SOCRATIC SCAFFOLDING & GUARDRAILS */}
        <section className="teacher-card" aria-label="Socratic Scaffolding & Anti-Offloading Guardrails">
          <div className="teacher-card-head">
            <div className="card-head-title">
              <Sparkles size={18} className="head-icon text-amber" aria-hidden="true" />
              <h2>Socratic Scaffolding Telemetry</h2>
            </div>
            <span className="guardrail-status-pill">100% Guardrails Active</span>
          </div>

          <div className="socratic-funnel-section">
            <span className="funnel-title">Scaffolding Tier Requests (ZPD Depth)</span>
            <div className="funnel-bars">
              <div className="funnel-row">
                <span className="funnel-tier-name">Tier 1 (Orienting):</span>
                <div className="funnel-track">
                  <div className="funnel-fill tier-1" style={{ width: '46%' }} />
                </div>
                <span className="funnel-val">22 (46%)</span>
              </div>

              <div className="funnel-row">
                <span className="funnel-tier-name">Tier 2 (Conceptual):</span>
                <div className="funnel-track">
                  <div className="funnel-fill tier-2" style={{ width: '29%' }} />
                </div>
                <span className="funnel-val">14 (29%)</span>
              </div>

              <div className="funnel-row">
                <span className="funnel-tier-name">Tier 3 (Procedural):</span>
                <div className="funnel-track">
                  <div className="funnel-fill tier-3" style={{ width: '17%' }} />
                </div>
                <span className="funnel-val">8 (17%)</span>
              </div>

              <div className="funnel-row">
                <span className="funnel-tier-name">Tier 4 (Worked Model):</span>
                <div className="funnel-track">
                  <div className="funnel-fill tier-4" style={{ width: '8%' }} />
                </div>
                <span className="funnel-val">4 (8%)</span>
              </div>
            </div>
          </div>

          <div className="guardrail-efficacy-summary">
            <div className="efficacy-metric">
              <span className="metric-num text-success">82%</span>
              <span className="metric-desc">Resolved at Tiers 1–2 (No Model Needed)</span>
            </div>
            <div className="efficacy-metric">
              <span className="metric-num text-primary">0</span>
              <span className="metric-desc">Direct Answers Leaked (Full Guardrail)</span>
            </div>
          </div>
        </section>

        {/* PANEL 3: RE-ORIENTATION & INTERVENTION HUB */}
        <section className="teacher-card" aria-label="Re-Orientation & Live Interventions">
          <div className="teacher-card-head">
            <div className="card-head-title">
              <RotateCcw size={18} className="head-icon text-teal" aria-hidden="true" />
              <h2>Re-Orientation & Catch-Up Signals</h2>
            </div>
            <span className="catchup-count-chip">3 Catch-Ups Triggered</span>
          </div>

          <div className="catchup-timeline-section">
            <span className="timeline-title">Recent 5-Second Catch-Up Usage</span>
            <ul className="catchup-event-list">
              <li className="catchup-event-item">
                <span className="event-time">10:18 AM</span>
                <span className="event-desc">Student #12 used 5s Catch-Up on Step 2 ➔ Re-synced in 8s</span>
              </li>
              <li className="catchup-event-item">
                <span className="event-time">10:14 AM</span>
                <span className="event-desc">Student #27 used 5s Catch-Up on Step 2 ➔ Re-synced in 11s</span>
              </li>
              <li className="catchup-event-item">
                <span className="event-time">10:07 AM</span>
                <span className="event-desc">Student #04 used 5s Catch-Up on Step 1 ➔ Re-synced in 6s</span>
              </li>
            </ul>
          </div>

          <div className="teacher-actions-hub">
            <span className="actions-hub-title">Real-Time Classroom Interventions</span>
            <div className="teacher-action-buttons">
              <button
                type="button"
                className="btn-teacher-action pause"
                onClick={handleBroadcastPause}
                title="Send a 15-second calm pause signal to class"
              >
                <Flame size={14} aria-hidden="true" />
                <span>Broadcast 15s Pause</span>
              </button>

              <button
                type="button"
                className="btn-teacher-action hint"
                onClick={handlePushHint}
                title="Push a subtle reminder about u(0)=1 and u(4)=9"
              >
                <Sparkles size={14} aria-hidden="true" />
                <span>Push Step 2 Micro-Hint</span>
              </button>
            </div>
          </div>
        </section>

        {/* PANEL 4: RESEARCH TELEMETRY EXPORT */}
        <section className="teacher-card full-width" aria-label="Research Telemetry Engine">
          <div className="teacher-card-head">
            <div className="card-head-title">
              <Download size={18} className="head-icon text-indigo" aria-hidden="true" />
              <h2>UCI Digital Learning Lab xAPI Telemetry Data</h2>
            </div>
            <span className="xapi-counter-chip">1,284 Events Ingested</span>
          </div>

          <div className="telemetry-export-row">
            <div className="telemetry-info-text">
              <p>
                Real-time research telemetry formatted in RFC 4180 CSV and xAPI schema.
                Captures cognitive dwell duration, scaffolding tier progression, anti-offloading guardrail compliance, and 5s catch-up triggers.
              </p>
            </div>

            <div className="telemetry-btn-wrap">
              <button
                type="button"
                className="btn-export-telemetry"
                onClick={handleExportCSV}
                disabled={exporting}
              >
                <Download size={15} aria-hidden="true" />
                <span>{exporting ? 'Generating CSV...' : 'Export Telemetry CSV'}</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
