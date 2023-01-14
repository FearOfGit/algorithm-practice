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

const [N, M, T] = input[0].split(' ').map(Number);
const map = Array.from({ length: N }, () => Array(M).fill(null));
for (let i = 1; i <= N; i++) {
  const temp = input[i].split(' ').map(Number);
  for (let j = 0; j < M; j++) {
    map[i - 1][j] = temp[j];
  }
}
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function bfs() {
  const queue = new Queue();
  queue.push([0, 0, 0, false]);
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(2).fill(false))
  );
  visited[0][0][0] = true;

  while (!queue.isEmpty()) {
    const [x, y, cnt, gram] = queue.front();
    queue.pop();

    if (cnt > T) break;
    if (x === N - 1 && y === M - 1) return cnt;

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (visited[nx][ny][gram ? 1 : 0]) continue;
      if (!gram && map[nx][ny] === 1) continue;

      const isGram = gram || map[nx][ny] === 2;
      queue.push([nx, ny, cnt + 1, isGram]);
      visited[nx][ny][gram ? 1 : 0] = true;
    }
  }

  return 'Fail';
}

console.log(bfs());
