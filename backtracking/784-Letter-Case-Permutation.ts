import { expect } from 'chai';

/**
 * 784. Letter Case Permutation
 * Medium
 * Backtracking
 * Time complexity: O(2^n), Space complexity: O(n)
 * where n is the length of the string.
 * 
 * Thoughts:
 * 1. This is a typical backtracking problem.
 *    Just traverse all the possible paths using push and pop.
 * 2. When encountering a number -> one path
 *                        letter -> two paths (upper case and lower case)
 */
function letterCasePermutation(s: string): string[] {
  const result = [] as string[]
  const path = [] as string[];
  dfs(0, true);
  if (isAlphabetic(s[0])) dfs(0, false);
  function dfs(index: number, upperCase: boolean): void{
    // End condition: no more characters to process
    if (index === s.length) {
      result.push(path.join(''));
      return;
    }
    path.push(upperCase ? s[index].toUpperCase() : s[index].toLowerCase());
    const next = s[index + 1];
    dfs(index + 1, true);
    // Only alphabet can lead to diverging paths (aA), number will not (5)
    if (isAlphabetic(next)) {
      dfs(index + 1, false);
    }
    path.pop();
  }
  return result;
}

function isAlphabetic(char: string) {
  // not nil and is alphabet
  return char !== undefined &&/[a-zA-Z]/.test(char);
}

expect(letterCasePermutation('a1b2')).to.have.members(['a1b2', 'a1B2', 'A1b2', 'A1B2']);
expect(letterCasePermutation('3z4')).to.have.members(['3z4', '3Z4']);
