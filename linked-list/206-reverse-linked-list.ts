import { ListNode, arrayToLinkedList, printLinkedList } from '../core/LinkedList.js';

/* Iterative approach
    Time complexity: O(n)
    Space complexity: O(1)
 */

function reverseList(head: ListNode | null): ListNode | null {
  let prev = null;
  while(head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}

const linkedList = arrayToLinkedList([1, 2, 3, 4, 5]);
printLinkedList(linkedList);
printLinkedList(reverseList(linkedList));
