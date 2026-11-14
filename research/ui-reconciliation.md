# UI reconciliation · 14 November 2026

## Goal and scope
Apply the shared design system to the existing Math 2B sample on `design/now-first`. Both remote branches were fetched; `main` was already current and was merged into the diverged local design branch without losing either branch's commits. This is a UI, sample-copy and documentation slice. No backend, teacher verification, persistence or adaptive AI is implemented.

## Decisions and precedence
The UI standard and tokens are the implementation authority; this record defines the current demo scope. Earlier visual experiments and their verification results are historical, not instructions for the current app.

| Conflict | Selected | Set aside | Why |
|---|---|---|---|
| Reading layout | Centered 680px reading column; mint orientation and white task surface | Three equal-priority statements across a wide canvas | Keeps context, action and constraints in a stable reading order at every width. |
| Visual identity | Shared teal/mint/lavender tokens, Arial, sentence case | Monochrome/blue washes, Atkinson headline, oversized uppercase labels | One explicit standard across app and presentation; familiar typography without an efficacy claim. |
| Decoration | Static surfaces and no decorative movement | Particles, breathing symbol and gradients | Removes distraction and the unresolved need for a pause control. |
| Catch-up | Inline disclosure with an explicitly fixed sample recap | Floating custom dialog and simulated thinking animation | Keeps context accessible, uses native keyboard behavior, avoids implying adaptive AI. |
| Classroom stage | Recap stops at rewriting limits | Recap solving the integral and announcing the next topic | Both views describe one synthetic checkpoint; neither claims live class awareness. |
| Source provenance | Inspectable exact sample fixture, explicitly synthetic and not teacher-verified | Hidden source and unqualified source-grounded prototype claims | Makes the basis inspectable without fabricating a teacher transcript or verification. |
| Demo transparency | Persistent sample label and no-save/no-live-AI footer | Sample disclaimer only inside catch-up or accessible metadata | The initial screen communicates its limits before interaction. |
| Product scope | Retain the current Math 2B sample; future feature specifications stay future | Reintroducing old four-step controls or building teacher workflows during a UI task | Avoids expanding the requested UI work into a product/backend rebuild. |

## Current interaction
Read the sample orientation, next action and constraints. Expand Help me rejoin, enter a note and show the fixed recap. Blank submissions are disabled. The text explicitly says every response produces the same recap; the note is rendered as text. Expand View sample source text to inspect the exact synthetic fixture. Native disclosures keep focus on their controls and do not create modal focus obligations. No progress or notes survive reload; no network/model call is made.

## Acceptance
Build and lint must pass. Review desktop and 320px layouts, keyboard disclosure/form operation, visible focus, long notes and expanded source/recap. Essential content must not clip or move behind overlays. Review at enlarged text and with text-spacing overrides. Record actual outcomes in design-system/VERIFICATION.md. These checks do not establish WCAG conformance or learning benefit.

## Remaining product work
Teacher source ingestion and exact-span mappings, instructor review, ambiguity detection, saved progress, step navigation and reversible completion remain future features. The older discussion-task fixture and its constraints are retained in research/reference specimens; they are not requirements for the separate calculus fixture. Screen-reader and student testing remain required before accessibility or effectiveness claims.
