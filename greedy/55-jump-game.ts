import { expect } from 'chai';

/**
 * Medium
 * Greedy
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * Steps:
 * Start from the goal (the end of the array), iterate backward to find the n -1 can reach the goal or not.
 * True => set the n - 1 as the new goal
 * False => keep searching n - 2 and so on
 * After the iteration, check if the goal is 0 or not.
 * 
 * Explanations if still wondering why this works:
 * 1. Take [2, 1, 1] for example, this problem didn't ask us to find the minimum steps to reach the goal.
 * So it is totally the same to first jump to index 1 then index 2.
 * Although we can directly jump to index 2 (the goal) to safe additional steps, it won't affect the result.

 *             x  y 
 * 2. Take [2, 1, 1, 1] for another example, we know x and y are both the goal candidates through the iteration.
 * Likes this example demonstrates, if we can jump to y (the nearest greater goal), we can definitely jump to x,
 * cause this problem tells us 2 is the maximum jump length. No need to worry about stuck in the *local optima*.
 */
function canJump(nums: number[]): boolean {
  let goal = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] >= goal - i) goal = i;
  }
  return goal === 0;
}

expect(canJump([2, 3, 1, 1, 4])).to.equal(true);
expect(canJump([3, 2, 1, 0, 4])).to.equal(false);
