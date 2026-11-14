import { useState } from 'react'
import { ArrowRight, BookOpen, Compass } from 'lucide-react'
import './App.css'

// Synthetic fixture: never presented as teacher-authored or a live classroom feed.
const lecture = {
  course: 'Math 2B · Lecture 14',
  where: 'In this example, u = x² has been chosen for ∫₀¹ 2x·e^(x²) dx. The next step is to rewrite the limits.',
  next: 'Rewrite the limits in terms of u.',
  keep: 'du = 2x·dx. Change the limits — don’t substitute back to x. Give an exact value.',
}
const recap = [
  'The example begins with the definite integral ∫₀¹ 2x·e^(x²) dx.',
  'The chosen substitution is u = x², so du = 2x·dx.',
  'The factor 2x·dx is replaced by du. The limits still need to be expressed in u.',
  'Your next action is to work out u at x = 0 and at x = 1.',
]

function App() {
  const [draft, setDraft] = useState('')
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <div className="app">
      <a className="skip-link" href="#activity">Skip to activity</a>
      <header className="site-header">
        <span className="wordmark"><Compass size={24} aria-hidden="true" /> Signal</span>
        <span className="header-note">A clear place to begin again</span>
      </header>
      <main id="activity" tabIndex={-1}>
        <div className="activity-heading">
          <p className="eyebrow">{lecture.course}</p>
          <p className="sample-badge">Sample activity · prewritten content</p>
        </div>
        <article className="activity-card" aria-labelledby="next-action">
          <section className="orientation" aria-labelledby="orientation-title">
            <h2 id="orientation-title">Where we are</h2>
            <p>{lecture.where}</p>
          </section>
          <div className="task-body">
            <p className="eyebrow">Your next step</p>
            <h1 id="next-action">{lecture.next}</h1>
            <section className="requirements" aria-labelledby="requirements-title">
              <h2 id="requirements-title">What matters</h2>
              <p>{lecture.keep}</p>
            </section>
            <details className="catch-up">
              <summary>Help me rejoin <ArrowRight size={20} aria-hidden="true" /></summary>
              <div className="catch-up-content">
                <h2>A quick recap</h2>
                <p id="recap-hint">This demo shows the same prewritten recap for every response. It does not interpret your message or track a live class.</p>
                <form onSubmit={(event) => { event.preventDefault(); if (draft.trim()) setSubmitted(draft.trim()) }}>
                  <label htmlFor="remembered">What’s the last thing you remember?</label>
                  <input id="remembered" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="For example, choosing u = x²" aria-describedby="recap-hint" />
                  <button type="submit" disabled={!draft.trim()}>Show sample recap <ArrowRight size={20} aria-hidden="true" /></button>
                </form>
                <div role="status" aria-atomic="true">
                  {submitted !== null && <div className="recap-result"><p><strong>You noted:</strong> {submitted}</p><ol>{recap.map(point => <li key={point}>{point}</li>)}</ol><p className="recap-end">You’re back at the checkpoint shown above: rewrite the limits in terms of u.</p></div>}
                </div>
              </div>
            </details>
            <details className="source">
              <summary><BookOpen size={20} aria-hidden="true" /> View sample source text</summary>
              <div className="source-content">
                <p className="source-label">Synthetic fixture · version 1 · not teacher-verified</p>
                <blockquote><p>{lecture.where}</p><p>{lecture.next}</p><p>{lecture.keep}</p></blockquote>
                <p>This is the exact sample text used above, not a classroom transcript. Teacher-source ingestion and verification are planned features.</p>
              </div>
            </details>
          </div>
        </article>
        <footer className="activity-footer">Your pace. Your next step.<span>Demo only · no live AI · nothing saved</span></footer>
      </main>
    </div>
  )
}
export default App
