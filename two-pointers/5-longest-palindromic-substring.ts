import { expect } from 'chai';

/**
 * 5. Longest Palindromic Substring
 * Medium
 * Two Pointers, Stings, Dynamic Programming, Manacher's Algorithm
 * 
 * Solution1: Expand Around Center
 *  Time complexity: O(n^2), Space complexity: O(1)
 *  For each character, expand around to find the longest possible palindrome.
 * Solution2: Dynamic Programming
 *  Time complexity: O(n^2), Space complexity: O(n^2)
 *  dp[i][j] is palindrome if dp[i+1][j-1] is palindrome and s[i] === s[j]
 * Solution3: Manacher's Algorithm
 *  Time complexity: O(n), Space complexity: O(n)
 *  Use the symmetry of palindrome to avoid unnecessary calculation.
 *  e.g.
 *  X X X X X X X X X ... n
 *      i   C   j   r  
 *  If C is the center of the current maximum palindrome,
 *    r is the right boundary of the palindrome.
 *  The palindrome radius of j should at least equal to the palindrome radius of i.
 *  Therefore, we can use the symmetry of the palindrome to avoid unnecessary calculation.
 *  Implementation:
 *    https://www.geeksforgeeks.org/manachers-algorithm-linear-time-longest-palindromic-substring-part-1/
 */
function longestPalindrome(s: string): string {
  // Edge case
  if (s.length === 1) return s;
  // Solution1 Expand Around Center
  let result = '', max = 0;
  // Iterate every possible center
  for (let i = 0; i < s.length; i++) {
    // Odd: aba
    findPalindrome(i, i);
    // Even: abba
    findPalindrome(i, i + 1);
  }
  /**
   * r = l to find odd length palindrome
   * r = l + 1 to find even length palindrome
   */
  function findPalindrome(l: number, r: number) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > max) {
        max = r - l + 1;
        result = s.slice(l, r + 1);
      }
      l--;
      r++;
    }
  }
  return result;
}

// Odd length palindrome
expect(longestPalindrome('babad')).to.equal('bab');
// Even length palindrome
expect(longestPalindrome('cbbd')).to.equal('bb');
// Edge case
expect(longestPalindrome('a')).to.equal('a');
// Multiple palindromes
expect(longestPalindrome('abababa')).to.equal('abababa');
