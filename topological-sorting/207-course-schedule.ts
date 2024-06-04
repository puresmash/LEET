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
  const topology = [];
  // [[0, 1], [0, 2], [1, 2]] => { 0: [1, 2], 1: [2], 2: [] }
  const graph: Record<number, number[]> = {};
  // count the incoming edges for each vertex
  const inDegree = Array(numCourses).fill(0);
  prerequisites.forEach(([course, pre]) => {
    if (!graph[course]) graph[course] = [];
    graph[course].push(pre);
    inDegree[pre]++;
  });
  // Kahn's algorithm, start at the vertex with no incoming edges (source vertex)
  const queue = inDegree.reduce<number[]>((acc, degree, index) => {
    if (!degree) acc.push(index);
    return acc;
  }, [])
  // Start from the source vertex, removing the out-going edges.
  // After removing, if there is a new vertex with no incoming edges, add it to the queue too.
  // Keep doing this until the queue is empty.
  while (queue.length) {
    const course = queue.shift()!;
    topology.push(course);
    // Reduce count by one for every adjacent vertex
    (graph[course] ?? []).forEach(neighbor => {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    });
  }
  return topology.length === numCourses;
}

expect(canFinish(2, [[1, 0]])).to.be.true;
expect(canFinish(2, [[1, 0], [0, 1]])).to.be.false;
