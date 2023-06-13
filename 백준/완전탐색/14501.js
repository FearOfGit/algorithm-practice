const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const table = [];
let answer = 0;

for (let i = 1; i <= N; i++) {
  table.push(input[i].split(" ").map(Number));
}

dfs(0, 0);
console.log(answer);

// 조합 알고리즘
function dfs(day, total) {
  answer = Math.max(answer, total);

  for (let i = day; i < N; i++) {
    const [T, P] = table[i];
    const next = i + T;

    dfs(next, next < N + 1 ? total + P : total);
  }
}

/*
  - N의 최댓값이 15이기 때문에 조합 알고리즘을 활용해 구현했다.
  - 마땅한 브레이크 포인트가 없기 때문에 dfs를 한 번 돌 때마다 계속 최댓값을 갱신한다. (N + 1까지 요일이 지나지 않는 경우가 존재)
  - 선택한 상담의 T을 더해가며 dfs를 수행하고 지금까지 더해진 day를 다음 dfs의 시작점으로 지정한다.  
  - 이익을 구할 때는 정해진 기간 안에 진행할 수 있는 상담의 금액만 더한다.
*/
