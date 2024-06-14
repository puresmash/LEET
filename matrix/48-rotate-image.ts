import { expect } from 'chai';

/**
 * Medium
 * Matrix
 * Time complexity: O(n^2), Space complexity: O(1)
 * 
 * Solution1:
 * Calculate the coordinate before rotate, move the value from the source.
 *     x+i →                      xl+i →                 (xl+i, yt)
 *     ┌──────┐ y+i               ┌──────┐ yt+i          (xr, yt+i)
 * 	   │      │ ↓                 │      │ ↓
 *  ↑  │      │       =>       ↑  │      │        =>
 * y-i └──────┘              yb-i └──────┘               (xr-i, yb)
 *        ← x-i                     ← xr-i               (xl, yb-i)
 * 
 * Then modify the boundaries (xl, xr, yt, yb) to calculate the border of inner square.
 * Do until boundaries close.
 * 
 * Solution2:
 * Transpose the matrix first, then reverse each row.
 *     +x→
 *     ┌──────┐ +y
 * 	   │      │ ↓          y' = x (Transpose)
 *  ↑  │      │       =>   x' = 1 -y (Flip vertically => Reverse row)
 * 1-y └──────┘
 *         ← 1-x
 */
function rotate(matrix: number[][]): void {
  const n = matrix.length;
  // Solution1
  // Intuitive, but calculating the new coordinates can easily typos.
  let xl = 0, yt = 0;
  let xr = n - 1, yb = n - 1;
  while (xl < xr) {
    rotateBorder(xl, yt, xr, yb);
    xl++;
    yt++;
    xr--;
    yb--;
  }
  function rotateBorder(xl: number, yt: number, xr: number, yb: number) {
    for (let i = 0; i < xr - xl; i++) {
      const temp = matrix[yt][xl + i];
      // bottom-left to top-left
      matrix[yt][xl + i] = matrix[yb - i][xl];
      // bottom-right to bottom-left
      matrix[yb - i][xl] = matrix[yb][xr - i];
      // top-right to bottom-right
      matrix[yb][xr - i] = matrix[yt + i][xr];
      // top-left to top-right
      matrix[yt + i][xr] = temp;
    }
  }
  // Solution2
  // TODO
}

const graph1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
rotate(graph1);
const graph2 = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]];
rotate(graph2);
const graph3 = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18],
  [15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 32]
];
rotate(graph3);
expect(graph1).to.eql([[7, 4, 1], [8, 5, 2], [9, 6, 3]]);
expect(graph2).to.eql([[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]);
expect(graph3).to.eql([
  [27, 21, 15, 13, 7, 1],
  [28, 22, 16, 14, 8, 2],
  [29, 23, 17, 15, 9, 3],
  [30, 24, 18, 16, 10, 4],
  [31, 25, 19, 17, 11, 5],
  [32, 26, 20, 18, 12, 6]
]);
