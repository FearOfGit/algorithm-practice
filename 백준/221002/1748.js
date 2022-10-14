// 수 이어 쓰기1
// N - 1 + 1 : 1부터 N까지의 수 중, 1의 자리 수를 갖고 있는 수의 개수
// N - 10 + 1 : 1부터 N까지의 수 중, 10의 자리 수를 갖고 있는 수의 개수
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

console.log(solution(Number(input[0])));

function solution(N) {
  let answer = 0;
  for (let i = 1; i <= N; i *= 10) {
    answer += N - i + 1;
  }

  return answer;
}
