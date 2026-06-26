---
lastmod: 2026-06-25 14:23
date: 2026-06-24 22:00
---
Both Queues and Stacks are "restricted operation" data structures. With Arrays and Linked Lists, you can perform CRUD operations on any indexed element as long as the index is within bounds. With Queues and Stacks, operations are restricted: A queue allows insertion at one end and removal from the other, a stack allows insertion and removal only at one end. 

Deque is a double-ended Queue

|`q.append(x)`|back|add to the right|
|`q.pop()`|back|remove from the right|
|`q.popleft()`|front|remove from the left|
|`q.appendleft(x)`|front|add to the left|