---
date: 2026-07-12 21:50
lastmod: 2026-07-12 21:58
topic: Stacks
last-solved: 2026-07-12
interval: 21
url: https://neetcode.io/problems/evaluate-reverse-polish-notation/question?list=neetcode150
---
- Key insight- when you hit an operator, pop twice. reverse polish notation always uses 2 operands, so you just pop twice and do the math with those two. 
- *Important Distinction* - Remember that the first pop (top of the stack) should be used as the second operand in the equation. this matters a lot for division and substraction! 
- Major Bug fixes - I forgot the parentheses on some pop() calls, I had to go back and fix them. Also, the problem specifically states that the list has strings in it, so i had to convert the strings into integers to be able to use them successfully. 
- Tips for future me - int() automatically truncates towards zero. so if you're doing division, and you need to ensure that the answer truncates towards zero, wrap the operation in int()