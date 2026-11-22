import { Link } from 'react-router-dom'
import {
  Calendar,
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  Volume2,
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
            <span className="pill-text">WCAG 2.2 AA · Cognitive Accessibility</span>
          </div>

          <h1 id="hero-heading" className="landing-hero-title">
            Classrooms Built for <span className="highlight-text">Working Memory</span>.
          </h1>

          <p className="landing-hero-subtitle">
            A distraction-free, single-focus academic workspace built for ADHD and neurodivergent learners.
          </p>

          {/* Action CTAs */}
          <div className="landing-cta-group" data-tour="hero-cta">
            <Link
              to="/calendar/2026-11-21"
              className="landing-cta-btn primary-cta"
            >
              <Calendar size={17} aria-hidden="true" />
              <span>Calendar</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <Link
              to="/calendar/2026-11-21/compsci/cs161-nov21"
              className="landing-cta-btn secondary-cta"
            >
              <span className="cta-live-dot" aria-hidden="true" />
              <span>Live Class (COMPSCI 161)</span>
            </Link>

            <button
              type="button"
              className="landing-cta-btn tertiary-cta"
              onClick={onStartTour}
            >
              <Compass size={16} aria-hidden="true" />
              <span>Tour</span>
            </button>
          </div>

          {/* Value Props Bar */}
          <div className="hero-value-props-bar">
            <div className="prop-item">
              <span className="prop-dot" />
              <span>Zero-Scroll Viewport</span>
            </div>
            <div className="prop-item">
              <span className="prop-dot" />
              <span>Dynamic 5-Day Strip</span>
            </div>
            <div className="prop-item">
              <span className="prop-dot" />
              <span>Canvas &amp; EdStem Sync</span>
            </div>
            <div className="prop-item">
              <span className="prop-dot" />
              <span>Socratic Scaffolding</span>
            </div>
          </div>
        </div>

        {/* Live Class Preview Card */}
        <div className="landing-hero-visual" aria-label="Live Class Preview">
          <div className="hero-preview-window">
            <div className="preview-window-body">
              <div className="preview-class-meta">
                <div>
                  <h3 className="preview-class-title">COMPSCI 161: Design and Analysis of Algorithms</h3>
                  <p className="preview-class-sub">Prof. Michael Shindler · DBH 1100 · 3:30 PM</p>
                </div>
                <span className="preview-live-badge">
                  <span className="live-dot-glow" /> LIVE
                </span>
              </div>

              {/* Triadic Horizon Preview */}
              <div className="preview-triad-card">
                <div className="triad-step-block">
                  <div className="triad-step-label">ACTIVE STEP (2 OF 4)</div>
                  <div className="triad-step-heading">Relax All Edges |V| - 1 Times</div>
                  <p className="triad-step-desc">
                    For each vertex u and neighbor v, test if dist[u] + weight(u, v) &lt; dist[v].
                  </p>
                </div>

                <div className="triad-constraint-block">
                  <div className="constraint-badge">CANVAS RUBRIC CONSTRAINT</div>
                  <p className="constraint-text">
                    Verify negative cycle absence on iteration |V|. Due 4:50 PM.
                  </p>
                </div>
              </div>

              <div className="preview-card-actions">
                <Link
                  to="/calendar/2026-11-21/compsci/cs161-nov21"
                  className="preview-btn-outline"
                >
                  <BookOpen size={14} aria-hidden="true" />
                  <span>Course Details</span>
                </Link>
                <Link
                  to="/focus"
                  className="preview-btn-solid"
                >
                  <span>Focus Mode</span>
                  <ChevronRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Highlights */}
      <section className="landing-highlights-section" aria-labelledby="highlights-heading">
        <div className="section-header-left">
          <h2 id="highlights-heading" className="section-main-heading">
            Core Features
          </h2>
        </div>

        <div className="highlights-grid">
          {/* Card 1: Focus Mode */}
          <div className="highlight-card">
            <div className="card-icon-bubble live-bubble">
              <Volume2 size={22} aria-hidden="true" />
            </div>
            <h3 className="card-title">Live Focus Mode</h3>
            <p className="card-text">
              Zero-scroll view with real-time transcription, step progress, and 10-second catch-up.
            </p>
            <Link to="/focus" className="card-learn-more-link">
              <span>Open Focus Mode</span>
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Card 2: 5-Day Calendar */}
          <div className="highlight-card" data-tour="calendar-pillar">
            <div className="card-icon-bubble calendar-bubble">
              <Calendar size={22} aria-hidden="true" />
            </div>
            <h3 className="card-title">5-Day Calendar</h3>
            <p className="card-text">
              Rolling 5-day horizon centered on today with live indicators and deadline tracking.
            </p>
            <Link to="/calendar/2026-11-21" className="card-learn-more-link">
              <span>Open Calendar</span>
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Card 3: Subject Filtering */}
          <div className="highlight-card">
            <div className="card-icon-bubble filter-bubble">
              <Layers size={22} aria-hidden="true" />
            </div>
            <h3 className="card-title">Subject Filtering</h3>
            <p className="card-text">
              1-click filtering across Computer Science, Mathematics, and Physics.
            </p>
            <Link to="/calendar/2026-11-21" className="card-learn-more-link">
              <span>Filter Courses</span>
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Card 4: Detailed Course Pages */}
          <div className="highlight-card">
            <div className="card-icon-bubble course-bubble">
              <BookOpen size={22} aria-hidden="true" />
            </div>
            <h3 className="card-title">Course Pages</h3>
            <p className="card-text">
              Outlines, executable code implementations, downloads, and EdStem discussions.
            </p>
            <Link to="/calendar/2026-11-21/compsci/cs161-nov21" className="card-learn-more-link">
              <span>Course Details</span>
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Co-Design Quote */}
      <section className="landing-codesign-section" aria-label="Student Quote">
        <div className="codesign-banner">
          <blockquote className="codesign-quote">
            &ldquo;Traditional LMS interfaces overload working memory with 20+ tabs and nested folders. Bullseye gives me one stable place to look.&rdquo;
          </blockquote>
          <div className="codesign-attribution">
            <span>Student Co-Designer · UC Irvine</span>
          </div>

          <div className="integration-chips">
            <div className="integration-chip">
              <CanvasLogo size={15} />
              <span>Canvas LMS</span>
            </div>
            <div className="integration-chip">
              <EdStemLogo size={15} />
              <span>EdStem</span>
            </div>
            <div className="integration-chip">
              <Sparkles size={15} />
              <span>Socratic Scaffolding</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer-strip">
        <div className="footer-left">
          <span className="footer-brand">Bullseye</span>
        </div>
        <div className="footer-links">
          <Link to="/calendar/2026-11-21" className="footer-nav-link">Calendar</Link>
          <Link to="/focus" className="footer-nav-link">Focus Mode</Link>
          <Link to="/socratic" className="footer-nav-link">Socratic Guide</Link>
          <Link to="/teacher" className="footer-nav-link">Teacher View</Link>
        </div>
      </footer>
    </div>
  )
}
