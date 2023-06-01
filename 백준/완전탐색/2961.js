const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const ingredient = [];
const visited = Array(N).fill(false);
let answer = Infinity;

for (let i = 1; i <= N; i++) {
  const temp = input[i].split(" ").map(Number);

  ingredient.push(temp);
}

dfs(1, 0, 0, 0);
console.log(answer);

// S: *, B: +
function dfs(S, B, start, cnt) {
  if (cnt >= 1) answer = Math.min(answer, Math.abs(S - B)); // 요리 재료는 무조건 1개 이상

  // 조합 알고리즘
  for (let i = start; i < N; i++) {
    if (visited[i]) continue;

    const [s, b] = ingredient[i];

    visited[i] = true;
    dfs(S * s, B + b, i + 1, cnt + 1);
    visited[i] = false;
  }
}

/*
  - N의 최댓값이 10이므로 바로 조합 알고리즘으로 풀면 되겠다고 생각했다.
  - S는 곱이기 때문에 1으로 시작하고 B는 합이기 때문에 0으로 시작한다.
  - 한번 재귀를 돌 때마다 계속 현재 신맛과 쓴맛의 차에 최솟값을 확인한다.
  - 요리 재료는 무조건 1개 이상 사용해야 되므로 cnt를 통해 개수가 1개 이상일 때만 최솟값을 확인하게 구현했다.
*/
