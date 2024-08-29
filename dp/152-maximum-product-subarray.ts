import { expect } from 'chai';

/**
 * 152. Maximum Product Subarray
 * Medium
 * DP
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * Thought:
 * Odd number of negative numbers will bring a negative result, which makes it the min.
 * But another incoming negative number, will make it suddenly become the Max.
 * Therefore, we need to keep track of both the min and Max product.
 * The product of the longest non-zero subarray will be store in the DP of the Max or the min.
 * 
 * Edge case:
 * Zero is possible in the restriction the question gave, need to reset the product to 1.
 * Which means to start a new subarray.
 */
function maxProduct(nums: number[]): number {
  if (nums.length === 1) return nums[0];
  let gMax = nums[0];
  let localMax = 1;
  let localMin = 1;
  nums.forEach(num => {
    if (num === 0) {
      localMax = 1;
      localMin = 1;
      // e.g. [-2, 0], [-2, 0, -1]
      gMax = Math.max(gMax, 0);
      return;
    }
    localMax = Math.max(num * localMax, num * localMin, num);
    localMin = Math.min(num * localMax, num * localMin, num);
    gMax = Math.max(gMax, localMax);
  });
  return gMax;
}

expect(maxProduct([2, 3, -2, 4])).to.equal(6);
expect(maxProduct([2, -3, 2, 4, -1, -1])).to.equal(48);
// single digit
expect(maxProduct([0])).to.equal(0);
// able to drop 0
expect(maxProduct([0, 2])).to.equal(2);
// return 0 when the best non-zero outcome is negative
expect(maxProduct([0, -2])).to.equal(0);
expect(maxProduct([-2, 0])).to.equal(0);
expect(maxProduct([-2, 0, -1])).to.equal(0);
