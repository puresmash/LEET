import { expect } from 'chai';
import { Stack } from '../core/Stack.js';

/**
 * Easy - deps on which solution
 * Stack, Monotonic
 * Time complexity: O(m + n), where m is the length of nums1 and n is the length of nums2.
 * Space complexity: O(n), can make it O(m) though.
 * 
 * Other solutions:
 * Brute force:
 * 1. Create a hash map to store the target values (nums1 -> -1).
 * 2. Iterate through nums2, if cur = target, set a loop to find if there is a greater number in the rest of the nums2.
 * if found, set the value to the result.
 * Time complexity: O(mn), Space complexity: O(m).
 * 
 * Stack solution:
 * The basic idea is remembering current unresolvable problems and hope can solve them in the future.
 * The problem is unresolved means there aren't any number greater than current, thus all the resolvable unresolved problems should at the top of the stack.
 * => If cur = 5, then there won't have [2, 6, 1, 3] in the stack (2 should already been resolved by 6).
 * 1. Create a stack to store the target values from the top.
 * 2. Iterate through nums2, for every target value, check all the smaller value in the stack from the top.
 * 3. If found, pop that value from the stack, then set the value to the result.
 * 4. Finally, push the current value to the stack.
 * e.g.
 * [1, 3, 4, 2], target = [4, 1, 2]
 * iterate: [*1, 3, 4, 2]  ->  [1, *3, 4, 2]  ->  [1, 3, *4, 2]  ->  [1, 3, 4, *2]
 * stack  : [1]            ->  [3]            ->  [4]            ->  [4, 2]
 * result : [-1, -1, -1]   ->  [-1, 3, -1]    ->  [-1, 3, -1]    ->  [-1, 3, -1]
 * reason : stack is empty ->  3 > 1, ans 1   ->  4 > 3, ans 3   ->  no smaller
 * Time complexity: O(m + n), Space complexity: O(m).
 * As basicStack function.
 */
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const resultMap = new Map<number, number>();
  const stack = new Stack();
  // for n - 1 -> 0
  for (let i = nums2.length - 1; i >= 0; i--) {
    // 1. Pop smaller elements from the top of the stack.
    while (!stack.isEmpty() && stack.top()! <= nums2[i]) {
      stack.pop();
    }
    // 2. If stack is empty, which means no valid answer, set the value to -1.
    if (stack.isEmpty()) {
      resultMap.set(nums2[i], -1);
    }
    // 3. Else, the top of the stack is the answer.
    else {
      resultMap.set(nums2[i], stack.top()!);
    }
    // 4. Finally, push the current element to the stack.
    stack.push(nums2[i]);
  }
  return nums1.map(num => resultMap.get(num) ?? -1);
}

// Stack solution
function basicStack(nums1: number[], nums2: number[]): number[] {
  const targetMap = new Map<number, number>();
  // init the target map with -1
  nums1.forEach(n1 => targetMap.set(n1, -1));
  const stack = [] as number[];
  nums2.forEach(n2 => {
    // solve the previous unresolved problems
    while (stack.length && stack[stack.length - 1] < n2) {
      targetMap.set(stack.pop()!, n2);
    }
    // remember unresolved problems, and hope can solve in the future.
    if (targetMap.has(n2)) {
      stack.push(n2);
    }
  });
  // output the result
  return nums1.map(n1 => targetMap.get(n1)!);
}

expect(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])).to.have.members([-1, 3, -1]);
expect(nextGreaterElement([2, 4], [1, 2, 3, 4])).to.have.members([3, -1]);
