---
date: 2026-07-18 12:00
lastmod: 2026-10-15 12:13
topic: Graphs
url: https://neetcode.io/problems/rotting-fruit/question?list=neetcode150
last-solved: 2026-10-15
interval: 3
---
## Attempt 1:
Multi-source BFS: when something spreads from several starting points at once and the question is minimum time, put every source in the queue at level 0. Each level is one unit of time, so count a level only if it changes something. Stop when the queue is empty _or_ the work is done, and check the count afterward to decide between the answer and -1.