import { expect } from 'chai';

/**
 * Medium
 * Backtracking, DFS
 * Time complexity: O(n * 3^l), Space complexity: O(l), where l is the length of the searching word.
 * Means for every start point, it will have at most 3 directions to go for w times.
 * 
 * 
 * Notes:
 * 1. Backtracking is kind of a brute force method, it's better to examine some short circuits first to reduce wasting of time.
 * In this case, whether using board length or word counting will safe a lot of time for the test cases in LeetCode.
 * 
 * 2. Also has tried to add cache to save data likes (x, y, i), to mark that cell cannot be used as the i-th char.
 * But it has exception like the following case:
 * A B E
 * B C D
 * A -> B -> E -- mark (0, 2, 2), means the cell (r0, c2) cannot be used as the 3rd char.
 * A─B  E  
 *   C─D┘  
 * Then we trace the route as the above and failed, so we marked E(0, 2, 4) and D(1, 2, 3) as tried.
 * A  B──E
 * └B─C─D┘
 * But it actually has a valid route, so the optimization has exception and is not working.
 */
function exist(board: string[][], word: string): boolean {
  const ROW = board.length;
  const COL = board[0].length;
  const CELLS = ROW * COL;
  // Main process is time consuming, better to examine some short circuits first
  if (word.length > CELLS) return false;
  const map = new Map<string, number>();
  board.forEach((row, r) => {
    row.forEach((char, c) => {
      map.set(char, (map.get(char) || 0) + 1);
    });
  });
  const failed = Array.from(word).some(char => {
    if (!map.has(char) || map.get(char) === 0) return true;
    map.set(char, map.get(char)! - 1);
  });
  if (failed) return false;
  // Start the backtracking process
  // `${x}, ${y}`
  const path = new Set<string>();
  for (let r = 0; r < ROW; r++) {
    for(let c = 0; c < COL; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  function dfs(r: number, c: number, i: number) {
    // out of bound
    if (r < 0 || r >= ROW || c < 0 || c >= COL) return false;
    // visiting, the char is already used in the current path
    if (path.has(`${r}, ${c}`)) return false;
    // not match
    if (board[r][c] !== word[i]) {
      return false
    }
    // found, the last char is matched
    else if (i === word.length - 1) {
      return true;
    }
    // if the cell is a possible candidate, add it to the path to avoid revisiting in child recursion
    path.add(`${r}, ${c}`);
    // candidate but still need to dig deeper
    const n = dfs(r - 1, c, i + 1);
    const e = dfs(r, c + 1, i + 1);
    const s = dfs(r + 1, c, i + 1);
    const w = dfs(r, c - 1, i + 1);
    // All child recursions are resolved, release the lock
    path.delete(`${r}, ${c}`);
    if (n || e || s || w) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

expect(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")).to.equal(true);
expect(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE")).to.equal(true);
expect(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB")).to.equal(false);
expect(exist([["A","B","E"],["B","C","D"]], "ABCDEB")).to.equal(true);
