---
date: 2026-07-18 12:00
lastmod: 2026-08-18 12:40
topic: Linked List
url: https://neetcode.io/problems/reverse-a-linked-list/question?list=neetcode150
tags:
last-solved: 2026-08-18
interval: 21
---
I was having a very difficult time understanding linked lists. It's pretty different from everything i've done so far, everything before kind of felt like a spin on arrays. I had to step back and really understand how linked lists are, and now I feel like I'm beginning to understand them.

This problem is relatively simple, the whole thing is that you can't just swap where each node points to, as once you do that you essentially break the chain. so you need to keep track of the next node, so that when you reroute the arrow you can still keep going in the chain. once you do that, it's as simple as just saving the next node, repointing where the current node is pointing, then going to the next one and that reverses the list. 
