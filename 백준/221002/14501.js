// 퇴사

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());
const arr = [[0, 0]];
input.forEach((el) => {
  const [t, p] = el.split(' ').map((num) => +num);
  arr.push([t, p]);
});
solution(N, arr);
// console.log(arr);

function solution(N, arr) {
  let answer = 0;

  function dfs(start, sum) {
    answer = Math.max(answer, sum);

    for (let i = start; i <= N; i++) {
      const [t, p] = arr[i];
      if (i + t > N + 1) continue;
      dfs(i + t, sum + p);
    }
  }
  dfs(1, 0);

  console.log(answer);
}
