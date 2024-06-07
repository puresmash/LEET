import { expect } from 'chai';

const PHONE_MAP: Record<string, string[]> = {
  '2': ['a', 'b', 'c'],
  '3': ['d', 'e', 'f'],
  '4': ['g', 'h', 'i'],
  '5': ['j', 'k', 'l'],
  '6': ['m', 'n', 'o'],
  '7': ['p', 'q', 'r', 's'],
  '8': ['t', 'u', 'v'],
  '9': ['w', 'x', 'y', 'z'],
};

/**
 * Medium
 * Backtracking, DFS
 * Time complexity: O(n * 4^n), Space complexity: O(n), where n is the number of digits.
 * 
 * This is another typical example of backtracking, not much can do to restrict the expansion of the recursion tree.
 * Which is typically a brute force solution.
 * The purpose of this is just demonstrating the application of tracing the path, and what are the basic operations of backtracking.
 */
function letterCombinations(digits: string): string[] {
  if (!digits) return [];
  const result: string[] = [];
  const path: string[] = [];
  dfs(0);
  function dfs(i: number) {
    // end condition
    if (path.length === digits.length) {
      result.push(path.join(''));
      return;
    }
    const letters = PHONE_MAP[digits[i]];
    letters.forEach(letter => {
      path.push(letter);
      dfs(i + 1);
      path.pop();
    });
  }
  return result;
}

expect(letterCombinations('23')).to.have.members(["ad","ae","af","bd","be","bf","cd","ce","cf"]);
expect(letterCombinations('')).to.have.members([]);
expect(letterCombinations('2')).to.have.members(["a","b","c"]);
