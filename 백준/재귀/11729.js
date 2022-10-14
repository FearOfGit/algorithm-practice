const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString();

const N = Number(input);
let count = 0;
const answer = [];

function Hanoi(num, from, other, to) {
  if (num === 0) return;

  // 자기 자신을 목적지로 이동하려면
  // 자기 자신보다 위의 숫자들을 다른 곳으로 먼저 이동시켜야 한다.
  Hanoi(num - 1, from, to, other);
  answer.push([from, to]);
  count++;
  // 자기 자신보다 위의 숫자들을 목적지로 이동시켜야 한다.
  Hanoi(num - 1, other, from, to);
}

Hanoi(N, '1', '2', '3');
console.log(count);
console.log(answer.map((el) => el.join(' ')).join('\n'));
