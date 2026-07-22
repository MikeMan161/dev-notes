---
date: 2026-07-18 12:00
lastmod: 2026-07-21 12:52
topic: Binary Search
url: https://neetcode.io/problems/time-based-key-value-store/question?list=neetcode150
last-solved: 2026-07-20
interval: 7
---
## Clarifying questions

- This question was very confusing at first, but i did immediately catch on that this would use both a dictionary and binary search to solve.

## Thoughts / approach

- So you'd use the key-value pair of a dictionary, and in the value you'd store the interval and the value, so you can use a binary search on the first variable which is the interval. This asks for mid <= target, so i'd be a left binary search.
