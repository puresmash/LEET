// Keep this in order to easily understand the mechanism of a heap.
export class BasicMaxHeap {
  // In order to save the shift operation on the array, we choose to maintain the length on our own.
  // There is the possibility to have undefined in the array, but we shouldn't let it happens.
  private values: (number | undefined)[] = [];
  private length = 0;
  constructor(array: number[]) {
    this.buildMaxHeap(array);
    this.length = this.values.length;
  }
  // Time complexity: O(logn)
  pop(): number {
    if (this.length === 0) return -1;
    const result = this.values[0] as number;
    this.values[0] = this.values[this.length - 1];
    this.values[this.length - 1] = undefined;
    this.length--;
    this.heapifyDown(0);
    return result;
  }
  private heapifyDown(i: number) {
    const left = i * 2 + 1;
    const right = i * 2 + 2;
    let largest = i;
    // Finding the largest among the current node and its children
    if (this.values[left] !== undefined && this.values[left]! > this.values[largest]!) {
      largest = left;
    }
    if (this.values[right] !== undefined && this.values[right]! > this.values[largest]!) {
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
  private buildMaxHeap(array: number[]) {
    this.values = array;
    for(let i = Math.floor(this.values.length / 2) - 1; i >= 0; i--) {
      // Ensure the subtree which using the current node as root meets the max heap requirement
      this.heapifyDown(i);
    }
  }
  swap(i: number, j: number) {
    const temp = this.values[i];
    this.values[i] = this.values[j];
    this.values[j] = temp;
  }
  peekAll() {
    return this.values.slice(0, this.length);
  }
  size() {
    return this.length;
  }
}

type Tuple = [string, number];
export class MaxHeap {
  // In order to save the shift operation on the array, we choose to maintain the length on our own.
  // There is the possibility to have undefined in the array, but we shouldn't let it happens.
  private array: (Tuple | undefined)[] = [];
  private length = 0;
  constructor(array: Tuple[]) {
    this.buildMaxHeap(array);
    this.length = this.array.length;
  }
  // Time complexity: O(logn)
  pop(): Tuple | undefined {
    if (this.length === 0) return undefined;
    const result = this.array[0] as Tuple;
    this.array[0] = this.array[this.length - 1];
    this.array[this.length - 1] = undefined;
    this.length--;
    this.heapifyDown(0);
    return result;
  }
  // Time complexity: O(logn)
  push(tuple: Tuple) {
    this.array[this.length] = tuple;
    this.length++;
    this.heapifyUp(this.length - 1);
  }
  private heapifyUp(i: number) {
    const parent = Math.floor((i - 1) / 2);
    // Already reached the root, end recursion
    if (parent === -1) return;
    if (this.array[i]![1] > this.array[parent]![1]) {
      this.swap(i, parent);
      this.heapifyUp(parent);
    }
  }
  private heapifyDown(i: number) {
    const left = i * 2 + 1;
    const right = i * 2 + 2;
    let largest = i;
    // Finding the largest among the current node and its children
    if (this.array[left] !== undefined && this.array[left]![1] > this.array[largest]![1]) {
      largest = left;
    }
    if (this.array[right] !== undefined && this.array[right]![1] > this.array[largest]![1]) {
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
  private buildMaxHeap(array: Tuple[]) {
    this.array = array;
    for(let i = Math.floor(this.array.length / 2) - 1; i >= 0; i--) {
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
  size() {
    return this.length;
  }
}
