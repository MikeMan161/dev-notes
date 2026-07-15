---
lastmod: 2026-07-14 13:09
date: 2026-07-14 10:40
---
- Key insights: First problem with binary search! this is O(log n), since it has us continuously cutting the array in half to find the answer. I'm also using an approach where both sides are closed, so the while loop is left <= right, and the shrink motion is mid +- 1
- we do left <= right in order to ensure every number in the array is accounted for, the loop only stops when left > right, so we ensure we see everything.
- What i did right: I was able to nail all of the logic easily, and write the code with no help!