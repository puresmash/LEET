import { expect } from 'chai';

/**
 * Sliding window
 * Time complexity: O(n), Space complexity: O(1)
 * If the sum is smaller, make it larger by moving r.
 * Else if the sum is larger, make it smaller by moving l.
 * If got one possible answer, keep searching by moving r and l to the right by 1.
 */
function minSubArrayLen(target: number, nums: number[]): number {
  let l = 0, r = 0, result = Infinity, sum = nums[0];
  while (true) {
    if (sum > target) {
      // If sum is larger, try move l to exclude element from the left to make it smaller.
      result = Math.min(result, r - l + 1);
      sum -= nums[l];
      l++;
    } else if (sum < target) {
      // If sum is smaller, try move r to include more elements to make it larger.
      if (r === nums.length - 1) break;
      r++;
      sum += nums[r];
    } else {
      // If already equal, try if the length can be shorter until r reaches the end.
      result = Math.min(result, r - l + 1);
      if (r === nums.length - 1) break;
      r++;
      sum = sum - nums[l] + nums[r];
      l++;
    }
  }
  return result === Infinity ? 0 : result;
}

expect(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])).to.equal(2);
expect(minSubArrayLen(4, [1, 4, 4])).to.equal(1);
expect(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])).to.equal(0);
