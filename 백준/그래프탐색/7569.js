// https://www.acmicpc.net/problem/7569
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

const [M, N, H] = input[0].split(' ').map(Number);
const map = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array(M))
);
for (let i = 0; i < H; i++) {
  for (let j = i * N + 1; j <= (i + 1) * N; j++) {
    const arr = input[j].split(' ').map(Number);
    for (let k = 0; k < M; k++) {
      map[i][(j - 1) % N][k] = arr[k];
    }
  }
}

const queue = new Queue();
let cnt = 0;
let answer = 0;
for (let i = 0; i < H; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < M; k++) {
      if (map[i][j][k] === 0) cnt++;
      if (map[i][j][k] === 1) queue.push([i, j, k, 0]);
    }
  }
}

if (cnt === 0) {
  console.log(answer);
  return;
}

const dir = [
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1],
  [-1, 0, 0],
  [1, 0, 0],
];
while (!queue.isEmpty()) {
  const [h, x, y, day] = queue.front();
  queue.pop();
  answer = Math.max(answer, day);

  for (let l = 0; l < 6; l++) {
    const nh = h + dir[l][0];
    const nx = x + dir[l][1];
    const ny = y + dir[l][2];

    if (nh < 0 || nh >= H || nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (map[nh][nx][ny] === -1 || map[nh][nx][ny] === 1) continue;
    queue.push([nh, nx, ny, day + 1]);
    map[nh][nx][ny] = 1;
  }
}

for (let i = 0; i < H; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < M; k++) {
      if (map[i][j][k] === 0) answer = -1;
    }
  }
}

console.log(answer);
