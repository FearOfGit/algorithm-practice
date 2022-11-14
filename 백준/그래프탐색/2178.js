// https://www.acmicpc.net/problem/2178

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

const [N, M] = input[0].split(' ').map(Number);
const board = Array.from({ length: N }, () => Array(M));
for (let i = 1; i <= N; i++) {
  for (let j = 0; j < M; j++) {
    board[i - 1][j] = parseInt(input[i][j], 10);
  }
}
const visited = Array.from({ length: N }, () => Array(M).fill(false));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const queue = new Queue();

queue.push([0, 0, 1]);
visited[0][0] = true;
while (!queue.isEmpty()) {
  const [x, y, cnt] = queue.front();
  queue.pop();

  if (x === N - 1 && y === M - 1) {
    console.log(cnt);
    break;
  }

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (board[nx][ny] === 0) continue;
    if (visited[nx][ny]) continue;

    visited[nx][ny] = true;
    queue.push([nx, ny, cnt + 1]);
  }
}
