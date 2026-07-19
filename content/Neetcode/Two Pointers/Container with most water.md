---
date: 2026-07-18 12:00
lastmod: 2026-07-19 14:36
topic: Two Pointers
url: https://neetcode.io/problems/max-water-container/question?list=neetcode150
last-solved: 2026-07-19
interval: 3
---
this problem gives us an array heights, where each heights\[i] represents the height of the ith bar.

We'll definitely use two pointers here. I'm thinking that we use the typical two pointers formula, start the pointers at the end of each array. from what i understand, we have to find the container that has the maximum amount of water in it. 

typically, in a normal two pointers problem, we'd have a while loop like while i < j. then, we add array\[i] + array\[j], and we would increment i if the number is too small, and decrement j if it's too small. we don't have a target number here, and the array is unsorted, so we'll have to do something different. my first thought is that we'd have to pass through the array twice. we have the left pointer iterate through the list until it reaches the right pointer. along the way, we keep track of the total number within the containter. then we'd do it again but from right to left. 


I misunderstood the problem. so upon reevaluation, we don't need to pass twice. heights\[i] represents the height of each bar. we don't count any of the bars within the container, the only thing that matters is the height of the smallest side of the container. that would be the max amount of water the container can carry. so, when we start at both ends of the array, we see which one of the two pointers is smaller. the smaller one is incremented/decremented, until it's larger than the other one. then it swaps, and that one iterates until we end, or it finds a bigger one. whichever one is smaller, we can store the last biggest spot, so if it doesn't come across a bigger one, we have the last spot saved. now the question is the output. i see in the example that for example one, that the pointers are at index 1 and 7, and the output is 36. i assume that to find the max number of water, we'd just multiply the width and height of this theoretical container, which would be 6 * 6, since the space between both pointers is 6, and the height of the smallest is 6?

I got the logic pretty easily! here's my final logic:
1. Start with both pointers at each end of the array
2. at each step, calculate the max amount of water. this would be width \* height. the height would be (j - 1) \* min(heights\[i], heights\[j]). store this variable as maxwater
3. increment/decrement the smallest pointer
4. do same calculation, compare values, overwrite if bigger

Problem solved! my solution beats 100% on both runtime and memory! i'm very proud of this one, i got the solution very easily