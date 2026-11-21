import { Router, type Request, type Response } from 'express'
import { randomUUID } from 'node:crypto'
import type { TelemetryEvent, TelemetrySummaryStats } from '../types/telemetry.js'

export const telemetryRouter = Router()

// Pre-seeded telemetry event history from STEM lecture sessions
const telemetryStore: TelemetryEvent[] = [
  {
    eventId: 'evt-001',
    sessionId: 'sess-math2b-01',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    courseId: 'MATH-2B',
    moduleContext: 'Integration by Parts: u-substitution boundary selection',
    eventType: 'DRIFT_RECOVERY_INITIATED',
    metrics: {
      dwellDurationMs: 42000,
      rejoinLatencyMs: 8200,
      cognitiveFrictionScore: 4.8,
    },
    metadata: { query: 'I missed what u was', recoverySuccess: true },
  },
  {
    eventId: 'evt-002',
    sessionId: 'sess-math2b-01',
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    courseId: 'MATH-2B',
    moduleContext: 'Integration by Parts: evaluating algebraic product',
    eventType: 'CHECKPOINT_COMPLETED',
    metrics: {
      dwellDurationMs: 65000,
      cognitiveFrictionScore: 2.1,
    },
    metadata: { checkpointStep: 2 },
  },
  {
    eventId: 'evt-003',
    sessionId: 'sess-phys7c-02',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    courseId: 'PHYS-7C',
    moduleContext: 'Underdamped Quasi-frequency: characteristic radical',
    eventType: 'SENSORY_CALM_TOGGLED',
    metrics: {
      dwellDurationMs: 85000,
      cognitiveFrictionScore: 6.2,
    },
    metadata: { activeState: true, trigger: 'hotkey_c' },
  },
  {
    eventId: 'evt-004',
    sessionId: 'sess-phys7c-02',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    courseId: 'PHYS-7C',
    moduleContext: 'Underdamped Quasi-frequency: exponential decay envelope',
    eventType: 'SCAFFOLD_HINT_REQUESTED',
    metrics: {
      dwellDurationMs: 38000,
      rejoinLatencyMs: 9100,
      cognitiveFrictionScore: 5.4,
    },
    metadata: { domain: 'physics', tier: 1, promptType: 'Attentional Orienting' },
  },
  {
    eventId: 'evt-005',
    sessionId: 'sess-ics33-03',
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    courseId: 'ICS-33',
    moduleContext: 'Decorator Closures: @functools.wraps introspection',
    eventType: 'DRIFT_RECOVERY_INITIATED',
    metrics: {
      dwellDurationMs: 51000,
      rejoinLatencyMs: 7600,
      cognitiveFrictionScore: 3.9,
    },
    metadata: { query: 'Why do we need wraps', recoverySuccess: true },
  },
  {
    eventId: 'evt-006',
    sessionId: 'sess-ics33-03',
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    courseId: 'ICS-33',
    moduleContext: 'Decorator Closures: dictionary cache memoization',
    eventType: 'SCAFFOLD_HINT_REQUESTED',
    metrics: {
      dwellDurationMs: 29000,
      cognitiveFrictionScore: 4.1,
    },
    metadata: { domain: 'code', tier: 2, promptType: 'Conceptual Bridging' },
  },
]

// Ingestion endpoint
telemetryRouter.post('/events', (req: Request, res: Response) => {
  const body = req.body || {}
  const event: TelemetryEvent = {
    eventId: body.eventId || randomUUID(),
    sessionId: body.sessionId || 'sess-anonymous',
    timestamp: body.timestamp || new Date().toISOString(),
    courseId: body.courseId || 'GENERAL',
    moduleContext: body.moduleContext || 'General Lecture',
    eventType: body.eventType || 'CHECKPOINT_COMPLETED',
    metrics: {
      dwellDurationMs: body.metrics?.dwellDurationMs || 0,
      rejoinLatencyMs: body.metrics?.rejoinLatencyMs,
      cognitiveFrictionScore: body.metrics?.cognitiveFrictionScore ?? 3.0,
    },
    metadata: body.metadata || {},
  }

  telemetryStore.push(event)

  res.status(201).json({
    success: true,
    eventId: event.eventId,
    totalEvents: telemetryStore.length,
    recordedEvent: event,
  })
})

// Summary statistics endpoint
telemetryRouter.get('/stats', (_req: Request, res: Response) => {
  const totalEvents = telemetryStore.length
  const uniqueSessions = new Set(telemetryStore.map((e) => e.sessionId)).size

  const rejoinEvents = telemetryStore.filter((e) => e.metrics.rejoinLatencyMs !== undefined)
  const avgRejoinLatency =
    rejoinEvents.length > 0
      ? Math.round(
          rejoinEvents.reduce((acc, e) => acc + (e.metrics.rejoinLatencyMs || 0), 0) /
            rejoinEvents.length
        )
      : 0

  const calmEvents = telemetryStore.filter((e) => e.eventType === 'SENSORY_CALM_TOGGLED').length
  const calmEngagementRate =
    totalEvents > 0 ? parseFloat(((calmEvents / totalEvents) * 100).toFixed(1)) : 0

  const avgCognitiveFriction =
    totalEvents > 0
      ? parseFloat(
          (
            telemetryStore.reduce(
              (acc, e) => acc + (e.metrics.cognitiveFrictionScore || 3.0),
              0
            ) / totalEvents
          ).toFixed(2)
        )
      : 3.0

  const eventBreakdown: Record<string, number> = {}
  for (const e of telemetryStore) {
    eventBreakdown[e.eventType] = (eventBreakdown[e.eventType] || 0) + 1
  }

  const stats: TelemetrySummaryStats = {
    totalEvents,
    activeSessions: uniqueSessions,
    averageRejoinLatencyMs: avgRejoinLatency,
    sensoryCalmEngagementRate: calmEngagementRate,
    averageCognitiveFriction: avgCognitiveFriction,
    eventBreakdown: eventBreakdown as any,
  }

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    stats,
  })
})

// CSV / JSON Export endpoint for research and instructional review
telemetryRouter.get('/export', (req: Request, res: Response) => {
  const format = String(req.query.format || 'csv').toLowerCase()

  if (format === 'json') {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="classroom_telemetry_${Date.now()}.json"`
    )
    return res.json(telemetryStore)
  }

  // Generate standardized CSV
  const headers = [
    'eventId',
    'sessionId',
    'timestamp',
    'courseId',
    'moduleContext',
    'eventType',
    'dwellDurationMs',
    'rejoinLatencyMs',
    'cognitiveFrictionScore',
    'metadata',
  ]

  const csvRows = [headers.join(',')]

  for (const ev of telemetryStore) {
    const row = [
      `"${ev.eventId}"`,
      `"${ev.sessionId}"`,
      `"${ev.timestamp}"`,
      `"${ev.courseId}"`,
      `"${(ev.moduleContext || '').replace(/"/g, '""')}"`,
      `"${ev.eventType}"`,
      ev.metrics.dwellDurationMs ?? 0,
      ev.metrics.rejoinLatencyMs ?? '',
      ev.metrics.cognitiveFrictionScore ?? '',
      `"${JSON.stringify(ev.metadata || {}).replace(/"/g, '""')}"`,
    ]
    csvRows.push(row.join(','))
  }

  const csvContent = csvRows.join('\n')

  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="bullseye_research_telemetry_${new Date().toISOString().slice(0, 10)}.csv"`
  )
  res.status(200).send(csvContent)
})

