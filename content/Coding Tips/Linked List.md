---
lastmod: 2026-06-24 21:35
date: 2026-06-24 21:22
---
Here is a simple singly linked list node:
Class Node:
	def __init__(self, x)
		self.al = x
		self.next = None
This is the simplest possible singly linked list node designed for leetcode algorithm questions. Usually, you'd use a doubly linked list:
class Node:
	def __init__(self, prev, element, next):
		self.val = element
		self.next = next
		self.prev = prev
*Allegedly, Leecode's singly linked list node only supports int for the val field*

Standard libraries typically use doubly linked lists rather than singly linked lists. A singly linked list node has only one next pointer pointing to the next node, while a doubly linked list has two pointers: prev pointing to the previous node, and next pointing ot the next node.

With this prev pointer, a linked list supports bidirectional traversal. However, maintaining an extra pointer makes insertions, deletions, lookups, and updates slightly more complex.

Linked Lists work differently than Arrays. A linked list doesn't need a contiguous block of memory to store elements. It's elements can be stored all over memory, and each node's next, prev pointers stitch those scattered memory chunks together into a chain-like structure.

Pros and Cons of using Linked Lists:
Pros:
- Nodes can be attached when needed and detached when not. You don't have to worry about resizing or moving data around
- Linked Lists use memory more efficiently. Nodes don't need to be sitting next to each other, just new up a new node wherever there's free memory 
Cons:
- Arrays offer fast element access by index, linked lists do not. You'd haveto follow the next pointers until you reach your specified node

