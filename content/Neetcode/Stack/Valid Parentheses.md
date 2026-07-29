---
date: 2026-06-25 14:23
lastmod: 2026-07-28 19:27
topic: Stacks
last-solved: 2026-07-28
interval: 60
url: https://neetcode.io/problems/validate-parentheses/question?list=neetcode150
---
Like sliding window maximum, this is my first problem dealing with Stacks, so this is a real learning opportunity. 

Clarifying questions: I see that the question already clarifies a few edge cases: every open bracket must be closed by the same type of bracket, open brackets are closed in the correct order, and every close bracket has a corresponding open bracket of the same type. 

So since brackets have a hierarchy already (the most recent must be closed first), a stack is perfect for this approach. 