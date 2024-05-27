import { ListNode, arrayToLinkedList, printLinkedList } from '../core/LinkedList.js';

function isPalindrome(head: ListNode | null): boolean {
  function middleNode(head: ListNode | null) {
    let [fast, slow] = [head, head];
    while(fast?.next) {
      fast = fast?.next!.next;
      slow = slow?.next!;
    }
    return slow;
  }
  function reverseList(head: ListNode | null) {
    let prev = null;
    while(head) {
      const next = head.next;
      head.next = prev;
      prev = head;
      head = next;
    }
    return prev;
  }
  const middle = middleNode(head);
  let right = reverseList(middle);
  let left = head;
  while (left && right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}

const list =  arrayToLinkedList([1, 2, 3, 2, 13]);
console.log(isPalindrome(list));
