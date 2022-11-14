// https://www.acmicpc.net/problem/2667

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

const N = Number(input[0]);
const board = Array.from({ length: N }, () => Array(N));
for (let i = 1; i <= N; i++) {
  for (let j = 0; j < N; j++) {
    board[i - 1][j] = parseInt(input[i][j], 10);
  }
}
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const answer = [];
let result = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 0) continue;
    result += 1;
    answer.push(bfs(i, j));
  }
}
answer.sort((a, b) => a - b);
console.log(result);
console.log(answer.join('\n'));

function bfs(i, j) {
  const queue = new Queue();
  let count = 1;

  queue.push([i, j]);
  board[i][j] = 0;
  while (!queue.isEmpty()) {
    const [x, y] = queue.front();
    queue.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (board[nx][ny] === 0) continue;

      board[nx][ny] = 0;
      count += 1;
      queue.push([nx, ny]);
    }
  }

  return count;
}
