---
date: 2026-07-13 13:35
lastmod: 2026-07-13 13:38
topic: Stacks
last-solved: 2026-07-13
interval: 3
url: https://neetcode.io/problems/daily-temperatures/question?list=neetcode150
---
- Pattern: Monotonic stack (decreasing), traversed right to left
- insights: this problem was a MAJOR headache, traversing through the list backwards really threw me for a loop and i had a very hard time following my own logic, i was getting twisted up a lot. store indices, not values, as that tells you how far away a given day is when you subtract. Also, equal temps get popped. Warmer is strict, so an equal temp can never be a valid answer. 
- Fixes: trace through the problem before editing, as that can make things even more confusing