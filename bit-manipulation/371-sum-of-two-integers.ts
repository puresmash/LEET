import { expect } from 'chai';

/**
 * 371. Sum of Two Integers
 * Medium
 * Bit Manipulation
 * Time complexity: O(1), Space complexity: O(1)
 * 
 * Steps:
 * 1. Use XOR to get the summing of the current bit. -> (a ^ b)
 * 2. Use AND to get the carry of the current bit, then shift it to the left. -> (a & b) << 1
 * 3. Use the result of step 1 and step 2, add it again.
 * 4. Repeat until the carry become 0.
 * 
 * Notes:
 * 1. Assign binary number: a = 0b1010
 * 2. Print result in binary: console.log(a.toString(2));
 */
function getSum(a: number, b: number): number {
  do {
    [a, b] = [a ^ b, (a & b) << 1];
  } while (b !== 0);
  return a;
}

expect(getSum(1, 2)).to.equal(3);
expect(getSum(2, 3)).to.equal(5);
