// 게임을 만든 동준이

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

// console.log(input);
const N = Number(input[0]);
const arr = [];
for (let i = 1; i < input.length; i++) {
  arr.push(parseInt(input[i]));
}
solution();

function solution() {
  let answer = 0;
  for (let i = N - 1; i > 0; i--) {
    if (arr[i - 1] >= arr[i]) {
      answer += arr[i - 1] - arr[i] + 1;
      arr[i - 1] = arr[i] - 1;
    }
  }

  console.log(answer);
}
