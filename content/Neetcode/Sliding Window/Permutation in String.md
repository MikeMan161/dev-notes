---
lastmod: 2026-06-21 15:20
date: 2026-06-21 15:00
---
Clarifying questions: So by permutation, I assume that means that I need to check whether a variation of s1 is a substring inside s2. the substring must be the same length of s1, and contain each character only once, reguardless of how it's ordered. so valid substrings of abc would be acb, cab, bac. it's specified that the string only contains lowercase letters, so i don't need to account for edge cases such as uppercase letters, nonalphanumeric/nonascii. and if there is no valid substring or the input is empty, return false

My approach would be this: I would use a frequency map here to count the frequencies of each character in a given substring. I don't think i even need to worry about making sure the length is equal, as soon as one of the frequencies is greater than how often it appears in s1, i move the left pointer to that position, shrinking the left window, and keep going till i find a valid substring. the whole program stops as soon as i find a valid substring, if i reach the end and don't see one i return false.

I think i have a better idea: take a frequency map of s1. as the right iterates over the string, it subtracts 1 each time it comes across a character. if the frequency goes to -1, we know that the substring is invalid. at this point, we iterate the left pointer, adding 1 to each character we already came across, up to right, then we keep iterating, repeating this until the end. if every frequency is equal to 0, we know that a valid substring exists.

the 3 questions, again:
1. When do i expand right - I keep expanding until a frequency goes to -1. after shrinking left, keep repeating till end
2. when do i shrink left when frequency goes to -1, shrink, adding 1 to each character in frequency map till reaches right.
3. when do i update - as soon as each entry = 0, return true

