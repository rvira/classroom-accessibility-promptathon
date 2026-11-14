# Signal token contrast

Calculated from opaque sRGB tokens using the WCAG relative-luminance formula. This verifies these pairs, not overall product conformance. Disabled text is voluntarily checked; inactive controls are exempt. The focus ring uses a 3px surface-colored gap and must not be clipped.

| Foreground / background | Ratio | Threshold | Result |
|---|---:|---:|---|
| `text` / `canvas` | 13.80:1 | 4.5:1 | Pass |
| `text-secondary` / `canvas` | 6.23:1 | 4.5:1 | Pass |
| `text-secondary` / `surface-subtle` | 5.88:1 | 4.5:1 | Pass |
| `on-action` / `action` | 6.61:1 | 4.5:1 | Pass |
| `on-action` / `action-hover` | 8.51:1 | 4.5:1 | Pass |
| `on-action` / `action-active` | 10.51:1 | 4.5:1 | Pass |
| `border` / `canvas` | 4.00:1 | 3:1 | Pass |
| `border` / `surface-subtle` | 3.78:1 | 3:1 | Pass |
| `focus` / `canvas` | 5.58:1 | 3:1 | Pass |
| `focus` / `surface-subtle` | 5.27:1 | 3:1 | Pass |
| `error` / `error-surface` | 6.05:1 | 4.5:1 | Pass |
| `warning` / `warning-surface` | 6.61:1 | 4.5:1 | Pass |
| `success` / `success-surface` | 6.81:1 | 4.5:1 | Pass |
| `disabled-text` / `disabled-surface` | 5.38:1 | 4.5:1 | Pass |
| `text` / `surface` | 14.71:1 | 4.5:1 | Pass |
| `text-secondary` / `surface` | 6.64:1 | 4.5:1 | Pass |
| `border` / `surface` | 4.27:1 | 3:1 | Pass |
| `focus` / `surface` | 5.95:1 | 3:1 | Pass |
| `action` / `canvas` | 6.20:1 | 4.5:1 | Pass |
| `action` / `brand-surface` | 5.75:1 | 4.5:1 | Pass |
| `text` / `brand-surface` | 12.79:1 | 4.5:1 | Pass |
| `text-secondary` / `brand-surface` | 5.77:1 | 4.5:1 | Pass |
| `source` / `source-surface` | 6.83:1 | 4.5:1 | Pass |
| `text` / `source-surface` | 12.57:1 | 4.5:1 | Pass |
| `focus` / `brand-surface` | 5.18:1 | 3:1 | Pass |
| `focus` / `source-surface` | 5.09:1 | 3:1 | Pass |

`divider` is decorative only; do not use it as the sole control boundary. Recalculate any new pairing, overlay, opacity or theme.
