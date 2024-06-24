import { expect } from 'chai';

/**
 * 322. Coin Change
 * Medium
 * DP
 * Time complexity: O(n * m), where n is the amount and m is the number of coins
 * (Have n amount to discover, and for each amount, we need to check all the coins)
 * Space complexity: O(n), where n is the amount
 * 
 * Thought:
 * Bottom-up DP - find a reasonable way to build the dp array
 * If we build the dp array from the target to the smallest amount, the sub-problems is unsolved.
 * e.g.
 * dp[11] = dp[10] + 1 => but dp[10] is not solved yet.
 * But if we build the dp array from the smallest amount to the target, the sub-problems are solved.
 * e.g.
 * dp[3] = dp[2] + 1 (coin 1) OR dp[1] + 1 (coin 2) => dp[2], dp[1] has been solved!
 * 
 * Steps:
 * 1. From the smallest to the target, for each amount, try all the valid coins.
 * 2. Store the minimum number of coins at each amount to the dp array.
 * 3. The answer of the sub-problem can be resolved by the previous sub-problems.
 * e.g. IF Coins = [1, 2, 5], dp[i] = dp[i - coin] + 1
 * dp[6] = Math.min(dp[6 - 1] + 1, dp[6 - 2] + 1, dp[6 - 5] + 1)
 * 4. Finally, the answer is stored in `dp[amount]`.
 */
function coinChange(coins: number[], amount: number): number {
  if (amount === 0) return 0;
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin > i) continue;
      dp[i] = Math.min(dp[i - coin] + 1, dp[i]);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

expect(coinChange([1, 2, 5], 11)).to.equal(3);
expect(coinChange([2], 3)).to.equal(-1);
// Edge case
expect(coinChange([1], 0)).to.equal(0);
