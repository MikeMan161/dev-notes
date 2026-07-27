---
lastmod: 2026-07-27 19:33
date: 2026-07-26 22:00
---
## Here's my general notes for the linked list algorithm, plus general notes on each problem.

This is how to define a singly linked list:

class ListNode:
	def __init__(self,x):
		self.val = x
		self.next = none

This is the simplest possible singly list node, which is what 90% of leetcode problems will deal with. There is also a doubly linked list:

class Node:
	def __init__(self, prev, element, next):
		self.val = element
		self.next = next
		self.prev = prev

the main difference is that the doubly linked list has two pointers: prev which points to the previous node and next pointing to the next node. With prev, a linked list can support bidirectional traversal.

Here's an example of a basic function that creates a singly linked list from an array: 

class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


input an array and convert it to a singly linked list
def createLinkedList(arr: 'List[int]') -> 'ListNode':
    if arr is None or len(arr) == 0:
        return None

    head = ListNode(arr[0])
    cur = head
    for i in range(1, len(arr)):
        cur.next = ListNode(arr[i])
        cur = cur.next

    return head

now, cur is a name, not a node. there's two operations you do with cur, and it's important to know the difference:
- cur.next = something (the list changes, I haven't moved or rewires cur's arrow. Modifies the node cur refers to)
- cur = cur.next (I move, the list is unchanged or you walk forward. doesn't modify anything in the list, only the name cur now refers to a different node)

iterating through a linked list and printing its value:
cur = head
while cur is not None:
	print(cur.val)
	cur = cur.next
similarly, if you want to access or modify a node by index, you can only use a for loop starting from the head node and walk forward until you find the node at that index, then read or update it

