const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map((el) => +el);
const arr = Array.from({ length: N }, () => Array(M).fill(null));
const combi = [];
const result = [];
let answer = 0;

for (let i = 1; i <= N; i++) {
  const temp = input[i].split(" ").map((el) => +el);
  for (let j = 0; j < M; j++) {
    arr[i - 1][j] = temp[j];
  }
}

dfs(0, 0);

for (const [x, y, z] of result) {
  let cand = 0;

  for (let i = 0; i < N; i++) {
    cand += Math.max(arr[i][x], arr[i][y], arr[i][z]);
  }

  answer = Math.max(answer, cand);
}

console.log(answer);

function dfs(cnt, start) {
  if (cnt === 3) {
    result.push([...combi]);

    return;
  }

  for (let i = start; i < M; i++) {
    combi.push(i);
    dfs(cnt + 1, start + 1);
    combi.pop();
  }
}

/*
  최대 세 가지 종류의 치킨을 시켜서 회원도의 만족도의 합이 최대가 되는 치킨 조합의 만족도의 합을 구한다.

  - 조합 알고리즘을 통해 세 가지 종류의 치킨으로 이루어진 조합을 모두 구한다.

  - 조합 중 만족도의 합이 최대가 되는 값을 구한다.
*/
