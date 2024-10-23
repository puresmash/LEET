import { expect } from 'chai';

/**
 * 283. Move Zeroes
 * Easy
 * Two Pointers
 * Time complexity: O(n), Space complexity: O(1)
 * e.g. [1, 0, 3, 0, 5]
 * 同最直觀的想法：把所有0先拿掉，非0的值往前擠 -> [1, 3, 5]，再在之後補對應數量的0 -> [1, 3, 5, 0, 0]
 * Coding: 從最左開始掃描，每次當碰到0，則以其所在位置之後最近的非0與之交換
 * [1, 0, 3, 0, 5] -> [1, 3, 0, 0, 5] -> [1, 3, 5, 0, 0]
 */
function moveZeroes(nums: number[]): void {
  // l means zero pointer, r means non-zero pointer
  let l = 0;
  // find the first position of the zero pointer
  for (; l < nums.length - 1 && nums[l] !== 0; l++);
  // scan the number after the first zero outcome
  // swap when anytime hit an non-zero
  for (let r = l + 1; r < nums.length; r++) {
    if (nums[r] !== 0) {
      // swap
      const temp = nums[l];
      nums[l] = nums[r];
      nums[r] = temp;
      // the old position of the zero pointer is safe, move it to the right by adding 1
      l++;
    }
  }
};

const ary = [0, 1, 0, 3, 12];
moveZeroes(ary);
expect(ary).to.deep.equal([1, 3, 12, 0, 0]);
