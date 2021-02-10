function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
  if (!root) return null;

  root.right = trimBST(root.right, low, high);
  root.left = trimBST(root.left, low, high);

  const { val } = root;
  if (val < low) return root.right;
  if (val > high) return root.left;

  return root;
}
