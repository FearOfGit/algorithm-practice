const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, K] = input.shift().split(' ').map(Number);
const arr = input.map((el) => el.split(' ').map(Number));
const visited = Array.from({ length: N }, () => new Array(M).fill(false));
// console.log(N, M, K);
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
solution();

function check(x, y) {
  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
      if (visited[nx][ny]) return false;
    }
  }

  return true;
}
function solution() {
  let answer = 0;
  function dfs(cnt, sum) {
    if (cnt === K) {
      answer = Math.max(answer, sum);
      return;
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (!visited[i][j] && check(i, j)) {
          visited[i][j] = true;
          dfs(cnt + 1, sum + arr[i][j]);
          visited[i][j] = false;
        }
      }
    }
  }

  dfs(0, 0);

  console.log(answer);
}
