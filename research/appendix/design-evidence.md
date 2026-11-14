# Evidence to design, and usable pitch wording

Source IDs refer to [sources.md](sources.md). Proposed behavior is not necessarily implemented.

| Proposed Signal behavior | Basis | What we still need to test |
|---|---|---|
| Concise next-step instruction; no omitted exceptions | S1 | Compare every output with a manually defined requirement list |
| Expandable original material | S3 | Can students find detail without losing their place? |
| No automatic audio, popups or advancing steps | S2, S4 | Keyboard/focus stability and interruption behavior |
| Where we are / What matters / Your next step | Our hypothesis informed by S1, S5 | Does it help students resume more easily than the original instructions? |
| Overview or one-step view | S3, S6 inform student control | Which view fits which task, and can students switch easily? |
| Source-linked requirements and explicit unknowns | Our AI reliability design decision | Omissions, invented details, incorrect source associations and missed ambiguity |
| Readable contrast, text labels with icons, visible focus | General accessibility implementation requirements | Contrast, keyboard, zoom/reflow and assistive-technology checks; library use alone is insufficient |

## Ready-to-use slide text
**Research-informed accessibility:** Signal applies W3C cognitive-accessibility guidance on clear steps, progressive disclosure and user control of interruptions. [S1–S4]

**Designed around real needs:** Exploratory research with university students with ADHD informed our focus on orientation, manageable actions and student control. [S5] Research on video customization also cautions against assuming one presentation suits everyone. [S6]

**Honest next step:** We still need to evaluate whether Signal helps students resume classroom activities more easily and whether its summaries preserve every important requirement.

Short spoken version: “We designed Signal around W3C cognitive-accessibility guidance and research involving people with ADHD. That informed clear steps, optional detail, and control over distractions. Our next step is testing those choices with students.”

## Do not claim
- Signal treats, solves or diagnoses ADHD.
- Signal is clinically proven, universally ADHD-friendly or WCAG-certified.
- A particular font, color palette, word count or animation is psychologically proven to improve focus.
- 21% of all college students have ADHD, or 21% would benefit from Signal.
- A short summary always preserves meaning, or a source link guarantees correctness.

## Evaluation plan (not results)
Test simple, exception-heavy and ambiguous classroom instructions. Record omissions and inventions against human-authored expected requirements. Compare original instructions and Signal in a small voluntary usability exercise, counterbalancing order where feasible; ask participants to locate the next action and constraints. Record errors, completion time and perceived effort, with consent. Small convenience samples provide early feedback, not generalizable efficacy. Log accessibility checks and actual AI prompt iterations separately.
