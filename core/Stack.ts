/**
 * Although an array can be used as a stack in Javascript,
 * we can make it more readable by creating a Stack class.
 */
export class Stack {
  private data: number[] = [];
  push(val: number): void { 
    this.data.push(val);
  }
  pop(): number | undefined {
    return this.data.pop();
  }
  top(): number | undefined {
    return this.data[this.data.length - 1];
  }
  size(): number {
    return this.data.length;
  }
  isEmpty(): boolean {
    return this.data.length === 0;
  }
}
