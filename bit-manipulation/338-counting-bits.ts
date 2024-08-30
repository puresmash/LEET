import { expect } from 'chai';

/**
 * 338. Counting Bits
 * Easy
 * Bit Manipulation, DP
 * Time complexity: O(n), Space complexity: O(n)
 * 
 * Brute Force:
 * Time complexity: O(nlogn), Space complexity: O(1)
 * 
 * Thought:
 * 1. The brute force cost O(nlogn), but we can easily find there is a calculation duplication.
 * 2. As LC 191, to count how many `1` in a number, checking units digit with `%2` or `&1`.
 *    Then we use `>>1` for counting the tens digit, which make the number smaller, 
 *    but the smaller one is already been counted in the previous step.
 *    So, we can definitely use DP to trade space for time.
 * 3. The basic idea is a bottom-up DP, 
 *    there are another strategies, but the basic idea is counting from smaller to bigger (1 -> n).
 */
function countBits(n: number): number[] {
  if (n === 0) return [0];
  const result = [0, 1];
  for (let i = 2; i <= n; i++) {
    result.push((i & 0b1) + result[i >> 1]);
  }
  return result;
}

expect(countBits(2)).to.deep.equal([0, 1, 1]);
expect(countBits(5)).to.deep.equal([0, 1, 1, 2, 1, 2]);
