import { useEffect, useRef } from 'react'

interface Particle {
  baseX: number
  baseY: number
  currX: number
  currY: number
  vx: number
  vy: number
  angle: number
  radius: number
  color: string
  opacity: number
}

// Google Antigravity dot palette mapped in a gentle radial spectrum
function getAntigravityDotColor(angle: number, ringIndex: number): string {
  const a = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
  const deg = (a * 180) / Math.PI

  // Left to Top-Left: Crisp Google Blue & Cyan
  // Top & Top-Right: Warm Amber & Coral Red
  // Right & Bottom-Right: Soft Violet & Purple
  // Bottom: Mint & Sage Green
  if (deg >= 40 && deg < 110) {
    return ringIndex % 2 === 0 ? '#FBBC04' : '#F29900' // Amber / Warm gold
  } else if (deg >= 110 && deg < 190) {
    return ringIndex % 2 === 0 ? '#34A853' : '#46820F' // Green / Sage
  } else if (deg >= 190 && deg < 270) {
    return ringIndex % 2 === 0 ? '#4285F4' : '#1A73E8' // Google Blue / Cyan
  } else if (deg >= 270 && deg < 330) {
    return ringIndex % 2 === 0 ? '#A142F4' : '#8430CE' // Purple / Violet
  } else {
    return ringIndex % 2 === 0 ? '#EA4335' : '#D93025' // Coral / Red
  }
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let mouseX = -9999
    let mouseY = -9999
    let targetMouseX = -9999
    let targetMouseY = -9999
    let particles: Particle[] = []

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const initParticles = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)

      const displayW = window.innerWidth
      const displayH = window.innerHeight
      const cx = displayW / 2
      const cy = displayH / 2

      particles = []

      // Concentric rings of clean circular dots
      const ringCount = 14
      // Safe boundary ensuring reading area is 100% clean and legible
      const minRadiusX = Math.min(displayW * 0.44, 490)
      const minRadiusY = Math.min(displayH * 0.38, 290)
      const maxRadiusX = Math.max(displayW * 0.88, 920)
      const maxRadiusY = Math.max(displayH * 0.88, 760)

      for (let r = 0; r < ringCount; r++) {
        const t = r / (ringCount - 1)
        const radX = minRadiusX + t * (maxRadiusX - minRadiusX)
        const radY = minRadiusY + t * (maxRadiusY - minRadiusY)

        // Denser in the periphery, sparser towards the center
        const count = Math.floor(18 + r * 13)

        for (let i = 0; i < count; i++) {
          const theta = (i / count) * Math.PI * 2 + (r % 2 ? 0.08 : 0) + (Math.random() - 0.5) * 0.05
          const rx = radX + (Math.random() - 0.5) * 18
          const ry = radY + (Math.random() - 0.5) * 18

          const bx = cx + Math.cos(theta) * rx
          const by = cy + Math.sin(theta) * ry

          const color = getAntigravityDotColor(theta, r)
          // Circular dots between 1.6px and 2.8px radius
          const radius = 1.6 + Math.random() * 1.2
          // Calming opacity
          const opacity = 0.22 + t * 0.32

          particles.push({
            baseX: bx,
            baseY: by,
            currX: bx,
            currY: by,
            vx: 0,
            vy: 0,
            angle: theta,
            radius,
            color,
            opacity,
          })
        }
      }
    }

    initParticles()

    const onResize = () => {
      initParticles()
      if (prefersReducedMotion) {
        drawFrame(0)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }

    const onPointerLeave = () => {
      targetMouseX = -9999
      targetMouseY = -9999
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    const drawFrame = (time: number) => {
      const displayW = window.innerWidth
      const displayH = window.innerHeight

      ctx.clearRect(0, 0, displayW, displayH)

      if (targetMouseX > -9000) {
        if (mouseX < -9000) {
          mouseX = targetMouseX
          mouseY = targetMouseY
        } else {
          mouseX += (targetMouseX - mouseX) * 0.1
          mouseY += (targetMouseY - mouseY) * 0.1
        }
      } else {
        mouseX = -9999
        mouseY = -9999
      }

      const cx = displayW / 2
      const cy = displayH / 2
      const parallaxX = mouseX > -9000 ? (mouseX - cx) * 0.012 : 0
      const parallaxY = mouseY > -9000 ? (mouseY - cy) * 0.012 : 0
      const ambientTime = time * 0.0008

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Gentle, calm ambient floating
        const breathe = Math.sin(ambientTime + i * 0.25) * 1.4
        const targetX = p.baseX + parallaxX + breathe * Math.cos(p.angle)
        const targetY = p.baseY + parallaxY + breathe * Math.sin(p.angle)

        // Interactive mouse deflection
        if (mouseX > -9000) {
          const dx = p.currX - mouseX
          const dy = p.currY - mouseY
          const distSq = dx * dx + dy * dy
          const maxDist = 130

          if (distSq < maxDist * maxDist && distSq > 0) {
            const dist = Math.sqrt(distSq)
            const force = (1 - dist / maxDist) * 15
            const pushAngle = Math.atan2(dy, dx)
            p.vx += Math.cos(pushAngle) * force * 0.15
            p.vy += Math.sin(pushAngle) * force * 0.15
          }
        }

        // Return with smooth damping
        p.vx += (targetX - p.currX) * 0.07
        p.vy += (targetY - p.currY) * 0.07
        p.vx *= 0.8
        p.vy *= 0.8

        p.currX += p.vx
        p.currY += p.vy

        // Render clean, anti-aliased circular dot
        ctx.beginPath()
        ctx.arc(p.currX, p.currY, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }
    }

    if (prefersReducedMotion) {
      drawFrame(0)
    } else {
      const loop = (time: number) => {
        drawFrame(time)
        animId = requestAnimationFrame(loop)
      }
      animId = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="antigravity-interactive-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
