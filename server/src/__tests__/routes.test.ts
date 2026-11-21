import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import request from 'supertest'
import { WebSocket } from 'ws'
import { app } from '../app.js'
import { createServerInstance } from '../server.js'
import { resetLectureState } from '../routes/lecture.js'
import { resetEdstemThreads } from '../routes/edstem.js'

describe('Bullseye Classroom API Routes', () => {
  beforeEach(() => {
    resetLectureState()
    resetEdstemThreads()
  })

  // 1. Health Endpoint
  describe('GET /api/health', () => {
    it('returns healthy status, version, uptime, and accessibility standards', async () => {
      const res = await request(app).get('/api/health')
      expect(res.status).toBe(200)
      expect(res.body.status).toBe('healthy')
      expect(res.body.version).toBe('1.0.0')
      expect(res.body.service).toBe('bullseye-classroom-backend')
      expect(typeof res.body.uptimeSeconds).toBe('number')
      expect(res.body.standards.wcag).toContain('WCAG 2.2 AA')
      expect(res.body.standards.stigmaFreeDefault).toBe(true)
    })
  })

  // 2. Schedule Endpoints & Multi-Class Roster
  describe('Schedule Endpoints & Multi-Class Roster', () => {
    it('returns schedule for all STEM courses (Math 2B, Physics 7C, ICS 33, Chem 1A, Bio 93, Stats 67, CS 161)', async () => {
      const res = await request(app).get('/api/schedule')
      expect(res.status).toBe(200)
      expect(res.body.schedule).toBeDefined()
      expect(res.body.courses).toEqual(
        expect.arrayContaining(['MATH 2B', 'PHYS 7C', 'ICS 33', 'CHEM 1A', 'BIO 93', 'STATS 67', 'COMPSCI 161'])
      )
      expect(res.body.totalClasses).toBeGreaterThanOrEqual(15)
      expect(res.body.activeLiveClass).toBeDefined()
      expect(res.body.activeLiveClass.code).toBe('MATH 2B')
      expect(res.body.activeLiveClass.isLive).toBe(true)
    })

    it('returns live session details from /api/schedule/live', async () => {
      const res = await request(app).get('/api/schedule/live')
      expect(res.status).toBe(200)
      expect(res.body.hasLiveClass).toBe(true)
      expect(res.body.session.code).toBe('MATH 2B')
      expect(res.body.session.roomCode).toBe('MATH-2B')
    })

    it('POST /api/schedule/join joins a room by code (PHYS-7C)', async () => {
      const res = await request(app)
        .post('/api/schedule/join')
        .send({ roomCode: 'PHYS-7C' })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.roomCode).toBe('PHYS-7C')
      expect(res.body.matchedClass.code).toBe('PHYS 7C')
      expect(res.body.horizon.lectureTitle).toContain('Damped Harmonic Oscillations')
    })

    it('POST /api/classrooms/join validates missing roomCode', async () => {
      const res = await request(app)
        .post('/api/classrooms/join')
        .send({})

      expect(res.status).toBe(400)
      expect(res.body.error).toContain('roomCode is required')
    })

    it('returns 404 for non-existent date', async () => {
      const res = await request(app).get('/api/schedule/Sunday')
      expect(res.status).toBe(404)
      expect(res.body.error).toBeDefined()
    })
  })

  // 3. Multi-Course Lecture Horizon & Checkpoints
  describe('Multi-Course Lecture Horizon & Checkpoints', () => {
    it('GET /api/lecture/courses lists all available active course horizons', async () => {
      const res = await request(app).get('/api/lecture/courses')
      expect(res.status).toBe(200)
      expect(res.body.totalCourses).toBeGreaterThanOrEqual(4)
      const roomCodes = res.body.courses.map((c: any) => c.roomCode)
      expect(roomCodes).toEqual(expect.arrayContaining(['MATH-2B', 'PHYS-7C', 'ICS-33', 'CHEM-1A']))
    })

    it('GET /api/lecture/current defaults to Math 2B', async () => {
      const res = await request(app).get('/api/lecture/current')
      expect(res.status).toBe(200)
      expect(res.body.course).toContain('Math 2B')
      expect(res.body.activeStepNumber).toBe(2)
      expect(res.body.horizon.directive.statement).toContain('Transform integration limits')
    })

    it('GET /api/lecture/current?course=PHYS-7C retrieves Physics 7C horizon', async () => {
      const res = await request(app).get('/api/lecture/current?course=PHYS-7C')
      expect(res.status).toBe(200)
      expect(res.body.course).toContain('Physics 7C')
      expect(res.body.roomCode).toBe('PHYS-7C')
      expect(res.body.horizon.directive.statement).toContain('damped oscillation frequency')
    })

    it('GET /api/lecture/current?course=CHEM-1A retrieves Chem 1A horizon', async () => {
      const res = await request(app).get('/api/lecture/current?course=CHEM-1A')
      expect(res.status).toBe(200)
      expect(res.body.course).toContain('Chem 1A')
      expect(res.body.horizon.directive.statement).toContain('Reverse reaction')
    })

    it('POST /api/lecture/checkpoint advances active step milestone', async () => {
      const res = await request(app)
        .post('/api/lecture/checkpoint')
        .send({ stepNumber: 3 })
      
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.currentStep).toBe(3)
      expect(res.body.activeCheckpoint.stepNumber).toBe(3)
      expect(res.body.updatedHorizon.horizon.directive.statement).toContain('reverse power rule')

      const currentRes = await request(app).get('/api/lecture/current')
      expect(currentRes.body.activeStepNumber).toBe(3)
    })

    it('POST /api/lecture/checkpoint rejects invalid step number', async () => {
      const res = await request(app)
        .post('/api/lecture/checkpoint')
        .send({ stepNumber: 99 })
      
      expect(res.status).toBe(400)
      expect(res.body.error).toContain('Invalid stepNumber')
    })
  })

  // 4. Canvas LMS Endpoints Across Multiple Classes
  describe('Canvas LMS Endpoints Across Multiple Classes', () => {
    it('GET /api/canvas/assignments returns multi-course assignments with rubrics', async () => {
      const res = await request(app).get('/api/canvas/assignments')
      expect(res.status).toBe(200)
      expect(res.body.connected).toBe(true)
      expect(res.body.assignments.length).toBeGreaterThanOrEqual(6)
      
      const mathAssignment = res.body.assignments.find((a: any) => a.courseCode === 'MATH 2B')
      expect(mathAssignment).toBeDefined()
      expect(mathAssignment.title).toContain('Lab 14 Worksheet')

      const chemAssignment = res.body.assignments.find((a: any) => a.courseCode === 'CHEM 1A')
      expect(chemAssignment).toBeDefined()
      expect(chemAssignment.title).toContain('Worksheet 6')

      const csAssignment = res.body.assignments.find((a: any) => a.courseCode === 'COMPSCI 161')
      expect(csAssignment).toBeDefined()
      expect(csAssignment.title).toContain('Bellman-Ford')
    })

    it('GET /api/canvas/assignments?courseCode=CHEM 1A filters by course', async () => {
      const res = await request(app).get('/api/canvas/assignments?courseCode=CHEM 1A')
      expect(res.status).toBe(200)
      expect(res.body.assignments.length).toBe(1)
      expect(res.body.assignments[0].courseCode).toBe('CHEM 1A')
    })

    it('GET /api/canvas/assignments/:id returns single assignment by id', async () => {
      const res = await request(app).get('/api/canvas/assignments/canvas-math2b-lab14')
      expect(res.status).toBe(200)
      expect(res.body.assignment.id).toBe('canvas-math2b-lab14')
    })

    it('GET /api/canvas/assignments/:id returns 404 for unknown assignment', async () => {
      const res = await request(app).get('/api/canvas/assignments/unknown-id')
      expect(res.status).toBe(404)
    })
  })

  // 5. EdStem Live Discussion Endpoints Across Classes
  describe('EdStem Live Discussion Endpoints', () => {
    it('GET /api/edstem/threads returns questions across courses', async () => {
      const res = await request(app).get('/api/edstem/threads')
      expect(res.status).toBe(200)
      expect(res.body.connected).toBe(true)
      expect(res.body.threads.length).toBeGreaterThanOrEqual(7)
    })

    it('GET /api/edstem/threads?courseCode=CHEM 1A filters by course', async () => {
      const res = await request(app).get('/api/edstem/threads?courseCode=CHEM 1A')
      expect(res.status).toBe(200)
      expect(res.body.threads.length).toBe(1)
      expect(res.body.threads[0].author).toBe('Chem Major')
      expect(res.body.threads[0].answer.author).toBe('Prof. Arasasingham')
    })

    it('POST /api/edstem/threads creates a new question thread', async () => {
      const res = await request(app)
        .post('/api/edstem/threads')
        .send({
          question: 'Are we allowed to use the fundamental theorem directly here?',
          stepTag: 'Step 3: Direct Integration',
          author: 'Alex P.',
        })

      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.thread.question).toContain('fundamental theorem')
      expect(res.body.thread.author).toBe('Alex P.')
    })

    it('POST /api/edstem/threads/:id/upvote increments upvote count', async () => {
      const res = await request(app).post('/api/edstem/threads/1/upvote')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.upvotes).toBe(15)
    })
  })

  // 6. Safe Multi-Course Rejoin Algorithm
  describe('Safe Multi-Course Rejoin Algorithm', () => {
    it('processes Math 2B bounds drift query', async () => {
      const res = await request(app)
        .post('/api/rejoin')
        .send({
          driftQuery: 'I got confused when changing the bounds',
          courseCode: 'MATH 2B',
        })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.penaltyFreeConfirmation).toBe(true)
      expect(res.body.immediateActionCue).toContain('Write down the new limits [1, 9]')
    })

    it('processes Physics 7C damping oscillation drift query', async () => {
      const res = await request(app)
        .post('/api/rejoin')
        .send({
          driftQuery: 'What is omega 1 and why is it smaller than omega 0?',
          courseCode: 'PHYS 7C',
        })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.detectedContext).toContain('underdamped quasi-frequency')
      expect(res.body.immediateActionCue).toContain('ω₁ = √(ω₀² − γ²)')
    })

    it('processes Chem 1A Hess Law drift query', async () => {
      const res = await request(app)
        .post('/api/rejoin')
        .send({
          driftQuery: 'Why did delta H become positive for methane?',
          courseCode: 'CHEM 1A',
        })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.detectedContext).toContain('reversing reaction (3)')
      expect(res.body.immediateActionCue).toContain('+890.3 kJ')
    })
  })

  // 7. Research Telemetry & Analytics Exporter
  describe('Research Telemetry & Analytics Exporter', () => {
    it('POST /api/telemetry/events records a student interaction event', async () => {
      const res = await request(app)
        .post('/api/telemetry/events')
        .send({
          sessionId: 'sess-test-01',
          courseId: 'MATH-2B',
          moduleContext: 'Testing Integration Limits',
          eventType: 'SENSORY_CALM_TOGGLED',
          metrics: {
            dwellDurationMs: 45000,
            cognitiveFrictionScore: 4.2,
          },
        })

      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.eventId).toBeDefined()
      expect(res.body.totalEvents).toBeGreaterThanOrEqual(7)
    })

    it('GET /api/telemetry/stats returns aggregate cognitive load and struggle metrics', async () => {
      const res = await request(app).get('/api/telemetry/stats')

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('ok')
      expect(res.body.stats.totalEvents).toBeGreaterThanOrEqual(6)
      expect(res.body.stats.activeSessions).toBeGreaterThanOrEqual(1)
      expect(typeof res.body.stats.averageRejoinLatencyMs).toBe('number')
      expect(typeof res.body.stats.sensoryCalmEngagementRate).toBe('number')
      expect(typeof res.body.stats.averageCognitiveFriction).toBe('number')
    })

    it('GET /api/telemetry/export?format=csv returns standardized RFC 4180 CSV stream', async () => {
      const res = await request(app).get('/api/telemetry/export?format=csv')

      expect(res.status).toBe(200)
      expect(res.headers['content-type']).toContain('text/csv')
      expect(res.text).toContain('eventId,sessionId,timestamp,courseId,moduleContext,eventType')
      expect(res.text).toContain('MATH-2B')
    })

    it('GET /api/telemetry/export?format=json returns full array of telemetry events', async () => {
      const res = await request(app).get('/api/telemetry/export?format=json')

      expect(res.status).toBe(200)
      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBeGreaterThanOrEqual(6)
      expect(res.body[0].eventId).toBeDefined()
    })
  })

  // 8. General-Purpose Socratic Scaffolding Agent
  describe('Socratic Scaffolding Agent', () => {
    it('POST /api/socratic/scaffold returns Tier 1 attentional orienting hint for Math 2B', async () => {
      const res = await request(app)
        .post('/api/socratic/scaffold')
        .send({
          courseCode: 'MATH-2B',
          domain: 'math',
          currentProblem: 'Evaluate integral of x * cos(x) dx',
          activeStep: 'Selecting u and dv via LIATE',
          scaffoldingTier: 1,
        })

      expect(res.status).toBe(200)
      expect(res.body.scaffoldId).toBeDefined()
      expect(res.body.tier).toBe(1)
      expect(res.body.tierLabel).toBe('Where to Look')
      expect(res.body.scaffoldPrompt).toContain('LIATE')
      expect(res.body.guardrailTriggered).toBe(false)
    })

    it('POST /api/socratic/scaffold triggers deterministic solution guardrail when direct answer requested', async () => {
      const res = await request(app)
        .post('/api/socratic/scaffold')
        .send({
          courseCode: 'PHYS-7C',
          domain: 'physics',
          currentProblem: 'Damped harmonic oscillator quasi-frequency',
          activeStep: 'Calculate omega_1',
          studentQuery: 'Just give me the answer please',
          scaffoldingTier: 1,
        })

      expect(res.status).toBe(200)
      expect(res.body.guardrailTriggered).toBe(true)
      expect(res.body.guardrailExplanation).toBeDefined()
      expect(res.body.guardrailExplanation).toContain('withheld')
      expect(res.body.scaffoldPrompt).toBeDefined()
    })

    it('POST /api/socratic/scaffold handles ICS 33 Python decorator metadata decomposition', async () => {
      const res = await request(app)
        .post('/api/socratic/scaffold')
        .send({
          courseCode: 'ICS-33',
          domain: 'code',
          currentProblem: 'Building memoization decorator',
          activeStep: 'Metadata preservation',
          scaffoldingTier: 2,
        })

      expect(res.status).toBe(200)
      expect(res.body.tier).toBe(2)
      expect(res.body.tierLabel).toBe('Key Concept')
      expect(res.body.scaffoldPrompt).toContain('@functools.wraps')
    })
  })
})

