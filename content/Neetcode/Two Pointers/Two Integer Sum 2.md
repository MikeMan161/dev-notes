---
date: 2026-07-18 12:00
lastmod: 2026-09-08 14:11
topic: Two Pointers
url: https://neetcode.io/problems/two-integer-sum-ii/question?list=neetcode150
last-solved: 2026-09-08
interval: 21
---
Given an array of integers `numbers` that is sorted in **non-decreasing order**.

Return the indices (**1-indexed**) of two numbers, `[index1, index2]`, such that they add up to a given target number `target` and `index1 < index2`. Note that `index1` and `index2` cannot be equal, therefore you may not use the same element twice.

There will always be **exactly one valid solution**.

Your solution must use O(1)O(1) additional space.


I already know the approach to this question!
we'd start with the indexes on opposite sides of the array. then, we calculate the sum. if the sum is too large, increment the right index by -1. if it's too small, increment the left index by 1. we do this until we reach the target sum.

Done! the only issue i had is that i didnt know what 1-indexed meant, so my results were off by 1. 1-indexed just means that the index starts at 1, not 0, so i had to adjust my output to compensate. other than that, i got it easily!

## Attempt 1:
So I didnt try this problem again until the middle of september (last time was july) so although I basically solved this one cold, it only took me 2 minutes and I solved it easily.