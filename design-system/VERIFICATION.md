# Verification · 14 November 2026

## Current app UI reconciliation

- Production build (`npm run build --prefix app`) passed after the UI replacement.
- Lint (`npm run lint --prefix app`) passed; `git diff --check` passed.
- Static review: shared token import, one H1, persistent visible sample status, labeled input, native inline disclosures, 48px controls, fixed recap at the same checkpoint and inspectable synthetic fixture.
- No gradients, particles, custom modal, fixed overlay or simulated thinking remain in the current screen.
- Browser QA attempted through the browser tool: “The browser access host is unavailable.” Desktop/mobile rendering, real keyboard walkthrough, enlarged text, screen readers and student usability are **not verified**. The responsive CSS is implemented, but a browser pass is still required.
- No backend, adaptive AI, teacher verification or saved progress was added. See [decisions and acceptance](../research/ui-reconciliation.md).

## Historical reference verification

The records below apply to earlier reference-only work, before the current app migration; “unchanged app” statements are historical.


## Completed

- Generated tokens.css and contrast-report.md from tokens.json using Python 3.
- All 14 approved foreground/background pairs meet their stated contrast thresholds. Comparisons use unrounded ratios; report values are rounded to two decimal places.
- Parsed token JSON; checked every CSS variable used by the visual reference exists.
- Parsed the reference HTML; checked unique IDs, labels for text fields, section anchors and linked local files.
- Reviewed content against the synthetic fixture: visible screen specimen includes all requirements, partner-absence exception and unresolved upload destination. The slide is explicitly labeled as an excerpt, not the full instructions.
- Reviewed official competitor documentation; separated documented capabilities, unverified token details, vendor conformance claims and Signal design inferences.

## Blocked / not run

- Browser rendering and keyboard walkthrough were attempted. The in-app browser reported `The browser access host is unavailable`; a native Safari fallback timed out. No screenshot, desktop/mobile visual QA, or keyboard pass is claimed.
- Screen-reader testing, 200% text resizing, 400% zoom, text-spacing overrides, forced colors and student usability testing have not been run.
- No production-app migration or app build was performed; existing app code is unchanged.
- No editable slide deck was generated. The shared master specification and visual slide excerpt are provided for future authoring.

## Manual acceptance when browser access is available

1. Open reference.html at 1440, 768, 375 and 320 CSS px. Check every section, field state, classroom card and slide preview for clipping and horizontal overflow.
2. Tab from the skip link through section links, live fields, checkbox and both disclosures. Confirm visible focus and Enter/Space behavior; static specimens should not be in the tab order.
3. Repeat with text resize, zoom, text-spacing overrides and reduced motion. Inspect the deliberately failing do/don't specimen separately from actual UI content.
4. Test landmarks, headings, labels, state and disclosure announcements with a screen reader. Record browser/AT versions and findings; native controls alone are not proof of compatibility.
5. On implementation, separately test saved progress, undo, final completion, storage failures, draft review and preservation of source requirements.

## Palette revision v1.1 · 14 November 2026

- Replaced the monochrome brand with teal actions, mint current-step context, lavender original-source panels, warm neutral canvas and dark ink text.
- Regenerated CSS and calculated contrast report: all 26 specified pairs pass their stated thresholds, including source/current-step surfaces and keyboard focus on those surfaces.
- Updated the visual reference, slide example, philosophy, standard, research index and historical-note precedence together.
- Rechecked browser availability: the browser host remains unavailable. This revision has not received rendered visual QA or assistive-technology testing.
- App code remains unchanged; this revision updates the reusable design standard and its specimens.
