// 공주님의 정원

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = parseInt(input[0]);
const arr = [];
for (let i = 1; i <= N; i++) {
  arr.push(input[i].split(' ').map(Number));
}
let cnt = 0;
solution();

function solution() {
  // 시작값 세팅
  let m = 3;
  let d = 1;
  let index = -1;

  // 비교값, 꽃이 지는 날이 가장 늦은 데이터 선택
  let endMonth = 0;
  let endDay = 0;

  const visited = new Array(N).fill(false);

  while (true) {
    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;

      if (arr[i][0] < m || (arr[i][0] === m && arr[i][1] <= d)) {
        if (
          arr[i][2] > endMonth ||
          (arr[i][2] === endMonth && arr[i][3] > endDay)
        ) {
          index = i;
          endMonth = arr[i][2];
          endDay = arr[i][3];
        }
      }
    }
    if (index === -1) {
      console.log(0);
      break;
    }
    m = arr[index][2];
    // 11월 30일까지는 꽃이 피어져 있어야 한다.
    if (m === 12) {
      console.log(cnt + 1);
      break;
    }
    d = arr[index][3];
    visited[index] = true;
    cnt++;
    endMonth = 0;
    endDay = 0;
    index = -1;
  }
}
