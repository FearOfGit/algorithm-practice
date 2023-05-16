const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const k = +input[1];
const visited = Array(n).fill(false);
const arr = [];
const answer = new Set();

for (let i = 2; i <= n + 1; i++) arr.push(input[i].trim());

dfs("", 0);
console.log(answer.size);

function dfs(num, cnt) {
  if (cnt === k) {
    answer.add(num);
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    dfs(num + arr[i], cnt + 1);
    visited[i] = false;
  }
}

/*
  숫자가 적힌 n장의 카드가 주어졌을 때, 그 중에서 k개를 선택해서 만들 수 있는 정수의 개수를 구한다.
  
  - 순열 알고리즘을 이용하여 풀면 되는 간단한 문제이다.

  - 중복된 정수는 제외시켜야 하기 때문에 Set 자료구조를 이용한다.
*/
