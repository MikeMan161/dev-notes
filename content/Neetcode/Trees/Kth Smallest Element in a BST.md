---
date: 2026-07-18 12:00
lastmod: 2026-09-16 10:56
topic: Trees
url: https://neetcode.io/problems/kth-smallest-integer-in-bst/question?list=neetcode150
last-solved: 2026-09-16
interval: 3
---
## Attempt 1: 
I did not even get to code anything this time. The pattern here is in-order traversal. the signal that should trigger is a BST plus anything about sorted order or ranks. Seeing both should trigger in-order traversal in my mind immediately. The problem reduces to walking in sorted order and stopping at the kth node you visit.

A node's real position depends on everything visited before it, and some that lives outside its own subtree. There are two ways to fix it:

- **Outside Counter**. One variable counts nodes as they're visited. each node increments it when it's visited, meaning between the left and right call, and checks against k
- Pass in how many nodes were visited before this subtree, return how many were visited after finishing this subtree, node calls left with the count it recieved, adds one for itself, checks against k, calls right with that updated count and returns whatever the right returns