const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = Array.from({ length: N }, () => Array(M));
for (let i = 1; i <= N; i++) {
  const temp = input[i].split(" ").map(Number);
  for (let j = 0; j < M; j++) {
    board[i - 1][j] = temp[j];
  }
}
const visited = Array.from({ length: N }, () => Array(M).fill(false));
let answer = 0;

if (N === 1 || M === 1) return console.log(0); // 부메랑을 만들 수 없는 경우

dfs(0, 0, 0);
console.log(answer);

function dfs(x, y, total) {
  if (y === M) {
    // 열을 초과할 경우
    x += 1;
    y = 0;
  }

  if (x === N) {
    answer = Math.max(answer, total);
    return;
  }

  dfs(x, y + 1, total); // 현재 위치 스킵
  if (visited[x][y]) return; // 이미 부메랑의 사용된 경우

  // (-1, -1), (-1, 1), (1, -1), (1, 1)
  if (x - 1 >= 0 && y - 1 >= 0 && !visited[x - 1][y] && !visited[x][y - 1]) {
    visited[x][y] = true;
    visited[x - 1][y] = true;
    visited[x][y - 1] = true;
    dfs(
      x,
      y + 1,
      total + (board[x][y] * 2 + board[x - 1][y] + board[x][y - 1])
    );
    visited[x][y] = false;
    visited[x - 1][y] = false;
    visited[x][y - 1] = false;
  }
  if (x - 1 >= 0 && y + 1 < M && !visited[x - 1][y] && !visited[x][y + 1]) {
    visited[x][y] = true;
    visited[x - 1][y] = true;
    visited[x][y + 1] = true;
    dfs(
      x,
      y + 1,
      total + (board[x][y] * 2 + board[x - 1][y] + board[x][y + 1])
    );
    visited[x][y] = false;
    visited[x - 1][y] = false;
    visited[x][y + 1] = false;
  }
  if (x + 1 < N && y - 1 >= 0 && !visited[x + 1][y] && !visited[x][y - 1]) {
    visited[x][y] = true;
    visited[x + 1][y] = true;
    visited[x][y - 1] = true;
    dfs(
      x,
      y + 1,
      total + (board[x][y] * 2 + board[x + 1][y] + board[x][y - 1])
    );
    visited[x][y] = false;
    visited[x + 1][y] = false;
    visited[x][y - 1] = false;
  }
  if (x + 1 < N && y + 1 < M && !visited[x + 1][y] && !visited[x][y + 1]) {
    visited[x][y] = true;
    visited[x + 1][y] = true;
    visited[x][y + 1] = true;
    dfs(
      x,
      y + 1,
      total + (board[x][y] * 2 + board[x + 1][y] + board[x][y + 1])
    );
    visited[x][y] = false;
    visited[x + 1][y] = false;
    visited[x][y + 1] = false;
  }
}

/*
 - dfs의 인수로 현재의 좌표값을 넣어주는데 이렇게 하면 이중 for문을 사용하지 않아도 된다.
 - 하나의 좌표(x, y)에서 부메랑을 만드는 경우의 수는 5가지로 스킵, (-1, -1), (-1, 1), (1, -1), (1, 1) 이다.
 - 해당 좌표가 이미 사용된 영역이라면 스킵만 수행하고 나머지 경우는 수행하지 않는다.
*/
