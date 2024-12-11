import { huffmanEncode } from './Huffman';

describe('Huffman', () => {
  test('should able to recover to the original string', () => {
    const [code, decode] = huffmanEncode('use the force');
    expect(decode(code)).toBe('use the force');
  });
  test('should support one kind of character', () => {
    const [code, decode] = huffmanEncode('aaaaa');
    expect(decode(code)).toBe('aaaaa');
    // One kind of character won't generate any '1'
    expect(() => decode('1')).toThrow();
    expect(() => decode('0010')).toThrow();
  });
  test('empty string will cause an error', () => {
    expect(() => huffmanEncode('')).toThrow();
  });
});
