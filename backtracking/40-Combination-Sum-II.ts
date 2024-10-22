import { expect } from 'chai';

/**
 * 40. Combination Sum II
 * Medium
 * Backtracking
 * Time complexity: O(n * 2^n), Space complexity: O(n)
 * 
 * Thoughts:
 * 1. The key is how to avoid duplicates.
 *    e.g. Assume candidates = [1, 5, 1], target = 6
 *    Where [1, 5] and [5, 1] are the same, can't simply use a decision tree.
 *    -> First sort the candidates to arrange the same numbers side by side.
 *       This allows us to do tricks to skip duplicates.
 * 2. Traverse the decision tree with tricks to avoid duplicates.
 */
function combinationSum2(candidates: number[], target: number): number[][] {
  const result = [] as number[][];
  candidates = candidates.filter(num => num <= target);
  candidates.sort((a, b) => a - b);
  const path = [] as number[];
  dfs(0);
  function dfs(index: number, total = 0) {
    // ---End Condition---
    if (total === target) {
      // Clone a new array O(n)
      result.push(path.slice());
      return;
    }
    // Index out of range
    if (index >= candidates.length) return;
    // Exceed the target
    if (total > target) return;
    // ---Found a Valid Path---
    // Don't pick the current candidate
    // Find next different number
    // e.g. [1, 1, 5, 7]
    //       ↑cur  ↑next
    let next = index + 1;
    while (candidates[next] === candidates[index]) {
      next++;
    }
    dfs(next, total);
    // Pick the current candidate
    const current = candidates[index];
    path.push(current);
    dfs(index + 1, total + current);
    path.pop();
  }
  return result;
}

expect(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)).to.have.deep.members([[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]);
expect(combinationSum2([2, 5, 2, 1, 2], 5)).to.have.deep.members([[1, 2, 2], [5]]);
