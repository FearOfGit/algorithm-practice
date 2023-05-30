const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = Array.from({ length: N }, () => Array(M).fill(null));
const visited = Array.from({ length: N }, () => Array(M).fill(false));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let answer = 0;

for (let i = 1; i <= N; i++) {
  const temp = input[i].split(" ").map(Number);
  for (let j = 0; j < M; j++) {
    board[i - 1][j] = temp[j];
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    visited[i][j] = true;
    dfs(i, j, 0, 0);
    visited[i][j] = false;
  }
}

console.log(answer);

function dfs(x, y, sum, cnt) {
  if (cnt === 4) {
    answer = Math.max(answer, sum);
    return;
  }

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (visited[nx][ny]) continue;

    if (cnt === 2) {
      visited[nx][ny] = true;
      dfs(x, y, sum + board[nx][ny], cnt + 1);
      visited[nx][ny] = false;
    }

    visited[nx][ny] = true;
    dfs(nx, ny, sum + board[nx][ny], cnt + 1);
    visited[nx][ny] = false;
  }
}
