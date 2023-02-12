// https://velog.io/@sanbondeveloper/%EB%B0%B1%EC%A4%80-16973-%EC%A7%81%EC%82%AC%EA%B0%81%ED%98%95-%ED%83%88%EC%B6%9C-javascript

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
const dp = Array.from({ length: N }, () => Array(M).fill(-1));
for (let i = 1; i <= N; i++) {
  const temp = input[i].split(' ').map(Number);
  for (let j = 0; j < M; j++) {
    board[i - 1][j] = temp[j];
  }
}
/* 
  누적합을 구하지 않고 그때 그때 벽의 존재를 확인하면 N * M * H * W로 시간 초과 발생
  N과 M이 최대 1000, 1000 * 1000 이므로 누적합을 정적으로 구하고 시작했다. (뭔가 정적으로 구하고 시작해도 시간 초과가 나지 않을거 같았다ㅎ)

  동적으로 누적합 구하는 공식 : dp[x][y] = dp[x - 1][y] + dp[x][y - 1] - dp[x - 1][y - 1] + arr[x - 1][y - 1]
*/
dp[0][0] = board[0][0];
// 가장자리 (첫 번째 행과 첫 번째 열) 누적합 구하기
for (let i = 1; i < M; i++) dp[0][i] = dp[0][i - 1] + board[0][i];
for (let i = 1; i < N; i++) dp[i][0] = dp[i - 1][0] + board[i][0];
// 행 기준 누적합 구하기
for (let i = 1; i < N; i++) {
  for (let j = 1; j < M; j++) {
    dp[i][j] = dp[i][j - 1] + board[i][j];
  }
}
// 열 기준 누적합 구하기
for (let j = 1; j < M; j++) {
  for (let i = 1; i < N; i++) {
    dp[i][j] = dp[i - 1][j] + dp[i][j];
  }
}
let [H, W, Sr, Sc, Fr, Fc] = input[N + 1].split(' ').map(Number);
(Sr -= 1), (Sc -= 1), (Fr -= 1), (Fc -= 1); // 문제에서 1, 1 부터 시작한다고 해서
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// x, y 기준 누적합 구하기
function getAccSum(x, y) {
  if (x < 0 || y < 0) return 0; // 부분합 공식에서 -1만 존재

  return dp[x][y];
}

function bfs() {
  const queue = new Queue();
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  queue.push([Sr, Sc, 0]);
  visited[Sr][Sc] = true;

  while (!queue.isEmpty()) {
    const [x, y, cnt] = queue.front();
    queue.pop();

    if (x === Fr && y === Fc) {
      console.log(cnt);
      return;
    }

    for (let k = 0; k < 4; k++) {
      const a = x + dir[k][0];
      const b = y + dir[k][1];
      const c = a + H - 1;
      const d = b + W - 1;
      if (a < 0 || b < 0 || a >= N || b >= M) continue;
      if (c >= N || d >= M) continue;
      if (visited[a][b] || board[a][b] === 1) continue;

      // 부분합 구하기
      const hasWall =
        getAccSum(c, d) -
        getAccSum(a - 1, d) -
        getAccSum(c, b - 1) +
        getAccSum(a - 1, b - 1);
      if (hasWall) continue;

      queue.push([a, b, cnt + 1]);
      visited[a][b] = true;
    }
  }

  console.log(-1);
}

bfs();
