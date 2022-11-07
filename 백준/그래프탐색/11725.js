const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input.shift());
const arr = input.map((el) => el.split(' ').map(Number));
const visited = new Array(n + 1).fill(false);
const answer = new Array(n + 1).fill(null);
const tree = {};
// console.log(n, arr);
solution();

function bfs() {
  const queue = [];
  queue.push(1);
  visited[1] = true;

  while (queue.length) {
    const node = queue.shift();

    tree[node].forEach((child) => {
      if (visited[child]) return;
      answer[child] = node;
      visited[child] = true;
      queue.push(child);
    });
  }
}

function solution() {
  for (const [a, b] of arr) {
    if (!tree[a]) tree[a] = [];
    if (!tree[b]) tree[b] = [];
    tree[a].push(b);
    tree[b].push(a);
  }

  bfs();
  console.log(answer.filter((el) => el !== null).join('\n'));
}
