import { expect } from 'chai';

/**
 * Easy
 * Two Pointers
 * Time complexity: O(n), Space complexity: O(1)
 * l pointer to store the position of first not unique element
 * r pointer to iterate the array
 * [1, 1, 2]   =>     [1, 2, 2]
 *     L                     L
 */
function removeDuplicates(nums: number[]): number {
  // The first element nums[0] is guaranteed to be unique
  let l = 1;
  for (let r = 1; r < nums.length; r++) {
    if (nums[r] !== nums[r - 1]) {
      nums[l] = nums[r];
      l++;
    }
  }
  return l;
}

const nums1 = [1, 1, 2];
expect(removeDuplicates(nums1)).to.equal(2);
expect(nums1).to.deep.equal([1, 2, 2]);
const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
expect(removeDuplicates(nums2)).to.equal(5);
expect(nums2).to.deep.equal([0, 1, 2, 3, 4, 2, 2, 3, 3, 4]);
