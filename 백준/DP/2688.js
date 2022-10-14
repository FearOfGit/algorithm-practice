const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((el) => +el);

input.shift();
const answer = solution(Math.max(...input));

for (let i = 0; i < input.length; i++) {
  let sum = 0;
  let temp = answer[input[i]];
  for (let i = 0; i < temp.length; i++) {
    sum += temp[i];
  }
  console.log(sum);
}

function solution(n) {
  const dp = Array.from({ length: n + 1 }, () => new Array(10).fill(0));
  for (let i = 0; i <= 9; i++) {
    dp[1][i] = 1;
  }

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j <= 9; j++) {
      for (let k = 0; k <= j; k++) {
        dp[i][j] += dp[i - 1][k];
      }
    }
  }

  return dp;
}
