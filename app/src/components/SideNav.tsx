import { useEffect, useRef } from 'react'
import {
  BookOpen,
  Calendar,
  Compass,
  ListOrdered,
  RotateCcw,
  Target,
  X,
} from 'lucide-react'
import { CanvasLogo, EdStemLogo } from './BrandLogos'
import { type Translations } from '../i18n'

export type ViewMode = 'now' | 'overview' | 'rejoin' | 'edstem' | 'source' | 'calendar'

interface SideNavProps {
  isOpen: boolean
  onClose: () => void
  activeView: ViewMode
  onSelectView: (view: ViewMode) => void
  onOpenTour: () => void
  edstemCount: number
  t: Translations
}

export function SideNav({
  isOpen,
  onClose,
  activeView,
  onSelectView,
  onOpenTour,
  edstemCount,
  t,
}: SideNavProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  // Focus management and keyboard accessibility
  useEffect(() => {
    if (!isOpen) return

    // Focus close button on open
    setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 50)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }

      // Simple focus trap inside the drawer
      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last?.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first?.focus()
          }
        }
      }
    }

    // Lock body scrolling when drawer is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleNavClick = (view: ViewMode) => {
    onSelectView(view)
    onClose()
  }

  const handleTourClick = () => {
    onOpenTour()
    onClose()
  }

  return (
    <div
      className="sidenav-overlay"
      onClick={onClose}
      aria-hidden={!isOpen}
      role="presentation"
    >
      <div
        ref={drawerRef}
        className="sidenav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t.navigation}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="sidenav-header">
          <div className="sidenav-brand">
            <div className="sidenav-brand-icon-wrap" aria-hidden="true">
              <Target size={22} strokeWidth={2.8} />
            </div>
            <div>
              <span className="sidenav-title">{t.appName}</span>
              <span className="sidenav-status-badge">
                <span className="status-dot" aria-hidden="true" />
                {t.activeStatus}
              </span>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="sidenav-close-btn"
            onClick={onClose}
            aria-label={t.closeMenu}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Primary Navigation Links */}
        <nav className="sidenav-nav-list" aria-label={t.navigation}>
          {/* Calendar & Live Class - Highlighted entry point */}
          <button
            type="button"
            className={`sidenav-item highlight ${activeView === 'calendar' ? 'active' : ''}`}
            onClick={() => handleNavClick('calendar')}
          >
            <div className="sidenav-item-icon">
              <Calendar size={18} aria-hidden="true" />
            </div>
            <div className="sidenav-item-text">
              <span className="item-title">{t.navCalendar}</span>
              <span className="item-badge live">{t.liveNowBadge}</span>
            </div>
          </button>

          {/* Now Focus */}
          <button
            type="button"
            className={`sidenav-item ${activeView === 'now' ? 'active' : ''}`}
            onClick={() => handleNavClick('now')}
          >
            <div className="sidenav-item-icon">
              <Target size={18} aria-hidden="true" />
            </div>
            <div className="sidenav-item-text">
              <span className="item-title">{t.navNowFocus}</span>
              <span className="item-sub">Triadic Horizon</span>
            </div>
          </button>

          {/* All Steps Overview */}
          <button
            type="button"
            className={`sidenav-item ${activeView === 'overview' ? 'active' : ''}`}
            onClick={() => handleNavClick('overview')}
          >
            <div className="sidenav-item-icon">
              <ListOrdered size={18} aria-hidden="true" />
            </div>
            <div className="sidenav-item-text">
              <span className="item-title">{t.navAllSteps}</span>
              <span className="item-sub">Activity Timeline</span>
            </div>
          </button>

          {/* EdStem Q&A */}
          <button
            type="button"
            className={`sidenav-item ${activeView === 'edstem' ? 'active' : ''}`}
            onClick={() => handleNavClick('edstem')}
          >
            <div className="sidenav-item-icon edstem-color">
              <EdStemLogo size={18} />
            </div>
            <div className="sidenav-item-text">
              <span className="item-title">{t.navEdStem}</span>
              <span className="item-count-chip">{edstemCount}</span>
            </div>
          </button>

          {/* Canvas LMS Hub */}
          <button
            type="button"
            className="sidenav-item"
            onClick={() => {
              // Directs to overview which shows full Canvas-synced steps & rubric
              handleNavClick('overview')
            }}
          >
            <div className="sidenav-item-icon canvas-color">
              <CanvasLogo size={18} />
            </div>
            <div className="sidenav-item-text">
              <span className="item-title">{t.navCanvas}</span>
              <span className="item-badge canvas">Connected</span>
            </div>
          </button>

          {/* Original Source */}
          <button
            type="button"
            className={`sidenav-item ${activeView === 'source' ? 'active' : ''}`}
            onClick={() => handleNavClick('source')}
          >
            <div className="sidenav-item-icon">
              <BookOpen size={18} aria-hidden="true" />
            </div>
            <div className="sidenav-item-text">
              <span className="item-title">{t.navSource}</span>
              <span className="item-sub">Verbatim Board Notes</span>
            </div>
          </button>

          {/* Safe Rejoin Flow */}
          <button
            type="button"
            className={`sidenav-item ${activeView === 'rejoin' ? 'active' : ''}`}
            onClick={() => handleNavClick('rejoin')}
          >
            <div className="sidenav-item-icon accent-rejoin">
              <RotateCcw size={18} aria-hidden="true" />
            </div>
            <div className="sidenav-item-text">
              <span className="item-title">{t.navRejoin}</span>
              <span className="item-sub">10s Zero-Anxiety Catch Up</span>
            </div>
          </button>

          {/* Welcome Tour */}
          <button
            type="button"
            className="sidenav-item tour-link"
            onClick={handleTourClick}
          >
            <div className="sidenav-item-icon">
              <Compass size={18} aria-hidden="true" />
            </div>
            <div className="sidenav-item-text">
              <span className="item-title">{t.welcomeTour}</span>
              <span className="item-sub">Interface Guide</span>
            </div>
          </button>
        </nav>
      </div>
    </div>
  )
}
