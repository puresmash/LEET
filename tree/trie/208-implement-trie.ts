import { expect } from 'chai';

/**
 * 208. Implement Trie (Prefix Tree)
 * Medium
 * Design, Trie
 * Time complexity: O(n), where n is the length of the word
 * Space complexity: O(26*l), where l is the average length of the word
 * 
 * e.g. Demonstrate the data structure of the trie
 * Insert: ape, app, apple (`!` represents the end of the word)
 *   root → a → p → e!
 *                ↘ p! → l → e!
 * The references/pointers are stored in a Map to provide O(1) access time
 */
class Trie {
  #root: Node = new Node();
  insert(word: string): void {
    let current = this.#root;
    Array.from(word).forEach((char, i, array) => {
      const isLast = i === array.length - 1;
      current.upsert(char, isLast);
      current = current.find(char)!;
    });
  }
  search(word: string): boolean {
    let current = this.#root;
    return Array.from(word).every((char, i, array) => {
      if (!current.has(char)) return false;
      const isLast = i === array.length - 1;
      current = current.find(char)!;
      return isLast ? current.isEnd() : true;
    });
  }
  startsWith(prefix: string): boolean {
    let current = this.#root;
    return Array.from(prefix).every(char => {
      if (current.has(char)) {
        current = current.find(char)!;
        return true;
      }
    });
  }
}

class Node {
  #children: Map<string, Node> = new Map();
  #isEnd = false;
  constructor(isEnd = false) {
    this.#isEnd = isEnd;
  }
  /**
   * Notice that if the char already exist and marked as `isEnd`,
   * won't allow to update the flag back to false.
   */
  upsert(char: string, isEnd = false) {
    if (!this.#children.has(char)) {
      this.#children.set(char, new Node(isEnd));
      return;
    }
    // If exist, only allow to update
    if (isEnd) {
      this.#children.get(char)!.setEnd();
    }
  }
  find(char: string): Node | undefined {
    return this.#children.get(char);
  }
  has(char: string): boolean {
    return this.#children.has(char);
  }
  setEnd() {
    // There is no need to unset `isEnd`
    this.#isEnd = true;
  }
  isEnd(): boolean {
    return this.#isEnd;
  }
  toString(): string {
    return Array.from(this.#children.keys()).join(',');
  }
}

const test1 = new Trie();
test1.insert('apple');
expect(test1.search('apple')).to.equal(true);
expect(test1.search('app')).to.equal(false);
expect(test1.startsWith('app')).to.equal(true);
test1.insert('app');
expect(test1.search('app')).to.equal(true);
test1.insert('apps');
expect(test1.search('apps')).to.equal(true);
expect(test1.search('app')).to.equal(true);
