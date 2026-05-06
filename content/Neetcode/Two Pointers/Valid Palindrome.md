- So in this problem, it's asking me to read a string and determine if it's a palindrome. A palindrome is a word/sentence that reads the same forward and backwards.
- also ignore all non-alphanumeric characters. 
My initial thought is that we'd have to go through the string once to filter out the non-alphanumerical characters, but after some reflection we don't need to do that at all. I'd work, but that would leave us with O(n) space complexity, and the optimal is O(1).
instead, we just skip any non-alphanumerical numbers we come across.


- This is the first problem that deals with two pointers. I read up on this technique on geeksforgeeks, and i have a basic understanding of it now.
- the technique is: you have two indexes/pointers, and you can use them to go through an array in a more efficient manner than you would just going through an array one at a time
- So for this problem, we could have two pointers at each end of the array. we do a while left < right loop, which ensures that the loop will stop as soon as the pointers either meet or cross each other. for each step, we check if the characters match. if we come across a non-alphanumeric character, we skip it and check again. we do this up until they meet. if each character along the way matched, then it is a palindrome. if not, return false 
Pseudocode:
while left < right:
	check if left or right character is alphanumeric
	if they are, check if they are equal
	if one or both are not, then skip
	then check if this new character is equal
	increment i and j
Passed! I had one test case that tripped me up, which was s = ".,". this one was tricky because in my inner loop where i checked it was alphanumeric, i didn't account for if the string was just non-alphanumeric, so when i looped through the string to check for the first alphanumeric, it would just go through the whole string, and go out of bounds, giving me an error. i had to bound the inner loops with "i<j" and "j>i" to ensure it would stop before they crossed