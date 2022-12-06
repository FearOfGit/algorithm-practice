const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arr = [];
for (let i = 0; i < N; i++) arr[i] = [];
for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  arr[a].push(b);
  arr[b].push(a);
}

let flag = false;
let visited;
for (let i = 0; i < N; i++) {
  visited = Array(N).fill(false);
  dfs(i, 1);
  if (flag) break;
}

console.log(flag ? 1 : 0);

function dfs(start, cnt) {
  if (cnt === 5) {
    flag = true;
    return;
  }
  visited[start] = true;
  for (const x of arr[start]) {
    if (visited[x]) continue;
    dfs(x, cnt + 1);

    if (flag) {
      return;
    }
  }
  visited[start] = false;
}
