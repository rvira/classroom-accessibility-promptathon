# Signal token contrast

Calculated from opaque sRGB tokens using the WCAG relative-luminance formula. This verifies these pairs, not overall product conformance. Disabled text is voluntarily checked; inactive controls are exempt. The focus ring uses a 3px surface-colored gap and must not be clipped.

| Foreground / background | Ratio | Threshold | Result |
|---|---:|---:|---|
| `text` / `canvas` | 17.93:1 | 4.5:1 | Pass |
| `text-secondary` / `canvas` | 7.81:1 | 4.5:1 | Pass |
| `text-secondary` / `surface-subtle` | 7.17:1 | 4.5:1 | Pass |
| `on-action` / `action` | 17.93:1 | 4.5:1 | Pass |
| `on-action` / `action-hover` | 12.63:1 | 4.5:1 | Pass |
| `on-action` / `action-active` | 21.00:1 | 4.5:1 | Pass |
| `border` / `canvas` | 4.74:1 | 3:1 | Pass |
| `border` / `surface-subtle` | 4.35:1 | 3:1 | Pass |
| `focus` / `canvas` | 5.95:1 | 3:1 | Pass |
| `focus` / `surface-subtle` | 5.46:1 | 3:1 | Pass |
| `error` / `error-surface` | 6.05:1 | 4.5:1 | Pass |
| `warning` / `warning-surface` | 6.61:1 | 4.5:1 | Pass |
| `success` / `success-surface` | 6.81:1 | 4.5:1 | Pass |
| `disabled-text` / `disabled-surface` | 6.20:1 | 4.5:1 | Pass |

`divider` is decorative only; do not use it as the sole control boundary. Recalculate any new pairing, overlay, opacity or theme.
