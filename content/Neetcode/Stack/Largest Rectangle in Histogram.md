---
lastmod: 2026-07-13 23:48
date: 2026-07-13 22:00
---
- **Pattern:** Monotonic stack (increasing indices by height), left-to-right sweep **Key insight:** For each bar, find how far left and right you can extend while staying >= that bar's height. That width times the bar's height is a candidate rectangle. 
- **Monotonic stack approach:** Pop when you hit a shorter bar. When you pop bar j: - Height = heights[j] - Right boundary = current index i (what triggered the pop) - Left boundary = stack[-1] after the pop (or "before array starts" if empty) - Width = i - stack[-1] - 1, OR just i if stack is empty 
- **Leftover bars:** After the main loop, pop remaining bars with right boundary = len(heights) **
- Empty stack width:** When stack is empty, width = right_boundary (extends to the start) **Bug to watch:** Nested if/else with identical branches → collapse to just the while **Complexity:** O(n) time (each bar pushed/popped once), O(n) space (stack)