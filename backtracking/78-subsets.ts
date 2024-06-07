import { expect } from 'chai';

/**
 * Medium
 * Backtracking, DFS
 * Time complexity: O(n * 2^n), Space complexity: O(n), where n is the length of the input array.
 * Cause there are 2^n subsets in the array, and will cost n to iterate the array and got one of the subset.
 */
function subsets(nums: number[]): number[][] {
  const result: number[][] = [[]];
  // Use hash map here for O(1) access, add, and delete.
  const candidates = new Map<number, number>();
  nums.forEach((num, i) => {
    candidates.set(i, num);
  });
  const path: number[] = [];
  // use -1 here, cause the initial run doesn't have a previous index.
  dfs(-1);
  function dfs(prevIndex: number) {
    // end condition
    if (nums.length === 0) return;
    Array.from(candidates.keys()).forEach(key => {
      // [i0, i1], [i1, i0] is the same subset
      // should traverse candidates in index order to prevent the above case
      if (key <= prevIndex) return;
      const num = candidates.get(key)!;
      candidates.delete(key);
      path.push(num);
      result.push(path.slice());
      dfs(key);
      path.pop();
      candidates.set(key, num);
    });
  }
  return result;
}

/**
 * This solution is easier to implement and is more intuitive
 * For each number in the array, we got two choices: select or not select.
 * So the total choices will be 2^n.
 * e.g.
 * [1, 2]
 *  o  o
 *  o  x
 *  x  o
 *  x  x
 * Like the above, we establish two branches for each number.
 * The pseudo code will looks like:
 * dfs(pick number)
 * dfs(not picking number)
 * */ 
function anotherSolution(nums: number[]): number[][] {
  const result: number[][] = [];
  const subset: number[] = [];
  dfs(0);
  function dfs(i: number) {
    // out of bound
    if (i >= nums.length) {
      result.push(subset.slice());
      return;
    }
    // pick this number
    subset.push(nums[i]);
    dfs(i + 1);
    subset.pop();
    // not pick this number
    dfs(i + 1);
  }
  return result;
}

expect(subsets([1,2,3])).to.have.deep.members([[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]);
expect(anotherSolution([1,2,3])).to.have.deep.members([[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]);
