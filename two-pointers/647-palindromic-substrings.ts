import { expect } from 'chai';

/**
 * 647. Palindromic Substrings
 * Medium
 * Two Pointers, String
 * Time complexity: O(n^2), Space complexity: O(1), where n is the length of the string
 * 
 * Solution: Expand Around Center
 * 1. Iterate every character in the string, treat it as the center of the palindrome.
 * 1-1. Expand around it (i-1, i+1) to find more palindromes. Count the total palindromes found.
 * 2. Do the same thing for the even length palindrome.
 */
function countSubstrings(s: string): number {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    // Odd length palindrome
    count += findPalindrome(i, i);
    // Even length palindrome
    count += findPalindrome(i, i + 1);
  }
  function findPalindrome(l: number, r: number): number {
    let count = 0;
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
    return count;
  }
  return count;
}

expect(countSubstrings('abc')).to.equal(3);
expect(countSubstrings('aaa')).to.equal(6);