describe('Bullseye Live WebSocket Server', () => {
  let serverInstance: ReturnType<typeof createServerInstance>
  let testPort: number

  afterAll(async () => {
    if (serverInstance) {
      clearInterval(serverInstance.broadcastInterval)
      await new Promise<void>((resolve) => {
        serverInstance.wss.close(() => {
          serverInstance.server.close(() => resolve())
        })
      })
    }
  })

  it('connects to /ws/live and receives initial sync payload', async () => {
    serverInstance = createServerInstance()
    testPort = 4831

    await new Promise<void>((resolve) => {
      serverInstance.server.listen(testPort, () => resolve())
    })

    const ws = new WebSocket(`ws://127.0.0.1:${testPort}/ws/live`)

    const messagePromise = new Promise<any>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('WebSocket timeout')), 3000)
      ws.on('message', (raw) => {
        clearTimeout(timer)
        resolve(JSON.parse(raw.toString()))
      })
      ws.on('error', (err) => {
        clearTimeout(timer)
        reject(err)
      })
    })

    const initialMessage = await messagePromise
    expect(initialMessage.type).toBe('initial_sync')
    expect(initialMessage.course).toContain('Math 2B')
    expect(initialMessage.roomCode).toBe('MATH-2B')
    expect(initialMessage.activeCheckpoint).toBeDefined()

    ws.close()
  })
})
