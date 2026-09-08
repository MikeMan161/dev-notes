---
date: 2026-07-13 22:00
lastmod: 2026-09-07 09:35
topic: Arrays & Hashing
url: https://neetcode.io/problems/valid-sudoku/question?list=neetcode150
interval: 3
last-solved: 2026-09-06
---
Given a 9x9 board (board), it is valid only if:
- Each row must contain the digits 1-9 without duplicates
- each column must contain the digits 1-9 without duplicates
- each of the nine 3x3 sub-boxes of the grid must contain the digits 1-9 without duplicates
Return true if the board is valid, otherwise return false

example input: 
```java
Input: board =
[["1","2",".",".","3",".",".",".","."],
 ["4",".",".","5",".",".",".",".","."],
 [".","9","8",".",".",".",".",".","3"],
 ["5",".",".",".","6",".",".",".","4"],
 [".",".",".","8",".","3",".",".","5"],
 ["7",".",".",".","2",".",".",".","6"],
 [".",".",".",".",".",".","2",".","."],
 [".",".",".","4","1","9",".",".","8"],
 [".",".",".",".","8",".",".","7","9"]]
```

Since we need to check for duplicates, we could use a hash map to check for duplicates
the key would be the number, the value would track how many of that number it finds along that row/column
so we make a hashmap, with each entry being a number
hashmap = {[1: 1, 2: 1, 3: 1, ... , 9: 1]}
then we cycle through each entry? for each one, we check if that number is already in that row/column. 

I had the problem all wrong. I believed that it was asking me to solve the sudoku board. in fact, it was only asking to validate the starting numbers to ensure that it is a good starting place. knowing this, the problem seems much much easier

so instead of a hashmap, we can use a set. a set is an unordered collection with no duplicates. so we need to validate those 3 conditions. for the first one, we can make a set, then iterate through each row. if we come across a number, we check if it is in the set. if it isn't, we add it to the set. if it is, we set the flag to false and the whole board is invalid. we do the same for the columns. then, we do this same thing for the 3x3 areas. for this one, i think we need to do a nested loop? 
rows 0 1 2 belong to boxes 1, 4, and 7.
rows 3 4 5 belong to boxes 2 5 8
rows 6 7 8 belong to boxes 3 6 9

columns 0 1 2 belong to box 1, 2 3
columns 3 4 5 belong to box 4 5 6
columns 6 7 8 belong to box 7 8 9

so if we go in numerical order (top left, going down, then going middle, down, then right down)
the order of the boxes would be:

- box 1: r(0 1 2) c(0 1 2)
- box 2: r(3 4 5) c(0 1 2)
- box 3: r(6 7 8) c(0 1 2)
- box 4: r(0 1 2) c(3 4 5)
- box 5: r(3 4 5) c(3 4 5)
- box 6: r(6 7 8) c(3 4 5)
- box 7: r(0 1 2) c(6 7 8)
- box 8: r(3 4 5) c(6 7 8)
- box 9: r(6 7 8) c(6 7 8)

we can use integer division (//) to identify which row we're in.
pseudo code

Important lesson: [[List Comprehension]]
class Solution:

    def isValidSudoku(self, board: List[List[str]]) -> bool:

        rows = [set() for _ in range(9)]

        columns = [set() for _ in range(9)]

        boxes = [set() for _ in range(9)]

        for r in range(9)

            for c in range(9):

This list comprehension allows me to have a list of sets, which i can iterate though 
so i can use each set to check for duplicates. if any are found, flag false for the entire problem. 

class Solution:

    def isValidSudoku(self, board: List[List[str]]) -> bool:

        rows = [set() for _ in range(9)]

        columns = [set() for _ in range(9)]

        boxes = [set() for _ in range(9)]

        "this list comprehension makes each variable a list of sets"

        for r in range(9):

            for c in range(9):

                if board[r][c] in rows[r]:

                    return False

                else:

                    rows[r].add(board[r][c])

                if board[r][c] in columns[c]:

                    return False

                else:

                    columns[c].add(board[r][c])
the hardest part of the problem was figuring out the box part. we know that we can group the row and columns into 3 parts using integer division. (0//3), (1//3), (2//3) = 0. 

the solution is something i would not have come up with myself. given these "coordinates", we can do some arithmetic to convert them into the indexes we need:

(row_group \* 3) + col_group

this would give us the indexes we need to make sure we're checking the right set for each box

for normalization formula: [[Matrix Notes]]
