import { expect } from 'chai';
import { ListNode, arrayToLinkedList, linkedListToString } from '../core/LinkedList.js';

/**
 * Medium
 * fast slow pointers, two pointers, linked list
 * Time complexity: O(n), Space complexity: O(1)
 * This is a composite problem contains of multiple concepts.
 * Steps:
 * 1. Find the middle of the linked list. (LC 876 Middle of the Linked List)
 * 2. Reverse the second part of the linked list. (LC 206 Reverse Linked List)
 * 3. Place two pointers, one at the head and the other at the tail.
 * 4. Merge the two partitions one by one together. (LC 21 Merge Two Sorted Lists)
 */
function reorderList(head: ListNode | null): void {
  let fast = head, slow = head;
  // Find the middle of the linked list
  // 1 -> 2 -> 3 -> 4   |   1 -> 2 -> 3 -> 4 -> 5
  //           ↑                      ↑
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow!.next;
  }
  const middle = slow!;
  // Reverse the second sub linked list
  // 1 -> 2 -> 3 -> 4   |   1 -> 2 -> 3 -> 4 -> 5
  // 1 -> 2 -> 3 <- 4   |   1 -> 2 -> 3 <- 4 <- 5
  //           ↓                      ↓
  //          null                   null
  let tail = reverse(middle);
  // Merge
  // IF tail.next === null => done
  //     head                        head 
  //          tail                   tail
  // 1 -> 2 -> 3 <- 4   |   1 -> 2 -> 3 <- 4 <- 5
  //           ↓                      ↓
  //          null                   null
  while (head && tail && tail.next !== null) {
    const tmpLeft = head.next;
    const tmpRight = tail.next;
    head.next = tail;
    tail.next = tmpLeft;
    head = tmpLeft;
    tail = tmpRight;
  }
}

function reverse(head: ListNode) {
  let prev = null;
  let current: ListNode | null = head || null;
  while(current) {
    const next = current.next as ListNode | null;
    current.next = prev;
    prev = current;
    current = next;
  }
  // return tail for further usage
  return prev;
}   

// even
const list1 = arrayToLinkedList([1, 2, 3, 4]);
reorderList(list1);
// odd
const list2 = arrayToLinkedList([1, 2, 3, 4, 5]);
reorderList(list2)
expect(linkedListToString(list1)).to.equal('1->4->2->3');
expect(linkedListToString(list2)).to.equal('1->5->2->4->3');
