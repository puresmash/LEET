import { expect } from 'chai';
import { BaseListNode, linkedListToString } from '../core/LinkedList.js';

class Node implements BaseListNode {
  key: number;
  val: number;
  prev: Node | null;
  next: Node | null;
  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

/**
 * 146. LRU Cache
 * Medium
 * LinkedList, HashMap
 * Time complexity: O(1)
 * Space complexity: O(n), n is the capacity of the cache
 * 
 * Thoughts:
 * 1. We need to adjust the order of the collection frequently, a doubly `LinkedList` is a good choice.
 * 2. We also need to access any element in O(1) time, so we need a `HashMap` to store the Node address.
 * 3. Then the rest of the effort is to maintain the doubly `LinkedList` and the `HashMap` in sync.
 * 4. Beware, lots of edge cases need to be considered, likes
 *   - The cache is empty
 *   - The cache is full
 *   - The cache has only one element
 *   - Access the most recent element
 *   - Update the value of an existing element
 * 
 * Notes:
 * Can also be solved by the natural order of the `Map` in JS, but I think using a linked list is more general.
 */
class LRUCache {
  #least: Node | null;
  #most: Node | null;
  // Should be greater than zero, not implement the validation here
  #capacity: number;
  #map: Map<number, Node>;
  constructor(capacity: number) {
    this.#least = null;
    this.#most = null;
    this.#capacity = capacity;
    this.#map = new Map();
  }
  addToBottom(node: Node) {
    node.prev = this.#most;
    node.next = null;
    this.#most!.next = node;
    this.#most = node;
  }
  get(key: number): number {
    if (!this.#map.has(key)) return -1;
    const node = this.#map.get(key)!;
    if (this.#map.size === 1 || this.#most === node) {
      return node.val;
    }
    // Maintain order
    // Pull node
    if (this.#least === node) this.#least = node.next;
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    // Push node back
    this.addToBottom(node);
    return node.val;
  }
  put(key: number, val: number): void {
    // Update the value of an existing element
    if (this.#map.has(key)) {
      // Trigger order update
      this.get(key);
      // Update value stored in the node
      this.#map.get(key)!.val = val;
      return;
    }
    // Release space
    if (this.#map.size === this.#capacity) {
      this.#map.delete(this.#least!.key);
      this.#least = this.#least?.next ?? null;
      if (this.#least?.prev) this.#least.prev = null;
    }
    // Add new Node 
    const node = new Node(key, val);
    // Deal with empty cache
    if (!this.#map.size) {
        this.#most = node;
        this.#least = node;
    } else {
      this.addToBottom(node);
    }
    this.#map.set(key, node);
  }
  get least() {
    return this.#least;
  }
}

const lruCache = new LRUCache(2);
lruCache.put(1, 1);
expect(linkedListToString(lruCache.least)).to.equal('1');
lruCache.put(2, 2);
expect(linkedListToString(lruCache.least)).to.equal('1->2');
expect(lruCache.get(1)).to.equal(1);
expect(linkedListToString(lruCache.least)).to.equal('2->1');
// The cache is full, need to release space
lruCache.put(3, 3);
expect(linkedListToString(lruCache.least)).to.equal('1->3');
expect(lruCache.get(2)).to.equal(-1);
lruCache.put(4, 4);
expect(linkedListToString(lruCache.least)).to.equal('3->4');
// Access the most recent element
lruCache.get(4);
expect(linkedListToString(lruCache.least)).to.equal('3->4');
// Update the value of an existing element
lruCache.put(4, 100);
expect(linkedListToString(lruCache.least)).to.equal('3->100');
expect(lruCache.get(1)).to.equal(-1);
expect(lruCache.get(3)).to.equal(3);
expect(lruCache.get(4)).to.equal(100);
