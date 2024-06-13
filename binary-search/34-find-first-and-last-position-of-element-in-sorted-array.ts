import { expect } from 'chai';

/**
 * Medium
 * Binary Search
 * Time complexity: O(logn), Space complexity: O(1)
 * 
 * Discussion:
 * e.g.
 * m = floor
 *        [5, 5]
 *            m = ceil
 * If want to find the left bound, we want the result convergence to the left.
 * => Math.floor()
 * Right bound, convergence to the right.
 * => Math.ceil()
 * 
 * Short version:
 * We can use the converge property of Math.floor() and Math.ceil().
 * Therefore can simplify the if else statement.
 */  
function searchRange(nums: number[], target: number): number[] {
  // search right bound
  const s = findLeftBound();
  const e = findRightBound();
  function findLeftBound() {
    let l = 0, r = nums.length - 1;
    while (l < r) {
      const m = Math.floor((l + r) / 2);
      // intuitive version
      // if (nums[m] === target) {
      //   // Since it's equal, things on the right won't be left most
      //   r = m;
      // } else if (nums[m] < target) {
      //   l = m + 1;
      // } else {
      //   r = m - 1;
      // }
      // short version
      if (nums[m] < target) {
        l = m + 1;
      } else {
        r = m;
      }
    }
    return nums[l] === target ? l : -1;
  }
  function findRightBound() {
    let l = 0, r = nums.length - 1;
    while (l < r) {
      const m = Math.ceil((l + r) / 2);
      // intuitive version
      // if (nums[m] === target) {
      //   // Since it's equal, things on the left won't be right most
      //   l = m;
      // } else if (nums[m] < target) {
      //   l = m + 1;
      // } else {
      //   r = m - 1;
      // }
      // short version
      if (nums[m] > target) {
        r = m - 1;
      } else {
        l = m;
      }
    }
    return nums[l] === target ? l : -1;
  }
  return [s, e];
}

expect(searchRange([5, 7, 7, 8, 8, 10], 8)).to.eql([3, 4]);
expect(searchRange([5, 7, 7, 8, 8, 10], 6)).to.eql([-1, -1]);
expect(searchRange([5, 5], 5)).to.eql([0, 1]);
