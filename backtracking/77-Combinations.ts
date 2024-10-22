import { expect } from 'chai';

/**
 * 77. Combinations
 * Medium
 * Backtracking
 * Time complexity: O(k * n^k), Space complexity: O(k),
 *   where the first k comes from the array copy operation.
 * Can also calculate a tighter upper bound: O(k * C(n, k)),
 *   where C(n, k) equals n! / (k! * (n - k)!).
 * 
 * Walkthrough:
 * Take n = 3, k = 2 as an example, the decision tree will be:
 *       o
 *     / | \
 *    1  2  x3 (3 is impossible to form a combination containing k elements)
 *   / \ |
 *   2 3 3
 * As above, the valid combinations are [1, 2], [1, 3], [2, 3]
 */
function combine(n: number, k: number): number[][] {
  const result = [] as number[][];
  const path = [] as number[];
  dfs(1);
  function dfs(start: number) {
    // Impossible to form a combination containing k elements
    if (n - start + 1 < k - path.length) return;
    // End condition
    if (path.length === k) {
      result.push(path.slice());
      return;
    }
    // Traverse all possible paths
    for(let i = start; i <= n; i++) {
      path.push(i)
      dfs(i + 1);
      path.pop();
    }
  }  
  return result;  
}

expect(combine(4, 2)).to.have.deep.members([[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]);
expect(combine(1, 1)).to.have.deep.members([[1]]);
