# Signal design foundation

Decision, 2026-11-14: prepare a focused React component foundation for Signal. No claim of clinically validated ADHD UI or demonstrated learning benefit. No external agent skill installed.

## Selected sources and packages
- Radix Primitives: https://github.com/radix-ui/primitives (MIT). Install only @radix-ui/react-accordion for progressive disclosure and keyboard/ARIA behavior. Documentation: https://www.radix-ui.com/primitives/docs/components/accordion . Library primitives do not guarantee accessibility of the finished app.
- Lucide: https://github.com/lucide-icons/lucide (ISC). lucide-react supplies individually imported SVG icons. Pair meaningful icons with visible words; decorative icons are hidden from assistive technology. https://lucide.dev/guide/react
- W3C cognitive accessibility: https://www.w3.org/WAI/WCAG2/supplemental/objectives/o5-user-focus/ and https://www.w3.org/WAI/people-use-web/tools-techniques/presentation/ . Guidance supports reducing interruptions and progressive disclosure; not a trial of Signal.
- Zhu, Yu, Luo (2026): https://arxiv.org/abs/2602.09381 . Co-design with 20 university students diagnosed with ADHD and interviews with five experts. Exploratory design evidence for cognitive scaffolding, reflective execution and emotional regulation; not efficacy evidence for our interface.
- https://arxiv.org/abs/2507.13309 describes diverse ADHD video-viewing preferences. Avoid assuming one universally helpful sensory presentation.

## Concrete product rules
1. Lead with Where we are / What matters / Your next step. Prefer short sentences and descriptive headings. Length targets are editorial heuristics, not psychological thresholds.
2. Preserve requirements, exceptions, deadlines and uncertainty. Shorter must not mean less accurate. Original source remains available.
3. Show one prominent next action. Let students choose overview or one-step mode, without a large settings panel.
4. Use consistent spacing and position, readable text, and restrained visual cues. Pair color with words/icons; no color-only status.
5. Make progress visible and reversible. No shame, streak penalties, forced timers or diagnostic labels.
6. No autoplay, confetti, moving backgrounds, auto-advancing steps or unexpected focus changes. Respect reduced-motion preferences if animation is introduced.
7. Keyboard operation, visible focus, reflow at narrow widths/zoom and contrast are acceptance checks, not optional polish. Test with assistive technology before making screen-reader support claims.
8. No special font, bionic-reading treatment, dopamine/color theory or gamification efficacy claims without relevant evidence and user validation.

## Implementation handoff
SourceDetails.tsx wraps Radix Accordion and a Lucide chevron, with readable static styles and a visible focus ring. It is a reusable component, not yet mounted in the starter app. Essential information must remain outside the collapsed source panel. Do not pass raw HTML from generated output.

Next slice: implement the catch-up screen and wire this component beneath source-grounded summaries. Use clearly labeled sample material until a real model endpoint is connected. The activity stage must be supplied by a teacher/user, not guessed as live classroom state.

Validation for this preparation: dependency install and production build. Browser interaction testing is still required when the component is mounted. Preserve event-rule provenance: existing generic scaffold predates theme reveal; seek organizer clarification or rebuild the scaffold after reveal without concealing history.
