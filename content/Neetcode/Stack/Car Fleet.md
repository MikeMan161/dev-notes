---
date: 2026-07-13 16:22
lastmod: 2026-07-13 18:08
topic: Stacks
last-solved: 2026-07-13
interval: 21
url: https://neetcode.io/problems/car-fleet/question?list=neetcode150
---
- Pattern- another monotonic stack
- key insights: time to target = (target - position) / speed. A car merges into the car in front of it if its time to target is <= the time to target of the car in front of it. so sort by position, determine time to target, then iterate right to left, checking where the time increases.
- A stack isn't even really needed, just the top to keep track of the max time to target.
- complexity: the only reason why the time complexity is O(n log n) is because of the sort. o(n) space
- what i did right this time: I traced the array before writing any major code, allowing me to not get lost!