import { expect } from 'chai';

/**
 * Medium
 * Intervals, Greedy
 * Time complexity: O(nlogn), Space complexity: O(1)
 * As following function.
 * No need to record the merged intervals, just maintain the largest end point among the merged intervals,
 * and count the number of intervals that need to be removed during iteration.
 */
function eraseOverlapIntervals(intervals: number[][]): number {
  let countRemoved = 0;
  let lastEnd: number;
  // O(nlogn)
  intervals.sort((a, b) => a[0] - b[0]);
  intervals.forEach((interval) => {
    if (lastEnd === undefined) {
      lastEnd = interval[1];
      return;
    }
    // has intersection (o-start before x-end)
    // IF intersect, lastEnd should be the one that ended faster (greedy)
    if (interval[0] < lastEnd) {
      countRemoved++;
      // Update lastEnd to "o" point (ended faster)
      // ----x lastEnd
      // o-o
      if (lastEnd > interval[1]) {
        lastEnd = interval[1];
      }
      // ELSE
      // Remain the current position of lastEnd (ended faster)
      // ----x lastEnd
      //    o---o
    }
    // no intersection, just update lastEnd to the next interval's end
    else {
      lastEnd = interval[1];
    }
  });
  return countRemoved;
}

/**
 * Solution2:
 * Also record the max number of un-overlapping intervals.
 * Time complexity: O(nlogn), Space complexity: O(n)
 */
function solution2(intervals: number[][]): number {
  const result: number[][] = [];
  // O(nlogn)
  intervals.sort((a, b) => a[0] - b[0]);
  intervals.forEach((interval) => {
    if (result.length === 0) {
      result.push(interval);
      return;
    }
    const last = result[result.length - 1];
    // no intersection
    // x---x
    //        o---o
    if (interval[0] >= last[1]) {
      result.push(interval);
    }
    // has intersection
    // x------x
    //   o--o
    else if (last[1] > interval[1]) {
      result[result.length - 1] = interval;
    }
    // ELSE
    // x---x
    //    o---o
  });
  console.log(result)
  return intervals.length - result.length;
}

expect(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])).to.equal(1);
expect(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])).to.equal(2);
expect(eraseOverlapIntervals([[1, 2], [2, 3]])).to.equal(0);
expect(eraseOverlapIntervals([[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]])).to.equal(2);
