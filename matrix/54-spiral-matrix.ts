import { expect } from 'chai';

/**
 * Medium
 * Time complexity: O(mn), Space complexity: O(1)
 * Assume four boundaries: top, bottom, left, right,
 * iterate the matrix from four directions respectively and keep shrinking them.
 * 
 * Notes:
 * If the matrix is not a square, we need to put extra if statements to check the boundaries during while loop.
 * e.g.                             1     3                1  2       Axis y is closed, but axis x doesn't.
 * 1  2  3  4                    *  *  *  *             *  *  *  *    This will trigger another point X.
 * 5  6  7  8   =t, r, b, l=>  1 *  6  7  *  =t, r=>    *  X  *  *    Since we fixed y, iterate x in bottom run.
 * 9 10 11 12                  2 *  *  *  *           2 *  *  *  *    Iterate y in right run was OK, since loop 2->2 got nothing.
 */
function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = [];
  let l = 0, r = matrix[0].length;
  let t = 0, b = matrix.length;
  while(l < r && t < b) {
    // Iterate from four directions
    // top
    for (let x = l; x < r; x++) {
      result.push(matrix[t][x]);
    }
    t++;
    // right
    for (let y = t; y < b; y++) {
      result.push(matrix[y][r - 1]);
    }
    r--;
    // remember this to fix rectangle as above notes
    if (l >= r || t >= b) break;
    // bottom
    for (let x = r - 1; x >= l; x--) {
      result.push(matrix[b - 1][x]);
    }
    b--;
    // left
    for(let y = b - 1; y >= t; y--) {
      result.push(matrix[y][l]);
    }
    l++;
  }
  return result;
}

expect(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).to.eql([1, 2, 3, 6, 9, 8, 7, 4, 5]);
expect(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])).to.eql([1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]);
