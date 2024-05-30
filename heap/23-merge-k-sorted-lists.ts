import { ListNode, printLinkedList, arrayToLinkedList } from '../core/LinkedList.js';
import { MinHeap } from '../core/heap.js';

/**
 * LinkedList, Heap or Merge Sort (Divide and Conquer)
 * Time complexity: O(nlogk) <- logk * n times, Space complexity: O(k) <- Heap
 * Where k is the number of lists, n is the total number of nodes in the lists.
 * There is also another approach using Merge Sort which has the same time complexity O(nlogk).
 * e.g. if k=8, and each time we merge two lists together, will need log8 = 3 times to merge into one.
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists || !lists.length) return null;
  lists = lists.filter(list => !!list);
  const firstElements: [[number, ListNode], number][] = lists.map((list, i) => ([[i, list!], list!.val]));
  const heap = new MinHeap<[[number, ListNode], number]>(firstElements);
  const dummy = new ListNode();
  let tail = dummy;
  while(heap.size()) {
    // Put the smallest among each lists to result.
    const [[index, node], _] = heap.pop()!;
    tail.next = node;
    tail = tail.next;
    let activePointer = lists[index]!;
    // Push the next element in the same list to the heap if exist.
    if (activePointer.next) {
      activePointer = activePointer.next;
      lists[index] = activePointer;
      heap.push([[index, activePointer], activePointer.val]);
    }
  }
  return dummy.next;
}

const merged = mergeKLists([arrayToLinkedList([1,4,5]), arrayToLinkedList([1,3,4]), arrayToLinkedList([2,6])]);
printLinkedList(merged); // 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
