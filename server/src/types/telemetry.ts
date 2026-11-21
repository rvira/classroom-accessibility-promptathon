export type TelemetryEventType =
  | 'DRIFT_RECOVERY_INITIATED'
  | 'SENSORY_CALM_TOGGLED'
  | 'CHECKPOINT_COMPLETED'
  | 'SCAFFOLD_HINT_REQUESTED'
  | 'DWELL_ANOMALY_DETECTED'
  | 'AUDIO_STREAM_TOGGLED'

export interface TelemetryMetrics {
  dwellDurationMs?: number
  rejoinLatencyMs?: number
  cognitiveFrictionScore?: number
}

export interface TelemetryEvent {
  eventId: string
  sessionId: string
  timestamp: string
  courseId: string
  moduleContext: string
  eventType: TelemetryEventType
  metrics: TelemetryMetrics
  metadata?: Record<string, unknown>
}

export interface TelemetrySummaryStats {
  totalEvents: number
  activeSessions: number
  averageRejoinLatencyMs: number
  sensoryCalmEngagementRate: number
  averageCognitiveFriction: number
  eventBreakdown: Record<TelemetryEventType, number>
}
