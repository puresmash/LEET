class Node {
  val: number;
  prev: Node | null;
  next: Node | null;
  constructor(val?: number, prev?: Node | null, next?: Node | null) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
    this.prev = (prev === undefined ? null : prev);
  }
}

export class Deque {
  head: Node | null = null;
  tail: Node | null = null;
  init(val: number) {
    this.head = this.tail = new Node(val);
  }
  append(val: number) {
    if (!this.tail) {
      this.init(val);
      return;
    }
    this.tail.next = new Node(val, this.tail, null);
    this.tail = this.tail.next;
  }
  appendLeft(val: number) {
    if (!this.head) {
      this.init(val);
      return;
    }
    const newHead = new Node(val, null, this.head);
    this.head.prev = newHead;
    this.head = this.head.prev;
  }
  pop(): number | null{
    if (!this.tail) return null;
    const result = this.tail.val;
    if (this.head === this.tail) {
      this.head = this.tail = null;
      return result;
    }
    this.tail.prev!.next = null;
    this.tail = this.tail.prev;
    return result;
  }
  popLeft(): number | null {
    if (!this.head) return null;
    const result = this.head.val;
    if (this.head === this.tail) {
      this.head = this.tail = null;
      return result;
    }
    this.head.next!.prev = null;
    this.head = this.head.next;
    return result
  }
  peekTail(): number | null {
    return this.tail?.val ?? null;
  }
  peekHead(): number | null {
    return this.head?.val ?? null;
  }
  isEmpty(): boolean {
    return this.head === null || this.tail === null;
  }
}
