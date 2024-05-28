import { expect } from 'chai';
import { MaxHeap, countFrequency } from '../core/heap.js';

/**
 * Heap, Greedy
 * Time complexity: O(nlogk), Space complexity: O(k), where k is 26 (A-Z).
 * Because 26 is near a constant, we can also say the time complexity is O(n), and the space complexity is O(1).
 * 
 * TODO: There is a more optimized approach.
 * Use a Queue to store a tuple of [task, nextAvailableTime]
 * e.g. time=10, cd=2, the next available time should be 13 (curTime + cd + execTime)
 * Then we only need to pop the first element if the nextAvailableTime <= curTime. <- O(1) with a Queue structure
 * p.s. array.shift cost O(n) time complexity.
 */
function leastInterval(tasks: string[], cd: number): number {
  const freqMap = countFrequency(tasks);
  const heap = new MaxHeap(Array.from(freqMap.entries()));
  let time = 0;
  // [[name, count], cool-down]
  let cooling = [] as [[string, number], number][];
  while (heap.size() || cooling.length) {
    time++;
    // Maintain the cooling queue
    cooling = cooling.map(([taskTuple, cd]) => [taskTuple, cd - 1]);
    cooling = cooling.reduce((acc, [taskTuple, cd]) => {
      if (cd === 0) heap.push(taskTuple);
      else acc.push([taskTuple, cd]);
      return acc;
    }, [] as typeof cooling);
    // Add next task to the schedule if possible
    if (heap.size()) {
      let [name, count] = heap.pop()!;
      count--;
      // cd + 1 <- cool-down-time + execution-time (1)
      if (count > 0) cooling.push([[name, count], cd + 1]);
    }
  }
  return time;
}

expect(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 2)).to.equal(8);
expect(leastInterval(['A', 'C', 'A', 'B', 'D', 'B'], 1)).to.equal(6);
expect(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 3)).to.equal(10);
