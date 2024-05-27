import assert from 'assert';

/**
 * 思路： 碰到題目要求 O(logN) 非常可能是 binary search 延伸題。
 * 將數列對半切，則必有一邊是升序，檢查升序的那邊 (1/2)，若目標在範圍內(介於兩個邊界之間)，找到之，
 * 若不在升序那側，則在另一側重複對半切，檢查其中為升序的那側 (1/4)，重複先前過程。
 * 
 * 若 L -> M 為 ascending order，則檢查 K (target) 是否為 L <= K < M，
 *    若在範圍內則對該範圍做 binary search，若不在範圍內則排除之，並重複迴圈檢查另一邊 M+1 -> R
 * 反之若 L -> M 不為 ascending order，則表示 M -> R 必為 ascending order，(sorted rotated array 的特性)
 *    同上，在範圍內則 binary search，否則排除之並續檢查另一邊 L -> M - 1
 */

function search(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (target === nums[m]) return m; 
    if (nums[m] >= nums[l]) {
      // l-m is ascending
      if (target >= nums[l] && target < nums[m]) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    } else {
      // m-r is ascending
      if (target > nums[m] && target <= nums[r]) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }
  }
  // last check when L = M = R
  return target === nums[l] ? l : -1;
}

assert.equal(search([4,5,6,7,0,1,2], 0), 4);
assert.equal(search([4,5,6,7,0,1,2], 3), -1);
assert.equal(search([1, 3], 2), -1);
assert.equal(search([3, 1], 1), 1);
