# Signal: classroom instruction access — candidate brief

Status: proposal, not selected by team. Prepared after theme reveal on 2026-11-14.

## User and problem hypothesis
A college student with a disability affecting processing, working memory or task sequencing is doing an in-class activity. A paragraph of instructions contains multiple actions and exceptions. They need to find the next action and resume without losing the constraints. We have not interviewed users or measured impact. Do not generalize to all ADHD, dyslexia, depression or other conditions.

## Research and differentiation
[W3C cognitive accessibility guidance](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p07-step-instructions/) recommends concise sequential instructions without omitted steps. This supports a design pattern, not evidence that Signal works. [Goblin Tools Magic Todo](https://goblin.tools/Todo) already breaks tasks down, and [Taskmaster](https://goblin.tools/Taskmaster) already presents them one at a time. Neither task decomposition nor a one-step view is a defensible novelty claim. Hypothesis worth testing: classroom-specific requirement preservation, exact source evidence and a visible clarification path provide value beyond those products.

## Core flow
Teacher/presenter pastes an activity's instructions. AI drafts a structured plan; presenter reviews before student use. Student selects all steps or one step, checks off completed actions, and can inspect original wording beside every requirement. Ambiguous instructions appear as a question to clarify rather than invented directions. No diagnosis collection, automated speaking, microphone, or monitoring.

## Concrete fixture (synthetic, not a user quote)
'Work in pairs. Read paragraphs 2 and 3 of the case. Choose ONE explanation for the outcome and cite two details from the text. Do not use outside sources. Discuss for eight minutes. Submit one response per pair before class ends. If your partner is absent, work alone. Upload it to the usual place.'
Expected constraints: pair/solo exception; paragraphs 2–3; one explanation; two text details; no outside sources; eight-minute discussion; one response per pair; deadline before class ends. The destination 'usual place' is unresolved. No invented Canvas destination, exact clock time, extra research, or answer to the case.

## Memorable demo
Show original instructions; transform them; choose one-step view; open 'Why this step?' to see source; highlight that 'usual place' has no known destination and ask for clarification. Complete a step and demonstrate persisted progress. The proof is preserved requirements and exposed uncertainty, not attractive cards alone.

## MVP
Paste text + one sample; generation endpoint only if available; editable reviewed plan; original/source comparison; student-controlled step view; local progress; loading/error/empty states; keyboard/focus and readable responsive layout. Clearly distinguish sample/precomputed outputs if used. No accounts, LMS integration, live transcription, diagnosis profiles, instructor analytics, automatic grading or deadlines inferred from outside the source.

## Evaluation before claiming success
Create three fixtures: straightforward, exception-heavy, ambiguous. Manually list source requirements first. Count supported requirements preserved, omissions, invented requirements, and unresolved questions surfaced. Verify quoted spans exist exactly; a matching quote is necessary but not sufficient evidence for an accurate interpretation. Compare initial 'make a checklist' prompt with explicit preservation/uncertainty instructions; save actual outputs, not fictional improvements. Ask a disabled student to try it voluntarily without requiring diagnosis disclosure: what helps, what frustrates, what do they already use? If no such feedback, label user validation as next step. Screen-reader testing must be real before claiming it.

## Critical tradeoffs
Extra app switching or reading may increase load. Instructor review is an adoption cost. A good human-written instruction sheet may outperform AI; AI is useful when transforming existing varied text quickly, but must justify itself. Never remove information just to make the interface short. A dynamic classroom needs updates; defer live synchronization and show version clearly.

## Why this over alternatives
Signal is the most controllable near-deadline experiment, not necessarily the highest-impact eventual product. Diagram Access may remove a more absolute access barrier for a narrower group; it wins if we can validate extraction and screen-reader use. Rejoin depends on authorized lecture text and overlaps established notes tools. Team choice remains open.

## AI handoff
Read impact-priorities.md then this brief. Do not start implementing or assert team selection solely from this file. Research agents should challenge differentiation and find user evidence; implementation agents should preserve all source requirements and keep supported facts separate from suggestions. Record actual prompt iterations for the rubric. Deadline is 3pm Pacific; prioritize submission-ready one-path prototype and 3–5 slides over features.
