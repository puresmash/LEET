export interface BaseListNode {
  val: number;
  next: BaseListNode | null;
}

export class ListNode implements BaseListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// [a, b, c] => c,
// b -> c
// a -> b -> c
export function arrayToLinkedList(array: number[]): ListNode {
  return array.reduceRight<ListNode|null>((acc, val) => {
    return new ListNode(val, acc);
  }, null) as ListNode;
}

export function linkedListToString(headNode: BaseListNode | null) {
  if (!headNode) return '';
  const result = [];
  while(headNode.next) {
    result.push(headNode.val);
    headNode = headNode.next;
  }
  // last one doesn't has next, should add the last one back
  result.push(headNode.val);
  return result.join('->');
}

export function printLinkedList(headNode: BaseListNode | null) {
  console.log(linkedListToString(headNode));
}
