---
lastmod: 2026-06-20 18:36
date: 2026-06-20 18:12
---

Using that same technique from Sliding Window, I'll ask those 3 questions again:
1. When do you expand right?
2. When do you expand left
3. When do you update the result?

So my first draft: I iterate the right pointer all the way to the end of the string. along the way, I'd use a hashmap to keep track of the frequency of how many letter there are in the string. then, I'd iterate the left pointer until each letter tracked in the hashmap has a frequency of 1. the difference in their position determines the length of the substring.

As i'm writing the code, the first part is easy, iterating with the right pointer and updating the hashmap. my issue now is how do i stop the left pointer? As we iterate the left pointer, we 