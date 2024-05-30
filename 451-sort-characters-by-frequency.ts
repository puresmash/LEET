import { expect } from 'chai';

/**
 * Using a hashmap to count (O(n)), then sort (O(nlogn)). So the time complexity is O(nlogn).
 * The space complexity is O(n).
 */
function frequencySort(s: string): string {
  const freqMap = countFrequency(s);
  const sorted = Array.from(freqMap).sort((a, b) => b[1] - a[1]);
  return sorted.flatMap(([char, count]) => char.repeat(count)).join('');
};

function countFrequency(s: string) {
  return Array.from(s).reduce<Map<string, number>>((freqMap, char) => {
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
    return freqMap;
  }, new Map());
}

// Can also solve this by using
// 1. Heap(O(n) to build the heap, but pop n times for O(logn) for each -> O(nlogn))
// 2. Bucket sort with time complexity O(n) and space complexity O(n + k)
// where k is the length of the string (worst case: the string is formed by the same chars).

expect(['eetr', 'eert']).to.include(frequencySort('tree'));
