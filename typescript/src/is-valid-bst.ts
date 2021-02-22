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

import { makeTestFunc } from './util/test';

function isValidBST(root: TreeNode | null): boolean {
  if (!root) return true;
  return helper(root, - Number.MAX_VALUE, Number.MAX_VALUE);
};

function helper(root: TreeNode | null, min: number, max: number): boolean {
  if (!root) return true;
  return root.val > min
    && root.val < max
    && helper(root.left, min, Math.min(root.val, max))
    && helper(root.right, Math.max(min, root.val), max);
}

const test = makeTestFunc(isValidBST);

test({
  input: [new TreeNode(0)],
  output: true,
});