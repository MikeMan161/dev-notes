---
date: 2026-07-18 12:00
lastmod: 2026-09-06 16:26
topic: Trees
url: https://neetcode.io/problems/level-order-traversal-of-binary-tree/question?list=neetcode150
last-solved: 2026-09-06
interval: 7
---
## Attempt 1:
I was able to do pretty decent on my first attempt. the pattern here is BFS with level-size snapshotting. the whole trick is that the length of what you have to loop across is the length of a queue that holds the children. 