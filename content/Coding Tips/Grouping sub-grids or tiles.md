normalization technique formula used to map 2d coordinates into a 1d index

General formula:
if you have  a large grid and want to group cells into sub-boxes of size N x N, the formula is:

(row//N) x (Number of groups per side) + (col/N)

sudoku example:
- Sub-box size N = 3
- since the total grid is 9x9, thre are 9//3 = 3 groups per size
- the formula becomes (r//3) x 3 + (c//3)