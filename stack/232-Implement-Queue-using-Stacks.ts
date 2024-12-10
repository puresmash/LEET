import { expect } from 'chai';

/**
 * 232. Implement Queue using Stacks
 * Easy
 * Stack
 * Time complexity: O(1), Space complexity: O(n)
 * 
 * Notes:
 * Use array to simulate stack, js doesn't have stack.
 * 1. Use two stacks, the normal one for push, the reverse one for pop and peak.
 * 2. Maintain a size property to avoid illegal access
 * 3. When pop op and the reverse stack is empty, copy from the normal stack in reverse order.
 */
class MyQueue {
  private stack: number[] = [];
  private tempStack: number[] = [];
  private size: number = 0;

  push(x: number): void {
    this.stack.push(x);
    this.size++;
  }

  private maintainTemp() {
    const copy = this.stack.slice(this.stack.length - this.size, this.stack.length);
    while (copy.length) {
      this.tempStack.push(copy.pop()!);
    }
  }

  pop(): number | undefined {
    if (this.tempStack.length === 0) {
      this.maintainTemp();
    }
    this.size--;
    return this.tempStack.pop();
  }

  peek(): number {
    if (this.tempStack.length === 0) {
      this.maintainTemp();
    }
    return this.tempStack[this.tempStack.length - 1];
  }

  empty(): boolean {
    if (this.size === 0) {
      this.stack = [];
      return true;
    }
    return false;
  }
}

const queue = new MyQueue();
queue.push(1);
queue.push(2);
expect(queue.peek()).to.equal(1);
expect(queue.pop()).to.equal(1);
expect(queue.empty()).to.be.false;

/**
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/
