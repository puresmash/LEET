/**
 * 1. brute force O(n^2)
 * 2. sort and check adjacent O(nlogn)
 * 3. memory using set O(n) | O(n) space
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate (nums) {
  const set = new Set();
  return nums.some(num => {
    if (set.has(num)) {
      return true;
    }
    set.add(num);
  });
};

console.log(containsDuplicate([1, 2, 3]));
console.log(containsDuplicate([1, 2, 3, 1]));
