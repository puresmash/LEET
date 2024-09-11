import { expect } from 'chai';
import { MinHeap } from '../core/heap.js';

class Interval {
  start :number;
  end :number;
  constructor(start :number, end :number) {
    this.start = start;
    this.end = end;
  }
}

/**
 * 253. Meeting Rooms II
 * Medium
 * Intervals, Two Pointers, Heap
 * Time complexity: O(nlogn), Space complexity: O(n)
 * 
 * Solution1:
 * Two-pointers
 * Similar to the Line Sweep algorithm
 * Iterate through the start points, each end point smaller than it means a room is released (cnt - 1). 
 * Each start point means a room requirement (cnt + 1).
 * The maximum count is the answer.
 * e.g.
 * For `[[0, 30], [5, 10], [15, 20]]`, sort the start and end points:
 * Start: 0, 5, 15  |  End: 10, 20, 30  |  cnt
 * At t0  +1                                1
 * At t5     +1                             2
 * At t15       +1          -1              2 
 * => max cnt = 2
 * 
 * Solution2:
 * Min-Heap
 * Use a min-heap to track the fastest end time of the meeting rooms.
 * Details:
 *   Each time we need to start a meeting, check the min-heap to see if there is a room available.
 *   (the end time at the top of the heap <= the start time of the current meeting)
 *     IF yes, use that meeting room.
 *       => update the end time of that meeting room (pop the top then push the new end time)
 *     IF no, create a new room (cnt + 1).
 *       => push the end time of the new room to the heap.
 */
class Solution {
  minMeetingRooms(intervals: Interval[]): number {
    // Sort the start and end points separately
    const start = intervals.map(({ start }) => start).sort((a, b) => a - b);
    const end = intervals.map(({ end }) => end).sort((a, b) => a - b);
    let max = 0;
    let count = 0;
    let endPointer = 0;
    // Iterate the start pointer one by one
    start.forEach((sTime) => {
      while (endPointer < end.length && end[endPointer] <= sTime) {
        // Move the end pointer when a room is released
        endPointer++;
        count--;
      }
      count++;
      max = Math.max(max, count);
    });
    return max;
  }
  solution2(intervals: Interval[]) {
    const rooms = new MinHeap<number>([]);
    intervals.sort((a, b) => a.start - b.start);
    let count = 0;
    intervals.forEach(({ start, end }) => {
      // check if a room is released
      const fastestEnd = rooms.peek() || Infinity;
      if (fastestEnd <= start) {
        // release a room when possible
        rooms.pop();
      } else {
        // concurrent meetings
        count++;
      }
      // book a room
      rooms.push(end);
    });
    return count;
  }
}

const solution = new Solution();
expect(solution.minMeetingRooms([
  new Interval(0, 30),
  new Interval(5, 10),
  new Interval(15, 20),
])).to.equal(2);
