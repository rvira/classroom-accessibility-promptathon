import express, { type Express } from 'express'
import cors from 'cors'
import { healthRouter } from './routes/health.js'
import { scheduleRouter, handleRoomJoin } from './routes/schedule.js'
import { lectureRouter } from './routes/lecture.js'
import { canvasRouter } from './routes/canvas.js'
import { edstemRouter } from './routes/edstem.js'
import { rejoinRouter } from './routes/rejoin.js'
import { telemetryRouter } from './routes/telemetry.js'
import { socraticRouter } from './routes/socratic.js'

export function createApp(): Express {
  const app = express()

  // Middleware
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    })
  )
  app.use(express.json())

  // Routes
  app.use('/api/health', healthRouter)
  app.use('/api/schedule', scheduleRouter)
  app.post('/api/classrooms/join', handleRoomJoin)
  app.use('/api/lecture', lectureRouter)
  app.use('/api/canvas', canvasRouter)
  app.use('/api/edstem', edstemRouter)
  app.use('/api/rejoin', rejoinRouter)
  app.use('/api/telemetry', telemetryRouter)
  app.use('/api/socratic', socraticRouter)

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({
      error: 'Not Found',
      availableEndpoints: [
        'GET /api/health',
        'GET /api/schedule',
        'POST /api/schedule/join',
        'POST /api/classrooms/join',
        'GET /api/lecture/current',
        'GET /api/lecture/courses',
        'POST /api/lecture/checkpoint',
        'GET /api/canvas/assignments',
        'GET /api/edstem/threads',
        'POST /api/edstem/threads',
        'POST /api/rejoin',
        'POST /api/telemetry/events',
        'GET /api/telemetry/stats',
        'GET /api/telemetry/export',
        'POST /api/socratic/scaffold',
        'GET /ws/live (WebSocket)',
      ],
    })
  })

  return app
}

export const app = createApp()
