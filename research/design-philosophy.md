# Signal design philosophy

**Now-First Design: help a student find their place, understand what matters, and choose the next action.**

Version 1.0 · 14 November 2026 · Proposed philosophy for the Signal classroom-accessibility candidate.

This document explains the reasoning behind the [UI and slide standard](ui-standard.md). It expands the original [Now-First note](now-first-design.md). Use this document for design decisions and presentation narratives; use the standard and [shared tokens](../design-system/tokens.json) for implementation values. These are product principles to validate, not claims of clinical effectiveness.

## The moment we design for

A student returns to an in-class activity after losing the thread. The instructions are available, but finding the relevant action requires reconstructing context, remembering constraints and deciding where to begin.

Signal should make that return understandable. The student should be able to identify their saved place, see the requirements, inspect the original instructions and continue at their own pace. Their access needs may vary across situations. A single visual treatment cannot stand in for understanding those needs.

Our design promise is **a clear route back into the activity, with its meaning intact**.

## 1. Orient before asking for action

Give the student enough context to understand the next step. Keep the activity name, progress and view controls in predictable positions. Lead with “Where we are,” “What matters,” and “Your next step.”

Be precise about what is known. “Your saved step: 2 of 4” describes recorded progress. “Your class is on step 2” requires a supplied classroom update. The interface must not turn a saved checklist into an unsupported claim about the room.

**Design question:** Can the student tell what this activity is and why this step is being shown?

## 2. Make the next action clear without losing meaning

Use a strong heading and one prominent action in the current task region. Keep the instruction specific: “Choose one explanation for the outcome” gives more direction than “Continue working.”

Concise presentation must retain quantities, restrictions, exceptions and deadlines. If an instruction is long because it contains necessary information, organize it into readable groups. Do not remove requirements to achieve a cleaner card. The partner-absence exception belongs beside the task as well as in the original source.

**Design question:** Could a student follow this screen correctly without discovering a hidden requirement later?

## 3. Put control in the student's hands

Let students choose between an overview and a single-step view. Preserve their place when they change views. Make completion reversible, provide a way back, and keep source detail available when wanted.

Selecting a step and completing a step are different actions. Do not advance automatically, force a timer, or assume that more guidance is always better. A source-specified eight-minute discussion remains an instruction; introducing a countdown is a separate choice.

**Design question:** Can the student change direction or recover from a mistake without losing their work?

## 4. Make the basis of each instruction visible

Keep original teacher wording within reach. Associate a proposed step with its source, expose ambiguity and distinguish an AI draft from reviewed instructions. A quotation helps a student inspect an interpretation; it does not by itself prove that the interpretation is correct.

“The usual place” is an unresolved upload destination. Show that uncertainty plainly. Do not invent a platform, precise deadline or teacher approval to make the experience appear complete. Label prewritten demo content as sample content.

**Design question:** Can the student see what came from the teacher, what was transformed, and what still needs clarification?

## 5. Use visual hierarchy to support reading

Our proposed expression is white surfaces, dark text, a bold next-action heading and restrained borders. Arial, consistent spacing and a narrow reading column create a repeatable visual language. Semantic colors identify named states; color never carries meaning alone.

Essential supporting text deserves readable size and contrast. A minimal screen with tiny pale requirements fails this principle. Decorative movement should not compete with the task. The proposed standard has no background animation and no required motion.

These are design choices that support our intended experience. Black and white, a particular font, or an 8px spacing scale are not treatments for disability. User feedback and access testing may justify changing them.

**Design question:** Does each visual choice help someone locate, read or act on information?

## 6. Support participation with dignity

Use direct, neutral language. “Welcome back. Your saved step is 2 of 4” provides context without judging why someone left. Errors should explain what happened and how to recover. Completion feedback should describe progress without exaggerated praise or penalties.

Do not make diagnosis disclosure a condition of using the interface. Avoid labels such as “ADHD mode” for ordinary presentation controls. Ask which presentation helps the person, and respect their choice.

