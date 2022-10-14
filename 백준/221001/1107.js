// 리모컨(v)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const target = +input[0];
const N = +input[1];
let broken = [];
if (N > 0) {
  broken = input[2].split(' ').map((v) => +v);
}

console.log(solution(target, broken));

function solution(target, broken) {
  let min = Math.abs(target - 100);

  for (let channel = 0; channel <= 999999; channel++) {
    if (check(channel, broken)) {
      const cand = String(channel).length + Math.abs(target - channel);
      min = Math.min(min, cand);
    }
  }

  return min;
}

function check(ch, broken) {
  if (ch === 0) {
    return !broken.includes(ch);
  }

  while (ch !== 0) {
    if (broken.includes(ch % 10)) {
      return false;
    } else {
      ch = Math.floor(ch / 10);
    }
  }

  return true;
}
