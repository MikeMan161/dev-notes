---
lastmod: 2026-08-04 15:34
date: 2026-08-04 14:26
---
So right now, after doing the backend work to compute limit and spent for each bucket, now I'm trying to actually make the progress bar dynamic. here are my notes: 

### Two-Phase Bucket Bar

The bucket card's progress bar has two visual phases driven by one derived boolean, `isOver`. In the normal phase (spent ≤ limit) the bar is green and _depletes_ as money is spent,full envelope reads full, and it empties toward zero as `spent` approaches `limit`, using `(limit - spent) / limit`. Once spending passes the limit, the bar flips to red and _refills_ to show how far over budget the envelope is, using `(spent - limit) / limit`, capped at 100% via `Math.min(over / limit, 1)` so a wildly overspent bucket just shows a full red bar rather than overflowing,the exact dollar amount in the text carries the "how far over" detail past that point. A `limit <= 0` guard is checked first so that an unset income (which makes every limit 0) can't trigger a divide-by-zero and produce `NaN`.

A single `isOver` value feeds all four outputs,the bar fill, the color, the label ("Amount Left" vs "Over Budget"), and the dollar text ("X left of $Y" vs " X over your $Y limit"),so the four can never disagree about which phase the card is in. The flip to red uses `over > 0` (strictly greater), meaning a bucket spent to _exactly_ its limit still reads as empty-green, not red; "over" means genuinely past the limit, not merely at it.

### Reaching the shadcn Progress indicator's color

shadcn's `Progress` renders its own internal track and indicator and passes them nothing, and any `className` from the caller lands on the outer Root element, not the indicator two levels down,so the bar's color was sealed off. The fix was to add an optional `indicatorClassName` prop to the `Progress` component, destructure it out of props (so the spread `{...props}` doesn't forward an unknown attribute onto a real DOM node), and pass it down to the indicator. The prop is optional and falls back to the default color, so existing call sites are unaffected. Domain vocabulary (budget, envelope, over) is deliberately kept _out_ of `components/ui/*`, since that's regenerable shadcn code,the generic `indicatorClassName` seam lives in the UI primitive, and the domain meaning (green vs red) lives in the `Bucket` component that consumes it.

### The `--success` design token

The theme shipped with no green,`--primary` is near-black and the chart tokens are all neutral grays,so `bg-success` didn't exist as a utility. Adding it mirrored how `--destructive` is already wired: a `--color-success: var(--success)` entry in `@theme` (which is what makes the `bg-success` utility exist at all), plus the `--success` color defined in both `:root` and `.dark`. The dark value is lighter and less saturated than the light one, matching `--destructive`'s light→dark step, because a saturated mid-tone that reads well on white goes muddy against a near-black background.

### Display-only formatting note

Dollar amounts run through `.toFixed(2)` at render time only. The backend sends exact values, but the frontend does its own arithmetic (`spent - limit`, `over / limit`) in JavaScript floats, which can produce long decimals like `33.333…`. The fix is applied only to the displayed text, never to the number fed into the bar's `value`,exact math internally, clean formatting at the boundary, the same principle the backend uses with Decimal.