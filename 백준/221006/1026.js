// 보물

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input.shift());
const A = input
  .shift()
  .split(' ')
  .map((el) => +el);
const B = input
  .shift()
  .split(' ')
  .map((el) => +el);
// console.log(B);
solution();

function solution() {
  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);

  let answer = 0;

  for (let i = 0; i < n; i++) {
    answer += A[i] * B[i];
  }

  console.log(answer);
}
