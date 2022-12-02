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
const map = Array.from({ length: H }, () => Array(W));
for (let i = 1; i <= H; i++) {
  const arr = input[i].split(' ').map(Number);
  for (let j = 0; j < W; j++) {
    map[i - 1][j] = arr[j];
  }
}
const dir = [
  [
    [-1, -1],
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ],
  [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 0],
  ],
];

make();

let answer = 0;
const visited = Array.from({ length: H }, () => Array(W).fill(false));

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === 1 && !visited[i][j]) {
      const queue = new Queue();
      queue.push([i, j]);
      visited[i][j] = true;
      while (!queue.isEmpty()) {
        const [x, y] = queue.front();
        const line = (x + 1) % 2;
        queue.pop();
        for (let k = 0; k < 6; k++) {
          const nx = x + dir[line][k][1];
          const ny = y + dir[line][k][0];

          if (nx < 0 || ny < 0 || nx >= H || ny >= W) {
            answer++;
          } else {
            if (map[nx][ny] === 1 && !visited[nx][ny]) {
              queue.push([nx, ny]);
              visited[nx][ny] = true;
            } else if (map[nx][ny] === -1) {
              answer++;
            }
          }
        }
      }
    }
  }
}
console.log(answer);

function make() {
  const visited = Array.from({ length: H }, () => Array(W).fill(false));

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (map[i][j] === 0 && !visited[i][j]) {
        const queue = new Queue();
        const arr = [];
        queue.push([i, j]);
        visited[i][j] = true;
        let flag = false;

        while (!queue.isEmpty()) {
          const [x, y] = queue.front();
          const line = (x + 1) % 2;
          queue.pop();
          arr.push([x, y]);

          for (let k = 0; k < 6; k++) {
            const nx = x + dir[line][k][1];
            const ny = y + dir[line][k][0];

            if (nx < 0 || ny < 0 || nx >= H || ny >= W) {
              flag = true;
            } else {
              if (map[nx][ny] === 0 && !visited[nx][ny]) {
                queue.push([nx, ny]);
                visited[nx][ny] = true;
              }
            }
          }
        }
        if (flag) {
          for (const [x, y] of arr) {
            map[x][y] = -1;
          }
        }
      }
    }
  }
}
