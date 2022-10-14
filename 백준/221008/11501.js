// 주식

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = parseInt(input[0]);
const arr = [];
for (let i = 2; i < input.length; i += 2) {
  arr.push(input[i].split(' ').map(Number));
}
solution();

function solution() {
  for (let i = 0; i < arr.length; i++) {
    const target = arr[i];
    let answer = 0;
    let max = 0;
    // 뒤에서부터 탐색
    for (let j = target.length - 1; j >= 0; j--) {
      if (target[j] > max) max = target[j];
      else answer += max - target[j];
    }

    console.log(answer);
  }
}
