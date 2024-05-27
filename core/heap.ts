export class MaxHeap {
  // In order to save the shift operation on the array, we choose to maintain the length on our own.
  // There is the possibility to have undefined in the array, but we shouldn't let it happens.
  private values: (number | undefined)[] = [];
  private length = 0;
  constructor(array: number[]) {
    this.buildMaxHeap(array);
    this.length = this.values.length;
  }
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
    swap(this.values as number[], i, largest);
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
  peekAll() {
    return this.values.slice(0, this.length);
  }
  size() {
    return this.length;
  }
}

function swap(array: number[], i: number, j: number) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
