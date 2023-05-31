const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const board = Array.from({ length: N }, () => Array(N));
const visited = Array.from({ length: N }, () => Array(N).fill(false));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let answer = Infinity;

for (let i = 1; i <= N; i++) {
  const temp = input[i].split(" ").map(Number);
  for (let j = 0; j < N; j++) {
    board[i - 1][j] = temp[j];
  }
}

dfs(0, 0);
console.log(answer);

function dfs(cnt, sum) {
  if (cnt === 3) {
    answer = Math.min(answer, sum);
    return;
  }

  // 행과 열의 가장 자리는 구할 필요가 없다. (꽃의 구조를 확인)
  for (let i = 1; i < N - 1; i++) {
    for (let j = 1; j < N - 1; j++) {
      if (!check(i, j)) continue; // 꽃을 심을 수 없으면 패스

      let s = board[i][j];
      visited[i][j] = true;

      for (let k = 0; k < 4; k++) {
        const nx = i + dir[k][0];
        const ny = j + dir[k][1];

        s += board[nx][ny];
        visited[nx][ny] = true;
      }

      dfs(cnt + 1, sum + s);

      visited[i][j] = false;

      for (let k = 0; k < 4; k++) {
        const nx = i + dir[k][0];
        const ny = j + dir[k][1];

        visited[nx][ny] = false;
      }
    }
  }
}

function check(x, y) {
  if (visited[x][y]) return false;

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (visited[nx][ny]) return false;
  }

  return true;
}

/*
  - N의 범위가 크지 않기 때문에 무식하게 완전 탐색으로 풀 수 있다.
  - board의 모든 인덱스를 탐색하며 꽃을 심을 수 있는 곳을 찾는다. (dfs + 꽃 구조에 해당하는 위치 확인)
  - 꽃을 심을 수 있으면 해당 구역의 visited를 true로 설정하고 다음 위치를 찾는 과정을 반복한다. (dfs)
  - 재귀에서 빠져나올 때 반드시 해당 구역의 visited를 false로 설정한다. (추후 다시 사용해야 한다.)
*/
