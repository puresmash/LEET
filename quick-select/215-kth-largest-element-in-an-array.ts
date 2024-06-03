import { expect } from 'chai';

/**
 * Medium
 * Quick select, Heap
 * Time complexity: O(n) in average, O(n^2) in worst case
 * -> O(n) + O(n/2) + O(n/4) + ... = O(2n) ~ O(n)
 * Space complexity: O(1)
 * -> in-place quick sort
 * p.s. Beware of the worst case, it coult easily happen if there are tons of duplicates in a sequence,
 *      this will make this solution fall back to O(n^2) easily.
 *      To avoid this, we can use a random pivot to make it more balanced.
 *      Or, when we hit "equal to pivot" situation, we can give it a 50% chance to swap or not.
 * 
 * Heap solution:
 * Time complexity: O(n) to build + O(klogn) to pop, Quick select here will be faster
 * Space complexity: O(n)
 */
function findKthLargest(nums: number[], k: number): number {
  return quickSelect(0, nums.length - 1);
  // sub problem
  function quickSelect(l: number, r: number): number {
    const pivot = nums[r];
    // number before pointer s has been scanned and is smaller than pivot
    let s = l;
    for(let i = l; i < r; i++) {
      if (nums[i] < pivot || nums[i] === pivot && lucky50()) {
        // swap
        [nums[i], nums[s]] = [nums[s], nums[i]];
        s++;
      }
    }
    // swap pivot and s to ensure they are in correct order
    // e.g. After iteration
    // [1, 3, 5]     |  [6, 7, 5]      |  [1, 6, 5]      |  [6, 1, 5] -> [1, 6, 5]
    //        s, r   |   s     r       |      s  r       |                   s  r
    //        pivot  |         pivot   |         pivot   |                      pivot
    // 
    // [1, 3, 5]     |  [5, 7, 6]      |  [1, 5, 6]      |  [1, 5, 6]
    //        s      |   s             |      s          |      s
    //        pivot  |   pivot         |      pivot      |      pivot
    // either case, this will complete the in-place quick sort
    [nums[s], nums[r]] = [nums[r], nums[s]];
    // Then check if the pivot is the kth largest, if not, do it recursively until it is
    if (nums.length - s === k) return pivot;
    else if (nums.length - s > k) return quickSelect(s + 1, r);
    else return quickSelect(l, s - 1);
  }
}

function lucky50() {
  return Math.random() < 0.5
}

expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).to.equal(5);
expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).to.equal(4);
