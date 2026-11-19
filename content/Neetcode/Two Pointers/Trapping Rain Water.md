---
date: 2026-07-18 12:00
lastmod: 2026-11-11 17:45
topic: Two Pointers
url: https://neetcode.io/problems/trapping-rain-water/question?list=neetcode150
last-solved: 2026-11-11
interval: 7
---
## Attempt 2:
Wow, i'm very proud of this one!! i made a connection to that one question that's product of array except self and that turned out to be the perfect connection! the way to solve this is a prefix and suffix to get the left and right edges for every index. if the left and right edges are greater than the current index, that means this current index can hold water, so the min of the two edges minus the height is the amount of water that particular index can hold. 