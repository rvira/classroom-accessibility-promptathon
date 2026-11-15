## Description

Briefly describe the intent and changes included in this pull request.

Fixes #(issue)

---

## Type of Change

Please mark the relevant option(s) with an `x`:

- [ ] 🐛 **Bug fix** (non-breaking change fixing an issue)
- [ ] ✨ **New feature** (non-breaking change adding functionality)
- [ ] ♿ **Accessibility enhancement** (fixes or advances WCAG 2.2 AA conformance)
- [ ] ♻️ **Refactor** (code cleanup or optimization without UI/functional regression)
- [ ] 📝 **Documentation** (updates or additions to project docs)
- [ ] ⚙️ **CI / DevOps** (tooling, workflows, Docker, or build configuration)

---

## ♿ Accessibility Verification (WCAG 2.2 AA)

Bullseye prioritizes accessible, neurodivergent-friendly experiences. Please verify the following checks:

- [ ] **Contrast Verification:** Text meets ≥ 4.5:1 and UI boundaries meet ≥ 3:1 contrast against backdrops (`python3 design-system/build_tokens.py`).
- [ ] **Keyboard Navigability:** All interactive components can be reached, focused, and operated via `Tab`, `Enter`, `Space`, and `Escape` without mouse interaction.
- [ ] **Visible Focus Rings:** Focused elements display an unclipped, high-contrast 3px focus indicator.
- [ ] **Motion & Sensory Sensitivity:** Animations respect `prefers-reduced-motion` and freeze when Sensory Calm Mode (`c`) is activated.
- [ ] **Screen Reader Compatibility:** Interactive controls have appropriate accessible names (`aria-label`, `<label>`, or text content) and dynamic notices announce through `aria-live`.
- [ ] **Cognitive Load:** The interface preserves Now-First clarity without cognitive clutter.

---

## 🧪 Testing Performed

Describe the testing performed to verify your changes:

- [ ] `npm --prefix app run lint` passes without warnings or errors.
- [ ] `npm --prefix app run build` succeeds cleanly.
- [ ] `npm --prefix server run lint` & `npm --prefix server run build` pass (if server changes made).
- [ ] Tested in browsers (Chrome / Firefox / Safari).
- [ ] Tested with screen reader (VoiceOver, NVDA, or JAWS) if accessibility/UI was touched.

---

## 📸 Screenshots or Recordings (if applicable)

*Attach before/after screenshots or GIFs demonstrating visual or interaction changes.*
