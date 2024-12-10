import assert from 'assert';

/**
 * 20. Valid Parentheses
 * Easy
 * Stack
 * Time complexity: O(n), Space complexity: O(n)
 */
function isValid(s: string): boolean {
  // init
  const map = new Map([['(', ')'], ['[', ']'], ['{', '}']]);
  // iter
  const stack = [] as string[];
  const validPair = [...s].every(char => {
    // (, {, [
    if (map.has(char)) {
      // e.g. IF '(' THEN push ')'
      // Any open symbol is valid
      stack.push(map.get(char)!);
      return true;
    }
    // IF close symbol
    // AND last element is '('
    // THEN current element should be ')'
    else if (stack[stack.length - 1] === char) {
      stack.pop();
      return true;
    }
    // IF close symbol
    // AND not a valid pair
    // THEN invalid
    return false;
  });
  // Remain unclosed symbol. e.g. '({'
  return validPair && stack.length === 0 ? true : false;
}

assert.equal(isValid('({})'), true);
assert.equal(isValid('({)}'), false);
assert.equal(isValid('('), false);
assert.equal(isValid(')('), false);
