import { Deque } from './Deque';

describe('Deque basic properties', () => {
  test('should initialize successfully', () => {
    const deque = new Deque();
    deque.append(1);
    expect(deque.peekTail()).toBe(1);
    expect(deque.peekHead()).toBe(1);
    expect(deque.popLeft()).toBe(1);
    // initialize again from another direction
    expect(deque.isEmpty()).toBe(true);
    deque.appendLeft(2);
    expect(deque.peekTail()).toBe(2);
    expect(deque.peekHead()).toBe(2);
    expect(deque.pop()).toBe(2);
  });
  test('append and pop should work bi-direction', () => {
    const deque = new Deque();
    deque.append(1);
    deque.appendLeft(2);
    deque.append(3);
    deque.appendLeft(4);
    expect(deque.pop()).toBe(3);
    expect(deque.popLeft()).toBe(4);
    expect(deque.peekTail()).toBe(1);
    expect(deque.peekHead()).toBe(2);
  });
});
