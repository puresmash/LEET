import { expect } from 'chai';

/**
 * Medium
 * Two pointers
 * Time complexity: O(n^2), 
 * Space complexity: depends on the sorting implementation (Firefox = merge sort, Chrome = Timsort), usually O(n).
 * 1. Sort the array. <-- O(nlogn)
 * 2. Iterate through the array to fixed n1.
 * 3. Then like the LC-1 two sum, use two pointers to find the sum of n2 and n3. n2 on the left, n3 on the right.
 * 3-1. If n1+n2+n3 > 0, move n3 to the left to make it smaller.
 * 3-2. If < 0, do the similar thing to n2.
 * 3-3. If = 0, mark as a result, move both n2 and n3 to find another possible answer.
 * Skip the duplicate elements.
 */
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  let prev = null as number | null;
  nums.forEach((n, i) => {
    // Skip duplicate
    if (n === prev) return;
    // Remember the previous to skip duplicate
    else prev = n;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[l] + nums[r] + n;
      if (sum > 0) {
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        result.push([n, nums[l], nums[r]]);
        l++;
        r--;
        // Skip duplicate
        while(nums[l] === nums[l - 1]) l++;
      }
    }
  })
  return result;
}

expect(threeSum([-1, 0, 1, 2, -1, -4])).to.deep.equal([[-1, -1, 2], [-1, 0, 1]]);
expect(threeSum([0, 1, 1])).to.deep.equal([]);
expect(threeSum([0, 0, 0])).to.deep.equal([[0, 0, 0]]);
