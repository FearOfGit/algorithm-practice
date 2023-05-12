class Queue {
  constructor() {
    this.data = [];
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.data[this.tail++] = item;
  }

  pop() {
    this.head++;
  }

  front() {
    return this.data[this.head];
  }

  rear() {
    return this.data[this.tail - 1];
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return Math.abs(this.head - this.tail);
  }
}

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map((el) => +el);
const board = Array.from({ length: N }, () => Array(M).fill(null));
const visited = Array.from({ length: N }, () => Array(M).fill(null));
const zeros = [];
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let num = 0;
let answer = 0;

for (let i = 1; i <= N; i++) {
  const temp = input[i].split(" ").map((el) => +el);
  for (let j = 0; j < M; j++) {
    board[i - 1][j] = temp[j];

    if (temp[j] === 0) zeros.push([i - 1, j]);
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 1 && visited[i][j] === null) grouping(i, j);
  }
}

for (const [x, y] of zeros) {
  let cnt = 1;
  const map = {};

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (board[nx][ny] === 0) continue;

    map[visited[nx][ny][0]] = visited[nx][ny][1];
  }

  for (const key in map) cnt += map[key];

  answer = Math.max(answer, cnt);
}

console.log(answer);

function grouping(i, j) {
  const queue1 = new Queue();
  const queue2 = new Queue();
  queue1.push([i, j]);
  queue2.push([i, j]);
  visited[i][j] = [num, 1];
  let cnt = 1;

  while (!queue1.isEmpty()) {
    const [x, y] = queue1.front();
    queue1.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (board[nx][ny] === 0) continue;
      if (visited[nx][ny] !== null) continue;

      queue1.push([nx, ny]);
      queue2.push([nx, ny]);
      visited[nx][ny] = [num, 1];
      cnt += 1;
    }
  }

  while (!queue2.isEmpty()) {
    const [x, y] = queue2.front();
    queue2.pop();

    visited[x][y] = [num, cnt];
  }

  num += 1;
}
