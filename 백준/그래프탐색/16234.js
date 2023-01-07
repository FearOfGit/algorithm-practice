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
const land = Array.from({ length: N }, () => Array(N).fill(null));
for (let i = 1; i <= N; i++) {
  const temp = input[i].split(' ').map(Number);
  for (let j = 0; j < N; j++) {
    land[i - 1][j] = temp[j];
  }
}
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function checkSharing() {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  let isMove = false;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        let peopleCnt = 0;
        const queue = new Queue();
        queue.push([i, j]);
        visited[i][j] = true;
        const nodes = [];

        while (!queue.isEmpty()) {
          const [x, y] = queue.front();
          queue.pop();
          peopleCnt += land[x][y];
          nodes.push([x, y]);

          for (let k = 0; k < 4; k++) {
            const nx = x + dir[k][0];
            const ny = y + dir[k][1];

            if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
            if (visited[nx][ny]) continue;

            const diff = Math.abs(land[x][y] - land[nx][ny]);
            if (diff >= L && diff <= R) {
              visited[nx][ny] = true;
              queue.push([nx, ny]);
            }
          }
        }

        if (nodes.length >= 2) {
          const newPeopleCnt = Math.floor(peopleCnt / nodes.length);
          for (const [x, y] of nodes) {
            land[x][y] = newPeopleCnt;
          }
          isMove = true;
        }
      }
    }
  }
  return isMove;
}

let answer = 0;
while (true) {
  if (checkSharing()) {
    answer += 1;
  } else {
    break;
  }
}

console.log(answer);
