/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
 var removeElement = function(nums, val) {
  // edge case consider, all went well
  // 1: 1, 2, 3, 4, 5, X, 6
  // 2: 1, X, X, X, X, X, 2
  // 3: X, X, X, X, X, X, X
  let l = 0;
  for(let r = 0; r < nums.length; r++) {
      if (nums[r] !== val) {
          nums[l] = nums[r];
          l++;
      }
  }
  return l;
};

console.log(removeElement([3, 2, 2, 3], 3));
