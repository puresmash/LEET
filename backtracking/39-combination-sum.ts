import { expect } from 'chai';

/**
 * Medium
 * Backtracking, DFS
 * Time complexity: O(2^t), space complexity: O(t), where t is the target value
 * (The minium number of a candidate is at least 1, so the *height* of the recursion tree is at most t <- 1 * t)
 */
function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  // want combination not permutation here
  // so, fixed to only one of the permutation - increasing permutation
  candidates.sort((a, b) => a - b);
  dfs(candidates[0], 0);
  function dfs(min: number, sum: number) {
    // end condition
    // eliminate the candidates that larger than the rest of the sum
    if (sum > target) return;
    // reaching leaf
    if (sum === target) {
      result.push(path.slice());
      return;
    }
    // should not choose candidates that smaller the previous
    // to prevent duplicate
    candidates.filter(c => {
      return c >= min;
    }).forEach((num) => {
      path.push(num);
      dfs(num, sum + num);
      path.pop();
    });
  }
  return result;
}

expect(combinationSum([2, 3, 6, 7], 7)).to.have.deep.members([[2, 2, 3], [7]]);
expect(combinationSum([8, 7, 4, 3], 11)).to.have.deep.members([[3, 4, 4], [3, 8], [4, 7]]);
