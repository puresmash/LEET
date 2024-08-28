import { expect } from 'chai';

/**
 * 53. Maximum Subarray
 * Medium
 * DP, Divide and Conquer, Kadane's Algorithm
 * Time complexity: O(n), Space complexity: O(1)
 */
function maxSubArray(nums: number[]): number {
  let windowSum = nums[0];
  let gmax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    // calculate the possible local maximum
    // if localMax + nums[i] < nums[i], means the previous localMax is just a burden,
    // then we start a new window from nums[i]
    windowSum = Math.max(nums[i], windowSum + nums[i]);
    // compare the local maximum with the global maximum
    gmax = Math.max(windowSum, gmax);
  }
  return gmax;
}

expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).to.equal(6);
expect(maxSubArray([5, 4, -1, 7, 8])).to.equal(23);
expect(maxSubArray([1, 1, 1, -3, 1, 1, 1, 1])).to.equal(4);
// edge case
expect(maxSubArray([1])).to.equal(1);
