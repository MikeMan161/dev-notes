---
date: 2026-07-18 12:00
lastmod: 2026-08-31 08:33
topic: Trees
url: https://neetcode.io/problems/binary-tree-diameter/question?list=neetcode150
last-solved: 2026-08-31
interval: 21
---
## Attempt 1
I derived the whole algorithm, but i just got stuck at the very end with the implementation. To find the max Diameter, you basically find the max of both subtree depths for each node. 

## Attempt 2:
This time, i did the problem completely fresh (in the middle of a physics 2 lecture at that) and this time I solved it perfectly! I think the real big issue last time was that I was focusing way too much on how to keep track of variables and stuff and all the recursiveness got me super lost. I think the biggest thing that helped this question be much easier is that I was worried about keeping like running variables throughout the function, and the real solution was just returning the values directly. like return max(leftDepth, rightDepth) + 1. Once that clicked, it was actually very straightforward.