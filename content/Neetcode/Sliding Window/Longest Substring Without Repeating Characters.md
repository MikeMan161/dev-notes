---
lastmod: 2026-06-20 22:13
date: 2026-06-20 18:12
---

Using that same technique from Sliding Window, I'll ask those 3 questions again:
1. When do you expand right?
2. When do you expand left
3. When do you update the result?

So my first draft: I iterate the right pointer all the way to the end of the string. along the way, I'd use a hashmap to keep track of the frequency of how many letter there are in the string. then, I'd iterate the left pointer until each letter tracked in the hashmap has a frequency of 1. the difference in their position determines the length of the substring.

final implementation:
1. expand right - always one character at a time, adding to frequency map
2. shrink left - as soon as the frequency goes over 1, remove the leftmost entry, as a duplicate entered the window
3. update the result - after shrinking, window is valid, check against maxlength. if larger, replace.

