import { expect } from 'chai';

/**
 * Medium
 * Binary Search
 * Solution 1:
 * Time complexity: O(logMN), Space complexity: O(1)
 * Map 2D matrix to 1D array
 * Solution 2:
 * Time complexity: O(logM + logN), Space complexity: O(1)
 * 2 runs of binary search, 1 for row, 1 for column
 * */
function searchMatrix(matrix: number[][], target: number): boolean {
  // Try solution 2 to practice binary search
  const width = matrix[0].length;
  // Search row
  let row = -1;
  let t = 0, b = matrix.length - 1;
  while (t < b) {
    const m = Math.floor((t + b) / 2);
    if (matrix[m][0] <= target && matrix[m][width - 1] >= target) {      
      row = m;
      break;
    } else if (matrix[m][0] > target) {
      b = m - 1;
    } else {
      t = m + 1;
    }
  }
  // floor => t, ceil => b
  row = row === -1 ? t : row;
  // Search column
  let column = -1;
  let l = 0, r = width - 1;
  while(l < r) {
    const m = Math.floor((l + r) / 2);
    if (matrix[row][m] === target) {
      column = m;
      break;
    } else if (matrix[row][m] > target) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  column = column === -1 ? l : column;
  // Examine the result to prevent t, l is not the answer
  return matrix[row][column] === target;
}

expect(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)).to.be.true;
expect(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13)).to.be.false;
