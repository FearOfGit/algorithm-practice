const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = Array(N + 1).fill(null);
for (let i = 1; i <= N; i++) {
  arr[i] = +input[i];
}
let answer = [];
let visited = [];

function dfs(target, cur) {
  if (!visited[cur]) {
    visited[cur] = true;
    return dfs(target, arr[cur]);
  } else {
    if (target === cur) {
      return true;
    }
    return false;
  }
}

for (let i = 1; i <= N; i++) {
  visited = Array(N + 1).fill(false);

  if (dfs(i, i)) {
    answer.push(i);
  }
}

let str = answer.length + '\n' + answer.join('\n');

console.log(str);
