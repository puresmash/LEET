import { expect } from 'chai';
import { Deque } from '../core/Deque.js';

/**
 * Hard
 * Monotonic queue, Deque
 * Time complexity: O(n), Space complexity: O(k)
 * 
 * Thoughts:
 * Brute force: O(nk) <-- iterate cost O(n) * check max in the window O(k)
 * How to optimize?
 * By the face that the previous smaller numbers in the window won't be the answer, 
 * can safely drop them from the window.
 * e.g.
 * A. [[1, 2, 5], 3, ...] <- the number 1 and 2 are lose either from position or value. 
 * Queue: [5]
 * B. [1, [2, 5, 3], ...] <- the number 3 is smaller, but newer, could be the answer in the future.
 * Queue: [5, 3]
 * C. [1, 2, 5, [3, 0, 1]] <- the future where 3 is the answer.
 * Queue: [3, 1]
 * A monotonic queue will match the above requirements.
 * By using it, we can use O(1) to get the max in the window.
 * 
 * What is a monotonic queue?
 * The numbers inside are in either descending or ascending order.
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
  const result = [];
  // init the monotonic queue
  const window = new Deque();
  window.append(0);
  // boundary case
  if (k === 1) return nums;
  for (let r = 1; r < nums.length; r++) {
    // 1. Emit the smaller elements from the tail
    while (!window.isEmpty() && nums[r] > nums[window.peekTail()!]) {
      window.pop();
    }
    // 2. Keep left most element inbound
    if (!window.isEmpty() && window.peekHead()! === r - k) {
      window.popLeft();
    }
    // 3. Add new element to the window
    window.append(r);
    // 4. Get the max from the head
    if (r >= k - 1) {
      result.push(nums[window.peekHead()!]);
    }
  }
  return result;
}

// boundary cases
expect(maxSlidingWindow([5], 1)).to.deep.equal([5]);
expect(maxSlidingWindow([1, -1], 1)).to.deep.equal([1, -1]);
// normal cases
expect(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)).to.deep.equal([3, 3, 5, 5, 6, 7]);
expect(maxSlidingWindow([7, 6, 5, 2, 8, 1, 0], 3)).to.deep.equal([7, 6, 8, 8, 8]);
