# Signal visual direction — mockup brief

Decision, 2026-11-14. Input: Muse's supplied design-philosophy note (user attachment, not published evidence), [W3C cognitive accessibility user research](https://www.w3.org/TR/coga-user-research/), [W3C clear content](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/), [familiar and consistent design](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o1-understandable/), [clear steps](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p07-step-instructions/), [interruptions](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o5p01-minimal-interruptions/), and [FocusView study abstract](https://arxiv.org/abs/2507.13309). See [appendix](appendix/README.md) for research citations and limits.

## Product distinction

Muse describes a general task app that helps a person start, do and finish a task. Signal's classroom moment is more specific: **I lost the thread; help me rejoin the current activity without losing its requirements.** The mockup should show the class-provided instructions and an explicit current stage. It must never imply the app can detect the live classroom state on its own.

## Adopt for the mockup

1. A stable orientation line: class/activity name and `Step 2 of 4` (or equivalent). Keep it in the same place across states. W3C supports clear signposts and consistent design.
2. One visually dominant next action, written as a short verb-led instruction. `What matters` lists essential constraints and deadlines in plain language. W3C says steps must not omit necessary information.
3. A visible `Help me rejoin` action leading to `Where we are / What matters / Your next step`. Student can return to full overview. Hide secondary detail through an explicit `View original instructions` control; never hide essential constraints solely inside it.
4. Preserve progress locally and provide undo/edit. On return, orient the student to their recorded place; do not pretend to know what changed in the classroom while they were away.
5. Quiet surface: no autoplay, flashing, automatic step changes or unsolicited alerts. Student controls detail and transitions. Use text plus visual cues, not color alone.
6. Few clearly differentiated actions. One primary button and quieter secondary controls can coexist; accessibility does not require literally one action per screen. Avoid forcing a timer or tiny micro-steps that alter the teacher's task.
7. Reassuring but neutral wording: `Welcome back. You were on step 2.` Avoid shame, streak counts and unearned praise.

## Visual system to draw first

- **Layout:** one main reading column, max width about 680px, generous margins; activity context above a large current-step card; smaller `What matters` panel and source disclosure below. On wide screens, do not fill unused space with a dashboard.
- **Color:** warm off-white canvas, dark charcoal text, one calm teal/blue accent for the primary action and current-step marker. Warnings need a word and icon as well as color. These colors are a visual proposal, not proven ADHD treatment.
- **Type:** a familiar sans family; clear 28–32px headline on desktop, 24–28px on mobile, 16–18px body, comfortable line height. Size choices are design targets to test at zoom and on phones, not research thresholds.
- **Spacing:** consistent 8px rhythm, ample separation between activity context, instruction and supporting detail. Use borders and headings rather than decorative gradients or heavily shadowed cards.
- **Icons:** sparse, conventional, with adjacent text. Keep primary control labels explicit: `Continue`, `Mark step done`, `View original instructions`.
- **Motion:** none required for the first mockup. Completion may use a subtle optional state change later, respecting reduced motion; no claim about a dopamine effect.

## First screen/state sequence

1. **Rejoin:** Header `Biology · Case discussion`; `You were on step 2 of 4`; prominent `Help me rejoin`.
2. **Orientation:** `Where we are: Your pair is choosing one explanation for the case.` `What matters: Cite two details from paragraphs 2–3. Do not use outside sources. One response per pair before class ends.` `Your next step: Find one supporting detail in paragraph 2.` Show an ambiguity note if upload destination is unspecified.
3. **Source:** Expanded original teacher wording, with the relevant sentence visibly associated with the next action. Preserve exact wording and its exceptions.
4. **Progress:** `Step marked done`; next step appears. An undo control restores the previous state. Reopening shows the last saved step and asks the student to confirm if class instructions changed.

Use the synthetic activity in [Signal candidate brief](signal-candidate-brief.md). Mark generated/sample content as sample in a demo until a real AI call exists.

## Claims to avoid

Muse's `ADHD prosthetic model`, `regulation deficit, not attention deficit`, `2-second rule`, maximum seven visible items, one accent only, no red ever, and completion `dopamine hit` are not established by the sources reviewed here. They can inspire choices but should not be presented as research-backed rules. W3C notes much ADHD-specific assistive-technology evidence has been anecdotal and calls for testing with people with ADHD. The FocusView study found differing preferences in a video setting; it does not prove this layout works in class. We should test comprehension, recovery, requirement preservation, keyboard use, contrast and mobile reflow on the actual mockup.
