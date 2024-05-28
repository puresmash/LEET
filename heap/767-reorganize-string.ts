import { expect } from 'chai';
import { MaxHeap } from '../core/heap.js';

/**
 * Heap, Greedy
 * Count the frequency of each character in the string.
 * Then use a max heap and always pop the remaining most frequent char.
 * Time complexity: O(nlogk), Space complexity: O(k), where k is the number of unique characters in the string.
 * There is a shortcut: if the most frequent char is more than half of the string, then it's impossible to reorganize the string.
 */
function reorganizeString(s: string): string {
  const freqMap = countFrequency(s);
  const heap = new MaxHeap(Array.from(freqMap.entries()));
  let result = '', prev = null as [string, number] | null;
  while (heap.size() !== 0) {
    let [char, count] = heap.pop()!;
    result += char;
    count--;
    if (prev) {
      heap.push(prev);
      prev = null;
    };
    if (count > 0) prev = [char, count];
  }
  if (prev && prev[1] > 0) return '';
  return result;
};

function countFrequency(s: string) {
  const freqMap = new Map<string, number>();
  Array.from(s).forEach(char => {
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  });
  return freqMap;
}

expect(reorganizeString('aab')).to.equal('aba');
expect(reorganizeString('aaab')).to.equal('');
