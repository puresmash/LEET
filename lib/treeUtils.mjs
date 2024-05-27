/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
export function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}
TreeNode.prototype.toString = function () {
  return this.val || 'N';
};

/**
* there are two ways to do this
* 1. preprocess -> construct tree from the bottom
* 2. insert placeholder on the left and right child -> give child value -> iterate
* Why not recursive? Cause the input array is in BFS format naturally
* Input example: [x, null, null, y, z]
* @param {[number]} inputAry 
* @returns {TreeNode}
*/
export function arrayToTree(inputAry) {
 if (!inputAry.length) return;
 // root
 const rootVal = inputAry.shift();
 const rootNode = new TreeNode(rootVal, null, null);
 // next
 for (let treeLevel = 1, go = true, vacancies = 0, parentNodes = [rootNode]; go; treeLevel++) {
   const { keepGoing, inheritedVacancies, childNodes } = traverseTreeLevel(treeLevel, vacancies, inputAry, parentNodes);
   go = keepGoing;
   vacancies = inheritedVacancies;
   parentNodes = childNodes;
 }
 
 /** BFS */
 function traverseTreeLevel(treeLevel, vacancies, inputAry, previousNodes) {
   if (!inputAry.length) return { keepGoing: false };
   // how many node on this level
   const shouldTakeCnt = calSelectionByLevel(treeLevel, vacancies);
   // take the nodes value from the input array
   const takeAry = inputAry.splice(0, shouldTakeCnt);
   // how many new generated vacancies (by counting null values) on this level
   const newVacancies = shouldTakeCnt - takeAry.filter(ele => ele !== null).length;
   // how many inherited vacancies on the next level
   const inheritedVacancies = calVacancies(vacancies, newVacancies);
   const childNodes = takeAry.map(val => {
     if (val === null) return null;
     return new TreeNode(val, null, null);
   });
   // apply parent-child relationships
   const parentNotNilNodes = previousNodes.filter(val => val !== null);
   // check
   if (parentNotNilNodes.length * 2 !== childNodes.length) {
     console.error('Interior error: node structure broke, parent child mismatch');
     console.error(`level: ${treeLevel}`);
     console.error(`prevNodes: ${parentNotNilNodes}, previousNodes.length: ${parentNotNilNodes.length}`);
     console.error(`newNodes: ${childNodes}, previousNodes.length: ${childNodes.length}`);
   }
   parentNotNilNodes.forEach((node, i) => {
     node.left = childNodes[i * 2];
     node.right = childNodes[i * 2 + 1];
   });
   return { keepGoing: true, inheritedVacancies, childNodes };
 
 }
 function calSelectionByLevel(currentLevel, prevVacancies) {
   return Math.pow(2, currentLevel) - prevVacancies * 2;
 }
 function calVacancies(prevVacancies, newVacancies) {
   return prevVacancies * 2 + newVacancies;
 }
 return rootNode;
}

/* 
x
/ \
y y
/ \/ \
z z z z
*/
export function printTreeBFS(tree) {
  const level = [tree];
  console.log(tree.val);
  printLevel(level);
  // TODO cleanup
  function printLevel(level) {
    if (level.length === 0) return;
    const [legs, nodes, nextLevel] = level.reduce(([legs, nodes, nextLevel], ele) => {
      if (ele.left && ele.left.val) {
        legs.push('/');
        nodes.push(ele.left.val);
        nextLevel.push(ele.left);
      } else if (!ele.left) {
        legs.push('x');
        nodes.push(' ');
      }
      if (ele.right && ele.right.val) {
        legs.push('\\');
        nodes.push(ele.right.val);
        nextLevel.push(ele.right);
      } else if (!ele.right) {
        legs.push('x');
        nodes.push(' ');
      }
      return [legs, nodes, nextLevel];
    }, [[], [], []]);
    // Print Legs, Nodes
    console.log(legs.join(' '));
    console.log(nodes.join(' '));
    // Next
    printLevel(nextLevel);
  }
}