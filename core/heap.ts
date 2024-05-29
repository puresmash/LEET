type Tuple = [string, number];
export class MaxHeap<T extends Tuple | number> {
  // In order to save the shift operation on the array, we choose to maintain the length on our own.
  // There is the possibility to have undefined in the array, but we shouldn't let it happens.
  protected array: (T | undefined)[] = [];
  private length = 0;
  constructor(array: T[]) {
    this.buildMaxHeap(array);
    this.length = this.array.length;
  }
  /** Time complexity: O(logn) */
  pop() {
    if (this.length === 0) return undefined;
    const result = this.array[0];
    this.array[0] = this.array[this.length - 1];
    this.array[this.length - 1] = undefined;
    this.length--;
    this.heapifyDown(0);
    return result;
  }
  /** Time complexity: O(logn) */
  push(tuple: T) {
    this.array[this.length] = tuple;
    this.length++;
    this.heapifyUp(this.length - 1);
  }
  /**
   * Return true if need to swap, false otherwise.
   */
  protected compareToSwap(a: T, b: T) {
    if (typeof a === 'number' && typeof b === 'number') {
      return a > b;
    }
    return (a as Tuple)[1] > (b as Tuple)[1];
  }
  private heapifyUp(i: number) {
    const parent = Math.floor((i - 1) / 2);
    // Already reached the root, end recursion
    if (parent === -1) return;
    if (this.compareToSwap(this.array[i]!, this.array[parent]!)) {
      this.swap(i, parent);
      this.heapifyUp(parent);
    }
  }
  private heapifyDown(i: number) {
    const left = i * 2 + 1;
    const right = i * 2 + 2;
    let largest = i;
    // Finding the largest among the current node and its children
    if (this.array[left] !== undefined && this.compareToSwap(this.array[left]!, this.array[largest]!)) {
      largest = left;
    }
    if (this.array[right] !== undefined && this.compareToSwap(this.array[right]!, this.array[largest]!)) {
      largest = right;
    }
    // Recursive end condition
    // Reaching leaf or no need to maintain the subtree of current node
    if (largest === i) return;
    // If the swap happens, also maintain the subtree of the affected child
    this.swap(i, largest);
    this.heapifyDown(largest);
  }
  // Time complexity: O(n), Space complexity: O(1)
  private buildMaxHeap(array: T[]) {
    this.array = array;
    for (let i = Math.floor(this.array.length / 2) - 1; i >= 0; i--) {
      // Ensure the subtree which using the current node as root meets the max heap requirement
      this.heapifyDown(i);
    }
  }
  swap(i: number, j: number) {
    const temp = this.array[i];
    this.array[i] = this.array[j];
    this.array[j] = temp;
  }
  peekAll() {
    return this.array.slice(0, this.length);
  }
  peek() {
    return this.length ? this.array[0] : undefined;
  }
  size() {
    return this.length;
  }
}

export class MinHeap<T extends Tuple | number> extends MaxHeap<T> {
  protected compareToSwap(a: T, b: T) {
    if (typeof a === 'number' && typeof b === 'number') {
      return a < b;
    }
    return (a as Tuple)[1] < (b as Tuple)[1];
  }
}

/**
 * Count the frequency of each character in the string without sorting.
 * Time complexity: O(n)
 * e.g.
 * ['t', 'r', 'e', 'e'] -> Map [['t', 1], ['r', 1], ['e', 2]]
 */
export function countFrequency(array: string[]) {
  const freqMap = new Map<string, number>();
  array.forEach(char => {
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  });
  return freqMap;
}
