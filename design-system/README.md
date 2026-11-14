# Signal reference system · v1.0

A proposed shared standard for classroom UI and presentation slides. Read [the specification](../research/ui-standard.md) first. Open [reference.html](reference.html) in a modern browser for visual specimens. This is local documentation; it is not a hosted site or a production component library.

## Files

- `tokens.json`: canonical values for color, type, spacing, shape, layout and slides.
- `tokens.css`: generated CSS custom properties, with no global resets.
- `build_tokens.py`: standard-library Python generator and approved-pair contrast checks.
- `contrast-report.md`: generated ratios and thresholds; assertions use unrounded ratios.
- `reference.html`: visual specimens with a few native interactive controls. No network dependencies, tracking, saving or AI calls.
- `VERIFICATION.md`: actual checks, limitations and pending acceptance work.

## Use in the product

Import `../../../design-system/tokens.css` from a component under `app/src/components/`, or `../../design-system/tokens.css` from `app/src/`. Replace hardcoded values with variables deliberately. For example:

```css
.current-step {
  max-width: var(--signal-reading-max);
  color: var(--signal-text);
  background: var(--signal-surface);
  border-radius: var(--signal-radius-panel);
  padding: var(--signal-space-32);
}
```

Tokens do not supply component behavior or certify accessibility. The current app is intentionally not migrated as part of this reference task. Follow the implementation gap list in the standard.

## Use in slides

Create a 16:9 master with the `slide` dimensions, margins and type sizes from tokens.json. Use the same color roles and Arial font. Match the card geometry and vocabulary in the visual reference. The slide sample is an illustrative excerpt, not a complete student screen or an editable deck. It reflows for reading on a phone; use the specified 16:9 master when authoring a deck.

## Update

From the repository root:

```sh
python3 design-system/build_tokens.py
```

Edit tokens.json first. Regenerate CSS and contrast, then update any affected reference layouts and tables in the specification. Typography and spacing demonstrations are explicit examples rather than a generated UI library. Do not edit generated files independently. Changing colors requires checking every newly used pair, not just the approved list.
