import { expect } from 'chai';

/**
 * Medium
 * Binary Search
 * Time complexity: O(logn), Space complexity: O(1)
 * Eliminate those impossible, this remain one should be the only possible candidate.
 */
function nextGreatestLetter(letters: string[], target: string): string {
  let l = 0, r = letters.length - 1;
  while(l < r) {
    const m = Math.floor((r + l) /2);
    if (letters[m].charCodeAt(0) > target.charCodeAt(0)) {
      // m is still a possible candidate
      // impossible for those bigger than m
      r = m;
    } else {
      l = m + 1;
    }
  }
  return letters[l].charCodeAt(0) > target.charCodeAt(0) ? letters[l] : letters[0];
}

expect(nextGreatestLetter(['c', 'f', 'j'], 'a')).to.equal('c');
