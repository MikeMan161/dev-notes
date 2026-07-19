---
date: 2026-07-18 12:00
lastmod: 2026-07-19 14:35
topic: Arrays & Hashing
url: https://neetcode.io/problems/longest-consecutive-sequence/question?list=neetcode150
last-solved: 2026-07-19
interval: 3
---
We are given the constraint that the algorithm must be in O(n). the array of integers is not guaranteed to be in order in the original array.

since we want to stay at or under O(n), we can convert it into a set since they have a lookup of O(1), and then we can use sorted() to return a new sorted list from the iterable

now that we have a sorted list, we can begin to go through it. 

how can we determine the start of a sequence? well, we know something's the start of a sequence when there isnt a (n-1) number in the list. once we do that, we keep iterating till we can't find (n+1). as we're doing this, we have a temp variable that records how long the sequence goes for. once it stops, record that temp variable in a permanent one, then we move on and keep looking for a number that doesn't have an n-1 number, then keep checking how long till we can't find n+1. we can compare the temp variable to the permanent one, and depending on which is larger, you overwrite or ignore. at the end, we output the length ofthe longest