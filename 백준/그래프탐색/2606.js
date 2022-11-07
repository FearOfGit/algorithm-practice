const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input.shift());
const m = Number(input.shift());
const arr = input.map((el) => el.split(' ').map(Number));
const graph = {};
const visited = new Array(n + 1).fill(0);

solution();

function dfs(start) {
  if (visited[start] === 1) return;

  visited[start] = 1;
  graph[start].forEach((node) => {
    if (visited[node] === 1) return;
    dfs(node);
  });
}

function solution() {
  for (const [a, b] of arr) {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }

  dfs(1);

  const answer = visited.filter((el) => el === 1).length;
  console.log(answer - 1);
}
