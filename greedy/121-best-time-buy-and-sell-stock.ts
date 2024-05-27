/**
 * Greedy solutions, two pointers
 * can also done by DP but no needs 此處 greedy algo.
 * 此例中`l = r`的修正，使答案剛好不會陷入局部最佳解，故比 DP 適合
 * time: O(n), space: O(1)
 */
function maxProfit(prices: number[]): number {
  if (!prices || prices.length < 2) return 0;
  let max = 0;
  for (let l = 0, r = 1; r< prices.length; r++) {
    const diff = prices[r] - prices[l];
    if (diff > 0) {
      max = Math.max(max, diff);
    } else {
      l = r;
    }
    // console.log(`prices[${l}]=${prices[l]}, prices[${r+1}]=${prices[r+1]}`);
  }
  return max;
};

const result = maxProfit([1,3,2,5,4,6]);
console.log(result);
