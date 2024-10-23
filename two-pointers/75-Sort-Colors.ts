import { expect } from 'chai';

/**
 * 75. Sort Colors
 * Medium
 * Two Pointers, Dutch National Flag (DNF)
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * Thoughts (Two Pointers approach):
 * 1. Likes `LC 283. Move Zeroes`, but need to run twice.
 * 2. Use two pointers, L means sorted index, R means scanning index.
 *    Keep moving R for the target color, swap with L if found.
 *    Every swap, L moves forward by 1.
 * 3. Run twice for 0 and 1.
 * 
 * Follow-up:
 * Q: Could you come up with a one-pass algorithm using only O(1) constant space?
 * A: Employ the Dutch National Flag algorithm (DNF).
 * Q: Details?
 * A: Similar to the two-pointer approach, but with three pointers: L, R, and mid.
 *    1. In previous approach, we use pointer L to store 0 in the left side.
 *       Now we also use R to store 2 in the right side.
 *    2. Mid is the scanning pointer.
 *    3. If mid points to 0, swap with L and move L forward.
 *       Move mid by 1.
 *    4. If mid points to 1, move mid by 1.
 *    5. If mid points to 2, swap with R and move R backward.
 *       But **don't** move mid, give it another run to check the swapped number.
 *       -> Cause if the swapped number is 0, should do step 3 on it.
 * 
 * Other approaches:
 * - Bucket sort, but also a two-pass algorithm.
 */
function sortColors(nums: number[]): void {
  // L: elements before l are sorted
  // R: scanning pointer
  let l = 0;
  // 0 comes first
  sortColor(nums, 0);
  // 1 comes second
  sortColor(nums, 1);
  function sortColor(nums: number[], targetColor: number): void {
    for (let r = 0; r < nums.length; r++) {
      if (nums[r] === targetColor) {
        // swap
        [nums[l], nums[r]] = [nums[r], nums[l]];
        // move sorted pointer forward
        l++;
      }
    }
  }
}

/** Solution2: Dutch National Flag */
function sortColorsDNF(nums: number[]): void {
  // Some will also define this as low, mid, high
  let l = 0, r = nums.length - 1;
  for (let mid = 0; mid <= r;) {
    if (nums[mid] === 0) {
      [nums[l], nums[mid]] = [nums[mid], nums[l]];
      l++;
      mid++
    } else if (nums[mid] === 2) {
      [nums[r], nums[mid]] = [nums[mid], nums[r]];
      r--;
    }
    // 1
    else {
      mid++;
    }
  }
}

let nums = [2, 0, 2, 1, 1, 0];
sortColorsDNF(nums);
expect(nums).to.deep.equal([0, 0, 1, 1, 2, 2]);
nums = [2, 0, 1];
sortColorsDNF(nums);
expect(nums).to.deep.equal([0, 1, 2]);
