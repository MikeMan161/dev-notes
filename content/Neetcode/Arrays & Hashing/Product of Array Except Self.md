---
date: 2026-07-18 12:00
lastmod: 2026-09-02 12:23
topic: Arrays & Hashing
url: https://neetcode.io/problems/products-of-array-discluding-self/question?list=neetcode150
last-solved: 2026-09-02
interval: 3
---
## Attempt 2:
I was able to derive the formula myself: output\[i] = (product of everything left of i) * (product of everything to the right of i). build a prefix array in one forward pass and a suffix array in one backwards pass, then multiply element wise. empty products are 1.