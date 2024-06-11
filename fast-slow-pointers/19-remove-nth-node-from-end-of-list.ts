import { expect } from 'chai';
import { ListNode, arrayToLinkedList, linkedListToString } from '../core/LinkedList.js';

/**
 * Medium
 * fast slow pointers, two pointers, linked list
 * Time complexity: O(n), Space complexity: O(1)
 * This is not a typical fast-slow pointers problem, we are not using a pointer and a 2x pointer.
 * But it's kind of like LC 876 Middle of the Linked List.
 * By adding some precondition to the traversal of pointer, we can solve linked list problem.
 * 
 * Steps:
 * 1. Create a dummy node to handle the edge case of removing the head node.
 * 2. Delay the slow pointer by n steps before start.
 * 3. When the fast pointer reaches the end (null), the slow pointer will be at the previous node of the target node.
 * 4. Remove the target by abandoning the reference, make the prev.next = prev.next.next.
 * 5. Return the dummy.next.
 */
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(undefined, head);
  let fast = head, slow = dummy;
  // Fast pointer go first for n steps
  while (n > 0) {
    n--;
    fast = fast?.next ?? null;
  }
  while(fast !== null) {
    fast = fast.next;
    slow = slow?.next!;
  }
  // e.g. 1, n = 1
  // slow          fast
  // dummy -> 1 -> null
  // slow.next -----↑	
  slow.next = slow.next!.next ?? null;
  return dummy.next;
}

const result = removeNthFromEnd(arrayToLinkedList([1, 2, 3, 4, 5]), 2);
expect(linkedListToString(result)).to.equal('1->2->3->5');
