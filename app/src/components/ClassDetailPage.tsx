import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Calendar,
  Clock,
  MapPin,
  Mail,
  Building,
  User,
  Radio,
  Video,
  Download,
  Copy,
  Check,
  MessageSquare,
  ThumbsUp,
  FileCode,
  FileText,
  AlertCircle,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  BookOpen,
  Send,
  CheckCircle2,
} from 'lucide-react'
import { getClassById, CURRENT_DATE_KEY, getDateStripItem } from '../data/scheduleData'
import type { ScheduledClass, DiscussionThread } from '../types'
import { Breadcrumbs } from './Breadcrumbs'
import { CanvasLogo, EdStemLogo } from './BrandLogos'

interface ClassDetailPageProps {
  onLaunchFocusMode?: (classInfo: ScheduledClass) => void
}

type DetailTab = 'outline' | 'instructor' | 'notes' | 'downloads' | 'discussion'

export function ClassDetailPage({ onLaunchFocusMode }: ClassDetailPageProps) {
  const { date, classId } = useParams<{ date?: string; classId?: string }>()

  const activeDate = date || CURRENT_DATE_KEY
  const activeClassId = classId || 'cs161-nov21'

  const classData = getClassById(activeClassId, activeDate)
  const dateStripInfo = getDateStripItem(activeDate)

  const [activeTab, setActiveTab] = useState<DetailTab>('outline')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // Interactive Discussion Thread State
  const [threads, setThreads] = useState<DiscussionThread[]>(() => {
    return classData?.discussionThreads || []
  })
  const [newQuestionText, setNewQuestionText] = useState('')
  const [newQuestionStep, setNewQuestionStep] = useState('Step 2: Core Algorithm')
  const [userUpvoted, setUserUpvoted] = useState<Record<string, boolean>>({})

  if (!classData) {
    return (
      <div className="class-detail-not-found">
        <AlertCircle size={40} className="not-found-icon" />
        <h2>Class Session Not Found</h2>
        <p>The requested course session could not be located for {activeDate}.</p>
        <Link to={`/calendar/${activeDate}`} className="back-to-calendar-btn">
          <ChevronLeft size={16} />
          <span>Return to Calendar</span>
        </Link>
      </div>
    )
  }

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleUpvote = (threadId: string) => {
    setUserUpvoted((prev) => {
      const alreadyUpvoted = prev[threadId]
      const nextState = { ...prev, [threadId]: !alreadyUpvoted }

      setThreads((prevThreads) =>
        prevThreads.map((th) => {
          if (th.id === threadId) {
            return {
              ...th,
              upvotes: alreadyUpvoted ? th.upvotes - 1 : th.upvotes + 1,
            }
          }
          return th
        })
      )
      return nextState
    })
  }

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQuestionText.trim()) return

    const newThread: DiscussionThread = {
      id: `user-${Date.now()}`,
      author: 'You (Student)',
      role: 'Student',
      timeAgo: 'Just now',
      title: newQuestionText.slice(0, 45) + (newQuestionText.length > 45 ? '...' : ''),
      question: newQuestionText,
      stepTag: newQuestionStep,
      upvotes: 1,
    }

    setThreads([newThread, ...threads])
    setNewQuestionText('')
  }

  // Simulated clean download handler
  const handleDownloadFile = (filename: string, contentDescription: string) => {
    const sampleContent = `# ${filename}\n# Bullseye Academic Resource\n# Course: ${classData.code} - ${classData.title}\n# Instructor: ${classData.instructor.name}\n\n${contentDescription}\n\nGenerated for academic session on ${activeDate}.`
    const blob = new Blob([sampleContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="class-detail-page-container">
      {/* Top Breadcrumb Trail */}
      <Breadcrumbs variant="page" />

      {/* Hero Course Banner */}
      <header className="class-detail-hero">
        <div className="hero-top-row">
          <div className="course-badge-row">
            <span className={`course-code-pill subject-${classData.subject}`}>
              {classData.code}
            </span>
            {classData.isLive && (
              <span className="course-live-pill">
                <span className="live-dot-pulse" aria-hidden="true" />
                <span>LIVE SESSION UNDERWAY</span>
              </span>
            )}
            <span className="course-date-pill">
              <Calendar size={13} aria-hidden="true" />
              <span>{dateStripInfo ? dateStripInfo.fullLabel : activeDate}</span>
            </span>
          </div>

          <div className="hero-meta-items">
            <span className="meta-item">
              <Clock size={14} aria-hidden="true" />
              <span>{classData.time}</span>
            </span>
            <span className="meta-item">
              <MapPin size={14} aria-hidden="true" />
              <span>{classData.location}</span>
            </span>
          </div>
        </div>

        <h1 className="course-title-main">{classData.title}</h1>
        <div className="course-topic-highlight">
          <span className="topic-prefix">Current Topic:</span>
          <span className="topic-title">{classData.topic}</span>
        </div>

        {/* Action Buttons Row */}
        <div className="hero-actions-bar">
          <Link
            to="/focus"
            className="hero-action-btn primary"
            onClick={() => onLaunchFocusMode && onLaunchFocusMode(classData)}
            title="Launch the distraction-free single-step focus mode"
          >
            <Radio size={16} aria-hidden="true" />
            <span>Launch Bullseye Focus Mode</span>
            <Sparkles size={15} aria-hidden="true" />
          </Link>

          <a
            href={classData.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-action-btn secondary"
            title="Join the live video stream"
          >
            <Video size={16} aria-hidden="true" />
            <span>{classData.isLive ? 'Join Live Stream' : 'Class Zoom Link'}</span>
            <ExternalLink size={13} aria-hidden="true" />
          </a>

          {classData.recordingUrl && (
            <a
              href={classData.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-action-btn tertiary"
              title="Watch lecture recording"
            >
              <FileText size={16} aria-hidden="true" />
              <span>Panopto Recording</span>
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="detail-tabs-bar" role="tablist" aria-label="Course Sections">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'outline'}
          className={`detail-tab-btn ${activeTab === 'outline' ? 'active' : ''}`}
          onClick={() => setActiveTab('outline')}
        >
          <BookOpen size={16} aria-hidden="true" />
          <span>Topic Outline</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'instructor'}
          className={`detail-tab-btn ${activeTab === 'instructor' ? 'active' : ''}`}
          onClick={() => setActiveTab('instructor')}
        >
          <User size={16} aria-hidden="true" />
          <span>Instructor & Office Hours</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'notes'}
          className={`detail-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          <FileCode size={16} aria-hidden="true" />
          <span>Syllabus Notes & Code</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'downloads'}
          className={`detail-tab-btn ${activeTab === 'downloads' ? 'active' : ''}`}
          onClick={() => setActiveTab('downloads')}
        >
          <Download size={16} aria-hidden="true" />
          <span>Downloads ({classData.downloads.length})</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'discussion'}
          className={`detail-tab-btn ${activeTab === 'discussion' ? 'active' : ''}`}
          onClick={() => setActiveTab('discussion')}
        >
          <MessageSquare size={16} aria-hidden="true" />
          <span>Q&A Discussion ({threads.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      <main className="detail-tab-content">
        {/* TAB 1: OUTLINE */}
        {activeTab === 'outline' && (
          <section className="tab-pane outline-pane" aria-labelledby="outline-heading">
            <div className="pane-card">
              <h2 id="outline-heading" className="pane-section-title">Lecture Outline & Learning Goals</h2>
              <p className="unit-summary-text">{classData.outline.summary}</p>

              <h3 className="sub-heading">Key Algorithmic Concepts</h3>
              <ul className="key-concepts-grid">
                {classData.outline.keyConcepts.map((concept, idx) => (
                  <li key={idx} className="concept-item">
                    <CheckCircle2 size={16} className="concept-check" aria-hidden="true" />
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>

              {/* Rubric Constraint Box */}
              <div className="rubric-constraint-callout">
                <div className="rubric-header">
                  <CanvasLogo size={16} />
                  <span className="rubric-badge-title">CANVAS RUBRIC CONSTRAINT</span>
                </div>
                <p className="rubric-text">{classData.outline.rubricConstraint}</p>
                <div className="rubric-note">
                  Penalty protection active: Bullseye surfaces this constraint so no grading conditions are missed.
                </div>
              </div>

              {/* Assignments & Readings */}
              <div className="meta-grid-2col">
                <div className="meta-grid-box">
                  <span className="box-label">Required Reading:</span>
                  <span className="box-value">{classData.outline.reading}</span>
                </div>
                <div className="meta-grid-box">
                  <span className="box-label">Assignment Deadline:</span>
                  <span className="box-value">{classData.outline.assignments}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: INSTRUCTOR */}
        {activeTab === 'instructor' && (
          <section className="tab-pane instructor-pane" aria-labelledby="instructor-heading">
            <div className="instructor-card-large">
              <div className="instructor-profile-header">
                <div className="profile-avatar-circle">
                  <span>{classData.instructor.avatarInitials}</span>
                </div>
                <div className="profile-info-block">
                  <h2 id="instructor-heading" className="instructor-full-name">{classData.instructor.name}</h2>
                  <span className="instructor-official-title">{classData.instructor.title}</span>
                  <span className="instructor-dept">{classData.instructor.department}</span>
                </div>
              </div>

              <div className="instructor-details-grid">
                <div className="detail-item-box">
                  <div className="item-icon-wrap">
                    <Mail size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="item-label">Direct Email</span>
                    <a href={`mailto:${classData.instructor.email}`} className="item-link">
                      {classData.instructor.email}
                    </a>
                  </div>
                </div>

                <div className="detail-item-box">
                  <div className="item-icon-wrap">
                    <Building size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="item-label">Office Location</span>
                    <span className="item-value">{classData.instructor.office}</span>
                  </div>
                </div>

                <div className="detail-item-box full-width">
                  <div className="item-icon-wrap">
                    <Clock size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="item-label">Office Hours Schedule</span>
                    <span className="item-value">{classData.instructor.officeHours}</span>
                  </div>
                </div>
              </div>

              <div className="instructor-bio-section">
                <h3 className="sub-heading">Instructor Background & Pedagogy</h3>
                <p className="bio-text">{classData.instructor.bio}</p>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: SYLLABUS NOTES & CODE */}
        {activeTab === 'notes' && (
          <section className="tab-pane notes-pane" aria-labelledby="notes-heading">
            <div className="pane-card">
              <h2 id="notes-heading" className="pane-section-title">Syllabus Overview & Foundations</h2>
              <p className="overview-text">{classData.syllabusNotes.overview}</p>

              <div className="prereq-badge-box">
                <span className="prereq-label">Prerequisites:</span>
                <span className="prereq-content">{classData.syllabusNotes.prerequisites}</span>
              </div>

              <h3 className="sub-heading">Core Topic Breakdown</h3>
              <div className="core-topics-tags">
                {classData.syllabusNotes.coreTopics.map((topic, i) => (
                  <span key={i} className="core-topic-chip">
                    {topic}
                  </span>
                ))}
              </div>

              {/* ASCII Diagram if available */}
              {classData.syllabusNotes.asciiDiagram && (
                <div className="ascii-diagram-wrapper">
                  <div className="diagram-header">
                    <Sparkles size={14} aria-hidden="true" />
                    <span>Algorithmic Concept Model</span>
                  </div>
                  <pre className="ascii-code-block">{classData.syllabusNotes.asciiDiagram}</pre>
                </div>
              )}

              {/* Executable Code Snippets */}
              <h3 className="sub-heading">Python Code Implementation</h3>
              {classData.syllabusNotes.codeSnippets.length === 0 ? (
                <p className="text-muted">No code snippets attached for this session.</p>
              ) : (
                classData.syllabusNotes.codeSnippets.map((snippet, idx) => (
                  <div key={idx} className="code-snippet-box">
                    <div className="snippet-header">
                      <div className="snippet-file-info">
                        <FileCode size={16} aria-hidden="true" />
                        <span className="snippet-filename">{snippet.filename}</span>
                        <span className="snippet-lang-badge">{snippet.language}</span>
                      </div>
                      <button
                        type="button"
                        className="copy-code-btn"
                        onClick={() => handleCopyCode(snippet.code, idx)}
                        aria-label="Copy code to clipboard"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check size={14} aria-hidden="true" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} aria-hidden="true" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="code-content">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* TAB 4: DOWNLOADS */}
        {activeTab === 'downloads' && (
          <section className="tab-pane downloads-pane" aria-labelledby="downloads-heading">
            <div className="pane-card">
              <h2 id="downloads-heading" className="pane-section-title">Course Materials & Downloads</h2>
              <p className="pane-sub-desc">
                Official lecture slides, starter code templates, and problem set worksheets.
              </p>

              {classData.downloads.length === 0 ? (
                <div className="no-materials-msg">No files uploaded for this session yet.</div>
              ) : (
                <div className="downloads-list">
                  {classData.downloads.map((dl) => (
                    <div key={dl.id} className="download-row">
                      <div className="download-type-icon">
                        {dl.type === 'code' ? (
                          <FileCode size={22} className="icon-code" />
                        ) : (
                          <FileText size={22} className="icon-pdf" />
                        )}
                      </div>

                      <div className="download-details">
                        <h4 className="download-name">{dl.name}</h4>
                        <p className="download-desc">{dl.description}</p>
                        <span className="download-size-badge">{dl.size} · {dl.type.toUpperCase()}</span>
                      </div>

                      <button
                        type="button"
                        className="download-btn"
                        onClick={() => handleDownloadFile(dl.downloadName, dl.description)}
                        aria-label={`Download ${dl.name}`}
                      >
                        <Download size={15} aria-hidden="true" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 5: DISCUSSION / EDSTEM */}
        {activeTab === 'discussion' && (
          <section className="tab-pane discussion-pane" aria-labelledby="discussion-heading">
            <div className="pane-card">
              <div className="discussion-pane-header">
                <div>
                  <div className="edstem-sync-banner">
                    <EdStemLogo size={18} />
                    <span className="edstem-sync-title">EdStem Classroom Discussion Sync</span>
                  </div>
                  <h2 id="discussion-heading" className="pane-section-title">
                    Questions & Collaborative Answers
                  </h2>
                  <p className="pane-sub-desc">
                    Live questions asked by students during the lecture, verified and endorsed by course staff.
                  </p>
                </div>
              </div>

              {/* Ask Question Form */}
              <form onSubmit={handleAddQuestion} className="ask-question-form">
                <div className="form-top-row">
                  <span className="form-label">Ask a Question for this Session:</span>
                  <select
                    value={newQuestionStep}
                    onChange={(e) => setNewQuestionStep(e.target.value)}
                    className="step-tag-select"
                    aria-label="Select Step Tag"
                  >
                    <option value="Step 1: Initialization">Step 1: Initialization</option>
                    <option value="Step 2: Negative Cycle Relaxation">Step 2: Negative Cycle Relaxation</option>
                    <option value="Step 3: Correctness Proof">Step 3: Correctness Proof</option>
                    <option value="Canvas Rubric & Submission">Canvas Rubric &amp; Submission</option>
                  </select>
                </div>

                <div className="form-input-row">
                  <input
                    type="text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="E.g., Why do we stop at |V| - 1 iterations instead of |E|?"
                    className="question-input-field"
                  />
                  <button type="submit" className="submit-question-btn">
                    <Send size={15} aria-hidden="true" />
                    <span>Post Question</span>
                  </button>
                </div>
              </form>

              {/* Discussion Threads List */}
              <div className="threads-list">
                {threads.map((th) => {
                  const isUpvoted = !!userUpvoted[th.id]

                  return (
                    <article key={th.id} className="discussion-thread-card">
                      <div className="thread-vote-sidebar">
                        <button
                          type="button"
                          className={`upvote-btn ${isUpvoted ? 'voted' : ''}`}
                          onClick={() => handleUpvote(th.id)}
                          aria-label={`Upvote question: ${th.title}. Current count: ${th.upvotes}`}
                        >
                          <ThumbsUp size={15} aria-hidden="true" />
                          <span className="upvote-count">{th.upvotes}</span>
                        </button>
                      </div>

                      <div className="thread-content-block">
                        <div className="thread-header-row">
                          <span className="thread-author">{th.author}</span>
                          <span className="thread-time">{th.timeAgo}</span>
                          <span className="thread-step-chip">{th.stepTag}</span>
                        </div>

                        <h3 className="thread-question-title">{th.question}</h3>

                        {/* Endorsed Answer */}
                        {th.answer && (
                          <div className="thread-answer-box">
                            <div className="answer-header">
                              <span className="endorsed-badge">
                                <Check size={12} aria-hidden="true" />
                                <span>Endorsed Answer</span>
                              </span>
                              <span className="answer-author">{th.answer.author} ({th.answer.role})</span>
                            </div>
                            <p className="answer-text">{th.answer.text}</p>
                          </div>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
