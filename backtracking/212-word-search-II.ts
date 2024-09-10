import { expect } from 'chai';

/**
 * 212. Word Search II
 * Hard
 * Backtracking, Trie
 * Time complexity: O(m*n*4^l), where m is the row, n is the column, l is the length of the word
 * Space complexity: O(26*l), where l is the average length of the word
 * 
 * Thought:
 * You can also think of the Tire as a `pipeline` that has been dug in advance by each `word`.
 * The thing we need to do is try to ex`amine the chars in the board to see if it can fit into the pipeline.
 * If it can't, it's not a valid word.
 * If it can, keep fitting until discovered all possible combinations.
 * 可以將 Trie 想像成一條由每個 `word` 提前鑿成的河道。 
 * 試著將 Board 中，所有字母的排列組合依序注入河道中，看看最終是否可以到達河道的 isWord 檢查點。如果可以，就是一個合法的字。
 * 如果不行，提前返回，避免無謂的遞迴。`
 * 
 * Improvement:
 * Some of the test cases will lead to a time limit exceeded,
 * so we have to optimize the solution according to the specific situation.
 * => Despite it's not usual to remove a word from the trie once it's found, but it can accelerate the process.
 * => After the optimization, the execution time will be reduced from 900ms to 70ms. 
 * 
 * Note:
 * Have tried to encapsulate the Trie and the TrieNode members,
 * but it will need to maintain the backtracking stack myself.
 * By using the recursion, I can make the recursion stack to maintain some of the backtracking information.
 * e.g. the visited word, the visited node.
 */
function findWords(board: string[][], words: string[]): string[] {
  // Short circuit to avoid unnecessary computation
  // Compare the board size and the word length
  const ROW = board.length;
  const COL = board[0].length;
  words = words.filter((word) => ROW * COL >= word.length);
  if (words.length === 0) return [];
  // Construct the trie
  const trie = new Trie();
  words.forEach((word) => trie.addWord(word));
  /* MAIN */
  // Memorize the visited cell as `${y}, ${x}`
  const path = new Set<string>();
  const result = new Set<string>();
  // Iterate through every char in the board
  for (let r = 0; r < ROW; r++) {
    for (let c = 0; c < COL; c++) {
      dfs(r, c, trie.root, '');
    }
  }
  return [...result];
  function dfs(
    r: number,
    c: number,
    node: TrieNode,
    visitedWord: string
  ) {
    /* SHORT CIRCUIT */
    // Boundary check
    if (r < 0 || r >= ROW || c < 0 || c >= COL) return;
    // Revisit check
    if (path.has(`${r}, ${c}`)) return;
    // Not in dictionary check
    if (!node.has(board[r][c])) return;
    /* MAIN */
    const nextNode = node.find(board[r][c])!;
    // Update visited word
    visitedWord += board[r][c];
    // Add to the final result if it is a word
    if (nextNode.isWord) {
      result.add(visitedWord);
      // Remove word from dictionary after found to accelerate
      trie.removeWord(visitedWord);
    }
    /* RECURSION */
    // Mark the cell as visited
    path.add(`${r}, ${c}`);
    // north
    dfs(r - 1, c, nextNode, visitedWord);
    // east
    dfs(r, c + 1, nextNode, visitedWord);
    // south
    dfs(r + 1, c, nextNode, visitedWord);
    // west
    dfs(r, c - 1, nextNode, visitedWord);
    path.delete(`${r}, ${c}`);
  }
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }
  addWord(word: string): void {
    let current = this.root;
    [...word].forEach((char, i) => {
      const isLast = i === word.length - 1;
      current = current.upsert(char, isLast);
    });
  }
  removeWord(word: string): void {
    let current = this.root;
    const stack: [string, TrieNode][] = [];
    [...word].every((char) => {
      if (!current.has(char)) return false;
      // remember its parent
      stack.push([char, current]);
      current = current.find(char)!;
      return true;
    });
    current.setWord(false);
    // safely remove the word from the trie
    while (stack.length) {
      const [char, parentNode] = stack.pop()!;
      if (parentNode.find(char)!.children.size !== 0) break;
      parentNode.children.delete(char);
    }
    
  }
}

class TrieNode {
  children: Map<string, TrieNode>;
  isWord: boolean;
  constructor(isWord = false) {
    this.children = new Map();
    this.isWord = isWord;
  }
  upsert(char: string, isWord = false): TrieNode {
    if (!this.children.has(char)) {
      this.children.set(char, new TrieNode(isWord));
    } else if (isWord) {
      this.children.get(char)!.setWord();
    }
    return this.children.get(char)!;
  }
  has(char: string): boolean {
    return this.children.has(char);
  }
  find(char: string): TrieNode | null {
    return this.children.get(char) || null;
  }
  setWord(isWord = true) {
    this.isWord = isWord;
  }
}

// The original test case is bad, including words that have a common prefix will be better.
// Likes `oath` and `oats`.
expect(
  findWords(
    [
      ['o', 'a', 'a', 'n'],
      ['s', 't', 'a', 'e'],
      ['i', 'h', 'k', 'r'],
      ['i', 'f', 'l', 'v'],
    ],
    ['oath', 'pea', 'eat', 'rain', 'oats']
  )
).to.have.members(['eat', 'oath', 'oats']);

// [
//   ["m", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"],
//   ["n", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
//   ["o", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
//   ["p", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
//   ["q", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
//   ["r", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
//   ["s", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
//   ["t", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
//   ["u", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
//   ["v", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
//   ["w", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
//   ["x", "y", "z", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
// ];
