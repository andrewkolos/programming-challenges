// https://leetcode.com/problems/symmetric-tree/

// Given a binary tree, check whether it is a mirror of itself(ie, symmetric around its center).

// For example, this binary tree[1, 2, 2, 3, 4, 4, 3] is symmetric:

//    1
//   / \
//  2   2
// / \ / \
// 3  4 4  3


// But the following[1, 2, 2, null, 3, null, 3] is not:

//    1
//   / \
//  2   2
//   \   \
//   3    3

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}


function isSymmetric(root: TreeNode | null): boolean {
  return solve(root, root);
};

function solve(node1: TreeNode | null, node2: TreeNode | null): boolean {
  if (node1 == null && node2 == null) return true;
  if (node1 == null || node2 == null) return false;

  if (node1.val === node2.val) return solve(node1.left, node2.right) && solve(node1.right, node2.left);
  return false;
}

