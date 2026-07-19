---
date: 2026-07-18 12:00
lastmod: 2026-07-19 14:18
topic: Arrays & Hashing
url: https://neetcode.io/problems/anagram-groups/question?list=neetcode150
last-solved: 2026-07-19
interval: 7
---
- **Key insight:** I had the logic correct, but the implementation tripped me up. Anagrams are strings that share the same letters, in different orders. The approach i came up with was this: since in order for words to be anagrams, they have to have the exact same characters, I could sort each word and compare them. If they're equal, that means they're anagrams.
- The part that tripped me up was the fact that if i used the function sorted() on the variable, sorted returns a list of characters, and lists arent hashable, so I wasnt able to just simply compare or place that as the key in a hashmap. I had to use join() to convert it into a string, then I was able to place it in the hashmap and compare it. 
