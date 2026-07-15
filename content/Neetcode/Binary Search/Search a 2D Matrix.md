---
lastmod: 2026-07-14 21:25
date: 2026-07-14 13:08
---
- key insight: I used a binary search on a 2D matrix approach. using my [[Matrix Notes]] I was able to essentially treat the matrix as one 1-D array, searching through indices 0 to m\*n - 1 then do binary search on that. when i do the binary search, you can do row = mid // n , col = mid % n to get the coordinates for the middle (matrix\[row]\[col]). 
- Same exact bones as a normal binary search, just with the two line index conversion.
- Time complexity is log(m\*n), halving the search size of m\*n. O(1) space
- My main issue is not sticking to the backbone of binary search, it's essentially the exact same just with that conversion. 