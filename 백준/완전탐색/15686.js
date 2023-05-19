const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map((el) => +el);
const map = Array.from({ length: N }, () => Array(N).fill(null));
const home = [];
const store = [];
const arr = [];
const visited = Array(N * N).fill(false);
let answer = Infinity;

for (let i = 1; i <= N; i++) {
  const temp = input[i].split(" ").map((el) => +el);
  for (let j = 0; j < N; j++) {
    map[i - 1][j] = temp[j];

    if (map[i - 1][j] === 1) home.push([i - 1, j]);
    if (map[i - 1][j] === 2) store.push([i - 1, j]);
  }
}

dfs(0, 0);
console.log(answer);

function dfs(cnt, start) {
  if (cnt === M) {
    let total = 0;

    for (const [hx, hy] of home) {
      let min = Infinity;

      for (const [sx, sy] of arr) {
        const cand = Math.abs(hx - sx) + Math.abs(hy - sy);
        min = Math.min(min, cand);
      }

      total += min;
    }

    answer = Math.min(answer, total);
    return;
  }

  // 조합 알고리즘
  for (let i = start; i < store.length; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    arr.push(store[i]);
    dfs(cnt + 1, i + 1);
    visited[i] = false;
    arr.pop();
  }
}
