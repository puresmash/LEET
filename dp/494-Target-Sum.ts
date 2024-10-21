import { expect } from 'chai';

/**
 * 494. Target Sum
 * Medium
 * Backtracking, DP (0/1 Knapsack), Math
 * 
 * Thought:
 * 1. Backtracking solution:
 * Time complexity: O(2^L), Space complexity: O(L)
 * Where L is the length of the nums array.
 * 
 * 2. DP solution (bottom-up):
 * *The DP solution will need a Math derivation, not so intuitive*
 * Time complexity: O(L * n), Space complexity: O(n)
 * Where n equal to (sum - target) / 2.
 * In order to reach the target, we should be able to separate the array into two subsets:
 *   - Positive subset: accP = n + target
 *   - Negative subset: accN = n
 * So that the result would be:
 *   result = (n + target) - n = target
 * Then we can derive the following formula:
 *   sum = 2n + target
 *   -> sum - target = 2n
 *   -> (sum - target) / 2 = n
 *   -> if we can find a subset that sums up to n, then the sum of another subset will be n + target
 *   -> use DP of length n + 1 (0-indexed) to count the occurrence, the result will be dp[n + 1]
 * 
 * Additional explanation:
 * 根據上述推導，我們可以利用 DP 找出所有落在 negative subset，且總和為 n 的數字組合，
 * 若存在，剩下在 positive subset 的數字組合會剛好為 n + target，
 * 使得 (n + target) - n = target。
 *      pSubset       nSubset
 * More explanation:
 * 按照題意，若經過加減運算後，結果為 target，則有兩種可能
 * 1. n = 0 -> (0 + target) - 0 = target -> 全部的數字均為 + 號，使得總和為 target
 * 2. n != 0 -> *額外加的* 和 *額外減的* 互相抵銷，使得剩下的正數總和仍為 target
 */
function findTargetSumWays(nums: number[], target: number): number {
  const sum = nums.reduce((acc, num) => acc + num, 0);
  // Filter those impossible cases
  if (sum < Math.abs(target) || (sum - target) % 2 !== 0) return 0;
  // Main logic
  const n = (sum - target) / 2;
  const dp = Array(n + 1).fill(0);
  // 0 is the start point
  dp[0] = 1;
  nums.forEach(num => {
    // Out of the DP array boundary
    if (num > n) return;
    // Iterate from back to front to avoid adding to a modified version of dp array
    for (let i = n; i >= num; i--) {
      // Let's say `dp[2] = 5 (5 ways to reach 2)`, `dp[5] = 0`, and incoming num is 3
      // dp[5] = dp[5] + dp[5 - 3] = 0 + 5 = 5, which means there are also 5 ways to reach 5
      dp[i] = dp[i] + dp[i - num];
    }
  });
  return dp[n];
}

expect(findTargetSumWays([1, 1, 1, 1, 1], 3)).to.equal(5);
expect(findTargetSumWays([1], 1)).to.equal(1);
expect(findTargetSumWays([1, 2, 1], 0)).to.equal(2);
