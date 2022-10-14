// 시험 감독

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());
const arr = input
  .shift()
  .split(' ')
  .map((el) => +el);
const [B, C] = input
  .shift()
  .split(' ')
  .map((el) => +el);

solution();

function solution() {
  let answer = 0;
  for (let i = 0; i < arr.length; i++) {
    const target = arr[i] - B;
    answer++;

    if (target > 0) {
      answer += Math.ceil(target / C);
    }
  }

  console.log(answer);
}
