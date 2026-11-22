import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react'

export interface TourStepDefinition {
  id: string
  targetSelector: string
  targetPath?: string // Route to navigate to if user isn't on it
  title: string
  badge: string
  description: string
  tip?: string
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

export const PRODUCT_TOUR_STEPS: TourStepDefinition[] = [
  {
    id: 'step-hero',
    targetSelector: '[data-tour="hero-cta"]',
    targetPath: '/',
    title: '1. Instant Academic Launchpad',
    badge: 'Executive Function First',
    description:
      'Begin each lecture session with zero cognitive friction. The high-contrast CTA immediately channels your attention into the active live session or full weekly calendar.',
    tip: 'Direct access prevents working-memory depletion before learning starts.',
    placement: 'bottom',
  },
  {
    id: 'step-date-strip',
    targetSelector: '[data-tour="date-strip"]',
    targetPath: '/calendar/2026-11-21',
    title: '2. Dynamic 5-Day Rolling Strip',
    badge: 'Temporal Grounding',
    description:
      'A rolling 5-day view centered directly on today (Nov 21) with an active "Live / Ongoing" pulse indicator. Quickly inspect past notes or future deadlines without getting lost in monthly grids.',
    tip: 'Click any date to instantly refresh all lecture blocks and deadlines for that day.',
    placement: 'bottom',
  },
  {
    id: 'step-dropdown',
    targetSelector: '[data-tour="compsci-dropdown"]',
    title: '3. Fast Subject & Course Dropdown',
    badge: '1-Click Switching',
    description:
      'Seamlessly switch between Computer Science sessions for the selected date. The dropdown updates in real-time to match whichever day is active in your calendar.',
    tip: 'Notice the LIVE badge identifying lectures currently holding active class discussion.',
    placement: 'bottom',
  },
  {
    id: 'step-class-detail',
    targetSelector: '[data-tour="class-card-primary"]',
    targetPath: '/calendar/2026-11-21',
    title: '4. Deep Class Pages & Focus Mode',
    badge: 'No-Scroll Learning',
    description:
      'Each course features comprehensive syllabus notes, executable code snippets, downloadable worksheets, EdStem discussions, and a 1-click launch into the ADHD Zero-Scroll Focus Mode.',
    tip: 'Clicking any class card opens its deep syllabus, instructor office hours, and live stream links.',
    placement: 'top',
  },
]

interface ProductTourProps {
  isOpen: boolean
  onClose: () => void
}

export function ProductTour({ isOpen, onClose }: ProductTourProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const currentStep = PRODUCT_TOUR_STEPS[currentStepIndex]

  // Update target rect calculation
  const updateTargetRect = useCallback(() => {
    if (!isOpen || !currentStep) return

    const el = document.querySelector(currentStep.targetSelector)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
      const rect = el.getBoundingClientRect()
      setTargetRect(rect)
    } else {
      // Element not found on current page: if targetPath specified and different, navigate to it
      if (currentStep.targetPath && location.pathname !== currentStep.targetPath && !isNavigating) {
        setIsNavigating(true)
        navigate(currentStep.targetPath)
        setTimeout(() => {
          setIsNavigating(false)
          updateTargetRect()
        }, 350)
      } else {
        setTargetRect(null)
      }
    }
  }, [isOpen, currentStep, location.pathname, navigate, isNavigating])

