# Bold icons and typography review — 2026-11-14

**Palette update, 2026-11-14:** the user has set aside this note’s monochrome restriction. Follow [UI standard v1.1](ui-standard.md) for the current teal/mint/lavender direction. The original review below is retained as history; its typography findings remain relevant.

## Reference read

User's [Canva School Habits presentation](https://www.canva.com/design/DAHa7QS00Io/WLIPWcZh9BWu60qorYHYRg/edit): the visible cover uses an oversized heavy headline, a large browser-window motif and repeated simple dots. The color palette is not a direction for Signal. Proposed adaptation: one emphatic black headline for the next action, one clear icon beside a meaningful label, and monochrome geometry sparingly. Do not repeat icons/dots until the task area becomes noisy.

[W3C cognitive-accessibility icon guidance](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p07-icons-used/) supports familiar, unambiguous icons beside important content, and explicitly cautions against cluttered pages full of icons. [W3C orientation guidance](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o1-understandable/) supports clear headings and consistent placement. This supports bold hierarchy plus selective icons. It does not establish an ADHD-specific effect size or that bolder is always better.

## Font evidence and decision

There is no well-established single best font for ADHD. Keep Signal's current neutral sans-serif (Arial/system fallback) for the MVP. Give attention to size, line length, spacing, contrast, and accurate short content. If time permits, compare Arial with Atkinson Hyperlegible Next in a small preference/comprehension check; let participants choose, and do not call the winner universal.

| Candidate | What the source actually supports | Decision |
|---|---|---|
| Lexend | Designed to reduce crowding. A [primary study indexed by ERIC](https://eric.ed.gov/?id=ED588975) tested typography with 25 second-grade readers; it does not establish benefit for college students with ADHD. [Google Design](https://design.google/library/lexend-readability) describes its design history. | Worth visual comparison, no ADHD efficacy claim. |
| Verdana | Wide, familiar sans-serif. There is no verified ADHD-specific superiority in the material reviewed. | Acceptable fallback; compare at equal size and line width if considered. |
| Atkinson Hyperlegible / Next | [Braille Institute](https://www.brailleinstitute.org/freefont/) created it to distinguish similar characters for low-vision readers. That's a clear purpose, not ADHD validation. | Best specialized option to trial, especially for character recognition; no need to install before test. |
| Open Sans / Arial | Familiar, neutral sans-serif faces. [W3C typography research overview](https://www.w3.org/TR/coga-user-research/) emphasizes clarity, concise content and layout while noting ADHD-specific technology evidence is often anecdotal. | Use Arial now; the visual system matters more than a font claim. |
| Comic Sans | Some users may prefer it; no primary evidence reviewed here that it improves ADHD comprehension. | Optional preference, not default. |
| OpenDyslexic | A [primary alternating-treatment study](https://pmc.ncbi.nlm.nih.gov/articles/PMC5629233/) with children with dyslexia did not find a practically significant reading benefit over comparison fonts. This is a different population from college students with ADHD. | Do not present its weighted letters as a proven fix. |
| Bionic Reading | A [2024 controlled reading experiment](https://doi.org/10.1016/j.actpsy.2024.104304) and a [2025 eye-movement study](https://pubmed.ncbi.nlm.nih.gov/40240742/) did not support general reading benefits. | Do not use by default or cite a speed advantage. |

The web articles supplied by the user are useful candidate lists, but many claims are design rationales or secondary summaries, not direct ADHD outcome studies. An [exploratory study of 204 adults with neurodevelopmental diagnoses](https://www.tandfonline.com/doi/abs/10.1080/09523987.2025.2544118) reports presentation preferences; it is about preference, not proof that a font improves classroom performance. Full text was unavailable in this review.

## Next visual change to test

Make the next-action words bolder without turning supporting requirements into tiny gray text. Add one black icon beside the current step or source control only if users understand it faster with the icon. Keep text labels. Preserve the flat white/black palette. Test whether a student can locate the current action and key restriction quickly, then adjust typography based on observation rather than a font ranking.
