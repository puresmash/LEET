import { expect } from 'chai';

/**
 * 442. Find All Duplicates in an Array
 * Medium
 * Array
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * Thoughts:
 * 1. Use index, Luke (Use the natural property of array to save space complexity)
 * 2. Mark visited as negative (nums: 1 -> n, negative number is safe)
 */
function findDuplicates(nums: number[]): number[] {
  const result = [] as number[];
  nums.forEach((num) => {
    // 1-indexed
    const targetIndex = Math.abs(num) - 1;
    // < 0 means already visited, push to the result
    // > 0, mark as visited
    nums[targetIndex] < 0 ? result.push(Math.abs(num)) : nums[targetIndex] = -nums[targetIndex];
  });
  return result;
}

expect(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])).to.deep.equal([2, 3]);
expect(findDuplicates([1, 1, 2])).to.deep.equal([1]);
expect(findDuplicates([1])).to.deep.equal([]);
