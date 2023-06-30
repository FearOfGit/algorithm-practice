const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

let C = +input[0];
let index = 1;
let answer = 0;
let visited;
let arr;
let str = "";

while (C-- > 0) {
  arr = Array.from({ length: 11 }, () => Array(11));
  visited = new Array(11).fill(false);
  answer = 0;

  for (let i = index; i < index + 11; i++) {
    const temp = input[i].split(" ").map(Number);

    for (let j = 0; j < 11; j++) {
      arr[i - index][j] = temp[j];
    }
  }

  dfs(0, 0);
  str += answer + "\n";

  index += 11;
}

console.log(str);

function dfs(idx, result) {
  if (idx === 11) {
    answer = Math.max(answer, result);
    return;
  }

  for (let i = 0; i < 11; i++) {
    if (visited[i]) continue;
    if (arr[idx][i] === 0) continue;

    visited[i] = true;
    dfs(idx + 1, result + arr[idx][i]);
    visited[i] = false;
  }
}

/*
  - 능력치의 합의 최대값을 구해야 하기 때문에 선수 11명이 모든 포지션을 선택받을 수 있게 dfs를 수행한다. (idx가 선수 번호)
  - 이미 누군가 배정받은 포지션이거나 해당 선수의 해당 포지션 능력치가 0인 경우 예외 처리를 해준다.
  - 선수 11명이 모두 포지션을 배정받은 경우 최대값을 갱신해준다.
*/
