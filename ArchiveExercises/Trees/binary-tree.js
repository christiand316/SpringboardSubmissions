/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    {
      if (this.root === null) return 0;
    
      // Current node has no children, return 1
      if (this.root.left === null && this.root.right === null) return 1;
      
    
      // Left is empty attempt the right
      if (this.root.left === null) return 1 + minDepth(this.root.right);
     
    
      // Right subtree is empty attempt the left 
      if (this.root.right === null) return 1 + minDepth(this.root.left);
      
    
      // If both subtrees aren't empty, return the minimum depth
      return 1 + Math.min(minDepth(this.root.left), minDepth(this.root.right));
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (this.root === null) return 0;
    
    const leftDepth = maxDepth(this.root.left);
    const rightDepth = maxDepth(this.root.right);
  
    return 1 + Math.max(leftDepth, rightDepth);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxSumHolder = -1;

    function findMaxPathSum(node) {
      // Base case: if the node is null, return 0
      if (this.node === null) return 0;
    }

      // Find the max sum of the left and right subtrees
      const leftSum = Math.max(0, findMaxPathSum(this.node.left));
      const rightSum = Math.max(0, findMaxPathSum(this.node.right));
  
      maxSumHolder = Math.max(maxSumHolder, leftSum + rightSum + node.value);
  
      return Math.max(leftSum, rightSum) + this.node.value;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(root, target, result = null) {
    if(result === null) root= this.root;
    if (this.root === null) return result;
    
  
    // If the current node's value is greater than the target, update the result and explore
    if (this.root.value > target) {
      return findNextLarger(root.left, target, root);
    } else {
      // Explore the right subtree
      return findNextLarger(root.right, target, result);
    }
  }

}

module.exports = { BinaryTree, BinaryTreeNode };
