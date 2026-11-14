import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeftRight,
  ArrowRight,
  Equal,
  HelpCircle,
  Info,
  LogOut,
  MoveHorizontal,
  Settings,
  Sigma,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import '@fontsource/atkinson-hyperlegible/700.css'
import './App.css'

/* Sample state from one Math 2B (Calculus) lecture on integrals.
   Synthetic, not a transcript, and no model is called. The visible copy is
   plain on purpose; the exact maths lives behind each small i button. */
const lecture = {
  course: 'Math 2B · Lecture 14 · Integrals',
  where: 'The class is on one integral problem. They just renamed a messy part with the letter u.',
  next: 'Change the start and end values.',
  keep: 'Change them too — don’t switch back. Give the exact answer.',
}

const catchUpSteps = [
  {
    icon: Sigma,
    text: 'The class is solving one integral together.',
    info: 'One worked example from today. You don’t need the earlier examples to follow this.',
  },
  {
    icon: ArrowLeftRight,
    text: 'They renamed a messy part of it with the letter u.',
    info: 'The messy part was x². Calling it u means you work with one letter instead of a whole expression.',
  },
  {
    icon: MoveHorizontal,
    text: 'The start and end numbers change with it.',
    info: 'The problem runs from a start value to an end value. When the letter changes, those two numbers change too.',
  },
  {
    icon: Equal,
    text: 'That left a much simpler problem to finish.',
    info: 'After the swap it is one short, standard step. Nothing new to learn here.',
  },
  {
    icon: ArrowRight,
    text: 'The answer is about 1.7. A new method starts next.',
    info: 'The value comes out around 1.7. Next the class moves to a different technique, so you can join there.',
  },
]

type Stage = 'ask' | 'steps'
type BlockKey = 'where' | 'next' | 'keep'

function Integral({ lower, upper, children }: { lower: string; upper: string; children: React.ReactNode }) {
  return (
    <span className="integral">
      <span className="int-glyph" aria-hidden="true">
        ∫
      </span>
      <span className="int-limits" aria-hidden="true">
        <span>{upper}</span>
        <span>{lower}</span>
      </span>
      <span className="int-body">{children}</span>
    </span>
  )
}

function Technical({ block }: { block: BlockKey }) {
  if (block === 'where') {
    return (
      <>
        <p className="tech-label">On the board</p>
        <p className="math-line" aria-hidden="true">
          <Integral lower="0" upper="1">
            2x·e<sup>x²</sup> dx
          </Integral>
        </p>
        <p className="math-line math-soft" aria-hidden="true">
          u = x², &nbsp;du = 2x·dx
        </p>
        <p className="sr-only">
          The board reads: the integral from 0 to 1 of 2x times e to the x squared, dx. Underneath it,
          u equals x squared and du equals 2x dx.
        </p>
      </>
    )
  }

  if (block === 'next') {
    return (
      <>
        <p className="tech-label">Limit change</p>
        <p className="math-line" aria-hidden="true">
          x = 0 &nbsp;→&nbsp; u = 0
        </p>
        <p className="math-line" aria-hidden="true">
          x = 1 &nbsp;→&nbsp; u = 1
        </p>
        <p className="math-line math-soft" aria-hidden="true">
          <Integral lower="0" upper="1">
            2x·e<sup>x²</sup> dx
          </Integral>
          &nbsp;=&nbsp;
          <Integral lower="0" upper="1">
            e<sup>u</sup> du
          </Integral>
        </p>
        <p className="sr-only">
          The start and end values are rewritten in u: x equals 0 becomes u equals 0, and x equals 1
          becomes u equals 1. The integral from 0 to 1 of 2x times e to the x squared, dx becomes the
          integral from 0 to 1 of e to the u, du.
        </p>
      </>
    )
  }

  return (
    <>
      <p className="tech-label">Exact value</p>
      <p className="math-line" aria-hidden="true">
        <Integral lower="0" upper="1">
          e<sup>u</sup> du
        </Integral>
        &nbsp;=&nbsp; e − 1 ≈ 1.718
      </p>
      <p className="tech-note">Evaluated in u. x never comes back.</p>
      <p className="sr-only">
        The integral from 0 to 1 of e to the u, du equals e minus 1, about 1.718. It is evaluated in u,
        so x is never substituted back.
      </p>
    </>
  )
}

