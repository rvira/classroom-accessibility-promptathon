import { Router, type Request, type Response } from 'express'
import { seedEdstemThreads } from '../data/seedData.js'
import type { CreateThreadRequest, EdstemThread } from '../types/edstem.js'

export const edstemRouter = Router()

// In-memory mutable list
let threads: EdstemThread[] = JSON.parse(JSON.stringify(seedEdstemThreads))

export function resetEdstemThreads() {
  threads = JSON.parse(JSON.stringify(seedEdstemThreads))
}

// GET /api/edstem/threads
edstemRouter.get('/threads', (req: Request, res: Response) => {
  const { courseCode, stepTag } = req.query

  let results = [...threads]

  if (courseCode && typeof courseCode === 'string') {
    results = results.filter(
      (t) => t.courseCode.toLowerCase() === courseCode.toLowerCase()
    )
  }

  if (stepTag && typeof stepTag === 'string') {
    results = results.filter((t) =>
      t.stepTag.toLowerCase().includes(stepTag.toLowerCase())
    )
  }

  // Sort by upvotes desc
  results.sort((a, b) => b.upvotes - a.upvotes)

  res.status(200).json({
    connected: true,
    platform: 'EdStem Live Discussion',
    course: 'MATH 2B · Lecture 14',
    activeThreads: results.length,
    threads: results,
  })
})

// POST /api/edstem/threads
edstemRouter.post('/threads', (req: Request, res: Response) => {
  const body = req.body as CreateThreadRequest

  if (!body || !body.question || typeof body.question !== 'string' || body.question.trim().length === 0) {
    return res.status(400).json({
      error: 'Question text is required and cannot be empty',
    })
  }

  const newThread: EdstemThread = {
    id: `ed-${Date.now()}`,
    courseCode: body.courseCode || 'MATH 2B',
    author: body.author?.trim() || 'Anonymous Student',
    timeAgo: 'Just now',
    timestamp: new Date().toISOString(),
    question: body.question.trim(),
    stepTag: body.stepTag || 'Step 2: Integration Limits',
    upvotes: 1,
    isEndorsed: false,
  }

  threads.unshift(newThread)

  res.status(201).json({
    success: true,
    message: 'Question posted successfully to EdStem classroom thread',
    thread: newThread,
  })
})

// POST /api/edstem/threads/:id/upvote
edstemRouter.post('/threads/:id/upvote', (req: Request, res: Response) => {
  const { id } = req.params
  const thread = threads.find((t) => t.id === id)

  if (!thread) {
    return res.status(404).json({
      error: `EdStem thread with id '${id}' not found`,
    })
  }

  thread.upvotes += 1

  res.status(200).json({
    success: true,
    id: thread.id,
    upvotes: thread.upvotes,
  })
})

