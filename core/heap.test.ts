import { MaxHeap } from './heap';

/*
  Explanation of heapify process for a max heap:
  The original tree
        1
       / \
      3   5
     / \ / \
    4  6 13 10
   / \ / \
  9  8 15 17 

  1. After checking the last non-leaf node: 6
  Swap 6 17
        1
       / \
      3   5
     / \ / \
    4  17 13 10
   / \ / \
  9  8 15 6
  
  2. After checking the node: 4
  Swap 4 9
        1
       / \
      3   5
     / \ / \
    9  17 13 10
   / \ / \
  4  8 15 6
    
  3. After checking the node: 5
  Swap 5 13
        1
       / \
      3   13
     / \ / \
    9  17 5 10
   / \ / \
  4  8 15 6

  4. After checking the node: 3
  First swap 3 17, then swap 3 15 
        1
       / \
      17   13
     / \ / \
    9  15 5 10
   / \ / \
  4  8 3 6

  5. After checking the node: 1
  First swap 1 17, then swap 1 15, finally swap 1 6 
        17
       / \
      15   13
     / \ / \
    9  6 5 10
   / \ / \
  4  8 3 1
*/

describe('Basic features on a MaxHeap', () => {
  const maxHeap = new MaxHeap([1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17]);
  test('build max heap should meet the max heap properties', () => {
    expect(maxHeap.peekAll()).toEqual([17, 15, 13, 9, 6, 5, 10, 4, 8, 3, 1]);
  });
  test('size should return the number of elements inside the heap', () => {
    expect(maxHeap.size()).toBe(11);
  });
  test('pop should return the largest element inside the heap', () => {
    expect(maxHeap.pop()).toBe(17);
    expect(maxHeap.pop()).toBe(15);
    expect(maxHeap.pop()).toBe(13);
    expect(maxHeap.pop()).toBe(10);
    expect(maxHeap.pop()).toBe(9);
    expect(maxHeap.pop()).toBe(8);
    expect(maxHeap.pop()).toBe(6);
    expect(maxHeap.pop()).toBe(5);
    expect(maxHeap.pop()).toBe(4);
    expect(maxHeap.pop()).toBe(3);
    expect(maxHeap.pop()).toBe(1);
    expect(maxHeap.pop()).toBe(-1);
    expect(maxHeap.size()).toBe(0);
  });
});
