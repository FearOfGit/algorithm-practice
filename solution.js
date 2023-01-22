const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const graph = [];
for (let i = 0; i < N; i++) graph[i] = [];
for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}
let flag = false;
let visited = [];

function dfs(cur, cnt) {
  if (cnt >= 5) {
    flag = true;
    return;
  }

  for (const next of graph[cur]) {
    if (visited[next]) continue;

    visited[next] = true;
    dfs(next, cnt + 1);
    visited[next] = false;

    if (flag) break;
  }
}

for (let i = 0; i < N; i++) {
  visited = Array(N).fill(false);

  visited[i] = true;
  dfs(i, 1);

  if (flag) break;
}

console.log(flag ? 1 : 0);
