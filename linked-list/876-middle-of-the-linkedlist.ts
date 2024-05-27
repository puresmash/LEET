
import { ListNode, arrayToLinkedList } from '../core/LinkedList.js';

function middleNode(head: ListNode | null): ListNode | null {
  let fast = head;
  let slow = head;
  while(fast?.next) {
    fast = fast?.next?.next ?? null;
    slow = slow?.next as ListNode;
  }
  return slow;
}

const head = arrayToLinkedList([1,2,3,4,5]);
// const head = arrayToLinkedList([1,2,3,4,5,6]);
console.log(middleNode(head));
