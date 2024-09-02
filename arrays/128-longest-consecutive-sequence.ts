import { expect } from 'chai';

/**
 * 128. Longest Consecutive Sequence
 * Medium
 * Hash Table, Array
 * Time complexity: O(n), Space complexity: O(n)
 * 
 * Thought:
 * Iterate will take O(n), if we want to optimize the time complexity from O(nlogn) to O(n),
 * we need to find element in O(1) time.
 * Thus we have two choices:
 *    1. Use `Set` or `Map` which has O(1) search time.
 *    2. Use radix or index based sorting which has O(n) sorting time.
 * Take the choice 1 here cause faster and easier.
 * 
 * Note:
 * Can also be solved by *Radix Sort*. According to the question, maximum number is 10^9.
 * Therefore, the time complexity is O(9n) and space complexity is O(9+n).
 * Is slightly worse than the solution "Using Set and find leading of subsequence".
 */
function longestConsecutive(nums: number[]): number {
  if (nums.length === 0) return 0;
  // Loop Set to ignore duplicates
  const set = new Set(nums);
  // All numbers will be visited twice => O(n)
  let max = 1;
  set.forEach((num) => {
    if (set.has(num - 1)) return;
    let count = 1;
    while (set.has(++num)) count++;
    max = Math.max(max, count);
  });
  return max;
}

expect(longestConsecutive([100, 4, 200, 1, 3, 2])).to.equal(4);
expect(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).to.equal(9);
// edge case
expect(longestConsecutive([])).to.equal(0);
