---
lastmod: 2026-06-23 16:31
date: 2026-05-21 22:00
---
Sliding window is a two-pointer approach where one pointer leads and the other follows. The region between them is the "window". This technique is mainly used to solve subarray problems, such as finding the longest or shortest subarray that satisfies a given condition. 

the idea is not complicated: maintain a window, keep sliding it, and update the answer along the way. there's a general framework to this technique:

def slidingWindow(s: str):
(Use an apropriate data structure to record data in the window, which depends on the scenario. e.g. using map to store frequency of elements in a window, int for sum of elements in the window, etc)
window = ... 

left, right = 0, 0
while right < len(s):
\# C will be added to the window
	c = s\[right]
	window.add(c)
\# Expand window
	right += 1
\# Here I can perform series of updates on the data within the window
	...

\# I can put debug output here

\# Determine whether the left side of the window needs to be contracted
while left < right and window needs shrink:
\#D is the character that will be removed from window
	d = s\[left]
	window.remove(d)
\#shrink window
	left += 1
\#perform a series of updates on the data within the window
	...

Every solution will branch off of this basic framework. the two ... placeholders are where I can update the window data. for any specific problem, all i'd need to do is fill in the logic there.

With this framework, whenever i face a substring/subarray problem, I just need to answer these three questions:
1. When should you move right to expand the window? What data should you update when a character enters a window?
2. When should the window stop expanding and start moving left to shrink? what data should you update when a character leaves a window?
3. When should you update the result?
After answering all 3, I can solve any sliding window problem. 

[[Best time to buy and sell stock]]
[[Longest Substring Without Repeating Characters]]
[[Longest Repeating Character Replacement]]
[[Permutation in String]]
[[Minimum Window Substring]]
[[Sliding Window Maximum]]