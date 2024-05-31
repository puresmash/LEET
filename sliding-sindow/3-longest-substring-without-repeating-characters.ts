import { expect } from 'chai';

/**
 * Sliding window
 * Time complexity: O(n), Space complexity: O(n)
 * Move the right pointer, if hit repeating, move the left pointer to exclude the repeating char.
 * e.g.
 * MV r      MV r      MV r  hit  MV l      MV l
 * abcb  ->  abcb  ->  abcb  -->  abcb  ->  abcb
 * lr        l r       l  r        l r        lr
 * ab        abc       !abcb      !bcb      cb
 * The longest substring among the valid is 'abc' = 3
 */
function lengthOfLongestSubstring(s: string): number {
  let l = 0, res = 0;
  const set = new Set();
  for (let r = 0; r < s.length; r++) {
    // Already in the set -> has repeating -> move left to remove repeating
    if (set.has(s[r])) {
      // Move left to the repeating char
      while(s[l] !== s[r]) {
        set.delete(s[l]);
        l++;
      }
      // To the closest not repeating char
      l++;
      continue;
    }
    res = Math.max(res, r - l + 1);
    set.add(s[r]);
  }
  return res;
}

expect(lengthOfLongestSubstring('abcabcbb')).to.equal(3);
expect(lengthOfLongestSubstring('bbbbb')).to.equal(1);
expect(lengthOfLongestSubstring('pwwkew')).to.equal(3);
