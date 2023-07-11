const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
let answer = 0;
const arr = [];

dfs(0);
console.log(answer);

// idx : 행
function dfs(idx) {
  if (idx === N) {
    answer += 1;
    return;
  }

  // 열
  for (let i = 0; i < N; i++) {
    arr[idx] = i;
    if (!check(idx)) continue;

    dfs(idx + 1);
  }
}

function check(limit) {
  for (let i = 0; i < limit; i++) {
    if (arr[i] === arr[limit] || Math.abs(arr[i] - arr[limit]) === limit - i)
      return false;
  }

  return true;
}

/*
  - 행(idx)를 증가시키며 dfs를 수행한다. 각 행에서는 모든 열(내부 for문)에 대해서 퀸을 놓아본다.
  - 특정 행에서 퀸을 놓을 수 있는 경우가 존재하지 않는 경우 다음 행으로 넘어가지 않고 재귀를 종료한다.
  - 마지막 행까지 도달했다는 것은 모든 행에 퀸을 놓을 수 있다는 것을 의마하기 때문에 answer을 1 증가시킨다.
*/
