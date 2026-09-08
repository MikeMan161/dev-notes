---
lastmod: 2026-09-07 09:35
date: 2026-08-23 22:00
---
Overall, the main takeaway is that whenever you need fast lookups or dupliate detection, you could convert that array into a set or dictionary/hashmap first. this turns searches from O(n) to O(1), often eliminating the need to use nested loops

Patterns to remember:
- Frequency counting - Dict or Counter
- Duplicate detection - set
- Precomputing Values - prefix arrays (left/right pass)
- 2D to 1D indexing - [[Matrix Notes]]
- Finding Sequence starts - check if n-1 is in set

## Tracker

| Problem                          | Last Solved | Attempt 1 | Attempt 2 | Attempt 3 | Attempt 4 | Attempt 5 |
| -------------------------------- | ----------- | --------- | --------- | --------- | --------- | --------- |
| [[Contains Duplicate]]           | 7/14        | :/        | :)        |           |           |           |
| [[Valid Anagram]]                | 7/25        | :/        | :)        | :)        |           |           |
| [[Two Sum]]                      | 7/14        | :/        | :)        |           |           |           |
| [[Group Anagrams]]               | 7/19        | :/        | :/        |           |           |           |
| [[Top K Frequent Elements]]      |             |           |           |           |           |           |
| [[Encode and Decode Strings]]    | 8/28        | :(        | :/        |           |           |           |
| [[Product of Array Except Self]] | 9/2         | :(        | :(        |           |           |           |
| [[Valid Sudoku]]                 | 09/06       | :(        |           |           |           |           |
| [[Longest Consecutive Sequence]] | 02/24       | :(        | :/        |           |           |           |