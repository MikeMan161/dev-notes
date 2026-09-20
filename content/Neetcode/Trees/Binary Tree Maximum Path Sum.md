---
date: 2026-07-18 12:00
lastmod: 2026-09-19 13:12
topic: Trees
url: https://neetcode.io/problems/binary-tree-maximum-path-sum/question?list=neetcode150
last-solved: 2026-09-19
interval: 7
---
## Attempt 1:
I feel incredibly good!! I immediately realized that this question was similar to diameter of a binary tree, just passing up the max sum instead of longest path.

Pattern: post-order DFS with a split return: record one value, return another. the node bends through it, but the parent must only use a straight line (one child only). Literally exactly the same as diameter of a binary tree, just with one differentiator.