import { expect } from 'chai';

/**
 * 1405. Longest Happy String
 * Medium
 * Greedy, String, Heap
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * Thoughts:
 * 1. Greedy strategy: Pick the most frequent valid character each time,
 *    which can lead to the longest possible string.
 * 2. If the most frequent character has just been picked twice,
 *    use the second most frequent character.
 * 3. Can also use a max heap, but since there are only 3 characters(heap nodes),
 */
function longestDiverseString(a: number, b: number, c: number): string {
  const freqMap = new Map<string, number>();
  freqMap.set('a', a);
  freqMap.set('b', b);
  freqMap.set('c', c);
  let prevKey = '', prevCnt = 0;
  // Return most freq [k, v] tuple
  function getNext(): string | null {
    // e.g. [['b', 2], ['a', 1], ['c': 0]]
    const priorities = Array.from(freqMap.entries())
      .filter(ele => ele[1] !== 0)
      .sort((a, b) => b[1] - a[1]);
    // All characters are used
    if (!priorities.length) return null;
    const mostFreqKey = priorities[0][0];
    let newKey = null;
    // pick first priority character
    if (prevKey !== mostFreqKey || (prevKey === mostFreqKey && prevCnt < 2)) {
      newKey = mostFreqKey;
    }
    // pick second priority character if possible
    else if (priorities[1] && priorities[1][1] > 0) {
      newKey = priorities[1][0];
    }
    if (newKey !== null) {
      freqMap.set(newKey, freqMap.get(newKey)! - 1);
      prevKey !== newKey ? prevCnt = 1 : prevCnt++;
      prevKey = newKey;
    }
    return newKey;
  }
  const result = [];
  let temp: string | null = null;
  while ((temp = getNext()) !== null) {
    result.push(temp);
  }
  return result.join('');
}

expect(longestDiverseString(1, 1, 7)).to.equal('ccaccbcc');
expect(longestDiverseString(2, 4, 1)).to.equal('bbababc');
