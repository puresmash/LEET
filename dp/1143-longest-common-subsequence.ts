import { expect } from 'chai';

/**
 * 1143. Longest Common Subsequence
 * Medium
 * DP (Bottom-up DP with 2D array)
 * Time complexity: O(n * m), where n is the length of text1, m is the length of text2
 * Space complexity: O(n * m)
 * 
 * Thoughts:
 * Add index 0 to simplify the logic
 *     a c e
 *   0 0 0 0
 * a 0 1 1 1
 * b 0 1 1 1
 * c 0 1 2 2
 * d 0 1 2 2
 * e 0 1 2 3
 * 
 * 1. If match, keep searching i + 1, j + 1
 *    => 'a' === 'a', then check the subproblem 'ac' and 'ab' (diagonal)
 *    => Vice versa, if we got 'abc' and 'ac', the previous LCS is in [i - 1, j - 1] ('ab' and 'a')
 *    => Matched, dp[i][j] = dp[i - 1][j - 1] + 1
 * 2. If not match, inherit the max value from the left or top 
 *    => For subproblem 'a' and 'ab', the LCS remains 1 (same as the 'a' and 'a')
 *    => Not matched, Math.max(left, top)
 * 3. Do this until the end of the i and j, and that is the answer (3 in this case)
 */
function longestCommonSubsequence(text1: string, text2: string): number {
  const rows = text1.length + 1;
  const cols = text2.length + 1;
  const dp = Array.from({ length: rows },() => Array(cols).fill(0));
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      // -1, string is still 0-based
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[rows - 1][cols - 1];
}

expect(longestCommonSubsequence('abcde', 'ace')).to.equal(3);
expect(longestCommonSubsequence('abc', 'abc')).to.equal(3);
expect(longestCommonSubsequence('abc', 'def')).to.equal(0);
