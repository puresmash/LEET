import { expect } from 'chai';

class Interval {
  start: number;
  end: number;
  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
}

/**
 * 252. Meeting Rooms
 * Easy
 * Intervals
 * Time complexity: O(nlogn), Space complexity: O(1)
 * Sort and iterate through the intervals, if the previous meeting isn't ended, return false.
 * (prevEndTime > currentStartTime)
 * Otherwise, update the previous end time.
 */
class Solution {
  canAttendMeetings(intervals: Interval[]): boolean {
    intervals.sort((a, b) => a.start - b.start);
    let prevEndTime = 0;
    return intervals.every(({ start, end }, index) => {
      if (index === 0) {
        prevEndTime = end;
        return true;
      }
      if (start >= prevEndTime) {
        prevEndTime = end;
        return true;
      }
    });
  }
}

const solution = new Solution();
expect(
  solution.canAttendMeetings([
    new Interval(0, 30),
    new Interval(5, 10),
    new Interval(15, 20),
  ])
).to.be.false;

expect(
  solution.canAttendMeetings([
    new Interval(0, 15),
    new Interval(15, 30),
    new Interval(35, 50),
  ])
).to.be.true;
