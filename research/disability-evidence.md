# Disability and classroom barriers: working research

Updated 2026-11-14. Research for team discussion, not a diagnosis or a ranking of people's worth or need.

## What the national data does and does not say

[NCES](https://nces.ed.gov/fastfacts/display.asp?id=60) reports that 21% of U.S. undergraduates reported a disability in 2019–20 under its survey definition. The table below uses a different [GAO analysis of NPSAS 2020, Appendix II Table 4](https://www.gao.gov/assets/gao-24-105614.pdf): percentages are **among undergraduates with disabilities**, across institution types, categorized by each student's **main condition**. A student with multiple conditions is counted once. Figures are rounded; GAO reports a margin of error within two percentage points. It is not a ranking of all conditions, individual barriers, student needs, or intervention opportunities. Names follow the report; `other` is a heterogeneous category, not a diagnosis. Tied estimates should not be treated as precise differences.

| Approximate rank | Main reported category | Share of disabled undergraduates | Existing support example | Gap / limitation to investigate |
|---|---|---:|---|---|
| 1 | Depression | 27% | Campus disability office, academic adjustments, support services | GAO found documentation delays and implementation challenges at some colleges; a classroom tool does not treat depression. |
| 2–3 | Attention deficit disorder (GAO label) | 21% | Task breakdown tools such as [Goblin Tools](https://goblin.tools/Todo); individualized adjustments | Task lists may not preserve a specific instructor's requirements or show where each came from; product-design hypothesis, not a measured failure rate. |
| 2–3 | Mental, emotional, or psychiatric condition | 21% | Disability offices and individualized academic adjustments | GAO documented that students may face cost, disclosure, and implementation barriers; needs vary widely. |
| 4 | Other | 12% | Individualized disability services | Broad mixed category; do not infer one common classroom need. |
| 5–7 | Hearing impairment | 4% | [Teams captions](https://support.microsoft.com/en-us/teams/meetings/use-live-captions-in-microsoft-teams-meetings), interpreters | Captions do not make every visual or classroom interaction accessible; exact gap requires user research. |
| 5–7 | Blindness or visual impairment | 4% | Screen readers and accessible descriptions/tables | [W3C](https://www.w3.org/WAI/tutorials/images/complex/) explains complex charts require detailed equivalents; descriptions may miss educationally important relationships. |
| 5–7 | Specific learning disability or dyslexia | 4% | [Microsoft Immersive Reader](https://support.microsoft.com/en-us/education/learning-accelerators/use-reading-coach-in-immersive-reader) and individualized supports | Display/read-aloud support alone may not explain a specific assignment's requirements; hypothesis to test. |
| 8 | Orthopedic or mobility impairment | 3% | Accessible physical spaces, input devices, individualized adjustments | Physical access and dexterity needs cannot be solved by a text-only AI assistant. |
| 9–10 | Health impairment or problem | 2% | Individualized supports and adjustments | Symptoms and availability can vary; a fixed workflow may not fit episodic needs. |
| 9–10 | Brain injury | 2% | Individualized supports, accessible instructions | Needs vary; AI must not assume cognitive ability or substitute for accommodations. |

The GAO table also includes developmental disability and speech/language impairment at 1% each. Main-condition categories do not represent everyone who has multiple disabilities, and population-level numbers do not establish who faces a particular barrier. GAO cites interviews at selected institutions, not nationally representative rates, for documentation costs and delays. See [GAO report](https://www.gao.gov/products/gao-24-105614) and [U.S. Department of Education](https://www.ed.gov/higher-education/students-disabilities-preparing-postsecondary-education). Academic adjustments are individualized; a prototype is not a substitute for them.

## Existing products and caution

- [Otter Education](https://otter.ai/education-agent) offers real-time notes, transcription, and summaries; a lecture assistant needs a specific differentiator.
- [Goblin Tools](https://goblin.tools/Todo) already decomposes tasks; an assignment helper needs more than generic task splitting.
- [W3C complex images](https://www.w3.org/WAI/tutorials/images/complex/) explains why diagrams may require detailed text, not just a short caption. [Chart4Blind](https://arxiv.org/abs/2403.06693) is a relevant existing research tool.
- Ask disabled students which actual barrier matters and what currently fails. Treat all estimated product impact as unvalidated.
