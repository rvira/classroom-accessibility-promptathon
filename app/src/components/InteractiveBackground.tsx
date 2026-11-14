import { useEffect, useRef } from 'react'

interface Particle {
  baseX: number
  baseY: number
  currX: number
  currY: number
  vx: number
  vy: number
  angle: number
  length: number
  width: number
  color: string
  opacity: number
}

// Aligned with the Signal / Bullseye design system tokens:
// Forest/Sage green, Teal, Mint, Soft Slate, and subtle warm amber/lavender accents
function getStandardPaletteColor(angle: number, ringIndex: number): string {
  const a = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
  const deg = (a * 180) / Math.PI

  // Curated harmonious tones that preserve UI dignity and high legibility
  if (deg >= 45 && deg < 135) {
    return '#46820f' // Primary olive/sage green
  } else if (deg >= 135 && deg < 210) {
    return ringIndex % 2 === 0 ? '#005f60' : '#107e7d' // Deep Teal
  } else if (deg >= 210 && deg < 280) {
    return '#4f6b52' // Muted forest
  } else if (deg >= 280 && deg < 340) {
    return '#6b7280' // Slate ink mute
  } else {
    return ringIndex % 2 === 0 ? '#5a9e1e' : '#2d7a6e' // Bright sage & teal transition
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

      // Elliptical Antigravity radial field
      const ringCount = 13
      // Wide central clearance to guarantee that the 3-column workspace remains 100% legible
      const minRadiusX = Math.min(displayW * 0.42, 460)
      const minRadiusY = Math.min(displayH * 0.38, 280)
      const maxRadiusX = Math.max(displayW * 0.85, 900)
      const maxRadiusY = Math.max(displayH * 0.85, 750)

      for (let r = 0; r < ringCount; r++) {
        const t = r / (ringCount - 1)
        const radX = minRadiusX + t * (maxRadiusX - minRadiusX)
        const radY = minRadiusY + t * (maxRadiusY - minRadiusY)

        // Denser in the periphery, gracefully sparser near the center
        const count = Math.floor(16 + r * 11)

        for (let i = 0; i < count; i++) {
          const theta = (i / count) * Math.PI * 2 + (r % 2 ? 0.1 : 0) + (Math.random() - 0.5) * 0.04
          const rx = radX + (Math.random() - 0.5) * 16
          const ry = radY + (Math.random() - 0.5) * 16

          const bx = cx + Math.cos(theta) * rx
          const by = cy + Math.sin(theta) * ry

          // Tangential swirl orientation
          const tangent = theta + Math.PI / 2 + 0.14 + (Math.random() - 0.5) * 0.08
          const color = getStandardPaletteColor(theta, r)

          // Subdued, calming opacities per UI standards (0.18 to 0.48)
          const opacity = 0.18 + t * 0.3

          particles.push({
            baseX: bx,
            baseY: by,
            currX: bx,
            currY: by,
            vx: 0,
            vy: 0,
            angle: tangent,
            length: 4 + Math.random() * 3.5,
            width: 2 + Math.random() * 0.6,
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

        // Gentle, calm ambient drift
        const breathe = Math.sin(ambientTime + i * 0.25) * 1.2
        const targetX = p.baseX + parallaxX + breathe * Math.cos(p.angle)
        const targetY = p.baseY + parallaxY + breathe * Math.sin(p.angle)

        // Interactive mouse response: gentle deflection
        if (mouseX > -9000) {
          const dx = p.currX - mouseX
          const dy = p.currY - mouseY
          const distSq = dx * dx + dy * dy
          const maxDist = 130

          if (distSq < maxDist * maxDist && distSq > 0) {
            const dist = Math.sqrt(distSq)
            const force = (1 - dist / maxDist) * 14
            const pushAngle = Math.atan2(dy, dx)
            p.vx += Math.cos(pushAngle) * force * 0.15
            p.vy += Math.sin(pushAngle) * force * 0.15
          }
        }

        // Return to home position with smooth damping
        p.vx += (targetX - p.currX) * 0.07
        p.vy += (targetY - p.currY) * 0.07
        p.vx *= 0.8
        p.vy *= 0.8

        p.currX += p.vx
        p.currY += p.vy

        // Render rounded dash
        ctx.save()
        ctx.translate(p.currX, p.currY)
        ctx.rotate(p.angle)

        ctx.beginPath()
        ctx.lineCap = 'round'
        ctx.lineWidth = p.width
        ctx.strokeStyle = p.color
        ctx.globalAlpha = p.opacity

        ctx.moveTo(-p.length / 2, 0)
        ctx.lineTo(p.length / 2, 0)
        ctx.stroke()

        ctx.restore()
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
