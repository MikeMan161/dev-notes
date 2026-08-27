---
date: 2026-07-18 12:00
lastmod: 2026-08-23 22:17
topic: Linked List
url: https://neetcode.io/problems/reorder-linked-list/question?list=neetcode150
last-solved: 2026-08-30
interval: 7
---
## Attempt 1 notes:
so i was able to reach the full approach independently. Halve the list, reverse the second half, interleave, and i realized the whole deriving the fast/slow midpoint myself. the merge mechanics was what really got me, it got all tangled up in my head. I knew that i needed to save the .next fields before overwriting, but i wasnt able to fully solve it. I need to remember the invariant, basically remembering to save the next references, or else i lose the list.