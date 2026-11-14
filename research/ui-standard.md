# Signal UI and slide standard · v1.1

Proposed reference, 14 November 2026. Scope: the Signal classroom-instruction candidate. This does not record team selection, clinical benefit, or WCAG certification. The Math 2B sample now adopts the visual foundations; the full proposed product flow remains future work. See [UI reconciliation](ui-reconciliation.md) for decisions and scope.

**Design intent:** warm off-white canvas, white reading surfaces, dark ink text and a deep-teal primary action. Pale mint anchors the current step; lavender distinguishes original-source detail. UI and slides share these semantic roles, Arial typography, borders, shapes, vocabulary and hierarchy. At the user's direction, this revision sets aside the earlier monochrome constraint in [the font review](bold-icons-font-review.md). “Now-First” remains the team's design philosophy, not a validated intervention.

## Start here

- [Design philosophy](design-philosophy.md): why the system looks and behaves this way, including decision rules and a slide-ready statement.

- [Visual reference](../design-system/reference.html): palette, component states, responsive UI example, slide example and side-by-side do/don't examples. Open in a browser. It is a reference specimen, not a working classroom product.
- [Shared tokens](../design-system/tokens.json): canonical color, type, spacing, radius and presentation values.
- [Generated CSS variables](../design-system/tokens.css): import when implementing the standard; importing alone does not migrate existing component styles.
- [Calculated contrast report](../design-system/contrast-report.md): approved foreground/background pairs.
- [Competitor review](ui-competitor-review.md): documented patterns, source links and evidence limits.

Goal: enable another teammate to design a screen or slide without inventing another visual language. Acceptance: all six sections below have rules and examples; colors have calculated contrast; UI and slide specimens use shared tokens; browser review covers desktop, narrow width and keyboard use. Screen-reader and student validation remain separate acceptance work.

## 1. Foundations

### Color

Use color to distinguish action, orientation and evidence. Deep teal is the brand/action color; mint supports orientation; lavender identifies original instructions. Keep the task heading in dark ink, so the whole reading experience does not become a wall of colored text. Status colors remain reserved for named states. These are original design decisions, not evidence that particular hues improve attention.

| Token | Hex | RGB | Purpose |
|---|---|---|---|
| canvas | #F7F8F5 | 247, 248, 245 | Page background; warm neutral |
| surface | #FFFFFF | 255, 255, 255 | Reading cards and inputs |
| surface-subtle | #EEF2F0 | 238, 242, 240 | Secondary controls and neutral supporting regions |
| text | #172B32 | 23, 43, 50 | Primary headings and body |
| text-secondary | #4B6066 | 75, 96, 102 | Context and supporting copy |
| border | #6B7E80 | 107, 126, 128 | Essential control boundaries |
| divider | #CEDBD7 | 206, 219, 215 | Decorative separators only |
| action | #00695C | 0, 105, 92 | Brand, primary controls and current-step marker |
| action-hover | #00574C | 0, 87, 76 | Primary hover |
| action-active | #00483F | 0, 72, 63 | Primary press |
| on-action | #FFFFFF | 255, 255, 255 | Label on filled primary controls |
| focus | #185FCA | 24, 95, 202 | Keyboard outline, with a 3px surface gap |
| brand-surface | #E2F3EC | 226, 243, 236 | Current-step context and selected-step surface |
| source | #5B4488 | 91, 68, 136 | Source-panel heading and source link |
| source-surface | #F0EBF8 | 240, 235, 248 | Original-instruction region |
| error | #B42318 | 180, 35, 24 | Error text and indicator |
| error-surface | #FEF3F2 | 254, 243, 242 | Error region |
| warning | #854D0E | 133, 77, 14 | Clarification text and indicator |
| warning-surface | #FFFBEB | 255, 251, 235 | Clarification region |
| success | #166534 | 22, 101, 52 | Saved/completed text and indicator |
| success-surface | #F0FDF4 | 240, 253, 244 | Saved/completed region |
| disabled-text | #4B6066 | 75, 96, 102 | Unavailable control label |
| disabled-surface | #E2E9E5 | 226, 233, 229 | Unavailable control fill |

