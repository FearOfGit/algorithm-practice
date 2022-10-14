const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, L] = input
  .shift()
  .split(' ')
  .map((el) => +el);
// console.log(N, L);
const arr = input.map((el) => el.split(' ').map((el) => +el));
// console.log(map);
solution();

function solution() {
  let answer = 0;

  // 1. 배열 확장
  const map = Array.from({ length: 2 * N }, () => new Array(N));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      map[i][j] = arr[i][j];
    }
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      map[N + i][j] = arr[j][i];
    }
  }

  let i, j;
  for (i = 0; i < 2 * N; i++) {
    let count = 1; // 유효 숫자(핵심)
    for (j = 0; j < N - 1; j++) {
      // 평지일 때
      if (map[i][j] === map[i][j + 1]) count++;
      else if (map[i][j] + 1 === map[i][j + 1] && count >= L) {
        // 오르막일 때
        count = 1;
      } else if (map[i][j] - 1 === map[i][j + 1] && count >= 0) {
        // 내리막일 때
        count = 1 - L;
      } else {
        break;
      }
    }

    if (j === N - 1 && count >= 0) {
      answer++;
    }
  }

  console.log(answer);
}
