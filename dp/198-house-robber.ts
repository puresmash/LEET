/*
  For each house encountered during scan, 
  compare the best approach of prev (dp[n-1]) with the current + dp[n-2]
  Time complexity: O(n)
 */

function rob(nums: number[]): number {
  let dp = [];
  dp[0] = nums[0]; // 只有一棟房的最佳解
  dp[1] = Math.max(nums[0], nums[1] ?? 0); // 只有兩棟房的最佳解
  if (nums.length < 3) return dp[1];
  // 則，三棟房的最佳解為，比較 第1+第3 和 第2 何者為大
  // 則，四棟房的最佳解為，比較 三棟房的最佳解 和 兩棟房的最佳解＋第四棟房 何者為大
  // 之後同理
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
  }
  return dp[nums.length - 1];
};

console.log(rob([2, 7, 9, 3, 1]));
