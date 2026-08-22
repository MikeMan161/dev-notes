---
lastmod: 2026-08-21 15:29
date: 2026-07-26 22:00
---
## Tracker

| Problem                              | Last Solved | Attempt 1 | Attempt 2 | Attempt 3 | Attempt 4 | Attempt 5 |
| ------------------------------------ | ----------- | --------- | --------- | --------- | --------- | --------- |
| [[Reverse Linked List]]              | 8/18        | :)        |           |           |           |           |
| [[Merge Two Sorted Lists]]           | 8/20        | :)        |           |           |           |           |
| [[Linked List Cycle]]                | 8/21        | :)        |           |           |           |           |
| [[Reorder List]]                     |             |           |           |           |           |           |
| [[Remove Nth Node From End of List]] |             |           |           |           |           |           |
| [[Copy List With Random Pointer]]    |             |           |           |           |           |           |
| [[Add Two Numbers]]                  |             |           |           |           |           |           |
| [[Find The Duplicate Number]]        |             |           |           |           |           |           |
| [[LRU Cache]]                        |             |           |           |           |           |           |
| [[Merge K Sorted Lists]]             |             |           |           |           |           |           |
| [[Reverse Nodes In K Group]]         |             |           |           |           |           |           |

## Here's my general notes for the linked list algorithm, plus general notes on each problem.

[[Coding Tips/Linked List|Linked List]]

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

## Here's the gist of insert / deletion. you must find the predecessor and succesor, and coordinate pointer operations to splice in ahd out. 

### Inserting at the head of a singly linked list:

head = createLinkedList(\[1,2,3,4,5,5])

newNode = ListNode(0)
newNode.next = head
head = newNode

### Inserting at the tail of a singly linked list:

heaad = createLinkedList(\[1,2,3,4,5])

cur = head
traverse to end of list
while cur.next is not None:
	cur = cur.next
cur.next = ListNode(6)

### Inserting in the middle of a singly linked list:

create a singly linked list
head = createLinkedList([1, 2, 3, 4, 5])

insert a new node 66 after the 3rd node
first find the predecessor node, which is the 3rd node
p = head
for _ in range(2):
    p = p.next
at this point, p points to the 3rd node
assemble the successor pointer of the new node
new_node = ListNode(66)
new_node.next = p.next

insert the new node
p.next = new_node

now the linked list becomes 1 -> 2 -> 3 -> 66 -> 4 -> 5

### Deleting a node from singly linked list:

- to delete a node, first find the predecessor of the node to be deleted, then point that predecessor's next pointer to the node after the deleted one. this removes the target from the list

create a singly linked list
head = createLinkedList([1, 2, 3, 4, 5])

to delete the 4th node, we need to operate on the predecessor node
p = head
for i in range(2):
    p = p.next

at this point, p points to the 3rd node, which is the predecessor of the node to be deleted
remove the 4th node from the linked list
p.next = p.next.next

now the linked list becomes 1 -> 2 -> 3 -> 5

### Deleting from thetail of a singly linked list:

find the second to last node and set it's next pointer to null or none

### Deleting the head of a singly linked list:

move head to the next node

head = head.next