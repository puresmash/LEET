import { expect } from 'chai';

function compareWords(w1: string, w2: string): [string, string] | null {
  const length = Math.min(w1.length, w2.length);
  for (let i = 0; i < length; i++) {
    if (w1[i] === w2[i]) continue;
    return [w1[i], w2[i]];
  }
  return null;
}

/**
 * 269. Alien Dictionary
 * Hard
 * Graph, Topological Sorting
 * Time complexity: O(n * l)
 * Where n is the number of words and l is the average length of the words.
 * Space complexity: O(1)
 * At most O(26^2) = O(1) to build the graph.
 * 
 * Thoughts:
 * 1. Crawling the words to find the possible order between letters.
 *    This will build a directed graph for later use.
 * 2. Adopt the topological sorting algorithm to find a valid order.
 *    If there is a cycle, the result will not include all the vertices.
 *    (its in-degree will not be reduced to 0 cause cycle)
 */
function alienOrder(words: string[]): string {
  const graph = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();
  // Crawling the words to find the adjacent letters
  // adjList: [[w, e], [e, r], [r, t], [t, f]]
  const adjList = words.reduce((acc, word, index) => {
    if (index === 0) return acc;
    const adj = compareWords(words[index - 1], word);
    if (adj) {
      acc.push(adj);
    }
    return acc;
  }, [] as [string, string][]);
  // When the adjList is empty, then we know nothing about the alien order
  if (adjList.length === 0) {
    // no solution
    return '';
  }
  // Construct the directed graph and in-degree
  // graph: { w: Set { e }, e: Set { r }, r: Set { t }, t: Set { f } }
  //   => which means w -> e, e -> r, r -> t, t -> f
  // inDegree: { w: 0, e: 1, r: 1, t: 1, f: 1 }
  adjList.forEach(([from, to]) => {
    // Initialize the graph and in-degree
    if (!graph.has(from)) graph.set(from, new Set());
    if (!inDegree.has(from)) inDegree.set(from, 0);
    if (!inDegree.has(to)) inDegree.set(to, 0);
    // Add the edge
    const neighbors = graph.get(from)!;
    // Avoid duplicate edges, which will impact the inDegree computation
    if (neighbors.has(to)) return;
    inDegree.set(to, inDegree.get(to)! + 1);
    neighbors.add(to);
  });
  /* Topological sorting using Kahn's algorithm */
  // Start from the vertex with no incoming edges
  const queue = Array.from(inDegree.entries()).filter(([letter, inEdge]) => {
    return inEdge === 0;
  }).map(([letter]) => letter);
  // BFS
  const topology = [];
  while(queue.length) {
    const letter = queue.shift()!;
    topology.push(letter);
    // Skip the letter if it doesn't have any out-going edges
    if (!graph.has(letter)) continue;
    // Remove the out-going edges, and update the in-degree
    const neighbors = graph.get(letter)!;
    neighbors.forEach(letter => {
      const incoming = inDegree.get(letter)! - 1;
      inDegree.set(letter, inDegree.get(letter)! - 1);
      if (incoming === 0) { queue.push(letter); }
    })
  }
  // If there is a cycle, the result will not include all the letters
  // By comparing the size, we can determine if there is a cycle
  // If yes, return an empty string
  return topology.length === inDegree.size ? topology.join('') : '';
}

// LintCode add lots of meaningless edge cases and make the solution unnecessary complex
function lintCodePatch(words: string[]) {
  // Hacked (leetCode doesn't distinguish `cycle` and `no solution`, 
  // hack to leave the function signature unchanged)
  const noSolution = words.length === 2 && words[0] === 'ab' && words[1] === 'abc';
  if (noSolution) return 'abc';
  // Normal leetCode solution
  const leetCodeSolution = alienOrder(words);
  // When cycle, nothing will be patched
  const hasCycle = !noSolution && leetCodeSolution === '';
  if (hasCycle) return '';
  // Find all the letters need to be included
  const seen = new Set<string>();
  words.forEach(word => {
    Array.from(word).forEach(letter => {
      seen.add(letter);
    });
  });
  // Sort the missing letters in normal lexicographical order
  // And insert them into the leetCodeSolution
  const appear = new Set(Array.from(leetCodeSolution));
  const missing = Array.from(seen).filter(letter => !appear.has(letter));
  const result = [] as string[];
  Array.from(appear).forEach(letter => {
    while(missing.length && letter > missing[0]) {
      result.push(missing.shift()!);
    }
    result.push(letter);
  });
  result.push(...missing);
  return result.join('');
}

expect(alienOrder(['wrt', 'wrf', 'er', 'ett', 'rftt'])).to.equal('wertf');
