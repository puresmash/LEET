import { expect } from 'chai';

/**
 * Medium
 * Backtracking, DFS
 * Time complexity: O(n!), Space complexity: O(n), n is the total number of elements.
 * There are totally n! permutations for n elements.
 * Used a "used" set to mark out elements for the child recursion.
 * The other approaches are not as efficient since:
 * 1. Array: Not so efficient for random deletion.
 * 2. Set: There is no a handy index to iterate, and better not to add element in a `forEach` loop.
 *    (or the `forEach` won't stop cause new elements keep added)
 * So better not to remove or add any elements, just mark them as used would be better.
 */
function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  const used = new Set<number>();
  dfs();
  function dfs() {
    // end condition
    if (used.size === nums.length) {
      result.push(path.slice());
      return;
    }
    // filter out those elements been used by parent recursion
    nums.filter(n => !used.has(n)).forEach(num => {
      used.add(num);
      path.push(num);
      dfs();
      path.pop();
      used.delete(num);
    });
  }
  return result;
}

expect(permute([1, 2, 3])).to.have.deep.members([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]);
