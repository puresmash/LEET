import { expect } from 'chai';

/**
 * 217. Contains Duplicate
 * Easy
 * Set, Sort
 * 
 * Solution 1: 
 * Brute force O(n^2)
 * 
 * Solution 2: 
 * Sort and check adjacent O(nlogn)
 * 
 * Solution 3: 
 * Memorize using set T: O(n) | S: O(n)
 */
function containsDuplicate(nums: number[]): boolean {
  const set = new Set();
  return nums.some(num => {
    if (set.has(num)) {
      return true;
    }
    set.add(num);
  });
};

expect(containsDuplicate([1, 2, 3])).to.be.false;
expect(containsDuplicate([1, 2, 3, 1])).to.be.true;
