import { expect } from 'chai';
import { countFrequency, MaxHeap } from '../core/heap.js';

function topKFrequent(nums: number[], k: number): number[] {
  const freqMap = countFrequency(nums);
  const heap = new MaxHeap(Array.from(freqMap.entries()));
  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(heap.pop()![0]);
  }
  return result;
};

expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).to.have.members([1, 2]);
