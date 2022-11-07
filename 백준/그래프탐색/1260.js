// 인접행렬을 고려해봐라
// visited 배열 1 -> 0
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m, v] = input.shift().split(' ').map(Number);
const arr = input.map((el) => el.split(' ').map(Number));
const mat = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
let visited = new Array(n + 1).fill(0);
let answer = '';
solution();

function dfs(start) {
  answer += start + ' ';
  visited[start] = 1;
  for (let i = 1; i <= n; i++) {
    if (visited[i] === 1 || mat[start][i] === 0) continue;
    dfs(i);
  }
}

function bfs(start) {
  const queue = [];
  queue.push(start);
  visited[v] = 0;

  while (queue.length) {
    const node = queue.shift();
    answer += node + ' ';

    for (let i = 1; i <= n; i++) {
      if (visited[i] === 0 || mat[node][i] === 0) continue;
      queue.push(i);
      visited[i] = 0;
    }
  }
}

function solution() {
  for (const [a, b] of arr) {
    mat[a][b] = 1;
    mat[b][a] = 1;
  }

  dfs(v);
  answer += '\n';
  bfs(v);
  console.log(answer);
}
