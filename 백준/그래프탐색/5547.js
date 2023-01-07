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

const [W, H] = input[0].split(' ').map((el) => +el);
const house = Array.from({ length: H }, () => Array(W).fill(null));
for (let i = 1; i <= H; i++) {
  const temp = input[i].split(' ').map((el) => +el);
  for (let j = 0; j < W; j++) {
    house[i - 1][j] = temp[j];
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

function markOutdoors() {
  const visited = Array.from({ length: H }, () => Array(W).fill(false));

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (house[i][j] === 0 && !visited[i][j]) {
        const queue = new Queue();
        queue.push([i, j]);
        visited[i][j] = true;
        const nodes = [];
        let isOutdoor = false;

        while (!queue.isEmpty()) {
          const [x, y] = queue.front();
          queue.pop();
          nodes.push([x, y]);

          const pivot = (x + 1) % 2 === 0 ? 'even' : 'odd';
          for (let k = 0; k < 6; k++) {
            const nx = x + dir[pivot][k][1];
            const ny = y + dir[pivot][k][0];

            if (nx < 0 || ny < 0 || nx >= H || ny >= W) {
              isOutdoor = true;
            } else {
              if (house[nx][ny] === 0 && !visited[nx][ny]) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
              }
            }
          }
        }

        if (isOutdoor) {
          for (const [x, y] of nodes) {
            house[x][y] = -1;
          }
        }
      }
    }
  }
}

markOutdoors();

function calcWallLength() {
  let wallLength = 0;
  const visited = Array.from({ length: H }, () => Array(W).fill(false));

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (house[i][j] === 1 && !visited[i][j]) {
        const queue = new Queue();
        queue.push([i, j]);
        visited[i][j] = true;

        while (!queue.isEmpty()) {
          const [x, y] = queue.front();
          queue.pop();

          const pivot = (x + 1) % 2 === 0 ? 'even' : 'odd';
          for (let k = 0; k < 6; k++) {
            const nx = x + dir[pivot][k][1];
            const ny = y + dir[pivot][k][0];

            if (nx < 0 || ny < 0 || nx >= H || ny >= W) {
              wallLength += 1;
            } else {
              if (house[nx][ny] === 1 && !visited[nx][ny]) {
                queue.push([nx, ny]);
                visited[nx][ny] = true;
              } else if (house[nx][ny] === -1) {
                wallLength += 1;
              }
            }
          }
        }
      }
    }
  }

  console.log(wallLength);
}

calcWallLength();
