# Now-First Design

The expanded [Signal design philosophy](design-philosophy.md) is the current companion to the [UI and slide standard](ui-standard.md). This original note preserves the early principles and historical mockup status; its color-accent and motion references do not override the current color-role and motion-free standard.

Coined by the Signal team on 2026-11-14 as our research-informed design philosophy, not a published clinical method.

**One-line pitch:** Signal puts the present first: where the class is, what matters, and one next action, while keeping original instructions and progress within reach.

1. **Anchor the present.** Class, activity and current step occupy a stable place. [W3C familiar and consistent design](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o1-understandable/).
2. **Make the next action clear.** Concise steps retain requirements and exceptions. [W3C clear step guidance](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p07-step-instructions/).
3. **Reveal detail on demand.** Short orientation does not replace the original teacher wording. [W3C presentation guidance](https://www.w3.org/WAI/people-use-web/tools-techniques/presentation/).
4. **Make returning easy.** Save the student's place, allow backtracking, and summarize context. [W3C memory guidance](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o6p05-low-cognition/) and [back/undo guidance](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p02-back-undo/).
5. **Give students control of attention.** No unsolicited interruptions; motion is peripheral, pausable, and disabled with reduced-motion preference. [W3C interruption guidance](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o5p01-minimal-interruptions/).

The interface also draws on [exploratory co-design with university students with ADHD](https://arxiv.org/abs/2602.09381). These sources inform our choices; they do not prove Signal improves learning or attention. [W3C's ADHD review](https://www.w3.org/TR/coga-user-research/) warns that evidence for specific assistive design techniques is often limited. Test the mockup with students before claiming effectiveness.

## Historical mockup — superseded

For the current Math 2B UI and selected decisions, see [UI reconciliation](ui-reconciliation.md). The checks below apply only to the earlier version.

React/Vite app in `app/`. Sample Biology case activity, current-step card, full overview, source disclosure, local step persistence, motion pause. No live AI or classroom state feed. Visual references are Google's spacious surfaces and color accents; this is an original Signal interface. Build verified; initial browser check verified overview, step advance and source disclosure. Browser review at narrow viewport showed content reflow. Further user feedback should guide revisions.
