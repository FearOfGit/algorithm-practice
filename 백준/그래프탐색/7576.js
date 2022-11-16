// https://www.acmicpc.net/problem/7576
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

const [M, N] = input[0].split(' ').map(Number);
const map = Array.from({ length: N }, () => Array(M));
for (let i = 1; i <= N; i++) {
  const arr = input[i].split(' ').map(Number);
  for (let j = 0; j < M; j++) {
    map[i - 1][j] = arr[j];
  }
}

const queue = new Queue();
let cnt = 0;
let answer = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 0) cnt++;
    if (map[i][j] === 1) queue.push([i, j, 0]);
  }
}

if (cnt === 0) {
  console.log(answer);
  return;
}

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
while (!queue.isEmpty()) {
  const [x, y, day] = queue.front();
  queue.pop();
  answer = Math.max(answer, day);

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (map[nx][ny] === 1 || map[nx][ny] === -1) continue;
    queue.push([nx, ny, day + 1]);
    map[nx][ny] = 1;
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 0) answer = -1;
  }
}

console.log(answer);
