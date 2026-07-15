---
lastmod: 2026-07-14 13:44
date: 2026-07-13 22:00
---
normalization technique formula used to map 2d coordinates into a 1d index

General formula:
if you have  a large grid and want to group cells into sub-boxes of size N x N, the formula is:

(row//N) x (Number of groups per side) + (col/N)

sudoku example:
- Sub-box size N = 3
- since the total grid is 9x9, thre are 9//3 = 3 groups per size
- the formula becomes (r//3) x 3 + (c//3)

Why it works: integer division strips the remainder so all cells in the same box collapse to the same index

**Very Important** 
The inverse:
row = index // cols
col = index % cols

**This allows you to convert a 1D index into 2D coordinates**

# **Finding the length and width of a matrix:**
- len(matrix) gives you m (number of rows)
- len(matrix\[0]) gives you n (number of columns in first row)
- m * n = len(matrix) * len(matrix\[0])

