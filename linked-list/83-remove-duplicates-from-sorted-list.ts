import { expect } from 'chai';
import { ListNode, arrayToLinkedList, linkedListToString } from '../core/LinkedList.js';

/**
 * 83. Remove Duplicates from Sorted List
 * Easy
 * Linked List
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * For each node, check if the next node is a duplicate
 * => If yes, move the pointer to the next next node
 * => If no, move the pointer to the next node
 */
function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head) return head;
  let current = head;
  while (current?.next) {
    // IF duplicate, remove the next node by skipping it
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return head;
}

const result1 = deleteDuplicates(arrayToLinkedList([1, 1, 2]));
expect(linkedListToString(result1)).to.equal('1->2');
const result2 = deleteDuplicates(arrayToLinkedList([1, 1, 2, 3, 3]));
expect(linkedListToString(result2)).to.equal('1->2->3');
// Edge case
const result3 = deleteDuplicates(arrayToLinkedList([]));
expect(linkedListToString(result3)).to.equal('');
