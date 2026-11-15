import { Router, type Request, type Response } from 'express'
import { seedCanvasAssignments } from '../data/seedData.js'

export const canvasRouter = Router()

// GET /api/canvas/assignments
canvasRouter.get('/assignments', (req: Request, res: Response) => {
  const { courseCode } = req.query

  let assignments = seedCanvasAssignments
  if (courseCode && typeof courseCode === 'string') {
    assignments = assignments.filter(
      (a) => a.courseCode.toLowerCase() === courseCode.toLowerCase()
    )
  }

  res.status(200).json({
    connected: true,
    lms: 'Canvas LMS (Instructure)',
    institution: 'University of California, Irvine',
    lastSyncTimestamp: new Date().toISOString(),
    totalAssignments: assignments.length,
    assignments,
  })
})

// GET /api/canvas/assignments/:id
canvasRouter.get('/assignments/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const assignment = seedCanvasAssignments.find((a) => a.id === id)

  if (!assignment) {
    return res.status(404).json({
      error: `Canvas assignment with id '${id}' not found`,
    })
  }

  res.status(200).json({
    connected: true,
    assignment,
  })
})

