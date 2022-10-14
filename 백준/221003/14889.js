// 스타트와 링크

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());
const arr = input.map((el) => el.split(' ').map((el) => +el));
solution(N, arr);
// console.log(arr);

function solution(N, arr) {
  let answer = 10000000;
  const selected = new Array(N).fill(0);

  function dfs(start, cnt) {
    if (cnt === N / 2) {
      let team1 = 0;
      let team2 = 0;
      // console.log(selected);
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          if (selected[i] === 0 && selected[j] === 0) {
            team1 += arr[i][j];
          }

          if (selected[i] === 1 && selected[j] === 1) {
            team2 += arr[i][j];
          }
        }
      }

      answer = Math.min(answer, Math.abs(team1 - team2));
      return;
    }

    for (let i = start; i < N; i++) {
      selected[i] = 1;
      dfs(i + 1, cnt + 1);
      selected[i] = 0;
    }
  }

  dfs(0, 0);

  console.log(answer);
}
