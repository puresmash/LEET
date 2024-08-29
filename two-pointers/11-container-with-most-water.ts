import { expect } from 'chai';

/**
 * 11. Container With Most Water
 * Medium
 * Two pointers, Greedy
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * Thought:
 * The two walls of a dam contain an area, the higher the walls are, the larger the area is.
 * To find the global maximum area,
 * from the two ends, we shrink the distance between the two walls by one each time.
 * 
 * We got two choices here, move the L or R pointer.
 * The best strategy here is to move the lower wall, to seek if there is a chance to find a higher wall.
 */
function maxArea(height: number[]): number {
  let gMax = Math.min(height[0], height[height.length - 1]) * (height.length - 1);
  // Start from the two ends
  let l = 0, r = height.length - 1;
  while (r - l > 1) {
    // Shrink the distance of L and R according the height of the walls (move the lower)
    if (height[l] < height[r]) l++;
    else r--;
    // Calculate the local maximum area
    const localMax = Math.min(height[l], height[r]) * (r - l);
    // Update the global maximum area
    gMax = Math.max(gMax, localMax);
  }
  return gMax;
}

expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).to.equal(49);
expect(maxArea([1, 1])).to.equal(1);
// Edge case
// The two ends are the answer
expect(maxArea([4, 3, 2, 1, 4])).to.equal(16);
// Two very high walls back to back
// This won't get the MAX area if we use area = Math.min(h1, h2) * (r - l),
// as the criteria to move L or R pointer. 
expect(maxArea([1, 3, 2, 5, 25, 24, 5])).to.equal(24);
