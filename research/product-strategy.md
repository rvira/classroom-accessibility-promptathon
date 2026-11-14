# Product strategy: decision notes

Event prompt: How can AI address challenges for people with disabilities inside the classroom? User supplied. Round 1: problem/user 25, solution 25, use of OpenAI tools 25, prototype 15, clarity/vision 10, per [event rubric](https://docs.google.com/document/d/1l_HKJFKc_3LmCdNLp2oBX-b47C4V2ktrEzjQvWJ764Y/edit).

## Organizer intent: what we know
We do not know why organizers selected this prompt or which solution they prefer. The explicit prompt and rubric reward an understood user, a well-matched solution, thoughtful use and iteration of OpenAI tools, and a clear demo. Inferring their hidden preference or a specific market need would be speculation.

## Candidate directions, not team decisions

1. **Signal / in-class instruction lens**: Given an authorized, provided transcript of a professor's multi-step activity, generate one actionable step at a time, link each step to the source, and flag missing information. Target: students who have difficulty processing or tracking multi-step instructions; user chooses view. Demo one realistic in-class activity and test the output against the transcript. Hypothesis: this is distinctive enough from generic task splitting because it preserves actual class requirements and helps a student rejoin. Risks: model omissions, instructor changes, unvalidated need. No live capture claim.
2. **Rejoin**: Given a provided transcript and current point, show what the student missed, what the class is doing, and one key prerequisite, with source references. Target: a student who temporarily loses the thread. Demo a prepared lecture, pause and resume. [Otter](https://otter.ai/education-agent) and [Genio](https://genio.co/notes) already offer lecture tools, so re-entry and evidence links are a differentiation hypothesis, not novelty proof.
3. **Diagram Access**: Given one simple classroom chart, create a structured text/table representation that a teacher verifies against the image. Target: student accessing a chart with a screen reader. Demo a simple bar chart and keyboard navigation. [W3C](https://www.w3.org/WAI/tutorials/images/complex/) supports providing detailed text equivalents; [Chart4Blind](https://arxiv.org/abs/2403.06693) is prior work. Risks: vision extraction error, accessible interaction not validated, not appropriate as a replacement for an accommodation. Limit chart type and mark uncertain values.

Recommendation for discussion: Signal best balances direct in-class use and demo feasibility; Rejoin has a strong story but greater overlap with note-taking tools; Diagram Access offers a tangible access transformation but needs extra validation. These are hypotheses, not evidence of impact or organizer preference. The team should choose after a quick conversation with a student who experiences the barrier and after confirming available AI tools.

## Prompt iteration to capture
Save actual prompt version 1, observed failure, revised prompt, and actual before/after output. Check for unsupported facts, omissions, correct source references, and accessibility. Never fabricate a test, user quote, metric, or live-AI capability.
