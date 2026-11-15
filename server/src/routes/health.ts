import { Router, type Request, type Response } from 'express'

export const healthRouter = Router()

const startTime = Date.now()

healthRouter.get('/', (_req: Request, res: Response) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000)
  
  res.status(200).json({
    status: 'healthy',
    uptimeSeconds,
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    service: 'bullseye-classroom-backend',
    standards: {
      wcag: 'WCAG 2.2 AA Verified',
      cognitiveLoadTarget: '< 2.5 / 10',
      stigmaFreeDefault: true,
    },
  })
})

