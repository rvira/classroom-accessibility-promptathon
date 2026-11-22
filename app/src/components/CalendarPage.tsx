import { useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  Filter,
  ChevronRight,
  Radio,
} from 'lucide-react'
import {
  DATE_STRIP_ITEMS,
  CURRENT_DATE_KEY,
  getClassesForDate,
  getDateStripItem,
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

  const dateStripInfo = getDateStripItem(activeDate)
  const compsciClasses = getCompsciClassesForDate(activeDate)

  const handleDateSelect = (selectedDateKey: string) => {
    navigate(`/calendar/${selectedDateKey}`)
  }

  return (
    <div className="calendar-page-container">
      {/* Page Breadcrumb Trail */}
      <Breadcrumbs variant="page" />

      {/* Calendar Header with Title & Quick Info */}
      <div className="calendar-header-banner">
        <div className="calendar-header-left">
          <div className="calendar-page-badge">
            <Calendar size={15} aria-hidden="true" />
            <span>Academic Schedule & Horizon</span>
          </div>
          <h1 className="calendar-main-title">Class Schedules & Course Timeline</h1>
          <p className="calendar-main-subtitle">
            Dynamic 5-day rolling view centered on your ongoing live session. Select any day to inspect lecture outlines,
            submission deadlines, and instructor office hours.
          </p>
        </div>

        {/* Live Session Alert Banner if on Nov 21 */}
        {dateStripInfo?.isCurrentDate && (
          <div className="calendar-live-announcement-card">
            <div className="live-announcement-header">
              <span className="live-pulse-dot" aria-hidden="true" />
              <span className="live-announcement-tag">LIVE SESSION ACTIVE TODAY</span>
            </div>
            <h4 className="live-announcement-title">COMPSCI 161: Design and Analysis of Algorithms</h4>
            <p className="live-announcement-details">
              Prof. Michael Shindler · DBH 1100 · 3:30 PM &ndash; 4:50 PM
            </p>
            <div className="live-announcement-actions">
              <Link
                to={`/calendar/${CURRENT_DATE_KEY}/compsci/cs161-nov21`}
                className="live-announcement-btn primary"
              >
                <span>Course Details</span>
                <ChevronRight size={14} aria-hidden="true" />
              </Link>
              <Link to="/focus" className="live-announcement-btn secondary">
                <Radio size={14} aria-hidden="true" />
                <span>Join Focus Mode</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic 5-Day Date Strip */}
      <section className="date-strip-section" aria-label="5-Day Date Strip" data-tour="date-strip">
        <div className="date-strip-header">
          <span className="date-strip-title">5-Day Rolling Horizon</span>
          <span className="date-strip-hint">
            Active center: <strong>Nov 21 (Today)</strong> · Click any day to switch date view
          </span>
        </div>

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
                {/* Top Badge */}
                <div className="strip-card-top">
                  <span className="strip-day-name">{item.displayDay}</span>
                  {isToday ? (
                    <span className="today-live-indicator" title="Active Ongoing Lecture Day">
                      <span className="pulse-circle" /> LIVE / ONGOING
                    </span>
                  ) : (
                    <span className="relative-offset-badge">{item.relativeLabel}</span>
                  )}
                </div>

                {/* Main Date Number */}
                <div className="strip-card-date">
                  <span className="strip-date-text">{item.displayDate}</span>
                </div>

                {/* Class Counts */}
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

      {/* Filter and Subject Toolbar */}
      <section className="calendar-toolbar-section">
        <div className="toolbar-left">
          <div className="filter-label">
            <Filter size={15} aria-hidden="true" />
            <span>Filter Subject:</span>
          </div>

          <div className="subject-filter-buttons" role="group" aria-label="Subject Filter">
            <button
              type="button"
              className={`filter-pill-btn ${subjectFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSubjectFilter('all')}
            >
              All Subjects
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

        {/* Selected Date Summary */}
        <div className="toolbar-right">
          <span className="selected-date-text">
            Viewing: <strong>{dateStripInfo ? dateStripInfo.fullLabel : activeDate}</strong>
          </span>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="scheduled-classes-section" aria-label="Scheduled Classes List">
        {classesForDay.length === 0 ? (
          <div className="no-classes-card">
            <Calendar size={36} className="no-classes-icon" aria-hidden="true" />
            <h3 className="no-classes-title">No classes scheduled for this subject on this date</h3>
            <p className="no-classes-desc">
              Try switching to &ldquo;All Subjects&rdquo; or selecting another day from the 5-day strip above.
            </p>
            <button
              type="button"
              className="reset-filter-btn"
              onClick={() => setSubjectFilter('all')}
            >
              Reset Subject Filter
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
                          <span>LIVE NOW</span>
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
                      <span className="topic-kicker">Topic:</span>
                      <span className="topic-name">{item.topic}</span>
                    </div>

                    {/* Instructor Info */}
                    <div className="class-card-instructor">
                      <div className="instructor-avatar-pill">
                        {item.instructor.avatarInitials}
                      </div>
                      <div className="instructor-text">
                        <span className="instructor-name">{item.instructor.name}</span>
                        <span className="instructor-title">{item.instructor.title}</span>
                      </div>
                    </div>

                    {/* Unit Summary */}
                    <p className="class-card-summary">{item.outline.summary}</p>

                    {/* Canvas Status Chip */}
                    <div className="class-canvas-sync">
                      <CanvasLogo size={14} />
                      <span className="canvas-sync-text">{item.canvasSync}</span>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="class-card-footer">
                    {/* Deep link into course page */}
                    {item.subject === 'compsci' ? (
                      <Link
                        to={`/calendar/${activeDate}/compsci/${item.id}`}
                        className="card-action-btn view-details"
                      >
                        <BookOpen size={15} aria-hidden="true" />
                        <span>Course Details & Notes</span>
                        <ChevronRight size={14} aria-hidden="true" />
                      </Link>
                    ) : (
                      <Link
                        to="/focus"
                        className="card-action-btn view-details"
                        onClick={() => onLaunchFocusMode && onLaunchFocusMode(item)}
                      >
                        <BookOpen size={15} aria-hidden="true" />
                        <span>View Lecture Outline</span>
                        <ChevronRight size={14} aria-hidden="true" />
                      </Link>
                    )}

                    {/* Quick Focus Button if Live */}
                    {item.isLive && (
                      <Link
                        to="/focus"
                        className="card-action-btn launch-focus"
                        onClick={() => onLaunchFocusMode && onLaunchFocusMode(item)}
                      >
                        <Radio size={14} aria-hidden="true" />
                        <span>Open Focus Mode</span>
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
