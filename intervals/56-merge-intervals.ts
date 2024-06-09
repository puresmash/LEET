import { expect } from 'chai';

/**
 * Medium
 * Intervals
 * Time complexity: O(nlogn), Space complexity: O(1)
 * 
 * When merging, the start point should be the first element, the end point should compare both.
 * e.g.
 * [1, 3] + [2, 4] => [1, 4] // s1, e2
 * [1, 4] + [2, 3] => [1, 4] // s1, e1
 */
function merge(intervals: number[][]): number[][] {
  const result: number[][] = [];
  // O(nlogn)
  intervals.sort((a, b) => a[0] - b[0]);
  // iterate and merge one by one
  intervals.forEach((interval) => {
    if (result.length === 0) {
      result.push(interval);
      return;
    }
    const last = result[result.length - 1];
    if (last[1] >= interval[0]) {
      last[1] = Math.max(last[1], interval[1]);
      return;
    } else {
      result.push(interval);
    }
  });
  return result;
}

expect(merge([[1, 3],  [8, 10], [2, 6], [15, 18]])).to.have.deep.members([[1, 6], [8, 10], [15, 18]]);
