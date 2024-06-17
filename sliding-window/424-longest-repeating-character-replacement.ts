import { expect } from 'chai';

/**
 * Medium
 * Sliding Window, String, Hash Table
 * Time complexity: O(n)
 * (Actually, it's O(26n) but we can ignore the constant)
 * Space complexity: O(1)
 * (Same as above, it's O(26))
 * 
 * Thoughts:
 * How to find the longest repeating substring if we can replace k characters?
 * 1. Find the character Cr with the most frequency in the window.
 * 2. Try to extend the Cr by replacing other characters.
 * 3. If the replacing budget is not enough, move L to find the next possible candidate.
 * 
 * Run through 'ABBBAAB' with k = 2:
 * ABBBAAB
 * LR      ABbbaab => 2
 * L R     ABBbaab => 3
 * L  R    ABBBaab => 4
 * L   R   ABBBAab => 5
 * L    R  ABBBAAb => X (out of budget)
 *  L   R  aBBBAAb => 5
 *  L    R aBBBAAB => 6
 * Don't afraid of the local maximal like 'ABBBAAb' (5).
 * The useless value will be removed by moving L,
 * therefore, every possible global maximal will be visited, like 'aBBBAAB' (6).
 */
function characterReplacement(s: string, k: number): number {
  // Edge cases
  if (s.length <= k + 1) return s.length;
  let l = 0, maxCount = 0;
  // Initialize the frequency map with the first position
  const freqMap = new Map<string, number>([[s[0], 1]]);
  // Move R to the right
  for (let r = 1; r < s.length; r++) {
    // Calculate the frequency of the current window
    freqMap.set(s[r], (freqMap.get(s[r]) ?? 0) + 1);
    while (l < r) {
      // Find the char with max frequency
      const maxFreq = Math.max(...Array.from(freqMap.values()));
      // Calculate the new max count
      const windowLength = r - l + 1;
      if (maxFreq + k >= windowLength) {
        maxCount = Math.max(maxCount, windowLength);
        // If within budget, break to keep moving R to the right
        break;
      } else {
        // If out of budget, move L to the right to shrink the window
        freqMap.set(s[l], freqMap.get(s[l])! - 1);
        l++;
      }
    }
  }
  return maxCount;
}

// This file has been ignored by cspell (lots of meaningless words)
expect(characterReplacement('ABAB', 2)).to.equal(4);
expect(characterReplacement('ABBBAAB', 2)).to.equal(6);
expect(characterReplacement('AABABBA', 1)).to.equal(4);
expect(characterReplacement('AAAA', 0)).to.equal(4);
// Edge cases
expect(characterReplacement('A', 0)).to.equal(1);
