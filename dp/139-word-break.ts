import { expect } from 'chai';

/**
 * 139. Word Break
 * Medium
 * DP
 * Time complexity: O(n^2 * m), where n is the length of the string, m is the maximum length of the word in wordDict
 * Space complexity: O(n), which is used for the dp array
 * Thoughts:
 * 1. A bit similar to the LC 55-jump-game (Greedy), we iterate backward from the goal `dp[s.length] = true`,
 * but this time we need to find all the possible ways to break the string.
 * 2. For each substring been sliced during the backward iteration, if it match any word in the wordDict,
 * we can mark it as a break point candidate.
 * 2-1. Then we search to find if `dp[i + word.length]` is true or not, if yes, we can mark `dp[i] = true`.
 * 3. Finally, the answer is stored in `dp[0]`.
 * Hint:
 * You can imagine dp[x] as whether the position "after x-th word" can be a valid break point or not.
 */
function wordBreak(s: string, wordDict: string[]): boolean {
  const dp = Array(s.length + 1).fill(false);
  dp[s.length] = true;
  for (let i = s.length - 1; i >= 0; i--) {
    const substr = s.slice(i);
    for (const word of wordDict) {
      // Use this to safe the time consuming of `startsWith`
      if (word.length > substr.length) continue;
      if (substr.startsWith(word)) {
        dp[i] = dp[i + word.length];
      }
      // Already proved as a valid break point
      if (dp[i]) break;
    }
  }
  return dp[0];
}

expect(wordBreak('leetcode', ['leet', 'code'])).to.equal(true);
expect(wordBreak('applepenapple', ['apple', 'pen'])).to.equal(true);
expect(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])).to.equal(false);
