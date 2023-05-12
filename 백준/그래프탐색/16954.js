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

const board = Array.from({ length: 8 }, () => Array(8).fill(null));
const visited = Array.from({ length: 8 }, () =>
  Array.from({ length: 8 }, () => Array(9).fill(false))
);
const dir = [
  [0, 0],
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];
for (let i = 0; i < 8; i++) {
  const temp = input[i];
  for (let j = 0; j < 8; j++) {
    board[i][j] = temp[j];
  }
}

function bfs() {
  const queue = new Queue();
  queue.push([7, 0, 0]); // x, y, time
  visited[7][0][0] = true;

  while (!queue.isEmpty()) {
    const [x, y, time] = queue.front();
    queue.pop();

    if (x === 0) return 1; // 벽은 아래로 이동하기 때문에 첫 번째 행 도착시 목적지까지 반드시 갈 수 있다.

    for (let k = 0; k < 9; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];
      const nTime = time + 1;

      if (nTime >= 8) return 1; // 8초 이후부터는 벽이 존재하지 않는다

      if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8) continue;
      if (visited[nx][ny][nTime]) continue;

      // 벽을 움직이고 않고 확인할 수 있음
      if (nx - time >= 0 && board[nx - time][ny] === "#") continue;
      if (nx - time - 1 >= 0 && board[nx - time - 1][ny] === "#") continue;

      visited[nx][ny][nTime] = true;
      queue.push([nx, ny, nTime]);
    }
  }

  return 0;
}

console.log(bfs());
