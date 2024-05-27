/**
 * @param {number[]} nums
 * @return {number}
 */
 var removeDuplicates = function(nums) {
  let l = 1; // where the unique value gonna be relocated
  for(let r = 1; r < nums.length; r++) {
    if (nums[r] !== nums[r -1]) {
      nums[l] = nums[r];
      l++;
    }
  }
  return l;
};

const nums = [1,1,2];
console.log(removeDuplicates(nums));
console.log(nums);
