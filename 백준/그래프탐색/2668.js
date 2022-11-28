// https://www.acmicpc.net/problem/2668

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = Number(input[0]);
const arr = Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) {
  arr[i] = Number(input[i]);
}
const answer = [];
let visited;
for (let i = 1; i <= N; i++) {
  visited = Array(N + 1).fill(false);

  if (dfs(i, i)) {
    answer.push(i);
  }
}

let str = answer.length + '\n';
for (let i = 0; i < answer.length; i++) {
  str += answer[i] + '\n';
}
console.log(str);

function dfs(target, current) {
  if (!visited[current]) {
    visited[current] = true;
    return dfs(target, arr[current]);
  } else {
    if (target === current) {
      return true;
    }
    return false;
  }
}
