import assert from 'assert';

function isValid(s: string): boolean {
  // init
  const map = new Map([['(', ')'], ['[', ']'], ['{', '}']]);
  const OPEN_KEYS = Array.from(map.keys());
  // iter
  const stack = [] as string[];
  for (const char of s) {
    if (OPEN_KEYS.includes(char)) {
      stack.push(char);
    } else {
      const left = stack.pop();
      // Closed in invalid order. e.g. '{(})'
      if (!left || char !== map.get(left)) {
        return false;
      }
    }
  }
  if (!stack.length) {
    return true;
  }
  // Remain unclosed symbol. e.g. '({}'
  return false;
}

assert.equal(isValid('({})'), true);
assert.equal(isValid('({)}'), false);
assert.equal(isValid('('), false);
assert.equal(isValid(')('), false);
