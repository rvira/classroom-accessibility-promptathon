export interface ScheduledClass {
  id: string
  code: string
  title: string
  time: string
  location: string
  topic: string
  isLive: boolean
  canvasSync: string
  roomCode?: string
  instructor?: string
}

export type ScheduleByDate = Record<string, ScheduledClass[]>

