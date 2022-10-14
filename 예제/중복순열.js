// 중복 순열
// N^M

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim();

let [N, M] = input.split(' ');
N = Number(N);
M = Number(M);
solution(N, M);

function solution(N, M) {
  const permutation = getPermutations(N, M);

  console.log(permutation.map((el) => el.join(' ')).join('\n'));
}

function getPermutations(N, M) {
  const result = [];
  const prev = [];
  function dfs() {
    if (prev.length === M) {
      result.push([...prev]);
      return;
    }

    for (let i = 1; i <= N; i++) {
      prev.push(i);
      dfs();
      prev.pop();
    }
  }

  dfs();

  return result;
}
