const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = Array.from({ length: N }, () => Array(N));
let visited;
let answer = Infinity;

for (let i = 1; i <= N; i++) {
  const temp = input[i].split(" ").map(Number);
  for (let j = 0; j < N; j++) {
    arr[i - 1][j] = temp[j];
  }
}

// 출발 지점
for (let i = 0; i < N; i++) {
  visited = Array(N).fill(false);
  dfs(i, i, 0, 0);
}

console.log(answer);

function dfs(start, cur, count, total) {
  if (start === cur && count === N) {
    answer = Math.min(answer, total);
    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    if (arr[cur][i] === 0) continue;

    visited[i] = true;
    dfs(start, i, count + 1, total + arr[cur][i]);
    visited[i] = false;
  }
}

/*
  - 주어진 모든 노드를 출발 지점으로 선택하여 각각 dfs를 수행한다.
  - 출발 지점으로 다시 돌아와야 하기 때문에 처음에 출발 지점은 방문 표시하지 않는다.
  - 모든 도시를 방문했고 마지막 도시가 출발 지점이라면 최솟값을 갱신해준다.
*/