#### Color placement rules

- **Canvas and reading:** warm neutral surrounds white cards. Keep long instructions on white or a pale approved surface; no full-page saturated reading background.
- **Primary action:** teal fill, white label. Secondary actions use white with a visible border. Keep one filled primary action per task region.
- **Current position:** mint context strip plus a teal rule and explicit `Your saved step` or `Current step` label. Selected steps also need a marker and programmatic state; mint alone is insufficient.
- **Source evidence:** lavender background, plum heading and dark body text. Use this treatment consistently for original wording, not generic decoration or generated summaries. A source-colored panel is not a verification badge.
- **Status:** amber clarification, red error and green saved/completed state, each with text and a symbol where helpful. Teal action color must never be used as the only completion cue.
- **Keyboard focus:** blue ring plus a surface-colored gap. Do not reuse this blue for selected states; check ring visibility on each surface.
- **Slides:** repeat the warm canvas, teal brand and mint current-step card. Use lavender only when showing source material. Evidence slides may use the source treatment; ordinary content slides should not imply source provenance.

The palette supports a recognizable identity without assigning a different hue to every component. Use white/neutral for most reading space and place color where it explains a relationship. Do not enforce a decorative color quota or use pastel text on pastel surfaces.

Use the exact approved pairs in the [contrast report](../design-system/contrast-report.md). Text requires 4.5:1; large text can meet 3:1 under WCAG, but Signal keeps 4.5:1 for all normal content. Essential boundaries and state indicators require 3:1. These are pair-specific checks, not properties of a color alone. [W3C contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

### Typography

Arial → Helvetica → sans-serif. Use 400 for prose and 700 for headings and key controls. Do not require a special reading font or claim a font treats disability. Use sentence case; avoid spaced uppercase labels. Use rem in UI, points in slides; do not equate their numeric sizes.

| Role | Desktop UI size / line height | Mobile UI | Slide size / line height |
|---|---|---|---|
| Display (cover only) | 48px / 1.1 | 36px / 1.15 | 36pt / 1.1 |
| H1 / next action | 32px / 1.2 | 28px / 1.25 | 36pt / 1.1 |
| H2 | 24px / 1.3 | 24px / 1.3 | 28pt / 1.2 |
| H3 | 20px / 1.4 | 20px / 1.4 | 24pt / 1.25 |
| Body | 18px / 1.6 | 18px / 1.6 | 24pt / 1.3 |
| Button / field | 16px / 1.5 | 16px / 1.5 | 20pt / 1.3 for specimen labels |
| Caption / metadata | 14px / 1.5 | 14px / 1.5 | 16pt / 1.3 for citations only |

Keep instruction text roughly 45–75 characters per line where space allows; this is an editorial target. Never truncate requirements to fit. Use a real heading hierarchy, not font size alone. Avoid justified paragraphs, italics for long text and aggressive negative letter spacing.

### Space, shape, elevation and icons

Use 0, 8, 16, 24, 32, 40, 48, 64, 80 and 96px spacing. Typical values: 8px label/control gap, 16px related controls, 24px card padding on mobile, 32px desktop padding, 48px between major sections. Border thickness (1–2px), focus (3px), and icon sizes are deliberate exceptions to the spacing grid.

Controls: 8px radius. Cards: 16px. Small status badges: pill radius, never mistaken for buttons. Default elevation: none. Optional overlay shadow: `0 8px 24px rgb(0 0 0 / 0.12)` plus a border; do not use shadows as the only boundary. No gradients or animated decoration. Lucide icons: 20px, stroke 2, adjacent visible labels; decorative icons use `aria-hidden="true"`. Do not substitute emoji for functional status.

## 2. Components

Current sample extension: an inline catch-up disclosure uses a native summary, a visibly labeled input, a 48px submit button and a polite result region. It displays an explicitly fixed recap at the same checkpoint as the main card. Sample-source disclosure is synthetic, never labeled teacher-verified. See [scope and decisions](ui-reconciliation.md).

This is the complete v1 inventory for the proposed paste → review → rejoin flow. Add a specification before introducing a new component. These are implementation requirements; the reference is not a full component library.

| Component / anatomy | Variants and sizes | Required states and behavior |
|---|---|---|
| Button: optional icon + verb label | Primary deep teal; secondary white with border; tertiary underlined text; destructive only for data removal. Default min-height 48px; compact 44px; horizontal padding 16/24px | Rest, hover, pressed, focus, disabled, busy. Primary hover #00574C, pressed #00483F; secondary/tertiary hover #EEF2F0, pressed #E2E9E5. All keep visible focus. Disabled uses explicit tokens, not group opacity. Busy preserves width, says `Creating steps…`, and prevents duplicate submission. One primary per task region. |
| Input / textarea: persistent label + hint + field + message | Single-line min-height 48px; multiline min-height 144px; full available width, vertical resize | Empty, filled, hover, focus, invalid, disabled, read-only. 1px border at rest, dark border on hover; focus outline; invalid 2px error border plus text. Label and error linked by `for`, `id`, `aria-describedby`; set `aria-invalid`. Placeholder is an example, never the only label. |
| Selection: native checkbox / radio + label | 20px visible control within 48px clickable label row; checkbox for completion/preferences; radios for mutually exclusive views | Unchecked, checked, hover, focus, disabled. Checkmark/selection dot supplements color. Space selects; native radio arrow behavior. Group with fieldset and legend. |
| Current-step card: context + step count + heading + requirements + actions | One-step view, overview, completed view; max 680px | Current, saved, outdated instructions, complete. Distinguish saved student step from teacher-confirmed stage. Card is not itself clickable. Essential requirements remain visible. |
| Step list: ordered list + numbered navigation controls | All steps; rows min-height 48px, multiline labels | Upcoming, current (`aria-current="step"`), complete (`Done` text + check), focus. Completion and current position are separate data. Selecting a step must not silently mark it done. |
| Source disclosure: button + label + chevron + panel | Collapsed/expanded; min-height 48px trigger | Enter/Space toggles; `aria-expanded` and `aria-controls`; focus stays on trigger. Show exact original wording and version, with a relevant quote for the step. Required constraints stay outside disclosure too. |
| Requirement / clarification panel: heading + text + optional action | Neutral requirement, warning clarification, error | Static by default. `Clarify with your instructor: where should you upload?` Do not infer missing destinations or imply an instructor was contacted. |
| Status / toast: short result + optional undo/dismiss | Inline preferred; non-modal notification if needed | Success via polite status region, error associated with affected area. Undo stays available until dismissed or the next incompatible action; never make a timed toast the sole undo path. No stacked alerts. |
| Empty / busy / error region: heading + explanation + action | First use, no results, loading, failure, completion | `Paste the activity instructions to begin.` + `Use sample activity`; `Creating steps…`; `We couldn't create steps. Your text is still here.` + `Try again`. No fake percentages. Preserve entered text and a cancel path where applicable. |
| Navigation: brand + activity + view switch | Header, `All steps`, `Back to current step`, `Previous step` | Active view is named. Tab order follows reading order. Switching views preserves progress. Brand is a link only if there is a real destination. |
| Link: descriptive text | Inline underlined; standalone 44px target | Underline at rest; hover/visited remain legible; focus ring. Use links for destinations and buttons for actions. No `Click here`. |

Prefer inline edits over modal dialogs. If a future modal is necessary: name it, move focus inside, contain Tab, allow Escape where safe, and return focus to its invoker. Do not ship an untested custom modal.

## 3. Layout and responsiveness

| Viewport | Grid | Outer safe margin | Gutter | Main task |
|---|---|---|---|---|
| Mobile 320–767px (reference 375px) | 4 columns | 16px | 16px | Full available width; 24px card padding; actions wrap or stack |
| Tablet 768–1199px (reference 768px) | 8 columns | 32px | 24px | Centered, max 680px; no mandatory sidebar |
| Desktop ≥1200px (reference 1440px) | 12 columns within max 1200px | At least 48px; center remaining space | 24px | Centered 680px reading column; grid supports outer composition |

Breakpoints are Signal choices, not competitor measurements. The 680px reading column is an intentional exception to snapping every card to the outer grid. Use fluid widths; avoid fixed heights on content. Preserve this order at every width: activity → saved/current context → next action → all requirements → controls → source. Keep primary actions near the content, not in a floating bar that can obscure focus. Support safe-area insets on edge-to-edge devices. No horizontal scrolling at 320 CSS px for this text-focused flow. [W3C reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

### The same system in slides

Use a 16:9 master, 13⅓ × 7.5in. At a 1280 × 720 design canvas, use 48px safe margins (= 0.5in), a 12-column grid and 24px gutters. Slide title top-left, consistent Signal wordmark, small page number bottom-right; sources bottom-left. Use the same hex colors, Arial and 700/400 weights. 8px control radius maps to 0.083in; 16px panel radius maps to 0.167in. Native slide typography follows the pt column above, not the UI pixel values.

Three reusable layouts: (1) cover: large message plus one sentence; (2) evidence: title, one claim, source and limitation; (3) demo: enlarged current-step card plus a short explanation. A slide is not a scaled-down dashboard. Recreate the relevant UI card at readable size or crop a true screenshot without altering its meaning. Split dense content across slides. Keep citations ≥16pt; move long URLs and detail to speaker notes with a short visible source label. Provide reading order, alt text and an accessible text handout for exported slides. Animation is off by default.

The visual reference includes a responsive preview of the demo layout. Build/edit native slides from this master specification; no editable PowerPoint or Google Slides deck is included in v1.

## 4. UX patterns and content

Lead with **Where we are / What matters / Your next step**. Say `Your saved step: 2 of 4` when only student progress is known. Show a teacher-provided stage and its version only when supplied. Never claim live classroom awareness from a saved checklist.

| Situation | Standard copy / behavior |
|---|---|
| Rejoin | `Welcome back. Your saved step is 2 of 4.` / `Help me rejoin` |
| Next action | `Choose one explanation for the outcome.` Keep the source's numbers and exceptions. |
| Source access | `View original instructions` / `For this step` / `Full activity` |
| Save | `Save changes` → `Changes saved` only after persistence succeeds |
| Completion | `Mark step done` → `Step marked done` + `Undo`; final step leads to `Activity complete` with `Review steps` |
| Ambiguity | `The upload location isn't specified. Check with your instructor.` |
| Storage failure | `Progress couldn't be saved on this device. Keep this page open or copy your steps.` Do not falsely show `Saved`. |
| Updated instructions | `Instructions have changed. Review the new version before continuing.` Preserve previous progress until reconciled. |
| AI draft | `Draft steps — review against the original instructions.` Never label unreviewed text teacher-approved. |
| Demo content | `Sample activity · prewritten steps` visibly near context; no live-AI implication |

No shame, diagnostic labels, streak penalties, confetti, forced timers or automatic progression. The eight-minute discussion in the fixture remains a visible instruction; it does not require a countdown. Errors describe the problem and recovery; avoid `Invalid`, `Oops!`, or blaming the student. Show failures near their cause. Use a polite live region for non-blocking updates; reserve interruptive alerts for urgent failures. [W3C status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).

For the historical discussion-task fixture, requirement preservation is a release check (the current Math 2B fixture is separate): pair/solo exception; paragraphs 2–3; one explanation; two text details; no outside sources; eight-minute discussion; one response per pair; before-class-ends deadline; unresolved upload destination. No requirement may exist only in a closed source panel.

## 5. Accessibility acceptance

Target WCAG 2.2 AA for the implemented flow. This document does not prove conformance. Use the [WCAG quick reference](https://www.w3.org/WAI/WCAG22/quickref/) for a complete audit; the checks below are project priorities, not the entire standard.

| Check | Observable acceptance |
|---|---|
| Keyboard | Complete paste, review, view switching, source expansion, completion and undo using keyboard only. No traps or positive tabindex. Native Enter/Space behavior. [Keyboard criterion](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html). |
| Focus | 3px blue outline with 3px surface gap; never clipped or hidden by sticky UI. Focus order follows reading order. Keep focus on disclosure control; after replacing a step, deliberately focus its heading or announce context without duplicate speech. Visible/unobscured focus is AA; the specific ring is Signal's stronger design rule, not an AA-mandated pixel size. [Focus appearance (AAA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html). |
| Screen reader | Landmarks, one page H1, ordered steps, names/roles/states, input labels, expanded state, errors, and polite status. Test the real journey with VoiceOver/Safari and NVDA/Chrome when available; record exact combinations and results. Icons alone are insufficient. |
| Contrast and non-color cues | Use approved pairs. Current step, invalid fields and completion include words or symbols. Test actual rendered backgrounds, hover, focus, selected and error states. |
| Targets | Signal minimum 44×44px; preferred 48px controls. WCAG AA minimum is 24×24px with exceptions; do not call 44px the AA minimum. [Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). |
| Zoom and text spacing | Test 200% text resize, 400% zoom / 320 CSS px reflow, and user overrides: line-height 1.5, paragraph gap 2em, letter spacing .12em, word spacing .16em. No clipped content or controls. [Text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html). |
| Motion and media | No required animation. Respect reduced motion for any optional transition; never autoplay audio. Add captions/transcripts if instructional media is introduced. |
| Cognitive access | Preserve original wording and constraints, provide overview and one-step modes, support backtracking, expose ambiguity. Test usefulness with students voluntarily; don't request diagnostic proof. |

## 6. Do's and don'ts

See side-by-side specimens in the [visual reference](../design-system/reference.html#comparisons). “Don't” examples are intentionally unsuitable and are labeled as such.

| Do | Don't | Why |
|---|---|---|
| One primary `Mark step done`, secondary `All steps` | Three competing filled buttons | Makes action priority visible without removing choice |
| Visible label + specific error | Placeholder-only field + red outline | Meaning survives typing and color differences |
| 18px requirements in readable contrast | Tiny pale supporting requirements | Restrictions are essential content |
| Show `Work alone if your partner is absent` beside the task | Hide the exception only in collapsed source | Shortening must preserve instructions |
| `Your saved step: 2 of 4` | `Your class is on step 2` without supplied evidence | Separate progress from live classroom state |
| Completion words + symbol + undo | Green dot alone / disappearing undo | Makes state understandable and reversible |
| Same Arial, teal action color, mint context and 16px panel shape in slides | Introduce a different gradient, font and color palette in the pitch | Keeps the demo and deck recognizable as one product |

## Adoption and verification status

The Math 2B sample now imports the shared tokens and uses Arial, teal actions, mint context, lavender sample-source detail and a centered reading column. Catch-up is an inline native disclosure. Decorative motion and the floating dialog are removed. The sample is explicitly synthetic, has no saved progress and is not teacher-verified. Full paste/review, step completion, persistence and teacher-source workflows remain planned. See [UI reconciliation](ui-reconciliation.md) and the verification record for scope and evidence.

Before a slide handoff, compare slide and UI against tokens.json, not an old screenshot. Change token values centrally, regenerate CSS and contrast report with `python3 design-system/build_tokens.py`, update specimens and log a version. Record completed browser checks in [verification](../design-system/VERIFICATION.md). Unrun checks remain explicitly pending.
