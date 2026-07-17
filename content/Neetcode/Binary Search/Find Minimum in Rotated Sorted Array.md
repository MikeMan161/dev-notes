---
lastmod: 2026-07-15 16:41
date: 2026-07-15 15:46
---
- Key insight: This is another typical binary search, with a twist. the array is sorted, but shifted, so in a way there's sort of two halves to the array. for example: \[1,2,3,4,5,6] shifted 4 spots would be \[3,4,5,6,1,2]. 
- So the approach is this: do the typical binary search framework, but when you check the value of mid, and it's larger than the right, you know that everything to the left is larger than the value at the right pointer, so you shrink left to mid - 1. we do mid - 1 specifically for this because we know that since the value at mid is larger than the value at the right, it's incorrect too. however, if mid is smaller than the right, then everything to the right of mid is larger, so we shrink right to mid. we don't do mid - 1 for this side because mid is still a valid answer, and could be the the correct answer, so we keep it in scope. once left == right, we know that mid is the answer, so return it
- 