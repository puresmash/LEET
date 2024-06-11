import { ListNode, arrayToLinkedList } from '../core/LinkedList.js';

/*
  Floyd Cycle Detection Algorithm
    Time complexity: O(n)
    Space complexity: O(1)
 */

function hasCycle(head: ListNode | null): boolean {
  let [fast, slow] = [head, head];
  while(fast?.next) {
    fast = fast.next.next;
    slow = slow!.next;
    if (fast === slow) return true;
  }
  return false;
}

const linkedList = arrayToLinkedList([3, 2, 0, -4]);

linkedList.next!.next!.next!.next = linkedList.next?.next!;
console.log(hasCycle(linkedList));
