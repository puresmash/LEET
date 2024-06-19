import { arrayToTree, TreeNode } from '../core/TreeUtils.mjs';
/* 
637. Average of Levels in Binary Tree
worse case
  time: O(N) space: O(N)
best case
  time: O(N) space: O(N)
*/

/**
 * BFS solution
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  for (let levelNodes = [root], output = []; ;) {
    const [avg, nextNodes] = traverseLevel(levelNodes);
    // 隨著重複執行 func traverseLevel，可從 `${process.memoryUsage().heapUsed / 1024}KB`
    // 觀察到 mem usage 每次均有 數 KB 新的佔用。
    // 但透過 force gc (加上指標node --expose-gc，並適時調用 gc())
    // 可發現 heap size 只是暫時佔用，gc 後可正確消除。
    // 故本著可讀性，此處並不把 function call 拆掉直接平寫。
    output.push(avg);
    if (!nextNodes.length) return output;
    levelNodes = nextNodes;
  }
  function traverseLevel(levelNodes) {
    const [acc, cnt, nextNodes] = levelNodes.reduce(([acc, cnt, nextNodes], node) => {
      if (node.left) {
        nextNodes.push(node.left);
      }
      if (node.right) {
        nextNodes.push(node.right);
      }
      cnt++;
      acc += node.val;
      return [acc, cnt, nextNodes];
    }, [0, 0, []]);
    return [acc / cnt, nextNodes.filter(node => node !== null)];
  }
};

// const tree = arrayToTree([3,9,20,null,null,15,7]);
// const tree = arrayToTree([2, null, 3, null, 4, null, 5, null, 6]);
const tree = arrayToTree([3,9,20,15,7]);
console.log(averageOfLevels(tree));
