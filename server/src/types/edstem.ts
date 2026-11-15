export interface EdstemAnswer {
  id: string
  author: string
  role: 'instructor' | 'ta' | 'peer'
  text: string
  timestamp: string
  isEndorsed: boolean
}

export interface EdstemThread {
  id: string
  courseCode: string
  author: string
  question: string
  stepTag: string
  timestamp: string
  timeAgo: string
  upvotes: number
  isEndorsed: boolean
  answer?: EdstemAnswer
}

export interface CreateThreadRequest {
  author?: string
  question: string
  stepTag?: string
  courseCode?: string
}

