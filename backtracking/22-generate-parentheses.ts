import { expect } from 'chai';

/**
 * Medium
 * Backtracking, DFS
 * Time complexity: O(4^n / sqrt(n)), Space complexity: O(n), where n is the number of pairs.
 * (The decision tree has O(2^2n) leafs,
 *  but we have to remove those paths that will make countE > countS, which is invalid.
 *  This permutation is a *Catalan number*, which is O(4^n / sqrt(n))),
 *  but I guess let's not dig into the math here too much.)
 * Find all valid permutations of total n * (S + E) elements, but with restriction:
 * At any given of the time, `countE` should never greater than `countS`
 */
function generateParenthesis(n: number): string[] {
  const S = '(';
  const E = ')';
  const result: string[] = [];
  const path: string[] = [S];
  // Use S and E to do permutation but check `countS` >= `countE` at every recursion start.
  dfs(1, 0);
  function dfs(countS: number, countE: number) {
    // invalid
    if (countE > countS) return;
    // end condition, leaf
    if (countS === n) {
      result.push(path.join('') + E.repeat(n - countE));
      return;
    }
    // try to pick S
    path.push(S);
    dfs(countS + 1, countE);
    path.pop();
    // try to pick E
    path.push(E);
    dfs(countS, countE + 1);
    path.pop();
  }
  return result;
}

expect(generateParenthesis(3)).to.have.members(['((()))', '(()())', '(())()', '()(())', '()()()']);
