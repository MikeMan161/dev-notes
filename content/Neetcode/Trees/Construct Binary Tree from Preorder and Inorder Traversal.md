---
date: 2026-07-18 12:00
lastmod: 2026-09-16 12:21
topic: Trees
url: https://neetcode.io/problems/binary-tree-from-preorder-and-inorder-traversal/question?list=neetcode150
last-solved: 2026-09-16
interval: 3
---
## Attempt 1:
After doing two hard problems before this, I was so exhausted that I couldn't get it down. I do understand it now: Preorder\[0] gives you the root, and in the inorder array, everything before that number is the left subtree, everything to the right is the right subtree. so split the inorder array, feed those into the recursive function. the length of each of these subtrees can help you split the preorder array into two, then also feed that. each recursion, the root of the new split preorder arrays is the root of this subtree, so do the same thing over and over. 

mid = inorder.index(preorder\[0]) would give you the index to write the slices.
invariant: comparing each node to the root instead of trusting the recursive call.