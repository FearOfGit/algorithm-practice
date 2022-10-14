// 트리
class BinaryTree {
  constructor(value, x_pos) {
    this.value = value;
    this.x_pos = x_pos;
    this.left = null;
    this.right = null;
  }

  insert(value, x_pos) {
    x_pos <= this.x_pos
      ? this._toLeft(value, x_pos)
      : this._toRight(value, x_pos);
  }

  _toLeft(value, x_pos) {
    this.left
      ? this.left.insert(value, x_pos)
      : (this.left = new BinaryTree(value, x_pos));
  }

  _toRight(value, x_pos) {
    this.right
      ? this.right.insert(value, x_pos)
      : (this.right = new BinaryTree(value, x_pos));
  }
}

const preorder = (tree, arr) => {
  if (tree === null) return;

  arr.push(tree.value);
  preorder(tree.left, arr);
  preorder(tree.right, arr);
};

const postorder = (tree, arr) => {
  if (tree === null) return;

  postorder(tree.left, arr);
  postorder(tree.right, arr);
  arr.push(tree.value);
};

function solution(nodeinfo) {
  const nodes = nodeinfo
    .map((node, i) => [i + 1, node[0], node[1]])
    .sort((a, b) => b[2] - a[2]);

  const tree = new BinaryTree(nodes[0][0], nodes[0][1]);
  for (let i = 1; i < nodes.length; i++) {
    tree.insert(nodes[i][0], nodes[i][1]);
  }

  const answer = [[], []];
  preorder(tree, answer[0]);
  postorder(tree, answer[1]);

  return answer;
}
