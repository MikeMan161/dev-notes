---
date: 2026-07-18 12:00
lastmod: 2026-08-24 18:02
topic: Linked List
url: https://neetcode.io/problems/remove-node-from-end-of-linked-list/question?list=neetcode150
last-solved: 2026-08-24
interval: 7
---
## Attempt 1:
You can't walk backwards of course, so a fixed forward distance between two pointers is the backwards index. when the outer one runs off the end, the inner one is standing where you need it. two notes:
the dummy node needs to be wired before anything moves, and return dummy.next, never head.