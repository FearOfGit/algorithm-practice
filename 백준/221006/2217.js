// 로프
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input.shift());
const arr = input.map((el) => +el);
// console.log(arr);
solution();

function solution() {
  arr.sort((a, b) => b - a);

  let answer = 0;
  for (let i = 0; i < arr.length; i++) {
    answer = Math.max(answer, arr[i] * (i + 1));
  }

  console.log(answer);
}
