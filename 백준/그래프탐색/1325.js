class Queue {
  constructor() {
    this.dat = [];
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.dat[this.tail++] = item;
  }

  pop() {
    this.head++;
  }

  front() {
    return this.dat[this.head];
  }

  rear() {
    return this.dat[this.tail - 1];
  }

  isEmpty() {
    return this.head === this.tail;
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((x) => x.split(' ').map(Number));

const [n, m] = input[0];
const adj = [];
for (let i = 1; i <= n; i++) {
  adj[i] = [];
}
for (let i = 1; i <= m; i++) {
  const [a, b] = input[i];
  adj[b].push(a);
}

const bfs = (node) => {
  const queue = new Queue();
  const visited = Array(n + 1).fill(false);
  queue.push(node);
  visited[node] = true;
  let count = 1;
  while (!queue.isEmpty()) {
    const cur = queue.front();
    queue.pop();
    for (let i = 0; i < adj[cur].length; i++) {
      const nxt = adj[cur][i];
      if (visited[nxt]) continue;

      queue.push(nxt);
      visited[nxt] = true;
      count++;
    }
  }

  return count;
};

const hacked = [];
let maxval = 0;
for (let i = 1; i <= n; i++) {
  hacked[i] = bfs(i);
  maxval = Math.max(maxval, hacked[i]);
}

let answer = '';
for (let i = 1; i <= n; i++) {
  if (hacked[i] === maxval) {
    answer += i + ' ';
  }
}

console.log(answer);
