import { expect } from 'chai';

/**
 * Easy
 * Boyer-Moore Voting Algorithm, Hash Table, Divide and Conquer
 * A Hash Map solution is straightforward, but it costs O(n) space.
 * We can adopt the Boyer-Moore Voting Algorithm to reduce the space complexity to O(1).
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * About Boyer-Moore Voting Algorithm
 * # Description:
 * Although the problem has been categorized as easy, the follow-up question is not intuitive and is much harder.
 * Take its name "voting" as an example, if x is the majority element, we can prove it by assuming the worst case.
 * Let's say, every different element agree to vote against x, making the count of x minus one.
 * If we pair each of +1 (x) with -1 (others), there will be at least one x left to make the counter positive,
 * or it won't be the majority element.
 * 
 * # Steps:
 * As following.
 * When there isn't a majority element, the algorithm will return a wrong random number.
 * In this case, have to take O(n) to iterate again to verify the result.
 * But here, the problem has guaranteed that there is always a majority element.
 */
function majorityElement(nums: number[]): number {
  let count = 0;
  let candidate: number | null = null;
  nums.forEach((num) => {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  });
  return candidate!;
}

expect(majorityElement([3, 2, 3])).to.equal(3);
expect(majorityElement([2, 2, 1, 1, 1, 2, 2])).to.equal(2);
