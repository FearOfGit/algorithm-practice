// https://www.acmicpc.net/problem/2636

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

let [N, M] = input[0].split(' ').map(Number);
const map = Array.from({ length: N }, () => Array(M));
for (let i = 1; i <= N; i++) {
  const arr = input[i].split(' ').map(Number);
  for (let j = 0; j < M; j++) {
    map[i - 1][j] = arr[j];
  }
}
const visit = Array.from({ length: N }, () => Array(M).fill(false));
const help = Array.from({ length: N }, () => Array(M).fill(true));
let count = 0;
let answer = 0;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 1) count++;
  }
}

let hour = 0;

while (count > 0) {
  hour++;
  const queue = new Queue();
  queue.push([0, 0]);
  visit[0][0] = true;
  help[0][0] = false;

  while (!queue.isEmpty()) {
    const [x, y] = queue.front();
    queue.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (visit[nx][ny] || map[nx][ny] !== 0) continue;
      visit[nx][ny] = true;
      help[nx][ny] = false;
      queue.push([nx, ny]);
    }
  }

  const arr = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visit[i][j] = false;
      if (map[i][j] === 1) {
        for (let k = 0; k < 4; k++) {
          const nx = i + dir[k][0];
          const ny = j + dir[k][1];

          if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
          if (!help[nx][ny]) {
            arr.push([i, j]);
            break;
          }
        }
      }
    }
  }

  for (const [x, y] of arr) {
    map[x][y] = 0;
    help[x][y] = false;
  }
  const removing = arr.length;
  if (count - removing === 0) answer = removing;
  count -= removing;
}

const str = hour + '\n' + answer;
console.log(str);
