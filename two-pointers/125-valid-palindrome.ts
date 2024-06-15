import { expect } from 'chai';

/**
 * Easy
 * String, Two Pointers
 * Time complexity: O(n), Space complexity: O(1)
 * Non-alphanumeric
 * => Despite regex, can also check the ASCII value.
 * Palindrome
 * => Despite two pointers, can also use stack or reverse the string.
 */
function isPalindrome(s: string): boolean {
  s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let l = 0;
  let r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++;
    r--;
  }
  return true;
}

expect(isPalindrome('12321')).to.be.true;
expect(isPalindrome('123321')).to.be.true;
expect(isPalindrome('A man, a plan, a canal: Panama')).to.be.true;
expect(isPalindrome('race a car')).to.be.false;
expect(isPalindrome(' ')).to.be.true;
