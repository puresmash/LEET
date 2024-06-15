import { expect } from 'chai';

/**
 * Medium
 * String, Hash Table, Sorting
 * Time complexity: O(mnlogn), Space complexity: O(mn),
 * where m is the length of the word list, n is the average length of a string.
 * 
 * Steps:
 * 1. Use the sorted word as the group key of the hash map.
 *    Calculate keys: ['eat', 'tea', 'ate'] => ['aet', 'aet', 'aet']
 * 2. Put the original word into the hash map with the group key.
 *    Group them: { 'aet': ['eat', 'tea', 'ate'] }
 * 3. Dump the values from the hash map one by one and return in 2D array format.
 *    [['eat', 'tea', 'ate'], ...]
 */
function groupAnagrams(words: string[]): string[][] {
  // Edge cases
  if (words.length === 1) return [[words[0]]];
  // Group the anagrams
  const resultMap = new Map<string, string[]>();
  words.forEach(word => {
    const key = Array.from(word).sort().join('');
    const oldValues = resultMap.get(key) ?? [];
    resultMap.set(key, oldValues.concat(word));
  })
  return Array.from(resultMap.values());
}

expect(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])).to.deep.equal([
  ['eat', 'tea', 'ate'],
  ['tan', 'nat'],
  ['bat']
]);
expect(groupAnagrams([''])).to.deep.equal([['']]);
expect(groupAnagrams(['a'])).to.deep.equal([['a']]);
