# Signal · competitor and adjacent-product review

Reviewed 14 November 2026. Method: official public product pages, support documentation and accessibility statements. No signed-in product walkthrough, computed-style extraction, device testing or independent accessibility audit was performed. Features vary by platform and version. This is a pattern comparison, not a scorecard of disability outcomes.

Signal's relevant alternatives span different jobs: **Microsoft Immersive Reader** helps with reading presentation; **Texthelp Read&Write** provides literacy supports; **Genio Notes (formerly Glean)** supports lecture capture and review; **Goblin Tools** supports task decomposition and execution. None is assumed to cover the whole Signal flow. Absence from the reviewed documentation does not prove a feature is absent from a product.

## What the sources establish

| Product | Verified public documentation | Useful design lesson for Signal (our inference) |
|---|---|---|
| Microsoft Immersive Reader | PowerPoint documents text font/size, spacing, themes, reading preferences, read-aloud and original/translated text options [M1]. Edge documents adjustable column width and line focus on one, three or five lines, navigable with arrow keys [M2]. | Give students control over presentation; separate readable content from optional controls. Preserve access to original wording. A single default is not a universal disability accommodation. |
| Texthelp Read&Write | Official setup documentation describes customizable horizontal, vertical and simplified writing toolbars [T1]. Screen Masking offers a floating panel to adjust the tint [T2]. | Group tools consistently and keep secondary controls optional. Build the core task before adding a large toolbox or tint settings. |
| Genio Notes / Glean | Official feature matrix describes notes, labels, tasks, slide import and audio-synced transcription; web/mobile feature availability differs [G1]. The accessibility statement publishes evaluation information and ACR links [G2]. Rebrand documentation identifies the move from Glean to Genio Notes [G3]. | Keep context attached to source material; disclose platform limits and testing scope. Classroom recording/transcription is an adjacent workflow, outside Signal's current MVP. |
| Goblin Tools Magic Todo / Taskmaster | Magic Todo documents task decomposition with adjustable “spiciness” and item tools [B1]. Taskmaster presents tasks one at a time, with a timer and optional next-task suggestion; its empty state directs users to add items in Magic Todo [B2]. | One-step views already exist. Differentiate through requirement preservation, exact source support and surfaced ambiguity. Make a timer optional if introduced; retain source-specified durations as instructions. |

## Comparison against the six requested sections

“Not verified” means this review did not establish an exact specification. Product support documentation is not a complete public design system.

| Section | Immersive Reader | Read&Write | Genio Notes | Goblin Tools | Signal decision |
|---|---|---|---|---|---|
| **1. Foundations** | User-adjustable font, size, spacing and themes [M1–2]; exact token scales not verified | User-adjustable screen tint [T2]; font/spacing/radius tokens not verified | Dark theme appears in feature matrix [G1]; complete tokens not verified | Full token system not verified | Define original semantic color tokens, measured contrast pairs, Arial hierarchy and 8px spacing; don't copy an assumed competitor palette |
| **2. Components** | Text/reading preference controls and read-aloud [M1–2] | Configurable toolbars and screen-mask settings [T1–2] | Notes, labels, tasks and playback-related features [G1]; complete state inventory not verified | Task entries, decomposition controls and one-task execution [B1–2] | Specify label, anatomy, size and all states for the v1 inventory; use explicit words with icons |
| **3. Layout & responsiveness** | Adjustable reading-column width in Edge [M2]; breakpoints not verified | Horizontal, vertical and writing toolbar modes [T1]; breakpoint rules not verified | Web/mobile matrix shows differing capabilities [G1]; device specs published [G4] | Task list and one-at-a-time presentation documented [B1–2]; exact grids not verified | Own 4/8/12-column outer grids, 680px reading width and 320px reflow checks; same reading order across widths |
| **4. UX patterns & content** | Separate preference categories and user-controlled reading [M1–2] | Select a toolbar mode through settings [T1] | Source-linked transcription and task/notes organization [G1] | Explicit empty-state route to Magic Todo; item completion and optional suggestions [B2] | Stable context, clear recovery, reversible completion, exact source access and no invented classroom status |
| **5. Accessibility** | Documented presentation aids are features, not proof of whole-product conformance [M1–2] | Documented literacy/presentation supports are not an audit [T1–2] | Vendor reports WCAG 2.1/2.2 AA for Notes Web and Present, evaluated with Level Access; inspect the exact platform/report for claims [G2, G5] | No verified conformance statement in reviewed pages | Target WCAG 2.2 AA; test actual journeys, publish tested scope, and never infer compliance from competitor marketing |
| **6. Do's and don'ts** | No full public usage-rule set established | No full public usage-rule set established | No full public usage-rule set established | No full public usage-rule set established | Create Signal's own labeled side-by-side examples; do not attribute our rules to competitors |

## Decisions to carry into the UI and deck

Adopt the **pattern** of user-controlled presentation from Immersive Reader, configurable secondary tools from Read&Write, source-connected context from Genio, and task/list switching from Goblin Tools. These are design inferences, not evidence that copying them improves learning.

Signal's proposal is narrower: **rejoin an activity without losing requirements**. Every visual demo must keep exceptions and uncertainty visible, distinguish saved progress from teacher-provided stage, and provide the original instructions. Task breakdown and a one-step interface are not novelty claims.

Do not copy brand colors, logos, exact layouts, a competitor's compliance claim or clinical messaging. The exact token values, grids, button states, slide master and do/don't comparisons in [Signal's standard](ui-standard.md) are our proposed decisions. No competitor color contrast ratios are asserted because rendered foreground/background pairs were not measured.

## Primary sources

- **M1** — [Microsoft: Immersive Reader in PowerPoint](https://support.microsoft.com/en-us/powerpoint/use-immersive-reader-in-powerpoint). Preference categories and user controls.
- **M2** — [Microsoft: Immersive Reader in Edge](https://support.microsoft.com/en-gb/education/learning-accelerators/use-immersive-reader-in-microsoft-edge-1). Reading width, themes and line focus; platform-specific.
- **T1** — [Texthelp: toolbar modes](https://academy.texthelp.com/read-and-write-education/howtos/setting-up-readwrite-to-cowriter-and-snapread/). Horizontal, vertical and writing modes.
- **T2** — [Texthelp: tint your screen](https://academy.texthelp.com/read-and-write-education/howtos/tint-your-screen/). Screen Masking and settings panel.
- **G1** — [Genio-hosted Glean web/mobile feature comparison](https://genio.co/hubfs/AT%20Services/Glean%20Feature%20Comparison.pdf). Legacy-branded matrix; use as documented feature evidence, not a guarantee of every current version.
- **G2** — [Genio accessibility statement](https://genio.co/accessibility-statement). Updated 6 August 2026; scope, evaluation and linked reports. Mobile assessment language differs across current pages; do not generalize web conformance to all apps.
- **G3** — [Genio rebrand resources](https://go.genio.co/rebrand-resources). Naming continuity with Glean.
- **G4** — [Genio device compatibility](https://genio.co/specification). Platform/browser requirements, not responsive design tokens.
- **G5** — [Genio Help: accessibility](https://help.genio.co/article/24-accessibility-and-genio). Vendor-reported web conformance as of April 2026; notes possible screen-reader conflicts with single-character shortcuts. This review did not reproduce the audit.
- **B1** — [Goblin Tools Magic Todo](https://goblin.tools/Todo). Task tools and decomposition.
- **B2** — [Goblin Tools Taskmaster](https://goblin.tools/TaskMaster). One-at-a-time task workflow, timer and empty state.
