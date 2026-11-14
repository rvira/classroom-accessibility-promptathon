import json,pathlib
p=pathlib.Path(__file__).resolve().parent
tokens=json.loads((p/'tokens.json').read_text())
colors=tokens['colors']
css=[f"/* Signal {tokens['version']} — generated from tokens.json by build_tokens.py. */",':root {']
for k,v in colors.items():css.append(f'  --signal-{k}: {v};')
css += [f"  --signal-font: {tokens['font']['family']};"]
for k,v in tokens['typePx'].items():css.append(f'  --signal-type-{k}: {v/16:g}rem;')
for v in tokens['spacingPx']:css.append(f'  --signal-space-{v}: {v/16:g}rem;')
for k,v in tokens['radiusPx'].items():css.append(f'  --signal-radius-{k}: {v}px;')
css += [f"  --signal-reading-max: {tokens['layoutPx']['readingMax']}px;", f"  --signal-page-max: {tokens['layoutPx']['pageMax']}px;", f"  --signal-shadow-overlay: {tokens['elevation']['overlay']};", '}']
(p/'tokens.css').write_text('\n'.join(css)+'\n')
def lum(h):
 c=[int(h[i:i+2],16)/255 for i in (1,3,5)];c=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in c];return sum(x*y for x,y in zip(c,[.2126,.7152,.0722]))
pairs=[('text','canvas',4.5),('text-secondary','canvas',4.5),('text-secondary','surface-subtle',4.5),('on-action','action',4.5),('on-action','action-hover',4.5),('on-action','action-active',4.5),('border','canvas',3),('border','surface-subtle',3),('focus','canvas',3),('focus','surface-subtle',3),('error','error-surface',4.5),('warning','warning-surface',4.5),('success','success-surface',4.5),('disabled-text','disabled-surface',4.5)]
pairs += [('text','surface',4.5),('text-secondary','surface',4.5),('border','surface',3),('focus','surface',3),('action','canvas',4.5),('action','brand-surface',4.5),('text','brand-surface',4.5),('text-secondary','brand-surface',4.5),('source','source-surface',4.5),('text','source-surface',4.5),('focus','brand-surface',3),('focus','source-surface',3)]
rows=[]
for a,b,t in pairs:
 ratio=(max(lum(colors[a]),lum(colors[b]))+.05)/(min(lum(colors[a]),lum(colors[b]))+.05)
 assert ratio>=t,(a,b,ratio)
 rows.append(f'| `{a}` / `{b}` | {ratio:.2f}:1 | {t}:1 | Pass |')
(p/'contrast-report.md').write_text('# Signal token contrast\n\nCalculated from opaque sRGB tokens using the WCAG relative-luminance formula. This verifies these pairs, not overall product conformance. Disabled text is voluntarily checked; inactive controls are exempt. The focus ring uses a 3px surface-colored gap and must not be clipped.\n\n| Foreground / background | Ratio | Threshold | Result |\n|---|---:|---:|---|\n'+'\n'.join(rows)+'\n\n`divider` is decorative only; do not use it as the sole control boundary. Recalculate any new pairing, overlay, opacity or theme.\n')
