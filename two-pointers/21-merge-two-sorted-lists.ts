import { ListNode, arrayToLinkedList, printLinkedList } from '../core/LinkedList.js';

/**
 * LinkedList, Two Pointers
 * Time complexity: O(n), Space complexity: O(1)
 */
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let tail = dummy;
  while (list1 || list2) {
    if (!list1 && !list2) break;
    else if (!list1) {
      tail.next = list2;
      break;
    } else if (!list2) {
      tail.next = list1;
      break;
    } else if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next!;
  }
  return dummy.next;
}

const linkedList1 = arrayToLinkedList([1, 2, 4]);
const linkedList2 = arrayToLinkedList([1, 3, 4]);
printLinkedList(mergeTwoLists(linkedList1, linkedList2));
