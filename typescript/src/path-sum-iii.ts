/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

let pathSumCount = 0;
function pathSum(root: TreeNode | null, sum: number): number {
  pathSumCount = 0;
  getSums(root, 0, sum, new Map());
  return pathSumCount;
};

function getSums(root: TreeNode | null, currSum: number, sum: number, frequencyBySum: Map<number, number>) {
  if (root == null) return;

  currSum += root.val;
  // If target is reached, add tally to result.
  pathSumCount = currSum === sum ? pathSumCount + 1 : pathSumCount;
  // If a previous path(es) can produce currSum - sum, we can "subtract" that path(es) from 
  // the current one to get the target sum.
  pathSumCount += getOrDefault(frequencyBySum, currSum - sum, 0);

  // Add this path we have as we go down.
  frequencyBySum.set(currSum, getOrDefault(frequencyBySum, currSum, 0) + 1);

  getSums(root.left, currSum, sum, frequencyBySum);
  getSums(root.right, currSum, sum, frequencyBySum);

  // Once we go back up, need to remove the frequency we added.
  frequencyBySum.set(currSum, getOrDefault(frequencyBySum, currSum, 0) - 1);
}

function getOrDefault<K, V>(map: Map<K, V>, key: K, def: V) {
  if (map.has(key)) return map.get(key);
  return def;
}



function pathSum(root: TreeNode | null, sum: number): number {
  if (root == null) return 0;

  // The solution is the sum of three choices we can make at each node that result
  // in a path with the target sum.
  return continueSearch(root, 0, sum) + // 1. Include root in our sum and continue searching.
    pathSum(root.left, sum) + // 2. Ignore root and explore left subtree.
    pathSum(root.right, sum); // 3. Ignore root and explore right subtree.
}

function continueSearch(node: TreeNode | null, currentSum: number, targetSum: number): number {
  if (node == null) return 0;

  const newSum = currentSum + node.val;

  return (newSum === targetSum ? 1 : 0) + // Check if we reached the target, if so, add one to result.
    continueSearch(node.left, newSum, targetSum) + // Include this node in our candidate path, updating the target. Explore left subtree.
    continueSearch(node.right, newSum, targetSum); // Same thing as previous line, but exploring the right subtree.
}