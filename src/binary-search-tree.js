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

  remove(/* data */) {
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }

  // remove(data) {
  //   const foundNode = this.find(data);

  //   if (!foundNode) {
  //     return;
  //   }

  //   if (foundNode.left === null && foundNode.right === null) {
  //     // just remove the node
  //   }

  //   // if node has only one child (left or right) remove the node and replace it with its child
  // }

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
