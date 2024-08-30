import { expect } from 'chai';

/**
 * 70. Climbing Stairs
 * Easy
 * Dynamic Programming
 * Time complexity: O(n), Space complexity: O(n) -> O(1)
 * 
 * About space complexity:
 * In fact, it's a Fibonacci sequence, we only care the latest two numbers.
 * So, instead of memorizing all numbers in DP array, use two variables is fine.
 * But for the sake of intuition, keep the DP array solution here.
 * 
 * Thought:
 * Let's say we want to solve 3 stairs, we can start from stairs 1 or stairs 2.
 * Thus, the `climbStairs(3)` is equal to `climbStairs(2) + climbStairs(1)`.
 * We can furthermore push the pattern to `dp[n] = dp[n - 1] + dp[n - 2]`.
 * This is a typical `bottom-up` DP problem.
 */
function climbStairs(n: number): number {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;
  // dp[n] = dp[n - 1] + dp[n - 2]
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

expect(climbStairs(2)).to.equal(2);
expect(climbStairs(3)).to.equal(3);
expect(climbStairs(4)).to.equal(5);
expect(climbStairs(5)).to.equal(8);
