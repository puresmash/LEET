function search(nums: number[], target: number): number {
  let l= 0;
  let r = nums.length - 1;
  while(l < r) {
    const m = Math.floor((l + r) / 2);
    if (target === nums[m]) {
      return m;
    } else if (target > nums[m]) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }
  return nums[l] === target ? l : -1;
};

// console.log(search([5], 5));
console.log(search([-1,0,3,5,9,12], 9));
// console.log(search([-1,0,3,5,9,12], 2));