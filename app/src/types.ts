export type SubjectCategory = 'all' | 'compsci' | 'math' | 'physics'

export interface InstructorProfile {
  name: string
  title: string
  department: string
  email: string
  office: string
  officeHours: string
  bio: string
  avatarInitials: string
}

export interface ClassOutline {
  unit: string
  summary: string
  keyConcepts: string[]
  reading: string
  assignments: string
  rubricConstraint: string
  officeHours: string
}

export interface CodeSnippet {
  language: string
  filename: string
  code: string
}

export interface SyllabusNotes {
  overview: string
  prerequisites: string
  coreTopics: string[]
  codeSnippets: CodeSnippet[]
  asciiDiagram?: string
}

export interface ClassDownload {
  id: string
  name: string
  size: string
  type: 'pdf' | 'code' | 'worksheet'
  description: string
  downloadName: string
}

export interface DiscussionThread {
  id: string
  author: string
  role: 'Student' | 'TA' | 'Instructor'
  timeAgo: string
  title: string
  question: string
  stepTag: string
  upvotes: number
  answer?: {
    author: string
    role: 'TA' | 'Instructor'
    text: string
    endorsed: boolean
  }
}

export interface ScheduledClass {
  id: string
  code: string // e.g. "COMPSCI 161"
  subject: 'compsci' | 'math' | 'physics'
  title: string
  time: string
  location: string
  topic: string
  instructor: InstructorProfile
  isLive: boolean
  isOngoingToday?: boolean
  canvasSync: string
  streamUrl: string
  recordingUrl?: string
  outline: ClassOutline
  syllabusNotes: SyllabusNotes
  downloads: ClassDownload[]
  discussionThreads: DiscussionThread[]
}

export interface DateStripItem {
  dateKey: string // "2026-11-21"
  displayDay: string // "Fri"
  displayDate: string // "Nov 21"
  fullLabel: string // "Friday, November 21, 2026"
  relativeLabel: string // "Today · Live Ongoing"
  isCurrentDate: boolean // true for 2026-11-21
  offsetFromCurrent: number // -2, -1, 0, 1, 2
  classCount: number
  compsciCount: number
}

export interface TourStep {
  id: string
  targetSelector: string
  title: string
  description: string
  badgeText: string
  route: string
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

