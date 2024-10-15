import { expect } from 'chai';

/**
 * 844. Backspace String Compare
 * Easy
 * Two Pointers
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * Thoughts:
 * 1. Iterate chars from the bottom to the top
 * 2. When encountering '#', skip the next valid character
 * 3. Edge case: After the comparison, check if any remaining character in t
 */
function backspaceCompare(s: string, t: string): boolean {
  let j = t.length - 1;
  for (let i = s.length - 1; i >= 0; i--, j--) {
    // Find the next valid character in s
    i = findNextValidChar(s, i);
    // Find the next valid character in t
    j = findNextValidChar(t, j);
    // t[-1] = undefined, don't worry about a negative index
    if (s[i] !== t[j]) return false;
  }
  // Test if there is any remaining character in t
  // Valid: the remaining characters in t has the same amount of '#' and other characters
  return findNextValidChar(t, j) < 0 ? true : false;
}

function findNextValidChar(str: string, index: number): number {
  let cnt = 0;
  while (str[index] === '#' || cnt > 0) {
    str[index] === '#' ? cnt++ : cnt--;
    index--;
  }
  return index;
}

expect(backspaceCompare('ab#c', 'ad#c')).to.be.true;
expect(backspaceCompare('ab##', 'c#d#')).to.be.true;
expect(backspaceCompare('a#c', 'b')).to.be.false;
// edge case
expect(backspaceCompare('a', 'c#b#a')).to.be.true;
expect(backspaceCompare('a', 'cb#a')).to.be.false;
