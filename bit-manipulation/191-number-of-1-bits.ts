import { expect } from 'chai';

/**
 * 191. Number of 1 Bits
 * Easy
 * Bit Manipulation
 * Time complexity: O(1), Space complexity: O(1)
 * 
 * Approach 1:
 * Use `%` to check the current bit if it is 1, then `>> 1` to examine the next bit.
 * 
 * Approach 2:
 * Use `n & n-1` until the result is 0.
 * Every time we do `n-1`, if the units digit is 1, change it to 0,
 * or we borrow from the right most 1.
 *   10011  n
 * & 10010  n-1, can directly minus 1
 * -------
 *   10010  n
 * & 10001  n - 1, borrow 1 from the right most 1 (tens digit)
 * -------
 *   10000  n
 * & 01111  n - 1, borrow 1 from the right most 1
 * -------
 *   00000  end
 */
function hammingWeight(n: number): number {
  let count = 0;
  while(n > 0) {
    if (n % 2 === 1) count++;
    n = n >> 1;
  }
  return count;
}

// 11
expect(hammingWeight(0b1011)).to.equal(3);
// 128
expect(hammingWeight(0b1000000)).to.equal(1);
expect(hammingWeight(2147483645)).to.equal(30);
