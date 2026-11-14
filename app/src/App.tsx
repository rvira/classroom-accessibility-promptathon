import { useState } from 'react'
import { ArrowRight, ArrowLeft, BookOpen, Check, ChevronRight, CircleHelp, Focus, RotateCcw, Sparkles, X } from 'lucide-react'
import { SourceDetails } from './components/SourceDetails'
import './App.css'

const original = 'Work in pairs. Read paragraphs 2 and 3 of the case. Choose ONE explanation for the outcome and cite two details from the text. Do not use outside sources. Discuss for eight minutes. Submit one response per pair before class ends. If your partner is absent, work alone. Upload it to the usual place.'
const steps = [
  { title: 'Read the case', action: 'Read paragraphs 2 and 3.', context: 'Start with the assigned reading.', source: 'Read paragraphs 2 and 3 of the case.' },
  { title: 'Choose your explanation', action: 'Pick one explanation for the outcome.', context: 'Your group is deciding what happened in the case.', source: 'Choose ONE explanation for the outcome and cite two details from the text.' },
  { title: 'Find your evidence', action: 'Find two details in the text that support it.', context: 'You have chosen one explanation. Now support it.', source: 'Choose ONE explanation for the outcome and cite two details from the text.' },
  { title: 'Discuss and submit', action: 'Discuss for eight minutes, then submit one response.', context: 'You have an explanation and two supporting details.', source: 'Discuss for eight minutes. Submit one response per pair before class ends.' },
]

function App() {
  const [step, setStep] = useState(() => Math.min(Number(localStorage.getItem('signal-step') || 1), steps.length - 1))
  const [view, setView] = useState<'now' | 'overview'>('now')
  const [showHelp, setShowHelp] = useState(false)
  const [motionPaused, setMotionPaused] = useState(false)
  const current = steps[step]
  const changeStep = (next: number) => {
    const safe = Math.max(0, Math.min(steps.length - 1, next))
    setStep(safe)
    localStorage.setItem('signal-step', String(safe))
    setView('now')
  }

  return <div className="page">
    <header className="topbar"><div className="brand"><span className="brand-mark"><Sparkles size={18} strokeWidth={2.2} /></span> signal<span className="brand-dot">.</span></div><span className="demo-tag">INTERACTIVE CONCEPT</span><button className="help-button" onClick={() => setShowHelp(true)} aria-label="About Signal"><CircleHelp size={21}/></button></header>
    <main className="stage">
      <div className={motionPaused ? "aura paused" : "aura"} aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
      <div className="content">
        <div className="eyebrow"><span className="live-dot"/> A QUIETER WAY BACK IN</div>
        <h1>Lost the thread?<br/><span>Find your way back.</span></h1>
        <p className="lede">No scrolling through a conversation. Just what matters right now.</p>
        <section className="activity" aria-label="Current classroom activity">
          <div className="activity-top"><span className="course"><BookOpen size={16}/> BIOLOGY 101 <span className="divider">/</span> CASE DISCUSSION</span><span className="sample">SAMPLE ACTIVITY</span></div>
          <div className="activity-intro"><div><span className="section-kicker">YOUR PLACE</span><h2>{view === 'now' ? 'Right here, right now.' : 'The whole activity.'}</h2></div><button className="view-switch" onClick={() => setView(view === 'now' ? 'overview' : 'now')}>{view === 'now' ? 'See all steps' : 'Back to now'} <ChevronRight size={17}/></button></div>
          {view === 'now' ? <>
            <div className="progress-label"><span>STEP {step + 1} OF {steps.length}</span><span>{Math.round((step / steps.length) * 100)}% complete</span></div><div className="progress-track"><span style={{width: `${(step / steps.length) * 100}%`}}/></div>
            <div className="now-card"><span className="card-icon"><Focus size={27}/></span><div><span className="section-kicker">WHERE WE ARE</span><p>{current.context}</p><span className="section-kicker next-label">YOUR NEXT STEP</span><h3>{current.action}</h3></div></div>
            <div className="matters"><span className="matter-icon"><Sparkles size={18}/></span><div><strong>What matters</strong><p>Use only the case text. Choose one explanation and cite two details. Submit one response per pair before class ends.</p></div></div>
            <div className="actions"><button className="primary" onClick={() => changeStep(step + 1)} disabled={step === steps.length - 1}>{step === steps.length - 1 ? 'Last step' : 'Mark done & continue'} <ArrowRight size={18}/></button>{step > 0 && <button className="quiet" onClick={() => changeStep(step - 1)}><ArrowLeft size={16}/> Previous step</button>}</div>
            <div className="source-wrap"><SourceDetails label="Why this step? See the original"><p><strong>Relevant instruction:</strong> “{current.source}”</p><p className="source-full"><strong>Full activity:</strong> {original}</p></SourceDetails></div>
          </> : <div className="overview">{steps.map((item, index) => <button key={item.title} className={index === step ? 'overview-step active' : 'overview-step'} onClick={() => changeStep(index)}><span className="step-circle">{index < step ? <Check size={15}/> : index + 1}</span><span><strong>{item.title}</strong><small>{item.action}</small></span><ChevronRight size={17}/></button>)}<div className="uncertainty"><CircleHelp size={18}/><span>“The usual place” isn’t specified. Check with your instructor before uploading.</span></div><SourceDetails>{original}</SourceDetails></div>}
        </section>
        <div className="below"><span><span className="tiny-orb"/> Take a breath. Pick up where you left off.</span><div className="below-controls"><button onClick={() => setMotionPaused(!motionPaused)}>{motionPaused ? 'Play motion' : 'Pause motion'}</button><button onClick={() => { changeStep(1); setView('now') }}><RotateCcw size={14}/> Reset demo</button></div></div>
      </div>
    </main>
    <footer>Made to help anyone rejoin the moment. Designed with attention challenges in mind.</footer>
    {showHelp && <div className="modal-backdrop" onClick={() => setShowHelp(false)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="about-title" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowHelp(false)} aria-label="Close"><X size={20}/></button><span className="section-kicker">ABOUT SIGNAL</span><h2 id="about-title">A place to find the present.</h2><p>Signal turns classroom instructions into a clear current step, while keeping the teacher's original words available. This is a sample interface, not a live classroom connection or AI result.</p><button className="primary" onClick={() => setShowHelp(false)}>Back to activity <ArrowRight size={18}/></button></div></div>}
  </div>
}
export default App