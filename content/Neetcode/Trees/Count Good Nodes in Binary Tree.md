---
date: 2026-07-18 12:00
lastmod: 2026-09-07 13:09
topic: Trees
url: https://neetcode.io/problems/count-good-nodes-in-binary-tree/question?list=neetcode150
last-solved: 2026-09-07
interval: 21
---
## Attempt 1:
I did very well on this first attempt! I spend a long time designing a monotonic stack: pushing per level, popping on the way up, and then i discovered that the call stack already does all of that. That's the invariant: when the state is scoped to root-to-node path, a function parameter is the stack. push on entry, pop on exit, only the top visible, all free. each layer of the function has it's own version of max. This will pop back up in backtracking and in path-sum problems. Worth remembering that recursion already carries a state.