const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((el) => +el);

for (let i = 1; i < input.length; i++) {
  solution(input[i]);
}

function solution(n) {
  const dp = Array.from({ length: n + 1 }, () => new Array(2).fill(0));
  dp[0][0] = 1;
  dp[0][1] = 0;
  if (n >= 1) {
    dp[1][0] = 0;
    dp[1][1] = 1;
  }

  for (let i = 2; i <= n; i++) {
    dp[i][0] = dp[i - 2][0] + dp[i - 1][0];
    dp[i][1] = dp[i - 2][1] + dp[i - 1][1];
  }

  console.log(dp[n].join(' '));
}
