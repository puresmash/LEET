import { expect } from 'chai';

/**
 * 238. Product of Array Except Self
 * Medium
 * Array, Prefix Sum
 * Time complexity: O(n), Space complexity: O(1)
 * Count the prefix product and suffix product, then multiply them together
 * By saving the prefix product in the output array, can reduce the space complexity from O(n) to O(1)
 * 
 * Demonstrate:
 * [*, *, *, *]
 *a -
 *b ----
 *c -------
 *e          -
 *f       ----
 *g    -------
 * nums[0] =     g
 * nums[1] = a * f
 * nums[2] = b * e
 * nums[3] = c 
 */
function productExceptSelf(nums: number[]): number[] {
  const output = [0];
  // Count prefix product and store in output
  let prefixProduct = 1;
  for (let i = 0; i < nums.length - 1; i++) {
    prefixProduct = prefixProduct * nums[i];
    output[i + 1] = prefixProduct;
  }
  // Count suffix product and product with the prefix product
  let suffixProduct = 1;
  for (let i = nums.length - 1; i > 0; i--) {
    suffixProduct = suffixProduct * nums[i];
    output[i - 1] = output[i - 1] * suffixProduct;
  }
  // Special treatment for the first and last element
  output[0] = suffixProduct;
  output[nums.length - 1] = prefixProduct
  return output;
}
expect(productExceptSelf([1, 2, 3, 4])).to.deep.equal([24, 12, 8, 6]);
expect(productExceptSelf([-1, 1, 0, -3, 3])).to.deep.equal([-0, 0, 9, -0, 0]);
// edge case
expect(productExceptSelf([2, 3])).to.deep.equal([3, 2]);
