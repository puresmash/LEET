import { expect } from 'chai';

/**
 * 62. Unique Paths
 * Medium
 * DP (Bottom-up DP with 2D array)
 * Time complexity: O(m * n), Space complexity: O(m * n) -> O(min(m, n))
 * (Actually, we can choose to release the `m-2` row, the latest two rows are enough.
 * The space complexity can be optimized to 1D array.)
 * 
 * Thought:
 * 1. Given a 3 x 2 grid, for the first column and the first row, there is only one way to reach the end.
 * => 1 1 1
 *    1 ? ?
 * 2. Iterate the rest of the grid, the number of ways to reach `[i, j]` is the sum of *Down↓* and *Right→*.
 * => 1 1 1
 *    1 2 3  (3 ways to reach the end)
 * 3. Return the last of the DP array member.
 * => 3
 */
function uniquePaths(m: number, n: number): number {
  // Initialize a 2D dp array
  const dp = Array.from({ length: m }, () => Array(n).fill(1));
  // First line and first column should use the default value 1
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}

expect(uniquePaths(3, 7)).to.equal(28);
expect(uniquePaths(3, 2)).to.equal(3);
