import { expect } from 'chai';

/**
 * Medium
 * fast & slow pointers, array (Use index, Luke)
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * This is actually a linked list been stored using an array.
 * Let's say if we got this array:
 * index| 0  1  2  3  4  5
 * value| 1  3  5  2  1  4
 * We can use the value as the pointer of index.
 * Since there is a cycle
 * => there will be a node with multiple incoming link
 * => must have a cycle
 * => the duplicate number is the entry of the cycle
 * 0 → 1 → 3 → 2 
 *       ↖     ↓
 *         4 ← 5
 * 
 * Advance of the Floyd's Tortoise and Hare (Cycle Detection)
 *   p
 * 0 → 1 → 2 → 3 
 *     x ↖     ↓   c (length of cycle)
 *         5 ← 4
 *        (where two pointers meet)
 * Through the above diagram, we can conclude into the following:
 * 2 slow = 1 fast
 * => 2 (p + c - x) = p + 2c - x
 * => p = x
 * => move 1 at a time from both point 0 and point 5, they will meet at the entry of the cycle
 */
function findDuplicate(nums: number[]): number {
  // Slow pointer move 1 => slow = nums[slow]
  // Fast pointer move 2 => fast = nums[nums[fast]]
  // Start together at point 0, stop when they meet again
  let fast = 0, slow = 0;
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (fast !== slow);
  // Stop when two slow pointers meet
  let slow2 = 0;
  while (slow !== slow2) {
    slow = nums[slow];
    slow2 = nums[slow2];
  }
  return slow2;
}

expect(findDuplicate([1, 3, 4, 2, 2])).to.equal(2);
expect(findDuplicate([3, 1, 3, 4, 2])).to.equal(3);
expect(findDuplicate([3, 3, 3, 3, 3])).to.equal(3);
