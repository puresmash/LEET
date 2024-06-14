import { expect } from 'chai';

/**
 * Easy
 * Greedy, sliding window, two pointers
 * Time complexity: O(n), Space complexity: O(1)
 * Can also done by DP but no needs
 * Run the sliding window, updating the interval bringing the maximum profit
 * 此例中`l = r`的修正，使答案剛好不會陷入局部最佳解，故比 DP 適合
 * By the `l = r` correction, the answer will not be trapped in local optimal solution.
 */
function maxProfit(prices: number[]): number {
  if (!prices || prices.length === 1) return 0;
  let max = 0;
  for (let l = 0, r = 1; r < prices.length; r++) {
    const diff = prices[r] - prices[l];
    if (diff > 0) {
      // Examine whether can get a better profit
      max = Math.max(max, diff);
    } else {
      // If hit a valley, reset the left pointer
      // R is lower than L, means start from L, there won't be a better profit in the future
      // At least if there a higher price, buy from R will bring more profit,
      // so, choosing R as an new L, examine it to see if it can bring a better profit is reasonable.
      l = r;
    }
  }
  return max;
}

expect(maxProfit([1, 3, 2, 5, 4, 6])).to.equal(5);
expect(maxProfit([3, 5, 7, 2, 4, 1, 6])).to.equal(5);
expect(maxProfit([7, 1, 5, 3, 6, 4])).to.equal(5);
expect(maxProfit([7, 6, 4, 3, 1])).to.equal(0);
