import { Link } from 'react-router-dom'
import {
  Calendar,
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  CheckCircle2,
  Volume2,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'
import { CanvasLogo, EdStemLogo } from './BrandLogos'

interface LandingPageProps {
  onStartTour: () => void
}

export function LandingPage({ onStartTour }: LandingPageProps) {
  return (
    <div className="landing-page-container">
      {/* Hero Section */}
      <section className="landing-hero-section" aria-labelledby="hero-heading">
        <div className="landing-hero-content">
          <div className="hero-pill-tag">
            <span className="pill-dot" />
            <span className="pill-text">WCAG 2.2 AA · Cognitive Accessibility Architecture for Higher Education</span>
          </div>

          <h1 id="hero-heading" className="landing-hero-title">
            Classrooms Designed for <span className="highlight-text">Working Memory</span>, Not Sensory Overload.
          </h1>

          <p className="landing-hero-subtitle">
            Bullseye replaces fragmented tabs, messy lecture notes, and anxiety-inducing deadlines with a distraction-free,
            single-focus academic workspace built specifically for ADHD and neurodivergent learners.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="landing-cta-group" data-tour="hero-cta">
            <Link
              to="/calendar/2026-11-21"
              className="landing-cta-btn primary-cta"
              title="Open the active 5-day rolling calendar"
            >
              <Calendar size={18} aria-hidden="true" />
              <span>Explore Live Calendar</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            <Link
              to="/calendar/2026-11-21/compsci/cs161-nov21"
              className="landing-cta-btn secondary-cta"
              title="Open the deep course page for COMPSCI 161"
            >
              <span className="cta-live-dot" aria-hidden="true" />
              <span>Start Learning (COMPSCI 161)</span>
            </Link>

            <button
              type="button"
              className="landing-cta-btn tertiary-cta"
              onClick={onStartTour}
              title="Launch the interactive section-highlighting tour"
            >
              <Compass size={17} aria-hidden="true" />
              <span>Take Guided Tour</span>
            </button>
          </div>

          {/* Key Value Proposition Badges */}
          <div className="hero-value-props-bar">
            <div className="prop-item">
              <CheckCircle2 size={16} className="prop-icon" aria-hidden="true" />
              <span>Zero Cognitive Overload</span>
            </div>
            <div className="prop-item">
              <CheckCircle2 size={16} className="prop-icon" aria-hidden="true" />
              <span>Atkinson Hyperlegible Typography</span>
            </div>
            <div className="prop-item">
              <CheckCircle2 size={16} className="prop-icon" aria-hidden="true" />
              <span>Dynamic 5-Day URL Sync</span>
            </div>
            <div className="prop-item">
              <CheckCircle2 size={16} className="prop-icon" aria-hidden="true" />
              <span>Socratic Anti-Offloading</span>
            </div>
          </div>
        </div>

        {/* Hero Visual / Interactive Preview Card */}
        <div className="landing-hero-visual" aria-label="Live Class Focus Preview">
          <div className="hero-preview-window">
            <div className="preview-window-header">
              <div className="window-dots" aria-hidden="true">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="preview-header-title">
                <span className="preview-status-pulse" />
                <span>COMPSCI 161 · Live Classroom Session</span>
              </div>
              <span className="preview-codec-chip">48kHz Audio Stream</span>
            </div>

            <div className="preview-window-body">
              <div className="preview-class-meta">
                <div>
                  <h3 className="preview-class-title">Design and Analysis of Algorithms</h3>
                  <p className="preview-class-sub">Prof. Michael Shindler · DBH 1100 · 3:30 PM</p>
                </div>
                <span className="preview-live-badge">
                  <span className="live-dot-glow" /> LIVE NOW
                </span>
              </div>

              {/* Triadic Horizon Preview */}
              <div className="preview-triad-card">
                <div className="triad-step-block">
                  <div className="triad-step-label">ACTIVE DIRECTIVE (STEP 2 OF 4)</div>
                  <div className="triad-step-heading">Relax All Edges |V| - 1 Times</div>
                  <p className="triad-step-desc">
                    For each vertex u and neighbor v, test if dist[u] + weight(u, v) &lt; dist[v]. Update parent pointers.
                  </p>
                </div>

                <div className="triad-constraint-block">
                  <div className="constraint-badge">CANVAS RUBRIC CONSTRAINT</div>
                  <p className="constraint-text">
                    Must verify negative cycle absence on iteration |V|. Submit pseudocode before 4:50 PM.
                  </p>
                </div>
              </div>

              <div className="preview-card-actions">
                <Link
                  to="/calendar/2026-11-21/compsci/cs161-nov21"
                  className="preview-btn-outline"
                >
                  <BookOpen size={15} aria-hidden="true" />
                  <span>View Full Course Syllabus</span>
                </Link>
                <Link
                  to="/focus"
                  className="preview-btn-solid"
                >
                  <span>Launch Zero-Scroll Focus</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Highlights Section */}
      <section className="landing-highlights-section" aria-labelledby="highlights-heading">
        <div className="section-header-centered">
          <span className="section-kicker">Engineered for Academic Success</span>
          <h2 id="highlights-heading" className="section-main-heading">
            Four Core Pillars of Bullseye Architecture
          </h2>
          <p className="section-sub-heading">
            Every screen is intentionally structured to preserve working-memory capacity, support step execution, and prevent cognitive derailment.
          </p>
        </div>

        <div className="highlights-grid">
          {/* Pillar 1: Live Synchronous Classes */}
          <div className="highlight-card">
            <div className="card-icon-bubble live-bubble">
              <Volume2 size={24} aria-hidden="true" />
            </div>
            <div className="card-tag">Pillar 1 · Synchronous Anchoring</div>
            <h3 className="card-title">Live Classes & Focus Mode</h3>
            <p className="card-text">
              Zero-scroll viewport fits all essential anchors without scrolling. Real-time audio transcription isolates the current instruction into a clear step, eliminating visual noise and lecture distractions.
            </p>
            <ul className="card-feature-list">
              <li>Triadic horizon: Context Anchor + Active Step + Rubric Constraints</li>
              <li>10-second &ldquo;Help Me Rejoin&rdquo; catch-up if you momentarily drift</li>
              <li>Integrated scratchpad for notes and quick step verification</li>
            </ul>
            <Link to="/focus" className="card-learn-more-link">
              <span>Try Live Focus Mode</span>
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>

          {/* Pillar 2: Interactive Dynamic Schedules */}
          <div className="highlight-card" data-tour="calendar-pillar">
            <div className="card-icon-bubble calendar-bubble">
              <Calendar size={24} aria-hidden="true" />
            </div>
            <div className="card-tag">Pillar 2 · Temporal Grounding</div>
            <h3 className="card-title">Dynamic 5-Day Date Strip</h3>
            <p className="card-text">
              Rolling 5-day horizon centered around today (Nov 21) showing past notes, the active live session, and upcoming deadlines. Smoothly synced with your URL for effortless bookmarking and sharing.
            </p>
            <ul className="card-feature-list">
              <li>Centers on current date (Nov 21) with &plusmn;2 days visibility</li>
              <li>Live session pulse indicator highlights active classes underway</li>
              <li>URL synchronization across all date transitions</li>
            </ul>
            <Link to="/calendar/2026-11-21" className="card-learn-more-link">
              <span>Open 5-Day Calendar</span>
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>

          {/* Pillar 3: Subject Filtering & Compsci Dropdown */}
          <div className="highlight-card">
            <div className="card-icon-bubble filter-bubble">
              <Layers size={24} aria-hidden="true" />
            </div>
            <div className="card-tag">Pillar 3 · Cognitive Narrowing</div>
            <h3 className="card-title">Subject Filtering & CS Dropdown</h3>
            <p className="card-text">
              Quickly filter down to your primary area of focus. The Computer Science dropdown in the header updates dynamically based on the selected date, allowing 1-click jumps between courses.
            </p>
            <ul className="card-feature-list">
              <li>Subject filter pills for Computer Science, Math, and Physics</li>
              <li>Header breadcrumb dropdown reflecting classes on the selected day</li>
              <li>Instantly isolate relevant problem sets and office hours</li>
            </ul>
            <Link to="/calendar/2026-11-21" className="card-learn-more-link">
              <span>Filter by Department</span>
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>

          {/* Pillar 4: Deep Course Detail Pages */}
          <div className="highlight-card">
            <div className="card-icon-bubble course-bubble">
              <BookOpen size={24} aria-hidden="true" />
            </div>
            <div className="card-tag">Pillar 4 · Deep Comprehension</div>
            <h3 className="card-title">Detailed Course & Syllabus Pages</h3>
            <p className="card-text">
              Comprehensive course views featuring instructor office hours, unit outlines, runnable syntax-highlighted code implementations, downloadable starter files, and live EdStem discussion threads.
            </p>
            <ul className="card-feature-list">
              <li>Instructor profiles with direct email, office location, and bio</li>
              <li>Verified Python/C++ code snippets with copy button</li>
              <li>EdStem discussion threads auto-tagged to lecture steps</li>
            </ul>
            <Link to="/calendar/2026-11-21/compsci/cs161-nov21" className="card-learn-more-link">
              <span>Explore COMPSCI 161 Course Page</span>
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Research & Co-Design Bar */}
      <section className="landing-codesign-section" aria-labelledby="codesign-heading">
        <div className="codesign-banner">
          <div className="codesign-badge">
            <ShieldCheck size={18} aria-hidden="true" />
            <span>Co-Designed with Neurodivergent Students</span>
          </div>
          <h2 id="codesign-heading" className="codesign-quote">
            &ldquo;Traditional LMS interfaces overload working memory with 20+ tabs, nested folders, and zero guidance. Bullseye gives me one stable place to look, so I never miss the lecture or the rubric.&rdquo;
          </h2>
          <div className="codesign-attribution">
            <span>Student Co-Designer · Donald Bren School of Information & Computer Sciences, UC Irvine</span>
          </div>

          <div className="integration-chips">
            <div className="integration-chip">
              <CanvasLogo size={16} />
              <span>Canvas LMS Grade & Rubric Sync</span>
            </div>
            <div className="integration-chip">
              <EdStemLogo size={16} />
              <span>EdStem Discussion Thread Sync</span>
            </div>
            <div className="integration-chip">
              <Sparkles size={16} />
              <span>Socratic Scaffolding (No Answer Leaks)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Launchpad Footer Strip */}
      <footer className="landing-footer-strip">
        <div className="footer-left">
          <span className="footer-brand">Bullseye</span>
          <span className="footer-desc">Classroom Accessibility Platform · Version 2.4</span>
        </div>
        <div className="footer-links">
          <Link to="/calendar/2026-11-21" className="footer-nav-link">5-Day Calendar</Link>
          <Link to="/calendar/2026-11-21/compsci/cs161-nov21" className="footer-nav-link">COMPSCI 161 Deep Page</Link>
          <Link to="/focus" className="footer-nav-link">Focus Mode</Link>
          <Link to="/socratic" className="footer-nav-link">Socratic Assistant</Link>
          <Link to="/teacher" className="footer-nav-link">Teacher Dashboard</Link>
        </div>
      </footer>
    </div>
  )
}