function App() {
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState<Stage>('ask')
  const [draft, setDraft] = useState('')
  const [answer, setAnswer] = useState('')
  const [openInfo, setOpenInfo] = useState<number | null>(null)
  const [openTech, setOpenTech] = useState<BlockKey | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const close = () => {
    setOpen(false)
    setStage('ask')
    setOpenInfo(null)
  }

  useEffect(() => {
    if (!open || stage !== 'ask') return
    // Defer past the click that opened the sheet; otherwise the browser
    // hands focus back to the body after the trigger unmounts.
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [open, stage])

  useEffect(() => {
    if (!profileOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [profileOpen])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (profileOpen) {
        setProfileOpen(false)
        return
      }
      if (openInfo !== null) {
        setOpenInfo(null)
        return
      }
      if (openTech !== null) {
        setOpenTech(null)
        return
      }
      if (open) {
        setOpen(false)
        setStage('ask')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, openInfo, openTech, profileOpen])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const value = draft.trim()
    if (!value) return
    setAnswer(value)
    setDraft('')
    setStage('steps')
  }

  const blocks: { key: BlockKey; label: string }[] = [
    { key: 'where', label: 'Where we are' },
    { key: 'next', label: 'Next' },
    { key: 'keep', label: 'Keep in mind' },
  ]

  const shell = ['app']
  if (open) shell.push('sheet-open')
  if (open && stage === 'steps') shell.push('sheet-steps')

  const dock = ['dock']
  if (open) dock.push('open')
  if (open && stage === 'steps') dock.push('steps')

  return (
    <div className={shell.join(' ')}>
      <header className="top-bar">
        <div className="profile-container" ref={profileRef}>
          <button
            type="button"
            className="profile-btn"
            aria-expanded={profileOpen}
            aria-haspopup="true"
            aria-label="Account, profile and settings"
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            <User size={18} aria-hidden="true" />
          </button>

          {profileOpen && (
            <div className="profile-menu" role="menu" aria-label="Account menu">
              <div className="profile-menu-header">
                <span className="profile-name">Student Account</span>
                <span className="profile-status">Math 2B · Active</span>
              </div>
              <hr className="profile-divider" />
              <button
                type="button"
                role="menuitem"
                className="profile-menu-item"
                onClick={() => setProfileOpen(false)}
              >
                <User size={15} aria-hidden="true" />
                <span>Profile</span>
              </button>
              <button
                type="button"
                role="menuitem"
                className="profile-menu-item"
                onClick={() => setProfileOpen(false)}
              >
                <Settings size={15} aria-hidden="true" />
                <span>Settings</span>
              </button>
              <button
                type="button"
                role="menuitem"
                className="profile-menu-item"
                onClick={() => setProfileOpen(false)}
              >
                <Sparkles size={15} aria-hidden="true" />
                <span>Accessibility Preferences</span>
              </button>
              <button
                type="button"
                role="menuitem"
                className="profile-menu-item"
                onClick={() => setProfileOpen(false)}
              >
                <HelpCircle size={15} aria-hidden="true" />
                <span>Help &amp; Resources</span>
              </button>
              <hr className="profile-divider" />
              <button
                type="button"
                role="menuitem"
                className="profile-menu-item profile-logout"
                onClick={() => setProfileOpen(false)}
              >
                <LogOut size={15} aria-hidden="true" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="ether" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} />
        ))}
      </div>

      <main>
        <div className="workspace">
          <p className="course">{lecture.course}</p>

          <div className="symbol bullseye" aria-hidden="true">
            <b />
            <b />
            <b />
          </div>

          <section className="row" aria-label="Sample classroom activity">
            <div className="block">
              <div className="kicker-row">
                <h2 className="kicker">{blocks[0].label}</h2>
                <button
                  type="button"
                  className="block-info"
                  aria-expanded={openTech === 'where'}
                  aria-label="Show the technical version of where we are"
                  onClick={() => setOpenTech(openTech === 'where' ? null : 'where')}
                >
                  <Info size={15} aria-hidden="true" />
                </button>
              </div>
              <p className="context">{lecture.where}</p>
            </div>

            <div className="block">
              <div className="kicker-row">
                <h2 className="kicker">{blocks[1].label}</h2>
                <button
                  type="button"
                  className="block-info"
                  aria-expanded={openTech === 'next'}
                  aria-label="Show the technical version of the next step"
                  onClick={() => setOpenTech(openTech === 'next' ? null : 'next')}
                >
                  <Info size={15} aria-hidden="true" />
                </button>
              </div>
              <h1 className="action" aria-live="polite">
                {lecture.next}
              </h1>
            </div>

            <div className="block">
              <div className="kicker-row">
                <h2 className="kicker">{blocks[2].label}</h2>
                <button
                  type="button"
                  className="block-info"
                  aria-expanded={openTech === 'keep'}
                  aria-label="Show the technical version of what to keep in mind"
                  onClick={() => setOpenTech(openTech === 'keep' ? null : 'keep')}
                >
                  <Info size={15} aria-hidden="true" />
                </button>
              </div>
              <p className="constraints">{lecture.keep}</p>
            </div>
          </section>
        </div>
      </main>

      {openTech !== null && (
        <div className="tech-card" role="dialog" aria-label="Technical version">
          <div className="tech-head">
            <span>Technical version</span>
            <button
              type="button"
              className="tech-close"
              onClick={() => setOpenTech(null)}
              aria-label="Close technical version"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
          <Technical block={openTech} />
        </div>
      )}

      <div className={dock.join(' ')}>
        {!open ? (
          <button
            type="button"
            className="dock-trigger"
            onClick={() => {
              setOpenTech(null)
              setOpen(true)
            }}
          >
            Catch me up
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        ) : (
          <div className="sheet" role="dialog" aria-label="Catch me up">
            <div className="sheet-head">
              <span className="sheet-title">Catch me up</span>
              <button
                type="button"
                className="sheet-close"
                onClick={close}
                aria-label="Close catch up"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {stage === 'ask' ? (
              <form className="ask" onSubmit={submit}>
                <p className="question">What’s the last thing you remember?</p>

                <div className="answer-line">
                  {draft === '' && <span className="caret" aria-hidden="true" />}
                  <label className="sr-only" htmlFor="remembered">
                    What’s the last thing you remember?
                  </label>
                  <input
                    id="remembered"
                    ref={inputRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>

                <p className="hint">Type it, then press Enter</p>
                <p className="sample-note">Demo script, not live AI.</p>
              </form>
            ) : (
              <>
                <div className="steps-stage">
                  <p className="remembered">You remembered: “{answer}”</p>
                  <ol className="steps" aria-live="polite">
                    {catchUpSteps.map((step, index) => {
                      const Icon = step.icon
                      return (
                        <li key={step.text}>
                          <span className="step-icon" aria-hidden="true">
                            <Icon size={20} strokeWidth={2} />
                          </span>
                          <span className="step-text">
                            <span className="step-num" aria-hidden="true">
                              {index + 1}
                            </span>
                            {step.text}
                          </span>
                          <button
                            type="button"
                            className="step-info"
                            aria-expanded={openInfo === index}
                            aria-label={`Explain step ${index + 1}`}
                            onClick={() => setOpenInfo(openInfo === index ? null : index)}
                          >
                            <Info size={14} aria-hidden="true" />
                          </button>
                        </li>
                      )
                    })}
                  </ol>
                </div>

                {openInfo !== null && (
                  <div className="clarify" role="status">
                    <div className="clarify-head">
                      <span>In plain words</span>
                      <button
                        type="button"
                        className="clarify-close"
                        onClick={() => setOpenInfo(null)}
                        aria-label="Close explanation"
                      >
                        <X size={14} aria-hidden="true" />
                      </button>
                    </div>
                    <p>{catchUpSteps[openInfo].info}</p>
                  </div>
                )}

                <div className="steps-foot">
                  <button type="button" className="back-to-lecture" onClick={close}>
                    Back to the lecture
                  </button>
                  <p className="sample-note">Demo script, not live AI.</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
