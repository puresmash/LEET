import { expect } from 'chai';

/**
 * 211. Design Add and Search Words Data Structure
 * Medium
 * Design, Trie, DFS, String
 * Time complexity (n is the length of the word):
 *   - AddWord: O(n)
 *   - Search: O(n) / O(26^n) with wildcard
 * Space complexity: 
 *   O(26*l), where l is the average length of the word
 * 
 * Thought:
 * 1. This is a trie problem, but with wildcard support.
 * 2. When we meet a wildcard, we have to examine all the children by recursion.
 * e.g. When searching for `.ad`, need to traverse `b`, `d` and `m` at the same time.
 *      root → b → a → d!
 *           ↘ d → a → d!
 *           ↘ m → a → d!
 *           ↘ e → l → s → e!
 *      (`!` represents the end of the word)
 * 
 * Note:
 * - This is similar to `208. Implement Trie (Prefix Tree)`, but with wildcard support.
 *   But `208` can be used at auto-completion (with a startsWith method), while this one is for searching.
 */
class TrieNode {
  #children: Map<String, TrieNode>;
  #isEnd: boolean;
  constructor(isEnd = false) {
    this.#children = new Map();
    this.#isEnd = isEnd;
  }
  upsert(char: string, isEnd = false): TrieNode {
    if (!this.#children.has(char)) {
      this.#children.set(char, new TrieNode(isEnd));
      return this.#children.get(char)!;  
    }  
    // If exist, only allow to update
    if (isEnd) {
      return this.#children.get(char)!.setEnd();
    }
    return this.#children.get(char)!
  }
  has(char: string): boolean {
    return this.#children.has(char);
  }
  find(char: string): TrieNode | null {
    return this.#children.get(char) || null;
  }
  dumpNodes(): TrieNode[] {
    return Array.from(this.#children.values());
  }
  setEnd() {
    // There is no need to unset `isEnd`
    this.#isEnd = true;
    return this;
  }
  get isEnd(): boolean {
    return this.#isEnd;
  }
}

class WordDictionary {
  #root: TrieNode;
  constructor() {
    this.#root = new TrieNode();
  }

  addWord(word: string): void {
    let current = this.#root;
    Array.from(word).forEach((char, i, array) => {
      const isLast = i === array.length - 1;
      current = current.upsert(char, isLast);
    });
  }

  private searchChars(current: TrieNode, word: string): boolean {
    // Iterate through the word, if any char is not-found, return false.
    // Can't use `array.every` here, because we need to short circuit the logic when meeting a wildcard.
    for(let i = 0; i < word.length; i++) {
      const char = word[i];
      const isLast = i === word.length - 1;
      // Each time we meet a wildcard, have to examine all the children.
      // If any of them match, short circuit the logic and return true.
      if (char === '.') {
        const wildcardResult = current.dumpNodes().some((node: TrieNode) => {
          if (isLast) return node.isEnd;
          return this.searchChars(node, word.slice(i + 1));
        });
        return wildcardResult;
      } else {
        if (!current.has(char)) return false;
        current = current.find(char)!;
      }
    }
    // After iterating through the word with, each char is found. 
    // Then check if current position is the end.
    return current.isEnd;
  }

  search(word: string): boolean {
    let current = this.#root;
    return this.searchChars(current, word);
  }
}

const dictionary = new WordDictionary();
dictionary.addWord('bad');
dictionary.addWord('dad');
dictionary.addWord('mad');
expect(dictionary.search('pad')).to.be.false;
expect(dictionary.search('bad')).to.be.true;
expect(dictionary.search('.ad')).to.be.true;
// wildcard at the bottom
expect(dictionary.search('b..')).to.be.true;
// test functionality of isEnd
expect(dictionary.search('b')).to.be.false;
