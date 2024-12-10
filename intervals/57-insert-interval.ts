import { expect } from 'chai';

/**
 * Medium
 * Intervals
 * Time complexity: O(n), Space complexity: O(1)
 * Through iteration, there are only 3 possible cases:
 * 1. New interval is non-overlapping and in front of the current interval
 *          o---o
 *    x---x         newInterval
 *    Then just append the new interval then the unvisited of intervals.
 * 2. New interval is non-overlapping and behind the current interval
 *    o---o
 *          x---x   newInterval
 *    Then append the current interval and keep testing the newInterval with next element.
 * 3. Overlapping
 *      o---o
 *    x---x         newInterval
 *    Then merge them, and replace the new interval with the merged one, and keep testing with the next element. 
 */
function insert(intervals: number[][], newInterval: number[]): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = newInterval;
    const curInterval = intervals[i];
    if (start < curInterval[0] && end < curInterval[0]) {
      result.push(newInterval);
      return result.concat(intervals.splice(i));
    } else if (start > curInterval[1] && end > curInterval[1]) {
      result.push(curInterval);
    } else {
      newInterval = [Math.min(start, curInterval[0]), Math.max(end, curInterval[1])];
    }
  }
  // If the merged new interval is the last one
  result.push(newInterval);
  return result;
}

expect(insert([[1, 3], [6, 9]], [2, 5])).to.have.deep.members([[1, 5], [6, 9]]);
expect(insert([[2, 5], [6, 7], [8, 9]], [0, 1])).to.have.deep.members([[0, 1], [2, 5], [6, 7], [8, 9]]);
