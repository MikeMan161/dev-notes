---
date: 2026-07-18 12:00
lastmod: 2026-10-18 16:27
topic: Graphs
url: https://neetcode.io/problems/pacific-atlantic-water-flow/question?list=neetcode150
last-solved: 2026-10-18
interval: 7
---
## Attempt 1:
I was able to derive the algorithm cold: start from ocean edges, search inward, flip the height condition. I got stuck and hit the wall without working code. The pattern is a multi-source search from the boundary, aka reverse searching. the signal to watch ofr is "which cells can reach x?", same as the treasure question. 