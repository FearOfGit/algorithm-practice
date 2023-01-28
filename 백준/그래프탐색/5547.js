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

const [W, H] = input[0].split(' ').map(Number);
const map = Array.from({ length: H }, () => Array(W).fill(null));
for (let i = 1; i <= H; i++) {
  const temp = input[i].split(' ').map(Number);
  for (let j = 0; j < W; j++) {
    map[i - 1][j] = temp[j];
  }
}

const dir = {
  even: [
    [-1, -1],
    [0, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
  ],
  odd: [
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
};

function makeOutdoor() {
  const visited = Array.from({ length: H }, () => Array(W).fill(false));
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (visited[i][j]) continue;
      if (map[i][j] === 1) continue;

      const queue = new Queue();
      const nodes = [];
      let isOutdoor = false;
      queue.push([i, j]);
      visited[i][j] = true;

      while (!queue.isEmpty()) {
        const [x, y] = queue.front();
        const key = (x + 1) % 2 === 0 ? 'even' : 'odd';
        queue.pop();
        nodes.push([x, y]);

        for (let k = 0; k < 6; k++) {
          const nx = x + dir[key][k][1];
          const ny = y + dir[key][k][0];

          if (nx < 0 || ny < 0 || nx >= H || ny >= W) {
            isOutdoor = true;
            continue;
          }

          if (map[nx][ny] === 1 || visited[nx][ny]) continue;

          visited[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }

      if (isOutdoor) {
        for (const [x, y] of nodes) {
          map[x][y] = -1;
        }
      }
    }
  }
}

function getAnswer() {
  const visited = Array.from({ length: H }, () => Array(W).fill(false));
  let answer = 0;

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (map[i][j] !== 1 || visited[i][j]) continue;

      const queue = new Queue();
      queue.push([i, j]);
      visited[i][j] = true;

      while (!queue.isEmpty()) {
        const [x, y] = queue.front();
        const key = (x + 1) % 2 === 0 ? 'even' : 'odd';
        queue.pop();

        for (let k = 0; k < 6; k++) {
          const nx = x + dir[key][k][1];
          const ny = y + dir[key][k][0];

          if (nx < 0 || ny < 0 || nx >= H || ny >= W) {
            answer += 1;
            continue;
          }

          if (map[nx][ny] === -1) {
            answer += 1;
            continue;
          }

          if (map[nx][ny] === 1 && !visited[nx][ny]) {
            visited[nx][ny] = true;
            queue.push([nx, ny]);
          }
        }
      }
    }
  }

  console.log(answer);
}

makeOutdoor();
getAnswer();
