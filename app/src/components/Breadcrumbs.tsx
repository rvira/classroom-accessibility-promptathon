import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { ChevronDown, ChevronRight, Home, Calendar, BookOpen } from 'lucide-react'
import { getCompsciClassesForDate, getDateStripItem, CURRENT_DATE_KEY } from '../data/scheduleData'

interface BreadcrumbsProps {
  className?: string
  variant?: 'header' | 'page'
}

export function Breadcrumbs({ className = '', variant = 'header' }: BreadcrumbsProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ date?: string; classId?: string }>()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const activeDate = params.date || CURRENT_DATE_KEY
  const compsciClasses = getCompsciClassesForDate(activeDate)
  const activeClassId = params.classId || (compsciClasses[0]?.id ?? 'cs161-nov21')
  const currentClass = compsciClasses.find((c) => c.id === activeClassId) || compsciClasses[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && dropdownOpen) {
        setDropdownOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dropdownOpen])

  const dateStripInfo = getDateStripItem(activeDate)

  // Header compact variant matching user reference image: Bullseye / COMPSCI 161 ▼ ·
  if (variant === 'header') {
    return (
      <nav aria-label="Course and Session Breadcrumb" className={`header-breadcrumbs ${className}`} data-tour="compsci-dropdown">
        <span className="breadcrumb-separator" aria-hidden="true">/</span>

        {/* Dropdown for Computer Science courses on current date */}
        <div className="breadcrumb-dropdown-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className="breadcrumb-dropdown-trigger"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            aria-label={`Select Course: Current is ${currentClass ? currentClass.code : 'COMPSCI 161'}`}
          >
            <span className="breadcrumb-course-code">
              {currentClass ? currentClass.code : 'COMPSCI 161'}
            </span>
            <ChevronDown size={15} className={`dropdown-chevron ${dropdownOpen ? 'rotated' : ''}`} aria-hidden="true" />
          </button>

          {dropdownOpen && (
            <div className="breadcrumb-dropdown-menu" role="listbox" aria-label="Available Courses">
              <div className="dropdown-menu-header">
                <span className="dropdown-menu-title">
                  Computer Science · {dateStripInfo ? dateStripInfo.displayDate : 'Nov 21'}
                </span>
                <span className="dropdown-menu-subtitle">
                  {compsciClasses.length} classes
                </span>
              </div>

              <div className="dropdown-items-list">
                {compsciClasses.map((item) => {
                  const isSelected = item.id === activeClassId
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`dropdown-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setDropdownOpen(false)
                        navigate(`/calendar/${activeDate}/compsci/${item.id}`)
                      }}
                    >
                      <div className="dropdown-item-top">
                        <span className="dropdown-item-code">{item.code}</span>
                        {item.isLive && (
                          <span className="live-indicator-chip">
                            <span className="live-pulse-dot" /> LIVE
                          </span>
                        )}
                        <span className="dropdown-item-time">{item.time.split('–')[0].trim()}</span>
                      </div>
                      <div className="dropdown-item-topic">{item.topic}</div>
                      <div className="dropdown-item-instructor">{item.instructor.name} · {item.location}</div>
                    </button>
                  )
                })}
              </div>

              <div className="dropdown-menu-footer">
                <Link
                  to={`/calendar/${activeDate}`}
                  className="dropdown-footer-link"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Calendar size={13} aria-hidden="true" />
                  <span>All Schedules</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Optional trailing topic / live dot */}
        {currentClass && (
          <div className="breadcrumb-topic-preview" title={currentClass.topic}>
            <span className="topic-bullet" aria-hidden="true">·</span>
            <span className="topic-text">{currentClass.topic}</span>
            {currentClass.isLive && (
              <span className="topic-live-badge">
                <span className="live-pulse-dot" aria-hidden="true" /> LIVE
              </span>
            )}
          </div>
        )}
      </nav>
    )
  }

  // Page full breadcrumbs variant: Home / Calendar / Nov 21, 2026 / Computer Science / COMPSCI 161
  const pathParts = location.pathname.split('/').filter(Boolean)
  const isCalendar = pathParts[0] === 'calendar'

  return (
    <nav aria-label="Page Breadcrumb Navigation" className={`page-breadcrumbs-trail ${className}`}>
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link home-link" title="Return to Homepage">
            <Home size={14} aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>

        {isCalendar && (
          <>
            <li className="breadcrumb-separator" aria-hidden="true">
              <ChevronRight size={14} />
            </li>
            <li className="breadcrumb-item">
              <Link to="/calendar" className="breadcrumb-link">
                <Calendar size={14} aria-hidden="true" />
                <span>Calendar</span>
              </Link>
            </li>

            {params.date && (
              <>
                <li className="breadcrumb-separator" aria-hidden="true">
                  <ChevronRight size={14} />
                </li>
                <li className="breadcrumb-item">
                  <Link to={`/calendar/${params.date}`} className="breadcrumb-link">
                    <span>{dateStripInfo ? dateStripInfo.displayDate : params.date}</span>
                    {dateStripInfo?.isCurrentDate && (
                      <span className="breadcrumb-today-pill">Today</span>
                    )}
                  </Link>
                </li>
              </>
            )}

            {pathParts.includes('compsci') && (
              <>
                <li className="breadcrumb-separator" aria-hidden="true">
                  <ChevronRight size={14} />
                </li>
                <li className="breadcrumb-item">
                  <span className="breadcrumb-static-part">Computer Science</span>
                </li>
              </>
            )}

            {currentClass && params.classId && (
              <>
                <li className="breadcrumb-separator" aria-hidden="true">
                  <ChevronRight size={14} />
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <span className="breadcrumb-active-title">
                    <BookOpen size={14} aria-hidden="true" />
                    <span>{currentClass.code}: {currentClass.title.split('·')[0].trim()}</span>
                  </span>
                </li>
              </>
            )}
          </>
        )}
      </ol>
    </nav>
  )
}
