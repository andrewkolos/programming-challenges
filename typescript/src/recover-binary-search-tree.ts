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

/**
 Do not return anything, modify root in-place instead.
 */

let prevNode: TreeNode;
let firstNode: TreeNode;
let secondNode: TreeNode;

function recoverTree(root: TreeNode | null): void {
  if (root == null) return;
  inorderTraversal(root);

  if (firstNode == null || secondNode == null) return;

  const tmp = firstNode.val;
  firstNode.val = secondNode.val;
  secondNode.val = tmp;
};

function inorderTraversal(root: TreeNode): void {
  if (root == null) return;

  inorderTraversal(root.left);

  if (prevNode != null && prevNode.val >= root.val) {
    if (firstNode == null) {
      firstNode = prevNode;
    }
    secondNode = root;
  }

  prevNode = root;

  inorderTraversal(root.right);
}