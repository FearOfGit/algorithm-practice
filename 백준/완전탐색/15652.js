// 조건이 있는 순열

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
  const prev = [];
  const result = [];

  function dfs(start) {
    if (prev.length === M) {
      result.push([...prev]);
      return;
    }

    for (let i = start; i <= N; i++) {
      prev.push(i);
      dfs(i);
      prev.pop();
    }
  }

  dfs(1);

  return result;
}
