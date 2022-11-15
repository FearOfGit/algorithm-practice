// https://www.acmicpc.net/problem/14940

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

const [n, m] = input[0].split(' ').map(Number);
const map = Array.from({ length: n }, () => new Array(m));
const route = Array.from({ length: n }, () => new Array(m));
for (let i = 1; i <= n; i++) {
  const arr = input[i].split(' ').map(Number);
  for (let j = 0; j < m; j++) {
    map[i - 1][j] = arr[j];
  }
}
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    route[i][j] = -1;
  }
}
const visited = Array.from({ length: n }, () => new Array(m).fill(false));
// console.log(map);
const queue = new Queue();
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 2) {
      visited[i][j] = true;
      route[i][j] = 0;
      queue.push([i, j, 0]);
    }
  }
}

while (!queue.isEmpty()) {
  const [x, y, cnt] = queue.front();
  queue.pop();
  route[x][y] = cnt;

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
    if (visited[nx][ny] || map[nx][ny] === 0) continue;
    queue.push([nx, ny, cnt + 1]);
    visited[nx][ny] = true;
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 0) route[i][j] = 0;
  }
}

let str = '';
for (let i = 0; i < n; i++) {
  str += route[i].join(' ');
  str += '\n';
}
console.log(str);
