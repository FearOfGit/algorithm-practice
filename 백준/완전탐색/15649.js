// 순열
// N!

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim();

let [N, M] = input.split(' ');
N = Number(N);
M = Number(M);

solution(N, M);

function solution(N, M) {
  const permutation = getPermutation(N, M);

  console.log(permutation.map((el) => el.join(' ')).join('\n'));
}

function getPermutation(N, M) {
  const visited = [];
  const prev = [];
  const result = [];

  function dfs() {
    if (prev.length === M) {
      result.push([...prev]);
      return;
    }

    for (let i = 1; i <= N; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      prev.push(i);
      dfs();
      visited[i] = false;
      prev.pop();
    }
  }

  dfs();

  return result;
}
