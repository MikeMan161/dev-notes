---
date: 2026-07-18 12:00
lastmod: 2026-10-27 17:07
topic: Graphs
url: https://neetcode.io/problems/course-schedule/question?list=neetcode150
last-solved: 2026-10-27
interval: 3
---
## Attempt 1: 
Every node is in one of three states:

- **Unvisited.**
- **On the current path.** You’re still exploring below it. This is your stack.
- **Done.** Everything below it has been explored and no loop was found, so it’s safe forever.

if the loop ever comes back to a number in the current set, there's a loop.