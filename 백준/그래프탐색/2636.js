// https://velog.io/@sanbondeveloper/JavaScript-%EB%B0%B1%EC%A4%80-2636
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
const board = Array.from({ length: N }, () => Array(M));
for (let i = 1; i <= N; i++) {
  const temp = input[i].split(' ').map(Number);
  for (let j = 0; j < M; j++) {
    board[i - 1][j] = temp[j];
  }
}
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let time = 0;
let cnt = 0;

function bfs() {
  const queue = new Queue();
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  queue.push([0, 0]);
  visited[0][0] = true;
  let nodes = [];

  while (!queue.isEmpty()) {
    const [x, y] = queue.front();
    queue.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (visited[nx][ny]) continue;
      if (board[nx][ny] === 1) {
        nodes = [...nodes, [nx, ny]]; // push 메서드 대신
        visited[nx][ny] = true; // 배열에 중복되는 좌표가 들어가는 것을 방지
        continue;
      }
      queue.push([nx, ny]);
      visited[nx][ny] = true;
    }
  }

  for (const [x, y] of nodes) {
    board[x][y] = 0;
  }

  if (!nodes.length) return true;

  cnt = nodes.length;
  return false;
}

while (true) {
  if (bfs()) break;

  // 제거되는 치즈가 존재할 경우에만 시간을 증가시킨다.
  time += 1;
}

console.log(time, cnt);

// 가장자리(X로 표시된 곳)에는 치즈가 올 수 없기 때문에 bfs의 출발점을 (0, 0)으로 한다.
// bfs을 통해 공기와 접촉이 되는 치즈의 바깥 부분을 찾아서 0으로 바꾼다.
// 시간(time)의 경우 제거되는 치즈가 존재할 경우에만 증가시킨다. (제거할 치즈가 없는 경우에는 이미 저번 사이클에 치즈가 모두 제거된 상태)
// 이전 사이클에 제거한 치즈(cnt) 또한, 제거되는 치즈가 존재할 경우에만 값을 업데이트한다. (마지막 사이클은 항상 0이 되기 때문)
