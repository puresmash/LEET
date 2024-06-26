import { expect } from 'chai';

/**
 * 300. Longest Increasing Subsequence
 * Medium
 * DP (Bottom-up DP with 1D array)
 * Time complexity: O(n^2), where n is the length of nums
 * Space complexity: O(n)
 * 
 * Thoughts:
 * 1. Calculate the 1D DP array from the last element.
 * => DP[n] = 1 (itself is a LIS)
 * => DP[n-1 -> n] is easy to resolve (whether choosing [n-1, n] if ↗ OR [n-1] if ↘)
 * => For DP[n-2], there are the following cases:
 *   a. choosing index n-2
 *   // The answer is already lies in the DP[n-1], if nums[n-2] < nums[n-1], we can add it as a candidate.
 *   b. choosing index [n-2, n-1, n] or [n-2, n-1]
 *   // If nums[n-2] < nums[n]
 *   c. choosing index n-2, n
 * As above, we can find there is a pattern:
 * If nums[i] < nums[j], then we can directly add DP[j] + 1 as a candidate, not recomputing nums[j -> n] again.
 * Then compare all the candidates and choose the max one by:
 * => DP[i] = Math.max(DP[i], DP[j=i+1 -> n] + 1), where nums[i] < nums[j]
 * 2. The answer is the max value in the DP array.
 */
function lengthOfLIS(nums: number[]): number {
  // The smallest LIS should be 1
  const dp = Array(nums.length).fill(1);
  // Resolve the DP array from the last element.
  for(let i =nums.length - 2; i >= 0; i--) {
    for(let j = i + 1; j < nums.length; j++) {
      // Add it as a candidate if meet the ↗ condition
      if (nums[i] < nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}

expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).to.equal(4);
expect(lengthOfLIS([0, 1, 0, 3, 2, 3])).to.equal(4);
expect(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])).to.equal(1);
