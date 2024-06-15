import { expect } from 'chai';

/**
 * Easy
 * String, Hash Table, Array
 * Solution 1: Count the frequency of each character and compare
 * Time complexity: O(n), Space complexity: O(n)
 * Solution 2: Sort the strings and compare
 * Time complexity: O(nlogn), Space complexity: O(1)
 */
function isAnagram(s: string, t: string): boolean {
  // Solution 1
  const freqMap = new Map<string, number>();
  // Different length => not anagram
  if (s.length !== t.length) return false;
  // Count the frequency of first string
  for (const char of s) {
    freqMap.set(char, (freqMap.get(char) ?? 0) + 1);
  }
  // Use the previous map to compare the second string
  for (const char of t) {
    // Return false when count down to 0 or not exist
    if (!freqMap.has(char) || freqMap.get(char) === 0) {
      return false;
    } else {
      freqMap.set(char, freqMap.get(char)! - 1);
    }
  }
  return true;
}

expect(isAnagram('anagram', 'nagaram')).to.be.true;
expect(isAnagram('rat', 'car')).to.be.false;
expect(isAnagram('rat', 'cart')).to.be.false;
