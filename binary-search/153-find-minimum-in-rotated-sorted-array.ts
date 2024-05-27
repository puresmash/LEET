import assert from 'assert';

/**
 * Time complexity: O(logN) -- using binary search
 */

function findMin(nums: number[]): number {
  let l = 0;
  let r = nums.length - 1;
  let min = nums[0];
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] >= nums[l]) {
      min = Math.min(min, nums[l]);
      l = m + 1;
    } else {
      min = Math.min(min, nums[m]);
      r = m;
    }
  }
  return Math.min(min, nums[l]);
};

/**
 * 思路：
 * 1. 需要將時間壓縮至比 O(n) 更小，表示需利用問題特性，在未實際走訪全部元素的情況下找出答案，
 * 而這通常是 binary search 的問題，而 binary search 為 O(logN)，與題目完全符合。
 * 2. 某範圍區間若為升序，表示區間內不含 Pivot(轉折點)，
 * 若不含 Pivot，則範圍最小值發生在升序數列的最左邊，區間內其餘元素可在未檢查的情況下視為以檢查，
 * 繼續檢查其他未檢查區間。
 * 
 * 
 * 0 1 2 3 4 5
 * 3 4 5 0 1 2
 * L   M     R
 * 
 * IF M > L
 * 表示 [L -> M] 為升序，則最小值在 L 或 [(M+1) -> R] 之間
 * 也可理解為，[L -> M] 之間檢查 L 已足夠，檢查沒檢查過的 [(M+1) -> R] 之間
 * 
 * 3 4 0 1 2
 * 4 0 1 2 3
 * L   M   R
 * 
 * IF M < L
 * [L -> M] 非升序，唯一可能是 Pivot[4, 0] 發生在 [L -> M] 之間，深入檢查之，並排除 [M -> R]
 */
assert.equal(findMin([0, 1, 2, 3, 4, 5]), 0, 'failed: [0, 1, 2, 3, 4, 5]');
assert.equal(findMin([3, 4, 5, 0, 1, 2]), 0, 'failed: [3, 4, 5, 0, 1, 2]');
assert.equal(findMin([3, 4, 0, 1, 2]), 0, 'failed: [3, 4, 0, 1, 2]');
assert.equal(findMin([4, 0, 1, 2, 3]), 0, 'failed: [4, 0, 1, 2, 3]');

assert.equal(findMin([2, 1]), 1, 'failed: [2, 1]');
