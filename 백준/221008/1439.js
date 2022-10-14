// 뒤집기

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

// console.log(input);
const S = input[0];
solution();

function solution() {
  let answer = [0, 0];
  for (let i = 0; i < S.length; i++) {
    if (S[i] !== '0') {
      if (i === 0) answer[0]++;
      else if (S[i] !== S[i - 1]) answer[0]++;
    }
  }

  for (let i = 0; i < S.length; i++) {
    if (S[i] !== '1') {
      if (i === 0) answer[1]++;
      else if (S[i] !== S[i - 1]) answer[1]++;
    }
  }

  console.log(Math.min(...answer));
}
