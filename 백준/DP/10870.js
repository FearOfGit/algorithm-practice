const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((el) => +el);

solution(input[0]);

function solution(n) {
  const dp = new Array(n + 1);
  dp[0] = 0;
  if (n >= 1) {
    dp[1] = 1;
  }

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }

  console.log(dp[n]);
}
