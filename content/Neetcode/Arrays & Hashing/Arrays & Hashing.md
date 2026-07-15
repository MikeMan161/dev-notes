[[Contains Duplicate]]
[[Valid Anagram]]
[[Two Sum]]
[[Group Anagrams]]
[[Top K Frequent Elements]]
[[Encode and Decode Strings]]
[[Product of Array Except Self]]
[[Valid Sudoku]]
[[Longest Consecutive Sequence]]

Overall, the main takeaway is that whenever you need fast lookups or dupliate detection, you could convert that array into a set or dictionary/hashmap first. this turns searches from O(n) to O(1), often eliminating the need to use nested loops

Patterns to remember:
- Frequency counting - Dict or Counter
- Duplicate detection - set
- Precomputing Values - prefix arrays (left/right pass)
- 2D to 1D indexing - [[Matrix Notes]]
- Finding Sequence starts - check if n-1 is in set