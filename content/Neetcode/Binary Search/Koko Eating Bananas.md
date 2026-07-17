---
lastmod: 2026-07-15 14:33
date: 2026-07-14 22:38
---
- Key insight — binary search on the _answer space_, not an array. Eating rate `k` is monotonic: too slow = can't finish (`False`), fast enough = can (`True`). Left boundary search finds the smallest `k` that flips to `True`. When a `k` works, keep searching left (`right = mid - 1`) for a smaller one.
- Search bounds — `left = 1`, `right = max(piles)`. These are `k` values, not indices, so start at 1. Anything above max(piles) is pointless (every pile already takes 1 hour).
- The check `canFinish(k)` — sum `ceil(pile / k)` over all piles, return `hours <= h`. Then it's the same 704 skeleton, just swap "compare nums[mid]" for "call canFinish(mid)."
- Major bug fixes — division was backwards (`k // pile`), then it floored instead of ceiled. Also blanked on loop var setup (`x = 0` / `x += 1`) and wrote `plies.max()` instead of `max(piles)`.
- Tips for future me — ceiling division = `-(-pile // k)`. The double negation flips floor into round-up. And watch the complexity: `canFinish` is O(n) but it's called _inside_ the log loop, so it's O(n · log(max(piles))) — nested, not added.