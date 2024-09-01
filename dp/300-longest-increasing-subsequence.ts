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
 *    => DP[n] = 1 (itself is a LIS)
 *    => DP[n-1] is easy to resolve (whether choosing [n-1, n] if ↗ OR [n-1] if ↘)
 *    => For DP[n-2], there are the following cases:
 *    a. Choosing index n-2
 *       => DP[n-2] = 1 (as candidateA)
 *    b. Choosing index (n-2, n-1, n) or (n-2, n-1)
 *       We don't care whether choosing n, already resolved in DP[n-1].
 *       => IF nums[n-2] < nums[n-1]
 *          THEN DP[n-2] = DP[n-1] + 1 (as candidateB)
 *    c. Choosing index n-2, n
 *       => IF nums[n-2] < nums[n]
 *          THEN DP[n-2] = DP[n] + 1 (as candidateC)
 *    => DP[n-2] = Math.max(candidateA, candidateB, candidateC)
 * 2. As above, we can find a pattern:
 *    If nums[i] < nums[j], we can add DP[j] + 1 as a candidate, without iterate nums[j -> n] again.
 *    Then compare all the candidates and choose the max one by:
 *      DP[i] = Math.max(DP[i], DP[j=i+1 -> n] + 1), where nums[i] < nums[j]
 * 3. The answer is the max value in the DP array.
 *
 * Example:
 * Take sequence [4, 2, 1, 3] as an example:
 * 1. First, we simplify the problem as [3], LIS([3]) = 1.
 * 2. Then, let's discuss with [1, 3], because 1 < 3, LIS([1, 3]) = LIS([3]) + 1 = 2.
 * 3. Again, for subsequence start from 2, let's discuss with [2, 1, 3].
 * 3-1. Is 2 > 1? NO, so we CAN'T use the result of LIS([1, 3]).
 * 3-2. Is 2 < 3? YES, so we CAN use the result of LIS([3]),
 *      therefore LIS([2, 1, 3]) so far equals to LIS([3]) + 1 = 2.
 * 4. Next will be [4, 2, 1, 3], 4 is greater than the rest, LIS([4]) = 1.
 * 5. All the sub-problems are resolved, we get the following results:
 *    [4, 2, 1, 3]
 *     1, 2, 1, 2
 * 6. Finally, compare the results and get the max value, which is 2.
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
