import { expect } from 'chai';

/**
 * Medium
 * Topological sorting, Kahn's algorithm | DFS
 * Time complexity: O(V + E), Space complexity: O(V)
 * Where V is the vertices (course) and E is the edges (precondition).
 * 
 * Topological sorting has two algorithms: Kahn's algorithm and DFS.
 */
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // [[0, 1], [0, 2], [1, 2]] => [[1, 2], [2], []]
  // Note that the way to initialize an 2D array in JS is a bit tricky
  const adjList = prerequisites.reduce<number[][]>((acc, [course, pre]) => {
    acc[course].push(pre);
    return acc;
  }, [...Array(numCourses)].map(() => []));
  const inDegree = Array(numCourses).fill(0);
  prerequisites.forEach(([course, pre]) => {
    inDegree[pre]++;
  });
  const result = [];
  const queue = inDegree.reduce<number[]>((acc, degree, index) => {
    if (!degree) acc.push(index);
    return acc;
  }, [])
  while (queue.length) {
    const course = queue.shift()!;
    result.push(course);
    // Reduce count by one for every edge in adjList
    adjList[course].forEach(pre => {
      inDegree[pre]--;
      if (inDegree[pre] === 0) {
        queue.push(pre);
      }
    });
  }
  if (result.length === numCourses) {
    return true;
  }
  return false;
}

expect(canFinish(2, [[1, 0]])).to.be.true;
expect(canFinish(2, [[1, 0], [0, 1]])).to.be.false;
