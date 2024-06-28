import { expect } from 'chai';

/**
 * 91. Decode Ways
 * Medium
 * DP
 * Time complexity: O(n), where n is the length of s
 * Space complexity: O(n) -> O(1)
 * 
 * Thoughts:
 * 1. Take the simplest example '12'.
 * => can take one digit at a time => decode as '1', '2'
 * => can take two digits => decode as '12'
 * It's very similar to LC 70. Climbing Stairs, but with some constraints.
 * That is, the selection should be a valid number (1-26) and leading zero is not allowed.
 * 2. As you might know, LC 70 is a Fibonacci sequence.
 * => so this one should be dp[i] = dp[i - 1] + dp[i - 2] with the above constraints
 * 3. If can reach the tail, should at least have 1 way to decode.
 * => dp[n + 1] = 1 OR dp[scan + 2] ?? 1, choose whatever you prefer
 * 4. Since we only need the previous two values, space complexity can be optimized from O(n) to O(1).
 */

/**
 * Solution 2
 * DP (Bottom-up DP with optimized space complexity)
 * Time complexity: O(n), where n is the length of s
 * Space complexity: O(1)
 */
function numDecodings(s: string): number {
  // Not allowed leading zero
  if (!s.length || s[0] === '0') return 0;
  // Should at least have 1 if can reach the tail
  let prev2 = 1;
  let prev1 = s[s.length - 1] === '0' ? 0 : 1;
  // From s[-2] to s[0]
  for(let i = s.length - 2; i >= 0; i--) {
    // Continuous zero is not allowed
    if (s[i] === '0' && s[i + 1] === '0') return 0;
    const takeOne = s[i + 1] === '0' ? 0 : prev1;
    const takeTwo = checkValid(s.slice(i, i + 2)) && s[i + 2] !== '0' ? prev2 : 0;
    // Move pointer, prev1 -> current, prev2 -> prev1
    [prev1, prev2] = [takeOne + takeTwo, prev1];
  }
  return prev1;
}

/**
 * Solution 1
 * DP (Bottom-up DP with 1D array)
 * Time complexity: O(n), where n is the length of s
 * Space complexity: O(n)
 */
function solution1(s: string): number {
  // Not allowed leading zero
  if (!s.length || s[0] === '0') return 0;
  const dp = Array(s.length).fill(0);
  // Counting the last element s[-1]
  dp[s.length - 1] = s[s.length - 1] === '0' ? 0 : 1;
  // From s[-2] to s[0]
  for(let i = s.length - 2; i >= 0; i--) {
    // Continuous zero is not allowed
    if (s[i] === '0' && s[i + 1] === '0') return 0;
    // e.g.
    // a. '10' take one digit => decode as '1', '0' => invalid since '0' is not valid
    // b. '11' take one digit => decode as '1', '1' => valid branch => has dp[i + 1] ways to decode 
    const takeOne = s[i + 1] === '0' ? 0 : dp[i + 1];
    // e.g.
    // a. '27' take two digits => decode as '27' => invalid branch => cannot take two digits
    // b. '210' take two digits => decode as '21', '0' => invalid branch => cannot take two digits
    // c. '22' => decode as '22' => valid branch => dp[i + 2] is out of bound (undefined) but should at least 1 way to decode
    // d. '232' => decode as '23', '2' => valid branch => has dp[i + 2] ways to decode
    const takeTwo = checkValid(s.slice(i, i + 2)) && s[i + 2] !== '0' ? (dp[i + 2] ?? 1) : 0;
    dp[i] = takeOne + takeTwo;
  }
  // console.log(s, dp);
  return dp[0];
}

function checkValid(s: string): boolean {
  if (s[0] === '0') return false;
  const num = parseInt(s);
  return num >= 1 && num <= 26;
}

expect(numDecodings('12')).to.equal(2);
expect(numDecodings('226')).to.equal(3);
expect(numDecodings('27')).to.equal(1);
expect(numDecodings('2101')).to.equal(1);
expect(numDecodings('10')).to.equal(1);
expect(numDecodings('1123')).to.equal(5);
expect(numDecodings('230')).to.equal(0);
// Edge case
expect(numDecodings('0')).to.equal(0);
expect(numDecodings('06')).to.equal(0);
