class Node {
  freq: number;
  left: Node | null = null;
  right: Node | null = null;
  constructor(freq: number) {
    this.freq = freq;
  }
}

class Leaf extends Node {
  data: string;
  constructor(data: string, freq: number) {
    super(freq);
    this.data = data;
  }
}

export function huffmanEncode(str: string): [string, (str: string) => string] {
  if (!str) throw new Error('Invalid input');
  // freq map
  const freqMap = [...str].reduce((map, char) => {
    map.set(char, (map.get(char) ?? 0) + 1);
    return map;
  }, new Map<string, number>());
  // edge case: one kind of char
  if (freqMap.size === 1) {
    const [char, times] = [...freqMap][0];
    const decode = (str: string) => {
      if (str.includes('1')) throw new Error('Invalid input');
      return char.repeat(str.length);
    }
    return ['0'.repeat(times), decode];
  }
  // init huffman nodes
  const huffmanNodes = [...freqMap].reduce((ary, [k, v]) => {
    ary.push(new Leaf(k, v));
    return ary;
  }, [] as Node[]);
  // merge nodes into a huffman tree
  while (huffmanNodes.length > 1) {
    // sort by desc
    huffmanNodes.sort((n1, n2) => n2.freq - n1.freq);
    const n1 = huffmanNodes.pop()!;
    const n2 = huffmanNodes.pop()!;
    const parent = new Node(n1.freq + n2.freq);
    parent.left = n1;
    parent.right = n2;
    huffmanNodes.push(parent);
  }
  const root = huffmanNodes[0];
  // Traverse the huffman tree to generate the huffman code map
  const huffmanMap = new Map<string, string>();
  let path = '';
  backtracking(root);
  function backtracking(node: Node) {
    if (node instanceof Leaf) {
      huffmanMap.set(node.data, path);
      return;
    }
    path += '0';
    backtracking(node.left!);
    path = path.slice(0, -1);
    path += '1';
    backtracking(node.right!);
    path = path.slice(0, -1);
  }
  function encode(): string {
    return [...str].map(char => huffmanMap.get(char)).join('');
  }
  function decode(code: string): string {
    const result = [] as string[];
    while(code.length) {
      let node = root;
      while(true) {
        if (node instanceof Leaf) {
          result.push(node.data);
          break;
        }
        node = code[0] === '0' ? node.left! : node.right!;
        code = code.slice(1);
      }
    }
    return result.join('');
  }
  return [encode(), decode];
}
