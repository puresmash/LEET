import { expect } from 'chai';

/**
 * 2044. Count Number of Maximum Bitwise-OR Subsets
 * Medium
 * backtracking, bit manipulation
 * Time complexity: O(2^n), Space complexity: O(n)
 * number of leaf nodes (2^n) and the height (n) of the decision tree.
 * 
 * Steps:
 * 1. Calculate the maximum.
 * 2. DFS traverse the decision tree to examine all possible subsets.
 * 3. When hitting the maximum, return 2^(remaining-elements).
 *    -> (max | any-number = max)
 * 4. When reaching the end, return 0.
 */
function countMaxOrSubsets(nums: number[]): number {
  // Calculate the maximum possible bitwise OR value
  let maxOr = 0;
  nums.forEach(num => maxOr |= num);
  // Count the number of subsets having maxOr
  return dfs(0, 0);
  function dfs(index: number, currentOr: number): number {
    // short circuit
    if (currentOr === maxOr) {
      const remaining = nums.length - index;
      return Math.pow(2, remaining);
    }
    // Can't reach the maximum
    else if (index === nums.length) {
      return 0;
    }
    const pick = dfs(index + 1, currentOr | nums[index]);
    const notPick = dfs(index + 1, currentOr);
    // Add the result from both branches
    return pick + notPick;
  }
}

expect(countMaxOrSubsets([3, 1])).to.equal(2);
expect(countMaxOrSubsets([2, 2, 2])).to.equal(7);
expect(countMaxOrSubsets([3, 2, 1, 5])).to.equal(6);
