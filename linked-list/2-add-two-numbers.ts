import { expect } from 'chai';
import { ListNode, arrayToLinkedList, linkedListToString } from '../core/LinkedList.js';

/**
 * Medium
 * Linked List
 * Time complexity: O(n), Space complexity: O(1)
 * Traverse the linked list, remember handle the carry and the edge case of it.
 */
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let current = dummy;
  let carry = 0;
  while(l1 || l2 || carry) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    const val = sum % 10;
    carry = Math.floor(sum / 10);
    // add new node
    current.next = new ListNode(val);
    current = current.next;
    // update pointer
    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }
  return dummy.next;
}

const result1 = addTwoNumbers(arrayToLinkedList([2, 4, 3]), arrayToLinkedList([5, 6, 4]));
expect(linkedListToString(result1)).to.equal('7->0->8');
const result2 = addTwoNumbers(arrayToLinkedList([0]), arrayToLinkedList([0]));
expect(linkedListToString(result2)).to.equal('0');
const result3 = addTwoNumbers(arrayToLinkedList([9, 9, 9, 9, 9, 9, 9]), arrayToLinkedList([9, 9, 9, 9]));
expect(linkedListToString(result3)).to.equal('8->9->9->9->0->0->0->1');
