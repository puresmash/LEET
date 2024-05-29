import { expect } from 'chai';
import { MaxHeap, MinHeap } from '../core/heap.js';

/**
 * Heap
 * Time complexity: O(logn) for addNum, O(1) for findMedian
 * Space complexity: O(n)
 * Maintain two buckets, one for the smaller half, one for the larger half.
 * Then the median will relative to the largest element in the small bucket and the smallest element in the large bucket.
 * To easily find the largest element in the small bucket, we can use a max heap.
 * And, to easily find the smallest element in the large bucket, we can use a min heap.
 * 
 * smallPile  | largePile
 * max heap   | min heap
 *    3             4    
 *   / \           / \
 *  1   2         5   6
 * median(even number) = (3 + 4) / 2 =3.5
 */
class MedianFinder {
  private smallPile: MaxHeap<number> = new MaxHeap<number>([]);
  private largePile: MinHeap<number> = new MinHeap<number>([]);
  constructor() {}

  /** Time complexity: O(logn) */
  addNum(num: number): void {
    // First element
    if (!this.smallPile.size()) {
      this.smallPile.push(num);
      return
    }
    // Choose the right pile
    if (num > this.smallPile.peek()!) {
      this.largePile.push(num);
    } else {
      this.smallPile.push(num);
    }
    // Balance the element amount in each pile
    if (this.smallPile.size() - this.largePile.size() > 1) {
      // Move the largest element from the smallPile to the largePile
      const v = this.smallPile.pop()!;
      this.largePile.push(v);
    } else if (this.largePile.size() - this.smallPile.size() > 1) {
      // Move the smallest element from the largePile to the smallPile
      const v = this.largePile.pop()!;
      this.smallPile.push(v);
    }
  }
  /** Time complexity: O(1) */
  findMedian(): number {
    const count = this.smallPile.size() + this.largePile.size();
    if (!count) throw new Error('No element in the stream');
    // Even, and at least two elements
    else if (count % 2 === 0) {
      return (this.smallPile.peek()! + this.largePile.peek()!) / 2;
    }
    // Odd 
    else {
      return this.smallPile.size() > this.largePile.size() ? this.smallPile.peek()! : this.largePile.peek()!;
    }
  }
}

/**
* Your MedianFinder object will be instantiated and called as such:
* var obj = new MedianFinder()
* obj.addNum(num)
* var param_2 = obj.findMedian()
*/
const medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
expect(medianFinder.findMedian()).to.equal(1.5); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
expect(medianFinder.findMedian()).to.equal(2); // return 2.0
