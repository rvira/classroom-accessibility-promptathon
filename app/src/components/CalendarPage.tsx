import { useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Clock,
  MapPin,
  BookOpen,
  ChevronRight,
  Radio,
} from 'lucide-react'
import {
  DATE_STRIP_ITEMS,
  CURRENT_DATE_KEY,
  getClassesForDate,
  getCompsciClassesForDate,
} from '../data/scheduleData'
import type { SubjectCategory, ScheduledClass } from '../types'
import { Breadcrumbs } from './Breadcrumbs'
import { CanvasLogo } from './BrandLogos'

interface CalendarPageProps {
  initialSubjectFilter?: SubjectCategory
  onLaunchFocusMode?: (classInfo: ScheduledClass) => void
}

export function CalendarPage({
  initialSubjectFilter = 'all',
  onLaunchFocusMode,
}: CalendarPageProps) {
  const { date } = useParams<{ date?: string }>()
  const navigate = useNavigate()

  // Use URL date or fallback to CURRENT_DATE_KEY (2026-11-21)
  const activeDate = date && DATE_STRIP_ITEMS.some((d) => d.dateKey === date)
    ? date
    : CURRENT_DATE_KEY

  const [subjectFilter, setSubjectFilter] = useState<SubjectCategory>(initialSubjectFilter)

  // Retrieve classes for active date and subject filter
  const classesForDay = useMemo(() => {
    return getClassesForDate(activeDate, subjectFilter)
  }, [activeDate, subjectFilter])

  const compsciClasses = getCompsciClassesForDate(activeDate)

  const handleDateSelect = (selectedDateKey: string) => {
    navigate(`/calendar/${selectedDateKey}`)
  }

  return (
    <div className="calendar-page-container">
      {/* Page Breadcrumb Trail */}
      <Breadcrumbs variant="page" />

      {/* Streamlined Header */}
      <div className="calendar-header-banner">
        <h1 className="calendar-main-title">Schedule</h1>

        {/* Filter Pills */}
        <div className="subject-filter-buttons" role="group" aria-label="Filter courses by subject">
          <button
            type="button"
            className={`filter-pill-btn ${subjectFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSubjectFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${subjectFilter === 'compsci' ? 'active' : ''}`}
            onClick={() => setSubjectFilter('compsci')}
          >
            Computer Science ({compsciClasses.length})
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${subjectFilter === 'math' ? 'active' : ''}`}
            onClick={() => setSubjectFilter('math')}
          >
            Mathematics
          </button>
          <button
            type="button"
            className={`filter-pill-btn ${subjectFilter === 'physics' ? 'active' : ''}`}
            onClick={() => setSubjectFilter('physics')}
          >
            Physics
          </button>
        </div>
      </div>

      {/* Dynamic 5-Day Date Strip */}
      <section className="date-strip-section" aria-label="5-Day Date Strip" data-tour="date-strip">
        <div className="date-strip-grid" role="tablist" aria-label="Select Date">
          {DATE_STRIP_ITEMS.map((item) => {
            const isSelected = item.dateKey === activeDate
            const isToday = item.isCurrentDate

            return (
              <button
                key={item.dateKey}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`date-strip-card ${isSelected ? 'selected' : ''} ${isToday ? 'is-today' : ''}`}
                onClick={() => handleDateSelect(item.dateKey)}
              >
                <div className="strip-card-top">
                  <span className="strip-day-name">{item.displayDay}</span>
                  {isToday ? (
                    <span className="today-live-indicator">
                      <span className="pulse-circle" /> LIVE
                    </span>
                  ) : (
                    <span className="relative-offset-badge">{item.relativeLabel}</span>
                  )}
                </div>

                <div className="strip-card-date">
                  <span className="strip-date-text">{item.displayDate}</span>
                </div>

                <div className="strip-card-footer">
                  <span className="strip-class-count">
                    {item.classCount} {item.classCount === 1 ? 'class' : 'classes'}
                  </span>
                  <span className="strip-cs-badge">
                    {item.compsciCount} CS
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Classes Grid */}
      <section className="scheduled-classes-section" aria-label="Scheduled Classes List">
        {classesForDay.length === 0 ? (
          <div className="no-classes-card">
            <h3 className="no-classes-title">No classes scheduled</h3>
            <button
              type="button"
              className="reset-filter-btn"
              onClick={() => setSubjectFilter('all')}
            >
              Show All Subjects
            </button>
          </div>
        ) : (
          <div className="classes-grid">
            {classesForDay.map((item) => {
              const isPrimaryCard = item.code === 'COMPSCI 161' && item.isLive

              return (
                <div
                  key={item.id}
                  className={`class-card ${item.isLive ? 'class-card-live' : ''} ${
                    isPrimaryCard ? 'primary-tour-target' : ''
                  }`}
                  data-tour={isPrimaryCard ? 'class-card-primary' : undefined}
                >
                  {/* Card Header */}
                  <div className="class-card-header">
                    <div className="header-badge-group">
                      <span className={`subject-code-tag subject-${item.subject}`}>
                        {item.code}
                      </span>
                      {item.isLive && (
                        <span className="live-status-badge">
                          <span className="pulse-dot" aria-hidden="true" />
                          <span>LIVE</span>
                        </span>
                      )}
                    </div>

                    <div className="card-time-location">
                      <span className="time-badge">
                        <Clock size={13} aria-hidden="true" />
                        <span>{item.time}</span>
                      </span>
                      <span className="location-badge">
                        <MapPin size={13} aria-hidden="true" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="class-card-body">
                    <h3 className="class-card-title">{item.title}</h3>
                    <div className="class-card-topic">
                      <span className="topic-name">{item.topic}</span>
                    </div>

                    {/* Instructor */}
                    <div className="class-card-instructor">
                      <div className="instructor-avatar-pill">
                        {item.instructor.avatarInitials}
                      </div>
                      <div className="instructor-text">
                        <span className="instructor-name">{item.instructor.name}</span>
                        <span className="instructor-title">{item.instructor.title}</span>
                      </div>
                    </div>

                    {/* Canvas Status & Deadline */}
                    <div className="class-canvas-sync">
                      <CanvasLogo size={14} />
                      <span className="canvas-sync-text">{item.canvasSync}</span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="class-card-footer">
                    {item.subject === 'compsci' ? (
                      <Link
                        to={`/calendar/${activeDate}/compsci/${item.id}`}
                        className="card-action-btn view-details"
                      >
                        <BookOpen size={15} aria-hidden="true" />
                        <span>Details</span>
                        <ChevronRight size={14} aria-hidden="true" />
                      </Link>
                    ) : (
                      <Link
                        to="/focus"
                        className="card-action-btn view-details"
                        onClick={() => onLaunchFocusMode && onLaunchFocusMode(item)}
                      >
                        <BookOpen size={15} aria-hidden="true" />
                        <span>Details</span>
                        <ChevronRight size={14} aria-hidden="true" />
                      </Link>
                    )}

                    {item.isLive && (
                      <Link
                        to="/focus"
                        className="card-action-btn launch-focus"
                        onClick={() => onLaunchFocusMode && onLaunchFocusMode(item)}
                      >
                        <Radio size={14} aria-hidden="true" />
                        <span>Focus Mode</span>
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
