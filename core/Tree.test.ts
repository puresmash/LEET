import { arrayToTree, printTreeBFS, treeToArray } from './Tree';

describe('arrayToTree', () => {
  test.each`
    topic           | input
    ${'Empty'}      | ${[]}
    ${'Root'}       | ${[1]}
    ${'Basic'}      | ${[1, 2, 3]}
    ${'Incomplete'} | ${[1, 2, 3, 4]}
    ${'Skew'}       | ${[1, null, 2, null, 3]}
    ${'Skew'}       | ${[1, null, 2, 3]}
  `('$topic, $input', ({ input }) => {
    const tree = arrayToTree(input);
    console.log(treeToArray(tree), input)
    // printTreeBFS(tree);
    expect(treeToArray(tree)).toEqual(input);
  });
});