  useEffect(() => {
    if (!isOpen) return
    updateTargetRect()

    const handleResize = () => updateTargetRect()
    const handleScroll = () => {
      const el = document.querySelector(currentStep.targetSelector)
      if (el) setTargetRect(el.getBoundingClientRect())
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })
    const interval = setInterval(updateTargetRect, 600)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [isOpen, currentStepIndex, updateTargetRect, currentStep])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentStepIndex])

  if (!isOpen) return null

  const handleNext = () => {
    if (currentStepIndex < PRODUCT_TOUR_STEPS.length - 1) {
      const nextStep = PRODUCT_TOUR_STEPS[currentStepIndex + 1]
      if (nextStep.targetPath && location.pathname !== nextStep.targetPath) {
        navigate(nextStep.targetPath)
      }
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      onClose()
    }
  }

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevStep = PRODUCT_TOUR_STEPS[currentStepIndex - 1]
      if (prevStep.targetPath && location.pathname !== prevStep.targetPath) {
        navigate(prevStep.targetPath)
      }
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  // Calculate tooltip placement styles
  const getTooltipStyle = () => {
    if (!targetRect) {
      // Fallback: center in viewport
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'fixed' as const,
      }
    }

    const padding = 16
    const tooltipWidth = 380
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let top = targetRect.bottom + padding
    let left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2

    // Flip to top if bottom overflows
    if (top + 260 > viewportHeight) {
      top = Math.max(16, targetRect.top - 260 - padding)
    }

    // Keep horizontally inside viewport
    if (left < 16) left = 16
    if (left + tooltipWidth > viewportWidth - 16) {
      left = viewportWidth - tooltipWidth - 16
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
      position: 'fixed' as const,
      width: `${tooltipWidth}px`,
    }
  }

  return (
    <div className="product-tour-overlay" role="dialog" aria-modal="true" aria-label="Interactive Product Tour">
      {/* Darkened Spotlight Mask */}
      {targetRect && (
        <svg className="tour-spotlight-svg" aria-hidden="true">
          <defs>
            <mask id="tour-spotlight-mask">
              {/* White background reveals the backdrop */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {/* Black cutout creates transparent hole for highlighted element */}
              <rect
                x={targetRect.left - 6}
                y={targetRect.top - 6}
                width={targetRect.width + 12}
                height={targetRect.height + 12}
                rx="10"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(15, 23, 42, 0.72)"
            mask="url(#tour-spotlight-mask)"
          />
        </svg>
      )}

      {/* Target Highlight Pulsing Ring */}
      {targetRect && (
        <div
          className="tour-target-highlight-ring"
          style={{
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
          aria-hidden="true"
        />
      )}

      {/* Floating Spotlight Card */}
      <div
        ref={tooltipRef}
        className="tour-tooltip-card"
        style={getTooltipStyle()}
      >
        <div className="tour-tooltip-header">
          <div className="tour-header-left">
            <span className="tour-step-badge">
              <Sparkles size={13} aria-hidden="true" />
              <span>{currentStep.badge}</span>
            </span>
            <span className="tour-step-count">
              {currentStepIndex + 1} of {PRODUCT_TOUR_STEPS.length}
            </span>
          </div>

          <button
            type="button"
            className="tour-skip-button"
            onClick={onClose}
            aria-label="Skip Product Tour"
            title="Skip Tour"
          >
            <span>Skip</span>
            <X size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="tour-tooltip-body">
          <h3 className="tour-step-title">{currentStep.title}</h3>
          <p className="tour-step-description">{currentStep.description}</p>
          {currentStep.tip && (
            <div className="tour-step-tip">
              <span className="tip-dot" />
              <span>{currentStep.tip}</span>
            </div>
          )}
        </div>

        <div className="tour-tooltip-footer">
          <div className="tour-progress-dots">
            {PRODUCT_TOUR_STEPS.map((_, idx) => (
              <span
                key={idx}
                className={`progress-dot ${idx === currentStepIndex ? 'active' : ''} ${
                  idx < currentStepIndex ? 'completed' : ''
                }`}
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="tour-action-buttons">
            <button
              type="button"
              className="tour-btn tour-btn-secondary"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              aria-label="Go to Previous Tour Step"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              <span>Back</span>
            </button>

            <button
              type="button"
              className="tour-btn tour-btn-primary"
              onClick={handleNext}
              aria-label={
                currentStepIndex === PRODUCT_TOUR_STEPS.length - 1
                  ? 'Finish Tour'
                  : 'Go to Next Tour Step'
              }
            >
              <span>
                {currentStepIndex === PRODUCT_TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next'}
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
