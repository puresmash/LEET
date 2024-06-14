import { expect } from 'chai';

/**
 * Medium
 * Matrix
 * In order not to modify the original data during the iteration, we might probably need to store the result in another array.
 * It seems decent especially when in digital image processing,
 * we also want the original image to compare the differential before and after the processing.
 * But maybe in some memory critical applications, we want to carefully deal with the memory consumption.
 * So, for this problem, there is three solutions:
 * 
 * Solution 1:
 * Time complexity: O(mn), Space complexity: O(mn)
 * Save the result to additional array.
 * 
 * Solution 2:
 * Time complexity: O(mn), Space complexity: O(m + n)
 * Only store the rows and columns that need to be set to zero.
 * 
 * Solution 3:
 * Time complexity: O(mn), Space complexity: O(1)
 * TL;DR:
 * Iterate 0 -> n -1, store the zeroes in the first row and column.
 * Iterate n - 1 -> 0, modify the matrix according to the stored zeroes.
 * 
 * Use the nature property when iterating the array.
 * When we iterate an array, the first element always be the first one to visit,
 * it's safe to save additional information in it since it won't affect the rest of the iteration.
 * Following this idea, we can use the first row and column freely.
 * The last thing to do is add an extra variable to store the data for the top left corner.
 * 
 * e.g. For an 3 x 3 matrix, the following is what it will looks like:
 * ┌───┬───┬───┐
 * │y0 │x1 │x2 │
 * ├───┼───┼───┤
 * │y1 │   │   │
 * ├───┼───┼───┤  ┌───┐
 * │y2 │   │   │  │x0 │
 * └───┴───┴───┘  └───┘
 * We can use an extra variable to store the data of x0 column, the space complexity is constant.
 * After that, remember to modify from the bottom right corner to the top left corner,
 * or what we have done to prevent overwriting will be in vain.
 */
function setZeroes(matrix: number[][]): void {
  // Solution 3
  const WIDTH = matrix[0].length;
  const HEIGHT = matrix.length;
  // Iterate the matrix, search for the 0 cells.
  // Then store the information in the first row and column.
  let topLeft = 1;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (matrix[y][x] === 0) {
        // mark x axis
        matrix[y][0] = 0;
        // mark y axis
        if (x === 0) {
          topLeft = 0;
        } else {
          matrix[0][x] = 0;
        }
      }
    }
  }
  // Modify the matrix according to the first row and column
  // Note that we should leave the first row and column untouched until the last run.
  // in here, iterate from (n - 1) -> 0 will work.
  for (let y = HEIGHT - 1; y >= 0; y--) {
    for (let x = WIDTH - 1; x >= 0; x--) {
      // lookup x axis
      // lookup y axis for those x != 0 cells (they should lookup topLeft)
      if (matrix[y][0] === 0 || (x !== 0 && matrix[0][x] === 0)) {
        matrix[y][x] = 0;
        continue;
      }
      // lookup y axis for those x = 0 cells
      if (x === 0 && !topLeft) {
        matrix[y][x] = 0;
      }
    }
  }
}

const matrix1 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
const matrix2 = [[1, 0, 1], [1, 1, 1], [1, 1, 1]];
const matrix3 = [[1, 1, 1], [0, 1, 1], [1, 1, 1]];
setZeroes(matrix1);
setZeroes(matrix2);
setZeroes(matrix3);
expect(matrix1).to.eql([[1, 0, 1], [0, 0, 0], [1, 0, 1]]);
expect(matrix2).to.eql([[0, 0, 0], [1, 0, 1], [1, 0, 1]]);
expect(matrix3).to.eql([[0, 1, 1], [0, 0, 0], [0, 1, 1]]);
