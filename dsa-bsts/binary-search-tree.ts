class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  root: TreeNode | null
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (this.root == null) {
      this.root = new TreeNode(val)
    }

    let currentNode = this.root

    while (true) {
      if (currentNode.val == val) { //this prevents duplicate values
        return this
      }
      if (currentNode.val > val) {
        if (currentNode.left == null) {
          currentNode.left = new TreeNode(val)
          return this
        }
        currentNode = currentNode.left
      }
      else if (currentNode.val < val) {
        if (!currentNode.right) {
          currentNode.right = new TreeNode(val)
          return this
        }
        currentNode = currentNode.right
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currentNode = this.root) {
    if (!this.root) {
      this.root = new TreeNode(val)
      return this
    }

    if (!currentNode) throw Error("this shouldn't happen but TS doesn't know that")

    if (val < currentNode.val) {
      if (!currentNode.left) {
        currentNode.left = new TreeNode(val)
        return this
      }
      return this.insertRecursively(val, currentNode.left)
    }
    else {
      if (!currentNode.right) {
        currentNode.right = new TreeNode(val)
        return this
      }
      return this.insertRecursively(val, currentNode.right)
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (this.root == null) {
      this.root = new TreeNode(val)
    }

    let currentNode = this.root

    while (true) {
      if (currentNode == null) {
        return undefined
      }
      if (currentNode.val == val) {
        return currentNode
      }
      if (currentNode.val > val) {
        if (!currentNode.left) return undefined
        currentNode = currentNode.left
      }
      else if (currentNode.val < val) {
        if (!currentNode.right) return undefined
        currentNode = currentNode.right
      }
    }

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currentNode = this.root): TreeNode | undefined {
    if (!currentNode) return undefined
    if (val < currentNode.val) {
      return currentNode.left ? this.findRecursively(val, currentNode.left) : undefined
    }
    else if (val > currentNode.val) {
      return currentNode.right ? this.findRecursively(val, currentNode.right) : undefined
    }
    return currentNode
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    if (this.root == null) {
      return undefined
    }

    let visited: number[] = []

    function traverse(node: TreeNode) {
      visited.push(node.val)
      if (node.left) traverse(node.left)
      if (node.right) traverse(node.right)
    }

    traverse(this.root)
    return visited
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    if (this.root == null) {
      return undefined
    }
    let visited: number[] = []

    function traverse(node: TreeNode) {
      if (node.left) traverse(node.left)
      visited.push(node.val)
      if (node.right) traverse(node.right)
    }

    traverse(this.root)
    return visited
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    if (this.root == null) {
      return undefined
    }
    let visited: number[] = []

    function traverse(node: TreeNode) {
      if (node.left) traverse(node.left)
      if (node.right) traverse(node.right)
      visited.push(node.val)
    }

    traverse(this.root)
    return visited
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if (!this.root) {
      throw new Error("Requires a tree with at least 1 element")
    }

    const queue: TreeNode[] = [this.root]
    const visited: number[] = []

    while (queue.length > 0) {
      const currentNode = queue.shift()

      if (!currentNode) continue //to satisfy TS's narrowing

      visited.push(currentNode.val)

      if (currentNode.left) {
        queue.push(currentNode.left)
      }
      if (currentNode.right) {
        queue.push(currentNode.right)
      }
    }
    return visited
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val, node = this.root) {
    if (!node) {
      return node
    }

    if (val < node.val) {
      node.left = this.remove(val, node.left)
    }
    else if (val > node.val) {
      node.right = this.remove(val, node.right)
    } 
    else {

      //Case 1 and 2: Contains zero or one node. Simply set the parent's call to the other node or to `null` if the node doesn't exist
      if (!node.left) {
        return node.right
      } else if (!node.right) {
        return node.left
      }

      //Case 3: Has two children
      let successor = node.right
      while (successor.left) {
        successor = successor.left
      }

      node.val = successor.val
      node.right = this.remove(successor.val, node.right)
    }

    return node
  }
  
  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(currentNode = this.root) {
    function maxDepth(currentNode: TreeNode | null): number {
      if (!currentNode) return 0
      return 1 + Math.max(maxDepth(currentNode.left), maxDepth(currentNode.right))
    }
    function minDepth(currentNode: TreeNode | null): number {
      if (!currentNode) return 0
      return 1 + Math.min(minDepth(currentNode.left), minDepth(currentNode.right))
    }

    return maxDepth(currentNode) - minDepth(currentNode) <= 1
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(currentNode = this.root) {
    if (!currentNode) return undefined
    let parent
    while (currentNode.right) {
      parent = currentNode
      currentNode = currentNode.right
    }
    //Implies that there is no right subtree; we should explore the left one
    if (!parent) { 
      parent = currentNode
      currentNode = currentNode.left
      if (!currentNode) return undefined //tree is empty
      while (currentNode.right) {
        parent = currentNode
        currentNode = currentNode.right
      }
      return parent 
    }
    return parent.val
  }
}

// let binarySearchTree = new BinarySearchTree();
// binarySearchTree
//   .insert(15)
//   .insert(20)
//   .insert(10)
//   .insert(12)
//   .insert(1)
//   .insert(5)
//   .insert(50);
//   console.log(binarySearchTree.dfsInOrder())
// binarySearchTree.remove(50);
// console.log(binarySearchTree.dfsInOrder())
// console.log(binarySearchTree.root.right.val === 20);
// console.log(binarySearchTree.root.right.right === null);

// binarySearchTree.remove(5);
// console.log(binarySearchTree.root.left.left.val === 1)
// console.log(binarySearchTree.root.left.left.right === null)

module.exports = BinarySearchTree;
