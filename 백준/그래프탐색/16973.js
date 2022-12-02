// https://www.acmicpc.net/problem/16973

// 기본적으로 직사각형 넓이에는 1이 없다.
// 이동 후 추가적으로 포함된 영역에 대해서만 벽이 있는지 검사
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
const map = Array.from({ length: N }, () => Array(M));
for (let i = 1; i <= N; i++) {
  const arr = input[i].split(' ').map(Number);
  for (let j = 0; j < M; j++) {
    map[i - 1][j] = arr[j];
  }
}
let [H, W, sr, sc, fr, fc] = input[N + 1].split(' ').map(Number);
sr -= 1;
sc -= 1;
fr -= 1;
fc -= 1;
// console.log(N, M, map);
// console.log(H, W, sr, sc, fr, fc);
const visit = Array.from({ length: N }, () => Array(M).fill(false));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const queue = new Queue();
queue.push([sr, sc, sr + H - 1, sc + W - 1, 0]);
visit[sr][sc] = true;

while (!queue.isEmpty()) {
  const [x, y, xx, yy, cnt] = queue.front();
  queue.pop();

  if (x === fr && y === fc) {
    return console.log(cnt);
  }

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];
    const nxx = xx + dir[k][0];
    const nyy = yy + dir[k][1];
    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (nxx < 0 || nyy < 0 || nxx >= N || nyy >= M) continue;
    if (visit[nx][ny] || map[nx][ny] === 1) continue;
    if (canwego(nx, ny, nxx, nyy, k)) continue;
    visit[nx][ny] = true;
    queue.push([nx, ny, nxx, nyy, cnt + 1]);
  }
}
console.log(-1);

function canwego(x, y, xx, yy, d) {
  if (d === 0) {
    if (y + W - 1 < 0 || y + W - 1 >= M) return true;
    for (let a = y; a < y + W; a++) {
      if (map[x][a] === 1) return true;
    }
  } else if (d === 1) {
    if (y + W - 1 < 0 || y + W - 1 >= M) return true;
    for (let a = y; a < y + W; a++) {
      if (map[xx][a] === 1) return true;
    }
  } else if (d === 2) {
    if (x + H - 1 < 0 || x + H - 1 >= N) return true;
    for (let a = x; a < x + H; a++) {
      if (map[a][y] === 1) return true;
    }
  } else if (d === 3) {
    if (x + H - 1 < 0 || x + H - 1 >= N) return true;
    for (let a = x; a < x + H; a++) {
      if (map[a][yy]) return true;
    }
  }
  return false;
}
