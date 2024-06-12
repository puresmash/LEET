import { expect } from 'chai';

/**
 * Easy
 * Binary Search
 * Time complexity: O(logn), Space complexity: O(1)
 */
function search(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (target === nums[m]) {
      return m;
    } else if (target > nums[m]) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }
  // Check pointer L
  // Don't check R, cause R is possible to out-of-bound (-1)
  // e.g. [2, 3], target = 1
  //       L  R
  //       M        => R = M - 1 => 0 - 1 = -1
  return nums[l] === target ? l : -1;
}

// LC cases
expect(search([-1, 0, 3, 5, 9, 12], 9)).to.equal(4);
expect(search([-1, 0, 3, 5, 9, 12], 2)).to.equal(-1);
// Examine boundary cases
expect(search([2, 3], 1)).to.equal(-1);
expect(search([2, 3], 2)).to.equal(0);
expect(search([2, 3], 3)).to.equal(1);
expect(search([2, 3], 4)).to.equal(-1);
expect(search([5], 4)).to.equal(-1);
expect(search([5], 5)).to.equal(0);
expect(search([5], 6)).to.equal(-1);
