import http from 'node:http'
import { WebSocketServer, WebSocket } from 'ws'
import dotenv from 'dotenv'
import { app } from './app.js'
import { liveAudioSnippets, seedCheckpoints, seedLectureHorizon } from './data/seedData.js'

dotenv.config()

const PORT = parseInt(process.env.PORT || '4000', 10)
const HOST = process.env.HOST || '0.0.0.0'

export function createServerInstance() {
  const server = http.createServer(app)

  // WebSocket Server mounted at /ws/live
  const wss = new WebSocketServer({ server, path: '/ws/live' })

  let currentSnippetIndex = 0

  wss.on('connection', (ws: WebSocket, req) => {
    const ip = req.socket.remoteAddress
    // Send immediate initial sync payload
    const initialPayload = {
      type: 'initial_sync',
      course: seedLectureHorizon.course,
      roomCode: seedLectureHorizon.roomCode,
      activeCheckpoint: seedCheckpoints.find((c) => c.status === 'active'),
      currentHorizon: seedLectureHorizon.horizon,
      timestamp: new Date().toISOString(),
      message: 'Connected to Bullseye Real-Time Classroom Live Stream',
    }

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(initialPayload))
    }

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString())
        if (data.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }))
        }
      } catch {
        // Ignore unparseable client messages
      }
    })

    ws.on('error', (err) => {
      console.error(`[WebSocket Client Error from ${ip}]:`, err.message)
    })
  })

  // Periodic broadcast of live audio transcript snippets and checkpoint milestones
  const broadcastInterval = setInterval(() => {
    if (wss.clients.size === 0) return

    const snippet = liveAudioSnippets[currentSnippetIndex % liveAudioSnippets.length]
    currentSnippetIndex++

    const broadcastMessage = JSON.stringify({
      type: 'transcript_snippet',
      timestamp: new Date().toISOString(),
      audioTimestamp: snippet.timestamp,
      speaker: snippet.speaker,
      text: snippet.text,
      stepNumber: snippet.stepNumber,
      activeCheckpointTitle: seedCheckpoints[snippet.stepNumber - 1]?.title || 'Step In Progress',
      connectedClients: wss.clients.size,
    })

    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(broadcastMessage)
      }
    }
  }, 4000)

  // Cleanup on close
  wss.on('close', () => {
    clearInterval(broadcastInterval)
  })

  return { server, wss, broadcastInterval }
}

// If executed directly, start server
const isMain = process.argv[1] && (process.argv[1].endsWith('server.ts') || process.argv[1].endsWith('server.js'))

if (isMain || process.env.NODE_ENV !== 'test') {
  const { server } = createServerInstance()

  server.listen(PORT, HOST, () => {
    console.log(`🚀 [Bullseye Server] Running at http://${HOST}:${PORT}`)
    console.log(`📡 [Bullseye WebSocket] Live at ws://${HOST}:${PORT}/ws/live`)
    console.log(`✨ [WCAG 2.2 AA] Classroom Accessibility Layer Active`)
  })

  const shutdown = () => {
    console.log('\nGracefully shutting down Bullseye Server...')
    server.close(() => {
      console.log('HTTP & WebSocket server closed.')
      process.exit(0)
    })
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

