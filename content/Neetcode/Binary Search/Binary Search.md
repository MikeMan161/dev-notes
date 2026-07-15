---
lastmod: 2026-07-14 11:35
date: 2026-07-13 22:00
---
Binary search sounds simple, but the real devil is in the details. There are 3 most common binary search cases:
- Find a number
- Find the left boundary
- Find the right boundary
Each of these cases uses one unified framework: the while condition is always <=, and the boundary updates always use mid +- 1

There are two main styles of binary search:
- both ends closed, \[left, right]
- left closed, right open, \[left, right)
the both ends closed style is easier to remember and unify. here is the general framework:

def binarySearch (nums: List\[int], target: int) -> int:
	left, right = 0, len(nums) - 1

	While ...:
		mid = left + (right - left) // 2
		if nums[mid] == target:
			...
		elif nums[mid] < target:
			left = ...
		elif nums[mid] > target:
			right = ...

	return ...

tip: do not use plain else, always use elif for branches, so every case is clear. after i understand the details, then you can simplify
also, left + (right - left) / 2 is equal to (left + right) / 2, this just prevents overflow when the numbers are large

for a correct binary search, we must make sure of these two things:
- When the search interval is empty, the search must stop. otherwise, the algorithm will run forever
- during the search, we must not skip any element. otherwise, the answer can be wrong.

Big distinction between searching for a specific answer, and the left/right boundary:
- When looking for a specific answer, you can be exclusing towards the mid. so when you shrink, left = mid + 1, right = mid - 1. we do this because we've already checked if mid is right, so we exclude it when we shrink the window
- for finding the left/right boundary. we aren't looking for a specific number, but the first instance of said number:
	- for left boundary, we are looking for either the first instance of a number, or if target doesnt exist in the input, the smallest number > target. example = \[1,3,5,7], target 4. the left boundary would be index = 2. there is no 4 in the input, so we search for the smallest number greater than the target, and that's the insert point if you want to keep the array sorted. because we're not just looking for an answer, but the first instance of it, when you shrink the array, you always must include mid, as it could still be the correct answer. so left = mid - 1, right = mid - 1
	- right boundary is exactly the same, but inverted. you want to find the last occurance of the target in the input, or if it doesn't exist, find the largest number < target. so for the same example, the right boundary would be index = 1, since 3 is the largest number less than the target, and that's where you would insert 4. also
- Also, for left boundary, the answer also has an implication for the entire input. for example, if that same example was about acceptable miles per hour, and 4 was the target, the left boundary implies that everything above 4 is an acceptable mph to be going at, and everything below is incorrect. the inverse is true for right boundary, the implication is that everything less than 4 is acceptable.