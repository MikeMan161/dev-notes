---
date: 2026-07-18 12:00
lastmod: 2026-11-08 14:51
topic: Arrays & Hashing
last-solved: 2026-11-08
interval: 3
url: https://neetcode.io/problems/two-integer-sum/question?list=neetcode150
---
## Attempt 1:
we store the compliments to the number. so at x=0, we do target - nums\[x] to give us the number we'd need later on to solve the problem, we then store that numver plus the index for future use. we then check first if the next number is in the hashmap. if it is, we've found the number that completes the previous number, so we return that previous index and the current one. I thought of 3 sum and thought id need to do a two pointers again, but i was wrong. this was basically a fresh question anyway. sorting breaks what the question wants, which is the original indices.