import { expect } from 'chai';

/**
 * 213. House Robber II
 * Medium
 * Dynamic Programming
 * Time complexity: O(n), Space complexity: O(n) -> O(1)
 * 
 * Thought:
 * This is the same as 198. House Robber, but with a circle.
 * This can be solved on the basis of LC 198 with some tricks.
 * Let's say we have an array [1, 2, 3, 4, 5],
 * then `circularRob([1, 2, 3, 4, 5]) = Math.max(rob([1, 2, 3, 4]), rob([2, 3, 4, 5]))`.
 */
function rob(nums: number[]): number {
  if (nums.length === 1) return nums[0];
  // JavaScript does not have a efficient way to retrieve a subarray
  // This will actually cost O(n) space complexity
  return Math.max(subRob(nums.slice(0, nums.length - 1)), subRob(nums.slice(1)));
}

function subRob(nums: number[]): number {
  // store the result of n - 2
  let dpLeft = nums[0];
  if (nums.length === 1) return dpLeft;
  // store the result of n - 1
  let dpRight = Math.max(nums[0], nums[1]);
  // iterate 2 -> n
  for (let i = 2; i < nums.length; i++) {
    [dpLeft, dpRight] = [dpRight, Math.max(dpLeft + nums[i], dpRight)];
  }
  return dpRight;
}

expect(subRob([2, 7, 9, 3, 1])).to.equal(12);

expect(rob([2, 3, 2])).to.equal(3);
expect(rob([1, 2, 3, 1])).to.equal(4);
expect(rob([1, 2, 3])).to.equal(3);
expect(rob([1, 3, 1, 3, 100])).to.equal(103);
expect(rob([4, 1, 2, 7, 5, 3, 1])).to.equal(14);
