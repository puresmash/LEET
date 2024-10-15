import { expect } from 'chai';

/**
 * 2022. Convert 1D Array Into 2D Array
 * Easy
 * Array
 * Time complexity: O(rows * columns), Space complexity: O(1)
 */
function construct2DArray(original: number[], rows: number, columns: number): number[][] {
  if (original.length !== rows * columns) return [];
  const result = [];
  for (let y = 0; y < rows; y++) {
    const tempRow = [];
    for (let x = 0; x < columns; x++) {
      tempRow.push(original[y * columns + x]);
    }
    result.push(tempRow);
  }
  return result;
}

expect(construct2DArray([1, 2, 3, 4], 2, 2)).to.deep.equal([[1, 2], [3, 4]]);
expect(construct2DArray([1, 2, 3], 1, 3)).to.deep.equal([[1, 2, 3]]);
expect(construct2DArray([1, 2], 1, 1)).to.deep.equal([]);
