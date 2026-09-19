---
date: 2026-07-18 12:00
lastmod: 2026-09-18 12:30
topic: Binary Search
url: https://neetcode.io/problems/median-of-two-sorted-arrays/question?list=neetcode150
last-solved: 2026-09-17
interval: 3
---
# Attempt 1 Notes
I've heard this is considered among the hardest, if not the hardest neetcode problem out of them all, and that definitely showed when i tried it. I saw that a lot of people don't even try to implement the optimal solution, which is a binary search. I wasnt able to solve this on my own, but i definitely got the logic down so the next time i should have more of a fighting chance. 
I took a notepad out and fully wrote down the logic. it was very very tricky, but i finally see the full picture:

## Attempt 2 Notes
Binary search doesn't have to search for a value in an array, it can search over a decision. "how many elements do i take from the smaller array?" the search space is 0..m, the check that says go left or right is a validity test on the partition, not a comparison against a target.
