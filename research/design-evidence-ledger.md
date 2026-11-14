# Signal design evidence ledger

Branch: `design/now-first`. Update this file in every design commit that adds or changes a visible component or interaction. Status as of 2026-11-14: local sample mockup, not validated with students. **Research-informed** means the source supports the general design principle; it does not prove this particular implementation helps ADHD.

| Component / feature | Decision in current mockup | Research or origin | Evidence boundary / test |
|---|---|---|---|
| Pure white canvas | Flat white, no gradient; no bounded card behind current activity | Jatin's stated visual direction; uncluttered layout is consistent with [W3C clear-content guidance](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/) | Exact color is aesthetic preference, not an ADHD finding. Test readability and contrast. |
| Black typography and button | High contrast, clear hierarchy | [WCAG contrast guidance](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html); Jatin's visual direction | Measure actual contrast and test at zoom. |
| Wordmark and small course label | Minimal identity; stable classroom orientation | [W3C familiar/consistent design](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o1-understandable/) | Exact logo is original design, not evidence-based. |
| White space around one surface | Current task occupies an unboxed central reading area | [W3C clear content](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/) and [help users focus](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o5-user-focus/) | Test on phone, desktop and zoom; blankness should not conceal navigation. |
| Sparse muted-color particles | Six small, slow peripheral particles in muted colors | Jatin's visual direction; no ADHD efficacy claim | Potential distraction: manual Pause motion and reduced-motion support; test whether motion distracts. Test with users. [W3C interruption guidance](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o5p01-minimal-interruptions/). |
| Large circular symbol | Draws eye to the current content and rotates slowly | Original visual hypothesis; Jatin requested large simple visuals | User-requested visual hypothesis, not ADHD evidence. Pause and reduced-motion stop the animation; ask users whether it orients or distracts. |
| `NOW · STEP n OF 4` | Stable location and visible progress | [W3C familiar/consistent design](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o1-understandable/); [W3C memory guidance](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o6p05-low-cognition/) | Current stage is sample/user state; app cannot infer live class position. |
| `WHERE WE ARE` | One sentence of context | [W3C help users refocus](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o5-user-focus/) and exploratory [ADHD student co-design](https://arxiv.org/abs/2602.09381) | Wording and utility require student testing. |
| `DO THIS NEXT` | One prominent verb-led action | [W3C clear step instructions](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p07-step-instructions/) | Manually check no requirements or exceptions are omitted. |
| `Keep in mind` | Key constraints remain visible | [W3C steps without omissions](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p07-step-instructions/) | Current text is sample editorial content; compare against teacher original. |
| Done / next and previous | Progression with backtracking | [W3C back and undo](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p02-back-undo/) | The final step currently stops; completion state is future work. |
| All steps | Optional overview instead of a scrolling chat | [W3C presentation/progressive disclosure](https://www.w3.org/WAI/people-use-web/tools-techniques/presentation/) and Jatin's direction | Test discoverability and switching cost. |
| Original teacher words | Disclosure keeps source accessible | [W3C presentation guidance](https://www.w3.org/WAI/people-use-web/tools-techniques/presentation/) and [clear steps](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p07-step-instructions/) | Source access does not guarantee summary correctness. |
| Unclear upload destination | Question is visible in overview | Product safety hypothesis; teacher source says only “usual place” | Test whether student sees ambiguity at the moment it matters; never invent destination. |
| Local step persistence | Returning shows recorded step | [W3C memory guidance](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o6p05-low-cognition/) | Browser-local only; clearing storage loses it. Teacher changes are not synced. |
| Pause motion | Student can stop particles; reduced-motion stops them automatically | [W3C interruption guidance](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o5p01-minimal-interruptions/) | Motion preference currently resets on reload. Also pauses circle rotation. |
| Reset sample | Reversible demo control | Demonstration convenience; [W3C undo guidance](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p02-back-undo/) | Not a student workflow requirement. |

Pitch name: **Now-First Design** is our coined synthesis, not a published clinical intervention. See [philosophy](now-first-design.md) and [source appendix](appendix/README.md). No measured ADHD benefit, comprehension improvement or WCAG conformance claim yet.

## Reference and typography decision (2026-11-14)

[Bold icons and font review](bold-icons-font-review.md): preserve black/white, strengthen the current-action headline, use only familiar icons paired with text, and retain Arial for the MVP pending user testing. W3C supports clear signposts and selective icons; no specific font is proven best for college students with ADHD. This review changes the design rationale, not the rendered app.

## Horizontal serif revision (2026-11-14, 2:45 PM)

- **Layout:** the three statements sit side by side in a three-column grid spanning up to 1560 px, with the labels sharing one baseline. The vertical stack was reported as cluttered; horizontal placement and wide gutters are a user preference, not a research finding.
- **Type pairing:** Times New Roman now carries the labels, context, constraints and button; Atkinson Hyperlegible 700 is reserved for the central next action only. This is an aesthetic choice by the user. Times New Roman is familiar and widely available, but [W3C typography research](https://www.w3.org/TR/coga-user-research/) does not establish any font as best for this population, and the serif/sans contrast is untested with students.
- **`Catch me up` now means catch up to the lecture:** one control in the centre column moves the sample to the point the class has reached. The lecture position is sample state, not a live feed, and no model is called.
- **Narrow screens** collapse to a single column below 760 px; the horizontal layout is desktop only.

Verification: build passes; column labels align at one baseline; 1600×900 fits with no page scroll or horizontal overflow; 390×844 fits and collapses; `Catch me up` advances all four states and wraps; step survives reload.

## Statement-only revision (2026-11-14, 2:35 PM)

User direction: the previous screen read like onboarding chrome rather than the interface. The UI is now three statements and one action on the open field.

- **Kept:** `Where we are`, `Do this next` (the largest type on screen), `Keep in mind`, the circular mark, the blue-white ether, and the drifting particles. The single control is `Catch me up`, which advances through four sample states and wraps, so the demo cannot dead-end.
- **Removed on user direction:** step counter (`NOW · STEP 2 OF 4`), `All steps` overview, activity/course label, `Classroom · sample` badge, `See the teacher’s words` disclosure, `Pause motion`, `Reset sample`.
- **Type scale:** nothing renders below 20 px at desktop (kickers 20 px, context 32 px, constraints 25.6 px, next action up to 80 px); mobile floors at 16.8 px. No grey fine print; hierarchy comes from size and weight alone. [W3C clear steps](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p07-step-instructions/) still supports one complete action; the exact scale is our visual hypothesis.
- **Known regression, open:** removing `Pause motion` drops the student’s control over the particles that [W3C limit interruptions](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o5p01-minimal-interruptions/) motivates. `prefers-reduced-motion` still stops all motion, but a sighted student who dislikes the particles can no longer stop them. Restore a control before claiming interruption control.
- **Known regression, open:** with the source disclosure gone, the screen no longer shows the teacher’s exact wording. Every line on screen is still a faithful substring of the synthetic fixture, but a reviewer cannot check that in the product. This weakens the source-grounded claim until the quotes return.
- **Honesty:** the fixture is synthetic and no model is called. The `sample` marker moved out of the visual field on user direction (page `<title>` and the section’s accessible name still say sample classroom activity). Do not present this screen as live AI output in the pitch.

Verification: build passes; 1600×900 fits with `Catch me up` in view; 390×844 has no horizontal overflow; clicking `Catch me up` cycles all four states and wraps; step survives reload.

## Ether revision (2026-11-14, 2:20 PM)

- **One open field, no panel:** the activity now sits directly on a soft blue radial wash on white, modeled on the user-supplied Gemini home-screen reference (no sidebars, no boxes, no dividers around the activity). The `surface` element has no border, background or padding. [W3C clear-content guidance](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/) supports hierarchy through spacing; the exact halo treatment is our visual hypothesis, not an ADHD finding.
- **Everything above the fold:** at 1600×900 the step label, context, next action, constraints, primary button and source control are all visible without scrolling; measured `scrollHeight` equals the viewport height. Previously the constraints and both buttons fell below the fold, which contradicted our own rule that essential requirements must never be hidden.
- **Atkinson Hyperlegible retained** for headings and body at 400/700. The headline is still bold for emphasis; the reference’s light weight was not adopted because [W3C clear steps](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p07-step-instructions/) favors unambiguous, quickly locatable actions. Preference remains untested with students.
- **Particles:** nine muted pastel dots drift slowly across the full viewport (26 s alternating, 0.35–0.5 opacity, 0.5 px blur), sized 3–6 px. They are peripheral and low contrast by design; no claim that they hold attention. Pause motion and `prefers-reduced-motion` both stop them, and also stop the circle’s slow breathe/rotate.
- **Small-text contrast:** the eyebrow labels, course line, sample badge, top line, quote labels and footer controls moved from `--ink-faint` (#8a93a1, about 3:1 on the wash) to `--ink-soft` (#565f6d) so orientation text and the **sample** honesty badge meet AA for normal text. Hierarchy now comes from size and weight rather than low contrast.
- **Favicon:** inline SVG mark replaces the missing `/favicon.ico` 404 seen in the browser console.

Verification: production build passes; desktop 1600×900 and mobile 390×844 screenshots reviewed; no horizontal overflow at 390 px; no console errors after the change. Not verified: screen-reader behavior, real projector contrast, and any student preference — all still open.

## Open-canvas revision (2026-11-14)

- **Atkinson Hyperlegible:** loaded locally from @fontsource/atkinson-hyperlegible at weights 400 and 700. [Braille Institute](https://www.brailleinstitute.org/freefont/) designed it for distinct characters in low-vision reading; it is a user-requested typography trial, not proven best for ADHD. Compare readability with the prior Arial version in user testing.
- **No card boundary:** removed border and shadow so content sits directly on a white field, per Jatin's screenshot and direction. [W3C clear-content guidance](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/) supports clear hierarchy and spacing; the exact open-canvas treatment is our visual hypothesis.
- **Centered current action:** larger bold words and a short context line. [W3C clear steps](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p07-step-instructions/) supports concise, complete instructions. Test whether the centered line breaks improve scanning.
- **Muted particles and slow circle:** user-requested attention cue, with no efficacy claim. [W3C limit interruptions](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o5p01-minimal-interruptions/) motivates the Pause control and reduced-motion behavior. Student testing must establish whether motion helps or distracts.