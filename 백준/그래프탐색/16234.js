// https://www.acmicpc.net/problem/16234

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
  .split('\n');

const [N, L, R] = input[0].split(' ').map(Number);
const map = Array.from({ length: N }, () => Array(N));
for (let i = 1; i <= N; i++) {
  const arr = input[i].split(' ').map(Number);
  for (let j = 0; j < N; j++) {
    map[i - 1][j] = arr[j];
  }
}
// console.log(N, L, R, map);
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let answer = 0;
let visited;
while (true) {
  let flag = false;
  visited = Array.from({ length: N }, () => Array(N).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j]) continue;
      if (bfs(i, j)) flag = true;
    }
  }

  if (!flag) break;
  answer++;
}

console.log(answer);

function bfs(i, j) {
  const queue = new Queue();
  const trace = [];
  let sum = 0;
  queue.push([i, j]);
  visited[i][j] = true;

  while (!queue.isEmpty()) {
    const [x, y] = queue.front();
    queue.pop();
    trace.push([x, y]);
    sum += map[x][y];

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      const diff = Math.abs(map[x][y] - map[nx][ny]);
      if (L > diff || R < diff) continue;
      if (visited[nx][ny]) continue;

      visited[nx][ny] = true;
      queue.push([nx, ny]);
    }
  }

  if (trace.length === 1) return false;

  for (const [x, y] of trace) {
    map[x][y] = Math.floor(sum / trace.length);
  }

  return true;
}