**Design question:** Would this wording feel respectful if shown to a student in front of their classmates?

## 7. Make accessibility part of the definition of done

A design is incomplete until people can operate and understand its implemented states. Contrast, keyboard access, meaningful labels, focus, reflow and screen-reader behavior belong in acceptance checks from the beginning.

Automated checks and native controls help, but do not replace testing the actual journey. Measure whether students can recover their place and preserve the teacher's requirements. Record limitations alongside successes. Do not turn a proposed WCAG target into a conformance claim.

**Design question:** What observed evidence supports saying this interaction is usable and accessible?

## One identity across UI and slides

The pitch should visibly belong to the product. Use the same Arial family, color roles, panel shapes, vocabulary and hierarchy. A slide should carry one clear message at a readable presentation size. The UI should carry the information needed to perform the task.

| Product expression | Presentation expression |
|---|---|
| Activity and saved-step context | A clear title that establishes the situation |
| One prominent next action | One main message per slide |
| Readable requirements beside the task | Evidence and limitations beside the claim |
| Original instructions available | Source labels with supporting detail in notes or handout |
| Stable visual structure | Consistent master, margins and type hierarchy |
| Explicit sample and draft states | Honest labels on demo screenshots and concept examples |

When a full screen would become unreadable on a slide, enlarge a relevant excerpt and label it. Keep the complete instructions in the demonstration or handout. Never crop away a limitation to strengthen a claim.

## How we resolve tradeoffs

| Tension | Decision rule |
|---|---|
| Brevity versus accuracy | Preserve meaning first; improve grouping and wording before removing content. |
| Simplicity versus choice | Keep a useful default and make overview, source and recovery easy to find. |
| Brand consistency versus access | Keep semantic roles consistent; allow a presentation change when it improves access. |
| Automation versus confidence | Surface uncertainty and preserve review rather than invent an answer. |
| Visual polish versus operability | Fix readability, focus and recovery before adding decoration. |
| Ambition versus evidence | Show the working slice and clearly name what has not been validated. |

## What we learn from competitors

Our [competitor review](ui-competitor-review.md) informs the patterns we consider: adjustable presentation, configurable secondary tools, source-connected context and one-step task views. Those patterns are useful references, not proof of effectiveness for Signal.

Our hypothesis to test is more specific: preserving classroom requirements, making their source inspectable and exposing ambiguity can help a student rejoin an activity. Task decomposition and a one-step screen alone are not a novelty claim.

## Review before a handoff

A designer, developer or slide author should be able to answer these questions using the artifact itself:

- Is the activity and known progress clear?
- Is the next action easy to identify?
- Are all requirements and exceptions preserved and readable?
- Can the student inspect the source, change views and undo a mistake?
- Are uncertainty, sample content and review status honestly labeled?
- Does the artifact use the shared visual language while respecting its medium?
- Which accessibility and usability checks have actually been completed?

Use [the UI standard](ui-standard.md) for measurable acceptance criteria and [the verification record](../design-system/VERIFICATION.md) for completed checks. Evaluate instruction accuracy, recovery, comprehension and participant feedback before claiming improvements in learning or attention.

## Slide-ready philosophy statement

> Signal uses Now-First Design to help students find their place, understand what matters, and choose the next action. We keep classroom requirements visible, original instructions within reach, and progress under the student's control. The UI and slides share a clear visual language, with accessibility checked in the implemented experience.

## Evidence and status

This philosophy synthesizes the project's [original principles and linked research](now-first-design.md), [visual-direction rationale](signal-visual-direction.md), [typography review](bold-icons-font-review.md), [competitor research](ui-competitor-review.md) and [UI standard](ui-standard.md). Those documents separate guidance, observations and hypotheses. No new clinical or product-efficacy findings are asserted here.

The philosophy and standard describe the intended design. Existing prototype behavior may differ; the migration gaps remain documented in the UI standard. This document does not select the candidate on the team's behalf or change the app.
