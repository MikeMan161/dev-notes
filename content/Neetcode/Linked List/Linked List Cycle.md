---
date: 2026-07-18 12:00
lastmod: 2026-08-26 13:48
topic: Linked List
url: https://neetcode.io/problems/linked-list-cycle-detection/question?list=neetcode150
interval: 60
last-solved: 2026-08-26
---
So I'm still learning the intricacies of Linked Lists, but as i was trying to grasp how this problem worked, I looked at the category hints and saw two pointers. That had me thinking how we could even do two pointers here, and then i realized that we could have two pointers that are iterating at different paces, and if they're ever equal we know that we've come across a loop. We could use a hashmap to store a reference to each node, but that takes up much more space. 
