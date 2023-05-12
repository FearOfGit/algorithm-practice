const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

let [N, K] = input[0].split(" ").map((el) => +el);
const set = input[1].split(" ").map((el) => +el);
const arr = [];
let answer = 0;

for (let i = 1; i <= String(N).length; i++) dfs(0, i);

console.log(answer);

function dfs(depth, length) {
  if (depth === length) {
    let cand = 0;

    for (const num of arr) {
      cand += num;
      cand *= 10;
    }
    cand /= 10;

    if (N >= cand) answer = Math.max(answer, cand);

    return;
  }

  // 순열
  for (let i = 0; i < K; i++) {
    arr.push(set[i]);
    dfs(depth + 1, length);
    arr.pop();
  }
}
