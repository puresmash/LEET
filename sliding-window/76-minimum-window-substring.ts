import { expect } from 'chai';

/**
 * 76. Minimum Window Substring
 * Hard
 * Sliding Window, String
 * Time complexity: O(m + n), Space complexity: O(c),
 * where c is the number of unique characters in t but won't exceed 52 (26 lowercase and 26 uppercase).
 * 
 * Thoughts:
 * 1. We have to first consider a valid answer, then try to shrink to find a smaller answer.
 *    Therefore, move R to the right until found a valid answer.
 * 2. If found a valid answer, try to shrink the window by moving L to the right.
 *    Therefore we can eliminate the leading useless characters.
 *    2.1 Every time got a valid answer, if it's the shortest, update the resulting substring.
 *    2.2 If the moving of L makes the window invalid, continue to move R to discover more.
 * 
 * # How to determine if the window is valid?
 * Compare the frequency map cost O(c) time. This will make a total O(c * (m+n)) time complexity.
 * That is not ideal, since we are using sliding window, we should only consider the modified one character.
 * By introducing the `needMatch` and `hasMatch` variables, 
 * *WE DON'T recalculate the previous result, only try to update the current affected character*.
 */
function minWindow(s: string, t: string): string {
  const targetFreqMap = new Map<string, number>();
  const windowFreqMap = new Map<string, number>();
  for (const char of t) {
    // Calculate the goal
    targetFreqMap.set(char, (targetFreqMap.get(char) ?? 0) + 1);
    // Take the chance to also initialize the window frequency map
    windowFreqMap.set(char, 0);
  }
  // Use this to avoid O(c) comparison
  const needMatch = targetFreqMap.size;
  let l = 0, hasMatch = 0;
  let result = '', min = Infinity;
  // Move R to the right to discover more matching characters
  for (let r = 0; r < s.length; r++) {
    // If interest in the current character
    if (targetFreqMap.has(s[r])) {
      // Update the frequency of the current character
      const newFreq = windowFreqMap.get(s[r])! + 1;
      windowFreqMap.set(s[r], newFreq);
      // If the frequency of the current character EXACTLY matches the target
      if (newFreq === targetFreqMap.get(s[r])) {
        hasMatch++;
      }
    }
    // If full match, try to shrink the window to find a local minimum result
    while(l <= r && hasMatch === needMatch) {
      // Update the result if got a valid but shorter one
      const newMin = Math.min(min, r - l + 1);
      if (newMin < min) {
        min = newMin;
        result = s.slice(l, r + 1);
      }
      // Update the frequency of the interest character
      if (targetFreqMap.has(s[l])) {
        const newFreq = windowFreqMap.get(s[l])! - 1;
        windowFreqMap.set(s[l], newFreq);
        // If mismatch, reduce the hasMatch counter
        if (newFreq < targetFreqMap.get(s[l])!) {
          hasMatch--;
        }
      }
      l++;
    }
  }
  return result;
}

expect(minWindow('ADOBECODEBANC', 'ABC')).to.equal('BANC');
expect(minWindow('a', 'a')).to.equal('a');
expect(minWindow('a', 'aa')).to.equal('');
