---
date: 2026-07-13 22:00
lastmod: 2026-08-24 13:53
topic: Stacks
last-solved: 2026-08-24
interval: 7
url: https://neetcode.io/problems/largest-rectangle-in-histogram/question?list=neetcode150
---
- **Pattern:** Monotonic stack (increasing indices by height), left-to-right sweep **Key insight:** For each bar, find how far left and right you can extend while staying >= that bar's height. That width times the bar's height is a candidate rectangle. 
- **Monotonic stack approach:** Pop when you hit a shorter bar. When you pop bar j: - Height = heights[j] - Right boundary = current index i (what triggered the pop) - Left boundary = stack[-1] after the pop (or "before array starts" if empty) - Width = i - stack[-1] - 1, OR just i if stack is empty 
- **Leftover bars:** After the main loop, pop remaining bars with right boundary = len(heights) **
- Empty stack width:** When stack is empty, width = right_boundary (extends to the start) **Bug to watch:** Nested if/else with identical branches → collapse to just the while **Complexity:** O(n) time (each bar pushed/popped once), O(n) space (stack)

## Attempt 2 
so this time I had an issue where I thought about a monotonic stack, but i just didn't test that theory. from now on, i need to trust my gut, and false check it to ensure i am right. 