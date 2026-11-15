import { Router, type Request, type Response } from 'express'
import { courseHorizons, seedSchedule } from '../data/seedData.js'

export const scheduleRouter = Router()

// In-memory mutable copy of schedule
const schedule = JSON.parse(JSON.stringify(seedSchedule))

// GET /api/schedule
scheduleRouter.get('/', (_req: Request, res: Response) => {
  let activeLiveClass = null
  for (const date of Object.keys(schedule)) {
    const live = schedule[date].find((c: any) => c.isLive)
    if (live) {
      activeLiveClass = { ...live, date }
      break
    }
  }

  const allCourses = Array.from(
    new Set(
      Object.values(schedule)
        .flat()
        .map((c: any) => c.code)
    )
  )

  res.status(200).json({
    schedule,
    activeLiveClass,
    todayKey: 'Fri Nov 14 (Today)',
    courses: allCourses,
    totalClasses: Object.values(schedule).flat().length,
  })
})

// GET /api/schedule/live
scheduleRouter.get('/live', (_req: Request, res: Response) => {
  for (const date of Object.keys(schedule)) {
    const live = schedule[date].find((c: any) => c.isLive)
    if (live) {
      return res.status(200).json({
        hasLiveClass: true,
        session: { ...live, date },
      })
    }
  }

  return res.status(200).json({
    hasLiveClass: false,
    session: null,
  })
})

// POST /api/schedule/join or /api/classrooms/join
export function handleRoomJoin(req: Request, res: Response) {
  const { roomCode } = req.body || {}

  if (!roomCode || typeof roomCode !== 'string') {
    return res.status(400).json({
      error: 'Valid roomCode is required (e.g. MATH-2B, PHYS-7C, ICS-33, CHEM-1A)',
    })
  }

  const normalized = roomCode.trim().toUpperCase().replace(/\s+/g, '-')
  const allClasses = Object.values(schedule).flat() as any[]
  
  const matched =
    allClasses.find(
      (c) =>
        c.roomCode?.toUpperCase() === normalized ||
        c.code.toUpperCase().replace(/\s+/g, '-') === normalized
    ) || null

  const horizonData = courseHorizons[normalized] || courseHorizons['MATH-2B']

  res.status(200).json({
    success: true,
    roomCode: normalized,
    matchedClass: matched,
    courseTitle: matched?.title || horizonData.horizon.lectureTitle,
    horizon: horizonData.horizon,
    activeCheckpoint: horizonData.checkpoints.find((c) => c.status === 'active'),
    message: `Successfully joined ${matched?.code || normalized} classroom session`,
  })
}

scheduleRouter.post('/join', handleRoomJoin)

// GET /api/schedule/:dateKey
scheduleRouter.get('/:dateKey', (req: Request, res: Response) => {
  const { dateKey } = req.params
  const classes = schedule[dateKey]

  if (!classes) {
    return res.status(404).json({
      error: `No schedule found for key '${dateKey}'`,
      availableDates: Object.keys(schedule),
    })
  }

  res.status(200).json({
    dateKey,
    classes,
  })
})
