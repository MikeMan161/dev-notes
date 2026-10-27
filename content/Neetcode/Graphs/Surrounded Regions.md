---
date: 2026-07-18 12:00
lastmod: 2026-10-19 11:26
topic: Graphs
url: https://neetcode.io/problems/surrounded-regions/question?list=neetcode150
last-solved: 2026-10-19
interval: 7
---
## Attempt 1:
I'm starting to see a real pattern in these questions. the most immediate answer seems to be a dfs on cells, doing bookkeeping, and figuring out lots of combinations, but if you think about it, for these questions you can flip the conditions and end up with a much easier and faster solution! here, the survivors are every O connected to an edge O, so instead of searching all the middle cells to find which ones are surrounded, instead find the survivors that connect from the edge, then you know that every other cell in the graph you didnt reach from the edge is guaranteed to be surrounded, so you can then go and just sweep the board once, turning every remaining 0 into Xs. 

Pattern: Reverse flood fill from the boundary. when you see a condition defined by a connection to the edge, search from the edge inward instead of checking every cell outward. 