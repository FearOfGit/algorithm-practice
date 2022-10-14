// 택배
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, C] = input[0].split(' ').map(Number);
const M = +input[1];
const array = input.slice(2).map((v) => v.split(' ').map(Number));
solution();
function solution() {
  const DEPARTURE = 1;
  const result = new Array(N + 1).fill(0);
  array.sort((a, b) => a[DEPARTURE] - b[DEPARTURE]);
  let answer = 0;

  for (let i = 0; i < array.length; i++) {
    const [start, end, box] = array[i];
    const temp = result.slice(start, end);
    const maxValue = Math.max(...temp);
    const possibleBox = Math.min(C - maxValue, box);
    for (let j = start; j < end; j++) {
      result[j] += possibleBox;
    }
    answer += possibleBox;
  }

  console.log(answer);
}
