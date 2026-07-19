---
date: 2026-06-21 12:01
lastmod: 2026-06-21 13:40
topic: Sliding Window
last-solved: 2026-06-21
interval: 7
url: https://neetcode.io/problems/longest-repeating-substring-with-replacement/question?list=neetcode150
---
Clarifying questions: Just so i understand, the goal is to return the length of the longest substring which contains only one character. Since the problem specifically states s only consists of uppercase english characters, i shouldn't have to worry about edge cases like if the characters are lowercase, non alphanumeric or non ASCII. I also assume that if s is empty I'd just return 0. Is this correct?

For my approach, I believe I'd use a frequency map. any English character can be in the string, so I can't just hardcode to manage only 2 characters. k is the max amount of replacements I can do in a given window. so, I'd keep track of the character with the highest frequency, and add all the other character frequencies. if the sum of those frequencies is less than or equal to k, that's a valid string, so I update maxlength.  I belive that's the correct logic. now, I'll ask myself the 3 sliding window questions:
1. when should I expand right - I expand right, until i find a valid string. so, for every move, I'd check what the entry with the highest frequency is, then add up the other frequencies in the window. if theyre <= k, that's valid.
2. when should i shrink left - as I'm expanding right, as soon as the window becomes invalid due to the frequencies being > k, i shrink the window until it's valid.
3. when should i update maxlength - I'd update maxlength every time the check is valid

Logic is correct, one adjustment. I don't need to find the sum of every other frequency, there's an easier way: window_size - maxfrequency <= k.

I had some issues with inclusivity. I traced my code:

A:1
0 -0  - 1
msx length 1
A:2
max length 2
A:3
while 3 - 0 - 3 = 0 !> 1
if 2 - 0 + 1 > 2
max length = 3
A: 3 B:1
while 3 - 0 - 3 > 1
if 3 - 0 + 1 > 3
max length 4
A: 4 B 1
while4 - 0 - 4 > 1
if 4 - 0 + 1 > max length
maxlength 5
A 4 B 2
while 5 - 0 - 5 > 1
if 5 - 0 + 1 > maxlength
max length = 6

and I see my issue. when i was doing the window_size check, only the right pointer was inclusive. when both pointers are inclusive, the window size is always right - left + 1. 
for example: if left = 2 and right = 2, there is one character in the window. if you simply just do right - left, that equals 0, which is wrong. you do left - right + 1 to account for the inclusivity.