import { useEffect, useRef, useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import '@fontsource/atkinson-hyperlegible/700.css'
import './App.css'

/* Sample state from one Math 2B (Calculus) lecture on substitution for
   definite integrals. Synthetic, not a transcript, no model is called. */
const lecture = {
  course: 'Math 2B · Lecture 14 · Substitution',
  where:
    'Dr. Alvarez just wrote u = x² under ∫₀¹ 2x·e^(x²) dx. The class is rewriting the limits next.',
  next: 'Rewrite the limits in terms of u.',
  keep: 'du = 2x·dx. Change the limits — don’t substitute back to x. Exact value.',
}

const catchUpPoints = [
  'The class is evaluating the definite integral ∫₀¹ 2x·e^(x²) dx.',
  'Substitution is u = x², so du = 2x·dx — the 2x·dx is exactly what is left in the integrand.',
  'The limits move with the variable: x = 0 gives u = 0, and x = 1 gives u = 1.',
  'So the integral becomes ∫₀¹ e^u du, which is e^u evaluated from 0 to 1.',
  'That gives e − 1 ≈ 1.718. Next up: integration by parts.',
]

type Message = { role: 'guide' | 'user'; text: string; points?: string[] }

const opening: Message = {
  role: 'guide',
  text: 'You’re in Math 2B, lecture 14 — substitution for definite integrals. What’s the last thing you remember?',
}

function App() {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [thread, setThread] = useState<Message[]>([opening])
  const [thinking, setThinking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const node = threadRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [thread, thinking])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const send = (event: React.FormEvent) => {
    event.preventDefault()
    const answer = draft.trim()
    if (!answer || thinking) return
    setThread((prev) => [...prev, { role: 'user', text: answer }])
    setDraft('')
    setThinking(true)
    timer.current = window.setTimeout(() => {
      setThread((prev) => [
        ...prev,
        {
          role: 'guide',
          text: 'Got it — you’re closer than you think. Here’s the thread to where the class is now:',
          points: catchUpPoints,
        },
      ])
      setThinking(false)
    }, 700)
  }

  return (
    <div className={open ? 'app sheet-open' : 'app'}>
      <div className="ether" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} />
        ))}
      </div>

      <main>
        <div className="workspace">
          <p className="course">{lecture.course}</p>

          <div className="symbol" aria-hidden="true">
            <b />
            <b />
            <b />
          </div>

          <section className="row" aria-label="Sample classroom activity">
            <div className="block">
              <h2 className="kicker">Where we are</h2>
              <p className="context">{lecture.where}</p>
            </div>

            <div className="block">
              <h2 className="kicker">Next</h2>
              <h1 className="action" aria-live="polite">
                {lecture.next}
              </h1>
            </div>

            <div className="block">
              <h2 className="kicker">Keep in mind</h2>
              <p className="constraints">{lecture.keep}</p>
            </div>
          </section>
        </div>
      </main>

      <div className={open ? 'dock open' : 'dock'}>
        {!open ? (
          <button type="button" className="dock-trigger" onClick={() => setOpen(true)}>
            Catch me up
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        ) : (
          <div
            className="sheet"
            role="dialog"
            aria-label="Catch me up"
          >
            <div className="sheet-head">
              <span className="sheet-title">Catch me up</span>
              <button
                type="button"
                className="sheet-close"
                onClick={() => setOpen(false)}
                aria-label="Close catch up"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="thread" ref={threadRef} aria-live="polite">
              {thread.map((message, index) => (
                <div key={index} className={`bubble ${message.role}`}>
                  <p>{message.text}</p>
                  {message.points && (
                    <ol>
                      {message.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ol>
                  )}
                </div>
              ))}
              {thinking && (
                <div className="bubble guide thinking">
                  <span />
                  <span />
                  <span />
                  <em>finding your place</em>
                </div>
              )}
            </div>

            <form className="composer" onSubmit={send}>
              <label className="sr-only" htmlFor="remembered">
                What’s the last thing you remember?
              </label>
              <input
                id="remembered"
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="e.g. the u = x² part…"
                autoComplete="off"
              />
              <button type="submit" disabled={!draft.trim() || thinking}>
                Send
              </button>
            </form>

            <p className="sample-note">Sample script for the demo — not live AI.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
