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

const [n, m] = input[0].split(" ").map(Number);
const map = Array.from({ length: n }, () => Array(m).fill(null));
const answer = Array.from({ length: n }, () => Array(m).fill(-1));
const visited = Array.from({ length: n }, () => Array(m).fill(false));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

for (let i = 1; i <= n; i++) {
  const temp = input[i].split(" ").map(Number);
  for (let j = 0; j < m; j++) {
    map[i - 1][j] = temp[j];
  }
}

bfs();

let str = "";
for (let i = 0; i < n; i++) {
  str += answer[i].join(" ");
  str += "\n";
}

console.log(str);

function bfs() {
  const queue = new Queue();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] === 2) {
        answer[i][j] = 0;
        visited[i][j] = true;
        queue.push([i, j, 0]);
      }
    }
  }

  while (!queue.isEmpty()) {
    const [x, y, cnt] = queue.front();
    queue.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
      if (visited[nx][ny] || map[nx][ny] === 0) continue;

      answer[nx][ny] = cnt + 1;
      queue.push([nx, ny, cnt + 1]);
      visited[nx][ny] = true;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] === 0) answer[i][j] = 0;
    }
  }
}
