const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);

    if (this._root === null) {
      this._root = node;
      return;
    }

    let currNode = this._root;

    while (true) {

      if (data === currNode.data) {
        return;
      }

      if (data < currNode.data) {

        if (currNode.left === null) {
          currNode.left = node;
          return;
        }

        currNode = currNode.left;
      }

      if (data > currNode.data) {

        if (currNode.right === null) {
          currNode.right = node;
          return;
        }

        currNode = currNode.right;
      }
    }
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    if (typeof data !== 'number' || this._root === null) {
      return null;
    }

    let currNode = this._root;
    let isFound = false;

    while (currNode && !isFound) {
      if (data === currNode.data) {
        isFound = true;
      } else if (data < currNode.data) {
        currNode = currNode.left;
      } else if (data > currNode.data) {
        currNode = currNode.right;
      }
    }

    return isFound ? currNode : null;
  }

  findNodeParent(data) {
    if (typeof data !== 'number' || this._root === null) {
      return null;
    }

    let currNode = this._root;
    let parentNode = null;
    let isFound = false;

    while (currNode && !isFound) {
      if (data === currNode.data) {
        isFound = true;
      } else if (data < currNode.data) {
        parentNode = currNode;
        currNode = currNode.left;
      } else if (data > currNode.data) {
        parentNode = currNode;
        currNode = currNode.right;
      }
    }

    return isFound ? parentNode : null;
  }

  remove(data) {
    const foundNode = this.find(data);

    if (!foundNode) {
      return;
    }

    const nodeParent = this.findNodeParent(data);

    // if node-to-be-removed is the ._root node
    // if node is found but nodeParent is null, that means this is the _root node

    // if node has no children (node is a leaf)
    if (foundNode.left === null && foundNode.right === null) {
      if (nodeParent === null) { this._root = null; return; }
      // just remove the node
      if(data < nodeParent.data) nodeParent.left = null;
      if(data > nodeParent.data) nodeParent.right = null;
      return;
    }

    // if node has only one child (left or right)
    // remove the node and replace it with its child
    if (foundNode.left !== null && foundNode.right === null) {
      if(nodeParent === null) { this._root = foundNode.left; return; }
      const nodeChild = foundNode.left;
      if(data < nodeParent.data) nodeParent.left = nodeChild;
      if(data > nodeParent.data) nodeParent.right = nodeChild;
      return;
    }

    if (foundNode.left === null && foundNode.right !== null) {
      if(nodeParent === null) { this._root = foundNode.right; return; }
      const nodeChild = foundNode.right;
      if(data < nodeParent.data) nodeParent.left = nodeChild;
      if(data > nodeParent.data) nodeParent.right = nodeChild;
      return;
    }

    // if node has two children, find inorder successor of the node
    // copy contents of the inorder successor to the node
    // and delete the inorder successor
    // note that inorder predecessor can also be used
    // the inorder successor of a node is a node with the least value in its right subtree
    const inorderSuccessor = this.findInorderSuccessor(foundNode);
    const inorderSuccessorParent = this.findNodeParent(inorderSuccessor.data);
    foundNode.data = inorderSuccessor.data;

    if (inorderSuccessor.left === null && inorderSuccessor.right === null) {
      if(inorderSuccessor.data < inorderSuccessorParent.data) inorderSuccessorParent.left = null;
      if(inorderSuccessor.data > inorderSuccessorParent.data) inorderSuccessorParent.right = null;
      return;
    }

    if (inorderSuccessor.right !== null) {
      const inorderSuccessorChild = inorderSuccessor.right;
      inorderSuccessorParent.left = inorderSuccessorChild;
      return;
    }
  }

  findInorderSuccessor(start = this._root, data) {
    let min = start.right;

    while (min.left) {
      min = min.left;
    }

    return min ? min : null;
  }

  min() {
    let min = this._root;

    while (min.left) {
      min = min.left;
    }

    return min ? min.data : null;
  }

  max() {
    let max = this._root;

    while (max.right) {
      max = max.right;
    }

    return max ? max.data : null;
  }
}

module.exports = {
  BinarySearchTree
};
