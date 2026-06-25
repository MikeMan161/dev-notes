---
lastmod: 2026-06-24 18:39
date: 2026-06-23 22:04
---
Clarifying questions: So for this question, I see the constraints already answer a few questions i have, like what if k is negative, and there are constraints for how big nums.length is and if negative numbers are included in nums.

I have to take a different approach to sliding window. this time, there's a fixed window, so I'll have to iterate left and right at the same time to keep the window open. Initially, i thought of doing a string split, like nums\[left: right], but nums is not a string so that won't work obviously. a brute force approach would be that for every pass of the window, we keep a variable called maxint and just keep comparing each number in the window, overwriting the previous largest. so in example 1, we'd iterate between the left and right pointer, maxint = 1, then maxint = 2. when we've searched through the window, save that in a list.

the issue with this approach is that everytime we shift the window, we have to rescan the window each time. Key insight: with each window shift, there's two things happening: the leftmost value is dropped, and a new one is added to the right. this realization sparked a thought in my head. I havent used this much yet, although i'm sure it's going to pop up more in the future. What if I use a Queue? I looked up stuff about queues, and I learned about deque, which is a double ended queue. I think this is what i need to solve this.

I had a breakthrough! I was able to fully figure out the logic. So we use a monotonic structure (decreasing front to back) and storing indices so i can check the scope as i go along. When a new element arrives, pop the back every element smaller than it, because a smaller and older element can't be the max while a bigger one is in the window. 
[[Queue Tips]]